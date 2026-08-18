#!/usr/bin/env node
/**
 * Generate EPUB content from book/metadata.yaml and book/chapters.
 *
 * Repo-specific knobs (repo_url / source_ref / source_dirs / book_id / date)
 * are read from metadata.yaml so this script stays generic across forked repos.
 */

import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { Marked, Renderer } from "marked";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CHAPTERS_DIR = join(__dirname, "chapters");
const OUTPUT_DIR = join(__dirname, "epub-content");
const MERMAID_DIR = join(OUTPUT_DIR, "mermaid");
const COVER_DIR = join(OUTPUT_DIR, "cover");
const COVER_SVG_FILE = join(__dirname, "cover.svg");
const METADATA_FILE = join(__dirname, "metadata.yaml");
const MERMAID_CONFIG_FILE = join(__dirname, "mermaid-config.json");
const PUPPETEER_CONFIG_FILE = join(__dirname, "puppeteer-config.json");
let mermaidCounter = 0;
const mermaidAssets = [];

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseArray(yaml, key) {
  const match = yaml.match(new RegExp(`^${key}:\\s*\\[([^\\]]*)\\]`, "m"));
  if (!match) return [];
  return match[1]
    .split(",")
    .map((item) => item.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

function readMetadata() {
  const yaml = readFileSync(METADATA_FILE, "utf-8");
  const title = yaml.match(/^title:\s*"([^"]+)"/m)?.[1] ?? "Deep-Tech Book";
  const author = yaml.match(/^author:\s*"([^"]+)"/m)?.[1] ?? "Author";
  const lang = yaml.match(/^lang(?:uage)?:\s*([^\n]+)/m)?.[1]?.replace(/"/g, "").trim() ?? "zh-CN";
  const repoUrl = yaml.match(/^repo_url:\s*"([^"]+)"/m)?.[1]?.replace(/\/$/, "") ?? "https://github.com/OWNER/REPO";
  const sourceRef = yaml.match(/^source_ref:\s*"([^"]+)"/m)?.[1] ?? "main";
  const bookId = yaml.match(/^book_id:\s*"([^"]+)"/m)?.[1] ?? "deep-tech-book";
  const date = yaml.match(/^date:\s*"([^"]+)"/m)?.[1] ?? "2026-01-01";
  const sourceDirsParsed = parseArray(yaml, "source_dirs");
  const sourceDirs = sourceDirsParsed.length > 0 ? sourceDirsParsed : ["src"];

  const lines = yaml.split(/\r?\n/);
  const chaptersBlock = [];
  const chapters = [];
  let currentPart = "";

  let inChapters = false;
  for (const line of lines) {
    if (line === "chapters:") {
      inChapters = true;
      continue;
    }
    if (inChapters && /^[a-zA-Z_]+:/.test(line)) {
      break;
    }
    if (inChapters) {
      chaptersBlock.push(line);
    }
  }

  for (const line of chaptersBlock) {
    const part = line.match(/^\s+- part:\s*"([^"]+)"/);
    if (part) {
      currentPart = part[1];
      continue;
    }
    const item = line.match(/^\s+- ([a-zA-Z0-9_.-]+\.md)\s*$/);
    if (item) {
      chapters.push({ file: item[1], part: currentPart });
    }
  }

  return { title, author, lang, repoUrl, sourceRef, bookId, date, sourceDirs, chapters };
}

function getChapterTitle(file) {
  const content = readFileSync(join(CHAPTERS_DIR, file), "utf-8");
  return content.match(/^#\s+(.+)$/m)?.[1] ?? file.replace(/\.md$/, "");
}

function normalizeHref(href, metadata) {
  const src = metadata.sourceDirs.map(escapeRegex).join("|");
  const sourceMatch = href.match(new RegExp("^((?:" + src + ")\\/.+)#L([0-9]+)$"));
  if (sourceMatch) {
    return `${metadata.repoUrl}/blob/${metadata.sourceRef}/${sourceMatch[1]}#L${sourceMatch[2]}`;
  }
  return href;
}

function getMermaidCliPath() {
  const candidates = [
    join(__dirname, "node_modules", "@mermaid-js", "mermaid-cli", "src", "cli.js"),
    join(__dirname, "..", "node_modules", "@mermaid-js", "mermaid-cli", "src", "cli.js"),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }
  throw new Error(
    `Missing Mermaid CLI. Run npm ci --ignore-scripts in book/ or npm install --ignore-scripts in the repository root before building the EPUB.`,
  );
}

function getBrowserExecutablePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  const candidates =
    process.platform === "win32"
      ? [
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
          "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
          "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
          "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
        ]
      : [
          "/usr/bin/google-chrome-stable",
          "/usr/bin/google-chrome",
          "/usr/bin/chromium",
          "/usr/bin/chromium-browser",
        ];

  return candidates.find((candidate) => existsSync(candidate));
}

function writeMermaidSvg(code) {
  mermaidCounter += 1;
  const name = `mermaid-${String(mermaidCounter).padStart(3, "0")}.svg`;
  const inputDir = mkdtempSync(join(tmpdir(), "deep-tech-book-mermaid-"));
  const inputFile = join(inputDir, `${name}.mmd`);
  const outputFile = join(MERMAID_DIR, name);
  const browserExecutablePath = getBrowserExecutablePath();

  writeFileSync(inputFile, code, "utf-8");
  const result = spawnSync(
    process.execPath,
    [
      getMermaidCliPath(),
      "-i",
      inputFile,
      "-o",
      outputFile,
      "-c",
      MERMAID_CONFIG_FILE,
      "-p",
      PUPPETEER_CONFIG_FILE,
      "--quiet",
    ],
    {
      encoding: "utf-8",
      env: {
        ...process.env,
        PUPPETEER_DISABLE_HEADLESS_WARNING: "true",
        ...(browserExecutablePath ? { PUPPETEER_EXECUTABLE_PATH: browserExecutablePath } : {}),
      },
    },
  );
  rmSync(inputDir, { recursive: true, force: true });

  if (result.status !== 0 || !existsSync(outputFile)) {
    const stderr = result.stderr?.trim() ?? "";
    const stdout = result.stdout?.trim() ?? "";
    throw new Error(
      `Failed to render Mermaid diagram ${mermaidCounter}.${stderr ? `\n${stderr}` : ""}${stdout ? `\n${stdout}` : ""}`,
    );
  }

  mermaidAssets.push(name);
  return name;
}

function createMarkdownRenderer(metadata) {
  const renderer = new Renderer();

  renderer.code = ({ text, lang }) => {
    const language = (lang ?? "").trim();
    if (language === "mermaid") {
      const asset = writeMermaidSvg(text);
      return `<figure class="diagram-page"><img src="../mermaid/${asset}" alt="Mermaid diagram ${mermaidCounter}"/></figure>`;
    }
    const className = language ? ` class="language-${escapeHtml(language)}"` : "";
    return `<pre><code${className}>${escapeHtml(`${text.replace(/\n$/, "")}\n`)}</code></pre>`;
  };

  renderer.link = function renderLink({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    const normalizedHref = escapeHtml(normalizeHref(href, metadata));
    const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
    return `<a href="${normalizedHref}"${titleAttr}>${text}</a>`;
  };

  renderer.image = ({ href, title, text }) => {
    const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
    return `<img src="${escapeHtml(href)}" alt="${escapeHtml(text)}"${titleAttr}/>`;
  };

  renderer.hr = () => "<hr/>";
  renderer.br = () => "<br/>";
  renderer.html = ({ text }) => escapeHtml(text);

  return renderer;
}

function markdownToHtml(md, metadata) {
  const marked = new Marked({
    async: false,
    breaks: false,
    gfm: true,
    renderer: createMarkdownRenderer(metadata),
  });
  return marked.parse(md);
}

function generateTocNcx(metadata, chapters) {
  const points = chapters
    .map(
      (ch, index) => `    <navPoint id="navpoint-${index + 1}" playOrder="${index + 1}">
      <navLabel><text>${escapeHtml(ch.title)}</text></navLabel>
      <content src="content/${ch.file.replace(".md", ".xhtml")}"/>
    </navPoint>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="${escapeHtml(metadata.bookId)}"/>
    <meta name="dtb:depth" content="2"/>
    <meta name="dtb:totalPageCount" content="0"/>
    <meta name="dtb:maxPageNumber" content="0"/>
  </head>
  <docTitle><text>${escapeHtml(metadata.title)}</text></docTitle>
  <navMap>
${points}
  </navMap>
</ncx>`;
}

function generateContentOpf(metadata, chapters, assets) {
  const manifestItems = chapters
    .map(
      (ch, index) =>
        `    <item id="chapter${index + 1}" media-type="application/xhtml+xml" href="content/${ch.file.replace(".md", ".xhtml")}"/>`,
    )
    .join("\n");
  const assetItems = assets
    .map((asset, index) => `    <item id="mermaid${index + 1}" media-type="image/svg+xml" href="mermaid/${asset}"/>`)
    .join("\n");
  const coverItems = existsSync(join(COVER_DIR, "cover.png"))
    ? `    <item id="cover-image" media-type="image/png" href="cover/cover.png" properties="cover-image"/>
    <item id="cover-svg" media-type="image/svg+xml" href="cover/cover.svg"/>`
    : existsSync(join(COVER_DIR, "cover.svg"))
      ? `    <item id="cover-image" media-type="image/svg+xml" href="cover/cover.svg" properties="cover-image"/>`
      : "";
  const spineItems = chapters.map((_ch, index) => `    <itemref idref="chapter${index + 1}"/>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookId" version="3.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="BookId">${escapeHtml(metadata.bookId)}</dc:identifier>
    <dc:title>${escapeHtml(metadata.title)}</dc:title>
    <dc:creator>${escapeHtml(metadata.author)}</dc:creator>
    <dc:language>${escapeHtml(metadata.lang)}</dc:language>
    <meta name="cover" content="cover-image"/>
    <meta property="dcterms:modified">${escapeHtml(metadata.date)}T00:00:00Z</meta>
  </metadata>
  <manifest>
    <item id="ncx" media-type="application/x-dtbncx+xml" href="toc.ncx"/>
    <item id="nav" media-type="application/xhtml+xml" href="nav.xhtml" properties="nav"/>
${manifestItems}
${assetItems}
${coverItems}
  </manifest>
  <spine toc="ncx">
${spineItems}
  </spine>
</package>`;
}

function generateNavXhtml(metadata, chapters) {
  const items = chapters
    .map((ch) => `      <li><a href="content/${ch.file.replace(".md", ".xhtml")}">${escapeHtml(ch.title)}</a></li>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title>目录</title>
  <style>
    body { font-family: sans-serif; margin: 1em; }
    h1 { font-size: 1.5em; }
    ul { list-style-type: none; padding-left: 1em; }
    li { margin: 0.5em 0; }
    a { text-decoration: none; color: #333; }
  </style>
</head>
<body>
  <nav epub:type="toc" id="toc">
    <h1>目录</h1>
    <ul>
${items}
    </ul>
  </nav>
</body>
</html>`;
}

function postprocess() {
  const metadata = readMetadata();
  const chapters = metadata.chapters.map((chapter) => ({
    ...chapter,
    title: getChapterTitle(chapter.file),
  }));

  mkdirSync(join(OUTPUT_DIR, "content"), { recursive: true });
  mkdirSync(join(OUTPUT_DIR, "META-INF"), { recursive: true });
  mkdirSync(MERMAID_DIR, { recursive: true });
  mkdirSync(COVER_DIR, { recursive: true });

  for (const file of readdirSync(join(OUTPUT_DIR, "content"))) {
    if (file.endsWith(".xhtml")) {
      unlinkSync(join(OUTPUT_DIR, "content", file));
    }
  }
  for (const file of readdirSync(MERMAID_DIR)) {
    if (file.endsWith(".svg")) {
      unlinkSync(join(MERMAID_DIR, file));
    }
  }
  for (const file of readdirSync(COVER_DIR)) {
    if (file === "cover.svg" || file === "cover.png") {
      unlinkSync(join(COVER_DIR, file));
    }
  }

  if (existsSync(COVER_SVG_FILE)) {
    copyFileSync(COVER_SVG_FILE, join(COVER_DIR, "cover.svg"));
  }
  if (existsSync(join(__dirname, "cover.png"))) {
    copyFileSync(join(__dirname, "cover.png"), join(COVER_DIR, "cover.png"));
  }

  for (const ch of chapters) {
    const md = readFileSync(join(CHAPTERS_DIR, ch.file), "utf-8");
    const html = markdownToHtml(md, metadata);
    const xhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>${escapeHtml(ch.title)}</title>
  <style>
    body { font-family: 'Noto Sans SC', sans-serif; line-height: 1.8; margin: 1em; }
    h1, h2, h3, h4 { color: #333; }
    code { background: #f4f4f4; padding: 0.2em 0.4em; border-radius: 3px; }
    pre { background: #f4f4f4; padding: 1em; overflow-x: auto; border-radius: 5px; }
    pre code { background: none; padding: 0; }
    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    th, td { border: 1px solid #ddd; padding: 0.5em; text-align: left; }
    th { background: #f4f4f4; }
    blockquote { border-left: 3px solid #ddd; margin: 1em 0; padding-left: 1em; color: #666; }
    figure.diagram-page { margin: 1.5em 0; page-break-inside: avoid; }
    figure.diagram-page img { display: block; width: 100%; height: auto; }
  </style>
</head>
<body>
${html}
</body>
</html>`;
    writeFileSync(join(OUTPUT_DIR, "content", ch.file.replace(".md", ".xhtml")), xhtml, "utf-8");
  }

  writeFileSync(join(OUTPUT_DIR, "nav.xhtml"), generateNavXhtml(metadata, chapters), "utf-8");
  writeFileSync(join(OUTPUT_DIR, "toc.ncx"), generateTocNcx(metadata, chapters), "utf-8");
  writeFileSync(join(OUTPUT_DIR, "content.opf"), generateContentOpf(metadata, chapters, mermaidAssets), "utf-8");
  writeFileSync(join(OUTPUT_DIR, "mimetype"), "application/epub+zip", "utf-8");
  writeFileSync(
    join(OUTPUT_DIR, "META-INF", "container.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`,
    "utf-8",
  );

  console.log(`Generated ${chapters.length} chapters from metadata.yaml.`);
}

postprocess();

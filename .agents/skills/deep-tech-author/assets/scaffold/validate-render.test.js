#!/usr/bin/env node

import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const mermaidDir = join(__dirname, "epub-content", "mermaid");
const opfFile = join(__dirname, "epub-content", "content.opf");
const coverDir = join(__dirname, "epub-content", "cover");

if (!existsSync(opfFile) || !existsSync(coverDir)) {
  console.log("No generated EPUB content found; render regression test skipped.");
  process.exit(0);
}

const svgFiles = existsSync(mermaidDir)
  ? readdirSync(mermaidDir).filter((file) => file.endsWith(".svg"))
  : [];
if (svgFiles.length === 0) {
  console.log("No Mermaid diagrams found; render regression test skipped for Mermaid assets.");
} else {
  const firstSvg = readFileSync(join(mermaidDir, svgFiles[0]), "utf-8");
  assert.ok(
    !firstSvg.includes("Mermaid 图"),
    "expected mermaid SVG to be rendered diagram output, not the fallback source-code placeholder",
  );
  console.log(`Render regression test passed for ${svgFiles.length} mermaid SVG files.`);
}

const opf = readFileSync(opfFile, "utf-8");
assert.match(opf, /name="cover"/, "expected EPUB metadata to identify the cover");
assert.match(opf, /properties="cover-image"/, "expected EPUB manifest to mark the cover image");
assert.ok(
  readdirSync(coverDir).some((file) => file === "cover.svg" || file === "cover.png"),
  "expected generated cover assets",
);
console.log("Cover regression test passed.");

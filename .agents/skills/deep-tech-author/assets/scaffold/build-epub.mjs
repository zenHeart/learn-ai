#!/usr/bin/env node
/**
 * build-epub.mjs - 构建 EPUB 电子书
 *
 * 使用 JSZip 将 EPUB 内容打包成 .epub 文件。
 *
 * 使用方法:
 *   node build-epub.mjs          # 生成 book.epub
 *   node build-epub.mjs custom   # 指定输出文件名
 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import JSZip from 'jszip';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, 'epub-content');
const EPUB_OUTPUT = join(__dirname, 'book.epub');

async function buildEpub(outputPath = EPUB_OUTPUT) {
  console.log('Building EPUB...');
  console.log('Output:', outputPath);

  const zip = new JSZip();

  // 1. 添加 mimetype (不压缩)
  const mimetype = readFileSync(join(OUTPUT_DIR, 'mimetype'), 'utf-8');
  zip.file('mimetype', mimetype, { compression: 'STORE' });

  // 2. 添加 META-INF
  const containerXml = readFileSync(join(OUTPUT_DIR, 'META-INF', 'container.xml'), 'utf-8');
  zip.file('META-INF/container.xml', containerXml);

  // 3. 添加 OPF
  const contentOpf = readFileSync(join(OUTPUT_DIR, 'content.opf'), 'utf-8');
  zip.file('content.opf', contentOpf);

  // 4. 添加 NCX
  const tocNcx = readFileSync(join(OUTPUT_DIR, 'toc.ncx'), 'utf-8');
  zip.file('toc.ncx', tocNcx);

  // 5. 添加 Nav
  const navXhtml = readFileSync(join(OUTPUT_DIR, 'nav.xhtml'), 'utf-8');
  zip.file('nav.xhtml', navXhtml);

  // 6. 添加所有章节内容
  const contentDir = join(OUTPUT_DIR, 'content');
  if (existsSync(contentDir)) {
    const files = readdirSync(contentDir);
    for (const file of files) {
      const content = readFileSync(join(contentDir, file));
      zip.file(`content/${file}`, content);
    }
    console.log(`   Added ${files.length} content files`);
  }

  const mermaidDir = join(OUTPUT_DIR, 'mermaid');
  if (existsSync(mermaidDir)) {
    const files = readdirSync(mermaidDir).filter((file) => file.endsWith('.svg'));
    for (const file of files) {
      const content = readFileSync(join(mermaidDir, file));
      zip.file(`mermaid/${file}`, content);
    }
    console.log(`   Added ${files.length} mermaid files`);
  }

  const coverDir = join(OUTPUT_DIR, 'cover');
  if (existsSync(coverDir)) {
    const files = readdirSync(coverDir).filter((file) => file === 'cover.svg' || file === 'cover.png');
    for (const file of files) {
      const content = readFileSync(join(coverDir, file));
      zip.file(`cover/${file}`, content);
    }
    console.log(`   Added ${files.length} cover files`);
  }

  // 7. 生成 EPUB
  const zipContent = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
    mimeType: 'application/epub+zip',
  });

  writeFileSync(outputPath, zipContent);
  const sizeKb = Math.round(zipContent.length / 1024);
  console.log(`EPUB built successfully: ${outputPath}`);
  console.log(`   Size: ${sizeKb} KB`);
}

// 安装依赖提示
function showInstallHelp() {
  console.log(`
深度技术书 - EPUB 构建工具
==================================

要构建 EPUB 文件，需要先安装依赖：

  cd ${__dirname}
  npm install jszip

然后运行:

  node build-epub.mjs              # 生成 book.epub
  node build-epub.mjs my-book.epub # 指定输出文件名

如果不想安装依赖，可以使用在线工具将 Markdown 转换为 EPUB：
- https://pandocs.org/epub
- https://www.pdf24.org/zh/markdown-to-epub
`);
}

if (process.argv[1] && process.argv[1].includes('build-epub')) {
  const outputArg = process.argv[2];
  buildEpub(outputArg).catch(console.error);
}

export { buildEpub };

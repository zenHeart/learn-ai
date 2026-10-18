#!/usr/bin/env node
/**
 * Validate generated EPUB XHTML/SVG resources without relying on browser rendering.
 */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { XMLValidator } from "fast-xml-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const EPUB_DIR = join(__dirname, "epub-content");
const CONTENT_DIR = join(EPUB_DIR, "content");
const MERMAID_DIR = join(EPUB_DIR, "mermaid");
const COVER_DIR = join(EPUB_DIR, "cover");

function listFiles(dir, predicate) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(predicate)
    .map((file) => join(dir, file));
}

function fail(errors, message) {
  errors.push(message);
}

function validateXmlLike(errors, file) {
  const xmlResult = XMLValidator.validate(readFileSync(file, "utf-8"), {
    allowBooleanAttributes: false,
  });
  if (xmlResult !== true) {
    const { err } = xmlResult;
    fail(errors, `${file}:${err.line}:${err.col} ${err.msg}`);
  }

  const content = readFileSync(file, "utf-8")
    .replace(/<\?xml[\s\S]*?\?>/g, "")
    .replace(/<!DOCTYPE[\s\S]*?>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  const stack = [];
  const tags = content.matchAll(/<[^>]+>/g);

  for (const tag of tags) {
    const raw = tag[0];
    if (/^<!(?:\[CDATA\[|--)/.test(raw) || /^<\?/.test(raw)) continue;
    const closing = raw.match(/^<\/\s*([A-Za-z0-9:_-]+)/);
    if (closing) {
      const expected = stack.pop();
      if (expected !== closing[1]) {
        fail(errors, `${file} tag mismatch: expected </${expected ?? "none"}> but found ${raw}`);
      }
      continue;
    }

    const opening = raw.match(/^<\s*([A-Za-z0-9:_-]+)/);
    if (!opening) continue;
    const name = opening[1];
    if (raw.endsWith("/>")) continue;
    stack.push(name);
  }

  if (stack.length > 0) {
    fail(errors, `${file} unclosed tags: ${stack.join(", ")}`);
  }
}

function validateImageRefs(errors, file) {
  const content = readFileSync(file, "utf-8");
  const refs = content.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g);
  for (const ref of refs) {
    const target = normalize(join(dirname(file), ref[1]));
    if (!existsSync(target)) {
      fail(errors, `${file} missing image target: ${ref[1]}`);
    }
  }
}

function validate() {
  const errors = [];
  const files = [
    join(EPUB_DIR, "content.opf"),
    join(EPUB_DIR, "toc.ncx"),
    join(EPUB_DIR, "nav.xhtml"),
    ...listFiles(CONTENT_DIR, (file) => file.endsWith(".xhtml")),
    ...listFiles(MERMAID_DIR, (file) => file.endsWith(".svg")),
    ...listFiles(COVER_DIR, (file) => file.endsWith(".svg")),
  ].filter((file) => existsSync(file));

  for (const file of files) {
    validateXmlLike(errors, file);
    if (file.endsWith(".xhtml")) validateImageRefs(errors, file);
  }

  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exit(1);
  }

  console.log(`Render validation passed for ${files.length} generated files.`);
}

validate();

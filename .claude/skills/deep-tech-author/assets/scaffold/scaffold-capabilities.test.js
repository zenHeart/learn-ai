#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const read = (path) => readFileSync(join(__dirname, path), "utf-8");

const postprocess = read("postprocess.js");
const buildEpub = read("build-epub.mjs");
const workflow = read("../workflow/build-epub.yml");
const renderTest = read("validate-render.test.js");
const setup = read("../../references/setup-and-publish.md");

assert.match(postprocess, /cover\.svg/, "postprocess should copy or register the SVG cover");
assert.match(postprocess, /cover\.png/, "postprocess should support rendered PNG cover assets");
assert.match(postprocess, /properties="cover-image"/, "OPF manifest should mark the cover image");
assert.match(postprocess, /name="cover"/, "OPF metadata should identify the cover item");
assert.match(buildEpub, /coverDir = join\(OUTPUT_DIR, 'cover'\)/, "EPUB packer should include generated cover assets");

assert.match(workflow, /release:\n\s+types:\s+\[created,\s*published\]/, "workflow should attach EPUB assets on releases");
assert.match(workflow, /librsvg2-bin/, "workflow should install librsvg for SVG cover rendering");
assert.match(workflow, /rsvg-convert/, "workflow should render cover.svg to a PNG preview");
assert.match(workflow, /npm ci --ignore-scripts/, "workflow should prefer reproducible npm ci installs");
assert.match(workflow, /actions\/cache@v4/, "workflow should cache npm dependencies for repeatable builds");
assert.match(workflow, /debug.*artifact|book-debug/i, "workflow should upload debug build artifacts");
assert.match(workflow, /softprops\/action-gh-release@v2/, "workflow should attach EPUB and cover assets to releases");
assert.match(workflow, /og:image/, "landing page should include social preview metadata");

assert.doesNotMatch(
  renderTest,
  /assert\.ok\(svgFiles\.length > 0/,
  "render test should allow books with zero Mermaid diagrams",
);

assert.match(setup, /Release/, "setup guide should document Release artifacts");
assert.match(setup, /cover\.png/, "setup guide should document cover PNG generation");
assert.match(setup, /npm ci/, "setup guide should document reproducible npm ci builds");

console.log("Scaffold capability checks passed.");

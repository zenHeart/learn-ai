#!/usr/bin/env node
/**
 * Legacy preprocess guard.
 *
 * The book is now authored directly under book/chapters and ordered by
 * book/metadata.yaml. The previous analysis-to-chapters mapper is intentionally
 * disabled because it referenced stale external analysis files and could
 * overwrite the canonical handbook.
 */

console.error("book/preprocess.js is disabled.");
console.error("Edit book/chapters/*.md directly and run: node book/validate.js");
process.exitCode = 1;

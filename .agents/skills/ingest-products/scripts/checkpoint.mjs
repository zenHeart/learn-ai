#!/usr/bin/env node
/**
 * Thin wrapper so the skill can invoke the checkpoint without knowing the
 * repo layout. The implementation lives in scripts/products/checkpoint.mjs
 * — one copy only, this just forwards.
 */
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const target = join(here, '../../../../scripts/products/checkpoint.mjs')
const r = spawnSync(process.execPath, [target, ...process.argv.slice(2)], {
  stdio: 'inherit',
})
process.exit(r.status ?? 1)

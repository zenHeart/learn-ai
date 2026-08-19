#!/usr/bin/env node
/**
 * Asserts product gallery + sidebar links resolve, and #70–#85 slugs have ZH+EN maps.
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const docsRoot = join(root, 'docs')
const failures = []

const REQUIRED_SLUGS = [
  'kimi',
  'kimi-code',
  'minimax-code',
  'minimax-agent',
  'zhipu-chat',
  'glm-coding',
  'yuanbao',
  'hunyuan',
  'codebuddy',
  'doubao',
  'trae',
  'coze',
  'volcengine-ark',
  'qwen',
  'lingma',
  'bailian',
  'pi-agent',
  'openclaw',
  'figma-ai',
  'testing-ai',
  'othertools'
]

function read(rel) {
  return readFileSync(join(root, rel), 'utf8')
}

function mdExists(urlPath) {
  const rel = urlPath.split('#')[0].replace(/^\//, '').replace(/\/$/, '')
  return [
    join(docsRoot, `${rel}.md`),
    join(docsRoot, rel, 'index.md')
  ].some((p) => existsSync(p))
}

function parseQuotedDescription(body) {
  const end = body.indexOf('\n---', 3)
  const fm = end > 0 ? body.slice(4, end) : ''
  const m = fm.match(/^description:\s*(.+)$/m)
  if (!m) return false
  const raw = m[1].trim()
  if (raw.startsWith('\\') || raw.startsWith('" \\') || raw.startsWith("' \\")) return false
  if ((raw.startsWith('"') && raw.endsWith('"') && raw.length > 2) ||
      (raw.startsWith("'") && raw.endsWith("'") && raw.length > 2)) {
    return true
  }
  return raw.length > 0 && !raw.startsWith('"')
}

function collectLinks(src) {
  const out = new Set()
  for (const m of src.matchAll(/['"`](\/(?:zh\/)?products\/[^'"`#?\s]+)['"`]/g)) {
    out.add(m[1].split('#')[0])
  }
  return [...out]
}

{
  const landings = [
    'docs/products/index.md',
    'docs/zh/products/index.md'
  ]
  for (const rel of landings) {
    if (!existsSync(join(root, rel))) {
      failures.push(`missing products landing: ${rel}`)
      continue
    }
    const body = read(rel)
    if (!/gallery:\s*products/.test(body) || !/layout:\s*ai-tools/.test(body)) {
      failures.push(`${rel}: need frontmatter layout: ai-tools and gallery: products`)
    }
  }

  const layout = 'docs/.vitepress/theme/layouts/ai-tools.vue'
  const layoutSrc = existsSync(join(root, layout)) ? read(layout) : ''
  if (!layoutSrc) {
    failures.push(`missing ${layout}`)
  } else {
    if (!/productGalleryEn/.test(layoutSrc) || !/productGalleryZh/.test(layoutSrc)) {
      failures.push(`${layout}: must import productGalleryEn/Zh`)
    }
    if (!/products-gallery\.js/.test(layoutSrc)) {
      failures.push(`${layout}: must import ../data/products-gallery.js`)
    }
    if (!/gallery === ['"]products['"]/.test(layoutSrc) && !/gallery === "products"/.test(layoutSrc)) {
      failures.push(`${layout}: must switch on frontmatter.gallery === 'products'`)
    }
  }

  const galleryComp = 'docs/.vitepress/theme/components/AIToolsGallery.vue'
  const gallerySrc = existsSync(join(root, galleryComp)) ? read(galleryComp) : ''
  if (!gallerySrc) {
    failures.push(`missing ${galleryComp}`)
  } else if (!/categories:/.test(gallerySrc) || !/props\.categories/.test(gallerySrc)) {
    failures.push(`${galleryComp}: must accept and use a categories prop`)
  }

  const galleryJs = 'docs/.vitepress/theme/data/products-gallery.js'
  if (!existsSync(join(root, galleryJs))) {
    failures.push(`missing ${galleryJs}`)
  } else {
    const gsrc = read(galleryJs)
    for (const slug of REQUIRED_SLUGS) {
      if (!gsrc.includes(`/products/${slug}/`) || !gsrc.includes(`/zh/products/${slug}/`)) {
        failures.push(`${galleryJs}: missing rendered shelf link for ${slug}`)
      }
    }
  }

  const srcs = [
    'docs/.vitepress/theme/data/products-gallery.js',
    'docs/.vitepress/sidebars/ai-coding.mjs'
  ]
  for (const rel of srcs) {
    if (!existsSync(join(root, rel))) {
      failures.push(`missing ${rel}`)
      continue
    }
    const links = collectLinks(read(rel))
    for (const link of links) {
      if (!mdExists(link)) failures.push(`${rel} dead product link: ${link}`)
    }
  }
}

for (const slug of REQUIRED_SLUGS) {
  for (const prefix of ['products', 'zh/products']) {
    const link = `/${prefix}/${slug}/`
    if (!mdExists(link)) failures.push(`missing map page: ${link}`)
  }
  const zhMap = join(docsRoot, 'zh/products', slug, 'index.md')
  if (existsSync(zhMap)) {
    const body = readFileSync(zhMap, 'utf8')
    if (!/https?:\/\//.test(body) || !/官方/.test(body)) {
      failures.push(`zh/products/${slug}/index.md: missing official family table (需要官方 URL + 本站去向)`)
    }
    if (/\]\(\/(?:zh\/)?products\/ark\/?\)/.test(body)) {
      failures.push(`zh/products/${slug}/index.md: dead /products/ark/ link (use /products/volcengine-ark/)`)
    }
    if (!body.startsWith('---') || !/domain:\s*product/.test(body.slice(0, 800))) {
      failures.push(`zh/products/${slug}/index.md: missing YAML frontmatter domain: product`)
    }
    if (!parseQuotedDescription(body)) {
      failures.push(`zh/products/${slug}/index.md: description must be a quoted YAML string`)
    }
  }
  const enMap = join(docsRoot, 'products', slug, 'index.md')
  if (existsSync(enMap)) {
    const body = readFileSync(enMap, 'utf8')
    if (/\]\(\/(?:zh\/)?products\/ark\/?\)/.test(body)) {
      failures.push(`products/${slug}/index.md: dead /products/ark/ link (use /products/volcengine-ark/)`)
    }
    if (!body.startsWith('---') || !/domain:\s*product/.test(body.slice(0, 800))) {
      failures.push(`products/${slug}/index.md: missing YAML frontmatter domain: product`)
    }
    if (!parseQuotedDescription(body)) {
      failures.push(`products/${slug}/index.md: description must be a quoted YAML string`)
    }
  }
}

if (failures.length) {
  console.error(`product-docs-audit FAIL (${failures.length})`)
  for (const f of failures) console.error('  ' + f)
  process.exit(1)
}

console.log('product-docs-audit PASS')
console.log(`checked ${REQUIRED_SLUGS.length} slugs + gallery/sidebar product links`)

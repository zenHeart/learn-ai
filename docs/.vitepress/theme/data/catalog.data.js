/**
 * VitePress 1.6.4 createContentLoader
 * @see https://vitepress.dev/guide/data-loading
 * @see node_modules/vitepress/dist/node/index.d.ts (ContentOptions / ContentData)
 *
 * pattern 官方类型是 string | string[]，相对 srcDir。
 * 不要开 excerpt：1.6.4 默认分隔符是 `---`，会和 YAML frontmatter 冲突。
 *
 * 官方字段：title / description
 * 自定义字段（guide/frontmatter 允许）：domain / tags / navOrder / role / llm / listed
 */
import { createContentLoader } from 'vitepress'

export default createContentLoader(
  [
    'practice/**/*.md',
    'zh/practice/**/*.md',
    'tech/**/*.md',
    'zh/tech/**/*.md',
    'products/**/*.md',
    'zh/products/**/*.md',
    'paths/**/*.md',
    'zh/paths/**/*.md',
    'cookbook/**/*.md',
    'zh/cookbook/**/*.md',
    'projects/**/*.md',
    'zh/projects/**/*.md',
    'deployment/**/*.md',
    'zh/deployment/**/*.md',
    'integration/**/*.md',
    'zh/integration/**/*.md',
    'use-cases/**/*.md',
    'zh/use-cases/**/*.md',
    'ai-tools/**/*.md',
    'zh/ai-tools/**/*.md',
    'zh/skills/**/*.md'
  ],
  {
    transform(raw) {
      return raw
        .filter((page) => page.frontmatter?.domain)
        .map((page) => ({
          url: page.url,
          title: page.frontmatter.title || '',
          description: page.frontmatter.description || '',
          domain: page.frontmatter.domain,
          tags: page.frontmatter.tags || [],
          navOrder: page.frontmatter.navOrder ?? 100,
          role: page.frontmatter.role || '',
          llm: page.frontmatter.llm || [],
          listed: page.frontmatter.listed !== false,
          // Pyramid graph fields (Issue #116): page frontmatter is the SSOT.
          topicId: page.frontmatter.topicId || '',
          layer: page.frontmatter.layer || '',
          status: page.frontmatter.status || '',
          lastVerified: page.frontmatter.lastVerified || ''
        }))
        .sort((a, b) => {
          if (a.navOrder !== b.navOrder) return a.navOrder - b.navOrder
          return a.url.localeCompare(b.url)
        })
    }
  }
)

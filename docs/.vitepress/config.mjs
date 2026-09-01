import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";
import path from "path";
import { enPathsSidebar, zhPathsSidebar } from './sidebars/paths.mjs'
import { enProductSidebar, zhProductSidebar } from './sidebars/products.mjs'
import { enTechSidebar, zhTechSidebar } from './sidebars/tech.mjs'
import { enPracticeSidebar, zhPracticeSidebar } from './sidebars/practice.mjs'
import { enCookbookSidebar, zhCookbookSidebar } from './sidebars/cookbook.mjs'

export default withMermaid(defineConfig({
   base: '/',

   // Extend the brand colour into the browser / OS chrome (mobile address
   // bar, PWA theme). Matches --la-brand-light-3 in the theme's vars.css.
   head: [
      ['meta', { name: 'theme-color', content: '#3b82f6' }]
   ],

   // Collect git-based "last updated" timestamps for every page.
   lastUpdated: true,

   // Shared Config
   ignoreDeadLinks: true,

   vite: {
      resolve: {
         alias: {
            'dayjs/plugin/advancedFormat.js': 'dayjs/esm/plugin/advancedFormat',
            'dayjs/plugin/customParseFormat.js': 'dayjs/esm/plugin/customParseFormat',
            'dayjs/plugin/isoWeek.js': 'dayjs/esm/plugin/isoWeek',
            'dayjs/plugin/duration.js': 'dayjs/esm/plugin/duration',
            "@braintree/sanitize-url": path.resolve(
               __dirname,
               "../../node_modules/.pnpm/@braintree+sanitize-url@7.1.1/node_modules/@braintree/sanitize-url/dist/index.js"
            ),
         },
      },
      optimizeDeps: {
         include: ['dayjs', 'cytoscape-cose-bilkent', 'cytoscape', 'debug'],
      },
      build: {
         rollupOptions: {
            output: {
               manualChunks(id) {
                  if (id.includes('node_modules')) {
                     if (id.includes('mermaid')) return 'mermaid';
                     if (id.includes('cytoscape')) return 'cytoscape';
                     if (id.includes('dayjs')) return 'dayjs';
                  }
               }
            }
         },
         chunkSizeWarningLimit: 2000,
      }
   },

   mermaidPlugin: {
      class: "mermaid",
   },

   // Locales Configuration
   locales: {
      root: {
         label: 'English',
         lang: 'en',
         title: "Learn AI",
         description: "AI Learning Resources & PPTs",
         themeConfig: {
            nav: [
               { text: 'Home', link: '/' },
               { text: 'Paths', link: '/paths/', activeMatch: '/paths/' },
               { text: 'Products', link: '/products/', activeMatch: '/products/' },
               { text: 'Tech', link: '/tech/', activeMatch: '^/(tech|integration)/' },
               { text: 'Practice', link: '/practice/', activeMatch: '/practice/' },
               { text: 'Cookbook', link: '/cookbook/', activeMatch: '^/(cookbook|projects|deployment|use-cases)/' },
               {
                  text: 'PPTs', items: [
                     { text: '1. Vibe Coding', link: 'https://ai.zenheart.site/ppts/vibe-coding/' },
                     { text: '2. Prompt + Context', link: 'https://ai.zenheart.site/ppts/prompt-context/' },
                     { text: '3. AI Native Work', link: 'https://ai.zenheart.site/ppts/ai-native-work/' },
                     { text: '4. MCP + SKILL', link: 'https://ai.zenheart.site/ppts/skill-mcp/' },
                     { text: '5. AGENT', link: 'https://ai.zenheart.site/ppts/agent/' }
                  ]
               }
            ],
            sidebar: {
               '/paths/': enPathsSidebar,
               '/products/': enProductSidebar,
               '/tech/': enTechSidebar,
               '/integration/': enTechSidebar,
               '/practice/': enPracticeSidebar,
               '/cookbook/': enCookbookSidebar,
               '/projects/': enCookbookSidebar,
               '/deployment/': enCookbookSidebar,
               '/use-cases/': enCookbookSidebar
            }
         },
      },
      zh: {
         label: '简体中文',
         lang: 'zh',
         link: '/zh/',
         title: "学习 AI",
         description: "前端工程师的 AI 学习指南",
         themeConfig: {
            footer: {
               message: '为前端工程师打造 · 基于 VitePress 构建',
               copyright: '版权所有 © 2024-present 学习 AI'
            },
            editLink: {
               pattern: 'https://github.com/zenheart/learn-ai/edit/master/docs/:path',
               text: '在 GitHub 上编辑此页'
            },
            lastUpdated: {
               text: '最后更新于'
            },
            docFooter: {
               prev: '上一页',
               next: '下一页'
            },
            outlineTitle: '本页目录',
            returnToTopLabel: '返回顶部',
            sidebarMenuLabel: '菜单',
            darkModeSwitchLabel: '外观',
            langMenuLabel: '切换语言',
            nav: [
               { text: '首页', link: '/zh/' },
               { text: '路径', link: '/zh/paths/', activeMatch: '/zh/paths/' },
               { text: '产品', link: '/zh/products/', activeMatch: '/zh/products/' },
               { text: '技术', link: '/zh/tech/', activeMatch: '^/zh/(tech|integration|skills)/' },
               { text: '企业', link: '/zh/practice/', activeMatch: '/zh/practice/' },
               { text: '实战', link: '/zh/cookbook/', activeMatch: '^/zh/(cookbook|projects|deployment|use-cases)/' },
               {
                  text: 'PPTs', items: [
                     { text: '1. Vibe Coding', link: 'https://ai.zenheart.site/ppts/vibe-coding/' },
                     { text: '2. Prompt + Context', link: 'https://ai.zenheart.site/ppts/prompt-context/' },
                     { text: '3. AI Native Work', link: 'https://ai.zenheart.site/ppts/ai-native-work/' },
                     { text: '4. MCP + SKILL', link: 'https://ai.zenheart.site/ppts/skill-mcp/' },
                     { text: '5. AGENT', link: 'https://ai.zenheart.site/ppts/agent/' }
                  ]
               }
            ],
            sidebar: {
               '/zh/paths/': zhPathsSidebar,
               '/zh/products/': zhProductSidebar,
               '/zh/tech/': zhTechSidebar,
               '/zh/integration/': zhTechSidebar,
               '/zh/skills/': zhTechSidebar,
               '/zh/practice/': zhPracticeSidebar,
               '/zh/cookbook/': zhCookbookSidebar,
               '/zh/projects/': zhCookbookSidebar,
               '/zh/deployment/': zhCookbookSidebar,
               '/zh/use-cases/': zhCookbookSidebar
            }
         }
      }
   },

   themeConfig: {
      socialLinks: [
         { icon: 'github', link: 'https://github.com/zenheart/learn-ai' }
      ],
      outline: [2, 3],

      // Zero-dependency local (offline) search, with zh UI translations.
      search: {
         provider: 'local',
         options: {
            locales: {
               zh: {
                  translations: {
                     button: {
                        buttonText: '搜索文档',
                        buttonAriaLabel: '搜索文档'
                     },
                     modal: {
                        noResultsText: '无法找到相关结果',
                        resetButtonTitle: '清除查询条件',
                        footer: {
                           selectText: '选择',
                           navigateText: '切换',
                           closeText: '关闭'
                        }
                     }
                  }
               }
            }
         }
      },

      // "Edit this page" link — points at the source on GitHub (master branch).
      editLink: {
         pattern: 'https://github.com/zenheart/learn-ai/edit/master/docs/:path',
         text: 'Edit this page on GitHub'
      },

      lastUpdated: {
         text: 'Last updated'
      },

      // Default (English) footer; the zh locale overrides the text below.
      footer: {
         message: 'Built for frontend engineers · Powered by VitePress',
         copyright: 'Copyright © 2024-present Learn AI'
      }
   }
}));

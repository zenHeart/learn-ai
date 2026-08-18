import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";
import path from "path";

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
               { text: 'Paths', link: '/paths/' },
               { text: 'Docs', link: '/tech/' },
               { text: 'Cookbook', link: '/cookbook/' },
               { text: 'AI Tools', link: '/ai-tools/' },
               {
                  text: 'PPTs', items: [
                     { text: '1. Vibe Coding', link: 'https://ai.zenheart.site/ppts/vibe-coding/' },
                     { text: '2. Prompt + Context', link: 'https://ai.zenheart.site/ppts/prompt-context/' },
                     { text: '3. MCP + SKILL', link: 'https://ai.zenheart.site/ppts/skill-mcp/' },
                     { text: '4. AGENT', link: 'https://ai.zenheart.site/ppts/agent/' }
                  ]
               }
            ],
            sidebar: {
               '/': [
                  {
                     text: '📘 Featured Tutorials',
                     collapsed: false,
                     items: [
                        { text: 'Claude Code Tutorial', link: '/claude-code-tutorial' },
                        { text: 'Claude Prompt Best Practices', link: '/claude-prompt-best-practices' },
                        { text: 'System Prompts Collection', link: '/system-prompts-collection' }
                     ]
                  },
                  {
                     text: '🗺️ Learning Paths',
                     collapsed: false,
                     items: [
                        { text: 'Path Overview', link: '/paths/' },
                        { text: 'Path 1: Productivity', link: '/paths/productivity' },
                        { text: 'Path 2: Integration', link: '/paths/integration' },
                        { text: 'Path 3: Mastery', link: '/paths/mastery' }
                     ]
                  },
                  {
                     text: '🔌 Integration Guides',
                     collapsed: true,
                     items: [
                        {
                           text: 'APIs',
                           collapsed: false,
                           items: [
                              { text: 'Comparison & Costs', link: '/integration/apis/' },
                              { text: 'OpenAI', link: '/integration/apis/openai' },
                              { text: 'Anthropic (Claude)', link: '/integration/apis/anthropic' },
                              { text: 'HuggingFace', link: '/integration/apis/huggingface' },
                              { text: 'Streaming Patterns', link: '/integration/apis/streaming' }
                           ]
                        },
                        {
                           text: 'Frameworks',
                           collapsed: false,
                           items: [
                              { text: 'Overview', link: '/integration/frameworks/' },
                              { text: 'Vercel AI SDK', link: '/integration/frameworks/vercel-ai-sdk' },
                              { text: 'LangChain.js', link: '/integration/frameworks/langchain-js' },
                              { text: 'LlamaIndex.TS', link: '/integration/frameworks/llamaindex-ts' },
                              { text: 'Next.js Integration', link: '/integration/frameworks/nextjs' }
                           ]
                        },
                        {
                           text: 'Protocols',
                           items: [
                              { text: 'MCP (Model Context Protocol)', link: '/integration/protocols/mcp' },
                              { text: 'Tool Calling', link: '/integration/protocols/tool-calling' }
                           ]
                        },
                        {
                           text: 'Frontend ML',
                           items: [
                              { text: 'Overview', link: '/integration/frontend-ml/' },
                              { text: 'Transformers.js', link: '/integration/frontend-ml/transformersjs' },
                              { text: 'TensorFlow.js', link: '/integration/frontend-ml/tensorflowjs' },
                              { text: 'ml5.js', link: '/integration/frontend-ml/ml5js' },
                              { text: 'ONNX Runtime', link: '/integration/frontend-ml/onnx-runtime' }
                           ]
                        }
                     ]
                  },
                  {
                     text: '🧠 Tech Concepts',
                     collapsed: true,
                     items: [
                        {
                           text: 'Fundamentals',
                           items: [
                              { text: 'LLM Basics', link: '/tech/fundamentals/LLM' },
                              { text: 'Context Window', link: '/tech/fundamentals/context' },
                              { text: 'Embeddings', link: '/tech/fundamentals/embeddings' },
                              { text: 'Prompt Engineering', link: '/tech/fundamentals/prompt/' }
                           ]
                        },
                        {
                           text: 'Frontend AI',
                           items: [
                              { text: 'Streaming UI', link: '/tech/frontend/streaming' },
                              { text: 'Generative UI', link: '/tech/frontend/generative-ui' },
                              { text: 'Browser AI', link: '/tech/frontend/browser-ai' },
                              { text: 'State Management', link: '/tech/frontend/state-management' }
                           ]
                        },
                        {
                           text: 'Engineering',
                           items: [
                              { text: 'Testing', link: '/tech/engineering/testing' },
                              { text: 'Evals', link: '/tech/engineering/evals' },
                              { text: 'Observability', link: '/tech/engineering/observability' },
                              { text: 'Security', link: '/tech/engineering/security' },
                              { text: 'Cost Optimization', link: '/tech/engineering/cost-optimization' }
                           ]
                        },
                        {
                           text: 'Patterns',
                           items: [
                              { text: 'RAG', link: '/tech/patterns/RAG' },
                              { text: 'RAG · Semantic Search Case Study', link: '/tech/patterns/RAG-semantic-search-case-study' },
                              { text: 'Agents', link: '/tech/patterns/agent/' },
                              { text: 'Agent · Agent Course', link: '/tech/patterns/agent/agent-course' },
                              { text: 'Agent · Agent Design Patterns', link: '/tech/patterns/agent/agent-design-patterns' },
                              { text: 'Agent · Hooks', link: '/tech/patterns/agent/hooks' },
                              { text: 'Agent · Skills', link: '/tech/patterns/agent/skills' },
                              { text: 'Agent · LangChain Harness (2026-04)', link: '/tech/patterns/agent/2026-04-12-langchain-agent-harness' }
                           ]
                        },
                        {
                           text: 'Prompt Engineering',
                           items: [
                              { text: 'Overview', link: '/tech/prompt/' },
                              { text: 'Agent Engineering Practices', link: '/tech/prompt/agent-engineering-practices' },
                              { text: 'Context for Agent Engineering', link: '/tech/prompt/context-agent-engineering' },
                              { text: 'Agents Doc', link: '/tech/prompt/agents-doc' },
                              { text: 'Case · Copilot', link: '/tech/prompt/cases/copilot' }
                           ]
                        },
                        {
                           text: 'Tooling & Practice',
                           items: [
                              { text: 'Advanced Tool Use', link: '/tech/advanced-tool-use' },
                              { text: 'AI-Assisted Programming', link: '/tech/ai-assisted-programming' },
                              { text: 'AI-Driven Workflow Automation', link: '/tech/ai-driven-workflow-automation' },
                              { text: 'N8n Workflow Automation', link: '/tech/n8n-workflow-automation' },
                              { text: 'SLS Log Analysis Assistant', link: '/tech/sls-log-analysis-assistant' },
                              { text: 'TestHub Platform', link: '/tech/testhub-platform' },
                              { text: 'Midscene UI Automation', link: '/tech/midscene-ui-automation' },
                              { text: 'Cross-Project Context Input', link: '/tech/cross-project-context-input' },
                              { text: 'Context Injection Strategies', link: '/tech/context-injection-strategies' },
                              { text: 'Cross-Tool Context Sharing', link: '/tech/cross-tool-context-sharing' }
                           ]
                        },
                        {
                           text: 'Testing & Evaluation',
                           items: [
                              { text: 'Alibaba AI Testing', link: '/tech/alibaba-ai-testing' },
                              { text: 'Meituan AI Testing', link: '/tech/meituan-ai-testing' },
                              { text: 'Generative Benchmarking', link: '/tech/generative-benchmarking' },
                              { text: 'Golden Dataset Generation', link: '/tech/golden-dataset-generation' }
                           ]
                        },
                        {
                           text: 'Training',
                           items: [
                              { text: 'Overview', link: '/tech/training/' },
                              { text: 'SFT', link: '/tech/training/SFT' },
                              { text: 'RLHF', link: '/tech/training/RLHF' },
                              { text: 'PEFT', link: '/tech/training/PEFT' }
                           ]
                        }
                     ]
                  },
                  {
                     text: '🛠️ Projects',
                     collapsed: true,
                     items: [
                        {
                           text: 'Beginner',
                           items: [
                              { text: 'AI Chatbot', link: '/projects/beginner/ai-chatbot' },
                              { text: 'Text Summarizer', link: '/projects/beginner/text-summarizer' },
                              { text: 'Image Generator', link: '/projects/beginner/image-generator' }
                           ]
                        },
                        {
                           text: 'Intermediate',
                           items: [
                              { text: 'RAG Search', link: '/projects/intermediate/rag-search' },
                              { text: 'Code Autocomplete', link: '/projects/intermediate/code-completion' },
                              { text: 'AI Form Builder', link: '/projects/intermediate/ai-form-builder' },
                              { text: 'Semantic Search', link: '/projects/intermediate/semantic-search' }
                           ]
                        },
                        {
                           text: 'Advanced',
                           items: [
                              { text: 'Full Stack SaaS', link: '/projects/advanced/full-stack-saas' },
                              { text: 'Multi-Agent App', link: '/projects/advanced/multi-agent-app' },
                              { text: 'AI Design Tool', link: '/projects/advanced/ai-design-tool' }
                           ]
                        }
                     ]
                  },
                  {
                     text: '🍳 Cookbook',
                     collapsed: true,
                     items: [
                        { text: 'Overview', link: '/cookbook/' },
                        { text: 'Chat UI Component', link: '/cookbook/chat-ui' },
                        { text: 'Secure API Proxy', link: '/cookbook/api-proxy' },
                        { text: 'Local Embeddings', link: '/cookbook/local-embedding' },
                        { text: 'Token Counting', link: '/cookbook/token-counting' },
                        { text: 'Form Autocomplete', link: '/cookbook/form-autocomplete' },
                        { text: 'Error Handling', link: '/cookbook/error-handling' },
                        { text: 'Content Moderation', link: '/cookbook/content-moderation' }
                     ]
                  },
                  {
                     text: '🚢 Deployment',
                     collapsed: true,
                     items: [
                        { text: 'Overview', link: '/deployment/' },
                        { text: 'Vercel Edge', link: '/deployment/vercel-edge' },
                        { text: 'Cloudflare Workers', link: '/deployment/cloudflare-workers' },
                        { text: 'Caching Strategies', link: '/deployment/caching' },
                        { text: 'Rate Limiting', link: '/deployment/rate-limiting' },
                        { text: 'Monitoring', link: '/deployment/monitoring' },
                        { text: 'Cost Calculator', link: '/deployment/cost-calculator' }
                     ]
                  },
                  {
                     text: '💡 Use Cases',
                     collapsed: true,
                     items: [
                        { text: 'Library', link: '/use-cases/' },
                        { text: 'Add AI Search', link: '/use-cases/add-ai-search' },
                        { text: 'Migrate to AI', link: '/use-cases/migrate-to-ai' },
                        { text: 'AI Analytics', link: '/use-cases/ai-analytics' },
                        { text: 'Recommendations', link: '/use-cases/recommendations' },
                        { text: 'Accessibility', link: '/use-cases/accessibility' }
                     ]
                  },
                  {
                     text: '🧰 Products & Tools',
                     collapsed: true,
                     items: [
                        {
                           text: 'AI Coding',
                           items: [
                              { text: 'Overview', link: '/products/ai-coding/' },
                              { text: 'Cursor', link: '/products/ai-coding/cursor' },
                              { text: 'Copilot', link: '/products/ai-coding/copilot' },
                              {
                                 text: 'Claude', link: '/products/ai-coding/claude/', items: [
                                    { text: '🗺️ Learning Map', link: '/products/ai-coding/claude/' },
                                    {
                                       text: 'Core Products',
                                       collapsed: false,
                                       items: [
                                          { text: 'Claude.ai Platform', link: '/products/ai-coding/claude/claude-ai' },
                                          { text: 'Claude Code CLI', link: '/products/ai-coding/claude/claude-code' },
                                          { text: 'Claude Code Cookbook', link: '/products/ai-coding/claude/claude-code-cookbook' },
                                       ]
                                    },
                                    {
                                       text: 'More Products & Extensions',
                                       collapsed: true,
                                       items: [
                                          { text: 'Connectors', link: '/products/ai-coding/claude/connectors' },
                                          { text: 'Claude Design', link: '/products/ai-coding/claude/claude-design' },
                                          { text: 'Cowork Desktop Agent', link: '/products/ai-coding/claude/cowork' },
                                          { text: 'Plugin Development', link: '/products/ai-coding/claude/plugin' },
                                       ]
                                    },
                                    {
                                       text: 'Reference & Cheatsheets',
                                       collapsed: false,
                                       items: [
                                          { text: 'Cheatsheet', link: '/products/ai-coding/claude/claude-code-cheatsheet' },
                                          { text: 'Glossary', link: '/products/ai-coding/claude/claude-code-glossary' },
                                       ]
                                    },
                                 ]
                              },
                              { text: 'Gemini CLI', link: '/products/ai-coding/gemini-cli' },
                              {
                                 text: 'Grok', link: '/products/ai-coding/grok/', items: [
                                    { text: '🗺️ Learning Map', link: '/products/ai-coding/grok/' },
                                    {
                                       text: 'Core Products',
                                       collapsed: false,
                                       items: [
                                          { text: 'Grok Build Tutorial', link: '/products/ai-coding/grok/grok-cli' },
                                          { text: 'Cookbook', link: '/products/ai-coding/grok/grok-cookbook' },
                                       ]
                                    },
                                    {
                                       text: 'More Products',
                                       collapsed: true,
                                       items: [
                                          { text: 'Grok Chat', link: '/products/ai-coding/grok/grok-chat' },
                                          { text: 'Imagine', link: '/products/ai-coding/grok/grok-imagine' },
                                          { text: 'Voice', link: '/products/ai-coding/grok/grok-voice' },
                                          { text: 'Connectors', link: '/products/ai-coding/grok/grok-connectors' },
                                          { text: 'Grok Bot', link: '/products/ai-coding/grok/grok-bot' },
                                          { text: 'Business & Enterprise', link: '/products/ai-coding/grok/grok-business' },
                                       ]
                                    },
                                    {
                                       text: 'Reference',
                                       collapsed: false,
                                       items: [
                                          { text: 'Cheatsheet', link: '/products/ai-coding/grok/grok-cheatsheet' },
                                          { text: 'Glossary', link: '/products/ai-coding/grok/grok-glossary' },
                                       ]
                                    },
                                 ]
                              },
                              { text: 'Pi Agent', link: '/products/ai-coding/pi-agent' },
                              { text: 'Other Tools', link: '/products/ai-coding/othertools' },
                              {
                                 text: 'OpenClaw',
                                 link: '/zh/products/automation/openclaw/',
                                 items: [
                                    { text: 'Overview', link: '/zh/products/automation/openclaw/' },
                                    { text: 'Feishu Setup', link: '/zh/products/automation/openclaw/feishu' },
                                    { text: 'WeChat Setup', link: '/zh/products/automation/openclaw/wechat' },
                                    { text: 'WeCom Setup', link: '/zh/products/automation/openclaw/wecom' },
                                    {
                                       text: 'Advanced Guides',
                                       collapsed: false,
                                       items: [
                                          { text: 'CLI Reference', link: '/zh/products/automation/openclaw/cli' },
                                          { text: 'Deployment', link: '/zh/products/automation/openclaw/deployment' },
                                          { text: 'Security', link: '/zh/products/automation/openclaw/security' },
                                          { text: 'Skills Development', link: '/zh/products/automation/openclaw/skills' },
                                       ]
                                    },
                                    {
                                       text: 'Source Code',
                                       collapsed: false,
                                       items: [
                                          { text: 'Index', link: '/zh/products/automation/openclaw/source-code/' },
                                          { text: 'Architecture', link: '/zh/products/automation/openclaw/source-code/architecture' },
                                          { text: 'Channels', link: '/zh/products/automation/openclaw/source-code/channels' },
                                          { text: 'Agents', link: '/zh/products/automation/openclaw/source-code/agents' },
                                          { text: 'Sessions', link: '/zh/products/automation/openclaw/source-code/sessions' },
                                          { text: 'Plugins', link: '/zh/products/automation/openclaw/source-code/plugins' },
                                          { text: 'Hooks', link: '/zh/products/automation/openclaw/source-code/hooks' },
                                          { text: 'MCP', link: '/zh/products/automation/openclaw/source-code/mcp' },
                                          { text: 'ACP', link: '/zh/products/automation/openclaw/source-code/acp' },
                                          { text: 'Subagent', link: '/zh/products/automation/openclaw/source-code/subagent' },
                                       ]
                                    },
                                 ]
                              }
                           ]
                        },
                        {
                           text: 'Tools',
                           items: [
                              { text: 'Ollama', link: '/products/tools/ollama' },
                              { text: 'Figma AI', link: '/products/tools/figma-ai' },
                              { text: 'Testing AI', link: '/products/tools/testing-ai' }
                           ]
                        },
                        {
                           text: 'AI Tools',
                           link: '/ai-tools/',
                           items: [
                              { text: 'Overview', link: '/ai-tools/' },
                              { text: 'AI Efficiency Practice', link: '/ai-tools/ai-efficiency-practice' },
                              { text: 'AI Landing Discussion', link: '/ai-tools/ai-landing-discussion' },
                              { text: 'AI Native Hiring', link: '/ai-tools/ai-native-hiring' }
                           ]
                        },
                        { text: '📚 Resources', link: '/resources' }
                     ]
                  }
               ]
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
               { text: '路径', link: '/zh/paths/' },
               { text: '文档', link: '/zh/tech/' },
               { text: '秘籍', link: '/zh/cookbook/' },
               { text: 'AI 工具', link: '/zh/ai-tools/' },
               {
                  text: 'PPTs', items: [
                     { text: '1. Vibe Coding', link: 'https://ai.zenheart.site/ppts/vibe-coding/' },
                     { text: '2. Prompt + Context', link: 'https://ai.zenheart.site/ppts/prompt-context/' },
                     { text: '3. MCP + SKILL', link: 'https://ai.zenheart.site/ppts/skill-mcp/' },
                     { text: '4. AGENT', link: 'https://ai.zenheart.site/ppts/agent/' }
                  ]
               }
            ],
            sidebar: {
               '/zh/': [
                  {
                     text: '🗺️ 学习路径',
                     collapsed: false,
                     items: [
                        { text: '路径概览', link: '/zh/paths/' },
                        { text: '路径 1: 生产力', link: '/zh/paths/productivity' },
                        { text: '路径 2: 集成', link: '/zh/paths/integration' },
                        { text: '路径 3: 精通', link: '/zh/paths/mastery' }
                     ]
                  },
                  {
                     text: '🔌 集成指南',
                     collapsed: true,
                     items: [
                        {
                           text: 'API',
                           collapsed: false,
                           items: [
                              { text: '对比与成本', link: '/zh/integration/apis/' },
                              { text: 'OpenAI', link: '/zh/integration/apis/openai' },
                              { text: 'Anthropic (Claude)', link: '/zh/integration/apis/anthropic' },
                              { text: 'HuggingFace', link: '/zh/integration/apis/huggingface' },
                              { text: '流式模式', link: '/zh/integration/apis/streaming' }
                           ]
                        },
                        {
                           text: '框架',
                           collapsed: false,
                           items: [
                              { text: '概览', link: '/zh/integration/frameworks/' },
                              { text: 'Vercel AI SDK', link: '/zh/integration/frameworks/vercel-ai-sdk' },
                              { text: 'LangChain.js', link: '/zh/integration/frameworks/langchain-js' },
                              { text: 'LlamaIndex.TS', link: '/zh/integration/frameworks/llamaindex-ts' },
                              { text: 'Next.js 集成', link: '/zh/integration/frameworks/nextjs' }
                           ]
                        },
                        {
                           text: '协议',
                           items: [
                              {
                                 text: 'MCP (模型上下文协议)', link: '/zh/integration/protocols/mcp/',
                                 items: [
                                    { text: '概览', link: '/zh/integration/protocols/mcp/' },
                                    { text: '架构', link: '/zh/integration/protocols/mcp/architecture' },
                                    { text: 'MCP Apps', link: '/zh/integration/protocols/mcp/mcp-apps' },
                                    { text: 'list', link: '/zh/integration/protocols/mcp/list' }
                                 ]
                              },
                              { text: '工具调用 (Tool Calling)', link: '/zh/integration/protocols/tool-calling' }
                           ]
                        },
                        {
                           text: '前端 ML',
                           items: [
                              { text: '概览', link: '/zh/integration/frontend-ml/' },
                              { text: 'Transformers.js', link: '/zh/integration/frontend-ml/transformersjs' },
                              { text: 'TensorFlow.js', link: '/zh/integration/frontend-ml/tensorflowjs' },
                              { text: 'ml5.js', link: '/zh/integration/frontend-ml/ml5js' },
                              { text: 'ONNX Runtime', link: '/zh/integration/frontend-ml/onnx-runtime' }
                           ]
                        }
                     ]
                  },
                  {
                     text: '🧠 技术概念',
                     collapsed: true,
                     items: [
                        {
                           text: '基础',
                           items: [
                              { text: 'LLM 基础', link: '/zh/tech/fundamentals/LLM' },
                              { text: '提示工程', link: '/zh/tech/fundamentals/prompt/' },
                              { text: '上下文窗口', link: '/zh/tech/fundamentals/context' },
                              { text: '上下文工程', link: '/zh/tech/fundamentals/context-engineering' },
                              { text: 'Embeddings (嵌入)', link: '/zh/tech/fundamentals/embeddings' },
                           ]
                        },
                        {
                           text: '前端 AI',
                           items: [
                              { text: '流式 UI (Streaming)', link: '/zh/tech/frontend/streaming' },
                              { text: '生成式 UI', link: '/zh/tech/frontend/generative-ui' },
                              { text: '浏览器 AI', link: '/zh/tech/frontend/browser-ai' },
                              { text: '状态管理', link: '/zh/tech/frontend/state-management' }
                           ]
                        },
                        {
                           text: '工程化',
                           items: [
                              { text: '测试', link: '/zh/tech/engineering/testing' },
                              { text: '评估 (Evals)', link: '/zh/tech/engineering/evals' },
                              { text: '可观测性', link: '/zh/tech/engineering/observability' },
                              { text: '安全', link: '/zh/tech/engineering/security' },
                              { text: '成本优化', link: '/zh/tech/engineering/cost-optimization' }
                           ]
                        },
                        {
                           text: '模式',
                           items: [
                              { text: 'RAG', link: '/zh/tech/patterns/RAG' },
                              { text: 'Agents (智能体)', link: '/zh/tech/patterns/agent/' },
                              { text: 'Agent 模式 · Harness', link: '/zh/tech/patterns/agent/harness' },
                              { text: 'Agent 模式 · 工作流', link: '/zh/tech/patterns/agent/workflow-patterns' },
                              { text: 'Agent 模式 · Hello Agents', link: '/zh/tech/patterns/agent/hello-agents' },
                              { text: 'Agent 模式 · Agentic Engineering', link: '/zh/tech/patterns/agent/agentic-engineering-patterns' },
                              { text: 'Agent · Hooks', link: '/zh/tech/patterns/agent/hooks' },
                              { text: 'Agent · Skills', link: '/zh/tech/patterns/agent/skills' }
                           ]
                        },
                        {
                           text: 'Agent 学习',
                           items: [
                              { text: 'Agent 设计模式', link: '/zh/tech/agent/agent-design-patterns' },
                              { text: 'Agentic Engineering Patterns', link: '/zh/tech/agent/agentic-engineering-patterns' },
                              { text: 'AI Ops Agent 探索', link: '/zh/tech/agent/aiops-agent-exploration' },
                              { text: '阿里事故复盘 Agent', link: '/zh/tech/agent/alibaba-incident-review-agent' },
                              { text: 'AI Agent 常见工作流', link: '/zh/tech/agent/common-workflow-patterns-ai-agents' },
                              { text: 'Hello Agents (Datawhale)', link: '/zh/tech/agent/hello-agents-datwhale' },
                              { text: 'How I Use Claude Code', link: '/zh/tech/agent/how-i-use-claude-code' },
                              { text: 'Human in the Loop', link: '/zh/tech/agent/human-in-the-loop-patterns' },
                              { text: 'LangChain Agent Harness', link: '/zh/tech/agent/langchain-agent-harness' },
                              { text: 'Multi-Agent 编排', link: '/zh/tech/agent/multi-agent-orchestration' },
                              { text: 'OpenAI Agents SDK', link: '/zh/tech/agent/openai-agents-sdk' },
                              { text: 'Pi Agent 设计哲学', link: '/zh/tech/agent/pi-agent-design-philosophy' }
                           ]
                        },
                        {
                           text: 'Prompt 工程',
                           items: [
                              { text: '概览', link: '/zh/tech/prompt/' },
                              { text: '官方指南 2026', link: '/zh/tech/prompt/official-guide-2026' },
                              { text: 'Advanced Tool Use', link: '/zh/tech/prompt/advanced-tool-use' },
                              { text: 'Agentic Engineering Patterns', link: '/zh/tech/prompt/agentic-engineering-patterns' },
                              { text: 'Token Counting & Embedding', link: '/zh/tech/prompt/token-counting-embedding-basics' },
                              { text: 'System Prompts 集锦', link: '/zh/tech/prompt/system-prompts-collection' },
                              { text: 'JSON Prompt 最佳实践', link: '/zh/tech/prompt/json-prompt-best-practices' },
                              { text: 'Agents Doc', link: '/zh/tech/prompt/agents-doc' },
                              { text: '案例 · Copilot', link: '/zh/tech/prompt/cases/copilot' }
                           ]
                        },
                        {
                           text: 'Skills 学习',
                           items: [
                              { text: 'Claude Skills 概览', link: '/zh/tech/skills/claude-skills-overview' },
                              { text: 'Skills 机制详解', link: '/zh/tech/skills/skills-mechanics-explained' },
                              { text: 'How to Create Skills', link: '/zh/tech/skills/how-to-create-skills' },
                              { text: 'Skills 最佳实践', link: '/zh/tech/skills/skills-best-practices' }
                           ]
                        },
                        {
                           text: 'AI 编程',
                           items: [
                              { text: 'AI 编程工程化', link: '/zh/tech/ai-coding/ai-coding-engineering' },
                              { text: 'Claude Code Auto Mode 安全', link: '/zh/tech/ai-coding/claude-code-auto-mode-security' },
                              { text: '上下文注入策略', link: '/zh/tech/ai-coding/context-injection-strategies' },
                              { text: '跨工具上下文共享', link: '/zh/tech/ai-coding/cross-tool-context-sharing' },
                              { text: 'Cursor IDE 架构', link: '/zh/tech/ai-coding/cursor-ide-architecture' },
                              { text: 'Cursor Rules', link: '/zh/tech/ai-coding/cursor-rules' }
                           ]
                        },
                        {
                           text: 'AI 应用',
                           items: [
                              { text: '构建语义搜索', link: '/zh/tech/ai-application/building-semantic-search' },
                              { text: '得物 AI 实施', link: '/zh/tech/ai-application/dewu-ai-implementation' }
                           ]
                        },
                        {
                           text: '评估 (Evaluation)',
                           items: [
                              { text: 'AI 测试', link: '/zh/tech/evaluation/ai-testing' },
                              { text: '生成式基准', link: '/zh/tech/evaluation/generative-benchmarking' }
                           ]
                        },
                        {
                           text: 'MCP 学习',
                           items: [
                              { text: 'Chrome DevTools MCP', link: '/zh/tech/mcp/chrome-devtools-mcp' },
                              { text: 'MCP Apps 实践', link: '/zh/tech/mcp/mcp-apps-practice' },
                              { text: 'MCP 课程笔记', link: '/zh/tech/mcp/mcp-course-notes' }
                           ]
                        },
                        {
                           text: '方法论',
                           items: [
                              { text: 'BMAD 方法论', link: '/zh/tech/method/bmad-methodology' }
                           ]
                        },
                        {
                           text: '多模态',
                           items: [
                              { text: 'Claude 视觉能力', link: '/zh/tech/multimodal/claude-vision-capabilities' }
                           ]
                        },
                        {
                           text: '哲学',
                           items: [
                              { text: 'Vibe Coding 哲学', link: '/zh/tech/philosophy/vibe-coding-philosophy' }
                           ]
                        },
                        {
                           text: '测试',
                           items: [
                              { text: 'AI 自动化测试 · 知乎', link: '/zh/tech/testing/ai-automation-testing-zhihu' },
                              { text: ' Midscene UI 自动化', link: '/zh/tech/testing/midscene-ui-automation' }
                           ]
                        },
                        {
                           text: '训练',
                           items: [
                              { text: '概览', link: '/zh/tech/training/' },
                              { text: 'SFT (微调)', link: '/zh/tech/training/SFT' },
                              { text: 'RLHF', link: '/zh/tech/training/RLHF' },
                              { text: 'PEFT', link: '/zh/tech/training/PEFT' }
                           ]
                        }
                     ]
                  },
                  {
                     text: '🛠️ 实战项目',
                     collapsed: true,
                     items: [
                        {
                           text: '初级',
                           items: [
                              { text: 'AI 聊天机器人', link: '/zh/projects/beginner/ai-chatbot' },
                              { text: '文本摘要器', link: '/zh/projects/beginner/text-summarizer' },
                              { text: '图像生成器', link: '/zh/projects/beginner/image-generator' }
                           ]
                        },
                        {
                           text: '中级',
                           items: [
                              { text: 'RAG 搜索', link: '/zh/projects/intermediate/rag-search' },
                              { text: '代码自动补全', link: '/zh/projects/intermediate/code-completion' },
                              { text: 'AI 表单构建器', link: '/zh/projects/intermediate/ai-form-builder' },
                              { text: '语义搜索', link: '/zh/projects/intermediate/semantic-search' }
                           ]
                        },
                        {
                           text: '高级',
                           items: [
                              { text: '全栈 SaaS', link: '/zh/projects/advanced/full-stack-saas' },
                              { text: '多智能体应用', link: '/zh/projects/advanced/multi-agent-app' },
                              { text: 'AI 设计工具', link: '/zh/projects/advanced/ai-design-tool' }
                           ]
                        }
                     ]
                  },
                  {
                     text: '🍳 秘籍 (Cookbook)',
                     collapsed: true,
                     items: [
                        { text: '概览', link: '/zh/cookbook/' },
                        { text: '聊天 UI 组件', link: '/zh/cookbook/chat-ui' },
                        { text: '安全 API 代理', link: '/zh/cookbook/api-proxy' },
                        { text: '本地 Embeddings', link: '/zh/cookbook/local-embedding' },
                        { text: '表单自动补全', link: '/zh/cookbook/form-autocomplete' },
                        { text: '错误处理', link: '/zh/cookbook/error-handling' },
                        { text: '内容审查', link: '/zh/cookbook/content-moderation' }
                     ]
                  },
                  {
                     text: '🚢 部署',
                     collapsed: true,
                     items: [
                        { text: '概览', link: '/zh/deployment/' },
                        { text: 'Vercel Edge', link: '/zh/deployment/vercel-edge' },
                        { text: 'Cloudflare Workers', link: '/zh/deployment/cloudflare-workers' },
                        { text: '缓存策略', link: '/zh/deployment/caching' },
                        { text: '速率限制', link: '/zh/deployment/rate-limiting' },
                        { text: '监控', link: '/zh/deployment/monitoring' },
                        { text: '成本计算器', link: '/zh/deployment/cost-calculator' }
                     ]
                  },
                  {
                     text: '💡 应用场景',
                     collapsed: true,
                     items: [
                        { text: '案例库', link: '/zh/use-cases/' },
                        { text: '添加 AI 搜索', link: '/zh/use-cases/add-ai-search' },
                        { text: '迁移到 AI', link: '/zh/use-cases/migrate-to-ai' },
                        { text: 'AI 分析', link: '/zh/use-cases/ai-analytics' },
                        { text: '个性化推荐', link: '/zh/use-cases/recommendations' },
                        { text: '无障碍访问', link: '/zh/use-cases/accessibility' }
                     ]
                  },
                  {
                     text: '🧰 产品与工具',
                     collapsed: true,
                     items: [
                        {
                           text: '自动化',
                           items: [
                              {
                                 text: 'OpenClaw',
                                 link: '/zh/products/automation/openclaw/',
                                 items: [
                                    { text: '概述', link: '/zh/products/automation/openclaw/' },
                                    { text: '飞书接入', link: '/zh/products/automation/openclaw/feishu' },
                                    { text: '微信接入', link: '/zh/products/automation/openclaw/wechat' },
                                    { text: '企业微信接入', link: '/zh/products/automation/openclaw/wecom' },
                                    {
                                       text: '进阶指南',
                                       collapsed: false,
                                       items: [
                                          { text: 'CLI 命令参考', link: '/zh/products/automation/openclaw/cli' },
                                          { text: '部署指南', link: '/zh/products/automation/openclaw/deployment' },
                                          { text: '安全配置', link: '/zh/products/automation/openclaw/security' },
                                          { text: '技能开发', link: '/zh/products/automation/openclaw/skills' },
                                       ]
                                    },
                                    {
                                       text: '源码分析',
                                       collapsed: false,
                                       items: [
                                          { text: '索引', link: '/zh/products/automation/openclaw/source-code/' },
                                          { text: '核心架构', link: '/zh/products/automation/openclaw/source-code/architecture' },
                                          { text: '通道接入', link: '/zh/products/automation/openclaw/source-code/channels' },
                                          { text: '智能体引擎', link: '/zh/products/automation/openclaw/source-code/agents' },
                                          { text: '会话管理', link: '/zh/products/automation/openclaw/source-code/sessions' },
                                          { text: '插件系统', link: '/zh/products/automation/openclaw/source-code/plugins' },
                                          { text: '钩子机制', link: '/zh/products/automation/openclaw/source-code/hooks' },
                                          { text: 'MCP 协议', link: '/zh/products/automation/openclaw/source-code/mcp' },
                                          { text: 'ACP 协议', link: '/zh/products/automation/openclaw/source-code/acp' },
                                          { text: 'Subagent', link: '/zh/products/automation/openclaw/source-code/subagent' },
                                       ]
                                    },
                                 ]
                              },
                           ]
                        },
                        {
                           text: 'AI 编程',
                           link: '/zh/products/ai-coding/',
                           items: [

                              {
                                 text: 'Claude', link: '/zh/products/ai-coding/claude/', items: [
                                    { text: '🗺️ 学习地图', link: '/zh/products/ai-coding/claude/' },
                                    {
                                       text: '核心产品',
                                       collapsed: false,
                                       items: [
                                          { text: 'Claude.ai 平台', link: '/zh/products/ai-coding/claude/claude-ai' },
                                          { text: 'Claude Code CLI', link: '/zh/products/ai-coding/claude/claude-code' },
                                          { text: 'Claude Code 实战 Cookbook', link: '/zh/products/ai-coding/claude/claude-code-cookbook' },
                                       ]
                                    },
                                    {
                                       text: '更多产品与扩展',
                                       collapsed: true,
                                       items: [
                                          { text: 'Connectors 连接器', link: '/zh/products/ai-coding/claude/connectors' },
                                          { text: 'Claude Design', link: '/zh/products/ai-coding/claude/claude-design' },
                                          { text: 'Cowork 桌面代理', link: '/zh/products/ai-coding/claude/cowork' },
                                          { text: 'Plugin 开发', link: '/zh/products/ai-coding/claude/plugin' },
                                       ]
                                    },
                                    {
                                       text: '速查与参考',
                                       collapsed: false,
                                       items: [
                                          { text: 'Cheatsheet 速查表', link: '/zh/products/ai-coding/claude/claude-code-cheatsheet' },
                                          { text: '术语表 Glossary', link: '/zh/products/ai-coding/claude/claude-code-glossary' },
                                       ]
                                    },
                                 ]
                              },
                              { text: 'Cursor', link: '/zh/products/ai-coding/cursor' },
                              { text: 'Copilot', link: '/zh/products/ai-coding/copilot' },
                              {
                                 text: 'Codex', link: '/zh/products/ai-coding/codex/', items: [
                                    { text: '🗺️ 学习地图', link: '/zh/products/ai-coding/codex/' },
                                    { text: 'ChatGPT Plus', link: '/zh/products/ai-coding/codex/chatgpt-plus' },
                                    { text: 'Codex CLI', link: '/zh/products/ai-coding/codex/codex-cli' },
                                    { text: 'Codex AI', link: '/zh/products/ai-coding/codex/codex-ai' },
                                    { text: '项目集成', link: '/zh/products/ai-coding/codex/integration' },
                                    { text: '速查表', link: '/zh/products/ai-coding/codex/cheatsheet' },
                                 ]
                              },
                              {
                                 text: 'Gemini', link: '/zh/products/ai-coding/gemini/', items: [
                                    { text: '🗺️ 学习地图', link: '/zh/products/ai-coding/gemini/' },
                                    { text: 'Google AI Pro 详解', link: '/zh/products/ai-coding/gemini/google-pro' },
                                    { text: 'Gemini CLI', link: '/zh/products/ai-coding/gemini/gemini-cli' },
                                    { text: 'AI Studio', link: '/zh/products/ai-coding/gemini/ai-studio' },
                                    { text: 'Antigravity', link: '/zh/products/ai-coding/gemini/antigravity' },
                                    { text: 'Canvas', link: '/zh/products/ai-coding/gemini/canvas' },
                                    { text: 'Code Assist', link: '/zh/products/ai-coding/gemini/code-assist' },
                                    { text: 'Jules', link: '/zh/products/ai-coding/gemini/jules' },
                                 ]
                              },
                              {
                                 text: 'Grok', link: '/zh/products/ai-coding/grok/', items: [
                                    { text: '🗺️ 学习地图', link: '/zh/products/ai-coding/grok/' },
                                    {
                                       text: '核心产品',
                                       collapsed: false,
                                       items: [
                                          { text: 'Grok Build 教程', link: '/zh/products/ai-coding/grok/grok-cli' },
                                          { text: '实战 Cookbook', link: '/zh/products/ai-coding/grok/grok-cookbook' },
                                       ]
                                    },
                                    {
                                       text: '更多产品',
                                       collapsed: true,
                                       items: [
                                          { text: 'Grok 聊天', link: '/zh/products/ai-coding/grok/grok-chat' },
                                          { text: 'Imagine', link: '/zh/products/ai-coding/grok/grok-imagine' },
                                          { text: 'Voice', link: '/zh/products/ai-coding/grok/grok-voice' },
                                          { text: 'Connectors', link: '/zh/products/ai-coding/grok/grok-connectors' },
                                          { text: 'Grok Bot', link: '/zh/products/ai-coding/grok/grok-bot' },
                                          { text: 'Business & Enterprise', link: '/zh/products/ai-coding/grok/grok-business' },
                                       ]
                                    },
                                    {
                                       text: '速查与参考',
                                       collapsed: false,
                                       items: [
                                          { text: '速查表', link: '/zh/products/ai-coding/grok/grok-cheatsheet' },
                                          { text: '术语表', link: '/zh/products/ai-coding/grok/grok-glossary' },
                                       ]
                                    },
                                 ]
                              },
                              { text: 'Vibe Coding 报告', link: '/zh/products/ai-coding/reporter' },
                              { text: '其他工具', link: '/zh/products/ai-coding/othertools' },
                              { text: '采购与实施方案', link: '/zh/products/ai-coding/procurement-plan' },
                              { text: 'Pi Coding Agent', link: '/zh/products/ai-coding/pi-coding-agent' }
                           ]
                        },
                        {
                           text: 'Skills 学习',
                           link: '/zh/skills/',
                           items: [
                              { text: '概览', link: '/zh/skills/' },
                              { text: 'Engineer Skill', link: '/zh/skills/engineer-skill' },
                              { text: 'OpenSpec', link: '/zh/skills/openspec' },
                              { text: 'Superpower', link: '/zh/skills/superpower' }
                           ]
                        },
                        {
                           text: 'AI 工具',
                           link: '/zh/ai-tools/',
                           items: [
                              { text: '概览', link: '/zh/ai-tools/' },
                              { text: 'Claude Code Auto Mode', link: '/zh/ai-tools/claude-code-auto-mode' },
                              { text: 'Claude Skills 深入', link: '/zh/ai-tools/claude-skills-deep-dive' },
                              { text: 'How to Create Skills', link: '/zh/ai-tools/how-to-create-skills' },
                              { text: 'Skills Mechanics Explained', link: '/zh/ai-tools/skills-mechanics-explained' },
                              { text: 'Skills 社区反馈', link: '/zh/ai-tools/skills-community-feedback' },
                              { text: 'Context Engineering 深入', link: '/zh/ai-tools/context-engineering-deep-dive' }
                           ]
                        },
                        {
                           text: '工具',
                           items: [
                              { text: 'Ollama', link: '/zh/products/tools/ollama' },
                              { text: 'Figma AI', link: '/zh/products/tools/figma-ai' },
                              { text: 'Testing AI', link: '/zh/products/tools/testing-ai' }
                           ]
                        },
                        { text: '📚 资源', link: '/zh/resources' }
                     ]
                  }
               ]
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

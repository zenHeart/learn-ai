/** AI Coding product sidebars. Keep config.mjs under 1000 lines. */
export const enAiCodingItems = [
                              { text: 'All products', link: '/products/' },
                              {
                                 text: 'Cursor', link: '/products/cursor/', items: [
                                    { text: '🗺️ Learning Map', link: '/products/cursor/' },
                                    {
                                       text: 'Core Products',
                                       collapsed: false,
                                       items: [
                                          { text: 'Cursor Tutorial', link: '/products/cursor/cursor' },
                                          { text: 'Cursor Cookbook', link: '/products/cursor/cursor-cookbook' },
                                          { text: 'Design Mode', link: '/products/cursor/design-mode' },
                                          { text: 'Cloud Agents', link: '/products/cursor/cloud-agents' },
                                          { text: 'Cursor CLI', link: '/products/cursor/cursor-cli' },
                                       ]
                                    },
                                    {
                                       text: 'More Products & Extensions',
                                       collapsed: true,
                                       items: [
                                          { text: 'Origin', link: '/products/cursor/origin' },
                                          { text: 'Security Agents', link: '/products/cursor/security-agents' },
                                          { text: 'PR Routing & Approval', link: '/products/cursor/pr-routing' },
                                          { text: 'Cursor SDK', link: '/products/cursor/cursor-sdk' },
                                       ]
                                    },
                                    {
                                       text: 'Reference & Cheatsheets',
                                       collapsed: false,
                                       items: [
                                          { text: 'Cheatsheet', link: '/products/cursor/cursor-cheatsheet' },
                                          { text: 'Glossary', link: '/products/cursor/cursor-glossary' },
                                       ]
                                    },
                                 ]
                              },
                              {
                                 text: 'Copilot', link: '/products/copilot/', items: [
                                    { text: '🗺️ Learning Map', link: '/products/copilot/' },
                                    {
                                       text: 'Core',
                                       collapsed: false,
                                       items: [
                                          { text: 'Getting Started', link: '/products/copilot/copilot' },
                                          { text: 'Cookbook', link: '/products/copilot/copilot-cookbook' },
                                       ]
                                    },
                                    {
                                       text: 'Reference & Cheatsheets',
                                       collapsed: false,
                                       items: [
                                          { text: 'Cheatsheet', link: '/products/copilot/copilot-cheatsheet' },
                                          { text: 'Glossary', link: '/products/copilot/copilot-glossary' },
                                       ]
                                    },
                                 ]
                              },
                              {
                                 text: 'Claude', link: '/products/claude/', items: [
                                    { text: '🗺️ Learning Map', link: '/products/claude/' },
                                    {
                                       text: 'Core Products',
                                       collapsed: false,
                                       items: [
                                          { text: 'Claude.ai Platform', link: '/products/claude/claude-ai' },
                                          { text: 'Claude Code CLI', link: '/products/claude/claude-code' },
                                          { text: 'Claude Code Cookbook', link: '/products/claude/claude-code-cookbook' },
                                       ]
                                    },
                                    {
                                       text: 'More Products & Extensions',
                                       collapsed: true,
                                       items: [
                                          { text: 'Connectors', link: '/products/claude/connectors' },
                                          { text: 'Claude Design', link: '/products/claude/claude-design' },
                                          { text: 'Cowork Desktop Agent', link: '/products/claude/cowork' },
                                          { text: 'Plugin Development', link: '/products/claude/plugin' },
                                       ]
                                    },
                                    {
                                       text: 'Reference & Cheatsheets',
                                       collapsed: false,
                                       items: [
                                          { text: 'Cheatsheet', link: '/products/claude/claude-code-cheatsheet' },
                                          { text: 'Glossary', link: '/products/claude/claude-code-glossary' },
                                       ]
                                    },
                                 ]
                              },
                              {
                                 text: 'Codex', link: '/products/codex/', items: [
                                    { text: '🗺️ Learning Map', link: '/products/codex/' },
                                    {
                                       text: 'Core Products',
                                       collapsed: false,
                                       items: [
                                          { text: 'Codex CLI', link: '/products/codex/codex-cli' },
                                          { text: 'Codex Cookbook', link: '/products/codex/codex-cookbook' },
                                          { text: 'Codex Product Line', link: '/products/codex/codex-ai' },
                                       ]
                                    },
                                    {
                                       text: 'More Products & Extensions',
                                       collapsed: true,
                                       items: [
                                          { text: 'ChatGPT Work', link: '/products/codex/chatgpt-work' },
                                          { text: 'ChatGPT Plans & Access', link: '/products/codex/chatgpt-plus' },
                                          { text: 'Project Integration', link: '/products/codex/integration' },
                                          { text: 'Codex Cloud', link: '/products/codex/codex-cloud' },
                                          { text: 'Codex IDE', link: '/products/codex/codex-ide' },
                                          { text: 'Codex Remote', link: '/products/codex/codex-remote' },
                                          { text: 'Codex Security', link: '/products/codex/codex-security' },
                                          { text: 'Sites', link: '/products/codex/sites' },
                                          { text: 'Chrome Extension', link: '/products/codex/codex-chrome' },
                                       ]
                                    },
                                    {
                                       text: 'Quick Reference',
                                       collapsed: false,
                                       items: [
                                          { text: 'Cheatsheet', link: '/products/codex/codex-cheatsheet' },
                                          { text: 'Glossary', link: '/products/codex/codex-glossary' },
                                       ]
                                    },
                                 ]
                              },
                              {
                                 text: 'Gemini', link: '/products/gemini/', items: [
                                    { text: '🗺️ Learning Map', link: '/products/gemini/' },
                                    {
                                       text: 'Core Products',
                                       collapsed: false,
                                       items: [
                                          { text: 'Gemini CLI', link: '/products/gemini/gemini-cli' },
                                          { text: 'Antigravity', link: '/products/gemini/antigravity' },
                                          { text: 'Jules', link: '/products/gemini/jules' },
                                          { text: 'Cookbook', link: '/products/gemini/gemini-cookbook' },
                                       ]
                                    },
                                    {
                                       text: 'More Products & Extensions',
                                       collapsed: true,
                                       items: [
                                          { text: 'Canvas', link: '/products/gemini/canvas' },
                                          { text: 'Google Flow', link: '/products/gemini/flow' },
                                          { text: 'Code Assist', link: '/products/gemini/code-assist' },
                                          { text: 'AI Studio', link: '/products/gemini/ai-studio' },
                                          { text: 'Subscriptions & Quota', link: '/products/gemini/google-pro' },
                                       ]
                                    },
                                    {
                                       text: 'Reference & Cheatsheets',
                                       collapsed: false,
                                       items: [
                                          { text: 'Cheatsheet', link: '/products/gemini/gemini-cheatsheet' },
                                          { text: 'Glossary', link: '/products/gemini/gemini-glossary' },
                                       ]
                                    },
                                 ]
                              },
                              {
                                 text: 'Grok', link: '/products/grok/', items: [
                                    { text: '🗺️ Learning Map', link: '/products/grok/' },
                                    {
                                       text: 'Core Products',
                                       collapsed: false,
                                       items: [
                                          { text: 'Grok Build Tutorial', link: '/products/grok/grok-cli' },
                                          { text: 'Cookbook', link: '/products/grok/grok-cookbook' },
                                       ]
                                    },
                                    {
                                       text: 'More Products',
                                       collapsed: true,
                                       items: [
                                          { text: 'Grok Chat', link: '/products/grok/grok-chat' },
                                          { text: 'Imagine', link: '/products/grok/grok-imagine' },
                                          { text: 'Voice', link: '/products/grok/grok-voice' },
                                          { text: 'Connectors', link: '/products/grok/grok-connectors' },
                                          { text: 'Grok Bot', link: '/products/grok/grok-bot' },
                                          { text: 'Business & Enterprise', link: '/products/grok/grok-business' },
                                       ]
                                    },
                                    {
                                       text: 'Reference',
                                       collapsed: false,
                                       items: [
                                          { text: 'Cheatsheet', link: '/products/grok/grok-cheatsheet' },
                                          { text: 'Glossary', link: '/products/grok/grok-glossary' },
                                       ]
                                    },
                                 ]
                              },
                              { text: 'Pi Agent', link: '/products/pi-agent' },
                              { text: 'Other Tools', link: '/products/othertools' },
]

export const zhAiCodingItems = [
                              {
                                 text: 'Claude', link: '/zh/products/claude/', items: [
                                    { text: '🗺️ 学习地图', link: '/zh/products/claude/' },
                                    {
                                       text: '核心产品',
                                       collapsed: false,
                                       items: [
                                          { text: 'Claude.ai 平台', link: '/zh/products/claude/claude-ai' },
                                          { text: 'Claude Code CLI', link: '/zh/products/claude/claude-code' },
                                          { text: 'Claude Code 实战 Cookbook', link: '/zh/products/claude/claude-code-cookbook' },
                                       ]
                                    },
                                    {
                                       text: '更多产品与扩展',
                                       collapsed: true,
                                       items: [
                                          { text: 'Connectors 连接器', link: '/zh/products/claude/connectors' },
                                          { text: 'Claude Design', link: '/zh/products/claude/claude-design' },
                                          { text: 'Cowork 桌面代理', link: '/zh/products/claude/cowork' },
                                          { text: 'Plugin 开发', link: '/zh/products/claude/plugin' },
                                       ]
                                    },
                                    {
                                       text: '速查与参考',
                                       collapsed: false,
                                       items: [
                                          { text: 'Cheatsheet 速查表', link: '/zh/products/claude/claude-code-cheatsheet' },
                                          { text: '术语表 Glossary', link: '/zh/products/claude/claude-code-glossary' },
                                       ]
                                    },
                                 ]
                              },
                              {
                                 text: 'Cursor', link: '/zh/products/cursor/', items: [
                                    { text: '🗺️ 学习地图', link: '/zh/products/cursor/' },
                                    {
                                       text: '核心产品',
                                       collapsed: false,
                                       items: [
                                          { text: 'Cursor 教程', link: '/zh/products/cursor/cursor' },
                                          { text: 'Cursor 实战 Cookbook', link: '/zh/products/cursor/cursor-cookbook' },
                                          { text: 'Design Mode', link: '/zh/products/cursor/design-mode' },
                                          { text: 'Cloud Agents', link: '/zh/products/cursor/cloud-agents' },
                                          { text: 'Cursor CLI', link: '/zh/products/cursor/cursor-cli' },
                                       ]
                                    },
                                    {
                                       text: '更多产品与扩展',
                                       collapsed: true,
                                       items: [
                                          { text: 'Origin', link: '/zh/products/cursor/origin' },
                                          { text: 'Security Agents', link: '/zh/products/cursor/security-agents' },
                                          { text: 'PR Routing & Approval', link: '/zh/products/cursor/pr-routing' },
                                          { text: 'Cursor SDK', link: '/zh/products/cursor/cursor-sdk' },
                                       ]
                                    },
                                    {
                                       text: '速查与参考',
                                       collapsed: false,
                                       items: [
                                          { text: 'Cheatsheet 速查表', link: '/zh/products/cursor/cursor-cheatsheet' },
                                          { text: '术语表 Glossary', link: '/zh/products/cursor/cursor-glossary' },
                                       ]
                                    },
                                 ]
                              },
                              {
                                 text: 'Copilot', link: '/zh/products/copilot/', items: [
                                    { text: '🗺️ 学习地图', link: '/zh/products/copilot/' },
                                    {
                                       text: '核心产品',
                                       collapsed: false,
                                       items: [
                                          { text: '上手教程', link: '/zh/products/copilot/copilot' },
                                          { text: '实战 Cookbook', link: '/zh/products/copilot/copilot-cookbook' },
                                       ]
                                    },
                                    {
                                       text: '速查与参考',
                                       collapsed: false,
                                       items: [
                                          { text: 'Cheatsheet 速查表', link: '/zh/products/copilot/copilot-cheatsheet' },
                                          { text: '术语表 Glossary', link: '/zh/products/copilot/copilot-glossary' },
                                       ]
                                    },
                                 ]
                              },
                              {
                                 text: 'Codex', link: '/zh/products/codex/', items: [
                                    { text: '🗺️ 学习地图', link: '/zh/products/codex/' },
                                    {
                                       text: '核心产品',
                                       collapsed: false,
                                       items: [
                                          { text: 'Codex CLI', link: '/zh/products/codex/codex-cli' },
                                          { text: 'Codex 实战 Cookbook', link: '/zh/products/codex/codex-cookbook' },
                                          { text: 'Codex AI', link: '/zh/products/codex/codex-ai' },
                                       ]
                                    },
                                    {
                                       text: '更多产品与扩展',
                                       collapsed: true,
                                       items: [
                                          { text: 'ChatGPT Work', link: '/zh/products/codex/chatgpt-work' },
                                          { text: 'ChatGPT 套餐与访问', link: '/zh/products/codex/chatgpt-plus' },
                                          { text: '项目集成', link: '/zh/products/codex/integration' },
                                          { text: 'Codex Cloud', link: '/zh/products/codex/codex-cloud' },
                                          { text: 'Codex IDE', link: '/zh/products/codex/codex-ide' },
                                          { text: 'Codex Remote', link: '/zh/products/codex/codex-remote' },
                                          { text: 'Codex Security', link: '/zh/products/codex/codex-security' },
                                          { text: 'Sites', link: '/zh/products/codex/sites' },
                                          { text: 'Chrome 扩展', link: '/zh/products/codex/codex-chrome' },
                                       ]
                                    },
                                    {
                                       text: '速查与参考',
                                       collapsed: false,
                                       items: [
                                          { text: 'Cheatsheet 速查表', link: '/zh/products/codex/codex-cheatsheet' },
                                          { text: '术语表 Glossary', link: '/zh/products/codex/codex-glossary' },
                                       ]
                                    },
                                 ]
                              },
                              {
                                 text: 'Gemini', link: '/zh/products/gemini/', items: [
                                    { text: '🗺️ 学习地图', link: '/zh/products/gemini/' },
                                    {
                                       text: '核心产品', collapsed: false, items: [
                                          { text: 'Gemini CLI', link: '/zh/products/gemini/gemini-cli' },
                                          { text: 'Antigravity', link: '/zh/products/gemini/antigravity' },
                                          { text: 'Jules', link: '/zh/products/gemini/jules' },
                                          { text: 'Cookbook', link: '/zh/products/gemini/gemini-cookbook' },
                                       ]
                                    },
                                    {
                                       text: '更多产品与扩展', collapsed: true, items: [
                                          { text: 'Canvas', link: '/zh/products/gemini/canvas' },
                                          { text: 'Google Flow', link: '/zh/products/gemini/flow' },
                                          { text: 'Code Assist', link: '/zh/products/gemini/code-assist' },
                                          { text: 'AI Studio', link: '/zh/products/gemini/ai-studio' },
                                          { text: 'Google AI 订阅与额度', link: '/zh/products/gemini/google-pro' },
                                       ]
                                    },
                                    {
                                       text: '速查与参考', collapsed: false, items: [
                                          { text: '速查表', link: '/zh/products/gemini/gemini-cheatsheet' },
                                          { text: '术语表', link: '/zh/products/gemini/gemini-glossary' },
                                       ]
                                    },
                                 ]
                              },
                              {
                                 text: 'Grok', link: '/zh/products/grok/', items: [
                                    { text: '🗺️ 学习地图', link: '/zh/products/grok/' },
                                    {
                                       text: '核心产品',
                                       collapsed: false,
                                       items: [
                                          { text: 'Grok Build 教程', link: '/zh/products/grok/grok-cli' },
                                          { text: '实战 Cookbook', link: '/zh/products/grok/grok-cookbook' },
                                       ]
                                    },
                                    {
                                       text: '更多产品',
                                       collapsed: true,
                                       items: [
                                          { text: 'Grok 聊天', link: '/zh/products/grok/grok-chat' },
                                          { text: 'Imagine', link: '/zh/products/grok/grok-imagine' },
                                          { text: 'Voice', link: '/zh/products/grok/grok-voice' },
                                          { text: 'Connectors', link: '/zh/products/grok/grok-connectors' },
                                          { text: 'Grok Bot', link: '/zh/products/grok/grok-bot' },
                                          { text: 'Business & Enterprise', link: '/zh/products/grok/grok-business' },
                                       ]
                                    },
                                    {
                                       text: '速查与参考',
                                       collapsed: false,
                                       items: [
                                          { text: '速查表', link: '/zh/products/grok/grok-cheatsheet' },
                                          { text: '术语表', link: '/zh/products/grok/grok-glossary' },
                                       ]
                                    },
                                 ]
                              },
                              { text: '其他工具', link: '/zh/products/othertools' },
                              { text: 'Pi Coding Agent', link: '/zh/products/pi-coding-agent' }
]

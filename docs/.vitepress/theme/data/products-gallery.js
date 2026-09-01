/**
 * 产品落地页货架。一句话价值，链到本站文档，不是外部官网。
 * 分类是给人筛选用的标签，不是文件夹。
 */

export const productGalleryEn = [
  {
    name: 'Coding agents',
    icon: '💻',
    tools: [
      { name: 'Cursor', desc: 'Agent in the editor: Tab, chat, and repo edits.', url: '/products/cursor/', icon: '⚡', tags: ['editor', 'coding-agent'] },
      { name: 'GitHub Copilot', desc: 'Autocomplete and chat inside VS Code and GitHub.', url: '/products/copilot/', icon: '🤖', tags: ['editor', 'coding-agent'] },
      { name: 'Claude', desc: 'Claude.ai, Claude Code CLI, Design, and Cowork.', url: '/products/claude/', icon: '🔧', tags: ['cli', 'coding-agent'] },
      { name: 'Codex', desc: 'OpenAI coding agent: CLI, IDE, and cloud.', url: '/products/codex/', icon: '📦', tags: ['cli', 'coding-agent'] },
      { name: 'Gemini', desc: 'Gemini CLI, Antigravity, Jules, and AI Studio.', url: '/products/gemini/', icon: '✨', tags: ['cli', 'coding-agent'] },
      { name: 'Grok', desc: 'xAI terminal agent and Grok Build.', url: '/products/grok/', icon: '🚀', tags: ['cli', 'coding-agent'] },
      { name: 'Pi Agent', desc: 'A small coding-agent harness.', url: '/products/pi-agent.html', icon: '🥧', tags: ['harness', 'coding-agent'] }
    ]
  },
  {
    name: 'Local & design',
    icon: '🛠️',
    tools: [
      { name: 'Ollama', desc: 'Run models locally.', url: '/products/ollama.html', icon: '🦙', tags: ['local-llm'] },
      { name: 'Figma AI', desc: 'AI features inside Figma.', url: '/products/figma-ai.html', icon: '🎨', tags: ['design'] },
      { name: 'Testing AI', desc: 'AI-assisted testing tools.', url: '/products/testing-ai.html', icon: '🧪', tags: ['testing'] }
    ]
  },
  {
    name: 'More',
    icon: '📚',
    tools: [
      { name: 'Other tools', desc: 'More coding assistants we do not treat as first-class sets.', url: '/products/othertools.html', icon: '➕', tags: ['directory'] },
      { name: 'OpenClaw', desc: 'Self-hosted agent runtime (Chinese handbook).', url: '/zh/products/openclaw/', icon: '🦞', tags: ['agent-runtime'] }
    ]
  }
]

export const productGalleryZh = [
  {
    name: '编程助手',
    icon: '💻',
    tools: [
      { name: 'Cursor', desc: '编辑器里的 Agent：补全、对话、改仓库。', url: '/zh/products/cursor/', icon: '⚡', tags: ['editor', 'coding-agent'] },
      { name: 'GitHub Copilot', desc: 'VS Code 和 GitHub 里的补全与对话。', url: '/zh/products/copilot/', icon: '🤖', tags: ['editor', 'coding-agent'] },
      { name: 'Claude', desc: 'Claude.ai、Claude Code、Design、Cowork。', url: '/zh/products/claude/', icon: '🔧', tags: ['cli', 'coding-agent'] },
      { name: 'Codex', desc: 'OpenAI 编程助手：CLI、IDE、云端。', url: '/zh/products/codex/', icon: '📦', tags: ['cli', 'coding-agent'] },
      { name: 'Gemini', desc: 'Gemini CLI、Antigravity、Jules、AI Studio。', url: '/zh/products/gemini/', icon: '✨', tags: ['cli', 'coding-agent'] },
      { name: 'Grok', desc: 'xAI 终端助手和 Grok Build。', url: '/zh/products/grok/', icon: '🚀', tags: ['cli', 'coding-agent'] },
      { name: 'Pi Agent', desc: '极简 coding agent harness。', url: '/zh/products/pi-coding-agent.html', icon: '🥧', tags: ['harness', 'coding-agent'] }
    ]
  },
  {
    name: '本地与设计',
    icon: '🛠️',
    tools: [
      { name: 'Ollama', desc: '本机跑模型。', url: '/zh/products/ollama.html', icon: '🦙', tags: ['local-llm'] },
      { name: 'Figma AI', desc: 'Figma 里的 AI 能力。', url: '/zh/products/figma-ai.html', icon: '🎨', tags: ['design'] },
      { name: 'Testing AI', desc: 'AI 辅助测试工具。', url: '/zh/products/testing-ai.html', icon: '🧪', tags: ['testing'] }
    ]
  },
  {
    name: '更多',
    icon: '📚',
    tools: [
      { name: '其他工具', desc: '未单独成套的编程助手一览。', url: '/zh/products/othertools.html', icon: '➕', tags: ['directory'] },
      { name: 'OpenClaw', desc: '自托管 Agent 运行时。', url: '/zh/products/openclaw/', icon: '🦞', tags: ['agent-runtime'] }
    ]
  }
]

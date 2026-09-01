import { enAiCodingItems, zhAiCodingItems } from './ai-coding.mjs'

const enOpenClaw = {
  text: 'OpenClaw',
  link: '/zh/products/openclaw/',
  items: [
    { text: 'Overview', link: '/zh/products/openclaw/' },
    { text: 'Feishu', link: '/zh/products/openclaw/feishu' },
    { text: 'WeChat', link: '/zh/products/openclaw/wechat' },
    { text: 'WeCom', link: '/zh/products/openclaw/wecom' },
    {
      text: 'Guides',
      collapsed: true,
      items: [
        { text: 'CLI', link: '/zh/products/openclaw/cli' },
        { text: 'Deployment', link: '/zh/products/openclaw/deployment' },
        { text: 'Security', link: '/zh/products/openclaw/security' },
        { text: 'Skills', link: '/zh/products/openclaw/skills' }
      ]
    },
    {
      text: 'Source',
      collapsed: true,
      items: [
        { text: 'Index', link: '/zh/products/openclaw/source-code/' },
        { text: 'Architecture', link: '/zh/products/openclaw/source-code/architecture' },
        { text: 'Channels', link: '/zh/products/openclaw/source-code/channels' },
        { text: 'Agents', link: '/zh/products/openclaw/source-code/agents' },
        { text: 'Sessions', link: '/zh/products/openclaw/source-code/sessions' },
        { text: 'Plugins', link: '/zh/products/openclaw/source-code/plugins' },
        { text: 'Hooks', link: '/zh/products/openclaw/source-code/hooks' },
        { text: 'MCP', link: '/zh/products/openclaw/source-code/mcp' },
        { text: 'ACP', link: '/zh/products/openclaw/source-code/acp' }
      ]
    }
  ]
}

const zhOpenClaw = {
  text: 'OpenClaw',
  link: '/zh/products/openclaw/',
  items: [
    { text: '概述', link: '/zh/products/openclaw/' },
    { text: '飞书接入', link: '/zh/products/openclaw/feishu' },
    { text: '微信接入', link: '/zh/products/openclaw/wechat' },
    { text: '企业微信接入', link: '/zh/products/openclaw/wecom' },
    {
      text: '进阶指南',
      collapsed: true,
      items: [
        { text: 'CLI', link: '/zh/products/openclaw/cli' },
        { text: '部署', link: '/zh/products/openclaw/deployment' },
        { text: '安全', link: '/zh/products/openclaw/security' },
        { text: '技能开发', link: '/zh/products/openclaw/skills' }
      ]
    },
    {
      text: '源码分析',
      collapsed: true,
      items: [
        { text: '索引', link: '/zh/products/openclaw/source-code/' },
        { text: '核心架构', link: '/zh/products/openclaw/source-code/architecture' },
        { text: '通道接入', link: '/zh/products/openclaw/source-code/channels' },
        { text: '智能体引擎', link: '/zh/products/openclaw/source-code/agents' },
        { text: '会话管理', link: '/zh/products/openclaw/source-code/sessions' },
        { text: '插件系统', link: '/zh/products/openclaw/source-code/plugins' },
        { text: '钩子机制', link: '/zh/products/openclaw/source-code/hooks' },
        { text: 'MCP 协议', link: '/zh/products/openclaw/source-code/mcp' },
        { text: 'ACP 协议', link: '/zh/products/openclaw/source-code/acp' }
      ]
    }
  ]
}

export const enProductSidebar = [
  {
    text: 'Products',
    items: [
      ...enAiCodingItems,
      enOpenClaw,
      { text: 'Ollama', link: '/products/ollama' },
      { text: 'Figma AI', link: '/products/figma-ai' },
      { text: 'Testing AI', link: '/products/testing-ai' }
    ]
  }
]

export const zhProductSidebar = [
  {
    text: '产品',
    items: [
      { text: '全部产品', link: '/zh/products/' },
      ...zhAiCodingItems,
      zhOpenClaw,
      { text: 'Ollama', link: '/zh/products/ollama' },
      { text: 'Figma AI', link: '/zh/products/figma-ai' },
      { text: 'Testing AI', link: '/zh/products/testing-ai' }
    ]
  }
]

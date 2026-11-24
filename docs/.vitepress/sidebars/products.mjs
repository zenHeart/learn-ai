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

// Agent workspaces (T3 Code, Cindy) and remote-access tools (Tailscale, UU Remote)
// sit next to the coding-agent families but live outside the product ledger.
const workspaceFamilies = (zh) => {
  const p = zh ? '/zh' : ''
  const t = (cn, en) => (zh ? cn : en)
  return [
    {
      text: 'T3 Code', link: `${p}/products/t3code/`, items: [
        { text: t('🗺️ 学习地图', '🗺️ Learning Map'), link: `${p}/products/t3code/` },
        { text: t('上手教程', 'Tutorial'), link: `${p}/products/t3code/t3code` },
        { text: t('源码解读', 'Source Code'), link: `${p}/products/t3code/source` }
      ]
    },
    {
      text: 'Cindy', link: `${p}/products/cindy/`, items: [
        { text: t('🗺️ 学习地图', '🗺️ Learning Map'), link: `${p}/products/cindy/` },
        { text: t('上手教程', 'Tutorial'), link: `${p}/products/cindy/cindy` },
        { text: t('源码解读', 'Source Code'), link: `${p}/products/cindy/source` }
      ]
    }
  ]
}

const remoteFamilies = (zh) => {
  const p = zh ? '/zh' : ''
  const t = (cn, en) => (zh ? cn : en)
  return [
    {
      text: 'Tailscale', link: `${p}/products/tailscale/`, items: [
        { text: t('🗺️ 学习地图', '🗺️ Learning Map'), link: `${p}/products/tailscale/` },
        { text: t('上手教程', 'Tutorial'), link: `${p}/products/tailscale/tailscale` },
        { text: t('源码解读', 'Source Code'), link: `${p}/products/tailscale/source` }
      ]
    },
    {
      text: t('UU 远程', 'UU Remote'), link: `${p}/products/uu-remote/`, items: [
        { text: t('🗺️ 学习地图', '🗺️ Learning Map'), link: `${p}/products/uu-remote/` },
        { text: t('上手教程', 'Tutorial'), link: `${p}/products/uu-remote/uu-remote` }
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
      // T3 Code, Cindy, Tailscale and UU Remote are Chinese-only so far; add
      // workspaceFamilies(false) and remoteFamilies(false) once their pages exist.
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
      ...workspaceFamilies(true),
      zhOpenClaw,
      { text: 'REA 源码级解读', link: '/zh/products/rea/' },
      ...remoteFamilies(true),
      { text: 'Ollama', link: '/zh/products/ollama' },
      { text: 'Figma AI', link: '/zh/products/figma-ai' },
      { text: 'Testing AI', link: '/zh/products/testing-ai' }
    ]
  }
]

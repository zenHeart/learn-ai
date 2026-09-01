// Tech sidebar — pyramid mainline (Issue #116).
// One nav axis only: how capability turns intent into outcome (layer 0→5).
// Vendor/framework pages live under Products; scenario routes under Paths.

export const enTechSidebar = [
  {
    text: 'Map',
    items: [
      { text: 'Tech map · where to start', link: '/tech/' },
      { text: 'Complexity decision ladder', link: '/tech/00-orientation/complexity-ladder' },
      { text: 'Site boundaries & ownership', link: '/tech/00-orientation/site-boundaries' },
      { text: 'Model lifecycle (bridge)', link: '/tech/00-orientation/model-lifecycle-bridge' }
    ]
  },
  {
    text: 'L1 · Interaction Contracts',
    collapsed: false,
    items: [
      { text: 'Layer guide', link: '/tech/01-contracts/' },
      { text: 'Prompt engineering', link: '/tech/01-contracts/prompt' },
      { text: 'Context engineering', link: '/tech/01-contracts/context' },
      { text: 'Structured output', link: '/tech/01-contracts/structured-output' },
      { text: 'Tool calling contract', link: '/tech/01-contracts/tool-calling' }
    ]
  },
  {
    text: 'L2 · Application Integration',
    collapsed: false,
    items: [
      { text: 'Layer guide', link: '/tech/02-integration/' },
      { text: 'Model API contract', link: '/tech/02-integration/model-api' },
      { text: 'Streaming', link: '/tech/02-integration/streaming' },
      { text: 'Session & state', link: '/tech/02-integration/session-state' },
      { text: 'Generative UI', link: '/tech/02-integration/ui' },
      { text: 'Browser & edge inference', link: '/tech/02-integration/browser-edge' }
    ]
  },
  {
    text: 'L3 · Knowledge Grounding',
    collapsed: false,
    items: [
      { text: 'Layer guide', link: '/tech/03-grounding/' },
      { text: 'Embeddings & retrieval', link: '/tech/03-grounding/embeddings-retrieval' },
      { text: 'RAG', link: '/tech/03-grounding/rag' },
      { text: 'Advanced retrieval', link: '/tech/03-grounding/advanced-retrieval' }
    ]
  },
  {
    text: 'L4 · Action & Collaboration',
    collapsed: false,
    items: [
      { text: 'Layer guide', link: '/tech/04-action/' },
      { text: 'Tool execution engineering', link: '/tech/04-action/tool-execution' },
      { text: 'Workflow patterns', link: '/tech/04-action/workflow' },
      {
        text: 'Agent runtime',
        collapsed: true,
        items: [
          { text: 'Runtime · loop & state', link: '/tech/04-action/agent-runtime/' },
          { text: 'Design patterns', link: '/tech/04-action/agent-runtime/design-patterns' },
          { text: 'State & memory', link: '/tech/04-action/agent-runtime/state-memory' },
          { text: 'Recovery & HITL', link: '/tech/04-action/agent-runtime/recovery-hitl' },
          { text: 'Computer use', link: '/tech/04-action/agent-runtime/computer-use' }
        ]
      },
      { text: 'Multi-agent systems', link: '/tech/04-action/multi-agent' },
      { text: 'Agent Skills', link: '/tech/04-action/skills' },
      { text: 'Agent Plugins (watchlist)', link: '/tech/04-action/plugins' },
      {
        text: 'Protocols (by boundary)',
        collapsed: true,
        items: [
          { text: 'Protocol map', link: '/tech/04-action/protocols/' },
          { text: 'MCP · agent ↔ tools/data', link: '/tech/04-action/protocols/mcp' },
          { text: 'A2A · agent ↔ agent', link: '/tech/04-action/protocols/a2a' },
          { text: 'ACP · editor ↔ coding agent', link: '/tech/04-action/protocols/acp-agent-client' },
          { text: 'AG-UI · agent ↔ user app', link: '/tech/04-action/protocols/ag-ui' },
          { text: 'A2UI & MCP Apps', link: '/tech/04-action/protocols/a2ui-mcp-apps' },
          { text: 'Watchlist', link: '/tech/04-action/protocols/watchlist' }
        ]
      }
    ]
  },
  {
    text: 'L5 · Reliable Operations',
    collapsed: false,
    items: [
      { text: 'Layer guide', link: '/tech/05-operations/' },
      { text: 'Testing', link: '/tech/05-operations/testing' },
      { text: 'Evaluation (bridge → evals)', link: '/tech/05-operations/evaluation' },
      { text: 'Observability', link: '/tech/05-operations/observability' },
      { text: 'Security', link: '/tech/05-operations/security' },
      { text: 'Cost & performance', link: '/tech/05-operations/cost-performance' },
      { text: 'Deployment & release', link: '/tech/05-operations/deployment' }
    ]
  },
  {
    text: 'Appendices',
    collapsed: true,
    items: [
      { text: 'Appendix guide', link: '/tech/appendices/' },
      { text: 'Model lifecycle bridges', link: '/tech/appendices/model-lifecycle/' },
      { text: 'Case studies', link: '/tech/appendices/cases/' },
      { text: 'Course notes (legacy)', link: '/tech/appendices/course-notes/' },
      { text: 'Methodology archive', link: '/tech/appendices/methodology/' },
      { text: 'Multimodal (bridge)', link: '/tech/appendices/multimodal/' },
      { text: 'AI coding tool cases', link: '/tech/appendices/ai-coding/' }
    ]
  },
  {
    text: 'Resources',
    items: [
      { text: 'Resource library', link: '/resources' }
    ]
  }
]

export const zhTechSidebar = [
  {
    text: '总览',
    items: [
      { text: '技术地图 · 从哪开始', link: '/zh/tech/' },
      { text: '复杂度决策阶梯', link: '/zh/tech/00-orientation/complexity-ladder' },
      { text: '站点边界与 ownership', link: '/zh/tech/00-orientation/site-boundaries' },
      { text: '模型生命周期（桥接）', link: '/zh/tech/00-orientation/model-lifecycle-bridge' }
    ]
  },
  {
    text: '层 1 · 交互契约',
    collapsed: false,
    items: [
      { text: '本层导览', link: '/zh/tech/01-contracts/' },
      { text: '提示词工程', link: '/zh/tech/01-contracts/prompt' },
      { text: '上下文工程', link: '/zh/tech/01-contracts/context' },
      { text: '结构化输出', link: '/zh/tech/01-contracts/structured-output' },
      { text: '工具调用契约', link: '/zh/tech/01-contracts/tool-calling' }
    ]
  },
  {
    text: '层 2 · 应用接入',
    collapsed: false,
    items: [
      { text: '本层导览', link: '/zh/tech/02-integration/' },
      { text: '模型 API 契约', link: '/zh/tech/02-integration/model-api' },
      { text: '流式响应', link: '/zh/tech/02-integration/streaming' },
      { text: '会话与状态', link: '/zh/tech/02-integration/session-state' },
      { text: '生成式 UI', link: '/zh/tech/02-integration/ui' },
      { text: '浏览器与端侧推理', link: '/zh/tech/02-integration/browser-edge' }
    ]
  },
  {
    text: '层 3 · 知识接地',
    collapsed: false,
    items: [
      { text: '本层导览', link: '/zh/tech/03-grounding/' },
      { text: '嵌入与检索', link: '/zh/tech/03-grounding/embeddings-retrieval' },
      { text: 'RAG · 检索增强生成', link: '/zh/tech/03-grounding/rag' },
      { text: '高级检索', link: '/zh/tech/03-grounding/advanced-retrieval' }
    ]
  },
  {
    text: '层 4 · 行动与协作',
    collapsed: false,
    items: [
      { text: '本层导览', link: '/zh/tech/04-action/' },
      { text: '工具执行工程', link: '/zh/tech/04-action/tool-execution' },
      { text: '工作流模式', link: '/zh/tech/04-action/workflow' },
      {
        text: 'Agent 运行时',
        collapsed: true,
        items: [
          { text: '运行时 · 循环与状态', link: '/zh/tech/04-action/agent-runtime/' },
          { text: '设计模式', link: '/zh/tech/04-action/agent-runtime/design-patterns' },
          { text: '状态与记忆', link: '/zh/tech/04-action/agent-runtime/state-memory' },
          { text: '恢复与人工批准', link: '/zh/tech/04-action/agent-runtime/recovery-hitl' },
          { text: 'Computer Use', link: '/zh/tech/04-action/agent-runtime/computer-use' }
        ]
      },
      { text: '多 Agent 系统', link: '/zh/tech/04-action/multi-agent' },
      { text: 'Agent Skills', link: '/zh/tech/04-action/skills' },
      { text: 'Agent Plugins（观察）', link: '/zh/tech/04-action/plugins' },
      {
        text: '协议（按边界分组）',
        collapsed: true,
        items: [
          { text: '协议地图', link: '/zh/tech/04-action/protocols/' },
          { text: 'MCP · Agent↔工具/数据', link: '/zh/tech/04-action/protocols/mcp' },
          { text: 'A2A · Agent↔Agent', link: '/zh/tech/04-action/protocols/a2a' },
          { text: 'ACP · 编辑器↔编码 Agent', link: '/zh/tech/04-action/protocols/acp-agent-client' },
          { text: 'AG-UI · Agent↔用户应用', link: '/zh/tech/04-action/protocols/ag-ui' },
          { text: 'A2UI 与 MCP Apps', link: '/zh/tech/04-action/protocols/a2ui-mcp-apps' },
          { text: '协议观察清单', link: '/zh/tech/04-action/protocols/watchlist' }
        ]
      }
    ]
  },
  {
    text: '层 5 · 可靠运营',
    collapsed: false,
    items: [
      { text: '本层导览', link: '/zh/tech/05-operations/' },
      { text: '测试', link: '/zh/tech/05-operations/testing' },
      { text: '评估（桥接 → evals）', link: '/zh/tech/05-operations/evaluation' },
      { text: '可观测性', link: '/zh/tech/05-operations/observability' },
      { text: '安全', link: '/zh/tech/05-operations/security' },
      { text: '成本与性能', link: '/zh/tech/05-operations/cost-performance' },
      { text: '部署与发布', link: '/zh/tech/05-operations/deployment' }
    ]
  },
  {
    text: '附录',
    collapsed: true,
    items: [
      { text: '附录导览', link: '/zh/tech/appendices/' },
      { text: '模型生命周期桥接', link: '/zh/tech/appendices/model-lifecycle/' },
      { text: '案例研究', link: '/zh/tech/appendices/cases/' },
      { text: '课程笔记（legacy）', link: '/zh/tech/appendices/course-notes/' },
      { text: '方法论存档', link: '/zh/tech/appendices/methodology/' },
      { text: '多模态（桥接）', link: '/zh/tech/appendices/multimodal/' },
      { text: 'AI 编码工具案例', link: '/zh/tech/appendices/ai-coding/' }
    ]
  },
  {
    text: '资源',
    items: [
      { text: '资料库', link: '/zh/resources' }
    ]
  }
]

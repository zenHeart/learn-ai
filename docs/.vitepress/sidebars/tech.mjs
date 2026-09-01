// Tech sidebar — Scope v6 (Issue #116, user decision 2026-09-01).
// Report-aligned knowledge domains: dependency-driven, read/write world split,
// protocols by boundary, model lifecycle + advanced as bridge groups.

export const enTechSidebar = [
  {
    text: 'Map',
    items: [
      { text: 'Tech map · where to start', link: '/tech/' },
      { text: 'How to learn · complexity ladder', link: '/tech/00-map/complexity-ladder' },
      { text: 'Boundaries & ownership', link: '/tech/00-map/site-boundaries' }
    ]
  },
  {
    text: 'Model Lifecycle',
    collapsed: true,
    items: [
      { text: 'Guide · two chains meet', link: '/tech/01-model-lifecycle/' },
      { text: 'LLM mental model', link: '/tech/01-model-lifecycle/llm-mental-model' },
      { text: 'Architecture [→ Learn LLM]', link: '/tech/01-model-lifecycle/architecture' },
      { text: 'Data · Pretraining · Scaling', link: '/tech/01-model-lifecycle/data-pretraining-scaling' },
      { text: 'Post-training [→ Learn LLM]', link: '/tech/01-model-lifecycle/post-training/' }
    ]
  },
  {
    text: 'Inference & Interface',
    collapsed: false,
    items: [
      { text: 'Group guide', link: '/tech/02-inference-interface/' },
      { text: 'Inference fundamentals', link: '/tech/02-inference-interface/inference-fundamentals' },
      { text: 'Efficient serving', link: '/tech/02-inference-interface/efficient-serving' },
      { text: 'Model API contract', link: '/tech/02-inference-interface/model-api' },
      { text: 'Structured output', link: '/tech/02-inference-interface/structured-output' },
      { text: 'Streaming', link: '/tech/02-inference-interface/streaming' },
      { text: 'Generative UI', link: '/tech/02-inference-interface/ui' },
      { text: 'Browser & edge inference', link: '/tech/02-inference-interface/browser-edge' }
    ]
  },
  {
    text: 'Context',
    collapsed: false,
    items: [
      { text: 'Group guide', link: '/tech/03-context/' },
      { text: 'Prompt engineering', link: '/tech/03-context/prompt' },
      { text: 'Context window', link: '/tech/03-context/context-window' },
      { text: 'Context engineering', link: '/tech/03-context/context-engineering' },
      { text: 'Session memory', link: '/tech/03-context/session-memory' },
      { text: 'Repo context · AGENTS.md', link: '/tech/03-context/repo-context' }
    ]
  },
  {
    text: 'Grounding',
    collapsed: false,
    items: [
      { text: 'Group guide', link: '/tech/04-grounding/' },
      { text: 'Embeddings & retrieval', link: '/tech/04-grounding/embeddings-retrieval' },
      { text: 'RAG', link: '/tech/04-grounding/rag' },
      { text: 'Advanced retrieval', link: '/tech/04-grounding/advanced-retrieval' }
    ]
  },
  {
    text: 'Action',
    collapsed: false,
    items: [
      { text: 'Tool calling', link: '/tech/05-action/tool-calling' },
      { text: 'Tool execution engineering', link: '/tech/05-action/tool-execution' }
    ]
  },
  {
    text: 'Agent Systems',
    collapsed: false,
    items: [
      { text: 'Mental model & runtime', link: '/tech/06-agent-systems/agent-runtime' },
      { text: 'Design patterns', link: '/tech/06-agent-systems/design-patterns' },
      { text: 'State & memory', link: '/tech/06-agent-systems/state-memory' },
      { text: 'Hooks', link: '/tech/06-agent-systems/hooks' },
      { text: 'Recovery & HITL', link: '/tech/06-agent-systems/recovery-hitl' },
      { text: 'Computer use', link: '/tech/06-agent-systems/computer-use' },
      { text: 'Workflow patterns', link: '/tech/06-agent-systems/workflow' },
      { text: 'Skills', link: '/tech/06-agent-systems/skills' },
      { text: 'Plugins (watchlist)', link: '/tech/06-agent-systems/plugins' },
      { text: 'Subagent / Multi-agent', link: '/tech/06-agent-systems/multi-agent' }
    ]
  },
  {
    text: 'Interoperability',
    collapsed: true,
    items: [
      { text: 'Protocol map', link: '/tech/07-interoperability/' },
      { text: 'MCP · agent ↔ tools/data', link: '/tech/07-interoperability/mcp' },
      { text: 'AG-UI · agent ↔ user app', link: '/tech/07-interoperability/ag-ui' },
      { text: 'A2UI & MCP Apps', link: '/tech/07-interoperability/a2ui-mcp-apps' },
      { text: 'ACP · editor ↔ coding agent', link: '/tech/07-interoperability/acp-agent-client' },
      { text: 'A2A · agent ↔ agent', link: '/tech/07-interoperability/a2a' },
      { text: 'Watchlist', link: '/tech/07-interoperability/watchlist' }
    ]
  },
  {
    text: 'Production',
    collapsed: false,
    items: [
      { text: 'Group guide', link: '/tech/08-production/' },
      { text: 'Testing', link: '/tech/08-production/testing' },
      { text: 'Evaluation [→ evals]', link: '/tech/08-production/evaluation' },
      { text: 'Observability', link: '/tech/08-production/observability' },
      { text: 'Security', link: '/tech/08-production/security' },
      { text: 'Cost & performance', link: '/tech/08-production/cost-performance' },
      { text: 'Deployment', link: '/tech/08-production/deployment' },
      { text: 'LLMOps / AgentOps', link: '/tech/08-production/agentops' }
    ]
  },
  {
    text: 'Advanced',
    collapsed: true,
    items: [
      { text: 'Interpretability', link: '/tech/09-advanced/interpretability' },
      { text: 'Reasoning · test-time compute', link: '/tech/09-advanced/reasoning-ttc' },
      { text: 'MoE / frontier architectures', link: '/tech/09-advanced/moe-frontier' },
      { text: 'Multimodal', link: '/tech/09-advanced/multimodal' }
    ]
  },
  {
    text: 'Recipes',
    items: [
      { text: 'Providers & frameworks → Products', link: '/products/' }
    ]
  },
  {
    text: 'Appendices',
    collapsed: true,
    items: [
      { text: 'Appendix guide', link: '/tech/appendices/' },
      { text: 'Case studies', link: '/tech/appendices/cases/' },
      { text: 'AI coding tool cases', link: '/tech/appendices/ai-coding/' },
      { text: 'Course notes (legacy)', link: '/tech/appendices/course-notes/' },
      { text: 'Methodology archive', link: '/tech/appendices/methodology/' }
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
      { text: '怎么学 · 复杂度阶梯', link: '/zh/tech/00-map/complexity-ladder' },
      { text: '站点边界与 ownership', link: '/zh/tech/00-map/site-boundaries' }
    ]
  },
  {
    text: '模型生命周期',
    collapsed: true,
    items: [
      { text: '导览 · 两条链在此汇合', link: '/zh/tech/01-model-lifecycle/' },
      { text: 'LLM 心智模型', link: '/zh/tech/01-model-lifecycle/llm-mental-model' },
      { text: '架构 [→ Learn LLM]', link: '/zh/tech/01-model-lifecycle/architecture' },
      { text: '数据 · 预训练 · Scaling', link: '/zh/tech/01-model-lifecycle/data-pretraining-scaling' },
      { text: '后训练 [→ Learn LLM]', link: '/zh/tech/01-model-lifecycle/post-training/' }
    ]
  },
  {
    text: '推理与接口',
    collapsed: false,
    items: [
      { text: '本组导览', link: '/zh/tech/02-inference-interface/' },
      { text: '推理基础', link: '/zh/tech/02-inference-interface/inference-fundamentals' },
      { text: '高效 Serving', link: '/zh/tech/02-inference-interface/efficient-serving' },
      { text: '模型 API 契约', link: '/zh/tech/02-inference-interface/model-api' },
      { text: '结构化输出', link: '/zh/tech/02-inference-interface/structured-output' },
      { text: '流式响应', link: '/zh/tech/02-inference-interface/streaming' },
      { text: '生成式 UI', link: '/zh/tech/02-inference-interface/ui' },
      { text: '浏览器与端侧推理', link: '/zh/tech/02-inference-interface/browser-edge' }
    ]
  },
  {
    text: '上下文',
    collapsed: false,
    items: [
      { text: '本组导览', link: '/zh/tech/03-context/' },
      { text: '提示词工程', link: '/zh/tech/03-context/prompt' },
      { text: '上下文窗口', link: '/zh/tech/03-context/context-window' },
      { text: '上下文工程', link: '/zh/tech/03-context/context-engineering' },
      { text: '会话记忆', link: '/zh/tech/03-context/session-memory' },
      { text: '仓库上下文 · AGENTS.md', link: '/zh/tech/03-context/repo-context' }
    ]
  },
  {
    text: '知识接地',
    collapsed: false,
    items: [
      { text: '本组导览', link: '/zh/tech/04-grounding/' },
      { text: '嵌入与检索', link: '/zh/tech/04-grounding/embeddings-retrieval' },
      { text: 'RAG · 检索增强生成', link: '/zh/tech/04-grounding/rag' },
      { text: '高级检索', link: '/zh/tech/04-grounding/advanced-retrieval' }
    ]
  },
  {
    text: '行动',
    collapsed: false,
    items: [
      { text: '工具调用契约', link: '/zh/tech/05-action/tool-calling' },
      { text: '工具执行工程', link: '/zh/tech/05-action/tool-execution' }
    ]
  },
  {
    text: 'Agent 系统',
    collapsed: false,
    items: [
      { text: '心智模型与运行时', link: '/zh/tech/06-agent-systems/agent-runtime' },
      { text: '设计模式', link: '/zh/tech/06-agent-systems/design-patterns' },
      { text: '状态与记忆', link: '/zh/tech/06-agent-systems/state-memory' },
      { text: 'Hooks', link: '/zh/tech/06-agent-systems/hooks' },
      { text: '恢复与人工批准', link: '/zh/tech/06-agent-systems/recovery-hitl' },
      { text: 'Computer Use', link: '/zh/tech/06-agent-systems/computer-use' },
      { text: '工作流模式', link: '/zh/tech/06-agent-systems/workflow' },
      { text: 'Skills', link: '/zh/tech/06-agent-systems/skills' },
      { text: 'Plugins（观察）', link: '/zh/tech/06-agent-systems/plugins' },
      { text: '子代理 / 多 Agent', link: '/zh/tech/06-agent-systems/multi-agent' }
    ]
  },
  {
    text: '互操作',
    collapsed: true,
    items: [
      { text: '协议地图', link: '/zh/tech/07-interoperability/' },
      { text: 'MCP · Agent↔工具/数据', link: '/zh/tech/07-interoperability/mcp' },
      { text: 'AG-UI · Agent↔用户应用', link: '/zh/tech/07-interoperability/ag-ui' },
      { text: 'A2UI 与 MCP Apps', link: '/zh/tech/07-interoperability/a2ui-mcp-apps' },
      { text: 'ACP · 编辑器↔编码 Agent', link: '/zh/tech/07-interoperability/acp-agent-client' },
      { text: 'A2A · Agent↔Agent', link: '/zh/tech/07-interoperability/a2a' },
      { text: '协议观察清单', link: '/zh/tech/07-interoperability/watchlist' }
    ]
  },
  {
    text: '生产',
    collapsed: false,
    items: [
      { text: '本组导览', link: '/zh/tech/08-production/' },
      { text: '测试', link: '/zh/tech/08-production/testing' },
      { text: '评估 [→ evals]', link: '/zh/tech/08-production/evaluation' },
      { text: '可观测性', link: '/zh/tech/08-production/observability' },
      { text: '安全', link: '/zh/tech/08-production/security' },
      { text: '成本与性能', link: '/zh/tech/08-production/cost-performance' },
      { text: '部署', link: '/zh/tech/08-production/deployment' },
      { text: 'LLMOps / AgentOps', link: '/zh/tech/08-production/agentops' }
    ]
  },
  {
    text: '进阶',
    collapsed: true,
    items: [
      { text: '可解释性', link: '/zh/tech/09-advanced/interpretability' },
      { text: '推理 · 测试时计算', link: '/zh/tech/09-advanced/reasoning-ttc' },
      { text: 'MoE / 前沿架构', link: '/zh/tech/09-advanced/moe-frontier' },
      { text: '多模态', link: '/zh/tech/09-advanced/multimodal' }
    ]
  },
  {
    text: '配方',
    items: [
      { text: '厂商与框架 → 产品区', link: '/zh/products/' }
    ]
  },
  {
    text: '附录',
    collapsed: true,
    items: [
      { text: '附录导览', link: '/zh/tech/appendices/' },
      { text: '案例研究', link: '/zh/tech/appendices/cases/' },
      { text: 'AI 编码工具案例', link: '/zh/tech/appendices/ai-coding/' },
      { text: '课程笔记（legacy）', link: '/zh/tech/appendices/course-notes/' },
      { text: '方法论存档', link: '/zh/tech/appendices/methodology/' }
    ]
  },
  {
    text: '资源',
    items: [
      { text: '资料库', link: '/zh/resources' }
    ]
  }
]

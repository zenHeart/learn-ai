export const enTechSidebar = [
  {
    text: 'Map',
    items: [
      { text: 'How to read this section', link: '/tech/' }
    ]
  },
  {
    text: 'Fundamentals',
    collapsed: false,
    items: [
      { text: 'LLM basics', link: '/tech/fundamentals/LLM' },
      { text: 'Context window', link: '/tech/fundamentals/context' },
      { text: 'Embeddings', link: '/tech/fundamentals/embeddings' }
    ]
  },
  {
    text: 'Prompt',
    collapsed: false,
    items: [
      { text: 'How to write (map)', link: '/tech/prompt/' },
      { text: '1. Be clear · Claude official', link: '/tech/prompt/claude-prompt-best-practices' },
      { text: '2. Write it for the repo', link: '/tech/prompt/agents-doc' },
      { text: '3. Agent engineering', link: '/tech/prompt/agent-engineering-practices' },
      { text: '4. Context for agents', link: '/tech/prompt/context-agent-engineering' },
      { text: 'Appendix · System prompts', link: '/tech/prompt/system-prompts-collection' },
      { text: 'Appendix · Copilot', link: '/tech/prompt/cases/copilot' }
    ]
  },
  {
    text: 'Integrate',
    collapsed: true,
    items: [
      { text: 'API comparison', link: '/integration/apis/' },
      { text: 'OpenAI', link: '/integration/apis/openai' },
      { text: 'Anthropic', link: '/integration/apis/anthropic' },
      { text: 'HuggingFace', link: '/integration/apis/huggingface' },
      { text: 'Streaming', link: '/integration/apis/streaming' },
      { text: 'Vercel AI SDK', link: '/integration/frameworks/vercel-ai-sdk' },
      { text: 'LangChain.js', link: '/integration/frameworks/langchain-js' },
      { text: 'LlamaIndex.TS', link: '/integration/frameworks/llamaindex-ts' },
      { text: 'Next.js', link: '/integration/frameworks/nextjs' },
      { text: 'MCP', link: '/integration/protocols/mcp' },
      { text: 'Tool calling', link: '/integration/protocols/tool-calling' },
      { text: 'Transformers.js', link: '/integration/frontend-ml/transformersjs' },
      { text: 'TensorFlow.js', link: '/integration/frontend-ml/tensorflowjs' },
      { text: 'ONNX Runtime', link: '/integration/frontend-ml/onnx-runtime' }
    ]
  },
  {
    text: 'RAG',
    collapsed: true,
    items: [
      { text: 'RAG', link: '/tech/patterns/RAG' },
      { text: 'Semantic search case', link: '/tech/patterns/RAG-semantic-search-case-study' }
    ]
  },
  {
    text: 'Agent',
    collapsed: true,
    items: [
      { text: 'Agents overview', link: '/tech/patterns/agent/' },
      { text: 'Agent course', link: '/tech/agent-course' },
      { text: 'Design patterns', link: '/tech/agent-design-patterns' },
      { text: 'Hooks', link: '/tech/patterns/agent/hooks' },
      { text: 'Skills', link: '/tech/patterns/agent/skills' }
    ]
  },
  {
    text: 'Engineering',
    collapsed: true,
    items: [
      { text: 'Testing', link: '/tech/engineering/testing' },
      { text: 'Evals', link: '/tech/engineering/evals' },
      { text: 'Observability', link: '/tech/engineering/observability' },
      { text: 'Security', link: '/tech/engineering/security' },
      { text: 'Cost', link: '/tech/engineering/cost-optimization' },
      { text: 'Alibaba testing', link: '/tech/alibaba-ai-testing' },
      { text: 'Meituan testing', link: '/tech/meituan-ai-testing' },
      { text: 'Benchmarking', link: '/tech/generative-benchmarking' },
      { text: 'Golden datasets', link: '/tech/golden-dataset-generation' }
    ]
  },
  {
    text: 'More',
    collapsed: true,
    items: [
      { text: 'SFT', link: '/tech/training/SFT' },
      { text: 'RLHF', link: '/tech/training/RLHF' },
      { text: 'PEFT', link: '/tech/training/PEFT' },
      { text: 'Resources', link: '/resources' }
    ]
  }
]

export const zhTechSidebar = [
  {
    text: '总览',
    items: [
      { text: '怎么读这一栏', link: '/zh/tech/' }
    ]
  },
  {
    text: '基础',
    collapsed: false,
    items: [
      { text: 'LLM 基础', link: '/zh/tech/fundamentals/LLM' },
      { text: '上下文窗口', link: '/zh/tech/fundamentals/context' },
      { text: '上下文工程', link: '/zh/tech/fundamentals/context-engineering' },
      { text: 'Embeddings', link: '/zh/tech/fundamentals/embeddings' }
    ]
  },
  {
    text: 'Prompt',
    collapsed: false,
    items: [
      { text: '地图 · 怎么写', link: '/zh/tech/prompt/' },
      { text: '1. 说清楚 · Claude 官方', link: '/tech/prompt/claude-prompt-best-practices' },
      { text: '2. 稳住结构 · JSON', link: '/zh/tech/prompt/json-prompt-best-practices' },
      { text: '3. 写给仓库 · AGENTS.md', link: '/zh/tech/prompt/agents-doc' },
      { text: '4. 换模型时改什么', link: '/zh/tech/prompt/official-guide-2026' },
      { text: '附录 · System Prompts', link: '/zh/tech/prompt/system-prompts-collection' },
      { text: '附录 · Copilot 原文', link: '/zh/tech/prompt/cases/copilot' }
    ]
  },
  {
    text: '集成',
    collapsed: true,
    items: [
      { text: 'API 对比', link: '/zh/integration/apis/' },
      { text: 'OpenAI', link: '/zh/integration/apis/openai' },
      { text: 'Anthropic', link: '/zh/integration/apis/anthropic' },
      { text: '流式', link: '/zh/integration/apis/streaming' },
      { text: 'Vercel AI SDK', link: '/zh/integration/frameworks/vercel-ai-sdk' },
      { text: 'LangChain.js', link: '/zh/integration/frameworks/langchain-js' },
      { text: 'Next.js', link: '/zh/integration/frameworks/nextjs' },
      { text: '工具调用', link: '/zh/integration/protocols/tool-calling' }
    ]
  },
  {
    text: 'RAG',
    collapsed: true,
    items: [
      { text: 'RAG', link: '/zh/tech/patterns/RAG' },
      { text: '语义搜索', link: '/zh/tech/ai-application/building-semantic-search' }
    ]
  },
  {
    text: 'Agent',
    collapsed: true,
    items: [
      { text: '概览', link: '/zh/tech/patterns/agent/' },
      { text: 'Agent Course', link: '/tech/agent-course' },
      { text: '设计模式', link: '/zh/tech/agent/agent-design-patterns' },
      { text: '工程模式（Willison）', link: '/zh/tech/prompt/agentic-engineering-patterns' },
      { text: '高级工具使用', link: '/zh/tech/prompt/advanced-tool-use' },
      { text: 'Hooks', link: '/zh/tech/patterns/agent/hooks' },
      { text: '工作流', link: '/zh/tech/patterns/agent/workflow-patterns' },
      { text: '编排', link: '/zh/tech/agent/multi-agent-orchestration' }
    ]
  },
  {
    text: 'Skills 与 MCP',
    collapsed: true,
    items: [
      { text: 'Claude Skills 概览', link: '/zh/tech/skills/claude-skills-overview' },
      { text: 'Skills 机制', link: '/zh/tech/skills/skills-mechanics-explained' },
      { text: '怎么写 Skill', link: '/zh/tech/skills/how-to-create-skills' },
      { text: 'Skills 最佳实践', link: '/zh/tech/skills/skills-best-practices' },
      { text: 'MCP 课程', link: '/zh/tech/mcp/mcp-course-notes' },
      { text: 'Chrome DevTools MCP', link: '/zh/tech/mcp/chrome-devtools-mcp' }
    ]
  },
  {
    text: '工程与评估',
    collapsed: true,
    items: [
      { text: '测试', link: '/zh/tech/engineering/testing' },
      { text: '评估', link: '/zh/tech/engineering/evals' },
      { text: '可观测性', link: '/zh/tech/engineering/observability' },
      { text: '安全', link: '/zh/tech/engineering/security' },
      { text: '成本', link: '/zh/tech/engineering/cost-optimization' },
      { text: 'AI 测试', link: '/zh/tech/evaluation/ai-testing' },
      { text: '生成式基准', link: '/zh/tech/evaluation/generative-benchmarking' }
    ]
  },
  {
    text: '更多',
    collapsed: true,
    items: [
      { text: '前端 AI', link: '/zh/tech/frontend/streaming' },
      { text: 'SFT', link: '/zh/tech/training/SFT' },
      { text: 'RLHF', link: '/zh/tech/training/RLHF' },
      { text: '资源', link: '/zh/resources' }
    ]
  }
]

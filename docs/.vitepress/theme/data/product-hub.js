/**
 * GENERATED FILE — 由 scripts/products/build-hub.mjs 从 data/products/ 账本生成。
 * 禁止手改：改账本后重新运行该脚本，否则 `docs:build` 的 --check 闸门会失败。
 *
 * 账本是唯一事实来源：
 *   data/products/products/*.json   一品一档
 *   data/products/taxonomy.json     类别本体
 *   data/products/vendors.json      厂商注册表
 *   data/products/use-cases/*.json  场景选型
 *
 * products 251 条 · categories 11 个 · use-cases 10 个
 *
 * 本文件不含生成时间戳：否则每次运行都会产生差异，--check 闸门将永远报红。
 * 什么时候改的由 git 记录。
 */

export const productHub = {
  categories: [
  {
    "id": "chat-assistant",
    "name": "Chat assistants",
    "nameZh": "对话助手",
    "color": "#2563EB",
    "icon": "💬",
    "count": 50
  },
  {
    "id": "coding-agent",
    "name": "Coding agents",
    "nameZh": "编程 Agent",
    "color": "#16A34A",
    "icon": "💻",
    "count": 50
  },
  {
    "id": "agent-platform",
    "name": "Agent platforms",
    "nameZh": "Agent 平台",
    "color": "#7C3AED",
    "icon": "🧠",
    "count": 42
  },
  {
    "id": "multimodal-creation",
    "name": "Multimodal creation",
    "nameZh": "多模态创作",
    "color": "#DB2777",
    "icon": "🎨",
    "count": 33
  },
  {
    "id": "enterprise-api",
    "name": "Enterprise APIs",
    "nameZh": "企业 API",
    "color": "#475569",
    "icon": "🏢",
    "count": 17
  },
  {
    "id": "model-platform",
    "name": "Model platforms",
    "nameZh": "模型平台",
    "color": "#0891B2",
    "icon": "🧬",
    "count": 14
  },
  {
    "id": "search",
    "name": "AI search",
    "nameZh": "AI 搜索",
    "color": "#EA580C",
    "icon": "🔍",
    "count": 14
  },
  {
    "id": "developer-sdk",
    "name": "Developer SDKs",
    "nameZh": "开发 SDK",
    "color": "#9333EA",
    "icon": "🧩",
    "count": 13
  },
  {
    "id": "eval-observability",
    "name": "Eval & observability",
    "nameZh": "评测与可观测",
    "color": "#DC2626",
    "icon": "📈",
    "count": 6
  },
  {
    "id": "local-runner",
    "name": "Local runners",
    "nameZh": "本地运行",
    "color": "#65A30D",
    "icon": "🦙",
    "count": 6
  },
  {
    "id": "meetings",
    "name": "Meetings & notes",
    "nameZh": "会议与纪要",
    "color": "#0D9488",
    "icon": "🎙️",
    "count": 6
  }
],
  useCases: [
  {
    "id": "office",
    "title": "Office & knowledge work",
    "titleZh": "办公与知识工作",
    "description": "Writing, meetings and documents. Pick the moment you need help in, rather than the product that has the most features.",
    "descriptionZh": "写作、会议与文档。按你「在哪个环节需要帮忙」来选，而不是按功能多少来选。",
    "products": [
      "agentforce",
      "ai",
      "aily",
      "amazon-q",
      "amazon-quick-suite",
      "apple-intelligence",
      "atlassian-rovo",
      "beautiful-ai",
      "canva-magic-studio",
      "character-ai",
      "chatglm",
      "chatgpt",
      "chatgpt-atlas",
      "claude-ai",
      "claude-cowork",
      "claude-desktop",
      "codewave",
      "copilot-cowork",
      "dia",
      "dots",
      "doubao",
      "fathom",
      "feature",
      "fireflies-ai",
      "frontier",
      "gamma",
      "gemini-app",
      "gemini-in-google-docs-and-sheets",
      "genspark",
      "glean",
      "granola",
      "grok",
      "harvey",
      "humane-ai-pin",
      "inflection-pi",
      "joyai",
      "kimi",
      "le-chat",
      "lindy",
      "manus",
      "mem",
      "meta-ai",
      "microsoft-365-copilot",
      "microsoft-copilot",
      "microsoft-copilot-vision",
      "muse",
      "north",
      "notebooklm",
      "notion-ai",
      "opera-neon",
      "otter-ai",
      "p2061",
      "p2265",
      "p9112",
      "perplexity-comet",
      "presentations-ai",
      "qianwen",
      "quark",
      "rabbit-r1",
      "ray-ban-meta",
      "replika",
      "samsung-galaxy-ai",
      "shangliang",
      "sierra-ai",
      "slack-ai",
      "slackbot",
      "synthesia",
      "talkie",
      "tana",
      "tiangong",
      "tiangong-agent",
      "tl-dv",
      "tongyi",
      "vibe",
      "wanyo",
      "wenxiaoyan",
      "wenxin-yiyan",
      "work",
      "wps-ai",
      "xinghuo",
      "yuanbao",
      "yuewen",
      "zoom-ai-companion"
    ],
    "productCount": 83,
    "dimensions": [
      {
        "id": "meetings",
        "label": "Meetings & notes",
        "labelZh": "会议与纪要",
        "weight": 3,
        "productIds": [
          "fathom",
          "feature",
          "fireflies-ai",
          "granola",
          "lindy",
          "mem",
          "otter-ai",
          "tana",
          "tl-dv",
          "zoom-ai-companion"
        ],
        "productCount": 10
      },
      {
        "id": "writing",
        "label": "Writing & drafting",
        "labelZh": "写作与起草",
        "weight": 3,
        "productIds": [
          "amazon-quick-suite",
          "claude-ai",
          "codewave",
          "gamma",
          "gemini-in-google-docs-and-sheets",
          "genspark",
          "microsoft-365-copilot",
          "notion-ai",
          "quark",
          "tana",
          "wps-ai"
        ],
        "productCount": 11
      },
      {
        "id": "knowledge-base",
        "label": "Team knowledge base",
        "labelZh": "团队知识库",
        "weight": 2,
        "productIds": [
          "amazon-quick-suite",
          "atlassian-rovo",
          "claude-cowork",
          "gemini-in-google-docs-and-sheets",
          "genspark",
          "glean",
          "mem",
          "notebooklm",
          "notion-ai",
          "p2061",
          "p2265",
          "tana"
        ],
        "productCount": 12
      },
      {
        "id": "slides",
        "label": "Slides & visual docs",
        "labelZh": "幻灯片与图文",
        "weight": 1,
        "productIds": [
          "beautiful-ai",
          "feature",
          "gamma",
          "gemini-in-google-docs-and-sheets",
          "genspark",
          "presentations-ai",
          "quark",
          "wps-ai"
        ],
        "productCount": 8
      }
    ]
  },
  {
    "id": "agent-building",
    "title": "Building agents",
    "titleZh": "搭建 Agent",
    "description": "No-code builders, workflow platforms, or code frameworks. The deciding factor is who maintains the thing after launch.",
    "descriptionZh": "零代码平台、工作流编排，还是自己写框架。真正的分水岭是：上线之后谁来维护。",
    "products": [
      "agentforce",
      "ai",
      "aily",
      "amazon-quick-suite",
      "azure-ai-foundry",
      "bailian",
      "bigmodel",
      "cartesia",
      "chatgpt",
      "chatgpt-agent",
      "chatgpt-projects",
      "chroma",
      "claude-api",
      "claude-cowork",
      "claude-desktop",
      "copilot-cowork",
      "coze",
      "coze-space",
      "crewai",
      "deepseek",
      "dify",
      "dots",
      "exa",
      "fireflies-ai",
      "flowise",
      "frontier",
      "gemini-enterprise",
      "genspark",
      "glean",
      "goose",
      "grok-build",
      "gumloop",
      "hume-ai",
      "intercom-fin",
      "kimi-claw",
      "labelbox",
      "langchain",
      "lindy",
      "lingyi-wanwu",
      "litellm",
      "llamaindex",
      "manus",
      "meta-model-api",
      "microsoft-copilot-studio",
      "milvus",
      "minimax-agent",
      "mistral-studio",
      "muse",
      "muse-code",
      "n8n",
      "north",
      "nvidia-nemo",
      "openclaw",
      "openhands",
      "p2061",
      "p2265",
      "pinecone",
      "qdrant",
      "relevance-ai",
      "scale-ai",
      "sierra-ai",
      "siliconflow",
      "stepfun-platform",
      "surge-ai",
      "tiangong-agent",
      "together-ai",
      "vibe",
      "wanyo",
      "weaviate",
      "work",
      "yuanqi",
      "zapier-agents"
    ],
    "productCount": 72,
    "dimensions": [
      {
        "id": "no-code",
        "label": "No-code builder",
        "labelZh": "零代码搭建",
        "weight": 3,
        "productIds": [
          "agentforce",
          "coze",
          "dify",
          "flowise",
          "frontier",
          "gumloop",
          "microsoft-copilot-studio",
          "p2061",
          "relevance-ai",
          "yuanqi",
          "zapier-agents"
        ],
        "productCount": 11
      },
      {
        "id": "workflow",
        "label": "Workflow & automation",
        "labelZh": "工作流与自动化",
        "weight": 3,
        "productIds": [
          "crewai",
          "fireflies-ai",
          "grok-build",
          "gumloop",
          "lindy",
          "mistral-studio",
          "n8n",
          "zapier-agents"
        ],
        "productCount": 8
      },
      {
        "id": "autonomous",
        "label": "Autonomous task agent",
        "labelZh": "自主任务 Agent",
        "weight": 2,
        "productIds": [
          "agentforce",
          "chatgpt-agent",
          "claude-cowork",
          "manus",
          "openhands"
        ],
        "productCount": 5
      },
      {
        "id": "framework",
        "label": "Code framework / SDK",
        "labelZh": "代码框架 / SDK",
        "weight": 2,
        "productIds": [
          "agentforce",
          "amazon-quick-suite",
          "azure-ai-foundry",
          "cartesia",
          "claude-api",
          "crewai",
          "exa",
          "flowise",
          "frontier",
          "gemini-enterprise",
          "genspark",
          "glean",
          "grok-build",
          "langchain",
          "lindy",
          "llamaindex",
          "microsoft-copilot-studio",
          "mistral-studio",
          "nvidia-nemo",
          "p2061",
          "pinecone",
          "relevance-ai",
          "sierra-ai",
          "zapier-agents"
        ],
        "productCount": 24
      }
    ]
  },
  {
    "id": "research",
    "title": "Research & search",
    "titleZh": "调研与检索",
    "description": "Answer engines with citations versus retrieval you build yourself. Decide whether you need a product or a stack.",
    "descriptionZh": "带引用的问答引擎，还是你自己搭的检索。先想清楚你要的是一个产品，还是一套方案。",
    "products": [
      "atlassian-rovo",
      "brave-leo",
      "chatglm",
      "chatgpt",
      "chatgpt-agent",
      "chatgpt-atlas",
      "chatgpt-deep-research",
      "chatgpt-memory",
      "chatgpt-projects",
      "chatgpt-pulse",
      "chatgpt-study-mode",
      "chatgpt-tasks",
      "deepseek-2",
      "dia",
      "dots",
      "doubao",
      "exa",
      "gemini-app",
      "genspark",
      "glean",
      "google-search-ai-mode",
      "grok",
      "harvey",
      "joyai",
      "kagi-assistant",
      "kimi",
      "le-chat",
      "llamaindex",
      "manus",
      "metaso-search",
      "microsoft-copilot",
      "microsoft-copilot-vision",
      "mistral-forge",
      "nami-search",
      "notebooklm",
      "notion-ai",
      "opera-neon",
      "p2061",
      "p2265",
      "p9112",
      "perplexity",
      "perplexity-comet",
      "phind",
      "qianwen",
      "quark",
      "shangliang",
      "slackbot",
      "tavily",
      "tiangong",
      "tongyi",
      "wanyo",
      "wenxiaoyan",
      "wenxin-yiyan",
      "work",
      "xinghuo",
      "you-com",
      "yuanbao",
      "yuewen"
    ],
    "productCount": 58,
    "dimensions": [
      {
        "id": "answer-engine",
        "label": "Answer engine with sources",
        "labelZh": "带出处的问答引擎",
        "weight": 3,
        "productIds": [
          "atlassian-rovo",
          "chatgpt-deep-research",
          "chatgpt-pulse",
          "exa",
          "gemini-app",
          "glean",
          "google-search-ai-mode",
          "kagi-assistant",
          "metaso-search",
          "microsoft-copilot",
          "nami-search",
          "notebooklm",
          "perplexity",
          "phind",
          "quark",
          "tavily",
          "you-com"
        ],
        "productCount": 17
      },
      {
        "id": "retrieval-stack",
        "label": "Search API for your app",
        "labelZh": "给应用用的检索 API",
        "weight": 3,
        "productIds": [
          "atlassian-rovo",
          "chatgpt-deep-research",
          "chatgpt-pulse",
          "exa",
          "gemini-app",
          "glean",
          "google-search-ai-mode",
          "kagi-assistant",
          "llamaindex",
          "metaso-search",
          "microsoft-copilot",
          "nami-search",
          "notebooklm",
          "perplexity",
          "phind",
          "quark",
          "tavily",
          "you-com"
        ],
        "productCount": 18
      },
      {
        "id": "document-qa",
        "label": "Ask your own documents",
        "labelZh": "问自己的文档",
        "weight": 2,
        "productIds": [
          "atlassian-rovo",
          "chatgpt-memory",
          "glean",
          "llamaindex",
          "notebooklm",
          "notion-ai",
          "p2061",
          "p2265",
          "quark"
        ],
        "productCount": 9
      }
    ]
  },
  {
    "id": "coding",
    "title": "Coding & engineering",
    "titleZh": "编程与工程",
    "description": "For engineers who want an assistant inside the editor, in the terminal, or on a real issue. Start by where the agent is allowed to touch your machine.",
    "descriptionZh": "面向工程师：助手住在编辑器里、终端里，还是直接接手一个真实的 issue。先想清楚 Agent 能碰你机器的哪一层。",
    "products": [
      "aider",
      "amazon-q-developer",
      "amp",
      "augment-code",
      "baidu-comate",
      "bolt-new",
      "claude-ai",
      "claude-code",
      "cline",
      "codebuddy",
      "coderabbit",
      "codewave",
      "codex-cli",
      "cody",
      "comate-ai-ide",
      "cursor",
      "cursor-background-agents",
      "deepseek-2",
      "devin",
      "factory",
      "gemini-cli",
      "github-copilot",
      "github-copilot-agent-mode",
      "glm-coding-plan",
      "google-antigravity",
      "goose",
      "greptile",
      "grok-build",
      "jules",
      "junie",
      "kimi-code",
      "kiro",
      "lingma",
      "lingma-ai-ide",
      "lovable",
      "marscode",
      "mimo-code",
      "minimax-code",
      "muse-code",
      "openai-codex",
      "openhands",
      "p7887",
      "p8244",
      "phind",
      "pi-agent",
      "qoder",
      "replit-agent",
      "roo-code",
      "trae",
      "v0",
      "vercel-ai-sdk",
      "vibe",
      "warp",
      "webflow-ai",
      "windsurf",
      "zed"
    ],
    "productCount": 56,
    "dimensions": [
      {
        "id": "ai-ide",
        "label": "AI-native IDE",
        "labelZh": "AI 原生 IDE",
        "weight": 3,
        "productIds": [
          "amp",
          "cline",
          "cursor",
          "google-antigravity",
          "lingma-ai-ide",
          "qoder",
          "roo-code",
          "trae",
          "windsurf",
          "zed"
        ],
        "productCount": 10
      },
      {
        "id": "terminal-agent",
        "label": "Terminal agent",
        "labelZh": "终端 Agent",
        "weight": 3,
        "productIds": [
          "aider",
          "amazon-q-developer",
          "amp",
          "claude-code",
          "cline",
          "codebuddy",
          "codex-cli",
          "cursor",
          "gemini-cli",
          "glm-coding-plan",
          "google-antigravity",
          "goose",
          "grok-build",
          "jules",
          "kimi-code",
          "lingma-ai-ide",
          "mimo-code",
          "minimax-code",
          "muse-code",
          "openai-codex",
          "pi-agent",
          "qoder",
          "roo-code",
          "trae",
          "warp"
        ],
        "productCount": 25
      },
      {
        "id": "app-builder",
        "label": "Build an app from a prompt",
        "labelZh": "一句话生成应用",
        "weight": 2,
        "productIds": [
          "vibe"
        ],
        "productCount": 1
      },
      {
        "id": "completion",
        "label": "Completion & inline chat",
        "labelZh": "补全与行内对话",
        "weight": 2,
        "productIds": [
          "amazon-q-developer",
          "github-copilot",
          "lingma",
          "marscode",
          "p7887"
        ],
        "productCount": 5
      },
      {
        "id": "review-migration",
        "label": "Review & large edits",
        "labelZh": "评审与大范围改造",
        "weight": 1,
        "productIds": [
          "amazon-q-developer",
          "augment-code",
          "coderabbit",
          "cody",
          "cursor",
          "factory",
          "greptile"
        ],
        "productCount": 7
      }
    ]
  },
  {
    "id": "model-api",
    "title": "Models & APIs",
    "titleZh": "模型与 API",
    "description": "Hosted model access for building products. Judge on price, latency, context and data terms — not on leaderboard position.",
    "descriptionZh": "给自己的产品接模型。真正要比较的是价格、延迟、上下文和数据条款，而不是排行榜名次。",
    "products": [
      "ai21-studio",
      "amazon-bedrock",
      "azure-ai-foundry",
      "baidu-qianfan",
      "bailian",
      "bigmodel",
      "claude-api",
      "cohere-command",
      "cohere-rerank",
      "deepseek",
      "fireworks-ai",
      "gemini-enterprise",
      "google-ai-studio",
      "hunyuan",
      "lingyi-wanwu",
      "litellm",
      "llama-api",
      "meta-model-api",
      "minimax",
      "mistral-forge",
      "mistral-la-plateforme",
      "mistral-studio",
      "nvidia-nemo",
      "nvidia-nim",
      "openai-api",
      "phariaai",
      "portkey",
      "reka-ai",
      "siliconflow",
      "stepfun-platform",
      "together-ai",
      "vercel-ai-sdk",
      "vertex-ai",
      "volcengine-ark",
      "xai-api"
    ],
    "productCount": 35,
    "dimensions": [
      {
        "id": "inference-api",
        "label": "Inference API",
        "labelZh": "推理 API",
        "weight": 3,
        "productIds": [
          "ai21-studio",
          "bigmodel",
          "claude-api",
          "cohere-rerank",
          "deepseek",
          "fireworks-ai",
          "hunyuan",
          "litellm",
          "llama-api",
          "meta-model-api",
          "minimax",
          "mistral-la-plateforme",
          "nvidia-nim",
          "openai-api",
          "reka-ai",
          "stepfun-platform",
          "together-ai",
          "vercel-ai-sdk",
          "xai-api"
        ],
        "productCount": 19
      },
      {
        "id": "model-platform",
        "label": "Model platform / MaaS",
        "labelZh": "模型平台 / MaaS",
        "weight": 3,
        "productIds": [
          "ai21-studio",
          "amazon-bedrock",
          "azure-ai-foundry",
          "baidu-qianfan",
          "bailian",
          "bigmodel",
          "hunyuan",
          "llama-api",
          "mistral-la-plateforme",
          "openai-api",
          "reka-ai",
          "siliconflow",
          "vertex-ai",
          "volcengine-ark"
        ],
        "productCount": 14
      },
      {
        "id": "app-builder-platform",
        "label": "Build apps on a platform",
        "labelZh": "平台内直接搭应用",
        "weight": 2,
        "productIds": [
          "ai21-studio",
          "google-ai-studio",
          "mistral-studio"
        ],
        "productCount": 3
      }
    ]
  },
  {
    "id": "image-design",
    "title": "Image & design",
    "titleZh": "图像与设计",
    "description": "Generating pixels versus editing the layout you already have. These are different jobs with different tools.",
    "descriptionZh": "生成像素，和编辑你已有的版式，是两份不同的工作，用的工具也不同。",
    "products": [
      "adobe-generative-fill-in-photoshop",
      "apple-intelligence",
      "canva-magic-studio",
      "comate-ai-ide",
      "figma-ai",
      "framer-ai",
      "gamma",
      "google-flow",
      "grok-imagine",
      "hailuo",
      "higgsfield",
      "ideogram",
      "jimeng",
      "keling",
      "krea",
      "leonardo-ai",
      "midjourney",
      "p8719",
      "remini",
      "samsung-galaxy-ai",
      "sora",
      "v0",
      "webflow-ai"
    ],
    "productCount": 23,
    "dimensions": [
      {
        "id": "design-tools",
        "label": "Design in context",
        "labelZh": "在设计稿里协作",
        "weight": 3,
        "productIds": [
          "canva-magic-studio",
          "comate-ai-ide",
          "figma-ai",
          "framer-ai",
          "gamma",
          "krea",
          "webflow-ai"
        ],
        "productCount": 7
      },
      {
        "id": "image-generation",
        "label": "Generate images",
        "labelZh": "生成图像",
        "weight": 3,
        "productIds": [
          "canva-magic-studio",
          "google-flow",
          "grok-imagine",
          "ideogram",
          "jimeng",
          "keling",
          "krea",
          "leonardo-ai",
          "midjourney",
          "p8719",
          "sora"
        ],
        "productCount": 11
      },
      {
        "id": "upscale-edit",
        "label": "Upscale & retouch",
        "labelZh": "放大与修图",
        "weight": 2,
        "productIds": [
          "framer-ai",
          "gamma",
          "google-flow",
          "remini"
        ],
        "productCount": 4
      }
    ]
  },
  {
    "id": "local-private",
    "title": "Local & private",
    "titleZh": "本地与私有化",
    "description": "Running models on your own machine or your own server. The reason is usually privacy, latency, or cost per token.",
    "descriptionZh": "把模型跑在自己的机器或服务器上。原因通常是隐私、延迟，或者每 token 成本。",
    "products": [
      "aider",
      "cody",
      "flowise",
      "goose",
      "gpt4all",
      "jan",
      "langfuse",
      "lm-studio",
      "milvus",
      "minicpm",
      "mlx",
      "north",
      "nvidia-nim",
      "ollama",
      "openclaw",
      "phariaai",
      "qdrant",
      "weaviate",
      "zed"
    ],
    "productCount": 19,
    "dimensions": [
      {
        "id": "local-runner",
        "label": "Run on your machine",
        "labelZh": "本机运行",
        "weight": 3,
        "productIds": [
          "goose",
          "gpt4all",
          "jan",
          "lm-studio",
          "minicpm",
          "ollama"
        ],
        "productCount": 6
      },
      {
        "id": "self-hosted",
        "label": "Self-hosted service",
        "labelZh": "自托管服务",
        "weight": 3,
        "productIds": [
          "nvidia-nim",
          "openclaw",
          "phariaai",
          "weaviate"
        ],
        "productCount": 4
      },
      {
        "id": "edge-sdk",
        "label": "Edge & on-device SDK",
        "labelZh": "端侧 / 边缘 SDK",
        "weight": 2,
        "productIds": [
          "gpt4all",
          "mlx"
        ],
        "productCount": 2
      }
    ]
  },
  {
    "id": "video",
    "title": "Video production",
    "titleZh": "视频制作",
    "description": "From a one-line prompt to a finished cut. The first question is whether you are generating footage or editing what you already shot.",
    "descriptionZh": "从一句话到成片。第一个问题不是「哪个工具更强」，而是你要生成素材，还是剪自己拍的东西。",
    "products": [
      "descript",
      "google-flow",
      "grok-imagine",
      "hailuo",
      "heygen",
      "higgsfield",
      "jimeng",
      "keling",
      "krea",
      "luma-dream-machine",
      "p8719",
      "pika",
      "premiere-pro-generative-extend",
      "runway",
      "sora",
      "synthesia",
      "vidu"
    ],
    "productCount": 17,
    "dimensions": [
      {
        "id": "text-to-video",
        "label": "Text / image to video",
        "labelZh": "文生视频 / 图生视频",
        "weight": 3,
        "productIds": [
          "grok-imagine",
          "hailuo",
          "heygen",
          "higgsfield",
          "jimeng",
          "keling",
          "krea",
          "luma-dream-machine",
          "p8719",
          "pika",
          "premiere-pro-generative-extend",
          "runway",
          "sora",
          "synthesia",
          "vidu"
        ],
        "productCount": 15
      },
      {
        "id": "video-editing",
        "label": "Editing existing footage",
        "labelZh": "剪辑已有素材",
        "weight": 3,
        "productIds": [
          "descript",
          "google-flow"
        ],
        "productCount": 2
      },
      {
        "id": "avatar-presenter",
        "label": "Avatars & presenters",
        "labelZh": "数字人与出镜",
        "weight": 2,
        "productIds": [
          "heygen",
          "synthesia"
        ],
        "productCount": 2
      },
      {
        "id": "storyboard",
        "label": "Storyboard & ideation",
        "labelZh": "分镜与创意",
        "weight": 1,
        "productIds": [
          "google-flow",
          "grok-imagine",
          "keling",
          "krea",
          "luma-dream-machine",
          "pika",
          "runway",
          "sora"
        ],
        "productCount": 8
      }
    ]
  },
  {
    "id": "observability",
    "title": "Eval & observability",
    "titleZh": "评测与可观测",
    "description": "Knowing whether a model or agent actually got better. Trace what happened before you tune anything.",
    "descriptionZh": "判断模型或 Agent 是不是真的变好了。在动手调参之前，先看清发生了什么。",
    "products": [
      "arize-phoenix",
      "braintrust",
      "coderabbit",
      "cody",
      "gemini-enterprise",
      "greptile",
      "helicone",
      "langfuse",
      "langsmith",
      "litellm",
      "mistral-studio",
      "nvidia-nemo",
      "portkey",
      "weights-biases"
    ],
    "productCount": 14,
    "dimensions": [
      {
        "id": "evaluation",
        "label": "Evaluation & test sets",
        "labelZh": "评测与测试集",
        "weight": 3,
        "productIds": [
          "arize-phoenix",
          "braintrust",
          "langfuse",
          "langsmith",
          "mistral-studio",
          "nvidia-nemo"
        ],
        "productCount": 6
      },
      {
        "id": "tracing",
        "label": "Tracing & debugging",
        "labelZh": "链路追踪与调试",
        "weight": 3,
        "productIds": [
          "arize-phoenix",
          "braintrust",
          "helicone",
          "langfuse",
          "langsmith",
          "portkey"
        ],
        "productCount": 6
      },
      {
        "id": "experiment-tracking",
        "label": "Experiment tracking",
        "labelZh": "实验追踪",
        "weight": 2,
        "productIds": [
          "weights-biases"
        ],
        "productCount": 1
      }
    ]
  },
  {
    "id": "audio-voice",
    "title": "Audio & voice",
    "titleZh": "音频与语音",
    "description": "Speaking, singing, or turning speech into text. Voice cloning and dubbing are a different market from plain TTS.",
    "descriptionZh": "让机器说话、唱歌，还是把语音转成文字。声音克隆与配音，和普通文字转语音是两回事。",
    "products": [
      "apple-intelligence",
      "cartesia",
      "descript",
      "elevenlabs",
      "hume-ai",
      "samsung-galaxy-ai",
      "suno",
      "udio"
    ],
    "productCount": 8,
    "dimensions": [
      {
        "id": "music",
        "label": "Music generation",
        "labelZh": "音乐生成",
        "weight": 3,
        "productIds": [
          "descript",
          "elevenlabs",
          "suno",
          "udio"
        ],
        "productCount": 4
      },
      {
        "id": "text-to-speech",
        "label": "Speech synthesis",
        "labelZh": "语音合成",
        "weight": 3,
        "productIds": [
          "cartesia",
          "descript",
          "elevenlabs",
          "hume-ai",
          "suno",
          "udio"
        ],
        "productCount": 6
      },
      {
        "id": "transcription",
        "label": "Transcription",
        "labelZh": "语音转文字",
        "weight": 2,
        "productIds": [
          "descript"
        ],
        "productCount": 1
      },
      {
        "id": "voice-cloning",
        "label": "Cloning & dubbing",
        "labelZh": "声音克隆与配音",
        "weight": 2,
        "productIds": [
          "cartesia",
          "elevenlabs",
          "hume-ai"
        ],
        "productCount": 3
      }
    ]
  }
],
  products: [
  {
    "id": "dots",
    "name": "Dots",
    "nameZh": "Dots 常驻智能体",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "logo": "/assets/logos/openai.ico",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "research",
      "office"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "You close the tab and the work stops. A dot keeps going in its own cloud, so a long job survives you stepping away.",
    "solvesZh": "你一关标签页，活就停了。dot 在自己的云端继续跑，长任务不会因为你走开而中断。",
    "bestFor": "When a job takes hours and you would otherwise have to sit and watch the chat.",
    "bestForZh": "当一件事要跑上几小时，而你并不想一直守着对话框等它。",
    "released": "2026-09-29",
    "datePrecision": "day",
    "homepage": "https://openai.com/index/introducing-dots/",
    "desc": "A ChatGPT agent that keeps running in the cloud after you leave.",
    "descZh": "关掉标签页也在云端继续跑的智能体。",
    "tags": [
      "in-product",
      "chatgpt"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "D"
  },
  {
    "id": "muse",
    "name": "Muse",
    "nameZh": "Muse 个人智能体",
    "vendor": "Meta",
    "vendorZh": "Meta",
    "logo": "/assets/logos/meta.png",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Errands pile up because each one means logging in and clicking. It uses your accounts to carry them out for you.",
    "solvesZh": "杂事堆着是因为每件都要登录、点点点。它用你的账号把这些事替你做完。",
    "bestFor": "When you want shopping or email handled for you without doing the clicking yourself.",
    "bestForZh": "想让购物、邮件这类事自动代办、自己不用动手点的时候。",
    "released": "2026-09-08",
    "datePrecision": "day",
    "homepage": "https://www.meta.com/ai/",
    "desc": "Personal AI agent that acts on your accounts and completes real errands.",
    "descZh": "能调用你的账号、真正替你办事的个人 AI 智能体。",
    "tags": [
      "personal-agent",
      "proactive",
      "shopping",
      "email"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "M"
  },
  {
    "id": "wanyo",
    "name": "万有无界",
    "nameZh": "万有无界",
    "vendor": "Wanyo (万有)",
    "vendorZh": "万有",
    "logo": null,
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "office",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Splitting one job across several roles means someone has to hold the thread together. 万有无界 lets multiple digital employees take turns finishing it.",
    "solvesZh": "一件事要拆给多个角色分别推进，串起来全靠人盯着。万有无界让多个数字员工接力完成。",
    "bestFor": "When you want a cross-role job handed to a chain of agents to run.",
    "bestForZh": "你要把一件跨岗位的活拆给多个智能体接力跑。",
    "released": "2026-09-02",
    "datePrecision": "day",
    "homepage": "https://work.wanyo.cn/",
    "desc": "多角色 Agent 协作工作台",
    "descZh": "多角色 Agent 协作工作台",
    "tags": [
      "multi-agent",
      "enterprise",
      "a2a",
      "workbench"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "万"
  },
  {
    "id": "p2265",
    "name": "商汤小浣熊",
    "nameZh": "商汤小浣熊 Raccoon Work",
    "vendor": "商汤",
    "vendorZh": "商汤",
    "logo": "/assets/logos/sensetime.svg",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building",
      "research"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "Getting a folder of spreadsheets analyzed means uploading them to a web page and downloading the result. The files stay on your machine and it reads them directly.",
    "solvesZh": "把一个文件夹的表格拖到网页里再下载结果，来回折腾。文件留在本机，它直接读进去跑完分析。",
    "bestFor": "You have local files to summarize or compare that should not go up to a public site.",
    "bestForZh": "手头有一批本地文件要汇总、比对，且内容不适合上传到公网。",
    "released": "2026-08-25",
    "datePrecision": "day",
    "homepage": "https://www.xiaohuanxiong.com/",
    "desc": "能搞定工作的桌面 AI 智能体",
    "descZh": "能搞定工作的桌面 AI 智能体",
    "tags": [
      "desktop-agent",
      "data-analysis",
      "knowledge-base",
      "private-deployment"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "商"
  },
  {
    "id": "muse-code",
    "name": "Muse Code",
    "nameZh": "Muse Code 编程智能体",
    "vendor": "Meta",
    "vendorZh": "Meta",
    "logo": "/assets/logos/meta.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "agent-building"
    ],
    "form": "cli",
    "surface": "standalone",
    "solves": "You have to leave your terminal to ask for a code change. It works in the shell you already live in, across files.",
    "solvesZh": "想让它改代码，就得先离开终端。它直接在你平时用的 shell 里工作，能跨文件操作。",
    "bestFor": "When you want a coding agent without switching away from the command line.",
    "bestForZh": "想要一个编码 Agent，但不想离开命令行的时候。",
    "released": "2026-08-01",
    "datePrecision": "day",
    "homepage": "https://ai.meta.com/",
    "desc": "Meta's terminal coding agent, built on the Muse Spark model family.",
    "descZh": "Meta 基于 Muse Spark 系列模型推出的终端编程智能体。",
    "tags": [
      "terminal",
      "beta",
      "multi-file",
      "macos"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "M"
  },
  {
    "id": "work",
    "name": "纳米Work",
    "nameZh": "纳米Work",
    "vendor": "360",
    "vendorZh": "360",
    "logo": "/assets/logos/360.ico",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "office",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "A small business wants to give its team AI but has nobody to operate it. Agents run in an isolated cloud sandbox, while your code and data stay on your side.",
    "solvesZh": "小企业想给团队上 AI，又没有运维人手。智能体跑在云端隔离沙箱里，代码和数据留在你这一侧。",
    "bestFor": "You run a small business, want AI for your team, and don't want to stand up servers.",
    "bestForZh": "中小企业主想给团队开 AI，不想自己搭服务器。",
    "released": "2026-07-28",
    "datePrecision": "day",
    "homepage": "https://www.360.cn/",
    "desc": "360 企业级智能体工作平台",
    "descZh": "360 企业级智能体工作平台",
    "tags": [
      "enterprise-agent",
      "multi-model",
      "cloud-desktop",
      "sandbox"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "纳"
  },
  {
    "id": "meta-model-api",
    "name": "Meta Model API",
    "nameZh": "Meta 模型 API",
    "vendor": "Meta",
    "vendorZh": "Meta",
    "logo": "/assets/logos/meta.png",
    "region": "intl",
    "category": "model-platform",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Adopting a Meta model means learning its own API shape. Here the model families arrive through an OpenAI-compatible endpoint instead.",
    "solvesZh": "接入 Meta 模型意味着要重新学一套 API 写法。这里通过兼容 OpenAI 的接口就能用上这些模型家族。",
    "bestFor": "When you already speak the OpenAI API and want Meta's models without writing an adapter.",
    "bestForZh": "已经熟悉 OpenAI API，想直接用 Meta 模型又不想再写适配层的时候。",
    "released": "2026-07-09",
    "datePrecision": "day",
    "homepage": "https://ai.meta.com/",
    "desc": "Meta's developer API for the Muse Spark and Muse Image model families.",
    "descZh": "Meta 面向开发者的模型接口，提供 Muse Spark 与 Muse Image 系列。",
    "tags": [
      "openai-compatible",
      "spark",
      "image-generation"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "M"
  },
  {
    "id": "copilot-cowork",
    "name": "Copilot Cowork",
    "nameZh": "Copilot Cowork 协作智能体",
    "vendor": "Microsoft",
    "vendorZh": "Microsoft",
    "logo": "/assets/logos/microsoft.ico",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "A finished deliverable needs a dozen tools and a long chain of steps. It runs the whole job and hands back the result.",
    "solvesZh": "要做出一份成品，得用十几个工具串一长串步骤。它把整件事跑完，直接交出结果。",
    "bestFor": "When you need a real output, like a flow chart or a ranked list, built from your Microsoft 365 files.",
    "bestForZh": "当你需要基于 Microsoft 365 文件产出真东西，比如流程图或一份排好序的清单时。",
    "released": "2026-06-16",
    "datePrecision": "day",
    "homepage": "https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/16/copilot-cowork-is-now-generally-available",
    "desc": "Microsoft 365 Copilot mode that runs multi-step tasks and returns deliverables.",
    "descZh": "Microsoft 365 Copilot 中可执行多步任务并交付成果的协作模式。",
    "tags": [
      "m365",
      "multi-step",
      "deliverables",
      "ga"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "mimo-code",
    "name": "MiMo Code",
    "nameZh": "MiMo Code",
    "vendor": "小米",
    "vendorZh": "小米",
    "logo": "/assets/logos/xiaomi.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "surface": "standalone",
    "solves": "Every new conversation means re-explaining the project, and requirements still have to be typed. This open-source assistant remembers the project and takes spoken instructions.",
    "solvesZh": "换个会话就得把项目背景重讲一遍，需求还得手打。这个开源助手会记住项目，还能听你说话下指令。",
    "bestFor": "You work on one project for a long time and don't want to keep restating the context.",
    "bestForZh": "你长期跟同一个项目写代码，不想反复交代上下文。",
    "released": "2026-06-11",
    "datePrecision": "day",
    "homepage": "https://mimo.mi.com/docs/zh-CN/news/latest/mimocode",
    "desc": "小米开源终端 AI 编程助手",
    "descZh": "小米开源终端 AI 编程助手",
    "tags": [
      "open-source",
      "terminal",
      "persistent-memory",
      "voice-input"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "M"
  },
  {
    "id": "vibe",
    "name": "Vibe",
    "nameZh": "Vibe 智能体",
    "vendor": "Mistral AI",
    "vendorZh": "Mistral AI",
    "logo": "/assets/logos/mistral-ai.svg",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "coding",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Chatting, research, and coding live in different assistants, and every switch loses your context. This one agent does all three.",
    "solvesZh": "聊天、查资料、写代码分属不同助手，切换一次上下文就断了。它把三件事合进同一个智能体。",
    "bestFor": "You want one assistant that handles office chat and writes code directly.",
    "bestForZh": "你要一个既能办公对话、又能直接写代码的助手。",
    "released": "2026-05-28",
    "datePrecision": "day",
    "homepage": "https://mistral.ai/vibe",
    "desc": "Mistral's unified agent for chat, productivity work and coding.",
    "descZh": "Mistral 将对话、办公与编程合并在一起的统一智能体。",
    "tags": [
      "work-mode",
      "code-mode",
      "european",
      "rename"
    ],
    "status": "renamed",
    "supersededBy": "le-chat",
    "successorName": "Le Chat",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "V"
  },
  {
    "id": "grok-build",
    "name": "Grok Build",
    "nameZh": "Grok Build 编程智能体",
    "vendor": "xAI",
    "vendorZh": "xAI",
    "logo": "/assets/logos/xai.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "agent-building"
    ],
    "form": "cli",
    "surface": "standalone",
    "solves": "One agent working serially is the bottleneck on a large task. It fans the work out across parallel agents in your terminal.",
    "solvesZh": "大任务上，一个智能体串行干活就是瓶颈。它在终端里把工作分派给多个并行智能体。",
    "bestFor": "When a task is big enough that you would rather start many agents than watch one grind.",
    "bestForZh": "当任务大到你更想一次开多个智能体，而不是盯着一个慢慢磨时。",
    "released": "2026-05-25",
    "datePrecision": "day",
    "homepage": "https://grok.com/",
    "desc": "Terminal-native coding agent that fans work out across parallel agents.",
    "descZh": "运行在终端里的编程智能体，可把任务分派给大量并行智能体。",
    "tags": [
      "terminal",
      "open-source",
      "parallel",
      "workflows"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "G"
  },
  {
    "id": "lingyi-wanwu",
    "name": "万智",
    "nameZh": "万智",
    "vendor": "零一万物",
    "vendorZh": "零一万物",
    "logo": "/assets/logos/01ai.png",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Enterprises adopting large models end up buying deployment, fine-tuning and application tooling separately, then stitching them together. They are collected in one platform here.",
    "solvesZh": "企业想上大模型，部署、微调和应用要分别采购再拼起来。这里把它们收在一个平台里。",
    "bestFor": "When a company wants to build its own LLM applications without buying three separate toolchains.",
    "bestForZh": "企业要自建大模型应用，不想分别采购部署、微调和应用工具。",
    "released": "2026-05-21",
    "datePrecision": "day",
    "homepage": "https://www.lingyiwanwu.com",
    "desc": "零一万物企业级多智能体平台",
    "descZh": "零一万物企业级多智能体平台",
    "tags": [
      "agent-platform",
      "multi-agent",
      "01-ai"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "万"
  },
  {
    "id": "gemini-enterprise",
    "name": "Gemini Enterprise Agent Platform",
    "nameZh": "Gemini 企业智能体平台",
    "vendor": "Google",
    "vendorZh": "Google",
    "logo": "/assets/logos/google.png",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "model-api",
      "observability"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Every team builds agents differently and nobody can say who may touch production. It puts building, permissions and run history in one place.",
    "solvesZh": "每个团队搭 Agent 的方式都不一样，也没人说得清谁有权动生产环境。它把构建、权限和运行记录收在一处。",
    "bestFor": "When a company has more than a handful of internal agents and needs an audit trail.",
    "bestForZh": "当公司内部的 Agent 超过几个，需要一条可追溯的审计线索时。",
    "released": "2026-04-22",
    "datePrecision": "day",
    "homepage": "https://cloud.google.com/gemini-enterprise",
    "desc": "Google Cloud's unified platform to build, govern and scale enterprise agents.",
    "descZh": "Google Cloud 用于构建、治理和扩展企业智能体的统一平台。",
    "tags": [
      "enterprise",
      "orchestration",
      "governance",
      "rebrand"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "G"
  },
  {
    "id": "mistral-forge",
    "name": "Mistral Forge",
    "nameZh": "Mistral Forge 模型定制平台",
    "vendor": "Mistral AI",
    "vendorZh": "Mistral AI",
    "logo": "/assets/logos/mistral-ai.svg",
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "A general model doesn't know your company's data or rules, so you have to prepare the corpus and the evaluation yourself. This platform covers the path from training to deployment.",
    "solvesZh": "通用模型不懂你公司的数据和规矩，你得自己准备语料和评测。这条路从训练到上线在一个平台里。",
    "bestFor": "You need to train a model that serves only your own business and can explain itself.",
    "bestForZh": "你要训一个只服务自己业务、且能解释的模型。",
    "released": "2026-03-17",
    "datePrecision": "day",
    "homepage": "https://mistral.ai/forge",
    "desc": "Enterprise service to train, align, evaluate and deploy your own models.",
    "descZh": "用于训练、对齐、评估和部署自有模型的企业平台。",
    "tags": [
      "fine-tuning",
      "evaluation",
      "sovereign",
      "enterprise"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "M"
  },
  {
    "id": "p8244",
    "name": "华为云码道",
    "nameZh": "华为云码道",
    "vendor": "华为",
    "vendorZh": "华为",
    "logo": "/assets/logos/huawei.ico",
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "Overseas coding tools cover HarmonyOS and Ascendant poorly, and 信创 rules often bar code leaving the network. This one runs on premises.",
    "solvesZh": "海外编码工具对 HarmonyOS 和 Ascendant 覆盖很差，而信创规则常常禁止代码出网。这个工具可以私有化部署。",
    "bestFor": "When you build HarmonyOS apps, or a compliance rule keeps code inside Huawei Cloud.",
    "bestForZh": "当你要开发鸿蒙应用，或者合规要求把代码留在华为云内。",
    "released": "2026-02-26",
    "datePrecision": "day",
    "homepage": "https://www.huaweicloud.com/product/codearts/ai.html",
    "desc": "华为云 AI 编码智能体",
    "descZh": "华为云 AI 编码智能体",
    "tags": [
      "harmonyos",
      "ascend",
      "spec-driven",
      "on-premise"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "华"
  },
  {
    "id": "kimi-claw",
    "name": "Kimi Claw",
    "nameZh": "Kimi Claw",
    "vendor": "月之暗面",
    "vendorZh": "月之暗面",
    "logo": "/assets/logos/moonshot.png",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Deploying an agent to the cloud means setting up an environment and installing dependencies. Here it deploys from the browser in one click.",
    "solvesZh": "在云上部署一个 Agent 要配环境、装依赖。在浏览器里就能一键部署起来。",
    "bestFor": "When you want to deploy and run an agent in the cloud straight from a browser.",
    "bestForZh": "想在浏览器里直接把一个 Agent 部署到云上跑起来。",
    "released": "2026-02-15",
    "datePrecision": "day",
    "homepage": "https://www.kimi.com/claw",
    "desc": "浏览器内一键部署的云端 Agent",
    "descZh": "浏览器内一键部署的云端 Agent",
    "tags": [
      "agent-platform",
      "cloud-agent",
      "moonshot"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "K"
  },
  {
    "id": "frontier",
    "name": "Frontier",
    "nameZh": "Frontier 企业智能体平台",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "logo": "/assets/logos/openai.ico",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Dozens of AI assistants inside a company each run their own way, and no one can say who is using them or who is accountable. This is one place to build and govern them.",
    "solvesZh": "公司里几十个 AI 助手各跑各的，没人说得清谁在用、出了事谁担。这里给你一块地方统着搭管。",
    "bestFor": "Several departments share the same set of AI agents and need one place to govern them.",
    "bestForZh": "多个部门要共用一批 AI 智能体、需要统一管控。",
    "released": "2026-02-05",
    "datePrecision": "day",
    "homepage": "https://openai.com/frontier/",
    "desc": "OpenAI's no-code platform to build and govern enterprise AI agents.",
    "descZh": "OpenAI 用于构建和治理企业级 AI 智能体的无代码平台。",
    "tags": [
      "enterprise",
      "no-code",
      "governance",
      "orchestration"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "F"
  },
  {
    "id": "joyai",
    "name": "JoyAI",
    "nameZh": "JoyAI",
    "vendor": "京东",
    "vendorZh": "京东",
    "logo": "/assets/logos/jd.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Ordering food, buying wine and booking a hotel each mean opening a different app and comparing slowly. State the need and a digital human compares the options and places the order.",
    "solvesZh": "点外卖、买酒、订酒店要开好几个 App 慢慢挑。说出需求，数字人替你比完并下单。",
    "bestFor": "When you want to skip the whole sequence of searching, comparing prices and typing in an address inside shopping apps.",
    "bestForZh": "想省掉在购物 App 里翻找、比价、填地址的一整套动作。",
    "released": "2026-02-05",
    "datePrecision": "day",
    "homepage": "https://joy.jd.com/",
    "desc": "京东万能数字人生活助手",
    "descZh": "京东万能数字人生活助手",
    "tags": [
      "digital-human",
      "ai-shopping",
      "voice-first",
      "companion"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "J"
  },
  {
    "id": "grok-imagine",
    "name": "Grok Imagine",
    "nameZh": "Grok Imagine 图像与视频创作",
    "vendor": "xAI",
    "vendorZh": "xAI",
    "logo": "/assets/logos/xai.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design",
      "video"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "You want a picture or a short clip from a sentence without leaving the chat you are already in.",
    "solvesZh": "你只想在当前对话里，用一句话换来一张图或一段短片，不用切走。",
    "bestFor": "When you are mid-conversation and want to try a visual instead of describing one.",
    "bestForZh": "当聊天正进行到一半，你想直接看个视觉结果而不是描述它时。",
    "released": "2026-01-28",
    "datePrecision": "day",
    "homepage": "https://grok.com/",
    "desc": "xAI's image and video generation surface inside Grok.",
    "descZh": "Grok 内的图像与视频生成创作界面。",
    "tags": [
      "image-generation",
      "video-generation",
      "creative"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "G"
  },
  {
    "id": "p9112",
    "name": "问小团",
    "nameZh": "问小团",
    "vendor": "美团",
    "vendorZh": "美团",
    "logo": "/assets/logos/meituan.png",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Asking about a restaurant or booking a service means scrolling lists, comparing them and jumping to another app. Wenxiaotuan answers inside Meituan and completes the order.",
    "solvesZh": "问餐厅、订服务要自己翻列表、比对、再跳转。问小团在美团里直接给答案并完成下单。",
    "bestFor": "When you want to decide where to eat or which service to book on Meituan and place the order on the spot.",
    "bestForZh": "你要在美团上决定今晚吃什么或办哪项服务，并当场下单。",
    "released": "2026-01-22",
    "datePrecision": "day",
    "homepage": "https://www.meituan.com/",
    "desc": "美团本地生活 AI 决策助手",
    "descZh": "美团本地生活 AI 决策助手",
    "tags": [
      "local-services",
      "recommendation",
      "transactional-ai",
      "longcat"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "问"
  },
  {
    "id": "openclaw",
    "name": "OpenClaw",
    "nameZh": "OpenClaw",
    "vendor": "OpenClaw",
    "vendorZh": "OpenClaw",
    "logo": "/assets/logos/openclaw.png",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "local-private"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "An agent is stuck inside its own interface, and you cannot drive it from WeChat or a terminal. This gateway connects it to the channels you already use.",
    "solvesZh": "智能体只能待在它自己的界面里，你想从微信或终端指挥它都做不到。这个网关把它接到常用通道上。",
    "bestFor": "You want the agent running on your own machine and driven from a chat tool.",
    "bestForZh": "希望智能体跑在自己机器上，并能用聊天工具指挥它。",
    "released": "2026-01-15",
    "datePrecision": "day",
    "homepage": "https://openclaw.ai/",
    "desc": "Self-hosted multi-channel agent gateway you run yourself.",
    "descZh": "自托管的多通道 Agent 网关，运行时完全由你掌控。",
    "tags": [
      "self-hosted",
      "gateway",
      "messaging"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/openclaw/",
        "zh": "/zh/products/openclaw/"
      }
    },
    "lastVerifiedAt": null,
    "glyph": "O"
  },
  {
    "id": "slackbot",
    "name": "Slackbot",
    "nameZh": "Slackbot",
    "vendor": "Salesforce",
    "vendorZh": "Salesforce",
    "logo": "/assets/logos/salesforce.ico",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "A workspace assistant that has to be re-taught your context each time. Slackbot learns your tone and your workspace, and can prep meetings, analyze reports, and draft project briefs on its own.",
    "solvesZh": "工作区助手每次都要你重新教一遍它上下文。Slackbot 会学到你的语气和工作区习惯，能自己准备会议、分析报告、起草项目简介。",
    "bestFor": "You want a personal agent inside Slack that already knows your projects and writing style.",
    "bestForZh": "你想要一个已经了解你项目和写作风格的 Slack 内个人助手。",
    "released": "2026-01-13",
    "datePrecision": "day",
    "homepage": "https://slack.com/features/ai",
    "desc": "A personal agent in Slack that learns your working style.",
    "descZh": "会学你工作习惯的 Slack 个人助手。",
    "tags": [
      "in-product",
      "slack"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "S"
  },
  {
    "id": "claude-cowork",
    "name": "Claude Cowork",
    "nameZh": "Claude Cowork",
    "vendor": "Anthropic",
    "vendorZh": "Anthropic",
    "logo": "/assets/logos/anthropic.ico",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "Desk work you never finish because it is dozens of small file operations. It runs them on your machine and hands back the result.",
    "solvesZh": "桌面上那些琐碎文件操作太多，总是做不完。它在你本机跑完这些操作，然后把结果交回来。",
    "bestFor": "When a task is defined by its steps and files, and you would rather review than perform it.",
    "bestForZh": "当任务可以用步骤和文件说清楚，而你更想审一遍而不是亲手做。",
    "released": "2026-01-12",
    "datePrecision": "day",
    "homepage": "https://www.anthropic.com/product/claude-cowork",
    "desc": "Desktop knowledge-work agent, folded into Claude in Sept 2026",
    "descZh": "桌面端知识工作智能体，2026 年 9 月并入 Claude",
    "tags": [
      "autonomous-agent",
      "knowledge-work",
      "desktop",
      "enterprise"
    ],
    "status": "merged",
    "supersededBy": "claude-ai",
    "successorName": "Claude.ai",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/claude/",
        "zh": "/zh/products/claude/"
      }
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "google-antigravity",
    "name": "Google Antigravity",
    "nameZh": "Google Antigravity",
    "vendor": "Google",
    "vendorZh": "Google",
    "logo": "/assets/logos/google.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "You can only watch one agent at a time, so a slow task blocks everything queued behind it. This one runs several at once in a single view.",
    "solvesZh": "一次只能盯一个 Agent，排在后面全被慢的那个堵住。它在同一个视图里同时跑多个任务。",
    "bestFor": "When you want three tasks going in parallel without three editor windows.",
    "bestForZh": "当你想让三个任务并行推进，而不必开三个编辑器窗口。",
    "released": "2025-11-18",
    "datePrecision": "day",
    "homepage": "https://antigravity.google/",
    "desc": "Agent-first IDE with parallel agent manager view, built on Gemini 3",
    "descZh": "智能体优先的 IDE，支持并行智能体管理视图，基于 Gemini 3",
    "tags": [
      "ide",
      "agentic-coding",
      "autonomous",
      "vscode-fork"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/gemini/",
        "zh": "/zh/products/gemini/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "G"
  },
  {
    "id": "qianwen",
    "name": "千问",
    "nameZh": "千问",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "logo": "/assets/logos/alibaba.png",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Researching, reading pages and building a deck means switching between several tools. 千问 pulls them into a single chat box.",
    "solvesZh": "搜资料、读网页、做 PPT 要在几个工具之间来回切。千问把它们收进一个对话框。",
    "bestFor": "When you want to look things up and produce a document or slides in the same place.",
    "bestForZh": "你要一边查资料一边产出文档或演示稿。",
    "released": "2025-11-17",
    "datePrecision": "day",
    "homepage": "https://qianwen.com",
    "desc": "阿里新一代 AI 助手应用",
    "descZh": "阿里新一代 AI 助手应用",
    "tags": [
      "chat-assistant",
      "qwen",
      "alibaba"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/qwen/",
        "zh": "/zh/products/qwen/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "千"
  },
  {
    "id": "minimax-code",
    "name": "MiniMax Code",
    "nameZh": "MiniMax Code",
    "vendor": "MiniMax",
    "vendorZh": "MiniMax",
    "logo": "/assets/logos/minimax.png",
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "surface": "standalone",
    "solves": "A coding assistant that only works inside an IDE leaves the terminal out. MiniMax Code gives you both a CLI and a desktop app for having a model edit your code.",
    "solvesZh": "编码助手只在 IDE 里能用。想在终端里让模型改代码，命令行和桌面工具各接一处。",
    "bestFor": "When you prefer having the model edit code in the terminal rather than clicking through an IDE.",
    "bestForZh": "你习惯在终端里让模型改代码，而不是在 IDE 里点按钮。",
    "released": "2025-10-27",
    "datePrecision": "day",
    "homepage": "https://code.minimax.io",
    "desc": "MiniMax 编码命令行与桌面工具",
    "descZh": "MiniMax 编码命令行与桌面工具",
    "tags": [
      "coding-agent",
      "cli",
      "minimax"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/minimax-code/",
        "zh": "/zh/products/minimax-code/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "M"
  },
  {
    "id": "chatgpt-atlas",
    "name": "ChatGPT Atlas",
    "nameZh": "ChatGPT Atlas 浏览器",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "logo": "/assets/logos/openai.ico",
    "region": "intl",
    "category": "search",
    "useCases": [
      "research",
      "office"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "Twenty tabs open at once, and the answer is scattered across all of them. It reads those pages for you and answers from what it found.",
    "solvesZh": "浏览器里同时开二十个标签，答案散在每个页面。它替你读完这些页面再回答。",
    "bestFor": "Research has piled up across a dozen tabs and you want the conclusion (discontinued).",
    "bestForZh": "研究时攒了一堆标签页、想直接要结论（已停服）。",
    "released": "2025-10-22",
    "datePrecision": "day",
    "homepage": "https://openai.com/index/introducing-chatgpt-atlas/",
    "desc": "OpenAI's ChatGPT-native browser, now discontinued.",
    "descZh": "OpenAI 推出的 ChatGPT 原生浏览器，现已停服。",
    "tags": [
      "ai-browser",
      "discontinued",
      "mac-only",
      "agentic"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "amazon-quick-suite",
    "name": "Amazon Quick Suite",
    "nameZh": "Amazon Quick Suite 智能工作台",
    "vendor": "Amazon",
    "vendorZh": "Amazon",
    "logo": "/assets/logos/amazon.png",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "The chart says sales dropped and the CRM says otherwise, so the argument takes a week. It queries both and shows you the join.",
    "solvesZh": "图表说销量下滑，CRM 却说相反，一场争论要耗一周。它同时查两边，并把关联结果摆出来。",
    "bestFor": "When a business question needs numbers from several SaaS tools at once.",
    "bestForZh": "当一个业务问题需要同时取好几个 SaaS 工具里的数字。",
    "released": "2025-10-09",
    "datePrecision": "day",
    "homepage": "https://aws.amazon.com/quicksuite/",
    "desc": "AWS's agentic workspace where business users run agents on their data.",
    "descZh": "AWS 面向业务用户的智能体工作台，可直接操作企业数据。",
    "tags": [
      "aws",
      "workspace",
      "analytics",
      "saas-connectors"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "A"
  },
  {
    "id": "dia",
    "name": "Dia",
    "nameZh": "Dia 浏览器",
    "vendor": "The Browser Company",
    "vendorZh": "The Browser Company",
    "logo": "/assets/logos/the-browser-company.png",
    "region": "intl",
    "category": "search",
    "useCases": [
      "research",
      "office"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "A dozen tabs open at once, with the answer scattered across all of them. The chat box reads the pages you have open and gives back one integrated answer.",
    "solvesZh": "同时开着十几个标签页，答案散在各处。对话框直接读你打开的页面，给出一段整合过的回答。",
    "bestFor": "Research has already piled up in tabs and you want AI to read them all at once.",
    "bestForZh": "研究时已经攒了一堆标签页、想让 AI 一次读完。",
    "released": "2025-10-08",
    "datePrecision": "day",
    "homepage": "https://www.diabrowser.com/",
    "desc": "Browser built around an AI chat that reads your open tabs.",
    "descZh": "以 AI 对话为核心、可以直接读取你打开的标签页的浏览器。",
    "tags": [
      "ai-browser",
      "chat-with-tabs",
      "mac-only",
      "arc-successor"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "D"
  },
  {
    "id": "mem",
    "name": "Mem",
    "nameZh": "Mem",
    "vendor": "Mem Labs",
    "vendorZh": "Mem Labs",
    "logo": "/assets/logos/mem-labs.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "You write everything down and can never find any of it. Notes get linked to related ones automatically, so recall stops depending on the title you chose.",
    "solvesZh": "你什么都记下来，却永远找不到。笔记会自动关联到相关内容，找东西不再取决于当时起的标题。",
    "bestFor": "When you keep a notes app and only ever search inside it.",
    "bestForZh": "当你有个笔记应用，却只在里面翻来翻去找东西。",
    "released": "2025-10-01",
    "datePrecision": "day",
    "homepage": "https://get.mem.ai",
    "desc": "Self-organising AI notes and thought partner",
    "descZh": "自动组织笔记的 AI 记录工具，2025-10 推出重写后的 2.0 正式版",
    "tags": [
      "notes",
      "personal-ai",
      "knowledge-base"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "M"
  },
  {
    "id": "mistral-studio",
    "name": "Mistral Studio",
    "nameZh": "Mistral Studio 开发平台",
    "vendor": "Mistral AI",
    "vendorZh": "Mistral AI",
    "logo": "/assets/logos/mistral-ai.svg",
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building",
      "model-api",
      "observability"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "You only find out what's wrong with an agent after it ships. Studio lets you run it while you build, read the evaluation results, and go back and fix things.",
    "solvesZh": "智能体写完只能上线才知道哪里不对。Studio 让你边搭边跑，还能看评估结果再回头改。",
    "bestFor": "You are tuning an agent flow and need to retry each step's inputs and outputs repeatedly.",
    "bestForZh": "你在调一条智能体流程，要反复试各步骤的输入输出。",
    "released": "2025-10-01",
    "datePrecision": "day",
    "homepage": "https://mistral.ai/studio",
    "desc": "Mistral's workbench for building, testing and running agents and apps.",
    "descZh": "Mistral 用于构建、测试和运行智能体与应用的开发平台。",
    "tags": [
      "workbench",
      "workflows",
      "evaluation",
      "agents"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "M"
  },
  {
    "id": "opera-neon",
    "name": "Opera Neon",
    "nameZh": "Opera Neon 浏览器",
    "vendor": "Opera",
    "vendorZh": "Opera",
    "logo": "/assets/logos/opera.ico",
    "region": "intl",
    "category": "search",
    "useCases": [
      "research",
      "office"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "An agent browser that has your logins is a browser that can be talked into doing something. Neon runs the model on your machine, so the pages you see never leave it.",
    "solvesZh": "掌握你登录态的 Agent 浏览器，等于一个能被说服去动手的浏览器。Neon 在本机跑模型，你看的页面不出本机。",
    "bestFor": "When you want an agent to act on web apps and do not want your session sent to a server.",
    "bestForZh": "当你想让 Agent 操作网页应用，又不想把会话送到服务器。",
    "released": "2025-09-30",
    "datePrecision": "day",
    "homepage": "https://www.opera.com/neon/",
    "desc": "Opera subscription browser that automates tasks and runs AI locally.",
    "descZh": "Opera 的订阅制浏览器，能自动代办任务且部分 AI 在本地运行。",
    "tags": [
      "ai-browser",
      "agentic",
      "local-processing",
      "subscription"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "O"
  },
  {
    "id": "chatgpt-pulse",
    "name": "ChatGPT Pulse",
    "nameZh": "ChatGPT Pulse 每日简报",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "logo": "/assets/logos/openai.ico",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "An assistant only speaks when you open it, so all the things worth knowing about have to be remembered as questions you never ask. Pulse researches on its own overnight and hands you a morning brief.",
    "solvesZh": "助手只在你打开它时才说话，所以值得知道的事全靠你自己想出该问的问题。Pulse 会在夜里自己研究，第二天早上给你一份简报。",
    "bestFor": "You want a short personalized daily digest shaped by what you've actually been discussing and working on.",
    "bestForZh": "你想要一份根据你实际在聊、在做的事定制的每日短简报。",
    "released": "2025-09-25",
    "datePrecision": "day",
    "homepage": "https://openai.com/index/introducing-chatgpt-pulse/",
    "desc": "A daily briefing it researches and writes while you sleep.",
    "descZh": "夜里自动研究、早上给你简报的助手。",
    "tags": [
      "in-product",
      "chatgpt"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "github-copilot-agent-mode",
    "name": "GitHub Copilot agent mode",
    "nameZh": "GitHub Copilot 智能体模式",
    "vendor": "Microsoft",
    "vendorZh": "Microsoft",
    "logo": "/assets/logos/microsoft.ico",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Edit mode only changes the snippet you highlighted, and you run the terminal command yourself. Agent mode picks the files, writes the edits across the repo, runs the commands, and reacts to the errors.",
    "solvesZh": "编辑模式只改你选中的那几行，终端命令还得你自己敲。智能体模式自己选文件、跨仓库写改动、跑命令，并会根据报错继续调整。",
    "bestFor": "Multi-file changes with build and test cycles, where you want the whole loop driven rather than single edits.",
    "bestForZh": "涉及多文件改动加上构建与测试循环的任务——你想让整条回路自己跑，而不是一次次手动改。",
    "released": "2025-09-01",
    "datePrecision": "month",
    "homepage": "https://github.blog/news-insights/product-news/github-copilot-agent-mode-activated/",
    "desc": "A mode that plans and runs a whole multi-file change.",
    "descZh": "自主完成多文件改动的编码模式。",
    "tags": [
      "in-product",
      "github-copilot"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "G"
  },
  {
    "id": "qoder",
    "name": "Qoder",
    "nameZh": "Qoder",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "logo": "/assets/logos/alibaba.png",
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "Choosing a coding model and hooking it up is the slow part. Qoder arrives as a full IDE with one already chosen.",
    "solvesZh": "选编码模型、把它接进编辑器是最耗时间的部分。Qoder 直接就是一个完整 IDE，模型已经选好。",
    "bestFor": "When you want a self-contained coding editor instead of a plugin for an existing one.",
    "bestForZh": "你需要一个自带一体的编码编辑器，而不是装在现有编辑器里的插件。",
    "released": "2025-08-22",
    "datePrecision": "day",
    "homepage": "https://qoder.com",
    "desc": "通义灵码更名的智能编码 IDE",
    "descZh": "通义灵码更名的智能编码 IDE",
    "tags": [
      "coding-agent",
      "ai-ide",
      "alibaba"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/lingma/",
        "zh": "/zh/products/lingma/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "Q"
  },
  {
    "id": "feature",
    "name": "企业微信智能总结",
    "nameZh": "企业微信智能总结",
    "vendor": "腾讯",
    "vendorZh": "腾讯",
    "logo": "/assets/logos/tencent.png",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Information about a customer is scattered across chats, docs, and meetings, and nobody has time to reassemble it. Smart summaries turn those threads into a weekly digest and a searchable record.",
    "solvesZh": "关于某个客户的信息散落在聊天、文档和会议里，没人有时间重新拼起来。智能总结把这些线索变成每周简报和可检索的记录。",
    "bestFor": "Sales and service teams whose customer history is spread across WeCom conversations and meetings.",
    "bestForZh": "客户历史分散在企业微信会话和会议里的销售与服务团队。",
    "released": "2025-08-20",
    "datePrecision": "day",
    "homepage": "https://work.weixin.qq.com/nl/index/aioffice",
    "desc": "WeCom's digest of customer threads, docs, and meetings.",
    "descZh": "把客户线索汇成周报的企业微信功能。",
    "tags": [
      "in-product"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "企"
  },
  {
    "id": "chatgpt-study-mode",
    "name": "ChatGPT Study mode",
    "nameZh": "ChatGPT 学习模式",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "logo": "/assets/logos/openai.ico",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "You hand homework or a concept to a chatbot and it hands back the finished answer, which teaches you nothing. Study mode asks you questions back and gives hints instead of solutions.",
    "solvesZh": "你把作业或一个概念丢给聊天机器人，它直接把答案给你，你什么也没学到。学习模式反过来问你问题、给提示，而不是直接给答案。",
    "bestFor": "You want to actually understand a topic or prepare for an exam, not just copy an answer out of the chat.",
    "bestForZh": "你想真正搞懂一个主题或准备考试，而不是从对话里抄一个答案了事。",
    "released": "2025-07-29",
    "datePrecision": "day",
    "homepage": "https://openai.com/index/chatgpt-study-mode/",
    "desc": "A tutoring mode that quizzes you instead of handing over answers.",
    "descZh": "反问你、只给提示的辅导模式。",
    "tags": [
      "in-product",
      "chatgpt"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "glm-coding-plan",
    "name": "GLM Coding Plan",
    "nameZh": "GLM Coding Plan",
    "vendor": "智谱",
    "vendorZh": "智谱",
    "logo": "/assets/logos/zhipu.png",
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Coding agents billed by token run out mid-session. A monthly subscription gives you a fixed allowance, so an interruption does not hurt.",
    "solvesZh": "编码 Agent 按 token 计费，用着用着就断了。按月订阅，额度固定，不心疼中断。",
    "bestFor": "When you want a coding agent running in your editor or CLI over the long term.",
    "bestForZh": "想在编辑器或 CLI 里长期挂着编码 Agent 干活。",
    "released": "2025-07-28",
    "datePrecision": "day",
    "homepage": "https://bigmodel.cn/glm-coding-plan",
    "desc": "面向开发者的 GLM 编码订阅套餐",
    "descZh": "面向开发者的 GLM 编码订阅套餐",
    "tags": [
      "coding-agent",
      "subscription",
      "zhipu"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/glm-coding/",
        "zh": "/zh/products/glm-coding/"
      }
    },
    "lastVerifiedAt": null,
    "glyph": "G"
  },
  {
    "id": "codebuddy",
    "name": "CodeBuddy",
    "nameZh": "CodeBuddy",
    "vendor": "腾讯云",
    "vendorZh": "腾讯云",
    "logo": "/assets/logos/tencent-cloud.ico",
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "plugin",
    "solves": "Filling in code across a project is manual without a model that reads the repo. CodeBuddy does it inside the IDE you already run.",
    "solvesZh": "没有能读懂仓库的模型，跨项目补全代码就得手写。CodeBuddy 在你已在用的 IDE 里完成这件事。",
    "bestFor": "When your team writes Tencent-backed code and wants the same assistant in the terminal as in the editor.",
    "bestForZh": "当你的团队写腾讯系技术栈的代码，并希望终端和编辑器里是同一个助手。",
    "released": "2025-07-22",
    "datePrecision": "day",
    "homepage": "https://copilot.tencent.com",
    "desc": "Tencent Cloud AI coding suite across IDE and CLI.",
    "descZh": "腾讯云的 AI 编程助手套件，覆盖 IDE 与 CLI。",
    "tags": [
      "ide",
      "cli",
      "china"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/codebuddy/",
        "zh": "/zh/products/codebuddy/"
      }
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "chatgpt-agent",
    "name": "ChatGPT agent",
    "nameZh": "ChatGPT 智能体",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "logo": "/assets/logos/openai.ico",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Booking flights, comparing prices, placing orders, and filling in forms all take a click at a time. It opens the browser and uses your own accounts to finish them.",
    "solvesZh": "订票、比价、下单、填表这类要动手的活，你得一步步点。它自己开浏览器、连你的账号做完。",
    "bestFor": "You hand it a chain of online steps that need clicking and filling in.",
    "bestForZh": "你交给它一串要点击和填写的线上流程。",
    "released": "2025-07-17",
    "datePrecision": "day",
    "homepage": "https://chatgpt.com",
    "desc": "Autonomous agent combining browser, terminal and connectors",
    "descZh": "融合浏览器、终端与连接器的自主智能体",
    "tags": [
      "agent",
      "computer-use",
      "connectors"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "C"
  },
  {
    "id": "kiro",
    "name": "Kiro",
    "nameZh": "Kiro",
    "vendor": "AWS",
    "vendorZh": "AWS",
    "logo": "/assets/logos/aws.ico",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "Agents start editing code before anyone agrees what to build. It begins from a written spec, so intent is settled first.",
    "solvesZh": "Agent 常常在需求还没对齐时就开始改代码。它先从一份写下来的规格开始，把意图先谈定。",
    "bestFor": "When you want an agent to build features from a specification you agreed on first.",
    "bestForZh": "想让 Agent 照着事先谈定的规格来做功能的时候。",
    "released": "2025-07-14",
    "datePrecision": "day",
    "homepage": "https://kiro.dev",
    "desc": "AWS spec-driven agentic IDE built on Code OSS",
    "descZh": "AWS 出品的规格驱动（spec-driven）Agentic IDE，基于 Code OSS",
    "tags": [
      "spec-driven",
      "aws",
      "agentic-ide"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "K"
  },
  {
    "id": "kimi-code",
    "name": "Kimi Code",
    "nameZh": "Kimi Code",
    "vendor": "月之暗面",
    "vendorZh": "月之暗面",
    "logo": "/assets/logos/moonshot.png",
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "surface": "standalone",
    "solves": "Reading and changing code means switching windows all day. From the command line, Kimi reads and writes across the whole project.",
    "solvesZh": "读代码、改代码要一直切窗口。用命令行直接让 Kimi 读写整个项目。",
    "bestFor": "When you work in the terminal and would rather not jump between the browser and the editor.",
    "bestForZh": "习惯在终端里干活，不想在浏览器和编辑器之间来回切。",
    "released": "2025-07-11",
    "datePrecision": "day",
    "homepage": "https://www.kimi.com/code",
    "desc": "Kimi 编程智能体与命令行工具",
    "descZh": "Kimi 编程智能体与命令行工具",
    "tags": [
      "coding-agent",
      "cli",
      "moonshot"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/kimi-code/",
        "zh": "/zh/products/kimi-code/"
      }
    },
    "lastVerifiedAt": null,
    "glyph": "K"
  },
  {
    "id": "perplexity-comet",
    "name": "Perplexity Comet",
    "nameZh": "Perplexity Comet 浏览器",
    "vendor": "Perplexity",
    "vendorZh": "Perplexity",
    "logo": "/assets/logos/perplexity.png",
    "region": "intl",
    "category": "search",
    "useCases": [
      "research",
      "office"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "The research sits in one tab, the form in another, and you are the one shuttling data between them. Its assistant acts across tabs.",
    "solvesZh": "资料在一个标签页，表单在另一个，来回复制粘贴的是你。它的助手可以跨标签页直接操作。",
    "bestFor": "When a task needs you to read, compare, and fill in a form across several sites.",
    "bestForZh": "当一个任务需要你在几个网站之间读、比、再填表时。",
    "released": "2025-07-09",
    "datePrecision": "day",
    "homepage": "https://www.perplexity.ai/comet",
    "desc": "Free AI browser whose assistant acts on pages across tabs.",
    "descZh": "免费 AI 浏览器，助手可跨标签页直接操作网页。",
    "tags": [
      "ai-browser",
      "agentic",
      "free-tier",
      "cross-platform"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "P"
  },
  {
    "id": "gemini-cli",
    "name": "Gemini CLI",
    "nameZh": "Gemini CLI",
    "vendor": "Google",
    "vendorZh": "Google",
    "logo": "/assets/logos/google.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "surface": "standalone",
    "solves": "Autocomplete only knows the line you are on. It reads the repo and does multi-file work from your shell.",
    "solvesZh": "自动补全只认得光标所在的那一行。它会读整个仓库，直接在 shell 里完成跨文件的活。",
    "bestFor": "When you want agent work without leaving the terminal or paying for another editor.",
    "bestForZh": "当你想用 Agent 干活，却不想离开终端、也不想为另一个编辑器付费。",
    "released": "2025-06-25",
    "datePrecision": "day",
    "homepage": "https://geminicli.com/",
    "desc": "Apache-2.0 open-source terminal agent for Gemini models",
    "descZh": "Apache-2.0 开源终端智能体，驱动 Gemini 系列模型",
    "tags": [
      "open-source",
      "cli",
      "terminal",
      "agentic-coding"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/gemini/",
        "zh": "/zh/products/gemini/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "G"
  },
  {
    "id": "comate-ai-ide",
    "name": "Comate AI IDE",
    "nameZh": "文心快码 AI IDE",
    "vendor": "百度",
    "vendorZh": "百度",
    "logo": "/assets/logos/baidu.ico",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "image-design"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "The design file reaches a developer and the frontend gets rebuilt line by line by hand. Drag the Figma file in and it produces page code that actually runs.",
    "solvesZh": "设计稿到了开发手里，前端要靠手一行行还原。把 Figma 文件拖进去，它直接产出可跑的页面代码。",
    "bestFor": "You have a Figma file and need it turned into a working frontend page quickly.",
    "bestForZh": "手上有 Figma 设计稿，需要快速变成能跑的前端页面。",
    "released": "2025-06-23",
    "datePrecision": "day",
    "homepage": "https://comate.baidu.com/",
    "desc": "standalone AI-native IDE with Figma-to-code and multi-agent mode",
    "descZh": "独立 AI 原生 IDE，支持设计稿转代码与多智能体协同",
    "tags": [
      "design-to-code",
      "multi-agent",
      "mcp",
      "standalone-ide"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "minimax-agent",
    "name": "MiniMax Agent",
    "nameZh": "MiniMax Agent",
    "vendor": "MiniMax",
    "vendorZh": "MiniMax",
    "logo": "/assets/logos/minimax.png",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Building an agent that runs on its own means choosing the models, writing the orchestration and handling failures. The platform ships all of that already configured.",
    "solvesZh": "从零搭一个能自己跑起来的智能体，要自己选模型、写编排、兜异常。平台把这些配好直接用。",
    "bestFor": "When you want to ship a general-purpose agent without building the runtime yourself.",
    "bestForZh": "你要上线一个通用智能体，但不想自己搭运行时。",
    "released": "2025-06-19",
    "datePrecision": "day",
    "homepage": "https://agent.minimaxi.com",
    "desc": "MiniMax 通用智能体构建平台",
    "descZh": "MiniMax 通用智能体构建平台",
    "tags": [
      "agent-platform",
      "general-agent",
      "minimax"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/minimax-agent/",
        "zh": "/zh/products/minimax-agent/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "M"
  },
  {
    "id": "pi-agent",
    "name": "Pi Agent",
    "nameZh": "Pi Agent",
    "vendor": "Pi",
    "vendorZh": "Pi",
    "logo": "/assets/logos/pi.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "surface": "standalone",
    "solves": "Agents come with sub-agents, plan mode and a bundle of tools you did not ask for. Pi is the harness with those left out, so you decide what a run is allowed to do.",
    "solvesZh": "很多 Agent 自带子 Agent、计划模式和一堆你并没要求的东西。Pi 把这些都去掉，由你决定一次运行能做什么。",
    "bestFor": "When you want to own the agent's behaviour instead of adopting someone else's defaults.",
    "bestForZh": "当你想自己掌控 Agent 的行为，而不是接受别人的默认设定。",
    "released": "2025-06-01",
    "datePrecision": "day",
    "homepage": "https://github.com/badlogic/pi-mono",
    "desc": "Minimal terminal coding-agent harness.",
    "descZh": "极简的终端 coding agent harness。",
    "tags": [
      "harness",
      "terminal",
      "minimal"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/pi-agent/",
        "zh": "/zh/products/pi-agent/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "P"
  },
  {
    "id": "lingma-ai-ide",
    "name": "通义灵码 AI IDE",
    "nameZh": "通义灵码 AI IDE",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "logo": "/assets/logos/alibaba.png",
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "Wiring a coding agent into a fresh project takes an afternoon of config. This IDE ships it already connected.",
    "solvesZh": "把 coding agent 接进一个新项目要配一下午。这个 IDE 开箱就是接好的状态。",
    "bestFor": "When you want the agent driving the editor rather than only completing a line.",
    "bestForZh": "你希望 agent 驱动整个编辑器，而不只是补全一行代码。",
    "released": "2025-05-30",
    "datePrecision": "day",
    "homepage": "https://lingma.aliyun.com",
    "desc": "Alibaba AI-native IDE with a built-in coding agent",
    "descZh": "阿里首款 AI 原生开发环境，内置编程智能体",
    "tags": [
      "ai-ide",
      "agentic-coding",
      "qwen"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/lingma/",
        "zh": "/zh/products/lingma/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "通"
  },
  {
    "id": "tiangong-agent",
    "name": "天工超级智能体",
    "nameZh": "天工超级智能体",
    "vendor": "昆仑万维",
    "vendorZh": "昆仑万维",
    "logo": "/assets/logos/kunlun.ico",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "An office task means breaking it into steps, wiring up tools and watching the process yourself. The super agent ships expert agents preconfigured for each role.",
    "solvesZh": "一个办公任务要自己拆步骤、串工具、盯流程。超级智能体按岗位配好专家智能体，接手就能跑。",
    "bestFor": "When you want writing, research and summarising handed off to a chain of agents.",
    "bestForZh": "你要把写作、检索、整理这类办公活交给智能体接力完成。",
    "released": "2025-05-22",
    "datePrecision": "day",
    "homepage": "https://www.tiangong.cn/chat",
    "desc": "面向办公场景的专家智能体平台",
    "descZh": "面向办公场景的专家智能体平台",
    "tags": [
      "agent-platform",
      "office-agent",
      "kunlun"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "天"
  },
  {
    "id": "google-flow",
    "name": "Google Flow",
    "nameZh": "Google Flow 创意工作室",
    "vendor": "Google",
    "vendorZh": "Google",
    "logo": "/assets/logos/google.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Clips are generated one at a time and stitched elsewhere, so the character changes every shot. It holds a storyboard and a consistent look across shots.",
    "solvesZh": "片段是一个一个生成、到别处再拼的，所以同一个角色每镜都不一样。它用一份分镜脚本锁住整段画面的统一风格。",
    "bestFor": "When a short video has to look like one piece rather than a pile of clips.",
    "bestForZh": "当短片要看起来是完整成片，而不是一堆拼起来的片段。",
    "released": "2025-05-20",
    "datePrecision": "day",
    "homepage": "https://labs.google/fx/tools/flow",
    "desc": "Google's AI creative studio for making and editing video and images.",
    "descZh": "Google 用于生成与剪辑视频、图像的 AI 创意工作室。",
    "tags": [
      "veo",
      "storyboarding",
      "video-editing",
      "noir"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "G"
  },
  {
    "id": "google-search-ai-mode",
    "name": "Google Search AI Mode",
    "nameZh": "Google 搜索 AI 模式",
    "vendor": "Google",
    "vendorZh": "Google",
    "logo": "/assets/logos/google.png",
    "region": "intl",
    "category": "search",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "A traditional results page gives you ten blue links and makes you do the comparing. AI Mode answers conversationally, plans a multi-step search, and hands back a synthesized answer with sources.",
    "solvesZh": "传统结果页给你十条蓝色链接，比较的工作得你自己做。AI 模式用对话方式回答，会自己规划多步检索，并直接给出带信源的整合结论。",
    "bestFor": "Comparisons and broad research questions where you would otherwise open ten tabs and compare them by hand.",
    "bestForZh": "对比类和宽泛的研究类问题——否则你得开十个标签页自己逐个比较。",
    "released": "2025-05-20",
    "datePrecision": "day",
    "homepage": "https://blog.google/products-and-platforms/products/search/google-search-ai-mode-update/",
    "desc": "A search tab that answers conversationally instead of listing links.",
    "descZh": "用对话直接作答的搜索模式。",
    "tags": [
      "in-product",
      "google-search"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "G"
  },
  {
    "id": "amp",
    "name": "Amp",
    "nameZh": "Amp",
    "vendor": "Amp Frontier",
    "vendorZh": "Amp Frontier",
    "logo": "/assets/logos/amp-frontier.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "surface": "standalone",
    "solves": "Autocomplete completes lines, not tasks. It reads the whole codebase and makes the multi-file change you asked for.",
    "solvesZh": "自动补全补的是单行，不是整个任务。它读完整个代码库，做出你要的跨文件改动。",
    "bestFor": "When a change spans many files and you would rather describe it than do it.",
    "bestForZh": "当一个改动横跨很多文件，你更愿意描述它而不是自己动手。",
    "released": "2025-05-18",
    "datePrecision": "day",
    "homepage": "https://ampcode.com",
    "desc": "Sourcegraph spin-out coding agent for CLI and editor",
    "descZh": "源自 Sourcegraph 的编码 Agent，2025-12 独立成公司 Amp Frontier",
    "tags": [
      "cli-agent",
      "spinout",
      "code-editor"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "A"
  },
  {
    "id": "openai-codex",
    "name": "OpenAI Codex",
    "nameZh": "OpenAI Codex",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "logo": "/assets/logos/openai.ico",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Ask it to change one thing and it either misses the dependencies or won't run the result. It opens several tasks in parallel in the cloud, each with its own PR.",
    "solvesZh": "让它改一处代码，它要么漏掉依赖，要么改完不敢运行。它在云端并行开几个任务，各提一个 PR。",
    "bestFor": "You have a batch of non-conflicting changes and want them moving at once instead of in a queue.",
    "bestForZh": "你有一批互不冲突的改动，想同时推进而不是排队。",
    "released": "2025-05-16",
    "datePrecision": "day",
    "homepage": "https://chatgpt.com/codex",
    "desc": "Cloud-based parallel software engineering agent with IDE integration",
    "descZh": "云端并行软件工程智能体，并提供 IDE 扩展集成",
    "tags": [
      "cloud-agent",
      "ide-extension",
      "pull-request",
      "agentic-coding"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/codex/",
        "zh": "/zh/products/codex/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "O"
  },
  {
    "id": "llama-api",
    "name": "Llama API",
    "nameZh": "Llama API",
    "vendor": "Meta",
    "vendorZh": "Meta",
    "logo": "/assets/logos/meta.png",
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Running Llama yourself means buying GPUs, writing the serving code and keeping it patched. This hands you an OpenAI-compatible endpoint, SDKs and fine-tuning instead.",
    "solvesZh": "自己部署 Llama 要买 GPU、写推理服务代码，还要一直跟着打补丁。这里直接给你兼容 OpenAI 的接口、SDK 和微调能力。",
    "bestFor": "When you want Llama behind an OpenAI-compatible API without running the infrastructure.",
    "bestForZh": "想用上 Llama 但不想自己运维一套 OpenAI 兼容 API 的时候。",
    "released": "2025-04-29",
    "datePrecision": "day",
    "homepage": "https://www.llama.com/",
    "desc": "Hosted Llama developer platform with console, SDKs and fine-tuning",
    "descZh": "托管的 Llama 开发者平台，含控制台、SDK 与微调能力",
    "tags": [
      "api",
      "llama",
      "openai-compatible",
      "fine-tuning"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "L"
  },
  {
    "id": "meta-ai",
    "name": "Meta AI",
    "nameZh": "Meta AI",
    "vendor": "Meta",
    "vendorZh": "Meta",
    "logo": "/assets/logos/meta.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Typing is slow when you are on the move. It answers by voice, inside the app you already have open.",
    "solvesZh": "走路的时候打字太慢。它直接用语音回答，就在你已经打开的那个应用里。",
    "bestFor": "When you want to ask something hands-free without leaving the Meta app.",
    "bestForZh": "想不开手机、随手用语音问一句的时候。",
    "released": "2025-04-29",
    "datePrecision": "day",
    "homepage": "https://www.meta.ai/",
    "desc": "Standalone voice-first AI app built on Llama 4",
    "descZh": "基于 Llama 4 的独立语音优先 AI 应用",
    "tags": [
      "consumer",
      "voice",
      "social",
      "llama"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": null,
    "glyph": "M"
  },
  {
    "id": "coze-space",
    "name": "扣子空间",
    "nameZh": "扣子空间",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "logo": "/assets/logos/bytedance.png",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Building an agent from scratch means wiring models, tools and prompts. Here you get a ready platform to build it on.",
    "solvesZh": "从零搭一个 Agent 要接模型、配工具、调提示词。这里给你一个现成的平台直接搭。",
    "bestFor": "When you want to turn an idea into a working agent fast without writing the code yourself.",
    "bestForZh": "想把一个想法快速做成能跑的 Agent，不想自己写代码。",
    "released": "2025-04-18",
    "datePrecision": "day",
    "homepage": "https://www.coze.cn/space",
    "desc": "字节通用 Agent 协作平台",
    "descZh": "字节通用 Agent 协作平台",
    "tags": [
      "agent-platform",
      "general-agent",
      "bytedance"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/coze/",
        "zh": "/zh/products/coze/"
      }
    },
    "lastVerifiedAt": null,
    "glyph": "扣"
  },
  {
    "id": "codex-cli",
    "name": "Codex CLI",
    "nameZh": "Codex CLI",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "logo": "/assets/logos/openai.ico",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "surface": "standalone",
    "solves": "An AI that edits code never sees your project structure and won't run what it changed. This open-source assistant reads and writes inside your repo directly.",
    "solvesZh": "让 AI 改代码，它看不见你的项目结构，改完也不敢跑。这个开源助手在你仓库里直接读写。",
    "bestFor": "You want AI to actually change code in your own repository.",
    "bestForZh": "你想在自己的仓库里让 AI 动手改代码。",
    "released": "2025-04-16",
    "datePrecision": "day",
    "homepage": "https://github.com/openai/codex",
    "desc": "Apache-2.0 open-source terminal coding agent running local repos",
    "descZh": "Apache-2.0 开源终端编程智能体，在本地仓库中读写与执行代码",
    "tags": [
      "open-source",
      "cli",
      "terminal",
      "agentic-coding"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/codex/",
        "zh": "/zh/products/codex/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "C"
  },
  {
    "id": "junie",
    "name": "Junie",
    "nameZh": "Junie",
    "vendor": "JetBrains",
    "vendorZh": "JetBrains",
    "logo": "/assets/logos/jetbrains.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "extension",
    "solves": "Switching editors to get an agent means giving up your keybindings and setup. Junie arrives with the IDE subscription you already pay for.",
    "solvesZh": "为了用 Agent 而换编辑器，等于放弃你原有的快捷键和配置。Junie 随你已经付费的 IDE 订阅直接提供。",
    "bestFor": "When your team already lives in IntelliJ or PyCharm and will not move.",
    "bestForZh": "当你的团队本来就用 IntelliJ 或 PyCharm，不打算迁移。",
    "released": "2025-04-16",
    "datePrecision": "day",
    "homepage": "https://www.jetbrains.com/junie/",
    "desc": "JetBrains' own coding agent, bundled with the IDE subscription",
    "descZh": "JetBrains 自研编程智能体，随 IDE 订阅一起提供",
    "tags": [
      "jetbrains-ide",
      "multi-step-tasks",
      "free-tier",
      "subscription"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "J"
  },
  {
    "id": "chatgpt-memory",
    "name": "ChatGPT memory",
    "nameZh": "ChatGPT 记忆",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "logo": "/assets/logos/openai.ico",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "You re-introduce yourself, your role, and your preferences at the start of nearly every session. Memory carries those facts forward so you don't.",
    "solvesZh": "几乎每次开启新对话，你都要重新介绍自己、你的岗位和你的偏好。记忆会把这些事实带过去，你不用再说一遍。",
    "bestFor": "You use ChatGPT as an ongoing assistant and are tired of repeating standing facts about who you are.",
    "bestForZh": "你把 ChatGPT 当长期助手用，已经不想反复交代那些关于你的固定信息了。",
    "released": "2025-04-10",
    "datePrecision": "day",
    "homepage": "https://openai.com/index/memory-and-new-controls-for-chatgpt/",
    "desc": "Persistent storage of your standing facts across chats.",
    "descZh": "跨对话记住你的长期个人信息。",
    "tags": [
      "in-product",
      "chatgpt"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "cursor-background-agents",
    "name": "Cursor background agents",
    "nameZh": "Cursor 后台智能体",
    "vendor": "Anysphere",
    "vendorZh": "Anysphere",
    "logo": "/assets/logos/anysphere.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "One editor means one task at a time, so parallelizable chores queue up behind whatever you're doing. Background agents clone your repo into a cloud sandbox and work on separate tasks at the same time.",
    "solvesZh": "一个编辑器只能干一件事，于是能并行的杂活全排在你手头工作后面。后台智能体会把你的仓库克隆到云端沙箱，同时处理多个独立任务。",
    "bestFor": "Two or more independent code tasks you could run at once but currently have to wait on each other.",
    "bestForZh": "手上有两件以上互相独立、理论上可以同时做的代码任务。",
    "released": "2025-04-01",
    "datePrecision": "month",
    "homepage": "https://cursor.com/docs/background-agent",
    "desc": "Cloud agents that work on your repo in parallel.",
    "descZh": "在云端并行处理仓库任务的智能体。",
    "tags": [
      "in-product",
      "cursor"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "nvidia-nemo",
    "name": "NVIDIA NeMo",
    "nameZh": "NVIDIA NeMo 智能体平台",
    "vendor": "NVIDIA",
    "vendorZh": "NVIDIA",
    "logo": "/assets/logos/nvidia.ico",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "observability",
      "model-api"
    ],
    "form": "self-hosted",
    "surface": "in-product",
    "solves": "An agent that works on Monday quietly breaks by Friday. It gives you the tracing, evaluation and guardrails to see what changed.",
    "solvesZh": "周一还好好的 Agent，到周五就悄悄坏了。它提供链路追踪、评估和护栏，让你看得见是哪一环变了。",
    "bestFor": "When you run agents in production and need to know why one answer went wrong.",
    "bestForZh": "Agent 已经跑在生产上，需要查清某次输出为什么出错的时候。",
    "released": "2025-04-01",
    "datePrecision": "day",
    "homepage": "https://www.nvidia.com/en-us/ai-data-science/products/nemo/",
    "desc": "NVIDIA's platform to build, monitor and optimise AI agents end to end.",
    "descZh": "英伟达用于构建、监控和优化 AI 智能体的全流程平台。",
    "tags": [
      "agent-ops",
      "guardrails",
      "evaluation",
      "self-hosted"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "N"
  },
  {
    "id": "manus",
    "name": "Manus",
    "nameZh": "Manus",
    "vendor": "Butterfly Effect",
    "vendorZh": "Butterfly Effect",
    "logo": "/assets/logos/butterfly-effect.ico",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "research",
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Multi-step work means opening a dozen tabs and stitching the results yourself. It runs the whole chain and hands back a finished output.",
    "solvesZh": "多步骤的活儿意味着开十几个标签页、再自己把结果拼起来。它跑完整条链路，直接交回成品。",
    "bestFor": "When a task needs many steps, such as researching and then building something from what it found.",
    "bestForZh": "任务步骤很多，比如先调研、再据此做出东西的时候。",
    "released": "2025-03-06",
    "datePrecision": "day",
    "homepage": "https://manus.im",
    "desc": "General-purpose cloud agent that executes tasks end to end",
    "descZh": "云端通用智能体，可自主完成检索、生成与执行的完整任务链",
    "tags": [
      "general-agent",
      "autonomous-agent",
      "cloud"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "M"
  },
  {
    "id": "trae",
    "name": "Trae",
    "nameZh": "Trae",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "logo": "/assets/logos/bytedance.png",
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "AI features only add up after installing a pile of plugins, and the result is a mess. Trae builds the coding assistant into the editor.",
    "solvesZh": "AI 功能要装一堆插件才凑得齐，拼起来很乱。Trae 把编码助手直接做进编辑器里。",
    "bestFor": "When you want an AI coding environment that works out of the box, without assembling plugins yourself.",
    "bestForZh": "想要一个开箱即用的 AI 编程环境，不想自己拼插件。",
    "released": "2025-03-03",
    "datePrecision": "day",
    "homepage": "https://www.trae.cn",
    "desc": "国产首个 AI 原生集成开发环境",
    "descZh": "国产首个 AI 原生集成开发环境",
    "tags": [
      "coding-agent",
      "ai-ide",
      "bytedance"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/trae/",
        "zh": "/zh/products/trae/"
      }
    },
    "lastVerifiedAt": null,
    "glyph": "T"
  },
  {
    "id": "higgsfield",
    "name": "Higgsfield",
    "nameZh": "Higgsfield",
    "vendor": "Higgsfield",
    "vendorZh": "Higgsfield",
    "logo": "/assets/logos/higgsfield.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Text-to-video gives you a static subject doing nothing. Camera-move presets let you push in, orbit and rack focus the way a shot is actually filmed.",
    "solvesZh": "文生视频给出的主体往往一动不动。运镜预设让你像实际拍摄一样推近、环绕、变焦对焦。",
    "bestFor": "When the shot needs camera movement, not just a subject that exists.",
    "bestForZh": "当镜头需要运镜，而不只是画面里有个主体。",
    "released": "2025-03-01",
    "datePrecision": "day",
    "homepage": "https://higgsfield.ai",
    "desc": "Cinematic AI video with camera-move control presets",
    "descZh": "主打电影级镜头语言与运镜预设的 AI 视频平台",
    "tags": [
      "video-generation",
      "cinematography",
      "social"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "H"
  },
  {
    "id": "quark",
    "name": "夸克AI",
    "nameZh": "夸克AI",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "logo": "/assets/logos/alibaba.png",
    "region": "cn",
    "category": "search",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Search hands you a pile of links and leaves you to sort them. 夸克 computes the answer instead, and also reads files and documents.",
    "solvesZh": "搜索只给一堆链接，还要自己筛。夸克把答案直接算出来，顺带读文件、查文档。",
    "bestFor": "When you want one place to search the web, read local files and ask about documents.",
    "bestForZh": "你要一个入口同时搜网页、读本地文件、问文档。",
    "released": "2025-03-01",
    "datePrecision": "day",
    "homepage": "https://www.quark.cn/",
    "desc": "AI 超级框一站式搜索助手",
    "descZh": "AI 超级框一站式搜索助手",
    "tags": [
      "ai-search",
      "super-box",
      "document-qa",
      "user-scale"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "夸"
  },
  {
    "id": "claude-code",
    "name": "Claude Code",
    "nameZh": "Claude Code",
    "vendor": "Anthropic",
    "vendorZh": "Anthropic",
    "logo": "/assets/logos/anthropic.ico",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "surface": "standalone",
    "solves": "Every new chat forgets your project conventions and you re-explain them. It reads the repo and keeps the rules in a file it checks each session.",
    "solvesZh": "每次新开对话都要重新交代项目规范。它会读仓库，并把规则存进一个文件，每次会话都去核对。",
    "bestFor": "When you want a coding agent to work across a whole repo, not just the open file.",
    "bestForZh": "当你要一个编码 Agent 能在整个仓库上干活，而不只是当前打开的文件。",
    "released": "2025-02-24",
    "datePrecision": "day",
    "homepage": "https://claude.com/product/claude-code",
    "desc": "Agentic command-line coding tool with CLAUDE.md project memory",
    "descZh": "智能体式命令行编程工具，支持 CLAUDE.md 项目记忆",
    "tags": [
      "cli",
      "agentic-coding",
      "developer-tools",
      "mcp"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/claude/",
        "zh": "/zh/products/claude/"
      }
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "chatgpt-deep-research",
    "name": "ChatGPT deep research",
    "nameZh": "ChatGPT 深度研究",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "logo": "/assets/logos/openai.ico",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Ordinary chat answers from memory, so a report that needs forty sources ends up with none. Deep research browses the open web on its own and cites every claim.",
    "solvesZh": "普通对话靠记忆作答，需要四十个信源的报告最后一个也没有。深度研究会自己在开放网络上检索，并把每条论断都标上出处。",
    "bestFor": "A due-diligence, market, or academic question where you need a sourced report in minutes rather than an afternoon of tab-switching.",
    "bestForZh": "尽调、竞品或学术类问题——你要的是几分钟内出的一份有信源的报告，而不是自己开一堆标签页翻一下午。",
    "released": "2025-02-02",
    "datePrecision": "day",
    "homepage": "https://openai.com/index/introducing-deep-research/",
    "desc": "A research mode that browses the web and writes a cited report.",
    "descZh": "自己上网检索、输出带引用报告的模式。",
    "tags": [
      "in-product",
      "chatgpt"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "deepseek-2",
    "name": "DeepSeek",
    "nameZh": "DeepSeek",
    "vendor": "DeepSeek",
    "vendorZh": "DeepSeek",
    "logo": "/assets/logos/deepseek.ico",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "coding",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "The hard question comes back with an answer but no reasoning, so you cannot tell which step went wrong. It lays the reasoning out and you check it step by step.",
    "solvesZh": "难题给出答案却不给理由，你没法判断哪一步错了。它把推理过程摊开，你能对着步骤检查。",
    "bestFor": "You need to solve something that takes several reasoning steps and want to see how it got there.",
    "bestForZh": "要解一道需要分步推理的题，并想看清它每一步怎么想的。",
    "released": "2025-01-15",
    "datePrecision": "day",
    "homepage": "https://www.deepseek.com",
    "desc": "DeepSeek 官方 AI 对话助手",
    "descZh": "DeepSeek 官方 AI 对话助手",
    "tags": [
      "chat-assistant",
      "reasoning",
      "deepseek"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "D"
  },
  {
    "id": "north",
    "name": "North",
    "nameZh": "North 企业智能体平台",
    "vendor": "Cohere",
    "vendorZh": "Cohere",
    "logo": "/assets/logos/cohere.png",
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "agent-building",
      "office",
      "local-private"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "Regulators will not let agent traffic leave the building. North runs the whole platform on your own hardware.",
    "solvesZh": "监管不允许 Agent 的流量走出内网。North 把整个平台跑在你自己控制的硬件上。",
    "bestFor": "When the law requires your data and your agent to stay on infrastructure you control.",
    "bestForZh": "当法规要求你的数据和 Agent 都留在自己掌控的基础设施上。",
    "released": "2025-01-10",
    "datePrecision": "day",
    "homepage": "https://cohere.com/north",
    "desc": "Cohere's secure agent platform for running on your own infrastructure.",
    "descZh": "Cohere 面向自有基础设施部署的安全智能体平台。",
    "tags": [
      "on-premise",
      "sovereign",
      "government",
      "connectors"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "N"
  },
  {
    "id": "chatgpt-tasks",
    "name": "ChatGPT Tasks",
    "nameZh": "ChatGPT 定时任务",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "logo": "/assets/logos/openai.ico",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "A recurring question — a morning briefing, a daily check on something — requires you to be there at the right moment. Tasks runs the prompt on a schedule and delivers the result.",
    "solvesZh": "每天早上要的那份简报、每天要复查的那件事，都要求你恰好在那个时刻在线。定时任务会按计划自动跑你的提示词并把结果送来。",
    "bestFor": "A prompt you want re-run on a fixed cadence, rather than a one-off question.",
    "bestForZh": "你想按固定节奏反复运行的提示词，而不是一次性的提问。",
    "released": "2025-01-01",
    "datePrecision": "month",
    "homepage": "https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt",
    "desc": "Scheduled prompts that run themselves and deliver the result.",
    "descZh": "按计划自动执行的定时提示词。",
    "tags": [
      "in-product",
      "chatgpt"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "goose",
    "name": "Goose",
    "nameZh": "Goose",
    "vendor": "Block",
    "vendorZh": "Block",
    "logo": "/assets/logos/block.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "agent-building",
      "local-private"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "Coding agents only work inside the one editor you licensed. Goose runs the same recipes from a terminal or desktop, against your own files and keys.",
    "solvesZh": "编程 Agent 常常只能在授权过的那个编辑器里跑。Goose 让你在终端或桌面端跑同样的流程，操作你自己的文件和密钥。",
    "bestFor": "When you want an agent outside your IDE, and the ability to read what it did.",
    "bestForZh": "当你想在 IDE 之外用 Agent，并且能读到它做了什么。",
    "released": "2025-01-01",
    "datePrecision": "month",
    "homepage": "https://block.github.io/goose/",
    "desc": "open-source general-purpose agent with desktop, CLI and API",
    "descZh": "开源通用智能体，提供桌面端、命令行与 API 三种形态",
    "tags": [
      "open-source",
      "linux-foundation",
      "mcp-extensions",
      "local-first"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "G"
  },
  {
    "id": "deepseek",
    "name": "DeepSeek 开放平台",
    "nameZh": "DeepSeek 开放平台",
    "vendor": "DeepSeek",
    "vendorZh": "DeepSeek",
    "logo": "/assets/logos/deepseek.ico",
    "region": "cn",
    "category": "enterprise-api",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Integrating a model means finding a provider, comparing price and compatibility yourself. The open platform gives you one endpoint, with billing and usage in one console.",
    "solvesZh": "接模型要自己找服务商、比对价格和兼容性。开放平台给一个接口，账单和用量在一个后台。",
    "bestFor": "You need to call models by the token from your own service without prepaying a large sum.",
    "bestForZh": "要在自家服务里按量调用模型，且不想为用量预付一大笔。",
    "released": "2024-12-26",
    "datePrecision": "day",
    "homepage": "https://platform.deepseek.com",
    "desc": "DeepSeek 模型 API 开放平台",
    "descZh": "DeepSeek 模型 API 开放平台",
    "tags": [
      "enterprise-api",
      "api",
      "deepseek"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "D"
  },
  {
    "id": "chatgpt-projects",
    "name": "ChatGPT Projects",
    "nameZh": "ChatGPT 项目",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "logo": "/assets/logos/openai.ico",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research",
      "agent-building"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Every conversation is its own island, so you re-upload the same brief and re-explain the same constraints each time. A project holds the files, instructions, and history for one piece of work in one place.",
    "solvesZh": "每段对话都是一个孤岛，同一份 brief 要反复上传、同样的约束要反复解释。项目把一件事的文件、指令和历史集中在一处。",
    "bestFor": "You are working on one ongoing thing — a client, a paper, a codebase — across many separate chats.",
    "bestForZh": "你在长期推进同一件事——一个客户、一篇论文、一个代码库——分散在很多段不同对话里。",
    "released": "2024-12-13",
    "datePrecision": "day",
    "homepage": "https://help.openai.com/en/articles/10169521-projects-in-chatgpt",
    "desc": "A shared container for one body of work's files and history.",
    "descZh": "把一件事的文件与指令集中在一处。",
    "tags": [
      "in-product",
      "chatgpt"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "jules",
    "name": "Jules",
    "nameZh": "Jules",
    "vendor": "Google",
    "vendorZh": "Google",
    "logo": "/assets/logos/google.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Work you do not want to sit and watch. You file the task and it comes back as a pull request to review.",
    "solvesZh": "有些活你不想守着干完。把任务提交出去，它做完回一个 pull request 给你审。",
    "bestFor": "When a chore is well described and you have something else to work on.",
    "bestForZh": "当一件杂活描述得很清楚，而你手头正好有别的事要做。",
    "released": "2024-12-11",
    "datePrecision": "day",
    "homepage": "https://jules.google/",
    "desc": "Asynchronous cloud coding agent that opens pull requests",
    "descZh": "异步云端编程智能体，后台运行并直接提交 Pull Request",
    "tags": [
      "cloud-agent",
      "async",
      "github",
      "agentic-coding"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/gemini/",
        "zh": "/zh/products/gemini/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "J"
  },
  {
    "id": "tana",
    "name": "Tana",
    "nameZh": "Tana",
    "vendor": "Tana Inc.",
    "vendorZh": "Tana Inc.",
    "logo": "/assets/logos/tana-inc.svg",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Notes become a pile of flat text nobody can query. Tana makes every fact a supertag, so the AI can work with them.",
    "solvesZh": "笔记会变成一堆没人能查询的扁平文本。Tana 把每条事实做成 supertag，让 AI 能直接处理。",
    "bestFor": "When you want a personal knowledge base that answers questions instead of storing pages.",
    "bestForZh": "当你想要一个能回答问题、而不只是存放页面的个人知识库。",
    "released": "2024-12-01",
    "datePrecision": "day",
    "homepage": "https://tana.inc",
    "desc": "Supertag outliner with an agentic AI workspace layer",
    "descZh": "以 supertag 为核心的大纲工具，叠加 Agent 式 AI 工作区",
    "tags": [
      "notes",
      "outliner",
      "personal-ai"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "T"
  },
  {
    "id": "nami-search",
    "name": "纳米AI搜索",
    "nameZh": "纳米AI搜索",
    "vendor": "360",
    "vendorZh": "360",
    "logo": "/assets/logos/360.ico",
    "region": "cn",
    "category": "search",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Search gives you a pile of URLs, not an answer. It turns the results into a Chinese write-up you can read once and understand.",
    "solvesZh": "搜出来的是一堆网址，不是答案。它把结果整理成一篇读完就懂的中文说明。",
    "bestFor": "You want to look something up and read the conclusion, not sift links yourself.",
    "bestForZh": "你想查一件事、想直接看结论而不是自己筛链接。",
    "released": "2024-11-27",
    "datePrecision": "day",
    "homepage": "https://www.n.cn",
    "desc": "360 面向普通用户的 AI 搜索",
    "descZh": "360 面向普通用户的 AI 搜索",
    "tags": [
      "search",
      "ai-search",
      "360"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "纳"
  },
  {
    "id": "lovable",
    "name": "Lovable",
    "nameZh": "Lovable",
    "vendor": "Lovable",
    "vendorZh": "Lovable",
    "logo": "/assets/logos/lovable.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "A working web app needs a frontend, a backend and a database before you can show anyone. Lovable writes all three from a chat.",
    "solvesZh": "一个能跑起来的 Web 应用要前端、后端和数据库才能给人看。Lovable 通过对话把三样都写出来。",
    "bestFor": "When you want a working prototype this week without hiring anyone.",
    "bestForZh": "当你这周就要一个可用的原型，又不打算招人。",
    "released": "2024-11-21",
    "datePrecision": "day",
    "homepage": "https://lovable.dev",
    "desc": "Chat-driven builder for full-stack React web apps",
    "descZh": "对话式全栈 React 应用生成器，上线半年成为最快增长的 AI 应用",
    "tags": [
      "app-generation",
      "fullstack",
      "no-code"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "L"
  },
  {
    "id": "azure-ai-foundry",
    "name": "Azure AI Foundry",
    "nameZh": "Azure AI Foundry",
    "vendor": "Microsoft",
    "vendorZh": "Microsoft",
    "logo": "/assets/logos/microsoft.ico",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Model choice, agent wiring, and monitoring end up scattered across separate consoles. One platform holds the catalog, the runtime, and the eval trail.",
    "solvesZh": "模型选型、智能体编排和监控分散在各自的控制台上。一个平台同时管住模型目录、运行时和评测记录。",
    "bestFor": "When an enterprise ships agents and must keep models, data, and audit trails inside Azure.",
    "bestForZh": "当企业要上线智能体，又必须把模型、数据和审计记录留在 Azure 内时。",
    "released": "2024-11-19",
    "datePrecision": "day",
    "homepage": "https://azure.microsoft.com/en-us/products/ai-foundry",
    "desc": "Unified Microsoft Foundry platform for models, tools and agents",
    "descZh": "微软统一的 Foundry 平台，整合模型、工具与智能体能力",
    "tags": [
      "cloud-platform",
      "enterprise",
      "agent-service",
      "model-catalog"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "A"
  },
  {
    "id": "xai-api",
    "name": "xAI API",
    "nameZh": "xAI API",
    "vendor": "xAI",
    "vendorZh": "xAI",
    "logo": "/assets/logos/xai.png",
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Swapping model vendors means rewriting your client. It speaks the OpenAI wire format, so you change a base URL.",
    "solvesZh": "换个模型厂商就要重写客户端。它讲的是 OpenAI 那一套协议，你只要改一个 base URL。",
    "bestFor": "When you want to test Grok against another model without rewriting your integration.",
    "bestForZh": "当你想把 Grok 和别的模型放在一起对比，又不想重写接入代码时。",
    "released": "2024-11-04",
    "datePrecision": "day",
    "homepage": "https://x.ai/api",
    "desc": "OpenAI-compatible developer API serving Grok models",
    "descZh": "兼容 OpenAI 接口的开发者 API，提供 Grok 系列模型",
    "tags": [
      "api",
      "openai-compatible",
      "developer-platform",
      "grok"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "X"
  },
  {
    "id": "claude-desktop",
    "name": "Claude Desktop",
    "nameZh": "Claude Desktop",
    "vendor": "Anthropic",
    "vendorZh": "Anthropic",
    "logo": "/assets/logos/anthropic.ico",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "A chat window on a website cannot reach your files or tools. The desktop app connects to local things through MCP so the answer comes from your machine.",
    "solvesZh": "网页上的聊天窗口碰不到你的文件或工具。桌面端通过 MCP 连上本地资源，答案来自你自己的机器。",
    "bestFor": "When you want the assistant to act on local files and tools, not just reply in a tab.",
    "bestForZh": "当你要助手真的操作本地文件和工具，而不只是在一个标签页里回话。",
    "released": "2024-10-31",
    "datePrecision": "day",
    "homepage": "https://claude.ai/download",
    "desc": "Native macOS and Windows desktop client, flagship for MCP",
    "descZh": "macOS 与 Windows 原生桌面客户端，MCP 的主要承载端",
    "tags": [
      "desktop-app",
      "mcp",
      "consumer"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/claude/",
        "zh": "/zh/products/claude/"
      }
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "roo-code",
    "name": "Roo Code",
    "nameZh": "Roo Code",
    "vendor": "Roo Code",
    "vendorZh": "Roo Code",
    "logo": "/assets/logos/roo-code.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "extension",
    "solves": "You want the agent to plan the change, then make it, then debug it, but one tool rarely does all three well. It switches modes for each.",
    "solvesZh": "你希望智能体先规划改动、再动手实现、再排查问题，但一个工具通常做不好这三件事里的每件。Roo Code 为每一步切换模式。",
    "bestFor": "When you want an open-source agent in VS Code that changes behaviour depending on the task.",
    "bestForZh": "当你想在 VS Code 里用一个开源智能体，并希望它根据任务类型切换行为时。",
    "released": "2024-10-31",
    "datePrecision": "day",
    "homepage": "https://roocode.com",
    "desc": "Open-source Cline fork with mode-based agent orchestration",
    "descZh": "Cline 的开源分支，主打多模式（架构师/编码/调试）任务编排",
    "tags": [
      "open-source",
      "vscode",
      "fork"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "R"
  },
  {
    "id": "apple-intelligence",
    "name": "Apple Intelligence",
    "nameZh": "Apple Intelligence 苹果智能",
    "vendor": "Apple",
    "vendorZh": "Apple",
    "logo": "/assets/logos/apple.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "image-design",
      "audio-voice"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Generic AI lives in a browser tab you have to go find. Apple Intelligence runs on-device and surfaces in the apps you already have open — writing tools in Mail and Messages, notification summaries, and a redesigned Siri.",
    "solvesZh": "通用 AI 都在一个要专门打开的浏览器标签里。Apple Intelligence 跑在设备本地，直接出现在你已经在用的 App 里——邮件和信息里的写作工具、通知摘要，以及重新设计的 Siri。",
    "bestFor": "You want AI woven into your phone's own apps, on-device, rather than in a separate app you switch to.",
    "bestForZh": "你想要 AI 直接嵌进手机自带的应用里、在设备本地运行，而不是再多开一个应用。",
    "released": "2024-10-28",
    "datePrecision": "day",
    "homepage": "https://www.apple.com/newsroom/2024/10/apple-intelligence-is-available-today-on-iphone-ipad-and-mac",
    "desc": "Apple's on-device AI layer for iPhone, iPad, and Mac.",
    "descZh": "内置在 iPhone 和 Mac 里的端侧 AI。",
    "tags": [
      "in-product",
      "ios"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "A"
  },
  {
    "id": "premiere-pro-generative-extend",
    "name": "Premiere Pro Generative Extend",
    "nameZh": "Premiere Pro 生成式扩展",
    "vendor": "Adobe",
    "vendorZh": "Adobe",
    "logo": "/assets/logos/adobe.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "A clip is two seconds too short and there is no footage to cover the gap. Generative Extend synthesizes the missing frames so the cut works.",
    "solvesZh": "素材短了两秒，又没有多余画面来补。生成式扩展会合成缺失的帧，让这个剪辑成立。",
    "bestFor": "Fixing clip length, smoothing out a cut, or filling a gap in footage you already shot.",
    "bestForZh": "修补素材长度不足、让剪切点顺滑，或填补已拍素材中的缺口。",
    "released": "2024-10-14",
    "datePrecision": "day",
    "homepage": "https://helpx.adobe.com/premiere-pro/using/generative-extend.html",
    "desc": "A Premiere Pro tool that synthesizes the missing frames.",
    "descZh": "合成缺失画面的剪辑工具。",
    "tags": [
      "in-product",
      "premiere-pro"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "P"
  },
  {
    "id": "atlassian-rovo",
    "name": "Atlassian Rovo",
    "nameZh": "Atlassian Rovo",
    "vendor": "Atlassian",
    "vendorZh": "Atlassian",
    "logo": "/assets/logos/atlassian.png",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "The answer is scattered across tickets, documents, and chat logs, so finding one decision means turning through a dozen pages. It searches them for you and answers.",
    "solvesZh": "答案散在任务、文档和聊天记录里，找一个决定要翻十几个页面。它替你搜完再回答。",
    "bestFor": "Your team lives in Jira and Confluence and you need to trace an old decision.",
    "bestForZh": "团队在用 Jira、Confluence，你要查旧决策。",
    "released": "2024-10-09",
    "datePrecision": "day",
    "homepage": "https://www.atlassian.com/software/rovo",
    "desc": "Search, chat and agents over the Atlassian Teamwork Graph",
    "descZh": "基于 Teamwork Graph 的搜索、对话与预置 Agent，2024-10-09 正式 GA",
    "tags": [
      "enterprise",
      "agents",
      "knowledge-graph"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "A"
  },
  {
    "id": "bolt-new",
    "name": "Bolt.new",
    "nameZh": "Bolt.new",
    "vendor": "StackBlitz",
    "vendorZh": "StackBlitz",
    "logo": "/assets/logos/stackblitz.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "You have an idea for a full app but no local Node and no scaffold. It runs the whole thing in a browser tab.",
    "solvesZh": "你有一个完整应用的设想，但本地没装 Node，也没有脚手架。它在浏览器标签页里把整套东西跑起来。",
    "bestFor": "When you want to see a working full-stack app in a tab before installing anything.",
    "bestForZh": "当你想在装任何东西之前，先在一个标签页里看到能跑的全栈应用时。",
    "released": "2024-10-03",
    "datePrecision": "day",
    "homepage": "https://bolt.new",
    "desc": "Browser IDE running full Node apps with AI edits",
    "descZh": "浏览器内运行的 WebContainers IDE，AI 可直接修改并运行 Node 应用",
    "tags": [
      "webcontainer",
      "browser-ide",
      "fullstack"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "B"
  },
  {
    "id": "microsoft-copilot-vision",
    "name": "Microsoft Copilot Vision",
    "nameZh": "Copilot Vision 屏幕理解",
    "vendor": "Microsoft",
    "vendorZh": "Microsoft",
    "logo": "/assets/logos/microsoft.ico",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Describing what is on your screen in text is slow and imprecise, so Copilot's answers stop at what you typed. Vision lets it look at your screen, window, or camera and answer about what it actually sees.",
    "solvesZh": "用文字描述屏幕上有什么既慢又不准，于是 Copilot 的回答只能停在你打的字上。Vision 让它直接看你的屏幕、窗口或摄像头，并针对它真正看到的内容作答。",
    "bestFor": "Troubleshooting an error on screen, or asking about a page you're looking at, without describing it.",
    "bestForZh": "排查屏幕上的报错，或者针对眼前这个页面提问，而不必先去描述它。",
    "released": "2024-10-01",
    "datePrecision": "month",
    "homepage": "https://support.microsoft.com/en-us/microsoft-copilot/using-copilot-vision-with-microsoft-copilot",
    "desc": "Lets Copilot look at your screen, a window, or your camera.",
    "descZh": "让 Copilot 直接看屏幕或摄像头。",
    "tags": [
      "in-product",
      "microsoft-copilot"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "M"
  },
  {
    "id": "agentforce",
    "name": "Agentforce",
    "nameZh": "Agentforce",
    "vendor": "Salesforce",
    "vendorZh": "Salesforce",
    "logo": "/assets/logos/salesforce.ico",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Support and sales questions pile up in queues. It answers and acts on them using your CRM records.",
    "solvesZh": "客服和销售的问题堆在队列里。它调用你 CRM 里的记录，既能回答也能代办。",
    "bestFor": "When your service and sales teams are drowning in repetitive customer requests.",
    "bestForZh": "客服和销售团队被大量重复的客户咨询淹没的时候。",
    "released": "2024-09-12",
    "datePrecision": "day",
    "homepage": "https://www.salesforce.com/agentforce/",
    "desc": "Salesforce's platform for autonomous CRM, service and sales agents.",
    "descZh": "Salesforce 面向 CRM、客服与销售的自主智能体平台。",
    "tags": [
      "crm",
      "autonomous-agents",
      "no-code",
      "enterprise"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "A"
  },
  {
    "id": "replit-agent",
    "name": "Replit Agent",
    "nameZh": "Replit Agent",
    "vendor": "Replit",
    "vendorZh": "Replit",
    "logo": "/assets/logos/replit.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "in-product",
    "solves": "An idea and no environment to run it in. You describe the app and it writes, runs and hosts it — no local install, no deploy config.",
    "solvesZh": "只有想法，没有能跑起来的环境。你描述这个应用，它负责写、跑、托管，不用本地安装，也不用配部署。",
    "bestFor": "When you need something working and shareable today, and do not have a dev machine set up.",
    "bestForZh": "当你今天就要一个能跑、能分享的东西，却还没配好开发机。",
    "released": "2024-09-05",
    "datePrecision": "day",
    "homepage": "https://replit.com/agent",
    "desc": "Prompt-to-deployed-app agent inside the Replit IDE",
    "descZh": "在 Replit IDE 内从一句话直接生成并部署可运行应用",
    "tags": [
      "app-generation",
      "cloud-ide",
      "no-code"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "R"
  },
  {
    "id": "kagi-assistant",
    "name": "Kagi Assistant",
    "nameZh": "Kagi Assistant",
    "vendor": "Kagi",
    "vendorZh": "Kagi",
    "logo": "/assets/logos/kagi.png",
    "region": "intl",
    "category": "search",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "A general search engine answers from ads and SEO. Kagi Assistant answers from its own paid index, with a link behind each claim.",
    "solvesZh": "通用搜索引擎靠广告和 SEO 作答。Kagi Assistant 用自建的付费索引回答，每条结论都附链接。",
    "bestFor": "When you already pay for Kagi Search and want the answer mode with citations.",
    "bestForZh": "当你已经付费用 Kagi Search，并想要带引用的回答模式。",
    "released": "2024-09-04",
    "datePrecision": "day",
    "homepage": "https://kagi.com",
    "desc": "Paid-search-grounded assistant on top of Kagi Search",
    "descZh": "基于 Kagi 自有搜索索引的问答助手，2025-04 开放给全部用户",
    "tags": [
      "answer-engine",
      "privacy",
      "citations"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "K"
  },
  {
    "id": "wenxiaoyan",
    "name": "文小言",
    "nameZh": "文小言",
    "vendor": "百度",
    "vendorZh": "百度",
    "logo": "/assets/logos/baidu.ico",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Drafting one document means opening several tabs and copying text back and forth. Wenxiaoyan puts writing, lookup and organizing in a single conversation.",
    "solvesZh": "起草一份文档要开好几个网页、复制粘贴来回复制。文小言把写作、查资料和整理放在一个对话框里。",
    "bestFor": "You want to ask the question and get a finished draft in one place instead of switching tools.",
    "bestForZh": "想在一个地方问完问题、拿到成稿，而不是切换多个工具。",
    "released": "2024-09-03",
    "datePrecision": "day",
    "homepage": "https://yiyan.baidu.com",
    "desc": "文心一言 App 更名后的新版助手",
    "descZh": "文心一言 App 更名后的新版助手",
    "tags": [
      "chat-assistant",
      "wenxin",
      "baidu"
    ],
    "status": "renamed",
    "supersededBy": "wenxin-yiyan",
    "successorName": "文心一言",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "文"
  },
  {
    "id": "minimax",
    "name": "MiniMax 开放平台",
    "nameZh": "MiniMax 开放平台",
    "vendor": "MiniMax",
    "vendorZh": "MiniMax",
    "logo": "/assets/logos/minimax.png",
    "region": "cn",
    "category": "enterprise-api",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Language, video, speech, image and music each come from a different vendor, and the accounts and billing split five ways. The open platform puts them in one place.",
    "solvesZh": "语言、视频、语音、图像、音乐各接一家，账号和计费散成五套。开放平台收在一处。",
    "bestFor": "When you want to call MiniMax's multimodal models under a single account.",
    "bestForZh": "你要在同一个账号下调用 MiniMax 的多模态模型。",
    "released": "2024-09-01",
    "datePrecision": "day",
    "homepage": "https://platform.minimaxi.com",
    "desc": "MiniMax 模型 API 开放服务平台",
    "descZh": "MiniMax 模型 API 开放服务平台",
    "tags": [
      "enterprise-api",
      "api",
      "minimax"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "M"
  },
  {
    "id": "hailuo",
    "name": "海螺AI",
    "nameZh": "海螺AI",
    "vendor": "MiniMax",
    "vendorZh": "MiniMax",
    "logo": "/assets/logos/minimax.png",
    "region": "cn",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Making a short video means writing a script, sourcing footage and editing. Hailuo produces a finished clip or an image from one sentence.",
    "solvesZh": "拍一支短视频要写脚本、找素材、剪片子。输入一句话就能出成片或图像。",
    "bestFor": "When you want to try several visual directions quickly instead of building a full production pipeline for one clip.",
    "bestForZh": "你要快速试多个画面方向，而不是为一条片子搭完整制作流程。",
    "released": "2024-09-01",
    "datePrecision": "day",
    "homepage": "https://hailuoai.com",
    "desc": "海螺音视频与图像 AI 创作平台",
    "descZh": "海螺音视频与图像 AI 创作平台",
    "tags": [
      "multimodal",
      "video-generation",
      "minimax"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "海"
  },
  {
    "id": "tavily",
    "name": "Tavily",
    "nameZh": "Tavily",
    "vendor": "Tavily",
    "vendorZh": "Tavily",
    "logo": "/assets/logos/tavily.ico",
    "region": "intl",
    "category": "search",
    "useCases": [
      "research"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "When AI searches the web, what comes back is long and messy and the model can't find the point. This API hands you already-filtered results and clean page text.",
    "solvesZh": "让 AI 搜网页，搜回来的内容又长又杂，模型抓不到重点。这层接口直接给你筛过的结果和正文。",
    "bestFor": "You want to give your own agent live web search.",
    "bestForZh": "你要给自己的智能体接上实时网页搜索。",
    "released": "2024-08-30",
    "datePrecision": "day",
    "homepage": "https://tavily.com",
    "desc": "Search API optimised for agent research and extraction",
    "descZh": "为 Agent 研究与信息抽取优化的搜索 API，源自 GPT Researcher",
    "tags": [
      "search-api",
      "agents",
      "research"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "T"
  },
  {
    "id": "phariaai",
    "name": "PhariaAI",
    "nameZh": "PhariaAI",
    "vendor": "Aleph Alpha",
    "vendorZh": "Aleph Alpha",
    "logo": "/assets/logos/aleph-alpha.png",
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api",
      "local-private"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Regulated industries can neither send data out of the country nor return an answer with no stated basis. This runs entirely on your own machine.",
    "solvesZh": "受管行业既不能把数据送出境外，也交不出一个说不清依据的答案。这套东西整套跑在你自己机器上。",
    "bestFor": "You work on finance, government, or other projects with compliance and explainability requirements.",
    "bestForZh": "你在做金融、政务这类有合规和可解释要求的项目。",
    "released": "2024-08-26",
    "datePrecision": "day",
    "homepage": "https://pharia.com/",
    "desc": "Sovereign, explainable generative AI stack for regulated organisations",
    "descZh": "面向受监管机构的主权型、可解释生成式 AI 技术栈",
    "tags": [
      "sovereign-ai",
      "explainability",
      "compliance",
      "on-premises"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "P"
  },
  {
    "id": "p2061",
    "name": "言犀智能体平台",
    "nameZh": "言犀智能体平台",
    "vendor": "京东",
    "vendorZh": "京东",
    "logo": "/assets/logos/jd.png",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "office",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Building a shippable agent from scratch means wiring a model, connecting a knowledge base and tuning prompts. The platform starts you from ready-made industry templates.",
    "solvesZh": "从零搭一个能上线的智能体，要配模型、接知识库、调提示词。平台提供现成的行业模板改。",
    "bestFor": "When you need a customer-service, sales-assistant or supply-chain agent without an engineering team behind every change.",
    "bestForZh": "要做客服、导购或供应链场景的智能体，且不想全靠工程团队。",
    "released": "2024-07-30",
    "datePrecision": "day",
    "homepage": "https://www.jdcloud.com/cn/products/yanxi",
    "desc": "京东云一站式 Agent 开发平台",
    "descZh": "京东云一站式 Agent 开发平台",
    "tags": [
      "low-code",
      "rag",
      "industry-templates",
      "retail"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "言"
  },
  {
    "id": "cline",
    "name": "Cline",
    "nameZh": "Cline",
    "vendor": "Cline",
    "vendorZh": "Cline",
    "logo": "/assets/logos/cline.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "extension",
    "solves": "The built-in agent can act without showing you each step. Cline shows every edit and lets you approve or reject it one at a time.",
    "solvesZh": "内置 Agent 可以不逐步展示就动手。Cline 把每一次修改都摆出来，你可以逐条批准或驳回。",
    "bestFor": "When you want an agent in your own VS Code and want to watch what it changes.",
    "bestForZh": "当你要在自己的 VS Code 里用 Agent，并且要盯着它改了什么。",
    "released": "2024-07-01",
    "datePrecision": "day",
    "homepage": "https://cline.bot",
    "desc": "Open-source VS Code agent, first released as Claude Dev",
    "descZh": "开源 VS Code 编码 Agent，2024-07 以 Claude Dev 之名发布，2024-10-09 更名 Cline",
    "tags": [
      "open-source",
      "vscode",
      "openrouter"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "marscode",
    "name": "豆包 MarsCode",
    "nameZh": "豆包 MarsCode",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "logo": "/assets/logos/bytedance.png",
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "Autocomplete and looking up an error mean switching context while you type. Here both happen inside the editor, and you can swap models.",
    "solvesZh": "写代码时补全和查报错要来回翻。这里在编辑器里直接补全、解释报错，还能换模型。",
    "bestFor": "When you want an AI coding assistant for free and are not ready to buy the enterprise plan.",
    "bestForZh": "想先免费用上 AI 编程助手，不打算立刻买企业版。",
    "released": "2024-06-26",
    "datePrecision": "day",
    "homepage": "https://www.marscode.cn/",
    "desc": "免费 AI 编程助手与云端 IDE",
    "descZh": "免费 AI 编程助手与云端 IDE",
    "tags": [
      "cloud-ide",
      "free-tier",
      "code-completion",
      "multi-model"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "豆"
  },
  {
    "id": "gemini-in-google-docs-and-sheets",
    "name": "Gemini in Google Docs and Sheets",
    "nameZh": "Google 文档与表格中的 Gemini",
    "vendor": "Google",
    "vendorZh": "Google",
    "logo": "/assets/logos/google.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Copying a document out to a chatbot to edit it and copying it back is a lot of steps for a small change. Gemini sits in a side panel of the file itself.",
    "solvesZh": "为了改一点点就把文档复制到聊天工具、再复制回来，步骤太多。Gemini 就待在文件本身的侧边栏里。",
    "bestFor": "Drafting, rewriting, and summarizing inside Docs and Sheets without leaving the document.",
    "bestForZh": "在文档和表格里起草、改写、总结，而不用离开这个文件。",
    "released": "2024-06-24",
    "datePrecision": "day",
    "homepage": "https://workspaceupdates.googleblog.com/2024/06/gemini-in-side-panel-of-google-docs-sheets-slides-drive.html",
    "desc": "Gemini living in a side panel of the file itself.",
    "descZh": "待在文件侧边栏里的 Gemini。",
    "tags": [
      "in-product",
      "google-workspace"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "G"
  },
  {
    "id": "hume-ai",
    "name": "Hume AI",
    "nameZh": "Hume AI",
    "vendor": "Hume AI",
    "vendorZh": "Hume AI",
    "logo": "/assets/logos/hume-ai.ico",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "audio-voice",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Synthesized speech sounds like an announcement with no feeling in it. You can direct the emotion it speaks with, and clone your own voice.",
    "solvesZh": "合成语音念得像播报，听不出情绪。你能指定它用什么情绪去说，也能克隆自己的声音。",
    "bestFor": "Making audio content where the voice needs to sound like it is expressing something, not reading a script.",
    "bestForZh": "做有声内容，需要声音听起来在表达而不是在念字。",
    "released": "2024-06-19",
    "datePrecision": "day",
    "homepage": "https://hume.ai/",
    "desc": "Voice AI that listens to your tone before answering.",
    "descZh": "会先听你语气再回应的情感智能语音 AI。",
    "tags": [
      "emotion-aware",
      "voice-clone",
      "tts",
      "expression-control"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "H"
  },
  {
    "id": "yuewen",
    "name": "跃问",
    "nameZh": "跃问",
    "vendor": "阶跃星辰",
    "vendorZh": "阶跃星辰",
    "logo": "/assets/logos/stepfun.svg",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Asking about a photo means opening a separate vision tool and asking twice, once for text and once for the image. Send both together and get one answer.",
    "solvesZh": "拍照提问要另开一个识图工具，文字和图片得分两次问。图片和文字一起发，直接得到回答。",
    "bestFor": "When you have an image or a video in front of you and want to ask what is in it.",
    "bestForZh": "手边有一张图或一段视频，想问里面的内容。",
    "released": "2024-06-13",
    "datePrecision": "day",
    "homepage": "https://www.stepfun.com/yuewen",
    "desc": "阶跃星辰多模态 AI 问答助手",
    "descZh": "阶跃星辰多模态 AI 问答助手",
    "tags": [
      "chat-assistant",
      "multimodal",
      "stepfun"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "跃"
  },
  {
    "id": "arize-phoenix",
    "name": "Arize Phoenix",
    "nameZh": "Arize Phoenix",
    "vendor": "Arize AI",
    "vendorZh": "Arize AI",
    "logo": "/assets/logos/arize-ai.ico",
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "A hosted tracing bill is a bad fit for a notebook experiment. Phoenix runs the same traces locally, for free.",
    "solvesZh": "托管式 tracing 的账单不适合 Notebook 里的实验。Phoenix 在本地跑同样的 trace，免费。",
    "bestFor": "When you are prototyping in a notebook and cannot send traces to a vendor.",
    "bestForZh": "你在 Notebook 里做原型，不能把 trace 发给外部厂商。",
    "released": "2024-06-12",
    "datePrecision": "day",
    "homepage": "https://arize.com/phoenix",
    "desc": "Open-source tracing and eval library for LLM applications",
    "descZh": "开源的 LLM 应用追踪与评测库，可在本地 Notebook 中直接跑",
    "tags": [
      "open-source",
      "tracing",
      "evaluation"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "A"
  },
  {
    "id": "luma-dream-machine",
    "name": "Luma Dream Machine",
    "nameZh": "Luma Dream Machine",
    "vendor": "Luma Labs",
    "vendorZh": "Luma Labs",
    "logo": "/assets/logos/luma-labs.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "You want to try text-to-video but aren't sure what it produces, and you don't want to pay first. Here you can generate a few free seconds and look.",
    "solvesZh": "想试文生视频但不确定效果，也不想先付费。这里可以先免费生成几秒片段看看。",
    "bestFor": "When a concept test beats a production render — you need a look, not a film.",
    "bestForZh": "当你要的是先看一眼概念效果，而不是成片交付时。",
    "released": "2024-06-12",
    "datePrecision": "day",
    "homepage": "https://lumalabs.ai/dream-machine",
    "desc": "Free text-to-video model that hit 1M users in days",
    "descZh": "免费开放的文生视频模型，上线四天用户破百万",
    "tags": [
      "video-generation",
      "text-to-video",
      "creative"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "L"
  },
  {
    "id": "keling",
    "name": "可灵AI",
    "nameZh": "可灵AI",
    "vendor": "快手",
    "vendorZh": "快手",
    "logo": "/assets/logos/kuaishou.ico",
    "region": "cn",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "You want a video but can't shoot it or afford footage. Give it one line of text or a single image and it generates a few seconds you can use directly.",
    "solvesZh": "想做一段视频，拍不出来也买不起素材。给一句文字或一张图，生成几秒能直接用的画面。",
    "bestFor": "You want to test a video idea quickly rather than shoot it for real.",
    "bestForZh": "你要快速试一段视频创意，而不是正式去拍。",
    "released": "2024-06-06",
    "datePrecision": "day",
    "homepage": "https://klingai.kuaishou.com/",
    "desc": "文生视频与图片创作平台",
    "descZh": "文生视频与图片创作平台",
    "tags": [
      "video-generation",
      "text-to-video",
      "image-generation"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "可"
  },
  {
    "id": "factory",
    "name": "Factory",
    "nameZh": "Factory",
    "vendor": "Factory AI",
    "vendorZh": "Factory AI",
    "logo": "/assets/logos/factory-ai.svg",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "surface": "standalone",
    "solves": "Mechanical chores like writing the test file for a PR sit in the queue forever. You hand them to a dedicated droid and get the diff back.",
    "solvesZh": "给 PR 补测试文件这类机械活，永远排在队列里。交给专门的 droid 去做，你拿回一份 diff。",
    "bestFor": "When a ticket is scoped enough that a droid can finish it while you work on something else.",
    "bestForZh": "当一个任务的范围已经清楚到 droid 能在你忙别的时候独立做完。",
    "released": "2024-06-01",
    "datePrecision": "day",
    "homepage": "https://factory.com/",
    "desc": "Task-specific autonomous Droids for software engineering",
    "descZh": "面向软件工程的多款专职自主 Droids：Review、Test、Code 等",
    "tags": [
      "autonomous-agent",
      "enterprise",
      "swe-bench"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "F"
  },
  {
    "id": "genspark",
    "name": "Genspark",
    "nameZh": "Genspark",
    "vendor": "Genspark",
    "vendorZh": "Genspark",
    "logo": "/assets/logos/genspark.png",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "research",
      "office",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "One task splits into researching, building a sheet, and making slides, so the assistant hands half of it back to you. It sends out multiple agents to finish it between them.",
    "solvesZh": "一件事要拆成查资料、做表、做幻灯片好几步，助手做一半就得你接手。它派多个智能体分头做完。",
    "bestFor": "You want the finished artifact — a report, slides, or a table — not an answer.",
    "bestForZh": "你要一份成品——报告、幻灯片或表格，不是回答。",
    "released": "2024-06-01",
    "datePrecision": "day",
    "homepage": "https://www.genspark.ai/",
    "desc": "AI workspace that dispatches many agents to finish a whole task.",
    "descZh": "调度多个智能体把整件任务做完的 AI 工作空间。",
    "tags": [
      "multi-agent",
      "task-completion",
      "workspace",
      "slides-and-sheets"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "G"
  },
  {
    "id": "yuanqi",
    "name": "腾讯元器",
    "nameZh": "腾讯元器",
    "vendor": "腾讯",
    "vendorZh": "腾讯",
    "logo": "/assets/logos/tencent.png",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "You want to build an agent and hand it to colleagues or customers, but you don't write code. Here you assemble and publish it by dragging.",
    "solvesZh": "想做个智能体分发给同事或客户用，但不会写代码。这里拖拽就能搭好、发布出去。",
    "bestFor": "You want to build your own agent and let other people use it directly.",
    "bestForZh": "你要做一个自己的智能体，并让别人直接用它。",
    "released": "2024-05-30",
    "datePrecision": "day",
    "homepage": "https://yuanqi.tencent.com",
    "desc": "腾讯智能体创建与分发平台",
    "descZh": "腾讯智能体创建与分发平台",
    "tags": [
      "agent-platform",
      "low-code",
      "tencent"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "腾"
  },
  {
    "id": "yuanbao",
    "name": "腾讯元宝",
    "nameZh": "腾讯元宝",
    "vendor": "腾讯",
    "vendorZh": "腾讯",
    "logo": "/assets/logos/tencent.png",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "A Chinese-language question returns a pile of links you still have to open and read one by one. It hands you a written Chinese answer instead.",
    "solvesZh": "中文问题搜出来一堆链接，你还得逐个点开自己读。它直接给一段整理好的中文答案。",
    "bestFor": "You want to ask in Chinese and get an answer, not a list of links.",
    "bestForZh": "你想用中文问问题、直接拿到答案而不是一串链接。",
    "released": "2024-05-30",
    "datePrecision": "day",
    "homepage": "https://yuanbao.tencent.com",
    "desc": "腾讯基于混元大模型的 AI 助手",
    "descZh": "腾讯基于混元大模型的 AI 助手",
    "tags": [
      "chat-assistant",
      "hunyuan",
      "tencent"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/yuanbao/",
        "zh": "/zh/products/yuanbao/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "腾"
  },
  {
    "id": "granola",
    "name": "Granola",
    "nameZh": "Granola",
    "vendor": "Granola",
    "vendorZh": "Granola",
    "logo": "/assets/logos/granola.png",
    "region": "intl",
    "category": "meetings",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Meeting bots join as a participant and record everyone. Granola sits in your notes app and turns your own scrawl plus the transcript into clean notes.",
    "solvesZh": "会议机器人以参会者身份入场，把所有人都录了。Granola 待在你的笔记应用里，把你自己写的东西加上转录整理成干净记录。",
    "bestFor": "When you already take your own notes and don't want another voice in the room.",
    "bestForZh": "当你自己已经在记笔记，不想房间里再多一个声音。",
    "released": "2024-05-22",
    "datePrecision": "day",
    "homepage": "https://www.granola.ai",
    "desc": "Bot-free AI meeting notepad that merges your own notes",
    "descZh": "不加会议机器人的 AI 笔记，用你的手写笔记与转录合并成纪要",
    "tags": [
      "meetings",
      "notes",
      "no-bot"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "G"
  },
  {
    "id": "jimeng",
    "name": "即梦AI",
    "nameZh": "即梦AI",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "logo": "/assets/logos/bytedance.png",
    "region": "cn",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Images and video live in separate tools, so moving assets between them eats your time. Jimeng puts both in one platform.",
    "solvesZh": "做图和做视频是两套工具，来回搬素材很费时间。即梦把图像和视频生成放在同一个平台里。",
    "bestFor": "When you need one image plus a short clip, without shuttling between two tools.",
    "bestForZh": "要出一张图再配一段短视频，不想在两个工具之间折腾。",
    "released": "2024-05-09",
    "datePrecision": "day",
    "homepage": "https://jimeng.jianying.com/",
    "desc": "一站式 AI 图像视频创作平台",
    "descZh": "一站式 AI 图像视频创作平台",
    "tags": [
      "video-generation",
      "text-to-image",
      "short-video"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "即"
  },
  {
    "id": "siliconflow",
    "name": "硅基流动 SiliconFlow",
    "nameZh": "硅基流动",
    "vendor": "硅基流动",
    "vendorZh": "硅基流动",
    "logo": "/assets/logos/siliconflow.ico",
    "region": "cn",
    "category": "model-platform",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Switching models means finding a new deployment every time. Here one endpoint reaches 170+ open models, running on domestic Chinese chips.",
    "solvesZh": "想换一个模型就得重新找部署方案。这里一个接口能调 170+ 开源模型，还跑在国产芯片上。",
    "bestFor": "When you want open models running on domestic Chinese chips without tuning the inference deployment yourself.",
    "bestForZh": "想在国产芯片上跑开源模型，又不想自己调推理部署。",
    "released": "2024-05-01",
    "datePrecision": "day",
    "homepage": "https://siliconflow.cn/",
    "desc": "Chinese MaaS serving 170+ open models on domestic AI chips.",
    "descZh": "在国产芯片上服务 170+ 开源模型的 MaaS 平台。",
    "tags": [
      "maas",
      "domestic-chips",
      "open-models",
      "cost-optimization"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "硅"
  },
  {
    "id": "amazon-q",
    "name": "Amazon Q",
    "nameZh": "Amazon Q",
    "vendor": "Amazon",
    "vendorZh": "Amazon",
    "logo": "/assets/logos/amazon.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "The answer to a routine question lives in a wiki page nobody can find. Q answers over the company's own data without pasting it into a public chatbot.",
    "solvesZh": "日常问题的答案藏在没人找得到的 wiki 页里。Q 直接在公司自有数据上作答，不用粘进公开的聊天机器人。",
    "bestFor": "When you need an answer from internal docs and the data cannot leave the company.",
    "bestForZh": "当你要从内部文档里找答案，而数据不能离开公司。",
    "released": "2024-04-30",
    "datePrecision": "day",
    "homepage": "https://aws.amazon.com/q/",
    "desc": "Enterprise work assistant answering over internal company data",
    "descZh": "面向企业的工作助手，可基于内部数据作答",
    "tags": [
      "enterprise",
      "internal-data",
      "aws",
      "productivity"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "A"
  },
  {
    "id": "vidu",
    "name": "Vidu",
    "nameZh": "Vidu",
    "vendor": "生数科技 ShengShu AI",
    "vendorZh": "生数科技 ShengShu AI",
    "logo": "/assets/logos/shengshu-ai.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Foreign video tools handle Chinese faces and settings poorly, and footage may not leave the country. This one is trained at home.",
    "solvesZh": "国外视频工具对中国面孔和本土场景处理不好，而且素材未必能出境。这个模型是在国内训练的。",
    "bestFor": "When the subject matter is Chinese, or the footage cannot go to an overseas service.",
    "bestForZh": "当题材是中文本土内容，或者素材不能送到海外服务。",
    "released": "2024-04-27",
    "datePrecision": "day",
    "homepage": "https://www.vidu.com/",
    "desc": "Tsinghua and ShengShu's natively-developed video generation model.",
    "descZh": "清华大学与生数科技联合推出的国产自研视频生成大模型。",
    "tags": [
      "text-to-video",
      "anime-style",
      "reference-video",
      "chinese-elements"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "V"
  },
  {
    "id": "slack-ai",
    "name": "Slack AI",
    "nameZh": "Slack AI",
    "vendor": "Salesforce",
    "vendorZh": "Salesforce",
    "logo": "/assets/logos/salesforce.ico",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Scrolling back through a week of threads to find one decision is slow and error-prone. Slack AI summarizes threads, recaps channels, and answers questions across your whole workspace's history.",
    "solvesZh": "往回翻一周的会话串去找一个决定，既慢又容易漏。Slack AI 总结会话串、生成频道回顾，并能在整个工作区历史里直接回答你的问题。",
    "bestFor": "Answering \"where did we land on this?\" and catching up on channels you don't read in full.",
    "bestForZh": "回答「这个我们最后怎么定的？」，以及补上那些你来不及看完的频道。",
    "released": "2024-04-18",
    "datePrecision": "day",
    "homepage": "https://slack.com/features/ai",
    "desc": "Search, summaries, and recaps across your Slack history.",
    "descZh": "在 Slack 历史里搜索和总结。",
    "tags": [
      "in-product",
      "slack"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "S"
  },
  {
    "id": "reka-ai",
    "name": "Reka AI",
    "nameZh": "Reka AI",
    "vendor": "Reka AI",
    "vendorZh": "Reka AI",
    "logo": "/assets/logos/reka-ai.png",
    "region": "intl",
    "category": "model-platform",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Piping a document, a chart and an audio clip through three separate models means three prompt formats. One model takes all four together.",
    "solvesZh": "把文档、图表和音频片段分别送进三个模型，就要准备三套 prompt 格式。一个模型可以同时接收这四种输入。",
    "bestFor": "When a single request mixes text, image, video and audio and you want one reasoning pass over it.",
    "bestForZh": "当一次请求里混合了文字、图片、视频和音频，你希望只推理一遍。",
    "released": "2024-04-15",
    "datePrecision": "day",
    "homepage": "https://www.reka.ai/",
    "desc": "Multimodal language models handling text, image, video and audio",
    "descZh": "统一处理文本、图像、视频与音频的多模态语言模型",
    "tags": [
      "multimodal",
      "foundation-models",
      "research-lab",
      "api"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "R"
  },
  {
    "id": "humane-ai-pin",
    "name": "Humane AI Pin",
    "nameZh": "Humane AI Pin",
    "vendor": "Humane",
    "vendorZh": "Humane",
    "logo": null,
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "Using a phone means looking at a screen. The Pin answered by voice with nothing to look at. HP discontinued it in 2025.",
    "solvesZh": "用手机就意味着盯着屏幕。Pin 用语音作答，屏幕上什么都不用看。HP 已于 2025 年停产。",
    "bestFor": "When you wanted hands-free answers with no display. The company stopped selling it in February 2025.",
    "bestForZh": "当你想要免手操作、没有屏幕的回答。公司已于 2025 年 2 月停售。",
    "released": "2024-04-11",
    "datePrecision": "day",
    "homepage": "https://humane.com",
    "desc": "Screenless lapel pin assistant, discontinued in 2025",
    "descZh": "无屏胸针式 AI 助手，口碑不佳，2025-02 停售并被 HP 收购",
    "tags": [
      "hardware",
      "discontinued",
      "wearable"
    ],
    "status": "discontinued",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "H"
  },
  {
    "id": "udio",
    "name": "Udio",
    "nameZh": "Udio",
    "vendor": "Uncharted Labs",
    "vendorZh": "Uncharted Labs",
    "logo": "/assets/logos/uncharted-labs.ico",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "audio-voice"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Licensing a track for a video or a game takes weeks and costs more than the project. You generate the music and clear it.",
    "solvesZh": "给一支视频或一款游戏配一首授权曲子，要谈上几周，花的钱比项目本身还多。你直接生成音乐，版权也归你。",
    "bestFor": "When you need a music bed that fits the cut and does not come with a rights dispute.",
    "bestForZh": "当你需要一段配得上剪辑、且不会带来版权纠纷的背景音乐时。",
    "released": "2024-04-10",
    "datePrecision": "day",
    "homepage": "https://www.udio.com",
    "desc": "Music generation startup from former DeepMind researchers",
    "descZh": "由前 DeepMind  researcher 创办的音乐生成平台，2024-04 公测",
    "tags": [
      "music-generation",
      "audio",
      "creative"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "U"
  },
  {
    "id": "stepfun-platform",
    "name": "阶跃星辰开放平台",
    "nameZh": "阶跃星辰开放平台",
    "vendor": "阶跃星辰",
    "vendorZh": "阶跃星辰",
    "logo": "/assets/logos/stepfun.svg",
    "region": "cn",
    "category": "enterprise-api",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Picking a stable domestic multimodal model and understanding its pricing takes research. One interface and one bill cover the Step family, with no per-vendor integration.",
    "solvesZh": "想用国产多模态模型，不知道哪家稳定、怎么计费。统一的接口和账单，不用逐家对接。",
    "bestFor": "When you need to call the Step model family from a backend.",
    "bestForZh": "需要在后端调用 Step 系列模型时。",
    "released": "2024-03-19",
    "datePrecision": "day",
    "homepage": "https://platform.stepfun.com",
    "desc": "Step 系列大模型 API 服务平台",
    "descZh": "Step 系列大模型 API 服务平台",
    "tags": [
      "enterprise-api",
      "api",
      "stepfun"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "阶"
  },
  {
    "id": "nvidia-nim",
    "name": "NVIDIA NIM",
    "nameZh": "NVIDIA NIM",
    "vendor": "NVIDIA",
    "vendorZh": "NVIDIA",
    "logo": "/assets/logos/nvidia.ico",
    "region": "intl",
    "category": "model-platform",
    "useCases": [
      "model-api",
      "local-private"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "A model that fits on the GPU still needs tuning before it runs fast. It ships pre-optimised containers you drop onto your own hardware.",
    "solvesZh": "模型塞得进 GPU 也不等于跑得快，还得调优。它提供预优化好的容器，直接部署到自己的硬件上。",
    "bestFor": "When you want to self-host a model on NVIDIA GPUs without writing the serving code.",
    "bestForZh": "想在 NVIDIA GPU 上自托管模型、又不想自己写推理服务代码的时候。",
    "released": "2024-03-18",
    "datePrecision": "day",
    "homepage": "https://build.nvidia.com/",
    "desc": "Optimized inference microservices packaging models for GPU deployment",
    "descZh": "面向 GPU 部署的优化推理微服务，将模型打包为即用容器",
    "tags": [
      "inference",
      "microservices",
      "on-premises",
      "openai-compatible"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "N"
  },
  {
    "id": "devin",
    "name": "Devin",
    "nameZh": "Devin",
    "vendor": "Cognition",
    "vendorZh": "Cognition",
    "logo": "/assets/logos/cognition.svg",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "A ticket needing hours of coding, testing, and file hunting is hard to hand to one person. Devin takes it and hands back a branch.",
    "solvesZh": "一个要花几小时写代码、做测试、翻文件的 issue，很难塞给一个人做完。Devin 接过去，最后交回一个分支。",
    "bestFor": "When a well-scoped ticket could occupy a developer for a day of steady work.",
    "bestForZh": "当一个边界清晰的 issue 够一个开发者稳稳干上一整天时。",
    "released": "2024-03-12",
    "datePrecision": "day",
    "homepage": "https://devin.ai",
    "desc": "Autonomous cloud software engineer marketed to enterprises",
    "descZh": "面向企业的云端自主软件工程师，可自行规划并执行多步开发任务",
    "tags": [
      "autonomous-agent",
      "swe-bench",
      "enterprise"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": null,
    "glyph": "D"
  },
  {
    "id": "openhands",
    "name": "OpenHands",
    "nameZh": "OpenHands",
    "vendor": "All Hands AI",
    "vendorZh": "All Hands AI",
    "logo": "/assets/logos/all-hands-ai.svg",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "agent-building"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "A ticket sits in the backlog because no one has time to reproduce the bug. It reads the repo, makes the fix and opens the PR.",
    "solvesZh": "工单堆在待办里，因为没人有空去复现这个 bug。它读仓库、改好代码，再把 PR 提上来。",
    "bestFor": "When you have well-defined issues you want solved without assigning a person.",
    "bestForZh": "有一批描述清楚的 issue 想解决、又不想专门指派一个人的时候。",
    "released": "2024-03-12",
    "datePrecision": "day",
    "homepage": "https://openhands.dev",
    "desc": "open-source autonomous agent that resolves issues end to end",
    "descZh": "开源自主智能体，端到端完成从读代码到提 PR",
    "tags": [
      "open-source",
      "self-hosted",
      "sandboxed",
      "model-agnostic"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "O"
  },
  {
    "id": "zapier-agents",
    "name": "Zapier Agents",
    "nameZh": "Zapier Agents",
    "vendor": "Zapier",
    "vendorZh": "Zapier",
    "logo": "/assets/logos/zapier.ico",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Running a flow between several apps means writing a rule for every case. These agents read what triggered them and decide the next step.",
    "solvesZh": "想让几个应用间自动跑一段流程，却要为每种情况写一堆规则。它的智能体看着触发内容定下一步。",
    "bestFor": "You already have a set of Zapier connections and want the flow to make its own decisions.",
    "bestForZh": "已有一堆 Zapier 连接，想让流程自己判断。",
    "released": "2024-03-06",
    "datePrecision": "day",
    "homepage": "https://zapier.com/agents",
    "desc": "No-code agents across 8000+ app integrations",
    "descZh": "无代码 Agent 平台，连接 8000+ 应用；2024-03 以 Zapier Central 形态推出",
    "tags": [
      "no-code",
      "automation",
      "integrations"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "Z"
  },
  {
    "id": "metaso-search",
    "name": "秘塔AI搜索",
    "nameZh": "秘塔AI搜索",
    "vendor": "秘塔",
    "vendorZh": "秘塔",
    "logo": "/assets/logos/metaso.png",
    "region": "cn",
    "category": "search",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Chinese search results are ads you have to scroll past before the answer. It drops the ads and puts the answer at the top.",
    "solvesZh": "中文搜索结果页前面全是广告，你得先划过去才能看到答案。秘塔把广告去掉，答案直接放在最上面。",
    "bestFor": "When you want a Chinese-language answer without the sponsored links sitting between you and it.",
    "bestForZh": "当你想要一个中文答案，而不想中间夹着赞助链接时。",
    "released": "2024-03-01",
    "datePrecision": "day",
    "homepage": "https://metaso.cn",
    "desc": "无广告直达结果的生成式 AI 搜索",
    "descZh": "无广告直达结果的生成式 AI 搜索",
    "tags": [
      "search",
      "ai-search",
      "metaso"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "秘"
  },
  {
    "id": "le-chat",
    "name": "Le Chat",
    "nameZh": "Le Chat",
    "vendor": "Mistral AI",
    "vendorZh": "Mistral AI",
    "logo": "/assets/logos/mistral-ai.svg",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "General assistants answer slowly, and you never know where your data was sent. This one is built for fast replies and keeps your data in Europe.",
    "solvesZh": "普通助手答得慢，你的数据又不知道被发去了哪。这里主打快回应，并保证数据留在欧洲。",
    "bestFor": "Everyday questions where you care about both reply speed and where your data lives.",
    "bestForZh": "你在意回复速度、也在意数据存在哪里的日常问答。",
    "released": "2024-02-26",
    "datePrecision": "day",
    "homepage": "https://chat.mistral.ai/",
    "desc": "Mistral's consumer assistant emphasizing speed and European sovereignty",
    "descZh": "Mistral 的消费级助手，强调速度与欧洲数据主权",
    "tags": [
      "consumer",
      "european-sovereignty",
      "fast-inference",
      "mobile"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "L"
  },
  {
    "id": "lindy",
    "name": "Lindy",
    "nameZh": "Lindy",
    "vendor": "Lindy",
    "vendorZh": "Lindy",
    "logo": "/assets/logos/lindy.ico",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Email, meetings, and support messages eat up the day. Set up an assistant here to handle that traffic by rules you define.",
    "solvesZh": "邮件、会议、客服消息每天占满时间。这里配一个助理，让它按你定的规则去处理这些往来。",
    "bestFor": "You want to hand routine email and scheduling admin to an assistant.",
    "bestForZh": "你想把日常的邮件和日程杂事交给一个助理。",
    "released": "2024-02-16",
    "datePrecision": "day",
    "homepage": "https://www.lindy.ai",
    "desc": "Personal AI agents for email, meetings and support",
    "descZh": "面向邮件、会议与客户支持的个性化 AI 助理平台",
    "tags": [
      "personal-agent",
      "assistant",
      "automation"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "L"
  },
  {
    "id": "sora",
    "name": "Sora",
    "nameZh": "Sora",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "logo": "/assets/logos/openai.ico",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "You want a short clip with some visual weight but all you have is a paragraph of text. One line of description generates a few finished seconds.",
    "solvesZh": "想要一段有画面感的短片，但手上只有一段文字。写一句描述就能生成几秒成片。",
    "bestFor": "You need a concept clip to test an idea, not a real shoot.",
    "bestForZh": "你需要一段概念短片来试想法，而不是正式拍摄。",
    "released": "2024-02-15",
    "datePrecision": "day",
    "homepage": "https://sora.com/",
    "desc": "Text-to-video generation product producing photorealistic short clips",
    "descZh": "文本生成视频产品，可产出照片级短片",
    "tags": [
      "text-to-video",
      "generative-media",
      "creative"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": null,
    "glyph": "S"
  },
  {
    "id": "gemini-app",
    "name": "Gemini app",
    "nameZh": "Gemini 应用",
    "vendor": "Google",
    "vendorZh": "Google",
    "logo": "/assets/logos/google.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Typing a question and getting a page of links back. It answers in the thread and takes a photo or screenshot as input.",
    "solvesZh": "输入一个问题，搜回一整页链接。它直接在对话里给出答案，也能以照片或截图作为输入。",
    "bestFor": "When one question needs several sources and you want the answer, not the list.",
    "bestForZh": "当一个问题需要多个来源，而你要的是答案本身而不是链接列表。",
    "released": "2024-02-08",
    "datePrecision": "day",
    "homepage": "https://gemini.google.com/",
    "desc": "Google's assistant, formerly Bard, with Android and iOS apps",
    "descZh": "Google 的助手产品，前身 Bard，提供 Android 与 iOS 应用",
    "tags": [
      "consumer",
      "mobile",
      "search-integration",
      "multimodal"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/gemini/",
        "zh": "/zh/products/gemini/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "G"
  },
  {
    "id": "gumloop",
    "name": "Gumloop",
    "nameZh": "Gumloop",
    "vendor": "Gumloop",
    "vendorZh": "Gumloop",
    "logo": "/assets/logos/gumloop.ico",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Scraping a pile of data off the web every day and cleaning it by hand is repetitive and easy to get wrong. Drag scraping, cleaning, and output into one line that runs itself.",
    "solvesZh": "每天从网页扒一堆数据再手工整理，反复做还容易错。用拖拽把抓取、清洗和输出连成一条线自己跑。",
    "bestFor": "You have a repetitive data-moving job and want it to run on a schedule by itself.",
    "bestForZh": "你有一套重复的数据搬运工作，想让它自己定时跑。",
    "released": "2024-02-07",
    "datePrecision": "day",
    "homepage": "https://www.gumloop.com",
    "desc": "No-code AI workflow automation for scraped business data",
    "descZh": "面向业务数据处理的无代码 AI 工作流自动化平台，前身 AgentHub",
    "tags": [
      "no-code",
      "automation",
      "workflow"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "G"
  },
  {
    "id": "sierra-ai",
    "name": "Sierra AI",
    "nameZh": "Sierra AI",
    "vendor": "Sierra",
    "vendorZh": "Sierra",
    "logo": "/assets/logos/sierra.ico",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Customer service AI only answers and never acts, so order changes and refunds still go to a human. These agents finish the job, and you pay per resolved case.",
    "solvesZh": "客服 AI 只会回答不会办事，改单退款还得转人工。这里的智能体把事做完，按办成次数计费。",
    "bestFor": "You want to hand over the transactions support can actually automate.",
    "bestForZh": "你要把客服里能自动完成的交易真正交给 AI。",
    "released": "2024-02-01",
    "datePrecision": "day",
    "homepage": "https://sierra.ai/",
    "desc": "Agent OS for customer-experience agents billed per resolved outcome.",
    "descZh": "面向客服场景的 Agent OS，按解决结果计费。",
    "tags": [
      "customer-service",
      "outcome-pricing",
      "voice",
      "agent-runtime"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "S"
  },
  {
    "id": "coze",
    "name": "扣子",
    "nameZh": "扣子",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "logo": "/assets/logos/bytedance.png",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "You want to build an AI agent but nobody on the team can write code. Drag models, tools and knowledge together and it ships.",
    "solvesZh": "想做个 AI 智能体却没人会写代码。用拖拽把模型、工具和知识拼起来就能上线。",
    "bestFor": "When it is your first agent and you have no development team.",
    "bestForZh": "第一次做智能体，手上没有开发团队。",
    "released": "2024-02-01",
    "datePrecision": "day",
    "homepage": "https://www.coze.cn",
    "desc": "低代码 AI 智能体搭建平台",
    "descZh": "低代码 AI 智能体搭建平台",
    "tags": [
      "agent-platform",
      "low-code",
      "bytedance"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/coze/",
        "zh": "/zh/products/coze/"
      }
    },
    "lastVerifiedAt": null,
    "glyph": "扣"
  },
  {
    "id": "jan",
    "name": "Jan",
    "nameZh": "Jan",
    "vendor": "Jan",
    "vendorZh": "Jan",
    "logo": "/assets/logos/jan.ico",
    "region": "intl",
    "category": "local-runner",
    "useCases": [
      "local-private"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "You want a chat window that never phones home, and every hosted alternative does. It runs open models locally with no account.",
    "solvesZh": "你想要一个完全不上报数据的聊天窗口，而托管的替代品都会上报。它在本地跑开源模型，不需要注册账号。",
    "bestFor": "When you want a private offline chat on your own machine and will bring your own model.",
    "bestForZh": "当你想在自己的机器上离线私聊，并且愿意自带模型时。",
    "released": "2024-01-20",
    "datePrecision": "day",
    "homepage": "https://jan.ai",
    "desc": "Open-source offline ChatGPT alternative with Cortex engine",
    "descZh": "开源离线 ChatGPT 替代方案，自带 Cortex 推理引擎",
    "tags": [
      "open-source",
      "offline",
      "local-llm"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "J"
  },
  {
    "id": "rabbit-r1",
    "name": "Rabbit R1",
    "nameZh": "Rabbit R1",
    "vendor": "Rabbit Inc.",
    "vendorZh": "Rabbit Inc.",
    "logo": "/assets/logos/rabbit-inc.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "Unlocking the phone to set a timer is most of the task. The r1 listens and works the app for you, screen off and still in your pocket.",
    "solvesZh": "设个计时器，光解锁手机就占掉大半。r1 听懂后直接替你操作，屏幕关着、机器还在口袋里就行。",
    "bestFor": "When your hands are busy and the task is one you would normally do on your phone.",
    "bestForZh": "当你的手正忙着，而这件事本来要在手机上做。",
    "released": "2024-01-09",
    "datePrecision": "day",
    "homepage": "https://www.rabbit.tech",
    "desc": "Pocket voice-first device with a large language action model",
    "descZh": "口袋级语音优先设备，宣称用大模型直接操作手机应用",
    "tags": [
      "hardware",
      "voice",
      "consumer"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "R"
  },
  {
    "id": "ai",
    "name": "钉钉 AI 助理",
    "nameZh": "钉钉 AI 助理",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "logo": "/assets/logos/alibaba.png",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "office"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Buying a dedicated AI tool for one workflow means a separate login, a separate bill, and no access to the work data it would need. AI assistants live inside DingTalk and reach its own data.",
    "solvesZh": "为某一条工作流单独买一个 AI 工具，意味着另一套账号、另一笔费用，而且碰不到它真正需要的工作数据。AI 助理长在钉钉里，能直接取到钉钉内的数据。",
    "bestFor": "A team that already runs on DingTalk and wants an assistant grounded in its own approvals, chats, and docs.",
    "bestForZh": "已经在用钉钉的团队，想要一个能读到自己审批、消息和文档的助手。",
    "released": "2024-01-09",
    "datePrecision": "day",
    "homepage": "https://open.dingtalk.com/document/assistants-overview",
    "desc": "An AI assistant built inside DingTalk, wired to its own data.",
    "descZh": "钉钉内置的 AI 助理，能读到钉钉数据。",
    "tags": [
      "in-product"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "钉"
  },
  {
    "id": "cartesia",
    "name": "Cartesia",
    "nameZh": "Cartesia",
    "vendor": "Cartesia AI",
    "vendorZh": "Cartesia AI",
    "logo": "/assets/logos/cartesia-ai.png",
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building",
      "audio-voice"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Voice agents sound broken because speech generation is too slow. It starts speaking in under 100 milliseconds.",
    "solvesZh": "语音 Agent 听起来很生硬，是因为语音生成太慢。它在 100 毫秒内就开始说话。",
    "bestFor": "When you are building a voice agent that must answer without an audible pause.",
    "bestForZh": "做语音 Agent，而且要求回答时听不出停顿的时候。",
    "released": "2024-01-01",
    "datePrecision": "month",
    "homepage": "https://cartesia.ai/",
    "desc": "Speech API engineered for real-time voice agents under 100ms.",
    "descZh": "为实时语音智能体设计的语音 API，延迟低于 100 毫秒。",
    "tags": [
      "tts",
      "low-latency",
      "voice-clone",
      "on-device"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "greptile",
    "name": "Greptile",
    "nameZh": "Greptile",
    "vendor": "Greptile",
    "vendorZh": "Greptile",
    "logo": "/assets/logos/greptile.ico",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "observability"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "A reviewer reading only the diff misses what breaks elsewhere. Greptile maps the whole repo first, then reviews the PR.",
    "solvesZh": "只看 diff 的评审会漏掉别处被破坏的地方。Greptile 先摸清整个仓库，再评这个 PR。",
    "bestFor": "When a pull request touches shared code and you want a second pair of eyes before merge.",
    "bestForZh": "当一个 PR 改动了公共代码，你想在合并前多一双眼睛。",
    "released": "2024-01-01",
    "datePrecision": "month",
    "homepage": "https://www.greptile.com",
    "desc": "graph-indexes your repo then reviews PRs with an agent swarm",
    "descZh": "先为仓库建图谱，再用智能体集群审查 PR",
    "tags": [
      "pull-request",
      "code-graph",
      "self-hosting",
      "team-rules"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "G"
  },
  {
    "id": "samsung-galaxy-ai",
    "name": "Samsung Galaxy AI",
    "nameZh": "三星 Galaxy AI",
    "vendor": "Samsung",
    "vendorZh": "Samsung",
    "logo": "/assets/logos/samsung.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "image-design",
      "audio-voice",
      "office"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "On-device assistants are usually one app you open. Galaxy AI puts Circle to Search, call screening, transcript, and photo editing into the phone's own surfaces.",
    "solvesZh": "端侧助手通常是你需要专门打开的一个应用。Galaxy AI 把圈选搜索、通话筛选、通话转文字和照片编辑直接放进手机自带的界面里。",
    "bestFor": "You want AI features that are part of the phone you already carry, not another app install.",
    "bestForZh": "你想要的是已经装在手机里的 AI 能力，而不是再装一个新应用。",
    "released": "2024-01-01",
    "datePrecision": "month",
    "homepage": "https://www.samsung.com/global/galaxy/",
    "desc": "AI features built into Samsung Galaxy phones.",
    "descZh": "内置在三星手机里的 AI 能力。",
    "tags": [
      "in-product",
      "galaxy"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "S"
  },
  {
    "id": "suno",
    "name": "Suno",
    "nameZh": "Suno",
    "vendor": "Suno",
    "vendorZh": "Suno",
    "logo": "/assets/logos/suno.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "audio-voice"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Licensing a track means either paying royalties or clearing a song nobody has heard. You describe a song and get a whole one, vocals included.",
    "solvesZh": "给一首曲子办授权，要么付版税，要么去清一首没人听过的歌的版权。你描述一首歌，拿到的就是完整成品，人声也在里面。",
    "bestFor": "When a video, podcast or game needs a piece of music that is yours to use.",
    "bestForZh": "当视频、播客或游戏需要一段版权归你使用的音乐。",
    "released": "2023-12-20",
    "datePrecision": "day",
    "homepage": "https://suno.com",
    "desc": "Full song generation from text prompts, went viral fast",
    "descZh": "文本提示直接生成完整歌曲，2023-12 公开上线后迅速爆红",
    "tags": [
      "music-generation",
      "audio",
      "creative"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "S"
  },
  {
    "id": "google-ai-studio",
    "name": "Google AI Studio",
    "nameZh": "Google AI Studio",
    "vendor": "Google",
    "vendorZh": "Google",
    "logo": "/assets/logos/google.png",
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "model-api"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Guessing whether a prompt is any good by shipping it. You run variants against each other and see the difference before wiring it in.",
    "solvesZh": "判断一个 prompt 好不好，只能上线之后才知道。跑多个变体互相对比，接进应用前先看清差别。",
    "bestFor": "When you are tuning a Gemini prompt before it goes into an app.",
    "bestForZh": "当你要在 Gemini prompt 接进应用之前先调一调。",
    "released": "2023-12-13",
    "datePrecision": "day",
    "homepage": "https://aistudio.google.com/",
    "desc": "Free web playground for prompting and tuning Gemini models",
    "descZh": "免费网页工作台，用于提示词调试与 Gemini 模型微调",
    "tags": [
      "playground",
      "prompt-engineering",
      "free-tier",
      "developer-tools"
    ],
    "status": "merged",
    "supersededBy": "gemini-enterprise",
    "successorName": "Gemini 企业智能体平台",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "G"
  },
  {
    "id": "mistral-la-plateforme",
    "name": "Mistral La Plateforme",
    "nameZh": "Mistral La Plateforme",
    "vendor": "Mistral AI",
    "vendorZh": "Mistral AI",
    "logo": "/assets/logos/mistral-ai.svg",
    "region": "intl",
    "category": "model-platform",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Connecting a model means finding endpoints, writing auth, absorbing each vendor's differences, and handling fine-tuning and rollout. One console plus API covers it.",
    "solvesZh": "接模型要自己找端点、写鉴权、适配各家差异，还要管微调和上线。一套控制台加 API 就够了。",
    "bestFor": "You want to call models from code and also handle fine-tuning and usage tracking.",
    "bestForZh": "你要在代码里调用模型，并顺便做微调和用量管理。",
    "released": "2023-12-11",
    "datePrecision": "day",
    "homepage": "https://console.mistral.ai/",
    "desc": "Mistral's hosted API and console for models, fine-tuning and agents",
    "descZh": "Mistral 的托管 API 与控制台，提供模型、微调与智能体能力",
    "tags": [
      "api",
      "developer-platform",
      "fine-tuning",
      "european-sovereignty"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "M"
  },
  {
    "id": "mlx",
    "name": "MLX",
    "nameZh": "MLX",
    "vendor": "Apple",
    "vendorZh": "Apple",
    "logo": "/assets/logos/apple.png",
    "region": "intl",
    "category": "local-runner",
    "useCases": [
      "local-private"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "A model that fits in RAM on paper still crawls because every op copies tensors. MLX treats unified memory as the default, so nothing leaves the CPU.",
    "solvesZh": "纸面上塞得进内存的模型跑起来依然很慢，因为每个算子都在拷贝张量。MLX 默认统一内存，数据不出 CPU。",
    "bestFor": "When you run a model locally on a Mac and the GPU keeps idling.",
    "bestForZh": "当你在 Mac 上本地跑模型，GPU 却一直闲着。",
    "released": "2023-12-05",
    "datePrecision": "day",
    "homepage": "https://github.com/ml-explore/mlx",
    "desc": "Apple's array framework for efficient ML on Apple Silicon",
    "descZh": "苹果为 Apple Silicon 打造的机器学习数组框架，统一内存架构",
    "tags": [
      "apple-silicon",
      "open-source",
      "framework"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "M"
  },
  {
    "id": "cody",
    "name": "Cody",
    "nameZh": "Cody",
    "vendor": "Sourcegraph",
    "vendorZh": "Sourcegraph",
    "logo": "/assets/logos/sourcegraph.svg",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "local-private",
      "observability"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "The bug lives in a service you never checked out, so you grep three repos and find nothing. Cody indexes them all and answers across them.",
    "solvesZh": "bug 在一个你从没 clone 过的服务里，你 grep 三个仓库都搜不到。Cody 把它们都建了索引，跨仓库作答。",
    "bestFor": "When the file you need is in a repo you do not have open.",
    "bestForZh": "当你需要的文件在一个你本地没打开的仓库里。",
    "released": "2023-12-01",
    "datePrecision": "day",
    "homepage": "https://sourcegraph.com/cody",
    "desc": "code-graph assistant for large multi-repo codebases",
    "descZh": "面向大型多仓库代码库的代码图谱助手",
    "tags": [
      "code-graph",
      "self-hosting",
      "cross-repo",
      "enterprise"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "pika",
    "name": "Pika",
    "nameZh": "Pika",
    "vendor": "Pika Labs",
    "vendorZh": "Pika Labs",
    "logo": "/assets/logos/pika-labs.ico",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "A mood board is a still image, but the client wants to know how it moves. It turns a prompt or a picture into a short clip.",
    "solvesZh": "情绪板是一张静止的图，但客户想看到它动起来是什么样。它把一句 prompt 或一张图变成一段短片。",
    "bestFor": "When a static idea needs to be pitched as something that actually plays.",
    "bestForZh": "当一个静态创意需要被拿成一段真能播放的东西去提案时。",
    "released": "2023-11-29",
    "datePrecision": "day",
    "homepage": "https://pika.art",
    "desc": "Text-to-video tool with strong social-first distribution",
    "descZh": "以社交平台起家的文生视频工具，2023-11 随 Pika 1.0 正式上线",
    "tags": [
      "video-generation",
      "social",
      "creative"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "P"
  },
  {
    "id": "amazon-q-developer",
    "name": "Amazon Q Developer",
    "nameZh": "Amazon Q Developer",
    "vendor": "Amazon",
    "vendorZh": "Amazon",
    "logo": "/assets/logos/amazon.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "A framework upgrade means changing hundreds of call sites by hand. It walks the diff, rewrites the calls and runs the tests itself.",
    "solvesZh": "升级一个框架意味着手动改上百处调用。它遍历 diff、改写调用，并自己跑测试。",
    "bestFor": "When a library upgrade touches more files than you want to review one at a time.",
    "bestForZh": "当一次库升级牵涉的文件太多，你不想逐个 review。",
    "released": "2023-11-28",
    "datePrecision": "day",
    "homepage": "https://aws.amazon.com/q/developer/",
    "desc": "AWS coding assistant with agentic testing, review and migration",
    "descZh": "AWS 编程助手，支持智能化的测试、评审与迁移",
    "tags": [
      "coding-assistant",
      "aws",
      "agentic-coding",
      "code-review"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "A"
  },
  {
    "id": "augment-code",
    "name": "Augment Code",
    "nameZh": "Augment Code",
    "vendor": "Augment",
    "vendorZh": "Augment",
    "logo": "/assets/logos/augment.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "Big codebases overwhelm built-in autocomplete. It indexes the whole repo so suggestions know the code around yours.",
    "solvesZh": "代码库一大，内置补全就顶不住了。它给整个仓库建索引，让补全知道你正在写的代码周围是什么。",
    "bestFor": "When your repo is too large for your editor to hold in context.",
    "bestForZh": "仓库大到编辑器装不进上下文的时候。",
    "released": "2023-11-21",
    "datePrecision": "day",
    "homepage": "https://www.augmentcode.com",
    "desc": "Context engine indexing large codebases for agent context",
    "descZh": "面向大型代码库构建上下文引擎，为编码 Agent 提供高保真上下文",
    "tags": [
      "codebase-context",
      "enterprise",
      "mcp"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "A"
  },
  {
    "id": "microsoft-copilot-studio",
    "name": "Microsoft Copilot Studio",
    "nameZh": "Microsoft Copilot Studio",
    "vendor": "Microsoft",
    "vendorZh": "Microsoft",
    "logo": "/assets/logos/microsoft.ico",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Every department wants its own bot, and hand-coding each one does not scale. You describe the agent and connect it to the data it needs.",
    "solvesZh": "每个部门都想要自己的机器人，手写代码显然撑不起规模。你把智能体描述出来，再接上它需要的数据。",
    "bestFor": "When people outside engineering need to publish an internal bot without writing code.",
    "bestForZh": "当工程之外的人也要不写代码就发布一个内部机器人时。",
    "released": "2023-11-15",
    "datePrecision": "day",
    "homepage": "https://www.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-studio",
    "desc": "Low-code platform for building and publishing enterprise agents",
    "descZh": "低代码平台，用于构建并发布企业级智能体",
    "tags": [
      "low-code",
      "no-code",
      "enterprise",
      "agent-builder"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "M"
  },
  {
    "id": "windsurf",
    "name": "Windsurf",
    "nameZh": "Windsurf（现 Devin Desktop）",
    "vendor": "Cognition",
    "vendorZh": "Cognition",
    "logo": "/assets/logos/cognition.svg",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "Editing code means holding structure in your head across dozens of files. The editor holds it, so you steer instead of navigating.",
    "solvesZh": "改代码意味着要靠脑子记住几十个文件之间的关系。编辑器替你记着，你只需要指挥方向，而不是自己翻文件。",
    "bestFor": "When you want an editor that carries context across the whole repo while you work.",
    "bestForZh": "当你想要一个在整个仓库范围内替你保持上下文的编辑器时。",
    "released": "2023-11-14",
    "datePrecision": "day",
    "homepage": "https://windsurf.com",
    "desc": "AI editor acquired by Cognition, now Devin Desktop.",
    "descZh": "AI 编辑器，已被 Cognition 收购，现为 Devin Desktop。",
    "tags": [
      "ai-ide",
      "rebrand",
      "code-editor"
    ],
    "status": "renamed",
    "supersededBy": "devin",
    "successorName": "Devin",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "W"
  },
  {
    "id": "baidu-qianfan",
    "name": "百度千帆",
    "nameZh": "百度千帆",
    "vendor": "百度",
    "vendorZh": "百度",
    "logo": "/assets/logos/baidu.ico",
    "region": "cn",
    "category": "model-platform",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Wiring up a domestic model means finding a provider, comparing prices and matching APIs yourself. Qianfan puts the models, the billing and the calls behind one console.",
    "solvesZh": "想接国产大模型，要自己找服务商、比价格、拼接口。千帆把模型、计费和调用收在一个后台里。",
    "bestFor": "You need a domestic model inside your own service, not a chat window in a browser.",
    "bestForZh": "要在自家服务里接入国产大模型，而不是打开网页聊天。",
    "released": "2023-11-09",
    "datePrecision": "day",
    "homepage": "https://qianfan.cloud.baidu.com",
    "desc": "百度智能云大模型开发与服务平台",
    "descZh": "百度智能云大模型开发与服务平台",
    "tags": [
      "model-platform",
      "maas",
      "baidu-cloud"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "百"
  },
  {
    "id": "figma-ai",
    "name": "Figma AI",
    "nameZh": "Figma AI",
    "vendor": "Figma",
    "vendorZh": "Figma",
    "logo": "/assets/logos/figma.ico",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Wireframes, sticky notes, and arranging a prototype all come down to dragging by hand. Generate a first draft in one sentence, then keep editing in Figma.",
    "solvesZh": "画线框、贴便签、整理原型全靠手动拖。一句话生成初稿，再在 Figma 里继续改。",
    "bestFor": "You are working on a whiteboard or prototype in Figma and want a starting draft.",
    "bestForZh": "在 Figma 里做白板或原型，想先起个草稿。",
    "released": "2023-11-07",
    "datePrecision": "day",
    "homepage": "https://www.figma.com/ai/",
    "desc": "AI features spanning FigJam, design and prototyping",
    "descZh": "覆盖 FigJam 白板、设计与原型的 AI 能力，2024-06 扩展为完整套件",
    "tags": [
      "design",
      "whiteboard",
      "prototyping"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/figma-ai/",
        "zh": "/zh/products/figma-ai/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "F"
  },
  {
    "id": "grok",
    "name": "Grok",
    "nameZh": "Grok",
    "vendor": "xAI",
    "vendorZh": "xAI",
    "logo": "/assets/logos/xai.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "News breaks faster than search indexes it, and you want the reaction, not the press release. It reads X in real time.",
    "solvesZh": "新闻跑得比搜索引擎收录更快，而你想看的是现场反应，不是通稿。它实时读取 X 上的内容。",
    "bestFor": "When you want a live read on what people are saying right now about an event.",
    "bestForZh": "当你想实时了解此刻人们正在怎么谈论一件事时。",
    "released": "2023-11-04",
    "datePrecision": "day",
    "homepage": "https://grok.com/",
    "desc": "xAI's real-time conversational assistant with X platform data",
    "descZh": "xAI 的实时对话助手，融合 X 平台数据",
    "tags": [
      "consumer",
      "realtime",
      "social-data"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/grok/",
        "zh": "/zh/products/grok/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "G"
  },
  {
    "id": "brave-leo",
    "name": "Brave Leo",
    "nameZh": "Brave Leo 助手",
    "vendor": "Brave",
    "vendorZh": "Brave",
    "logo": "/assets/logos/brave.ico",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research"
    ],
    "form": "desktop",
    "surface": "in-product",
    "solves": "Every assistant you paste a question into learns something from it. Leo answers without logging your prompts or training on them.",
    "solvesZh": "你把问题贴进哪个助手，哪个都在从中学东西。Leo 作答时不记录你的 prompt，也不拿它训练。",
    "bestFor": "When you want to ask something from the address bar without handing over your search history.",
    "bestForZh": "当你想在地址栏直接提问，又不想交出搜索历史。",
    "released": "2023-11-02",
    "datePrecision": "day",
    "homepage": "https://brave.com/search/",
    "desc": "Privacy-first AI assistant built into the Brave browser.",
    "descZh": "内置于 Brave 浏览器的注重隐私的 AI 助手。",
    "tags": [
      "privacy-first",
      "browser-ai",
      "no-login",
      "free-tier"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "B"
  },
  {
    "id": "bigmodel",
    "name": "BigModel 开放平台",
    "nameZh": "BigModel 开放平台",
    "vendor": "智谱",
    "vendorZh": "智谱",
    "logo": "/assets/logos/zhipu.png",
    "region": "cn",
    "category": "model-platform",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Wiring up a domestic model means finding a provider, comparing prices and hand-assembling the API. Register once, call pay-as-you-go, and keep the model list and billing in one console.",
    "solvesZh": "接入国产大模型要自己找服务商、比价格、拼接口。注册后按量调用，模型列表和账单在一个后台。",
    "bestFor": "When you need a model inside your own service rather than in a web chat tab.",
    "bestForZh": "需要在自家服务里接入大模型，而不是打开网页聊天。",
    "released": "2023-11-01",
    "datePrecision": "day",
    "homepage": "https://bigmodel.cn",
    "desc": "智谱大模型开放平台与 API 服务",
    "descZh": "智谱大模型开放平台与 API 服务",
    "tags": [
      "model-platform",
      "api",
      "zhipu"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/zhipu-chat/",
        "zh": "/zh/products/zhipu-chat/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "B"
  },
  {
    "id": "crewai",
    "name": "CrewAI",
    "nameZh": "CrewAI",
    "vendor": "CrewAI",
    "vendorZh": "CrewAI",
    "logo": "/assets/logos/crewai.ico",
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "Your agent workflow is one long prompt that quietly stops cooperating. You give each agent a role and let them hand work to each other.",
    "solvesZh": "你的智能体流程是一段越来越长的 prompt，到某个长度就开始不听话了。你给每个智能体一个角色，让它们彼此交接任务。",
    "bestFor": "When a single-agent prompt keeps dropping steps and you want the work split across named roles.",
    "bestForZh": "当单智能体的 prompt 总是漏掉步骤，你想把活拆到几个有名有姓的角色上时。",
    "released": "2023-11-01",
    "datePrecision": "day",
    "homepage": "https://www.crewai.com",
    "desc": "Role-based framework for orchestrating multi-agent workflows",
    "descZh": "基于角色的多智能体协作编排框架，2023-12 在 PyPI 首次发布",
    "tags": [
      "framework",
      "multi-agent",
      "python"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "C"
  },
  {
    "id": "microsoft-365-copilot",
    "name": "Microsoft 365 Copilot",
    "nameZh": "Microsoft 365 Copilot",
    "vendor": "Microsoft",
    "vendorZh": "Microsoft",
    "logo": "/assets/logos/microsoft.ico",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Word, Excel, Outlook, and Teams each make you start from a blank document with no help. Copilot drafts and analyzes inside the file you're already editing.",
    "solvesZh": "Word、Excel、Outlook、Teams 都只是让你从一张白纸开始，没有任何帮手。Copilot 直接在你正在编辑的那个文件里起草和分析。",
    "bestFor": "You live in Office all day and want drafting and analysis without copying content out into a separate chatbot.",
    "bestForZh": "你整天泡在 Office 里，想要起草和分析，但不想把内容复制到另一个聊天工具去。",
    "released": "2023-11-01",
    "datePrecision": "day",
    "homepage": "https://www.microsoft.com/en-us/copilot/blog/2023/09/21/announcing-microsoft-365-copilot-general-availability-and-microsoft-365-chat/",
    "desc": "AI drafting and analysis built into Word, Excel, Outlook, and Teams.",
    "descZh": "Office 各应用内置的 AI 助手。",
    "tags": [
      "in-product",
      "microsoft-365"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "M"
  },
  {
    "id": "wps-ai",
    "name": "WPS AI",
    "nameZh": "WPS AI",
    "vendor": "Kingsoft Office",
    "vendorZh": "Kingsoft Office",
    "logo": "/assets/logos/kingsoft-office.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Office AI usually means a Microsoft subscription. WPS AI puts writing, long-document reading, PPT generation, and spreadsheet analysis into an office suite anyone can use.",
    "solvesZh": "办公 AI 通常等于一份微软订阅。WPS AI 把写作、长文阅读、PPT 生成和表格分析放进一套谁都能用的办公软件里。",
    "bestFor": "You need AI writing and document work in an office suite without a Microsoft 365 license.",
    "bestForZh": "你没有 Microsoft 365 授权，但在办公套件里需要 AI 写作和文档处理能力。",
    "released": "2023-11-01",
    "datePrecision": "month",
    "homepage": "https://ai.wps.cn/",
    "desc": "AI writing, slides, and sheets inside the WPS Office suite.",
    "descZh": "金山办公里的写作、PPT 与表格 AI。",
    "tags": [
      "in-product",
      "wps-office"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "W"
  },
  {
    "id": "bailian",
    "name": "阿里云百炼",
    "nameZh": "阿里云百炼",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "logo": "/assets/logos/alibaba.png",
    "region": "cn",
    "category": "model-platform",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Wiring up access, retrieval and orchestration for a model app takes more time than it should. Bailian puts all three behind one console you enable as needed.",
    "solvesZh": "大模型应用的接入、检索、编排要自己拼装，周期拖长。百炼把它们收进一个控制台，按需开通。",
    "bestFor": "When you want to ship a model application on Alibaba Cloud without starting from a raw API.",
    "bestForZh": "你要在阿里云上上线一个模型应用，不想从裸接口开始搭。",
    "released": "2023-11-01",
    "datePrecision": "day",
    "homepage": "https://bailian.console.aliyun.com",
    "desc": "一站式大模型开发与应用平台",
    "descZh": "一站式大模型开发与应用平台",
    "tags": [
      "model-platform",
      "maas",
      "alibaba-cloud"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/bailian/",
        "zh": "/zh/products/bailian/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "阿"
  },
  {
    "id": "tongyi",
    "name": "通义",
    "nameZh": "通义",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "logo": "/assets/logos/alibaba.png",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Researching, reading pages and writing documents normally means switching between several tools. 通义 pulls them into a single chat box.",
    "solvesZh": "查资料、读网页、做文档原本要切好几个工具。通义把它们收进一个对话框。",
    "bestFor": "When you want to look things up and produce a document or slides in the same place.",
    "bestForZh": "你要一边查资料一边产出文档或演示稿。",
    "released": "2023-10-31",
    "datePrecision": "day",
    "homepage": "https://www.tongyi.com",
    "desc": "通义助手应用，后更名千问",
    "descZh": "通义助手应用，后更名千问",
    "tags": [
      "chat-assistant",
      "qwen",
      "alibaba"
    ],
    "status": "merged",
    "supersededBy": "qianwen",
    "successorName": "千问",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/qwen/",
        "zh": "/zh/products/qwen/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "通"
  },
  {
    "id": "lingma",
    "name": "通义灵码",
    "nameZh": "通义灵码",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "logo": "/assets/logos/alibaba.png",
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "plugin",
    "solves": "Writing the repetitive parts by hand takes an hour. It fills them in and explains the rest inside the editor you already have.",
    "solvesZh": "样板代码手写要花一个钟头。它在你已经在用的编辑器里补齐这些部分，并解释剩下的逻辑。",
    "bestFor": "When you want code help without switching away from your current IDE.",
    "bestForZh": "你想在不离开当前 IDE 的前提下拿到代码协助。",
    "released": "2023-10-31",
    "datePrecision": "day",
    "homepage": "https://lingma.aliyun.com",
    "desc": "Alibaba Cloud coding assistant, renamed Qoder in 2026",
    "descZh": "阿里云智能编码助手，2026 年起系列更名 Qoder",
    "tags": [
      "coding-assistant",
      "ide-plugin",
      "qwen"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/lingma/",
        "zh": "/zh/products/lingma/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "通"
  },
  {
    "id": "canva-magic-studio",
    "name": "Canva Magic Studio",
    "nameZh": "Canva 魔法工作室",
    "vendor": "Canva",
    "vendorZh": "Canva",
    "logo": "/assets/logos/canva.ico",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design",
      "office"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "People who can't design never quite get a poster right, and editing a template always lands slightly off. Generate image and layout from text, and you still get an editable design file.",
    "solvesZh": "不会设计的人做海报，套模板改完总差点意思。文字出图和版式，产出的还是能接着改的设计文件。",
    "bestFor": "You need a cover, social image, or poster without learning design software.",
    "bestForZh": "你要出封面、社媒图或海报，但不想学设计软件。",
    "released": "2023-10-24",
    "datePrecision": "day",
    "homepage": "https://www.canva.com/ai/",
    "desc": "AI design suite that pushed generative creation to non-designers",
    "descZh": "把生成式创作带给非设计用户的套件，是最大规模的消费级 AI 创作入口之一",
    "tags": [
      "design",
      "consumer",
      "image-generation"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "p7887",
    "name": "文心快码",
    "nameZh": "文心快码",
    "vendor": "百度",
    "vendorZh": "百度",
    "logo": "/assets/logos/baidu.ico",
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "Writing code, you keep retyping the same boilerplate and hunting for APIs you cannot find. Completion follows what you are writing, and it turns a Figma file into a page.",
    "solvesZh": "写代码时手边总有重复的模板和查不到的 API。补全能接着你写，还能把 Figma 稿转成页面。",
    "bestFor": "You code day to day on a mainland network and want a completion assistant that works without a VPN.",
    "bestForZh": "在国内网络环境下做日常编码，需要一个不用翻墙的补全助手。",
    "released": "2023-10-24",
    "datePrecision": "day",
    "homepage": "https://comate.baidu.com/",
    "desc": "百度智能代码助手",
    "descZh": "百度智能代码助手",
    "tags": [
      "code-completion",
      "china-first",
      "enterprise",
      "figma-to-code"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "文"
  },
  {
    "id": "ray-ban-meta",
    "name": "Ray-Ban Meta",
    "nameZh": "Ray-Ban Meta 智能眼镜",
    "vendor": "Meta / EssilorLuxottica",
    "vendorZh": "Meta / EssilorLuxottica",
    "logo": "/assets/logos/meta-essilorluxottica.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "hardware",
    "surface": "standalone",
    "solves": "You already wear glasses and do not want to pull out a phone to ask or to capture. Ask, and it sees what you point it at.",
    "solvesZh": "你本来就戴着眼镜，不想为了问一句或拍一段再掏出手机。问就行，它看到的就是你面朝的方向。",
    "bestFor": "When you need your hands free for a quick question or a first-person recording.",
    "bestForZh": "当你需要一个不占手的方式快速问一句，或拍一段第一人称视频时。",
    "released": "2023-10-17",
    "datePrecision": "day",
    "homepage": "https://www.meta.com/smart-glasses",
    "desc": "Camera-and-assistant glasses; the only mass-market AI wearable hit",
    "descZh": "带摄像头与语音助手的智能眼镜，AI 穿戴中唯一真正走量的产品",
    "tags": [
      "hardware",
      "wearable",
      "camera"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "R"
  },
  {
    "id": "v0",
    "name": "v0",
    "nameZh": "v0",
    "vendor": "Vercel",
    "vendorZh": "Vercel",
    "logo": "/assets/logos/vercel.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "To design an interface you can only search for stock images or pull from someone else's code. One line of description gets you a React component that actually runs.",
    "solvesZh": "想画个界面，只能搜现成图或者从别人代码里扒。用一句描述就能拿到能跑的 React 组件。",
    "bestFor": "You need a page prototype fast, not a front end written from scratch.",
    "bestForZh": "你要快速搭一个页面原型，而不是从头写前端。",
    "released": "2023-10-11",
    "datePrecision": "day",
    "homepage": "https://v0.app",
    "desc": "Generate React and Tailwind UI from text prompts",
    "descZh": "用文本提示生成 React 与 Tailwind 前端界面，Vercel 官方出品",
    "tags": [
      "ui-generation",
      "react",
      "frontend"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": null,
    "glyph": "V"
  },
  {
    "id": "n8n",
    "name": "n8n",
    "nameZh": "n8n",
    "vendor": "n8n",
    "vendorZh": "n8n",
    "logo": "/assets/logos/n8n.png",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "The glue between your tools is a pile of scripts that only run on your laptop. It runs the same flows on a server you control.",
    "solvesZh": "把你各个工具粘在一起的，往往是一堆只在自己电脑上跑得动的脚本。n8n 把同样的流程放到你自己掌控的服务器上跑。",
    "bestFor": "When the connect-the-dots work has to keep running after you close the laptop.",
    "bestForZh": "当这种把工具串起来的活，得在你合上笔记本之后还继续跑时。",
    "released": "2023-10-04",
    "datePrecision": "day",
    "homepage": "https://n8n.io",
    "desc": "Source-available workflow automation with native LLM nodes",
    "descZh": "源码可用的工作流自动化平台，2023-10 加入原生 LangChain 节点",
    "tags": [
      "workflow",
      "automation",
      "self-hosted"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "N"
  },
  {
    "id": "kimi",
    "name": "Kimi",
    "nameZh": "Kimi",
    "vendor": "月之暗面",
    "vendorZh": "月之暗面",
    "logo": "/assets/logos/moonshot.png",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Long documents never get finished, and they do not fit in a prompt box. Kimi reads a lot of material at once and you can question it directly.",
    "solvesZh": "长文档读不完，也塞不进提问框。Kimi 能一次读很长的材料，直接对着它问。",
    "bestFor": "When you need to read through a long report or a batch of material before asking questions.",
    "bestForZh": "要通读一份很长的报告或一批资料再提问。",
    "released": "2023-10-01",
    "datePrecision": "day",
    "homepage": "https://www.kimi.com",
    "desc": "支持超长上下文的 AI 智能助手",
    "descZh": "支持超长上下文的 AI 智能助手",
    "tags": [
      "chat-assistant",
      "long-context",
      "moonshot"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/kimi/",
        "zh": "/zh/products/kimi/"
      }
    },
    "lastVerifiedAt": null,
    "glyph": "K"
  },
  {
    "id": "cohere-command",
    "name": "Cohere Command",
    "nameZh": "Cohere Command",
    "vendor": "Cohere",
    "vendorZh": "Cohere",
    "logo": "/assets/logos/cohere.png",
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Answers a model invents are unusable in a regulated setting. Command cites the exact source span behind every claim.",
    "solvesZh": "在受监管的场景里，模型编出来的答案不能用。Command 会为每条结论标出对应的原文出处。",
    "bestFor": "When a reviewer has to be able to check where each statement came from.",
    "bestForZh": "当审核者必须能查证每条说法的出处时。",
    "released": "2023-09-29",
    "datePrecision": "day",
    "homepage": "https://cohere.com/",
    "desc": "Enterprise RAG and tool-use models with inline citations",
    "descZh": "面向企业的 RAG 与工具调用模型，支持行内引用",
    "tags": [
      "rag",
      "enterprise",
      "tool-use",
      "private-cloud"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "C"
  },
  {
    "id": "amazon-bedrock",
    "name": "Amazon Bedrock",
    "nameZh": "Amazon Bedrock",
    "vendor": "Amazon",
    "vendorZh": "Amazon",
    "logo": "/assets/logos/amazon.png",
    "region": "intl",
    "category": "model-platform",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Model choice, the guardrails and the audit trail are three separate purchases. Bedrock keeps them in one AWS account your security team already reviews.",
    "solvesZh": "选模型、加护栏、留审计记录是三笔独立采购。Bedrock 把它们收在一个 AWS 账号里，安全团队本来就在审这个账号。",
    "bestFor": "When procurement wants one vendor and one compliance story behind your model calls.",
    "bestForZh": "当采购希望模型调用背后只有一家供应商、一套合规说法时。",
    "released": "2023-09-28",
    "datePrecision": "day",
    "homepage": "https://aws.amazon.com/bedrock/",
    "desc": "AWS managed service for foundation models with agents and RAG",
    "descZh": "AWS 托管的基础模型服务，内置智能体与 RAG 能力",
    "tags": [
      "cloud-platform",
      "enterprise",
      "foundation-models",
      "aws"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "A"
  },
  {
    "id": "webflow-ai",
    "name": "Webflow AI",
    "nameZh": "Webflow AI",
    "vendor": "Webflow",
    "vendorZh": "Webflow",
    "logo": "/assets/logos/webflow.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design",
      "coding"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Landing pages take a week of your time and then sit on a staging link. It drafts the sections and copy inside the editor you already publish from.",
    "solvesZh": "落地页要花你一周时间，做完还挂在一个测试链接上。它在你本来就用来发布的编辑器里起草板块和文案。",
    "bestFor": "When you need another page in the site you already maintain.",
    "bestForZh": "当你只想在现有站点里再加一个页面。",
    "released": "2023-09-05",
    "datePrecision": "day",
    "homepage": "https://webflow.com/ai",
    "desc": "AI site builder, copywriter and Figma-to-code inside Webflow",
    "descZh": "Webflow 内置的 AI 建站、文案生成与 Figma 转代码能力",
    "tags": [
      "no-code",
      "web-design",
      "cms"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "W"
  },
  {
    "id": "zoom-ai-companion",
    "name": "Zoom AI Companion",
    "nameZh": "Zoom AI 智能助手",
    "vendor": "Zoom",
    "vendorZh": "Zoom",
    "logo": "/assets/logos/zoom.png",
    "region": "intl",
    "category": "meetings",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Nobody can stay for the whole meeting and nobody wants to transcribe it either. AI Companion summarizes, catches you up, and answers questions from the meeting while it is happening.",
    "solvesZh": "没人能全程参会，也没人想手工记纪要。AI 智能助手会实时总结、帮你追上进度，并回答会中提出的问题。",
    "bestFor": "Attending only part of a meeting and needing a reliable record of what was decided.",
    "bestForZh": "你只能参加部分会议，但需要一份可靠的决议记录。",
    "released": "2023-09-01",
    "datePrecision": "month",
    "homepage": "https://news.zoom.com/zoom-introduces-ai-companion-2-0",
    "desc": "A meeting companion that summarizes and answers live.",
    "descZh": "会中实时总结并答疑的会议助手。",
    "tags": [
      "in-product",
      "zoom"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "Z"
  },
  {
    "id": "hunyuan",
    "name": "腾讯混元",
    "nameZh": "腾讯混元",
    "vendor": "腾讯",
    "vendorZh": "腾讯",
    "logo": "/assets/logos/tencent.png",
    "region": "cn",
    "category": "model-platform",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Picking a large model you can actually call from China means comparing price, terms, and concurrency limits vendor by vendor. Here one provider is enough to connect.",
    "solvesZh": "选一个国内可直接调用的大模型，要逐家比价格、协议和并发限制。这里一家就能接上。",
    "bestFor": "Your service needs a large-model API that stays reachable on domestic networks.",
    "bestForZh": "服务要接大模型 API，要在国内网络下稳定访问。",
    "released": "2023-09-01",
    "datePrecision": "day",
    "homepage": "https://hunyuan.tencent.com",
    "desc": "腾讯通用大语言模型与 API 平台",
    "descZh": "腾讯通用大语言模型与 API 平台",
    "tags": [
      "model-platform",
      "hunyuan",
      "tencent"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/hunyuan/",
        "zh": "/zh/products/hunyuan/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "腾"
  },
  {
    "id": "aily",
    "name": "飞书 Aily",
    "nameZh": "飞书 Aily",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "logo": "/assets/logos/bytedance.png",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "office"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Enterprise assistants built elsewhere cannot read the docs, tables, and chats that hold the actual business context. Aily is an agent platform that works over Feishu's own data and tools.",
    "solvesZh": "在别处搭的企业助手读不到真正承载业务上下文的文档、表格和会话。Aily 是直接工作在飞书自有数据与工具之上的智能体平台。",
    "bestFor": "Building an internal assistant that must reason over Feishu docs, Bitable data, and chat history.",
    "bestForZh": "要做一个必须基于飞书文档、多维表格数据和会话记录来推理的内部助手。",
    "released": "2023-09-01",
    "datePrecision": "month",
    "homepage": "https://www.feishu.cn/product/feishuai",
    "desc": "An enterprise agent platform that runs on Feishu's own data.",
    "descZh": "跑在飞书自身数据之上的企业智能体平台。",
    "tags": [
      "in-product"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "飞"
  },
  {
    "id": "chatglm",
    "name": "智谱清言",
    "nameZh": "智谱清言",
    "vendor": "智谱",
    "vendorZh": "智谱",
    "logo": "/assets/logos/zhipu.png",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "You want to try a domestic model but do not know where to start. Chat on the web directly, with no API key to apply for.",
    "solvesZh": "想试一个国产大模型却不知道从哪打开。网页直接对话，不用申请接口。",
    "bestFor": "When you want to see what a domestic model can do at zero cost.",
    "bestForZh": "想先零成本试一下国产模型能做什么。",
    "released": "2023-08-31",
    "datePrecision": "day",
    "homepage": "https://chatglm.cn",
    "desc": "智谱面向 C 端的生成式 AI 助手",
    "descZh": "智谱面向 C 端的生成式 AI 助手",
    "tags": [
      "chat-assistant",
      "glm",
      "zhipu"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/zhipu-chat/",
        "zh": "/zh/products/zhipu-chat/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "智"
  },
  {
    "id": "ideogram",
    "name": "Ideogram",
    "nameZh": "Ideogram",
    "vendor": "Ideogram",
    "vendorZh": "Ideogram",
    "logo": "/assets/logos/ideogram.svg",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Image models mangle the text inside pictures. It renders readable headlines and logos, so you can use it for posters.",
    "solvesZh": "图像模型常把图里的字渲染得认不出来。它能把标题和 Logo 排清楚，所以海报也能用。",
    "bestFor": "When the words in the image matter as much as the picture itself.",
    "bestForZh": "图里的文字和画面本身一样重要的时候。",
    "released": "2023-08-22",
    "datePrecision": "day",
    "homepage": "https://ideogram.ai",
    "desc": "Best-in-class legible text rendering inside images",
    "descZh": "图像内文字排版准确率领先，是海报与 Logo 生成的常用选择",
    "tags": [
      "image-generation",
      "typography",
      "creative"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "I"
  },
  {
    "id": "langfuse",
    "name": "Langfuse",
    "nameZh": "Langfuse",
    "vendor": "Langfuse",
    "vendorZh": "Langfuse",
    "logo": "/assets/logos/langfuse.png",
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability",
      "local-private"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "A bad answer in production and no way to see what went into it. Traces show every step, and self-hosting keeps the data on your own machines.",
    "solvesZh": "线上出了个坏答案，却看不到当时喂进去的是什么。Trace 会展开每一步，自托管则让数据留在自己的机器上。",
    "bestFor": "When you run models in production and need to inspect calls, or cannot send logs to a vendor.",
    "bestForZh": "当你在生产环境跑模型需要排查调用记录，或者根本不能把日志交给外部厂商。",
    "released": "2023-08-20",
    "datePrecision": "day",
    "homepage": "https://langfuse.com",
    "desc": "Open-source tracing, prompt management and LLM evals",
    "descZh": "开源的 LLM 追踪、Prompt 管理与评测平台，自托管友好",
    "tags": [
      "open-source",
      "tracing",
      "llmops"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "L"
  },
  {
    "id": "doubao",
    "name": "豆包",
    "nameZh": "豆包",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "logo": "/assets/logos/bytedance.png",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Answering one question means opening half a dozen tabs to piece it together. Doubao puts search, writing and file handling in one place.",
    "solvesZh": "查一件事要开好几个网页才能拼出答案。豆包把搜索、写作和文件处理放在一起，直接问就行。",
    "bestFor": "When you want to research a topic and write it up in one go, without switching apps.",
    "bestForZh": "想一次把资料查清楚并整理成文，不想来回切应用。",
    "released": "2023-08-17",
    "datePrecision": "day",
    "homepage": "https://www.doubao.com",
    "desc": "字节跳动通用 AI 助手",
    "descZh": "字节跳动通用 AI 助手",
    "tags": [
      "chat-assistant",
      "bytedance",
      "consumer"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/doubao/",
        "zh": "/zh/products/doubao/"
      }
    },
    "lastVerifiedAt": null,
    "glyph": "豆"
  },
  {
    "id": "braintrust",
    "name": "Braintrust",
    "nameZh": "Braintrust",
    "vendor": "Braintrust",
    "vendorZh": "Braintrust",
    "logo": "/assets/logos/braintrust.png",
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "You changed a prompt and have no idea whether outputs improved. It runs a scored set before and after, so the change has numbers behind it.",
    "solvesZh": "改了 prompt 之后，不知道输出到底有没有变好。它在改动前后各跑一遍带评分的用例，让这次改动有数字可依。",
    "bestFor": "When you are tuning a prompt or a model and need evidence it improved.",
    "bestForZh": "当你在调 prompt 或模型，需要证据证明它确实变好了。",
    "released": "2023-08-01",
    "datePrecision": "day",
    "homepage": "https://www.braintrust.dev",
    "desc": "Eval-first platform combining scoring, logging and playgrounds",
    "descZh": "以评测为核心的打分、日志与 Playground 一体化平台",
    "tags": [
      "evaluation",
      "llmops",
      "experimentation"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "B"
  },
  {
    "id": "krea",
    "name": "Krea",
    "nameZh": "Krea",
    "vendor": "Krea",
    "vendorZh": "Krea",
    "logo": "/assets/logos/krea.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design",
      "video"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "You sketch a rough shape and wait a queue slot to see whether the model agrees. Here the image updates as you draw.",
    "solvesZh": "你画个大概形状，还得排队等结果看模型认不认。这里图像跟着你画的过程实时更新。",
    "bestFor": "When you are exploring an idea and need many cheap variations, not one polished render.",
    "bestForZh": "当你在探索一个想法，需要的是大量廉价变体，而不是一张精修成图。",
    "released": "2023-08-01",
    "datePrecision": "day",
    "homepage": "https://www.krea.ai",
    "desc": "Real-time generative canvas with sub-second image feedback",
    "descZh": "实时生成画布，图像反馈进入亚秒级，可边画边生成",
    "tags": [
      "real-time",
      "image-generation",
      "canvas"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "K"
  },
  {
    "id": "litellm",
    "name": "LiteLLM",
    "nameZh": "LiteLLM",
    "vendor": "BerriAI",
    "vendorZh": "BerriAI",
    "logo": "/assets/logos/berriai.png",
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "model-api",
      "agent-building",
      "observability"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "Every provider has its own client, its own error shapes and its own invoice. One OpenAI-shaped endpoint sits in front, with keys and a budget per team.",
    "solvesZh": "每家服务商都有自己的客户端、错误结构和账单。前面放一个 OpenAI 形状的接口，密钥和预算按团队分配。",
    "bestFor": "When you want to switch models, or cap what one team can spend, without a rewrite.",
    "bestForZh": "当你想换模型，或给某个团队设个花费上限，又不想重写代码。",
    "released": "2023-08-01",
    "datePrecision": "day",
    "homepage": "https://www.litellm.ai/",
    "desc": "Open-source gateway putting one OpenAI-shaped API in front of 100+ models.",
    "descZh": "开源网关，用统一的 OpenAI 格式接口接入 100+ 模型。",
    "tags": [
      "llm-gateway",
      "routing",
      "cost-control",
      "open-source"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "L"
  },
  {
    "id": "minicpm",
    "name": "面壁 MiniCPM",
    "nameZh": "面壁 MiniCPM",
    "vendor": "面壁智能",
    "vendorZh": "面壁智能",
    "logo": "/assets/logos/openbmb.svg",
    "region": "cn",
    "category": "local-runner",
    "useCases": [
      "local-private"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "Using AI means sending the content to a cloud model, which many settings forbid. A small model runs locally, so the data never leaves the machine.",
    "solvesZh": "把内容交给云端模型才能用 AI，很多场景不允许。小模型在本地跑，数据不出机器。",
    "bestFor": "When data cannot leave the machine but you still want model capabilities on the local device.",
    "bestForZh": "数据不能出本机，但又想在本地用上模型能力。",
    "released": "2023-08-01",
    "datePrecision": "day",
    "homepage": "https://openbmb.cn",
    "desc": "端侧优先的轻量大模型与工具链",
    "descZh": "端侧优先的轻量大模型与工具链",
    "tags": [
      "local-runner",
      "on-device",
      "openbmb"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "面"
  },
  {
    "id": "notebooklm",
    "name": "NotebookLM",
    "nameZh": "NotebookLM",
    "vendor": "Google",
    "vendorZh": "Google",
    "logo": "/assets/logos/google.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "The model invents a citation and you cannot check it. It answers only from documents you uploaded, and every line links back to the source.",
    "solvesZh": "模型编出一个引用，你无从查证。它只依据你上传的文档作答，每一句都能点回原文出处。",
    "bestFor": "When you are working through a fixed pile of papers and need answers you can verify.",
    "bestForZh": "当你在啃一批固定的资料，需要能核实的答案时。",
    "released": "2023-07-26",
    "datePrecision": "day",
    "homepage": "https://notebooklm.google.com/",
    "desc": "Grounded research assistant answering from your own uploaded sources",
    "descZh": "基于你自己上传的资料做溯源问答的研究助手",
    "tags": [
      "rag",
      "research",
      "grounding",
      "education"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "N"
  },
  {
    "id": "langsmith",
    "name": "LangSmith",
    "nameZh": "LangSmith",
    "vendor": "LangChain Inc.",
    "vendorZh": "LangChain Inc.",
    "logo": "/assets/logos/langchain-inc.png",
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "An LLM app breaks and you cannot see which prompt caused it. LangSmith records every step and scores the output.",
    "solvesZh": "LLM 应用出错时，你看不到是哪一段 prompt 引起的。LangSmith 记录每一步并给输出打分。",
    "bestFor": "When a chain misbehaves only on real traffic and you need the trace to find it.",
    "bestForZh": "当链路只在真实流量下出问题，你需要 trace 才能定位。",
    "released": "2023-07-18",
    "datePrecision": "day",
    "homepage": "https://www.langchain.com/langsmith",
    "desc": "Tracing, evaluation and monitoring for LLM applications",
    "descZh": "面向 LLM 应用的追踪、评测与监控平台，2024-02 正式 GA",
    "tags": [
      "tracing",
      "evaluation",
      "llmops"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "L"
  },
  {
    "id": "ollama",
    "name": "Ollama",
    "nameZh": "Ollama",
    "vendor": "Ollama",
    "vendorZh": "Ollama",
    "logo": "/assets/logos/ollama.png",
    "region": "intl",
    "category": "local-runner",
    "useCases": [
      "local-private"
    ],
    "form": "cli",
    "surface": "standalone",
    "solves": "Running a model locally is a weekend of drivers and Python environments. Ollama pulls one down with a single command.",
    "solvesZh": "在本地跑一个模型要耗掉一个周末去折腾驱动和 Python 环境。Ollama 一条命令就把它拉下来。",
    "bestFor": "When you want to try a model on your own machine before sending anything to an API.",
    "bestForZh": "当你想先在自己机器上试一个模型，再决定要不要把请求发到 API。",
    "released": "2023-07-08",
    "datePrecision": "day",
    "homepage": "https://ollama.com",
    "desc": "One-command local model runner that made LLMs accessible",
    "descZh": "一条命令即可本地跑模型，是本地 LLM 普及的关键推手",
    "tags": [
      "open-source",
      "local-llm",
      "runtime"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/ollama.html",
        "zh": "/zh/products/ollama.html"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "O"
  },
  {
    "id": "p8719",
    "name": "通义万相",
    "nameZh": "通义万相",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "logo": "/assets/logos/alibaba.png",
    "region": "cn",
    "category": "multimodal-creation",
    "useCases": [
      "image-design",
      "video"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Producing an image or a short clip normally means professional software and a stock library. 万相 generates images and video from a sentence.",
    "solvesZh": "画一张图或剪一段视频原本要专业软件和素材。万相用一句话生成图像和视频。",
    "bestFor": "When you need illustrations or short-video material that matches a Chinese-language brief, without opening a design tool.",
    "bestForZh": "你要快速出中文语义的配图或短视频素材，不想开专业设计软件。",
    "released": "2023-07-07",
    "datePrecision": "day",
    "homepage": "https://tongyi.aliyun.com/wanxiang",
    "desc": "AI 绘画与视频创作平台",
    "descZh": "AI 绘画与视频创作平台",
    "tags": [
      "text-to-image",
      "video-generation",
      "open-source",
      "chinese-style"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "通"
  },
  {
    "id": "volcengine-ark",
    "name": "火山方舟",
    "nameZh": "火山方舟",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "logo": "/assets/logos/bytedance.png",
    "region": "cn",
    "category": "model-platform",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Enterprises want the models, but serving, scaling and access control all have to be built first. Here they are hosted and you call them through an API.",
    "solvesZh": "企业想用大模型，但推理、扩容和权限都要自己搭。这里托管起来，接口直接调。",
    "bestFor": "When you need to call models reliably in production without running the inference stack.",
    "bestForZh": "企业要在生产环境稳定调用大模型，不想自己运维推理服务。",
    "released": "2023-06-28",
    "datePrecision": "day",
    "homepage": "https://www.volcengine.com/product/ark",
    "desc": "火山引擎企业级大模型服务平台",
    "descZh": "火山引擎企业级大模型服务平台",
    "tags": [
      "model-platform",
      "maas",
      "volcengine"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/volcengine-ark/",
        "zh": "/zh/products/volcengine-ark/"
      }
    },
    "lastVerifiedAt": null,
    "glyph": "火"
  },
  {
    "id": "shangliang",
    "name": "商量",
    "nameZh": "商量",
    "vendor": "商汤",
    "vendorZh": "商汤",
    "logo": "/assets/logos/sensetime.svg",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Writing, translating and reading documents each need their own tool. Shangliang puts them in one conversation, and you can drop a file in and keep asking about it.",
    "solvesZh": "写作、翻译、读文档各要开一个工具。商量把它们放在同一个对话框里，文件丢进去就能接着问。",
    "bestFor": "You have a piece of text to revise or a long document to actually understand.",
    "bestForZh": "手头有一段要改的文字，或一份要读懂的长文档。",
    "released": "2023-06-21",
    "datePrecision": "day",
    "homepage": "https://chat.sensetime.com",
    "desc": "商汤日日新大模型对话助手",
    "descZh": "商汤日日新大模型对话助手",
    "tags": [
      "chat-assistant",
      "sensenova",
      "sensetime"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "商"
  },
  {
    "id": "claude-api",
    "name": "Claude API",
    "nameZh": "Claude API",
    "vendor": "Anthropic",
    "vendorZh": "Anthropic",
    "logo": "/assets/logos/anthropic.ico",
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "You hand-roll the tool-call loop, retries and context management around a raw completion endpoint. The SDK ships that loop with the caching and tool plumbing handled.",
    "solvesZh": "对着一个原始的补全接口，工具调用循环、重试和上下文管理都得自己写。SDK 直接把这套循环连同缓存和工具管道一起做好。",
    "bestFor": "When you are writing an app that calls a model with tools, not a one-off script.",
    "bestForZh": "当你要写的是带工具调用的模型应用，而不是一次性脚本。",
    "released": "2023-06-20",
    "datePrecision": "day",
    "homepage": "https://platform.claude.com/",
    "desc": "Anthropic developer API and Claude Agent SDK for building agents",
    "descZh": "Anthropic 开发者 API 与 Claude Agent SDK，用于构建智能体",
    "tags": [
      "api",
      "developer-sdk",
      "agents",
      "enterprise"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/claude/",
        "zh": "/zh/products/claude/"
      }
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "vercel-ai-sdk",
    "name": "Vercel AI SDK",
    "nameZh": "Vercel AI SDK",
    "vendor": "Vercel",
    "vendorZh": "Vercel",
    "logo": "/assets/logos/vercel.png",
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "model-api",
      "coding"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Streaming model output onto a page token by token is easy to get janky and messy when you write it yourself. These ready-made components survive a model swap.",
    "solvesZh": "在网页上逐字渲染模型输出，自己写容易卡、容易乱。这里有现成流式组件，换模型不用重写。",
    "bestFor": "You are building a streaming AI chat interface into your own product.",
    "bestForZh": "要给自己的产品做一个流式输出的 AI 对话界面。",
    "released": "2023-06-15",
    "datePrecision": "day",
    "homepage": "https://sdk.vercel.ai",
    "desc": "TypeScript toolkit for streaming LLM UIs across providers",
    "descZh": "面向 TypeScript 的流式 LLM UI 工具包，统一多家模型接口",
    "tags": [
      "typescript",
      "sdk",
      "streaming"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "V"
  },
  {
    "id": "framer-ai",
    "name": "Framer AI",
    "nameZh": "Framer AI",
    "vendor": "Framer",
    "vendorZh": "Framer",
    "logo": "/assets/logos/framer.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "You have a launch date and no designer, so the page stays a blank canvas. A prompt gives you a real layout you can edit and publish.",
    "solvesZh": "上线日期定了却没有设计师，页面只能空着。一句 prompt 就能给出可编辑、可发布的真实版面。",
    "bestFor": "When you need a landing or marketing page live before a designer is available.",
    "bestForZh": "当你在设计师到位之前，就需要先上线一个落地页或营销页。",
    "released": "2023-06-14",
    "datePrecision": "day",
    "homepage": "https://www.framer.com/ai/",
    "desc": "Generate and edit production websites from a text prompt",
    "descZh": "用文本提示生成并修改可上线的网站，2023-06 登顶 Product Hunt 日榜",
    "tags": [
      "no-code",
      "web-design",
      "landing-page"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "F"
  },
  {
    "id": "baidu-comate",
    "name": "Baidu Comate",
    "nameZh": "文心快码",
    "vendor": "百度",
    "vendorZh": "百度",
    "logo": "/assets/logos/baidu.ico",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "You let AI edit code, so you stop trusting the merge. Comate writes the doc and breaks down the tasks first, and only touches files after you approve — and the whole thing can run on your own servers.",
    "solvesZh": "让 AI 直接改代码，你不敢合并。Comate 先写文档、拆任务，你确认后才动手，还能整套部署在自己的服务器上。",
    "bestFor": "Your code cannot leave the internal network, and you want a reviewable plan before the AI changes anything.",
    "bestForZh": "代码不能出内网，且希望 AI 改动前先出一份可审的计划。",
    "released": "2023-06-06",
    "datePrecision": "day",
    "homepage": "https://comate.baidu.com/zh",
    "desc": "Baidu's AI coding assistant with spec-driven multi-agent flow",
    "descZh": "百度的 AI 编程助手，支持规范驱动的多智能体流程",
    "tags": [
      "spec-driven",
      "multi-agent",
      "private-deployment",
      "enterprise"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "B"
  },
  {
    "id": "talkie",
    "name": "Talkie",
    "nameZh": "Talkie",
    "vendor": "MiniMax",
    "vendorZh": "MiniMax",
    "logo": "/assets/logos/minimax.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Talking to a character is just a text box. Talkie gives them a look, a voice, and cards you collect.",
    "solvesZh": "和角色对话本来就只是个输入框。Talkie 给他形象、声音，还有可以收集的卡牌。",
    "bestFor": "When you want to spend time with a fictional character, not get work done.",
    "bestForZh": "当你想跟一个虚构角色相处，而不是把活干完。",
    "released": "2023-06-01",
    "datePrecision": "day",
    "homepage": "https://www.talkie-ai.com/",
    "desc": "Character chat app with collectible cards and visual avatars.",
    "descZh": "带抽卡机制和形象立绘的角色聊天应用。",
    "tags": [
      "companion",
      "gacha-cards",
      "anime-style",
      "overseas-hit"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "T"
  },
  {
    "id": "adobe-generative-fill-in-photoshop",
    "name": "Adobe Generative Fill in Photoshop",
    "nameZh": "Photoshop 生成式填充",
    "vendor": "Adobe",
    "vendorZh": "Adobe",
    "logo": "/assets/logos/adobe.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Removing an object from a photo used to require cloning and retouching by hand. Generative Fill reconstructs the surrounding pixels from a text prompt.",
    "solvesZh": "从照片里去掉一个物件，过去要靠手动修补和仿制。生成式填充只需一句文字描述，就能重建周围的像素。",
    "bestFor": "Object removal, extension, and background changes in an existing photo, done inside Photoshop.",
    "bestForZh": "在已有照片里做去物件、扩图、换背景，就地在 Photoshop 里完成。",
    "released": "2023-05-23",
    "datePrecision": "day",
    "homepage": "https://blog.adobe.com/en/publish/2023/05/23/future-of-photoshop-powered-by-adobe-firefly",
    "desc": "A Photoshop tool that paints new pixels from a text prompt.",
    "descZh": "用文字提示补出像素的 PS 工具。",
    "tags": [
      "in-product",
      "photoshop"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "A"
  },
  {
    "id": "aider",
    "name": "Aider",
    "nameZh": "Aider",
    "vendor": "Aider AI",
    "vendorZh": "Aider AI",
    "logo": null,
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "local-private"
    ],
    "form": "cli",
    "surface": "standalone",
    "solves": "An agent's edits arrive as a diff you cannot audit. Every change lands as its own commit, so you can read the run backwards.",
    "solvesZh": "智能体的改动只给你一个没法审的 diff。它的每一步改动都是独立提交，你可以倒着把整次运行读回来。",
    "bestFor": "When you want to hand a repo to a model and still review every line it touched.",
    "bestForZh": "当你把仓库交给模型之后，仍想逐行复核它改过的每一处时。",
    "released": "2023-05-10",
    "datePrecision": "day",
    "homepage": "https://aider.chat",
    "desc": "terminal pair programmer that commits every change to git",
    "descZh": "终端里的 AI 结对程序员，每次改动自动提交 Git",
    "tags": [
      "open-source",
      "git-native",
      "bring-your-own-key",
      "repo-map"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "A"
  },
  {
    "id": "dify",
    "name": "Dify",
    "nameZh": "Dify",
    "vendor": "LangGenius",
    "vendorZh": "LangGenius",
    "logo": "/assets/logos/langgenius.svg",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Wiring a model API is the easy part; prompts, retrieval and versioning are the rest. It puts all of it in one place you host yourself.",
    "solvesZh": "接模型 API 只是简单的一步，提示词、检索和版本管理才是重头。这些都被放进一个你可以自己托管的地方。",
    "bestFor": "When you need to build and run LLM apps without giving up control of where the data lives.",
    "bestForZh": "想搭建和运行 LLM 应用、但又不想放弃数据存放地的控制权的时候。",
    "released": "2023-05-09",
    "datePrecision": "day",
    "homepage": "https://dify.ai",
    "desc": "Open-source LLMOps platform for visual LLM app building",
    "descZh": "开源 LLMOps 平台，可视化编排 LLM 应用、工作流与 Agent",
    "tags": [
      "open-source",
      "llmops",
      "self-hosted"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "D"
  },
  {
    "id": "xinghuo",
    "name": "讯飞星火",
    "nameZh": "讯飞星火",
    "vendor": "科大讯飞",
    "vendorZh": "科大讯飞",
    "logo": "/assets/logos/iflytek.ico",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "General questions and drafts otherwise mean switching between search and a separate writing tool. One assistant covers asking and drafting, in Chinese.",
    "solvesZh": "查资料和写稿本来要在搜索和另一个写作工具之间来回切换。一个助手就能同时完成提问和起草，而且全程中文。",
    "bestFor": "When you want a Chinese-language assistant for everyday research and drafting.",
    "bestForZh": "当你想要一个中文助手，处理日常的资料查询和文稿起草。",
    "released": "2023-05-06",
    "datePrecision": "day",
    "homepage": "https://xinghuo.xfyun.cn/chat",
    "desc": "科大讯飞通用大模型助手",
    "descZh": "科大讯飞通用大模型助手",
    "tags": [
      "chat-assistant",
      "spark",
      "iflytek"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "讯"
  },
  {
    "id": "inflection-pi",
    "name": "Inflection Pi",
    "nameZh": "Inflection Pi",
    "vendor": "Inflection AI",
    "vendorZh": "Inflection AI",
    "logo": "/assets/logos/inflection-ai.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Assistants are built to finish the task, so talking is treated as a problem to solve. Pi listens first and answers like a person would.",
    "solvesZh": "助手是为完成任务而造的，聊天本身成了要解决的问题。Pi 先听，再像人一样回答。",
    "bestFor": "When you want to think out loud about something and not be handed a plan.",
    "bestForZh": "当你想把一件事说出来理一理，而不是拿到一份执行计划。",
    "released": "2023-05-02",
    "datePrecision": "day",
    "homepage": "https://pi.ai/",
    "desc": "Supportive personal AI companion focused on conversation and empathy",
    "descZh": "以陪伴与共情为核心的私人家人级 AI 助手",
    "tags": [
      "companion",
      "empathetic",
      "consumer",
      "voice"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "I"
  },
  {
    "id": "cohere-rerank",
    "name": "Cohere Rerank",
    "nameZh": "Cohere Rerank",
    "vendor": "Cohere",
    "vendorZh": "Cohere",
    "logo": "/assets/logos/cohere.png",
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "A search index returns the ten closest matches, not the right one. Reranking puts the actual answer at the top.",
    "solvesZh": "检索索引返回的是最相似的十条，不一定是真正有用的那一条。重排把对的答案放到最前。",
    "bestFor": "When your RAG pipeline retrieves plenty of documents and still answers badly.",
    "bestForZh": "当你的 RAG 流程召回了大量文档，回答质量却依然不好。",
    "released": "2023-05-01",
    "datePrecision": "day",
    "homepage": "https://cohere.com/rerank",
    "desc": "Reranking API that reorders retrieved documents for relevance",
    "descZh": "重排序 API，对召回文档按相关性重新排序",
    "tags": [
      "reranking",
      "retrieval",
      "rag",
      "search"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "C"
  },
  {
    "id": "lm-studio",
    "name": "LM Studio",
    "nameZh": "LM Studio",
    "vendor": "Element Labs",
    "vendorZh": "Element Labs",
    "logo": "/assets/logos/element-labs.ico",
    "region": "intl",
    "category": "local-runner",
    "useCases": [
      "local-private"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "Hosted models need you to paste code and data into someone else's machine. LM Studio downloads the weights and runs them on your computer.",
    "solvesZh": "托管模型要求你把代码和数据贴进别人的机器里。LM Studio 直接下载权重，在你自己的电脑上运行。",
    "bestFor": "When the material is confidential, or you are offline and out of credits.",
    "bestForZh": "当材料涉密，或者你处在离线环境又已经没额度了。",
    "released": "2023-05-01",
    "datePrecision": "day",
    "homepage": "https://lmstudio.ai",
    "desc": "GUI desktop app for discovering and running local LLMs",
    "descZh": "带图形界面的本地模型运行器，普通用户也能下载即用",
    "tags": [
      "desktop",
      "local-llm",
      "gui"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": null,
    "glyph": "L"
  },
  {
    "id": "codewave",
    "name": "CodeWave",
    "nameZh": "网易 CodeWave",
    "vendor": "NetEase",
    "vendorZh": "NetEase",
    "logo": "/assets/logos/netease.ico",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Business rules are locked in code only specialists can read. You describe the change in plain language and get working NASL back.",
    "solvesZh": "业务规则锁在代码里，只有专业的人读得懂。你用日常语言描述改动，它直接返回可用的 NASL。",
    "bestFor": "When domain experts need to change business logic without waiting on a developer.",
    "bestForZh": "业务专家想改业务逻辑、又不用等开发排期的时候。",
    "released": "2023-04-25",
    "datePrecision": "day",
    "homepage": "https://codewave.163.com",
    "desc": "low-code platform with natural-language to NASL code writing",
    "descZh": "低代码平台，支持用自然语言编写 NASL 代码",
    "tags": [
      "low-code",
      "domain-language",
      "enterprise",
      "on-premises"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "tiangong",
    "name": "天工AI",
    "nameZh": "天工AI",
    "vendor": "昆仑万维",
    "vendorZh": "昆仑万维",
    "logo": "/assets/logos/kunlun.ico",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Using the Tiangong models directly means picking interfaces and wiring context yourself. The official assistant is ready to open and answers one question at a time.",
    "solvesZh": "想直接用天工模型却得自己挑接口、配上下文。打开就是官方助手，问一句给一句答案。",
    "bestFor": "When you want to try Kunlun's Tiangong models without calling the API yourself.",
    "bestForZh": "你想先用昆仑万维的天工模型，不想自己调 API。",
    "released": "2023-04-18",
    "datePrecision": "day",
    "homepage": "https://www.tiangong.cn",
    "desc": "昆仑万维天工大模型官方助手",
    "descZh": "昆仑万维天工大模型官方助手",
    "tags": [
      "chat-assistant",
      "skywork",
      "kunlun"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "天"
  },
  {
    "id": "gpt4all",
    "name": "GPT4All",
    "nameZh": "GPT4All",
    "vendor": "Nomic AI",
    "vendorZh": "Nomic AI",
    "logo": "/assets/logos/nomic-ai.svg",
    "region": "intl",
    "category": "local-runner",
    "useCases": [
      "local-private"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "You do not want a private document going to someone else's server, and you do not want to learn a terminal. It runs the model on your machine.",
    "solvesZh": "你不想把私密文档传到别人的服务器上，也不想为了这事去学终端。它把模型跑在你自己的机器上。",
    "bestFor": "When you want to try a local model on your own files without installing any command-line tooling.",
    "bestForZh": "当你想拿自己的文件试一个本地模型，又不想装任何命令行工具时。",
    "released": "2023-04-03",
    "datePrecision": "day",
    "homepage": "https://www.nomic.ai/gpt4all",
    "desc": "Early consumer desktop app for running LLMs locally",
    "descZh": "早期面向普通用户的本地 LLM 桌面运行器，模型能力后来被追平",
    "tags": [
      "desktop",
      "local-llm",
      "quantization"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "G"
  },
  {
    "id": "flowise",
    "name": "Flowise",
    "nameZh": "Flowise",
    "vendor": "FlowiseAI",
    "vendorZh": "FlowiseAI",
    "logo": "/assets/logos/flowiseai.ico",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "local-private"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "You wire a LangChain chain by editing nested Python objects until the shape is unreadable. It draws the graph instead and exports it.",
    "solvesZh": "接一条 LangChain 链要靠改嵌套的 Python 对象，改到后来结构自己也读不懂了。它改成让你画这张图，再导出代码。",
    "bestFor": "When a team wants to design and hand off an agent flow without reading raw Python.",
    "bestForZh": "当团队要设计并交付一条智能体流程，却不想读原始 Python 代码时。",
    "released": "2023-03-29",
    "datePrecision": "day",
    "homepage": "https://flowiseai.com",
    "desc": "Drag-and-drop LangChain flow builder, acquired by Workday",
    "descZh": "拖拽式 LangChain 流程搭建工具，2025-08 被 Workday 收购",
    "tags": [
      "open-source",
      "langchain",
      "low-code"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": null,
    "glyph": "F"
  },
  {
    "id": "warp",
    "name": "Warp",
    "nameZh": "Warp",
    "vendor": "Warp Inc.",
    "vendorZh": "Warp Inc.",
    "logo": "/assets/logos/warp-inc.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "surface": "standalone",
    "solves": "You can't recall the exact command, and looking it up breaks your flow. Describe the intent in plain language and it types it and runs it for you.",
    "solvesZh": "记不住命令长什么样，查文档又打断手上的活。用一句大白话说清意图，它替你敲并执行。",
    "bestFor": "You work in the terminal but often can't remember how a command is written.",
    "bestForZh": "你在终端里干活，但常常想不起某个命令该怎么写。",
    "released": "2023-03-17",
    "datePrecision": "day",
    "homepage": "https://warp.dev",
    "desc": "GPU-rendered terminal with natural-language command execution",
    "descZh": "GPU 渲染的现代终端，支持自然语言转命令与多步 Agent 模式",
    "tags": [
      "terminal",
      "cli",
      "agentic-ide"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "W"
  },
  {
    "id": "wenxin-yiyan",
    "name": "文心一言",
    "nameZh": "文心一言",
    "vendor": "百度",
    "vendorZh": "百度",
    "logo": "/assets/logos/baidu.ico",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Drafting one document means opening several tabs and copying text back and forth. Wenxin Yiyan puts writing, lookup and organizing in a single conversation.",
    "solvesZh": "起草一份文档要开好几个网页、复制粘贴来回复制。文心一言把写作、查资料和整理放在一个对话框里。",
    "bestFor": "You want to ask the question and get a finished draft in one place instead of switching tools.",
    "bestForZh": "想在一个地方问完问题、拿到成稿，而不是切换多个工具。",
    "released": "2023-03-16",
    "datePrecision": "day",
    "homepage": "https://yiyan.baidu.com",
    "desc": "百度首个生成式 AI 对话应用",
    "descZh": "百度首个生成式 AI 对话应用",
    "tags": [
      "chat-assistant",
      "wenxin",
      "baidu"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "文"
  },
  {
    "id": "claude-ai",
    "name": "Claude.ai",
    "nameZh": "Claude.ai",
    "vendor": "Anthropic",
    "vendorZh": "Anthropic",
    "logo": "/assets/logos/anthropic.ico",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "coding"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "You paste a long document in and get a summary back, losing the reasoning. It works through the material with you and shows where an answer came from.",
    "solvesZh": "把长文档贴进去，拿到一段摘要，推理过程全丢了。它和你一起逐段读，并标出每个答案来自哪里。",
    "bestFor": "When you have a long document or codebase to think through, not a quick lookup.",
    "bestForZh": "当你要慢慢啃一份长文档或一个大 codebase，而不是快速查一下。",
    "released": "2023-03-14",
    "datePrecision": "day",
    "homepage": "https://claude.ai/",
    "desc": "Anthropic's conversational assistant for analysis, writing and code",
    "descZh": "Anthropic 的对话式助手，面向分析、写作与编程任务",
    "tags": [
      "conversational-ai",
      "consumer",
      "reasoning"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/claude/",
        "zh": "/zh/products/claude/"
      }
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "cursor",
    "name": "Cursor",
    "nameZh": "Cursor",
    "vendor": "Anysphere",
    "vendorZh": "Anysphere",
    "logo": "/assets/logos/anysphere.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "You ask about a function and get the body, with none of the call sites. It answers with the whole picture across the repo.",
    "solvesZh": "问一个函数，只拿到函数体，看不到任何调用处。它会跨整个仓库给出完整的调用图景。",
    "bestFor": "When a change touches callers, types and tests you have to keep in sync.",
    "bestForZh": "当改动牵涉调用方、类型和测试，需要一并同步时。",
    "released": "2023-03-01",
    "datePrecision": "day",
    "homepage": "https://cursor.com",
    "desc": "AI code editor built around whole-codebase AI editing",
    "descZh": "基于 VS Code 改造的 AI 原生编辑器，围绕整仓库上下文编辑",
    "tags": [
      "ai-ide",
      "code-editor",
      "agentic-coding"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/cursor/",
        "zh": "/zh/products/cursor/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "C"
  },
  {
    "id": "intercom-fin",
    "name": "Intercom Fin",
    "nameZh": "Intercom Fin",
    "vendor": "Intercom",
    "vendorZh": "Intercom",
    "logo": "/assets/logos/intercom.png",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Support volume scales linearly with headcount. Fin resolves a large share of incoming tickets on its own, using your help center and your own policies as its source of truth.",
    "solvesZh": "支持工作量随人头线性增长。Fin 能独立解决相当大比例的进线工单，依据是你的帮助中心和你自己的政策。",
    "bestFor": "A support team whose ticket volume outstrips its headcount and needs resolution, not deflection.",
    "bestForZh": "工单量超过人手、且需要真正解决（而不是把客户挡回去）的支持团队。",
    "released": "2023-03-01",
    "datePrecision": "month",
    "homepage": "https://www.intercom.com/blog/announcing-fin-2-ai-agent-customer-service",
    "desc": "An AI agent that resolves support tickets inside Intercom.",
    "descZh": "Intercom 内自助解决工单的 AI。",
    "tags": [
      "in-product",
      "intercom"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "I"
  },
  {
    "id": "portkey",
    "name": "Portkey",
    "nameZh": "Portkey",
    "vendor": "Portkey",
    "vendorZh": "Portkey",
    "logo": "/assets/logos/portkey.png",
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api",
      "observability"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "One provider going down or one key blowing its budget takes the whole app with it. Portkey routes around both.",
    "solvesZh": "一家供应商宕机或一个 key 爆了预算，都会把整个应用拖垮。Portkey 的路由能绕开这两种情况。",
    "bestFor": "When your model calls span several vendors and you need fallback, rate limits and a cost breakdown.",
    "bestForZh": "当你的模型调用横跨多家供应商，需要 fallback、限流和成本明细。",
    "released": "2023-03-01",
    "datePrecision": "day",
    "homepage": "https://portkey.ai/",
    "desc": "Hosted AI gateway adding routing, governance and observability to LLM calls.",
    "descZh": "托管式 AI 网关，为模型调用补上路由、治理与可观测性。",
    "tags": [
      "ai-gateway",
      "governance",
      "reliability",
      "cost-tracking"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "P"
  },
  {
    "id": "zed",
    "name": "Zed",
    "nameZh": "Zed",
    "vendor": "Zed Industries",
    "vendorZh": "Zed Industries",
    "logo": "/assets/logos/zed-industries.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "local-private"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "One agent at a time means waiting. It runs several in parallel in the same editor, so you can hand out work at once.",
    "solvesZh": "一次只能跑一个 Agent 就意味着干等。它能在同一个编辑器里并行跑多个，任务可以一次分完。",
    "bestFor": "When you want more than one coding agent working in your editor at the same time.",
    "bestForZh": "想在编辑器里同时有多个编码 Agent 干活的时候。",
    "released": "2023-03-01",
    "datePrecision": "day",
    "homepage": "https://zed.dev",
    "desc": "Rust-native editor with parallel agents and ACP support",
    "descZh": "Rust 编写的 AI 原生编辑器，支持并行智能体与 ACP 协议",
    "tags": [
      "open-source",
      "rust",
      "acp-protocol",
      "gpu-rendered"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "Z"
  },
  {
    "id": "relevance-ai",
    "name": "Relevance AI",
    "nameZh": "Relevance AI",
    "vendor": "Relevance AI",
    "vendorZh": "Relevance AI",
    "logo": "/assets/logos/relevance-ai.png",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "A single agent cannot do a job with five steps. Relevance AI lets several no-code agents work one job together.",
    "solvesZh": "单个 Agent 干不完有五步的活。Relevance AI 让多个 no-code Agent 协作完成同一件事。",
    "bestFor": "When a task has a team shape to it — research, drafting, checking — and nobody wants to write the glue code.",
    "bestForZh": "当一个任务天然有团队分工的样子——调研、起草、核查——而没人想写胶水代码。",
    "released": "2023-02-20",
    "datePrecision": "day",
    "homepage": "https://relevanceai.com",
    "desc": "Build and deploy a workforce of no-code AI agents",
    "descZh": "构建并部署一支无代码 AI 员工队伍，支持多智能体团队协作",
    "tags": [
      "no-code",
      "multi-agent",
      "workforce"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "R"
  },
  {
    "id": "microsoft-copilot",
    "name": "Microsoft Copilot",
    "nameZh": "Microsoft Copilot",
    "vendor": "Microsoft",
    "vendorZh": "Microsoft",
    "logo": "/assets/logos/microsoft.ico",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "You need an answer about your mail and calendar, not a guess. It reads your Microsoft account and answers with that context.",
    "solvesZh": "你要的是关于邮件和日程的确定答案，不是猜测。它读取你的 Microsoft 账号，基于这些上下文作答。",
    "bestFor": "When the question is about your Outlook mail, your calendar, or your PC settings.",
    "bestForZh": "当问题涉及 Outlook 邮件、日历或电脑设置时。",
    "released": "2023-02-07",
    "datePrecision": "day",
    "homepage": "https://www.microsoft.com/en-us/microsoft-copilot",
    "desc": "Consumer AI assistant across Windows, web, mobile and Edge",
    "descZh": "覆盖 Windows、网页、移动端与 Edge 的消费级 AI 助手",
    "tags": [
      "consumer",
      "search-integration",
      "windows",
      "ecosystem"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "M"
  },
  {
    "id": "elevenlabs",
    "name": "ElevenLabs",
    "nameZh": "ElevenLabs",
    "vendor": "ElevenLabs",
    "vendorZh": "ElevenLabs",
    "logo": "/assets/logos/elevenlabs.ico",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "audio-voice"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Synthetic narration sounds like a robot, so listeners tune out. The output carries the pauses and emphasis a real voice would.",
    "solvesZh": "合成配音一听就是机器味，听众很快走神。它的输出带着真人该有的停顿和重音。",
    "bestFor": "When you need a voice for a product, a video or a game and cannot book a human.",
    "bestForZh": "当你需要给产品、视频或游戏配人声，却请不到真人时。",
    "released": "2023-01-23",
    "datePrecision": "day",
    "homepage": "https://elevenlabs.io",
    "desc": "Most realistic open TTS and voice cloning API",
    "descZh": "语音合成与声音克隆中最具真实感的平台与 API",
    "tags": [
      "tts",
      "voice-cloning",
      "audio"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": null,
    "glyph": "E"
  },
  {
    "id": "coderabbit",
    "name": "CodeRabbit",
    "nameZh": "CodeRabbit",
    "vendor": "CodeRabbit",
    "vendorZh": "CodeRabbit",
    "logo": "/assets/logos/coderabbit.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "observability"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "AI-written PRs pile up faster than people can review them, and nobody reads them closely. It understands the whole repository and flags what's wrong in each PR.",
    "solvesZh": "AI 写的 PR 越来越多，人手审不过来也没人细看。它读懂整个仓库，逐个 PR 指出坏处。",
    "bestFor": "Your team has started shipping large volumes of AI-written PRs and needs one consistent check.",
    "bestForZh": "团队开始大量用 AI 写 PR，需要一道固定检查。",
    "released": "2023-01-01",
    "datePrecision": "month",
    "homepage": "https://www.coderabbit.ai",
    "desc": "reviews every pull request with full repository context",
    "descZh": "基于全仓库上下文审查每一个 Pull Request",
    "tags": [
      "pull-request",
      "static-analysis",
      "self-hosting",
      "sarif"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "helicone",
    "name": "Helicone",
    "nameZh": "Helicone",
    "vendor": "Helicone",
    "vendorZh": "Helicone",
    "logo": "/assets/logos/helicone.ico",
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Your model bill doubled and the provider's dashboard only shows totals. Point your base_url at Helicone and every call, cost and error shows up per user.",
    "solvesZh": "模型账单翻倍，服务商的后台却只有总额。把 base_url 指向 Helicone，每次调用、成本和错误都按用户列出来。",
    "bestFor": "When you need to attribute spend and failures to specific users or features.",
    "bestForZh": "当你需要把花费和失败归因到具体用户或功能时。",
    "released": "2023-01-01",
    "datePrecision": "month",
    "homepage": "https://www.helicone.ai",
    "desc": "One-line proxy observability for LLM API traffic",
    "descZh": "改一行 base_url 即可接入的 LLM 流量观测代理，2026-03 被 Mintlify 收购",
    "tags": [
      "open-source",
      "proxy",
      "observability"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "H"
  },
  {
    "id": "presentations-ai",
    "name": "Presentations.AI",
    "nameZh": "Presentations.AI",
    "vendor": "Presentations.AI",
    "vendorZh": "Presentations.AI",
    "logo": "/assets/logos/presentations-ai.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Deck colors never quite match the company brand, and a template falls apart as soon as you edit it. It pulls brand colors from your site, and the pptx stays editable.",
    "solvesZh": "做 PPT，配色总不吻合公司品牌，套模板一改就散。它从你网站抓品牌色，pptx 还能再改。",
    "bestFor": "You have to hand in a deck that matches the company brand, not start from a blank page.",
    "bestForZh": "要交一份符合公司品牌的演示稿，不是从空白开始。",
    "released": "2023-01-01",
    "datePrecision": "month",
    "homepage": "https://www.presentations.ai/",
    "desc": "Deck generator that pulls brand colors from your website.",
    "descZh": "能从你的公司网站自动提取品牌配色的 PPT 生成器。",
    "tags": [
      "slides",
      "brand-sync",
      "pptx-export",
      "template-resilient"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "P"
  },
  {
    "id": "leonardo-ai",
    "name": "Leonardo AI",
    "nameZh": "Leonardo AI",
    "vendor": "Leonardo.Ai",
    "vendorZh": "Leonardo.Ai",
    "logo": "/assets/logos/leonardo-ai.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Commissioning a game or product visual costs days of back-and-forth. Leonardo generates the asset, then lets you tune it.",
    "solvesZh": "约一张游戏或产品视觉稿，来回沟通要耗掉好几天。Leonardo 先出素材，再交给你细调。",
    "bestFor": "When you need production art for a game or a product page, not a one-off sketch.",
    "bestForZh": "当你需要能直接上线的游戏或产品图素材，而不是一张一次性草图。",
    "released": "2022-12-07",
    "datePrecision": "day",
    "homepage": "https://leonardo.ai",
    "desc": "Game and product asset generation studio, acquired by Canva",
    "descZh": "面向游戏与电商素材的图像生成工作台，2024 年被 Canva 收购",
    "tags": [
      "image-generation",
      "game-assets",
      "creative"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "L"
  },
  {
    "id": "perplexity",
    "name": "Perplexity",
    "nameZh": "Perplexity",
    "vendor": "Perplexity",
    "vendorZh": "Perplexity",
    "logo": "/assets/logos/perplexity.png",
    "region": "intl",
    "category": "search",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "A search page gives you ten links and makes you do the reading. It reads them and hands back an answer with the sources attached.",
    "solvesZh": "搜索结果页甩给你十个链接，读不读全靠你自己。它替你读完，直接给出答案并附上出处。",
    "bestFor": "When you want a researched answer with links you can click to check, not a list of pages.",
    "bestForZh": "当你想要的是一个有据可查、链接点开能核对的答案，而不是一堆网页列表时。",
    "released": "2022-12-07",
    "datePrecision": "day",
    "homepage": "https://www.perplexity.ai/",
    "desc": "Answer engine returning cited search results over language models",
    "descZh": "基于语言模型的答案引擎，回答附带可溯源的搜索引用",
    "tags": [
      "ai-search",
      "citations",
      "answer-engine",
      "consumer"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "P"
  },
  {
    "id": "chatgpt",
    "name": "ChatGPT",
    "nameZh": "ChatGPT",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "logo": "/assets/logos/openai.ico",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Writing, researching, and brainstorming means jumping between several tools. This one chat box hands you the draft, and you just edit it.",
    "solvesZh": "写东西、查资料、想点子要在好几个工具之间来回切。这个对话框直接给成稿，你只管改。",
    "bestFor": "When you need to draft, translate, or clear up a piece of writing.",
    "bestForZh": "你要起草、翻译或理清一段文字的时候。",
    "released": "2022-11-30",
    "datePrecision": "day",
    "homepage": "https://chatgpt.com/",
    "desc": "OpenAI's flagship conversational AI assistant, launched November 2022",
    "descZh": "OpenAI 旗舰对话式 AI 助手，2022 年 11 月 30 日上线",
    "tags": [
      "chatgpt",
      "conversational-ai",
      "consumer"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "C"
  },
  {
    "id": "notion-ai",
    "name": "Notion AI",
    "nameZh": "Notion AI",
    "vendor": "Notion",
    "vendorZh": "Notion",
    "logo": "/assets/logos/notion.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Your notes sit in Notion but the assistant lives in another tab, so context never makes it across. This one reads the page you are on.",
    "solvesZh": "笔记在 Notion 里，助手却在另一个标签页，上下文永远传不过来。这个助手直接读你当前所在的页面。",
    "bestFor": "When your working material is already in Notion and you want to write or query in place.",
    "bestForZh": "当你的工作材料已经在 Notion 里，你想就地写作或查询。",
    "released": "2022-11-16",
    "datePrecision": "day",
    "homepage": "https://www.notion.so/product/ai",
    "desc": "AI writing and Q&A embedded across the Notion workspace",
    "descZh": "嵌入 Notion 工作区的 AI 写作与问答，2023-02-22 正式 GA",
    "tags": [
      "workspace",
      "writing",
      "knowledge-base"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "N"
  },
  {
    "id": "exa",
    "name": "Exa",
    "nameZh": "Exa",
    "vendor": "Exa Labs",
    "vendorZh": "Exa Labs",
    "logo": "/assets/logos/exa-labs.ico",
    "region": "intl",
    "category": "search",
    "useCases": [
      "research",
      "agent-building"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Keyword search returns pages that merely contain the words, and an agent cannot read ten of them. It returns the passages that answer the question.",
    "solvesZh": "关键词搜索返回的只是碰巧含有这些词的网页，而智能体没法把十篇都读完。它直接返回能回答问题的段落。",
    "bestFor": "When an agent needs source text it can quote, not a list of links to open.",
    "bestForZh": "当智能体需要的是可以直接引用的原文，而不是一堆待打开的链接时。",
    "released": "2022-11-01",
    "datePrecision": "day",
    "homepage": "https://exa.ai",
    "desc": "Neural search API built for retrieval by AI agents",
    "descZh": "为 AI Agent 检索设计的神经搜索引擎与 API，前身 Metaphor",
    "tags": [
      "search-api",
      "retrieval",
      "agents"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "E"
  },
  {
    "id": "harvey",
    "name": "Harvey",
    "nameZh": "Harvey",
    "vendor": "Counsel AI Corporation",
    "vendorZh": "Counsel AI Corporation",
    "logo": null,
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Legal research eats hours and every claim needs a citation. It drafts work and points back to the source document.",
    "solvesZh": "法律检索要耗掉几小时，而且每条结论都得给出处。它能起草文书，并指回原始文件。",
    "bestFor": "When a lawyer or legal team needs a first draft or document review with traceable sources.",
    "bestForZh": "律师或法务团队需要初稿、或需要带可追溯出处的文件审阅的时候。",
    "released": "2022-11-01",
    "datePrecision": "day",
    "homepage": "https://www.harvey.ai/",
    "desc": "Generative AI platform purpose-built for law firm and in-house legal work.",
    "descZh": "面向律所与企业法务的生成式 AI 工作平台。",
    "tags": [
      "legal-ai",
      "vertical-ai",
      "citation-grounding",
      "enterprise"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "H"
  },
  {
    "id": "llamaindex",
    "name": "LlamaIndex",
    "nameZh": "LlamaIndex",
    "vendor": "LlamaIndex",
    "vendorZh": "LlamaIndex",
    "logo": "/assets/logos/llamaindex.png",
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building",
      "research"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "Your documents sit in ten places with different formats, and the model has never seen any of them. It ingests, indexes, and retrieves across all of them.",
    "solvesZh": "你的文档散在十个地方、格式各不相同，模型一份也没见过。它把这些文档统一摄取、建索引并跨库检索。",
    "bestFor": "When you are building a question-answering feature over a document pile nobody has organized.",
    "bestForZh": "当你要在一堆没人整理过的文档上做一个问答功能时。",
    "released": "2022-11-01",
    "datePrecision": "day",
    "homepage": "https://www.llamaindex.ai/",
    "desc": "Data framework for ingestion, indexing and retrieval over private documents.",
    "descZh": "面向私有文档的摄取、索引与检索数据框架。",
    "tags": [
      "rag",
      "data-connectors",
      "indexing",
      "open-source"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "L"
  },
  {
    "id": "chroma",
    "name": "Chroma",
    "nameZh": "Chroma",
    "vendor": "Chroma",
    "vendorZh": "Chroma",
    "logo": "/assets/logos/chroma.ico",
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "Your prototype needs real semantic search, but standing up a vector database service is a whole afternoon. It embeds into the app as a library.",
    "solvesZh": "原型需要真正的语义检索，但搭一套向量数据库服务要耗掉一下午。它以库的形式直接嵌进应用里。",
    "bestFor": "When a prototype or local app needs retrieval and you do not want to run a database server.",
    "bestForZh": "当原型或本地应用需要检索能力，而你又不想再跑一个数据库服务时。",
    "released": "2022-10-01",
    "datePrecision": "day",
    "homepage": "https://www.trychroma.com/",
    "desc": "Embedded open-source embedding store for prototypes and local apps.",
    "descZh": "嵌入式开源向量存储，面向原型与本地应用。",
    "tags": [
      "vector-database",
      "embedded",
      "open-source",
      "prototyping"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "fireworks-ai",
    "name": "Fireworks AI",
    "nameZh": "Fireworks AI",
    "vendor": "Fireworks AI",
    "vendorZh": "Fireworks AI",
    "logo": "/assets/logos/fireworks-ai.ico",
    "region": "intl",
    "category": "model-platform",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Self-hosting an open model means renting GPUs and tuning a serving stack yourself. Fireworks runs it on kernels they wrote, with a per-token bill.",
    "solvesZh": "自托管开放模型意味着自己租 GPU、调推理栈。Fireworks 用自研 kernel 跑起来，只按 token 计费。",
    "bestFor": "When you want an open-weight model in production without buying hardware.",
    "bestForZh": "当你想在生产环境用开放权重模型，又不打算自购硬件。",
    "released": "2022-10-01",
    "datePrecision": "day",
    "homepage": "https://fireworks.ai/",
    "desc": "Inference platform running open models on its own optimized serving stack.",
    "descZh": "基于自研推理引擎托管开源大模型的平台。",
    "tags": [
      "inference",
      "open-models",
      "serving-engine",
      "fine-tuning"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "F"
  },
  {
    "id": "langchain",
    "name": "LangChain",
    "nameZh": "LangChain",
    "vendor": "LangChain Inc.",
    "vendorZh": "LangChain Inc.",
    "logo": "/assets/logos/langchain-inc.png",
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "Wiring prompts, tools and retries by hand is fragile and repetitive. LangChain hands you the plumbing and leaves the logic yours.",
    "solvesZh": "手写 prompt、工具和重试的拼装既脆弱又重复。LangChain 把这些管道活接好，逻辑仍然归你。",
    "bestFor": "When you are building a multi-step agent and would rather not re-solve tool calling and memory.",
    "bestForZh": "当你在搭一个多步 Agent，又不想重新解决工具调用和记忆管理。",
    "released": "2022-10-01",
    "datePrecision": "day",
    "homepage": "https://www.langchain.com",
    "desc": "Framework that popularised LLM application development",
    "descZh": "推动 LLM 应用开发普及的框架，2022 年发布并迅速成为事实标准",
    "tags": [
      "framework",
      "llm-apps",
      "developer-tools"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "L"
  },
  {
    "id": "character-ai",
    "name": "Character.AI",
    "nameZh": "Character.AI",
    "vendor": "Character.AI",
    "vendorZh": "Character.AI",
    "logo": "/assets/logos/character-ai.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Assistants push you toward a task, which is wrong when you want to talk to someone who stays in character. Here the character holds its own voice and backstory.",
    "solvesZh": "助手总在把你推向完成任务，可你有时只想和保持人设的角色聊天。这里角色有自己的口吻和背景设定。",
    "bestFor": "When you want to rehearse a conversation, or play a scene nobody else would agree to.",
    "bestForZh": "当你想排练一场对话，或演一个别人不会陪你演的场景。",
    "released": "2022-09-16",
    "datePrecision": "day",
    "homepage": "https://character.ai/",
    "desc": "Platform for building and roleplaying with user-created AI characters",
    "descZh": "用户创建并扮演 AI 角色的对话平台",
    "tags": [
      "roleplay",
      "companion",
      "consumer",
      "ugc"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "gamma",
    "name": "Gamma",
    "nameZh": "Gamma",
    "vendor": "Gamma",
    "vendorZh": "Gamma",
    "logo": "/assets/logos/gamma.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "office",
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "A blank slide deck is just a blank page. Gamma turns one sentence into a laid-out deck you can then edit.",
    "solvesZh": "空白幻灯片就是一张白纸。Gamma 把一句话变成排好版的 deck，之后你再改。",
    "bestFor": "When you need a presentable deck today and the content is already in your head.",
    "bestForZh": "当你今天就要一份能拿出去的 deck，内容已经在你脑子里。",
    "released": "2022-08-01",
    "datePrecision": "day",
    "homepage": "https://gamma.app/",
    "desc": "Turns a prompt into a designed deck, doc, or webpage.",
    "descZh": "把一句话变成排好版的演示文稿、文档或网页。",
    "tags": [
      "slides",
      "prompt-to-deck",
      "card-editor",
      "web-native"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "G"
  },
  {
    "id": "heygen",
    "name": "HeyGen",
    "nameZh": "HeyGen",
    "vendor": "HeyGen",
    "vendorZh": "HeyGen",
    "logo": "/assets/logos/heygen.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "The training video must exist in six languages and the speaker cannot be in all of them. It clones voice and face, then dubs the video.",
    "solvesZh": "培训视频要做六种语言，而主讲人不可能六种都会讲。它克隆声音和面部，再给视频配上对应语言的配音。",
    "bestFor": "When one recorded video has to ship in several languages with the same on-camera presenter.",
    "bestForZh": "当一条录好的视频要以同一位出镜主讲人的形象，发到多个语言版本时。",
    "released": "2022-07-29",
    "datePrecision": "day",
    "homepage": "https://www.heygen.com",
    "desc": "AI avatar video generation and multilingual dubbing",
    "descZh": "AI 数字人视频生成与多语言配音平台",
    "tags": [
      "avatar",
      "video-generation",
      "localization"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": null,
    "glyph": "H"
  },
  {
    "id": "midjourney",
    "name": "Midjourney",
    "nameZh": "Midjourney",
    "vendor": "Midjourney, Inc.",
    "vendorZh": "Midjourney, Inc.",
    "logo": "/assets/logos/midjourney-inc.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Generators produce technically correct images that look obviously generated. Midjourney's output holds up in a deck or a cover without cleanup.",
    "solvesZh": "很多生成器出的图技术上没错，一眼却看出是机器做的。Midjourney 的成品放进演示稿或封面，不需要再返工。",
    "bestFor": "When the image has to look designed, not just illustrate the prompt.",
    "bestForZh": "当这张图要看起来像设计过，而不只是把 prompt 画出来。",
    "released": "2022-07-12",
    "datePrecision": "day",
    "homepage": "https://www.midjourney.com",
    "desc": "Aesthetic image generation that reset industry quality bars",
    "descZh": "把图像生成美学水准拉到新高度的产品，2022-07 开放公测",
    "tags": [
      "image-generation",
      "diffusion",
      "creative"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": null,
    "glyph": "M"
  },
  {
    "id": "phind",
    "name": "Phind",
    "nameZh": "Phind",
    "vendor": "Phind",
    "vendorZh": "Phind",
    "logo": null,
    "region": "intl",
    "category": "search",
    "useCases": [
      "research",
      "coding"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "General search gives shallow answers about code. It was built to explain code the way another developer would.",
    "solvesZh": "通用搜索对代码只能给出很浅的答案。它被做出来就是为了像同行开发者那样解释代码。",
    "bestFor": "Reference only; the service was shut down in January 2026.",
    "bestForZh": "仅作参考；服务已于 2026 年 1 月关停。",
    "released": "2022-07-01",
    "datePrecision": "day",
    "homepage": "https://www.phind.com",
    "desc": "Developer-focused search; shut down January 2026",
    "descZh": "面向开发者的搜索工具，2026-01-16 因巨头内置联网搜索而关停",
    "tags": [
      "developer-search",
      "discontinued",
      "search"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "P"
  },
  {
    "id": "together-ai",
    "name": "Together AI",
    "nameZh": "Together AI",
    "vendor": "Together AI",
    "vendorZh": "Together AI",
    "logo": "/assets/logos/together-ai.png",
    "region": "intl",
    "category": "model-platform",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "The frontier API works, until the invoice arrives and you cannot move the load. Open-weight models on rented GPUs give you a cheaper floor and somewhere to fine-tune.",
    "solvesZh": "前沿 API 本来好用，直到账单来了又换不动量。租用 GPU 跑开放权重模型能压低成本，也给你一个微调的地方。",
    "bestFor": "When per-token cost at your volume is the problem, not model quality.",
    "bestForZh": "当问题出在你这个用量下的单 token 成本，而不是模型质量。",
    "released": "2022-06-01",
    "datePrecision": "day",
    "homepage": "https://www.together.ai/",
    "desc": "Cloud for serving and fine-tuning open-weight models at scale.",
    "descZh": "面向开源权重模型的规模化推理与微调云平台。",
    "tags": [
      "open-models",
      "inference",
      "fine-tuning",
      "gpu-cloud"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "T"
  },
  {
    "id": "fathom",
    "name": "Fathom",
    "nameZh": "Fathom",
    "vendor": "Fathom",
    "vendorZh": "Fathom",
    "logo": "/assets/logos/fathom.ico",
    "region": "intl",
    "category": "meetings",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Somebody still has to write down what the call said. Fathom records it, summarises it, and pushes it to your CRM.",
    "solvesZh": "通话内容总得有人记下来。Fathom 负责录音、生成摘要，并推送到你的 CRM。",
    "bestFor": "When you are on back-to-back sales or support calls and cannot take notes.",
    "bestForZh": "当你连着开销售或支持通话、没空做笔记时。",
    "released": "2021-12-01",
    "datePrecision": "day",
    "homepage": "https://fathom.video",
    "desc": "Free AI meeting notetaker popular with sales and support",
    "descZh": "免费 AI 会议纪要工具，在销售与客服团队中广泛使用",
    "tags": [
      "meetings",
      "free-tier",
      "sales"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "F"
  },
  {
    "id": "runway",
    "name": "Runway",
    "nameZh": "Runway",
    "vendor": "Runway",
    "vendorZh": "Runway",
    "logo": "/assets/logos/runway.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Shooting a clip means a camera, a location and a crew. A text prompt produces the footage, and the timeline handles the rest of the cut.",
    "solvesZh": "拍一个片段要机器、场地和一组人。一句文本 prompt 就能产出素材，剪辑的其余部分在时间线上完成。",
    "bestFor": "When you need footage of something you cannot or would not actually shoot.",
    "bestForZh": "当你需要一些拍不了或根本不想去拍的东西的素材。",
    "released": "2021-12-01",
    "datePrecision": "day",
    "homepage": "https://runwayml.com",
    "desc": "Generative video platform; Gen-2 text-to-video in 2023-03",
    "descZh": "生成式视频平台，2023-03 推出 Gen-2，首个公开可用的文生视频模型",
    "tags": [
      "video-generation",
      "creative",
      "multimodal"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "R"
  },
  {
    "id": "you-com",
    "name": "You.com",
    "nameZh": "You.com",
    "vendor": "You.com",
    "vendorZh": "You.com",
    "logo": "/assets/logos/you-com.ico",
    "region": "intl",
    "category": "search",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Web search for AI apps means scraping and cleaning pages yourself. You.com sells that retrieval layer instead.",
    "solvesZh": "给 AI 应用做联网搜索，意味着自己抓取和清洗网页。You.com 把这层检索能力直接卖给你。",
    "bestFor": "When your product needs live web data in its answers and you would rather buy it than scrape it.",
    "bestForZh": "当你的产品回答里需要实时网页数据，而你更愿意买而不是自己抓。",
    "released": "2021-12-01",
    "datePrecision": "day",
    "homepage": "https://you.com",
    "desc": "AI search and agents pivoted from chat research engine",
    "descZh": "从对话式研究引擎转型为 AI 搜索与 Agent 平台",
    "tags": [
      "search",
      "agents",
      "enterprise"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "Y"
  },
  {
    "id": "glean",
    "name": "Glean",
    "nameZh": "Glean",
    "vendor": "Glean",
    "vendorZh": "Glean",
    "logo": "/assets/logos/glean.png",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "The answer is somewhere in the company, but you cannot find it — and may not be allowed to. It searches only what you can already see.",
    "solvesZh": "答案就在公司某个地方，但你找不到——甚至可能根本没权限看。它只搜索你本来就有权查看的内容。",
    "bestFor": "When a question spans the tools your team uses and permissions must be respected.",
    "bestForZh": "问题横跨团队用的多个工具、同时又必须遵守权限的时候。",
    "released": "2021-09-15",
    "datePrecision": "day",
    "homepage": "https://www.glean.com/",
    "desc": "Permission-aware enterprise search and work AI agents over company data.",
    "descZh": "在企业数据上做权限感知的搜索与工作 AI 智能体。",
    "tags": [
      "enterprise-search",
      "rag",
      "permissions",
      "knowledge-graph"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "G"
  },
  {
    "id": "ai21-studio",
    "name": "AI21 Studio",
    "nameZh": "AI21 Studio",
    "vendor": "AI21 Labs",
    "vendorZh": "AI21 Labs",
    "logo": "/assets/logos/ai21-labs.png",
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Evaluating a model means writing integration code before you know if it is any good. The console lets you try Jamba on your own text and see the output first.",
    "solvesZh": "评估模型意味着还不知道好不好用就先写集成代码。这个控制台让你先用自己的文本跑一遍 Jamba，看清输出。",
    "bestFor": "When you are comparing a model against your real documents before signing anything.",
    "bestForZh": "当你想在签约前，用自己的真实文档对比模型表现。",
    "released": "2021-08-17",
    "datePrecision": "day",
    "homepage": "https://studio.ai21.com/",
    "desc": "Developer console for the Jamba model family and NLP APIs",
    "descZh": "面向 Jamba 模型系列与 NLP 接口的开发者控制台",
    "tags": [
      "developer-console",
      "nlp",
      "jamba",
      "enterprise"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "A"
  },
  {
    "id": "github-copilot",
    "name": "GitHub Copilot",
    "nameZh": "GitHub Copilot",
    "vendor": "Microsoft",
    "vendorZh": "Microsoft",
    "logo": "/assets/logos/microsoft.ico",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "extension",
    "solves": "Typing out boilerplate line by line wears you down. It finishes the line you are on and can take a whole assigned issue.",
    "solvesZh": "样板代码一行行手敲很耗人。它能补完你正在写的那一行，也能独立接下一个完整的 issue。",
    "bestFor": "When you are in an editor and want the next few lines already written.",
    "bestForZh": "当你在编辑器里，希望接下来几行已经替你写好了。",
    "released": "2021-06-29",
    "datePrecision": "day",
    "homepage": "https://github.com/features/copilot",
    "desc": "AI pair programmer with inline completion and agent mode in IDEs",
    "descZh": "AI 结对编程工具，提供行内补全与 IDE 内的智能体模式",
    "tags": [
      "code-completion",
      "ide-extension",
      "pair-programming",
      "github"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/copilot/",
        "zh": "/zh/products/copilot/"
      }
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "G"
  },
  {
    "id": "vertex-ai",
    "name": "Vertex AI",
    "nameZh": "Vertex AI",
    "vendor": "Google",
    "vendorZh": "Google",
    "logo": "/assets/logos/google.png",
    "region": "intl",
    "category": "model-platform",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "You assemble the model, the hosting and the audit logging separately. It bundles them with the controls a regulated company has to show a reviewer.",
    "solvesZh": "模型、托管和审计日志要分别拼装。它把三者打包，并带上受监管行业必须向审查方出示的管控能力。",
    "bestFor": "When a regulated team needs Gemini behind a traceable audit trail.",
    "bestForZh": "当受监管的团队需要在可追溯的审计记录下使用 Gemini。",
    "released": "2021-05-18",
    "datePrecision": "day",
    "homepage": "https://cloud.google.com/vertex-ai",
    "desc": "Google Cloud enterprise platform for generative AI and agents",
    "descZh": "Google Cloud 面向企业的生成式 AI 与智能体平台",
    "tags": [
      "cloud-platform",
      "enterprise",
      "foundation-models",
      "mlops"
    ],
    "status": "merged",
    "supersededBy": "gemini-enterprise",
    "successorName": "Gemini 企业智能体平台",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "V"
  },
  {
    "id": "pinecone",
    "name": "Pinecone",
    "nameZh": "Pinecone",
    "vendor": "Pinecone Systems",
    "vendorZh": "Pinecone Systems",
    "logo": "/assets/logos/pinecone.ico",
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "agent-building"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Semantic search means running a vector database cluster you now maintain. Pinecone indexes and queries over an API, so there is no cluster to babysit.",
    "solvesZh": "语义检索意味着你要自己运维一个向量数据库集群。Pinecone 通过 API 完成索引和查询，没有集群要照看。",
    "bestFor": "When your app needs to search by meaning, or an agent needs a memory it can recall from.",
    "bestForZh": "当你的应用需要按语义搜索，或者 Agent 需要一份能被回忆起来的记忆。",
    "released": "2021-01-27",
    "datePrecision": "day",
    "homepage": "https://www.pinecone.io/",
    "desc": "Fully managed vector database for retrieval and agent memory.",
    "descZh": "全托管向量数据库，用于检索与智能体记忆。",
    "tags": [
      "vector-database",
      "rag",
      "serverless",
      "managed"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "P"
  },
  {
    "id": "weaviate",
    "name": "Weaviate",
    "nameZh": "Weaviate",
    "vendor": "Weaviate",
    "vendorZh": "Weaviate",
    "logo": "/assets/logos/weaviate.ico",
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building",
      "local-private"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "Pure vector search misses the exact keyword you needed. It runs keyword and vector search together in one query.",
    "solvesZh": "纯向量检索会漏掉你要的那个准确关键词。它在一次查询里同时跑关键词和向量检索。",
    "bestFor": "When data sovereignty rules out a managed vector store but you still want hybrid retrieval.",
    "bestForZh": "数据主权要求排除了托管式向量库、但又仍然需要混合检索的时候。",
    "released": "2021-01-14",
    "datePrecision": "day",
    "homepage": "https://weaviate.io/",
    "desc": "Open-source vector database with native hybrid keyword-vector search.",
    "descZh": "开源自托管向量数据库，原生支持关键词与向量混合检索。",
    "tags": [
      "vector-database",
      "hybrid-search",
      "open-source",
      "self-hosted"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "W"
  },
  {
    "id": "qdrant",
    "name": "Qdrant",
    "nameZh": "Qdrant",
    "vendor": "Qdrant",
    "vendorZh": "Qdrant",
    "logo": "/assets/logos/qdrant.png",
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building",
      "local-private"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "Vector search that ignores metadata hands back the wrong neighbours. It filters on structured fields inside the same query.",
    "solvesZh": "不管元数据的向量检索会返回不相关的邻居。它能在同一次查询里按结构化字段过滤。",
    "bestFor": "When your retrieval has to respect filters like tenant, date or user, not just similarity.",
    "bestForZh": "检索需要按租户、日期、用户这类条件过滤，而不只是看相似度的时候。",
    "released": "2021-01-01",
    "datePrecision": "month",
    "homepage": "https://qdrant.tech/",
    "desc": "Rust-based open-source vector search engine with rich payload filtering.",
    "descZh": "基于 Rust 的开源向量搜索引擎，支持丰富的元数据过滤。",
    "tags": [
      "vector-database",
      "rust",
      "filtering",
      "open-source"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "Q"
  },
  {
    "id": "synthesia",
    "name": "Synthesia",
    "nameZh": "Synthesia",
    "vendor": "Synthesia",
    "vendorZh": "Synthesia",
    "logo": "/assets/logos/synthesia.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Recording a training video means booking a presenter every time the policy changes. A script and an avatar produce the same video in an afternoon.",
    "solvesZh": "每次政策变动都要重新约人录培训视频。一份脚本加一个数字人，一个下午就能产出同样的视频。",
    "bestFor": "When the message must be consistent and translated, and nobody needs a real face.",
    "bestForZh": "当信息需要口径一致并且要多语言版本，而且不需要真人出镜。",
    "released": "2020-11-01",
    "datePrecision": "day",
    "homepage": "https://www.synthesia.io",
    "desc": "Enterprise avatar video platform for training and comms",
    "descZh": "面向企业培训与沟通的数字人视频平台，品类最早的商业化玩家",
    "tags": [
      "avatar",
      "enterprise",
      "video-generation"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "S"
  },
  {
    "id": "descript",
    "name": "Descript",
    "nameZh": "Descript",
    "vendor": "Descript",
    "vendorZh": "Descript",
    "logo": "/assets/logos/descript.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "audio-voice"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "Cutting a video means scrubbing a timeline frame by frame. Descript lets you cut by editing the transcript.",
    "solvesZh": "剪视频要在时间轴上一帧帧拖。Descript 让你改文字稿来完成剪辑。",
    "bestFor": "When you edit interviews, podcasts or talking-head video and know the words but not the frame numbers.",
    "bestForZh": "当你剪的是访谈、播客或口播视频，记得内容却不记得帧号。",
    "released": "2020-10-21",
    "datePrecision": "day",
    "homepage": "https://www.descript.com",
    "desc": "Edit audio and video by editing the transcript text",
    "descZh": "像改文字稿一样编辑音视频，代表了 AI 辅助创作的新交互范式",
    "tags": [
      "video-editing",
      "audio",
      "transcription"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "D"
  },
  {
    "id": "openai-api",
    "name": "OpenAI API",
    "nameZh": "OpenAI API",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "logo": "/assets/logos/openai.ico",
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Wiring up a model yourself means handling auth, retries, billing, and rate limits. Call these endpoints and it takes care of all of that.",
    "solvesZh": "自己接模型要处理鉴权、重试、计费和限流。直接调这套接口，这些事它替你扛。",
    "bestFor": "You are adding GPT, image, or voice capability to your own product.",
    "bestForZh": "你把自己的产品接上 GPT、绘图或语音能力时。",
    "released": "2020-06-17",
    "datePrecision": "day",
    "homepage": "https://platform.openai.com/",
    "desc": "Developer API platform powering GPT, DALL-E and Whisper workloads",
    "descZh": "OpenAI 开发者 API 平台，支撑 GPT、DALL-E 与 Whisper 等模型调用",
    "tags": [
      "api",
      "developer-platform",
      "foundation-models"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "O"
  },
  {
    "id": "surge-ai",
    "name": "Surge AI",
    "nameZh": "Surge AI",
    "vendor": "Surge AI",
    "vendorZh": "Surge AI",
    "logo": "/assets/logos/surge-ai.png",
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "agent-building"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Crowd workers produce agreeable, shallow answers, and training on them teaches a model to be agreeable and shallow. It sources domain experts instead.",
    "solvesZh": "众包标注员给出的答案往往讨好而浅薄，用它们训练只会教出同样讨好而浅薄的模型。Surge AI 找的是领域专家来做标注。",
    "bestFor": "When a frontier lab needs preference and RLHF data that a general crowd cannot produce.",
    "bestForZh": "当前沿实验室需要通用众包做不出来的偏好数据和 RLHF 数据时。",
    "released": "2020-01-01",
    "datePrecision": "month",
    "homepage": "https://www.surgehq.ai/",
    "desc": "Expert human feedback and RLHF data services for large labs.",
    "descZh": "面向大模型实验室的专家人类反馈与 RLHF 数据服务。",
    "tags": [
      "rlhf",
      "expert-annotators",
      "human-feedback",
      "preference-data"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "S"
  },
  {
    "id": "tl-dv",
    "name": "tl;dv",
    "nameZh": "tl;dv",
    "vendor": "tl;dv",
    "vendorZh": "tl;dv",
    "logo": "/assets/logos/tl-dv.ico",
    "region": "intl",
    "category": "meetings",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Nobody wants to sit through the recording again. It pulls the highlights out and pushes them to the CRM on its own.",
    "solvesZh": "没人想再把录像重看一遍。它自动挑出高光片段，再自己推送到 CRM。",
    "bestFor": "When calls happen all day and only the key moments are worth keeping.",
    "bestForZh": "会议一整天不断，只有关键片刻值得留下的时候。",
    "released": "2020-01-01",
    "datePrecision": "month",
    "homepage": "https://tldv.io",
    "desc": "Meeting recording with AI highlights and CRM sync",
    "descZh": "会议录制加 AI 高光片段提取，可同步到 CRM",
    "tags": [
      "meetings",
      "highlights",
      "crm"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "T"
  },
  {
    "id": "milvus",
    "name": "Milvus",
    "nameZh": "Milvus",
    "vendor": "Zilliz",
    "vendorZh": "Zilliz",
    "logo": "/assets/logos/zilliz.png",
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building",
      "local-private"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "A single-machine vector store stops answering at a few million rows. Milvus spreads the index across nodes instead.",
    "solvesZh": "单机向量库到几百万行就顶不住了。Milvus 把索引摊开到多个节点上。",
    "bestFor": "When your similarity search outgrew a local index and needs to pass a billion vectors.",
    "bestForZh": "当你的相似度检索已经超出本地索引的容量，需要扛住十亿级向量。",
    "released": "2019-11-01",
    "datePrecision": "day",
    "homepage": "https://milvus.io/",
    "desc": "Cloud-native distributed vector database for billion-scale similarity search.",
    "descZh": "云原生分布式向量数据库，面向十亿级相似度检索。",
    "tags": [
      "vector-database",
      "distributed",
      "open-source",
      "scale"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "M"
  },
  {
    "id": "fireflies-ai",
    "name": "Fireflies.ai",
    "nameZh": "Fireflies.ai",
    "vendor": "Fireflies.ai",
    "vendorZh": "Fireflies.ai",
    "logo": "/assets/logos/fireflies-ai.png",
    "region": "intl",
    "category": "meetings",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Nobody remembers what was said in the meeting. It records, transcribes and makes every call searchable later.",
    "solvesZh": "会上说过什么，事后没人记得。它会录制、转写，让每通电话之后都能搜到。",
    "bestFor": "When you sit in many calls and need to find what was decided weeks later.",
    "bestForZh": "经常参会，几周后还想找回当时定了什么的时候。",
    "released": "2019-10-01",
    "datePrecision": "day",
    "homepage": "https://fireflies.ai",
    "desc": "Meeting bot with searchable archive and 200+ integrations",
    "descZh": "会议机器人与可检索会议库，对接 200+ 应用",
    "tags": [
      "meetings",
      "bot",
      "integrations"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "F"
  },
  {
    "id": "remini",
    "name": "Remini",
    "nameZh": "Remini",
    "vendor": "Bending Spoons",
    "vendorZh": "Bending Spoons",
    "logo": "/assets/logos/bending-spoons.ico",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Old photos are blurry and scratched, and enlarging them only makes it worse. One click sharpens the faces, then upscales to something you can print.",
    "solvesZh": "老照片糊了、划痕重，一放大更看不清。一键把人脸补清楚，再放大到能打印。",
    "bestFor": "You want to restore old family photos, or enlarge a small image before using it.",
    "bestForZh": "你想修复家里的老照片，或者把小图放大再用。",
    "released": "2019-01-01",
    "datePrecision": "month",
    "homepage": "https://remini.ai/",
    "desc": "Restores and sharpens old or blurry photos in one tap.",
    "descZh": "一键修复和增强老照片、模糊照片的修图应用。",
    "tags": [
      "photo-restoration",
      "upscale",
      "one-tap",
      "viral-trend"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "R"
  },
  {
    "id": "labelbox",
    "name": "Labelbox",
    "nameZh": "Labelbox",
    "vendor": "Labelbox",
    "vendorZh": "Labelbox",
    "logo": "/assets/logos/labelbox.png",
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "The model is only as good as its labels, and the labels sit scattered across contractors and spreadsheets. You bring labelling and evaluation in-house.",
    "solvesZh": "模型的上限就是标注质量的上限，而标注散落在各家外包和一堆表格里。你把标注和评测收回自己内部做。",
    "bestFor": "When the training data has to stay inside the company and cannot go to an outside annotation vendor.",
    "bestForZh": "当训练数据必须留在公司内部、不能交给外部标注厂商时。",
    "released": "2018-07-01",
    "datePrecision": "day",
    "homepage": "https://labelbox.com/",
    "desc": "Data and evaluation platform enterprises operate themselves.",
    "descZh": "由企业自行运营的数据与模型评测平台。",
    "tags": [
      "annotation-platform",
      "model-evaluation",
      "self-operated",
      "enterprise"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "L"
  },
  {
    "id": "beautiful-ai",
    "name": "Beautiful.ai",
    "nameZh": "Beautiful.ai",
    "vendor": "Beautiful.ai",
    "vendorZh": "Beautiful.ai",
    "logo": "/assets/logos/beautiful-ai.ico",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Add one line of text and the title no longer fits, so you nudge boxes by hand. It re-flows the slide and the deck stops drifting off-brand.",
    "solvesZh": "加一行文字标题就放不下了，你只能手动挪框。它会重排整页，模板不再慢慢偏离规范。",
    "bestFor": "When someone else will keep editing the deck after you hand it over.",
    "bestForZh": "当你把这份 deck 交出去之后，还要由别人继续编辑。",
    "released": "2018-01-01",
    "datePrecision": "month",
    "homepage": "https://www.beautiful.ai/",
    "desc": "Slides that re-layout themselves as you edit the content.",
    "descZh": "内容一改，幻灯片排版自动跟着重排的演示工具。",
    "tags": [
      "slides",
      "auto-layout",
      "brand-consistency",
      "enterprise"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "B"
  },
  {
    "id": "replika",
    "name": "Replika",
    "nameZh": "Replika",
    "vendor": "Luka",
    "vendorZh": "Luka",
    "logo": "/assets/logos/luka.ico",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "There is no one to talk to at two in the morning. You shape the companion into whoever you want it to be.",
    "solvesZh": "凌晨两点没个人说话。你可以把这个陪伴对象塑造成你想要的任何样子。",
    "bestFor": "When you want a private conversation partner you can customise rather than a task tool.",
    "bestForZh": "想要一个能自定义的私密聊天对象，而不是一个干活的工具的时候。",
    "released": "2017-09-01",
    "datePrecision": "day",
    "homepage": "https://replika.com/",
    "desc": "AI companion you customize into a friend, partner, or mentor.",
    "descZh": "可自定义为朋友、恋人或导师的 AI 伴侣应用。",
    "tags": [
      "companion",
      "avatar",
      "voice-video",
      "memory"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "R"
  },
  {
    "id": "weights-biases",
    "name": "Weights & Biases",
    "nameZh": "Weights & Biases",
    "vendor": "W&B",
    "vendorZh": "W&B",
    "logo": "/assets/logos/w-b.png",
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "You changed the prompt and the output got worse, and nobody kept the run that proved it. Every version is tracked and sits side by side.",
    "solvesZh": "你改了 prompt，结果变差了，却没人留下能证明这一点的运行记录。Weights & Biases 把每个版本都记录下来并排放在一起。",
    "bestFor": "When you need to prove which prompt or model version actually produced a result.",
    "bestForZh": "当你要证明某个结果究竟是由哪个 prompt 或哪版模型产生时。",
    "released": "2017-07-01",
    "datePrecision": "day",
    "homepage": "https://wandb.ai",
    "desc": "Experiment tracking that expanded from ML into LLM apps",
    "descZh": "从机器学习实验追踪扩展到 LLM 应用的平台，2025 年被 CoreWeave 收购",
    "tags": [
      "experiment-tracking",
      "mlops",
      "enterprise"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "W"
  },
  {
    "id": "scale-ai",
    "name": "Scale AI",
    "nameZh": "Scale AI",
    "vendor": "Scale AI",
    "vendorZh": "Scale AI",
    "logo": "/assets/logos/scale-ai.svg",
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "agent-building"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "Post-training a model needs rated human answers, and a lab has neither the people nor the process. Scale supplies both.",
    "solvesZh": "模型后训练需要人工评分过的答案，而实验室既缺人也缺流程。Scale 两样都提供。",
    "bestFor": "When you are training or evaluating a model and need human judgement at volume.",
    "bestForZh": "当你在训练或评测模型，需要成规模的人工判断。",
    "released": "2016-06-01",
    "datePrecision": "day",
    "homepage": "https://scale.com/",
    "desc": "Human data, RLHF and model evaluation services for frontier labs.",
    "descZh": "为前沿实验室提供人类数据、RLHF 与模型评测服务。",
    "tags": [
      "data-annotation",
      "rlhf",
      "model-evaluation",
      "human-data"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "S"
  },
  {
    "id": "otter-ai",
    "name": "Otter.ai",
    "nameZh": "Otter.ai",
    "vendor": "Otter.ai",
    "vendorZh": "Otter.ai",
    "logo": "/assets/logos/otter-ai.png",
    "region": "intl",
    "category": "meetings",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Nobody remembers what was decided in the meeting, and the recording is 50 minutes long. It transcribes live and hands you the summary.",
    "solvesZh": "会开完没人记得定了什么，而录音有 50 分钟长。它实时转写，散会时把纪要直接交给你。",
    "bestFor": "When you sit in back-to-back calls and need the recap written before you have left the room.",
    "bestForZh": "当你连着开会，需要在走出会议室之前就拿到写好的纪要时。",
    "released": "2016-05-01",
    "datePrecision": "day",
    "homepage": "https://otter.ai",
    "desc": "Long-running meeting transcription and summary service",
    "descZh": "会议转录与纪要领域最长寿的服务之一，用户基数庞大",
    "tags": [
      "meetings",
      "transcription",
      "enterprise"
    ],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "O"
  }
]
}

export default productHub

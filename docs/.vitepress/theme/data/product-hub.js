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
          "fireflies-ai",
          "granola",
          "lindy",
          "mem",
          "microsoft-copilot",
          "otter-ai",
          "qianwen",
          "tana",
          "tl-dv",
          "zoom-ai-companion"
        ],
        "productCount": 11
      },
      {
        "id": "writing",
        "label": "Writing & drafting",
        "labelZh": "写作与起草",
        "weight": 3,
        "productIds": [
          "amazon-quick-suite",
          "gamma",
          "gemini-in-google-docs-and-sheets",
          "genspark",
          "microsoft-365-copilot",
          "notion-ai",
          "quark",
          "wps-ai"
        ],
        "productCount": 8
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
          "otter-ai",
          "p2061",
          "p2265"
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
          "gamma",
          "gemini-in-google-docs-and-sheets",
          "genspark",
          "presentations-ai",
          "qianwen",
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
          "fireflies-ai",
          "flowise",
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
          "manus"
        ],
        "productCount": 4
      },
      {
        "id": "framework",
        "label": "Code framework / SDK",
        "labelZh": "代码框架 / SDK",
        "weight": 2,
        "productIds": [
          "agentforce",
          "cartesia",
          "claude-api",
          "coze-space",
          "crewai",
          "exa",
          "flowise",
          "frontier",
          "gemini-enterprise",
          "glean",
          "grok-build",
          "langchain",
          "lindy",
          "llamaindex",
          "microsoft-copilot-studio",
          "minimax-agent",
          "mistral-studio",
          "nvidia-nemo",
          "p2061",
          "pinecone",
          "relevance-ai",
          "tiangong-agent",
          "yuanqi",
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
          "kimi",
          "metaso-search",
          "microsoft-copilot",
          "nami-search",
          "notebooklm",
          "perplexity",
          "phind",
          "qianwen",
          "quark",
          "tavily",
          "you-com"
        ],
        "productCount": 19
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
          "kimi",
          "llamaindex",
          "metaso-search",
          "microsoft-copilot",
          "nami-search",
          "notebooklm",
          "perplexity",
          "phind",
          "qianwen",
          "quark",
          "tavily",
          "you-com"
        ],
        "productCount": 20
      },
      {
        "id": "document-qa",
        "label": "Ask your own documents",
        "labelZh": "问自己的文档",
        "weight": 2,
        "productIds": [
          "atlassian-rovo",
          "glean",
          "llamaindex",
          "notebooklm",
          "notion-ai",
          "p2061",
          "p2265",
          "quark"
        ],
        "productCount": 8
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
          "github-copilot",
          "google-antigravity",
          "lingma-ai-ide",
          "qoder",
          "roo-code",
          "trae",
          "windsurf",
          "zed"
        ],
        "productCount": 11
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
          "trae",
          "warp"
        ],
        "productCount": 23
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
          "greptile"
        ],
        "productCount": 4
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
          "baidu-qianfan",
          "bigmodel",
          "claude-api",
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
          "siliconflow",
          "stepfun-platform",
          "together-ai",
          "vercel-ai-sdk",
          "volcengine-ark",
          "xai-api"
        ],
        "productCount": 20
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
          "krea",
          "midjourney",
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
          "grok-imagine",
          "higgsfield",
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
          "minicpm",
          "mlx"
        ],
        "productCount": 3
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
          "luma-dream-machine",
          "p8719",
          "pika",
          "premiere-pro-generative-extend",
          "runway",
          "sora",
          "synthesia",
          "vidu"
        ],
        "productCount": 14
      },
      {
        "id": "video-editing",
        "label": "Editing existing footage",
        "labelZh": "剪辑已有素材",
        "weight": 3,
        "productIds": [
          "descript",
          "google-flow",
          "runway"
        ],
        "productCount": 3
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
          "higgsfield",
          "keling",
          "krea",
          "luma-dream-machine",
          "pika",
          "runway",
          "sora"
        ],
        "productCount": 9
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
          "nvidia-nemo",
          "weights-biases"
        ],
        "productCount": 7
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
          "nvidia-nemo",
          "weights-biases"
        ],
        "productCount": 7
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
    "solves": "Work that dies when you close the tab. A dot runs on its own cloud computer across ChatGPT, Slack, and Teams, and does read-only research while you're away.",
    "solvesZh": "关掉标签页，活就停了。dot 有自己的云端电脑，在 ChatGPT、Slack、Teams 里都能找得到它；你不在时它做的是只读的调研。",
    "bestFor": "Work that runs for hours and does not need you watching the chat.",
    "bestForZh": "那种要跑上几小时、又不需要你一直守着对话框的活。",
    "released": "2026-09-29",
    "datePrecision": "day",
    "homepage": "https://openai.com/index/introducing-dots/",
    "desc": "An agent with its own cloud computer, reachable in Slack.",
    "descZh": "自带云端电脑、在 Slack 里也找得到你的常驻智能体。",
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
    "solves": "An errand is mostly logging in and clicking. Muse uses your existing accounts to do that part.",
    "solvesZh": "一件杂事，大部分时间花在登录和点击上。Muse 用你已有的账号把这一段做掉。",
    "bestFor": "Shopping and email you would otherwise click through yourself.",
    "bestForZh": "购物、邮件这类你本来要点点点完成的事。",
    "released": "2026-09-08",
    "datePrecision": "day",
    "homepage": "https://www.meta.com/ai/",
    "desc": "Meta's consumer agent that acts using your own accounts.",
    "descZh": "会调用你的账号、替你办事的个人智能体",
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
    "solves": "A job that crosses roles has to be held together by whoever assigned it. 万有无界 hands the same job to several digital employees in turn.",
    "solvesZh": "跨岗位的活要靠派活的人一路盯着才不断线。万有无界把同一件事交给几个数字员工接力。",
    "bestFor": "A cross-role assignment you would rather hand to a chain of agents.",
    "bestForZh": "一件跨岗位的活，交给一串智能体接力比派人盯着省事。",
    "released": "2026-09-02",
    "datePrecision": "day",
    "homepage": "https://work.wanyo.cn/",
    "desc": "Alibaba's multi-agent workbench for handing off a job",
    "descZh": "阿里的多智能体协作工作台",
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
    "solves": "Analyzing a folder of spreadsheets means uploading it to a web page and downloading the result back. Raccoon reads the files where they sit.",
    "solvesZh": "分析一整个文件夹的表格，要先上传到网页、再把结果下载回来。小浣熊直接读本机的文件。",
    "bestFor": "When the material cannot go up to a public site, and you still want it summarized.",
    "bestForZh": "当材料不适合上传到公网，又确实需要有人读完并给出结论。",
    "released": "2026-08-25",
    "datePrecision": "day",
    "homepage": "https://www.xiaohuanxiong.com/",
    "desc": "SenseTime's desktop agent that reads local files",
    "descZh": "能直接读本机文件的商汤桌面智能体",
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
    "solves": "Terminal only, and macOS. Inside that limit it reads and edits across files without a browser in the loop.",
    "solvesZh": "只在终端里用，且只支持 macOS。在这个范围内它能跨文件读写，不必再开浏览器。",
    "bestFor": "A coding agent you drive from the shell, without leaving it.",
    "bestForZh": "想从 shell 里驱动编码 Agent，又不打算离开 shell。",
    "released": "2026-08-01",
    "datePrecision": "day",
    "homepage": "https://ai.meta.com/",
    "desc": "Meta's terminal coding agent, built on Muse Spark.",
    "descZh": "Meta 基于 Muse Spark 的终端编程智能体",
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
    "solves": "A firm wants AI for its team and has nobody to run it. Agents execute in 360's isolated cloud sandbox; your code and data stay on your side.",
    "solvesZh": "公司想给团队上 AI，却没人运维。智能体跑在 360 的隔离云沙箱里，你的代码和数据留在你这一侧。",
    "bestFor": "You run a small business, want AI for your team, and won't stand up servers.",
    "bestForZh": "中小企业主想给团队开 AI，但不想自己搭服务器运维。",
    "released": "2026-07-28",
    "datePrecision": "day",
    "homepage": "https://www.360.cn/",
    "desc": "360's agent platform for small and mid-sized businesses.",
    "descZh": "360 面向中小企业的智能体平台。",
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
    "solves": "Every vendor ships its own request shape. These model families come through an OpenAI-compatible endpoint, so the adapter already written keeps working.",
    "solvesZh": "每家厂商的请求格式都不一样。这几个模型家族走兼容 OpenAI 的接口，已经写好的适配层还能继续用。",
    "bestFor": "You already speak the OpenAI API and want Meta's models without new glue.",
    "bestForZh": "已经熟悉 OpenAI API，想用 Meta 的模型又不想再写适配层。",
    "released": "2026-07-09",
    "datePrecision": "day",
    "homepage": "https://ai.meta.com/",
    "desc": "OpenAI-compatible API for Meta's open models.",
    "descZh": "Meta 面向开发者的模型接口",
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
    "solves": "Copilot Cowork runs long multi-tool jobs to completion and returns results, not drafts.",
    "solvesZh": "Copilot Cowork 把多工具的长任务整个跑完，交回来的是结果，不是草稿。",
    "bestFor": "When the deliverable is the point — a flow chart, a ranked list, a finished draft.",
    "bestForZh": "当要的本身就是那份成品——流程图、排好序的清单、写完的稿子。",
    "released": "2026-06-16",
    "datePrecision": "day",
    "homepage": "https://www.microsoft.com/en-us/microsoft-365/blog/2026/06/16/copilot-cowork-is-now-generally-available",
    "desc": "Microsoft 365 Copilot mode that returns finished deliverables",
    "descZh": "Microsoft 365 Copilot 里直接交付成品的模式",
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
    "solves": "Every new conversation means re-explaining the project, and requirements still have to be typed. MiMo Code keeps the project in memory and takes spoken instructions.",
    "solvesZh": "换个会话就得把项目重讲一遍，需求还得手打。MiMo Code 记着项目，还能听你说话下指令。",
    "bestFor": "One long-running project, and no interest in restating its context every session.",
    "bestForZh": "长期做同一个项目，不想每次都重述一遍上下文。",
    "released": "2026-06-11",
    "datePrecision": "day",
    "homepage": "https://mimo.mi.com/docs/zh-CN/news/latest/mimocode",
    "desc": "Xiaomi's open-source terminal coding agent.",
    "descZh": "小米开源的终端 AI 编程助手。",
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
    "solves": "Chat, research and code living in separate assistants means every switch drops your context. Vibe is one agent that does all three.",
    "solvesZh": "聊天、查资料、写代码分在不同助手，每次切换都丢上下文。Vibe 把三件事收进同一个智能体。",
    "bestFor": "You want one assistant that handles office chat and also writes code.",
    "bestForZh": "你要的是一个助手，既能处理办公对话，也能直接写代码。",
    "released": "2026-05-28",
    "datePrecision": "day",
    "homepage": "https://mistral.ai/vibe",
    "desc": "Mistral's agent for work and code, formerly Le Chat.",
    "descZh": "Mistral 面向办公与编程的智能体，原名 Le Chat。",
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
    "solves": "One agent working serially is the bottleneck on a large task. The work splits, and the agents run in parallel.",
    "solvesZh": "大任务上，一个智能体串行干活就是瓶颈。活被拆开，多个智能体并行跑。",
    "bestFor": "When the task is big enough that starting many agents beats watching one grind.",
    "bestForZh": "当任务大到与其盯着一个磨，不如一次开多个智能体时。",
    "released": "2026-05-25",
    "datePrecision": "day",
    "homepage": "https://grok.com/",
    "desc": "Terminal coding agent that fans work across parallel agents",
    "descZh": "在终端里把任务分给多个智能体并行的编程工具",
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
    "desc": "01.AI's enterprise platform for multi-agent model deployments.",
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
    "solves": "Every team wires agents its own way, and nobody can say who was allowed to touch production. Building, permissions and run history end up in one place.",
    "solvesZh": "每个团队自己接一套 Agent，事后没人说得清谁有权动生产环境。构建、权限和运行记录收到一处。",
    "bestFor": "Past a handful of internal agents, when someone will eventually ask who changed what.",
    "bestForZh": "当内部 Agent 超过几个，总有一天要回答是谁改了什么。",
    "released": "2026-04-22",
    "datePrecision": "day",
    "homepage": "https://cloud.google.com/gemini-enterprise",
    "desc": "Google Cloud's platform for enterprise agents",
    "descZh": "Google Cloud 面向企业 Agent 的构建与治理平台",
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
    "solves": "A general model knows nothing about your corpus or your rules, so you assemble the dataset and the eval yourself. Forge covers training through deployment.",
    "solvesZh": "通用模型不懂你的语料和规矩，语料和评测都得自己准备。Forge 把从训练到上线收在一处。",
    "bestFor": "You need a model that serves your organisation alone and can justify its answers.",
    "bestForZh": "你要一个只服务自己机构、并且说得清依据的模型。",
    "released": "2026-03-17",
    "datePrecision": "day",
    "homepage": "https://mistral.ai/forge",
    "desc": "Customize, fine-tune and deploy your own models.",
    "descZh": "定制、微调并部署你自己的模型。",
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
    "solves": "General coding models handle HarmonyOS badly. CodeArts trained a model on Huawei's own HarmonyOS code, and states it does not store your code.",
    "solvesZh": "通用编码模型写鸿蒙代码总差一口气。CodeArts 用华为的研发数据持续训练了鸿蒙增训模型，并声明不存用户代码。",
    "bestFor": "Teams under a compliance rule that keeps code inside the network, or building for HarmonyOS.",
    "bestForZh": "当合规要求代码不出网，或者你正要写鸿蒙应用的时候。",
    "released": "2026-02-26",
    "datePrecision": "day",
    "homepage": "https://www.huaweicloud.com/product/codearts/ai.html",
    "desc": "Huawei Cloud's enterprise coding agent, tuned for HarmonyOS",
    "descZh": "华为云的企业级编码 Agent，鸿蒙代码增训",
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
    "desc": "Cloud agent you deploy with one click in the browser.",
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
    "solves": "Dozens of assistants built by different departments, none of them visible to security or to each other. Frontier is where they get built, run, and governed.",
    "solvesZh": "各部门搭了几十个助手，安全部门看不见，彼此也看不见。Frontier 是统一搭建、运行和管控的地方。",
    "bestFor": "Several teams ship their own agents and need one inventory and one set of rules.",
    "bestForZh": "多个团队各自上线智能体，需要一份统一清单和一套统一规则。",
    "released": "2026-02-05",
    "datePrecision": "day",
    "homepage": "https://openai.com/frontier/",
    "desc": "OpenAI's platform for building and governing enterprise agents.",
    "descZh": "OpenAI 用来搭建和管控企业智能体的平台。",
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
    "solves": "Ordering takeout, booking a hotel — separate apps and a lot of typing. State the need and a digital human does the comparing and the order.",
    "solvesZh": "点外卖、订酒店要开好几个 App，一步步填单。说清需求，数字人替你比完再下单。",
    "bestFor": "Buying something routine that would otherwise mean searching, comparing prices and typing an address.",
    "bestForZh": "买一件日常的东西，而原本要翻找、比价、填地址才能下单。",
    "released": "2026-02-05",
    "datePrecision": "day",
    "homepage": "https://joy.jd.com/",
    "desc": "JD's voice-first shopping assistant with a digital human",
    "descZh": "京东的语音购物助手，配一个数字人",
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
    "solves": "It is a surface inside Grok rather than a separate app. Images and video generate from the same conversation, and the same models sit behind an API.",
    "solvesZh": "它是 Grok 里的一个界面，不是独立应用。图像和视频都在同一段对话里生成，同样的模型也开放成 API。",
    "bestFor": "When you are mid-conversation and want to see the picture rather than describe it.",
    "bestForZh": "当聊天正进行到一半，你想直接看到画面而不是描述它时。",
    "released": "2026-01-28",
    "datePrecision": "day",
    "homepage": "https://grok.com/",
    "desc": "xAI's image and video generation, also on the Imagine API",
    "descZh": "xAI 的图像与视频生成，同时开放 Imagine API",
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
    "solves": "Choosing a restaurant means scrolling, comparing and opening another app. Asking inside Meituan gets the answer and the order in one place.",
    "solvesZh": "选一家餐厅要翻列表、做比较、再跳到别的 App。在美团里问，答案和下单在同一处。",
    "bestFor": "Deciding where to eat tonight and placing the order without leaving the app.",
    "bestForZh": "今晚吃什么想当场定下来，订单也不想跳出美团去做。",
    "released": "2026-01-22",
    "datePrecision": "day",
    "homepage": "https://www.meituan.com/",
    "desc": "Meituan's assistant for local services and ordering",
    "descZh": "美团内的本地生活 AI 决策助手",
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
    "solves": "Agents are walled inside their own interface, and data lives on someone else's server. OpenClaw runs on your machine and answers on WhatsApp, Telegram, Discord, Slack, or Signal.",
    "solvesZh": "智能体被关在自己的界面里，数据放在别人的服务器上。OpenClaw 跑在你自己机器上，在 WhatsApp、Telegram、Discord、Slack、Signal 里都能指挥。",
    "bestFor": "You want the agent on your own hardware, driven from a chat app you already use.",
    "bestForZh": "你要智能体跑在自己的硬件上，用平时就在用的聊天软件指挥它。",
    "released": "2026-01-15",
    "datePrecision": "day",
    "homepage": "https://openclaw.ai/",
    "desc": "Open-source assistant running on your machine, driven from chat.",
    "descZh": "跑在自己机器上、从聊天软件里指挥的开源助手。",
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
    "solves": "A workspace bot starts from zero every time you ask. Slackbot keeps the tone and the context, so the second ask is not a re-brief.",
    "solvesZh": "工作区里的助手，每次都要从头交代一遍。Slackbot 记住语气和上下文，第二次问不必重讲。",
    "bestFor": "A personal agent in Slack that already knows your projects and how you write.",
    "bestForZh": "想要一个已经了解你项目和你文风的 Slack 个人助手。",
    "released": "2026-01-13",
    "datePrecision": "day",
    "homepage": "https://slack.com/features/ai",
    "desc": "A personal agent that lives inside Slack.",
    "descZh": "住在 Slack 里的个人智能体",
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
    "solves": "Name the goal and the folders it may touch. It works across them, on a schedule, after you close the laptop.",
    "solvesZh": "你给目标，也指定它能动哪些文件夹。它就在这些文件里干活，关掉电脑后按计划继续。",
    "bestFor": "Work that is a pile of file operations, where reading the result matters more than doing it.",
    "bestForZh": "一堆文件操作，做完要的是审一遍结果，而不是亲手点。",
    "released": "2026-01-12",
    "datePrecision": "day",
    "homepage": "https://www.anthropic.com/product/claude-cowork",
    "desc": "Agent that works across your chosen folders on a schedule",
    "descZh": "只能碰你指定文件夹的桌面端 Agent，2026-09 并入 Claude",
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
    "solves": "One agent means one thing at a time, and a slow one holds the line. The Agent Manager runs several local agents in parallel in one window.",
    "solvesZh": "一个 Agent 只能干一件事，慢的还会把后面全堵住。Agent Manager 在一个窗口里并行跑多个本地 Agent。",
    "bestFor": "Three tasks at once, without three editor windows and three sets of context.",
    "bestForZh": "当你想同时推进三件事，又不想开三个编辑器窗口。",
    "released": "2025-11-18",
    "datePrecision": "day",
    "homepage": "https://antigravity.google/",
    "desc": "Agent-first IDE that runs several agents in parallel",
    "descZh": "智能体优先的 IDE，一个视图里并行跑多个 Agent",
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
    "solves": "Search, read a page, draft the deck and take the minutes are four apps. 千问 does all four in one chat box.",
    "solvesZh": "搜索、读网页、做 PPT、录音转纪要，原本是四个应用。千问在一个对话框里做完。",
    "bestFor": "Looking things up and producing a document or slides in the same place.",
    "bestForZh": "一边查资料，一边要在同一处产出文档或演示稿。",
    "released": "2025-11-17",
    "datePrecision": "day",
    "homepage": "https://qianwen.com",
    "desc": "Alibaba's assistant, with search, slides and notes",
    "descZh": "阿里官方的 AI 助手，前身是通义",
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
    "solves": "An assistant that only exists inside an IDE leaves the shell out. This one is built for the terminal.",
    "solvesZh": "只在 IDE 里存在的助手，终端就用不上。这个工具是为终端做的。",
    "bestFor": "Preferring a model that edits code in the shell to one you click through.",
    "bestForZh": "习惯在终端里让模型改代码，而不是在 IDE 里一路点。",
    "released": "2025-10-27",
    "datePrecision": "day",
    "homepage": "https://code.minimax.io",
    "desc": "MiniMax coding tool for the terminal",
    "descZh": "MiniMax 的命令行与桌面编码工具",
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
    "solves": "Twenty tabs open and the answer somewhere in all of them. It read those pages for you, until OpenAI shut it down on 2026-04-26.",
    "solvesZh": "开二十个标签页，答案散在每一个里。它替你读完，但 2026 年 4 月整个产品被关停。",
    "bestFor": "Nothing to open now — worth reading as a data point on the AI browser bet.",
    "bestForZh": "现在已经没有产品可用了，可以当作 AI 浏览器这一赌注的案例读。",
    "released": "2025-10-22",
    "datePrecision": "day",
    "homepage": "https://openai.com/index/introducing-chatgpt-atlas/",
    "desc": "OpenAI's ChatGPT-native browser, discontinued April 2026.",
    "descZh": "OpenAI 基于 ChatGPT 的浏览器，2026 年 4 月已停服。",
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
    "solves": "A business question rarely lives in one tool. Quick connects Slack, Jira, Salesforce and Microsoft 365, and non-engineers can build the intake form or tracker themselves.",
    "solvesZh": "一个业务问题很少只落在一个工具里。Quick 接上 Slack、Jira、Salesforce 和 Microsoft 365，非工程岗也能自己搭表单。",
    "bestFor": "When the answer needs numbers from several SaaS tools and the person asking does not write code.",
    "bestForZh": "当答案要横跨几个 SaaS 工具，而提问的人不写代码。",
    "released": "2025-10-09",
    "datePrecision": "day",
    "homepage": "https://aws.amazon.com/quicksuite/",
    "desc": "AWS agentic workspace for business users",
    "descZh": "面向业务人员的 AWS 智能体工作台",
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
    "solves": "The answer is spread across twelve open tabs and you would have to read every one. Dia reads the pages you have open and answers across them.",
    "solvesZh": "答案散在十二个开着的标签页里，你得挨个读。Dia 直接读你打开的页面，跨页给你一个答案。",
    "bestFor": "Research already piled up in tabs, and you want it read in one pass.",
    "bestForZh": "研究已经攒下一堆标签页，想让 AI 一次读完再给结论。",
    "released": "2025-10-08",
    "datePrecision": "day",
    "homepage": "https://www.diabrowser.com/",
    "desc": "AI browser that surfaces answers without being asked.",
    "descZh": "会主动给答案的 AI 浏览器。",
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
    "solves": "Everything gets written down and none of it can be found again. Mem links notes to related ones on its own, so recall stops depending on the title you picked.",
    "solvesZh": "什么都记下来，却再也找不到。Mem 自己把笔记互相关联，找东西不再取决于当时起的标题。",
    "bestFor": "When you keep a notes app and only ever search inside it.",
    "bestForZh": "当你有个笔记应用，却只在里面翻来翻去找东西。",
    "released": "2025-10-01",
    "datePrecision": "day",
    "homepage": "https://get.mem.ai",
    "desc": "Self-organising notes that connect themselves",
    "descZh": "自动归类并互相关联的 AI 笔记",
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
    "solves": "An agent that misbehaves only tells you after it ships. Studio runs the flow while you build, shows the evaluation, and lets you re-run any step's inputs.",
    "solvesZh": "智能体哪里不对，往往上线后才知道。Studio 让你边搭边跑、看评估结果，还能重跑任意一步的输入。",
    "bestFor": "Tuning an agent flow where you need to replay the same step fifty times.",
    "bestForZh": "调一条智能体流程，需要把同一步来回重跑几十遍的时候。",
    "released": "2025-10-01",
    "datePrecision": "day",
    "homepage": "https://mistral.ai/studio",
    "desc": "Workbench for building, testing and running agents.",
    "descZh": "用来搭建、调试和运行智能体的开发工作台。",
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
    "solves": "An agent that holds your logins can act on any site you open — which is also why sending that session to a server is hard to accept. Neon runs the model on your machine.",
    "solvesZh": "掌握你登录态的 Agent 能在你打开的站点上动手——也正因如此，把会话送到服务器很难让人放心。Neon 把模型跑在本机。",
    "bestFor": "When you want an agent to act on web apps and the session should not leave the machine.",
    "bestForZh": "当你想让 Agent 操作网页应用，又希望会话不离开本机。",
    "released": "2025-09-30",
    "datePrecision": "day",
    "homepage": "https://www.opera.com/neon/",
    "desc": "Subscription browser with an agent that runs locally",
    "descZh": "本地跑 Agent 模型的订阅制浏览器",
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
    "solves": "A chat assistant only speaks when you open it, so what you never thought to ask is never covered. Pulse researches overnight and delivers a morning digest.",
    "solvesZh": "助手只在你打开它时才开口，所以没想到问的就永远不会被提。Pulse 夜里自己去查，早上送来一份简报。",
    "bestFor": "You want a short daily digest, and accept that a preview will sometimes miss.",
    "bestForZh": "你想要一份每日短简报，也接受它作为预览版偶尔跑偏。",
    "released": "2025-09-25",
    "datePrecision": "day",
    "homepage": "https://openai.com/index/introducing-chatgpt-pulse/",
    "desc": "A daily briefing it researches for you each night.",
    "descZh": "夜里自己去查资料、清早推给你的一份每日简报。",
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
    "solves": "Edit mode proposes changes and leaves the commands to you. Agent mode carries the subtask across files, runs the commands, and self-heals on errors.",
    "solvesZh": "编辑模式只提出改动，命令还得你自己敲。智能体模式跨文件推进子任务、跑命令，遇到运行时报错会自己修。",
    "bestFor": "A change that spans files and needs build or test cycles run in a loop.",
    "bestForZh": "当改动横跨多个文件，而且需要构建或测试循环跑起来时。",
    "released": "2025-09-01",
    "datePrecision": "month",
    "homepage": "https://github.blog/news-insights/product-news/github-copilot-agent-mode-activated/",
    "desc": "Copilot mode that carries a change across files and commands",
    "descZh": "跨文件跨命令完成一次改动的 Copilot 模式",
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
    "solves": "Choosing a coding model, wiring it into an editor and pointing it at a repo is the slow part. Qoder is an IDE with one already chosen.",
    "solvesZh": "选编码模型、接进编辑器、指到仓库上，这几步最耗时间。Qoder 直接是一个 IDE，模型已经定了。",
    "bestFor": "Wanting a self-contained coding editor instead of a plugin inside another one.",
    "bestForZh": "想要一个自成一体的编码编辑器，而不是装在别人编辑器里的插件。",
    "released": "2025-08-22",
    "datePrecision": "day",
    "homepage": "https://qoder.com",
    "desc": "Autonomous development IDE with coding agents inside",
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
    "solves": "What you know about a customer is spread across chats, docs, and meetings. Smart summaries turn it into a weekly digest you can search.",
    "solvesZh": "关于一个客户的信息散落在聊天、文档和会议里。智能总结把这些线索汇成可检索的每周简报。",
    "bestFor": "Sales and service teams whose customer history lives in WeCom conversations and meetings.",
    "bestForZh": "客户历史都留在企业微信会话里的销售和服务团队。",
    "released": "2025-08-20",
    "datePrecision": "day",
    "homepage": "https://work.weixin.qq.com/nl/index/aioffice",
    "desc": "WeCom feature that turns scattered threads into a weekly digest.",
    "descZh": "把散落的客户线索汇成周报的企业微信功能。",
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
    "solves": "Hand it homework and it hands back the finished answer, which teaches nothing. Study mode asks you back and offers hints. OpenAI says it is inconsistent across conversations.",
    "solvesZh": "把作业丢进去，它把做完的答案还给你。 学习模式反过来问你、给提示；OpenAI 说它在不同对话里表现并不稳定。",
    "bestFor": "Homework, an exam coming up, or a concept you have failed to grasp three times.",
    "bestForZh": "写作业、准备考试，或者一个你已经啃了三次还没懂的概念。",
    "released": "2025-07-29",
    "datePrecision": "day",
    "homepage": "https://openai.com/index/chatgpt-study-mode/",
    "desc": "Tutoring mode: Socratic questions and hints, not answers.",
    "descZh": "用反问和提示带着你走的辅导模式，不直接给答案。",
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
    "solves": "Agent coding billed by token runs out mid-task. A subscription buys credits instead — Lite 2,000 per five hours, Max 28,000 — refreshing five hours after use.",
    "solvesZh": "按 token 计费的编码 Agent 常干到一半就断。订阅换额度：Lite 每 5 小时 2000，Pro 12000，Max 28000，用后 5 小时刷新。",
    "bestFor": "Running GLM in Claude Code, TRAE or CodeBuddy, where predictable cost matters more than the cheapest token.",
    "bestForZh": "在 Claude Code、TRAE 或 CodeBuddy 里跑 GLM 时，需要的是成本可预期，而不是最便宜的 token。",
    "released": "2025-07-28",
    "datePrecision": "day",
    "homepage": "https://bigmodel.cn/glm-coding-plan",
    "desc": "Monthly GLM subscription sold as coding credits",
    "descZh": "把 GLM 用量打包成额度的编码订阅",
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
    "solves": "Same assistant in the editor and in the terminal, so a fix does not stop at the IDE window.",
    "solvesZh": "编辑器和终端里是同一个助手，改一处不用只顾着 IDE 那一侧。",
    "bestFor": "A team on Tencent Cloud whose work spans an IDE and a shell.",
    "bestForZh": "团队用腾讯云的技术栈，工作又横跨编辑器和命令行。",
    "released": "2025-07-22",
    "datePrecision": "day",
    "homepage": "https://copilot.tencent.com",
    "desc": "Tencent Cloud coding assistant for IDE and terminal",
    "descZh": "腾讯云的编码助手，IDE 与命令行都有",
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
    "solves": "Booking, comparing, ordering, form-filling — all of it is clicking. It opens the browser and works through your own logged-in accounts.",
    "solvesZh": "订票、比价、下单、填表，本质上都是点。它自己开浏览器，用你已登录的账号一步步做完。",
    "bestFor": "A chain of online steps that would otherwise be twenty separate clicks.",
    "bestForZh": "那种本来要点二十多下的线上流程，交给它跑完。",
    "released": "2025-07-17",
    "datePrecision": "day",
    "homepage": "https://chatgpt.com",
    "desc": "Agent mode that drives a browser and your connected apps.",
    "descZh": "能自己开浏览器、用你账号干活的智能体模式。",
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
    "desc": "Moonshot's coding agent, available as a CLI and IDE plugin.",
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
    "solves": "The research sits in one tab, the form in another, and you are the one shuttling data between them. The assistant acts across tabs instead.",
    "solvesZh": "资料在一个标签页，表单在另一个，来回复制粘贴的是你。换成助手跨标签页直接操作。",
    "bestFor": "When a task needs you to read, compare, and fill in a form across several sites.",
    "bestForZh": "当一个任务需要你在几个网站之间读、比、再填表时。",
    "released": "2025-07-09",
    "datePrecision": "day",
    "homepage": "https://www.perplexity.ai/comet",
    "desc": "Free AI browser whose assistant acts across tabs",
    "descZh": "免费 AI 浏览器，助手可跨标签页直接操作",
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
    "solves": "One model call, one file read, one guess at the shape of the repo. The CLI sends the repository, plans, edits and reruns from the shell.",
    "solvesZh": "一次模型调用、读一个文件、猜一次仓库结构。CLI 在终端里把整个仓库交出去，再自己跑回来改。",
    "bestFor": "Work that already lives in the terminal, where opening a second editor is a tax.",
    "bestForZh": "当活本来就在终端里，再开一个编辑器是笔额外开销。",
    "released": "2025-06-25",
    "datePrecision": "day",
    "homepage": "https://geminicli.com/",
    "desc": "Google's open-source agent that works in the shell",
    "descZh": "Google 开源终端编码 Agent，直接在 shell 里干活",
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
    "solves": "The Figma file lands in a developer's queue and the layout gets rebuilt by hand, line by line. Drop the file in and it writes the page.",
    "solvesZh": "设计稿到了开发手里，布局要靠手一行行还原。把文件拖进去，它直接写出页面代码。",
    "bestFor": "When a Figma file has to become a running page, and design-to-code is the bottleneck.",
    "bestForZh": "当一份 Figma 稿要变成能跑的页面，卡点就在设计转代码这一步。",
    "released": "2025-06-23",
    "datePrecision": "day",
    "homepage": "https://comate.baidu.com/",
    "desc": "A standalone AI-native IDE with Figma-to-code",
    "descZh": "带设计稿转代码的独立 AI 原生 IDE",
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
    "solves": "An agent that runs unattended still needs models chosen, orchestration written and failures handled. The platform arrives with those set.",
    "solvesZh": "一个能自己跑起来的智能体，模型要选、编排要写、异常要兜。这三样平台已经配好。",
    "bestFor": "Shipping a general-purpose agent without hand-building the runtime underneath it yourself first.",
    "bestForZh": "要上线一个通用智能体，但不想自己搭底层运行时。",
    "released": "2025-06-19",
    "datePrecision": "day",
    "homepage": "https://agent.minimaxi.com",
    "desc": "MiniMax's platform for building general-purpose agents",
    "descZh": "MiniMax 的通用智能体搭建平台",
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
    "solves": "Agents arrive with sub-agents, plan mode and tools nobody asked for. Pi ships the loop and leaves those out — and ships no permission system either, so containment is your job.",
    "solvesZh": "Agent 装好就自带子 Agent、计划模式和一堆没人要的工具。Pi 只留主循环，这些都去掉；它也没有权限系统，隔离得自己负责。",
    "bestFor": "When you want to own the agent's behaviour instead of adopting someone else's defaults.",
    "bestForZh": "当你想自己掌控 Agent 的行为，而不是接受别人的默认设定。",
    "released": "2025-06-01",
    "datePrecision": "day",
    "homepage": "https://github.com/badlogic/pi-mono",
    "desc": "Minimal, extensible agent harness you make your own",
    "descZh": "极简、可自己改造的 agent harness 框架",
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
    "solves": "Wiring an agent into a new repository is an afternoon of index and config. This one ships connected, with the terminal included.",
    "solvesZh": "把智能体接进一个新仓库，索引和配置要花一下午。这个 IDE 开箱就是接好的，终端也一并带。",
    "bestFor": "When you want the agent driving the editor rather than completing one line.",
    "bestForZh": "希望智能体驱动整个编辑器，而不只是补全一行。",
    "released": "2025-05-30",
    "datePrecision": "day",
    "homepage": "https://lingma.aliyun.com",
    "desc": "Alibaba's AI-native IDE with a coding agent inside",
    "descZh": "阿里 AI 原生 IDE，内置编程智能体",
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
    "solves": "Breaking an office job into steps, wiring the tools and watching the process is the part nobody wants. Here the expert agents arrive configured per role.",
    "solvesZh": "把一件办公的活拆步骤、串工具、盯流程，是谁都不想干的活。专家智能体按岗位配好，接手就跑。",
    "bestFor": "Handing writing, research and summarising off to a chain of agents instead.",
    "bestForZh": "把写作、调研、整理这类活交给一串智能体接力完成。",
    "released": "2025-05-22",
    "datePrecision": "day",
    "homepage": "https://www.tiangong.cn/chat",
    "desc": "Kunlun's office agent platform, with expert agents preset",
    "descZh": "昆仑万维的办公智能体平台",
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
    "solves": "Generated one clip at a time, a character drifts between shots. Flow holds a storyboard, so the look and the cast carry across.",
    "solvesZh": "一次一段地生成，同一个角色每镜都不一样。Flow 靠一份分镜把画面和人物锁住。",
    "bestFor": "A short film that has to look like one piece rather than a folder of clips.",
    "bestForZh": "当一支短片要看起来是一部成片，而不是一堆拼起来的片段。",
    "released": "2025-05-20",
    "datePrecision": "day",
    "homepage": "https://labs.google/fx/tools/flow",
    "desc": "Google's video and image studio built on Veo",
    "descZh": "Google 基于 Veo 的视频与图像创作工作室",
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
    "solves": "A results page hands you ten blue links and leaves the comparing to you. AI Mode fans the question into subtopics and returns one cited answer.",
    "solvesZh": "结果页甩给你十条蓝色链接，比较的活留给你自己。AI 模式把问题拆成子题同时搜，直接给一份带信源的答案。",
    "bestFor": "Comparisons and open research, where the old way was ten tabs and a notes file.",
    "bestForZh": "对比和开放式调研——以前的做法是开十个标签页再记笔记。",
    "released": "2025-05-20",
    "datePrecision": "day",
    "homepage": "https://blog.google/products-and-platforms/products/search/google-search-ai-mode-update/",
    "desc": "Google Search tab that answers instead of listing links",
    "descZh": "直接作答而不是列链接的 Google 搜索模式",
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
    "solves": "Autocomplete finishes the line you are on. Amp reads the codebase and takes the whole multi-file change.",
    "solvesZh": "补全只补到光标那一行。Amp 读整个代码库，把跨文件的改动一次做完。",
    "bestFor": "When a change spans enough files that describing it beats typing it.",
    "bestForZh": "一个改动横跨的文件多到，描述它比手打更省事的时候。",
    "released": "2025-05-18",
    "datePrecision": "day",
    "homepage": "https://ampcode.com",
    "desc": "Coding agent spun out of Sourcegraph, runs in terminal and editor",
    "descZh": "源自 Sourcegraph 的编码 Agent，命令行与编辑器都能用",
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
    "solves": "Ask it to change one thing and it either misses dependencies or returns code nobody ran. Several tasks run in the cloud at once, each its own PR.",
    "solvesZh": "让它改一处，它要么漏掉依赖，要么交回没人跑过的代码。多个任务在云端同时跑，各提各的 PR。",
    "bestFor": "A batch of unrelated changes you would rather see land together than queue.",
    "bestForZh": "一批互不冲突的改动，你想让它们一起落地而不是排队。",
    "released": "2025-05-16",
    "datePrecision": "day",
    "homepage": "https://chatgpt.com/codex",
    "desc": "Cloud coding agent that opens parallel tasks and PRs.",
    "descZh": "在云端并行开工、每个任务各提一个 PR 的编程智能体。",
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
    "desc": "ByteDance's collaboration platform for general-purpose agents.",
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
    "solves": "An AI that edits code never sees your project layout and won't run what it changed. This one reads and writes inside your repo, from the terminal.",
    "solvesZh": "让 AI 改代码，它看不见你的项目结构，改完也不敢跑。这个开源助手在终端里直接进你的仓库读写。",
    "bestFor": "You want an agent to change code in a repository you actually control.",
    "bestForZh": "你想让智能体在你真正掌控的仓库里动手改代码。",
    "released": "2025-04-16",
    "datePrecision": "day",
    "homepage": "https://github.com/openai/codex",
    "desc": "Open-source terminal coding agent, Apache-2.0.",
    "descZh": "Apache-2.0 协议的开源终端编程智能体。",
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
    "solves": "It writes the plan, the design and the delivery stages before touching code, and you can steer it mid-task. Usage runs on AI Credits, not on unlimited time.",
    "solvesZh": "改代码之前先写需求、设计和交付步骤，中途还能随时纠偏。用量按 AI Credits 计，不是按无限时长。",
    "bestFor": "A team already on IntelliJ or PyCharm, where a second editor means a second set of habits.",
    "bestForZh": "当团队本来就在 IntelliJ 或 PyCharm 上，换编辑器等于重学一套习惯。",
    "released": "2025-04-16",
    "datePrecision": "day",
    "homepage": "https://www.jetbrains.com/junie/",
    "desc": "JetBrains' coding agent, BYOK with zero markup",
    "descZh": "JetBrains 自带的编码 Agent，可自带模型 Key",
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
    "solves": "Re-explaining your role and preferences at the start of every session. Memory carries them forward — and deleting the chat does not delete them.",
    "solvesZh": "每次开新对话都要重讲一遍身份和偏好。记忆替你带过去——但删掉对话并不会删掉它记的东西。",
    "bestFor": "You use it as a standing assistant and have stopped wanting to repeat who you are.",
    "bestForZh": "你把它当长期助手用，已经不想反复交代自己是谁了。",
    "released": "2025-04-10",
    "datePrecision": "day",
    "homepage": "https://openai.com/index/memory-and-new-controls-for-chatgpt/",
    "desc": "ChatGPT keeps standing facts across separate chats.",
    "descZh": "跨对话记住你的固定信息，也能随时让它忘掉。",
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
    "solves": "Each agent gets its own cloud VM: a full clone, a branch, your repo's secrets. Nothing runs on the laptop, and no two share a disk.",
    "solvesZh": "每个智能体分到一台云端 VM：完整克隆、独立分支和仓库密钥。都不在笔记本上跑，之间也不共享磁盘。",
    "bestFor": "Two or more independent changes you could start at once, or work that should not touch your machine at all.",
    "bestForZh": "手上有两件以上互不相干的改动，或者活本身不该占你的机器。",
    "released": "2025-04-01",
    "datePrecision": "month",
    "homepage": "https://cursor.com/docs/background-agent",
    "desc": "Cloud agents in isolated VMs, one per task",
    "descZh": "各自独立云端 VM 的并行编码 Agent",
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
    "solves": "The agent answers on Monday and has quietly drifted by Friday. Tracing, evaluation and guardrails are what tell you which part moved.",
    "solvesZh": "周一还好好的 Agent，到周五悄悄跑偏了。链路追踪、评估和护栏能告诉你变的是哪一环。",
    "bestFor": "Agents already in production, where you need to know why one answer changed.",
    "bestForZh": "Agent 已经跑在生产上，需要查清某次输出为什么变了。",
    "released": "2025-04-01",
    "datePrecision": "day",
    "homepage": "https://www.nvidia.com/en-us/ai-data-science/products/nemo/",
    "desc": "NVIDIA's open-source toolkit for building and monitoring agents.",
    "descZh": "构建、监控与优化 Agent 的开源组件套件",
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
    "logo": "/assets/logos/butterfly-effect.png",
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
    "solves": "An editor with the assistant built in, not a set of plugins to install and then reconcile with each other.",
    "solvesZh": "助手是编辑器自带的，不是装一堆插件再互相迁就。",
    "bestFor": "An AI coding environment that works without assembling plugins first.",
    "bestForZh": "想要开箱可用的 AI 编程环境，不想先自己拼插件。",
    "released": "2025-03-03",
    "datePrecision": "day",
    "homepage": "https://www.trae.cn",
    "desc": "ByteDance's AI-native IDE, with agent and builder modes.",
    "descZh": "字节的 AI 原生开发环境，AI 直接写进编辑器里",
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
    "solves": "Text-to-video alone gives you a subject that sits still. Higgsfield drives it — motion transfer, camera moves, 15+ VFX presets — and fronts 30+ models in one place.",
    "solvesZh": "光靠文生视频，画面里的东西常常一动不动。Higgsfield 能推镜头、转运动、带 15+ 特效预设，还把 30+ 个模型收在一处。",
    "bestFor": "When the shot needs camera and motion work, and the model choice is not the point.",
    "bestForZh": "当镜头要的是运镜和运动，而选哪个模型不是重点。",
    "released": "2025-03-01",
    "datePrecision": "day",
    "homepage": "https://higgsfield.ai",
    "desc": "Creative suite wrapping 30+ image and video models",
    "descZh": "把 30 多个图像与视频模型收在一处的创作套件",
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
    "solves": "A search engine hands back a list of links. Quark's global assistant answers instead, and its PDF and PPT tools stay in the same browser.",
    "solvesZh": "搜索引擎丢回来的是一串链接。夸克的全局 AI 助手直接给答案，PDF 和 PPT 也在同一个浏览器里。",
    "bestFor": "One place for web search, reading local files and working on documents.",
    "bestForZh": "搜网页、读本地文件、处理文档，想在一个入口里完成。",
    "released": "2025-03-01",
    "datePrecision": "day",
    "homepage": "https://www.quark.cn/",
    "desc": "Alibaba's browser with search, AI and document tools",
    "descZh": "阿里的 AI 浏览器，搜索与文档工具都在里面",
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
    "solves": "Conventions get re-explained at the start of every session. CLAUDE.md holds them, and Claude Code reads that file before it plans.",
    "solvesZh": "项目规范每次都要重新交代一遍。CLAUDE.md 把它们存下来，Claude Code 动手前先读这个文件。",
    "bestFor": "Multi-day work — a migration, a test suite, a bug hunt — that should end in a pull request.",
    "bestForZh": "改不动就跑不动的活：迁移、补测试、查一个 bug，最后收在一个 pull request 上。",
    "released": "2025-02-24",
    "datePrecision": "day",
    "homepage": "https://claude.com/product/claude-code",
    "desc": "Coding agent that reads CLAUDE.md and opens pull requests",
    "descZh": "命令行编码 Agent：读 CLAUDE.md，最终交付 pull request",
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
    "solves": "Ordinary chat answers from memory, so a report needing forty sources cites none. This browses the open web itself and cites what it used.",
    "solvesZh": "普通对话靠记忆作答，要四十个信源的报告一个也引不出来。它自己在开放网络上检索，并标注出处。",
    "bestFor": "Due diligence or a market question, when five to thirty minutes of waiting beats an afternoon of tabs.",
    "bestForZh": "尽调或竞品问题，等五到三十分钟比你自己翻一下午标签页划算。",
    "released": "2025-02-02",
    "datePrecision": "day",
    "homepage": "https://openai.com/index/introducing-deep-research/",
    "desc": "A research mode that browses and writes a cited report.",
    "descZh": "自己上网查资料、输出带引用报告的模式。",
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
    "logo": "/assets/logos/deepseek.png",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "coding",
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Most chat models hand back a conclusion and keep the working private. DeepSeek writes the reasoning out, so a wrong step shows up where you can check it.",
    "solvesZh": "多数对话模型只给结论，过程藏着。DeepSeek 把推理写出来，错在哪一步能直接看见。",
    "bestFor": "When the reasoning needs checking, not just the conclusion.",
    "bestForZh": "当你要核的是推理过程，不只是最终答案。",
    "released": "2025-01-15",
    "datePrecision": "day",
    "homepage": "https://www.deepseek.com",
    "desc": "DeepSeek's chat assistant with visible reasoning",
    "descZh": "会摊开推理过程的 DeepSeek 对话助手",
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
    "solves": "Some regulators will not let agent traffic leave the building. North runs in your own VPC, on-prem, or in Cohere's Model Vault.",
    "solvesZh": "有些监管场景不允许 Agent 流量走出内网。North 可以跑在你的 VPC、本地机房，或 Cohere 的 Model Vault 里。",
    "bestFor": "A compliance regime that names the infrastructure your agents are allowed to run on.",
    "bestForZh": "合规条款明确规定 Agent 只能跑在哪套基础设施上的时候。",
    "released": "2025-01-10",
    "datePrecision": "day",
    "homepage": "https://cohere.com/north",
    "desc": "Cohere's platform you can run in your own VPC",
    "descZh": "可跑在自有 VPC 里的 Cohere 智能体平台",
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
    "solves": "A daily briefing needs you online at the same minute. Tasks reruns the prompt — free accounts get one run a day, and none support voice or GPTs.",
    "solvesZh": "每天那份简报要求你准时在线。定时任务替你重跑提示词——免费账号每天一次，且都不支持语音和 GPTs。",
    "bestFor": "A prompt worth re-running on a fixed cadence rather than asking once.",
    "bestForZh": "值得按固定节奏反复跑的提示词，而不是问一次就完的事。",
    "released": "2025-01-01",
    "datePrecision": "month",
    "homepage": "https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt",
    "desc": "Prompts that run on a schedule and deliver themselves.",
    "descZh": "按计划自动跑、自己把结果送来的提示词。",
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
    "solves": "Most coding agents stop at suggesting. Goose installs, executes, edits and tests — and says so itself: not just for code, but research, writing, automation and analysis.",
    "solvesZh": "多数编程 Agent 停在给建议。Goose 能安装、执行、编辑、测试，不止写代码，也做调研、写作和自动化。",
    "bestFor": "When you want the same run from a terminal, a desktop app, or your own code.",
    "bestForZh": "当你想在终端、桌面端或自己的代码里跑同一套流程。",
    "released": "2025-01-01",
    "datePrecision": "month",
    "homepage": "https://block.github.io/goose/",
    "desc": "Block's open-source agent, not just for code",
    "descZh": "Block 开源的通用 Agent，不止写代码",
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
    "logo": "/assets/logos/deepseek.png",
    "region": "cn",
    "category": "enterprise-api",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "An OpenAI-shaped endpoint, a console and a token bill — that is the whole product. Point your existing client at it and the rest of your code does not move.",
    "solvesZh": "一个 OpenAI 形状的接口、一个后台、一份 token 账单——产品就这些。把现有客户端指过来，其余代码不用动。",
    "bestFor": "When you want a cheap second provider behind a drop-in endpoint, without prepaying.",
    "bestForZh": "当你要在一个可直接替换的接口后面加个便宜的第二供应商，且不预付。",
    "released": "2024-12-26",
    "datePrecision": "day",
    "homepage": "https://platform.deepseek.com",
    "desc": "DeepSeek's API platform, billed by the token",
    "descZh": "DeepSeek 开放平台的模型 API，按 token 计费",
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
    "solves": "Same brief uploaded again, same constraints re-explained again. A project holds the files, instructions, and history for one body of work.",
    "solvesZh": "同一份 brief 反复上传，同样的约束反复解释。项目把一件事的文件、指令和历史放在一起。",
    "bestFor": "One ongoing thing — a client, a paper, a codebase — spread across many separate chats.",
    "bestForZh": "长期推进同一件事——一个客户、一篇论文、一个代码库——却散在很多段对话里。",
    "released": "2024-12-13",
    "datePrecision": "day",
    "homepage": "https://help.openai.com/en/articles/10169521-projects-in-chatgpt",
    "desc": "A container for one piece of work's files and chats.",
    "descZh": "把一件事的文件和对话收在一处的容器。",
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
    "solves": "A chore described well enough does not need you watching it. Jules clones the repo to a cloud VM, plans, and comes back as a pull request.",
    "solvesZh": "描述清楚的杂活不需要你盯着。Jules 把仓库克隆到云端 VM，做完计划，回来时是一个 pull request。",
    "bestFor": "Version bumps, test backfills, small bugs — work with a clear finish line.",
    "bestForZh": "版本号更新、补测试、修小 bug——有明确终点线的那种活。",
    "released": "2024-12-11",
    "datePrecision": "day",
    "homepage": "https://jules.google/",
    "desc": "Cloud coding agent that returns pull requests",
    "descZh": "做完直接交 pull request 的云端编码 Agent",
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
    "solves": "The follow-up work after a meeting is the real cost. Tana's agents write the document, file the issue and update the context graph while you are still talking.",
    "solvesZh": "会开完之后的活才是真成本。Tana 的智能体在你还在说的时候写文档、提 issue、更新 context graph。",
    "bestFor": "A meeting whose output has to become real work, not just minutes.",
    "bestForZh": "开完会要真的产出后续动作，而不只是留一份纪要。",
    "released": "2024-12-01",
    "datePrecision": "day",
    "homepage": "https://tana.inc",
    "desc": "Agentic meeting platform, not the old outliner",
    "descZh": "面向会议的智能体平台，已不是原来的大纲工具",
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
    "solves": "Search hands back URLs, and reading ten of them is still the work. Nami turns the results into a Chinese write-up you read once.",
    "solvesZh": "搜索给回的是网址，读十条网址本身就是活儿。纳米把结果整理成一篇读完就懂的中文说明。",
    "bestFor": "Looking something up where you want the conclusion, not a link list to sift.",
    "bestForZh": "查一件事，你要的是结论，不是一串要自己筛的链接。",
    "released": "2024-11-27",
    "datePrecision": "day",
    "homepage": "https://www.n.cn",
    "desc": "360's AI search, aimed at ordinary readers.",
    "descZh": "360 做的 AI 搜索，结果直接给中文答案。",
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
    "solves": "A prototype needs a frontend, a backend and a database before anyone can click it. Lovable writes all three from a chat, on credits.",
    "solvesZh": "原型要能点，得先有前端、后端和数据库三样。Lovable 用对话把三样都写出来，按 credit 计费。",
    "bestFor": "A working prototype this week, without hiring anyone to write the front end.",
    "bestForZh": "这周就要一个能跑的原型，而你不打算为此招人。",
    "released": "2024-11-21",
    "datePrecision": "day",
    "homepage": "https://lovable.dev",
    "desc": "Builds full-stack web apps from natural language",
    "descZh": "用自然语言搭全栈 Web 应用",
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
    "solves": "Models, your own data, and the rules around them live in three different consoles. Building, grounding, and governance happen in one place.",
    "solvesZh": "模型、自有数据和治理规则分散在三个控制台里。构建、接入业务上下文和治理在一处完成。",
    "bestFor": "When an agent has to stay inside Azure with its data and its audit trail.",
    "bestForZh": "当智能体连同数据和审计记录都必须留在 Azure 内时。",
    "released": "2024-11-19",
    "datePrecision": "day",
    "homepage": "https://azure.microsoft.com/en-us/products/ai-foundry",
    "desc": "Microsoft's platform to build, ground, and govern AI apps",
    "descZh": "微软用于构建、接入数据并治理 AI 应用的统一平台",
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
    "solves": "Swapping model vendors means rewriting your client. The OpenAI wire format means switching is only a change of base URL.",
    "solvesZh": "换个模型厂商就要重写客户端。讲 OpenAI 那一套协议，换过去只是改一个 base URL。",
    "bestFor": "When you want to test Grok against another model without rewriting your integration.",
    "bestForZh": "当你想把 Grok 和别的模型放在一起对比，又不想重写接入代码时。",
    "released": "2024-11-04",
    "datePrecision": "day",
    "homepage": "https://x.ai/api",
    "desc": "OpenAI-compatible API serving Grok, Code, Imagine, Voice",
    "descZh": "兼容 OpenAI 协议，提供 Grok 与代码、图像、视频、语音接口",
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
    "solves": "The same Claude in a browser tab cannot see your disk. The desktop app can: it reads your files and drives your browser and native apps.",
    "solvesZh": "浏览器里的同一个 Claude 看不见你的硬盘。桌面端能：读文件，操作浏览器和本机应用。",
    "bestFor": "Anything that needs the answer to come from a file, a form, or an app on this machine.",
    "bestForZh": "当答案必须来自这台机器上的某个文件、表单或应用时。",
    "released": "2024-10-31",
    "datePrecision": "day",
    "homepage": "https://claude.ai/download",
    "desc": "Claude's desktop app for local files, browsers and apps",
    "descZh": "能读本机文件、操作浏览器与应用的 Claude 桌面端",
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
    "solves": "Planning, writing, and debugging are different jobs, and one agent rarely does all three well. The mode switches between them.",
    "solvesZh": "规划、写代码、排查问题是三种活，一个智能体通常做不好全部三件。模式在其中切换。",
    "bestFor": "When you want an open-source agent in VS Code whose behaviour follows the task.",
    "bestForZh": "当你想在 VS Code 里用一个开源智能体，并希望它按任务类型改变行为时。",
    "released": "2024-10-31",
    "datePrecision": "day",
    "homepage": "https://roocode.com",
    "desc": "Open-source VS Code agent with switchable modes",
    "descZh": "可在多种模式间切换的开源 VS Code 智能体",
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
    "solves": "AI usually lives in a tab you have to go find. Apple Intelligence runs on-device and shows up inside Mail, Messages and notifications — plus a redesigned Siri.",
    "solvesZh": "AI 一般都在一个要专门打开的标签页里。Apple Intelligence 跑在设备本地，出现在邮件、信息和通知里，Siri 也重新做了。",
    "bestFor": "You want AI in the phone's own apps, on-device, rather than in another app to switch to.",
    "bestForZh": "你想要 AI 直接在手机自带的应用里、在本地运行，而不是再多开一个应用。",
    "released": "2024-10-28",
    "datePrecision": "day",
    "homepage": "https://www.apple.com/newsroom/2024/10/apple-intelligence-is-available-today-on-iphone-ipad-and-mac",
    "desc": "Apple's on-device AI layer for iPhone, iPad and Mac",
    "descZh": "苹果内置在 iPhone 与 Mac 里的端侧 AI 能力",
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
    "solves": "The decision you need is in a ticket, a doc, or a chat log, and finding it means turning through a dozen pages. Rovo searches them and answers.",
    "solvesZh": "你要的那个决定藏在工单、文档或聊天记录里，找它要翻十几个页面。Rovo 替你搜完再回答。",
    "bestFor": "Your team works in Jira and Confluence and you need to trace an old decision.",
    "bestForZh": "团队日常在 Jira 和 Confluence 上工作，而你现在要追溯一个旧决定。",
    "released": "2024-10-09",
    "datePrecision": "day",
    "homepage": "https://www.atlassian.com/software/rovo",
    "desc": "Search, chat and agents over Atlassian's Teamwork Graph.",
    "descZh": "在 Teamwork Graph 上做搜索、对话与智能体。",
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
    "solves": "A full app idea, no local Node, no scaffold. The file tree, terminal, and server all run inside one tab.",
    "solvesZh": "想做完整的应用，本地没装 Node 也没有脚手架。文件树、终端和服务器全跑在一个标签页里。",
    "bestFor": "When you want a running full-stack app before installing anything on your own machine.",
    "bestForZh": "当你想在本地装任何东西之前，先看到一个能跑的全栈应用时。",
    "released": "2024-10-03",
    "datePrecision": "day",
    "homepage": "https://bolt.new",
    "desc": "Browser IDE that runs full Node apps while you chat",
    "descZh": "在浏览器标签页里跑完整 Node 应用的 IDE",
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
    "solves": "Describing your screen is slow and imprecise, so answers stop at what you typed. Reading the screen instead helps — but it cannot click, type, or scroll.",
    "solvesZh": "用文字描述屏幕既慢又不准，回答只能停在你打的字上。直接看屏幕好一些——但它不点击、不输入、不滚动。",
    "bestFor": "Troubleshooting an error on screen, or asking about the page in front of you.",
    "bestForZh": "排查屏幕上的报错，或者针对眼前这个页面提问，而不必先去描述它。",
    "released": "2024-10-01",
    "datePrecision": "month",
    "homepage": "https://support.microsoft.com/en-us/microsoft-copilot/using-copilot-vision-with-microsoft-copilot",
    "desc": "Lets Copilot see your screen, app, or camera feed",
    "descZh": "让 Copilot 看屏幕、应用或摄像头画面",
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
    "solves": "An idea, and no environment to run it in. Agent handles planning through deployment — you talk, it writes, runs and hosts the app.",
    "solvesZh": "只有想法，没有能跑起来的环境。Agent 从规划一路管到部署：你说，它负责写、跑和托管。",
    "bestFor": "When you need something working and shareable today, and have no dev machine set up.",
    "bestForZh": "当你今天就要一个能跑、能分享的东西，却还没配好开发机。",
    "released": "2024-09-05",
    "datePrecision": "day",
    "homepage": "https://replit.com/agent",
    "desc": "Builds and deploys apps from plain-language descriptions",
    "descZh": "用自然语言描述直接生成并部署应用",
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
    "solves": "A general engine answers out of ads and SEO. Kagi Assistant answers from Kagi's own index and links every claim back to a page.",
    "solvesZh": "通用搜索引擎的答案里混着广告和 SEO。Kagi Assistant 用自建索引回答，每条结论都指回具体页面。",
    "bestFor": "Already paying for Kagi Search and wanting the answer mode with links.",
    "bestForZh": "已经在付费订阅 Kagi Search，想再加一个带链接的问答模式。",
    "released": "2024-09-04",
    "datePrecision": "day",
    "homepage": "https://kagi.com",
    "desc": "Answer mode on top of Kagi's own paid search index",
    "descZh": "基于 Kagi 自有索引的问答模式",
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
    "solves": "Asking, writing and file handling each live in a different tool. Wenxiaoyan keeps them in one thread, and a dropped file stays available for follow-up questions.",
    "solvesZh": "提问、写作、读文件各在一个工具里。文小言把它们留在同一条对话中，丢进去的文件还能接着问。",
    "bestFor": "When the work is a draft, and switching tools costs more than it saves.",
    "bestForZh": "当活儿是写一份稿，切换工具的成本比省下的还多。",
    "released": "2024-09-03",
    "datePrecision": "day",
    "homepage": "https://yiyan.baidu.com",
    "desc": "Baidu's consumer chat app, now under its own name",
    "descZh": "百度消费端助手，文心一言的现行品牌名",
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
    "solves": "Language, video, speech, image and music usually mean five vendors, five keys and five invoices. One account covers all five.",
    "solvesZh": "文本、视频、语音、图像、音乐通常要五家供应商、五个 key、五张账单。一个账号把这五类都覆盖了。",
    "bestFor": "A multimodal product where one account beats managing five separate vendor keys.",
    "bestForZh": "多模态产品，宁可用一个账号，也不想管五把供应商的 key。",
    "released": "2024-09-01",
    "datePrecision": "day",
    "homepage": "https://platform.minimaxi.com",
    "desc": "MiniMax's API platform for five kinds of models",
    "descZh": "MiniMax 文本、视频、语音等模型的 API 平台",
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
    "solves": "A script, footage and an edit are three separate problems before a clip exists. Hailuo's model reads multimodal input and returns a finished one.",
    "solvesZh": "一条片子出来之前，脚本、素材、剪辑是三道工序。H3 直接读多模态输入，给成片。",
    "bestFor": "Trying out several visual directions before committing to a real production pipeline.",
    "bestForZh": "在搭整套制作流程之前，先把几个画面方向都试一遍。",
    "released": "2024-09-01",
    "datePrecision": "day",
    "homepage": "https://hailuoai.com",
    "desc": "MiniMax's video and image generation platform",
    "descZh": "MiniMax 的视频与图像生成平台",
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
    "solves": "Hand a model raw search results and it drowns in them. Tavily returns filtered, chunked page text, and screens out prompt injection on the way in.",
    "solvesZh": "把原始搜索结果丢给模型，它会淹在里面。Tavily 返回筛过、分块的正文，并在入口处拦掉提示注入。",
    "bestFor": "Your own agent needs live web search, and you cannot ship unreviewed HTML.",
    "bestForZh": "你自己的智能体要接实时搜索，而你不能把未经审查的 HTML 直接送进模型。",
    "released": "2024-08-30",
    "datePrecision": "day",
    "homepage": "https://tavily.com",
    "desc": "Real-time web search API built for agents.",
    "descZh": "为智能体设计的实时网页搜索 API。",
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
    "solves": "Regulated work forbids sending data out of the country and forbids an answer with no stated basis. PhariaAI runs on your own machines and shows its reasoning.",
    "solvesZh": "受监管业务既不能把数据送出境外，也不能接受说不清依据的答案。PhariaAI 整套跑在你自己机器上，并能给出解释。",
    "bestFor": "Finance, government, or defence work that carries data residency and explainability rules.",
    "bestForZh": "金融、政务或国防项目，有数据驻留和可解释的硬性要求。",
    "released": "2024-08-26",
    "datePrecision": "day",
    "homepage": "https://pharia.com/",
    "desc": "Sovereign, explainable generative AI that runs on your hardware.",
    "descZh": "可解释、可主权部署的生成式 AI 技术栈。",
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
    "solves": "Chat bot, agent desk and outbound calling are three systems whose scripts never meet. Yanxi puts them on one platform: set the knowledge base and it goes live.",
    "solvesZh": "客服、坐席、语音外呼各是一套系统，话术和接口互不相通。言犀把它们放进同一个平台，配好知识库就能上线。",
    "bestFor": "A customer-service or outbound-call team that needs a bot live this quarter, not a research project.",
    "bestForZh": "客服或外呼团队要在本季度上线机器人，而不是做一个研究项目。",
    "released": "2024-07-30",
    "datePrecision": "day",
    "homepage": "https://www.jdcloud.com/cn/products/yanxi",
    "desc": "JD Cloud's agent and voice-interaction platform",
    "descZh": "京东云的智能体与人机交互平台",
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
    "solves": "Auto-approve is one toggle away, and that is the trade: Cline shows every action and every diff, and you can undo a step with one click.",
    "solvesZh": "自动批准只差一个开关，这也是代价：Cline 把每个动作和每处 diff 都摆出来，点一下就能撤销一步。",
    "bestFor": "Running any model you like, in your own editor, with no vendor to grow into.",
    "bestForZh": "想在自己的编辑器里跑任意模型，又不想被哪家绑死。",
    "released": "2024-07-01",
    "datePrecision": "day",
    "homepage": "https://cline.bot",
    "desc": "Open-source agent that shows every step for approval",
    "descZh": "开源编码 Agent，每一步都要你点头",
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
    "desc": "ByteDance's free AI coding assistant and cloud IDE.",
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
    "solves": "No copy, paste, come back. The side panel opens inside the document you are already editing, with the text and cells in view.",
    "solvesZh": "不用复制、粘贴、再复制回来。侧边栏就开在你正在编辑的文档里，文字和表格都在眼前。",
    "bestFor": "Drafting, rewriting and summarising inside Docs and Sheets, where the data is the document.",
    "bestForZh": "在 Docs 和 Sheets 里起草、改写、做摘要，而数据本身就在这个文档里。",
    "released": "2024-06-24",
    "datePrecision": "day",
    "homepage": "https://workspaceupdates.googleblog.com/2024/06/gemini-in-side-panel-of-google-docs-sheets-slides-drive.html",
    "desc": "Gemini in a side panel of Docs and Sheets",
    "descZh": "待在 Docs 和 Sheets 侧边栏里的 Gemini 助手",
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
    "solves": "Synthesized speech reads like an announcement. Hume lets you direct the emotion it performs in, and clone a voice you own.",
    "solvesZh": "合成语音念得像播报。Hume 让你指定它用什么情绪去演，也能克隆一段你拥有的声音。",
    "bestFor": "Audio where the voice has to sound like it is feeling something, not reading.",
    "bestForZh": "做有声内容，需要声音听起来在表达而不是在念稿。",
    "released": "2024-06-19",
    "datePrecision": "day",
    "homepage": "https://hume.ai/",
    "desc": "Voice AI you direct emotionally, with voice cloning.",
    "descZh": "能指定情绪说话、也能克隆人声的情感语音 AI。",
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
    "solves": "Send a photo or a clip along with the question, instead of opening a separate vision tool and asking twice.",
    "solvesZh": "发一张照片或一段视频连同问题一起，不用另开识图工具问两遍。",
    "bestFor": "An image or a video is in front of you and you want to know what is in it.",
    "bestForZh": "手边正好有一张图或一段视频，想知道里面拍的是什么、写了什么。",
    "released": "2024-06-13",
    "datePrecision": "day",
    "homepage": "https://www.stepfun.com/yuewen",
    "desc": "StepFun's multimodal assistant",
    "descZh": "阶跃星辰的多模态 AI 问答助手",
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
    "solves": "Hosted tracing wants your traces, your data residency questions and a per-span invoice. Phoenix runs the same traces on your own laptop.",
    "solvesZh": "托管式 tracing 要走你的数据、要面对跨境问题、还要按 span 计费。Phoenix 把同样的 trace 跑在自己笔记本上。",
    "bestFor": "A prototype in a notebook where the traces cannot leave the machine.",
    "bestForZh": "原型还在 Notebook 里，trace 不适合发给外部厂商，费用也不用另算一笔。",
    "released": "2024-06-12",
    "datePrecision": "day",
    "homepage": "https://arize.com/phoenix",
    "desc": "Open-source tracing and eval library you run yourself",
    "descZh": "自己跑的开源 LLM 追踪与评测库",
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
    "solves": "You want to see what text-to-video actually produces before paying anyone. Dream Machine has always let you generate a few seconds free and judge from that.",
    "solvesZh": "在掏钱之前，你得先看看文生视频到底能出什么东西。Dream Machine 一直可以免费生成几秒，看完再判断。",
    "bestFor": "When you need a look at an idea, not a finished film.",
    "bestForZh": "你要的是一个想法的效果预览，不是能交付的成片。",
    "released": "2024-06-12",
    "datePrecision": "day",
    "homepage": "https://lumalabs.ai/dream-machine",
    "desc": "Free text-to-video model, now a model inside Luma.",
    "descZh": "免费开放的文生视频模型，现作为 Luma 站内的一个模型。",
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
    "solves": "A video you can't shoot and footage you can't afford. Give Kling a line of text or one image and it returns seconds you can actually use.",
    "solvesZh": "想拍的视频拍不了，素材也买不起。给可灵一句文字或一张图，它还你几秒能直接用的画面。",
    "bestFor": "Testing whether a video idea works, rather than shooting it for real.",
    "bestForZh": "你想先试一段视频创意行不行，而不是真的去拍。",
    "released": "2024-06-06",
    "datePrecision": "day",
    "homepage": "https://klingai.kuaishou.com/",
    "desc": "Kuaishou's text- and image-to-video generator.",
    "descZh": "快手的文生视频与图生视频模型。",
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
    "solves": "Droid splits engineering into specialists — review, test, code — instead of one assistant that does all three at your generalist level.",
    "solvesZh": "Droid 把工程活拆成 Review、Test、Code 这样的专职角色，而不是一个什么都会一点的通用助手。",
    "bestFor": "A ticket scoped tightly enough to hand over, while you work on the next thing.",
    "bestForZh": "当一个任务边界清楚到可以交出去，而你手上正好有下一件事。",
    "released": "2024-06-01",
    "datePrecision": "day",
    "homepage": "https://factory.com/",
    "desc": "Agent-native platform whose unit of work is a specialist Droid",
    "descZh": "以专职 Droid 为工作单元的智能体开发平台",
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
    "solves": "A task that needs research, then a sheet, then slides gets handed back half-finished at every step. Genspark dispatches multiple agents to finish it between them.",
    "solvesZh": "一件要查资料、再做表、再做幻灯片的活，每一步都只交一半。Genspark 派多个智能体分头做完。",
    "bestFor": "You want the finished file — a deck, a sheet, a report — not an answer in chat.",
    "bestForZh": "你要的是一份成品文件——演示稿、表格、报告——不是聊天框里的一段回答。",
    "released": "2024-06-01",
    "datePrecision": "day",
    "homepage": "https://www.genspark.ai/",
    "desc": "AI workspace covering slides, docs, images, video, code.",
    "descZh": "幻灯片、文档、图像、视频、代码都在里面的 AI 工作空间。",
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
    "solves": "An agent worth handing to colleagues or customers, built by someone who does not write code. Yuanqi assembles it by dragging and publishes it.",
    "solvesZh": "想做个智能体分发给同事或客户，但你不写代码。元器拖拽就能搭好，再发布出去。",
    "bestFor": "You want an agent other people can open and use directly, without installing anything.",
    "bestForZh": "你要做一个别人打开就能直接用的智能体，并分发给他们。",
    "released": "2024-05-30",
    "datePrecision": "day",
    "homepage": "https://yuanqi.tencent.com",
    "desc": "Tencent's platform for building and publishing agents.",
    "descZh": "腾讯搭建并分发智能体的平台。",
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
    "solves": "A Chinese query comes back as a list of links, and each one is another tab. Yuanbao answers in Chinese, in prose, with the sources attached.",
    "solvesZh": "中文问题搜出来是一堆链接，每条都是一个新标签页。元宝直接用中文把答案写好，来源附在后面。",
    "bestFor": "Asking in Chinese and wanting an answer rather than a reading list.",
    "bestForZh": "用中文提问、想要一个答案而不是一份书单的时候。",
    "released": "2024-05-30",
    "datePrecision": "day",
    "homepage": "https://yuanbao.tencent.com",
    "desc": "Tencent's assistant, built on the Hunyuan model.",
    "descZh": "腾讯基于混元大模型做的 AI 助手。",
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
    "solves": "No bot joins as a participant, because it listens to your computer's audio rather than the call. Your own scrawl plus the transcript becomes the note.",
    "solvesZh": "它听的是你自己电脑的声音，不是会议本身，所以没有机器人进场。手写笔记加上转录，就成了记录。",
    "bestFor": "Back-to-back meetings where you already take your own notes. Notes older than 30 days need the paid tier.",
    "bestForZh": "连着开的会，而且你本来就在自己记笔记。超过 30 天的笔记要付费档才看得到。",
    "released": "2024-05-22",
    "datePrecision": "day",
    "homepage": "https://www.granola.ai",
    "desc": "Meeting notepad that uses your computer's audio, no bot",
    "descZh": "用本机音频、不派机器人进场的 AI 会议笔记",
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
    "desc": "ByteDance's one-stop AI image and video creation platform.",
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
    "solves": "Every model added to a product means another deployment to evaluate. One endpoint here reaches 170+ open models, running on domestic Chinese chips, billed by usage.",
    "solvesZh": "每加一个模型就要评估一套新的部署方案。这里一个接口能调 170+ 开源模型，跑在国产芯片上，按量计费。",
    "bestFor": "Open models on domestic Chinese hardware, without tuning the inference deployment.",
    "bestForZh": "想在国产芯片上跑开源模型，又不想自己调推理部署。",
    "released": "2024-05-01",
    "datePrecision": "day",
    "homepage": "https://siliconflow.cn/",
    "desc": "Model API serving open models on Chinese domestic chips.",
    "descZh": "国产芯片上的大模型 API 服务",
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
    "solves": "The answer to a routine question sits in a wiki page nobody can find. Q connects to 25+ data sources — Slack, Salesforce, the intranet — and answers without the data leaving the company.",
    "solvesZh": "日常问题的答案藏在没人找得到的 wiki 页里。Q 接上 25+ 数据源——Slack、Salesforce、内网——作答时数据不出公司。",
    "bestFor": "When the question can only be answered from internal systems that cannot be pasted into a public chatbot.",
    "bestForZh": "当问题只能靠内部系统回答，而那些系统又不能贴进公开聊天机器人。",
    "released": "2024-04-30",
    "datePrecision": "day",
    "homepage": "https://aws.amazon.com/q/",
    "desc": "AWS assistant that answers over a company's own data",
    "descZh": "基于企业自有数据作答的 AWS 助手",
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
    "solves": "Holding a character across shots is where most generators drift. Vidu's reference-to-video starts from a reference image and keeps the character; the 2D and anime work is strong.",
    "solvesZh": "同一角色能否在多个镜头里保持一致，是多数生成模型的短板。Vidu 的参考生视频从参考图起步，二次元尤其稳。",
    "bestFor": "Anime and 2D work, or a cast that has to look like the same person in every shot.",
    "bestForZh": "二次元和 2D 题材，或者要求同一个角色每镜都像同一个人。",
    "released": "2024-04-27",
    "datePrecision": "day",
    "homepage": "https://www.vidu.com/",
    "desc": "Domestic video model strong in anime and 2D",
    "descZh": "国产视频生成模型，二次元与 2D 见长",
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
    "solves": "One decision, three weeks back, buried in a thread nobody reads to the end. Slack AI recaps the channel and answers across the history.",
    "solvesZh": "一个三周前的决定，埋在一串没人读到头的会话里。Slack AI 给出频道回顾，也能跨历史回答。",
    "bestFor": "Answering “where did we land on this?” without scrolling back through a week.",
    "bestForZh": "回答「这个我们最后怎么定的？」，而不用往回翻一周的会话。",
    "released": "2024-04-18",
    "datePrecision": "day",
    "homepage": "https://slack.com/features/ai",
    "desc": "Search and summaries across your whole Slack history.",
    "descZh": "跨整个工作区历史的搜索与总结",
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
    "solves": "One architecture for text, image, video and audio — no adapter layer, no per-modality prompt format. Reka Cloud trains and deploys it; the models are enterprise.",
    "solvesZh": "文本、图像、视频、音频共用一套架构，不用为每种模态另写适配层和提示格式。Reka Cloud 负责训练部署，模型仅对企业开放。",
    "bestFor": "A request that mixes modalities and needs one reasoning pass, at enterprise terms.",
    "bestForZh": "当一次请求混合多种模态却只想推理一遍，而且接受企业级条件。",
    "released": "2024-04-15",
    "datePrecision": "day",
    "homepage": "https://www.reka.ai/",
    "desc": "Natively multimodal models for text, image, video, audio",
    "descZh": "同一架构处理文本、图像、视频与音频的多模态模型",
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
    "solves": "Answering without looking at a screen. HP discontinued the Pin in 2025, so it is no longer on sale.",
    "solvesZh": "作答时不用看屏幕。HP 已于 2025 年停产这款胸针，不再销售。",
    "bestFor": "Nothing to buy — it is only here as a record of the attempt.",
    "bestForZh": "今天没有可买的用途了，这一条只作为一次尝试的记录。",
    "released": "2024-04-11",
    "datePrecision": "day",
    "homepage": "https://humane.com",
    "desc": "Screenless voice assistant pin, discontinued in 2025",
    "descZh": "无屏语音胸针式助手，2025 年停售",
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
    "logo": "/assets/logos/uncharted-labs.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "audio-voice"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Licensing a track for a video or a game takes weeks and costs more than the project. The music is generated instead, cleared to ship.",
    "solvesZh": "给一支视频或一款游戏配一首授权曲子，要谈几周，花的比项目本身还多。改为直接生成，版权可用于交付。",
    "bestFor": "When you need a music bed that fits the cut and will not arrive with a rights dispute.",
    "bestForZh": "当你要一段配得上剪辑、且不会带着版权纠纷来的背景音乐时。",
    "released": "2024-04-10",
    "datePrecision": "day",
    "homepage": "https://www.udio.com",
    "desc": "Music generation with clearance for commercial use",
    "descZh": "生成的音乐可用于商业项目的音乐生成工具",
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
    "solves": "Language, voice and image behind one key, one bill, one integration. The audio family alone runs from ASR to music generation.",
    "solvesZh": "语言、语音、图像三个方向共用一个密钥、一张账单、一套接口。语音这一族从 ASR 一直到音乐生成。",
    "bestFor": "A backend that needs a Chinese model family, and does not want one integration per vendor.",
    "bestForZh": "当后端需要一整套国产模型，又不想为每家各接一次。",
    "released": "2024-03-19",
    "datePrecision": "day",
    "homepage": "https://platform.stepfun.com",
    "desc": "One API key for StepFun's language, voice and image models",
    "descZh": "一套 API 接入阶跃的语言、语音与图像模型",
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
    "solves": "A model that fits on the GPU is still slow until somebody tunes it. These arrive as pre-optimized containers, ready for your own hardware.",
    "solvesZh": "模型塞得进 GPU，也不等于跑得快，还得有人调优。这些是调好的容器，直接放到自己的硬件上。",
    "bestFor": "Self-hosting on NVIDIA GPUs without writing the serving layer yourself.",
    "bestForZh": "想在 NVIDIA GPU 上自托管模型，又不想自己写推理服务那层。",
    "released": "2024-03-18",
    "datePrecision": "day",
    "homepage": "https://build.nvidia.com/",
    "desc": "NVIDIA's containerized model inference service.",
    "descZh": "把模型打包成容器的推理微服务",
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
    "solves": "A ticket needing hours of coding and testing is hard to hand to one person. The work happens in its own browser and comes back as a branch.",
    "solvesZh": "一个要花几小时写代码、跑测试的 issue，很难塞给一个人。活在自带的浏览器里做完，交回一个分支。",
    "bestFor": "When a well-scoped ticket would occupy a developer for a solid day.",
    "bestForZh": "当一个边界清晰的 issue 够一个开发者稳稳干上一整天时。",
    "released": "2024-03-12",
    "datePrecision": "day",
    "homepage": "https://devin.ai",
    "desc": "Autonomous software engineer that works until the PR is ready",
    "descZh": "一直干到 PR 可合并的自主软件工程师",
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
    "solves": "A ticket sits in the backlog because reproducing it is a day's work. OpenHands runs in a sandbox, reads the repo, makes the change and opens the PR.",
    "solvesZh": "工单堆着，是因为复现就要一天。OpenHands 在沙箱里读仓库、改代码，再把 PR 提上来。",
    "bestFor": "Well-defined issues you want closed without assigning a person to each one.",
    "bestForZh": "有一批描述清楚的 issue 想解决，又不想逐条指派人。",
    "released": "2024-03-12",
    "datePrecision": "day",
    "homepage": "https://openhands.dev",
    "desc": "Open-source coding agent platform you can self-host.",
    "descZh": "面向软件工程的编码 Agent 平台",
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
    "logo": "/assets/logos/zapier.png",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "A Zap between two apps needs a rule for every branch it might take. These agents read what triggered them and pick the next step.",
    "solvesZh": "两个应用之间拉一条 Zap，每个可能分支都要写一条规则。它的智能体读懂触发内容，自己定下一步。",
    "bestFor": "The Zap you built is a pile of if-then rules and you want it to judge for itself.",
    "bestForZh": "你那条 Zap 已经堆成一堆 if-then 规则，希望它能自己判断该走哪一步。",
    "released": "2024-03-06",
    "datePrecision": "day",
    "homepage": "https://zapier.com/agents",
    "desc": "No-code agents across 8000+ app integrations.",
    "descZh": "无代码智能体，接得上 8000 多个应用。",
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
    "solves": "Chinese search results stack ads above the answer, so you scroll before you read. The ads go, and the answer goes to the top.",
    "solvesZh": "中文搜索结果页前面堆着广告，你得先划过去才看到答案。广告去掉，答案放到最前面。",
    "bestFor": "When you want a Chinese-language answer with no sponsored links in the way.",
    "bestForZh": "当你要一个中文答案，而不想中间夹着赞助链接时。",
    "released": "2024-03-01",
    "datePrecision": "day",
    "homepage": "https://metaso.cn",
    "desc": "Chinese AI search that shows no ads before the answer",
    "descZh": "没有广告、直达结果的生成式中文搜索",
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
    "solves": "Fast replies, and data that stays in Europe. Both are the reason this one exists rather than being another general chatbot.",
    "solvesZh": "回得快，数据留在欧洲。这两点就是它存在的理由，而不是又一个通用聊天机器人。",
    "bestFor": "Everyday questions where reply speed and where your data sits both matter.",
    "bestForZh": "日常问答，既在意回复速度，也在意数据到底存在哪里。",
    "released": "2024-02-26",
    "datePrecision": "day",
    "homepage": "https://chat.mistral.ai/",
    "desc": "Mistral's consumer chat assistant, now called Vibe.",
    "descZh": "Mistral 的消费级聊天助手，现已改名为 Vibe。",
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
    "solves": "Email, meetings, and support tickets eat the day. Lindy takes a slice of that traffic on rules you write down first.",
    "solvesZh": "邮件、会议和客服消息占满一天。Lindy 按你先写好的规则，接走其中一部分。",
    "bestFor": "Routine email and scheduling admin you would rather not do by hand each day.",
    "bestForZh": "每天都要做的邮件和日程杂事，你不想亲手过一遍。",
    "released": "2024-02-16",
    "datePrecision": "day",
    "homepage": "https://www.lindy.ai",
    "desc": "Personal agents for email, meetings, and support.",
    "descZh": "管邮件、会议与客户支持的个性化智能助理。",
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
    "solves": "A paragraph of text and a need for visual weight. Sora turned a line of description into a few finished seconds, until OpenAI shut it down on 2026-04-26.",
    "solvesZh": "手上只有一段文字，却需要一段有画面感的短片。Sora 把一句描述变成几秒成片，直到 OpenAI 在 2026 年 4 月 26 日关停网页与 App 版。",
    "bestFor": "Nothing to sign up for now — the API shuts down 2026-09-24, and the web app is already gone.",
    "bestForZh": "现在已经没法用了：网页与 App 版 2026 年 4 月已关停，API 也将在 9 月 24 日下线。",
    "released": "2024-02-15",
    "datePrecision": "day",
    "homepage": "https://sora.com/",
    "desc": "Text-to-video product, discontinued April 2026.",
    "descZh": "文生视频产品，2026 年 4 月停服。",
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
    "solves": "Ask a real question and the answer cites what it used. Gems pin a prompt; Deep Research goes out and reads a hundred pages first.",
    "solvesZh": "问个正经问题，答案会标出依据。Gems 把一份提示词固定下来；Deep Research 会先出去读上百页再回答。",
    "bestFor": "A question worth an answer with sources, where you would rather read the conclusion than a page of links.",
    "bestForZh": "当问题值得一个带出处的答案，而你要的是结论不是一页链接。",
    "released": "2024-02-08",
    "datePrecision": "day",
    "homepage": "https://gemini.google.com/",
    "desc": "Google's assistant, with Gems, Canvas and Deep Research",
    "descZh": "Google 助手，带 Gems、Canvas 和能读几百页的 Deep Research",
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
    "solves": "Repetitive data work is done by hand because scripting it is a project. Gumloop lets the people who understand the task wire it up, and IT keeps control.",
    "solvesZh": "重复的数据活只能手工做，因为写脚本本身是个项目。Gumloop 让懂这活的人自己接起来，IT 留在管控那一侧。",
    "bestFor": "A recurring data-moving job, and no engineer free to write the script for it.",
    "bestForZh": "有一套要重复搬数据的活，而没有工程师能腾出手写脚本。",
    "released": "2024-02-07",
    "datePrecision": "day",
    "homepage": "https://www.gumloop.com",
    "desc": "No-code agent builder with 300+ connectors.",
    "descZh": "接了 300 多个应用的无代码智能体搭建平台。",
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
    "solves": "Most customer-service AI answers and stops, so the order change still lands on a person. Sierra's agents finish the transaction, and you pay per resolved case.",
    "solvesZh": "多数客服 AI 只回答不办事，改单最后还是转人工。这里的智能体把事做完，按办成的次数计费。",
    "bestFor": "Support work that ends in an actual transaction, not just an answer.",
    "bestForZh": "客服里那些要以一笔交易收尾、而不是只回答完就算的活。",
    "released": "2024-02-01",
    "datePrecision": "day",
    "homepage": "https://sierra.ai/",
    "desc": "Customer-service agent OS billed per resolved outcome.",
    "descZh": "面向客服的智能体平台，按解决结果计费。",
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
    "desc": "ByteDance's no-code agent builder, with a plugin marketplace.",
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
    "solves": "Hosted chat assistants all phone home. Open models can run on your own machine instead, with no account and nothing leaving the device.",
    "solvesZh": "托管的聊天助手都会上报。开源模型可以直接跑在你自己的机器上，不需要账号，数据也不出设备。",
    "bestFor": "When you want an offline chat on your own machine and will bring your own model.",
    "bestForZh": "当你想在自己的机器上离线私聊，并且愿意自带模型时。",
    "released": "2024-01-20",
    "datePrecision": "day",
    "homepage": "https://jan.ai",
    "desc": "Open-source chat that runs any model, locally or online",
    "descZh": "可跑任意模型的开源聊天工具，支持本地与在线",
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
    "solves": "Unlocking the phone to set a timer is most of the task. The r1 listens and works the app — screen off, phone still in your pocket.",
    "solvesZh": "设个计时器，光解锁就占掉大半。r1 听懂后直接替你操作，屏幕关着、手机还在口袋里就行。",
    "bestFor": "When your hands are busy and the task is one you would normally do on your phone.",
    "bestForZh": "当你的手正忙着，而这件事本来要在手机上做。",
    "released": "2024-01-09",
    "datePrecision": "day",
    "homepage": "https://www.rabbit.tech",
    "desc": "Pocket voice device that drives the phone for you",
    "descZh": "能替手机操作的口袋语音设备",
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
    "solves": "It only sees what DingTalk holds — chats, approvals, docs, tables. In exchange, nothing has to be exported to a tool that cannot reach them anyway.",
    "solvesZh": "它只看得见钉钉里的东西——消息、审批、文档、表格。换来的是不必再把数据导给一个根本够不着它的工具。",
    "bestFor": "A team whose approvals and chats already live in DingTalk and will not move.",
    "bestForZh": "审批和沟通都已经在钉钉里、不会搬到别处的团队。",
    "released": "2024-01-09",
    "datePrecision": "day",
    "homepage": "https://open.dingtalk.com/document/assistants-overview",
    "desc": "AI assistant built into DingTalk, reading DingTalk's own data",
    "descZh": "长在钉钉里、能读钉钉数据的 AI 助理",
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
    "logo": "/assets/logos/greptile.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "observability"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "A diff shows what changed, not what it breaks. Greptile indexes the codebase first, then a swarm of agents reads the PR in that context.",
    "solvesZh": "diff 只告诉你哪里改了，会坏在哪里是另一回事。Greptile 先建图谱，再让一组智能体在这个上下文里读 PR。",
    "bestFor": "A pull request that touches shared code and needs a second reader.",
    "bestForZh": "改动公共代码的 PR，合并之前想再有一双眼睛看过。",
    "released": "2024-01-01",
    "datePrecision": "month",
    "homepage": "https://www.greptile.com",
    "desc": "PR review agents with a graph index of your codebase",
    "descZh": "先建仓库图谱再评审 PR 的智能体",
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
    "logo": "/assets/logos/suno.ico",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "audio-voice"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Licensing one track means paying royalties or clearing a song nobody has heard. Suno hands back a finished song — vocals, lyrics, production — in seconds.",
    "solvesZh": "给一首曲子办授权，要么付版税，要么去清一首没人听过的歌的版权。Suno 几秒交出一首成品，人声、词、曲都在里面。",
    "bestFor": "When a video, podcast or game needs music that is yours to use.",
    "bestForZh": "当视频、播客或游戏需要一段版权归你使用的音乐。",
    "released": "2023-12-20",
    "datePrecision": "day",
    "homepage": "https://suno.com",
    "desc": "Full songs from text prompts, vocals included",
    "descZh": "文本提示直接生成完整歌曲，含人声",
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
    "solves": "You cannot tell a good prompt from a lucky one by reading it. Run two variants against the same input and the difference is right there.",
    "solvesZh": "光读是分不出好 prompt 和走运的。把两个变体喂同一个输入，差别当场就看出来了。",
    "bestFor": "Prompt work before it reaches an app. It has since folded into Gemini Enterprise.",
    "bestForZh": "prompt 接进应用之前的调试与对比，现在已经并入 Gemini Enterprise 平台。",
    "released": "2023-12-13",
    "datePrecision": "day",
    "homepage": "https://aistudio.google.com/",
    "desc": "Free web playground for prompting, now inside Gemini Enterprise",
    "descZh": "免费网页 prompt 工作台，已并入 Gemini Enterprise",
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
    "solves": "Model integration means hunting endpoints, writing auth, absorbing each vendor's quirks, then handling fine-tuning and rollout on top. One console plus API covers it.",
    "solvesZh": "接模型要自己找端点、写鉴权、吞下各家差异，再管微调和上线。一套控制台加 API 就够了。",
    "bestFor": "You call models from code and also need fine-tuning and usage tracking in one bill.",
    "bestForZh": "你要在代码里调模型，还想在一张账单里管微调和用量。",
    "released": "2023-12-11",
    "datePrecision": "day",
    "homepage": "https://console.mistral.ai/",
    "desc": "Mistral's hosted API console for models and agents.",
    "descZh": "Mistral 托管的模型与智能体 API 控制台。",
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
    "solves": "A model that fits in RAM on paper still crawls, because every operation copies tensors. MLX keeps arrays in shared memory, so an op runs on any device without transferring data.",
    "solvesZh": "纸面上塞得进内存的模型跑起来仍很慢，因为算子在拷贝张量。MLX 把数组放进共享内存，算子在哪台设备上跑都不用搬数据。",
    "bestFor": "When you run a model locally on a Mac and the GPU keeps idling.",
    "bestForZh": "当你在 Mac 上本地跑模型，GPU 却一直闲着。",
    "released": "2023-12-05",
    "datePrecision": "day",
    "homepage": "https://github.com/ml-explore/mlx",
    "desc": "Array framework for ML on Apple silicon",
    "descZh": "为 Apple Silicon 设计的机器学习数组框架",
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
    "solves": "The bug lives in a service nobody checked out, so grep across three repos returns nothing. Cody pulls context from local and remote codebases through Sourcegraph's Search API.",
    "solvesZh": "bug 在一个没 clone 过的服务里，grep 三个仓库都搜不到。Cody 通过 Sourcegraph Search API 从本地和远端仓库取上下文。",
    "bestFor": "When the file you need sits in a repo that is not open on your machine.",
    "bestForZh": "当你要找的文件在一个本地没打开的仓库里。",
    "released": "2023-12-01",
    "datePrecision": "day",
    "homepage": "https://sourcegraph.com/cody",
    "desc": "Sourcegraph's assistant that searches across your repos",
    "descZh": "跨仓库检索上下文的 Sourcegraph 编程助手",
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
    "solves": "A mood board is still, but the client wants to know how it moves. A prompt or picture becomes a clip of up to thirty seconds.",
    "solvesZh": "情绪板是一张静止的图，但客户想看到它动起来是什么样。一句 prompt 或一张图，变成最长三十秒的短片。",
    "bestFor": "When a static idea needs to be pitched as something that actually plays.",
    "bestForZh": "当一个静态创意需要被拿成一段真能播放的东西去提案时。",
    "released": "2023-11-29",
    "datePrecision": "day",
    "homepage": "https://pika.art",
    "desc": "Text-to-video and image-to-video in a Video Studio",
    "descZh": "把文字或图片变成短片的视频创作工具",
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
    "solves": "A Java upgrade touches hundreds of call sites, and nobody reviews that many diffs by hand. Q Developer rewrites the calls, writes the tests, and runs them.",
    "solvesZh": "一次 Java 升级牵动上百处调用，没人愿意逐个 review。Q Developer 改写调用、生成测试并跑起来。",
    "bestFor": "When a library upgrade or a port spans more files than you want to read one by one.",
    "bestForZh": "当一次库升级或移植牵涉的文件多到不想逐个读。",
    "released": "2023-11-28",
    "datePrecision": "day",
    "homepage": "https://aws.amazon.com/q/developer/",
    "desc": "AWS coding assistant that does upgrades and tests itself",
    "descZh": "能自己跑测试、改升级的 AWS 编程助手",
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
    "solves": "Every department wants its own bot and hand-coding each one does not scale. This one is no-code, with 1500+ connectors to the data behind it.",
    "solvesZh": "每个部门都想要自己的机器人，手写撑不起规模。这个零代码，配 1500 多个数据连接器。",
    "bestFor": "When people outside engineering need to publish an internal agent without writing code.",
    "bestForZh": "当工程之外的人也要不写代码就发布一个内部智能体时。",
    "released": "2023-11-15",
    "datePrecision": "day",
    "homepage": "https://www.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-studio",
    "desc": "Build and publish custom agents with no code",
    "descZh": "零代码构建并发布自定义智能体的平台",
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
    "solves": "An editor that held repo-wide context so you steered instead of navigating. Cognition acquired it; the name now redirects to Devin Desktop.",
    "solvesZh": "一个替你保持整个仓库上下文、只需指挥不必翻找的编辑器。Cognition 收购后，这个名字已跳转至 Devin Desktop。",
    "bestFor": "When you are tracing what Windsurf became after the Cognition acquisition, or checking older docs.",
    "bestForZh": "当你想弄清 Windsurf 被 Cognition 收购之后变成了什么，或者在翻旧文档时。",
    "released": "2023-11-14",
    "datePrecision": "day",
    "homepage": "https://windsurf.com",
    "desc": "AI editor acquired by Cognition, now Devin Desktop",
    "descZh": "被 Cognition 收购的 AI 代码编辑器，现已更名为 Devin Desktop",
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
    "solves": "Choosing a domestic model means reading three price pages and matching request shapes by hand. Qianfan puts access, fine-tuning and inference behind one console.",
    "solvesZh": "选国产模型要翻三个价格页，再手工对齐请求格式。千帆把模型接入、精调和推理收在一个控制台里。",
    "bestFor": "When you need a mainland-hosted model inside your own service, with fine-tuning later.",
    "bestForZh": "要在自家服务里接入境内托管的模型，并且后面可能要精调。",
    "released": "2023-11-09",
    "datePrecision": "day",
    "homepage": "https://qianfan.cloud.baidu.com",
    "desc": "Baidu Cloud's model platform: access, fine-tuning, inference",
    "descZh": "百度智能云的模型接入与精调平台",
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
    "solves": "First drafts of wireframes, sticky notes, and prototype plumbing all start as manual dragging. The Figma agent drafts it, and the result stays editable on the canvas.",
    "solvesZh": "线框初稿、便签、原型搭架，起步都是手动拖。Figma 智能体先给一稿，产物留在画布上还能继续改。",
    "bestFor": "You want a starting draft in Figma, not a finished design handed to you.",
    "bestForZh": "你想要一个 Figma 里的初稿，而不是别人做完丢给你的成品。",
    "released": "2023-11-07",
    "datePrecision": "day",
    "homepage": "https://www.figma.com/ai/",
    "desc": "Figma's agent, Make, and MCP server, in one suite.",
    "descZh": "Figma 的智能体、Make 与 MCP 服务都在这套里。",
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
    "solves": "News breaks faster than search indexes it, and a press release tells you nothing. Reading X as it happens is a different answer.",
    "solvesZh": "新闻跑得比搜索收录还快，而通稿什么也说明不了。读 X 上此刻正在发的内容，是另一种答案。",
    "bestFor": "When you want a live read on what people are saying about something right now.",
    "bestForZh": "当你想实时看看此刻人们正在怎么谈一件事时。",
    "released": "2023-11-04",
    "datePrecision": "day",
    "homepage": "https://grok.com/",
    "desc": "xAI's assistant with live access to posts on X",
    "descZh": "可实时读取 X 内容的 xAI 对话助手",
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
    "solves": "Every assistant you paste a question into keeps a copy somewhere. Leo discards chats when they close and trains nothing on them.",
    "solvesZh": "问题贴进哪个助手，哪个都会留一份。Leo 关掉对话即删除，也不会拿它训练。",
    "bestFor": "Asking something from the address bar without handing over a search history.",
    "bestForZh": "想在地址栏直接提问、又不想交出搜索历史的人。",
    "released": "2023-11-02",
    "datePrecision": "day",
    "homepage": "https://brave.com/search/",
    "desc": "AI assistant in the Brave browser that keeps no chat log",
    "descZh": "Brave 浏览器内的 AI 助手，不留聊天记录",
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
    "solves": "Picking a domestic provider means comparing prices, reading docs and stitching one API per vendor. BigModel is one key, one console, metered by usage.",
    "solvesZh": "选一家国产服务商要比价、读文档、再为每家拼一次接口。BigModel 是一个密钥、一个后台，按量计费。",
    "bestFor": "A model inside your own service, rather than in a web chat tab.",
    "bestForZh": "要在自家服务里接一个模型，而不是开网页聊两句。",
    "released": "2023-11-01",
    "datePrecision": "day",
    "homepage": "https://bigmodel.cn",
    "desc": "Zhipu's API platform and console for the GLM family",
    "descZh": "智谱 GLM 系列的 API 平台与控制台",
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
    "solves": "One agent's prompt grows until it quietly stops cooperating. The work splits into named roles that hand off to each other.",
    "solvesZh": "单个智能体的 prompt 越写越长，到某个长度就开始不配合。活被拆成有名字的角色，让它们彼此交接。",
    "bestFor": "When a single-agent prompt keeps dropping steps and the work should split across roles.",
    "bestForZh": "当单智能体的 prompt 总是漏步骤，而这件事本该拆给几个角色时。",
    "released": "2023-11-01",
    "datePrecision": "day",
    "homepage": "https://www.crewai.com",
    "desc": "Framework for building crews of agents that hand off work",
    "descZh": "用于组建多智能体 crew 并相互交接的框架",
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
    "solves": "Copying content out into a separate chatbot and back is the friction nobody mentions. Drafting happens in the file you already have open, grounded in your work content.",
    "solvesZh": "把内容复制到另一个聊天工具再粘回来，这层摩擦很少提。起草直接在你已打开的文件里，接上工作内容。",
    "bestFor": "You live in Office all day and do not want content leaving the file to get help.",
    "bestForZh": "你整天泡在 Office 里，又不想为了求助把内容搬出文件。",
    "released": "2023-11-01",
    "datePrecision": "day",
    "homepage": "https://www.microsoft.com/en-us/copilot/blog/2023/09/21/announcing-microsoft-365-copilot-general-availability-and-microsoft-365-chat/",
    "desc": "AI drafting inside Word, Excel, Outlook, PowerPoint, Teams",
    "descZh": "内置在 Word、Excel、Outlook 等办公应用里的 AI",
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
    "solves": "The API is OpenAI-compatible, the models sit in one marketplace, and retrieval and orchestration are built in. Non-developers get a visual builder instead.",
    "solvesZh": "接口兼容 OpenAI，模型集中在模型广场，检索和编排都是现成的；不写代码的人有可视化搭建入口。",
    "bestFor": "Shipping a model application on Alibaba Cloud without wiring a retrieval stack first.",
    "bestForZh": "你要在阿里云上线模型应用，又不想先自己搭一套检索链路。",
    "released": "2023-11-01",
    "datePrecision": "day",
    "homepage": "https://bailian.console.aliyun.com",
    "desc": "Alibaba Cloud platform for building and shipping model apps",
    "descZh": "阿里云上做大模型应用的平台",
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
    "solves": "Tongyi no longer takes new work on its own. The same features — search, page summaries, documents — now live in 千问.",
    "solvesZh": "通义已经不再单独承接新活。搜索、网页总结、文档这些能力现在都在千问里。",
    "bestFor": "Arriving from an older link or a habit; the working product is Qwen.",
    "bestForZh": "从旧链接或旧习惯找过来——现在真正能用的是千问。",
    "released": "2023-10-31",
    "datePrecision": "day",
    "homepage": "https://www.tongyi.com",
    "desc": "Alibaba's assistant, now folded into Qwen",
    "descZh": "阿里的助手应用，已并入千问",
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
    "solves": "It plugs into VS Code, Visual Studio and the JetBrains editors instead of asking you to move to a new one.",
    "solvesZh": "它装进 VS Code、Visual Studio 和 JetBrains 系编辑器里，不要求你换一个全新的环境。",
    "bestFor": "Staying in the current IDE while a second opinion stays one keystroke away.",
    "bestForZh": "留在现在的编辑器里，同时多一个随时能问的帮手。",
    "released": "2023-10-31",
    "datePrecision": "day",
    "homepage": "https://lingma.aliyun.com",
    "desc": "Alibaba Cloud coding assistant, renamed Qoder in 2026",
    "descZh": "阿里云编码助手，2026 年起更名 Qoder",
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
    "solves": "A poster made from a template never quite lands, and editing it makes it worse. Generate the image and layout from text and still get an editable file.",
    "solvesZh": "套模板做的海报总差点意思，一改更糟。文字出图和版式，产出的还是能接着改的设计文件。",
    "bestFor": "A cover, a social image, or a poster, without learning design software first.",
    "bestForZh": "你要做一张封面、社媒图或海报，但不想学设计软件。",
    "released": "2023-10-24",
    "datePrecision": "day",
    "homepage": "https://www.canva.com/ai/",
    "desc": "Canva's generative design tools, now under Canva AI.",
    "descZh": "Canva 的生成式设计工具，已并入 Canva AI。",
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
    "solves": "Completion that needs a VPN is no completion. This one answers while you type, on a mainland network, and turns a Figma file into a page when the design arrives.",
    "solvesZh": "要翻墙才能用的补全等于没有补全。这个在国内网络下边写边补，设计稿到了也能转成页面。",
    "bestFor": "Daily coding on a mainland network, where the first constraint is that the assistant can connect.",
    "bestForZh": "在国内网络做日常编码，第一道约束是助手得连得上。",
    "released": "2023-10-24",
    "datePrecision": "day",
    "homepage": "https://comate.baidu.com/",
    "desc": "China-first code completion that also reads Figma files",
    "descZh": "国内可直连的代码补全助手",
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
    "solves": "Asking a phone a question means putting it down and picking it back up. Answers and recordings come from wherever you are already looking.",
    "solvesZh": "问手机一句要先放下再拿起来。回答和录制，来自你已经在看的方向。",
    "bestFor": "When you need a hands-free question or a first-person recording of something.",
    "bestForZh": "当你要一个不占手的提问方式，或拍一段第一人称的记录时。",
    "released": "2023-10-17",
    "datePrecision": "day",
    "homepage": "https://www.meta.com/smart-glasses",
    "desc": "Glasses with a camera and a hands-free Meta AI assistant",
    "descZh": "带摄像头和免手 Meta AI 助手的眼镜",
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
    "solves": "Designing an interface otherwise means stock images or somebody else's code. One line of description gets a React component that actually runs.",
    "solvesZh": "想画个界面，只能找现成图或者从别人代码里扒。一句描述换来一个真能跑的 React 组件。",
    "bestFor": "A page prototype in an afternoon, not a front end written from scratch.",
    "bestForZh": "你想一个下午搭出页面原型，而不是从头写前端。",
    "released": "2023-10-11",
    "datePrecision": "day",
    "homepage": "https://v0.app",
    "desc": "Generate React and Tailwind interfaces from a prompt.",
    "descZh": "用一句提示生成 React 与 Tailwind 界面。",
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
    "solves": "The glue between your tools is scripts that only run on your laptop. The same flows run on a server you decide, on-prem or air-gapped.",
    "solvesZh": "把工具粘在一起的是只在自己电脑上跑得动的脚本。同样的流程跑在你指定的服务器上，可做隔离网部署。",
    "bestFor": "When the connect-the-dots work must keep running after you close the laptop, on your own server.",
    "bestForZh": "当这种串工具的活得在合上笔记本后继续跑，而且要跑在你自己掌控的服务器上时。",
    "released": "2023-10-04",
    "datePrecision": "day",
    "homepage": "https://n8n.io",
    "desc": "Workflow automation with native LLM nodes, self-hostable",
    "descZh": "带原生 LLM 节点、可自托管的工作流自动化平台",
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
    "solves": "A long report will not fit in a prompt box. Kimi takes the whole document in first, and the questioning comes after that.",
    "solvesZh": "长报告塞不进一个提问框。Kimi 先把整份材料吃进去，之后再对着它问。",
    "bestFor": "Reading a long report, or a pile of material, before you know what to ask.",
    "bestForZh": "得先读完一份长报告或一批材料，才知道该问什么。",
    "released": "2023-10-01",
    "datePrecision": "day",
    "homepage": "https://www.kimi.com",
    "desc": "Long-context chat assistant with built-in deep research.",
    "descZh": "长上下文对话助手，带深度研究",
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
    "solves": "An invented answer cannot go to a reviewer. Command anchors every claim to a span of your own source.",
    "solvesZh": "编出来的答案送不到审核环节。Command 把每条结论都挂在你的原文片段上。",
    "bestFor": "A reviewer who has to be able to check where every statement came from.",
    "bestForZh": "留给审核的那个人，他需要能逐句查证结论出自哪段原文。",
    "released": "2023-09-29",
    "datePrecision": "day",
    "homepage": "https://cohere.com/",
    "desc": "Cohere's enterprise models for RAG, tools and agents",
    "descZh": "面向企业的 RAG、工具调用与智能体模型",
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
    "solves": "A model, a guardrail layer and an audit trail are usually three purchases. Bedrock is one account your security team already reviews, and it never trains on your data.",
    "solvesZh": "选模型、买护栏、备审计材料通常是三笔采购。Bedrock 收在一个安全团队已审过的账号里，且不用你的数据训练模型。",
    "bestFor": "When procurement needs one vendor and one compliance answer behind every model call.",
    "bestForZh": "当采购要求模型调用背后只有一家供应商、一套合规说法。",
    "released": "2023-09-28",
    "datePrecision": "day",
    "homepage": "https://aws.amazon.com/bedrock/",
    "desc": "AWS's managed platform for foundation models and agents",
    "descZh": "AWS 托管的基础模型与智能体平台",
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
    "solves": "A landing page costs a week and ends up on a staging link nobody remembers to publish. Webflow AI drafts the sections and copy inside the editor you already publish from.",
    "solvesZh": "一个落地页要花一周，做完还挂在没人记得发布的测试链接上。Webflow AI 在你本来就用来发布的编辑器里起草板块和文案。",
    "bestFor": "When you need another page in the site you already maintain.",
    "bestForZh": "当你只想在现有站点里再加一个页面。",
    "released": "2023-09-05",
    "datePrecision": "day",
    "homepage": "https://webflow.com/ai",
    "desc": "AI site building, copy and Figma-to-code in Webflow",
    "descZh": "Webflow 里的 AI 建站、文案与设计稿转代码",
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
    "solves": "Choosing a model you can actually call from inside China means comparing price, terms, and concurrency vendor by vendor. One provider covers the comparison.",
    "solvesZh": "要选一个在国内真正调得通的大模型，得逐家比价格、协议和并发限制。一家接上，这轮比较就省了。",
    "bestFor": "Your service needs a model API that stays reachable on domestic networks.",
    "bestForZh": "你的服务需要一个大模型 API，并且要在国内网络下稳定访问。",
    "released": "2023-09-01",
    "datePrecision": "day",
    "homepage": "https://hunyuan.tencent.com",
    "desc": "Tencent's general-purpose LLM and API platform.",
    "descZh": "腾讯的通用大语言模型与 API 平台。",
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
    "solves": "It only sees what already lives in Feishu — docs, Bitable, chats. That boundary is also why it answers without a connector for every other tool.",
    "solvesZh": "只能看见飞书里已有的文档、多维表格和会话。也正因这个上限，回答时不必再为别的工具逐个接连接器。",
    "bestFor": "The answer is in Feishu, and context is currently being pasted in by hand.",
    "bestForZh": "答案本来就在飞书里，而你现在只能靠手动粘贴上下文。",
    "released": "2023-09-01",
    "datePrecision": "month",
    "homepage": "https://www.feishu.cn/product/feishuai",
    "desc": "Enterprise AI that works only on Feishu's own data",
    "descZh": "只覆盖飞书自有数据的企业 AI 助手",
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
    "solves": "The free web chat to try a domestic model on, no API key and no SDK. Zhipu's consumer face for the same models developers call through BigModel.",
    "solvesZh": "一个不用申请接口、不用装 SDK 就能试国产模型的网页对话入口，和开发者走的 BigModel 是同一批模型。",
    "bestFor": "Finding out what a domestic model can do, at no cost and in ten minutes.",
    "bestForZh": "想十分钟内零成本知道一个国产模型能做什么。",
    "released": "2023-08-31",
    "datePrecision": "day",
    "homepage": "https://chatglm.cn",
    "desc": "Zhipu's consumer chat front-end for its GLM models",
    "descZh": "智谱面向 C 端的模型对话入口",
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
    "solves": "A bad answer in production, with no way back to what went in. Traces unroll every LLM call, tool call and retrieval step; self-hosting keeps the logs local.",
    "solvesZh": "线上出了坏答案，却回不到当时喂进去的是什么。Trace 展开每次 LLM 调用、工具调用和检索步骤；自托管把日志留在本地。",
    "bestFor": "Running models in production, or under a rule that logs cannot leave your infrastructure.",
    "bestForZh": "当你在生产环境跑模型，或者有规矩规定日志不能出本方基础设施。",
    "released": "2023-08-20",
    "datePrecision": "day",
    "homepage": "https://langfuse.com",
    "desc": "Open-source tracing, evals and prompt management",
    "descZh": "开源的 LLM 追踪、评测与 Prompt 管理平台",
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
    "desc": "ByteDance's general-purpose AI assistant.",
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
    "solves": "Agents do not throw when they get worse. The output just drifts, and nobody notices until a user files a ticket. Braintrust turns those production traces into evals.",
    "solvesZh": "Agent 变差不会报错，只是悄悄跑偏，等用户来投诉才被发现。Braintrust 把线上 trace 直接变成 eval。",
    "bestFor": "Before you change a prompt or a model, and you need the change argued with numbers.",
    "bestForZh": "改 prompt 或换模型之前，你需要一个拿数字说话的理由。",
    "released": "2023-08-01",
    "datePrecision": "day",
    "homepage": "https://www.braintrust.dev",
    "desc": "Observability and evals for agents, in one loop",
    "descZh": "面向 Agent 的可观测平台，线上 trace 直接变 eval",
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
    "solves": "Sketching a rough shape and waiting on a queue to learn whether the model agrees is the slowest part. Krea's Realtime Canvas updates as you draw, in under 50ms.",
    "solvesZh": "画个大概形状再排队等结果，看模型认不认——这是最慢的一段。Krea 的 Realtime Canvas 跟着笔走，50 毫秒内出图。",
    "bestFor": "When you are exploring an idea and need many cheap variations, not one polished render.",
    "bestForZh": "当你在探索一个想法，需要大量廉价变体，而不是一张精修成图。",
    "released": "2023-08-01",
    "datePrecision": "day",
    "homepage": "https://www.krea.ai",
    "desc": "Realtime canvas for image and video generation",
    "descZh": "图像与视频的实时生成画布",
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
    "solves": "Every provider ships its own client, its own error shapes and its own invoice. One OpenAI-compatible endpoint sits in front, with spend tracked and hard budgets per key or team.",
    "solvesZh": "每家服务商都有自己的客户端、错误结构和账单。前面放一个 OpenAI 兼容接口，花费有记录，密钥和团队都能设硬上限。",
    "bestFor": "When you want to switch models, or cap what one team can spend, without a rewrite.",
    "bestForZh": "当你想换模型，或给某个团队设个花费上限，又不想重写代码。",
    "released": "2023-08-01",
    "datePrecision": "day",
    "homepage": "https://www.litellm.ai/",
    "desc": "Open-source gateway putting one OpenAI-shaped API in front",
    "descZh": "在多家模型前面放一个 OpenAI 形状接口的开源网关",
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
    "solves": "Not the largest model, and it does not need to be. Running locally is what keeps the content off a cloud endpoint.",
    "solvesZh": "它不是最大的模型，也不需要是。在本地跑，内容才不会走到云端接口上。",
    "bestFor": "Content that may not leave the machine, and a local device that still needs model capability.",
    "bestForZh": "内容不能出本机，同时又需要本机上有模型能力。",
    "released": "2023-08-01",
    "datePrecision": "day",
    "homepage": "https://openbmb.cn",
    "desc": "Small open models and toolchain that run on-device.",
    "descZh": "能在端侧跑的小模型与工具链",
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
    "solves": "A model will invent a citation and you will not find out until someone checks. NotebookLM answers from the sources you uploaded, with every line pointing back.",
    "solvesZh": "模型编出一个引用，往往要等别人查才发现。NotebookLM 只依据你上传的资料作答，每一句都能点回原文。",
    "bestFor": "A fixed pile of papers or documents you are trying to actually get through.",
    "bestForZh": "当手头是一批固定的资料，而你要的是真读进去。",
    "released": "2023-07-26",
    "datePrecision": "day",
    "homepage": "https://notebooklm.google.com/",
    "desc": "Research assistant grounded in sources you upload",
    "descZh": "只依据你上传的资料作答、并给出处的研究助手",
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
    "solves": "An agent breaks on real traffic and the log says nothing. LangSmith keeps every step, then scores what came out.",
    "solvesZh": "Agent 在真实流量下才崩，日志里什么也看不到。LangSmith 记下每一步，再给输出打分。",
    "bestFor": "When a chain only misbehaves in production and the trace is the only lead.",
    "bestForZh": "链路只在生产环境出问题，trace 成了手上唯一的线索。",
    "released": "2023-07-18",
    "datePrecision": "day",
    "homepage": "https://www.langchain.com/langsmith",
    "desc": "Tracing, evaluation and monitoring for LLM apps",
    "descZh": "LLM 应用的追踪、评测与监控平台",
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
    "solves": "A local model used to mean a driver hunt and a Python environment. Ollama pulls the model down in one command.",
    "solvesZh": "本地跑模型，本来是折腾驱动和 Python 环境。Ollama 一条命令把它拉下来。",
    "bestFor": "Trying a model on your own machine before any of it reaches an API.",
    "bestForZh": "先在自己机器上试一个模型，再决定要不要发到 API。",
    "released": "2023-07-08",
    "datePrecision": "day",
    "homepage": "https://ollama.com",
    "desc": "One command to run open models locally",
    "descZh": "一条命令在本地跑开源模型",
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
    "solves": "文生图、图生图、文生视频、图生视频、图像编辑 are five separate tools in most setups. 万相 puts them on one page.",
    "solvesZh": "文生图、图生图、文生视频、图生视频、图像编辑，在多数工具里要分头去开。万相放在同一页里。",
    "bestFor": "Illustrations and short clips that have to match a Chinese-language brief closely.",
    "bestForZh": "要的是配图和短视频素材，需求本身就是中文写出来的。",
    "released": "2023-07-07",
    "datePrecision": "day",
    "homepage": "https://tongyi.aliyun.com/wanxiang",
    "desc": "Alibaba Tongyi's image and video creation platform",
    "descZh": "通义旗下的图像与视频创作平台",
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
    "solves": "Adopting a model is the easy part. Serving it, scaling it and gating who may call it is the part that takes a team.",
    "solvesZh": "用上模型只是第一步。推理、扩容和调用权限控制，才是真正要花人力的部分。",
    "bestFor": "Calling models in production without standing up your own inference stack.",
    "bestForZh": "要在生产环境稳定调用大模型，又不想自己搭一套推理服务。",
    "released": "2023-06-28",
    "datePrecision": "day",
    "homepage": "https://www.volcengine.com/product/ark",
    "desc": "Model platform covering inference, evaluation and fine-tuning.",
    "descZh": "覆盖推理、评测与精调的大模型平台",
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
    "solves": "Revising a paragraph, translating it and reading a long document used to mean three tools. One conversation covers all three, and a dropped file stays open for follow-up.",
    "solvesZh": "改一段话、翻译一份文、读懂一篇长文，以前要开三个工具。一个对话框都能做，丢进去的文件还能接着问。",
    "bestFor": "When the input is a piece of text that needs work, not a question with a right answer.",
    "bestForZh": "当手上是一段需要加工的文字，而不是一道有标准答案的题。",
    "released": "2023-06-21",
    "datePrecision": "day",
    "homepage": "https://chat.sensetime.com",
    "desc": "SenseTime's SenseNova chat assistant",
    "descZh": "商汤日日新模型的对话助手",
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
    "solves": "Every agent starts with the same unglued parts: a tool loop, retries, context that overflows. The Agent SDK ships them joined.",
    "solvesZh": "每个 Agent 都要自己拼同一套零件：工具循环、重试、爆掉的上下文。Agent SDK 把它们接好了再交给你。",
    "bestFor": "When the model call is the easy part and the plumbing around it is the work.",
    "bestForZh": "当调模型只是顺手，真正的工作是它周围那一圈管道。",
    "released": "2023-06-20",
    "datePrecision": "day",
    "homepage": "https://platform.claude.com/",
    "desc": "Anthropic's Messages API and Agent SDK",
    "descZh": "Anthropic 开发者 API 与 Claude Agent SDK，构建智能体的入口",
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
    "solves": "Streaming a model onto a page token by token, written by hand, gets janky fast. This handles the stream, the tool calls, and the model swap.",
    "solvesZh": "逐字把模型输出渲染到页面上，自己写很快就会卡、就会乱。这里处理流、工具调用，换模型也不用重写。",
    "bestFor": "You are putting a streaming AI chat interface inside your own product.",
    "bestForZh": "你要给自己的产品做一个流式输出的 AI 对话界面。",
    "released": "2023-06-15",
    "datePrecision": "day",
    "homepage": "https://sdk.vercel.ai",
    "desc": "TypeScript SDK for streaming AI across model providers.",
    "descZh": "面向 TypeScript 的流式 AI 开发工具包。",
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
    "solves": "It hands you editable layers, not a locked image or a fixed template — which means the polish is still yours.",
    "solvesZh": "它给你的是可编辑的图层，不是锁死的图或固定模板——所以最后那份打磨仍然得你自己来。",
    "bestFor": "A landing page due before a designer is free, that has to be a real site afterward.",
    "bestForZh": "设计师还排不上队，但落地页得先上线，而且之后还得是真站点。",
    "released": "2023-06-14",
    "datePrecision": "day",
    "homepage": "https://www.framer.com/ai/",
    "desc": "Prompt-to-site tool that outputs editable layers",
    "descZh": "用一句话生成可继续编辑的网站图层",
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
    "solves": "Code cannot leave the network, and blind generation is not reviewable. Comate writes the spec and the task list first, changes files only after approval, and can run entirely on your own servers.",
    "solvesZh": "代码出不了内网，多数 AI 编程工具直接出局。Comate 先写文档和任务清单，确认后才动文件，整套可部署在自己的服务器上。",
    "bestFor": "When the code stays inside a regulated network and reviewers want a plan before any edit.",
    "bestForZh": "代码要留在受管内网，且希望在改动前先看到一份可审的计划。",
    "released": "2023-06-06",
    "datePrecision": "day",
    "homepage": "https://comate.baidu.com/zh",
    "desc": "Baidu coding assistant that plans before it edits",
    "descZh": "先出方案再动手的百度编程助手",
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
    "solves": "Character chat is usually a bare text box. Talkie gives the character a face and a voice, and cards to collect.",
    "solvesZh": "角色聊天通常就是一个光秃秃的输入框。Talkie 给了角色形象和声音，还有卡可以抽。",
    "bestFor": "Spending time with a fictional character rather than getting work done today.",
    "bestForZh": "想跟一个虚构角色待一会儿，不是来把活干完的。",
    "released": "2023-06-01",
    "datePrecision": "day",
    "homepage": "https://www.talkie-ai.com/",
    "desc": "Character chat app with collectible image cards",
    "descZh": "带可收集角色卡的 AI 角色聊天应用",
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
    "solves": "Aider writes each edit as its own commit, so an agent's whole run reads backwards as reviewable history.",
    "solvesZh": "Aider 把每一步改动写成独立提交，智能体的整个运行过程可以倒着当代码评审读。",
    "bestFor": "When you want to see what an agent actually changed, not just its final diff.",
    "bestForZh": "当你想看清智能体到底改了什么，而不只是最后那个 diff。",
    "released": "2023-05-10",
    "datePrecision": "day",
    "homepage": "https://aider.chat",
    "desc": "Terminal pair programmer; every change lands as a git commit",
    "descZh": "终端里的结对编程，每次改动都是一个 git 提交",
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
    "solves": "A general assistant you can open without an API key or a signup queue. Chinese in, Chinese out, for asking and drafting.",
    "solvesZh": "一个不需要申请接口、也不用排队就能打开的通用助手。全程中文，提问和起草都在里面做。",
    "bestFor": "Everyday questions and drafts where the whole exchange is meant to stay in Chinese.",
    "bestForZh": "日常的资料查询和文稿起草，全程中文就能完成，不用再换工具。",
    "released": "2023-05-06",
    "datePrecision": "day",
    "homepage": "https://xinghuo.xfyun.cn/chat",
    "desc": "iFlytek's general Chinese-language assistant",
    "descZh": "讯飞的通用中文助手，主打「懂我」",
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
    "solves": "Every other assistant treats talking as a problem to solve and hands back a plan. Pi listens first and answers the way a person would.",
    "solvesZh": "别的助手都把聊天当成待解决的问题，然后递回一份计划。Pi 先听，再像人一样回答。",
    "bestFor": "When you want to think out loud about something and not be handed a plan.",
    "bestForZh": "当你想把一件事说出来理一理，而不是拿到一份执行计划。",
    "released": "2023-05-02",
    "datePrecision": "day",
    "homepage": "https://pi.ai/",
    "desc": "Personal AI built for conversation rather than tasks",
    "descZh": "为聊天而造、而不是为完成任务而造的个人 AI",
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
    "solves": "A vector index returns the closest matches, not necessarily the right one. Rerank sits at the end and reorders, so fewer documents reach the model.",
    "solvesZh": "向量索引给的是最相似的一批，不一定是最相关的一条。Rerank 放在末端重排，进模型的文档自然少了。",
    "bestFor": "A RAG pipeline that retrieves plenty of documents and still answers badly.",
    "bestForZh": "召回了大量文档、回答质量却还是上不去的检索流程。",
    "released": "2023-05-01",
    "datePrecision": "day",
    "homepage": "https://cohere.com/rerank",
    "desc": "Reranking model, the last filter before your model reads",
    "descZh": "检索链路末端的重排序模型",
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
    "solves": "A hosted model needs your code pasted into someone else's machine. LM Studio downloads the weights and runs them here, on your own hardware.",
    "solvesZh": "托管模型要把你的代码贴进别人的机器。LM Studio 把权重下下来，在你自己的硬件上跑。",
    "bestFor": "Material you cannot send to a vendor, or a laptop with no network and no credits left.",
    "bestForZh": "材料不能出本机，或者你在离线环境里额度也用完了。",
    "released": "2023-05-01",
    "datePrecision": "day",
    "homepage": "https://lmstudio.ai",
    "desc": "Desktop app that downloads and runs local models",
    "descZh": "下载并在本机运行模型的桌面应用，带界面",
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
    "solves": "Not a general-purpose IDE. Business logic gets written in NASL, and describing a change in plain language hands the code back.",
    "solvesZh": "它不是通用 IDE。业务逻辑写成 NASL，你用日常语言描述改动，它直接把代码返回给你。",
    "bestFor": "Domain experts changing business logic without waiting on a developer.",
    "bestForZh": "业务专家要改业务逻辑，又不想等开发排期。",
    "released": "2023-04-25",
    "datePrecision": "day",
    "homepage": "https://codewave.163.com",
    "desc": "NetEase's low-code platform, with NASL as the target language",
    "descZh": "网易的低代码开发平台",
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
    "solves": "The Tiangong models exist; reaching them from a chat window takes an API key and a client. This is the assistant the lab ships.",
    "solvesZh": "天工模型是有的，但从一个对话框用到它，要 API key 加一个客户端。这是昆仑自己出的那个入口。",
    "bestFor": "Wanting to try Kunlun's Tiangong models without writing an API client yourself.",
    "bestForZh": "想先用上昆仑的天工模型，又不想自己写客户端。",
    "released": "2023-04-18",
    "datePrecision": "day",
    "homepage": "https://www.tiangong.cn",
    "desc": "Kunlun Wanwei's assistant, built on Tiangong models",
    "descZh": "昆仑万维天工模型的官方助手",
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
    "solves": "Private documents should not go to someone else’s server, and a terminal is a poor way to run a local model. It ships as a desktop app.",
    "solvesZh": "私密文档不该传到别人的服务器上，而本地模型又不适合用终端跑。它直接做成桌面应用。",
    "bestFor": "When you want to try a local model on your own files without command-line tooling.",
    "bestForZh": "当你想拿自己的文件试一个本地模型，又不想装任何命令行工具时。",
    "released": "2023-04-03",
    "datePrecision": "day",
    "homepage": "https://www.nomic.ai/gpt4all",
    "desc": "Desktop app for running open models entirely on your machine",
    "descZh": "把开源模型完全跑在本机的桌面应用",
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
    "solves": "A LangChain chain is wired by editing nested Python objects until the shape is unreadable. The graph gets drawn, then exported back to code.",
    "solvesZh": "接一条 LangChain 链要改嵌套的 Python 对象，改到后来结构自己也读不懂。改成画图，再导出回代码。",
    "bestFor": "When a team designs and hands off an agent flow without reading raw Python.",
    "bestForZh": "当团队要设计并交付一条智能体流程，却不想读原始 Python 代码时。",
    "released": "2023-03-29",
    "datePrecision": "day",
    "homepage": "https://flowiseai.com",
    "desc": "Open-source agentic platform you build by dragging nodes",
    "descZh": "拖拽节点搭智能体流程的开源平台",
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
    "solves": "You cannot recall the exact flag, and looking it up breaks your flow. Describe the intent in plain words and Warp types and runs it.",
    "solvesZh": "记不住那个参数怎么写，查文档又打断手上的活。用一句大白话说清意图，Warp 替你敲并跑起来。",
    "bestFor": "You live in the terminal and cannot remember how a command is written.",
    "bestForZh": "你天天在终端里干活，但常常想不起某条命令该怎么写。",
    "released": "2023-03-17",
    "datePrecision": "day",
    "homepage": "https://warp.dev",
    "desc": "GPU-rendered terminal that runs commands you describe.",
    "descZh": "GPU 渲染的现代终端，能听懂人话并执行命令。",
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
    "solves": "Before dedicated writing tools existed, this was the general chatbot: ask in Chinese, get an answer, keep the thread going.",
    "solvesZh": "在专门的写作工具出现之前，这是通用问答的入口：中文提问、拿到回答、对话连着往下。",
    "bestFor": "When you want Baidu's general chatbot specifically, rather than the current consumer brand.",
    "bestForZh": "当你要的就是百度那个通用问答入口，而不是现行的消费端品牌。",
    "released": "2023-03-16",
    "datePrecision": "day",
    "homepage": "https://yiyan.baidu.com",
    "desc": "Baidu's original general-purpose AI chat assistant",
    "descZh": "百度首个通用 AI 对话助手",
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
    "solves": "A conversation does not carry over, so every answer restarts cold. Projects hold the context, instructions and files; Artifacts come back editable.",
    "solvesZh": "对话之间不接上下文，每个回答都从冷启动开始。Project 存住上下文、说明和文件；Artifact 交回来还能改。",
    "bestFor": "A document or dataset you have to actually work through, not look up.",
    "bestForZh": "当手头有一份材料要真读进去，而不是查一下就走。",
    "released": "2023-03-14",
    "datePrecision": "day",
    "homepage": "https://claude.ai/",
    "desc": "Anthropic's assistant, with Projects, Artifacts and research",
    "descZh": "Anthropic 的对话助手，带 Project、Artifact 与研究模式",
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
    "solves": "An autocomplete fills the line you are on and stops. Cursor takes the whole task, works in its own computer, and hands back the decisions.",
    "solvesZh": "补全填满当前那行就停了。Cursor 接下整个任务，在自己的环境里做完，把需要你拍板的地方交回来。",
    "bestFor": "A feature big enough that you would rather set the intent than type the diff.",
    "bestForZh": "当一件事大到你更愿意说清意图，而不是亲手敲 diff。",
    "released": "2023-03-01",
    "datePrecision": "day",
    "homepage": "https://cursor.com",
    "desc": "VS Code-based editor built around handing off whole tasks",
    "descZh": "基于 VS Code 的编辑器，把整个任务交出去做",
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
    "solves": "One provider having a bad afternoon, or one key overrunning its budget, takes the whole app down. Routing in front does not.",
    "solvesZh": "一家供应商状态变差，或者一个 key 超了预算，整个应用跟着挂。前置的路由不会。",
    "bestFor": "Model calls across several vendors that need fallbacks, rate limits and a cost breakdown.",
    "bestForZh": "模型调用横跨多家供应商，需要的是 fallback、限流和一份成本明细。",
    "released": "2023-03-01",
    "datePrecision": "day",
    "homepage": "https://portkey.ai/",
    "desc": "AI gateway sitting between your app and every model",
    "descZh": "挡在应用与模型之间的 AI 网关",
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
    "solves": "An editor first, not an agent. The agent is a guest here, and several can work at once in the same files over ACP.",
    "solvesZh": "它先是编辑器，不是 Agent。Agent 是这里的客人：通过 ACP，可以有几个同时在同一个编辑器里干活。",
    "bestFor": "More than one coding agent working in your editor at the same time.",
    "bestForZh": "想在编辑器里同时有多个编码 Agent 干活。",
    "released": "2023-03-01",
    "datePrecision": "day",
    "homepage": "https://zed.dev",
    "desc": "A code editor with an agent panel and edit prediction.",
    "descZh": "Rust 写的编辑器，并行跑多个 Agent",
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
    "solves": "Jobs have more than one step. Relevance AI sells the team, not the individual — several no-code agents on one assignment.",
    "solvesZh": "一件活往往不止一步。Relevance AI 卖的是团队而不是单人：多个无代码智能体接同一件活。",
    "bestFor": "Work with a team shape to it — research, drafting, checking — and no glue code.",
    "bestForZh": "任务本身像个小团队——调研、起草、核查——又不想写胶水代码。",
    "released": "2023-02-20",
    "datePrecision": "day",
    "homepage": "https://relevanceai.com",
    "desc": "No-code teams of AI agents you deploy",
    "descZh": "用无代码智能体组队干活",
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
    "solves": "Mail and calendar questions deserve facts, not guesses. Inbox summaries, drafted replies, and answers grounded in your Microsoft account.",
    "solvesZh": "关于邮件和日程的问题要的是事实，不是猜测。收件箱摘要、代拟回复，答案基于你的 Microsoft 账号。",
    "bestFor": "When the question is about your Outlook mail, your calendar, or a meeting you just sat through.",
    "bestForZh": "当问题涉及 Outlook 邮件、日历，或者是你刚开完的那场会时。",
    "released": "2023-02-07",
    "datePrecision": "day",
    "homepage": "https://www.microsoft.com/en-us/microsoft-copilot",
    "desc": "Microsoft's assistant for content, mail, and meetings",
    "descZh": "微软面向内容、邮件与会议的 AI 助手",
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
    "solves": "Synthetic narration sounds synthetic and listeners tune out. ElevenLabs is independently rated the leading TTS, and the output carries the pauses and emphasis a real voice has.",
    "solvesZh": "合成配音一听就是机器味，听众很快走神。ElevenLabs 的 TTS 第三方评测排在前列，输出带着真人该有的停顿和重音。",
    "bestFor": "When a product, video or game needs a voice and booking a human is not on the table.",
    "bestForZh": "当产品、视频或游戏需要人声，而请真人不在选项里。",
    "released": "2023-01-23",
    "datePrecision": "day",
    "homepage": "https://elevenlabs.io",
    "desc": "Voice platform: generation, cloning, dubbing, agents",
    "descZh": "覆盖语音生成、克隆、配音与语音 Agent 的平台",
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
    "solves": "Coding agents ship PRs faster than anyone can read them, so review became the bottleneck. CodeRabbit reads the whole repo, then scores, ranks and explains each one.",
    "solvesZh": "编程智能体交 PR 的速度已经超过人读的速度，评审成了瓶颈。CodeRabbit 读整个仓库，再给每个 PR 打分、排序、解说。",
    "bestFor": "A queue of agent-written PRs that nobody has time to read properly.",
    "bestForZh": "手上堆着一堆智能体写的 PR，已经没有人有时间认真读。",
    "released": "2023-01-01",
    "datePrecision": "month",
    "homepage": "https://www.coderabbit.ai",
    "desc": "Agentic change management: review, triage, explain, secure.",
    "descZh": "面向智能体产出的评审、分诊、解读与安全检查。",
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
    "logo": "/assets/logos/helicone.png",
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "The provider dashboard shows totals, so a doubled bill tells you nothing. Point base_url at Helicone and every call, cost and error is attributed to a user.",
    "solvesZh": "服务商后台只有总额，账单翻倍了也查不出原因。把 base_url 指向 Helicone，每次调用、成本和错误都能归到具体用户。",
    "bestFor": "When you need to attribute spend and failures to specific users or features.",
    "bestForZh": "当你要把花费和失败归因到具体用户或功能。",
    "released": "2023-01-01",
    "datePrecision": "month",
    "homepage": "https://www.helicone.ai",
    "desc": "Open-source LLM gateway and observability layer",
    "descZh": "开源的 LLM 网关与可观测平台，2026-03 被 Mintlify 收购",
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
    "solves": "Deck colours never match the brand, and a template falls apart the moment you edit it. Presentations.AI pulls colours from your site and exports an editable pptx.",
    "solvesZh": "PPT 配色总不吻合品牌，套模板一改就散。它从你的网站抓品牌色，导出的 pptx 还能再改。",
    "bestFor": "A deck that has to match the company brand, not a blank page.",
    "bestForZh": "要交一份符合公司品牌的演示稿，而不是从空白页开始。",
    "released": "2023-01-01",
    "datePrecision": "month",
    "homepage": "https://www.presentations.ai/",
    "desc": "Deck generator that pulls brand colours from your site.",
    "descZh": "能从你公司网站提取品牌配色的 PPT 生成器。",
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
    "solves": "A production asset needs the right subject, the right style and the right size, and stock does not have it. Leonardo generates, then you tune.",
    "solvesZh": "能上线的素材要主体对、风格对、尺寸也对，素材库给不了。Leonardo 先生成，再交给你调。",
    "bestFor": "Game and product imagery that has to look finished and shipped, not merely sketched out.",
    "bestForZh": "游戏和产品图，要的是能直接用的成品感，不是一张草图。",
    "released": "2022-12-07",
    "datePrecision": "day",
    "homepage": "https://leonardo.ai",
    "desc": "Image, video and 3D generation platform, now Canva's",
    "descZh": "图像、视频与 3D 生成平台，已被 Canva 收购",
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
    "solves": "A search page hands you ten links and leaves the reading to you. An answer comes back instead, with the sources attached.",
    "solvesZh": "搜索结果页甩给你十个链接，读不读全靠自己。回来的直接是答案，附上出处。",
    "bestFor": "When you want a researched answer with links you can open to check it.",
    "bestForZh": "当你想要一个有据可查、点开链接能核对的答案时。",
    "released": "2022-12-07",
    "datePrecision": "day",
    "homepage": "https://www.perplexity.ai/",
    "desc": "Answer engine that reads pages and cites the sources",
    "descZh": "读完网页并标注出处的答案引擎",
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
    "solves": "One chat box that drafts, rewrites, translates, and takes follow-ups without you switching tools mid-sentence.",
    "solvesZh": "一个对话框里起草、改写、翻译、接着追问，中途不用切走。",
    "bestFor": "Drafting, translating, or untangling a piece of writing before anyone else sees it.",
    "bestForZh": "要起草、翻译，或者把写好的一整段文字理顺再发出去的时候。",
    "released": "2022-11-30",
    "datePrecision": "day",
    "homepage": "https://chatgpt.com/",
    "desc": "OpenAI's general-purpose conversational assistant.",
    "descZh": "OpenAI 的通用对话助手，写东西、查资料、出主意都在这儿。",
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
    "solves": "Notes in Notion, assistant in another tab — context never crosses. This one works inside the page, and needs the Business plan or above.",
    "solvesZh": "笔记在 Notion，助手在另一个标签页，上下文永远过不去。这个直接在工作页面里干活，而且要 Business 档或以上。",
    "bestFor": "When the material is already a Notion page and you want to draft, search across connected apps, or fill in properties in place.",
    "bestForZh": "当材料本来就是一个 Notion 页面，你想就地起草、跨应用搜索或补属性。",
    "released": "2022-11-16",
    "datePrecision": "day",
    "homepage": "https://www.notion.so/product/ai",
    "desc": "AI that works inside Notion pages and databases",
    "descZh": "在 Notion 页面与数据库里就地工作的 AI",
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
    "solves": "Keyword search returns pages that merely contain the words, and an agent cannot read ten of them. The excerpts that answer the question come back as highlights.",
    "solvesZh": "关键词搜索返回的是碰巧含词的网页，智能体没法把十篇都读完。能回答问题的那几段，以 highlights 直接返回。",
    "bestFor": "When an agent needs source text it can quote, not a list of links to open.",
    "bestForZh": "当智能体需要的是可以直接引用的原文，而不是一堆待打开的链接时。",
    "released": "2022-11-01",
    "datePrecision": "day",
    "homepage": "https://exa.ai",
    "desc": "Search API returning token-efficient excerpts with highlights",
    "descZh": "返回高亮片段而非整页的检索 API",
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
    "solves": "Your documents sit in ten places in ten formats and the model has read none of them. Parsing, chunking, embedding, and retrieval all run across them.",
    "solvesZh": "你的文档散在十个地方、十种格式里，模型一份也没读过。解析、切块、嵌入和检索统一跑一遍。",
    "bestFor": "When you are building question answering over a document pile nobody has organized.",
    "bestForZh": "当你要在一堆没人整理过的文档上做一个问答功能时。",
    "released": "2022-11-01",
    "datePrecision": "day",
    "homepage": "https://www.llamaindex.ai/",
    "desc": "Turns documents into AI-ready context for agents to use",
    "descZh": "把文档转成智能体可直接使用的上下文",
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
    "logo": "/assets/logos/chroma.png",
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "Semantic search that needs a running database service eats an afternoon. Retrieval runs serverless on object storage, or embedded in the app.",
    "solvesZh": "语义检索要先跑起一个数据库服务，搭完要一下午。检索可以无服务器跑在对象存储上，也能嵌进应用。",
    "bestFor": "When a prototype needs real retrieval and you refuse to run a database server.",
    "bestForZh": "当原型需要真正的检索，而你又不想再跑一个数据库服务时。",
    "released": "2022-10-01",
    "datePrecision": "day",
    "homepage": "https://www.trychroma.com/",
    "desc": "Open-source search infrastructure: vector, full-text, regex, metadata",
    "descZh": "开源检索基础设施，兼容向量、全文、正则与元数据",
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
    "solves": "An OpenAI-compatible API is what makes a model swappable, but only if the latency holds. Fireworks, built by the PyTorch creators, runs open models with throughput they publish.",
    "solvesZh": "接口做成 OpenAI 形状，模型才好换，前提是延迟顶得住。Fireworks 由 PyTorch 团队打造，跑开放模型时的吞吐有官方数据。",
    "bestFor": "When you want an open-weight model in production without buying hardware.",
    "bestForZh": "当你想在生产环境跑开放权重模型，又不打算自购硬件。",
    "released": "2022-10-01",
    "datePrecision": "day",
    "homepage": "https://fireworks.ai/",
    "desc": "Inference platform from the PyTorch creators",
    "descZh": "PyTorch 团队做的模型推理平台",
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
    "solves": "Tool calling, memory and retries are the same three problems in every agent. LangChain already solved them, and the logic stays yours.",
    "solvesZh": "工具调用、记忆、重试，每个 Agent 都要重解一遍同样的三个问题。LangChain 已经解过，逻辑仍然归你。",
    "bestFor": "A multi-step agent where tool calling and memory are not the interesting part.",
    "bestForZh": "在搭一个多步 Agent，而工具调用和记忆不是你要琢磨的部分。",
    "released": "2022-10-01",
    "datePrecision": "day",
    "homepage": "https://www.langchain.com",
    "desc": "Open-source framework for building agents",
    "descZh": "构建智能体的开源框架",
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
    "solves": "Assistants steer you toward finishing something. Here the character keeps its own voice and backstory, and the point is the conversation rather than the outcome.",
    "solvesZh": "助手总在把你引向「完成某件事」。这里的角色有自己的口吻和背景，重点是对话本身，不是结果。",
    "bestFor": "When the point is staying in character, not getting something done.",
    "bestForZh": "当重点是待在人设里，而不是把事办完。",
    "released": "2022-09-16",
    "datePrecision": "day",
    "homepage": "https://character.ai/",
    "desc": "Chat platform where users create the characters",
    "descZh": "由用户创建角色并扮演的对话平台",
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
    "solves": "A blank first slide is a blank page. One sentence produces a laid-out deck; the cards move like ordinary blocks afterwards.",
    "solvesZh": "空白的第一页就是一张白纸。一句话先出排好版的 deck，之后按卡片继续改。",
    "bestFor": "A deck needed today, with the content already formed in your head.",
    "bestForZh": "今天就要拿出去一份能看的 deck，内容已经在脑子里成形。",
    "released": "2022-08-01",
    "datePrecision": "day",
    "homepage": "https://gamma.app/",
    "desc": "Turns a prompt into a deck, doc or webpage",
    "descZh": "一句话变出演示稿、文档或网页",
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
    "solves": "The training video has to ship in six languages and the speaker speaks none of the other five. The voice is cloned, then lip-synced to the dub.",
    "solvesZh": "培训视频要做六种语言，而主讲人一种都不会。声音被克隆出来，再对着另一种语言做嘴型。",
    "bestFor": "When one recorded video has to ship in several languages with the same presenter on camera.",
    "bestForZh": "当一条录好的视频要以同一位出镜主讲人，发到多个语言版本时。",
    "released": "2022-07-29",
    "datePrecision": "day",
    "homepage": "https://www.heygen.com",
    "desc": "AI avatar video with voice cloning and multilingual dubbing",
    "descZh": "带声音克隆与多语言配音的 AI 数字人视频",
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
    "solves": "Most generators return a technically correct image that looks generated. Midjourney's output has been good enough to use without a cleanup pass.",
    "solvesZh": "多数生成器出的图技术上没错，一眼却看出是机器做的。Midjourney 的成品大多能直接用，省掉返工。",
    "bestFor": "An image that has to look designed, not just illustrate the prompt.",
    "bestForZh": "当这张图要看起来是设计过的，而不只是把 prompt 画出来。",
    "released": "2022-07-12",
    "datePrecision": "day",
    "homepage": "https://www.midjourney.com",
    "desc": "Image generator known for output that looks designed",
    "descZh": "以成片观感著称的图像生成产品",
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
    "solves": "It was built to explain code the way another developer would. The service shut down in January 2026, so this is a record rather than a recommendation.",
    "solvesZh": "它被做出来，是为了像同行开发者那样解释代码。服务已在 2026 年 1 月关停，这条只作记录，不作推荐。",
    "bestFor": "Reference only. The service was shut down in January 2026.",
    "bestForZh": "仅作参考。服务已于 2026 年 1 月关停。",
    "released": "2022-07-01",
    "datePrecision": "day",
    "homepage": "https://www.phind.com",
    "desc": "Developer-focused search, shut down in January 2026.",
    "descZh": "面向开发者的搜索，已于 2026 年 1 月关停",
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
    "solves": "The frontier API works until the invoice arrives and you cannot move the load. Together AI's serverless inference and fine-tuning give open-weight models a cheaper floor.",
    "solvesZh": "前沿 API 本来好用，直到账单来了又换不动量。Together AI 的按需推理和微调，给开放权重模型一个更便宜的下限。",
    "bestFor": "When per-token cost at your volume is the problem, not model quality.",
    "bestForZh": "当问题出在你这个用量下的单 token 成本，而不是模型质量。",
    "released": "2022-06-01",
    "datePrecision": "day",
    "homepage": "https://www.together.ai/",
    "desc": "Cloud for running and fine-tuning open-weight models",
    "descZh": "面向开放权重模型的推理与微调云平台",
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
    "logo": "/assets/logos/fathom.png",
    "region": "intl",
    "category": "meetings",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "The call is already the record — nobody has to sit through it again to write it up. Fathom transcribes, summarises and files it.",
    "solvesZh": "通话本身就是记录，不用再有人听一遍写一遍。Fathom 转写、摘要，再推到 Salesforce 或 HubSpot。",
    "bestFor": "Back-to-back sales or support calls with no time left to take notes.",
    "bestForZh": "销售或客服通话一场接一场，中间抽不出手做笔记。",
    "released": "2021-12-01",
    "datePrecision": "day",
    "homepage": "https://fathom.video",
    "desc": "Free meeting notetaker that syncs to Salesforce and HubSpot",
    "descZh": "免费会议纪要工具，同步进 CRM",
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
    "solves": "A shoot means a camera, a location, a crew and a weather window. Gen-4.5 produces the footage, and Creative handles the cut in the same workspace.",
    "solvesZh": "拍一个镜头要机器、场地、一组人，还得等天气。Gen-4.5 出素材，剪辑在同一个工作区里做完。",
    "bestFor": "Footage you cannot or would not actually shoot, and need delivered this week.",
    "bestForZh": "当你需要拍不了、或者根本不想去拍的素材，而且这周就要交。",
    "released": "2021-12-01",
    "datePrecision": "day",
    "homepage": "https://runwayml.com",
    "desc": "Creative workspace and API for generating and editing video",
    "descZh": "生成与剪辑视频的创作工作区，2021-12 上线",
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
    "solves": "Putting live web data into an AI answer means scraping and cleaning pages yourself. You.com sells that layer, with zero data retention.",
    "solvesZh": "让 AI 回答里有实时网页内容，意味着自己抓取和清洗。You.com 把这层直接卖出来，零数据留存。",
    "bestFor": "Shipping an agent that must cite live pages, without building the crawler.",
    "bestForZh": "Agent 的回答必须引用实时网页，而你不想自己养爬虫。",
    "released": "2021-12-01",
    "datePrecision": "day",
    "homepage": "https://you.com",
    "desc": "Search and Contents APIs sold to AI products",
    "descZh": "卖给 AI 产品的搜索与网页抽取 API",
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
    "solves": "Choosing a model on a benchmark tells you nothing about your own documents. The console runs Jamba on your text first, so you see the output before signing.",
    "solvesZh": "看跑分选模型，对自己的文档没有参考价值。这个控制台能先拿你的文本跑一遍 Jamba，签约前就看到输出。",
    "bestFor": "When you are comparing a model on real documents before committing to a contract.",
    "bestForZh": "当你想在签约前用真实文档比一比模型。",
    "released": "2021-08-17",
    "datePrecision": "day",
    "homepage": "https://studio.ai21.com/",
    "desc": "AI21's developer console for the Jamba model family",
    "descZh": "面向 Jamba 系列模型的开发者控制台",
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
    "solves": "It finishes the line you are on, then suggests the next edit. It also plans, explores, and executes a task on its own.",
    "solvesZh": "它先补完你正在写的那一行，再提示下一个改动；也能自己规划、探索并执行一个任务。",
    "bestFor": "When you are in VS Code, JetBrains, or Neovim and want the next lines already written.",
    "bestForZh": "当你在 VS Code、JetBrains 或 Neovim 里写代码，希望接下来几行已经替你写好时。",
    "released": "2021-06-29",
    "datePrecision": "day",
    "homepage": "https://github.com/features/copilot",
    "desc": "Code completion and agents inside your editor",
    "descZh": "装在编辑器里的代码补全与智能体",
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
    "solves": "Model, hosting and audit trail bought and configured separately, which is what a regulated reviewer asks about. Vertex bundled them; it is now Gemini Enterprise.",
    "solvesZh": "模型、托管和审计记录要分开采购配置，这正是受监管审查会追问的。Vertex 把三者打包，2026 年更名 Gemini Enterprise。",
    "bestFor": "A regulated team that needed Gemini behind a traceable audit trail rather than a spreadsheet of it.",
    "bestForZh": "受监管的团队需要在一份可追溯的审计记录下用 Gemini。",
    "released": "2021-05-18",
    "datePrecision": "day",
    "homepage": "https://cloud.google.com/vertex-ai",
    "desc": "Google Cloud's former platform, now Gemini Enterprise",
    "descZh": "Google Cloud 的企业级 AI 与 Agent 平台，2026 年更名 Gemini Enterprise",
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
    "solves": "Semantic search is a vector database you now run, size, back up and patch. Pinecone indexes over an API, so there is no cluster to size.",
    "solvesZh": "语义检索意味着你要自己跑、扩容、备份、打补丁的那个向量库。Pinecone 通过 API 建索引，没有集群要你操心。",
    "bestFor": "An app that searches by meaning, or an agent that needs a memory it can recall from.",
    "bestForZh": "当应用需要按语义搜索，或者 Agent 需要一份能被回忆起来的记忆。",
    "released": "2021-01-27",
    "datePrecision": "day",
    "homepage": "https://www.pinecone.io/",
    "desc": "Managed vector database for semantic search and memory",
    "descZh": "全托管的向量数据库，做语义检索和记忆",
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
    "solves": "Vector search alone misses the exact keyword that mattered. Weaviate runs keyword and vector search in the same query, and stays self-hostable.",
    "solvesZh": "纯向量检索会漏掉那个关键的确切关键词。Weaviate 在一次查询里同时跑关键词和向量，而且可以自己托管。",
    "bestFor": "Hybrid retrieval, where data sovereignty rules out a managed vector store.",
    "bestForZh": "需要混合检索，但数据主权要求排除了托管式向量库。",
    "released": "2021-01-14",
    "datePrecision": "day",
    "homepage": "https://weaviate.io/",
    "desc": "Open-source vector database with hybrid search built in.",
    "descZh": "支持混合检索的开源向量数据库",
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
    "solves": "Similarity on its own returns the wrong neighbours whenever the metadata matters. Qdrant filters on structured fields inside the same query, alongside the vector.",
    "solvesZh": "元数据重要的时候，只看相似度会返回不相关的邻居。Qdrant 在同一次查询里按结构化字段过滤，和向量一起。",
    "bestFor": "Retrieval that has to respect tenant, date or user, not just distance.",
    "bestForZh": "检索要按租户、日期、用户过滤，而不只是看距离。",
    "released": "2021-01-01",
    "datePrecision": "month",
    "homepage": "https://qdrant.tech/",
    "desc": "Open-source vector database for retrieval and search.",
    "descZh": "用 Rust 写的开源向量搜索引擎",
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
    "solves": "Recording the same policy update once per region does not scale. A script, an avatar and a voiceover in 140+ languages produce it in an afternoon.",
    "solvesZh": "同一条政策更新要按地区反复录。脚本加数字人，再用 140 多种语言配音，一个下午就能出齐。",
    "bestFor": "Training and internal comms where the message must match word for word across regions, and no one needs a real face.",
    "bestForZh": "培训和内部沟通，口径要逐字一致，而且不需要真人出镜。",
    "released": "2020-11-01",
    "datePrecision": "day",
    "homepage": "https://www.synthesia.io",
    "desc": "AI avatar videos with voiceover in 140+ languages",
    "descZh": "数字人视频平台，配音支持 140 多种语言",
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
    "solves": "Cutting means scrubbing a timeline frame by frame. Here the words are the timeline — edit a sentence, the video changes.",
    "solvesZh": "剪片子要在时间轴上一帧帧拖。这里文字就是时间轴，改一句话，画面跟着变。",
    "bestFor": "Editing interviews or podcasts where the words are known but the frame numbers are not.",
    "bestForZh": "剪访谈、播客这类口播内容：记得说了什么，不记得在第几帧。",
    "released": "2020-10-21",
    "datePrecision": "day",
    "homepage": "https://www.descript.com",
    "desc": "Edit audio and video by editing the transcript",
    "descZh": "像改文字稿一样剪音视频",
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
    "solves": "Wiring a model means handling auth, retries, billing, and rate limits yourself. These endpoints do that part.",
    "solvesZh": "自己接模型要处理鉴权、重试、计费和限流。这套接口替你做掉这一层。",
    "bestFor": "You are adding a model to your own product and do not want to run the plumbing.",
    "bestForZh": "你要给自己的产品接一个模型，又不想自己维护那套管道。",
    "released": "2020-06-17",
    "datePrecision": "day",
    "homepage": "https://platform.openai.com/",
    "desc": "Hosted API for GPT, image, audio and video models.",
    "descZh": "OpenAI 托管的模型 API，涵盖文本、图像、语音与视频。",
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
    "solves": "Smart is not useful. Training on agreeable crowd answers teaches a model to be agreeable. Domain experts are sourced instead, and benchmarks are built in-house.",
    "solvesZh": "聪明不等于有用。用讨好的众包答案训练，只会让模型也变得讨好。改为找领域专家，基准也自己出。",
    "bestFor": "When a frontier lab needs preference and RLHF data a general crowd cannot produce.",
    "bestForZh": "当前沿实验室需要通用众包做不出来的偏好数据和 RLHF 数据时。",
    "released": "2020-01-01",
    "datePrecision": "month",
    "homepage": "https://www.surgehq.ai/",
    "desc": "Expert human data and RLHF services for frontier labs",
    "descZh": "面向前沿实验室的专家数据与 RLHF 服务",
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
    "solves": "Nobody sits through the recording again. tl;dv pulls the moments out and logs them to the CRM on its own.",
    "solvesZh": "没人会再看一遍录像。tl;dv 把高光片段挑出来，自己写进 CRM。",
    "bestFor": "Calls back to back all day, where only the key moments are worth keeping.",
    "bestForZh": "会议一整天连着开，只有关键片刻值得留下。",
    "released": "2020-01-01",
    "datePrecision": "month",
    "homepage": "https://tldv.io",
    "desc": "Meeting recorder that extracts the moments worth keeping.",
    "descZh": "会议录制与 AI 高光片段提取",
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
    "solves": "Milvus Standalone stops at millions of vectors; Distributed is a different deployment, not a bigger machine.",
    "solvesZh": "Standalone 到百万级向量就够不着了；Distributed 是换一种部署，不是换一台更大的机器。",
    "bestFor": "Similarity search that has outgrown a single-box index and needs horizontal scale.",
    "bestForZh": "相似度检索已经撑爆单机索引，需要的是横向扩容。",
    "released": "2019-11-01",
    "datePrecision": "day",
    "homepage": "https://milvus.io/",
    "desc": "Distributed vector database for tens of billions of vectors",
    "descZh": "云原生分布式向量数据库",
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
    "solves": "An old photo is soft and scratched, and enlarging it only spreads the damage. One pass sharpens the faces, then upscales to print size.",
    "solvesZh": "老照片又糊又有划痕，一放大只是把损伤铺开。一次处理先把人脸补清楚，再放大到能打印的尺寸。",
    "bestFor": "Family photos worth restoring, or a small image you need to use larger.",
    "bestForZh": "值得修的老照片，或者需要放大小尺寸才能用的图。",
    "released": "2019-01-01",
    "datePrecision": "month",
    "homepage": "https://remini.ai/",
    "desc": "Restores and upscales old or blurry photos.",
    "descZh": "修复并放大老照片、模糊照片的修图应用。",
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
    "solves": "Training data cannot leave the company, so it cannot go to an annotation vendor. Labelling, grading, and evals come in-house.",
    "solvesZh": "训练数据不能出公司，也就不能交给外部标注厂商。标注、评分和评测收回内部做。",
    "bestFor": "When the training data has to stay inside the company and cannot go to an outside annotation vendor.",
    "bestForZh": "当训练数据必须留在公司内部、不能交给外部标注厂商时。",
    "released": "2018-07-01",
    "datePrecision": "day",
    "homepage": "https://labelbox.com/",
    "desc": "AI data platform you operate yourself, for training and evals",
    "descZh": "由企业自建的 AI 数据与评测平台",
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
    "solves": "One more line of text and the title no longer fits. Smart Slides realign and resize as you type, so a deck stays on-brand after you hand it over.",
    "solvesZh": "多加一行字标题就放不下，只能手动挪框。Smart Slides 边输入边重排，deck 交出去之后也不会慢慢偏离规范。",
    "bestFor": "When someone else inherits the deck and will keep editing it.",
    "bestForZh": "当这份 deck 交出去之后还要由别人继续编辑。",
    "released": "2018-01-01",
    "datePrecision": "month",
    "homepage": "https://www.beautiful.ai/",
    "desc": "Presentation tool built around its Smart Slides layouts",
    "descZh": "以「智能幻灯片」自动重排为核心的演示工具",
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
    "solves": "Some conversations have no second person in them. Replika remembers the routines and plans you tell it, and picks up when you call.",
    "solvesZh": "有些对话里就是没有第二个人。Replika 记得你告诉它的日常和计划，你打过去，它就接。",
    "bestFor": "A private conversation partner you shape yourself, rather than a tool with a task list.",
    "bestForZh": "想要一个自己能塑造的私密聊天对象，而不是带任务清单的工具。",
    "released": "2017-09-01",
    "datePrecision": "day",
    "homepage": "https://replika.com/",
    "desc": "AI companion you customize in appearance and personality.",
    "descZh": "可自定义形象与性格的 AI 伴侣",
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
    "solves": "You changed the prompt and the output got worse, and nobody kept the run that proved it. Every version is tracked, side by side.",
    "solvesZh": "你改了 prompt，结果变差了，却没人留下能证明这一点的运行记录。每个版本都记录下来，并排放着。",
    "bestFor": "When you need to prove which prompt or model version actually produced a result.",
    "bestForZh": "当你要证明某个结果究竟是由哪个 prompt 或哪版模型产生时。",
    "released": "2017-07-01",
    "datePrecision": "day",
    "homepage": "https://wandb.ai",
    "desc": "Platform for building, evaluating, and debugging AI apps",
    "descZh": "用于构建、评测和排查 AI 应用的平台",
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
    "solves": "Post-training needs rated human answers at volume, and a lab has neither the people nor the process. Scale supplies both, and keeps humans in the loop.",
    "solvesZh": "后训练需要成规模、有人评分过的答案，实验室既缺人也缺流程。Scale 两样都提供，并让人留在环里。",
    "bestFor": "Training or evaluating a model where human judgement is the real bottleneck.",
    "bestForZh": "训练或评测模型，而人工判断是真正卡住的那一环。",
    "released": "2016-06-01",
    "datePrecision": "day",
    "homepage": "https://scale.com/",
    "desc": "Human data and evaluations for frontier labs",
    "descZh": "为前沿实验室提供人工数据与评测",
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
    "solves": "Nobody remembers what was decided and the recording is fifty minutes long. Live transcription, speaker recognition, and decisions and action items back at you.",
    "solvesZh": "会开完没人记得定了什么，而录音有五十分钟。实时转写、区分发言人，散会时交回决议和待办。",
    "bestFor": "When you sit in back-to-back calls and need the recap written before you leave the room.",
    "bestForZh": "当你连着开会，需要在走出会议室之前就拿到写好的纪要时。",
    "released": "2016-05-01",
    "datePrecision": "day",
    "homepage": "https://otter.ai",
    "desc": "Meeting notetaker that turns calls into searchable knowledge",
    "descZh": "把会议转成可检索知识库的 AI 记录助手",
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

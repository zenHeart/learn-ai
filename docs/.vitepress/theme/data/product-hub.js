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
 * products 226 条 · categories 10 个 · use-cases 10 个
 *
 * 本文件不含生成时间戳：否则每次运行都会产生差异，--check 闸门将永远报红。
 * 什么时候改的由 git 记录。
 */

export const productHub = {
  categories: [
  {
    "id": "coding-agent",
    "name": "Coding agents",
    "nameZh": "编程 Agent",
    "color": "#16A34A",
    "icon": "💻",
    "count": 48
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
    "id": "chat-assistant",
    "name": "Chat assistants",
    "nameZh": "对话助手",
    "color": "#2563EB",
    "icon": "💬",
    "count": 36
  },
  {
    "id": "multimodal-creation",
    "name": "Multimodal creation",
    "nameZh": "多模态创作",
    "color": "#DB2777",
    "icon": "🎨",
    "count": 31
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
    "id": "developer-sdk",
    "name": "Developer SDKs",
    "nameZh": "开发 SDK",
    "color": "#9333EA",
    "icon": "🧩",
    "count": 13
  },
  {
    "id": "search",
    "name": "AI search",
    "nameZh": "AI 搜索",
    "color": "#EA580C",
    "icon": "🔍",
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
      "amazon-q",
      "amazon-quick-suite",
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
      "doubao",
      "fathom",
      "fireflies-ai",
      "frontier",
      "gamma",
      "gemini-app",
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
      "microsoft-copilot",
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
      "shangliang",
      "sierra-ai",
      "synthesia",
      "talkie",
      "tana",
      "tiangong-agent",
      "tl-dv",
      "tongyi",
      "vibe",
      "wanyo",
      "wenxiaoyan",
      "wenxin-yiyan",
      "work",
      "xinghuo",
      "yuanbao",
      "yuewen"
    ],
    "productCount": 70,
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
          "otter-ai",
          "tana",
          "tl-dv"
        ],
        "productCount": 8
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
          "genspark",
          "notion-ai",
          "quark",
          "tana"
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
          "genspark",
          "glean",
          "mem",
          "notebooklm",
          "notion-ai",
          "p2061",
          "p2265",
          "tana"
        ],
        "productCount": 11
      },
      {
        "id": "slides",
        "label": "Slides & visual docs",
        "labelZh": "幻灯片与图文",
        "weight": 1,
        "productIds": [
          "beautiful-ai",
          "gamma",
          "genspark",
          "presentations-ai",
          "quark"
        ],
        "productCount": 5
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
      "amazon-quick-suite",
      "azure-ai-foundry",
      "bailian",
      "bigmodel",
      "cartesia",
      "chatgpt",
      "chatgpt-agent",
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
      "exa",
      "fireflies-ai",
      "flowise",
      "frontier",
      "gemini-enterprise-agent-platform",
      "genspark",
      "glean",
      "goose",
      "grok-build",
      "gumloop",
      "hume-ai",
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
    "productCount": 67,
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
          "gemini-enterprise-agent-platform",
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
      "deepseek-2",
      "devin",
      "factory",
      "gemini-cli",
      "github-copilot",
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
    "productCount": 54,
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
          "factory",
          "greptile"
        ],
        "productCount": 6
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
      "ai",
      "atlassian-rovo",
      "brave-leo",
      "chatglm",
      "chatgpt",
      "chatgpt-agent",
      "chatgpt-atlas",
      "deepseek-2",
      "dia",
      "doubao",
      "exa",
      "gemini-app",
      "genspark",
      "glean",
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
      "tavily",
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
    "productCount": 48,
    "dimensions": [
      {
        "id": "answer-engine",
        "label": "Answer engine with sources",
        "labelZh": "带出处的问答引擎",
        "weight": 3,
        "productIds": [
          "atlassian-rovo",
          "exa",
          "gemini-app",
          "glean",
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
        "productCount": 14
      },
      {
        "id": "retrieval-stack",
        "label": "Search API for your app",
        "labelZh": "给应用用的检索 API",
        "weight": 3,
        "productIds": [
          "atlassian-rovo",
          "exa",
          "gemini-app",
          "glean",
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
        "productCount": 15
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
      "gemini-enterprise-agent-platform",
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
      "sora",
      "v0",
      "webflow-ai"
    ],
    "productCount": 20,
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
      "runway",
      "sora",
      "synthesia",
      "vidu"
    ],
    "productCount": 16,
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
      "gemini-enterprise-agent-platform",
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
      "cartesia",
      "descript",
      "elevenlabs",
      "hume-ai",
      "suno",
      "udio"
    ],
    "productCount": 6,
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
    "id": "muse",
    "name": "Muse",
    "nameZh": "Muse 个人智能体",
    "vendor": "Meta",
    "vendorZh": "Meta",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "released": "2026-09-08",
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
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "office",
      "research"
    ],
    "form": "web",
    "released": "2026-09-02",
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
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building",
      "research"
    ],
    "form": "desktop",
    "released": "2026-08-25",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "agent-building"
    ],
    "form": "cli",
    "released": "2026-08-01",
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
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "office",
      "research"
    ],
    "form": "web",
    "released": "2026-07-28",
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
    "region": "intl",
    "category": "model-platform",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "api",
    "released": "2026-07-09",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "released": "2026-06-16",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "released": "2026-06-11",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "coding",
      "agent-building"
    ],
    "form": "web",
    "released": "2026-05-28",
    "homepage": "https://mistral.ai/vibe",
    "desc": "Mistral's unified agent for chat, productivity work and coding.",
    "descZh": "Mistral 将对话、办公与编程合并在一起的统一智能体。",
    "tags": [
      "work-mode",
      "code-mode",
      "european",
      "rename"
    ],
    "status": "active",
    "supersededBy": null,
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "agent-building"
    ],
    "form": "cli",
    "released": "2026-05-25",
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
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "web",
    "released": "2026-05-21",
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
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "万"
  },
  {
    "id": "gemini-enterprise-agent-platform",
    "name": "Gemini Enterprise Agent Platform",
    "nameZh": "Gemini 企业智能体平台",
    "vendor": "Google",
    "vendorZh": "Google",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "model-api",
      "observability"
    ],
    "form": "api",
    "released": "2026-04-22",
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
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api",
      "research"
    ],
    "form": "web",
    "released": "2026-03-17",
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
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2026-02-26",
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
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "released": "2026-02-15",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "office"
    ],
    "form": "web",
    "released": "2026-02-05",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "released": "2026-02-05",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design",
      "video"
    ],
    "form": "web",
    "released": "2026-01-28",
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
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "released": "2026-01-22",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "local-private"
    ],
    "form": "self-hosted",
    "released": "2026-01-15",
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
    "id": "claude-cowork",
    "name": "Claude Cowork",
    "nameZh": "Claude Cowork",
    "vendor": "Anthropic",
    "vendorZh": "Anthropic",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "desktop",
    "released": "2026-01-12",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2025-11-18",
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
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "released": "2025-11-17",
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
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "released": "2025-10-27",
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
    "region": "intl",
    "category": "search",
    "useCases": [
      "research",
      "office"
    ],
    "form": "desktop",
    "released": "2025-10-22",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "released": "2025-10-09",
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
    "region": "intl",
    "category": "search",
    "useCases": [
      "research",
      "office"
    ],
    "form": "desktop",
    "released": "2025-10-08",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "released": "2025-10-01",
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
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building",
      "model-api",
      "observability"
    ],
    "form": "web",
    "released": "2025-10-01",
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
    "region": "intl",
    "category": "search",
    "useCases": [
      "research",
      "office"
    ],
    "form": "desktop",
    "released": "2025-09-30",
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
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "O"
  },
  {
    "id": "qoder",
    "name": "Qoder",
    "nameZh": "Qoder",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2025-08-22",
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
    "id": "glm-coding-plan",
    "name": "GLM Coding Plan",
    "nameZh": "GLM Coding Plan",
    "vendor": "智谱",
    "vendorZh": "智谱",
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "web",
    "released": "2025-07-28",
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
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2025-07-22",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "research"
    ],
    "form": "web",
    "released": "2025-07-17",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2025-07-14",
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
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "released": "2025-07-11",
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
    "region": "intl",
    "category": "search",
    "useCases": [
      "research",
      "office"
    ],
    "form": "desktop",
    "released": "2025-07-09",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "released": "2025-06-25",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "image-design"
    ],
    "form": "ide",
    "released": "2025-06-23",
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
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "released": "2025-06-19",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "released": "2025-06-01",
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
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2025-05-30",
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
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "released": "2025-05-22",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "image-design"
    ],
    "form": "web",
    "released": "2025-05-20",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "released": "2025-05-18",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "web",
    "released": "2025-05-16",
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
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "released": "2025-04-29",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "released": "2025-04-29",
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
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "released": "2025-04-18",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "released": "2025-04-16",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2025-04-16",
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
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "J"
  },
  {
    "id": "nvidia-nemo",
    "name": "NVIDIA NeMo",
    "nameZh": "NVIDIA NeMo 智能体平台",
    "vendor": "NVIDIA",
    "vendorZh": "NVIDIA",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "observability",
      "model-api"
    ],
    "form": "self-hosted",
    "released": "2025-04-01",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "research",
      "office"
    ],
    "form": "web",
    "released": "2025-03-06",
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
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2025-03-03",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "image-design"
    ],
    "form": "web",
    "released": "2025-03-01",
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
    "region": "cn",
    "category": "search",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "released": "2025-03-01",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "released": "2025-02-24",
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
    "id": "deepseek-2",
    "name": "DeepSeek",
    "nameZh": "DeepSeek",
    "vendor": "DeepSeek",
    "vendorZh": "DeepSeek",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "coding",
      "research"
    ],
    "form": "web",
    "released": "2025-01-15",
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
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "agent-building",
      "office",
      "local-private"
    ],
    "form": "self-hosted",
    "released": "2025-01-10",
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
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "N"
  },
  {
    "id": "goose",
    "name": "Goose",
    "nameZh": "Goose",
    "vendor": "Block",
    "vendorZh": "Block",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "agent-building",
      "local-private"
    ],
    "form": "desktop",
    "released": "2025-01-01",
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
    "region": "cn",
    "category": "enterprise-api",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "api",
    "released": "2024-12-26",
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
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "D"
  },
  {
    "id": "jules",
    "name": "Jules",
    "nameZh": "Jules",
    "vendor": "Google",
    "vendorZh": "Google",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "web",
    "released": "2024-12-11",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "released": "2024-12-01",
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
    "region": "cn",
    "category": "search",
    "useCases": [
      "research"
    ],
    "form": "web",
    "released": "2024-11-27",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "web",
    "released": "2024-11-21",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "web",
    "released": "2024-11-19",
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
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "released": "2024-11-04",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "desktop",
    "released": "2024-10-31",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2024-10-31",
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
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "R"
  },
  {
    "id": "atlassian-rovo",
    "name": "Atlassian Rovo",
    "nameZh": "Atlassian Rovo",
    "vendor": "Atlassian",
    "vendorZh": "Atlassian",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "released": "2024-10-09",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2024-10-03",
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
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "B"
  },
  {
    "id": "agentforce",
    "name": "Agentforce",
    "nameZh": "Agentforce",
    "vendor": "Salesforce",
    "vendorZh": "Salesforce",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "released": "2024-09-12",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2024-09-05",
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
    "region": "intl",
    "category": "search",
    "useCases": [
      "research"
    ],
    "form": "web",
    "released": "2024-09-04",
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
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "released": "2024-09-03",
    "homepage": "https://yiyan.baidu.com",
    "desc": "文心一言 App 更名后的新版助手",
    "descZh": "文心一言 App 更名后的新版助手",
    "tags": [
      "chat-assistant",
      "wenxin",
      "baidu"
    ],
    "status": "active",
    "supersededBy": null,
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
    "region": "cn",
    "category": "enterprise-api",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "released": "2024-09-01",
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
    "region": "cn",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "image-design"
    ],
    "form": "web",
    "released": "2024-09-01",
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
    "region": "intl",
    "category": "search",
    "useCases": [
      "research"
    ],
    "form": "api",
    "released": "2024-08-30",
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
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api",
      "local-private"
    ],
    "form": "api",
    "released": "2024-08-26",
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
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "office",
      "research"
    ],
    "form": "web",
    "released": "2024-07-30",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2024-07-01",
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
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2024-06-26",
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
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "豆"
  },
  {
    "id": "hume-ai",
    "name": "Hume AI",
    "nameZh": "Hume AI",
    "vendor": "Hume AI",
    "vendorZh": "Hume AI",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "audio-voice",
      "agent-building"
    ],
    "form": "web",
    "released": "2024-06-19",
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
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "released": "2024-06-13",
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
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability"
    ],
    "form": "self-hosted",
    "released": "2024-06-12",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video"
    ],
    "form": "web",
    "released": "2024-06-12",
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
    "region": "cn",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "image-design"
    ],
    "form": "web",
    "released": "2024-06-06",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "released": "2024-06-01",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "research",
      "office",
      "agent-building"
    ],
    "form": "web",
    "released": "2024-06-01",
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
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "released": "2024-05-30",
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
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "released": "2024-05-30",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office"
    ],
    "form": "web",
    "released": "2024-05-22",
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
    "region": "cn",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "image-design"
    ],
    "form": "web",
    "released": "2024-05-09",
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
    "region": "cn",
    "category": "model-platform",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "api",
    "released": "2024-05-01",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "released": "2024-04-30",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video"
    ],
    "form": "web",
    "released": "2024-04-27",
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
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "V"
  },
  {
    "id": "reka-ai",
    "name": "Reka AI",
    "nameZh": "Reka AI",
    "vendor": "Reka AI",
    "vendorZh": "Reka AI",
    "region": "intl",
    "category": "model-platform",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "released": "2024-04-15",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "desktop",
    "released": "2024-04-11",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "audio-voice"
    ],
    "form": "web",
    "released": "2024-04-10",
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
    "region": "cn",
    "category": "enterprise-api",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "api",
    "released": "2024-03-19",
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
    "region": "intl",
    "category": "model-platform",
    "useCases": [
      "model-api",
      "local-private"
    ],
    "form": "api",
    "released": "2024-03-18",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "web",
    "released": "2024-03-12",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "agent-building"
    ],
    "form": "self-hosted",
    "released": "2024-03-12",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "released": "2024-03-06",
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
    "region": "cn",
    "category": "search",
    "useCases": [
      "research"
    ],
    "form": "web",
    "released": "2024-03-01",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "released": "2024-02-26",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "released": "2024-02-16",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "image-design"
    ],
    "form": "web",
    "released": "2024-02-15",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "released": "2024-02-08",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "released": "2024-02-07",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "released": "2024-02-01",
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
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "released": "2024-02-01",
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
    "region": "intl",
    "category": "local-runner",
    "useCases": [
      "local-private"
    ],
    "form": "desktop",
    "released": "2024-01-20",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "desktop",
    "released": "2024-01-09",
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
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "R"
  },
  {
    "id": "cartesia",
    "name": "Cartesia",
    "nameZh": "Cartesia",
    "vendor": "Cartesia AI",
    "vendorZh": "Cartesia AI",
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building",
      "audio-voice"
    ],
    "form": "api",
    "released": "2024-01-01",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "observability"
    ],
    "form": "web",
    "released": "2024-01-01",
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
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "G"
  },
  {
    "id": "suno",
    "name": "Suno",
    "nameZh": "Suno",
    "vendor": "Suno",
    "vendorZh": "Suno",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "audio-voice"
    ],
    "form": "web",
    "released": "2023-12-20",
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
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "model-api"
    ],
    "form": "web",
    "released": "2023-12-13",
    "homepage": "https://aistudio.google.com/",
    "desc": "Free web playground for prompting and tuning Gemini models",
    "descZh": "免费网页工作台，用于提示词调试与 Gemini 模型微调",
    "tags": [
      "playground",
      "prompt-engineering",
      "free-tier",
      "developer-tools"
    ],
    "status": "active",
    "supersededBy": null,
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
    "region": "intl",
    "category": "model-platform",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "released": "2023-12-11",
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
    "region": "intl",
    "category": "local-runner",
    "useCases": [
      "local-private"
    ],
    "form": "self-hosted",
    "released": "2023-12-05",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "local-private",
      "observability"
    ],
    "form": "ide",
    "released": "2023-12-01",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video"
    ],
    "form": "web",
    "released": "2023-11-29",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2023-11-28",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2023-11-21",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "released": "2023-11-15",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2023-11-14",
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
    "region": "cn",
    "category": "model-platform",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "released": "2023-11-09",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "released": "2023-11-07",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "released": "2023-11-04",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research"
    ],
    "form": "desktop",
    "released": "2023-11-02",
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
    "region": "cn",
    "category": "model-platform",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "api",
    "released": "2023-11-01",
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
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building"
    ],
    "form": "self-hosted",
    "released": "2023-11-01",
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
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "C"
  },
  {
    "id": "bailian",
    "name": "阿里云百炼",
    "nameZh": "阿里云百炼",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "region": "cn",
    "category": "model-platform",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "api",
    "released": "2023-11-01",
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
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "released": "2023-10-31",
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
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2023-10-31",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design",
      "office"
    ],
    "form": "web",
    "released": "2023-10-24",
    "homepage": "https://www.canva.com/magic-studio/",
    "desc": "AI design suite that pushed generative creation to non-designers",
    "descZh": "把生成式创作带给非设计用户的套件，是最大规模的消费级 AI 创作入口之一",
    "tags": [
      "design",
      "consumer",
      "image-generation"
    ],
    "status": "active",
    "supersededBy": null,
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
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2023-10-24",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "hardware",
    "released": "2023-10-17",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "image-design"
    ],
    "form": "web",
    "released": "2023-10-11",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "self-hosted",
    "released": "2023-10-04",
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
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "released": "2023-10-01",
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
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "released": "2023-09-29",
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
    "region": "intl",
    "category": "model-platform",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "released": "2023-09-28",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design",
      "coding"
    ],
    "form": "web",
    "released": "2023-09-05",
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
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "W"
  },
  {
    "id": "hunyuan",
    "name": "腾讯混元",
    "nameZh": "腾讯混元",
    "vendor": "腾讯",
    "vendorZh": "腾讯",
    "region": "cn",
    "category": "model-platform",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "released": "2023-09-01",
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
    "id": "chatglm",
    "name": "智谱清言",
    "nameZh": "智谱清言",
    "vendor": "智谱",
    "vendorZh": "智谱",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "released": "2023-08-31",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "released": "2023-08-22",
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
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability",
      "local-private"
    ],
    "form": "self-hosted",
    "released": "2023-08-20",
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
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "released": "2023-08-17",
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
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability"
    ],
    "form": "web",
    "released": "2023-08-01",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design",
      "video"
    ],
    "form": "web",
    "released": "2023-08-01",
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
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "model-api",
      "agent-building",
      "observability"
    ],
    "form": "self-hosted",
    "released": "2023-08-01",
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
    "region": "cn",
    "category": "local-runner",
    "useCases": [
      "local-private"
    ],
    "form": "self-hosted",
    "released": "2023-08-01",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "released": "2023-07-26",
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
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability"
    ],
    "form": "web",
    "released": "2023-07-18",
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
    "region": "intl",
    "category": "local-runner",
    "useCases": [
      "local-private"
    ],
    "form": "cli",
    "released": "2023-07-08",
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
    "region": "cn",
    "category": "multimodal-creation",
    "useCases": [
      "image-design",
      "video"
    ],
    "form": "web",
    "released": "2023-07-07",
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
    "region": "cn",
    "category": "model-platform",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "released": "2023-06-28",
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
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "released": "2023-06-21",
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
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "api",
    "released": "2023-06-20",
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
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "model-api",
      "coding"
    ],
    "form": "api",
    "released": "2023-06-15",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "released": "2023-06-14",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2023-06-06",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "released": "2023-06-01",
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
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "T"
  },
  {
    "id": "aider",
    "name": "Aider",
    "nameZh": "Aider",
    "vendor": "Aider AI",
    "vendorZh": "Aider AI",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "local-private"
    ],
    "form": "cli",
    "released": "2023-05-10",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "released": "2023-05-09",
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
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "released": "2023-05-06",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "released": "2023-05-02",
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
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "released": "2023-05-01",
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
    "region": "intl",
    "category": "local-runner",
    "useCases": [
      "local-private"
    ],
    "form": "desktop",
    "released": "2023-05-01",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "office"
    ],
    "form": "web",
    "released": "2023-04-25",
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
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "C"
  },
  {
    "id": "ai",
    "name": "天工AI",
    "nameZh": "天工AI",
    "vendor": "昆仑万维",
    "vendorZh": "昆仑万维",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "released": "2023-04-18",
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
    "region": "intl",
    "category": "local-runner",
    "useCases": [
      "local-private"
    ],
    "form": "desktop",
    "released": "2023-04-03",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "local-private"
    ],
    "form": "self-hosted",
    "released": "2023-03-29",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "released": "2023-03-17",
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
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "released": "2023-03-16",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "coding"
    ],
    "form": "web",
    "released": "2023-03-14",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2023-03-01",
    "homepage": "https://cursor.com",
    "desc": "TAMPERED",
    "descZh": "基于 VS Code 改造的 AI 原生编辑器，围绕整仓库上下文编辑",
    "tags": [
      "ai-ide",
      "code-editor",
      "agentic-coding"
    ],
    "status": "active",
    "supersededBy": null,
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
    "id": "portkey",
    "name": "Portkey",
    "nameZh": "Portkey",
    "vendor": "Portkey",
    "vendorZh": "Portkey",
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api",
      "observability"
    ],
    "form": "web",
    "released": "2023-03-01",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "local-private"
    ],
    "form": "ide",
    "released": "2023-03-01",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "released": "2023-02-20",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "released": "2023-02-07",
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
    "handbook": {
      "status": "written",
      "route": {
        "en": "/products/copilot/",
        "zh": "/zh/products/copilot/"
      }
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "audio-voice"
    ],
    "form": "web",
    "released": "2023-01-23",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "observability"
    ],
    "form": "web",
    "released": "2023-01-01",
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
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability"
    ],
    "form": "web",
    "released": "2023-01-01",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "office"
    ],
    "form": "web",
    "released": "2023-01-01",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "released": "2022-12-07",
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
    "region": "intl",
    "category": "search",
    "useCases": [
      "research"
    ],
    "form": "web",
    "released": "2022-12-07",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research",
      "agent-building"
    ],
    "form": "web",
    "released": "2022-11-30",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "released": "2022-11-16",
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
    "region": "intl",
    "category": "search",
    "useCases": [
      "research",
      "agent-building"
    ],
    "form": "api",
    "released": "2022-11-01",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "research"
    ],
    "form": "web",
    "released": "2022-11-01",
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
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building",
      "research"
    ],
    "form": "self-hosted",
    "released": "2022-11-01",
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
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building"
    ],
    "form": "self-hosted",
    "released": "2022-10-01",
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
    "region": "intl",
    "category": "model-platform",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "released": "2022-10-01",
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
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building"
    ],
    "form": "self-hosted",
    "released": "2022-10-01",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "released": "2022-09-16",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "office",
      "image-design"
    ],
    "form": "web",
    "released": "2022-08-01",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video"
    ],
    "form": "web",
    "released": "2022-07-29",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "released": "2022-07-12",
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
    "region": "intl",
    "category": "search",
    "useCases": [
      "research",
      "coding"
    ],
    "form": "web",
    "released": "2022-07-01",
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
    "region": "intl",
    "category": "model-platform",
    "useCases": [
      "model-api",
      "agent-building"
    ],
    "form": "api",
    "released": "2022-06-01",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office"
    ],
    "form": "web",
    "released": "2021-12-01",
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
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "F"
  },
  {
    "id": "you-com",
    "name": "You.com",
    "nameZh": "You.com",
    "vendor": "You.com",
    "vendorZh": "You.com",
    "region": "intl",
    "category": "search",
    "useCases": [
      "research"
    ],
    "form": "web",
    "released": "2021-12-01",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building",
      "research"
    ],
    "form": "web",
    "released": "2021-09-15",
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
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "released": "2021-08-17",
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
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "released": "2021-06-29",
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
    "region": "intl",
    "category": "model-platform",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "released": "2021-05-18",
    "homepage": "https://cloud.google.com/vertex-ai",
    "desc": "Google Cloud enterprise platform for generative AI and agents",
    "descZh": "Google Cloud 面向企业的生成式 AI 与智能体平台",
    "tags": [
      "cloud-platform",
      "enterprise",
      "foundation-models",
      "mlops"
    ],
    "status": "active",
    "supersededBy": null,
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
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "agent-building"
    ],
    "form": "api",
    "released": "2021-01-27",
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
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building",
      "local-private"
    ],
    "form": "self-hosted",
    "released": "2021-01-14",
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
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building",
      "local-private"
    ],
    "form": "self-hosted",
    "released": "2021-01-01",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "office"
    ],
    "form": "web",
    "released": "2020-11-01",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "audio-voice"
    ],
    "form": "desktop",
    "released": "2020-10-21",
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
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api"
    ],
    "form": "api",
    "released": "2020-06-17",
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
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "agent-building"
    ],
    "form": "api",
    "released": "2020-01-01",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office"
    ],
    "form": "web",
    "released": "2020-01-01",
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
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building",
      "local-private"
    ],
    "form": "self-hosted",
    "released": "2019-11-01",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "released": "2019-10-01",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "released": "2019-01-01",
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
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": null,
    "glyph": "R"
  },
  {
    "id": "runway",
    "name": "Runway",
    "nameZh": "Runway",
    "vendor": "Runway",
    "vendorZh": "Runway",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video"
    ],
    "form": "web",
    "released": "2018-12-01",
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
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "R"
  },
  {
    "id": "labelbox",
    "name": "Labelbox",
    "nameZh": "Labelbox",
    "vendor": "Labelbox",
    "vendorZh": "Labelbox",
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "released": "2018-07-01",
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
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "office"
    ],
    "form": "web",
    "released": "2018-01-01",
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
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "released": "2017-09-01",
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
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability"
    ],
    "form": "web",
    "released": "2017-07-01",
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
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "agent-building"
    ],
    "form": "api",
    "released": "2016-06-01",
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
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office"
    ],
    "form": "web",
    "released": "2016-05-01",
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
    "handbook": {
      "status": "candidate"
    },
    "lastVerifiedAt": "2026-10-04",
    "glyph": "O"
  }
]
}

export default productHub

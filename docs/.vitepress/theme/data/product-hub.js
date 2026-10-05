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
 * products 350 条 · categories 11 个 · use-cases 10 个
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
    "count": 70
  },
  {
    "id": "multimodal-creation",
    "name": "Multimodal creation",
    "nameZh": "多模态创作",
    "color": "#DB2777",
    "icon": "🎨",
    "count": 62
  },
  {
    "id": "agent-platform",
    "name": "Agent platforms",
    "nameZh": "Agent 平台",
    "color": "#7C3AED",
    "icon": "🧠",
    "count": 60
  },
  {
    "id": "coding-agent",
    "name": "Coding agents",
    "nameZh": "编程 Agent",
    "color": "#16A34A",
    "icon": "💻",
    "count": 58
  },
  {
    "id": "enterprise-api",
    "name": "Enterprise APIs",
    "nameZh": "企业 API",
    "color": "#475569",
    "icon": "🏢",
    "count": 19
  },
  {
    "id": "search",
    "name": "AI search",
    "nameZh": "AI 搜索",
    "color": "#EA580C",
    "icon": "🔍",
    "count": 19
  },
  {
    "id": "developer-sdk",
    "name": "Developer SDKs",
    "nameZh": "开发 SDK",
    "color": "#9333EA",
    "icon": "🧩",
    "count": 16
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
    "id": "eval-observability",
    "name": "Eval & observability",
    "nameZh": "评测与可观测",
    "color": "#DC2626",
    "icon": "📈",
    "count": 13
  },
  {
    "id": "meetings",
    "name": "Meetings & notes",
    "nameZh": "会议与纪要",
    "color": "#0D9488",
    "icon": "🎙️",
    "count": 12
  },
  {
    "id": "local-runner",
    "name": "Local runners",
    "nameZh": "本地运行",
    "color": "#65A30D",
    "icon": "🦙",
    "count": 7
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
      "360-ai-2",
      "agentforce",
      "ai",
      "aily",
      "alibaba",
      "alibaba-2",
      "amazon-q",
      "amazon-quick-suite",
      "ant",
      "appbuilder",
      "apple-intelligence",
      "atlassian-rovo",
      "autoglm",
      "beautiful-ai",
      "bytedance",
      "bytedance-2",
      "bytedance-4",
      "bytedance-5",
      "bytedance-6",
      "canva-magic-studio",
      "character-ai",
      "chatglm",
      "chatgpt",
      "chatgpt-atlas",
      "claude-ai",
      "claude-cowork",
      "claude-desktop",
      "claw",
      "codewave",
      "copilot-cowork",
      "deepl",
      "dia",
      "dola",
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
      "grammarly",
      "granola",
      "grok",
      "harvey",
      "humane-ai-pin",
      "iflytek",
      "ima",
      "inflection-pi",
      "jingxi-agents",
      "jotform-ai-agents",
      "joyai",
      "kimi",
      "le-chat",
      "lindy",
      "lobsterai",
      "manus",
      "meituan",
      "mem",
      "meta-ai",
      "microsoft-365-copilot",
      "microsoft-copilot",
      "microsoft-copilot-vision",
      "monica",
      "muse",
      "netease-youdao",
      "north",
      "notebooklm",
      "notion-agent",
      "notion-ai",
      "notta",
      "opera-neon",
      "otter-ai",
      "perplexity-comet",
      "presentations-ai",
      "qianwen",
      "quark",
      "question-ai",
      "rabbit-r1",
      "ray-ban-meta",
      "replika",
      "samsung-galaxy-ai",
      "sensetime-3",
      "shangliang",
      "sierra-ai",
      "skywork-ai-workspace-agents",
      "slack-ai",
      "slack-code",
      "slack-today",
      "slackbot",
      "sudowrite",
      "synthesia",
      "talkie",
      "tana",
      "tiangong",
      "tiangong-agent",
      "tl-dv",
      "tongyi",
      "traework",
      "typeless",
      "vibe",
      "wanyo",
      "wenxiaotuan",
      "wenxiaoyan",
      "wenxin-yiyan",
      "work",
      "workbuddy",
      "wps-ai",
      "xiaohuanxiong",
      "xiaomi",
      "xinghuo",
      "yuanbao",
      "yuewen",
      "zhipu-input",
      "zoom-ai-companion",
      "zoommate"
    ],
    "productCount": 119,
    "dimensions": [
      {
        "id": "meetings",
        "label": "Meetings & notes",
        "labelZh": "会议与纪要",
        "weight": 3,
        "productIds": [
          "bytedance-5",
          "fathom",
          "fireflies-ai",
          "granola",
          "iflytek",
          "lindy",
          "mem",
          "microsoft-copilot",
          "notta",
          "otter-ai",
          "qianwen",
          "tana",
          "tl-dv",
          "zoom-ai-companion"
        ],
        "productCount": 14
      },
      {
        "id": "writing",
        "label": "Writing & drafting",
        "labelZh": "写作与起草",
        "weight": 3,
        "productIds": [
          "360-ai-2",
          "amazon-quick-suite",
          "deepl",
          "gamma",
          "gemini-in-google-docs-and-sheets",
          "genspark",
          "grammarly",
          "microsoft-365-copilot",
          "netease-youdao",
          "notion-ai",
          "quark",
          "skywork-ai-workspace-agents",
          "sudowrite",
          "wps-ai",
          "zhipu-input"
        ],
        "productCount": 15
      },
      {
        "id": "knowledge-base",
        "label": "Team knowledge base",
        "labelZh": "团队知识库",
        "weight": 2,
        "productIds": [
          "amazon-quick-suite",
          "atlassian-rovo",
          "bytedance-6",
          "claude-cowork",
          "gemini-in-google-docs-and-sheets",
          "genspark",
          "glean",
          "ima",
          "jingxi-agents",
          "mem",
          "netease-youdao",
          "notebooklm",
          "notion-agent",
          "notion-ai",
          "otter-ai",
          "skywork-ai-workspace-agents",
          "xiaohuanxiong"
        ],
        "productCount": 17
      },
      {
        "id": "slides",
        "label": "Slides & visual docs",
        "labelZh": "幻灯片与图文",
        "weight": 1,
        "productIds": [
          "beautiful-ai",
          "bytedance-6",
          "gamma",
          "gemini-in-google-docs-and-sheets",
          "genspark",
          "netease-youdao",
          "presentations-ai",
          "qianwen",
          "quark",
          "sensetime-3",
          "skywork-ai-workspace-agents",
          "wps-ai"
        ],
        "productCount": 12
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
      "360-ai-2",
      "agentarts",
      "agentforce",
      "ai",
      "aily",
      "alibaba-2",
      "amazon-quick-suite",
      "appbuilder",
      "azure-ai-foundry",
      "bailian",
      "base44",
      "bigmodel",
      "browser-use",
      "bytedance",
      "bytedance-2",
      "bytedance-3",
      "bytedance-4",
      "cartesia",
      "chatgpt",
      "chatgpt-agent",
      "chatgpt-projects",
      "chroma",
      "claude-api",
      "claude-cowork",
      "claude-desktop",
      "codearts",
      "cohere-compass",
      "confident-ai",
      "copilot-cowork",
      "coze",
      "coze-space",
      "crewai",
      "d-id",
      "deepseek",
      "dify",
      "dots",
      "exa",
      "fireflies-ai",
      "flowise",
      "frontier",
      "galileo",
      "gemini-enterprise",
      "genspark",
      "glean",
      "goose",
      "grok-build",
      "gumloop",
      "hume-ai",
      "intercom-fin",
      "jingxi-agents",
      "jotform-ai-agents",
      "kimi-claw",
      "labelbox",
      "laminar",
      "langchain",
      "lindy",
      "lingyi-wanwu",
      "litellm",
      "llamaindex",
      "lobsterai",
      "manus",
      "maxim-ai",
      "meituan",
      "meta-model-api",
      "microsoft-copilot-studio",
      "milvus",
      "minimax-2",
      "minimax-agent",
      "mistral-studio",
      "muse",
      "muse-code",
      "n8n",
      "north",
      "notion-agent",
      "nvidia-cosmos",
      "nvidia-nemo",
      "open-webui",
      "openclaw",
      "openhands",
      "pinecone",
      "promptlayer",
      "qdrant",
      "relevance-ai",
      "scale-ai",
      "sensetime-3",
      "sierra-ai",
      "siliconflow",
      "skywork-ai-workspace-agents",
      "stepfun-platform",
      "surge-ai",
      "tiangong-agent",
      "together-ai",
      "traework",
      "vellum",
      "vibe",
      "wanyo",
      "weaviate",
      "work",
      "workbuddy",
      "xiaohuanxiong",
      "yuanqi",
      "zapier-agents",
      "zcode",
      "zoommate"
    ],
    "productCount": 104,
    "dimensions": [
      {
        "id": "no-code",
        "label": "No-code builder",
        "labelZh": "零代码搭建",
        "weight": 3,
        "productIds": [
          "agentforce",
          "appbuilder",
          "coze",
          "dify",
          "flowise",
          "frontier",
          "gumloop",
          "jingxi-agents",
          "microsoft-copilot-studio",
          "relevance-ai",
          "yuanqi",
          "zapier-agents"
        ],
        "productCount": 12
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
          "nvidia-cosmos",
          "zapier-agents",
          "zoommate"
        ],
        "productCount": 10
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
          "browser-use",
          "cartesia",
          "claude-api",
          "cohere-compass",
          "confident-ai",
          "coze-space",
          "crewai",
          "exa",
          "flowise",
          "frontier",
          "gemini-enterprise",
          "glean",
          "grok-build",
          "jingxi-agents",
          "jotform-ai-agents",
          "langchain",
          "lindy",
          "llamaindex",
          "maxim-ai",
          "microsoft-copilot-studio",
          "minimax-agent",
          "mistral-studio",
          "nvidia-nemo",
          "pinecone",
          "relevance-ai",
          "skywork-ai-workspace-agents",
          "tiangong-agent",
          "yuanqi",
          "zapier-agents",
          "zoommate"
        ],
        "productCount": 31
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
      "360-ai",
      "anara",
      "ant",
      "aq",
      "arena",
      "atlassian-rovo",
      "autoglm",
      "brave-leo",
      "browser-use",
      "bytedance-6",
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
      "cohere-compass",
      "consensus",
      "deepseek-2",
      "dia",
      "dola",
      "dots",
      "doubao",
      "exa",
      "gauth",
      "gemini-app",
      "genspark",
      "glean",
      "google-search-ai-mode",
      "grok",
      "harvey",
      "ima",
      "jingxi-agents",
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
      "monica",
      "nami-search",
      "netease-youdao",
      "notebooklm",
      "notion-agent",
      "notion-ai",
      "opera-neon",
      "paradot",
      "perplexity",
      "perplexity-comet",
      "phind",
      "polybuzz",
      "qianwen",
      "quark",
      "question-ai",
      "shangliang",
      "slackbot",
      "tavily",
      "tiangong",
      "tongyi",
      "wanyo",
      "wenxiaotuan",
      "wenxiaoyan",
      "wenxin-yiyan",
      "work",
      "xiaohuanxiong",
      "xinghuo",
      "you-com",
      "yuanbao",
      "yuewen",
      "zeta",
      "zhihu"
    ],
    "productCount": 79,
    "dimensions": [
      {
        "id": "answer-engine",
        "label": "Answer engine with sources",
        "labelZh": "带出处的问答引擎",
        "weight": 3,
        "productIds": [
          "360-ai",
          "anara",
          "atlassian-rovo",
          "autoglm",
          "chatgpt-deep-research",
          "chatgpt-pulse",
          "cohere-compass",
          "consensus",
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
          "you-com",
          "zhihu"
        ],
        "productCount": 25
      },
      {
        "id": "retrieval-stack",
        "label": "Search API for your app",
        "labelZh": "给应用用的检索 API",
        "weight": 3,
        "productIds": [
          "360-ai",
          "anara",
          "atlassian-rovo",
          "autoglm",
          "chatgpt-deep-research",
          "chatgpt-pulse",
          "cohere-compass",
          "consensus",
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
          "you-com",
          "zhihu"
        ],
        "productCount": 26
      },
      {
        "id": "document-qa",
        "label": "Ask your own documents",
        "labelZh": "问自己的文档",
        "weight": 2,
        "productIds": [
          "atlassian-rovo",
          "glean",
          "ima",
          "jingxi-agents",
          "llamaindex",
          "netease-youdao",
          "notebooklm",
          "notion-ai",
          "quark",
          "xiaohuanxiong"
        ],
        "productCount": 10
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
      "base44",
      "bolt-new",
      "charm-crush",
      "claude-ai",
      "claude-code",
      "cline",
      "codearts",
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
      "figma-make",
      "gemini-cli",
      "github-copilot",
      "github-copilot-agent-mode",
      "glm-coding-plan",
      "google-antigravity",
      "google-stitch",
      "goose",
      "greptile",
      "grok-build",
      "huawei-codearts",
      "jules",
      "junie",
      "kilo-code",
      "kimi-code",
      "kiro",
      "lingma",
      "lingma-ai-ide",
      "lobsterai",
      "lovable",
      "marscode",
      "mimo-code",
      "minimax-code",
      "mistral-vibe-cli",
      "muse-code",
      "openai-codex",
      "opencode",
      "openhands",
      "phind",
      "pi-agent",
      "qoder",
      "replit-agent",
      "roo-code",
      "sensetime",
      "slack-code",
      "trae",
      "typeless",
      "v0",
      "vercel-ai-sdk",
      "vibe",
      "warp",
      "webflow-ai",
      "wenxin-fastcode",
      "windsurf",
      "zcode",
      "zed"
    ],
    "productCount": 69,
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
          "charm-crush",
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
          "kilo-code",
          "kimi-code",
          "lingma-ai-ide",
          "mimo-code",
          "minimax-code",
          "mistral-vibe-cli",
          "muse-code",
          "openai-codex",
          "opencode",
          "pi-agent",
          "qoder",
          "trae",
          "warp"
        ],
        "productCount": 27
      },
      {
        "id": "app-builder",
        "label": "Build an app from a prompt",
        "labelZh": "一句话生成应用",
        "weight": 2,
        "productIds": [
          "figma-make",
          "mistral-vibe-cli",
          "vibe"
        ],
        "productCount": 3
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
          "wenxin-fastcode"
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
          "greptile",
          "slack-code"
        ],
        "productCount": 5
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
      "adobe-firefly",
      "adobe-generative-fill-in-photoshop",
      "apple-intelligence",
      "artflo",
      "canva-magic-studio",
      "capcut",
      "comate-ai-ide",
      "figma-ai",
      "figma-make",
      "fotor",
      "framer-ai",
      "gamma",
      "google-flow",
      "google-stitch",
      "grok-imagine",
      "hailuo",
      "higgsfield",
      "ideogram",
      "jimeng",
      "keling",
      "krea",
      "leonardo-ai",
      "lovart",
      "midjourney",
      "minimax-design",
      "openart",
      "picchi",
      "picsart",
      "pixverse",
      "pollo-ai",
      "recraft",
      "remini",
      "remove-bg",
      "retake-ai",
      "roboneo",
      "samsung-galaxy-ai",
      "skywork-ai-workspace-agents",
      "sora",
      "sosiee",
      "stitch",
      "tongyi-wanxiang",
      "v0",
      "vivago-ai",
      "webflow-ai"
    ],
    "productCount": 44,
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
          "figma-make",
          "framer-ai",
          "google-stitch",
          "krea",
          "lovart",
          "midjourney",
          "minimax-design",
          "stitch",
          "webflow-ai"
        ],
        "productCount": 12
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
          "sora",
          "tongyi-wanxiang"
        ],
        "productCount": 11
      },
      {
        "id": "upscale-edit",
        "label": "Upscale & retouch",
        "labelZh": "放大与修图",
        "weight": 2,
        "productIds": [
          "capcut",
          "fotor",
          "framer-ai",
          "gamma",
          "google-flow",
          "picsart",
          "recraft",
          "remini",
          "retake-ai"
        ],
        "productCount": 9
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
      "mistral-ai-cloud",
      "mistral-forge",
      "mistral-la-plateforme",
      "mistral-studio",
      "nvidia-ai-enterprise",
      "nvidia-dynamo",
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
    "productCount": 38,
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
          "mistral-ai-cloud",
          "mistral-la-plateforme",
          "nvidia-dynamo",
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
        "productCount": 22
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
    "id": "video",
    "title": "Video production",
    "titleZh": "视频制作",
    "description": "From a one-line prompt to a finished cut. The first question is whether you are generating footage or editing what you already shot.",
    "descriptionZh": "从一句话到成片。第一个问题不是「哪个工具更强」，而是你要生成素材，还是剪自己拍的东西。",
    "products": [
      "adobe-firefly",
      "capcut",
      "d-id",
      "descript",
      "google-flow",
      "grok-imagine",
      "hailuo",
      "heygen",
      "higgsfield",
      "invideo-ai",
      "jimeng",
      "keling",
      "klap",
      "krea",
      "luma-dream-machine",
      "minimax-design",
      "mvland",
      "openart",
      "picsart",
      "pika",
      "pixverse",
      "pollo-ai",
      "premiere-pro-generative-extend",
      "roboneo",
      "runway",
      "seko",
      "sensetime-2",
      "sora",
      "synthesia",
      "tongyi-wanxiang",
      "vidu",
      "vivago-ai"
    ],
    "productCount": 32,
    "dimensions": [
      {
        "id": "text-to-video",
        "label": "Text / image to video",
        "labelZh": "文生视频 / 图生视频",
        "weight": 3,
        "productIds": [
          "adobe-firefly",
          "grok-imagine",
          "hailuo",
          "heygen",
          "higgsfield",
          "jimeng",
          "keling",
          "luma-dream-machine",
          "picsart",
          "pika",
          "pollo-ai",
          "premiere-pro-generative-extend",
          "runway",
          "sora",
          "synthesia",
          "tongyi-wanxiang",
          "vidu"
        ],
        "productCount": 17
      },
      {
        "id": "video-editing",
        "label": "Editing existing footage",
        "labelZh": "剪辑已有素材",
        "weight": 3,
        "productIds": [
          "capcut",
          "descript",
          "google-flow",
          "picsart",
          "runway"
        ],
        "productCount": 5
      },
      {
        "id": "avatar-presenter",
        "label": "Avatars & presenters",
        "labelZh": "数字人与出镜",
        "weight": 2,
        "productIds": [
          "d-id",
          "heygen",
          "synthesia"
        ],
        "productCount": 3
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
      "agentarts",
      "arize-phoenix",
      "braintrust",
      "coderabbit",
      "cody",
      "cohere-compass",
      "confident-ai",
      "galileo",
      "gemini-enterprise",
      "greptile",
      "helicone",
      "laminar",
      "langfuse",
      "langsmith",
      "litellm",
      "maxim-ai",
      "mistral-studio",
      "nvidia-ai-enterprise",
      "nvidia-dynamo",
      "nvidia-nemo",
      "portkey",
      "promptlayer",
      "vellum",
      "weights-biases"
    ],
    "productCount": 24,
    "dimensions": [
      {
        "id": "evaluation",
        "label": "Evaluation & test sets",
        "labelZh": "评测与测试集",
        "weight": 3,
        "productIds": [
          "arize-phoenix",
          "braintrust",
          "cohere-compass",
          "confident-ai",
          "galileo",
          "langfuse",
          "langsmith",
          "maxim-ai",
          "mistral-studio",
          "nvidia-nemo",
          "promptlayer",
          "vellum",
          "weights-biases"
        ],
        "productCount": 13
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
          "laminar",
          "langfuse",
          "langsmith",
          "maxim-ai",
          "nvidia-nemo",
          "promptlayer",
          "weights-biases"
        ],
        "productCount": 10
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
    "id": "local-private",
    "title": "Local & private",
    "titleZh": "本地与私有化",
    "description": "Running models on your own machine or your own server. The reason is usually privacy, latency, or cost per token.",
    "descriptionZh": "把模型跑在自己的机器或服务器上。原因通常是隐私、延迟，或者每 token 成本。",
    "products": [
      "aider",
      "claw",
      "cody",
      "flowise",
      "goose",
      "gpt4all",
      "jan",
      "langfuse",
      "lm-studio",
      "milvus",
      "minicpm",
      "mistral-ai-cloud",
      "mlx",
      "north",
      "nvidia-nim",
      "ollama",
      "open-webui",
      "openclaw",
      "phariaai",
      "qdrant",
      "weaviate",
      "xiaomi",
      "zed"
    ],
    "productCount": 23,
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
          "ollama",
          "open-webui",
          "xiaomi"
        ],
        "productCount": 8
      },
      {
        "id": "self-hosted",
        "label": "Self-hosted service",
        "labelZh": "自托管服务",
        "weight": 3,
        "productIds": [
          "nvidia-nim",
          "open-webui",
          "openclaw",
          "phariaai",
          "weaviate"
        ],
        "productCount": 5
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
    "id": "audio-voice",
    "title": "Audio & voice",
    "titleZh": "音频与语音",
    "description": "Speaking, singing, or turning speech into text. Voice cloning and dubbing are a different market from plain TTS.",
    "descriptionZh": "让机器说话、唱歌，还是把语音转成文字。声音克隆与配音，和普通文字转语音是两回事。",
    "products": [
      "apple-intelligence",
      "bandlab",
      "cartesia",
      "descript",
      "elevenlabs",
      "hume-ai",
      "iflytek",
      "mureka",
      "mvland",
      "rythmix",
      "samsung-galaxy-ai",
      "suno",
      "udio"
    ],
    "productCount": 13,
    "dimensions": [
      {
        "id": "music",
        "label": "Music generation",
        "labelZh": "音乐生成",
        "weight": 3,
        "productIds": [
          "bandlab",
          "descript",
          "elevenlabs",
          "mureka",
          "mvland",
          "rythmix",
          "suno",
          "udio"
        ],
        "productCount": 8
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
          "descript",
          "iflytek"
        ],
        "productCount": 2
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
    "id": "cohere-compass",
    "name": "Cohere Compass",
    "nameZh": "Cohere Compass",
    "vendor": "Cohere",
    "vendorZh": "Cohere",
    "logo": "/assets/logos/cohere.png",
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "research",
      "agent-building",
      "observability"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "RAG means running a vector database and an indexing pipeline. Compass parses documents, indexes them, and serves retrieval without either.",
    "solvesZh": "做 RAG 意味着自己养一套向量库和索引流水线。Compass 解析文档、建索引并提供检索，两样都不用你管。",
    "bestFor": "You need document retrieval for an agent and do not want to run the index yourself.",
    "bestForZh": "你的智能体需要文档检索，但不想自己维护索引。",
    "released": "2026-09-25",
    "datePrecision": "day",
    "homepage": "https://cohere.com/compass",
    "desc": "Managed enterprise search and retrieval for agents.",
    "descZh": "面向智能体的托管式企业搜索与检索",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "C"
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
    "id": "xiaohuanxiong",
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
    "id": "bytedance",
    "name": "豆包工作",
    "nameZh": "豆包工作",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "logo": "/assets/logos/bytedance.png",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "It reads your Feishu chats and minutes, so it knows the real business context.",
    "solvesZh": "它能读你飞书里的聊天和纪要，知道真实的业务上下文。",
    "bestFor": "Teams already living in Feishu who want an agent.",
    "bestForZh": "公司已经在用飞书、需要一个智能体的人。",
    "released": "2026-08-25",
    "datePrecision": "day",
    "homepage": "https://www.doubao.com/work",
    "desc": "ByteDance's office agent wired into Feishu context",
    "descZh": "字节跳动的办公Agent，打通飞书企业上下文",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "豆"
  },
  {
    "id": "minimax-design",
    "name": "MiniMax Design",
    "nameZh": "MiniMax Design",
    "vendor": "MiniMax",
    "vendorZh": "MiniMax",
    "logo": "/assets/logos/minimax.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "It plans shots, generates and edits the cut, so you stay in one tool.",
    "solvesZh": "分镜、生成、剪辑成片都在一处完成，不用来回切软件。",
    "bestFor": "Commercial video with many revisions and many steps.",
    "bestForZh": "环节多、要反复改的商业视频制作。",
    "released": "2026-08-20",
    "datePrecision": "day",
    "homepage": "https://design.minimax.io/",
    "desc": "Multimodal video creation agent built on H3",
    "descZh": "基于H3的多模态视频创作Agent工作台",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "M"
  },
  {
    "id": "xiaomi",
    "name": "超级小爱",
    "nameZh": "超级小爱",
    "vendor": "小米",
    "vendorZh": "小米",
    "logo": "/assets/logos/xiaomi.png",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "local-private"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "It plans and executes across apps on your phone, not just answers.",
    "solvesZh": "它能在手机里跨应用规划和执行，而不只是回答问题。",
    "bestFor": "If your phone, car and home gear are all Xiaomi.",
    "bestForZh": "手机、车和米家设备都是小米的人。",
    "released": "2026-08-18",
    "datePrecision": "day",
    "homepage": "https://xiaoai.mi.com/",
    "desc": "Xiaomi's system agent running on the on-device MiMo model",
    "descZh": "小米基于端侧MiMo大模型的系统级AI智能体",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "超"
  },
  {
    "id": "alibaba-2",
    "name": "千问办公",
    "nameZh": "千问办公",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "logo": "/assets/logos/alibaba.png",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "One product covers desktop, cloud and DingTalk-embedded agents.",
    "solvesZh": "一个产品同时覆盖桌面端、云端和钉钉内嵌的智能体。",
    "bestFor": "Alibaba-ecosystem teams consolidating scattered agent tools.",
    "bestForZh": "阿里生态内、想把分散 Agent 工具收拢的团队。",
    "released": "2026-08-03",
    "datePrecision": "day",
    "homepage": "https://qwenwork.cn/",
    "desc": "Alibaba's desktop, cloud and collab agent in one product",
    "descZh": "阿里把桌面端、云端和企业协同Agent合到一体的办公平台",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "千"
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
    "id": "meituan",
    "name": "妙手",
    "nameZh": "妙手",
    "vendor": "美团",
    "vendorZh": "美团",
    "logo": "/assets/logos/meituan.png",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "Chain and small merchants get store operations analysis without a data team.",
    "solvesZh": "连锁和中小商家不用自建数据团队也能做门店经营分析。",
    "bestFor": "When you run restaurants, hotels or pharmacies on Meituan.",
    "bestForZh": "在美团开餐饮、酒店、药店的商家。",
    "released": "2026-07-01",
    "datePrecision": "month",
    "homepage": "https://catpaw.meituan.com/",
    "desc": "Meituan's AI workbench for local-life merchants",
    "descZh": "美团面向本地生活商家的AI经营工作台",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "妙"
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
    "id": "artflo",
    "name": "Artflo",
    "nameZh": "Artflo",
    "vendor": "美图",
    "vendorZh": "美图",
    "logo": "/assets/logos/meitu.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "A current art-generation option from a vendor with real shipping experience.",
    "solvesZh": "来自有实际交付经验厂商的当下绘画生成选择。",
    "bestFor": "You already use Meitu tools and want the new art line too.",
    "bestForZh": "已经在用美图系工具、也想试它的绘画新线时。",
    "released": "2026-06-01",
    "datePrecision": "month",
    "homepage": "https://www.meitu.com/",
    "desc": "New Meitu art product from the 2026 imaging festival",
    "descZh": "美图 2026 影像节发布的新绘画产品",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "A"
  },
  {
    "id": "mvland",
    "name": "MVLAND",
    "nameZh": "MVLAND",
    "vendor": "美图",
    "vendorZh": "美图",
    "logo": "/assets/logos/meitu.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "audio-voice"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Pairs a track with visuals without a separate editing tool.",
    "solvesZh": "给一首曲子配画面，不用再开另一个剪辑工具。",
    "bestFor": "Artists who need a video for a release and work alone.",
    "bestForZh": "独立音乐人发歌需要配一个视频时。",
    "released": "2026-06-01",
    "datePrecision": "month",
    "homepage": "https://www.meitu.com/",
    "desc": "New Meitu product for music video creation",
    "descZh": "美图 2026 影像节发布的新音乐视频产品",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "M"
  },
  {
    "id": "picchi",
    "name": "Picchi",
    "nameZh": "Picchi",
    "vendor": "美图",
    "vendorZh": "美图",
    "logo": "/assets/logos/meitu.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "A new option from a vendor that has shipped imaging tools for two decades.",
    "solvesZh": "一家做了二十年影像工具的厂商给出的新选择。",
    "bestFor": "You follow Meitu's product line and want the current release rather than the old editor.",
    "bestForZh": "长期跟美图这条线、想要最新版而不是老编辑器时。",
    "released": "2026-06-01",
    "datePrecision": "month",
    "homepage": "https://www.meitu.com/",
    "desc": "New Meitu AI product announced at the 2026 imaging festival",
    "descZh": "美图 2026 影像节新发布的 AI 产品",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "P"
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
    "id": "slack-today",
    "name": "Slack Today",
    "nameZh": "Slack Today",
    "vendor": "Slack",
    "vendorZh": "Slack",
    "logo": "/assets/logos/slack.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "The morning scroll is an unpaid job. Today reads the calendar and the connected apps and states what matters, first.",
    "solvesZh": "早上那一轮翻消息是没报酬的工作。Today 读完日历和已连接的应用，先把要紧的说出来。",
    "bestFor": "You want one screen before you start, not a scroll to work through.",
    "bestForZh": "你希望在开工前看一屏，而不是翻一遍。",
    "released": "2026-05-06",
    "datePrecision": "day",
    "homepage": "https://slack.com/features/today",
    "desc": "Daily briefing in Slack over priorities, calendar, tasks.",
    "descZh": "Slack 里的每日简报，汇总优先级、日历与待办",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "S"
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
    "id": "netease-youdao",
    "name": "有道宝库",
    "nameZh": "有道宝库",
    "vendor": "网易有道",
    "vendorZh": "网易有道",
    "logo": "/assets/logos/netease-youdao.svg",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Drop in 50 sources and get a cited answer plus a finished deck.",
    "solvesZh": "丢进 50 份资料，得到带引用的回答和成品演示文稿。",
    "bestFor": "Literature review, course prep, or a research brief.",
    "bestForZh": "文献综述、备课或需要一份调研简报时。",
    "released": "2026-04-07",
    "datePrecision": "day",
    "homepage": "https://baoku.youdao.com/",
    "desc": "Youdao's knowledge base that turns documents into outputs",
    "descZh": "网易有道的AI知识库，把资料直接变成PPT、播客和脑图",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "有"
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
    "id": "workbuddy",
    "name": "WorkBuddy",
    "nameZh": "WorkBuddy",
    "vendor": "腾讯",
    "vendorZh": "腾讯",
    "logo": "/assets/logos/tencent.png",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "Install once and run OpenClaw skills without any server setup.",
    "solvesZh": "装完即用，不用自己搭服务器就能跑OpenClaw技能。",
    "bestFor": "Office workers who want an agent on their own PC.",
    "bestForZh": "想在自己电脑上装个能干活的智能体的办公人群。",
    "released": "2026-03-09",
    "datePrecision": "day",
    "homepage": "https://www.workbuddy.cn/",
    "desc": "Tencent's OpenClaw-compatible desktop work agent",
    "descZh": "腾讯的全场景AI办公工作台，兼容OpenClaw技能",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "W"
  },
  {
    "id": "claw",
    "name": "小艺Claw",
    "nameZh": "小艺Claw",
    "vendor": "华为",
    "vendorZh": "华为",
    "logo": "/assets/logos/huawei.ico",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "office",
      "local-private"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "You get an OpenClaw-style agent with system permissions, no key management.",
    "solvesZh": "不用管密钥和部署，就有一个带系统权限的OpenClaw式智能体。",
    "bestFor": "HarmonyOS phone or tablet owners doing office tasks.",
    "bestForZh": "用鸿蒙手机或平板、需要处理办公事务的人。",
    "released": "2026-03-01",
    "datePrecision": "month",
    "homepage": "https://xiaoyi.huawei.com/",
    "desc": "HarmonyOS system agent built on the OpenClaw pattern",
    "descZh": "鸿蒙系统级AI智能体，基于OpenClaw模式深度定制",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "小"
  },
  {
    "id": "huawei-codearts",
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
      "spec-driven"
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
    "id": "lobsterai",
    "name": "LobsterAI",
    "nameZh": "有道龙虾",
    "vendor": "网易有道",
    "vendorZh": "网易有道",
    "logo": "/assets/logos/netease-youdao.svg",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "coding",
      "agent-building"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "Open code, local memory, and IM remote control in one desktop agent.",
    "solvesZh": "开源代码、本地记忆、IM 远程遥控都在一个桌面智能体里。",
    "bestFor": "When you want an auditable agent, not a black box.",
    "bestForZh": "想要一个可审计的智能体，而不是黑盒的人。",
    "released": "2026-02-11",
    "datePrecision": "day",
    "homepage": "https://lobsterai.youdao.com/",
    "desc": "NetEase Youdao's open-source desktop assistant agent",
    "descZh": "网易有道的开源桌面级全场景个人助理Agent",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "L"
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
    "id": "wenxiaotuan",
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
    "id": "slack-code",
    "name": "Slack Code",
    "nameZh": "Slack Code",
    "vendor": "Slack",
    "vendorZh": "Slack",
    "logo": "/assets/logos/slack.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "office"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "A coding agent's work is invisible until review. Here the agent writes in a channel, so review happens where the discussion already is.",
    "solvesZh": "编程智能体的工作在审阅前是看不见的。这里它在频道里写，审阅就发生在讨论已经在的地方。",
    "bestFor": "Your team reviews code in Slack and you want the agent in that loop, not in a separate tool.",
    "bestForZh": "你的团队在 Slack 里审代码，你想让智能体在这个回路里，而不是另开一个工具。",
    "released": "2026-01-01",
    "datePrecision": "month",
    "homepage": "https://slack.com/features/code-channels",
    "desc": "Coding agents working in Slack channels, reviewed by the team.",
    "descZh": "在 Slack 频道里协作的编程智能体，团队可审阅",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "S"
  },
  {
    "id": "traework",
    "name": "TraeWork",
    "nameZh": "TraeWork",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "logo": "/assets/logos/bytedance.png",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Trae covers code. Most of the workday is not code. TraeWork is the same team's answer for documents, slides and analysis.",
    "solvesZh": "Trae 管代码，但一个工作日大部分时间不写代码。TraeWork 是同一团队给文档、幻灯片和分析做的答案。",
    "bestFor": "You want the Trae team's agent handling documents and research, not the IDE.",
    "bestForZh": "你想让 Trae 团队的智能体处理文档和调研，而不是在 IDE 里。",
    "released": "2026-01-01",
    "datePrecision": "month",
    "homepage": "https://work.trae.ai/",
    "desc": "ByteDance's professional AI work assistant.",
    "descZh": "字节跳动的专业级 AI 工作助手",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "T"
  },
  {
    "id": "zcode",
    "name": "ZCode",
    "nameZh": "ZCode",
    "vendor": "智谱",
    "vendorZh": "智谱",
    "logo": "/assets/logos/zhipu.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "agent-building"
    ],
    "form": "cli",
    "surface": "standalone",
    "solves": "Long jobs die when you close the terminal. ZCode keeps a Goal running, and you can trigger it from WeChat, Feishu or Telegram.",
    "solvesZh": "长任务一关终端就死。ZCode 让 Goal 持续跑，你还能用微信、飞书或 Telegram 远程触发。",
    "bestFor": "You hand over a multi-step build and want it to keep going while you do something else.",
    "bestForZh": "你想把一个多步开发任务交出去，自己去做别的事时它还在跑。",
    "released": "2026-01-01",
    "datePrecision": "month",
    "homepage": "https://zcode.z.ai/",
    "desc": "Ambient multi-agent coding tool built for GLM-5.3.",
    "descZh": "为 GLM-5.3 打造的多智能体氛围编程工具",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "Z"
  },
  {
    "id": "zoommate",
    "name": "ZoomMate",
    "nameZh": "ZoomMate",
    "vendor": "Zoom",
    "vendorZh": "Zoom",
    "logo": "/assets/logos/zoom.png",
    "region": "intl",
    "category": "meetings",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "AI Companion summarizes meetings. ZoomMate acts on what happened in them — agents, workflows, search across the conversation record.",
    "solvesZh": "AI Companion 只总结会议。ZoomMate 会对会议里发生的事采取行动——智能体、工作流、跨对话记录的搜索。",
    "bestFor": "You live in Zoom and want the assistant to act after the call, not just report on it.",
    "bestForZh": "你整天在 Zoom 里，想让助手在会后采取行动，而不只是汇报。",
    "released": "2026-01-01",
    "datePrecision": "month",
    "homepage": "https://zoom.com/en/ai-assistant/",
    "desc": "Zoom's AI teammate for agents, workflows and search.",
    "descZh": "Zoom 的 AI 同事，涵盖智能体、工作流与搜索",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "Z"
  },
  {
    "id": "mistral-vibe-cli",
    "name": "Mistral Vibe CLI",
    "nameZh": "Mistral Vibe CLI",
    "vendor": "Mistral AI",
    "vendorZh": "Mistral AI",
    "logo": "/assets/logos/mistral-ai.svg",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "surface": "standalone",
    "solves": "Vibe the product needs a subscription and a browser. Vibe CLI is Apache 2.0, runs in your terminal, and works on your own codebase with your own model endpoint.",
    "solvesZh": "Vive 这个产品要订阅、要浏览器。Vibe CLI 是 Apache 2.0，跑在终端里，用你自己的模型端点跑你自己的代码库。",
    "bestFor": "You want an open-source coding agent in the terminal that you can point at your own models.",
    "bestForZh": "你要一个终端里的开源编程智能体，并且能指向自己的模型。",
    "released": "2025-12-09",
    "datePrecision": "day",
    "homepage": "https://github.com/mistralai/mistral-vibe-cli",
    "desc": "Open-source terminal coding agent powered by Devstral 2.",
    "descZh": "由 Devstral 2 驱动的开源终端编程智能体",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "M"
  },
  {
    "id": "seko",
    "name": "Seko",
    "nameZh": "商汤 Seko",
    "vendor": "商汤",
    "vendorZh": "商汤",
    "logo": "/assets/logos/sensetime.svg",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Characters and props stay consistent across up to 100 episodes.",
    "solvesZh": "最多 100 集里角色和道具保持一致，不用一集集重做。",
    "bestFor": "Short-drama and motion-comic studios producing series.",
    "bestForZh": "要连续出剧的短剧和动态漫工作室。",
    "released": "2025-12-01",
    "datePrecision": "month",
    "homepage": "https://www.sensetime.com/",
    "desc": "SenseTime's multi-episode short-drama generation agent",
    "descZh": "商汤的多集短剧生成智能体",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "S"
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
    "id": "ant",
    "name": "灵光",
    "nameZh": "灵光",
    "vendor": "蚂蚁集团",
    "vendorZh": "蚂蚁集团",
    "logo": null,
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "You get a working calculator or planner in 30 seconds, no coding.",
    "solvesZh": "三十秒得到一个能用的计算器或计划器，不用写代码。",
    "bestFor": "When you need a one-off tool more than a conversation.",
    "bestForZh": "需要一个一次性的小工具，而不是一次聊天。",
    "released": "2025-11-18",
    "datePrecision": "day",
    "homepage": "https://www.lingguang.com/",
    "desc": "Ant's multimodal assistant that builds mini-apps from a sentence",
    "descZh": "蚂蚁的全模态AI助手，一句话生成可交互小应用",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "灵"
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
    "id": "notion-agent",
    "name": "Notion Agent",
    "nameZh": "Notion Agent",
    "vendor": "Notion",
    "vendorZh": "Notion",
    "logo": "/assets/logos/notion.png",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building",
      "research"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Notion AI writes inside a page. Notion Agent takes actions across your workspace and the apps you connected, under your own permissions.",
    "solvesZh": "Notion AI 在页面里写。Notion Agent 则以你自己的权限，跨工作区和已连接的应用采取行动。",
    "bestFor": "You want an agent that does the multi-step work, not one that drafts the paragraph.",
    "bestForZh": "你要一个真正做完多步工作的智能体，而不是帮你起草那一段的。",
    "released": "2025-09-01",
    "datePrecision": "month",
    "homepage": "https://www.notion.com/product/agents",
    "desc": "On-demand agent acting across Notion and connected tools.",
    "descZh": "按需响应的智能体，可跨 Notion 与已连接工具行动",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "N"
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
    "id": "typeless",
    "name": "Typeless",
    "nameZh": "Typeless",
    "vendor": "Typeless",
    "vendorZh": "Typeless",
    "logo": "/assets/logos/typeless.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "coding"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "Turns rambling speech into text that reads as if you typed it, inside any app.",
    "solvesZh": "把絮叨的口语变成读起来像你亲手写的文字，任何应用里都能用。",
    "bestFor": "Reaching for it when your typing speed, not your thinking speed, is the bottleneck.",
    "bestForZh": "瓶颈在打字速度而不是思考速度时。",
    "released": "2025-08-14",
    "datePrecision": "day",
    "homepage": "https://www.typeless.com",
    "desc": "Dictates into any app and rewrites speech into clean written text.",
    "descZh": "在任意应用里口述，自动改写成干净书面文字。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "T"
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
    "released": "2025-07-27",
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
    "id": "lovart",
    "name": "Lovart",
    "nameZh": "Lovart",
    "vendor": "LiblibAI",
    "vendorZh": "LiblibAI",
    "logo": "/assets/logos/liblibai.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Removes the gap between a rough idea and a finished design file, so you stop assembling brand assets by hand.",
    "solvesZh": "把想法直接变成可交付的设计文件，不用再手工拼凑品牌物料。",
    "bestFor": "Reaching for it when you need a full brand or marketing set in minutes, not just one image.",
    "bestForZh": "需要在几分钟内拿到整套品牌或营销物料，而不只是单张图的时候。",
    "released": "2025-07-23",
    "datePrecision": "day",
    "homepage": "https://www.lovart.ai",
    "desc": "Conversational design agent that delivers complete brand and design work.",
    "descZh": "对话式设计 Agent，直接产出完整品牌与设计交付物。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "L"
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
    "id": "figma-make",
    "name": "Figma Make",
    "nameZh": "Figma Make",
    "vendor": "Figma",
    "vendorZh": "Figma",
    "logo": "/assets/logos/figma.ico",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design",
      "coding"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "A Figma file cannot be shipped. Make turns the design — or a sentence — into working code you can run and edit, keeping the design context attached.",
    "solvesZh": "Figma 文件交付不了。Make 把设计稿——或者一句话——变成能跑能改的真代码，同时保留设计上下文。",
    "bestFor": "You are a designer who needs a working prototype, or a dev who wants to start from a real design file.",
    "bestForZh": "你是设计师，需要一个能跑的原型；或者你是开发，想从真实设计稿起步。",
    "released": "2025-07-01",
    "datePrecision": "month",
    "homepage": "https://www.figma.com/make/",
    "desc": "Prompt or design file into a code-backed prototype.",
    "descZh": "从提示词或设计稿生成有代码支撑的原型",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "F"
  },
  {
    "id": "roboneo",
    "name": "RoboNeo",
    "nameZh": "RoboNeo",
    "vendor": "美图",
    "vendorZh": "美图",
    "logo": "/assets/logos/meitu.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design",
      "video"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Turns a plain-language brief into finished visuals instead of a stack of retouch steps.",
    "solvesZh": "把一句需求直接做成成品图，而不是一步步手动修。",
    "bestFor": "A small creative team that needs finished assets on a deadline without a designer.",
    "bestForZh": "没有设计师、却要在期限内出图的小团队。",
    "released": "2025-07-01",
    "datePrecision": "month",
    "homepage": "https://www.meitu.com/",
    "desc": "Meitu's AI agent for image and video work by instruction",
    "descZh": "美图的影像 AI 智能体，用指令完成修图与视频",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "R"
  },
  {
    "id": "aq",
    "name": "AQ",
    "nameZh": "蚂蚁 AQ",
    "vendor": "蚂蚁集团",
    "vendorZh": "蚂蚁集团",
    "logo": null,
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "It asks follow-up questions and reads your reports before you reach a hospital.",
    "solvesZh": "在去医院之前，它先追问症状、读懂你的报告。",
    "bestFor": "Everyday health questions and reading lab reports.",
    "bestForZh": "日常健康疑问、化验单看不懂的时候。",
    "released": "2025-06-26",
    "datePrecision": "day",
    "homepage": "https://www.antgroup.com/news-media/press-releases/1750919400000",
    "desc": "Ant's AI health assistant with doctor agents",
    "descZh": "蚂蚁的AI健康管家，接入名医AI分身与5000家医院",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "A"
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
    "id": "vivago-ai",
    "name": "vivago.ai",
    "nameZh": "vivago.ai",
    "vendor": "vivago",
    "vendorZh": "vivago",
    "logo": "/assets/logos/vivago.ico",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Keeps a short film's look consistent across shots without manual continuity work.",
    "solvesZh": "让短片各镜头风格一致，不用手动做连续性。",
    "bestFor": "A short film where visual consistency across shots matters.",
    "bestForZh": "重视镜头间视觉一致性的短片。",
    "released": "2025-06-01",
    "datePrecision": "month",
    "homepage": "https://vivago.ai/",
    "desc": "AI director that carries a script to finished film",
    "descZh": "从剧本一路做到成片的 AI 导演",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "V"
  },
  {
    "id": "agentarts",
    "name": "智果 AgentArts",
    "nameZh": "智果 AgentArts",
    "vendor": "华为",
    "vendorZh": "华为",
    "logo": "/assets/logos/huawei.ico",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "observability"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "An agent demo dies in production because nobody can see what it did. AgentArts pairs multi-agent runtime with end-to-end observability and evaluation, which is the part enterprises actually buy.",
    "solvesZh": "Agent 演示到了生产就死，因为没人看得见它干了什么。AgentArts 把多智能体运行时和端到端可观测可评估放在一起，这才是企业真正买的部分。",
    "bestFor": "You are shipping agents to production and need runtime plus observability together.",
    "bestForZh": "你要把智能体送进生产，需要运行时和可观测性一起要。",
    "released": "2025-06-01",
    "datePrecision": "month",
    "homepage": "https://www.huaweicloud.com/product/agentarts.html",
    "desc": "Huawei Cloud's enterprise agent-building platform.",
    "descZh": "华为云的企业级智能体构建平台",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "智"
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
    "id": "jotform-ai-agents",
    "name": "Jotform AI Agents",
    "nameZh": "Jotform AI Agents",
    "vendor": "Jotform",
    "vendorZh": "Jotform",
    "logo": "/assets/logos/jotform.png",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Deploys a support agent that already knows your forms and order fields, so it stops asking users to repeat themselves.",
    "solvesZh": "上线即懂你的表单和订单字段的客服 Agent，不用让用户重复说明。",
    "bestFor": "Reaching for it when support volume is real but engineering help is not available.",
    "bestForZh": "客服量真实存在但没有工程资源时。",
    "released": "2025-05-27",
    "datePrecision": "day",
    "homepage": "https://www.jotform.com/ai/agents/",
    "desc": "Customer-support agents trained on your forms and data, no code.",
    "descZh": "用你的表单和数据训练客服 Agent，无需写代码。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "J"
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
    "id": "google-stitch",
    "name": "Google Stitch",
    "nameZh": "Google Stitch",
    "vendor": "Google",
    "vendorZh": "Google",
    "logo": "/assets/logos/google.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design",
      "coding"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Gets you from a rough layout idea to several real UI variants without opening a design tool.",
    "solvesZh": "不用打开设计软件，就能从模糊的布局想法拿到几版真实界面。",
    "bestFor": "Reaching for it when you need to explore interface directions fast before committing to one.",
    "bestForZh": "想定稿前快速比较几版界面方向时。",
    "released": "2025-05-01",
    "datePrecision": "month",
    "homepage": "https://stitch.withgoogle.com",
    "desc": "Google Labs design canvas that turns prompts or sketches into app UIs.",
    "descZh": "Google Labs 设计画布，把提示词变成应用界面。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "G"
  },
  {
    "id": "stitch",
    "name": "Stitch",
    "nameZh": "Stitch",
    "vendor": "Google",
    "vendorZh": "Google",
    "logo": "/assets/logos/google.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Getting a first-pass interface means describing it to a designer. Stitch turns the sentence into editable UI you can refine.",
    "solvesZh": "要拿到第一版界面，常规做法是写需求给设计师。Stitch 把那句话变成可继续改的 UI。",
    "bestFor": "You need a rough interface fast and would rather start editing than start briefing.",
    "bestForZh": "你需要很快拿到一版界面，想直接在上面改，而不是先写需求文档。",
    "released": "2025-05-01",
    "datePrecision": "month",
    "homepage": "https://stitch.withgoogle.com/",
    "desc": "Google's natural language to UI design tool.",
    "descZh": "Google 的自然语言转 UI 设计工具",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "S"
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
    "id": "nvidia-dynamo",
    "name": "NVIDIA Dynamo",
    "nameZh": "NVIDIA Dynamo",
    "vendor": "NVIDIA",
    "vendorZh": "NVIDIA",
    "logo": "/assets/logos/nvidia.ico",
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "observability",
      "model-api"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "A single GPU is fine until it is not. Dynamo splits prefill and decode across nodes, routes around redundant work, and caches KV to cheaper storage.",
    "solvesZh": "单卡够用的时候没问题，不够用时就是了。Dynamo 把 prefill 和 decode 拆到不同节点，绕开重复计算，并把 KV 缓存到更便宜的存储。",
    "bestFor": "You are serving LLMs across a multi-GPU cluster and prefill/decode is your bottleneck.",
    "bestForZh": "你在多卡集群上服务大模型，瓶颈卡在 prefill/decode 上。",
    "released": "2025-04-01",
    "datePrecision": "month",
    "homepage": "https://www.nvidia.com/en-us/ai/dynamo/",
    "desc": "Open-source distributed inference serving for multi-node GPU.",
    "descZh": "面向多节点 GPU 的开源分布式推理服务框架",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "N"
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
    "id": "autoglm",
    "name": "AutoGLM",
    "nameZh": "AutoGLM 沉思",
    "vendor": "智谱",
    "vendorZh": "智谱",
    "logo": "/assets/logos/zhipu.png",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "It browses dozens of pages and files a cited report for free.",
    "solvesZh": "它自己翻几十个网页，出一份带引用的报告，而且免费。",
    "bestFor": "Open-ended research where you need the whole answer.",
    "bestForZh": "开放式调研，需要一份完整答案而不是一句话。",
    "released": "2025-03-31",
    "datePrecision": "day",
    "homepage": "https://autoglm.zhipuai.cn/",
    "desc": "Zhipu's free deep-research and device-operation agent",
    "descZh": "智谱免费的深度研究与操作能力一体Agent",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "A"
  },
  {
    "id": "anara",
    "name": "Anara",
    "nameZh": "Anara",
    "vendor": "Anara",
    "vendorZh": "Anara",
    "logo": "/assets/logos/anara.png",
    "region": "intl",
    "category": "search",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Lets you interrogate a specific set of papers and get sourced answers, instead of searching for them again each time.",
    "solvesZh": "针对一批指定论文提问并得到带出处的答案，不用每次重新检索。",
    "bestFor": "Reaching for it when you have a specific reading list to work through.",
    "bestForZh": "手上有一份要啃完的指定文献清单时。",
    "released": "2025-03-23",
    "datePrecision": "day",
    "homepage": "https://anara.com",
    "desc": "Research assistant that reasons over your own paper library.",
    "descZh": "基于你自己的论文库做推理的研究助手。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "A"
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
    "id": "360-ai-2",
    "name": "360 AI办公",
    "nameZh": "360 AI办公",
    "vendor": "360",
    "vendorZh": "360",
    "logo": "/assets/logos/360.ico",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "WPS AI and Copilot both cover this ground. 360's is free-tiered and pre-wired to its own model line, so it works without a subscription decision.",
    "solvesZh": "WPS AI 和 Copilot 都做这块。360 这个有免费档，而且接自家模型线，不用先做订阅决定。",
    "bestFor": "You want office AI features without paying for a tier first.",
    "bestForZh": "你想先用上办公 AI 功能，不想先付费定档。",
    "released": "2025-01-01",
    "datePrecision": "month",
    "homepage": "https://bangong.360.cn/",
    "desc": "360's office AI suite: writing, PPT, spreadsheets.",
    "descZh": "360 的办公 AI 套件：写作、PPT、表格",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "3"
  },
  {
    "id": "charm-crush",
    "name": "Charm Crush",
    "nameZh": "Charm Crush",
    "vendor": "Charm",
    "vendorZh": "Charm",
    "logo": "/assets/logos/charm.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "surface": "standalone",
    "solves": "Keeps a fast agent loop entirely in the terminal, with no editor to configure.",
    "solvesZh": "整个循环都在终端里，不用配编辑器。",
    "bestFor": "You live in the shell and want an agent that stays there.",
    "bestForZh": "平时就待在 shell 里、想让智能体也待在终端时。",
    "released": "2025-01-01",
    "datePrecision": "month",
    "homepage": "https://charm.land/",
    "desc": "Open-source terminal coding agent with its own TUI",
    "descZh": "带自研 TUI 的开源终端编程智能体",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "C"
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
    "id": "kilo-code",
    "name": "Kilo Code",
    "nameZh": "Kilo Code",
    "vendor": "Kilo Code",
    "vendorZh": "Kilo Code",
    "logo": "/assets/logos/kilo-code.ico",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "Gives you an agent that edits a real repo without locking you into a paid cloud plan.",
    "solvesZh": "给你一个能改真实仓库的智能体，不绑定付费云套餐。",
    "bestFor": "You want an agent you can run yourself, on your own key and budget.",
    "bestForZh": "想用自己的 key 和预算本地跑智能体时。",
    "released": "2025-01-01",
    "datePrecision": "month",
    "homepage": "https://kilocode.ai/",
    "desc": "Open-source coding agent for VS Code and its CLI",
    "descZh": "面向 VS Code 及其 CLI 的开源编程智能体",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "K"
  },
  {
    "id": "mistral-ai-cloud",
    "name": "Mistral AI Cloud",
    "nameZh": "Mistral AI Cloud",
    "vendor": "Mistral AI",
    "vendorZh": "Mistral AI",
    "logo": "/assets/logos/mistral-ai.svg",
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api",
      "local-private"
    ],
    "form": "api",
    "surface": "standalone",
    "solves": "La Plateforme is the API. AI Cloud is the compute underneath it — sovereign and self-hosted deployments for teams that cannot send data out.",
    "solvesZh": "La Plateforme 是 API。AI Cloud 是它底下的算力——为不能把数据发出去的主权与自托管部署准备的。",
    "bestFor": "You need Mistral models on infrastructure you control, for sovereignty reasons.",
    "bestForZh": "出于主权原因，你需要在自己掌控的基础设施上跑 Mistral 模型。",
    "released": "2025-01-01",
    "datePrecision": "month",
    "homepage": "https://mistral.ai/products/ai-cloud/",
    "desc": "Frontier-scale infrastructure for Mistral training and inference.",
    "descZh": "面向 Mistral 训练与推理的前沿规模基础设施",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "M"
  },
  {
    "id": "nvidia-cosmos",
    "name": "NVIDIA Cosmos",
    "nameZh": "NVIDIA Cosmos",
    "vendor": "NVIDIA",
    "vendorZh": "NVIDIA",
    "logo": "/assets/logos/nvidia.ico",
    "region": "intl",
    "category": "developer-sdk",
    "useCases": [
      "agent-building"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "A robot or vehicle needs to predict the physical world, not just generate text. Cosmos gives you world models to train and evaluate against.",
    "solvesZh": "机器人或车需要预测的是物理世界，不是生成文本。Cosmos 给你可以拿来训练和评测的世界模型。",
    "bestFor": "You build robots, vehicles or anything that has to reason about physical space.",
    "bestForZh": "你做机器人、车辆，或者任何需要推理物理空间的东西。",
    "released": "2025-01-01",
    "datePrecision": "month",
    "homepage": "https://www.nvidia.com/en-us/ai/cosmos/",
    "desc": "World foundation models for physical AI workflows.",
    "descZh": "面向物理 AI 工作流的世界基础模型",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "N"
  },
  {
    "id": "opencode",
    "name": "OpenCode",
    "nameZh": "OpenCode",
    "vendor": "OpenCode (SST)",
    "vendorZh": "OpenCode (SST)",
    "logo": "/assets/logos/sst.png",
    "region": "intl",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "cli",
    "surface": "standalone",
    "solves": "Lets you point the same agent at whichever model provider you hold a key for.",
    "solvesZh": "同一个智能体可以接到你手里有 key 的任意模型厂商。",
    "bestFor": "You switch model providers and do not want to relearn the agent each time.",
    "bestForZh": "经常换模型厂商、不想每次重学一个智能体时。",
    "released": "2025-01-01",
    "datePrecision": "month",
    "homepage": "https://opencode.ai/",
    "desc": "Open-source terminal coding agent, provider-agnostic",
    "descZh": "不绑定模型厂商的开源终端编程智能体",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "O"
  },
  {
    "id": "rythmix",
    "name": "Rythmix",
    "nameZh": "Rythmix",
    "vendor": "Rythmix",
    "vendorZh": "Rythmix",
    "logo": "/assets/logos/rythmix.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "audio-voice"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Produces a usable backing track without a composer or a session musician.",
    "solvesZh": "没有作曲和乐手时，也能拿到能用的伴奏。",
    "bestFor": "A video that needs original background music cleared for use.",
    "bestForZh": "视频需要一首版权干净的原创配乐时。",
    "released": "2025-01-01",
    "datePrecision": "month",
    "homepage": "https://rythmix.ai/",
    "desc": "AI music generator app",
    "descZh": "AI 音乐生成应用",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "R"
  },
  {
    "id": "skywork-ai-workspace-agents",
    "name": "Skywork AI Workspace Agents",
    "nameZh": "Skywork AI Workspace Agents",
    "vendor": "昆仑万维",
    "vendorZh": "昆仑万维",
    "logo": "/assets/logos/kunlun.ico",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building",
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Tiangong is a model and a search engine. This is the deliverable layer — agents that output the actual document, deck or page.",
    "solvesZh": "天工是模型和搜索。这个是交付层——智能体直接产出文档、幻灯片或网页。",
    "bestFor": "You want finished office artifacts from an agent, on Kunlun's stack.",
    "bestForZh": "你希望智能体直接产出办公成品，用昆仑的技术栈。",
    "released": "2025-01-01",
    "datePrecision": "month",
    "homepage": "https://skywork.ai/",
    "desc": "Workspace agents for slides, docs, sheets, images, video.",
    "descZh": "面向幻灯片、文档、表格、图像、视频的工作区智能体",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "S"
  },
  {
    "id": "codearts",
    "name": "华为云码道 CodeArts",
    "nameZh": "华为云码道 CodeArts",
    "vendor": "华为",
    "vendorZh": "华为",
    "logo": "/assets/logos/huawei.ico",
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "The gap between an AI IDE and enterprise delivery is code comprehension, memory and governance. CodeArts covers the full cycle from spec to release, with a CLI for the terminal.",
    "solvesZh": "AI IDE 和企业交付之间的差距在于代码理解、记忆与管控。CodeArts 覆盖从规格到发布的全周期，还有终端 CLI。",
    "bestFor": "Your organisation needs AI coding with code-base memory, quality gates and audit behind it.",
    "bestForZh": "你的组织需要带代码库记忆、质量门禁和审计的 AI 编程。",
    "released": "2025-01-01",
    "datePrecision": "month",
    "homepage": "https://codearts.huaweicloud.com/",
    "desc": "Huawei Cloud's multi-agent coding platform for enterprises.",
    "descZh": "华为云面向企业的多智能体编程平台",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "华"
  },
  {
    "id": "bytedance-4",
    "name": "妙搭",
    "nameZh": "妙搭",
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
    "surface": "standalone",
    "solves": "Building a small internal app usually means picking a host, wiring auth and deploying. Miaoda wraps that as one build-and-host surface.",
    "solvesZh": "做一个小内部应用通常要选托管、配鉴权、再部署。妙搭把这几步合成一个搭建加托管的入口。",
    "bestFor": "You need a working internal app fast, hosted, without a backend team.",
    "bestForZh": "你要快速上线一个能用的内部应用，并托管好，不带后端团队。",
    "released": "2025-01-01",
    "datePrecision": "month",
    "homepage": "https://miaoda.feishu.cn/",
    "desc": "Lark's platform for building and hosting full-stack apps.",
    "descZh": "飞书用于搭建与托管全栈应用的平台",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "妙"
  },
  {
    "id": "sensetime-3",
    "name": "小浣熊办公",
    "nameZh": "小浣熊办公",
    "vendor": "商汤",
    "vendorZh": "商汤",
    "logo": "/assets/logos/sensetime.svg",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "The office agent problem is not writing, it is the deliverable. This one ends at a finished deck and a chart, not a paragraph.",
    "solvesZh": "办公智能体的难点不在写，在交付。这个直接产出成稿幻灯片和图表，不是一段话。",
    "bestFor": "You need a finished deck or analysis, not a draft to finish by hand.",
    "bestForZh": "你需要成稿的幻灯片或分析，而不是还要自己收尾的草稿。",
    "released": "2025-01-01",
    "datePrecision": "month",
    "homepage": "https://xiaohuanxiong.com/",
    "desc": "SenseTime's AI office agent for slides, data and infographics.",
    "descZh": "商汤的 AI 办公智能体，做幻灯片、数据与信息图",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "小"
  },
  {
    "id": "zhipu-input",
    "name": "智谱AI输入法",
    "nameZh": "智谱AI输入法",
    "vendor": "智谱",
    "vendorZh": "智谱",
    "logo": "/assets/logos/zhipu.png",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "hardware",
    "surface": "standalone",
    "solves": "Mobile typing is where most writing actually happens, and that is exactly where chat assistants are not. An IME reaches you where you already type.",
    "solvesZh": "手机上才是真正在写字的地方，而聊天助手恰恰不在那儿。输入法能到你已经在打字的地方。",
    "bestFor": "You draft and edit text mostly on a phone and want AI help at the keyboard.",
    "bestForZh": "你主要在手机上起草和修改文字，希望 AI 在键盘边帮上忙。",
    "released": "2025-01-01",
    "datePrecision": "month",
    "homepage": "https://autoglm.zhipuai.cn/autotyper/",
    "desc": "Zhipu's AI keyboard for writing on mobile.",
    "descZh": "智谱的 AI 输入法，面向移动端写作",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "智"
  },
  {
    "id": "bytedance-3",
    "name": "猫箱",
    "nameZh": "猫箱",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "logo": "/assets/logos/bytedance.png",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "General assistants flatten personality into helpfulness. This one is built around characters you write and inhabit.",
    "solvesZh": "通用助手会把人格压平成「有用」。这个产品是围绕你自己写、自己代入的角色建的。",
    "bestFor": "You want character roleplay rather than task completion.",
    "bestForZh": "你想要的是角色扮演，而不是把任务做完。",
    "released": "2025-01-01",
    "datePrecision": "month",
    "homepage": "https://www.maoxiangai.com/",
    "desc": "ByteDance's AI character chat and roleplay app.",
    "descZh": "字节跳动的 AI 角色聊天与角色扮演应用",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "猫"
  },
  {
    "id": "bytedance-2",
    "name": "豆包电脑版",
    "nameZh": "豆包电脑版",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "logo": "/assets/logos/bytedance.png",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "office",
      "agent-building"
    ],
    "form": "desktop",
    "surface": "standalone",
    "solves": "A phone-only assistant cannot see the file you have open. The desktop build reads the window in front of you.",
    "solvesZh": "只在手机上的助手看不见你正打开的文件。电脑版读得到你眼前的窗口。",
    "bestFor": "You want Doubao to work against the files and windows on your computer.",
    "bestForZh": "你想让豆包针对你电脑上的文件和窗口干活。",
    "released": "2025-01-01",
    "datePrecision": "month",
    "homepage": "https://www.doubao.com/download/desktop",
    "desc": "Desktop build of ByteDance's Doubao assistant.",
    "descZh": "字节跳动豆包助手的电脑版",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "豆"
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
    "category": "meetings",
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
      "personal-ai",
      "meetings",
      "agents"
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
    "id": "browser-use",
    "name": "Browser Use",
    "nameZh": "Browser Use",
    "vendor": "Browser Use",
    "vendorZh": "Browser Use",
    "logo": "/assets/logos/browser-use.png",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "research"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "Lets your agent operate websites through the DOM, so it can do the clicking and form-filling you would rather not.",
    "solvesZh": "让 Agent 通过 DOM 操作网站，把点击和填表这类活交给它。",
    "bestFor": "Reaching for it when your agent has to complete tasks on sites with no API.",
    "bestForZh": "Agent 要在那些没有 API 的网站上干活时。",
    "released": "2024-11-01",
    "datePrecision": "month",
    "homepage": "https://browser-use.com",
    "desc": "Open-source library that lets agents drive a real web browser.",
    "descZh": "开源库，让 Agent 直接驱动真实浏览器。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "B"
  },
  {
    "id": "ima",
    "name": "ima",
    "nameZh": "腾讯 ima",
    "vendor": "腾讯",
    "vendorZh": "腾讯",
    "logo": "/assets/logos/tencent.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Answers cite the exact passage in your own files, not just the web.",
    "solvesZh": "回答能定位到你自己的文件原文，而不只是给个网页链接。",
    "bestFor": "When you keep research material in scattered documents.",
    "bestForZh": "资料散落在几十个文档里需要反复查证时。",
    "released": "2024-11-01",
    "datePrecision": "month",
    "homepage": "https://ima.qq.com/",
    "desc": "Tencent's knowledge-base-first AI workbench",
    "descZh": "腾讯以知识库为核心的AI智能工作台",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "I"
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
    "id": "base44",
    "name": "Base44",
    "nameZh": "Base44",
    "vendor": "Wix",
    "vendorZh": "Wix",
    "logo": "/assets/logos/wix.png",
    "region": "intl",
    "category": "agent-platform",
    "useCases": [
      "coding",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Produces a working full-stack app with a database from a description, with no scaffold or setup step.",
    "solvesZh": "一段描述就能产出带数据库的可运行全栈应用，无需脚手架和配置。",
    "bestFor": "Reaching for it when you need a working internal tool, not a scalable product.",
    "bestForZh": "需要一个能用的内部工具而不是可扩展产品时。",
    "released": "2024-10-01",
    "datePrecision": "month",
    "homepage": "https://base44.com",
    "desc": "Chat-driven builder for full-stack apps with its own database.",
    "descZh": "对话式全栈应用构建器，自带数据库。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
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
    "id": "nvidia-ai-enterprise",
    "name": "NVIDIA AI Enterprise",
    "nameZh": "NVIDIA AI Enterprise",
    "vendor": "NVIDIA",
    "vendorZh": "NVIDIA",
    "logo": "/assets/logos/nvidia.ico",
    "region": "intl",
    "category": "enterprise-api",
    "useCases": [
      "model-api",
      "observability"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "NIM and NeMo are components. This is the supported, licensed whole that runs them in your own data center with the compliance to match.",
    "solvesZh": "NIM 和 NeMo 只是零件。这是在你自己数据中心里跑它们的受支持、带许可的整体，配得上相应的合规。",
    "bestFor": "You need self-hosted NVIDIA inference with vendor support and licensing.",
    "bestForZh": "你需要自托管的 NVIDIA 推理，还带厂商支持和许可。",
    "released": "2024-08-01",
    "datePrecision": "month",
    "homepage": "https://www.nvidia.com/en-us/data-center/products/ai-enterprise-suite/",
    "desc": "Enterprise AI software suite for data-center deployment.",
    "descZh": "面向数据中心部署的企业级 AI 软件套件",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "N"
  },
  {
    "id": "jingxi-agents",
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
    "id": "zhihu",
    "name": "知乎直答",
    "nameZh": "知乎直答",
    "vendor": "知乎",
    "vendorZh": "知乎",
    "logo": "/assets/logos/zhihu.png",
    "region": "cn",
    "category": "search",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Each claim links to the named Zhihu author who wrote it.",
    "solvesZh": "每个论断都能溯源到写下它的知乎答主本人。",
    "bestFor": "Chinese questions where you want a named human source.",
    "bestForZh": "中文提问、且希望来源是具体真人的场景。",
    "released": "2024-06-29",
    "datePrecision": "day",
    "homepage": "https://zhida.zhihu.com/",
    "desc": "Zhihu's AI search over its own answer archive",
    "descZh": "知乎基于社区真实问答数据的AI搜索引擎",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "知"
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
    "id": "laminar",
    "name": "Laminar",
    "nameZh": "Laminar",
    "vendor": "Laminar",
    "vendorZh": "Laminar",
    "logo": "/assets/logos/laminar.ico",
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability",
      "agent-building"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "Shows you what the agent actually saw on screen when a run went wrong, not just the final log line.",
    "solvesZh": "Agent 出错时能看到它当时在屏幕上看到了什么，而不只是最后一行日志。",
    "bestFor": "Reaching for it when you are debugging browser or computer-use agents specifically.",
    "bestForZh": "专门调试浏览器类或 computer-use 类 Agent 时。",
    "released": "2024-06-01",
    "datePrecision": "month",
    "homepage": "https://laminar.sh",
    "desc": "Open-source observability with browser recordings synced to agent traces.",
    "descZh": "开源可观测平台，把浏览器录像与 Agent 轨迹对齐。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "L"
  },
  {
    "id": "paradot",
    "name": "Paradot",
    "nameZh": "Paradot",
    "vendor": "Paradot",
    "vendorZh": "Paradot",
    "logo": "/assets/logos/paradot.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Gives a persona with a fixed personality rather than a chat that resets each time.",
    "solvesZh": "给你一个性格固定的 AI 角色，而不是每次重置的聊天。",
    "bestFor": "Rehearsing a conversation where tone and persona must stay consistent.",
    "bestForZh": "需要语气和人格前后一致的对话练习。",
    "released": "2024-06-01",
    "datePrecision": "month",
    "homepage": "https://paradot.ai/",
    "desc": "Chat with a virtual being, an AI persona you configure",
    "descZh": "和自建设定的 AI 虚拟角色聊天",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "P"
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
    "status": "renamed",
    "supersededBy": "vibe",
    "successorName": "Vibe 智能体",
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
    "status": "discontinued",
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
    "id": "confident-ai",
    "name": "Confident AI",
    "nameZh": "Confident AI",
    "vendor": "Confident AI",
    "vendorZh": "Confident AI",
    "logo": "/assets/logos/confident-ai.ico",
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Lets you define evaluation metrics in code and run them as part of CI, not as a one-off report.",
    "solvesZh": "评估指标用代码定义并接入 CI，而不是做成一次性报告。",
    "bestFor": "Reaching for it when you want evaluation to run on every commit.",
    "bestForZh": "希望评估在每次提交时自动跑时。",
    "released": "2024-01-01",
    "datePrecision": "month",
    "homepage": "https://www.confident-ai.com",
    "desc": "Evaluation, red-teaming and governance built on the DeepEval framework.",
    "descZh": "基于 DeepEval 框架的评估、红队测试与治理平台。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
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
    "id": "mureka",
    "name": "Mureka",
    "nameZh": "Mureka",
    "vendor": "昆仑万维",
    "vendorZh": "昆仑万维",
    "logo": "/assets/logos/kunlun.ico",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "audio-voice"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "A backing track for a video or podcast usually means licensing something. This generates the track, vocals included.",
    "solvesZh": "给视频或播客配一段背景音乐，通常意味着去授权一首现成的。这个直接生成，含人声。",
    "bestFor": "You need original music cleared for use, quickly.",
    "bestForZh": "你需要一段可以放心使用的原创音乐，而且要快。",
    "released": "2024-01-01",
    "datePrecision": "month",
    "homepage": "https://www.mureka.ai/",
    "desc": "AI music generator for melodies, songs and lyrics.",
    "descZh": "AI 音乐生成器，创作旋律、歌曲与歌词",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "M"
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
    "id": "sosiee",
    "name": "Sosiee",
    "nameZh": "Sosiee",
    "vendor": "Sosiee",
    "vendorZh": "Sosiee",
    "logo": null,
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Makes a consistent avatar for stories and social posts quickly.",
    "solvesZh": "快速做出一个风格统一的头像，用于故事和社媒。",
    "bestFor": "Content that needs the same character across many posts.",
    "bestForZh": "需要同一个角色贯穿多篇内容时。",
    "released": "2024-01-01",
    "datePrecision": "month",
    "homepage": "https://sosiee.ai/",
    "desc": "AI face swap and avatar generator",
    "descZh": "AI 换脸与头像生成工具",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "S"
  },
  {
    "id": "zeta",
    "name": "zeta",
    "nameZh": "zeta",
    "vendor": "Zeta",
    "vendorZh": "Zeta",
    "logo": "/assets/logos/zeta.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Turns a prompt into a character you can keep returning to over time.",
    "solvesZh": "把一个提示词变成可以反复回到其中的角色。",
    "bestFor": "Storytelling practice where continuity of the character matters.",
    "bestForZh": "写故事时需要角色前后一致。",
    "released": "2024-01-01",
    "datePrecision": "month",
    "homepage": "https://zeta.ai/",
    "desc": "AI character and story app",
    "descZh": "AI 角色与故事创作应用",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "Z"
  },
  {
    "id": "sensetime-2",
    "name": "如影",
    "nameZh": "如影",
    "vendor": "商汤",
    "vendorZh": "商汤",
    "logo": "/assets/logos/sensetime.svg",
    "region": "cn",
    "category": "multimodal-creation",
    "useCases": [
      "video"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Hiring a presenter for every product video does not scale. Text or audio in, a presenter out, live or recorded.",
    "solvesZh": "每条产品视频都请一个主播是撑不住的。输入文案或音频，输出主播，直播或录制都行。",
    "bestFor": "You need presenter-led video at volume without a studio.",
    "bestForZh": "你需要批量出镜视频，又没有摄影棚。",
    "released": "2024-01-01",
    "datePrecision": "month",
    "homepage": "https://www.senseavatar.com/",
    "desc": "Digital human video and livestream platform.",
    "descZh": "数字人视频与直播生成平台",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "如"
  },
  {
    "id": "bytedance-6",
    "name": "飞书知识问答",
    "nameZh": "飞书知识问答",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "logo": "/assets/logos/bytedance.png",
    "region": "cn",
    "category": "search",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "The answer exists in a doc from last quarter or in a message from a colleague who has since left. This reads the Feishu record you already have.",
    "solvesZh": "答案在去年某个文档里，或者在一条同事早就离职前的消息里。这个读的就是你已经有的飞书记录。",
    "bestFor": "You need an answer that is already somewhere in your workspace.",
    "bestForZh": "你要找的答案其实已经在工作区某个地方了。",
    "released": "2024-01-01",
    "datePrecision": "month",
    "homepage": "https://www.feishu.cn/product/ai",
    "desc": "Q&A over your Feishu wiki, docs and chat history.",
    "descZh": "对飞书知识库、文档与群聊历史的问答",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "飞"
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
    "id": "sensetime",
    "name": "代码小浣熊",
    "nameZh": "代码小浣熊 Raccoon",
    "vendor": "商汤",
    "vendorZh": "商汤",
    "logo": "/assets/logos/sensetime.svg",
    "region": "cn",
    "category": "coding-agent",
    "useCases": [
      "coding"
    ],
    "form": "ide",
    "surface": "standalone",
    "solves": "Chinese comments and requirements get code that reads like it was written locally.",
    "solvesZh": "中文注释和需求能生成读起来像本地人写的代码。",
    "bestFor": "Chinese-language teams working in mainstream IDEs.",
    "bestForZh": "中文团队在主流 IDE 里写代码。",
    "released": "2023-12-07",
    "datePrecision": "day",
    "homepage": "https://www.sensetime.com/",
    "desc": "SenseTime's AI coding assistant, public beta 2023",
    "descZh": "商汤的AI编程助手，2023年底开放公测",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "代"
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
    "id": "360-ai",
    "name": "360 纳米AI搜索",
    "nameZh": "360 纳米AI搜索",
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
    "solves": "MetaSearch and Perplexity both route across models. 360's version does the same from inside a Chinese browser and search index, which is what makes it answer Chinese queries well.",
    "solvesZh": "MetaSearch 和 Perplexity 都做多模型路由。360 的版本在中国浏览器和搜索索引里做同样的事，这正是它答得好中文查询的原因。",
    "bestFor": "You want AI search with Chinese sources and Chinese query quality.",
    "bestForZh": "你要的是能搜到中文来源、中文查询质量好的 AI 搜索。",
    "released": "2023-11-01",
    "datePrecision": "month",
    "homepage": "https://bot.n.cn/",
    "desc": "360's AI search engine with multi-model routing.",
    "descZh": "360 的 AI 搜索引擎，支持多模型路由",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "3"
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
    "id": "invideo-ai",
    "name": "invideo AI",
    "nameZh": "invideo AI",
    "vendor": "InVideo",
    "vendorZh": "InVideo",
    "logo": "/assets/logos/invideo.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Produces a publish-ready video in minutes when you have no editing time.",
    "solvesZh": "没有剪辑时间时，几分钟产出一条可发布的片子。",
    "bestFor": "Ad tests where you need many short variants of the same idea.",
    "bestForZh": "广告 A/B 测试，要为同一个想法出很多短版本时。",
    "released": "2023-11-01",
    "datePrecision": "month",
    "homepage": "https://invideo.io/ai",
    "desc": "Generates a full video from a prompt, script and stock",
    "descZh": "从一句脚本直接生成带素材的成片",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "I"
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
    "id": "wenxin-fastcode",
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
    "id": "open-webui",
    "name": "Open WebUI",
    "nameZh": "Open WebUI",
    "vendor": "Open WebUI",
    "vendorZh": "Open WebUI",
    "logo": "/assets/logos/open-webui.png",
    "region": "intl",
    "category": "local-runner",
    "useCases": [
      "local-private",
      "agent-building"
    ],
    "form": "self-hosted",
    "surface": "standalone",
    "solves": "Gives you one private chat interface over your own models, so nothing you write leaves your machine.",
    "solvesZh": "给自己的模型一个统一的私有聊天界面，写的内容不出本机。",
    "bestFor": "Reaching for it when you run models locally and want a usable chat, RAG and multi-user layer on top.",
    "bestForZh": "本地跑模型，又需要聊天、检索增强和多用户能力时。",
    "released": "2023-10-06",
    "datePrecision": "day",
    "homepage": "https://openwebui.com",
    "desc": "Self-hosted ChatGPT-style interface for local and cloud models.",
    "descZh": "自托管的类 ChatGPT 界面，同时接本地与云端模型。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "O"
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
    "id": "monica",
    "name": "Monica",
    "nameZh": "Monica",
    "vendor": "Butterfly Effect",
    "vendorZh": "Butterfly Effect",
    "logo": "/assets/logos/butterfly-effect.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Lets you answer one question across several models and compare, without five tabs open.",
    "solvesZh": "同一个问题可以换几个模型对比，不用开五个标签页。",
    "bestFor": "You have a subscription to one model but need a second opinion from another.",
    "bestForZh": "只订了某家模型，还想找另一家给个对照时。",
    "released": "2023-10-01",
    "datePrecision": "month",
    "homepage": "https://monica.im/",
    "desc": "One-stop assistant bundling many models in a browser",
    "descZh": "把多家大模型收进一个浏览器助手",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "M"
  },
  {
    "id": "pixverse",
    "name": "PixVerse",
    "nameZh": "PixVerse",
    "vendor": "爱诗科技",
    "vendorZh": "爱诗科技",
    "logo": "/assets/logos/aishi-tech.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Turns a still photo or a sentence into a short video clip without any 3D or editing skill.",
    "solvesZh": "把一张照片或一句话变成短视频，不需要三维或剪辑基础。",
    "bestFor": "You need a usable generated clip fast and cannot wait on a long queue.",
    "bestForZh": "要快速拿到能用的生成片段、等不起长队列时。",
    "released": "2023-10-01",
    "datePrecision": "month",
    "homepage": "https://pixverse.ai/",
    "desc": "AI video generation from text and images.",
    "descZh": "文生图生视频工具，国内名为拍我AI",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "P"
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
    "id": "appbuilder",
    "name": "千帆应用开发平台 AppBuilder",
    "nameZh": "千帆应用开发平台 AppBuilder",
    "vendor": "百度",
    "vendorZh": "百度",
    "logo": "/assets/logos/baidu.ico",
    "region": "cn",
    "category": "agent-platform",
    "useCases": [
      "agent-building",
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Qianfan gives you models. AppBuilder is where you assemble them into an application — prompts, retrieval, workflow — without writing integration code.",
    "solvesZh": "千帆给你模型。AppBuilder 是把它们组装成应用的地方——提示词、检索、工作流——不用写集成代码。",
    "bestFor": "You need an enterprise app on ERNIE without building the integration layer.",
    "bestForZh": "你要在文心上做一个企业应用，但不想自己搭集成层。",
    "released": "2023-09-01",
    "datePrecision": "month",
    "homepage": "https://cloud.baidu.com/product/AppBuilder",
    "desc": "Baidu's no-code app and agent development platform.",
    "descZh": "百度的零代码应用与智能体开发平台",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "千"
  },
  {
    "id": "minimax-2",
    "name": "星野",
    "nameZh": "星野",
    "vendor": "MiniMax",
    "vendorZh": "MiniMax",
    "logo": "/assets/logos/minimax.png",
    "region": "cn",
    "category": "chat-assistant",
    "useCases": [
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Chat assistants answer questions. This one lets you build a character with a persona, backstory and voice, then talk to it.",
    "solvesZh": "聊天助手回答问题。这个让你设定角色的人格、背景与声线，然后和它对话。",
    "bestFor": "You want to roleplay and interact with a character you designed, not a generic assistant.",
    "bestForZh": "你想和自己设计的角色互动，而不是一个泛用助手。",
    "released": "2023-09-01",
    "datePrecision": "month",
    "homepage": "https://www.xingyeai.com/",
    "desc": "Character-building AI companion app from MiniMax.",
    "descZh": "MiniMax 出品的角色创建类 AI 陪伴应用",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "星"
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
    "id": "bytedance-5",
    "name": "飞书智能纪要",
    "nameZh": "飞书智能纪要",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "logo": "/assets/logos/bytedance.png",
    "region": "cn",
    "category": "meetings",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "in-product",
    "solves": "Somebody has to write the minutes, and it falls on whoever ran the meeting. This generates them in Feishu where the doc already lives.",
    "solvesZh": "总得有人写纪要，结果落到了开会的人头上。这个直接在飞书里生成，文档本来就在那儿。",
    "bestFor": "Your meetings are on Feishu and the minutes should end up there too.",
    "bestForZh": "你的会议在飞书开，纪要也应该落在飞书里。",
    "released": "2023-09-01",
    "datePrecision": "month",
    "homepage": "https://www.feishu.cn/product/minutes",
    "desc": "Feishu's AI meeting minutes and follow-up capture.",
    "descZh": "飞书的 AI 会议纪要与待办提取",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
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
    "id": "dola",
    "name": "Dola",
    "nameZh": "Dola",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "logo": "/assets/logos/bytedance.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Gives you a fast everyday assistant in overseas markets where Doubao is not offered.",
    "solvesZh": "在豆包不适用的海外市场，提供一个日常够用的助手。",
    "bestFor": "You are outside China and want the ByteDance assistant experience.",
    "bestForZh": "在中国境外、想要字节助手那套体验时。",
    "released": "2023-08-01",
    "datePrecision": "month",
    "homepage": "https://www.dola.com/",
    "desc": "ByteDance's overseas assistant, formerly named Cici",
    "descZh": "字节跳动的海外助手，原名 Cici",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "D"
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
    "id": "tongyi-wanxiang",
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
    "id": "alibaba",
    "name": "通义听悟",
    "nameZh": "通义听悟",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "logo": "/assets/logos/alibaba.png",
    "region": "cn",
    "category": "meetings",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "One hour of recording turns into minutes of minutes-ready notes.",
    "solvesZh": "一小时录音，几分钟变成能直接用的纪要。",
    "bestFor": "Meetings, lectures and interviews that need minutes.",
    "bestForZh": "会议、课程和访谈需要出纪要时。",
    "released": "2023-06-27",
    "datePrecision": "day",
    "homepage": "https://tingwu.aliyun.com/",
    "desc": "Alibaba Cloud's audio and video comprehension assistant",
    "descZh": "阿里云的音视频理解与记录AI助手",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "通"
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
    "id": "question-ai",
    "name": "Question.AI",
    "nameZh": "Question.AI",
    "vendor": "Dputable",
    "vendorZh": "Dputable",
    "logo": "/assets/logos/dputable.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research",
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Answers a photographed problem across 140+ languages in one tap.",
    "solvesZh": "拍题即答，支持 140 多种语言。",
    "bestFor": "Homework photos in a language whose tutor you cannot easily find.",
    "bestForZh": "作业是找不到 tutor 的小语种时。",
    "released": "2023-06-01",
    "datePrecision": "month",
    "homepage": "https://question.ai/",
    "desc": "Homework and maths assistant with a general chatbot",
    "descZh": "作业与数学助手，附带通用聊天",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "Q"
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
    "id": "arena",
    "name": "Arena",
    "nameZh": "Arena",
    "vendor": "LMArena",
    "vendorZh": "LMArena",
    "logo": "/assets/logos/lmarena.png",
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Ranks models by what real users prefer in blind tests, instead of by vendor benchmark claims.",
    "solvesZh": "按真实用户盲测偏好排名模型，而不是按厂商自报的跑分。",
    "bestFor": "Reaching for it when you want to pick a model by evidence rather than by marketing.",
    "bestForZh": "想凭证据而不是宣传来选模型时。",
    "released": "2023-05-01",
    "datePrecision": "month",
    "homepage": "https://arena.ai",
    "desc": "Blind A/B comparison of AI models with a public leaderboard.",
    "descZh": "AI 模型盲测 A/B 对比，配套公开排行榜。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "A"
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
    "id": "polybuzz",
    "name": "PolyBuzz",
    "nameZh": "PolyBuzz",
    "vendor": "Cloud Whale Interactive",
    "vendorZh": "Cloud Whale Interactive",
    "logo": "/assets/logos/cloud-whale.ico",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Gives you a conversation partner for practising a language or a social situation.",
    "solvesZh": "给你一个练习语言或社交场景的对话对象。",
    "bestFor": "You want to rehearse a conversation in a low-stakes setting before the real one.",
    "bestForZh": "想在没压力的环境里先把一段对话练熟。",
    "released": "2023-05-01",
    "datePrecision": "month",
    "homepage": "https://www.polybuzz.ai/",
    "desc": "Chat with custom AI characters and role-play scenarios",
    "descZh": "和自定义 AI 角色聊天的陪伴应用",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "P"
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
    "id": "adobe-firefly",
    "name": "Adobe Firefly",
    "nameZh": "Adobe Firefly",
    "vendor": "Adobe",
    "vendorZh": "Adobe",
    "logo": "/assets/logos/adobe.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design",
      "video"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Generates images and video licensed for commercial work, removing the legal doubt around AI-made assets.",
    "solvesZh": "生成可用于商用的图像与视频，消掉 AI 素材的版权顾虑。",
    "bestFor": "Reaching for it when a client or legal team requires provably licensed output.",
    "bestForZh": "客户或法务要求素材来源可追溯时用它。",
    "released": "2023-03-01",
    "datePrecision": "month",
    "homepage": "https://www.adobe.com/products/firefly.html",
    "desc": "Adobe's commercially-safe generative image and video model family.",
    "descZh": "Adobe 的商用安全生成式图像与视频模型家族。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "A"
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
    "id": "klap",
    "name": "Klap",
    "nameZh": "Klap",
    "vendor": "Klap",
    "vendorZh": "Klap",
    "logo": "/assets/logos/klap.ico",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Produces ready-to-post shorts from a long recording, so you skip the manual highlight hunt.",
    "solvesZh": "长视频录完直接出可发布的短片，省掉手动找高光的过程。",
    "bestFor": "Reaching for it when you already record long video and post short.",
    "bestForZh": "已经有长视频素材、只缺短版分发时。",
    "released": "2023-01-01",
    "datePrecision": "month",
    "homepage": "https://klap.app",
    "desc": "Cuts long videos into captioned short clips automatically.",
    "descZh": "把长视频自动切成带字幕的短视频。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "K"
  },
  {
    "id": "maxim-ai",
    "name": "Maxim AI",
    "nameZh": "Maxim AI",
    "vendor": "Maxim AI",
    "vendorZh": "Maxim AI",
    "logo": "/assets/logos/maxim-ai.png",
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Lets you test an agent against simulated scenarios before real users hit its failure modes.",
    "solvesZh": "在真实用户踩坑之前，先用模拟场景把 Agent 测一遍。",
    "bestFor": "Reaching for it when an agent has unpredictable behaviour you cannot reproduce on demand.",
    "bestForZh": "Agent 行为不可预测、无法按需复现时。",
    "released": "2023-01-01",
    "datePrecision": "month",
    "homepage": "https://www.getmaxim.ai",
    "desc": "Simulation, evaluation and observability for AI agents.",
    "descZh": "面向 AI Agent 的模拟、评估与可观测平台。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "M"
  },
  {
    "id": "pollo-ai",
    "name": "Pollo AI",
    "nameZh": "Pollo AI",
    "vendor": "Pollo AI",
    "vendorZh": "Pollo AI",
    "logo": "/assets/logos/pollo-ai.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design",
      "video"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Lets you try several generation models side by side instead of committing to one vendor's look.",
    "solvesZh": "可以横向试多种生成模型，不必锁定某一家画风。",
    "bestFor": "Reaching for it when no single model reliably gives you the style you need.",
    "bestForZh": "单一模型总给不出你要的风格时。",
    "released": "2023-01-01",
    "datePrecision": "month",
    "homepage": "https://pollo.ai",
    "desc": "One interface over many image and video generation models.",
    "descZh": "把多个图像与视频生成模型收进同一个界面。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "P"
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
    "id": "promptlayer",
    "name": "PromptLayer",
    "nameZh": "PromptLayer",
    "vendor": "PromptLayer",
    "vendorZh": "PromptLayer",
    "logo": "/assets/logos/promptlayer.png",
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Keeps prompts under version control with tests attached, so editing one does not silently break a feature.",
    "solvesZh": "提示词纳入版本管理并附带测试，改一句不会悄悄弄坏功能。",
    "bestFor": "Reaching for it when prompt edits are getting risky and you need rollback.",
    "bestForZh": "改提示词风险变大、需要能回滚时。",
    "released": "2023-01-01",
    "datePrecision": "month",
    "homepage": "https://www.promptlayer.com",
    "desc": "Prompt versioning, regression tests and production logging.",
    "descZh": "提示词版本管理、回归测试与线上日志。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "P"
  },
  {
    "id": "retake-ai",
    "name": "Retake AI",
    "nameZh": "Retake AI",
    "vendor": "ZipoApps",
    "vendorZh": "ZipoApps",
    "logo": "/assets/logos/zipoapps.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Gives a plausible new headshot without a photographer or a studio.",
    "solvesZh": "不用影棚也能得到一张像样的新头像。",
    "bestFor": "You need a current profile photo and cannot book a shoot.",
    "bestForZh": "需要一张能用的职业头像、又来不及约拍摄时。",
    "released": "2023-01-01",
    "datePrecision": "month",
    "homepage": "https://apps.apple.com/us/app/retake-ai-face-photo-editor/id6446589017",
    "desc": "AI portrait editor that reshapes faces and skin",
    "descZh": "用 AI 重塑脸型和肤质的头像修图工具",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "R"
  },
  {
    "id": "vellum",
    "name": "Vellum",
    "nameZh": "Vellum",
    "vendor": "Vellum AI",
    "vendorZh": "Vellum AI",
    "logo": "/assets/logos/vellum-ai.svg",
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Keeps prompt versions, test cases and evals in one place, so you can tell a regression from a model change.",
    "solvesZh": "提示词版本、测试用例与评估放在一处，能分清是回归还是模型变化。",
    "bestFor": "Reaching for it when your LLM feature has enough users that regressions actually hurt.",
    "bestForZh": "LLM 功能用户已经多到回归会造成损失时。",
    "released": "2023-01-01",
    "datePrecision": "month",
    "homepage": "https://www.vellum.ai",
    "desc": "Build, test and ship LLM apps with evaluation built in.",
    "descZh": "构建、测试与上线 LLM 应用，内建评估能力。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "V"
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
    "id": "recraft",
    "name": "Recraft",
    "nameZh": "Recraft",
    "vendor": "Recraft",
    "vendorZh": "Recraft",
    "logo": "/assets/logos/recraft.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Produces design output you can still edit, so a logo or icon does not have to be redrawn from scratch.",
    "solvesZh": "产出的设计还能继续编辑，图标不必从头重画。",
    "bestFor": "Reaching for it when the deliverable is a brand asset that has to scale and recolour cleanly.",
    "bestForZh": "交付物是需要缩放和换色仍然干净的品牌素材时。",
    "released": "2022-11-01",
    "datePrecision": "month",
    "homepage": "https://www.recraft.ai",
    "desc": "Generates editable vectors, icons and mockups, not just flat images.",
    "descZh": "生成可编辑的矢量图、图标与样机，而不只是平面图片。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "R"
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
    "id": "consensus",
    "name": "Consensus",
    "nameZh": "Consensus",
    "vendor": "Consensus",
    "vendorZh": "Consensus",
    "logo": "/assets/logos/consensus.svg",
    "region": "intl",
    "category": "search",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Answers research questions from the literature instead of the open web, so you get findings rather than blog posts.",
    "solvesZh": "答案来自学术文献而非开放网页，给的是研究结论而不是博客观点。",
    "bestFor": "Reaching for it when you need what the evidence actually says about a question.",
    "bestForZh": "想知道某个问题上的证据到底怎么说时。",
    "released": "2022-01-01",
    "datePrecision": "month",
    "homepage": "https://consensus.app",
    "desc": "Searches 220M+ peer-reviewed papers and answers with citations.",
    "descZh": "检索两亿多篇同行评审论文，回答附带引用。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "C"
  },
  {
    "id": "galileo",
    "name": "Galileo",
    "nameZh": "Galileo",
    "vendor": "Galileo",
    "vendorZh": "Galileo",
    "logo": "/assets/logos/galileo.png",
    "region": "intl",
    "category": "eval-observability",
    "useCases": [
      "observability",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Scores model output against defined metrics so quality is a number you can track, not a vibe.",
    "solvesZh": "用明确指标给模型输出打分，让质量成为可追踪的数字而不是感觉。",
    "bestFor": "Reaching for it when 'the output got worse' needs to become an actionable finding.",
    "bestForZh": "需要把「效果变差了」变成可定位的问题时。",
    "released": "2022-01-01",
    "datePrecision": "month",
    "homepage": "https://www.galileo.ai",
    "desc": "Evaluation intelligence platform for measuring LLM output quality.",
    "descZh": "面向 LLM 输出质量度量的评估智能平台。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "G"
  },
  {
    "id": "openart",
    "name": "OpenArt",
    "nameZh": "OpenArt",
    "vendor": "OpenArt",
    "vendorZh": "OpenArt",
    "logo": "/assets/logos/openart.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design",
      "video"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Keeps the same character across a whole storyboard instead of resampling a different face each time.",
    "solvesZh": "整个分镜保持同一个角色，不必每次重新随机换脸。",
    "bestFor": "Reaching for it when you are producing a series of images that must read as the same world.",
    "bestForZh": "要产出一组读起来像同一个世界的系列图时。",
    "released": "2022-01-01",
    "datePrecision": "month",
    "homepage": "https://openart.ai",
    "desc": "Image and video generation platform with character consistency across shots.",
    "descZh": "图像与视频生成平台，角色在多个镜头间保持一致。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "O"
  },
  {
    "id": "sudowrite",
    "name": "Sudowrite",
    "nameZh": "Sudowrite",
    "vendor": "Sudowrite",
    "vendorZh": "Sudowrite",
    "logo": "/assets/logos/sudowrite.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Covers plotting, prose rewriting and long-form structure without flattening your voice into generic assistant prose.",
    "solvesZh": "从情节到长篇结构都能帮上，又不会把你的文风压成千篇一律的助手腔。",
    "bestFor": "Reaching for it when you are writing a novel and generic chat assistants stall at the middle.",
    "bestForZh": "写长篇小说、普通聊天助手写到中段就卡住时。",
    "released": "2022-01-01",
    "datePrecision": "month",
    "homepage": "https://sudowrite.com",
    "desc": "AI writing partner built specifically for fiction and long manuscripts.",
    "descZh": "专为小说与长篇写作打造的 AI 写作搭档。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "S"
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
    "id": "capcut",
    "name": "CapCut",
    "nameZh": "CapCut",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "logo": "/assets/logos/bytedance.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Lets you cut and finish a short video on a phone without learning a desktop editor.",
    "solvesZh": "让人在手机上直接剪完一条短视频，不必学桌面剪辑软件。",
    "bestFor": "You are making vertical video for social and want AI captions and templates built in.",
    "bestForZh": "做竖屏短视频、需要自带字幕和模板时。",
    "released": "2020-04-01",
    "datePrecision": "month",
    "homepage": "https://www.capcut.com/",
    "desc": "ByteDance's video editor, including AI generation and editing.",
    "descZh": "字节跳动出海的 AI 剪辑工具，即剪映国际版",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "C"
  },
  {
    "id": "gauth",
    "name": "Gauth",
    "nameZh": "Gauth",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "logo": "/assets/logos/bytedance.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "research"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Photograph a homework question and get a worked explanation instead of just the answer.",
    "solvesZh": "拍下作业题，给的是讲解过程而不是只有答案。",
    "bestFor": "A student who wants to understand the method, not copy the result.",
    "bestForZh": "想弄懂思路而不是抄答案的学生。",
    "released": "2020-01-01",
    "datePrecision": "month",
    "homepage": "https://www.gauthmath.com/",
    "desc": "AI study companion, formerly the Gauthmath homework solver",
    "descZh": "AI 学习助手，原名 Gauthmath 作业相机",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "G"
  },
  {
    "id": "notta",
    "name": "Notta",
    "nameZh": "Notta",
    "vendor": "Notta",
    "vendorZh": "Notta",
    "logo": "/assets/logos/notta.png",
    "region": "intl",
    "category": "meetings",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Produces a searchable transcript and summary of every meeting without assigning a note-taker.",
    "solvesZh": "每场会议自动留下可搜索的转写与总结，不用再指定专人记录。",
    "bestFor": "Reaching for it when meetings run in mixed languages or nobody owns the notes.",
    "bestForZh": "会议语言混杂，或没人负责记纪要时。",
    "released": "2020-01-01",
    "datePrecision": "month",
    "homepage": "https://www.notta.ai",
    "desc": "Records, transcribes and summarises meetings in 58 languages.",
    "descZh": "录制、转写并总结会议，支持 58 种语言。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "N"
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
    "id": "fotor",
    "name": "Fotor",
    "nameZh": "Fotor",
    "vendor": "Everimaging",
    "vendorZh": "Everimaging",
    "logo": "/assets/logos/everimaging.ico",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Turns a photo into a social post with matching brand text in one flow.",
    "solvesZh": "一张图直接生成带品牌文案的社媒物料。",
    "bestFor": "You post often and want the same look without a designer each time.",
    "bestForZh": "要高频发帖、又不想每次都找设计时。",
    "released": "2019-01-01",
    "datePrecision": "month",
    "homepage": "https://www.fotor.com/",
    "desc": "AI photo editor paired with a brand-marketing kit",
    "descZh": "把 AI 修图和品牌物料生成放在一起的工具",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
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
    "id": "remove-bg",
    "name": "remove.bg",
    "nameZh": "remove.bg",
    "vendor": "remove.bg",
    "vendorZh": "remove.bg",
    "logo": "/assets/logos/remove-bg.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Removes backgrounds from product and portrait photos without opening Photoshop.",
    "solvesZh": "商品图和人像图抠背景不用再开 Photoshop。",
    "bestFor": "Reaching for it when you are prepping a batch of product photos for a listing.",
    "bestForZh": "要批量处理商品图上架时。",
    "released": "2018-01-01",
    "datePrecision": "month",
    "homepage": "https://www.remove.bg",
    "desc": "Cuts image backgrounds out in seconds, one click.",
    "descZh": "一键几秒抠掉图片背景。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "R"
  },
  {
    "id": "iflytek",
    "name": "讯飞听见",
    "nameZh": "讯飞听见",
    "vendor": "科大讯飞",
    "vendorZh": "科大讯飞",
    "logo": "/assets/logos/iflytek.ico",
    "region": "cn",
    "category": "meetings",
    "useCases": [
      "office",
      "audio-voice"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Dialect-heavy audio transcribes accurately without switching language modes.",
    "solvesZh": "方言口音重的录音不用切语言模式也能转准。",
    "bestFor": "Long recordings, field interviews, dialect-heavy speech.",
    "bestForZh": "长录音、现场采访、方言较重的讲话。",
    "released": "2017-12-15",
    "datePrecision": "day",
    "homepage": "https://www.iflyrec.com/",
    "desc": "iFlytek's long-running speech-to-text transcription service",
    "descZh": "科大讯飞老牌的语音转文字与会议记录服务",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "讯"
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
    "id": "d-id",
    "name": "D-ID",
    "nameZh": "D-ID",
    "vendor": "D-ID",
    "vendorZh": "D-ID",
    "logo": "/assets/logos/d-id.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "video",
      "agent-building"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Produces presenter video without filming a person, cutting production time from days to minutes.",
    "solvesZh": "不拍真人也能做出出镜视频，制作时间从几天压到几分钟。",
    "bestFor": "Reaching for it when you need presenter-led video in many languages or at high volume.",
    "bestForZh": "需要多语种或大批量出镜口播视频时。",
    "released": "2017-01-01",
    "datePrecision": "month",
    "homepage": "https://www.d-id.com",
    "desc": "Turns text, audio or a still photo into a talking digital person.",
    "descZh": "把文本、音频或一张照片变成会说话的数字人。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "D"
  },
  {
    "id": "deepl",
    "name": "DeepL",
    "nameZh": "DeepL",
    "vendor": "DeepL",
    "vendorZh": "DeepL",
    "logo": "/assets/logos/deepl.ico",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Translates text that reads naturally in the target language, and rewrites your own text in place.",
    "solvesZh": "译文在目标语言里读着自然，也能直接改写你自己的原文。",
    "bestFor": "Reaching for it when fluency in the target language matters more than raw speed.",
    "bestForZh": "目标语言的自然度比速度更重要时。",
    "released": "2017-01-01",
    "datePrecision": "month",
    "homepage": "https://www.deepl.com",
    "desc": "Neural translation plus DeepL Write for whole-text rewriting.",
    "descZh": "神经网络翻译，附带 DeepL Write 全文改写。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "D"
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
  },
  {
    "id": "bandlab",
    "name": "BandLab",
    "nameZh": "BandLab",
    "vendor": "BandLab Technologies",
    "vendorZh": "BandLab Technologies",
    "logo": "/assets/logos/bandlab.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "audio-voice"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Lets friends record into one session remotely instead of booking a studio.",
    "solvesZh": "和朋友远程录同一首歌，不用去录音棚。",
    "bestFor": "Bands whose members are in different cities.",
    "bestForZh": "成员分散在各地的乐队。",
    "released": "2014-08-01",
    "datePrecision": "month",
    "homepage": "https://www.bandlab.com/",
    "desc": "Multiplayer music studio and DAW with AI tools",
    "descZh": "带 AI 工具的在线多人音乐工作站",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "B"
  },
  {
    "id": "picsart",
    "name": "Picsart",
    "nameZh": "Picsart",
    "vendor": "Picsart",
    "vendorZh": "Picsart",
    "logo": "/assets/logos/picsart.png",
    "region": "intl",
    "category": "multimodal-creation",
    "useCases": [
      "image-design",
      "video"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Gives non-designers a pro-level editor plus many image models in the same app.",
    "solvesZh": "把专业级编辑和多个图像模型放进同一个 App。",
    "bestFor": "Marketing assets for a small brand, where one person does everything.",
    "bestForZh": "小团队一个人要包办营销图的情况。",
    "released": "2012-01-01",
    "datePrecision": "month",
    "homepage": "https://picsart.com/",
    "desc": "Photo and video editor with a built-in AI model playground",
    "descZh": "带内置 AI 模型广场的修图与剪辑工具",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "P"
  },
  {
    "id": "grammarly",
    "name": "Grammarly",
    "nameZh": "Grammarly",
    "vendor": "Grammarly",
    "vendorZh": "Grammarly",
    "logo": "/assets/logos/grammarly.png",
    "region": "intl",
    "category": "chat-assistant",
    "useCases": [
      "office"
    ],
    "form": "web",
    "surface": "standalone",
    "solves": "Catches grammar and tone problems as you write, wherever you write.",
    "solvesZh": "在哪个应用里写都能实时挑出语法和语气问题。",
    "bestFor": "Reaching for it when you write a lot and want the basics fixed without leaving your document.",
    "bestForZh": "写得比较多、又不想为了改基础错误而离开当前文档时。",
    "released": "2009-01-01",
    "datePrecision": "month",
    "homepage": "https://www.grammarly.com",
    "desc": "AI writing assistant for grammar, clarity and tone across every app.",
    "descZh": "覆盖全应用的 AI 写作助手，管语法、清晰度与语气。",
    "tags": [],
    "status": "active",
    "supersededBy": null,
    "successorName": "",
    "handbook": {
      "status": "none"
    },
    "lastVerifiedAt": "2026-10-05",
    "glyph": "G"
  }
]
}

export default productHub

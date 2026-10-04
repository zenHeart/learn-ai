/**
 * AI 产品 hub 数据集。
 *
 * 每条记录同时服务两个跳转：
 *   - `homepage`：默认跳转，指向产品官网。
 *   - `docs`：可选，指向本站对应的教程/手册页面；不存在时卡片不显示该链接。
 *
 * 数据由并行调研 agent 产出（国际模型厂商 / 国内模型厂商 / 市面主流产品三路），
 * 按产品名去重合并后与本地 `docs/products` 路由对齐。`released` 取产品首次公开发布时间。
 * `id` 供 Vue 的 :key 使用，只在数据内部出现：非拉丁名会 slug 成 `product-N`，
 * 这类 id 不好看但只要全表唯一即可，不要为了「好看」手工改动已存在的 id。
 *
 * 维护约定：新增产品时同时确认 `homepage` 可访问、`docs` 路由在仓库中真实存在。
 * 产品若已改名或并入其他产品（如 Claude Cowork 并入 Claude、通义灵码更名 Qoder），
 * 请在 `desc` 里写明去向，不要直接删掉历史条目——时间轴的意义就是记录这种演变。
 */

export const productHub = {
  en: {
  "title": "AI Products",
  "description": "Every AI product on one timeline — who shipped what, when, and where to read our handbook.",
  "searchPlaceholder": "Search by name, vendor, or what it does…",
  "viewLabel": "View mode",
  "views": {
    "grid": "Categories",
    "timeline": "Timeline"
  },
  "all": "All",
  "allRegions": "All regions",
  "regionIntl": "International",
  "regionCn": "China",
  "allVendors": "All vendors",
  "docOnly": "With handbook",
  "empty": "No product matches these filters.",
  "reset": "Reset filters",
  "statProducts": "Products",
  "statVendors": "Vendors",
  "statYears": "Span",
  "statGuides": "Handbooks",
  "hint": "Click a name to open the product homepage. Products marked 📖 have a handbook on this site.",
  "doc": "Handbook",
  "categories": {
    "chat-assistant": "Chat assistants",
    "coding-agent": "Coding agents",
    "agent-platform": "Agent platforms",
    "model-platform": "Model platforms",
    "developer-sdk": "Developer SDKs",
    "enterprise-api": "Enterprise APIs",
    "search": "AI search",
    "multimodal-creation": "Multimodal creation",
    "local-runner": "Local runners",
    "eval-observability": "Eval & observability"
  },
  "categoryIcons": {
    "chat-assistant": "💬",
    "coding-agent": "💻",
    "agent-platform": "🧠",
    "model-platform": "🧬",
    "developer-sdk": "🧩",
    "enterprise-api": "🏢",
    "search": "🔍",
    "multimodal-creation": "🎨",
    "local-runner": "🦙",
    "eval-observability": "📈"
  }
},
  zh: {
  "title": "AI 产品",
  "description": "把各家 AI 产品放在同一条时间轴上——谁在什么时候发布了什么，本站有说明的再附一条手册链接。",
  "searchPlaceholder": "按名称、厂商或用途搜索…",
  "viewLabel": "视图",
  "views": {
    "grid": "分类",
    "timeline": "时间轴"
  },
  "all": "全部",
  "allRegions": "全部地区",
  "regionIntl": "海外",
  "regionCn": "国内",
  "allVendors": "全部厂商",
  "docOnly": "有本站手册",
  "empty": "没有符合条件的产品。",
  "reset": "重置筛选",
  "statProducts": "产品数",
  "statVendors": "厂商数",
  "statYears": "时间跨度",
  "statGuides": "站内手册",
  "hint": "点击产品名跳转到官网；带 📖 的产品在本站另有教程。",
  "doc": "站内手册",
  "categories": {
    "chat-assistant": "对话助手",
    "coding-agent": "编程 Agent",
    "agent-platform": "Agent 平台",
    "model-platform": "模型平台",
    "developer-sdk": "开发 SDK",
    "enterprise-api": "企业 API",
    "search": "AI 搜索",
    "multimodal-creation": "多模态创作",
    "local-runner": "本地运行",
    "eval-observability": "评测与可观测"
  },
  "categoryIcons": {
    "chat-assistant": "💬",
    "coding-agent": "💻",
    "agent-platform": "🧠",
    "model-platform": "🧬",
    "developer-sdk": "🧩",
    "enterprise-api": "🏢",
    "search": "🔍",
    "multimodal-creation": "🎨",
    "local-runner": "🦙",
    "eval-observability": "📈"
  }
},
  products: [
  {
    "id": "otter-ai",
    "name": "Otter.ai",
    "nameZh": "Otter.ai",
    "vendor": "Otter.ai",
    "vendorZh": "Otter.ai",
    "region": "intl",
    "category": "agent-platform",
    "released": "2016-05-01",
    "homepage": "https://otter.ai",
    "desc": "Long-running meeting transcription and summary service",
    "descZh": "会议转录与纪要领域最长寿的服务之一，用户基数庞大",
    "tags": [
      "meetings",
      "transcription",
      "enterprise"
    ],
    "glyph": "O"
  },
  {
    "id": "weights-biases",
    "name": "Weights & Biases",
    "nameZh": "Weights & Biases",
    "vendor": "W&B",
    "vendorZh": "W&B",
    "region": "intl",
    "category": "eval-observability",
    "released": "2017-07-01",
    "homepage": "https://wandb.ai",
    "desc": "Experiment tracking that expanded from ML into LLM apps",
    "descZh": "从机器学习实验追踪扩展到 LLM 应用的平台，2025 年被 CoreWeave 收购",
    "tags": [
      "experiment-tracking",
      "mlops",
      "enterprise"
    ],
    "glyph": "W"
  },
  {
    "id": "runway",
    "name": "Runway",
    "nameZh": "Runway",
    "vendor": "Runway",
    "vendorZh": "Runway",
    "region": "intl",
    "category": "multimodal-creation",
    "released": "2018-12-01",
    "homepage": "https://runwayml.com",
    "desc": "Generative video platform; Gen-2 text-to-video in 2023-03",
    "descZh": "生成式视频平台，2023-03 推出 Gen-2，首个公开可用的文生视频模型",
    "tags": [
      "video-generation",
      "creative",
      "multimodal"
    ],
    "glyph": "R"
  },
  {
    "id": "fireflies-ai",
    "name": "Fireflies.ai",
    "nameZh": "Fireflies.ai",
    "vendor": "Fireflies.ai",
    "vendorZh": "Fireflies.ai",
    "region": "intl",
    "category": "agent-platform",
    "released": "2019-10-01",
    "homepage": "https://fireflies.ai",
    "desc": "Meeting bot with searchable archive and 200+ integrations",
    "descZh": "会议机器人与可检索会议库，对接 200+ 应用",
    "tags": [
      "meetings",
      "bot",
      "integrations"
    ],
    "glyph": "F"
  },
  {
    "id": "tl-dv",
    "name": "tl;dv",
    "nameZh": "tl;dv",
    "vendor": "tl;dv",
    "vendorZh": "tl;dv",
    "region": "intl",
    "category": "agent-platform",
    "released": "2020-01-01",
    "homepage": "https://tldv.io",
    "desc": "Meeting recording with AI highlights and CRM sync",
    "descZh": "会议录制加 AI 高光片段提取，可同步到 CRM",
    "tags": [
      "meetings",
      "highlights",
      "crm"
    ],
    "glyph": "T"
  },
  {
    "id": "openai-api",
    "name": "OpenAI API",
    "nameZh": "OpenAI API",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "region": "intl",
    "category": "enterprise-api",
    "released": "2020-06-17",
    "homepage": "https://platform.openai.com/",
    "desc": "Developer API platform powering GPT, DALL-E and Whisper workloads",
    "descZh": "OpenAI 开发者 API 平台，支撑 GPT、DALL-E 与 Whisper 等模型调用",
    "tags": [
      "api",
      "developer-platform",
      "foundation-models"
    ],
    "glyph": "O"
  },
  {
    "id": "descript",
    "name": "Descript",
    "nameZh": "Descript",
    "vendor": "Descript",
    "vendorZh": "Descript",
    "region": "intl",
    "category": "multimodal-creation",
    "released": "2020-10-21",
    "homepage": "https://www.descript.com",
    "desc": "Edit audio and video by editing the transcript text",
    "descZh": "像改文字稿一样编辑音视频，代表了 AI 辅助创作的新交互范式",
    "tags": [
      "video-editing",
      "audio",
      "transcription"
    ],
    "glyph": "D"
  },
  {
    "id": "synthesia",
    "name": "Synthesia",
    "nameZh": "Synthesia",
    "vendor": "Synthesia",
    "vendorZh": "Synthesia",
    "region": "intl",
    "category": "multimodal-creation",
    "released": "2020-11-01",
    "homepage": "https://www.synthesia.io",
    "desc": "Enterprise avatar video platform for training and comms",
    "descZh": "面向企业培训与沟通的数字人视频平台，品类最早的商业化玩家",
    "tags": [
      "avatar",
      "enterprise",
      "video-generation"
    ],
    "glyph": "S"
  },
  {
    "id": "vertex-ai",
    "name": "Vertex AI",
    "nameZh": "Vertex AI",
    "vendor": "Google",
    "vendorZh": "Google",
    "region": "intl",
    "category": "model-platform",
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
    "glyph": "V"
  },
  {
    "id": "github-copilot",
    "name": "GitHub Copilot",
    "nameZh": "GitHub Copilot",
    "vendor": "Microsoft",
    "vendorZh": "Microsoft",
    "region": "intl",
    "category": "coding-agent",
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
    "glyph": "G",
    "docs": {
      "en": "/products/copilot/",
      "zh": "/zh/products/copilot/"
    }
  },
  {
    "id": "ai21-studio",
    "name": "AI21 Studio",
    "nameZh": "AI21 Studio",
    "vendor": "AI21 Labs",
    "vendorZh": "AI21 Labs",
    "region": "intl",
    "category": "developer-sdk",
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
    "glyph": "A"
  },
  {
    "id": "fathom",
    "name": "Fathom",
    "nameZh": "Fathom",
    "vendor": "Fathom",
    "vendorZh": "Fathom",
    "region": "intl",
    "category": "agent-platform",
    "released": "2021-12-01",
    "homepage": "https://fathom.video",
    "desc": "Free AI meeting notetaker popular with sales and support",
    "descZh": "免费 AI 会议纪要工具，在销售与客服团队中广泛使用",
    "tags": [
      "meetings",
      "free-tier",
      "sales"
    ],
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
    "released": "2021-12-01",
    "homepage": "https://you.com",
    "desc": "AI search and agents pivoted from chat research engine",
    "descZh": "从对话式研究引擎转型为 AI 搜索与 Agent 平台",
    "tags": [
      "search",
      "agents",
      "enterprise"
    ],
    "glyph": "Y"
  },
  {
    "id": "phind",
    "name": "Phind",
    "nameZh": "Phind",
    "vendor": "Phind",
    "vendorZh": "Phind",
    "region": "intl",
    "category": "search",
    "released": "2022-07-01",
    "homepage": "https://www.phind.com",
    "desc": "Developer-focused search; shut down January 2026",
    "descZh": "面向开发者的搜索工具，2026-01-16 因巨头内置联网搜索而关停",
    "tags": [
      "developer-search",
      "discontinued",
      "search"
    ],
    "glyph": "P"
  },
  {
    "id": "midjourney",
    "name": "Midjourney",
    "nameZh": "Midjourney",
    "vendor": "Midjourney, Inc.",
    "vendorZh": "Midjourney, Inc.",
    "region": "intl",
    "category": "multimodal-creation",
    "released": "2022-07-12",
    "homepage": "https://www.midjourney.com",
    "desc": "Aesthetic image generation that reset industry quality bars",
    "descZh": "把图像生成美学水准拉到新高度的产品，2022-07 开放公测",
    "tags": [
      "image-generation",
      "diffusion",
      "creative"
    ],
    "glyph": "M"
  },
  {
    "id": "heygen",
    "name": "HeyGen",
    "nameZh": "HeyGen",
    "vendor": "HeyGen",
    "vendorZh": "HeyGen",
    "region": "intl",
    "category": "multimodal-creation",
    "released": "2022-07-29",
    "homepage": "https://www.heygen.com",
    "desc": "AI avatar video generation and multilingual dubbing",
    "descZh": "AI 数字人视频生成与多语言配音平台",
    "tags": [
      "avatar",
      "video-generation",
      "localization"
    ],
    "glyph": "H"
  },
  {
    "id": "character-ai",
    "name": "Character.AI",
    "nameZh": "Character.AI",
    "vendor": "Character.AI",
    "vendorZh": "Character.AI",
    "region": "intl",
    "category": "chat-assistant",
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
    "glyph": "C"
  },
  {
    "id": "langchain",
    "name": "LangChain",
    "nameZh": "LangChain",
    "vendor": "LangChain Inc.",
    "vendorZh": "LangChain Inc.",
    "region": "intl",
    "category": "developer-sdk",
    "released": "2022-10-01",
    "homepage": "https://www.langchain.com",
    "desc": "Framework that popularised LLM application development",
    "descZh": "推动 LLM 应用开发普及的框架，2022 年发布并迅速成为事实标准",
    "tags": [
      "framework",
      "llm-apps",
      "developer-tools"
    ],
    "glyph": "L"
  },
  {
    "id": "exa",
    "name": "Exa",
    "nameZh": "Exa",
    "vendor": "Exa Labs",
    "vendorZh": "Exa Labs",
    "region": "intl",
    "category": "search",
    "released": "2022-11-01",
    "homepage": "https://exa.ai",
    "desc": "Neural search API built for retrieval by AI agents",
    "descZh": "为 AI Agent 检索设计的神经搜索引擎与 API，前身 Metaphor",
    "tags": [
      "search-api",
      "retrieval",
      "agents"
    ],
    "glyph": "E"
  },
  {
    "id": "notion-ai",
    "name": "Notion AI",
    "nameZh": "Notion AI",
    "vendor": "Notion",
    "vendorZh": "Notion",
    "region": "intl",
    "category": "chat-assistant",
    "released": "2022-11-16",
    "homepage": "https://www.notion.so/product/ai",
    "desc": "AI writing and Q&A embedded across the Notion workspace",
    "descZh": "嵌入 Notion 工作区的 AI 写作与问答，2023-02-22 正式 GA",
    "tags": [
      "workspace",
      "writing",
      "knowledge-base"
    ],
    "glyph": "N"
  },
  {
    "id": "chatgpt",
    "name": "ChatGPT",
    "nameZh": "ChatGPT",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "region": "intl",
    "category": "chat-assistant",
    "released": "2022-11-30",
    "homepage": "https://chatgpt.com/",
    "desc": "OpenAI's flagship conversational AI assistant, launched November 2022",
    "descZh": "OpenAI 旗舰对话式 AI 助手，2022 年 11 月 30 日上线",
    "tags": [
      "chatgpt",
      "conversational-ai",
      "consumer"
    ],
    "glyph": "C"
  },
  {
    "id": "leonardo-ai",
    "name": "Leonardo AI",
    "nameZh": "Leonardo AI",
    "vendor": "Leonardo.Ai",
    "vendorZh": "Leonardo.Ai",
    "region": "intl",
    "category": "multimodal-creation",
    "released": "2022-12-07",
    "homepage": "https://leonardo.ai",
    "desc": "Game and product asset generation studio, acquired by Canva",
    "descZh": "面向游戏与电商素材的图像生成工作台，2024 年被 Canva 收购",
    "tags": [
      "image-generation",
      "game-assets",
      "creative"
    ],
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
    "glyph": "P"
  },
  {
    "id": "helicone",
    "name": "Helicone",
    "nameZh": "Helicone",
    "vendor": "Helicone",
    "vendorZh": "Helicone",
    "region": "intl",
    "category": "eval-observability",
    "released": "2023-01-01",
    "homepage": "https://www.helicone.ai",
    "desc": "One-line proxy observability for LLM API traffic",
    "descZh": "改一行 base_url 即可接入的 LLM 流量观测代理，2026-03 被 Mintlify 收购",
    "tags": [
      "open-source",
      "proxy",
      "observability"
    ],
    "glyph": "H"
  },
  {
    "id": "elevenlabs",
    "name": "ElevenLabs",
    "nameZh": "ElevenLabs",
    "vendor": "ElevenLabs",
    "vendorZh": "ElevenLabs",
    "region": "intl",
    "category": "multimodal-creation",
    "released": "2023-01-23",
    "homepage": "https://elevenlabs.io",
    "desc": "Most realistic open TTS and voice cloning API",
    "descZh": "语音合成与声音克隆中最具真实感的平台与 API",
    "tags": [
      "tts",
      "voice-cloning",
      "audio"
    ],
    "glyph": "E"
  },
  {
    "id": "microsoft-copilot",
    "name": "Microsoft Copilot",
    "nameZh": "Microsoft Copilot",
    "vendor": "Microsoft",
    "vendorZh": "Microsoft",
    "region": "intl",
    "category": "chat-assistant",
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
    "glyph": "M",
    "docs": {
      "en": "/products/copilot/",
      "zh": "/zh/products/copilot/"
    }
  },
  {
    "id": "relevance-ai",
    "name": "Relevance AI",
    "nameZh": "Relevance AI",
    "vendor": "Relevance AI",
    "vendorZh": "Relevance AI",
    "region": "intl",
    "category": "agent-platform",
    "released": "2023-02-20",
    "homepage": "https://relevanceai.com",
    "desc": "Build and deploy a workforce of no-code AI agents",
    "descZh": "构建并部署一支无代码 AI 员工队伍，支持多智能体团队协作",
    "tags": [
      "no-code",
      "multi-agent",
      "workforce"
    ],
    "glyph": "R"
  },
  {
    "id": "cursor",
    "name": "Cursor",
    "nameZh": "Cursor",
    "vendor": "Anysphere",
    "vendorZh": "Anysphere",
    "region": "intl",
    "category": "coding-agent",
    "released": "2023-03-01",
    "homepage": "https://cursor.com",
    "desc": "VS Code fork built around whole-codebase AI editing",
    "descZh": "基于 VS Code 改造的 AI 原生编辑器，围绕整仓库上下文编辑",
    "tags": [
      "ai-ide",
      "code-editor",
      "agentic-coding"
    ],
    "glyph": "C",
    "docs": {
      "en": "/products/cursor/",
      "zh": "/zh/products/cursor/"
    }
  },
  {
    "id": "claude-ai",
    "name": "Claude.ai",
    "nameZh": "Claude.ai",
    "vendor": "Anthropic",
    "vendorZh": "Anthropic",
    "region": "intl",
    "category": "chat-assistant",
    "released": "2023-03-14",
    "homepage": "https://claude.ai/",
    "desc": "Anthropic's conversational assistant for analysis, writing and code",
    "descZh": "Anthropic 的对话式助手，面向分析、写作与编程任务",
    "tags": [
      "conversational-ai",
      "consumer",
      "reasoning"
    ],
    "glyph": "C",
    "docs": {
      "en": "/products/claude/",
      "zh": "/zh/products/claude/"
    }
  },
  {
    "id": "product",
    "name": "文心一言",
    "nameZh": "文心一言",
    "vendor": "百度",
    "vendorZh": "百度",
    "region": "cn",
    "category": "chat-assistant",
    "released": "2023-03-16",
    "homepage": "https://yiyan.baidu.com",
    "desc": "百度首个生成式 AI 对话应用",
    "descZh": "百度首个生成式 AI 对话应用",
    "tags": [
      "chat-assistant",
      "wenxin",
      "baidu"
    ],
    "glyph": "文"
  },
  {
    "id": "warp",
    "name": "Warp",
    "nameZh": "Warp",
    "vendor": "Warp Inc.",
    "vendorZh": "Warp Inc.",
    "region": "intl",
    "category": "coding-agent",
    "released": "2023-03-17",
    "homepage": "https://warp.dev",
    "desc": "GPU-rendered terminal with natural-language command execution",
    "descZh": "GPU 渲染的现代终端，支持自然语言转命令与多步 Agent 模式",
    "tags": [
      "terminal",
      "cli",
      "agentic-ide"
    ],
    "glyph": "W"
  },
  {
    "id": "flowise",
    "name": "Flowise",
    "nameZh": "Flowise",
    "vendor": "FlowiseAI",
    "vendorZh": "FlowiseAI",
    "region": "intl",
    "category": "agent-platform",
    "released": "2023-03-29",
    "homepage": "https://flowiseai.com",
    "desc": "Drag-and-drop LangChain flow builder, acquired by Workday",
    "descZh": "拖拽式 LangChain 流程搭建工具，2025-08 被 Workday 收购",
    "tags": [
      "open-source",
      "langchain",
      "low-code"
    ],
    "glyph": "F"
  },
  {
    "id": "gpt4all",
    "name": "GPT4All",
    "nameZh": "GPT4All",
    "vendor": "Nomic AI",
    "vendorZh": "Nomic AI",
    "region": "intl",
    "category": "local-runner",
    "released": "2023-04-03",
    "homepage": "https://gpt4all.io",
    "desc": "Early consumer desktop app for running LLMs locally",
    "descZh": "早期面向普通用户的本地 LLM 桌面运行器，模型能力后来被追平",
    "tags": [
      "desktop",
      "local-llm",
      "quantization"
    ],
    "glyph": "G"
  },
  {
    "id": "ai",
    "name": "天工AI",
    "nameZh": "天工AI",
    "vendor": "昆仑万维",
    "vendorZh": "昆仑万维",
    "region": "cn",
    "category": "chat-assistant",
    "released": "2023-04-18",
    "homepage": "https://www.tiangong.cn",
    "desc": "昆仑万维天工大模型官方助手",
    "descZh": "昆仑万维天工大模型官方助手",
    "tags": [
      "chat-assistant",
      "skywork",
      "kunlun"
    ],
    "glyph": "天"
  },
  {
    "id": "cohere-rerank",
    "name": "Cohere Rerank",
    "nameZh": "Cohere Rerank",
    "vendor": "Cohere",
    "vendorZh": "Cohere",
    "region": "intl",
    "category": "enterprise-api",
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
    "released": "2023-05-01",
    "homepage": "https://lmstudio.ai",
    "desc": "GUI desktop app for discovering and running local LLMs",
    "descZh": "带图形界面的本地模型运行器，普通用户也能下载即用",
    "tags": [
      "desktop",
      "local-llm",
      "gui"
    ],
    "glyph": "L"
  },
  {
    "id": "inflection-pi",
    "name": "Inflection Pi",
    "nameZh": "Inflection Pi",
    "vendor": "Inflection AI",
    "vendorZh": "Inflection AI",
    "region": "intl",
    "category": "chat-assistant",
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
    "glyph": "I"
  },
  {
    "id": "product-2",
    "name": "讯飞星火",
    "nameZh": "讯飞星火",
    "vendor": "科大讯飞",
    "vendorZh": "科大讯飞",
    "region": "cn",
    "category": "chat-assistant",
    "released": "2023-05-06",
    "homepage": "https://xinghuo.xfyun.cn/chat",
    "desc": "科大讯飞通用大模型助手",
    "descZh": "科大讯飞通用大模型助手",
    "tags": [
      "chat-assistant",
      "spark",
      "iflytek"
    ],
    "glyph": "讯"
  },
  {
    "id": "dify",
    "name": "Dify",
    "nameZh": "Dify",
    "vendor": "LangGenius",
    "vendorZh": "LangGenius",
    "region": "intl",
    "category": "agent-platform",
    "released": "2023-05-09",
    "homepage": "https://dify.ai",
    "desc": "Open-source LLMOps platform for visual LLM app building",
    "descZh": "开源 LLMOps 平台，可视化编排 LLM 应用、工作流与 Agent",
    "tags": [
      "open-source",
      "llmops",
      "self-hosted"
    ],
    "glyph": "D"
  },
  {
    "id": "framer-ai",
    "name": "Framer AI",
    "nameZh": "Framer AI",
    "vendor": "Framer",
    "vendorZh": "Framer",
    "region": "intl",
    "category": "multimodal-creation",
    "released": "2023-06-14",
    "homepage": "https://www.framer.com/ai/",
    "desc": "Generate and edit production websites from a text prompt",
    "descZh": "用文本提示生成并修改可上线的网站，2023-06 登顶 Product Hunt 日榜",
    "tags": [
      "no-code",
      "web-design",
      "landing-page"
    ],
    "glyph": "F"
  },
  {
    "id": "vercel-ai-sdk",
    "name": "Vercel AI SDK",
    "nameZh": "Vercel AI SDK",
    "vendor": "Vercel",
    "vendorZh": "Vercel",
    "region": "intl",
    "category": "developer-sdk",
    "released": "2023-06-15",
    "homepage": "https://sdk.vercel.ai",
    "desc": "TypeScript toolkit for streaming LLM UIs across providers",
    "descZh": "面向 TypeScript 的流式 LLM UI 工具包，统一多家模型接口",
    "tags": [
      "typescript",
      "sdk",
      "streaming"
    ],
    "glyph": "V"
  },
  {
    "id": "claude-api",
    "name": "Claude API",
    "nameZh": "Claude API",
    "vendor": "Anthropic",
    "vendorZh": "Anthropic",
    "region": "intl",
    "category": "enterprise-api",
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
    "glyph": "C",
    "docs": {
      "en": "/products/claude/",
      "zh": "/zh/products/claude/"
    }
  },
  {
    "id": "product-3",
    "name": "商量",
    "nameZh": "商量",
    "vendor": "商汤",
    "vendorZh": "商汤",
    "region": "cn",
    "category": "chat-assistant",
    "released": "2023-06-21",
    "homepage": "https://chat.sensetime.com",
    "desc": "商汤日日新大模型对话助手",
    "descZh": "商汤日日新大模型对话助手",
    "tags": [
      "chat-assistant",
      "sensenova",
      "sensetime"
    ],
    "glyph": "商"
  },
  {
    "id": "product-4",
    "name": "火山方舟",
    "nameZh": "火山方舟",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "region": "cn",
    "category": "model-platform",
    "released": "2023-06-28",
    "homepage": "https://www.volcengine.com/product/ark",
    "desc": "火山引擎企业级大模型服务平台",
    "descZh": "火山引擎企业级大模型服务平台",
    "tags": [
      "model-platform",
      "maas",
      "volcengine"
    ],
    "glyph": "火",
    "docs": {
      "en": "/products/volcengine-ark/",
      "zh": "/zh/products/volcengine-ark/"
    }
  },
  {
    "id": "ollama",
    "name": "Ollama",
    "nameZh": "Ollama",
    "vendor": "Ollama",
    "vendorZh": "Ollama",
    "region": "intl",
    "category": "local-runner",
    "released": "2023-07-08",
    "homepage": "https://ollama.com",
    "desc": "One-command local model runner that made LLMs accessible",
    "descZh": "一条命令即可本地跑模型，是本地 LLM 普及的关键推手",
    "tags": [
      "open-source",
      "local-llm",
      "runtime"
    ],
    "glyph": "O",
    "docs": {
      "en": "/products/ollama.html",
      "zh": "/zh/products/ollama.html"
    }
  },
  {
    "id": "langsmith",
    "name": "LangSmith",
    "nameZh": "LangSmith",
    "vendor": "LangChain Inc.",
    "vendorZh": "LangChain Inc.",
    "region": "intl",
    "category": "eval-observability",
    "released": "2023-07-18",
    "homepage": "https://www.langchain.com/langsmith",
    "desc": "Tracing, evaluation and monitoring for LLM applications",
    "descZh": "面向 LLM 应用的追踪、评测与监控平台，2024-02 正式 GA",
    "tags": [
      "tracing",
      "evaluation",
      "llmops"
    ],
    "glyph": "L"
  },
  {
    "id": "notebooklm",
    "name": "NotebookLM",
    "nameZh": "NotebookLM",
    "vendor": "Google",
    "vendorZh": "Google",
    "region": "intl",
    "category": "chat-assistant",
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
    "glyph": "N"
  },
  {
    "id": "braintrust",
    "name": "Braintrust",
    "nameZh": "Braintrust",
    "vendor": "Braintrust",
    "vendorZh": "Braintrust",
    "region": "intl",
    "category": "eval-observability",
    "released": "2023-08-01",
    "homepage": "https://www.braintrust.dev",
    "desc": "Eval-first platform combining scoring, logging and playgrounds",
    "descZh": "以评测为核心的打分、日志与 Playground 一体化平台",
    "tags": [
      "evaluation",
      "llmops",
      "experimentation"
    ],
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
    "released": "2023-08-01",
    "homepage": "https://www.krea.ai",
    "desc": "Real-time generative canvas with sub-second image feedback",
    "descZh": "实时生成画布，图像反馈进入亚秒级，可边画边生成",
    "tags": [
      "real-time",
      "image-generation",
      "canvas"
    ],
    "glyph": "K"
  },
  {
    "id": "minicpm",
    "name": "面壁 MiniCPM",
    "nameZh": "面壁 MiniCPM",
    "vendor": "面壁智能",
    "vendorZh": "面壁智能",
    "region": "cn",
    "category": "local-runner",
    "released": "2023-08-01",
    "homepage": "https://openbmb.cn",
    "desc": "端侧优先的轻量大模型与工具链",
    "descZh": "端侧优先的轻量大模型与工具链",
    "tags": [
      "local-runner",
      "on-device",
      "openbmb"
    ],
    "glyph": "面"
  },
  {
    "id": "product-5",
    "name": "豆包",
    "nameZh": "豆包",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "region": "cn",
    "category": "chat-assistant",
    "released": "2023-08-17",
    "homepage": "https://www.doubao.com",
    "desc": "字节跳动通用 AI 助手",
    "descZh": "字节跳动通用 AI 助手",
    "tags": [
      "chat-assistant",
      "bytedance",
      "consumer"
    ],
    "glyph": "豆",
    "docs": {
      "en": "/products/doubao/",
      "zh": "/zh/products/doubao/"
    }
  },
  {
    "id": "langfuse",
    "name": "Langfuse",
    "nameZh": "Langfuse",
    "vendor": "Langfuse",
    "vendorZh": "Langfuse",
    "region": "intl",
    "category": "eval-observability",
    "released": "2023-08-20",
    "homepage": "https://langfuse.com",
    "desc": "Open-source tracing, prompt management and LLM evals",
    "descZh": "开源的 LLM 追踪、Prompt 管理与评测平台，自托管友好",
    "tags": [
      "open-source",
      "tracing",
      "llmops"
    ],
    "glyph": "L"
  },
  {
    "id": "ideogram",
    "name": "Ideogram",
    "nameZh": "Ideogram",
    "vendor": "Ideogram",
    "vendorZh": "Ideogram",
    "region": "intl",
    "category": "multimodal-creation",
    "released": "2023-08-22",
    "homepage": "https://ideogram.ai",
    "desc": "Best-in-class legible text rendering inside images",
    "descZh": "图像内文字排版准确率领先，是海报与 Logo 生成的常用选择",
    "tags": [
      "image-generation",
      "typography",
      "creative"
    ],
    "glyph": "I"
  },
  {
    "id": "product-6",
    "name": "智谱清言",
    "nameZh": "智谱清言",
    "vendor": "智谱",
    "vendorZh": "智谱",
    "region": "cn",
    "category": "chat-assistant",
    "released": "2023-08-31",
    "homepage": "https://chatglm.cn",
    "desc": "智谱面向 C 端的生成式 AI 助手",
    "descZh": "智谱面向 C 端的生成式 AI 助手",
    "tags": [
      "chat-assistant",
      "glm",
      "zhipu"
    ],
    "glyph": "智",
    "docs": {
      "en": "/products/zhipu-chat/",
      "zh": "/zh/products/zhipu-chat/"
    }
  },
  {
    "id": "product-7",
    "name": "腾讯混元",
    "nameZh": "腾讯混元",
    "vendor": "腾讯",
    "vendorZh": "腾讯",
    "region": "cn",
    "category": "model-platform",
    "released": "2023-09-01",
    "homepage": "https://hunyuan.tencent.com",
    "desc": "腾讯通用大语言模型与 API 平台",
    "descZh": "腾讯通用大语言模型与 API 平台",
    "tags": [
      "model-platform",
      "hunyuan",
      "tencent"
    ],
    "glyph": "腾",
    "docs": {
      "en": "/products/hunyuan/",
      "zh": "/zh/products/hunyuan/"
    }
  },
  {
    "id": "webflow-ai",
    "name": "Webflow AI",
    "nameZh": "Webflow AI",
    "vendor": "Webflow",
    "vendorZh": "Webflow",
    "region": "intl",
    "category": "multimodal-creation",
    "released": "2023-09-05",
    "homepage": "https://webflow.com/ai",
    "desc": "AI site builder, copywriter and Figma-to-code inside Webflow",
    "descZh": "Webflow 内置的 AI 建站、文案生成与 Figma 转代码能力",
    "tags": [
      "no-code",
      "web-design",
      "cms"
    ],
    "glyph": "W"
  },
  {
    "id": "amazon-bedrock",
    "name": "Amazon Bedrock",
    "nameZh": "Amazon Bedrock",
    "vendor": "Amazon",
    "vendorZh": "Amazon",
    "region": "intl",
    "category": "model-platform",
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
    "glyph": "A"
  },
  {
    "id": "cohere-command",
    "name": "Cohere Command",
    "nameZh": "Cohere Command",
    "vendor": "Cohere",
    "vendorZh": "Cohere",
    "region": "intl",
    "category": "enterprise-api",
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
    "glyph": "C"
  },
  {
    "id": "kimi",
    "name": "Kimi",
    "nameZh": "Kimi",
    "vendor": "月之暗面",
    "vendorZh": "月之暗面",
    "region": "cn",
    "category": "chat-assistant",
    "released": "2023-10-01",
    "homepage": "https://www.kimi.com",
    "desc": "支持超长上下文的 AI 智能助手",
    "descZh": "支持超长上下文的 AI 智能助手",
    "tags": [
      "chat-assistant",
      "long-context",
      "moonshot"
    ],
    "glyph": "K",
    "docs": {
      "en": "/products/kimi/",
      "zh": "/zh/products/kimi/"
    }
  },
  {
    "id": "n8n",
    "name": "n8n",
    "nameZh": "n8n",
    "vendor": "n8n",
    "vendorZh": "n8n",
    "region": "intl",
    "category": "agent-platform",
    "released": "2023-10-04",
    "homepage": "https://n8n.io",
    "desc": "Source-available workflow automation with native LLM nodes",
    "descZh": "源码可用的工作流自动化平台，2023-10 加入原生 LangChain 节点",
    "tags": [
      "workflow",
      "automation",
      "self-hosted"
    ],
    "glyph": "N"
  },
  {
    "id": "v0",
    "name": "v0",
    "nameZh": "v0",
    "vendor": "Vercel",
    "vendorZh": "Vercel",
    "region": "intl",
    "category": "coding-agent",
    "released": "2023-10-11",
    "homepage": "https://v0.app",
    "desc": "Generate React and Tailwind UI from text prompts",
    "descZh": "用文本提示生成 React 与 Tailwind 前端界面，Vercel 官方出品",
    "tags": [
      "ui-generation",
      "react",
      "frontend"
    ],
    "glyph": "V"
  },
  {
    "id": "ray-ban-meta",
    "name": "Ray-Ban Meta",
    "nameZh": "Ray-Ban Meta 智能眼镜",
    "vendor": "Meta / EssilorLuxottica",
    "vendorZh": "Meta / EssilorLuxottica",
    "region": "intl",
    "category": "chat-assistant",
    "released": "2023-10-17",
    "homepage": "https://www.meta.com/smart-glasses",
    "desc": "Camera-and-assistant glasses; the only mass-market AI wearable hit",
    "descZh": "带摄像头与语音助手的智能眼镜，AI 穿戴中唯一真正走量的产品",
    "tags": [
      "hardware",
      "wearable",
      "camera"
    ],
    "glyph": "R"
  },
  {
    "id": "canva-magic-studio",
    "name": "Canva Magic Studio",
    "nameZh": "Canva 魔法工作室",
    "vendor": "Canva",
    "vendorZh": "Canva",
    "region": "intl",
    "category": "multimodal-creation",
    "released": "2023-10-24",
    "homepage": "https://www.canva.com/magic-studio/",
    "desc": "AI design suite that pushed generative creation to non-designers",
    "descZh": "把生成式创作带给非设计用户的套件，是最大规模的消费级 AI 创作入口之一",
    "tags": [
      "design",
      "consumer",
      "image-generation"
    ],
    "glyph": "C"
  },
  {
    "id": "product-8",
    "name": "通义",
    "nameZh": "通义",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "region": "cn",
    "category": "chat-assistant",
    "released": "2023-10-31",
    "homepage": "https://www.tongyi.com",
    "desc": "通义助手应用，后更名千问",
    "descZh": "通义助手应用，后更名千问",
    "tags": [
      "chat-assistant",
      "qwen",
      "alibaba"
    ],
    "glyph": "通",
    "docs": {
      "en": "/products/qwen/",
      "zh": "/zh/products/qwen/"
    }
  },
  {
    "name": "通义灵码",
    "nameZh": "通义灵码",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "region": "cn",
    "category": "coding-agent",
    "released": "2023-10-31",
    "homepage": "https://lingma.aliyun.com",
    "desc": "Alibaba Cloud coding assistant, renamed Qoder in 2026",
    "descZh": "阿里云智能编码助手，2026 年起系列更名 Qoder",
    "tags": [
      "coding-assistant",
      "ide-plugin",
      "qwen"
    ],
    "docs": {
      "en": "/products/lingma/",
      "zh": "/zh/products/lingma/"
    },
    "id": "lingma",
    "glyph": "通"
  },
  {
    "id": "bigmodel",
    "name": "BigModel 开放平台",
    "nameZh": "BigModel 开放平台",
    "vendor": "智谱",
    "vendorZh": "智谱",
    "region": "cn",
    "category": "model-platform",
    "released": "2023-11-01",
    "homepage": "https://bigmodel.cn",
    "desc": "智谱大模型开放平台与 API 服务",
    "descZh": "智谱大模型开放平台与 API 服务",
    "tags": [
      "model-platform",
      "api",
      "zhipu"
    ],
    "glyph": "B",
    "docs": {
      "en": "/products/zhipu-chat/",
      "zh": "/zh/products/zhipu-chat/"
    }
  },
  {
    "id": "crewai",
    "name": "CrewAI",
    "nameZh": "CrewAI",
    "vendor": "CrewAI",
    "vendorZh": "CrewAI",
    "region": "intl",
    "category": "developer-sdk",
    "released": "2023-11-01",
    "homepage": "https://www.crewai.com",
    "desc": "Role-based framework for orchestrating multi-agent workflows",
    "descZh": "基于角色的多智能体协作编排框架，2023-12 在 PyPI 首次发布",
    "tags": [
      "framework",
      "multi-agent",
      "python"
    ],
    "glyph": "C"
  },
  {
    "id": "product-10",
    "name": "阿里云百炼",
    "nameZh": "阿里云百炼",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "region": "cn",
    "category": "model-platform",
    "released": "2023-11-01",
    "homepage": "https://bailian.console.aliyun.com",
    "desc": "一站式大模型开发与应用平台",
    "descZh": "一站式大模型开发与应用平台",
    "tags": [
      "model-platform",
      "maas",
      "alibaba-cloud"
    ],
    "glyph": "阿",
    "docs": {
      "en": "/products/bailian/",
      "zh": "/zh/products/bailian/"
    }
  },
  {
    "id": "grok",
    "name": "Grok",
    "nameZh": "Grok",
    "vendor": "xAI",
    "vendorZh": "xAI",
    "region": "intl",
    "category": "chat-assistant",
    "released": "2023-11-04",
    "homepage": "https://grok.com/",
    "desc": "xAI's real-time conversational assistant with X platform data",
    "descZh": "xAI 的实时对话助手，融合 X 平台数据",
    "tags": [
      "consumer",
      "realtime",
      "social-data"
    ],
    "glyph": "G",
    "docs": {
      "en": "/products/grok/",
      "zh": "/zh/products/grok/"
    }
  },
  {
    "id": "figma-ai",
    "name": "Figma AI",
    "nameZh": "Figma AI",
    "vendor": "Figma",
    "vendorZh": "Figma",
    "region": "intl",
    "category": "multimodal-creation",
    "released": "2023-11-07",
    "homepage": "https://www.figma.com/ai/",
    "desc": "AI features spanning FigJam, design and prototyping",
    "descZh": "覆盖 FigJam 白板、设计与原型的 AI 能力，2024-06 扩展为完整套件",
    "tags": [
      "design",
      "whiteboard",
      "prototyping"
    ],
    "glyph": "F",
    "docs": {
      "en": "/products/figma-ai/",
      "zh": "/zh/products/figma-ai/"
    }
  },
  {
    "id": "product-11",
    "name": "百度千帆",
    "nameZh": "百度千帆",
    "vendor": "百度",
    "vendorZh": "百度",
    "region": "cn",
    "category": "model-platform",
    "released": "2023-11-09",
    "homepage": "https://qianfan.cloud.baidu.com",
    "desc": "百度智能云大模型开发与服务平台",
    "descZh": "百度智能云大模型开发与服务平台",
    "tags": [
      "model-platform",
      "maas",
      "baidu-cloud"
    ],
    "glyph": "百"
  },
  {
    "id": "windsurf",
    "name": "Windsurf",
    "nameZh": "Windsurf（现 Devin Desktop）",
    "vendor": "Cognition",
    "vendorZh": "Cognition",
    "region": "intl",
    "category": "coding-agent",
    "released": "2023-11-14",
    "homepage": "https://windsurf.com",
    "desc": "AI editor acquired by Cognition, now Devin Desktop.",
    "descZh": "AI 编辑器，已被 Cognition 收购，现为 Devin Desktop。",
    "tags": [
      "ai-ide",
      "rebrand",
      "code-editor"
    ],
    "glyph": "W"
  },
  {
    "id": "microsoft-copilot-studio",
    "name": "Microsoft Copilot Studio",
    "nameZh": "Microsoft Copilot Studio",
    "vendor": "Microsoft",
    "vendorZh": "Microsoft",
    "region": "intl",
    "category": "agent-platform",
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
    "glyph": "M"
  },
  {
    "id": "augment-code",
    "name": "Augment Code",
    "nameZh": "Augment Code",
    "vendor": "Augment",
    "vendorZh": "Augment",
    "region": "intl",
    "category": "coding-agent",
    "released": "2023-11-21",
    "homepage": "https://www.augmentcode.com",
    "desc": "Context engine indexing large codebases for agent context",
    "descZh": "面向大型代码库构建上下文引擎，为编码 Agent 提供高保真上下文",
    "tags": [
      "codebase-context",
      "enterprise",
      "mcp"
    ],
    "glyph": "A"
  },
  {
    "id": "amazon-q-developer",
    "name": "Amazon Q Developer",
    "nameZh": "Amazon Q Developer",
    "vendor": "Amazon",
    "vendorZh": "Amazon",
    "region": "intl",
    "category": "coding-agent",
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
    "glyph": "A"
  },
  {
    "id": "pika",
    "name": "Pika",
    "nameZh": "Pika",
    "vendor": "Pika Labs",
    "vendorZh": "Pika Labs",
    "region": "intl",
    "category": "multimodal-creation",
    "released": "2023-11-29",
    "homepage": "https://pika.art",
    "desc": "Text-to-video tool with strong social-first distribution",
    "descZh": "以社交平台起家的文生视频工具，2023-11 随 Pika 1.0 正式上线",
    "tags": [
      "video-generation",
      "social",
      "creative"
    ],
    "glyph": "P"
  },
  {
    "id": "mlx",
    "name": "MLX",
    "nameZh": "MLX",
    "vendor": "Apple",
    "vendorZh": "Apple",
    "region": "intl",
    "category": "local-runner",
    "released": "2023-12-05",
    "homepage": "https://github.com/ml-explore/mlx",
    "desc": "Apple's array framework for efficient ML on Apple Silicon",
    "descZh": "苹果为 Apple Silicon 打造的机器学习数组框架，统一内存架构",
    "tags": [
      "apple-silicon",
      "open-source",
      "framework"
    ],
    "glyph": "M"
  },
  {
    "id": "mistral-la-plateforme",
    "name": "Mistral La Plateforme",
    "nameZh": "Mistral La Plateforme",
    "vendor": "Mistral AI",
    "vendorZh": "Mistral AI",
    "region": "intl",
    "category": "model-platform",
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
    "glyph": "M"
  },
  {
    "id": "google-ai-studio",
    "name": "Google AI Studio",
    "nameZh": "Google AI Studio",
    "vendor": "Google",
    "vendorZh": "Google",
    "region": "intl",
    "category": "developer-sdk",
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
    "released": "2023-12-20",
    "homepage": "https://suno.com",
    "desc": "Full song generation from text prompts, went viral fast",
    "descZh": "文本提示直接生成完整歌曲，2023-12 公开上线后迅速爆红",
    "tags": [
      "music-generation",
      "audio",
      "creative"
    ],
    "glyph": "S"
  },
  {
    "id": "rabbit-r1",
    "name": "Rabbit R1",
    "nameZh": "Rabbit R1",
    "vendor": "Rabbit Inc.",
    "vendorZh": "Rabbit Inc.",
    "region": "intl",
    "category": "chat-assistant",
    "released": "2024-01-09",
    "homepage": "https://www.rabbit.tech",
    "desc": "Pocket voice-first device with a large language action model",
    "descZh": "口袋级语音优先设备，宣称用大模型直接操作手机应用",
    "tags": [
      "hardware",
      "voice",
      "consumer"
    ],
    "glyph": "R"
  },
  {
    "id": "jan",
    "name": "Jan",
    "nameZh": "Jan",
    "vendor": "Jan",
    "vendorZh": "Jan",
    "region": "intl",
    "category": "local-runner",
    "released": "2024-01-20",
    "homepage": "https://jan.ai",
    "desc": "Open-source offline ChatGPT alternative with Cortex engine",
    "descZh": "开源离线 ChatGPT 替代方案，自带 Cortex 推理引擎",
    "tags": [
      "open-source",
      "offline",
      "local-llm"
    ],
    "glyph": "J"
  },
  {
    "id": "product-12",
    "name": "扣子",
    "nameZh": "扣子",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "region": "cn",
    "category": "agent-platform",
    "released": "2024-02-01",
    "homepage": "https://www.coze.cn",
    "desc": "低代码 AI 智能体搭建平台",
    "descZh": "低代码 AI 智能体搭建平台",
    "tags": [
      "agent-platform",
      "low-code",
      "bytedance"
    ],
    "glyph": "扣",
    "docs": {
      "en": "/products/coze/",
      "zh": "/zh/products/coze/"
    }
  },
  {
    "id": "gumloop",
    "name": "Gumloop",
    "nameZh": "Gumloop",
    "vendor": "Gumloop",
    "vendorZh": "Gumloop",
    "region": "intl",
    "category": "agent-platform",
    "released": "2024-02-07",
    "homepage": "https://www.gumloop.com",
    "desc": "No-code AI workflow automation for scraped business data",
    "descZh": "面向业务数据处理的无代码 AI 工作流自动化平台，前身 AgentHub",
    "tags": [
      "no-code",
      "automation",
      "workflow"
    ],
    "glyph": "G"
  },
  {
    "id": "gemini-app",
    "name": "Gemini app",
    "nameZh": "Gemini 应用",
    "vendor": "Google",
    "vendorZh": "Google",
    "region": "intl",
    "category": "chat-assistant",
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
    "glyph": "G",
    "docs": {
      "en": "/products/gemini/",
      "zh": "/zh/products/gemini/"
    }
  },
  {
    "id": "sora",
    "name": "Sora",
    "nameZh": "Sora",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "region": "intl",
    "category": "multimodal-creation",
    "released": "2024-02-15",
    "homepage": "https://sora.com/",
    "desc": "Text-to-video generation product producing photorealistic short clips",
    "descZh": "文本生成视频产品，可产出照片级短片",
    "tags": [
      "text-to-video",
      "generative-media",
      "creative"
    ],
    "glyph": "S"
  },
  {
    "id": "lindy",
    "name": "Lindy",
    "nameZh": "Lindy",
    "vendor": "Lindy",
    "vendorZh": "Lindy",
    "region": "intl",
    "category": "agent-platform",
    "released": "2024-02-16",
    "homepage": "https://www.lindy.ai",
    "desc": "Personal AI agents for email, meetings and support",
    "descZh": "面向邮件、会议与客户支持的个性化 AI 助理平台",
    "tags": [
      "personal-agent",
      "assistant",
      "automation"
    ],
    "glyph": "L"
  },
  {
    "id": "le-chat",
    "name": "Le Chat",
    "nameZh": "Le Chat",
    "vendor": "Mistral AI",
    "vendorZh": "Mistral AI",
    "region": "intl",
    "category": "chat-assistant",
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
    "glyph": "L"
  },
  {
    "id": "ai-2",
    "name": "秘塔AI搜索",
    "nameZh": "秘塔AI搜索",
    "vendor": "秘塔",
    "vendorZh": "秘塔",
    "region": "cn",
    "category": "search",
    "released": "2024-03-01",
    "homepage": "https://metaso.cn",
    "desc": "无广告直达结果的生成式 AI 搜索",
    "descZh": "无广告直达结果的生成式 AI 搜索",
    "tags": [
      "search",
      "ai-search",
      "metaso"
    ],
    "glyph": "秘"
  },
  {
    "id": "zapier-agents",
    "name": "Zapier Agents",
    "nameZh": "Zapier Agents",
    "vendor": "Zapier",
    "vendorZh": "Zapier",
    "region": "intl",
    "category": "agent-platform",
    "released": "2024-03-06",
    "homepage": "https://zapier.com/agents",
    "desc": "No-code agents across 8000+ app integrations",
    "descZh": "无代码 Agent 平台，连接 8000+ 应用；2024-03 以 Zapier Central 形态推出",
    "tags": [
      "no-code",
      "automation",
      "integrations"
    ],
    "glyph": "Z"
  },
  {
    "id": "devin",
    "name": "Devin",
    "nameZh": "Devin",
    "vendor": "Cognition",
    "vendorZh": "Cognition",
    "region": "intl",
    "category": "coding-agent",
    "released": "2024-03-12",
    "homepage": "https://devin.ai",
    "desc": "Autonomous cloud software engineer marketed to enterprises",
    "descZh": "面向企业的云端自主软件工程师，可自行规划并执行多步开发任务",
    "tags": [
      "autonomous-agent",
      "swe-bench",
      "enterprise"
    ],
    "glyph": "D"
  },
  {
    "id": "nvidia-nim",
    "name": "NVIDIA NIM",
    "nameZh": "NVIDIA NIM",
    "vendor": "NVIDIA",
    "vendorZh": "NVIDIA",
    "region": "intl",
    "category": "model-platform",
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
    "glyph": "N"
  },
  {
    "id": "product-13",
    "name": "阶跃星辰开放平台",
    "nameZh": "阶跃星辰开放平台",
    "vendor": "阶跃星辰",
    "vendorZh": "阶跃星辰",
    "region": "cn",
    "category": "enterprise-api",
    "released": "2024-03-19",
    "homepage": "https://platform.stepfun.com",
    "desc": "Step 系列大模型 API 服务平台",
    "descZh": "Step 系列大模型 API 服务平台",
    "tags": [
      "enterprise-api",
      "api",
      "stepfun"
    ],
    "glyph": "阶"
  },
  {
    "id": "udio",
    "name": "Udio",
    "nameZh": "Udio",
    "vendor": "Uncharted Labs",
    "vendorZh": "Uncharted Labs",
    "region": "intl",
    "category": "multimodal-creation",
    "released": "2024-04-10",
    "homepage": "https://www.udio.com",
    "desc": "Music generation startup from former DeepMind researchers",
    "descZh": "由前 DeepMind  researcher 创办的音乐生成平台，2024-04 公测",
    "tags": [
      "music-generation",
      "audio",
      "creative"
    ],
    "glyph": "U"
  },
  {
    "id": "humane-ai-pin",
    "name": "Humane AI Pin",
    "nameZh": "Humane AI Pin",
    "vendor": "Humane",
    "vendorZh": "Humane",
    "region": "intl",
    "category": "chat-assistant",
    "released": "2024-04-11",
    "homepage": "https://humane.com",
    "desc": "Screenless lapel pin assistant, discontinued in 2025",
    "descZh": "无屏胸针式 AI 助手，口碑不佳，2025-02 停售并被 HP 收购",
    "tags": [
      "hardware",
      "discontinued",
      "wearable"
    ],
    "glyph": "H"
  },
  {
    "id": "reka-ai",
    "name": "Reka AI",
    "nameZh": "Reka AI",
    "vendor": "Reka AI",
    "vendorZh": "Reka AI",
    "region": "intl",
    "category": "model-platform",
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
    "glyph": "R"
  },
  {
    "id": "amazon-q",
    "name": "Amazon Q",
    "nameZh": "Amazon Q",
    "vendor": "Amazon",
    "vendorZh": "Amazon",
    "region": "intl",
    "category": "chat-assistant",
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
    "glyph": "A"
  },
  {
    "id": "granola",
    "name": "Granola",
    "nameZh": "Granola",
    "vendor": "Granola",
    "vendorZh": "Granola",
    "region": "intl",
    "category": "agent-platform",
    "released": "2024-05-22",
    "homepage": "https://www.granola.ai",
    "desc": "Bot-free AI meeting notepad that merges your own notes",
    "descZh": "不加会议机器人的 AI 笔记，用你的手写笔记与转录合并成纪要",
    "tags": [
      "meetings",
      "notes",
      "no-bot"
    ],
    "glyph": "G"
  },
  {
    "id": "product-14",
    "name": "腾讯元器",
    "nameZh": "腾讯元器",
    "vendor": "腾讯",
    "vendorZh": "腾讯",
    "region": "cn",
    "category": "agent-platform",
    "released": "2024-05-30",
    "homepage": "https://yuanqi.tencent.com",
    "desc": "腾讯智能体创建与分发平台",
    "descZh": "腾讯智能体创建与分发平台",
    "tags": [
      "agent-platform",
      "low-code",
      "tencent"
    ],
    "glyph": "腾"
  },
  {
    "id": "product-15",
    "name": "腾讯元宝",
    "nameZh": "腾讯元宝",
    "vendor": "腾讯",
    "vendorZh": "腾讯",
    "region": "cn",
    "category": "chat-assistant",
    "released": "2024-05-30",
    "homepage": "https://yuanbao.tencent.com",
    "desc": "腾讯基于混元大模型的 AI 助手",
    "descZh": "腾讯基于混元大模型的 AI 助手",
    "tags": [
      "chat-assistant",
      "hunyuan",
      "tencent"
    ],
    "glyph": "腾",
    "docs": {
      "en": "/products/yuanbao/",
      "zh": "/zh/products/yuanbao/"
    }
  },
  {
    "id": "factory",
    "name": "Factory",
    "nameZh": "Factory",
    "vendor": "Factory AI",
    "vendorZh": "Factory AI",
    "region": "intl",
    "category": "coding-agent",
    "released": "2024-06-01",
    "homepage": "https://factory.ai",
    "desc": "Task-specific autonomous Droids for software engineering",
    "descZh": "面向软件工程的多款专职自主 Droids：Review、Test、Code 等",
    "tags": [
      "autonomous-agent",
      "enterprise",
      "swe-bench"
    ],
    "glyph": "F"
  },
  {
    "id": "arize-phoenix",
    "name": "Arize Phoenix",
    "nameZh": "Arize Phoenix",
    "vendor": "Arize AI",
    "vendorZh": "Arize AI",
    "region": "intl",
    "category": "eval-observability",
    "released": "2024-06-12",
    "homepage": "https://phoenix.arize.com",
    "desc": "Open-source tracing and eval library for LLM applications",
    "descZh": "开源的 LLM 应用追踪与评测库，可在本地 Notebook 中直接跑",
    "tags": [
      "open-source",
      "tracing",
      "evaluation"
    ],
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
    "released": "2024-06-12",
    "homepage": "https://lumalabs.ai/dream-machine",
    "desc": "Free text-to-video model that hit 1M users in days",
    "descZh": "免费开放的文生视频模型，上线四天用户破百万",
    "tags": [
      "video-generation",
      "text-to-video",
      "creative"
    ],
    "glyph": "L"
  },
  {
    "id": "product-16",
    "name": "跃问",
    "nameZh": "跃问",
    "vendor": "阶跃星辰",
    "vendorZh": "阶跃星辰",
    "region": "cn",
    "category": "chat-assistant",
    "released": "2024-06-13",
    "homepage": "https://www.stepfun.com/yuewen",
    "desc": "阶跃星辰多模态 AI 问答助手",
    "descZh": "阶跃星辰多模态 AI 问答助手",
    "tags": [
      "chat-assistant",
      "multimodal",
      "stepfun"
    ],
    "glyph": "跃"
  },
  {
    "id": "cline",
    "name": "Cline",
    "nameZh": "Cline",
    "vendor": "Cline",
    "vendorZh": "Cline",
    "region": "intl",
    "category": "coding-agent",
    "released": "2024-07-01",
    "homepage": "https://cline.bot",
    "desc": "Open-source VS Code agent, first released as Claude Dev",
    "descZh": "开源 VS Code 编码 Agent，2024-07 以 Claude Dev 之名发布，2024-10-09 更名 Cline",
    "tags": [
      "open-source",
      "vscode",
      "openrouter"
    ],
    "glyph": "C"
  },
  {
    "id": "phariaai",
    "name": "PhariaAI",
    "nameZh": "PhariaAI",
    "vendor": "Aleph Alpha",
    "vendorZh": "Aleph Alpha",
    "region": "intl",
    "category": "enterprise-api",
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
    "glyph": "P"
  },
  {
    "id": "tavily",
    "name": "Tavily",
    "nameZh": "Tavily",
    "vendor": "Tavily",
    "vendorZh": "Tavily",
    "region": "intl",
    "category": "search",
    "released": "2024-08-30",
    "homepage": "https://tavily.com",
    "desc": "Search API optimised for agent research and extraction",
    "descZh": "为 Agent 研究与信息抽取优化的搜索 API，源自 GPT Researcher",
    "tags": [
      "search-api",
      "agents",
      "research"
    ],
    "glyph": "T"
  },
  {
    "id": "minimax",
    "name": "MiniMax 开放平台",
    "nameZh": "MiniMax 开放平台",
    "vendor": "MiniMax",
    "vendorZh": "MiniMax",
    "region": "cn",
    "category": "enterprise-api",
    "released": "2024-09-01",
    "homepage": "https://platform.minimaxi.com",
    "desc": "MiniMax 模型 API 开放服务平台",
    "descZh": "MiniMax 模型 API 开放服务平台",
    "tags": [
      "enterprise-api",
      "api",
      "minimax"
    ],
    "glyph": "M"
  },
  {
    "id": "ai-3",
    "name": "海螺AI",
    "nameZh": "海螺AI",
    "vendor": "MiniMax",
    "vendorZh": "MiniMax",
    "region": "cn",
    "category": "multimodal-creation",
    "released": "2024-09-01",
    "homepage": "https://hailuoai.com",
    "desc": "海螺音视频与图像 AI 创作平台",
    "descZh": "海螺音视频与图像 AI 创作平台",
    "tags": [
      "multimodal",
      "video-generation",
      "minimax"
    ],
    "glyph": "海"
  },
  {
    "id": "product-17",
    "name": "文小言",
    "nameZh": "文小言",
    "vendor": "百度",
    "vendorZh": "百度",
    "region": "cn",
    "category": "chat-assistant",
    "released": "2024-09-03",
    "homepage": "https://yiyan.baidu.com",
    "desc": "文心一言 App 更名后的新版助手",
    "descZh": "文心一言 App 更名后的新版助手",
    "tags": [
      "chat-assistant",
      "wenxin",
      "baidu"
    ],
    "glyph": "文"
  },
  {
    "id": "kagi-assistant",
    "name": "Kagi Assistant",
    "nameZh": "Kagi Assistant",
    "vendor": "Kagi",
    "vendorZh": "Kagi",
    "region": "intl",
    "category": "search",
    "released": "2024-09-04",
    "homepage": "https://kagi.com",
    "desc": "Paid-search-grounded assistant on top of Kagi Search",
    "descZh": "基于 Kagi 自有搜索索引的问答助手，2025-04 开放给全部用户",
    "tags": [
      "answer-engine",
      "privacy",
      "citations"
    ],
    "glyph": "K"
  },
  {
    "id": "replit-agent",
    "name": "Replit Agent",
    "nameZh": "Replit Agent",
    "vendor": "Replit",
    "vendorZh": "Replit",
    "region": "intl",
    "category": "coding-agent",
    "released": "2024-09-05",
    "homepage": "https://replit.com/agent",
    "desc": "Prompt-to-deployed-app agent inside the Replit IDE",
    "descZh": "在 Replit IDE 内从一句话直接生成并部署可运行应用",
    "tags": [
      "app-generation",
      "cloud-ide",
      "no-code"
    ],
    "glyph": "R"
  },
  {
    "id": "bolt-new",
    "name": "Bolt.new",
    "nameZh": "Bolt.new",
    "vendor": "StackBlitz",
    "vendorZh": "StackBlitz",
    "region": "intl",
    "category": "coding-agent",
    "released": "2024-10-03",
    "homepage": "https://bolt.new",
    "desc": "Browser IDE running full Node apps with AI edits",
    "descZh": "浏览器内运行的 WebContainers IDE，AI 可直接修改并运行 Node 应用",
    "tags": [
      "webcontainer",
      "browser-ide",
      "fullstack"
    ],
    "glyph": "B"
  },
  {
    "id": "atlassian-rovo",
    "name": "Atlassian Rovo",
    "nameZh": "Atlassian Rovo",
    "vendor": "Atlassian",
    "vendorZh": "Atlassian",
    "region": "intl",
    "category": "agent-platform",
    "released": "2024-10-09",
    "homepage": "https://www.atlassian.com/software/rovo",
    "desc": "Search, chat and agents over the Atlassian Teamwork Graph",
    "descZh": "基于 Teamwork Graph 的搜索、对话与预置 Agent，2024-10-09 正式 GA",
    "tags": [
      "enterprise",
      "agents",
      "knowledge-graph"
    ],
    "glyph": "A"
  },
  {
    "id": "claude-desktop",
    "name": "Claude Desktop",
    "nameZh": "Claude Desktop",
    "vendor": "Anthropic",
    "vendorZh": "Anthropic",
    "region": "intl",
    "category": "chat-assistant",
    "released": "2024-10-31",
    "homepage": "https://claude.ai/download",
    "desc": "Native macOS and Windows desktop client, flagship for MCP",
    "descZh": "macOS 与 Windows 原生桌面客户端，MCP 的主要承载端",
    "tags": [
      "desktop-app",
      "mcp",
      "consumer"
    ],
    "glyph": "C",
    "docs": {
      "en": "/products/claude/",
      "zh": "/zh/products/claude/"
    }
  },
  {
    "id": "roo-code",
    "name": "Roo Code",
    "nameZh": "Roo Code",
    "vendor": "Roo Code",
    "vendorZh": "Roo Code",
    "region": "intl",
    "category": "coding-agent",
    "released": "2024-10-31",
    "homepage": "https://roocode.com",
    "desc": "Open-source Cline fork with mode-based agent orchestration",
    "descZh": "Cline 的开源分支，主打多模式（架构师/编码/调试）任务编排",
    "tags": [
      "open-source",
      "vscode",
      "fork"
    ],
    "glyph": "R"
  },
  {
    "id": "xai-api",
    "name": "xAI API",
    "nameZh": "xAI API",
    "vendor": "xAI",
    "vendorZh": "xAI",
    "region": "intl",
    "category": "enterprise-api",
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
    "glyph": "X"
  },
  {
    "id": "azure-ai-foundry",
    "name": "Azure AI Foundry",
    "nameZh": "Azure AI Foundry",
    "vendor": "Microsoft",
    "vendorZh": "Microsoft",
    "region": "intl",
    "category": "agent-platform",
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
    "glyph": "A"
  },
  {
    "id": "lovable",
    "name": "Lovable",
    "nameZh": "Lovable",
    "vendor": "Lovable",
    "vendorZh": "Lovable",
    "region": "intl",
    "category": "coding-agent",
    "released": "2024-11-21",
    "homepage": "https://lovable.dev",
    "desc": "Chat-driven builder for full-stack React web apps",
    "descZh": "对话式全栈 React 应用生成器，上线半年成为最快增长的 AI 应用",
    "tags": [
      "app-generation",
      "fullstack",
      "no-code"
    ],
    "glyph": "L"
  },
  {
    "id": "ai-4",
    "name": "纳米AI搜索",
    "nameZh": "纳米AI搜索",
    "vendor": "360",
    "vendorZh": "360",
    "region": "cn",
    "category": "search",
    "released": "2024-11-27",
    "homepage": "https://www.n.cn",
    "desc": "360 面向普通用户的 AI 搜索",
    "descZh": "360 面向普通用户的 AI 搜索",
    "tags": [
      "search",
      "ai-search",
      "360"
    ],
    "glyph": "纳"
  },
  {
    "id": "tana",
    "name": "Tana",
    "nameZh": "Tana",
    "vendor": "Tana Inc.",
    "vendorZh": "Tana Inc.",
    "region": "intl",
    "category": "chat-assistant",
    "released": "2024-12-01",
    "homepage": "https://tana.inc",
    "desc": "Supertag outliner with an agentic AI workspace layer",
    "descZh": "以 supertag 为核心的大纲工具，叠加 Agent 式 AI 工作区",
    "tags": [
      "notes",
      "outliner",
      "personal-ai"
    ],
    "glyph": "T"
  },
  {
    "id": "jules",
    "name": "Jules",
    "nameZh": "Jules",
    "vendor": "Google",
    "vendorZh": "Google",
    "region": "intl",
    "category": "coding-agent",
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
    "glyph": "J",
    "docs": {
      "en": "/products/gemini/",
      "zh": "/zh/products/gemini/"
    }
  },
  {
    "id": "deepseek",
    "name": "DeepSeek 开放平台",
    "nameZh": "DeepSeek 开放平台",
    "vendor": "DeepSeek",
    "vendorZh": "DeepSeek",
    "region": "cn",
    "category": "enterprise-api",
    "released": "2024-12-26",
    "homepage": "https://platform.deepseek.com",
    "desc": "DeepSeek 模型 API 开放平台",
    "descZh": "DeepSeek 模型 API 开放平台",
    "tags": [
      "enterprise-api",
      "api",
      "deepseek"
    ],
    "glyph": "D"
  },
  {
    "id": "deepseek-2",
    "name": "DeepSeek",
    "nameZh": "DeepSeek",
    "vendor": "DeepSeek",
    "vendorZh": "DeepSeek",
    "region": "cn",
    "category": "chat-assistant",
    "released": "2025-01-15",
    "homepage": "https://www.deepseek.com",
    "desc": "DeepSeek 官方 AI 对话助手",
    "descZh": "DeepSeek 官方 AI 对话助手",
    "tags": [
      "chat-assistant",
      "reasoning",
      "deepseek"
    ],
    "glyph": "D"
  },
  {
    "id": "claude-code",
    "name": "Claude Code",
    "nameZh": "Claude Code",
    "vendor": "Anthropic",
    "vendorZh": "Anthropic",
    "region": "intl",
    "category": "coding-agent",
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
    "glyph": "C",
    "docs": {
      "en": "/products/claude/",
      "zh": "/zh/products/claude/"
    }
  },
  {
    "id": "higgsfield",
    "name": "Higgsfield",
    "nameZh": "Higgsfield",
    "vendor": "Higgsfield",
    "vendorZh": "Higgsfield",
    "region": "intl",
    "category": "multimodal-creation",
    "released": "2025-03-01",
    "homepage": "https://higgsfield.ai",
    "desc": "Cinematic AI video with camera-move control presets",
    "descZh": "主打电影级镜头语言与运镜预设的 AI 视频平台",
    "tags": [
      "video-generation",
      "cinematography",
      "social"
    ],
    "glyph": "H"
  },
  {
    "id": "trae",
    "name": "Trae",
    "nameZh": "Trae",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "region": "cn",
    "category": "coding-agent",
    "released": "2025-03-03",
    "homepage": "https://www.trae.cn",
    "desc": "国产首个 AI 原生集成开发环境",
    "descZh": "国产首个 AI 原生集成开发环境",
    "tags": [
      "coding-agent",
      "ai-ide",
      "bytedance"
    ],
    "glyph": "T",
    "docs": {
      "en": "/products/trae/",
      "zh": "/zh/products/trae/"
    }
  },
  {
    "id": "manus",
    "name": "Manus",
    "nameZh": "Manus",
    "vendor": "Butterfly Effect",
    "vendorZh": "Butterfly Effect",
    "region": "intl",
    "category": "agent-platform",
    "released": "2025-03-06",
    "homepage": "https://manus.im",
    "desc": "General-purpose cloud agent that executes tasks end to end",
    "descZh": "云端通用智能体，可自主完成检索、生成与执行的完整任务链",
    "tags": [
      "general-agent",
      "autonomous-agent",
      "cloud"
    ],
    "glyph": "M"
  },
  {
    "id": "codex-cli",
    "name": "Codex CLI",
    "nameZh": "Codex CLI",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "region": "intl",
    "category": "coding-agent",
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
    "glyph": "C",
    "docs": {
      "en": "/products/codex/",
      "zh": "/zh/products/codex/"
    }
  },
  {
    "id": "product-18",
    "name": "扣子空间",
    "nameZh": "扣子空间",
    "vendor": "字节跳动",
    "vendorZh": "字节跳动",
    "region": "cn",
    "category": "agent-platform",
    "released": "2025-04-18",
    "homepage": "https://www.coze.cn/space",
    "desc": "字节通用 Agent 协作平台",
    "descZh": "字节通用 Agent 协作平台",
    "tags": [
      "agent-platform",
      "general-agent",
      "bytedance"
    ],
    "glyph": "扣",
    "docs": {
      "en": "/products/coze/",
      "zh": "/zh/products/coze/"
    }
  },
  {
    "id": "llama-api",
    "name": "Llama API",
    "nameZh": "Llama API",
    "vendor": "Meta",
    "vendorZh": "Meta",
    "region": "intl",
    "category": "enterprise-api",
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
    "glyph": "M"
  },
  {
    "id": "openai-codex",
    "name": "OpenAI Codex",
    "nameZh": "OpenAI Codex",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "region": "intl",
    "category": "coding-agent",
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
    "glyph": "O",
    "docs": {
      "en": "/products/codex/",
      "zh": "/zh/products/codex/"
    }
  },
  {
    "id": "amp",
    "name": "Amp",
    "nameZh": "Amp",
    "vendor": "Amp Frontier",
    "vendorZh": "Amp Frontier",
    "region": "intl",
    "category": "coding-agent",
    "released": "2025-05-18",
    "homepage": "https://ampcode.com",
    "desc": "Sourcegraph spin-out coding agent for CLI and editor",
    "descZh": "源自 Sourcegraph 的编码 Agent，2025-12 独立成公司 Amp Frontier",
    "tags": [
      "cli-agent",
      "spinout",
      "code-editor"
    ],
    "glyph": "A"
  },
  {
    "id": "product-19",
    "name": "天工超级智能体",
    "nameZh": "天工超级智能体",
    "vendor": "昆仑万维",
    "vendorZh": "昆仑万维",
    "region": "cn",
    "category": "agent-platform",
    "released": "2025-05-22",
    "homepage": "https://www.tiangong.cn/chat",
    "desc": "面向办公场景的专家智能体平台",
    "descZh": "面向办公场景的专家智能体平台",
    "tags": [
      "agent-platform",
      "office-agent",
      "kunlun"
    ],
    "glyph": "天"
  },
  {
    "name": "通义灵码 AI IDE",
    "nameZh": "通义灵码 AI IDE",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "region": "cn",
    "category": "coding-agent",
    "released": "2025-05-30",
    "homepage": "https://lingma.aliyun.com",
    "desc": "Alibaba AI-native IDE with a built-in coding agent",
    "descZh": "阿里首款 AI 原生开发环境，内置编程智能体",
    "tags": [
      "ai-ide",
      "agentic-coding",
      "qwen"
    ],
    "docs": {
      "en": "/products/lingma/",
      "zh": "/zh/products/lingma/"
    },
    "id": "lingma-ai-ide",
    "glyph": "通"
  },
  {
    "id": "pi-agent",
    "name": "Pi Agent",
    "nameZh": "Pi Agent",
    "vendor": "Pi",
    "vendorZh": "Pi",
    "region": "intl",
    "category": "coding-agent",
    "released": "2025-06-01",
    "homepage": "https://github.com/badlogic/pi-mono",
    "desc": "Minimal terminal coding-agent harness.",
    "descZh": "极简的终端 coding agent harness。",
    "tags": [
      "harness",
      "terminal",
      "minimal"
    ],
    "glyph": "P",
    "docs": {
      "en": "/products/pi-agent/",
      "zh": "/zh/products/pi-agent/"
    }
  },
  {
    "id": "minimax-agent",
    "name": "MiniMax Agent",
    "nameZh": "MiniMax Agent",
    "vendor": "MiniMax",
    "vendorZh": "MiniMax",
    "region": "cn",
    "category": "agent-platform",
    "released": "2025-06-19",
    "homepage": "https://agent.minimaxi.com",
    "desc": "MiniMax 通用智能体构建平台",
    "descZh": "MiniMax 通用智能体构建平台",
    "tags": [
      "agent-platform",
      "general-agent",
      "minimax"
    ],
    "glyph": "M",
    "docs": {
      "en": "/products/minimax-agent/",
      "zh": "/zh/products/minimax-agent/"
    }
  },
  {
    "id": "gemini-cli",
    "name": "Gemini CLI",
    "nameZh": "Gemini CLI",
    "vendor": "Google",
    "vendorZh": "Google",
    "region": "intl",
    "category": "coding-agent",
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
    "glyph": "G",
    "docs": {
      "en": "/products/gemini/",
      "zh": "/zh/products/gemini/"
    }
  },
  {
    "id": "kimi-code",
    "name": "Kimi Code",
    "nameZh": "Kimi Code",
    "vendor": "月之暗面",
    "vendorZh": "月之暗面",
    "region": "cn",
    "category": "coding-agent",
    "released": "2025-07-11",
    "homepage": "https://www.kimi.com/code",
    "desc": "Kimi 编程智能体与命令行工具",
    "descZh": "Kimi 编程智能体与命令行工具",
    "tags": [
      "coding-agent",
      "cli",
      "moonshot"
    ],
    "glyph": "K",
    "docs": {
      "en": "/products/kimi-code/",
      "zh": "/zh/products/kimi-code/"
    }
  },
  {
    "id": "kiro",
    "name": "Kiro",
    "nameZh": "Kiro",
    "vendor": "AWS",
    "vendorZh": "AWS",
    "region": "intl",
    "category": "coding-agent",
    "released": "2025-07-14",
    "homepage": "https://kiro.dev",
    "desc": "AWS spec-driven agentic IDE built on Code OSS",
    "descZh": "AWS 出品的规格驱动（spec-driven）Agentic IDE，基于 Code OSS",
    "tags": [
      "spec-driven",
      "aws",
      "agentic-ide"
    ],
    "glyph": "K"
  },
  {
    "name": "ChatGPT agent",
    "nameZh": "ChatGPT 智能体",
    "vendor": "OpenAI",
    "vendorZh": "OpenAI",
    "region": "intl",
    "category": "agent-platform",
    "released": "2025-07-17",
    "homepage": "https://chatgpt.com",
    "desc": "Autonomous agent combining browser, terminal and connectors",
    "descZh": "融合浏览器、终端与连接器的自主智能体",
    "tags": [
      "agent",
      "computer-use",
      "connectors"
    ],
    "id": "chatgpt-agent",
    "glyph": "C"
  },
  {
    "id": "codebuddy",
    "name": "CodeBuddy",
    "nameZh": "CodeBuddy",
    "vendor": "腾讯云",
    "vendorZh": "腾讯云",
    "region": "cn",
    "category": "coding-agent",
    "released": "2025-07-22",
    "homepage": "https://copilot.tencent.com",
    "desc": "Tencent Cloud AI coding suite across IDE and CLI.",
    "descZh": "腾讯云的 AI 编程助手套件，覆盖 IDE 与 CLI。",
    "tags": [
      "ide",
      "cli",
      "china"
    ],
    "glyph": "C",
    "docs": {
      "en": "/products/codebuddy/",
      "zh": "/zh/products/codebuddy/"
    }
  },
  {
    "id": "glm-coding-plan",
    "name": "GLM Coding Plan",
    "nameZh": "GLM Coding Plan",
    "vendor": "智谱",
    "vendorZh": "智谱",
    "region": "cn",
    "category": "coding-agent",
    "released": "2025-07-28",
    "homepage": "https://bigmodel.cn/glm-coding-plan",
    "desc": "面向开发者的 GLM 编码订阅套餐",
    "descZh": "面向开发者的 GLM 编码订阅套餐",
    "tags": [
      "coding-agent",
      "subscription",
      "zhipu"
    ],
    "glyph": "G",
    "docs": {
      "en": "/products/glm-coding/",
      "zh": "/zh/products/glm-coding/"
    }
  },
  {
    "id": "qoder",
    "name": "Qoder",
    "nameZh": "Qoder",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "region": "cn",
    "category": "coding-agent",
    "released": "2025-08-22",
    "homepage": "https://qoder.com",
    "desc": "通义灵码更名的智能编码 IDE",
    "descZh": "通义灵码更名的智能编码 IDE",
    "tags": [
      "coding-agent",
      "ai-ide",
      "alibaba"
    ],
    "glyph": "Q",
    "docs": {
      "en": "/products/lingma/",
      "zh": "/zh/products/lingma/"
    }
  },
  {
    "id": "mem",
    "name": "Mem",
    "nameZh": "Mem",
    "vendor": "Mem Labs",
    "vendorZh": "Mem Labs",
    "region": "intl",
    "category": "chat-assistant",
    "released": "2025-10-01",
    "homepage": "https://get.mem.ai",
    "desc": "Self-organising AI notes and thought partner",
    "descZh": "自动组织笔记的 AI 记录工具，2025-10 推出重写后的 2.0 正式版",
    "tags": [
      "notes",
      "personal-ai",
      "knowledge-base"
    ],
    "glyph": "M"
  },
  {
    "id": "minimax-code",
    "name": "MiniMax Code",
    "nameZh": "MiniMax Code",
    "vendor": "MiniMax",
    "vendorZh": "MiniMax",
    "region": "cn",
    "category": "coding-agent",
    "released": "2025-10-27",
    "homepage": "https://code.minimax.io",
    "desc": "MiniMax 编码命令行与桌面工具",
    "descZh": "MiniMax 编码命令行与桌面工具",
    "tags": [
      "coding-agent",
      "cli",
      "minimax"
    ],
    "glyph": "M",
    "docs": {
      "en": "/products/minimax-code/",
      "zh": "/zh/products/minimax-code/"
    }
  },
  {
    "id": "product-20",
    "name": "千问",
    "nameZh": "千问",
    "vendor": "阿里巴巴",
    "vendorZh": "阿里巴巴",
    "region": "cn",
    "category": "chat-assistant",
    "released": "2025-11-17",
    "homepage": "https://qianwen.com",
    "desc": "阿里新一代 AI 助手应用",
    "descZh": "阿里新一代 AI 助手应用",
    "tags": [
      "chat-assistant",
      "qwen",
      "alibaba"
    ],
    "glyph": "千",
    "docs": {
      "en": "/products/qwen/",
      "zh": "/zh/products/qwen/"
    }
  },
  {
    "id": "google-antigravity",
    "name": "Google Antigravity",
    "nameZh": "Google Antigravity",
    "vendor": "Google",
    "vendorZh": "Google",
    "region": "intl",
    "category": "coding-agent",
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
    "glyph": "G",
    "docs": {
      "en": "/products/gemini/",
      "zh": "/zh/products/gemini/"
    }
  },
  {
    "id": "claude-cowork",
    "name": "Claude Cowork",
    "nameZh": "Claude Cowork",
    "vendor": "Anthropic",
    "vendorZh": "Anthropic",
    "region": "intl",
    "category": "agent-platform",
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
    "glyph": "C",
    "docs": {
      "en": "/products/claude/",
      "zh": "/zh/products/claude/"
    }
  },
  {
    "id": "openclaw",
    "name": "OpenClaw",
    "nameZh": "OpenClaw",
    "vendor": "OpenClaw",
    "vendorZh": "OpenClaw",
    "region": "intl",
    "category": "agent-platform",
    "released": "2026-01-15",
    "homepage": "https://openclaw.ai/",
    "desc": "Self-hosted multi-channel agent gateway you run yourself.",
    "descZh": "自托管的多通道 Agent 网关，运行时完全由你掌控。",
    "tags": [
      "self-hosted",
      "gateway",
      "messaging"
    ],
    "glyph": "O",
    "docs": {
      "en": "/products/openclaw/",
      "zh": "/zh/products/openclaw/"
    }
  },
  {
    "id": "kimi-claw",
    "name": "Kimi Claw",
    "nameZh": "Kimi Claw",
    "vendor": "月之暗面",
    "vendorZh": "月之暗面",
    "region": "cn",
    "category": "agent-platform",
    "released": "2026-02-15",
    "homepage": "https://www.kimi.com/claw",
    "desc": "浏览器内一键部署的云端 Agent",
    "descZh": "浏览器内一键部署的云端 Agent",
    "tags": [
      "agent-platform",
      "cloud-agent",
      "moonshot"
    ],
    "glyph": "K"
  },
  {
    "id": "product-21",
    "name": "万智",
    "nameZh": "万智",
    "vendor": "零一万物",
    "vendorZh": "零一万物",
    "region": "cn",
    "category": "agent-platform",
    "released": "2026-05-21",
    "homepage": "https://www.lingyiwanwu.com",
    "desc": "零一万物企业级多智能体平台",
    "descZh": "零一万物企业级多智能体平台",
    "tags": [
      "agent-platform",
      "multi-agent",
      "01-ai"
    ],
    "glyph": "万"
  }
]
}

export default productHub

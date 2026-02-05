/**
 * AI 工具导航数据配置
 * 采用嵌套结构: 类目 -> 工具列表
 */

export interface Tool {
  name: string; // 工具名称
  desc: string; // 简短描述
  url: string; // 官网链接
  icon?: string; // 图标 (emoji 或图片路径)
  tags?: string[]; // 搜索标签 (可选)
}

export interface ToolCategory {
  name: string; // 类目名称
  icon: string; // 类目图标
  tools: Tool[]; // 该类目下的工具
}

export const toolsData: ToolCategory[] = [
  {
    name: "AI 编程",
    icon: "💻",
    tools: [
      {
        name: "Cursor",
        desc: "AI-first 代码编辑器，内置 AI 助手",
        url: "https://cursor.sh",
        icon: "⚡",
        tags: ["ide", "vscode", "editor"],
      },
      {
        name: "GitHub Copilot",
        desc: "AI 编程助手，代码自动补全",
        url: "https://github.com/features/copilot",
        icon: "🤖",
        tags: ["autocomplete", "github"],
      },
      {
        name: "Claude CLI",
        desc: "命令行 AI 编程助手",
        url: "https://docs.anthropic.com/en/docs/build-with-claude/claude-cli",
        icon: "🔧",
        tags: ["cli", "terminal"],
      },
      {
        name: "Gemini CLI",
        desc: "Google AI 命令行工具",
        url: "https://github.com/google-gemini/gemini-cli",
        icon: "✨",
        tags: ["cli", "google"],
      },
      {
        name: "Windsurf",
        desc: "AI 代码编辑器，专注开发体验",
        url: "https://codeium.com/windsurf",
        icon: "🏄",
        tags: ["ide", "codeium"],
      },
      {
        name: "Bolt.new",
        desc: "浏览器内 AI 全栈开发",
        url: "https://bolt.new",
        icon: "⚡",
        tags: ["web", "fullstack"],
      },
      {
        name: "v0.dev",
        desc: "AI 生成 React 组件",
        url: "https://v0.dev",
        icon: "🎨",
        tags: ["react", "ui", "vercel"],
      },
    ],
  },
  {
    name: "AI 对话",
    icon: "💬",
    tools: [
      {
        name: "ChatGPT",
        desc: "OpenAI 通用 AI 对话助手",
        url: "https://chat.openai.com",
        icon: "🟢",
        tags: ["openai", "gpt"],
      },
      {
        name: "Claude",
        desc: "Anthropic AI，擅长长文本理解",
        url: "https://claude.ai",
        icon: "🟣",
        tags: ["anthropic", "claude"],
      },
      {
        name: "Gemini",
        desc: "Google AI 多模态对话",
        url: "https://gemini.google.com",
        icon: "🔵",
        tags: ["google", "multimodal"],
      },
      {
        name: "Perplexity",
        desc: "AI 搜索引擎，实时联网",
        url: "https://perplexity.ai",
        icon: "🔍",
        tags: ["search", "research"],
      },
      {
        name: "Poe",
        desc: "多模型聚合平台",
        url: "https://poe.com",
        icon: "📚",
        tags: ["aggregator", "multi-model"],
      },
      {
        name: "DeepSeek",
        desc: "国产 AI 大模型",
        url: "https://chat.deepseek.com",
        icon: "🌊",
        tags: ["chinese", "deepseek"],
      },
    ],
  },
  {
    name: "AI 图像",
    icon: "🎨",
    tools: [
      {
        name: "FLow",
        desc: "Google AI 图像生成",
        url: "https://labs.google/flow/about",
        icon: "🎨",
        tags: ["ai", "image", "google"],
      },
      {
        name: "Midjourney",
        desc: "AI 艺术图像生成",
        url: "https://midjourney.com",
        icon: "🖼️",
        tags: ["art", "image"],
      },
      {
        name: "DALL-E 3",
        desc: "OpenAI 图像生成",
        url: "https://openai.com/dall-e-3",
        icon: "🎭",
        tags: ["openai", "image"],
      },
      {
        name: "Stable Diffusion",
        desc: "开源图像生成模型",
        url: "https://stability.ai",
        icon: "🌀",
        tags: ["opensource", "image"],
      },
      {
        name: "Leonardo.ai",
        desc: "AI 创意图像平台",
        url: "https://leonardo.ai",
        icon: "🎪",
        tags: ["creative", "image"],
      },
      {
        name: "Runway",
        desc: "AI 视觉创作工作室",
        url: "https://runwayml.com",
        icon: "🎬",
        tags: ["video", "creative"],
      },
      {
        name: "Remove.bg",
        desc: "AI 自动抠图",
        url: "https://remove.bg",
        icon: "✂️",
        tags: ["background", "remove"],
      },
    ],
  },
  {
    name: "AI 视频",
    icon: "🎬",
    tools: [
      {
        name: "Sora",
        desc: "OpenAI 文生视频",
        url: "https://openai.com/sora",
        icon: "🎥",
        tags: ["openai", "text-to-video"],
      },
      {
        name: "Runway Gen-2",
        desc: "AI 视频生成与编辑",
        url: "https://runwayml.com",
        icon: "🎞️",
        tags: ["video", "editing"],
      },
      {
        name: "Pika",
        desc: "AI 视频创作平台",
        url: "https://pika.art",
        icon: "⚡",
        tags: ["video", "creative"],
      },
      {
        name: "HeyGen",
        desc: "AI 数字人视频",
        url: "https://heygen.com",
        icon: "👤",
        tags: ["avatar", "digital-human"],
      },
      {
        name: "D-ID",
        desc: "AI 虚拟人生成",
        url: "https://d-id.com",
        icon: "🎭",
        tags: ["avatar", "talking-head"],
      },
      {
        name: "Descript",
        desc: "AI 视频编辑",
        url: "https://descript.com",
        icon: "✏️",
        tags: ["editing", "transcription"],
      },
    ],
  },
  {
    name: "AI 音频",
    icon: "🎵",
    tools: [
      {
        name: "ElevenLabs",
        desc: "AI 语音合成",
        url: "https://elevenlabs.io",
        icon: "🔊",
        tags: ["tts", "voice"],
      },
      {
        name: "Suno",
        desc: "AI 音乐生成",
        url: "https://suno.ai",
        icon: "🎶",
        tags: ["music", "generation"],
      },
      {
        name: "Udio",
        desc: "AI 音乐创作",
        url: "https://udio.com",
        icon: "🎹",
        tags: ["music", "creative"],
      },
      {
        name: "Whisper",
        desc: "OpenAI 语音识别",
        url: "https://openai.com/whisper",
        icon: "👂",
        tags: ["stt", "transcription"],
      },
      {
        name: "Adobe Podcast",
        desc: "AI 播客音频增强",
        url: "https://podcast.adobe.com",
        icon: "🎙️",
        tags: ["podcast", "enhance"],
      },
      {
        name: "Murf AI",
        desc: "AI 配音生成",
        url: "https://murf.ai",
        icon: "🗣️",
        tags: ["voiceover", "tts"],
      },
    ],
  },
  {
    name: "AI 写作",
    icon: "✍️",
    tools: [
      {
        name: "Notion AI",
        desc: "文档智能助手",
        url: "https://notion.so",
        icon: "📝",
        tags: ["docs", "writing"],
      },
      {
        name: "Jasper",
        desc: "AI 营销文案创作",
        url: "https://jasper.ai",
        icon: "✨",
        tags: ["marketing", "copywriting"],
      },
      {
        name: "Copy.ai",
        desc: "AI 文案生成",
        url: "https://copy.ai",
        icon: "📋",
        tags: ["copywriting", "marketing"],
      },
      {
        name: "Grammarly",
        desc: "AI 语法检查与润色",
        url: "https://grammarly.com",
        icon: "✅",
        tags: ["grammar", "proofreading"],
      },
      {
        name: "QuillBot",
        desc: "AI 改写与翻译",
        url: "https://quillbot.com",
        icon: "🪶",
        tags: ["paraphrase", "translate"],
      },
      {
        name: "Writesonic",
        desc: "AI 内容创作平台",
        url: "https://writesonic.com",
        icon: "🚀",
        tags: ["content", "seo"],
      },
    ],
  },
  {
    name: "效率工具",
    icon: "⚡",
    tools: [
      {
        name: "NotebookLM",
        desc: "Google AI 知识管理",
        url: "https://notebooklm.google.com",
        icon: "🧠",
        tags: ["notes", "knowledge"],
      },
      {
        name: "Raycast AI",
        desc: "macOS AI 启动器",
        url: "https://raycast.com",
        icon: "🔦",
        tags: ["macos", "launcher"],
      },
      {
        name: "Arc Browser",
        desc: "内置 AI 的现代浏览器",
        url: "https://arc.net",
        icon: "🌐",
        tags: ["browser", "productivity"],
      },
      {
        name: "Mem",
        desc: "AI 知识管理",
        url: "https://mem.ai",
        icon: "🧠",
        tags: ["notes", "knowledge"],
      },
      {
        name: "Otter.ai",
        desc: "AI 会议记录",
        url: "https://otter.ai",
        icon: "🦦",
        tags: ["meeting", "transcription"],
      },
      {
        name: "Fireflies.ai",
        desc: "AI 会议助手",
        url: "https://fireflies.ai",
        icon: "🔥",
        tags: ["meeting", "notes"],
      },
      {
        name: "Gamma",
        desc: "AI 演示文稿生成",
        url: "https://gamma.app",
        icon: "📊",
        tags: ["presentation", "slides"],
      },
    ],
  },
  {
    name: "开发者工具",
    icon: "🔧",
    tools: [
      {
        name: "Ollama",
        desc: "本地运行大模型",
        url: "https://ollama.ai",
        icon: "🦙",
        tags: ["local", "llm"],
      },
      {
        name: "LM Studio",
        desc: "本地 LLM 可视化工具",
        url: "https://lmstudio.ai",
        icon: "🖥️",
        tags: ["local", "gui"],
      },
      {
        name: "Hugging Face",
        desc: "AI 模型与数据集平台",
        url: "https://huggingface.co",
        icon: "🤗",
        tags: ["models", "datasets"],
      },
      {
        name: "LangChain",
        desc: "LLM 应用开发框架",
        url: "https://langchain.com",
        icon: "🔗",
        tags: ["framework", "rag"],
      },
      {
        name: "Vercel AI SDK",
        desc: "AI 应用开发工具包",
        url: "https://sdk.vercel.ai",
        icon: "▲",
        tags: ["sdk", "streaming"],
      },
      {
        name: "Pinecone",
        desc: "向量数据库",
        url: "https://pinecone.io",
        icon: "🌲",
        tags: ["vector", "database"],
      },
      {
        name: "token 充值",
        desc: "token 充值",
        url: "https://www.gamsgo.com/share/akvhX",
        icon: "💰",
        tags: ["token", "recharge"],
      },
    ],
  },
];

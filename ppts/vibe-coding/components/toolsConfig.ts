export const SUPPORT_LEVEL = {
  notSupport: "不支持",
  partialSupport: "部分支持",
  support: "支持",
};

export const ToolsCompare = {
  title: "AI 编程工具全景能力评估矩阵 (2026版)",
  subtitle:
    "基于 Agentic 架构与日常研发效能的综合测评。点击表格单元格查看详细说明。",

  label: {
    arch: { desc: "架构与协议扩展 (基建层)" },
    core: { desc: "核心能力" },
  },

  features: {
    "AGENTS.md": {
      name: "AGENTS.md",
      desc: "项目上下文规范标准，用于对齐全局目标与背景",
      label: ["core"],
    },
    rules: {
      name: "Rules",
      desc: "规范 AI 代码生成行为与输出样板的指令集",
      label: ["arch"],
    },
    skill: {
      name: "SKILL",
      desc: "提供给 AI 调用的工具链与函数自动化工作流",
      label: ["core"],
    },
    hooks: {
      name: "HOOKS",
      desc: "拦截文件读写与指令执行等，在生命周期注入校验",
      label: ["arch"],
    },
    commands: {
      name: "Commands",
      desc: "封装特定长终端指令为捷径，以供 AI 快捷调用",
      label: ["core"],
    },
    mcp: {
      name: "MCP",
      desc: "通过 Model Context Protocol 扩展模型的本地认知域",
      label: ["arch"],
    },
    agents: {
      name: "Agents",
      desc: "分治处理复杂单一任务的特定领域子智能体协作",
      label: ["core"],
    },
    config: {
      name: "Config",
      desc: "用于不同 AI 行为组件的规则与配置策略解耦",
      label: ["arch"],
    },
  },

  tools: {
    cursor: {
      _meta: {
        name: "Cursor",
        color: "#3B82F6",
      },
      "AGENTS.md": { level: SUPPORT_LEVEL.support },
      rules: { level: SUPPORT_LEVEL.support },
      skill: { level: SUPPORT_LEVEL.support },
      hooks: { level: SUPPORT_LEVEL.support },
      commands: { level: SUPPORT_LEVEL.support },
      mcp: { level: SUPPORT_LEVEL.support },
      agents: { level: SUPPORT_LEVEL.support },
      config: { level: SUPPORT_LEVEL.support },
    },
    claude: {
      _meta: {
        name: "Claude Code",
        color: "#D97706",
      },
      "AGENTS.md": { level: SUPPORT_LEVEL.support },
      rules: { level: SUPPORT_LEVEL.support },
      skill: { level: SUPPORT_LEVEL.support },
      hooks: { level: SUPPORT_LEVEL.support },
      commands: { level: SUPPORT_LEVEL.support },
      mcp: { level: SUPPORT_LEVEL.support },
      agents: { level: SUPPORT_LEVEL.support },
      config: { level: SUPPORT_LEVEL.support },
    },
    gemini: {
      _meta: {
        name: "Gemini CLI",
        color: "#8B5CF6",
      },
      "AGENTS.md": { level: SUPPORT_LEVEL.support },
      skill: { level: SUPPORT_LEVEL.support },
      hooks: { level: SUPPORT_LEVEL.support },
      commands: { level: SUPPORT_LEVEL.support },
      mcp: { level: SUPPORT_LEVEL.support },
      agents: { level: SUPPORT_LEVEL.support },
      config: { level: SUPPORT_LEVEL.support },
    },
    copilot: {
      _meta: {
        name: "GitHub Copilot",
        color: "#4B5563",
      },
      "AGENTS.md": { level: SUPPORT_LEVEL.support },
      rules: { level: SUPPORT_LEVEL.support },
      skill: { level: SUPPORT_LEVEL.support },
      hooks: { level: SUPPORT_LEVEL.support },
      commands: { level: SUPPORT_LEVEL.support },
      mcp: { level: SUPPORT_LEVEL.support },
      agents: { level: SUPPORT_LEVEL.support },
      config: { level: SUPPORT_LEVEL.support },
    },
    trae: {
      _meta: {
        name: "Trae",
        color: "#10B981",
      },
      "AGENTS.md": { level: SUPPORT_LEVEL.support },
      rules: { level: SUPPORT_LEVEL.support },
      skill: { level: SUPPORT_LEVEL.support },
      mcp: { level: SUPPORT_LEVEL.support },
      agents: { level: SUPPORT_LEVEL.support },
      config: { level: SUPPORT_LEVEL.support },
    },
    opencode: {
      _meta: {
        name: "OpenCode",
        color: "#EF4444",
        slogan: "⭐️ 纯开源终端工作流",
      },
      "AGENTS.md": { level: SUPPORT_LEVEL.support },
      rules: { level: SUPPORT_LEVEL.support },
      skill: { level: SUPPORT_LEVEL.support },
      hooks: { level: SUPPORT_LEVEL.partialSupport },
      commands: { level: SUPPORT_LEVEL.support },
      mcp: { level: SUPPORT_LEVEL.support },
      agents: { level: SUPPORT_LEVEL.support },
      config: { level: SUPPORT_LEVEL.support },
    },
    codex: {
      _meta: {
        name: "Codex",
        color: "#059669",
        slogan: "⭐️ OpenAI 官方原生多端支持",
      },
      "AGENTS.md": { level: SUPPORT_LEVEL.support },
      skill: { level: SUPPORT_LEVEL.support },
      commands: { level: SUPPORT_LEVEL.support },
      mcp: { level: SUPPORT_LEVEL.support },
      config: { level: SUPPORT_LEVEL.support },
    },
  },
};

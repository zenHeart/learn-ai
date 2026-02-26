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
    context: { desc: "上下文扩充" },
    tool: { desc: "工具扩展层面" },
  },

  features: {
    "AGENTS.md": {
      name: "AGENTS.md",
      desc: "项目上下文规范标准，用于对齐全局目标与背景",
      label: ["context"],
      link: "https://agents.md/",
    },
    rules: {
      name: "Rules",
      desc: "细粒度的项目细节的约束",
      label: ["context"],
      link: "https://cursor.com/docs/context/rules#project-rules",
    },
    commands: {
      name: "Commands",
      desc: "常用 Prompt 封装，以供 AI 快捷调用",
      label: ["context"],
      link: "https://cursor.com/docs/context/commands",
    },
    skill: {
      name: "SKILL",
      desc: "提供给 AI 调用的工具链与工作流",
      label: ["tool", "context"],
      link: "https://agentskills.io/home",
    },
    mcp: {
      name: "MCP",
      desc: "扩展模型的知识域和能力边界",
      label: ["context", "tool"],
      link: "https://modelcontextprotocol.io/docs/getting-started/intro",
    },
    hooks: {
      name: "HOOKS",
      desc: "AI Coding 中各种节点的钩子，用于在特定节点注入自定义逻辑",
      label: ["tool"],
      link: "https://code.claude.com/docs/en/hooks",
    },
    agents: {
      name: "Agents",
      desc: "通过创建多个子智能体，分治处理复任务",
      label: ["tool"],
      link: "https://code.claude.com/docs/en/sub-agents",
    },
    unique: {
      name: "独有特性",
      desc: "各工具区别于其他竞品的核心独特能力",
      label: ["tool"],
    },
  },
  tools: {
    cursor: {
      _meta: {
        name: "Cursor",
        color: "#3B82F6",
        link: "https://cursor.com/",
      },
      "AGENTS.md": {
        level: SUPPORT_LEVEL.support,
        link: "https://cursor.com/docs/context/rules#agentsmd",
      },
      rules: {
        level: SUPPORT_LEVEL.support,
        link: "https://cursor.com/docs/context/rules#project-rules",
      },
      commands: {
        level: SUPPORT_LEVEL.support,
        link: "https://cursor.com/docs/context/commands",
      },
      skill: {
        level: SUPPORT_LEVEL.support,
        link: "https://cursor.com/docs/context/skills",
      },
      mcp: {
        level: SUPPORT_LEVEL.support,
        link: "https://cursor.com/docs/context/mcp",
      },
      hooks: {
        level: SUPPORT_LEVEL.support,
        link: "https://cursor.com/docs/agent/hooks",
      },
      agents: {
        level: SUPPORT_LEVEL.support,
        link: "https://cursor.com/docs/context/subagents",
      },
      unique: {
        level: SUPPORT_LEVEL.support,
        text: "BugBot",
        link: "https://cursor.com/docs/bugbot",
      },
    },
    claude: {
      _meta: {
        name: "Claude Code",
        color: "#D97706",
        link: "https://code.claude.com/docs/en/overview",
      },
      "AGENTS.md": {
        level: SUPPORT_LEVEL.support,
        link: "https://code.claude.com/docs/en/best-practices#write-an-effective-claude-md",
      },
      rules: {
        level: SUPPORT_LEVEL.support,
        link: "https://code.claude.com/docs/en/memory#modular-rules-with-claude-rules",
      },
      skill: {
        level: SUPPORT_LEVEL.support,
        link: "https://code.claude.com/docs/en/skills",
      },
      hooks: {
        level: SUPPORT_LEVEL.support,
        link: "https://code.claude.com/docs/en/hooks",
      },
      commands: {
        level: SUPPORT_LEVEL.support,
        link: "https://code.claude.com/docs/en/build-with-claude-code/extend-claude-with-skills",
      },
      mcp: {
        level: SUPPORT_LEVEL.support,
        link: "https://code.claude.com/docs/en/build-with-claude-code/configure-mcp-servers",
      },
      agents: {
        level: SUPPORT_LEVEL.support,
        link: "https://code.claude.com/docs/en/sub-agents",
      },
      unique: {
        level: SUPPORT_LEVEL.support,
        text: "Agents Team",
        link: "https://code.claude.com/docs/en/agent-teams#when-to-use-agent-teams",
      },
    },
    gemini: {
      _meta: {
        name: "Gemini CLI",
        color: "#8B5CF6",
        link: "https://geminicli.com/",
      },
      "AGENTS.md": {
        level: SUPPORT_LEVEL.support,
        link: "https://geminicli.com/docs/cli/gemini-md/",
      },
      skill: {
        level: SUPPORT_LEVEL.support,
        link: "https://geminicli.com/docs/cli/skills/",
      },
      hooks: {
        level: SUPPORT_LEVEL.support,
        link: "https://geminicli.com/docs/hooks/",
      },
      commands: {
        level: SUPPORT_LEVEL.support,
        link: "https://geminicli.com/docs/cli/custom-commands/",
      },
      mcp: {
        level: SUPPORT_LEVEL.support,
        link: "https://geminicli.com/docs/tools/mcp-server/",
      },
      agents: {
        level: SUPPORT_LEVEL.support,
        link: "https://geminicli.com/docs/core/subagents/",
      },
      unique: {
        level: SUPPORT_LEVEL.support,
        text: "YOLO",
        link: "https://geminicli.com/docs/reference/policy-engine/#approval-modes",
      },
    },
    copilot: {
      _meta: {
        name: "GitHub Copilot",
        color: "#4B5563",
        link: "https://docs.github.com/en/copilot",
      },
      "AGENTS.md": {
        level: SUPPORT_LEVEL.support,
        link: "https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-cli/add-custom-instructions#agent-instructions",
      },
      rules: {
        level: SUPPORT_LEVEL.support,
        link: "https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot",
      },
      skill: {
        level: SUPPORT_LEVEL.support,
        link: "https://github.blog/changelog/2025-12-18-github-copilot-now-supports-agent-skills/",
      },
      hooks: {
        level: SUPPORT_LEVEL.support,
        link: "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/use-hooks",
      },
      commands: {
        level: SUPPORT_LEVEL.support,
        link: "https://code.visualstudio.com/docs/copilot/customization/prompt-files",
      },
      mcp: {
        level: SUPPORT_LEVEL.support,
        link: "https://docs.github.com/en/copilot/customizing-copilot/configuring-mcp-servers",
      },
      agents: {
        level: SUPPORT_LEVEL.support,
        link: "https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-custom-agents",
      },
      unique: {
        level: SUPPORT_LEVEL.support,
        text: "Participant",
        link: "https://vscode.js.cn/api/extension-guides/ai/chat",
      },
    },
    trae: {
      _meta: {
        name: "Trae",
        color: "#10B981",
        link: "https://docs.trae.ai/ide",
      },
      "AGENTS.md": {
        level: SUPPORT_LEVEL.support,
        link: "https://docs.trae.ai/ide/rules?_lang=en",
      },
      rules: {
        level: SUPPORT_LEVEL.support,
        link: "https://docs.trae.ai/ide/rules?_lang=en",
      },
      skill: {
        level: SUPPORT_LEVEL.support,
        link: "https://docs.trae.ai/ide/skills",
      },
      mcp: {
        level: SUPPORT_LEVEL.support,
        link: "https://docs.trae.ai/ide/ide-settings-overview?_lang=en",
      },
      agents: {
        level: SUPPORT_LEVEL.support,
        link: "https://docs.trae.ai/ide/agent?_lang=en",
      },
      unique: {
        level: SUPPORT_LEVEL.support,
        text: "SOLO",
        link: "https://www.trae.ai/solo",
      },
    },
    opencode: {
      _meta: {
        name: "OpenCode",
        color: "#EF4444",
        link: "https://opencode.ai/",
      },
      "AGENTS.md": {
        level: SUPPORT_LEVEL.support,
        link: "https://opencode.ai/docs/rules/",
      },
      rules: {
        level: SUPPORT_LEVEL.support,
        link: "https://opencode.ai/docs/rules/#custom-instructions",
      },
      skill: {
        level: SUPPORT_LEVEL.support,
        link: "https://opencode.ai/docs/skills/",
      },
      hooks: {
        level: SUPPORT_LEVEL.partialSupport,
        link: "https://opencode.ai/docs/plugins",
      },
      commands: {
        level: SUPPORT_LEVEL.support,
        link: "https://opencode.ai/docs/commands/",
      },
      mcp: {
        level: SUPPORT_LEVEL.support,
        link: "https://opencode.ai/docs/mcp/",
      },
      agents: {
        level: SUPPORT_LEVEL.support,
        link: "https://opencode.ai/docs/agents/",
      },
      unique: {
        level: SUPPORT_LEVEL.support,
        text: "Sessions",
        link: "https://opencode.ai/docs/tui/#sessions",
      },
    },
    codex: {
      _meta: {
        name: "Codex",
        color: "#059669",
        link: "https://developers.openai.com/codex/",
      },
      "AGENTS.md": {
        level: SUPPORT_LEVEL.support,
        link: "https://developers.openai.com/codex/guides/agents-md/",
      },
      skill: {
        level: SUPPORT_LEVEL.support,
        link: "https://developers.openai.com/codex/skills/",
      },
      commands: {
        level: SUPPORT_LEVEL.support,
        link: "https://developers.openai.com/codex/custom-prompts/",
      },
      mcp: {
        level: SUPPORT_LEVEL.support,
        link: "https://developers.openai.com/codex/mcp/",
      },
      unique: {
        level: SUPPORT_LEVEL.support,
        text: "Worktrees",
        link: "https://developers.openai.com/codex/app/worktrees",
      },
    },
  },
};

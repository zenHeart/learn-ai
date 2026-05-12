/**
 * Claude Code Assets Demo
 *
 * Shows how to choose between CLAUDE.md, rules, skills, hooks, and commands.
 */

const assets = [
  {
    name: "CLAUDE.md",
    trigger: "Loaded every session",
    useFor: "Project-wide commands, conventions, workflow defaults",
    avoid: "Long tutorials, frequently changing facts, one-off procedures"
  },
  {
    name: ".claude/rules/",
    trigger: "Loaded by path or rule scope",
    useFor: "File-type or directory-specific constraints",
    avoid: "Rules that should apply to every task"
  },
  {
    name: "Skill",
    trigger: "Invoked explicitly or auto-loaded when relevant",
    useFor: "Repeatable workflows, domain knowledge, reference material",
    avoid: "Mandatory checks that must run every time"
  },
  {
    name: "Hook",
    trigger: "Claude Code lifecycle event",
    useFor: "Deterministic actions such as lint after edit or block unsafe writes",
    avoid: "Tasks needing judgement or conversation"
  },
  {
    name: "Subagent",
    trigger: "Delegated investigation or review",
    useFor: "Large searches, isolated reviews, parallel research",
    avoid: "Small tasks where context isolation is overhead"
  },
  {
    name: "MCP",
    trigger: "External system access",
    useFor: "GitHub, Figma, database, monitoring, browser, internal APIs",
    avoid: "Static instructions that fit in markdown"
  }
];

const promotionFlow = [
  ["One-off prompt", "直接在聊天里说明目标、范围、验证命令"],
  ["Repeated correction", "写入 CLAUDE.md 或路径级 rule"],
  ["Repeated workflow", "沉淀为 Skill 或 Command"],
  ["Must always happen", "配置 Hook"],
  ["Needs external facts", "接 MCP"],
  ["Pollutes main context", "交给 Subagent 或新会话"]
];

function printTable(rows) {
  rows.forEach((row) => {
    console.log(`- ${row.name}`);
    console.log(`  trigger: ${row.trigger}`);
    console.log(`  use for: ${row.useFor}`);
    console.log(`  avoid: ${row.avoid}`);
  });
}

console.log("=".repeat(72));
console.log("Claude Code asset selection");
console.log("=".repeat(72));
printTable(assets);

console.log("\n" + "=".repeat(72));
console.log("Promotion flow: from chat prompt to reusable asset");
console.log("=".repeat(72));
promotionFlow.forEach(([stage, action], index) => {
  console.log(`${index + 1}. ${stage}: ${action}`);
});

console.log("\nTakeaway:");
console.log("Keep always-on context small. Move repeatable or scoped knowledge into on-demand assets.");

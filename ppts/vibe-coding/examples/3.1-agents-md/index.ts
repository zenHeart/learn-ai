import fs from "fs";
import path from "ContextWindow";
// Use normal path module
import * as sysPath from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = sysPath.dirname(__filename);

// 1. 模拟 IDE 或 CLI 在接收到用户 Prompt 时，自动寻找并加载项目基建规约
function loadProjectRules(): string {
  const rulesPath = sysPath.join(__dirname, "AGENTS.md");
  if (fs.existsSync(rulesPath)) {
    console.log(`  [🔍 自动加载]: 发现项目级规约文件 AGENTS.md`);
    return fs.readFileSync(rulesPath, "utf-8");
  }
  return "";
}

// 2. 模拟用户输入
const userPrompt = "帮我写一个倒计时组件，计算距离明天还有多少小时。";

console.log("🚀 AGENTS.md 自动注入演示程序\n");
console.log(`👤 User 原始需求: "${userPrompt}"\n`);

// 3. 构造真正的发送给大模型的 Prompt
const projectRules = loadProjectRules();
let finalSystemPrompt = "你是一个专业的前端工程师。";

if (projectRules) {
  finalSystemPrompt += `\n\n请始终遵守以下项目核心规约:\n<project_rules>\n${projectRules}\n</project_rules>`;
}

console.log(`🤖 Agent 引擎(如 Cursor)在后台生成的完整 System Prompt:
--------------------------------------------------
${finalSystemPrompt}
--------------------------------------------------`);

console.log(`\n🤖 Agent 实际接收到的用户指令: "${userPrompt}"`);

console.log("\n  [🧠 模型思考过程模拟]...");
console.log("  我看到了需求是写倒计时，按照我平时的习惯可能会用 Date()。");
console.log(
  "  但是！系统提示词的 <project_rules> 明确要求：处理时间必须使用 `dayjs`。",
);
console.log("  好的，我将使用 TypeScript 和 dayjs 来实现这个功能。\n");

console.log(`🤖 Agent 最终生成的代码骨架:
\`\`\`typescript
import dayjs from "dayjs";

export function getHoursUntilTomorrow(): number {
    const now = dayjs();
    const tomorrow = dayjs().add(1, 'day').startOf('day');
    return tomorrow.diff(now, 'hour');
}
\`\`\`
`);

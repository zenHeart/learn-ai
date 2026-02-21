import { execSync } from "child_process";

/**
 * 这个文件演示了类似 Claude Code 中自定义 Skills 和权限约束的设计理念
 */

// 1. 定义一个模拟的技能系统
// 真实环境里这些通常是 .md 或者 yaml 配置文件，定义了某个快捷指令对应的自动化流和权限
type Skill = {
  name: string;
  description: string;
  allowedTools: ("Read" | "Write" | "RunCommand" | "Search")[];
  // 这个参数决定了 Agent 在调用这个技能时，是否需要人工点 OK 确认授权执行
  requireHumanConfirmation: boolean;
};

const skillRegistry: Record<string, Skill> = {
  "audit-deps": {
    name: "audit-deps",
    description: "扫描 package.json 中的依赖包并检查安全漏洞",
    // 审计命令只需要看，不需要改代码，所以不给 Write 权限
    allowedTools: ["Read", "RunCommand"],
    requireHumanConfirmation: false,
  },
  "refactor-all": {
    name: "refactor-all",
    description: "一键重构整个 src 目录下的遗留代码",
    // 重构具有破坏性，需要全权限
    allowedTools: ["Read", "Write", "Search"],
    requireHumanConfirmation: true,
  },
};

// 2. 模拟大模型请求执行某个系统动作
function executeAgentSkill(skillName: string) {
  console.log(`\n🤖 Agent 发起技能调用请求: '[${skillName}]'`);

  const skill = skillRegistry[skillName];
  if (!skill) {
    console.log(`❌ 引擎拒绝: 找不到名叫 ${skillName} 的技能。`);
    return;
  }

  console.log(`  [🛡️ 权限引擎启动]: 检查技能 "${skill.name}" 的权限范围...`);
  console.log(
    `  > 授权的工具集: ${skill.allowedTools.includes("Write") ? "✅包含写权限" : "🔒只读模式，无修改代码权限"}`,
  );

  if (skill.requireHumanConfirmation) {
    console.log(`  [✋ 拦截]: 该操作破坏性较强，正在请求人类用户确认... (Y/N)`);
    console.log(`  [👤 用户行为]: 输入了 N, 拒绝授权`);
    console.log(`❌ 引擎阻断: 用户拒绝运行。Agent 停止工作。`);
    return;
  }

  // 模拟被授权后的执行
  console.log(`  [✅ 授权通过]: 正在静默执行自动化任务...`);
  if (skillName === "audit-deps") {
    try {
      // 这里我们真实调用一下本地终端跑类似命令的返回（使用安全的内建指令代替破坏性命令）
      console.log("\n====== 终端输出开始 =====");
      const output = execSync("npm list typescript").toString();
      console.log(output.trim());
      console.log("====== 终端输出结束 =====\n");
      console.log(
        "🤖 Agent (收到日志并总结): 目前只安装了 TypeScript，版本是上面显示的。暂未扫描到 CVE 风险库。",
      );
    } catch (e) {
      console.log("执行失败");
    }
  }
}

console.log("🚀 Commands & Skills (自动化技能) 演示程序\n");

// 场景 1: 调用安全审核，不给写文件权限，静默运行
executeAgentSkill("audit-deps");

// 场景 2: 调用全局重构指令，带破坏性，触发拦截
executeAgentSkill("refactor-all");

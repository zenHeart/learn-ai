/**
 * 这个文件演示如何通过生命周期 Hooks 拦截 Agent 的操作。
 * 在自动化编程中，我们经常需要在 AI 提交代码或执行动作前后加入校验逻辑。
 */

// 1. 模拟一段前置校验拉取来的 Hook 脚本内容 (类似于 pre-commit.sh)
function runPreCommitHook(codeContent: string): boolean {
  console.log(`  [🪝 Hook 执行]: 正在运行 pre-commit 语法检查...`);

  // 假设我们的项目中配置了 ESLint：不允许在代码里写 var
  if (codeContent.includes("var ")) {
    console.log(
      `  ❌ [ESLint 报错]: 禁止使用 'var' 声明变量，请使用 'let' 或 'const'。`,
    );
    return false; // 代表校验失败
  }

  console.log(`  ✅ [ESLint 通过]: 代码清晰规范！`);
  return true;
}

// 2. 模拟大模型 Agent 的运行回路
function agentExecuteTask(prompt: string, generatedCode: string) {
  console.log(`\n🤖 Agent 接收到任务: "${prompt}"`);
  console.log(`🤖 Agent 写出的代码: \n${generatedCode}`);

  console.log(`\n🤖 Agent 准备提交代码 (Git Commit)...`);

  // 触发 Hook 拦截机制
  const isPassed = runPreCommitHook(generatedCode);

  if (!isPassed) {
    console.log(`❌ 引擎拦截: 生命周期钩子检查未通过！`);
    console.log(`🤖 Agent 进入自动修正回路 (Feedback Loop)...`);

    // 当失败时，Agent 能看到错误信息，并重新生成代码
    console.log(`\n  >> (Agent 根据报错信息自我修复代码) <<\n`);
    const fixedCode = generatedCode.replace(/var /g, "const ");
    console.log(`🤖 Agent 修复后代码: \n${fixedCode}`);

    // 再次跑 Hook
    if (runPreCommitHook(fixedCode)) {
      console.log(`🎉 引擎放行: Git Commit 成功！`);
    }
  } else {
    console.log(`🎉 引擎放行: Git Commit 成功！`);
  }
}

console.log("🚀 生命周期钩子 (Hooks) 拦截演示\n");

// 场景: Agent 使用了被弃用的 var 关键字写了代码
const badCode = `
function calculateTotal(price, tax) {
    var total = price * (1 + tax);
    return total;
}
`;

agentExecuteTask("帮我写一个算税后总价的函数", badCode.trim());

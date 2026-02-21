/**
 * 这个文件演示了 Sub Agents (多重分身/子智能体) 协同编排的思想。
 * 面对复杂的“全栈任务”，单个 Agent 容易遗忘上下文或超出 Token 限制，所以需要拆解任务并委派给不同专业的子 Agent。
 */

// 1. 定义子 Agent (前端 Agent)
async function frontendAgent(task: string): Promise<string> {
  console.log(`  [🧑‍🎨 前端 Agent] 收到任务: "${task}"`);
  console.log(`  [🧑‍🎨 前端 Agent] 正在生成 Vue 组件并拉取 Tailwind UI...`);
  // 模拟耗时操作
  await new Promise((resolve) => setTimeout(resolve, 800));
  const result = `<template><div class="login-form">...</div></template>`;
  console.log(`  [🧑‍🎨 前端 Agent] ✅ 任务完成!`);
  return result;
}

// 2. 定义子 Agent (后端/DB Agent)
async function backendAgent(task: string): Promise<string> {
  console.log(`  [🧑‍🔧 后端 Agent] 收到任务: "${task}"`);
  console.log(`  [🧑‍🔧 后端 Agent] 正在设计数据库表结构和 API 接口...`);
  // 模拟耗时操作
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const result = `CREATE TABLE users (id INT, name VARCHAR); \n router.post('/login', ...);`;
  console.log(`  [🧑‍🔧 后端 Agent] ✅ 任务完成!`);
  return result;
}

// 3. 主控 Agent (Architect)
async function coordinatorAgent(userPrompt: string) {
  console.log(`\n👨‍💼 [总指挥 Agent] 收到用户顶层需求: "${userPrompt}"`);
  console.log(`👨‍💼 [总指挥 Agent] 正在拆解任务拓扑树...`);

  // 将任务拆解为前端和后端两部分，并发派发
  const frontendTask = "根据需求设计登录页面的 UI";
  const backendTask = "设计登录所需的用户表和校验接口";

  console.log(
    `\n👨‍💼 [总指挥 Agent] 派发子任务，开始并行工作流 (Parallel Workflow) ===> \n`,
  );

  // 并行调用两个子 Agent
  const [frontendOutput, backendOutput] = await Promise.all([
    frontendAgent(frontendTask),
    backendAgent(backendTask),
  ]);

  console.log(`\n👨‍💼 [总指挥 Agent] 收集到所有子 Agent 的产出，开始代码整合。`);
  console.log(`\n🎉 集成完毕！最终应用已经就绪。`);
}

console.log("🚀 Sub Agents (多重分身) 编排演示程序\n");

coordinatorAgent("我要一个完整的全栈登录模块，包含 UI 和校验接口。");

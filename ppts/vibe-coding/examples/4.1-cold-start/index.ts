/**
 * 本文件演示 Agent 如何在“冷启动”阶段，根据用户的顶层意图一键生成基础工程结构。
 */

// 1. 模拟环境交互指令（为了演示安全，只打印不真实创建文件）
const fsSimulator = {
  mkdir: (path: string) => console.log(`  [📁 创建目录]: mkdir -p ${path}`),
  writeFile: (path: string, contentPreview: string) => {
    console.log(`  [📄 写入文件]: ${path} (内容摘要: ${contentPreview})`);
  },
  runCommand: (cmd: string) => console.log(`  [⚡ 运行命令]: ${cmd}`),
};

// 2. 模拟大模型的推理和调用
function generateScaffold(userIntent: string) {
  console.log(`\n🤖 收到用户意图: "${userIntent}"`);
  console.log(`🤖 开始分析需求并生成脚手架...`);

  // (真实情况是 LLM 分析意图后，连续输出一串 Tool Use 动作)
  // 假设需求是: 初始化一个 Vue3 + Vite + Tailwind 的后台管理系统模板

  console.log(`\n🔥 --- 自动化执行流开始 --- 🔥`);

  fsSimulator.runCommand(
    "npm create vite@latest dashboard-app -- --template vue-ts",
  );

  console.log("\n  [🤖 正在配置 TailwindCSS...]");
  fsSimulator.runCommand(
    "cd dashboard-app && npm install -D tailwindcss postcss autoprefixer",
  );
  fsSimulator.runCommand("cd dashboard-app && npx tailwindcss init -p");
  fsSimulator.writeFile(
    "dashboard-app/tailwind.config.js",
    "配置了 src/**/*.vue 等扫描路径",
  );
  fsSimulator.writeFile(
    "dashboard-app/src/index.css",
    "@tailwind base; @tailwind components...",
  );

  console.log("\n  [🤖 正在生成基础目录结构...]");
  fsSimulator.mkdir("dashboard-app/src/views");
  fsSimulator.mkdir("dashboard-app/src/components");
  fsSimulator.mkdir("dashboard-app/src/api");

  console.log("\n  [🤖 正在写入 Boilerplate 代码...]");
  fsSimulator.writeFile(
    "dashboard-app/src/views/Login.vue",
    "<template>登录页...</template>",
  );
  fsSimulator.writeFile(
    "dashboard-app/src/views/Dashboard.vue",
    "<template>图表页...</template>",
  );
  fsSimulator.writeFile(
    "dashboard-app/src/App.vue",
    "引入了 Vue Router 的视图出口",
  );

  console.log(`\n🔥 --- 自动化执行流结束 --- 🔥\n`);
}

console.log("🚀 新项目冷启动 (Cold Start) 自动构建演示\n");
generateScaffold(
  "用 Vue3 和 Tailwind 写一个后台管理系统基础模板，包含登录和数据面板页。",
);

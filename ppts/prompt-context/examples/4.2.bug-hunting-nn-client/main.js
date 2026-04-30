/**
 * Bug 狩猎：Claude Code 对比示例
 * 展示模糊 Bug 报告 vs 装备上下文 Bug 报告
 */

// ============================================
// 1. 模糊 Bug 报告（不推荐）
// ============================================

const vagueBugReport = {
  title: "版本 1：模糊 Bug 报告",
  content: "帮我看看这个代码哪里有问题，它不工作。",
  problems: [
    "没有错误信息，模型不知道什么错",
    "没有代码，模型无法分析",
    "没有场景描述，模型只能瞎猜"
  ],
  likelyResponse: `可能得到的回复：
"看起来代码没问题，你是不是没安装依赖？"
"试试重启服务？"
"可以提供更多信息吗？"`
};

// ============================================
// 2. 装备上下文的 Bug 报告
// ============================================

const equippedBugReport = {
  title: "版本 2：装备上下文的 Bug 报告",
  error: {
    type: "Error",
    code: "ECONNREFUSED",
    message: "connect ECONNREFUSED 127.0.0.1:8080",
    location: "NNClient.js:42"
  },
  stackTrace: `堆栈跟踪：
  at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1490:16)
  at NNClient.connect (NNClient.js:42:24)
  at NeuralNetwork.predict (neural.js:87:13)
  at App.handleRequest (app.js:15:6)`,
  relevantCode: `相关代码 (NNClient.js:38-45):
  connect(port, host) {
    this.socket = net.createConnection(port, host);  // line 42
    this.socket.on('connect', () => {
      this.connected = true;
      this.emit('connected');
    });
    this.socket.on('error', (err) => {
      console.error('Connection error:', err);
    });
  }`,
  context: `场景：客户端在 Node.js 环境中尝试连接本地神经网络预测服务器
触发时机：用户提交表单后调用 neural.predict() 进行分类预测
期望行为：返回 { class: 'positive', confidence: 0.92 }
实际情况：连接被拒绝，请求失败`,
  environment: `Node.js v20.10.0
OS: macOS 14.3
客户端库：net (内置)
服务器：Fastify on port 8080`
};

// ============================================
// 3. 格式化输出
// ============================================

function printVagueReport() {
  console.log("=".repeat(60));
  console.log(`【${vagueBugReport.title}】`);
  console.log("=".repeat(60));

  console.log("\n用户报告：");
  console.log(`"${vagueBugReport.content}"`);

  console.log("\n问题分析：");
  vagueBugReport.problems.forEach(p => console.log(`  ✗ ${p}`));

  console.log("\n可能得到的回复：");
  console.log(vagueBugReport.likelyResponse);
}

function printEquippedReport() {
  console.log("\n" + "=".repeat(60));
  console.log(`【${equippedBugReport.title}】`);
  console.log("=".repeat(60));

  console.log("\n🐛 错误信息：");
  console.log("─".repeat(40));
  console.log(`类型: ${equippedBugReport.error.type}`);
  console.log(`代码: ${equippedBugReport.error.code}`);
  console.log(`消息: ${equippedBugReport.error.message}`);
  console.log(`位置: ${equippedBugReport.error.location}`);

  console.log("\n📍 堆栈跟踪：");
  console.log("─".repeat(40));
  console.log(equippedBugReport.stackTrace);

  console.log("\n📄 相关代码：");
  console.log("─".repeat(40));
  console.log(equippedBugReport.relevantCode);

  console.log("\n🎯 上下文：");
  console.log("─".repeat(40));
  console.log(equippedBugReport.context);

  console.log("\n🖥️ 环境：");
  console.log("─".repeat(40));
  console.log(equippedBugReport.environment);
}

function printComparison() {
  console.log("\n" + "=".repeat(60));
  console.log("对比总结");
  console.log("=".repeat(60));

  const comparison = [
    ["诊断时间", "5-10 分钟（来回提问）", "30 秒内定位问题"],
    ["提供的信息", "模型追问才能逐步获取", "一步到位"],
    ["解决效率", "低（多次迭代）", "高（直接分析根因）"],
    ["用户体验", "挫败感强", "快速得到帮助"]
  ];

  console.log("\n┌─────────────┬────────────────────┬────────────────────┐");
  console.log("│ 维度        │ 模糊报告           │ 装备报告           │");
  console.log("├─────────────┼────────────────────┼────────────────────┤");
  comparison.forEach(([dim, vague, equipped]) => {
    const dimPad = dim.padEnd(9);
    const vaguePad = vague.padEnd(18);
    console.log(`│ ${dimPad} │ ${vaguePad} │ ${equipped.padEnd(18)} │`);
  });
  console.log("└─────────────┴────────────────────┴────────────────────┘");
}

function printChecklist() {
  console.log("\n" + "=".repeat(60));
  console.log("Bug 报告要素 checklist");
  console.log("=".repeat(60));

  const checklist = [
    ["错误类型", "ECONNREFUSED, TypeError, SyntaxError"],
    ["错误消息", "connect ECONNREFUSED 127.0.0.1:8080"],
    ["文件和行号", "NNClient.js:42"],
    ["堆栈跟踪", "neural.js → NNClient.js → net"],
    ["相关代码", "前后 5-10 行代码"],
    ["场景描述", "什么操作触发的，期望什么"]
  ];

  console.log("\n");
  checklist.forEach(([item, example]) => {
    console.log(`  ✅ ${item}`);
    console.log(`     示例: ${example}`);
  });
}

// ============================================
// 4. 运行输出
// ============================================

printVagueReport();
printEquippedReport();
printComparison();
printChecklist();

console.log("\n" + "=".repeat(60));
console.log("记住：上下文越丰富 → 诊断越准确 → 修复越快");
console.log("=".repeat(60));

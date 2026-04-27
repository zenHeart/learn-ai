/**
 * ICIO Framework Demo: Structure Your Prompts Better
 *
 * This script demonstrates the difference between unstructured prompts
 * and prompts structured using the ICIO framework (Instruction, Context, Input, Output).
 */

// Sample email data
const emails = [
  {
    subject: "项目评审会",
    body: "下周三下午3点在会议室A有项目评审会，欢迎参加。",
  },
  {
    subject: "技术方案讨论",
    body: "周五上午10:30进行一次技术方案讨论，地点改到线上会议。",
  },
];

// ============================================================
// Unstructured Prompt
// ============================================================
function createUnstructuredPrompt(emails) {
  return `帮我从这些邮件里提取会议时间。邮件如下：
${emails.map((e) => `主题：${e.subject}\n正文：${e.body}`).join("\n\n")}`;
}

// ============================================================
// ICIO Structured Prompt
// ============================================================
function createICIOPrompt(emails) {
  return {
    instruction: "从邮件内容中提取所有会议时间安排，包括会议主题、时间和地点。",

    context: `这些邮件来自你的日历助手，邮件中提到的会议时间均为北京时间（BJT）。
如果有多个会议，请按时间顺序排列。
只提取明确标注了时间的会议，忽略模糊的时间描述。`,

    input: emails
      .map((e) => `邮件主题：${e.subject}\n邮件正文：${e.body}`)
      .join("\n\n"),

    output: `请以 JSON 格式返回：
{
  "meetings": [
    {
      "topic": "会议主题",
      "datetime": "ISO 8601 格式时间（例如：2024-01-15T15:00:00+08:00）",
      "location": "会议地点"
    }
  ]
}`,
  };
}

// ============================================================
// Simulate AI Response
// ============================================================
function simulateAIResponse(prompt, isICIO = false) {
  if (isICIO) {
    return {
      meetings: [
        {
          topic: "项目评审会",
          datetime: "2024-01-17T15:00:00+08:00",
          location: "会议室A",
        },
        {
          topic: "技术方案讨论",
          datetime: "2024-01-19T10:30:00+08:00",
          location: "线上会议",
        },
      ],
    };
  } else {
    // Simulated ambiguous response from unstructured prompt
    return `会议1：下周三下午3点，项目评审会，会议室A
会议2：周五上午10:30，技术方案讨论，线上会议`;
  }
}

// ============================================================
// Demo
// ============================================================
console.log("=".repeat(60));
console.log("ICIO Framework Demo: 结构化提示词 vs 非结构化提示词");
console.log("=".repeat(60));

console.log("\n📧 原始邮件数据：");
emails.forEach((email, i) => {
  console.log(`\n邮件 ${i + 1}:`);
  console.log(`  主题: ${email.subject}`);
  console.log(`  正文: ${email.body}`);
});

console.log("\n\n" + "=".repeat(60));
console.log("❌ 非结构化提示词");
console.log("=".repeat(60));

const unstructuredPrompt = createUnstructuredPrompt(emails);
console.log(`\n提示词:\n${unstructuredPrompt}`);

console.log("\n🤖 AI 回复（模拟）:");
const unstructuredResponse = simulateAIResponse(unstructuredPrompt, false);
console.log(unstructuredResponse);

console.log("\n\n⚠️  非结构化问题：");
console.log("  - 时间格式不统一（下周三 vs 周五上午10:30）");
console.log("  - 缺少 ISO 8601 标准时间格式");
console.log("  - 难以程序化解析");
console.log("  - 没有明确提取所有字段");

console.log("\n\n" + "=".repeat(60));
console.log("✅ ICIO 结构化提示词");
console.log("=".repeat(60));

const icioPrompt = createICIOPrompt(emails);
console.log("\n📝 Instruction（指令）:");
console.log(`  ${icioPrompt.instruction}`);

console.log("\n📋 Context（上下文）:");
console.log(`  ${icioPrompt.context.split("\n").join("\n  ")}`);

console.log("\n📥 Input（输入）:");
console.log(`  ${icioPrompt.input.split("\n").join("\n  ")}`);

console.log("\n📤 Output（输出）:");
console.log(`  ${icioPrompt.output.split("\n").join("\n  ")}`);

console.log("\n🤖 AI 回复（模拟）:");
const icioResponse = simulateAIResponse(icioPrompt, true);
console.log(JSON.stringify(icioResponse, null, 2));

console.log("\n\n✅ ICIO 结构化优势：");
console.log("  - 时间格式统一（ISO 8601）");
console.log("  - JSON 结构易于程序解析");
console.log("  - 包含时区信息（+08:00）");
console.log("  - 明确提取所有必需字段");

console.log("\n\n" + "=".repeat(60));
console.log("📊 对比总结");
console.log("=".repeat(60));

console.log(`
+------------------+------------------------+------------------------+
| 维度             | 非结构化               | ICIO 结构化            |
+------------------+------------------------+------------------------+
| 时间格式         | 模糊文字描述           | ISO 8601 标准         |
| 可解析性         | 需 NLP 解析            | 直接 JSON 解析        |
| 时区说明         | 缺失                   | 明确标注 BJT          |
| 字段完整性       | 可能遗漏               | 明确要求所有字段      |
| 复用性           | 低（每次重写）         | 高（替换 Input 即可）  |
+------------------+------------------------+------------------------+
`);

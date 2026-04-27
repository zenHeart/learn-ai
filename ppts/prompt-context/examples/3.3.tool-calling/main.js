/**
 * Tool Calling 示例
 * 展示如何定义工具 schema 并模拟模型调用工具
 */

// ============================================
// 1. 定义工具 Schema
// ============================================

const calculatorTool = {
  name: "calculate",
  description: "执行数学计算，支持加减乘除和高级运算",
  input_schema: {
    type: "object",
    properties: {
      expression: {
        type: "string",
        description: "数学表达式，如 '2 + 2', 'sqrt(16)', '10 * 5'"
      }
    },
    required: ["expression"]
  }
};

const weatherTool = {
  name: "get_weather",
  description: "获取指定城市的当前天气信息",
  input_schema: {
    type: "object",
    properties: {
      city: {
        type: "string",
        description: "城市名称（中文或英文）"
      },
      unit: {
        type: "string",
        enum: ["celsius", "fahrenheit"],
        default: "celsius",
        description: "温度单位"
      }
    },
    required: ["city"]
  }
};

const tools = [calculatorTool, weatherTool];

// ============================================
// 2. 模拟工具执行
// ============================================

function executeTool(name, input) {
  console.log(`\n[工具调用] ${name}`);
  console.log(`[输入参数]`, JSON.stringify(input, null, 2));

  if (name === "calculate") {
    // 安全计算（实际应使用沙箱环境）
    try {
      // 仅允许安全数学运算
      const safeEval = (expr) => {
        const sanitized = expr.replace(/[^0-9+\-*/().sqrtpow, ]/g, '');
        return Function(`"use strict"; return (${sanitized})`)();
      };
      const result = safeEval(input.expression);
      return { success: true, result };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  if (name === "get_weather") {
    // 模拟天气数据
    const weatherData = {
      Beijing: { temp: 22, condition: "晴", humidity: 45 },
      Shanghai: { temp: 25, condition: "多云", humidity: 60 },
      "New York": { temp: 18, condition: "阴", humidity: 55 }
    };
    const data = weatherData[input.city] || { temp: 20, condition: "未知", humidity: 50 };
    return { success: true, ...data, unit: input.unit || "celsius" };
  }

  return { success: false, error: "Unknown tool" };
}

// ============================================
// 3. 模拟对话场景
// ============================================

function simulateConversation() {
  console.log("=".repeat(50));
  console.log("模拟对话：用户询问需要工具的问题");
  console.log("=".repeat(50));

  const userMessages = [
    { role: "user", content: "帮我计算一下 15 + 27 等于多少？" },
    { role: "user", content: "北京今天天气怎么样？" },
    { role: "user", content: "上海和北京哪个更热？" }
  ];

  userMessages.forEach((msg, idx) => {
    console.log(`\n【消息 ${idx + 1}】`);
    console.log(`用户: ${msg.content}`);

    // 简单规则判断应该调用哪个工具（实际由模型决定）
    if (msg.content.includes("计算") || /\d+/.test(msg.content)) {
      console.log("\n[模型思考] 这条消息需要计算能力");
      console.log("[工具调用请求]");
      console.log({
        type: "tool_call",
        name: "calculate",
        input: { expression: "15 + 27" }
      });

      const result = executeTool("calculate", { expression: "15 + 27" });
      console.log("[工具返回]", JSON.stringify(result));
      console.log("\n[模型最终回复] 15 + 27 = 42");
    }

    if (msg.content.includes("天气") || msg.content.includes("温度")) {
      const city = msg.content.includes("北京") ? "Beijing" :
                   msg.content.includes("上海") ? "Shanghai" : "Beijing";
      console.log("\n[模型思考] 这条消息需要查询天气");
      console.log("[工具调用请求]");
      console.log({
        type: "tool_call",
        name: "get_weather",
        input: { city, unit: "celsius" }
      });

      const result = executeTool("get_weather", { city });
      console.log("[工具返回]", JSON.stringify(result));
      console.log(`\n[模型最终回复] ${city}今天${result.condition}，气温${result.temp}°C`);
    }
  });
}

// ============================================
// 4. 展示工具定义
// ============================================

console.log("=".repeat(50));
console.log("定义的工具 Schema");
console.log("=".repeat(50));

tools.forEach((tool, idx) => {
  console.log(`\n【工具 ${idx + 1}】${tool.name}`);
  console.log(`描述: ${tool.description}`);
  console.log("输入Schema:");
  console.log(JSON.stringify(tool.input_schema, null, 2));
});

// 运行模拟
simulateConversation();

console.log("\n" + "=".repeat(50));
console.log("运行完成！");
console.log("=".repeat(50));

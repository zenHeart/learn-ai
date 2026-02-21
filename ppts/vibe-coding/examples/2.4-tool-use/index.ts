/**
 * 这个文件演示大模型如何通过 Tool Use / Function Calling 来与外部世界交互 (Vibe Coding 的基础)
 */

type WeatherResponse = {
  location: string;
  temperature: number;
  condition: string;
};

// 1. 本地存在的某一个工具函数
function getWeather(location: string): WeatherResponse {
  console.log(`\n  [🛠️ 工具被调用]: getWeather("${location}")...`);
  // 模拟从外部 API 获取当前天气
  return {
    location,
    temperature: location === "Beijing" ? 18 : 22,
    condition: location === "Beijing" ? "Sunny" : "Cloudy",
  };
}

// 2. 模拟大模型的推理过程
// 在真实场景中，大模型并不是直接运行代码，而是经过推理后，输出一个 JSON 意图让环境（客户端）代为执行。
function simulateLLMReasoning(prompt: string) {
  console.log(`\n👤 User: "${prompt}"`);
  console.log(`🤖 Agent thinking...`);

  // 假设大模型经过理解后判定需要调用天气工具
  const modelOutput = {
    type: "tool_call",
    toolName: "getWeather",
    arguments: { location: "Beijing" },
  };

  console.log(
    `  [🧠 模型意图]: 发现自己不知道实时天气，决定输出指令 -> ${JSON.stringify(modelOutput)}`,
  );

  return modelOutput;
}

// 3. 业务层（Agent 引擎）拦截大模型的动作并执行
console.log("🚀 Tool Use 演示程序启动\n");

const userPrompt = "What is the weather like in Beijing today?";
const intent = simulateLLMReasoning(userPrompt);

let finalAnswer = "";

if (intent.type === "tool_call") {
  // 引擎执行大模型要求的工具
  let result;
  if (intent.toolName === "getWeather") {
    result = getWeather(intent.arguments.location);
  }

  console.log(`  [✅ 工具返回]: ${JSON.stringify(result)}`);
  console.log(`🤖 Agent processing result...`);

  // 模拟大模型根据拿到的事实，重新总结出人类语言的回答
  finalAnswer = `The weather in ${result?.location} is currently ${result?.condition} with a temperature of ${result?.temperature}°C.`;
}

console.log(`\n🤖 Agent 最终回复: "${finalAnswer}"`);

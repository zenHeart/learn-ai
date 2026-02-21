import { get_encoding } from "tiktoken";

// 使用 cl100k_base 编码，这是 GPT-3.5 和 GPT-4 使用的编码器
const encoding = get_encoding("cl100k_base");

function analyzeToken(text: string, description: string) {
  const tokens = encoding.encode(text);
  console.log(`\n=== ${description} ===`);
  console.log(`文本内容: "${text}"`);
  console.log(`Token 数量: ${tokens.length}`);
  console.log(`字符长度: ${text.length}`);
  // 输出具体的 token id 以及它们对应的文本片段（为了直观展示）
  console.log(`Token 拆解:`);
  tokens.forEach((token) => {
    // tiktoken 在解码单个 token 时可能会报错或者不能完美还原多字节字符，这里简单展示
    const tokenBytes = encoding.decode_single_token_bytes(token);
    let tokenString;
    try {
      tokenString = new TextDecoder().decode(tokenBytes);
    } catch {
      tokenString = "<不可打印字符>";
    }
    console.log(`  [${token}] -> '${tokenString}'`);
  });
}

console.log("🚀 欢迎体验 Tokenizer 演示程序\n");
console.log(
  "这演示了大模型（如 ChatGPT）是如何将自然语言文本切割为基础处理单元（Token）的。",
);

analyzeToken("Hello world!", "纯英文示例");
analyzeToken("这是一段中文测试文本。", "纯中文示例");
analyzeToken("Vibe Coding 让编程更有意思！", "中英文混合示例");

// 记得释放内存
encoding.free();

# JSON Prompt 最佳实践：让 LLM 稳定输出结构化数据

> 来源：微信公众号「沉浸式趣谈」，原文发表于 2025-05-08
> 原文链接：LLM 输出 JSON 格式频频出错？直到我五一假期发现这个方法

## 问题背景

在使用 LLM 生成 JSON 格式内容时，即使 Prompt 写得再"命令式"，LLM 仍可能：
- 在 JSON 外面包一层 `json ...`
- 开头结尾多几句客套话
- 偶尔缺逗号、多括号
- 格式不合法，无法被 JSON.parse 解析

## 解决方案：JSON Mode 与 JSON Schema

### 1. JSON Mode

**原理**：给 LLM 加上"紧箍咒"，保证输出结果能被标准 JSON 解析器成功解析。

**使用方式**（以 OpenAI API 为例）：

```javascript
import OpenAI from 'openai';

const openai = new OpenAI();

async function getSimpleJson() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      { role: 'system', content: '你是一个专门输出 JSON 的助手...' },
      { role: 'user', content: '描述：张三是一位软件工程师。' },
    ],
    // 关键配置：指定响应格式为 JSON 对象
    response_format: { type: 'json_object' },
  });

  const jsonOutput = response.choices[0]?.message?.content;
  // 直接解析，无需担心格式问题
  const parsedJson = JSON.parse(jsonOutput);
}
```

### 2. JSON Schema（更严格）

**原理**：不仅保证输出是合法 JSON，还保证结构、字段、字段类型都符合预定义的"规矩"。

**使用方式**：配合 OpenAI 的 Tool Calling（函数调用）功能实现。

```javascript
import OpenAI from 'openai';

const openai = new OpenAI();

// 定义 JSON Schema
const userInfoSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', description: '人物的姓名' },
    occupation: { type: 'string', description: '人物的职业' },
    age: { type: 'integer', description: '人物的年龄 (必须是整数)' },
  },
  required: ['name', 'occupation', 'age'],
};

async function getJsonWithSchema() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      { role: 'system', content: '根据用户信息，使用提供的工具来提取并结构化信息。' },
      { role: 'user', content: '描述：李四，30岁，是一名医生。' },
    ],
    // 定义工具，参数即 Schema
    tools: [
      {
        type: 'function',
        function: {
          name: 'extract_user_info',
          description: '提取并格式化用户信息',
          parameters: userInfoSchema,
        },
      },
    ],
    // 强制使用该工具
    tool_choice: { type: 'function', function: { name: 'extract_user_info' } },
  });

  // 结果在 tool_calls 中
  const toolCall = response.choices[0]?.message?.tool_calls?.[0];
  if (toolCall) {
    const parsedArguments = JSON.parse(toolCall.function.arguments);
    // parsedArguments 严格符合 Schema
  }
}
```

## 两种模式对比

| 特性 | JSON Mode | JSON Schema |
|------|-----------|-------------|
| 语法合法性 | ✅ 保证 | ✅ 保证 |
| 字段结构 | ❌ 不约束 | ✅ 严格约束 |
| 字段类型 | ❌ 不约束 | ✅ 类型校验 |
| 使用复杂度 | 低（单参数） | 高（需定义 Schema） |
| 适用场景 | 简单 JSON 输出 | 严格结构化需求 |

## 最佳实践建议

### 何时用 JSON Mode
- 只需输出合法 JSON，不关心具体字段
- 快速原型开发
- 结构简单、无嵌套的场景

### 何时用 JSON Schema
- 需要直接对接数据库
- 调用需要固定格式的外部 API
- 对返回数据结构有严格校验要求
- 需要枚举值限制可选范围

### 其他工具补充
- **jsonrepair**：如果 JSON 仍有微小语法问题，可用此库修复
- **JSON5**：解析更宽容，支持注释和尾逗号

## 参考链接

- [OpenAI 官方 Structured Outputs 文档](https://platform.openai.com/docs/guides/structured-outputs)
- [Google Gemini JSON Mode](https://ai.google.dev/gemini-api/docs/json-mode)
- [jsonrepair 库](https://www.npmjs.com/package/jsonrepair)

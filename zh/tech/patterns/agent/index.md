# AI 智能体 (AI Agents)

## 什么是 AI 智能体？

**AI 智能体 (AI Agent)** 是一个自主系统，使用 LLM 进行感知、推理和行动以实现目标。与仅仅响应的简单聊天机器人不同，智能体：

- 独立做决定
- 使用工具与世界互动
- 规划多步工作流
- 从反馈中学习并适应

**基于**: LLM + 外部工具 + 决策逻辑

**为什么智能体对前端工程师很重要**:
- 自动化复杂工作流
- 构建自主助手
- 创建自愈系统
- 发布会“思考”和行动的功能

## 智能体 vs 聊天机器人 vs RAG

| 特性 | 简单聊天机器人 | RAG 系统 | AI 智能体 |
|---------|----------------|------------|----------|
| **能力** | 仅对话 | 带知识的问答 | 多步行动 |
| **工具** | 无 | 知识检索 | 多个工具 |
| **规划** | 无 | 无 | 有 |
| **自主性** | 低 | 低 | 高 |
| **复杂度** | 低 | 中 | 高 |
| **用例** | 支持聊天 | 文档搜索 | 工作流自动化 |

**何时使用智能体**: 当你需要 AI **做**事情，而不仅仅是**谈论**事情时。

## 智能体架构模式

### 1. ReAct (Reason + Act)

最流行的智能体模式：推理要做什么，然后行动。

**循环**: 思考 → 行动 → 观察 → 思考 → 行动 → ...

**实现**:

```javascript
import { OpenAI } from 'openai';

const openai = new OpenAI();

// 定义可用工具
const tools = {
  search_docs: async (query) => {
    // 搜索文档
    return `Found 3 articles about ${query}...`;
  },

  get_weather: async (city) => {
    // 调用天气 API
    return `Weather in ${city}: Sunny, 72°F`;
  },

  send_email: async ({ to, subject, body }) => {
    // 发送邮件
    return `Email sent to ${to}`;
  }
};

async function reactAgent(userGoal, maxIterations = 5) {
  const history = [];
  let iteration = 0;

  const systemPrompt = `You are an AI agent that can use tools to accomplish tasks.

Available tools:
- search_docs(query: string): Search documentation
- get_weather(city: string): Get weather information
- send_email({to, subject, body}): Send an email

For each step, think about what to do, then use a tool or provide a final answer.

Format your response as JSON:
{
  "thought": "Your reasoning about what to do next",
  "action": "tool_name" or "finish",
  "action_input": "tool parameters" or null,
  "answer": "final answer (only if action is 'finish')"
}`;

  while (iteration < maxIterations) {
    iteration++;

    // 获取智能体决策
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Goal: ${userGoal}\n\nHistory:\n${JSON.stringify(history, null, 2)}` }
      ],
      response_format: { type: 'json_object' }
    });

    const decision = JSON.parse(response.choices[0].message.content);

    console.log(`\n[Iteration ${iteration}]`);
    console.log(`Thought: ${decision.thought}`);
    console.log(`Action: ${decision.action}`);

    // 检查智能体是否完成
    if (decision.action === 'finish') {
      return decision.answer;
    }

    // 执行工具
    const tool = tools[decision.action];
    if (!tool) {
      history.push({
        observation: `Error: Tool '${decision.action}' not found`
      });
      continue;
    }

    const observation = await tool(decision.action_input);
    console.log(`Observation: ${observation}`);

    history.push({
      thought: decision.thought,
      action: decision.action,
      action_input: decision.action_input,
      observation
    });
  }

  return 'Max iterations reached without completing goal';
}

// 用法
const result = await reactAgent(
  'Find out the weather in San Francisco and email the info to john@example.com'
);
console.log('\nFinal Answer:', result);
```

### 2. 计划并执行 (Plan-and-Execute)

智能体先创建一个计划，然后按顺序执行步骤。

**过程**: 目标 → 创建计划 → 执行步骤 1 → 执行步骤 2 → ... → 完成

```javascript
async function planAndExecuteAgent(userGoal) {
  // 步骤 1: 创建计划
  const planResponse = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `Create a step-by-step plan to accomplish the user's goal.
Return as JSON array: [{"step": 1, "description": "...", "tool": "tool_name", "input": "..."}]`
      },
      {
        role: 'user',
        content: `Goal: ${userGoal}\n\nAvailable tools: ${Object.keys(tools).join(', ')}`
      }
    ],
    response_format: { type: 'json_object' }
  });

  const plan = JSON.parse(planResponse.choices[0].message.content).steps;

  console.log('Plan:', plan);

  // 步骤 2: 执行计划
  const results = [];

  for (const step of plan) {
    console.log(`\nExecuting Step ${step.step}: ${step.description}`);

    const tool = tools[step.tool];
    if (!tool) {
      results.push({ step: step.step, error: `Tool not found: ${step.tool}` });
      continue;
    }

    const result = await tool(step.input);
    results.push({ step: step.step, result });

    console.log(`Result: ${result}`);
  }

  // 步骤 3: 综合最终答案
  const finalResponse = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'Synthesize a final answer based on the plan execution results.'
      },
      {
        role: 'user',
        content: `Goal: ${userGoal}\n\nPlan: ${JSON.stringify(plan)}\n\nResults: ${JSON.stringify(results)}`
      }
    ]
  });

  return finalResponse.choices[0].message.content;
}
```

### 3. 工具使用智能体 (函数调用)

使用 OpenAI 的原生函数调用来实现更清晰的智能体：

```javascript
async function toolUseAgent(userMessage) {
  const messages = [
    {
      role: 'system',
      content: 'You are a helpful assistant with access to tools.'
    },
    {
      role: 'user',
      content: userMessage
    }
  ];

  // 定义 OpenAI 函数调用的工具
  const availableTools = [
    {
      type: 'function',
      function: {
        name: 'search_docs',
        description: 'Search through documentation',
        parameters: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'The search query'
            }
          },
          required: ['query']
        }
      }
    },
    {
      type: 'function',
      function: {
        name: 'get_weather',
        description: 'Get current weather for a city',
        parameters: {
          type: 'object',
          properties: {
            city: {
              type: 'string',
              description: 'City name'
            }
          },
          required: ['city']
        }
      }
    }
  ];

  let continueLoop = true;
  let iterations = 0;
  const maxIterations = 5;

  while (continueLoop && iterations < maxIterations) {
    iterations++;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      tools: availableTools,
      tool_choice: 'auto'
    });

    const responseMessage = response.choices[0].message;
    messages.push(responseMessage);

    // 检查智能体是否想使用工具
    if (responseMessage.tool_calls) {
      for (const toolCall of responseMessage.tool_calls) {
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);

        console.log(`Calling ${functionName} with:`, functionArgs);

        // 执行工具
        const result = await tools[functionName](functionArgs);

        // 将工具结果添加到消息中
        messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: result
        });
      }
    } else {
      // 没有更多工具调用，智能体完成
      continueLoop = false;
      return responseMessage.content;
    }
  }

  return 'Agent did not complete task';
}

// 用法
const answer = await toolUseAgent(
  'What is the weather in New York and what docs do we have about weather APIs?'
);
console.log(answer);
```

## 生产级智能体系统

### 带错误处理的完整智能体

```typescript
// lib/agent.ts
import { OpenAI } from 'openai';

interface Tool {
  name: string;
  description: string;
  parameters: object;
  execute: (args: any) => Promise<string>;
}

interface AgentConfig {
  maxIterations?: number;
  verbose?: boolean;
}

export class AIAgent {
  private openai: OpenAI;
  private tools: Map<string, Tool>;
  private config: AgentConfig;

  constructor(config: AgentConfig = {}) {
    this.openai = new OpenAI();
    this.tools = new Map();
    this.config = {
      maxIterations: 5,
      verbose: false,
      ...config
    };
  }

  registerTool(tool: Tool) {
    this.tools.set(tool.name, tool);
  }

  private getToolDefinitions() {
    return Array.from(this.tools.values()).map(tool => ({
      type: 'function' as const,
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters
      }
    }));
  }

  async run(userGoal: string): Promise<string> {
    const messages: any[] = [
      {
        role: 'system',
        content: 'You are a helpful AI agent. Use the available tools to accomplish the user\'s goal.'
      },
      {
        role: 'user',
        content: userGoal
      }
    ];

    let iteration = 0;

    while (iteration < this.config.maxIterations!) {
      iteration++;

      if (this.config.verbose) {
        console.log(`\n[Iteration ${iteration}]`);
      }

      try {
        const response = await this.openai.chat.completions.create({
          model: 'gpt-4-turbo-preview',
          messages,
          tools: this.getToolDefinitions(),
          tool_choice: 'auto'
        });

        const responseMessage = response.choices[0].message;
        messages.push(responseMessage);

        // 检查智能体是否完成
        if (!responseMessage.tool_calls) {
          return responseMessage.content || 'No response';
        }

        // 执行工具
        for (const toolCall of responseMessage.tool_calls) {
          const toolName = toolCall.function.name;
          const tool = this.tools.get(toolName);

          if (!tool) {
            messages.push({
              role: 'tool',
              tool_call_id: toolCall.id,
              content: `Error: Tool ${toolName} not found`
            });
            continue;
          }

          try {
            const args = JSON.parse(toolCall.function.arguments);

            if (this.config.verbose) {
              console.log(`Executing ${toolName}:`, args);
            }

            const result = await tool.execute(args);

            messages.push({
              role: 'tool',
              tool_call_id: toolCall.id,
              content: result
            });

            if (this.config.verbose) {
              console.log(`Result:`, result);
            }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';

            messages.push({
              role: 'tool',
              tool_call_id: toolCall.id,
              content: `Error executing tool: ${errorMessage}`
            });
          }
        }
      } catch (error) {
        console.error('Agent error:', error);
        throw new Error(`Agent failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    return `Agent reached max iterations (${this.config.maxIterations}) without completing goal`;
  }
}

// 用法
const agent = new AIAgent({ verbose: true, maxIterations: 10 });

// 注册工具
agent.registerTool({
  name: 'search_database',
  description: 'Search the user database',
  parameters: {
    type: 'object',
    properties: {
      query: { type: 'string', description: 'Search query' }
    },
    required: ['query']
  },
  execute: async ({ query }) => {
    // 数据库搜索逻辑
    return `Found 5 users matching "${query}"`;
  }
});

agent.registerTool({
  name: 'send_notification',
  description: 'Send a notification to a user',
  parameters: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
      message: { type: 'string' }
    },
    required: ['userId', 'message']
  },
  execute: async ({ userId, message }) => {
    // 发送通知逻辑
    return `Notification sent to user ${userId}`;
  }
});

// 运行智能体
const result = await agent.run(
  'Find all users named "John" and send them a welcome notification'
);
console.log('Final Result:', result);
```

## 智能体用例

### 1. 客户支持智能体

自动化支持工作流：

```javascript
const supportAgent = new AIAgent();

supportAgent.registerTool({
  name: 'search_tickets',
  description: 'Search support tickets',
  parameters: {
    type: 'object',
    properties: {
      userId: { type: 'string' }
    }
  },
  execute: async ({ userId }) => {
    return `User ${userId} has 2 open tickets: #123, #456`;
  }
});

supportAgent.registerTool({
  name: 'create_ticket',
  description: 'Create a new support ticket',
  parameters: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
      issue: { type: 'string' },
      priority: { type: 'string', enum: ['low', 'medium', 'high'] }
    }
  },
  execute: async (params) => {
    return `Ticket #789 created for user ${params.userId}`;
  }
});

await supportAgent.run(
  'User u123 is having login issues. Check their existing tickets and create a high-priority ticket if needed.'
);
```

### 2. 数据分析智能体

分析数据并生成见解：

```javascript
dataAgent.registerTool({
  name: 'query_analytics',
  description: 'Run analytics query',
  parameters: {
    type: 'object',
    properties: {
      metric: { type: 'string' },
      timeRange: { type: 'string' }
    }
  },
  execute: async ({ metric, timeRange }) => {
    return `${metric} for ${timeRange}: 1,234 events`;
  }
});

dataAgent.registerTool({
  name: 'create_chart',
  description: 'Create a visualization',
  parameters: {
    type: 'object',
    properties: {
      type: { type: 'string', enum: ['line', 'bar', 'pie'] },
      data: { type: 'string' }
    }
  },
  execute: async (params) => {
    return `Chart created: ${params.type} chart saved to /charts/chart.png`;
  }
});

await dataAgent.run(
  'Analyze user signups for the last 30 days and create a line chart showing the trend'
);
```

### 3. 代码审查智能体

自主审查 Pull Request：

```javascript
codeAgent.registerTool({
  name: 'get_pr_files',
  description: 'Get changed files in a PR',
  parameters: {
    type: 'object',
    properties: {
      prNumber: { type: 'number' }
    }
  },
  execute: async ({ prNumber }) => {
    return `PR #${prNumber} changes: src/app.ts, src/utils.ts`;
  }
});

codeAgent.registerTool({
  name: 'analyze_code',
  description: 'Analyze code for issues',
  parameters: {
    type: 'object',
    properties: {
      filePath: { type: 'string' }
    }
  },
  execute: async ({ filePath }) => {
    return `${filePath}: Found 2 issues - unused variable, missing error handling`;
  }
});

codeAgent.registerTool({
  name: 'post_comment',
  description: 'Post a review comment',
  parameters: {
    type: 'object',
    properties: {
      prNumber: { type: 'number' },
      comment: { type: 'string' }
    }
  },
  execute: async (params) => {
    return `Comment posted on PR #${params.prNumber}`;
  }
});

await codeAgent.run('Review PR #42 and post comments on any issues found');
```

## 智能体最佳实践

1. **简单开始**: 从 ReAct 模式开始，根据需要增加复杂性
2. **限制迭代**: 设置最大迭代次数以防止无限循环
3. **错误处理**: 工具应返回错误消息，而不是抛出异常
4. **日志记录**: 记录所有操作以进行调试和审计
5. **工具描述**: 编写清晰、具体的工具描述
6. **验证**: 使用 JSON Schema 或 Zod 验证工具输入
7. **超时**: 为工具执行添加超时
8. **回退**: 处理智能体无法完成目标的情况
9. **人机回环**: 为破坏性操作添加批准步骤
10. **成本控制**: 监控 Token 使用情况，设置预算

## 常见陷阱

1. **无限循环**: 智能体永远重复相同的动作 → 添加迭代限制
2. **工具地狱**: 工具太多会让智能体困惑 → 保持工具专注且数量少
3. **无验证**: 糟糕的工具输入导致失败 → 验证所有输入
4. **静默失败**: 工具错误没有传达给智能体 → 将错误消息作为字符串返回
5. **过度自主**: 智能体做了你不想要的事情 → 添加确认步骤

## 下一步

- **实现基本的 ReAct 智能体** 使用 2-3 个工具
- **集成 MCP 工具** 以进行标准化工具调用
- **结合 RAG** 以构建基于知识的智能体
- **添加监控** 和日志以用于生产环境

智能体是 AI 应用的未来。它们将 LLM 从聊天机器人转变为**实干家**。从简单开始，迭代，构建解决实际问题的自主系统！
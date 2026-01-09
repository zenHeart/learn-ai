# AI Agents

## What is an AI Agent?

An **AI Agent** is an autonomous system that uses LLMs to perceive, reason, and act to achieve goals. Unlike simple chatbots that just respond, agents:

- Make decisions independently
- Use tools to interact with the world
- Plan multi-step workflows
- Learn from feedback and adapt

**Based on**: LLMs + External Tools + Decision-Making Logic

**Why Agents Matter for Frontend Engineers**:
- Automate complex workflows
- Build autonomous assistants
- Create self-healing systems
- Ship features that "think" and act

## Agent vs Chatbot vs RAG

| Feature | Simple Chatbot | RAG System | AI Agent |
|---------|----------------|------------|----------|
| **Capability** | Conversation only | Q&A with knowledge | Multi-step actions |
| **Tools** | None | Knowledge retrieval | Multiple tools |
| **Planning** | No | No | Yes |
| **Autonomy** | Low | Low | High |
| **Complexity** | Low | Medium | High |
| **Use Case** | Support chat | Documentation search | Workflow automation |

**When to use Agents**: When you need the AI to DO things, not just TALK about things.

## Agent Architecture Patterns

### 1. ReAct (Reason + Act)

The most popular agent pattern: Reason about what to do, then Act.

**Loop**: Thought → Action → Observation → Thought → Action → ...

**Implementation**:

```javascript
import { OpenAI } from 'openai';

const openai = new OpenAI();

// Define available tools
const tools = {
  search_docs: async (query) => {
    // Search documentation
    return `Found 3 articles about ${query}...`;
  },

  get_weather: async (city) => {
    // Call weather API
    return `Weather in ${city}: Sunny, 72°F`;
  },

  send_email: async ({ to, subject, body }) => {
    // Send email
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

    // Get agent's decision
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

    // Check if agent is done
    if (decision.action === 'finish') {
      return decision.answer;
    }

    // Execute tool
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

// Usage
const result = await reactAgent(
  'Find out the weather in San Francisco and email the info to john@example.com'
);
console.log('\nFinal Answer:', result);
```

### 2. Plan-and-Execute

Agent creates a plan first, then executes steps sequentially.

**Process**: Goal → Create Plan → Execute Step 1 → Execute Step 2 → ... → Done

```javascript
async function planAndExecuteAgent(userGoal) {
  // Step 1: Create plan
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

  // Step 2: Execute plan
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

  // Step 3: Synthesize final answer
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

### 3. Tool-Use Agent (Function Calling)

Use OpenAI's native function calling for cleaner agent implementation:

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

  // Define tools for OpenAI function calling
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

    // Check if agent wants to use tools
    if (responseMessage.tool_calls) {
      for (const toolCall of responseMessage.tool_calls) {
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);

        console.log(`Calling ${functionName} with:`, functionArgs);

        // Execute tool
        const result = await tools[functionName](functionArgs);

        // Add tool result to messages
        messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: result
        });
      }
    } else {
      // No more tool calls, agent is done
      continueLoop = false;
      return responseMessage.content;
    }
  }

  return 'Agent did not complete task';
}

// Usage
const answer = await toolUseAgent(
  'What is the weather in New York and what docs do we have about weather APIs?'
);
console.log(answer);
```

## Production Agent System

### Complete Agent with Error Handling

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

        // Check if agent is done
        if (!responseMessage.tool_calls) {
          return responseMessage.content || 'No response';
        }

        // Execute tools
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

// Usage
const agent = new AIAgent({ verbose: true, maxIterations: 10 });

// Register tools
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
    // Database search logic
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
    // Send notification logic
    return `Notification sent to user ${userId}`;
  }
});

// Run agent
const result = await agent.run(
  'Find all users named "John" and send them a welcome notification'
);
console.log('Final Result:', result);
```

## Agent Use Cases

### 1. Customer Support Agent

Automates support workflows:

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

### 2. Data Analysis Agent

Analyzes data and generates insights:

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

### 3. Code Review Agent

Reviews pull requests autonomously:

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

## Agent Best Practices

1. **Start Simple**: Begin with ReAct pattern, add complexity as needed
2. **Limit Iterations**: Set max iterations to prevent infinite loops
3. **Error Handling**: Tools should return error messages, not throw
4. **Logging**: Log all actions for debugging and auditing
5. **Tool Descriptions**: Write clear, specific tool descriptions
6. **Validation**: Validate tool inputs with JSON Schema or Zod
7. **Timeouts**: Add timeouts to tool execution
8. **Fallbacks**: Handle cases where agent can't complete goal
9. **Human-in-Loop**: Add approval steps for destructive actions
10. **Cost Control**: Monitor token usage, set budgets

## Common Pitfalls

1. **Infinite Loops**: Agent repeats same action forever → Add iteration limits
2. **Tool Hell**: Too many tools confuse the agent → Keep tools focused and few
3. **No Validation**: Bad tool inputs cause failures → Validate all inputs
4. **Silent Failures**: Tool errors don't reach agent → Return error messages as strings
5. **Over-Autonomy**: Agent does things you don't want → Add confirmation steps

## Next Steps

- **Implement basic ReAct agent** with 2-3 tools
- **Integrate MCP tools** for standardized tool calling
- **Combine with RAG** for knowledge-grounded agents
- **Add monitoring** and logging for production use

Agents are the future of AI applications. They turn LLMs from chatbots into **doers**. Start simple, iterate, and build autonomous systems that solve real problems!

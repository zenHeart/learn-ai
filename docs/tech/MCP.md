# Model Context Protocol (MCP)

## What is MCP?

**Model Context Protocol** is an open protocol that standardizes how applications provide context to LLMs. Think of it as a **REST API for AI context** - it lets LLMs securely access tools, data sources, and services.

**Created by**: Anthropic (makers of Claude)
**Purpose**: Give LLMs the ability to interact with external systems in a standardized way

### Why MCP Matters for Frontend Engineers

Instead of hard-coding AI integrations:

```javascript
// ❌ Hard-coded approach
async function getWeather(city) {
  const data = await fetch(`https://api.weather.com/${city}`);
  const prompt = `The weather in ${city} is ${data.temp}. Suggest activities.`;
  return await callLLM(prompt);
}
```

Use MCP to give LLMs **general-purpose capabilities**:

```javascript
// ✅ MCP approach - LLM calls tools dynamically
const server = new MCPServer();
server.addTool('get_weather', async ({ city }) => {
  return await fetch(`https://api.weather.com/${city}`);
});

// LLM decides WHEN and HOW to use the tool
```

## Core Concepts

### 1. MCP Server

A **server** exposes resources, tools, and prompts to LLMs.

**Example**: A file system MCP server lets LLMs read/write files.

```javascript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server(
  {
    name: 'my-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {}, // This server provides tools
    },
  }
);
```

### 2. MCP Client

A **client** (like Claude Desktop, IDEs) connects to MCP servers and enables LLMs to use them.

**Example**: Claude Desktop connects to your file system MCP server, allowing Claude to read your project files.

### 3. Tools

**Tools** are functions the LLM can call. You define:
- Name and description
- Input schema (JSON Schema)
- Implementation logic

```javascript
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'read_file',
      description: 'Read contents of a file',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'File path to read'
          }
        },
        required: ['path']
      }
    }
  ]
}));
```

### 4. Resources

**Resources** are data sources LLMs can access (files, database records, API responses).

```javascript
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: 'file:///project/README.md',
      name: 'Project README',
      mimeType: 'text/markdown'
    }
  ]
}));
```

### 5. Prompts

**Prompts** are reusable prompt templates LLMs can use.

```javascript
server.setRequestHandler(ListPromptsRequestSchema, async () => ({
  prompts: [
    {
      name: 'code_review',
      description: 'Review code for issues',
      arguments: [
        {
          name: 'code',
          description: 'Code to review',
          required: true
        }
      ]
    }
  ]
}));
```

## MCP Architecture

```
┌─────────────────┐         ┌──────────────────┐
│   LLM Client    │         │   MCP Server     │
│  (Claude, etc)  │◄───────►│  (Your Backend)  │
└─────────────────┘   MCP   └──────────────────┘
                    Protocol         │
                                    │ Your Code
                                    ▼
                             ┌──────────────┐
                             │  External    │
                             │  Services    │
                             │  (APIs, DBs) │
                             └──────────────┘
```

**Flow**:
1. LLM client connects to MCP server
2. Server advertises available tools/resources
3. LLM decides to use a tool
4. Server executes tool and returns result
5. LLM incorporates result into response

## Building Your First MCP Server

### Step 1: Install Dependencies

```bash
npm install @modelcontextprotocol/sdk zod
```

### Step 2: Create Server

```javascript
// server.js
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

const server = new Server(
  {
    name: 'calculator-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'add',
      description: 'Add two numbers',
      inputSchema: {
        type: 'object',
        properties: {
          a: { type: 'number', description: 'First number' },
          b: { type: 'number', description: 'Second number' }
        },
        required: ['a', 'b']
      }
    }
  ]
}));

// Implement tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'add') {
    const { a, b } = args;
    const result = a + b;

    return {
      content: [
        {
          type: 'text',
          text: `Result: ${result}`
        }
      ]
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Step 3: Configure Client (Claude Desktop Example)

```json
// ~/Library/Application Support/Claude/claude_desktop_config.json (macOS)
{
  "mcpServers": {
    "calculator": {
      "command": "node",
      "args": ["/path/to/server.js"]
    }
  }
}
```

### Step 4: Test

Restart Claude Desktop. Ask: "Add 5 and 3"

Claude will:
1. See the `add` tool
2. Call it with arguments `{a: 5, b: 3}`
3. Receive result
4. Respond: "5 + 3 = 8"

## Real-World Use Cases

### 1. Database Access

Give LLMs ability to query your database:

```javascript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'query_users') {
    const { query } = request.params.arguments;
    const results = await db.query(query);

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(results, null, 2)
      }]
    };
  }
});
```

**Use case**: "Show me users who signed up last week"

### 2. API Integration

Let LLMs call external APIs:

```javascript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'github_search') {
    const { query } = request.params.arguments;
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}`,
      { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
    );
    const data = await response.json();

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(data.items, null, 2)
      }]
    };
  }
});
```

**Use case**: "Find popular React component libraries on GitHub"

### 3. File System Operations

Give LLMs access to project files:

```javascript
import fs from 'fs/promises';
import path from 'path';

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'read_file') {
    const { filePath } = request.params.arguments;
    const content = await fs.readFile(filePath, 'utf-8');

    return {
      content: [{
        type: 'text',
        text: content
      }]
    };
  }

  if (request.params.name === 'write_file') {
    const { filePath, content } = request.params.arguments;
    await fs.writeFile(filePath, content, 'utf-8');

    return {
      content: [{
        type: 'text',
        text: `File written: ${filePath}`
      }]
    };
  }
});
```

**Use case**: "Read package.json and update the version"

### 4. Custom Business Logic

Expose your application's functionality:

```javascript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'create_invoice') {
    const { customerId, items } = request.params.arguments;

    const invoice = await Invoice.create({
      customerId,
      items,
      total: items.reduce((sum, item) => sum + item.price, 0)
    });

    return {
      content: [{
        type: 'text',
        text: `Invoice created: ${invoice.id}`
      }]
    };
  }
});
```

**Use case**: "Create an invoice for customer ABC with items X, Y, Z"

## MCP in Production

### Security Considerations

1. **Validate inputs** - Use Zod or JSON Schema validation
2. **Limit access** - Don't expose destructive operations without safeguards
3. **Authenticate** - Verify client identity
4. **Rate limit** - Prevent abuse
5. **Audit logs** - Track what LLMs are doing

```javascript
import { z } from 'zod';

const FilePathSchema = z.string().refine(
  (path) => !path.includes('..'), // Prevent directory traversal
  { message: 'Invalid file path' }
);

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'read_file') {
    // Validate input
    const { filePath } = FilePathSchema.parse(request.params.arguments);

    // Check permissions
    if (!await hasReadPermission(filePath)) {
      throw new Error('Access denied');
    }

    // Log access
    await auditLog.write({
      action: 'read_file',
      path: filePath,
      timestamp: new Date()
    });

    // Execute
    const content = await fs.readFile(filePath, 'utf-8');
    return { content: [{ type: 'text', text: content }] };
  }
});
```

### Error Handling

```javascript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    // Tool execution logic
    const result = await executeTool(request.params);

    return {
      content: [{ type: 'text', text: result }]
    };
  } catch (error) {
    // Return error to LLM
    return {
      content: [{
        type: 'text',
        text: `Error: ${error.message}`
      }],
      isError: true
    };
  }
});
```

### Performance Optimization

```javascript
// Cache tool results
const cache = new Map();

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const cacheKey = JSON.stringify(request.params);

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const result = await executeTool(request.params);
  cache.set(cacheKey, result);

  return result;
});
```

## MCP vs Traditional API Integration

| Aspect | Traditional API | MCP |
|--------|----------------|-----|
| **Integration** | Hard-coded for each API | Generic protocol |
| **Discovery** | Manual documentation | Self-describing tools |
| **Flexibility** | Fixed workflows | LLM decides when to use tools |
| **Maintenance** | Update code for API changes | Update tool definitions |
| **Composability** | Limited | LLM can chain tools |

## Available MCP Servers

Popular community servers you can use:

- **@modelcontextprotocol/server-filesystem** - File operations
- **@modelcontextprotocol/server-github** - GitHub integration
- **@modelcontextprotocol/server-postgres** - PostgreSQL queries
- **@modelcontextprotocol/server-slack** - Slack messaging
- **@modelcontextprotocol/server-google-drive** - Google Drive access

Install and configure in Claude Desktop or your own client.

## Building MCP Clients

For advanced use cases, build your own client:

```javascript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'node',
  args: ['./server.js']
});

const client = new Client({
  name: 'my-client',
  version: '1.0.0'
}, {
  capabilities: {}
});

await client.connect(transport);

// List available tools
const { tools } = await client.listTools();

// Call a tool
const result = await client.callTool({
  name: 'add',
  arguments: { a: 5, b: 3 }
});

console.log(result); // { content: [{ type: 'text', text: 'Result: 8' }] }
```

## Next Steps

- **Try the MCP Lab example** in `/examples/mcp-lab`
- **Explore official servers** on [MCP GitHub](https://github.com/modelcontextprotocol)
- **Read the spec** at [Model Context Protocol Specification](https://spec.modelcontextprotocol.io/)
- **Build your own server** for your application's domain

## Integration with Other Concepts

- **LLM** - MCP gives LLMs new capabilities beyond text generation
- **Agent** - MCP tools enable autonomous agent workflows
- **RAG** - MCP can expose vector databases as resources
- **Prompt Engineering** - MCP reduces need for complex prompts

MCP is the **glue** that connects LLMs to the real world. Master it to build powerful AI applications.

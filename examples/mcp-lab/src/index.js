#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

/**
 * Step 1: Initialize the Server
 * We give it a name and version. This identifies the server to the host (Gemini CLI).
 */
const server = new Server(
  {
    name: "mcp-lab-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {}, // We are providing 'Tools' capability
    },
  }
);

/**
 * Step 2: Define Tool Handlers
 * Ideally, separate these into different files for larger projects.
 */

// Tool 1: A simple calculator
const addTool = {
  name: "add",
  description: "Adds two numbers together",
  inputSchema: {
    type: "object",
    properties: {
      a: { type: "number", description: "The first number" },
      b: { type: "number", description: "The second number" },
    },
    required: ["a", "b"],
  },
};

// Tool 2: Time utility
const timeTool = {
  name: "get_current_time",
  description: "Returns the current time in ISO format",
  inputSchema: {
    type: "object",
    properties: {}, // No input needed
  },
};

/**
 * Step 3: Handle "ListTools" Request
 * The Host (Gemini) asks: "What can you do?"
 * We reply with our list of tools.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [addTool, timeTool],
  };
});

/**
 * Step 4: Handle "CallTool" Request
 * The Host says: "Run tool 'add' with arguments { a: 5, b: 10 }"
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "add") {
      // Validate inputs using Zod (optional but recommended)
      const schema = z.object({
        a: z.number(),
        b: z.number(),
      });
      const { a, b } = schema.parse(args);
      
      // Perform the logic
      const result = a + b;

      // Return the result as text
      return {
        content: [
          {
            type: "text",
            text: `The sum of ${a} and ${b} is ${result}`,
          },
        ],
      };
    }

    if (name === "get_current_time") {
      return {
        content: [
          {
            type: "text",
            text: new Date().toISOString(),
          },
        ],
      };
    }

    // If tool not found
    throw new McpError(
      ErrorCode.MethodNotFound,
      `Unknown tool: ${name}`
    );
  } catch (error) {
    // Graceful error handling
    if (error instanceof z.ZodError) {
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid arguments: ${error.errors.map(e => e.message).join(", ")}`
      );
    }
    throw error;
  }
});

/**
 * Step 5: Start the Transport
 * We use Stdio (Standard Input/Output) to talk to the CLI.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
    // 重要提示：在 Stdio 模式下，必须使用 console.error 而不是 console.log 进行调试
  // 因为 stdout 被用于 MCP 协议通信，任何额外的输出都会破坏协议格式。
  console.error("MCP Lab Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});

#!/usr/bin/env node

/**
 * MCP Lab Example Server
 * 
 * 这个示例展示了如何构建一个基础的 MCP Server。
 * 遵循 Google 技术写作指南中的“代码即文档”原则，
 * 我们在关键逻辑处添加了详细注释。
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ErrorCode,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

/**
 * 1. 初始化 Server 实例
 * name: 客户端显示的名称
 * version: 语义化版本号
 */
const server = new Server(
  {
    name: "mcp-lab-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {}, // 声明本服务器具备“工具调用”能力集
    },
  }
);

/**
 * 2. 注册工具列表
 * 当 AI 客户端连接时，它会调用此接口了解服务器有哪些功能。
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "add",
        description: "计算两个数字的和",
        inputSchema: {
          type: "object",
          properties: {
            a: { type: "number", description: "第一个加数" },
            b: { type: "number", description: "第二个加数" },
          },
          required: ["a", "b"],
        },
      },
      {
        name: "get_current_time",
        description: "获取服务器当前的系统时间",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

/**
 * 3. 处理工具调用逻辑
 * 当 AI 决定使用某个工具时，会发送请求到这里。
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "add": {
        // 使用 Zod 进行参数校验（推荐实践）
        const schema = z.object({
          a: z.number(),
          b: z.number(),
        });
        const { a, b } = schema.parse(args);
        
        const result = a + b;
        return {
          content: [{ type: "text", text: `计算结果是: ${result}` }],
        };
      }

      case "get_current_time": {
        const now = new Date().toLocaleString();
        return {
          content: [{ type: "text", text: `当前服务器时间: ${now}` }],
        };
      }

      default:
        // 如果 AI 请求了不存在的工具，返回标准错误
        throw new McpError(
          ErrorCode.MethodNotFound,
          `未找到工具: ${name}`
        );
    }
  } catch (error) {
    // 统一错误处理与日志记录
    // 注意：在 Stdio 模式下，必须使用 console.error 而不是 console.log 进行调试
    console.error("[MCP Error]", error); 
    
    if (error instanceof z.ZodError) {
      return {
        isError: true,
        content: [{ type: "text", text: `参数错误: ${error.errors.map(e => e.message).join(", ")}` }],
      };
    }
    
    return {
      isError: true,
      content: [{ type: "text", text: `执行失败: ${error.message}` }],
    };
  }
});

/**
 * 4. 启动服务器 (Stdio 传输模式)
 * 注意：在 Stdio 模式下，不要使用 console.log 输出非协议数据。
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Lab Server 已启动 (Stdio 模式)");
}

main().catch((error) => {
  console.error("启动失败:", error);
  process.exit(1);
});

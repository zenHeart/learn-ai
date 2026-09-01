#!/usr/bin/env node

/**
 * MCP Lab Example Server
 * 
 * 这是一个教学级的 MCP Server 示例。
 * 涵盖了从基础计算到文件系统交互的典型场景。
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
import fs from "fs/promises";
import path from "path";

/**
 * 1. 初始化 Server
 */
const server = new Server(
  {
    name: "mcp-lab-server",
    version: "1.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * 2. 定义工具列表
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
            a: { type: "number" },
            b: { type: "number" },
          },
          required: ["a", "b"],
        },
      },
      {
        name: "read_file_summary",
        description:
          "读取指定文件的内容摘要（前100个字符）。只允许访问 ALLOWED_ROOT 内的文件。",
        inputSchema: {
          type: "object",
          properties: {
            filePath: { type: "string", description: "允许范围内的文件路径" },
          },
          required: ["filePath"],
        },
      },
    ],
  };
});

/**
 * 3. 实现工具逻辑
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "add": {
        const schema = z.object({ a: z.number(), b: z.number() });
        const { a, b } = schema.parse(args);
        return {
          content: [{ type: "text", text: `结果: ${a + b}` }],
        };
      }

      case "read_file_summary": {
        const schema = z.object({ filePath: z.string() });
        const { filePath } = schema.parse(args);

        // 安全边界（Issue #116 P0 教训）：一个被 Host 调用的 MCP server 等于
        // 把文件系统的一部分暴露给不可信输入。没有 root allowlist 时，
        // 模型（或注入攻击者）可以用绝对路径读取 ~/.ssh、.env 等任意文件。
        // 规则：默认只允许访问本示例的 fixture 工作区；显式拒绝越界路径。
        const ALLOWED_ROOT = path.resolve(
          process.env.MCP_LAB_ALLOWED_ROOT || path.join(process.cwd(), "workspace")
        );
        const resolved = path.resolve(filePath);

        const insideRoot =
          resolved === ALLOWED_ROOT || resolved.startsWith(ALLOWED_ROOT + path.sep);
        if (!insideRoot) {
          return {
            isError: true,
            content: [
              {
                type: "text",
                text: `拒绝访问：路径 "${filePath}" 超出允许范围 ${ALLOWED_ROOT}。` +
                  `可设置 MCP_LAB_ALLOWED_ROOT 环境变量显式指定根目录。`,
              },
            ],
          };
        }

        try {
          const content = await fs.readFile(resolved, "utf-8");
          const summary = content.slice(0, 100) + (content.length > 100 ? "..." : "");
          return {
            content: [{ type: "text", text: `文件摘要:\n${summary}` }],
          };
        } catch (err) {
          return {
            isError: true,
            content: [{ type: "text", text: `读取失败: ${err.message}` }],
          };
        }
      }

      default:
        throw new McpError(ErrorCode.MethodNotFound, `未知工具: ${name}`);
    }
  } catch (error) {
    console.error("[MCP Error]", error);
    if (error instanceof z.ZodError) {
      return {
        isError: true,
        content: [{ type: "text", text: `参数错误: ${error.errors.map(e => e.message).join(", ")}` }],
      };
    }
    throw error;
  }
});

/**
 * 4. 启动传输
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Lab Server 已启动");
}

main().catch((error) => {
  console.error("致命错误:", error);
  process.exit(1);
});

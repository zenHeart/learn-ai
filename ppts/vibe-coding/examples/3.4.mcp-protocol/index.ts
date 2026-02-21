/**
 * 这个文件演示 Model Context Protocol (MCP) 客户端与服务端的核心通信机制。
 * MCP 本质上是一套基于 JSON-RPC 的双向通信协议，用于将大模型 (客户端) 与本地或远程的工具/数据源 (服务端) 断开解耦。
 */

// 1. 模拟一个非常简单的 MCP Server (例如: 专门读取 Jira 数据库的服务)
class MockJiraMcpServer {
  private db = {
    "JIRA-1001": "用户反馈登录按钮在暗色模式下不可见",
    "JIRA-1002": "需要将首页 Loading 动画改成渐隐效果",
  };

  // 接收 JSON-RPC 请求
  public handleRequest(request: string): string {
    try {
      const req = JSON.parse(request);
      console.log(`\n  [🖥️ MCP Server] 收到 JSON-RPC 请求:`, req);

      // 处理不同的协议标准方法
      if (req.method === "Initialize") {
        return JSON.stringify({
          jsonrpc: "2.0",
          id: req.id,
          result: {
            protocolVersion: "1.0",
            capabilities: {
              resources: { listChanged: false },
              tools: { listChanged: false },
            },
            serverInfo: {
              name: "Mock-Jira-Server",
              version: "1.0.0",
            },
          },
        });
      } else if (req.method === "tools/list") {
        return JSON.stringify({
          jsonrpc: "2.0",
          id: req.id,
          result: {
            tools: [
              {
                name: "get_jira_ticket",
                description: "获取 Jira ticket 的详细内容",
                inputSchema: {
                  type: "object",
                  properties: { ticketId: { type: "string" } },
                  required: ["ticketId"],
                },
              },
            ],
          },
        });
      } else if (req.method === "tools/call") {
        const ticketId = req.params?.arguments?.ticketId;
        const content =
          this.db[ticketId as keyof typeof this.db] || "Ticket not found";
        return JSON.stringify({
          jsonrpc: "2.0",
          id: req.id,
          result: {
            content: [{ type: "text", text: content }],
            isError: content === "Ticket not found",
          },
        });
      }

      throw new Error("Method not found");
    } catch (e) {
      return JSON.stringify({
        jsonrpc: "2.0",
        error: { code: -32601, message: "Method not found" },
      });
    }
  }
}

// 2. 模拟 LLM Client (例如 Cursor IDE 中的 Agent)
class MockMcpClient {
  private server = new MockJiraMcpServer();
  private requestId = 1;

  private sendRequest(method: string, params?: any) {
    const req = {
      jsonrpc: "2.0",
      id: this.requestId++,
      method,
      params,
    };
    // 真实情况是通过 stdio 或 SSE 网络传输
    const reqString = JSON.stringify(req);
    const resString = this.server.handleRequest(reqString);
    return JSON.parse(resString);
  }

  public async connectAndWork() {
    console.log("🚀 MCP Protocol 极简通信演示\n");

    console.log("➡️ 第一步: 客户端发起 Initialize 握手");
    const initRes = this.sendRequest("Initialize");
    console.log(
      `  [🤖 MCP Client] 成功连接至 Server: ${initRes.result.serverInfo.name}\n`,
    );

    console.log("➡️ 第二步: 客户端拉取服务端提供的能力 (List Tools)");
    const toolsRes = this.sendRequest("tools/list");
    console.log(
      `  [🤖 MCP Client] 发现工具: ${toolsRes.result.tools[0].name}\n`,
    );

    console.log(
      "➡️ 第三步: 客户端(Agent)收到用户需求，决定调用 Server 的工具查询 JIRA-1002",
    );
    const callRes = this.sendRequest("tools/call", {
      name: "get_jira_ticket",
      arguments: { ticketId: "JIRA-1002" },
    });
    console.log(
      `  [🤖 MCP Client] 获取到的数据: ${callRes.result.content[0].text}`,
    );

    console.log(
      "\n🤖 Agent 最后总结: 了解，根据 JIRA-1002 的描述，我将为您修改首页的 Loading 动画。",
    );
  }
}

// 运行演示
const client = new MockMcpClient();
client.connectAndWork();

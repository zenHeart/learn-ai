# MCP Apps — 交互式 UI 能力扩展

> 官方 MCP 扩展，让工具返回丰富的交互界面（仪表盘、表单、可视化等）

**官方文档**: https://apps.extensions.modelcontextprotocol.io

## 核心概念

MCP Apps 是 MCP 的第一个官方扩展，允许工具返回交互式 UI 组件，直接在对话中渲染。

### 解决的问题

传统 MCP 工具只返回文本，用户想要"筛选""排序""深入查看某条记录"时，需要反复 prompt。效率低，体验差。

MCP Apps 填补了这个空白：模型保持参与对话，UI 处理文本无法表达的部分（实时更新、媒体查看、持久状态）。

## 典型应用场景

| 场景 | 描述 |
|------|------|
| 数据探索 | 销售分析工具返回交互仪表盘，用户按区域筛选、钻取账户 |
| 配置向导 | 部署工具显示依赖字段表单，选"生产"显示安全选项 |
| 文档审查 | 合同分析工具内嵌 PDF，高亮条款，用户点击审批或标记 |
| 实时监控 | 服务器健康工具展示实时指标，系统变化时自动更新 |

## 技术原理

### 架构：两个关键 MCP 原语

1. **带 UI 元数据的工具** — 工具包含 `_meta.ui.resourceUri` 字段
2. **UI 资源** — 服务器通过 `ui://` 协议提供包含 HTML/JS 的资源

```json
// 工具定义
{
  "name": "visualize_data",
  "description": "可视化数据为交互图表",
  "inputSchema": { /* ... */ },
  "_meta": {
    "ui": {
      "resourceUri": "ui://charts/interactive"
    }
  }
}
```

宿主获取资源，在沙箱 iframe 中渲染，通过 postMessage JSON-RPC 实现双向通信。

## App API

使用 `@modelcontextprotocol/ext-apps` 包：

```typescript
import { App } from "@modelcontextprotocol/ext-apps";

const app = new App();
await app.connect();

// 接收工具结果
app.ontoolresult = (result) => {
  renderChart(result.data);
};

// 从 UI 调用服务器工具
const response = await app.callServerTool({
  name: "fetch_details",
  arguments: { id: "123" },
});

// 更新模型上下文
await app.updateModelContext({
  content: [{ type: "text", text: "User selected option B" }],
});
```

## 安全模型

| 机制 | 说明 |
|------|------|
| iframe 沙箱 | 所有 UI 在受限权限的沙箱 iframe 中运行 |
| 预声明模板 | 宿主可在渲染前审查 HTML 内容 |
| 可审计消息 | 所有 UI→宿主通信通过可记录的 JSON-RPC |
| 用户授权 | 宿主可要求 UI 触发的工具调用必须用户确认 |

## 客户端支持

| 客户端 | 状态 |
|--------|------|
| Claude (Web + Desktop) | 已上线 |
| Goose | 已上线 |
| VS Code Insiders | 已上线 |
| ChatGPT | 本周开始支持 |

## 与 MCP-UI 的关系

MCP Apps 建立在 [MCP-UI](https://mcpui.dev/) 和 [OpenAI Apps SDK](https://developers.openai.com/apps-sdk/) 的工作基础上。若已使用 MCP-UI，可继续使用，迁移到官方扩展也很简单。

## 相关资源

- [官方快速开始](https://apps.extensions.modelcontextprotocol.io/api/documents/Quickstart.html)
- [@modelcontextprotocol/ext-apps npm 包](https://www.npmjs.com/package/@modelcontextprotocol/ext-apps)
- [MCP Apps GitHub 仓库](https://github.com/modelcontextprotocol/apps)

# Model Context Protocol (MCP) 全流程实战指南

本指南将带你走完从**初次使用**到**发布上线**的 MCP 全生命周期。

---

## 1. 快速接入 (使用)

### 1.1 在 Claude Desktop 中接入
修改配置文件（macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`）：
```json
{
  "mcpServers": {
    "mcp-lab": {
      "command": "node",
      "args": ["/你的绝对路径/src/index.js"]
    }
  }
}
```

### 1.2 在 Cursor 中接入
1. 打开 `Settings -> Models -> MCP`。
2. 点击 `+ Add New MCP Server`。
3. **Name**: `mcp-lab` | **Type**: `command` | **Command**: `node /你的绝对路径/src/index.js`。

### 1.3 在 Gemini CLI 中接入
创建一个 `gemini-extension.json`：
```json
{
  "mcpServers": {
    "mcp-lab": {
      "command": "node",
      "args": ["/你的绝对路径/src/index.js"]
    }
  }
}
```

---

## 2. 调试定位 (排障)

### 2.1 使用 MCP Inspector (推荐)
这是最快的调试方式，无需启动任何 AI 软件：
```bash
npx @modelcontextprotocol/inspector node src/index.js
```
- **操作**：在打开的网页中点击 `List Tools`，确保能看到 `add` 和 `read_file_summary`。
- **验证**：点击 `Call Tool`，输入参数测试逻辑。

### 2.2 常见卡点
- **路径问题**：配置文件中必须使用**绝对路径**。
- **输出污染**：代码中绝对不能有 `console.log`，请统一使用 `console.error`。

---

## 3. 自定义开发 (创造)

### 3.1 示例代码解析 (`src/index.js`)
我们提供了一个包含文件读取能力的示例：
- **工具 A (`add`)**：基础数学运算。
- **工具 B (`read_file_summary`)**：实用的文件系统交互。

### 3.2 动手练习
尝试在 `src/index.js` 中添加一个 `get_weather` 工具：
1. 在 `ListToolsRequestSchema` 回调中添加定义。
2. 在 `CallToolRequestSchema` 回调中添加 `switch` 分支实现逻辑。

---

## 4. 发布与分发 (上线)

### 4.1 准备发布
确保 `package.json` 中包含 `bin` 字段：
```json
"bin": {
  "mcp-lab-server": "./src/index.js"
}
```

### 4.2 发布到 npm
1. 登录：`npm login`。
2. 发布：`npm publish`。
3. **用户安装**：用户只需运行 `npm install -g mcp-lab`，然后在配置中使用 `mcp-lab-server` 命令即可。

### 4.3 接入注册表
将你的 Server 提交到 [Smithery.ai](https://smithery.ai/)，让全球开发者都能发现并一键安装你的工具。

---

## 5. 延伸阅读
- [MCP 官方文档](https://modelcontextprotocol.io/)
- [官方示例库](https://github.com/modelcontextprotocol/servers)

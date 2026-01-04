# 🧪 MCP Lab: The Ultimate Beginner's Guide to Model Context Protocol

Welcome to **MCP Lab**! This is your interactive playground and comprehensive guide to mastering the **Model Context Protocol (MCP)**.

If you are new to AI development, think of MCP as the **USB standard for AI models**. Just as USB lets you plug any mouse into any computer, MCP lets you plug any data source or tool (server) into any AI application (host/client).

---

## 📚 Table of Contents

1.  [**Part 1: The Core Concepts**](#part-1-the-core-concepts) - What is MCP and how does it work?
2.  [**Part 2: The Architecture**](#part-2-the-architecture) - Servers, Hosts, and Clients explained.
3.  [**Part 3: Build Your First MCP Server**](#part-3-build-your-first-mcp-server) - A step-by-step code tutorial.
4.  [**Part 4: Connect to Gemini CLI**](#part-4-connect-to-gemini-cli) - Running your server in the terminal.
5.  [**Part 5: Connect to Claude Desktop**](#part-5-connect-to-claude-desktop) - Using your server with a GUI.
6.  [**Part 6: Advanced Concepts**](#part-6-advanced-concepts) - Resources, Prompts, and Transports.

---

## Part 1: The Core Concepts

**Problem:** AI models (like Gemini, Claude, GPT) are trapped in a box. They can't access your local files, your private database, or your company's internal API.
**Old Solution:** Write custom integration code for *every* specific AI app you use.
**MCP Solution:** Build a standard "MCP Server" once. *Any* MCP-compliant AI app (Host) can now use it.

### Key Capabilities
An MCP Server can provide three things to an AI:
1.  **Tools 🛠️**: Executable functions. The AI says "Call tool `add` with arguments `a=5, b=10`", and the server runs it and returns `15`. (e.g., Calculator, Database Query, File Delete).
2.  **Resources 📄**: Data reading. The AI asks "Read resource `file://logs/error.txt`", and the server returns the content. (e.g., File System, API Fetch).
3.  **Prompts 💬**: Pre-defined templates. The AI requests "Get prompt `debug-error`", and the server returns a structured message template to help the user.

---

## Part 2: The Architecture

The MCP ecosystem has three main players:

1.  **MCP Host (The Client/AI App)**
    *   **Examples:** Gemini CLI, Claude Desktop, Cursor (future), VScode (via extensions).
    *   **Role:** The "Boss". It runs the AI model, decides *when* to call a tool, and displays the results to you.
    *   **Action:** It *connects* to your server.

2.  **MCP Server (The Tool Provider)**
    *   **Examples:** This `mcp-lab` project, a `postgres-mcp` server, a `google-drive-mcp` server.
    *   **Role:** The "Worker". It sits there waiting for commands. It knows how to *do* things (add numbers, query DBs).
    *   **Action:** It *listens* for requests.

3.  **Transport (The Cable)**
    *   **Stdio (Standard Input/Output):** The server runs as a subprocess. The Host talks to it via `stdin` and reads from `stdout`. Best for local tools.
    *   **SSE (Server-Sent Events):** Over HTTP. Good for remote servers.

---

## Part 3: Build Your First MCP Server

We have built a simple Javascript-based MCP server in this repo. Let's dissect it.

### 1. Project Setup
We use modern JavaScript (ESM).
*   **`package.json`**: Note `"type": "module"`. We depend on `@modelcontextprotocol/sdk` and `zod` (for validation).

### 2. The Code (`src/index.js`)

**A. Initialization**
We create a server instance and tell it we support `tools`.
```javascript
const server = new Server(
  { name: "mcp-lab-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);
```

**B. Defining Tools**
We define the *shape* of our tool so the AI knows how to use it.
```javascript
const addTool = {
  name: "add",
  description: "Adds two numbers",
  inputSchema: {
    type: "object",
    properties: {
      a: { type: "number" },
      b: { type: "number" }
    },
    required: ["a", "b"]
  }
};
```

**C. Handling Lists**
When the AI connects, it asks "ListTools". We reply:
```javascript
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: [addTool] };
});
```

**D. Handling Calls**
When the AI wants to *run* the tool:
```javascript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "add") {
    const { a, b } = request.params.arguments;
    return { content: [{ type: "text", text: String(a + b) }] };
  }
});
```

**E. Connecting**
We connect via `stdio`.
```javascript
const transport = new StdioServerTransport();
await server.connect(transport);
```

---

## Part 4: Connect to Gemini CLI

Gemini CLI has a built-in "Extension" system that makes installing MCP servers easy.

### Prerequisites
*   Node.js (v18+)
*   pnpm (or npm)

### Installation Steps
1.  **Install Dependencies:**
    ```bash
    cd examples/mcp-lab
    pnpm install
    ```

2.  **Install Extension:**
    Run this command from inside the `mcp-lab` folder:
    ```bash
    gemini extensions install .
    ```
    *This tells Gemini to look at `gemini-extension.json` in the current directory and register the server.*

3.  **Test It:**
    Run `gemini doctor` to see if it's active.
    Then ask Gemini:
    > "Calculate 50 + 32 using the mcp-lab tools"

---

## Part 5: Connect to Claude Desktop

Claude Desktop (macOS/Windows) can also use this *exact same server*.

1.  **Locate Config:** Open `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows).
2.  **Edit Config:** Add your server to the `mcpServers` object. You need the **absolute path** to your project.

```json
{
  "mcpServers": {
    "mcp-lab": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/learn-ai/examples/mcp-lab/src/index.js"]
    }
  }
}
```
3.  **Restart Claude:** Fully quit and restart the app.
4.  **Test:** Look for the 🔌 icon. You should see "mcp-lab" connected. Ask Claude "What tools do you have?" or "Add 100 and 200".

---

## Part 6: Advanced Concepts

### Resources vs Tools
*   **Use Tools when:** You need to perform an action (write file, API POST) or calculate something dynamically.
*   **Use Resources when:** You want to expose static data or data that can be read like a file (logs, database rows, API GET).

### Prompt Templates
You can hardcode "Prompts" in your server. This is useful for complex tasks.
*   *Example:* A "Code Review" prompt that automatically loads specific style guide resources and asks the AI to review the user's code against them.

### Debugging
*   **Stdio:** Since `stdout` is used for protocol communication, **NEVER** use `console.log()` for debugging. It will break the protocol JSON.
*   **Use `console.error()`:** This stream is safe. You can watch it in the Gemini CLI logs or Claude logs.

---

## 🚀 Ready to Code?

Go open `src/index.js` and try adding a new tool! Maybe a `subtract` tool, or a tool that fetches a joke?

Happy Building!
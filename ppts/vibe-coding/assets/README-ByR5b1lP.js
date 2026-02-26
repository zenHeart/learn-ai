const n=`# 4.3 疑难 Bug 定位与修复

**一句话核心**：本示例通过「启动服务触发报错 → 把完整堆栈复制给 AI → AI 跨文件定位并修复」演示**用 AI 做疑难 Bug 排查**，你将学会把终端报错当作最强 Prompt，让 AI 自动读源码、找根因并给出修复。

---

## 1. 概念简述

复杂系统中 Bug 往往横跨 Controller、Service、Utils 等多层，单看日志难以立刻定位。在 Cursor/Claude Code 下，标准 SOP 变为：**把完整报错与堆栈扔给 AI** → AI 根据堆栈中的路径自动在项目里 grep、读文件，找到出错方法与上下游 → **给出根因与修复 Diff**（如可选链、防空）。大模型擅长在“噪音”中抓关键线索，Agent 能自动寻址读相关代码，省去人工反复切文件、搜索的时间。

---

## 2. 前置条件

- 已安装 **Node.js 18+** 以及 **Cursor** 或 **Claude Code**。
- 请以 **\`ppts/vibe-coding/examples\`** 为工作区根目录（或确保 AI 能访问 \`4.3.bug-fix\` 下的源码）。

---

## 3. 操作步骤

### 步骤 A：启动服务，触发“红色”报错（必须）

1. 打开终端，进入：\`cd /path/to/learn-ai/ppts/vibe-coding/examples\`。
2. 执行：\`npm run demo:4.3\`
3. **预期结果**：服务启动后终端会抛出一段**红色堆栈报错**，例如 \`TypeError: Cannot read properties of undefined (reading 'map')\`。**不要手动去代码里找文件**，保持报错在终端中，进入下一步。

### 步骤 B：把报错交给 AI 定位与修复（Cursor）

1. 用鼠标**全选**终端中的报错（从 \`TypeError\` 到堆栈最后一行），复制。
2. 在 Cursor 中打开 **Chat** 或 **Composer**，粘贴报错，并附加一句 Prompt（可直接复制）：
   \`\`\`text
   看了下终端的报错，帮忙查一下原因并给出修复。
   \`\`\`
3. **预期结果**：AI 会根据堆栈路径（如 \`src/utils/transformers.ts\`）**自动跨文件读取**相关源码，分析出根因（例如上游返回 \`{error: 'Service Unavailable'}\` 导致 \`payload.data\` 为 \`undefined\`），并修改 \`transformers.ts\`，加入 \`payload?.data?.map\` 等安全判空。

### 步骤 C：把报错交给 AI 定位与修复（Claude Code）

1. 在终端执行：\`claude\`。
2. 粘贴步骤 A 中复制的**完整报错堆栈**，并附加（可直接复制）：
   \`\`\`text
   看了下终端的报错，帮忙查一下原因并给出修复。
   \`\`\`
3. **预期结果**：与步骤 B 相同，Claude 会跨文件分析并给出修复。

### 步骤 D：验证修复

1. 再次执行：\`npm run demo:4.3\`
2. **预期结果**：服务正常启动，不再抛出该 TypeError；若有接口可请求，可再手动验证业务行为。

---

## 4. 本示例涉及的文件

| 文件/目录 | 说明 |
|-----------|------|
| \`4.3.bug-fix/server.ts\` | 服务入口，启动后会触发对 \`transformers\` 的调用 |
| \`4.3.bug-fix/src/utils/transformers.ts\` | 报错发生处，需由 AI 增加防空与可选链等修复 |

---

## 5. 核心要点

- **堆栈 + 终端报错**是 AI 定位问题的强信号；复制完整堆栈比口头描述更高效。
- AI 能自动根据路径**跨文件读取**并串联调用链，具备“大海捞针”式的排查能力。
- 人工只需：复现 Bug → 复制报错 → 验收 AI 的修复与回归。

---

## 6. 延伸阅读

- **概念延伸**：与 MCP 结合可对接 Sentry、Kibana 等日志源；Cursor BugBot 可进一步带入运行时上下文做调试。
- **官方文档**：  
  - Cursor：[BugBot](https://cursor.com/docs/bugbot)、[Composer / Agent](https://cursor.com/docs/agent/overview)  
  - Claude Code：[终端与工具调用](https://code.claude.com/docs/en/overview)
- **本课程材料**：可结合 \`ppts/vibe-coding/04.practice.md\` 中「实战场景 3：疑难 Bug」与 \`tool-feature.md\` 做扩展阅读。  
- **详细演示话术**：本目录下的 \`prompt.md\` 提供现场演示用的分步话术。
`;export{n as default};

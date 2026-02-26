const n=`# 4.1 新项目冷启动 (Cold Start)

**一句话核心**：本示例通过「在 Cursor/Claude 中用自然语言描述技术栈与需求」演示 **Agent 从 0 到 1 生成脚手架**，你将学会如何设定边界、让 AI 搭建目录与依赖，人类只做架构师与验收。

---

## 1. 概念简述

传统新项目要手写 boilerplate、查文档、配各种 config。在 Vibe Coding 中，通过**多模态意图注入**（一段 Prompt + 可选草图）：具备文件读写权限的 Agent 可在几分钟内创建目录、安装依赖、配置脚手架并写出第一个可运行版本。人类从“搬砖”变为“定边界、做验收”；你只需明确“用 X 框架、Y 规范”，执行交给 Agent。

---

## 2. 前置条件

- 已安装 **Cursor** 或 **Claude Code**，并以 **\`ppts/vibe-coding/examples\`** 或 **\`examples/4.1.cold-start\`** 为工作区根目录打开。
- 本示例**主要体验**在 IDE/CLI 中用自然语言驱动 Agent 生成项目；\`npm run demo:4.1\` 为辅助脚本（若有）。

---

## 3. 操作步骤

### 步骤 A：运行脚本（可选）

1. 打开终端，进入：\`cd /path/to/learn-ai/ppts/vibe-coding/examples\`。
2. 执行：\`npm run demo:4.1\`
3. **预期结果**：终端输出与冷启动、脚手架或意图解析相关的说明（若有）；完整“生成项目”的体验在步骤 B/C。

### 步骤 B：在 Cursor 中体验冷启动（可选）

1. 用 Cursor 以 **\`ppts/vibe-coding/examples\`** 为工作区根目录打开。
2. 打开 **Composer**（\`Cmd+I\`），选择 **Agent 模式**，输入意图与边界（可直接复制后按需改）：
   \`\`\`text
   在当前目录下创建一个新的前端子项目：使用 Vue 3 + Vite + TypeScript + TailwindCSS，包含一个首页和 About 页，带路由；不要安装后端依赖，只要前端脚手架。
   \`\`\`
3. **预期结果**：AI 会创建子目录、\`package.json\`、Vite 配置、路由与基础组件，并可能运行 \`npm install\`；你只需检查结构是否符合预期并做小幅修正。

### 步骤 C：在 Claude Code 中（可选）

1. 在终端进入 \`examples\` 或 \`examples/4.1.cold-start\`，执行：\`claude\`。
2. 输入与步骤 B 类似的 Prompt（可直接复制并修改）：
   \`\`\`text
   在 4.1.cold-start 下用 Vue 3 + Vite + TypeScript + TailwindCSS 搭一个最小前端项目，包含首页和 About 页与路由。
   \`\`\`
3. **预期结果**：Claude 会生成目录与文件并安装依赖，你验收后可按需继续迭代。

---

## 4. 本示例涉及的文件

| 文件/目录 | 说明 |
|-----------|------|
| \`4.1.cold-start/index.ts\` | 演示脚本入口（若有） |

---

## 5. 核心要点

- **Agentic 流程**能把“搭框架”从几小时压到几分钟；人类负责**给边界、给框架**，Agent 负责**落地填肉**。
- 不要在初始 Prompt 里写过多细节；先**0→1 跑起来**，再**1→100 迭代**。
- 在 Prompt 或 \`.cursor/rules\` 中明确技术栈（如 Vue3 + Vite + TailwindCSS），可减少 AI 乱猜。

---

## 6. 延伸阅读

- **概念延伸**：冷启动与 04 实战中的“约束限制”“人工验证”结合，形成完整 Design → Plan → Implement → Review 流程。
- **官方文档**：  
  - Cursor：[Composer / Agent](https://cursor.com/docs/agent/overview)  
  - Claude Code：[项目生成与工作流](https://code.claude.com/docs/en/overview)
- **本课程材料**：可结合 \`ppts/vibe-coding/tool-feature.md\` 与 04.practice 中的「实战场景 1」做扩展阅读。
`;export{n as default};

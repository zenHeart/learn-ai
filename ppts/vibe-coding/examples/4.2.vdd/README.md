# 4.2 验证驱动开发 (VDD)

**一句话核心**：本示例通过「先写测试 → 运行得到红色报错 → 把报错交给 AI 修复 → 再跑变绿」演示 **VDD（验证驱动开发）**，你将学会把测试当作最严谨的 Prompt，用 Red→AI→Green 闭环高效开发。

---

## 1. 概念简述

以前 TDD 难推行是因为写测试太累。在 Vibe Coding 中，**VDD（Verification-Driven Development）** 把**测试代码当作最严谨的 Prompt**：你先写出会失败的断言（Red），运行后把真实报错与堆栈交给 AI，AI 根据终端输出定位并修改代码，直到测试变绿（Green）。报错对 AI 来说是无歧义的精炼输入，编写测试的心智负担也可交给 AI，测试逐渐成为验收交付标准。

---

## 2. 前置条件

- 已安装 **Node.js 18+** 以及 **Cursor** 或 **Claude Code**。
- 操作前请进入 `ppts/vibe-coding/examples` 并确保已执行 `npm install`（若需）。

---

## 3. 操作步骤

### 步骤 A：先运行测试，得到“红色”报错（必须）

1. 打开终端，进入示例根目录：`cd /path/to/learn-ai/ppts/vibe-coding/examples`。
2. 执行：`npm run demo:4.2`
3. **预期结果**：终端输出**红色的测试失败信息**（因 `throttle.ts` 未实现 `trailing` 逻辑和 `this` 绑定，部分用例会失败）。**不要自己改代码**，保持“红”状态进入下一步。

### 步骤 B：把报错交给 AI 修复（Cursor）

1. 用鼠标**全选**终端中的报错内容（从第一行报错到堆栈末尾），复制。
2. 在 Cursor 中打开 **Chat** 侧边栏，粘贴刚才的报错，并附加一句 Prompt（可直接复制）：
   ```text
   修复 4.2.vdd/throttle.ts 里的 bug 以让测试通过。
   ```
3. **预期结果**：AI 会根据堆栈定位到 `trailing` 参数与 `this` 绑定问题，并修改 `4.2.vdd/throttle.ts`，使实现满足测试。

### 步骤 C：把报错交给 AI 修复（Claude Code）

1. 在终端执行：`claude`。
2. 将步骤 A 中复制的**完整报错堆栈**粘贴到对话中，并附加（可直接复制）：
   ```text
   修复 4.2.vdd/throttle.ts 里的 bug 以让测试通过。
   ```
3. **预期结果**：同上，Claude 会修改 `throttle.ts` 直至测试通过。

### 步骤 D：再次运行测试，确认“绿色”

1. 在 `examples` 根目录再次执行：`npm run demo:4.2`
2. **预期结果**：所有测试变为**绿色 ✅**，完成 VDD 闭环。

---

## 4. 本示例涉及的文件

| 文件/目录 | 说明 |
|-----------|------|
| `4.2.vdd/throttle.ts` | 被测试的业务代码（需由 AI 修复） |
| `4.2.vdd/throttle.test.ts` | 测试用例，定义需求与边界（Red 的来源） |

---

## 5. 核心要点

- **报错和堆栈**是对 AI 来说没有歧义的、最精炼的 Prompt。
- 流程固定为：写测试（Red）→ 运行失败 → 复制报错给 AI → AI 修代码 → 再跑（Green）。
- 测试编写也可交给 AI，测试逐渐成为验收交付标准；人类负责定义“要什么”，AI 负责“实现到过测”。

---

## 6. 延伸阅读

- **概念延伸**：VDD 与 4.3 Bug 修复都依赖“把运行时反馈交给 AI”；可结合 Cursor BugBot、Claude 的终端集成做更深调试流程。
- **官方文档**：  
  - Cursor：[Composer / Agent](https://cursor.com/docs/agent/overview)、[BugBot](https://cursor.com/docs/bugbot)  
  - Claude Code：[终端与工具调用](https://code.claude.com/docs/en/overview)
- **本课程材料**：可结合 `ppts/vibe-coding/04.practice.md` 中「实战场景 2：VDD」与 `tool-feature.md` 做扩展阅读。  
- **详细演示话术**：本目录下的 `prompt.md` 提供现场演示用的分步话术。

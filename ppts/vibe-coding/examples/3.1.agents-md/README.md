# 3.1 AGENTS.md (项目上下文注入)

## 概念解析

在大型项目中，如何保证团队成员（尤其是新人和 AI）遵守核心架构规约？

传统的做法是在文档中心写一堆开发规范，指望新人去背。在 AI 辅助编程时代，各大工具（如 Cursor、Claude Code）原生支持读取项目内的规则配置，如 `AGENTS.md`、`.cursor/rules/*.mdc` 或 `CLAUDE.md`。

只要该文件存在，不管你当前要求 AI 帮你写什么功能，AI 的底层代理机制都会**静默地将这些项目级规则作为 System Prompt 的一部分优先发给大模型**。它相当于给 AI 置入了一个深层的潜意识。

## 文件说明

| 文件           | 作用                                      |
| -------------- | ----------------------------------------- |
| `AGENTS.md`    | 项目核心规约（TypeScript + dayjs + vitest） |
| `countdown.ts` | 示例代码：使用了原生 Date（不符合规范）     |

## 运行示例

### 场景

`countdown.ts` 中有一个倒计时函数，但存在以下问题：
1. 使用原生 `Date` 对象（违反 AGENTS.md 第2条）
2. 没有类型定义（违反 AGENTS.md 第1条）
3. 没有单元测试（违反 AGENTS.md 第3条）

### Cursor 操作步骤

1. 在 Cursor 中打开本目录
2. 打开 `countdown.ts` 文件
3. 选中全部代码，按 `Cmd+K`（或 `Ctrl+K`）
4. 输入 Prompt：
   > `重构此代码，使其符合项目规范`
5. **观察结果**：
   - AI 会自动引入 `dayjs` 替换 `Date`
   - 自动添加 TypeScript 类型
   - 自动生成对应的 `.test.ts` 文件

### Claude Code 操作步骤

1. 在终端进入本目录
2. 启动 Claude Code：`claude`
3. 输入 Prompt：
   > `重构 countdown.ts 使其符合项目规范，包括添加单元测试`
4. **观察结果**：
   - Claude 读取 `AGENTS.md` 后，会自动使用 dayjs
   - 生成的代码包含完整类型定义
   - 会创建 `countdown.test.ts` 测试文件

## 核心要点

* **Context Engineering（上下文工程）大于纯 Prompt 技巧。**
* 不要指望 AI 每一次都猜对你的架构和库选型，把基调写在文件里，让它成为工作流的第一关。

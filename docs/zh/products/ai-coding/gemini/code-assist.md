# Gemini Code Assist

> Google 的 IDE 集成扩展。家族里唯一以**企业合规**为主要卖点的编码产品。

## 核心定位

自主智能体是趋势，但开发者大量时间仍然在 VS Code 或 JetBrains 里。Code Assist 补的是这一块：不要求你换工具、换工作流，代价是它的上下文边界也就限于编辑器能看到的范围。

支持的 IDE：VS Code、JetBrains 系列、Android Studio。

## 三个版本

官方提供 free / Standard / Enterprise 三个版本。**能力绑在版本上，不绑在你的个人 Google AI 订阅上**——买了个人 AI Pro 不会让 Code Assist 变成企业版。

**2026-06-18 起，面向个人的 free 档以及 Google AI Pro / Ultra 通过「Login with Google」访问 IDE 扩展已停服。** 个人开发者请改用 [Antigravity](./antigravity) 的 IDE / CLI 表面。Standard / Enterprise 许可证不受影响。[官方弃用说明](https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals)。

企业版本的卖点是合规而不是更聪明。官方文档开场就写给"有严格数据安全与合规要求的组织"，明确提供：

- VPC Service Controls
- 知识产权赔偿（IP indemnification）

如果你的团队正因为合规原因不能用其他 AI 编码工具，这是家族里该看的那一个。

模型方面，官方文档标注 Code Assist 使用 Gemini 2.5 模型。

## 核心能力

| 能力 | 说明 |
|---|---|
| 代码补全与生成 | 编辑器内的主要交互形态 |
| 智能体模式 | 能理解代码库上下文并执行多步改动 |
| MCP 支持 | 可以接外部工具 |
| Gemini CLI 额度 | 订阅包含 Gemini CLI 的使用额度 |

> ⚠️ 历史版本文档里出现过这样一段配置：
>
> ```json
> { "codeAssist": { "agentMode": { "enabled": true, "autoApprove": true } } }
> ```
>
> **官方文档里不存在这个 JSON 配置键。** 智能体模式确实存在，但开启方式请以官方文档为准，不要照抄这段。

## 用法要点

### 规范先行

不要抛一个模糊想法就期待完美产出。让它先产出规范，再按规范生成：

```
1. 用对话生成 spec.md
   → 接口约束、Props 定义、状态管理策略、边缘情况

2. 把 spec.md 作为上下文输入

3. 按规范逐步生成代码
```

这么做的实际收益是**防止长对话里的架构漂移**。有一份写下来的规范在上下文里，模型每一步都有锚点；没有的话它会慢慢偏离你最初的意图，而且偏离得很难察觉。

### 配合 Gemini CLI 排错

编辑器里看报错不如把日志直接喂过去：

```bash
npm run build 2>&1 | gemini -p "分析构建错误，给出最小修复"
npx tsc --noEmit 2>&1 | gemini -p "按根因分组这些类型错误"
```

分工是清楚的：**终端里的事交给 [Gemini CLI](./gemini-cli)，编辑器里的事交给 Code Assist。**

## 常见问题：跨仓库时的上下文幻觉

**现象**：生成跨微前端 / 跨服务的逻辑时，它开始编 API 契约。

**原因**：IDE 插件的上下文受限于当前打开的文件和本地索引的工作区。如果你的前端依赖一个没在本地索引的后端仓库里的类型定义，模型看不到，只能猜。

**解决**：

1. 把相关的接口契约和类型定义文件拉进当前工作区
2. 选中这些内容，明确让它纳入上下文

**根本判断**：如果一个任务必须同时理解多个仓库，Code Assist 就不是合适的工具。这种情况该用能自己去读的 [Antigravity](./antigravity)。

## 与其他产品怎么选

完整对比表见 [速查表](./gemini-cheatsheet#antigravity-vs-code-assist-vs-jules)，本页不重复。

按"改动范围"记最简单：

| 范围 | 用 |
|---|---|
| 终端里执行、排错 | [Gemini CLI](./gemini-cli) |
| 编辑器里补全、单文件到局部多文件 | Code Assist |
| 跨模块、需要自己去读代码 | [Antigravity](./antigravity) |
| 丢出去等 PR | [Jules](./jules) |

## 官方资源

- [Code Assist 概览](https://developers.google.com/gemini-code-assist/docs/overview)
- [用 Gemini 写代码](https://developers.google.com/gemini-code-assist/docs/write-code-gemini)
- [产品页](https://codeassist.google)

## 相关页面

- [速查表](./gemini-cheatsheet) — 跨产品决策表
- [Cookbook](./gemini-cookbook#_15-团队有数据合规要求) — 合规场景配方

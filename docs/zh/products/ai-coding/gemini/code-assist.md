# Gemini Code Assist

> Google 提供的 IDE 深度集成扩展，优化编写和审查代码的核心流程。

## 核心定位

虽然自主智能体代表了未来，但开发者仍有大量时间沉浸在 VS Code 或 IntelliJ 等传统的集成开发环境（IDE）中。Code Assist 是这两者之间的桥梁。

## 核心特性

### Agent Mode with Auto Approve

AI Pro 订阅不仅为 Code Assist 提供了高级模型的访问权限，还显著提高了每日请求的配额上限。

最具架构价值的特性是**"带有自动批准的智能体模式"**：
- 理解整个代码库的上下文
- 当开发者请求进行大规模变更时，分析请求并提出多步计划
- 如果开启了自动批准，无需人工确认就能一气呵成执行跨文件重构

```json
// settings.json
{
  "codeAssist": {
    "agentMode": {
      "enabled": true,
      "autoApprove": true,
      "requireSpecConfirmation": false
    }
  }
}
```

## Antigravity vs Code Assist

| 评估维度 | Google Antigravity | Gemini Code Assist |
|---------|-------------------|-------------------|
| 核心定位 | Agent-first 独立开发平台与操作系统 | IDE 扩展插件（VS Code / IntelliJ） |
| 多智能体支持 | 原生支持（作为核心功能，通过规则文件驱动） | 不支持多智能体协同，由单一模型响应 |
| 系统侵入性 | 高（需要完全迁移至新的 IDE 环境，学习成本高） | 低（无缝集成至现有 IDE，学习曲线平滑） |
| 适用场景 | 跨模块全栈系统生成、独立功能模块开发、环境致动 | 单文件逻辑补全、局部多文件重构、实时语法诊断 |

## 规范驱动的同步开发

### 反模式

直接抛出一个模糊的想法并期望生成完美的应用。

### 最佳实践：Specs before code

```
1. 通过 Code Assist 对话生成 spec.md
   → 接口约束、Props 定义、状态管理策略、边缘情况

2. 将 spec.md 作为上下文输入
   → Code Assist 按规范逐步生成组件代码

3. 避免 LLM 在长对话中偏离架构基准
```

## 终端排错集成

结合 Gemini CLI，架构师可以极大优化终端排错流程：

```bash
# Vite 构建错误 → Gemini CLI
npm run build 2>&1 | gemini -p "分析以下构建错误，给出修复命令"

# TypeScript 类型检查爆炸
npx tsc --noEmit 2>&1 | gemini -p "分析以下类型错误"

# Webpack 模块解析失败
npm run build 2>&1 | gemini -p "分析模块解析失败的根因"
```

## 常见问题：上下文幻觉

**问题**：Code Assist 在生成跨微前端模块的逻辑时频繁出现上下文幻觉。

**原因**：IDE 插件的上下文范围通常受限于当前打开的文件或本地索引的工作区。如果前端项目深度依赖于一个尚未在本地索引的后端微服务仓库中的类型定义，模型就会开始猜测 API 契约。

**解决方法**：
1. 将所有相关的接口契约文档和类型定义文件导入到当前工作区
2. 选中这些文本，明确告知 Code Assist 将其纳入推理上下文

## 工具边界决策

| 任务类型 | 推荐工具 |
|---------|---------|
| 命令（执行脚本） | Gemini CLI |
| 编码（补全逻辑） | Code Assist |
| 编排（系统构建） | Antigravity |

## 官方资源

- [Gemini Code Assist](https://codeassist.google)
- [Code Assist 文档](https://developers.google.com/gemini-code-assist/docs/write-code-gemini)

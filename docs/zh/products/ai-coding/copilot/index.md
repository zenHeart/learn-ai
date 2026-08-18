# GitHub Copilot 学习导航

> "Copilot" 在不同语境里指的不是同一个东西：可能是编辑器里的灰字补全，可能是侧边栏的 Chat，可能是终端里的 agent，也可能是 GitHub 网页端替你开 PR 的云端任务。**先分清形态，再决定学什么**——这是本页要解决的第一个问题。

## 它到底是什么

一句话：GitHub Copilot 是一套 **AI 编程辅助产品族**，共享同一个订阅体系，但入口、自主程度、副作用范围完全不同。

关键机制（决定了后面所有优化动作）：Copilot 不是"把你的仓库喂给模型训练"，而是**每次请求时检索并注入上下文**——当前文件、打开的标签页、你显式引用的文件、工具检索结果。所以"仓库大 = Copilot 懂得多"是错的；"打开相关文件再提问"才有效。

## 四种形态怎么选

```
我现在要干什么？
├── 边写边补下一行 / 补样板代码
│   └── → 代码补全（编辑器内，Tab 接受）
├── 要解释一段代码 / 重构 / 改多个文件
│   └── → Chat（侧边栏或行内）
│       ├── 只想搞懂，别动我代码  → Ask 模式
│       ├── 我知道改哪，不想手写  → Edit 模式
│       └── 我只给目标，过程你定  → Agent 模式（本地执行，有副作用）
├── 任务在命令行（脚本、git、构建排错）
│   └── → Copilot CLI（终端 agent，会真的跑命令）
└── 任务边界清楚但耗时，我不想守着
    └── → Cloud agent（GitHub 网页端 / Issue 派活，产出 PR）
```

两个最常见的混淆，先记住：

| 容易混的 | 区别 |
|---------|------|
| Chat 的 **Agent 模式** vs **Cloud agent** | 前者跑在你本地机器上；后者跑在 GitHub 云端，产出是 PR。不是一回事 |
| **独立 Copilot CLI** vs 旧的 **`gh copilot` 扩展** | 前者是完整 agent（`copilot` 命令）；后者官方已标 **retired**，只剩 explain / suggest 的历史形态 |

更多同类辨析（含已改名和已退役的旧概念）见 [术语表](./copilot-glossary)。

## 该读哪一篇

本组文档按 [Diataxis](https://diataxis.fr/) 四象限拆分，各有明确分工——**别拿速查表当教程读**：

| 文档 | 类型 | 什么时候看 |
|------|------|-----------|
| [上手教程](./copilot) | Tutorial | 第一次用，想按顺序走一遍：装 → 登录 → 认识四种界面 → 沉淀项目规范 |
| [实战 Cookbook](./copilot-cookbook) | How-to | 已经会基本操作，想照抄某个场景的现成做法 |
| [Cheatsheet](./copilot-cheatsheet) | Reference | 查快捷键、斜杠命令、配置键名、CLI 参数、计划配额 |
| [术语表](./copilot-glossary) | Explanation | 看到不认识的名词，或怀疑某个说法已经过时 |

## 建议学习路径

**第一阶段：能用起来**

1. 选订阅——有免费档，先跑起来再说（[教程 · 第 0 步](./copilot)）
2. 装扩展并登录，需要终端能力的话另装 CLI（[教程 · 第 1 步](./copilot)）
3. 理解上下文注入机制，这是后面一切优化的前提（[教程 · 第 2 步](./copilot)）

**第二阶段：选对入口**

4. 四种界面各管一段，选错入口是新手最大的效率损失（[教程 · 第 3 步](./copilot)）
5. Ask / Edit / Agent 三档自主程度，形成肌肉记忆（[术语表 · 三种模式](./copilot-glossary)）
6. 用 `@` 和 `#` 显式喂上下文（[Cheatsheet · 聊天参与者](./copilot-cheatsheet)）

**第三阶段：把重复的沉淀下来**

7. 写 `.github/copilot-instructions.md`，同一句话说过三次就该进文件（[Cookbook · 沉淀项目规范](./copilot-cookbook)）
8. 复用提示文件处理成型任务（[Cookbook · 复用提示文件](./copilot-cookbook)）
9. 接 MCP 服务器访问数据库、内部 API（[术语表 · MCP](./copilot-glossary)）

**第四阶段：规模化与安全**

10. 派活给 Cloud agent，学会写边界清楚的任务描述（[Cookbook](./copilot-cookbook)）
11. 建立审查习惯：权限判断、SQL 拼接、加密、支付相关代码永远人工过一遍（[教程 · 第 6 步](./copilot)）

## 时效性提醒

Copilot 迭代很快，旧教程里大量写法已经失效。下面几条是查资料时最容易踩的坑：

- **Copilot Workspace**（GitHub Next 技术预览）**已于 2025-05-30 日落**。「Issue → 计划 → PR」现由 **Cloud agent** 承载。
- **Copilot Extensions（GitHub App 形态）已于 2025-11-10 日落**，官方替代方案是 MCP。VS Code 客户端侧的 Chat 扩展不受影响。
- `@workspace`、`#editor`、`#git`、`#vscodeAPI` 等旧引用**已不在官方清单里**——代码库检索下沉成了工具，Agent 模式自主调用。
- 曾叫 "coding agent" 的云端能力**官方已改称 cloud agent**。
- **`gh copilot`（GitHub CLI 扩展）官方已标 retired**，由独立 `copilot` CLI 取代。
- Copilot **在 GitHub Enterprise Server 上不可用**。Enterprise 需要 GitHub Enterprise Cloud；Business / Enterprise 的额度差见 [Cheatsheet · 计划对照](./copilot-cheatsheet)。

完整的已退役/改名清单见 [术语表 · 已退役或已改名的概念](./copilot-glossary)。

## 资源链接

- [GitHub Copilot 官方文档](https://docs.github.com/en/copilot)
- [VS Code Copilot 文档](https://code.visualstudio.com/docs/copilot/overview)
- [Cheatsheet · 高质量信息源](./copilot-cheatsheet) — 按可信度排序的完整信息源清单，也是本组文档的核实依据

> **取证注意**：`docs.github.com` 中文版覆盖不全且滞后，`docs.github.com/zh/enterprise-cloud@latest/...` 这类路径大量已失效。核对事实统一用 `docs.github.com/en/copilot/...`。

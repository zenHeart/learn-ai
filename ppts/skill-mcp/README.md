# 第三期 · MCP + Skill

> 让 AI 长出手脚（MCP）、形成肌肉记忆（Skill）—— 把团队规范沉淀为可执行的工程资产。

**时长**：45 min · **能力等级**：L5（能力扩展） · **受众**：前端 / 后端 / Android / iOS / C++ 研发

---

## 主轴

承接第二期 `Prompt ⊂ Context ⊂ Harness` 的嵌套乘法：

> Prompt 教 AI 思考 · Context 教 AI 看见 · Harness 教 AI 工作。
>
> **MCP** 决定能力上限（让 AI 能伸手）·
> **Skill** 决定稳定下限（让 AI 会做事）·
> 能力 × 稳定 = 可交付协作者。

---

## 章节结构

| 章节 | 时长 | 屏数 | 核心内容 |
|---|---|---|---|
| `01.overview.md` | ~5 min | 8 | 双轴叙事承接第二期 · 三痛点 · 路线图 · 生态规模 · 钩子 |
| `02.1.mcp-core.md` | ~12 min | 21 | 三方架构 · 两层结构 · **三大原语对照（交互组件）** · Lifecycle · stdio vs Streamable HTTP · TS+Python 最小 Server · 配置 · 安全红线 · 生态 |
| `02.2.skill-core.md` | ~10 min | 14 | SKILL.md 规范 · Frontmatter 六字段 · **Progressive Disclosure（交互组件）** · 触发机制 · 设计三要素 · 决策表 |
| `03.integration.md` | ~8 min | 9 | **决策矩阵（交互组件）** · 范式 1 (Skill 调 MCP) · 范式 2 (MCP 暴露 Prompts) · mcp-builder 元 Skill 闭环 · 三层检查清单 |
| `04.practice.md` | ~8 min | 12 | Demo A (Jira MCP) · Demo B (Code Review Skill) · Demo C (联动发版) · 4 大踩坑警示 |
| `05.QA.md` | ~2 min | 12 | Q1–Q7 + 新增 Q8 鉴权 / Q9 灰度 / Q10 Skill vs Sub-agent |

---

## 自定义资产

### 交互组件（`components/`）

| 组件 | 用途 | 章节 |
|---|---|---|
| `SkillMcpRelationDiagram.vue` | 双轴关系骨架图（MCP × Skill 在 Harness 容器） | 01 |
| `MCPWorkflow.vue` | 7 步 MCP 调用流程动画（已有） | 01 / 02.1 |
| `MCPPrimitivesMatrix.vue` | Tools / Resources / Prompts Tab 切换 + JSON-RPC 流程 | 02.1 |
| `SkillProgressiveDisclosure.vue` | 三层加载（100 → 5000 → 按需）渐进可视化 | 02.2 |
| `MCPSkillDecisionMatrix.vue` | 7 行决策矩阵 hover 高亮 | 03 |

### 自定义 Layout（`layouts/`）

* `full-vibe.vue` —— 全屏组件容器
* `vibe-step.vue` —— 含右上角缩略图导航

### 全局样式（`style.css`）

* `.col-bad` / `.col-good` —— bad/good 双栏对比
* `.theme-mcp` / `.theme-skill` / `.theme-combo` —— 三色主题块
* `.punchline` —— 金句屏样式
* `.chapter-card` —— 路线图小卡片
* `.table-scroll` —— 宽表格水平滚动

---

## 配套示例（`examples/`）

```
examples/
├── README.md
├── jira-mcp-server/
│   ├── typescript/      # @modelcontextprotocol/sdk + zod (含错误处理 / 超时)
│   └── python/          # FastMCP（对标 FastAPI）+ Tool/Resource/Prompt 三件齐全
├── code-review-skill/
│   ├── SKILL.md         # 合规 frontmatter + When/How/Examples/edge cases
│   └── references/      # Tier 3 按需加载的详细清单
│       ├── SQL_INJECTION.md
│       └── N_PLUS_ONE.md
└── release-orchestration/
    └── SKILL.md         # Pre-flight + 6 步 + 回滚 SOP
```

每个目录独立 README，5 分钟内可跑通。

---

## 学完能做什么

### MCP 侧

1. 解释 MCP 的两层结构（Data / Transport）和三大原语（Tools / Resources / Prompts）
2. 用 TypeScript 或 Python 写出生产级 MCP Server
3. 在 Claude Code / Claude Desktop / Cursor / VS Code 注册和调试
4. 知道 stdio vs Streamable HTTP 的选型与安全边界
5. 用 MCP Inspector 排查问题

### Skill 侧

1. 按 [agentskills.io 规范](https://agentskills.io/specification) 写合规的 SKILL.md
2. 理解并应用 Progressive Disclosure 三层加载（不爆 Context 的根本设计）
3. 掌握"边界 / Schema / 容错"高阶心法
4. 区分 Skill / Sub-agent / Slash Command / Memory / `.cursorrules`

### 组合侧

1. 用决策矩阵判断"何时单用 / 何时组合"
2. 设计 Skill 调 MCP 的最常见范式
3. 把团队 SOP 沉淀为可灰度、可版本化的 Skill 资产

---

## 运行

```bash
# 开发预览
pnpm ppt:skill                    # 在仓库根目录
# 或
cd ppts/skill-mcp && npm run dev

# 构建
pnpm ppt:build:skill

# 浏览 examples
cd ppts/skill-mcp/examples && cat README.md
```

---

## 权威参考

### 协议规范
- [modelcontextprotocol.io](https://modelcontextprotocol.io) —— MCP 官方文档
- [modelcontextprotocol.io/specification/latest](https://modelcontextprotocol.io/specification/latest) —— 当前协议版本 `2025-06-18`
- [agentskills.io/specification](https://agentskills.io/specification) —— Agent Skill 完整规范

### 生态资源
- [github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) —— 官方 MCP Server reference 实现
- [github.com/anthropics/skills](https://github.com/anthropics/skills) —— Anthropic 官方 Skill 仓库
- [github.com/punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) —— ⭐ 85.9k 社区索引
- [github.com/ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) —— ⭐ 56.9k 社区集合
- [github.com/modelcontextprotocol/inspector](https://github.com/modelcontextprotocol/inspector) —— 调试工具

### 相关阅读
- [Anthropic: Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)
- [Anthropic: Building effective agents](https://www.anthropic.com/research/building-effective-agents)

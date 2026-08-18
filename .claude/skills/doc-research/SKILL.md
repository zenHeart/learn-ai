---
name: doc-research
description: 系统化研究任意工具/框架/平台官方文档的通用方法论技能（不限于某一个工具，已用于 Claude Code，同样适用于 Codex、Gemini CLI、Cursor 等 AI 编程工具或其他技术产品）。当需要深入研究官方文档、构建高质量教程、进行文档质量审计、或持续维护某个工具教程的时效性时使用此技能。强制使用 web-reader 逐页遍历文档树，结合多个搜索 MCP 进行交叉验证；每个工具的路径/监控页面等专属信息记录在 references/<tool-slug>.md，新增工具不需要新建技能。
version: 1.1.0
---

# 文档深度研究技能 (Doc Research)

> 从"搜索引擎关键词匹配"升级为"文档树系统遍历 + 多源交叉验证"的研究方法论。
>
> **Canonical**：泛化方法论在 ai-assets `presets/content/skills/doc-research/`。本文件是消费仓库绑定：工具专属 `references/<tool-slug>.md` 和 `docs/zh/products/ai-coding/` 只留在本仓。改 RAPID / 家族完备 / 抓页规则时先改 Hub，再同步这里。

## 核心原则

### 0. 硬规则：工具文档严禁臆造（no-fabricate）

撰写或维护任何工具/产品/框架的教程时,所有事实性声明都必须能在高可信数据源中**直接找到原文出处**。这是底线,违反任何一条都视为文档失败。

**适用场景**:
- 教程、Cheatsheet、Glossary、Cookbook 的所有正文
- 表格、清单、命令块、配置示例、版本说明
- 数据源列表(`cheatsheet.md` 的「高质量信息源」章节)等元数据
- 维护脚本、维护报告、给其他 Agent 的 prompt

**严禁出现的 5 种杜撰**:

| 杜撰类型 | 反例 | 正确做法 |
|---------|------|---------|
| **命令名/flag 臆造** | `/run-skill-generator`、`--reasoning-effort` 这种实际不存在的命令 | 写之前用 [Commands 参考](https://code.claude.com/docs/en/commands) 或 `claude --help` 逐条核实,找不到的不写 |
| **配置值/参数值臆造** | 文档写 `--permission-mode normal / auto / plan / auto-edit`,实际官方值是 `default / acceptEdits / plan / auto / dontAsk / bypassPermissions / manual` | 抓到原文后逐字复制,直到下次大版本升级前不要改 |
| **产品声明/事实臆造** | "Claude Code 默认开启 Auto 模式"、"Plan 模式只读"(实际:Plan 模式下也能跑特定命令) | 验证过行为再写,描述歧义时引用官方链接,不要凭"应该是这样"补全 |
| **URL/Article ID 臆造** | 凭印象写 `support.claude.com/en/articles/10574485`,实际文章已被删除 | 写之前 `curl -I` 验证 200 状态;非 200 改链接到根目录或删除 |
| **包名/平台工具名臆造** | `winget install Anthropic.ClaudeCode`、其他 Winget 真实包名 | 用 `winget search` 或 `homebrew info` 核实,找不到改成"官方提供的安装脚本" |

**缺失时的处理流程**(强制):

1. **第一步:扩大搜索范围** —— 用 web-reader / zread / GitHub issues / Context7 多源交叉验证
2. **第二步:回溯原始 PR 或 Issue** —— 很多功能是先在 GitHub 讨论/CHANGELOG 出现,再进官方文档
3. **第三步:实测** —— 工具能跑就 `claude --help` / `npm view` / `curl -I` 验证URL
4. **第四步:放弃** —— 上述三步都拿不到原文 → 标 `<!-- TODO: 待核实 -->`,**绝对不要**用"理应是"、"一般来说是"、"通常是" 这类猜测补全
5. **拒绝保存** —— 任何含"应该是"、"应该是"、"通常"、"一般"等不确定性表述的事实性条目,提交前必须删除或转为 TODO 标记

**审计责任**:
- 任何 Agent(包括 `doc-quality-auditor`、`deep-search-optimizer`、Claude 自身在写文档时)发现疑似杜撰条目,必须先按上面 5 步处理,处理不掉标注 TODO
- `doc-quality-auditor` 必须独立运行"反杜撰"维度的审计(详见后续版本),覆盖所有 flag/命令/配置值/URL/产品声明
- 数据源清单(`cheatsheet.md` 的「高质量信息源」)一旦掺入臆造条目,会污染所有后续基于它的研究,这是**双重失职**

**Previously踩过的坑**:
- Claude Code 教程曾将 `/run-skill-generator` 写进命令清单,实际是该命令当时已废弃;读者按文档敲命令会失败
- `--permission-mode normal / auto / plan / auto-edit` 文档值错,实际官方 CLI 是 7 种 `default|acceptEdits|plan|auto|dontAsk|bypassPermissions|manual`
- `support.claude.com/en/articles/10574485`(Extended Thinking)文章编号失效,死链接
- `winget install Anthropic.ClaudeCode` 命名侥幸正确,但同类命名应有 80% 是揣测出来的

### 1. 为什么搜索引擎覆盖不了官方文档

搜索引擎（Google/Bing/微信搜索）对**结构化文档**覆盖极差：
- 官方文档有严格的树状结构（overview → setup → api → advanced → troubleshooting）
- 搜索引擎只索引"热门页面"（通常是入门和常见问题）
- **中间层和高级主题被系统性遗漏**——这些页面没有外部链接指向它们

**正确方法**：先列官方一级产品（家族图）→ 再获取 sitemap.xml / 导航 → 逐页读取 → 整合为完整知识体系。只扫教程树会漏掉同品牌兄弟产品。

### 2. 多源交叉验证 + 工具矩阵

不同平台的文档搜索 MCP 各有侧重，经过 Claude Code 文档深度优化项目实战验证，以下工具组合已被证明有效：

| 工具 | 类型 | 擅长场景 | 状态 |
|------|------|---------|------|
| **官方文档**（web-reader, BigModel） | HTTP MCP | 100% 覆盖，权威但可能过时；单 URL 全文读取 | ✅ 已配置验证 |
| **Web Search Prime**（BigModel） | HTTP MCP | 中英文综合搜索，最新博客/社区讨论/实际案例 | ✅ 已配置验证 |
| **StepFun Search** | HTTP MCP | 中文技术内容，国内生态（[文档](https://platform.stepfun.com/docs/zh/step-plan/integrations/search-mcp)） | ✅ 已配置验证 |
| **MiniMax Search** | HTTP MCP | 中文技术教程、配置技巧（[文档](https://platform.minimaxi.com/docs/guides/token-plan-mcp-guide)） | ✅ 已配置验证 |
| **zread**（BigModel） | HTTP MCP | GitHub 仓库文档/源码搜索，验证 API 实际用法 | ✅ 已配置验证 |
| **Context7** | HTTP MCP | 开源项目文档、代码示例、SDK 细节 | ✅ 已配置验证 |
| **GitHub（gh CLI / MCP）** | CLI / MCP | 源码、Issues、Discussions、已知 bug、社区需求 | ✅ 已配置验证 |
| **BigModel Search** | HTTP MCP | 智谱清言生态内容（[文档](https://docs.bigmodel.cn/cn/coding-plan/mcp/search-mcp-server)） | ⚙️ 按需启用 |
| **WeRead Skills** | Skill | 微信读书内的技术书籍和文章（[文档](https://weread.qq.com/r/weread-skills)） | ⚙️ 按需启用 |
| **无头 CLI**（Grok / 本机 print 模式） | 本地 CLI | 交叉验证官方产品清单；用法见 [`headless-search.md`](./references/headless-search.md) | ⚠️ 可选，失败则只抓官方页 |

### 3. 按工具维护参考文件（避免每次重新发现路径/监控页面）

这个技能服务的是**任意工具/框架的文档**，不是只针对某一个工具。每次研究或维护某个具体工具（Claude Code、Codex、Gemini CLI、Cursor……）的教程时：

1. 先检查 `references/<tool-slug>.md` 是否存在（如 [`references/claude-code.md`](./references/claude-code.md)）——里面记录了该工具的**官方一级导航表**、文档目录结构、日常监控页面、Git commit scope、已知踩坑，直接复用，不用重新摸索
2. 再检查 `docs/zh/products/ai-coding/<tool-slug>/<tool-slug>-cheatsheet.md` 是否存在（如 [claude/claude-code-cheatsheet.md](../../../docs/zh/products/ai-coding/claude/claude-code-cheatsheet.md)）——这是发布给读者、同时也是三个 Agent 共用的高质量数据源清单（嵌在 cheatsheet 的「高质量信息源」章节）：官方文档/Cookbook、官方与核心开发者的社交账号、核心团队 Blog、GitHub 高质量仓库、Awesome List、三方高质量 Blog，做 Deepen 阶段的社区验证或 deep-search-optimizer 的并行搜索前先读它，比每次现搜可靠。这份清单**发布在 docs/ 里而不是 .claude/ 里**，是有意的：既是读者可见的资料索引，也是驱动后续增量更新的数据基础，一份文件两个用途，不用维护两份
3. 都不存在就先复制模板：[`references/_template.md`](./references/_template.md) → `references/<tool-slug>.md`；数据源清单则读 [`references/sources/_template.md`](./references/sources/_template.md)——它不是直接复制的数据模板，而是**先讲清楚怎么系统性发现数据源（官方属性地图 / 社交账号交叉核实 / 从已确认账号做图扩展），再给条目格式**，读完照着搜，产出物写到 `docs/zh/products/ai-coding/<tool-slug>/<tool-slug>-cheatsheet.md` 的「高质量信息源」章节，加进侧边栏和该工具 `index.md`。数据源清单只收录实际验证过的条目，不确定的放模板里的「待核实」区，不要凭印象填——教程曾经因为凭印象写命令名，写出一个官方文档里查无此命令的 `/run-skill-generator`，数据源清单一旦掺入臆造条目，会污染后续所有基于它的研究
4. 通用的维护节奏（每周/每月/大版本升级怎么做）、常见任务速查、Git 提交规范模式，都在 [`references/maintenance-workflow.md`](./references/maintenance-workflow.md) 里，是所有工具共用的，不要按工具复制一份
5. **文档架构**见 [`references/documentation-architecture.md`](./references/documentation-architecture.md)，新建或重构某个工具的文档目录时先读：四象限边界、**产品家族完备**（官方一级导航必须进家族图，见 [`family-completeness.md`](./references/family-completeness.md)）、再做轴 A/B 排序、Cheatsheet/Glossary 模块、侧栏何时嵌套
6. **怎么抓官方页**见 [`official-fetch.md`](./references/official-fetch.md)（优先 `.md` / `llms.txt`；HTML 404 不代表没文档）
7. **无头 CLI 交叉验证**见 [`headless-search.md`](./references/headless-search.md)；调不通就放弃，不准用猜测补产品

新增一个工具的维护支持，只需要新增 `references/<tool-slug>.md` 和 `docs/zh/products/ai-coding/<tool-slug>/<tool-slug>-cheatsheet.md`（含高质量信息源）和 `<tool-slug>-glossary.md`（核心概念解释）三份文件，不需要改这份 SKILL.md，也不需要新建一个技能。

> **`.claude/` 目录约定**：Skill 只能放在 `.claude/skills/<name>/SKILL.md`，Agent 只能放在 `.claude/agents/<name>.md`，直接放在 `.claude/` 根目录不会被 Claude Code 发现。

> **顺手画官方属性地图**：读取任意一个官方域名时，多花十秒扫一眼它的首页/页脚/Resources 区块——官方产品几乎从不只有一个域名（文档站之外通常还有 Blog、API/平台文档、Cookbook、Courses、GitHub org），这些姊妹站点常常互相链接，但因为是站内导航链接，搜索引擎收录和排序都不如热门博客/仓库，纯搜索会系统性漏掉。每发现一个新域名就重复扫一遍，直到不再冒出新域名，再开始建该工具的 `<tool-slug>-cheatsheet.md` 的「高质量信息源」章节（方法论见 [`references/sources/_template.md`](./references/sources/_template.md)）。

## 已验证的五工具并行搜索执行流程

经过 Claude Code 文档深度优化项目的实战验证，以下五工具并行搜索方案已被证明有效：

### 并行搜索执行模板

对同一研究主题，同时发起多个搜索工具的查询：

```yaml
# 第一轮：并行搜索（英文 + 中文 + 全文 + 源码）
round_1_parallel:
  - tool: mcp__web-search-prime__web_search_prime
    params: { search_query: "<tool> tips tricks best practices 2025 2026", location: "us", content_size: "high" }
  - tool: mcp__web-search-prime__web_search_prime
    params: { search_query: "<tool> 最佳实践 踩坑 使用技巧", location: "cn", content_size: "high" }
  - tool: mcp__MiniMax__web_search
    params: { query: "<tool> 高效使用 进阶技巧 配置优化" }
  - tool: mcp__web-search__web_search
    params: { query: "<tool> advanced workflow automation hooks settings" }

# 第二轮：全文读取高价值文章（基于第一轮结果筛选）
round_2_sequential:
  - tool: mcp__web-reader__webReader
    params: { url: "<high-value-article-url>", return_format: "markdown", retain_images: false }
  - tool: mcp__zread__search_doc
    params: { repo_name: "anthropics/<tool>", query: "<specific-feature>", language: "en" }

# 第三轮：深度搜索（需要交互式终端）
round_3_interactive:
  - tool: bash
    command: |
      script -q /dev/null grok --output-format json "
        深度搜索 <tool> 创造者或者 X 上高质量使用文章和技巧
      " 2>&1 | head -300
    note: "grok 需要 TTY 环境，在 CI/非交互 shell 中使用 script 命令包装"
```

### 查询策略：中英文 + 不同角度

| 查询角度 | 英文示例 | 中文示例 |
|---------|---------|---------|
| 官方家族 | `<vendor> official products "available on"` | `<厂商> 产品家族 官方` |
| 最佳实践 | `<tool> best practices 2025 2026` | `<tool> 最佳实践 踩坑` |
| 进阶技巧 | `<tool> advanced tips tricks` | `<tool> 进阶技巧 高效使用` |
| 配置优化 | `<tool> configuration settings hooks` | `<tool> 配置优化 自动化` |
| 真实案例 | `things I wish I knew about <tool>` | `<tool> 实战经验 工作流` |
| 深度对比 | `<tool> vs <competitor>` | — |

无头 CLI 的具体命令、TTY 包装和失败回退见 [`headless-search.md`](./references/headless-search.md)。搜索矩阵不要在 Agent 文件里再抄一份。

### 结果处理流程

1. **去重**：合并多个工具的搜索结果，去除重复 URL
2. **评分**：根据来源权威性（官方 > 知名博主 > 普通博客）和内容深度评分
3. **筛选 Top N**：选取 3-5 篇高价值文章进行全文读取
4. **提取模式**：从全文和社区讨论中提取可复用的技巧、配置模板、工作流
5. **对照现有文档**：标记已有覆盖 vs 遗漏内容
6. **按 P0/P1/P2 排序**：生成文档改进建议

### 4. 研究流程（RAPID 方法）

```
R - Retrieve（先产品家族，再文档树）
A - Acquire（逐页读取）
P - Pattern（提取模式）
I - Integrate（整合知识体系）
D - Deepen（深化验证）
```

#### Step 1: Retrieve — 先产品家族，再文档树

**先列官方一级产品**（规则与密度表见 [`family-completeness.md`](./references/family-completeness.md)）：

1. 打开官方 docs 首页 / `llms.txt` / 侧栏「产品 / Available on / 一级分类」
2. 列出全部一级项（名称 + 官方 URL）
3. 对照本站 `index.md` 和侧栏：每项标 `独立页` / `地图一行` / **缺失**
4. **缺失 = P0**，先补地图或立页，再写技巧

只扫「安装 / CLI / Settings」教程树、不扫产品家族，会漏掉同品牌的兄弟产品。

**再拉文档树**（怎么抓页见 [`official-fetch.md`](./references/official-fetch.md)）：

```bash
# 方法 A：sitemap.xml（站点提供时）
WebFetch("https://<official-docs-host>/sitemap.xml")

# 方法 B：侧边栏 / llms.txt / 同路径 .md
WebFetch("https://<official-docs-host>/") → 提取侧栏链接

# 方法 C：GitHub 仓库文档结构（开源项目）
zread__get_repo_structure("<org>/<repo>", "docs/")
```

输出两张表，不要合成一张：

1. **产品家族**：官方一级入口 → 官方 URL → 本站去向
2. **文档树**：URL → 标题 → 层级深度

姊妹域名（Blog / Cookbook / API 站）仍按上文「顺手画官方属性地图」扫，不要另起一份。

#### Step 2: Acquire — 逐页读取

```javascript
// 对每个页面，使用 web-reader 完整读取
for (const page of docTree) {
  const content = await webReader({
    url: page.url,
    return_format: "markdown",
    retain_images: false
  });
  // 保存到本地文件系统
  saveToFile(`research/${toolName}/${page.slug}.md`, content);
}
```

**关键规则**：
- 一个 URL 一次 web-reader 调用，不要合并多个 URL
- HTML 404 时先试同路径 `.md`（见 [`official-fetch.md`](./references/official-fetch.md)）
- 保留原始页面标题和结构
- 标记不确定或过时的内容

#### Step 3: Pattern — 提取知识模式

对收集的所有页面进行模式提取：

| 模式类型 | 提取方法 | 输出 |
|---------|---------|------|
| **功能矩阵** | 每个页面提取"它能做什么" | 功能覆盖表 |
| **配置选项** | 提取所有 CLI flag / settings key | 配置速查表 |
| **工作流** | 提取推荐的使用顺序 | 学习路径图 |
| **边界条件** | 提取"不能做什么"、"限制" | 约束清单 |
| **集成点** | 提取与其他工具的连接方式 | 生态图 |

#### Step 4: Integrate — 整合为教程体系

将提取的模式映射到教程结构：

```
docs/zh/products/<category>/<tool>/
├── index.md                   # 导航 + 产品全景 + 决策树
├── <tool>.md                  # 主教程（从入门到精通，Tutorial 象限）
├── <tool>-cookbook.md         # 场景化最佳实践（How-to 象限，可选）
├── <tool>-cheatsheet.md       # 配置/决策表/数据源速查（Reference 象限，含高质量信息源）
├── <tool>-glossary.md         # 核心概念统一解释（Explanation 象限）
├── <feature-a>.md             # 深度专题（可选，按 Diataxis 原则判断）
└── <feature-b>.md
```

侧边栏和文件列表都按这个顺序排——读者学完主教程最先想动手（Cookbook），动手时随时跳查参数（Cheatsheet），概念记混了才翻定义（Glossary）。同产品家族之外还有其他核心产品/扩展机制/周边产品时，排列原则见 [`documentation-architecture.md`](./references/documentation-architecture.md) 的「跨页排列顺序」节。

教程质量标准：
- **入门 → 精通的完整路径**：安装 → 基础用法 → 核心概念 → 高级特性 → 故障排除
- **80/20 法则**：覆盖 80% 日常场景，20% 高级特性简明带过
- **决策树**：任何时候都有清晰的"下一步"指引
- **原始链接**：每个知识点链接回官方原文

#### Step 5: Deepen — 深化验证

对同一查询，同时使用「多源交叉验证 + 工具矩阵」中列出的搜索 MCP 获取不同视角的结果，执行方式复用上文的[并行搜索执行模板](#并行搜索执行模板)（round_1_parallel + round_2_sequential + round_3_interactive），额外补充 GitHub Issues/代码搜索和 Context7 两个校验源：

- `github-search-issues`：搜索 `<tool> documentation bug missing`，验证是否有未被文档覆盖的已知问题
- `github-search-code`：搜索 `<tool> API usage example`，验证 API 实际用法与文档是否一致
- `context7`：查询 `<org>/<tool>` 的 advanced configuration examples，补充开源项目文档细节

汇总所有结果 → 按 P0/P1/P2 分组 → 更新教程。

**并行 Agent 交叉审查**：对于大型文档审计，使用多个并行 Agent 加速验证。每个 Agent 接收明确的审计维度，独立读取文档并输出发现清单：

```
Agent 1（文档结构审计）：先对官方一级导航 vs index 家族图，再对 sitemap vs 教程目录；缺产品是 P0
Agent 2（社区验证）：搜索 GitHub Issues、Reddit、知乎，发现常见踩坑点和未被覆盖的最佳实践
Agent 3（内容深度审计）：检查 80/20 法则覆盖度——日常场景是否足够详细，高级特性是否简明带过
Agent 4（代码验证）：验证教程中的代码示例、配置片段、命令是否可运行
Agent 5（中文生态）：搜索微信生态、国内平台（掘金、CSDN、腾讯云）的特殊用法和踩坑经验
```

每个 Agent 独立返回发现清单（含文件路径、行号、问题描述、改进建议），汇总后按 P0/P1/P2 优先级排序。

### 审计 Agent 维度定义

| 维度 | 审计重点 | 输出要求 |
|------|---------|---------|
| **完整性** | 官方**一级产品**是否都在家族图里？教程树章节是否覆盖？两张表分开勾 | 缺失产品（P0）+ 遗漏章节 |
| **准确性** | 代码示例、CLI 命令、配置是否与最新官方文档一致？ | 错误/过时内容列表 + 修正建议 |
| **可用性** | 新手能否按文档完成从入门到进阶？决策树是否清晰？ | 阻塞点列表 + 改进建议 |
| **80/20 覆盖** | 日常高频场景是否占主导？高级特性是否简明？ | 比例评估 + 调整建议 |
| **可维护性** | 内部锚点是否有效？回链是否完整？配置是否与最新上游一致？ | 断裂链接列表 + 维护建议 |
| **差异化** | 是否包含官方文档遗漏的社区最佳实践？ | 可补充的社区技巧列表 |

## 研究检查清单

### 完整性检查

**产品家族**（和文档树分开勾）：

- [ ] 官方一级导航的每一项都在本站 `index.md` 有去向（独立页或一行 + 不拆页理由）？
- [ ] 易撞名产品写了「不是什么」？
- [ ] 订阅/权益清单里点名的产品，没有只出现在额度表、却不在决策树？

**文档树**：

- [ ] 是否覆盖了官方文档树的 **所有第一层页面**？
- [ ] 是否覆盖了 **所有第二层页面**（子页面）？
- [ ] 是否遗漏了官方文档中链接到的 Cookbooks / Examples？
- [ ] 是否遗漏了官方文档中链接到的 API Reference？
- [ ] 是否遗漏了 Changelog / What's New 中的新功能？

### 质量检查

- [ ] 每个功能点都有对应的官方文档链接？
- [ ] 是否有"快速决策表"帮助用户选择正确功能？
- [ ] 是否有完整的学习路径（入门 → 进阶 → 精通）？
- [ ] 是否覆盖了安装、配置、使用、调试全流程？
- [ ] 是否有 80/20 法则的体现（日常场景优先）？
- [ ] 代码块围栏（```）是否成对闭合？未闭合的围栏会把后续整段内容误渲染为代码块（用 `grep -n '```' <file> | wc -l` 确认为偶数）
- [ ] 同一张表格/清单是否被复制粘贴到了文档的多个位置？多份拷贝会在更新时逐渐失配（字段数量、命名不一致），应改为写一份 + 其余位置链接引用

### 差异化检查

- [ ] 是否通过多源搜索发现了官方文档遗漏的社区最佳实践？
- [ ] 是否通过 GitHub Issues 发现了已知问题和规避方案？
- [ ] 是否通过国内搜索发现了中文生态的特殊用法？
- [ ] 是否对比了竞品（同类工具的其他选择）？

## 搜索查询模板

### 系统覆盖查询

```
site:<official-docs-host> <topic>
<tool> official documentation complete guide
<vendor> product family OR "available on" OR products 2026
<tool> API reference <specific-api>
<tool> cookbook examples
<tool> changelog new features 2026
```

### 社区验证查询

```
things I wish I knew about <tool>
<tool> advanced tips and tricks
<tool> common mistakes pitfalls
<tool> vs <competitor> comparison
<tool> real world use cases
```

### 中文生态查询

```
<tool> 中文教程 最佳实践
<tool> 使用技巧 踩坑
<tool> 国内集成 微信/支付宝/阿里云
<tool> vs 国内同类工具对比
```

## 与其他技能的协作

| 技能 | 协作方式 |
|------|---------|
| `deep-search-optimizer` | 发现阶段：官方 nav 对账 + 社区线索；搜索矩阵以本 Skill 为准，不要在 Agent 里再抄 |
| `doc-quality-auditor` | 写完后审计；完整性 P0 = 家族图缺一级产品 |
| `technical-keynote-communicator` | 将研究成果转化为演讲/PPT |
| `senior-frontend-architect` | 评估前端工具的技术选型 |
| `ai-agent-application-engineer` | 将文档中的概念转化为可运行代码 |

## 输出物模板

### 研究日志格式

```markdown
# <Tool> 文档研究报告

**研究日期**：YYYY-MM-DD
**研究范围**：官方文档 + 社区 + 竞品
**覆盖度**：产品家族 A/B 已上图；文档树 X/Y 页面

## 产品家族

| 官方一级入口 | 官方 URL | 本站去向 |
|--------------|----------|----------|
| … | … | 独立页 / 地图一行 / **缺失** |

## 文档树结构

| 层级 | 页面 | URL | 状态 |
|------|------|-----|------|
| 1 | Overview | ... | ✅ |
| 1 | Setup | ... | ✅ |
| 2 | CLI Reference | ... | ✅ |

## 新发现

1. **功能 X**：官方文档未在导航中突出展示，但在 cookbook 中有详细示例
2. **限制 Y**：GitHub Issue #123 中提到该限制，官方文档未说明

## 教程更新建议

1. 在 claude-code.md 中新增 Dynamic Workflows 章节
2. 在 index.md 中补充功能速查表条目
```

# 发现渠道与覆盖契约

本文件是「不要漏掉主流产品」这件事的**唯一所有者**。SKILL.md 只引用它，不复制内容。

覆盖不足是这个项目最常见、也最贵的失败模式：漏掉一个厂商的一条产品线，整条线就从时间轴上消失，而且**没人会发现**——账本不会报错，只是少了一格。所以本文件把覆盖从「靠记得」变成「按表逐条核对」。

---

## 1. 多渠道检索工具箱

**不要只用一个搜索工具。** 不同渠道的索引深度、语言覆盖、时效性差别很大，交叉使用才能压低漏检率。按下表选用：

| 渠道 | 强项 | 何时必用 |
|---|---|---|
| `mcp__web-search-prime__web_search_prime` | 广度最大，可设 `location: cn/us` | 默认主力；中文产品务必用 `cn` 再跑一遍 `us` |
| `mcp__web-search__web_search` | 内部检索管线 | 与上一条**结果不一致时**用来裁决 |
| `mcp__MiniMax__web_search` | 中文语料好 | 国内厂商、中文产品名、中文社区 |
| `mcp__web-reader__webReader` | 读长页面，保留链接 | 读厂商「产品/新闻」索引页 |
| `WebFetch` | 精确单页 | 核实具体产品页与发布日期 |
| `deep-research` 技能 | 信源分层 + 三角验证 | 拿不准的厂商、需要发布日期证据链时 |

**两条硬规矩：**

1. **至少两个渠道**才能确认一个产品存在。单渠道命中可能是索引噪声、镜像站或仿冒站。
2. **发布日期必须有可指认的证据**：官方发布文、官方博客、官方公告、官方 RSS。**凭记忆的日期一律不收。** 记不准就写 `date_confidence: month-only` 或用当月 1 日并在 `notes` 标注。

`/deep-research` 技能的 references/official-doc-track.md 有一条规则值得照搬：**官方一级产品缺失 = P0**。厂商官网自己的产品目录里有的东西，我们必须有一条对应档案。

---

## 2. 厂商产品线覆盖矩阵（逐条核对）

下表是**下限**，不是上限。跑增量前逐行确认「这一行在账本里有对应档案吗」；跑完回填审计再逐行确认一遍。

### 国际模型厂商

| 厂商 | 必须覆盖的产品面 |
|---|---|
| OpenAI | ChatGPT、Codex（CLI/IDE/云）、Sora、OpenAI API 平台 |
| Anthropic | Claude.ai、Claude Code、Claude Desktop、Cowork、开发者平台 |
| Google | Gemini App、Gemini CLI、Jules、Antigravity、AI Studio、Vertex AI、NotebookLM |
| xAI | Grok App、xAI API、以及 Grok 的**伴随/订阅等衍生面**（有就记，没有就写明没有） |
| Meta | Meta AI、Llama API/Console，以及 Meta 自有的其他产品面（研究/生成类单独评估） |
| Microsoft | Copilot、GitHub Copilot、Copilot Studio、Azure AI Foundry |
| Amazon | Bedrock、Q Developer、Q |
| NVIDIA | NIM 及 ModelScope 类平台面 |
| Mistral | Le Chat、La Plateforme |
| Cohere | Command、Rerank 及 North 平台面 |
| AI21 / Aleph Alpha / Reka / Inflection | 至少覆盖其主产品面 |

### 国内厂商

| 厂商 | 必须覆盖的产品面 |
|---|---|
| 阿里巴巴 | 千问、通义（若已并入则记并入关系）、通义灵码/Qoder、百炼 |
| 字节跳动 | 豆包、扣子、扣子空间、Trae、火山方舟，以及 Seed 系视频/图像产品线（可灵、即梦一类要单独评估） |
| 腾讯 | 混元、元宝、元器、CodeBuddy |
| 百度 | 文心一言/文小言、千帆，以及文心一格等图像面 |
| 月之暗面 | Kimi、Kimi Code、Kimi Claw |
| 智谱 | 清言、BigModel 开放平台、GLM Coding Plan |
| MiniMax | Agent、Code、开放平台、海螺 |
| DeepSeek | 官网与开放平台 |
| 华为 / 小米 / 联想 | 有独立 AI 产品面就必须覆盖（盘古/小艺、小爱、联想 AI 等） |
| 科大讯飞 / 商汤 / 昆仑万维 / 360 / 阶跃 / 零一万物 / 面壁 / 秘塔 | 至少各覆盖主产品面 |

### 品类完整性（每类不能是空的或只有一两个）

| 品类 | 最低条数 | 特别容易漏的子类 |
|---|---|---|
| chat-assistant | 10 | AI 原生浏览器、桌面伴侣 |
| coding-agent | 20 | 后台自主 Agent（交 ticket 回 PR）、AI 原生编辑器 |
| agent-platform | 15 | 零代码搭建、工作流、企业客服 Agent |
| model-platform | 8 | MaaS 平台 |
| developer-sdk | 4 | — |
| enterprise-api | 8 | 模型网关、代理 |
| search | 6 | 检索 API（不只是问答引擎） |
| multimodal-creation | 15 | **视频生成是最大的坑**，国内可灵/即梦/Vidu 一类极易漏 |
| local-runner | 5 | 端侧 SDK |
| eval-observability | 5 | 评测、追踪、实验管理 |

回填审计时跑 `node scripts/products/coverage-audit.mjs`，它按上面两张表给出缺口清单。**它只报告，不自动修。**

---

## 3. 什么算「值得建档」

一个产品要进账本，三条同时成立：

1. **有独立的用户入口**——App、CLI、IDE、控制台、API 平台、自托管运行时。裸模型权重、SDK 库、研究论文不算。
2. **普通用户可能听说过**。自问：「一个前端工程师在挑 AI 工具时，会听说过它吗？」答不上来就别收。
3. **有可核实的首次公开发布日期**。

以下**要收**（容易被误判为「不值得」）：已被收购/更名但时间轴要讲清演变的；有中文名但海外无名的；单功能但用户量大的；硬件。

以下**不收**：模型 checkpoint；只有 SDK 没有产品面的库；企业内部工具；无法用两个渠道交叉确认的条目。

---

## 4. 跳转守卫

抓厂商入口时**手动跟跳转并逐步校验 host**：任何一跳跳出 `official_domains` 白名单就中止，记为「入口失败」，**不要顺着陌生域名继续抓**——那通常是聚合站或仿冒站。

厂商自身的 301/302（域名迁移、产品并入）是**正常的**，要记下来走 `revisions[]`，不要当成可疑跳转。

---

## 5. 双轨发现

- **增量窗口**（Step 1）：只管上次检查点之后的新发布，快。
- **回填审计**：常态跑 `node scripts/products/coverage-audit.mjs` + 按第 2 节两张表逐条核对，**不受增量窗口限制**。否则历史漏洞会永久滑脱——账本不会因为「漏了三个月前的产品」而报错。

每轮收口都要在报告里写明：本次覆盖审计发现并补录了哪些。

---

## 6. 新厂商接入

发现账本里没有的厂商时：

1. 在 `data/products/vendors.json` 追加：`id`（kebab ASCII，非拉丁名给英文/拼音，**不要**用 `x-2` 这类退化 id）、`display_name`、`display_name_zh`、`region`、`coverage_tier`、`active`、`official_domains`。
2. **收口阶段单进程改这个文件**——并行 agent 不许碰（见 SKILL.md 红线 5）。
3. 新厂商同时要在第 2 节的矩阵里加一行，否则它同样会「存在但被遗忘」。
4. 跑 `node scripts/products/validate-products.mjs`，外键会替你把关。

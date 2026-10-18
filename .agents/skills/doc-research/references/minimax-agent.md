# MiniMax Agent 维护参考

> 通用维护流程见 [`maintenance-workflow.md`](./maintenance-workflow.md)；高质量数据源清单发布在 `docs/zh/products/minimax-agent/minimax-agent-cheatsheet.md` 的「高质量信息源」。文档架构见 [`documentation-architecture.md`](./documentation-architecture.md)。

## 产品形态调研结论（写教程前必须先有这一节）

调研时间：2026-08-19。以下每条都来自一手官方来源，来源标在括号里。

**结论一：本 issue 的主产品是通用 Agent 工作台 MiniMax Agent，不是 MiniMax Code。**

- 国内入口 [agent.minimaxi.com](https://agent.minimaxi.com/) 标题原文：「MiniMax Agent: 简单指令, 无限可能」。
- 海外入口 [agent.minimax.io](https://agent.minimax.io/) 标题原文：「MiniMax Agent: Minimize Effort, Maximize Intelligence」。
- 官方新闻 [MiniMax Agent，最大的智慧是“靠谱”](https://www.minimaxi.com/news/minimax-agent)（2025-06-19）原文：「一个能完成长程（Long Horizon）复杂任务的通用智能体」。
- 官方新闻 [MiniMax M2 & Agent，大巧若拙](https://www.minimaxi.com/news/minimax-m2) 原文：「基于 MiniMax-M2 的通用 Agent 产品 MiniMax Agent」。
- **不要写 MiniMax Code 主教程。** Code 是桌面端编程 Agent，文档树在 `agent.minimaxi.com/docs/code/*`，另 issue #72。

**结论二：同一文档域名现在同时扛「Agent 产品」和「Code 文档」。**

- `https://agent.minimaxi.com/docs/llms.txt` 的 Docs 列表几乎全是 MiniMax Code 页（欢迎、下载、Coding/Work、工作区、权限、IM、Remote Control）。
- [更新日志](https://agent.minimaxi.com/docs/changelog) 头部仍写「追踪 MiniMax Agent 每次更新」，正文从 v3.0.33（2026-05-29）起写「桌面端正式更名为 MiniMax Code」。
- [下载页](https://agent.minimaxi.com/download) 当前标题是「MiniMax Code - 下载」。
- 写教程时：Web 工作台叫 MiniMax Agent；桌面端文档与下载页当前品牌是 MiniMax Code。禁止把 `/docs/code/*` 抄进本目录当主教程。

**结论三：官方一级产品不止 Agent。Code / Hailuo / 星野只在地图一行。**

2026-08-19 打开的官方一级入口：

| 来源 | 一级项 |
|------|--------|
| [www.minimaxi.com](https://www.minimaxi.com/) 关于我们 | MiniMax Code、MiniMax Design、MiniMax Audio、星野、开放平台 |
| [www.minimaxi.com/en](https://www.minimaxi.com/en) Product nav | MiniMax Code、Video Hailuo、Audio、Talkie、API、Token Plan |
| [www.minimaxi.com/en](https://www.minimaxi.com/en) About | MiniMax Code、**MiniMax Hub**、MiniMax Audio、Talkie、open platform |
| [agent.minimaxi.com](https://agent.minimaxi.com/) | MiniMax Agent；站内还有 MaxHermes、MaxClaw、技能市场、下载桌面端 |

Hub 与 Design 两份官方页对同一入口打架：英文 About 仍写 MiniMax Hub；[hub.minimaxi.com](https://hub.minimaxi.com/) 打开后加载的是 MiniMax Design（「正在加载 MiniMax Design…」）。本站以当前落地页为准写 Design，并把 Hub 标成旧名/英文 About 用词，禁止各写各的。

**结论四：Agent 工作台的可写密度够立 Tutorial + 参考，不够写 Code 级 CLI 手册。**

官方能直接引用的 Agent 面：

- 使用面：网页 [agent.minimaxi.com](https://agent.minimaxi.com/) / [agent.minimax.io](https://agent.minimax.io/)；技能市场 [agent.minimaxi.com/skills](https://agent.minimaxi.com/skills)。
- 两种模式（[M2 新闻](https://www.minimaxi.com/news/minimax-m2)）：**Lightning 高效模式**（对话问答 / 轻量级搜索 / 轻量级代码）、**Pro 专业模式**（深度研究 / 全栈开发 / PPT / 报告 / 网页制作）。
- Agent Team（[techblog](https://agent.minimaxi.com/docs/techblog/agent-team.md)）：Leader / Worker / Verifier；用户只发一条消息。
- 能力面：编程、多模态、MCP（[靠谱](https://www.minimaxi.com/news/minimax-agent)）；写作、语音、图像、文档、翻译（[features/zh.html](https://agent.minimax.io/features/zh.html)）。

官方**没有**给 Agent 网页工作台单独的 Commands / Settings 参考。斜杠命令、权限模式、Worktree、Coding/Work 属于 Code 文档树，不要抄过来冒充 Agent 网页操作。

**结论五：计费有两套官方说法，禁止猜哪套「当前仍免费」。**

- [M2 新闻](https://www.minimaxi.com/news/minimax-m2) 原文：「我们目前在免费提供 MiniMax Agent, 直到我们的服务器撑不住为止。」
- [技能市场](https://agent.minimaxi.com/skills) 弹层原文：「统一计费：全面打通 Token Plan」。
- [下载页](https://agent.minimaxi.com/download) 列出 Plus ¥49/月、Max ¥119/月、Ultra ¥469，页面品牌是 MiniMax Code。

教程只并列引用，链回官方套餐页。不要把限时免费写成长期政策，也不要把下载页档位写成 Agent 网页专用价。

**结论六：易撞名必须写「不是什么」。**

- MiniMax Agent ≠ MiniMax Code
- MiniMax Hub ≠ MiniMax Agent（Hub 域名当前是 Design）
- MiniMax Design ≠ MiniMax Agent
- Mini-Agent（GitHub `MiniMax-AI/Mini-Agent`）≠ MiniMax Agent 产品
- MaxHermes / MaxClaw ≠ 公司一级产品，是 Agent 站内入口
- Hailuo / 海螺视频 ≠ Agent
- 星野 / Talkie ≠ Agent
- Token Plan ≠ 产品，是计费入口

**结论七：适合本站「前端工程师」读者，但主路径不是终端编程。**

依据：官方把 Agent 定位为通用长程智能体（研究、PPT、报告、网页、多模态交付），网页即可用。前端工程师会用它做调研、演示稿、落地页和轻量编码。仓库级桌面编程走 Code（#72），不要在本目录展开。

## 基本信息

- 工具名：MiniMax Agent（通用 Agent 工作台）
- 官方产品入口：<https://agent.minimaxi.com/>（国内）、<https://agent.minimax.io/>（海外）
- 厂商站：<https://www.minimaxi.com/>、<https://www.minimax.io/>
- 文档根（当前以 Code 为主）：<https://agent.minimaxi.com/docs/llms.txt>
- 发版节奏：桌面端 changelog 以 `v3.0.x` 记；网页工作台没有独立版本号。不要在读者标题里写精确版本。
- 当前覆盖：2026-08-19 打开的官方页（见上）。模型内部机制不写，链 [Learn LLM](https://llm.zenheart.site/chapters/)。

## 官方一级导航（产品家族）

| 官方一级入口 | 官方 URL | 本站去向 | 不拆页理由（若一行） |
|--------------|----------|----------|----------------------|
| MiniMax Agent | https://agent.minimaxi.com/ | 独立页（本目录） | |
| MiniMax Code | https://agent.minimaxi.com/docs/code/welcome | 地图一行 | 另 issue #72；本目录不写主教程 |
| MiniMax Design / Hub | https://design.minimaxi.com/ 、https://hub.minimaxi.com/ | 地图一行 | 创作画布，不是通用 Agent 工作台 |
| Hailuo / 海螺视频 | https://hailuoai.com/ | 地图一行 | 视频生成产品 |
| MiniMax Audio | https://www.minimaxi.com/audio | 地图一行 | 语音 / 音乐产品 |
| 星野 | https://www.xingyeai.com/ | 地图一行 | 沉浸式角色社区 |
| Talkie | https://www.talkie-ai.com/ | 地图一行 | 星野海外对应 |
| 开放平台 / API | https://platform.minimaxi.com/ | 地图一行 | 开发者 API，不是 Agent 工作台 |
| Token Plan | 厂商站 Product nav「Token Plan」 | 地图一行 | 计费入口，不是产品 |
| About / News / IR / Careers | https://www.minimaxi.com/ | 非本站 | 非 AI 产品 |

易撞名：见结论六。

## 文档文件结构（Diataxis）

官方没有 Agent 专用 CLI 参考，所以不按 Claude Code 五文件硬凑命令表。采用 5 文件：地图 + Tutorial + 短 Cookbook + 入口速查 + 撞名术语。

```
docs/zh/products/minimax-agent/
├── index.md
├── minimax-agent.md
├── minimax-agent-cookbook.md
├── minimax-agent-cheatsheet.md
└── minimax-agent-glossary.md

docs/products/minimax-agent/        # 英文同构
```

| 文件 | 象限 | 写什么 | 不写什么 |
|------|------|--------|----------|
| `index.md` | 导航 + 速查 | 家族图、决策树、Agent 功能速查 | Code 安装步骤 |
| `minimax-agent.md` | Tutorial | 打开网页、选模式、发第一个长程任务、技能市场、Team | Code 工作区 / 终端 / 权限 flag |
| `minimax-agent-cookbook.md` | How-to | 官方场景配方（研究、PPT/报告、技能、Team） | 臆造斜杠命令 |
| `minimax-agent-cheatsheet.md` | Reference | 入口、模式、域名、数据源 | 概念散文 |
| `minimax-agent-glossary.md` | Explanation | 撞名、Lightning/Pro、Team、Skill、Hub/Design | 操作步骤 |

跨页顺序：`index` → `minimax-agent` → `cookbook` → `cheatsheet` → `glossary`。

## 监控页面

- Agent 产品入口：<https://agent.minimaxi.com/>
- 海外入口：<https://agent.minimax.io/>
- 技能市场：<https://agent.minimaxi.com/skills>
- Changelog（桌面端已改名 Code）：<https://agent.minimaxi.com/docs/changelog>
- 文档索引：<https://agent.minimaxi.com/docs/llms.txt>
- Agent Team 技术文：<https://agent.minimaxi.com/docs/techblog/agent-team.md>
- 功能页：<https://agent.minimax.io/features/zh.html>
- FAQ（偏消费向）：<https://agent.minimax.io/faq/en.html>
- 厂商新闻：<https://www.minimaxi.com/news/minimax-agent>、<https://www.minimaxi.com/news/minimax-m2>
- Code 欢迎页（只作边界）：<https://agent.minimaxi.com/docs/code/welcome>
- Design / Hub：<https://design.minimaxi.com/>、<https://hub.minimaxi.com/>

## Git 提交 scope

```
docs(minimax-agent): ...
```

## 已知踩坑 / 特殊约定

1. **`www.minimaxi.com` / `agent.minimaxi.com` 对部分抓取器走 198.18 代理或 SSRF 拦截。** 用页面阅读器，不要把 `curl` 403 当成页面不存在。
2. **`/docs/llms.txt` 是 Code 文档树，不是 Agent 网页工作台手册。** 写 Agent 操作前先问：这条原文是不是 `docs/code/*`。
3. **中英 About 产品名不一致**（Hub vs Design）。家族图必须同时写两份原文。
4. **禁止改 `products-gallery.js`。** 导航只挂 `sidebars/ai-coding.mjs`。
5. **不要把 Token Plan 档位、积分日签、插件名单写成长期规格。** 这些出现在 Code changelog / 下载页，会变。
6. **机制（MSA、注意力、训练）不写**，链 Learn LLM。

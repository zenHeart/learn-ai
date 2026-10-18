# 扣子 / Coze 维护参考

> 通用维护流程见 [`maintenance-workflow.md`](./maintenance-workflow.md)；高质量数据源清单发布在 `docs/zh/products/coze/coze-cheatsheet.md` 的「高质量信息源」。架构见 [`documentation-architecture.md`](./documentation-architecture.md)。

## 产品形态调研结论（写教程前必须先有这一节）

调研时间：2026-08-19。每条都来自一手官方来源。

**结论一：本站只收「扣子 / Coze Agent 搭建」。不要写成 Trae 或豆包。**

- 官方文档首页原文（[docs.coze.cn/what_is_coze.md](https://docs.coze.cn/what_is_coze.md)）：「扣子是面向 Agent 时代的新一代 AI 团队协作平台。」
- 扣子编程原文（[docs.coze.cn/guides_welcome.md](https://docs.coze.cn/guides_welcome.md)）：「扣子编程是一个 AI 驱动的应用开发平台……就能帮助你打造可用于生产环境的智能体、工作流、技能、移动应用、网页应用或小程序。」
- 低代码项目原文（[docs.coze.cn/about-low-code-project.md](https://docs.coze.cn/about-low-code-project.md)）：「低代码项目是扣子编程（code.coze.cn）较为早期的版本，以拖拉拽的工作流而闻名。」
- 本 issue 范围是 **Agent 搭建**。豆包聊天、Trae IDE、火山方舟模型 API 只在家族图占一行，链官方与对应 issue，不在本目录展开。

**结论二：官方文档站一级栏目是三套产品，不是一份 Claude 式五文件能直接套的「单一 CLI」。**

[docs.coze.cn/llms.txt](https://docs.coze.cn/llms.txt) 顶层分组：

| 一级入口 | 入口 | 形态 |
|----------|------|------|
| **扣子** | [coze.cn](https://www.coze.cn/)、[space.coze.cn](https://space.coze.cn/) | 网页 / 桌面 / 移动；消费端 AI 团队工作台 |
| **扣子编程** | [code.coze.cn](https://code.coze.cn/) | 浏览器里的开发平台；低代码 + AI 编程 |
| **扣子罗盘** | 文档树 `cozeloop_*` | Prompt / 评测 / 观测 |

轴 B：前端工程师来本站首先要的是 **扣子编程里把智能体搭出来并发布**。扣子消费端（PPT / 视频 / 云手机）和罗盘评测只占地图一行，不立完整教程。

**结论三：同一品牌里「搭建 Agent」有两条官方路径，教程必须先分门。**

1. **低代码智能体**（可视化编排）：登录扣子编程 → 新建项目 → 低代码模式 → 智能体开发。官方案例是夸夸机器人（[guides_quickstart](https://docs.coze.cn/guides_quickstart.md)）。
2. **全代码智能体**（AI 编程）：扣子编程首页点「智能体」选项卡，用自然语言让扣子 AI 生成全代码项目（[guides_vibe_coding_agent](https://docs.coze.cn/guides_vibe_coding_agent.md)）。

扣子（coze.cn）里的「AI 编程」是对扣子编程部分能力的封装，只覆盖网页 / App / 小程序 / 导入项目，**不覆盖**在对话里完整开发智能体与工作流。官方原文见 [cozespace_coze_app_faq](https://docs.coze.cn/cozespace_coze_app_faq.md)「扣子和扣子编程的编程能力完全一致吗？」

**结论四：开源版和商业版不是同一个产品。**

- 扣子编程**暂不支持**私有化部署（[guides_FAQ](https://docs.coze.cn/guides_FAQ.md)）。
- 私有化走 [Coze Studio](https://github.com/coze-dev/coze-studio)（Apache-2.0，单机版引擎，不含工作空间 / 企业组织 / 多人协作）。
- 评测观测的开源对应物是 [Coze Loop](https://github.com/coze-dev/coze-loop)；商业版叫**扣子罗盘**。
- 云端 Claude Code / Codex CLI 是「框架跑在扣子云电脑」，**不是** Anthropic / OpenAI 官方产品入口，不能登录对方账号（[cozespace_coze_app_faq](https://docs.coze.cn/cozespace_coze_app_faq.md)）。

**结论五：国际站和国内站分域名，不要混引操作步骤。**

- 国内：`www.coze.cn` / `code.coze.cn` / `docs.coze.cn`（有 `.md` 镜像与 `/llms.txt`）
- 国际：`www.coze.com` / `docs.coze.com` / `www.coze.com/open/docs`
- 企业产品页：`https://www.volcengine.com/product/coze-pro`
- 套餐与积分以 [guides_edition](https://docs.coze.cn/guides_edition.md) 和 [code.coze.cn/subscription-paywall](https://code.coze.cn/subscription-paywall) 为准；企业版价格 2026-07-14 起调整。

**结论六：适合本站「前端工程师」定位，但主形态是网页开发平台，不是终端 IDE。**

依据：零代码/低代码搭 Bot、发布到飞书/微信/API/Chat SDK、以及 `@coze/cli`（npm `bin.coze`，2026-08-19 抽查 `0.3.10`）。不要把它写成「下一个 Cursor」。

## 基本信息

- 工具名：扣子 / Coze（本目录主线：扣子编程里的 Agent 搭建）
- 官方文档根地址：<https://docs.coze.cn/>
- 文档镜像：同路径加 `.md`；整站索引 <https://docs.coze.cn/llms.txt>
- 发版节奏：产品动态见 [guides_release_note](https://docs.coze.cn/guides_release_note.md)；扣子 3.0 发布日官方写的是 **2026-05-29**
- 当前覆盖：2026-08-19 对照 `llms.txt` + 上表专题页

## 官方一级导航（产品家族）

| 官方一级入口 | 官方 URL | 本站去向 | 不拆页理由（若一行） |
|--------------|----------|----------|----------------------|
| 扣子（协作工作台） | https://www.coze.cn/ 、https://docs.coze.cn/what_is_coze | 地图一行 | 消费端办公/视频/云设备，不是本 issue 的搭建主线 |
| 扣子编程 | https://code.coze.cn/ 、https://docs.coze.cn/guides_welcome | 独立页 Tutorial | 低代码 + AI 编程搭智能体 |
| 低代码智能体 / 工作流 / 插件 / 知识库 | https://docs.coze.cn/guides_agent_overview 等 | Tutorial + Cookbook | 搭建主线 |
| 全代码智能体（AI 编程） | https://docs.coze.cn/guides_vibe_coding_agent | Cookbook 一节 | 密度够，但读者先走低代码 |
| Coze CLI | https://docs.coze.cn/developer_guides_coze_cli ；npm `@coze/cli` | Cookbook + Cheatsheet | 工具，不是独立产品 |
| 扣子罗盘 | https://docs.coze.cn/cozeloop_what-is-cozeloop | 地图一行 | 评测/观测，轴 B 靠后 |
| Coze Studio（开源） | https://github.com/coze-dev/coze-studio | 地图一行 | 私有化引擎，不写部署全书 |
| Coze Loop（开源） | https://github.com/coze-dev/coze-loop | 地图一行 | 罗盘开源核 |
| Coze.com 国际站 | https://www.coze.com/ 、https://docs.coze.com/ | 地图一行 | 账号/模型/渠道与国内不同 |
| Coze Pro / 企业版 | https://www.volcengine.com/product/coze-pro ；https://docs.coze.cn/guides_edition | 地图一行 | 套餐/SLA，不写销售手册 |
| 豆包 | https://www.doubao.com/ | 地图一行 → #79 | 同厂聊天产品，本目录不写 |
| Trae | https://www.trae.cn/ 、https://www.trae.ai/ | 地图一行 → #80 | 同厂 IDE，本目录不写 |
| 火山方舟 | https://www.volcengine.com/product/ark | 地图一行 → #82 | 同厂模型 API，本目录不写 |
| 微信 / 飞书 / 抖音 | 发布渠道文档 | 地图一行标「渠道，非本站产品」 | 非 AI 产品 |

易撞名：扣子 ≠ 扣子编程 ≠ 豆包 ≠ Trae；扣子 Agent ≠ 云端「Claude Code 框架」≠ Anthropic Claude Code；Bot（旧称）= 低代码智能体；Build Mode 一类词不要从 xAI 抄过来。

## 文档文件结构（Diataxis）

```
docs/zh/products/coze/
├── index.md
├── coze.md
├── coze-cookbook.md
├── coze-cheatsheet.md
└── coze-glossary.md

docs/products/coze/   # 英文同构
```

| 文件 | 象限 | 写什么 | 不写什么 |
|------|------|--------|----------|
| `index.md` | 导航 + 速查 | 家族图、决策树、本站去向 | 逐步点击 |
| `coze.md` | Tutorial | 注册、低代码智能体从 0 到发布 | 参数全集、豆包/Trae 教程 |
| `coze-cookbook.md` | How-to | 工作流、插件、知识库、技能、发布、CLI | 基础注册、概念长文 |
| `coze-cheatsheet.md` | Reference | 套餐表、命令、渠道表、数据源 | 学习路径 |
| `coze-glossary.md` | Explanation | 是什么 / 不是什么 | 操作步骤 |

跨页顺序：`index` → `coze` → `coze-cookbook` → `coze-cheatsheet` → `coze-glossary`。

## 监控页面

- 文档索引：<https://docs.coze.cn/llms.txt>
- 什么是扣子：<https://docs.coze.cn/what_is_coze.md>
- 什么是扣子编程：<https://docs.coze.cn/guides_welcome.md>
- 低代码入门：<https://docs.coze.cn/guides_quickstart.md>
- 产品动态：<https://docs.coze.cn/guides_release_note.md>
- 套餐：<https://docs.coze.cn/guides_edition.md>、<https://code.coze.cn/subscription-paywall>
- FAQ（开源/下线渠道）：<https://docs.coze.cn/guides_FAQ.md>
- 消费端 FAQ：<https://docs.coze.cn/cozespace_coze_app_faq.md>
- Coze CLI：<https://docs.coze.cn/developer_guides_coze_cli.md>、<https://www.npmjs.com/package/@coze/cli>
- 开源：<https://github.com/coze-dev/coze-studio>、<https://github.com/coze-dev/coze-loop>
- 国际文档：<https://docs.coze.com/>、<https://www.coze.com/open/docs>
- 企业产品页：<https://www.volcengine.com/product/coze-pro>

## Git 提交 scope

```
docs(coze): ...
```

## 已知踩坑 / 特殊约定

1. `www.coze.cn` / `www.coze.com` / 火山产品页是 JS 营销站，curl / 部分阅读器拿不到正文。事实以 `docs.coze.cn/*.md` 为准。
2. 低代码智能体发布到**豆包渠道**已于 **2026-07-01** 下线（[guides_FAQ](https://docs.coze.cn/guides_FAQ.md)）。旧教程还在写「一键发到豆包」的，过时。
3. **抖音分身** 2025-09-03 下架。工作流商店 / 图像流商店已下架。
4. 商店调试对话超时 **10 分钟**；超时会报「运行中止」。
5. 三方付费插件的智能体不能发到飞书多维表格、掘金、豆包及部分公共渠道。
6. 不要把「云端 Claude Code Agent」写成可以登录 Claude 账号。
7. 套餐数字只抄 `guides_edition`，并提醒读者对 paywall；企业版 2026-07-14 调过价。
8. 本 issue 明确：**不要改 `products-gallery.js`**。侧栏挂在 `docs/.vitepress/sidebars/ai-coding.mjs`。

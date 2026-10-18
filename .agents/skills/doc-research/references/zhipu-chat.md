# 智谱清言 / Z.ai 对话 维护参考

> 通用维护流程见 [`maintenance-workflow.md`](./maintenance-workflow.md)；高质量数据源清单发布在 `docs/zh/products/zhipu-chat/zhipu-chat-cheatsheet.md` 的「高质量信息源」。文档架构见 [`documentation-architecture.md`](./documentation-architecture.md)。

## 产品形态调研结论（写教程前必须先有这一节）

调研时间：2026-08-19。以下每条都来自一手官方来源，来源标在括号里。

**结论一：本目录只收消费端对话，不写 GLM Coding Plan 安装主教程。**

- 国内对话产品名是 **智谱清言**，入口 [chatglm.cn](https://chatglm.cn)。首页 description 原文：「基于 GLM 大模型，不只是 AI 助手，更是能帮你把事办成的 Agent。」
- 国际对话产品名是 **Z.ai**，入口 [chat.z.ai](https://chat.z.ai) / [z.ai](https://z.ai)。页面 title 原文：「Z.ai - Advanced AI Chatbot & Agent powered by GLM-5.2」。
- 官方把这两处并列为「在线体验」，不是同一张安装教程（[zhipuai.cn/zh/research/161](https://www.zhipuai.cn/zh/research/161) 原文：「Z.ai：https://chat.z.ai」「智谱清言 App/网页版：https://chatglm.cn」）。
- **GLM Coding Plan** 是另一条产品线（[z.ai/subscribe](https://z.ai/subscribe)、[bigmodel.cn/glm-coding](https://bigmodel.cn/glm-coding)），给 Claude Code / Cline 等编码工具配 GLM 额度。本站只在家族图占一行，正文不写套餐安装。另 issue #75。

**结论二：适合当 Claude.ai 的对位页，不是仓库 Agent。**

- 清言形态：浏览器网页 + 官方 App（[chatglm.cn/download](https://chatglm.cn/download) description：「智谱清言是基于 GLM-5 的全能 AI 助手，支持精通对话、写作与编程……更能理解图片与文档」；另一条 download 文案：「搭载 GLM-5 Agentic 基座模型，可以对话聊天、也可以调用工具执行复杂任务」）。
- 还有官方浏览器插件「智谱清言：ChatGLM & AutoGLM」（[Chrome Web Store](https://chromewebstore.google.com/detail/%E6%99%BA%E8%B0%B1%E6%B8%85%E8%A8%80%EF%BC%9Achatglm-autoglm-%E5%B7%A5%E4%BD%9C%E5%AD%A6%E4%B9%A0/mnpdbmgpebfihcndnpgdaihnkmloclkd)）。
- 对前端工程师：用来调研、写作、看图/文档、对话里写代码片段。真要改 checkout，去 Coding Plan / ZCode / 别的 CLI，不要把清言写成 Claude Code。

**结论三：厂商一级 AI 产品比「清言」多，家族图必须一行收齐，本目录不展开。**

[zhipuai.cn/zh](https://www.zhipuai.cn/zh) 页脚「产品」与「原生产品」列出：

| 官方一级入口 | 官方 URL（2026-08-19 核实） | 本站去向 |
|--------------|------------------------------|----------|
| 智谱清言 | https://chatglm.cn | **独立页**（本目录 Tutorial） |
| Z.ai（对话） | https://chat.z.ai 、 https://z.ai | **独立页**（与清言同一 Tutorial，国际面） |
| GLM Coding Plan | https://z.ai/subscribe 、 https://bigmodel.cn/glm-coding | 地图一行（#75） |
| AutoClaw / AutoGLM | https://autoglm.zhipuai.cn | 地图一行 |
| ZCode | https://zcode.z.ai/cn （[research/161](https://www.zhipuai.cn/zh/research/161)） | 地图一行 |
| BigModel / 开放平台 | https://bigmodel.cn 、 https://docs.bigmodel.cn | 地图一行（API，不是聊天手册） |
| Z.ai 开发者文档 | https://docs.z.ai | 地图一行（API） |
| Zread.ai | 公司页「原生产品」列出；独立 URL 未在本次抓页确认 | 地图一行，链公司页 |
| AMiner | 公司页列出；页脚邮箱域 `aminer.cn` | 地图一行，链公司页 |
| 智谱学习中心 | 公司页轮播列出 | 地图一行，链公司页 |
| 智谱 AI 输入法 | 公司页轮播列出 | 地图一行，链公司页 |
| CodeGeeX | 官方新闻「端侧智谱清言和 CodeGeeX」（[zhipuai.cn news](https://www.zhipuai.cn/en/news/20)） | 地图一行 |
| 开源 GLM 权重 | https://github.com/zai-org/GLM-5 （[research/161](https://www.zhipuai.cn/zh/research/161)） | 地图一行 |
| 商业生态 / 投资者关系 / 加入我们 | 公司页导航 | **非本站** |

**结论四：两套站点、两套法律主体，不要写成一口账号池。**

- 清言付费协议（[chatglm.cn/pay/policy/vipservice](https://chatglm.cn/pay/policy/vipservice)，生效 2026-05-21）把「智谱清言」定义为北京智谱华章科技有限公司经营的生成式人工智能产品；会员在 **chatglm.cn 网站、智谱清言 App** 内使用；权益只进购买时登录的那个账号；与「智谱旗下其他产品（包括但不限于智谱 AI 开放平台）」付费独立、可叠加。
- Z.ai Terms（[docs.z.ai/legal-agreement/terms-of-use](https://docs.z.ai/legal-agreement/terms-of-use)，Last Update April 14, 2026）签约方是 **JINGSHENG HENGXING TECHNOLOGY PTE.LTD**；定义里的 Z.ai 是该公司运营的平台（含 API）。
- 官方没有写「一个登录打通清言和 chat.z.ai」。教程必须把它们当两个入口，禁止写成同一订阅。

**结论五：清言没有独立用户文档树；事实源是产品页 + 协议 + 商店页。**

- `docs.z.ai` / `docs.bigmodel.cn` 是开发者 API 站，不是清言 How-to。
- 清言首页可见能力芯片（2026-08-19）：**Agent / 研究报告 / PPT制作 / 数据分析**，模型名 **GLM-5.2**、**GLM-5.2快速**。
- 付费协议 1.6 / 4.1 列出的权益种类：各模型相关权益、各类型 Agent 权益、清影生视频、视频通话、更大的云知识库空间、更多 AI 画图功能。**具体额度以会员权益页面为准**，禁止把三方博客的「每日 50 次」写进正文。
- App Store 官方介绍（[id6450893458](https://apps.apple.com/cn/app/id6450893458)）按场景列了通用问答 / 媒体写作 / 写作 / 学习 / 职场 / 编程 / 教育 / 虚拟对话 / 论文 / 公文 / 生活。内购档位会变，正文只链商店页，不把某一天的 ¥ 价写成现行价目表。

**结论六：Z.ai 对话页是 SPA，抓页几乎只有 title/description；能力以官方营销句和 blog 为准。**

- [z.ai](https://z.ai) / [chat.z.ai](https://chat.z.ai) description：「Meet Z.ai, the AI assistant powered by GLM-5.2. Build websites, write code, handle long-horizon tasks, and get instant answers.」
- 公开 UI 芯片（2026-08-19）：**Magic Design / Full-Stack / Write Code**。
- [z.ai/blog/glm-4.5](https://z.ai/blog/glm-4.5) 原文：在 Z.ai 选模型即可聊天；平台支持 artifacts、presentation slide、full-stack development。
- [z.ai/blog/glm-5.2](https://z.ai/blog/glm-5.2) 原文：「Chat with GLM-5.2 on Z.ai」。同一篇把 Coding Plan / ZCode 写成另一条「Use GLM-5.2 with GLM Coding Plan」路径。

**结论七：文件密度不够五文件同构。**

没有官方 CLI、没有清言 How-to 文档树。本站采用 4 文件：`index` + Tutorial + cheatsheet + glossary。**不写 cookbook**（没有可引用的官方配方密度）。不写 Coding Plan 安装。

## 基本信息

- 工具名：智谱清言（国内）/ Z.ai Chat（国际）
- 厂商：智谱（Zhipu / Z.ai）。公司站 <https://www.zhipuai.cn/>
- 官方对话入口：<https://chatglm.cn>、<https://chat.z.ai>
- 发版节奏：消费端模型名随官方公告换（调研时清言与 Z.ai 页面均写 GLM-5.2）。不要写死「当前只有 GLM-5.2」。
- 当前覆盖：2026-08-19 抓到的产品页、付费协议、App Store、公司页、GLM-5.2 研究页 / blog。

易撞名：

- **智谱清言 ≠ Z.ai 对话**（国内 vs 国际入口；法律主体不同）。
- **ChatGLM** 既是历史对话模型名，也出现在清言商店文案里，不等于现在的产品 URL。
- **Z.ai 对话 ≠ Z.ai API ≠ GLM Coding Plan ≠ ZCode**。
- **AutoGLM ≠ AutoClaw**（公司页两者都列；AutoClaw 是本地 OpenClaw 客户端营销名）。
- **对话里写代码 ≠ 仓库 Agent**。

## 官方一级导航（产品家族）

见上文结论三。排轴：本目录主路径是清言 / Z.ai 对话；其余官方 AI 入口全部地图一行。

## 文档文件结构（Diataxis）

```
docs/zh/products/zhipu-chat/
├── index.md                    # 🗺️ 学习地图 + 家族图
├── zhipu-chat.md               # 📘 Tutorial — 两个对话入口怎么用
├── zhipu-chat-cheatsheet.md    # 📐 Reference — 决策表、入口、信息源
└── zhipu-chat-glossary.md      # 📖 Explanation — 撞名与「不是什么」

docs/products/zhipu-chat/       # 英文同构
```

| 文件 | 象限 | 写什么 | 不写什么 |
|------|------|--------|----------|
| `index.md` | 导航 | 家族决策树、一行收齐官方一级 AI | 操作步骤、Coding Plan 安装 |
| `zhipu-chat.md` | Tutorial | 清言 / Z.ai 入口、能做什么、账号边界 | 参数清单、臆造额度 |
| `zhipu-chat-cheatsheet.md` | Reference | 决策表、官方 URL、数据源 | 概念长文、学习路径 |
| `zhipu-chat-glossary.md` | Explanation | 是什么 / 不是什么 | 操作步骤 |

无 cookbook。轴 A：先分清产品名。轴 B：前端工程师先打开网页对话，再决定要不要跳到 Coding Plan。

## 监控页面

- 清言产品：<https://chatglm.cn>
- 清言下载：<https://chatglm.cn/download>
- 清言付费协议：<https://chatglm.cn/pay/policy/vipservice>
- Z.ai 对话：<https://chat.z.ai>
- Z.ai 营销 / 顶栏：<https://z.ai>
- 公司一级产品：<https://www.zhipuai.cn/zh>
- 模型在线体验声明：<https://www.zhipuai.cn/zh/research/161>
- Z.ai API 文档：<https://docs.z.ai>
- 国内开放平台文档：<https://docs.bigmodel.cn>
- Coding Plan（只监控，不写教程）：<https://z.ai/subscribe>、<https://bigmodel.cn/glm-coding>

## Git 提交 scope

```
docs(zhipu-chat): ...
```

## 已知踩坑 / 特殊约定

1. **`chatglm.cn` / `chat.z.ai` 是 SPA**。无头抓页经常只剩 title。能力以 description、可见芯片、官方 blog / 研究页、付费协议为准，不要用三方评测补功能表。
2. **`www.zhipuai.cn` 在部分环境会解析到私网地址**，命令行 GET 可能失败。改用页面阅读器。
3. **禁止把 App Store 某一天的内购价抄成「现行会员价」**。协议写明价格和权益会改，以会员页为准。
4. **禁止把 `docs.z.ai` 的 API 模型表当成清言聊天里一定能选到的模型。**
5. **本 issue 禁止改 `products-gallery.js`。** 侧栏可挂 `sidebars/ai-coding.mjs`。不要改其它厂商目录。
6. **公司页轮播里的「智谱学习中心 / 智谱 AI 输入法 / Zread.ai / AMiner」** 本次未抓到独立产品文档。地图一行链公司页，不要编造二级 URL。

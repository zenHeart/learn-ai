# Google Flow

> Google 的 AI 创意工作室。前端工程师用它做**落地页宣传片、产品演示视频、场景分镜**，不是写代码。
>
> 入口：[labs.google/fx/tools/flow](https://labs.google/fx/tools/flow)。帮助中心：[support.google.com/flow](https://support.google.com/flow)。

## 是什么

官方把它叫 **AI creative studio**：用自然语言做计划、生成、精修，底层是 Google 的生成式模型。

落地页当前列出三套模型：

| 模型 | 官方一句话 |
|---|---|
| **Gemini Omni** | 从任意输入参考（真实或生成）创建并编辑视频；强调世界理解、多模态与对话式编辑 |
| **Nano Banana** | 图像生成与精细编辑；强调主体一致性、文字渲染、推理 |
| **Veo 3.1** | 视频生成；强调物理、真实感、提示词遵循，带原生音频与扩展控制 |

它不在编码主线上。对位 Claude 家族里的 [Claude Design](../claude/claude-design)：Design 出可交接的界面原型，Flow 出可发布的影像。

**年龄与语言**：须满 18 岁。当前只能用英文向 Flow 发提示，回复也是英文。[官方说明](https://support.google.com/googleone/answer/14534406)。

## 何时用

| 我要… | 用 | 不要用 Flow |
|---|---|---|
| 落地页 / 宣传片 / 产品演示 **视频** | **Flow** | Canvas 出的是能点的页面，不是成片 |
| 半小时内给产品经理一个 **能点的原型** | [Canvas](./canvas) | Flow 不做 DOM / 交互 |
| 把选定方案写进仓库 | [Antigravity](./antigravity) | Flow 不改代码、不出 PR |
| 歌曲 / MV / 生成式配乐 | [Flow Music](https://www.flowmusic.app/)（积分与 Flow **分开**） | 不要把 Flow 视频积分当成音乐积分 |

实用组合：Canvas 试三个交互方向 → 选定一个 → Antigravity 在工程里实现；需要对外讲这个功能时，再用 Flow 出 8–10 秒演示片。

## 能做什么

来自 [产品落地页](https://labs.google/fx/tools/flow) 与 [Pro 权益说明](https://support.google.com/googleone/answer/14534406) 列出的能力：

- **生成模式**：Text to video、Frames to video、Ingredients to video、Text to image、Image to image
- **精修**：Video Extension、Video-to-video editing、Scenebuilder
- **角色**：Characters、Avatars
- **Agent**：官方描述为项目级创意搭档，帮你探索和迭代
- **自定义 Tools**：用自然语言做工具（字幕叠层、改比例、分镜、shader），可分享 / remix。免费档只能**使用**已有 Tools；Plus 起才能**创建**

[创建视频](https://support.google.com/flow/answer/16353334) 与 [编辑 / 搭场景](https://support.google.com/flow/answer/16935718) 是操作手册，本页不重复步骤。

<!-- TODO: 待核实 —— 各模式对 Veo / Omni / Nano Banana 的精确对应，以及 Scenebuilder 的官方定义句。落地页列出了模式名，帮助中心按任务拆页，未找到一张官方「模式 × 模型」对照表 -->

## 额度

数字来自 [Manage your Google Flow credits](https://support.google.com/flow/answer/16526234) 与落地页，**不是**从第三方博客抄的。

| 档位 | Flow 积分 |
|---|---|
| 无订阅 | **每天 50**（试用；当日未用完不结转） |
| AI Plus | **每月 200** |
| AI Pro | **每月 1,000** |
| AI Ultra $100（本站称 Ultra 5x） | **每月 10,000** |
| AI Ultra $200（本站称 Ultra 20x） | **每月 25,000** |

要点：

- 付费档按**计费周期**刷新，未用完的月度积分**不结转**。
- 升到付费档后，剩余的免费日积分立刻作废，换成该档月额度。
- 免费日积分只能用于 **Veo 3.1 Lite / Fast / Quality**。
- 用尽后，Plus / Pro / Ultra 可另购 AI credits 续用（日本除外）。同一笔 AI credits 也可用于 [Antigravity](./antigravity)。
- 单次生成消耗因模型而异（例如非 Ultra 的 Veo 3.1 Lite 为 10 分、Quality 为 100 分）。以额度页的表为准，本页不另抄一份。

四档存储、模型倍率、Cloud 额度等**整张订阅表只在**[速查表](./gemini-cheatsheet#订阅层级)。

<!-- TODO: 待核实 —— 落地页列出的美元标价（Plus $4.99 / Pro $19.99 / Ultra $99.99 / $199.99）带 “* Prices may vary by market”。one.google.com 对比页抓取时会吞掉金额，家族价仍以你所在地区的官方页为准 -->

## Flow Sessions

[落地页](https://labs.google/fx/tools/flow) 上的 **Flow Sessions** 是艺术家合作计划：邀请一小批创作者用 Flow 做激情项目、并与 Google 合作。**不是日常产品**，前端工程师不需要单独学，也不要把它写成教程。

## 常见坑

- 部分旧版 Labs 帮助仍写「必须订 Pro / Ultra 才能用」。以落地页和 [额度页](https://support.google.com/flow/answer/16526234) 为准：无订阅可拿每天 50 分试用。
- VPN **不能**绕过地区限制。先查 [Where you can use Flow](https://support.google.com/flow/answer/16353544)。
- 失败的生成不扣分；只要返回了结果就会扣，即使没有音频或质量不理想。
- 所有 Veo / Imagen 产出带不可见 SynthID。<!-- TODO: 待核实 —— 可见水印规则：旧 Labs FAQ 写 Pro 有可见水印、Ultra 没有；未在 16526234 额度页复述，以产品内设置为准 -->

## 官方资源

- [产品入口](https://labs.google/fx/tools/flow)
- [Flow 帮助中心](https://support.google.com/flow)
- [额度与单次消耗](https://support.google.com/flow/answer/16526234)
- [创建视频](https://support.google.com/flow/answer/16353334)
- [Google AI Pro 权益清单](https://support.google.com/googleone/answer/14534406)

## 相关页面

- [订阅与额度](./google-pro) — Pro 里还有哪些编码相关权益
- [Canvas](./canvas) — 能点的原型
- [速查表](./gemini-cheatsheet#选哪个工具) — 按任务选工具

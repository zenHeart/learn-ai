# Google AI 订阅与额度

> 订阅档位决定你能用哪些模型、用多少、以及有没有 Google Cloud 额度。这一页只讲**付费与额度**，各产品怎么用请看对应产品页。

## 先搞清一件事

家族里的产品**不是一份订阅全解锁**，付费入口有两条：

| 入口 | 覆盖 | 面向 |
|---|---|---|
| Google AI 订阅（Plus / Pro / Ultra） | Gemini 应用、Gemini CLI、Jules、Antigravity 等的使用量 | 个人开发者 |
| [Gemini Code Assist](./code-assist) 的 free / Standard / Enterprise | IDE 扩展的能力与合规特性 | 团队与组织 |

**买了个人 AI Pro 不会让 Code Assist 变成企业版**，两者是分开的。团队合规需求走的是 Code Assist 的版本，不是个人订阅。

## 四个档位

订阅分 **AI Plus / AI Pro / AI Ultra 5x / AI Ultra 20x** 四档。各档的模型倍数、存储容量、Google Cloud 额度、Flow 额度等完整对照表见[速查表的订阅层级](./gemini-cheatsheet#订阅层级)，本页不重复维护。

几条选档时真正影响判断的事实：

**1. 扩展上下文从 Pro 档起。** 官方对比表标注 Pro 及以上为 100 万令牌。这是家族里唯一可引用的上下文数字。

**2. Google Cloud 额度只有 Pro 及以上有。** 通过 Google Developer Program 提供：Pro US$10/月，Ultra 5x US$40/月，Ultra 20x US$100/月。要走 Gemini API 或 Vertex AI 的话，这是选 Pro 而不是 Plus 的主要理由。

**3. 智能体类产品的额度只有定性描述。** Jules 与 Antigravity 的官方对比表只写"任务数与并发任务数随档位提高"，**没有给具体数字**。

<!-- TODO: 待核实 —— Jules / Antigravity 各档的具体任务数与并发上限。官方订阅对比表只有定性描述，未找到官方说明给出数字 -->

<!-- TODO: 待核实 —— 四档订阅的具体价格。官方对比页按地区返回本地化内容且吞掉货币金额，未找到可稳定引用的标价，请以你所在地区的官方页面为准 -->

## 该为哪一档付钱

按你**主要用哪个工具**决定，而不是按"哪档功能多"：

| 你的主要用法 | 建议 | 理由 |
|---|---|---|
| 只在终端里偶尔问问题 | 先用免费额度 | 用满了再升，不用提前买 |
| 每天用 Gemini CLI 干活 | Pro | 扩展上下文 + Cloud 额度都从这档起 |
| 要走 Gemini API 做集成 | Pro 起 | 主要为了 US$10 Cloud 额度 |
| 大量跑 Jules / Antigravity 任务 | Ultra | 并发与任务数随档位提高 |
| 团队有合规硬要求 | 走 [Code Assist](./code-assist) 版本 | 个人订阅不提供 VPC-SC / IP 赔偿 |

**顺序很重要：先把免费额度用到不够用，再升档。** 反过来做你会为没用上的容量付钱，而且不知道自己真实的消耗量级。

## 额度不是硬性上限

这是最容易踩的坑：**Google Cloud 额度是"送你的钱"，用完不会自动停，超出部分正常计费。**

必须先设预算再开始跑批量脚本：

```
GCP 控制台 → 计费 → 预算和警报 → 创建预算
    ↓
金额设成你的额度金额（Pro 档即 US$10）
    ↓
告警阈值：50% / 90% / 100%
```

**但要注意预算本身只发通知，不会停用服务。** 想要真正的硬停止，官方文档给的方案是把预算通知发到 Pub/Sub，再用一个函数去关掉计费账号的绑定——这需要你自己搭：

- [设置预算通知](https://cloud.google.com/billing/docs/how-to/notify)
- [用通知自动停用计费](https://cloud.google.com/billing/docs/how-to/disable-billing-with-notifications)

最容易超支的两类操作：**长上下文单次调用**（成本远高于交互式对话）和**无人值守的批量脚本**。这两件事之前，预算一定要先配好。

## 安全实践

订阅额度之外，值得配的几条：

| 实践 | 怎么做 |
|---|---|
| 让智能体只在可信目录里自动执行 | Gemini CLI 的 `security.folderTrust.enabled`，见[速查表](./gemini-cheatsheet#配置速查) |
| 智能体改动隔离在独立分支 | 开跑前切分支，事后用 diff 审查 |
| 关键改动人工确认 | Jules 的计划批准、Antigravity 的计划构件 |
| 定期读改动而不是只看结论 | 智能体的验证记录只是参考，不能替代 review |

> ⚠️ 历史版本文档里出现过 `security.allowedCommands` / `security.deniedCommands` / `security.sandboxMode` 这类配置键，**官方文档里不存在**。真实存在的安全相关配置只有信任文件夹等少数几项，见[速查表](./gemini-cheatsheet#配置速查)。

## 各产品在哪

这一页不重复产品介绍，直接去对应页面：

- 终端 → [Gemini CLI](./gemini-cli)
- 自主开发平台 → [Antigravity](./antigravity)
- 云端异步任务 → [Jules](./jules)
- 原型 → [Canvas](./canvas)
- IDE 扩展 → [Code Assist](./code-assist)
- 模型与 API → [AI Studio](./ai-studio)

## 官方资源

- [Google AI 订阅对比](https://one.google.com/about/google-ai-plans/)
- [Google Developer Program](https://developers.google.com/program)
- [GCP 预算与告警](https://cloud.google.com/billing/docs/how-to/budgets)

## 相关页面

- [速查表](./gemini-cheatsheet#订阅层级) — 四档完整对照表
- [Cookbook](./gemini-cookbook#_14-拿到-google-cloud-额度-怕超支) — 预算配置配方

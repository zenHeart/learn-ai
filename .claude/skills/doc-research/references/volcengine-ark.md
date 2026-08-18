# 火山方舟 维护参考

> 复制自 [`_template.md`](./_template.md)。读者可见的数据源写进 cheatsheet，不要在本文件再抄一份。

## 产品形态调研结论（写教程前必须先有这一节）

调研时间：2026-08-19。

**结论一：火山方舟是火山引擎的大模型服务平台（API / 模型广场 / 精调 / 评测），不是豆包 App。**

- 产品页 [volcengine.com/product/ark](https://www.volcengine.com/product/ark) description：「火山方舟提供模型训练、推理、评测、精调等全方位功能与服务，并重点支撑大模型生态。」
- 文档中心产品 ID **82379**：[docs/82379](https://www.volcengine.com/docs/82379)
- 文档侧栏一级（2026-08-19 打开产品简介 / 快速入门页可见）：开始使用（产品简介、快速入门、模型列表、模型价格、豆包大模型1.8）、模型调用、进阶使用（接入三方工具、Responses API）、部署方式、高级能力（模型精调）、**Coding Plan**、实践教程。
- 产品简介最近更新：2026.01.31。快速入门最近更新：2026.01.30。两页正文是 SPA，无 JS 抓取不到步骤。**禁止编造 Base URL、模型 ID、SDK 示例字段。** 操作一律链回官方页。

**结论二：官方有方舟 CLI。命令只抄能打开的产品页 / 首页。**

- 火山引擎首页（[volcengine.com](https://www.volcengine.com/)）原文：`npm i @volcengine/ark-cli@latest -g`
- 产品页：「方舟 CLI 上线，支持 Claude Code、Cursor、TRAE 等」
- 产品页：「一行命令，让 Agent 驱动方舟」「通过火山方舟官方命令行工具，一行命令完成认证、模型调用与资源管理」
- 获取 API KEY 入口（首页）：[ark.volcengine.com/region:cn-beijing/apiKey](https://ark.volcengine.com/region:cn-beijing/apiKey)

**结论三：套餐数字只抄产品页已出现的句子，不抄第三方价表。**

产品页可见：

- 方舟 Agent Plan 上线……**限时 9.9 元起**
- 在线推理：**6元起/百万输入tokens**、**30元起/百万输出tokens**
- 包天预付费 / 小时后付费另有 TPM 单价（产品页）
- 协作奖励计划二期：免费每日领取单模型最高 500 万 Tokens

完整模型单价以 [模型价格](https://www.volcengine.com/docs/82379/1544106) 为准，本站不抄全表。

**结论四：同厂其它 AI 产品只在家族图一行。**

豆包 App（#79）、Trae（#80）、扣子（#81）不写正文。弹性计算 / TOS / CDN 标「非本站」。产品页提到「扣子专业版」是方舟能力扩展里的一句话，链到 #81，不在本目录展开。

**结论五：对前端工程师——这是接豆包大模型的 API 平台。**

第一次：控制台拿 Key → 按官方快速入门调一次 → 或装官方 CLI。仓库级 IDE 是 Trae。聊天助手是豆包 App。

## 基本信息

- 工具名：火山方舟 / Volcengine Ark
- 官方产品页：<https://www.volcengine.com/product/ark>
- 官方文档根：<https://www.volcengine.com/docs/82379>
- 当前覆盖：2026-08-19 打开的产品页、文档侧栏、火山引擎首页

## 官方一级导航（产品家族）

| 官方一级入口 | 官方 URL | 本站去向 | 不拆页理由 |
|--------------|----------|----------|------------|
| 火山方舟产品页 | https://www.volcengine.com/product/ark | 独立 Tutorial | |
| 文档中心 82379 | https://www.volcengine.com/docs/82379 | 地图 + 速查 | |
| 产品简介 | https://www.volcengine.com/docs/82379/1099455 | Tutorial 链 | SPA，不复述空正文 |
| 快速入门 | https://www.volcengine.com/docs/82379/1399008 | Tutorial 主链 | 同上 |
| 模型列表 | 文档侧栏「模型列表」 | 速查链 | 不抄全表 |
| 模型价格 | https://www.volcengine.com/docs/82379/1544106 | 速查链 | 不抄全表 |
| 豆包大模型 1.8 | 文档侧栏 | 地图一行 | 模型代际，不是新产品 |
| Coding Plan | 文档侧栏 | Cookbook 一行 | 套餐，操作以官方为准 |
| 接入三方工具 | 文档侧栏 | Cookbook | CLI / Claude Code / Cursor / TRAE |
| 方舟 CLI | 首页 npm 命令 | Tutorial + 速查 | |
| API Key 控制台 | https://ark.volcengine.com/region:cn-beijing/apiKey | Tutorial | |
| 豆包 App | https://www.doubao.com/ | 地图一行（#79） | |
| Trae | https://www.trae.ai/ | 地图一行（#80） | |
| 扣子 | https://www.coze.cn/ | 地图一行（#81） | |
| ECS / TOS / CDN | 火山引擎其它产品 | 非本站 | |

易撞名：方舟 ≠ 豆包 App；方舟 ≠ Trae；方舟 CLI ≠ Trae CLI；Coding Plan ≠ Agent Plan；豆包大模型 ≠ 豆包聊天。

## 文档文件结构（Diataxis）

```
docs/zh/products/volcengine-ark/
├── index.md
├── volcengine-ark.md
├── volcengine-ark-cookbook.md
├── volcengine-ark-cheatsheet.md
└── volcengine-ark-glossary.md
docs/products/volcengine-ark/
```

Cookbook 只写「去哪张官方页」，不编 HTTP 示例。

## 监控页面

- 产品页：<https://www.volcengine.com/product/ark>
- 文档根：<https://www.volcengine.com/docs/82379>
- 产品简介：<https://www.volcengine.com/docs/82379/1099455>
- 快速入门：<https://www.volcengine.com/docs/82379/1399008>
- 模型价格：<https://www.volcengine.com/docs/82379/1544106>
- 首页 / CLI：<https://www.volcengine.com/>
- API Key：<https://ark.volcengine.com/region:cn-beijing/apiKey>

## Git 提交 scope

```
docs(volcengine-ark): ...
```

## 已知踩坑 / 特殊约定

1. 文档中心是 SPA。禁止根据空白抓取编造步骤。
2. 模型 ID 和单价只链官方列表。
3. 不要改 gallery / sidebar / `config.mjs`。
4. 不要写豆包 App / Trae / 扣子教程。

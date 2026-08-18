# 豆包 维护参考

> 复制自 [`_template.md`](./_template.md)。读者可见的数据源写进 `docs/zh/products/doubao/doubao-cheatsheet.md`，不要在本文件再抄一份。

## 产品形态调研结论（写教程前必须先有这一节）

调研时间：2026-08-19。每条都来自打开过的官方页。

**结论一：豆包是字节跳动消费级 AI 助手，不是 Trae、不是扣子、不是火山方舟。**

- [doubao.com](https://www.doubao.com/) 收录 description：「豆包 是你的AI 聊天智能对话问答助手，写作文案翻译编程工具。」
- 同页还写：「Seedance 2.0 视频生成模型现已全面接入 豆包 ，现在登录即可免费使用！」
- 没有官方 How-to 文档树、`llms.txt`、CLI。禁止写成「豆包 CLI / 豆包 IDE」。

**结论二：官方交付面是网页 + 桌面客户端 + 手机 App。**

| 形态 | 官方出处 | 本站 |
|------|----------|------|
| 网页 | https://www.doubao.com/ | Tutorial |
| 桌面客户端 | https://www.doubao.com/download/ 、https://www.doubao.com/download/desktop | Tutorial |
| 手机 App | 应用宝 `com.larus.nova`；Microsoft Store id `XPDDTBMM6TZ365` | Tutorial 一行 |
| 豆包手机助手 | https://o.doubao.com/ | 地图一行：硬件 / 手机助手，不是聊天 App 本体 |
| Seed 研究 | https://seed.bytedance.com/zh/ | 地图一行：研究品牌，不是助手 |

桌面落地页可见原文（[download/desktop](https://www.doubao.com/download/desktop)）：「下载豆包客户端，解锁全链路AI 生产力：日常工作可高效写作翻译、一键生成PPT、智能处理Excel 数据；创意创作依托专业版Seedream 5.0 生图，专业版Seedance 2.5 生视频核心模型……内置自主规划执行的 Agent 智能体」。

**结论三：两份官方视频模型文案必须并列，禁止选边。**

- 首页 / 下载页 meta：Seedance **2.0** 现已全面接入，登录即可免费使用。
- 桌面落地页正文：专业版 Seedance **2.5**、专业版 Seedream **5.0**。

**结论四：同厂其它 AI 产品只在家族图一行。**

- Trae（#80）、扣子 / Coze（#81）、火山方舟（#82）不写正文。
- 抖音 / 飞书 / 今日头条标「非本站」。
- 部分网络打不开首页时，页面提示可改用 **Dola**。Dola 不是本 issue 产品，地图一行。

**结论五：没有官方价目表。禁止编造会员价。**

应用宝抽查：开发者 / 运营者 **北京春田知韵科技有限公司**；包名 `com.larus.nova`。不要把第三方「每日 N 次」写进正文。

**结论六：对前端工程师——可以收进货架，不要硬凑仓库级编程教程。**

官方「编程工具」是对话里写文案 / 辅助编程。仓库 / IDE 走 Trae（#80）。接豆包模型 API 走火山方舟（#82）。

## 基本信息

- 工具名：豆包 / Doubao
- 厂商：字节跳动。应用宝开发者：北京春田知韵科技有限公司
- 官方产品根：<https://www.doubao.com/>
- 发版节奏：不绑定单一版本号
- 当前覆盖：2026-08-19 打开的官方页

## 官方一级导航（产品家族）

| 官方一级入口 | 官方 URL | 本站去向 | 不拆页理由（若一行） |
|--------------|----------|----------|----------------------|
| 豆包（网页 / 客户端） | https://www.doubao.com/ | 独立页 `doubao.md` | |
| 下载中心 / 桌面版 | https://www.doubao.com/download/ 、https://www.doubao.com/download/desktop | Tutorial | 同一产品 |
| 豆包手机助手 | https://o.doubao.com/ | 地图一行 | 硬件助手，不是聊天本体 |
| ByteDance Seed | https://seed.bytedance.com/zh/ | 地图一行 | 研究品牌 |
| Dola | 首页区域限制提示 | 地图一行 | 另一入口，本 issue 不写 |
| Trae | https://www.trae.ai/ 、https://www.trae.cn/ | 地图一行（#80） | 不写 IDE |
| 扣子 / Coze | https://www.coze.cn/ | 地图一行（#81） | 不写 Agent 搭建 |
| 火山方舟 | https://www.volcengine.com/product/ark | 地图一行（#82） | 不写 API |
| 抖音 / 飞书 / 头条 | 非本站 | 标「非本站」 | 非本 issue |

易撞名：豆包 ≠ Trae ≠ 扣子 ≠ 方舟；豆包 App ≠ 豆包大模型 API；豆包 ≠ 豆包手机助手；Seedance 2.0（首页）≠ Seedance 2.5（桌面页）。

## 文档文件结构（Diataxis）

官方没有 How-to 文档树，**不写 cookbook**。

```
docs/zh/products/doubao/
├── index.md
├── doubao.md
├── doubao-cheatsheet.md
└── doubao-glossary.md
docs/products/doubao/
```

## 监控页面

- 产品首页：<https://www.doubao.com/>
- 下载：<https://www.doubao.com/download/>
- 桌面落地：<https://www.doubao.com/download/desktop>
- 应用宝：<https://sj.qq.com/appdetail/com.larus.nova>
- Microsoft Store：<https://apps.microsoft.com/detail/xpddtbmm6tz365>
- Seed：<https://seed.bytedance.com/zh/>
- 手机助手：<https://o.doubao.com/>

## Git 提交 scope

```
docs(doubao): ...
```

## 已知踩坑 / 特殊约定

1. 首页 SPA。无 JS 抓取经常只剩 meta。能力以 description + 桌面落地页原文为准。
2. Seedance 版本号两份官方页打架，并列引用。
3. 部分环境解析到 `198.18.0.0/15`，`web_fetch` 会 SSRF。
4. 不要改 gallery / sidebar / `config.mjs`。
5. 禁止把 Trae 安装、方舟 API、扣子编排写进本目录。

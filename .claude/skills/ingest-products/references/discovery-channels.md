# 发现渠道与官方域名白名单

## 在册厂商

分区派发一律以 `data/products/vendors.json` 为准，不要在本文件里另抄一份厂商清单——那是第二份会过期的真相。

- `coverage_tier: 1` —— 主力厂商，每轮增量必扫。
- `coverage_tier: 2` —— 覆盖尚不完整或未核验，低频扫。
- `active: false` —— 已停用，历史档案保留，不再扫新。
- `official_domains[]` —— 该厂商的官方域名白名单。**为空表示尚未人工核验**，此时抓取结果不能当作一级来源。

## 跳转守卫

抓厂商入口时**手动跟跳转并逐步校验 host**：任何一跳跳出 `official_domains` 白名单就中止，并把该厂商记为「入口失败」，**不要**顺着陌生域名继续抓。那类页面通常是聚合站或仿冒站。

## 各家脾气（抓取经验）

| 厂商 | 入口形态 | 注意 |
|---|---|---|
| OpenAI / Anthropic / Google | 官网产品页 + blog | 产品页常是 SPA，静态抓可能拿不到内容，需要 reader 或无头浏览器 |
| xAI / Meta / Mistral | 官网 + 独立控制台 | Grok 的日期在官网不易找，优先用官方发布公告 |
| 字节跳动 | 豆包/扣子/Trae/火山方舟 四条线 | **不可只扫豆包**，四条线各自独立发布 |
| 腾讯 | 混元/元宝/元器/CodeBuddy | 同上，四条线 |
| 阿里 | 千问/通义/灵码(Qoder)/百炼 | 同上，且灵码 2026 年更名 Qoder，两条都要 |
| 智谱 / 月之暗面 / MiniMax | 清言·BigModel / Kimi·Kimi Code / Agent·Code | 每家至少两条产品线 |
| 百度 / 昆仑万维 / 阶跃 / 零一万物 | 文心·千帆 / 天工 / 跃问 / 万智 | 消费面与开放平台面分别建档 |

## 旁证手段

旁证只用来**查漏**与佐证日期，**不单独作为证据**：

- 厂商 changelog / release notes 的最早条目
- 官方 RSS / sitemap 的最早时间戳
- 官方社媒公告（有明确日期）
- 应用商店上架日期（App Store / Google Play / Chrome Web Store）—— 适合佐证"当时已可安装"

## 发现不了怎么办

- 只有传闻/聚合站/榜单站提到 → **不建档**，进报告的「跳过清单」并写明原因。
- 官网反爬 403 → 可以建档（官网 URL 是已知的），但 `notes` 标注未确认，报告里单列。
- 域名失效且找不到新域名 → `status: "discontinued"`，**不删档**。

## 新厂商接入

发现账本里没有的厂商时：

1. 在 `data/products/vendors.json` 追加一条：`id`（kebab，非拉丁名给英文/拼音，**不要**用 `x-2` 这类退化 id）、`display_name`、`display_name_zh`、`region`、`coverage_tier`、`active`、`official_domains`。
2. **收口阶段单进程改这个文件**——并行 agent 不许碰（见 SKILL.md 红线 5）。
3. 跑 `node scripts/products/validate-products.mjs`，外键会替你把关。

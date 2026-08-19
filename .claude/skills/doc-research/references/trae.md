# Trae 维护参考

> 这是 [`_template.md`](./_template.md) 针对 Trae / TraeCode 的具体化。读者可见的数据源写在 `docs/zh/products/trae/trae-cheatsheet.md` 的「高质量信息源」，不要在本文件再抄一份。

## 基本信息

- 工具名：TraeCode（品牌名 TRAE；本目录只展开编程 IDE）
- 官方文档根地址：国际站 <https://docs.trae.ai>；中国站 <https://docs.trae.cn>（提供 `llms.txt` 与同路径 `.md`）
- 发版节奏：文档站 Changelog 按小版本连续发（国际站可见 3.5.x 线；中国站 Changelog 单独记）
- 当前覆盖版本：2026-08-19 打开的官方首页 / 下载中心 / docs 侧栏

## 官方一级导航（产品家族）

文档站顶栏（2026-08-19 打开 <https://docs.trae.ai/ide/device-limit>）和营销首页（<https://www.trae.ai/>）对账：

| 官方一级入口 | 官方 URL | 本站去向（独立页 / 地图一行 / 缺失） | 不拆页理由（若一行） |
|--------------|----------|--------------------------------------|----------------------|
| **TraeCode**（AI 编程 IDE） | [www.trae.ai](https://www.trae.ai/) · [下载](https://www.trae.ai/download) · [docs.trae.ai](https://docs.trae.ai/ide/what-is-trae) | 独立页：本目录 Tutorial | 本 issue 主路径 |
| **TraeWork**（办公 / 工作台） | [www.trae.ai/work](https://www.trae.ai/work) · [What is TRAE Work?](https://docs.trae.ai/solo/what-is-trae-solo) | 地图一行 | 官方一级，但是办公 Agent，不是本目录 Tutorial |
| **TraeCode Plugin** | 文档站顶栏 · 企业页描述 VS Code / JetBrains | 地图一行 | 独立文档根 URL 未单独打开；企业页有职责说明 |
| **TRAE Enterprise** | [www.trae.ai/enterprise](https://www.trae.ai/enterprise) | 地图一行 | 团队采购，不是个人 Tutorial |
| **TraeCode CLI** | 企业页写 **coming soon** | 地图一行 | 官方标明尚未上线，禁止编命令 |
| **TRAE Editor for Unity** | [docs.trae.cn 教程](https://docs.trae.cn/ide_trae-editor-for-unity-tutorial.md) | 地图一行 | Unity 插件，不是前端主路径 |
| **中国站** | [www.trae.cn](https://www.trae.cn/) · 快速开始链 [www.trae.com.cn](https://www.trae.com.cn) · [docs.trae.cn](https://docs.trae.cn/ide_what-is-trae-code) | 地图一行 + Tutorial 分表面写 | 与 `trae.ai` 不是同一套登录 / 额度 / 设备上限 |
| **火山引擎 TRAE** | [volcengine.com/product/trae](https://www.volcengine.com/product/trae) | 地图一行 | CN 云产品位，不是第二套 IDE 教程 |
| **豆包** | 另 issue #79 | 地图一行 | 同厂，不在本目录展开 |
| **扣子 Coze** | 另 issue #81 | 地图一行 | 同厂，不在本目录展开 |
| **火山方舟 Ark** | 另 issue #82 | 地图一行 | 同厂，不在本目录展开 |

易撞名（可执行文件名 ≠ 营销名 / Mode ≠ 同名产品）：

- **TRAE（品牌）≠ TraeCode（编程 IDE）≠ TraeWork（办公工作台）**
- **TraeCode 里的 SOLO 模式 ≠ TraeWork**。官方原文：TraeWork builds upon TraeCode's SOLO mode
- **旧名 TRAE IDE / TRAE SOLO 独立端** 已收进 TraeCode / TraeWork，不要拆成第三个产品
- **CUE** 是 TraeCode 补全，不是 Cursor
- **TraeCode Plugin**（嵌进 VS Code / JetBrains）≠ TraeCode 桌面 IDE 里的扩展市场
- **trae.ai 国际站 ≠ trae.cn / trae.com.cn 中国站**。设备上限、登录方式、旧 macOS 回退版本号以各自文档为准

## 文档文件结构（Diataxis）

```
docs/zh/products/trae/
├── index.md                 # 🗺️ 学习地图
├── trae.md                  # 📘 Tutorial — 官方下载、第一项目、IDE / SOLO
└── trae-cheatsheet.md       # 📐 Reference — 官方入口、OS、设备上限、数据源
```

英文镜像在 `docs/products/trae/`，文件名相同。

**不写** `trae-cookbook.md` / `trae-glossary.md`：官方 How-to（Figma / MCP / Skill）已经成树；易撞名收进地图。密度不够再拆第三份「是什么」。

| 文件 | 象限 | 写什么 | 不写什么 |
|------|------|--------|----------|
| `index.md` | 导航 + 速查 | 家族全景 + IDE/SOLO/Work 决策 | 逐步点击路径 |
| `trae.md` | Tutorial | 选表面、官方下载、打开项目、切模式 | 套餐金额表、Unity、TraeWork 教程 |
| `trae-cheatsheet.md` | Reference | OS 表、设备上限、官方 URL 索引 | 概念长文 |

## 监控页面

- 国际站产品首页：<https://www.trae.ai/>
- 国际站下载：<https://www.trae.ai/download>
- 国际站定价：<https://www.trae.ai/pricing>
- 国际站营销 Changelog：<https://www.trae.ai/changelog>（2026-08-19 抓到的正文几乎空，以文档站为准）
- 国际站文档 Changelog：<https://docs.trae.ai/ide/changelog>
- What is TraeCode：<https://docs.trae.ai/ide/what-is-trae>
- Quickstart：<https://docs.trae.ai/ide/set-up-trae>
- Device limit：<https://docs.trae.ai/ide/device-limit>
- SOLO mode：<https://docs.trae.ai/ide/solo-mode>
- Models：<https://docs.trae.ai/ide/models>
- TraeWork 文档：<https://docs.trae.ai/solo/what-is-trae-solo>
- 中国站：<https://www.trae.cn/> · 快速开始原文链 <https://www.trae.com.cn>
- 中国站文档 / `llms.txt`：<https://docs.trae.cn/llms.txt>
- 中国站快速开始（`.md`）：<https://docs.trae.cn/ide_get-started-with-trae.md>
- 中国站设备上限（`.md`）：<https://docs.trae.cn/ide_device-limit.md>
- 火山引擎产品位：<https://www.volcengine.com/product/trae>

## Git 提交 scope

```
docs(trae): ...
```

## 已知踩坑 / 特殊约定

- **两套表面不要混抄。** 国际站设备上限是 **3** 台（[device-limit](https://docs.trae.ai/ide/device-limit)）；中国站 `.md` 写 **10** 台（[ide_device-limit.md](https://docs.trae.cn/ide_device-limit.md)）。登录方式、旧 macOS 回退版本号也不同。写之前先标表面。
- **中国站旧 macOS 回退版本号是 3.3.25**（[ide_get-started-with-trae.md](https://docs.trae.cn/ide_get-started-with-trae.md)）。国际站中文 Quickstart 搜索摘要写过 **3.5.25**。不要合成一个数字。
- **中国站快速开始链的下载域是 `www.trae.com.cn`**，营销首页还有 `www.trae.cn`。两份都是官方入口，不要宣布其中一个作废。
- **套餐：跟现行定价页，不跟 Legacy。** 国际站营销页 <https://www.trae.ai/pricing> 写 Lite / Pro / Pro+ / Ultra；文档站另有 `(Legacy) Plans & billing`。只抄能打开的现行页；Lite / Pro+ / Ultra 的完整月费没抓全就链过去，禁止补「应该是」。
- **TraeWork 模式数官方页打架。** 营销页写 Work / Code / Design；国际站 What is TRAE Work 英文页写 Work 与 Code 两种。不要用「通常」抹平，写清以哪页为准。
- **不要编 CLI 安装命令。** 企业页写 TraeCode CLI coming soon。Quickstart 只说首次设置里「添加 TRAE 相关的命令行」，没有 `brew install` / `npm i -g` 原文。
- **不要编国际站登录方式。** 中国站快速开始原文：手机号、抖音、苹果、稀土掘金。国际站 Quickstart 英文正文 2026-08-19 没抓到登录列表。
- **文档站 HTML 常是 SPA。** 国际站优先打开已确认路径；中国站优先 `llms.txt` 和同路径 `.md`。
- **本仓导航。** issue 原文提过 gallery / sidebar；执行指令禁止改 `config.mjs`、gallery、sidebar。只写 `docs/products/trae/` 与 `docs/zh/products/trae/`。

# 千问 维护参考

> 复制自 [`_template.md`](./_template.md)。通用流程见 [`maintenance-workflow.md`](./maintenance-workflow.md)。读者可见的数据源写进 `docs/zh/products/qwen/qwen-cheatsheet.md` 的「高质量信息源」，不要在本文件再抄一份。

## 产品形态调研结论（写教程前必须先有这一节）

调研时间：2026-08-19。以下每条都来自一手官方来源，来源标在括号里。

**结论一：本 issue 的产品是 qianwen.com 上的消费级「千问」助手，不是通义灵码 / Qoder CN，也不是百炼 API。**

- [qianwen.com](https://www.qianwen.com/) 页面 title：`千问-阿里 AI 助手`。搜索引擎收录的 description 原文：「千问 是 阿里官方AI助手 ,提供最强Qwen大模型体验的第一入口,助力你的工作、学习、生活。」
- 同页可见：「你好，我是千问」；顶栏 **API 服务** / **下载电脑端** / **登录**；侧栏 **新建对话** / **云空间** / **AI创作** / **定时任务**；当前模型标签 **Qwen3.7-千问**。
- [通义实验室](https://tongyi.aliyun.com/) 页脚「个人应用」链到 `https://www.qianwen.com/?source=tongyigw`，把它标成实验室网关下的个人应用，不是模型站本身。
- 没有官方 How-to 文档树、`llms.txt`、CLI reference。禁止写成「千问 CLI / 千问 IDE」。

**结论二：官方交付面是网页 + 多端客户端。协议还写了浏览器插件、小程序、H5、HarmonyOS，本站找不到独立安装页的不拆页。**

| 形态 | 官方出处 | 本站 |
|------|----------|------|
| 网页 | `https://www.qianwen.com/` | Tutorial |
| Windows / Mac 电脑端 | 首页 **下载电脑端**；`https://www.qianwen.com/download`（title：`千问PC客户端 - 阿里AI助手`）；Microsoft Store id `XP8M1SGL1LZR2F` | Tutorial |
| iOS / iPad | App Store「千问 - 阿里AI助手」id `6466733523`；兼容性 **iOS 14.0 / iPadOS 14.0** 或更高 | Tutorial 一行 |
| Android | 应用宝包名 `com.aliyun.tongyi`；开发者 / 运营者：上海智信普惠科技有限公司；抽查 **V 7.1.2.2989**（2026-08-15） | Tutorial 一行 |
| HarmonyOS / 浏览器插件 / 小程序 / H5 | 《千问用户服务协议》1.1 原文列出（[用户协议](https://terms.alicdn.com/legal-agreement/terms/c_end_product_protocol/20231011201348415/20231011201348415.html)） | 地图一行。2026-08-19 未找到千问助手自己的独立安装页。`help.aliyun.com/zh/qwenwork` 是千问办公 / QwenWork，**不要**当成 qianwen.com 助手教程 |
| 千问输入法 | 首页横幅「千问输入法 App 全新上线」；应用宝另有 `com.qianwen.ime` | 地图一行。首页能力，不拆手册 |

协议 1.2 还写：Windows / Mac 客户端支持网页搜索与浏览，可用**千问侧边栏**「边浏览边对话、边看边总结、即问即答」。首页横幅另有「千问快捷划词」。

**结论三：国际站页面名是 Qwen Studio，不是「千问」二字的英译页。只在家族图占一行。**

- [chat.qwen.ai](https://chat.qwen.ai/) 页面 title：**Qwen Studio**。可见 **Qwen3.7-Plus**、**Log in / Sign up**、「How can I help you ?」、**Download App**。
- [qwen.ai](https://qwen.ai/) 原文：「Qwen Studio is an AI assistant for everyone, powered by the Qwen series models. It’s free to use, open to all…」一级 nav：**Qwen Studio / Qwen Code / Research / API Platform / Ambassador**。
- 下载中心：[qwen.ai/download](https://qwen.ai/download)（Mobile App Store / Google Play；Desktop macOS / Windows）。
- 国际 App：Play 包名 `ai.qwenlm.chat.android`（开发者 Alibaba Cloud / ALIBABA CLOUD (SINGAPORE) PRIVATE LIMITED）；App Store「Qwen Studio-Ask Qwen, Know More」id `6743778442`。
- **不要**把 `chat.qwen.ai` 写成 qianwen.com 的英文镜像，也不要在本目录写 Qwen Studio / Qwen Code 安装。

**结论四：同厂其它 AI 产品只在家族图一行。本目录不写灵码 / Qoder、不写百炼 API。**

| 同厂入口 | 官方 URL | 去向 |
|----------|----------|------|
| 通义灵码 / Qoder CN | [lingma.aliyun.com](https://lingma.aliyun.com/)、[qoder.com.cn](https://qoder.com.cn/)、[aliyun.com/product/lingma](https://www.aliyun.com/product/lingma) | 地图一行（#84）。帮助中心原文：Qoder CN 系列原名通义灵码，2026-05-20 更名 |
| 阿里云百炼 | [aliyun.com/product/bailian](https://www.aliyun.com/product/bailian) | 地图一行（#85） |
| 万相 | 通义实验室 [landing?family=wan](https://tongyi.aliyun.com/landing?family=wan) | 地图一行 |
| 通义实验室 API 平台 / 开源社区 | [tongyi.aliyun.com](https://tongyi.aliyun.com/) 页脚按钮 | 地图一行。API 落到百炼；开源按钮落地 URL 2026-08-19 **未点开核对**，用已确认的 [QwenLM](https://github.com/QwenLM)、[qwenlm.github.io](https://qwenlm.github.io/) |
| Qwen Code | [qwen.ai/qwencode](https://qwen.ai/qwencode) | 地图一行：国际站终端编码 Agent，本目录不写安装 |
| 淘宝 / 钉钉 / ECS | 非 AI 产品 | 地图标「非本站」。协议登录方式提到淘宝 / 支付宝账号，那是登录手段，不是教程对象 |

**结论五：首页能力清单和商店长描述是两份原文，必须并列；禁止用应用宝「通义介绍」旧段当现行规格。**

首页可见模式 / 入口（2026-08-19）：**快速**、**办公助理**、**本地电脑**、PPT创作、AI生视频、AI生图、代码、翻译、AI写作、研究、录音纪要、千问高考、音视频速读；横幅「千问办公助理上线 解锁本地任务能力」「支持手机远程操控，丰富技能与连接器，多格式交付」。

App Store / 应用宝「简介」共同原文包括：对话问答、办公助理、定时任务、语音通话、AI智能体、AI生活帮手、AI写作 / AI PPT / 智能编辑器 / 文档阅读 / 代码处理 / 实时记录、Wan 2.7、Qwen-Image 2.0、学习辅导。

应用宝另有一段仍写「通义APP」「全民舞王 / 全民唱演」「通义听悟」「集成……通义灵码」。那是商店旧简介，**不要**写进能力表当现行功能。

**结论六：没有 qianwen.com 官方价目表。禁止编造会员价。**

App Store 标「免费 · App 内购买」，并链《会员协议》。协议与商店都没有在本站打开过一张人民币价表。百炼 Token Plan「包月最低 39 元」是 #85 的文案，**禁止**写进千问教程。

**结论七：对前端工程师的定位——可以收进产品货架，不要硬凑编程 Agent 教程。**

官方「代码」是对话里生成 / 检查 / 改写小程序、网页、小游戏、SQL（App Store「代码处理」）。仓库 / IDE 编码走通义灵码 / Qoder CN（#84）。模型机制链本站 Learn LLM。

**禁止当事实写：**

- 通义灵码 / Qoder / 百炼 CLI 安装命令当本目录主路径。
- 把 `chat.qwen.ai` 叫成「千问国际版」产品名（页上写的是 **Qwen Studio**）。
- 把 QwenWork / 千问办公 HarmonyOS 指南当成 qianwen.com 助手安装步骤。
- 臆造会员价、默认模型 slug、MCP、CLI flag。
- 把应用宝「通义介绍」旧段和用户评论里的外卖优惠写成规格。

## 基本信息

- 工具名：千问 / Qwen（消费级助手）
- 厂商：阿里 / 通义。协议经营者：上海智信普惠科技有限公司
- 官方产品根：<https://www.qianwen.com/>
- 实验室网关：<https://tongyi.aliyun.com/>
- 国际站（地图一行）：<https://chat.qwen.ai/>（页名 Qwen Studio）、<https://qwen.ai/>
- 发版节奏：应用宝抽查 7.1.2.2989（2026-08-15）；不绑定单一版本号
- 当前覆盖：2026-08-19 打开的官方页（见监控页面）

## 官方一级导航（产品家族）

| 官方一级入口 | 官方 URL | 本站去向 | 不拆页理由（若一行） |
|--------------|----------|----------|----------------------|
| 千问（网页 / 客户端） | https://www.qianwen.com/ | 独立页 `qwen.md` | |
| 下载电脑端 / PC 客户端 | https://www.qianwen.com/download | Tutorial 一节 | 同一产品的桌面入口 |
| API 服务（首页顶栏） | 首页按钮；同厂 API 平台见百炼 | 地图一行（#85） | 2026-08-19 未点开核对按钮落地 URL |
| 通义实验室 | https://tongyi.aliyun.com/ | 地图一行 | 网关，不是助手本体 |
| 万相 | https://tongyi.aliyun.com/landing?family=wan | 地图一行 | 实验室视觉生成家族 |
| 通义灵码 / Qoder CN | https://lingma.aliyun.com/ 、https://qoder.com.cn/ 、https://www.aliyun.com/product/lingma | 地图一行（#84） | 本 issue 不写安装 |
| 阿里云百炼 | https://www.aliyun.com/product/bailian | 地图一行（#85） | 本 issue 不写 API |
| Qwen Studio | https://chat.qwen.ai/ 、https://qwen.ai/ | 地图一行 | 国际站助手，页名不是「千问」 |
| Qwen Code | https://qwen.ai/qwencode | 地图一行 | 国际站终端编码 Agent |
| Research / 开源 | https://qwenlm.github.io/ 、https://github.com/QwenLM | 地图一行 | 研究与权重，不是助手 |
| 千问输入法 | 首页横幅；应用宝 `com.qianwen.ime` | 地图一行 | 同厂输入法 App，不是助手手册 |
| 办公助理 / 本地电脑 / 定时任务 / 云空间 / AI创作 | 首页侧栏与模式 | Tutorial 能力表 | 千问内能力，不是另一厂产品 |
| 淘宝 / 钉钉 / ECS | 非本站 | 地图标「非本站」 | 不写非 AI 产品 |

易撞名：千问 ≠ 通义实验室 ≠ 万相；千问 ≠ 通义灵码 / Qoder CN；千问 ≠ 百炼；千问 ≠ Qwen Studio ≠ Qwen Code；千问办公助理 ≠ QoderWork / 千问办公；通义（旧商店名）≠ 现行产品名「千问」。

## 文档文件结构（Diataxis）

官方没有 How-to 文档树，**不写 cookbook**（硬凑场景会杜撰步骤）。

```
docs/zh/products/qwen/
├── index.md                 # 学习地图 + 家族图
├── qwen.md                  # Tutorial：打开 qianwen.com、第一句、电脑端 / App
├── qwen-cheatsheet.md       # Reference：入口、决策表、数据源
└── qwen-glossary.md         # Explanation：撞名与边界

docs/products/qwen/          # 英文同构
```

| 文件 | 象限 | 写什么 | 不写什么 |
|------|------|--------|----------|
| `index.md` | 导航 + 速查 | 家族图、决策树、何时用千问 | 逐步点击、灵码 / 百炼教程 |
| `qwen.md` | Tutorial | 打开各端、第一句、官方能力原文 | 套餐价、Qoder 安装、百炼 API |
| `qwen-cheatsheet.md` | Reference | 入口表、决策表、协议 / 商店链接 | 概念长文 |
| `qwen-glossary.md` | Explanation | 千问 / 通义 / Studio / 灵码 / 百炼「不是什么」 | 操作步骤 |

跨页：`index` → `qwen` → `qwen-cheatsheet` → `qwen-glossary`。

## 监控页面

- 产品首页：<https://www.qianwen.com/>
- PC 客户端：<https://www.qianwen.com/download>
- 通义实验室：<https://tongyi.aliyun.com/>
- App Store：<https://apps.apple.com/cn/app/%E5%8D%83%E9%97%AE-%E9%98%BF%E9%87%8Cai%E5%8A%A9%E6%89%8B/id6466733523>
- 应用宝：<https://sj.qq.com/appdetail/com.aliyun.tongyi>
- Microsoft Store：<https://apps.microsoft.com/detail/xp8m1sgl1lzr2f>
- 用户协议：<https://terms.alicdn.com/legal-agreement/terms/c_end_product_protocol/20231011201348415/20231011201348415.html>
- 隐私政策：<https://terms.alicdn.com/legal-agreement/terms/privacy_policy_full/20231011201849846/20231011201849846.html>
- 会员协议：<https://terms.alicdn.com/legal-agreement/terms/c_end_product_protocol/20260728154300619/20260728154300619.html>
- Qwen Studio：<https://chat.qwen.ai/>、<https://qwen.ai/>、<https://qwen.ai/download>
- 无官方 CLI / 千问助手 GitHub Releases

## Git 提交 scope

```
docs(qwen): ...
```

## 已知踩坑 / 特殊约定

1. **`qianwen.com` / `qwen.ai` / `terms.alicdn.com` 在部分环境解析到 `198.18.0.0/15`。** `web_fetch` 会报 SSRF；改用页面阅读器或浏览器。`curl` 失败不等于页面不存在。
2. **首页和下载页是 SPA。** 无 JS 的抓取经常只剩 title。能力清单以首页可见文案、App Store 简介、用户协议为准。
3. **产品改过名。** 商店 / 旧文仍出现「通义」「通义千问」「通义APP」。现行消费助手页写 **千问**。
4. **国际站页名是 Qwen Studio。** 不要发明「千问国际版」这个官方产品名。
5. **不要改 `products-gallery.js` / `sidebars/ai-coding.mjs` / `config.mjs`**（本轮用户硬约束）。
6. **禁止把灵码安装、百炼 API、淘宝 / 钉钉操作写进本目录。**
7. **QwenWork / 千问办公 ≠ 千问助手。** 前者文档在 `help.aliyun.com/zh/qwenwork`，属 #84 家族周边，本目录不写安装。

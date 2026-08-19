# 腾讯元宝 维护参考

> 复制自 [`_template.md`](./_template.md)。通用流程见 [`maintenance-workflow.md`](./maintenance-workflow.md)。读者可见的数据源写进 `docs/zh/products/yuanbao/yuanbao-cheatsheet.md` 的「高质量信息源」，不要在本文件再抄一份。

## 产品形态调研结论（写教程前必须先有这一节）

调研时间：2026-08-19。以下每条都来自一手官方来源，来源标在括号里。

**结论一：元宝是腾讯消费级全能 AI 助手，不是 CLI，也不是 IDE 编程 Agent。**

- `https://yuanbao.tencent.com/` 页面 title：`Yuanbao–Tencent's All-in-One AI Assistant`。
- 同页 meta description 原文：「元宝是腾讯推出的全能 AI 助手，已接入最新的混元 Hy3 模型，拥有更强的文件处理交付能力，多种风格写作轻松驾驭、聊天陪伴更有人情味、AI 搜索更实用精准；智能识图、生图P图、拍题答疑等丰富能力，让您的工作学习生活更轻松高效。」
- 同页可见文案：「Hi, 我是元宝」「聊天、写作、搜索都在行，助你灵感无限」；导航可见 Search / All Collections / Download Center / Log In；支持把文件拖进输入区。
- 没有官方 docs 站、`llms.txt`、CLI reference、API reference。禁止写成「元宝 CLI / 元宝 IDE」。

**结论二：官方交付面是网页 + 多端客户端。协议还写了小程序和浏览器插件，但本站找不到独立安装入口，不拆页。**

| 形态 | 官方出处 | 本站 |
|------|----------|------|
| 网页 | `https://yuanbao.tencent.com/`（「使用网页版」也写在 `https://yuanbao.tencent.com/evt/dl`） | Tutorial |
| iOS / Android | [App Store](https://apps.apple.com/cn/app/%E5%85%83%E5%AE%9D-%E8%85%BE%E8%AE%AF%E5%85%A8%E8%83%BDai%E5%8A%A9%E6%89%8B/id6480446430)；[Google Play](https://play.google.com/store/apps/details?id=com.tencent.hunyuan.app.chat)；下载中心扫码 | Tutorial 一行 |
| Windows / macOS 电脑版 | `https://yuanbao.tencent.com/download`、`https://yuanbao.tencent.com/evt/dl`；腾讯软件中心 [pc.qq.com/detail/1/detail_36661.html](https://pc.qq.com/detail/1/detail_36661.html) | Tutorial |
| 小程序 / 浏览器插件 | 《元宝用户服务协议》服务范围原文：「网页、PC客户端、小程序、浏览器插件以及随着技术发展可能出现的创新形态」（[rule.tencent.com/rule/202403110001](https://rule.tencent.com/rule/202403110001)）；隐私政策同口径（[privacy.qq.com/document/preview/eb9be56572ab4886b6ca124e72abf413](https://privacy.qq.com/document/preview/eb9be56572ab4886b6ca124e72abf413)） | 地图一行。2026-08-19 未找到官方插件商店或小程序独立落地页 |
| 旧路径 | `https://hunyuan.tencent.com/bot/chat` 的 canonical 指向 `https://yuanbao.tencent.com` | 不要当第二个产品 |

下载中心公开系统要求（搜索引擎对 `https://yuanbao.tencent.com/download` 的收录）：iOS / Android 扫码；**macOS 11.3 及以上**；**Windows 10 及以上**。App Store 另写 **iOS 15.0 / iPadOS 15.0 或更高版本**。两处都是官方，并列引用，不要合成一个最低版本。

**结论三：电脑版有独立产品页，能力清单比首页完整，写 Tutorial 以它和商店页为准。**

`https://yuanbao.tencent.com/evt/dl`（title：`元宝电脑版-随时随地唤起-支持一键划词搜索`）可见：

- 栏目：**混元 Hy3**、**AI 写作**、**AI 编程**、**AI 识图**、**AI 划词**；按钮 **下载电脑版** / **使用网页版**
- 「快速写报告、写脚本；专业输出，内容优质」
- 「支持Python、C++等多语言运行，无需部署即时验证」
- 「截图上传即可搜索，即问即答效率倍增」
- 「支持 AI 划词搜索、翻译，什么都能问元宝」
- 「按下快捷键Option+空格（mac）或Alt+空格（window），快速调用迷你对话窗」（原文如此，`window` 未写成 Windows）
- 「支持36种各式文件，代码、日志、技术文档都能读」——**不要编造这 36 种后缀**
- 「精彩回答一键收藏」
- 「临时对话不会显示在历史对话记录中」

腾讯软件中心电脑版补充（[detail_36661.html](https://pc.qq.com/detail/1/detail_36661.html)，版本 **2.80.0.611**，2026-08-10）：联网搜索+高速专线；AI 写作；元宝派公测；文档精读 36 种格式；全局划词；迷你对话窗；Python / C++ 运行；AI 画图；分组定制指令；直连腾讯文档导入导出；截屏识图。

**结论四：App / Play 商店长描述是功能矩阵的另一份原文。模型说法和首页不完全一致，必须并列，禁止选边。**

App Store / Play 共同原文（2026-08-19 打开）：

- 「元宝是一款可深度思考的全能AI助手……支持语音输入；联网搜索公众号、视频号等优质腾讯生态信源……」
- 特色：AI 图片编辑 / 拍题答疑 / **元宝派（开启公测，支持在元宝派养龙虾）** / AI 录音笔（转写翻译不限时）/ 秒写报告文案代码 / AI 讲解 / AI 生成视频 / 语音通话 / 识图 / 拍照翻译 / QQ 音乐 / AI 绘图 / 生态联动微信、腾讯文档、腾讯新闻、微信读书 / Python、C++ 运行 / 公众号与视频号信源 / 文档精读 36 种文件类型 / 秒搜热搜

Play 另有一句仍在「关于此应用」里：「腾讯混元自研T1与DeepSeek R1双推理模型……」。首页与 `evt/dl` 当前主文案是 **混元 Hy3**。App Store 版本说明：2.66–2.67「接入Hy3 preview」；2.76–2.78「Hy3模型正式上线」。**不要写「当前默认模型是 X」**，也不要把用户评论里的「双模 DeepSeek」写进正文。

**结论五：同厂其它 AI 产品只在家族图一行。本目录不写混元、CodeBuddy、微信、QQ。**

混元站页脚（2026-08-19）：

| 抓取页 | 页脚「产品」 |
|--------|----------------|
| `https://hunyuan.tencent.com/` | WorkBuddy、元宝、ima |
| `https://hunyuan.tencent.com/solutions` | Hy AI Studio、元宝、WorkBuddy |

本 issue 点名但不写正文：腾讯混元（#77）、CodeBuddy（#78）。微信 / QQ / 会议是非 AI 宿主或生态联动，地图标「非本站」。

**结论六：没有官方套餐表。App Store 标「免费」。禁止编造会员价或「永久全功能免费」。**

Play 支持邮箱：`yuanbao@tencent.com`。开发者在不同商店写法不同：App Store 为 Tencent Technology (Shenzhen) Company Limited；Play 为 Tencent Mobility Limited。备案号出现在 `evt/dl` 相关落地页摘要：粵B2-20090059-2987A，开发者深圳市腾讯计算机系统有限公司。

**结论七：对前端工程师的定位——可以收进产品货架，不要硬凑编程 Agent 教程。**

官方「AI 编程」是对话里跑 Python / C++、写脚本，不是对着仓库改代码、提 PR。仓库 / IDE 编程走 CodeBuddy（只链官方，不在本目录展开）。模型机制链本站 Learn LLM，不在这里写 Hy3 内部。

## 基本信息

- 工具名：元宝 / Yuanbao
- 官方文档根地址：无独立 docs 站。产品根 <https://yuanbao.tencent.com/>
- 发版节奏：App Store 约每周一版（2026-08-19 见 2.81.10）；商店说明经常只写「优化了若干使用体验」
- 当前覆盖版本：不绑定单一版本号。抽查：App Store 2.81.10；腾讯软件中心 Windows 2.80.0.611（2026-08-10）；Play 更新日期 2026-08-10

## 官方一级导航（产品家族）

| 官方一级入口 | 官方 URL | 本站去向 | 不拆页理由（若一行） |
|--------------|----------|----------|----------------------|
| 元宝（网页 / 客户端） | https://yuanbao.tencent.com/ | 独立页 `yuanbao.md` | |
| 下载中心 | https://yuanbao.tencent.com/download | Tutorial 一节 | 安装入口，不是新产品 |
| 电脑版介绍 | https://yuanbao.tencent.com/evt/dl | Tutorial 一节 | 同一产品的桌面能力页 |
| 腾讯混元 | https://hunyuan.tencent.com/ | 地图一行（#77） | 本 issue 不写正文 |
| CodeBuddy | https://www.codebuddy.cn/ | 地图一行（#78） | 本 issue 不写正文 |
| WorkBuddy | https://www.workbuddy.cn/ | 地图一行 | 混元页脚产品；办公 Agent，不是元宝 |
| ima | https://ima.qq.com/ | 地图一行 | 混元页脚产品；知识库工作台，不是元宝 |
| Hy AI Studio | 混元站页脚「Hy AI Studio」；试用链指向混元站 / AI Studio | 地图一行 | 模型试玩台，不是元宝；具体 chat URL 以混元站为准 |
| 元宝派 | 仅出现在商店「特色功能」 | Tutorial / glossary 一行 | 元宝内公测玩法，不是独立产品 |
| 微信 / QQ / 会议 | 非元宝一级产品 | 地图标「非本站」 | 不写非 AI 产品教程 |

易撞名：元宝 ≠ 混元（助手产品 ≠ 模型家族）；元宝 ≠ CodeBuddy；元宝 ≠ WorkBuddy；元宝 ≠ ima；`hunyuan.tencent.com/bot/chat` ≠ 第二个产品（canonical 已指向元宝站）；元宝派 ≠ 独立 App。

## 文档文件结构（Diataxis）

官方没有 How-to 文档树，**不写 cookbook**（硬凑场景会杜撰步骤）。

```
docs/zh/products/yuanbao/
├── index.md                 # 学习地图 + 家族图
├── yuanbao.md               # Tutorial：打开、多端、官方能力
├── yuanbao-cheatsheet.md    # Reference：入口、决策表、数据源
└── yuanbao-glossary.md      # Explanation：撞名与边界

docs/products/yuanbao/       # 英文同构
```

| 文件 | 象限 | 写什么 | 不写什么 |
|------|------|--------|----------|
| `index.md` | 导航 + 速查 | 家族图、决策树、何时用元宝 | 逐步点击教程 |
| `yuanbao.md` | Tutorial | 打开各端、官方能力原文、电脑版快捷键 | 套餐价、36 种后缀清单、CodeBuddy 教程 |
| `yuanbao-cheatsheet.md` | Reference | 入口表、决策表、协议/商店链接 | 概念长文 |
| `yuanbao-glossary.md` | Explanation | 元宝 / 混元 / 派 / 姊妹产品「不是什么」 | 操作步骤 |

## 监控页面

- 产品首页：<https://yuanbao.tencent.com/>
- 下载中心：<https://yuanbao.tencent.com/download>
- 电脑版介绍：<https://yuanbao.tencent.com/evt/dl>
- App Store 版本说明：<https://apps.apple.com/cn/app/%E5%85%83%E5%AE%9D-%E8%85%BE%E8%AE%AF%E5%85%A8%E8%83%BDai%E5%8A%A9%E6%89%8B/id6480446430>
- Google Play：<https://play.google.com/store/apps/details?id=com.tencent.hunyuan.app.chat>
- 腾讯软件中心（Windows）：<https://pc.qq.com/detail/1/detail_36661.html>
- 用户服务协议：<https://rule.tencent.com/rule/202403110001>
- 隐私政策：<https://privacy.qq.com/document/preview/eb9be56572ab4886b6ca124e72abf413>
- 混元家族页脚：<https://hunyuan.tencent.com/>
- 无官方 CLI / API Reference / GitHub Releases

## Git 提交 scope

```
docs(yuanbao): ...
```

## 已知踩坑 / 特殊约定

1. **`yuanbao.tencent.com` / `hunyuan.tencent.com` 在部分环境解析到 `198.18.0.0/15`（代理或 Fake-IP）**。`web_fetch` 会报 SSRF；改用页面阅读器或浏览器。`curl` 失败不等于页面不存在。
2. **首页、下载中心、协议中心都是 SPA**。无 JS 的抓取经常只剩壳。功能清单以 `evt/dl`、App Store、Play、软件中心为准。
3. **协议中心和隐私中心无 JS 打不开**。引用条款时用能核对的搜索摘要 + 链回官方 URL，不要整页复述。
4. **模型文案会打架**。首页 / 电脑版页写 Hy3，Play「关于此应用」仍写 T1 + DeepSeek R1。并列引用。
5. **不要把「生态联动微信」写成微信教程**。商店原文只是能力一句。
6. **不要改 `products-gallery.js`**（本轮用户硬约束）。导航只挂 `sidebars/ai-coding.mjs`。
7. **禁止把元宝派、高考通写成独立产品教程**。它们只出现在商店版本说明或特色列表。

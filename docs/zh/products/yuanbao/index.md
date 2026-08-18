# 元宝学习地图

> **元宝**是腾讯的消费级全能 AI 助手。官方英文 title（[yuanbao.tencent.com](https://yuanbao.tencent.com/)）：
> **Yuanbao–Tencent's All-in-One AI Assistant**
>
> 同页原文：「元宝是腾讯推出的全能 AI 助手，已接入最新的混元 Hy3 模型」。
>
> 本目录只写**元宝**。混元模型站和 CodeBuddy 各占一行，正文在别的 issue。

## 写给谁 / 不写什么

**写给谁：** 需要一个能在浏览器或桌面里聊天、搜资料、读文件、写文案的前端工程师。不需要仓库。

**目标：** 分清元宝和同厂其它 AI 入口，按官方页面打开产品，知道电脑版比网页多了什么。

**非目标：**

- 腾讯混元模型 / API / 开源权重（#77）
- CodeBuddy 编程助手教程（#78）
- 微信 / QQ / 腾讯会议操作
- 臆造会员价、默认模型名、36 种文件后缀
- 模型内部机制（去 [Learn LLM](/zh/tech/fundamentals/LLM)）

## 产品全景

混元站页脚把元宝和其它 AI 产品列在一起。它们**不是**同一个产品的几张皮。

```
腾讯 AI（本目录只展开元宝）
├── 元宝 — 消费级全能助手
│   ├── 网页 yuanbao.tencent.com
│   ├── iOS / Android
│   ├── Windows / macOS 电脑版
│   └── 元宝派（商店写明：开启公测）
├── 腾讯混元 — 模型家族与研究站（#77，一行）
├── CodeBuddy — 云代码助手（#78，一行）
├── WorkBuddy — 全场景 AI 办公工作台（页脚一行）
├── ima — AI 知识管家（页脚一行）
└── Hy AI Studio — 混元站页脚的模型试玩（一行）
```

| 入口 | 是什么 | 官方 URL | 本站 |
|------|--------|----------|------|
| **元宝** | 聊天 / 写作 / 搜索 / 文件 / 多模态助手 | [yuanbao.tencent.com](https://yuanbao.tencent.com/) | [教程](./yuanbao.md) |
| 腾讯混元 | 模型、研究、开源、Co-design | [hunyuan.tencent.com](https://hunyuan.tencent.com/) | 地图一行（#77） |
| CodeBuddy | 腾讯云代码助手 | [codebuddy.cn](https://www.codebuddy.cn/) | 地图一行（#78） |
| WorkBuddy | 「全场景 AI 办公工作台」 | [workbuddy.cn](https://www.workbuddy.cn/) | 地图一行 |
| ima | 「以知识库为基础的AI知识管家」 | [ima.qq.com](https://ima.qq.com/) | 地图一行 |
| Hy AI Studio | 混元站 `/solutions` 页脚产品项 | [hunyuan.tencent.com](https://hunyuan.tencent.com/) | 地图一行 |
| 微信 / QQ / 会议 | 非本站产品 | — | **非本站** |

页脚来源：2026-08-19 打开 [hunyuan.tencent.com](https://hunyuan.tencent.com/)（产品：WorkBuddy、元宝、ima）和 [hunyuan.tencent.com/solutions](https://hunyuan.tencent.com/solutions)（产品：Hy AI Studio、元宝、WorkBuddy）。两页不一致，上表取并集。

**容易撞名：**

- **元宝 ≠ 混元。** 元宝是助手产品。混元是模型与研究品牌。
- **元宝 ≠ CodeBuddy。** 元宝的「AI 编程」是对话里跑 Python / C++（[电脑版页](https://yuanbao.tencent.com/evt/dl)）。仓库 / IDE 编码不在本目录写。
- **元宝 ≠ WorkBuddy ≠ ima。** 后两个只在混元页脚出现，本目录不展开。
- **`hunyuan.tencent.com/bot/chat` 不是第二个产品。** 该页 canonical 指向 `yuanbao.tencent.com`。
- **元宝派不是独立 App。** App Store / Play 把它写在元宝「特色功能」里，并标明公测。

### 快速决策：我该用哪个？

```
我要做什么？
├── 网页或电脑里聊天、写作、搜索、读文件、识图、划词
│   └── → 元宝（本目录）
│       ├── 先打开网页？→ yuanbao.tencent.com
│       └── 要划词 / 迷你窗 / 本地唤起？→ 电脑版（evt/dl）
├── 在仓库或 IDE 里写代码、补全、改项目
│   └── → CodeBuddy（官方 codebuddy.cn；#78，这里不写教程）
├── 调用混元模型 / 看论文 / 下开源权重
│   └── → 腾讯混元（hunyuan.tencent.com；#77）
├── 办公任务交给 Agent 做完（报告 / 多工具）
│   └── → WorkBuddy（workbuddy.cn，本站不写）
├── 用知识库做搜-读-写
│   └── → ima（ima.qq.com，本站不写）
└── 微信 / QQ / 会议本身
    └── → 非本站
```

## 学习路径

| 阶段 | 读什么 | 目标 |
|------|--------|------|
| 1. 打开能聊 | [元宝教程](./yuanbao.md) 的入口表 | 网页或客户端里发出第一句 |
| 2. 知道电脑版多什么 | 同页「电脑版」 | 划词、迷你窗、本地跑 Python / C++ |
| 3. 回查链接 | [速查表](./yuanbao-cheatsheet.md) | 商店、协议、支持邮箱 |
| 4. 名字分清 | [术语表](./yuanbao-glossary.md) | 不再把混元 / CodeBuddy 叫成元宝 |

官方没有 How-to 文档树，本目录**不设 cookbook**。逐步点击以产品里的 UI 为准。

## 功能速查（只抄官方页）

| 能力 | 官方原文出处 |
|------|----------------|
| 全能 AI 助手，已接入混元 Hy3 | [首页 description](https://yuanbao.tencent.com/) |
| 聊天、写作、搜索 | 首页 tagline |
| 文件拖拽上传 | 首页 |
| AI 写作 / AI 编程 / AI 识图 / AI 划词 | [电脑版页](https://yuanbao.tencent.com/evt/dl) |
| Python、C++ 多语言运行，无需部署即时验证 | 电脑版页 |
| 36 种文件（代码、日志、技术文档） | 电脑版页；**未公布后缀列表** |
| Option+空格（mac）/ Alt+空格（window）迷你对话窗 | 电脑版页（原文 `window`） |
| 临时对话不进历史 | 电脑版页 |
| 拍题、录音笔、元宝派公测、语音通话、生视频… | [App Store](https://apps.apple.com/cn/app/%E5%85%83%E5%AE%9D-%E8%85%BE%E8%AE%AF%E5%85%A8%E8%83%BDai%E5%8A%A9%E6%89%8B/id6480446430) / [Play](https://play.google.com/store/apps/details?id=com.tencent.hunyuan.app.chat) |
| 内容由 AI 生成，仅供参考 | 首页、下载中心 |

套餐与额度：2026-08-19 **没有**找到元宝官方价目表。App Store 标「免费」。不要把第三方「全功能无限制」写进正文。

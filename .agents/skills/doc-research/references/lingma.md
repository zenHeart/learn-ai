# 通义灵码 / Qoder CN 维护参考

> 这是 [`_template.md`](./_template.md) 针对通义灵码（现 Qoder CN 编码子产品）的具体化。读者可见的数据源写在 `docs/zh/products/lingma/lingma-cheatsheet.md` 的「高质量信息源」，本文件不抄一份。

## 基本信息

- 工具名：通义灵码（TONGYI Lingma / Lingma）。**2026-05-20** 起官方系列名改为 **Qoder CN**；编码子产品仍是同一产品。
- 官方营销站：<https://lingma.aliyun.com/>
- 新品牌站：<https://qoder.com.cn/>
- 新文档站（官方标为最新）：<https://docs.qoder.cn/>
- 阿里云帮助中心（路径仍是 `/zh/lingma/`）：<https://help.aliyun.com/zh/lingma/>
- 国际站帮助：<https://www.alibabacloud.com/help/en/lingma/>
- 发版节奏：帮助中心按月有更新日志；IDE / JetBrains 为现行迭代面
- 当前覆盖版本：2026-08-19 快照（lingma.aliyun.com + help.aliyun.com/zh/lingma + docs.qoder.cn + qoder.com.cn）

## 产品形态调研（先于动笔）

本 issue **只写编码助手**：插件 + 独立 IDE。对位 Copilot / Cursor。

官方现行形态（不要写成「只有插件」）：

| 形态 | 官方怎么叫 | 本站 |
|------|------------|------|
| 独立 IDE | 营销站仍写 **Lingma IDE**；帮助中心 / 新站写 **Qoder CN IDE** | 独立 Tutorial |
| JetBrains 插件 | 营销站搜「通义灵码（TONGYI Lingma）」；帮助中心搜 **Qoder CN** | 并入 Tutorial |
| Visual Studio Code 插件 | 市场 ID `Alibaba-Cloud.tongyi-lingma`；展示名 **Qoder CN (Formerly Lingma)** | 并入 Tutorial，并写停更冲突 |
| Visual Studio 插件 | 帮助中心仍列 VS 2022 / 2019 | Tutorial 一行 + 兼容表 |

**VS Code 插件口径打架（写正文必须点明，不要抹平）：**

- [兼容 IDE](https://help.aliyun.com/zh/lingma/compatible-ide-and-system)、[安装指南](https://help.aliyun.com/zh/lingma/installation-guide)：仍给安装步骤，并写「产品功能迭代将主要集中在 Qoder CN IDE 和 Qoder CN JetBrains 插件中，VSCode 插件更新节奏将会放缓」。
- [计费说明](https://help.aliyun.com/zh/lingma/billing-description)：写「VSC 插件停止演进」。
- [docs.qoder.cn 什么是 Qoder CN IDE](https://docs.qoder.cn/user-guide/what-is-qoder-cn)：写「Visual Studio Code 插件已停止维护」。
- 国际站 [update log](https://www.alibabacloud.com/help/en/lingma/product-overview/qoder-cn-update-log)：原文 “VS Code plugin support discontinued … no longer part of the product suite”。

以新文档站 / 更新日志为准标「停更」，安装步骤仍可抄帮助中心，并建议切 Qoder CN IDE。

## 官方一级导航（产品家族）

来源：[什么是 Qoder CN 系列](https://help.aliyun.com/zh/lingma/introduction-of-lingma)、[docs.qoder.cn 系列介绍](https://docs.qoder.cn/product-overview/introduction-of-qodercn)、[qoder.com.cn](https://qoder.com.cn/)。

| 官方一级入口 | 官方 URL | 本站去向 | 不拆页理由（若一行） |
|--------------|----------|----------|----------------------|
| Qoder CN / 通义灵码（IDE + JetBrains / VS Code / Visual Studio 插件） | https://lingma.aliyun.com/ · https://qoder.com.cn/ | 独立页 | 本 issue 正文 |
| Qoder CN CLI | https://qoder.com.cn/cli · https://help.aliyun.com/zh/lingma/what-is-qoder-cli-cn | 地图一行 | 终端形态，另产品；本 issue 不写正文 |
| QoderWork CN | https://help.aliyun.com/zh/lingma/what-is-qoderwork-cn | 地图一行 | 日常办公桌面助手，非编码主线 |
| QoderWake CN | https://qoder.com.cn/qoderwake | 地图一行 | 数字员工 |
| Qoder Cloud Agents | https://qoder.com.cn/cloud-agents | 地图一行 | 云端托管 Agent 平台 |
| Qoder CN Mobile | https://qoder.com.cn/mobile | 地图一行 | 移动指挥面 |
| 通义千问 | https://www.qianwen.com/ | 地图一行 | 同厂对话产品，#83 |
| 阿里云百炼 | https://www.aliyun.com/product/bailian | 地图一行 | 同厂模型平台，#85 |
| 淘宝 / ECS / 支付等非 AI | — | 非本站 | 不是 AI 产品 |

易撞名：

- **通义灵码 ≠ 通义千问**。前者是编码助手（现 Qoder CN）；后者是通用对话助手。
- **通义灵码 ≠ 百炼**。百炼是模型 / Agent 开发平台。
- **Lingma IDE ≠ JetBrains / VS Code 插件**。IDE 开箱即用、无需再装插件；插件装进已有 IDE。
- **智能会话里的智能体模式 ≠ Qoder CN CLI ≠ Cloud Agents ≠ QoderWake**。前者跑在本机 IDE；CLI / Cloud / Wake 是系列里另几个子产品。
- **Ask / Edit / Agent 是会话模式，不是三个产品。**
- 可执行文件 / 市场 ID 仍大量残留 `tongyi-lingma`、`TONGYI Lingma`，营销页也还在用旧名。

## 文档文件结构（Diataxis）

```
docs/zh/products/lingma/
├── index.md                 # 学习地图 + 家族图
├── lingma.md                # Tutorial：装、登录、补全、三种会话
├── lingma-cookbook.md       # How-to：模式选择、提示、Agent、MCP
├── lingma-cheatsheet.md     # Reference：安装入口、快捷键、套餐、数据源
└── lingma-glossary.md       # Explanation：更名、形态、模式、Credits

docs/products/lingma/        # 英文同构
```

| 文件 | 象限 | 写什么 | 不写什么 |
|------|------|--------|----------|
| `index.md` | 导航 + 速查 | 家族图、决策树、学习路径 | 逐步安装、参数清单 |
| `lingma.md` | Tutorial | 官方安装原文、登录、补全、会话三模式 | 套餐全表、MCP 逐步配置 |
| `lingma-cookbook.md` | How-to | 场景配方、官方提示建议、MCP、避坑 | 安装、术语定义 |
| `lingma-cheatsheet.md` | Reference | 兼容表、安装 URL、快捷键、套餐、数据源 | 概念散文、学习路径 |
| `lingma-glossary.md` | Explanation | 更名、不是什么、模式区别 | 操作步骤、价格表 |

## 监控页面

- 新文档站：https://docs.qoder.cn/
- 系列介绍：https://help.aliyun.com/zh/lingma/introduction-of-lingma
- 什么是 Qoder CN：https://help.aliyun.com/zh/lingma/what-is-qoder-cn
- 安装指南：https://help.aliyun.com/zh/lingma/installation-guide
- 下载页（旧品牌）：https://lingma.aliyun.com/download
- 下载页（新品牌）：https://qoder.com.cn/download
- 计费：https://help.aliyun.com/zh/lingma/billing-description
- 智能会话：https://help.aliyun.com/zh/lingma/overview-of-chat
- 智能体：https://help.aliyun.com/zh/lingma/agent
- MCP：https://help.aliyun.com/zh/lingma/guide-for-using-mcp
- 兼容 IDE：https://help.aliyun.com/zh/lingma/compatible-ide-and-system
- VS Marketplace：https://marketplace.visualstudio.com/items?itemName=Alibaba-Cloud.tongyi-lingma
- 更新日志：https://help.aliyun.com/zh/lingma/qoder-cn-update-log

## Git 提交 scope

```
docs(lingma): ...
```

## 已知踩坑 / 特殊约定

- **先写维护参考再动教程。** 更名 + VS Code 停更 + 双下载站，是正文必须面对的事实，不是附录。
- **安装步骤逐字抄官方**，不要把营销站「通义灵码（TONGYI Lingma）」和帮助中心「Qoder CN」合成一个搜索词。
- **价格有三套页签**：Qoder CN（全家桶）、Qoder CN（原灵码）、通义灵码（存量）。只抄打开的表，并写清适用范围。
- **不写淘宝 / ECS / 支付**。Retrieve 时阿里云首页会冒出非 AI 项，地图标「非本站」。
- **通义千问、百炼只在家族图一行**，本目录不展开。
- **不写模型内部机制**；需要模型原理时链 Learn LLM。
- **不改** `products-gallery.js` / `sidebars/ai-coding.mjs`（本轮执行约束）。
- 国际站英文帮助覆盖不全；英文教程以中文官方 + Marketplace 英文原文 + `alibabacloud.com/help/en/lingma` 能打开的页为准。

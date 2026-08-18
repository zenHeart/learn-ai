---
title: Trae 速查表
description: "只查不学。操作系统、设备上限、模式决策和官方 URL 抄自 docs.trae.ai / docs.trae.cn。套餐金额以现行定价页为准，不抄 Legacy 表。"
domain: product
tags:
  - coding-agent
role: cheatsheet
---

# Trae 速查表

只查不学。安装步骤走 [教程](./trae.md)。家族边界走 [学习地图](./index.md)。覆盖 2026-08-19 打开的官方页。

## 该用哪一个

| 场景 | 去哪 |
|------|------|
| 本机写代码、改仓库、CUE 补全 | **TraeCode** 桌面 IDE |
| 精细控制每一步 | TraeCode **IDE 模式** |
| 自然语言推到预览 / 部署 | TraeCode **SOLO 模式**（左上角切换） |
| PPT / 文档 / 数据 / 跨端派任务 | **TraeWork**（不在本目录） |
| 人留在 VS Code / JetBrains | **TraeCode Plugin**（企业页；本站不拆教程） |
| 终端批量 / CI | **TraeCode CLI**（官方 coming soon，不要编命令） |
| 中国大陆账号、掘金 / 抖音登录 | **中国站** `trae.cn` / `trae.com.cn` |
| 国际站定价页、英文文档 | **国际站** `trae.ai` |

## 安装入口（没有官方 CLI 安装串）

| 表面 | 入口 |
|------|------|
| 国际站 TraeCode | [www.trae.ai/download](https://www.trae.ai/download) → **TraeCode** 区块 |
| 中国站 | [www.trae.com.cn](https://www.trae.com.cn) 右上角 **下载 IDE**（营销首页还有 [www.trae.cn](https://www.trae.cn/)） |
| 中国站 macOS &lt; 12 | 低于 **3.3.25**：[arm64 dmg](https://lf-cdn.trae.com.cn/obj/trae-com-cn/pkg/app/releases/stable/2.3.4283/darwin/Trae%20CN-darwin-arm64.dmg) · [x64 dmg](https://lf-cdn.trae.com.cn/obj/trae-com-cn/pkg/app/releases/stable/2.3.4283/darwin/Trae%20CN-darwin-x64.dmg) |

## 操作系统

来源：[Quickstart](https://docs.trae.ai/ide/set-up-trae)、[ide_get-started-with-trae.md](https://docs.trae.cn/ide_get-started-with-trae.md)

| OS | 架构 | 版本 / 格式 |
|----|------|-------------|
| macOS | Apple Silicon、Intel | 12.0+ |
| Windows | x64 | 10、11 |
| Linux | x64、ARM64 | `.deb` Ubuntu 20.04 / Debian 11；`.rpm` Fedora 42 / RHEL 9.x |

## 设备上限

| | 国际站 | 中国站 |
|--|--------|--------|
| 上限 | **3** | **10** |
| 计入 | TraeCode、TraeWork 桌面、TRAE 移动端 | 同左 |
| 不计入 | TraeWork 网页版 | 同左 |
| 同机双端 | TraeCode + TraeWork 桌面 = 1 台 | 同左 |

来源：[docs.trae.ai/ide/device-limit](https://docs.trae.ai/ide/device-limit)、[docs.trae.cn/ide_device-limit.md](https://docs.trae.cn/ide_device-limit.md)

## 打开项目

| 动作 | 官方入口 |
|------|----------|
| 本地文件夹 | **打开文件夹** 或 **选择项目 > 打开文件夹** |
| GitHub | **克隆 Git 仓库** → **从 GitHub 克隆** |
| 任意 Git URL | **克隆 Git 仓库** → 输入 URL → **存储库 URL {URL}** |

## 套餐指针

- 国际站现行：[www.trae.ai/pricing](https://www.trae.ai/pricing) — Lite / Pro / Pro+ / Ultra。Pro 页文案：**Free for 7 days. Then $10/month.**
- 文档站 [Legacy billing](https://docs.trae.ai/ide/billing) 不要当现行表
- 中国站积分方案：跟 [docs.trae.cn](https://docs.trae.cn/llms.txt)，本表不写金额

## 高质量信息源

| 源 | URL | 用来干什么 |
|----|-----|------------|
| 国际站首页 | <https://www.trae.ai/> | 家族拆分 TraeCode / TraeWork |
| 下载中心 | <https://www.trae.ai/download> | 安装包，不要下成 TraeWork |
| 定价 | <https://www.trae.ai/pricing> | 现行档位 |
| 企业 | <https://www.trae.ai/enterprise> | Plugin / CLI coming soon / 团队 |
| TraeWork 营销 | <https://www.trae.ai/work> | 办公工作台职责 |
| What is TraeCode? | <https://docs.trae.ai/ide/what-is-trae> | IDE / SOLO / CUE / 隐私 |
| Quickstart | <https://docs.trae.ai/ide/set-up-trae> | 安装、打开项目、切模式 |
| SOLO | <https://docs.trae.ai/ide/solo-mode> | SOLO 界面与能力 |
| Device limit | <https://docs.trae.ai/ide/device-limit> | 国际站 3 台 |
| Changelog（文档站） | <https://docs.trae.ai/ide/changelog> | 版本 |
| Models | <https://docs.trae.ai/ide/models> | 内置模型表 |
| What is TRAE Work? | <https://docs.trae.ai/solo/what-is-trae-solo> | TraeWork 三端 |
| 中国站首页 | <https://www.trae.cn/> | CN 营销 |
| 中国站快速开始链 | <https://www.trae.com.cn> | CN 下载入口 |
| 中国站文档 | <https://docs.trae.cn/ide_what-is-trae-code> | CN What is |
| 中国站 llms.txt | <https://docs.trae.cn/llms.txt> | CN 文档树 |
| 中国站快速开始 .md | <https://docs.trae.cn/ide_get-started-with-trae.md> | CN 安装原文 |
| 火山引擎产品位 | <https://www.volcengine.com/product/trae> | CN 云目录 |

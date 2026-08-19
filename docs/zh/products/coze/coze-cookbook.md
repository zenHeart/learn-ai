---
title: 扣子编程 Cookbook
description: "按场景跳着读：工作流、插件、知识库、技能、发布、Coze CLI。每条都链回官方页。不写豆包或 Trae 教程。"
domain: product
tags:
  - agent-builder
role: cookbook
---

# 扣子编程 Cookbook

已经会创建低代码智能体。这里只给**场景配方**。基础点击回 [教程](./coze.md)。

## 先搭工作流，再挂到智能体

固定多步任务不要全塞进人设。官方把工作流定义成「可执行指令的集合」，用画布拖节点。

两种类型（[低代码工作流](https://docs.coze.cn/guides_workflow)）：

| 类型 | 用途 | 例子 |
|------|------|------|
| 工作流 Workflow | 顺序执行，面向功能 / 数据 | 调研报告、海报、绘本 |
| 对话流 Chatflow | 面向对话，边聊边走复杂逻辑 | 客服、个人助手 |

每个工作流默认有 **开始** 和 **结束** 节点。用引用把上游输出接到下游输入。节点支持 `String`、`Integer`、`Number`、`Boolean`、`Object`、`File`、`Array`。

付费节点跑成功就会计费；**整个工作流失败，已经成功的付费节点仍计费**。

权限：空间成员默认可创建 / 查看 / 复制 / 导入。编辑和发布要所有者先开协作并加你。细节以官方权限表为准。

自然语言生成全代码工作流走另一条路：[开发工作流](https://docs.coze.cn/guides_ai_powered_workflow_development)。

## 给智能体外挂 API：插件

插件是工具集，里面每个工具是一个 API。同一插件内的工具必须同域名（[插件介绍](https://docs.coze.cn/guides_plugin)）。

| 分类 | 谁维护 | 计费 |
|------|--------|------|
| 资源库插件 | 你自己，仅当前账号 | 看你接入的 API |
| 官方插件 | 扣子编程 | 按调用量，可用积分抵扣 |
| 三方插件 | 其他开发者 | 付费项从**现金余额**扣，不能用积分 |

自定义插件可以：基于 API、用 IDE、导入 JSON/YAML、用代码注册。

硬限制（官方原文）：

- 每空间最多 1000 个插件；每账号最多 30 个 IDE 插件。
- 每插件最多 100 个工具。
- 自定义插件 QPS 最大 50。
- 依赖包总大小上限 250 MB。
- **加了三方付费插件的低代码智能体或应用，不能发到飞书多维表格、掘金、豆包及部分公共渠道。**

智能体里加了插件之后，人设必须 `{` 引用，否则可能不调用。工作流里则把插件当成节点。

## 用知识库补垂直事实

模型会幻觉。静态、全员共享、由开发者维护的内容放知识库，不要放记忆（[知识库概述](https://docs.coze.cn/guides_knowledge)）。

| | 知识 | 记忆 |
|--|------|------|
| 谁改 | 开发者 | 终端用户在对话里产生 |
| 谁看见 | 空间内可共享，用户不能改 | 跟用户走，不能跨智能体 |
| 例子（租房） | 房源、小区、政策 PDF | 用户偏好、关注列表 |

两条产品线：

- **扣子知识库**：文本 / 表格 / 图片。有免费额度，适合先试。
- **火山知识库**：企业级，上传即开始在火山侧计费，**不能用扣子积分抵扣**。删文档不会停计算资源费，不用了要解绑并在火山控制台删库。

流程：创建或关联 → 绑到智能体或工作流 → 配检索 / 召回 → 再调试。

## 把 SOP 收成技能，而不是再写长 Prompt

技能是带 `SKILL.md` 的文件夹，按需加载，不是全程生效的人设（[技能概述](https://docs.coze.cn/guides_skill_overview)）。

```text
my-skill/
├── SKILL.md          # 必选：名称、用途、元数据
├── scripts/          # 可选：可执行代码
├── references/       # 可选：参考文档
└── assets/           # 可选：模板和静态资源
```

对比一句话：

- **提示词**：全局人设，每轮都在。
- **技能**：某类任务的 SOP，相关时才加载。
- **工作流**：路径固定的编排。
- **插件**：调外部 API。
- **MCP**：能力接口；技能可以指导何时用它。
- **知识库**：检索已有文档，不是操作手册。

在扣子编程首页选 **技能** 页签，用自然语言生成 → 预览 → **部署** 后才能在扣子对话里用。企业旗舰版可以上企业技能商店。

## 用 AI 编程生成全代码智能体

低代码画布不够定制时：

1. [code.coze.cn](https://code.coze.cn/) → **智能体** 选项卡。
2. 写清功能、逻辑、约束；可选附件、问答/Agent 模式、技能、编程模型。
3. 提交后等项目创建和单测。
4. 右侧预览；报错丢回左侧对话，或用「一键修复」。
5. 部署为 API 见 [部署智能体](https://docs.coze.cn/guides_vibe_coding_agent)。

消耗：编程任务对话、内置集成、上线后的托管费。配额见 [配额与限制](https://docs.coze.cn/guides_vibe_coding_limit)。

团队版 / 企业版若看不到入口，先问超级管理员是否关了功能访问控制。

## 发布到真正有人用的地方

发布概览把渠道分成三类（[guides_publish_overview](https://docs.coze.cn/guides_publish_overview)）：

1. **官方默认**：商店、飞书、微信、掘金、小程序、API、Chat SDK。
2. **团队自定义**：硬件 / 应用市场入驻后，仅团队可用。智能体要发到「API 和团队自定义渠道」。
3. **公共渠道**：企业旗舰版才能把渠道公开。

流程：打包 → 扣子审核 → 渠道审核。

不要做的事：

- 再找豆包渠道（2026-07-01 下线）。
- 指望复制商店里别人智能体的完整配置（商店是私有配置；要抄结构去[模板商店](https://www.coze.cn/template)）。
- 把工作流 / 图像流再上架到作品社区（已下架）。

## 用 Coze CLI 让别的 Agent 操作扣子

官方包名 **`@coze/cli`**，命令名 **`coze`**。2026-08-19 在 npm 抽到 `0.3.10`。完整 flag 以 `coze --help` 和 [npm 页](https://www.npmjs.com/package/@coze/cli) 为准。

扣子对话里已经内置 CLI，一般用户直接下指令即可。在 Trae / Claude Code / 终端里：

```bash
npm install -g @coze/cli --foreground-scripts
coze self skill install
# 脚本里指定宿主，例如 Trae：
# coze self skill install --target trae
coze auth login --oauth
```

官方给 Agent 的第一句任务示例：

```text
帮我用 Coze CLI 创建一个网页应用，介绍 Coze CLI 的功能及使用方式
创建完成后，请将预览链接发给我
```

CLI 和扣子编程共用账号与工作空间。装 Skill 不是授权 CLI，是让宿主 Agent 知道何时调用它。

## 必须私有化时

扣子编程**暂不支持**私有化（[FAQ](https://docs.coze.cn/guides_FAQ)）。开源路径：

```bash
git clone https://github.com/coze-dev/coze-studio.git
cd coze-studio
# macOS / Linux
make web
```

最低 2 核 4 GB，需要 Docker。浏览器打开 `http://localhost:8888/sign` 注册，再到 `/admin/#model-management` 配模型。公网部署前先读仓库 Quickstart 的安全警告。

Studio 是单机核：没有商业版的工作空间、企业组织、多人协作。评测观测的开源对应物是 [Coze Loop](https://github.com/coze-dev/coze-loop)。

---
title: AIOps 通用 Agent 探索
description: 把 Cursor 局限在单机的 AI 提效云端化：Prompt + Eino ReAct 引擎 + Docker 沙箱 + YAML Agent 定义，用提示词定义 DevOps 流程。
domain: tech
tags: [tech, case, aiops, agent, devops]
navOrder: 78
topicId: cases-aiops-agent-exploration
layer: appendix
status: case
nodeType: evidence
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# AIOps 通用 Agent 探索

> 学习来源：[AIOps 通用 Agent 探索（Simple）](https://tech.qimao.com/aiops-tong-yong-agent-tan-suo-simple/) - @秦皓

## 背景与理念

Cursor 等 IDE 内 AI 贯穿了需求分析、文档、评审、部署调试、日志分析，但**局限在单机**、无法与现有系统集成；为每个场景开发独立 Agent 又耗费人力。

核心理念：践行 Manus 提倡的 **"Less structure, more intelligence"（更少结构，更多智能）**——通过 **Prompt + LLM（Agent）+ Tools + Workspace** 落地 DevOps 流程：让用户通过提示词定义具体流程，即可快速实现该流程的 AI 自动化集成。

理论基础是 [ReAct 框架](https://arxiv.org/pdf/2210.03629)（Reasoning → Action → Observation 循环）：

```
while not task_finished:
    thought = model.reason(context)
    action = model.act(thought)
    observation = environment.execute(action)
    context.update(observation)
```

主线展开见 [Agent 运行时](/zh/tech/06-agent-systems/agent-runtime)；本页保留场景化落地证据。

## 架构设计

```
┌─────────────────────────────────────────────┐
│ 管理平台（规划中）：任务管理 / 对外 API / 周期 Job / 报告 │
├─────────────────────────────────────────────┤
│ AIOps 通用 Agent                             │
│  - ReAct 引擎（基于字节开源的 Eino 框架，核心约百行） │
│  - Tools（如 bash_command 一个工具即可起步）        │
│  - 运行环境（Docker 容器隔离）                    │
├─────────────────────────────────────────────┤
│ Langfuse 调用监控 · Bashly 封装依赖工具           │
└─────────────────────────────────────────────┘
```

四个核心组件：

- **Prompt**：核心工作是写提示词（定义流程）
- **LLM（ReAct Engine）**：Eino ReAct Agent + 系统提示词 + 工具列表 + 执行环境
- **Tools**：MR 报告场景只需一个 `bash_command` 工具（params: command 必填，working_dir / timeout / environment 可选）；运行时依赖（codeup、git、jq）由 Docker 镜像提供
- **Workspace**：独立 Docker 容器隔离（内存 512MB、CPU 1.0、超时 30min），代码与数据卷挂载

## Agent 定义（YAML）

```yaml
- id: "code_review"
  name: "Code Review"
  async: true
  system_prompt_doc: "task_cr.md"   # 从文件加载系统提示词
  user_prompt_template: "请为我给 repo_id=${{repo_id}}, local_id=${{local_id}} 的合并请求进行代码评审"
  tools: ["codebase"]
  volumes: "/var/aiops/repos/${{repo_id}}": "/workspace/src"
  post_shell: "codeup mr comment add ... 'AI 代码评审报告: ${{report_url}}'"
  report_path: "aiops/mr/reports/${{repo_id}}/${{local_id}}/"
```

## 场景实践：MR 报告总结

提示词定义四步流程：收集 MR 信息（`codeup mr get`）→ 理解变更上下文（`codeup mr tree` + repo file）→ 分析变更 → 追加评审描述（`codeup mr update`）。

**关键设计——Common Commands 模板**：在提示词中嵌入常用命令的返回格式示例，让 AI 知道如何解析命令输出。输出为结构化评审报告：评估结论（建议合并 / 修复后合并 / 不建议）→ 评审流程总结 → 关键建议（必须修复 / 质量建议 / 测试覆盖建议）。

## 核心价值与展望

| 价值点 | 说明 |
| --- | --- |
| 简单高效 | Markdown 提示词定义业务流程即可获得该场景的 Agent 能力 |
| 隐私安全 | 自研自托管，代码与数据不出域 |
| 易于集成 | 标准 Open API，第三方系统快速接入 |
| 异步处理 | API 集成或定时 Job |
| 集中管理 | 脱离单机 IDE 云端化，一人开发全员受益 |

未来方向：管理平台（Web UI 统一管理提示词/工具/报告）、多 Agent 协同与记忆管理、迁移到业务通用 Agent。

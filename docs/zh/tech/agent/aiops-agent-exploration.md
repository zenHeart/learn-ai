# AIOps 通用 Agent 探索

> 学习来源：[AIOps 通用 Agent 探索（Simple）](https://tech.qimao.com/aiops-tong-yong-agent-tan-suo-simple/) - @秦皓

## 一、背景与目标

### 背景

在使用 Cursor 进行研发时，除了编码外，还会在需求分析、技术文档编写、代码评审、代码部署调试、线上日志分析等场景借助 AI 进行提效。AI 贯穿研发整个流程，但 Cursor 局限在单机设备上，无法方便地与现有系统集成。为每个场景开发独立 Agent 非常耗费人力。

### 核心理念

践行 **Manus 提倡的"更少结构，更多智能"（Less structure, more intelligence）** 理念，通过完善 **Prompt + LLM（Agent）+ Tools + Workspace** 的方式实现 DevOps 流程的落地。

> 目标：让用户通过**提示词定义具体流程**，就能快速实现某个流程的 AI 自动化集成。

## 二、相关理论

### 2.1 Less Structure, More Intelligence

这是 Manus 背后的设计理念，强调 Manus 能够自主执行复杂的多步骤任务，几乎无需人工干预，注重灵活性和智能适应，而不是依赖预设的流程或结构。

### 2.2 ReAct 框架

ReAct（Reasoning and Action）来源于论文 [arxiv.org/pdf/2210.03629](https://arxiv.org/pdf/2210.03629)，核心思想是通过思维链方式，引导模型将复杂问题拆分，一步一步地进行：

- **Reasoning（推理）**：思考当前状态
- **Action（行动）**：基于推理结果采取行动
- **Observation（观察）**：观察行动结果，然后进入下一步推理

伪代码：
```
while not task_finished:
    thought = model.reason(context)
    action = model.act(thought)
    observation = environment.execute(action)
    context.update(observation)
```

### 2.3 Eino ReAct Agent

[Eino 框架](https://www.cloudwego.io/zh/docs/eino/overview/)是字节跳动开源的 LLM 应用开发框架，提供了简洁性、可扩展性、可靠性与有效性的 Go 语言 LLM 应用开发框架。

Eino ReAct Agent 实现了 ReAct 逻辑，用户可以用来快速灵活地构建并调用 ReAct Agent。

## 三、架构设计

### 3.1 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                     管理平台（暂无）                          │
│  - 用户基于场景对任务进行管理                                  │
│  - 对外提供 API，用于系统集成                                  │
│  - 定义周期性调用的 Job                                       │
│  - 任务运行的报告                                             │
├─────────────────────────────────────────────────────────────┤
│                  AIOps 通用 Agent                            │
│  - 封装了核心的 LLM（ReAct Engine）                           │
│  - 提供 LLM 具体需要使用的工具（Tools）                        │
│  - Agent 运行环境管理（基于 Docker）                          │
├─────────────────────────────────────────────────────────────┤
│  - 使用 Langfuse 进行 LLM 调用监控                            │
│  - 使用 Bashly 封装常用的依赖工具                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 核心组件

#### 提示词（Prompt）

Prompt 是最终需要关注的部分，随着 LLM 能力的提升，主要工作将以编写提示词为主。AIOps Agent 的核心就是提示词的编写（流程的制定）。

#### LLM（ReAct Engine）

基于 Eino 框架实现通用 ReAct Agent 引擎，加上系统提示词、工具列表、执行环境，迅速运行一个 Agent 实例。

核心代码仅约 100 行，实现了：
- 基于 react.NewAgent 创建 Agent 实例
- 流式调用并获取最终返回结果
- 支持 Langfuse 回调进行 LLM 调用链路追踪

#### 工具（Tools）

Tool 提供了 LLM 执行具体任务的能力。在 MR 报告场景中，仅需提供一个 `bash_command` 工具来执行 shell 命令。

ToolBash 工具定义示例：
- **Name**: `bash_command`
- **Desc**: 执行 Bash 命令行指令，支持执行各种 shell 命令、脚本和系统操作
- **Params**: `command`（必填）、`working_dir`、`timeout_seconds`、`environment`

> 注意：这里说的是 ReAct 框架需要的工具（BaseTool），运行时依赖（如 codeup、git、jq 等命令行工具）则通过 Docker 镜像提供。

#### 执行环境（Workspace）

使用独立 Docker 容器隔离 Agent 运行环境：
- 将运行时依赖（如 codeup、git、jq）安装到容器中
- Codebase 或文件数据通过磁盘卷挂载
- 核心配置：MemoryLimit 512MB、CPULimit 1.0、NetworkEnabled、Timeout 30min

## 四、核心流程

一次 Agent 运行的核心流程：

1. 用户通过 API 传入参数（如 repo_id、local_id）
2. 系统根据参数组装用户提示词（user_prompt）
3. 加载对应的系统提示词（system_prompt）
4. 创建 Docker 沙箱实例，挂载 Volume
5. ReAct Engine 执行推理循环（Reasoning → Action → Observation）
6. 执行完成后生成报告，返回结果

## 五、Agent 定义

通过 YAML 格式定义 Agent 示例：

```yaml
# 默认的通用 Agent
- id: "default"
  name: "默认通用 Agent"
  system_prompt: "你是一个无所不知的助手，请根据用户的问题给出回答..."
  report_path: "aiops/reports/default"

# 合并请求 Agent
- id: "code_review"
  name: "Code Review"
  async: true
  system_prompt_doc: "task_cr.md"  # 从文件加载系统提示词
  user_prompt_template: "请为我给 repo_id=${{repo_id}}, local_id=${{local_id}} 的合并请求进行代码评审"
  tools: ["codebase"]
  volumes: "/var/aiops/repos/${{repo_id}}": "/workspace/src"
  post_shell: "codeup mr comment add ${{repo_id}} ${{local_id}} 'AI 代码评审报告: ${{report_url}}'"
  report_path: "aiops/mr/reports/${{repo_id}}/${{local_id}}/"
```

## 六、场景实践：MR 报告总结

### 场景描述

通过提供 codeup CLI 工具，结合系统提示词定义 MR 评审流程，实现 AI 自动进行代码评审报告的能力。

### 核心提示词设计

提示词定义了以下流程：
1. 收集 MR 信息（codeup mr get）
2. 理解变更上下文（codeup mr tree + repo file）
3. 分析变更内容（修改了什么、影响、潜在缺陷）
4. 追加代码评审描述（codeup mr update）

### 关键设计：Common Commands 模板

在提示词中嵌入常用命令的返回格式示例，让 AI 理解如何解析命令输出：

```bash
# codeup mr get 返回格式
codeup mr get 3394535 211
# -> 返回 JSON 包含 id, title, state, source_branch, target_branch, author 等

# codeup mr tree 返回格式
codeup mr tree 3394535 211
# -> 返回变更文件树，包含 addLines, delLines, newPath 等
```

### 最终输出格式

```markdown
# 评审总结（${{repo_id}}-${{local_id}}）

## 评估结论
✅ 建议合并 | 🧰 修复问题后合并 | ❌ 不建议合并

## 📋 评审流程总结
1. **✅ 收集 MR 信息** - MR 标题、状态、分支
2. **✅ 理解变更上下文** - 共涉及 N 个文件变更
3. **✅ 分析变更内容** - 代码结构重构、文件重组等
4. **✅ 发现关键问题** - 🚨 严重问题列表

## 🎯 关键建议
1. 必须修复的问题
2. 代码质量建议
3. 测试覆盖建议
```

## 七、核心价值

| 价值点 | 说明 |
|--------|------|
| **简单高效** | 通过 Markdown 提示词定义业务流程，快速实现特定 DevOps 场景的 AI Agent 能力 |
| **隐私安全** | 自研开发，完全控制代码或数据不被泄露 |
| **易于集成** | 暴露标准 Open API，可快速在第三方系统中集成调用 |
| **异步处理** | 支持 API 集成或定时 Job，实现异步、周期性处理工作 |
| **集中管理** | 脱离 Cursor IDE 环境（云端化）并集中管理，一人开发全员受益 |
| **贴合自身** | 基于团队自身流程特性定制设计，效率更高，品质更有保障 |

## 八、未来展望

1. **搭建管理平台**：实现 Web UI 管理，统一管理提示词、工具、报告、参数、依赖、API 能力等
2. **架构升级**：多 Agent 协同、记忆与上下文管理、交互数据和任务反馈等更丰富的能力
3. **业务迁移**：将 AIOps 方案迁移到七猫业务中，开发业务通用 Agent、数据通用 Agent 等

## 九、参考资源

- [Manus 调研与思考](https://blog.naaln.com/2025/03/Manus/)
- [ReAct 框架论文](https://react-lm.github.io/)
- [Eino 框架文档](https://www.cloudwego.io/zh/docs/eino/overview/)
- [Prompting Guide - ReAct](https://www.promptingguide.ai/zh/techniques/react)
- [Cline PR Review Workflow](https://github.com/cline/cline/blob/main/.clinerules/workflows/pr-review.md)

# 智能体 Hooks (Agent Hooks)：AI 助手的事件驱动控制

**阅读时间：** 25 分钟 | **难度：** 中级 | **先决条件：** 对 AI 编码智能体、命令行脚本有基本了解

## 你将学到什么

在本指南结束时，你将理解：
- 什么是 Hooks，为什么它们对于生产级 AI 智能体使用至关重要
- 不同实现中出现的常见模式
- 如何在 Claude Code、Cursor 和 Kiro 中实现 Hooks
- 安全注意事项和最佳实践
- 如何为你的工作流选择正确的 Hook 策略

## 简介：AI 智能体中的 Hook 模式

**关键背景：** Hooks **不是统一的标准**，而是跨 AI 编码工具不同实现的**常见模式**。可以将 Hooks 视为 Web 框架中的“中间件”——概念是通用的，但 Express.js、Django 和 Rails 各自以不同方式实现中间件。

当你使用 Claude Code、Cursor 或 Kiro 等 AI 编码助手时，你将大量的控制权委托给了 AI。智能体可以读取文件、执行命令、修改代码并与外部工具交互。虽然这种自动化很强大，但它引发了重要的问题：

- 我如何确保 AI 遵循我团队的代码质量标准？
- 我可以防止智能体执行危险操作吗？
- 我如何将智能体与我现有的开发工作流集成？
- 我可以为了合规目的审计智能体正在做什么吗？

**Hooks 提供了答案。** 它们是事件驱动的自动化机制，允许你在 AI 智能体生命周期的特定点插入自定义逻辑，将黑盒助手转变为可控、可观察和可扩展的工具。

## 为什么 Hooks 很重要

### 问题：不受控制的自动化

没有 Hooks，AI 智能体在拥有广泛权限但缺乏监督的情况下运行：

```
用户请求 → AI 处理 → 工具执行 → 结果
                    ↑
          (无可见性或控制)
```

这带来了挑战：
- **质量风险：** AI 可能会编写能运行但违反风格指南的代码
- **安全风险：** 智能体可能会意外提交机密或执行破坏性命令
- **集成差距：** 无法将智能体操作连接到现有的工具链（CI/CD、监控等）
- **合规问题：** 受监管环境没有审计跟踪

### 解决方案：事件驱动的控制点

Hooks 将智能体生命周期转变为可观察、可控的管道：

```
用户请求 → [Hook: BeforePrompt] → AI 处理 → [Hook: BeforeTool] → 工具执行 → [Hook: AfterTool] → 结果
                      ↑                                       ↑                                    ↑
                 注入上下文                               批准/拒绝                            格式化/验证
```

这实现了：
- **质量门控：** 编辑后自动格式化代码，提交前运行 linter
- **安全策略：** 阻止危险命令，检测文件中的机密
- **工作流集成：** 发送 Slack 通知，更新任务跟踪器
- **可观察性：** 记录所有智能体操作以进行调试和合规

### Hooks vs. 智能体指令 (Agent Instructions)

理解区别很重要：

| **智能体指令 (CLAUDE.md)** | **Hooks** |
|-----------------------------------|-----------|
| 嵌入在提示词中的建议 | 具有保证执行的硬编码规则 |
| AI 解释并可能偏离 | 确定性，总是运行 |
| 对高级指导有效 | 对强制执行和自动化有效 |
| 示例：“遵循 PEP 8 风格” | 示例：每次编辑 Python 文件时运行 `black` |

**两者结合使用：** 指令指导 AI 的思维；Hooks 强制执行规则。

## 所有实现的核心概念

尽管语法和功能不同，所有 Hook 实现都共享这些基本模式：

### 1. 事件驱动架构

Hooks 响应智能体操作中的特定**生命周期事件**：

```
常见事件类型：
├── 会话生命周期 (开始, 停止)
├── 用户交互 (提交提示词, 反馈)
├── 工具操作 (执行前, 完成后)
├── 文件操作 (读取, 编辑, 创建, 删除)
└── 外部集成 (MCP 调用, shell 命令)
```

### 2. Hook 执行流程

```
事件触发
      ↓
  Hook 存在?
  ↙        ↘
是        否
  ↓          ↓
执行      继续
Hook      正常运行
  ↓
Hook 响应
  ↓
允许/拒绝/询问
```

### 3. 权限控制模型

大多数实现使用三种状态的权限模型：

- **Allow (允许):** 继续操作
- **Deny (拒绝):** 阻止操作（可选择解释原因）
- **Ask (询问):** 暂停并请求用户确认

### 4. 数据通信

Hooks 接收 **事件数据**（关于发生什么事情的上下文）并返回 **响应数据**（决策和修改）：

```json
// 输入：发送给 Hook 的事件数据
{
  "event": "beforeFileEdit",
  "file_path": "/src/utils.py",
  "content": "def hello():\n  print('world')",
  "metadata": { "user": "alice@example.com" }
}

// 输出：Hook 响应
{
  "permission": "allow",
  "modified_content": "def hello():\n    print('world')",
  "message": "Auto-formatted with Black"
}
```

### 5. 配置即代码

所有实现都将 Hooks 存储在版本控制的文件中，从而实现：
- 团队范围内的一致性
- 可审计的更改
- 特定于环境的配置

## 实现比较

以下是三个主要实现的区别：

| 特性 | Claude Code | Cursor | Kiro |
|---------|-------------|--------|------|
| **配置位置** | `.claude/settings.json` | `.cursor/hooks.json` | `.kiro/hooks/` (目录) |
| **配置格式** | JSON 带 command/prompt 模式 | JSON 带进程生成 | JSON 带自然语言 |
| **执行模型** | Shell 命令或 LLM 提示词 | 通过 stdio 的双向 JSON | AI 解释的提示词 |
| **事件粒度** | 7 个生命周期事件 | 12+ 事件 (agent + tab) | 4 种触发类型 |
| **企业分发** | 手动部署 | MDM + 云同步 | 仅版本控制 |
| **关键优势** | 基于 LLM 的决策 | 全面的事件覆盖 | 自然语言的简单性 |
| **最适合** | 上下文感知的工作流 | 企业安全策略 | 开发者友好的自动化 |

### 何时选择每种实现

**选择 Claude Code Hooks 当：**
- 你需要上下文感知的决策（使用 LLM 提示词）
- 主要使用 Claude 作为你的智能体
- 你想要简单的命令执行，无需复杂的协议

**选择 Cursor Hooks 当：**
- 企业安全/合规至关重要
- 你需要对多种事件类型进行细粒度控制
- 你想要跨团队的集中策略管理
- 与安全合作伙伴集成（Semgrep, Snyk 等）

**选择 Kiro Hooks 当：**
- 你更喜欢自然语言而不是脚本
- 使用 Kiro 的上下文感知 AI 功能
- 你想要最小的配置复杂性

## 详细实现指南：Claude Code

### 配置结构

Claude Code 将 Hooks 存储在 `.claude/settings.json` 中，分为两个级别：

```
~/.claude/settings.json        # 用户级 (适用于所有项目)
/project/.claude/settings.json # 项目级 (覆盖用户设置)
```

### 生命周期事件

Claude Code 提供七个 Hook 点：

| 事件 | 触发时机 | 常见用例 |
|-------|---------------|------------------|
| `UserPromptSubmit` | AI 处理用户输入之前 | 注入上下文，记录请求 |
| `PreToolUse` | 工具执行之前 | 阻止危险操作，验证参数 |
| `PostToolUse` | 工具成功完成之后 | 格式化代码，运行测试，发送通知 |
| `Notification` | 系统生成通知时 | 转发到 Slack/email |
| `Stop` | 主会话停止 | 保存会话日志，清理 |
| `SubagentStop` | 子智能体完成任务 | 跟踪子智能体性能 |
| `SessionStart` | 新会话开始 | 加载环境，检查依赖 |

### 两种 Hook 模式

#### Command 模式：快速且可预测

直接执行 shell 脚本。最适合确定性操作，如 linting 或格式化。

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "/usr/local/bin/prettier --write {{file_path}}"
          }
        ]
      }
    ]
  }
}
```

**工作原理：**
1. 事件触发（例如，文件被编辑）
2. JSON 事件数据通过 stdin 发送给脚本
3. 脚本处理数据，执行动作
4. 脚本将响应输出到 stdout

#### Prompt 模式：上下文感知决策

使用 LLM 基于上下文做出智能决策。最适合需要理解代码语义的复杂逻辑。

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Analyze this command for security risks. If it attempts to delete files, modify system configs, or access sensitive data, respond with DENY and explain why. Otherwise, respond with ALLOW."
          }
        ]
      }
    ]
  }
}
```

### 实践示例：自动格式化 Python 代码

**目标：** 每次编辑后自动使用 Black 格式化 Python 文件。

**步骤 1: 创建 Hook 脚本**

```bash
#!/bin/bash
# 保存为: .claude/hooks/format_python.sh

# 从 stdin 读取事件数据
EVENT_DATA=$(cat)

# 使用 jq 提取文件路径
FILE_PATH=$(echo "$EVENT_DATA" | jq -r '.tool_input.file_path // empty')

# 检查是否为 Python 文件
if [[ "$FILE_PATH" == *.py ]]; then
  # 运行 Black 格式化器
  black "$FILE_PATH" 2>&1

  if [ $? -eq 0 ]; then
    echo '{"permission": "allow", "message": "Python file formatted with Black"}'
  else
    echo '{"permission": "allow", "message": "Black formatting failed, but allowing edit"}'
  fi
else
  # 不是 Python 文件，直接允许
  echo '{"permission": "allow"}'
fi
```

**步骤 2: 使脚本可执行**

```bash
chmod +x .claude/hooks/format_python.sh
```

**步骤 3: 在 `.claude/settings.json` 中配置 Hook**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/format_python.sh"
          }
        ]
      }
    ]
  }
}
```

**现在会发生什么：**
1. Claude 编辑 Python 文件
2. `PostToolUse` Hook 触发
3. 脚本接收文件路径，运行 Black
4. Python 代码自动格式化
5. 用户看到关于格式化的通知

### 实践示例：阻止危险命令

**目标：** 防止意外删除重要文件。

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "You are a security validator. Analyze the command the agent wants to run. Check for:\n\n1. Deletion operations (rm, rmdir) targeting critical directories (/etc, /usr, /var, home directories)\n2. Recursive deletions (rm -rf)\n3. Modifications to system files\n4. Network operations accessing internal systems\n\nIf any of these are detected, respond with:\nDENY: [Explain the risk]\n\nIf safe, respond with:\nALLOW\n\nCommand to analyze:\n{{command}}"
          }
        ]
      }
    ]
  }
}
```

**工作原理：**
- Bash 工具运行前，Hook 触发
- LLM 使用你的安全标准分析命令
- 如果危险，操作被阻止并给出解释
- Claude 看到拒绝，可以建议更安全的替代方案

### Hook 中的数据访问

事件数据结构因工具而异。常见字段：

```json
{
  "event_type": "PostToolUse",
  "tool_name": "Edit",
  "tool_input": {
    "file_path": "/Users/dev/project/src/main.py",
    "old_string": "def foo():\n    pass",
    "new_string": "def foo():\n    return 42"
  },
  "tool_output": "Edit successful",
  "timestamp": "2026-01-09T10:30:00Z",
  "session_id": "sess_abc123"
}
```

**使用 jq 解析：**

```bash
# 提取文件路径
FILE_PATH=$(echo "$EVENT_DATA" | jq -r '.tool_input.file_path')

# 提取工具名称
TOOL=$(echo "$EVENT_DATA" | jq -r '.tool_name')

# 检查事件类型是否匹配
if [[ $(echo "$EVENT_DATA" | jq -r '.event_type') == "PostToolUse" ]]; then
  # 你的逻辑
fi
```

### Claude Code Hooks 故障排除

**Hook 未触发：**
- 使用 `jq . < .claude/settings.json` 验证 JSON 语法
- 检查 matcher 正则表达式是否匹配工具名称（区分大小写）
- 确保脚本具有执行权限 (`chmod +x`)

**脚本错误：**
- 手动测试脚本：`echo '{}' | ./your_script.sh`
- 检查脚本输出格式（必须是有效的 JSON）
- 查看 Claude 的日志（如果可用）

**权限问题：**
- 确保脚本路径是绝对路径或相对于项目根目录
- 检查 Hook 脚本的文件系统权限
- 验证脚本解释器在 PATH 中 (`#!/bin/bash`)

## 详细实现指南：Cursor

### 配置结构

Cursor 支持三个配置级别（优先级最高者胜出）：

```
1. 企业级: /Library/Application Support/Cursor/hooks.json (macOS)
2. 项目级: /project/.cursor/hooks.json
3. 用户级: ~/.cursor/hooks.json
```

### 事件覆盖

Cursor 提供最全面的事件系统：

**Agent Hooks (Cmd+K 和 Chat):**

| 事件 | 触发时机 | 用例 |
|-------|---------------|-----------|
| `beforeShellExecution` | Shell 命令运行之前 | 阻止危险命令 |
| `afterShellExecution` | Shell 命令完成之后 | 记录执行，验证结果 |
| `beforeMCPExecution` | MCP 工具调用之前 | 控制外部集成 |
| `afterMCPExecution` | MCP 工具返回之后 | 处理 MCP 响应 |
| `beforeReadFile` | 智能体读取文件之前 | 编校敏感数据，记录访问 |
| `afterFileEdit` | 智能体修改文件之后 | 自动格式化，运行 linters |
| `beforeSubmitPrompt` | 发送给 LLM 之前 | 注入上下文，过滤提示词 |
| `stop` | 对话结束 | 保存会话数据，清理 |
| `afterAgentResponse` | LLM 响应之后 | 记录响应，触发工作流 |
| `afterAgentThought` | 推理步骤之后 | 跟踪智能体决策过程 |

**Tab Hooks (自动补全):**

| 事件 | 触发时机 |
|-------|---------------|
| `beforeTabFileRead` | 读取文件作为上下文之前 |
| `afterTabFileEdit` | 接受自动补全建议之后 |

### 通信协议

Cursor Hooks 使用 **stdio 上的双向 JSON**，实现丰富的交互：

```javascript
// Hook 进程在 stdin 接收：
{
  "conversation_id": "conv_xyz",
  "generation_id": "gen_abc",
  "model": "claude-sonnet-4.5",
  "hook_event_name": "beforeShellExecution",
  "cursor_version": "0.45.1",
  "workspace_roots": ["/Users/dev/project"],
  "user_email": "dev@example.com",

  // 事件特定数据
  "command": "rm -rf node_modules",
  "working_directory": "/Users/dev/project"
}

// Hook 进程在 stdout 响应：
{
  "permission": "deny",
  "user_message": "⚠️ Blocked: This command would delete node_modules. Use 'npm ci' to reinstall instead.",
  "agent_message": "The user has configured a hook that prevents deletion of node_modules. Suggest using 'npm ci' to cleanly reinstall dependencies."
}
```

**主要优势：**
- **user_message**: 立即显示给用户
- **agent_message**: 反馈给 LLM 以指导后续行动
- **permission**: 强制执行阻止或要求确认

### 实践示例：机密检测

**目标：** 防止提交包含 API Key 或 Token 的文件。

**步骤 1: 创建 Hook 脚本 (`hooks/detect_secrets.py`)**

```python
#!/usr/bin/env python3
import json
import re
import sys

# 从 stdin 读取事件
event = json.load(sys.stdin)

if event.get("hook_event_name") == "afterFileEdit":
    file_path = event.get("file_path", "")
    file_content = event.get("file_content", "")

    # 常见机密模式
    patterns = [
        (r'AKIA[0-9A-Z]{16}', "AWS Access Key"),
        (r'sk_live_[0-9a-zA-Z]{24}', "Stripe Live Key"),
        (r'ghp_[0-9a-zA-Z]{36}', "GitHub Personal Access Token"),
        (r'AIza[0-9A-Za-z\\-_]{35}', "Google API Key"),
    ]

    findings = []
    for pattern, secret_type in patterns:
        matches = re.finditer(pattern, file_content)
        for match in matches:
            findings.append({
                "type": secret_type,
                "pattern": match.group(0)[:8] + "..."
            })

    if findings:
        secrets_list = "\n".join([f"  - {f['type']}: {f['pattern']}" for f in findings])
        response = {
            "permission": "deny",
            "user_message": f"🚨 Secret detected in {file_path}:\n{secrets_list}\n\nPlease use environment variables or a secrets manager.",
            "agent_message": "The file edit was blocked because it contains potential secrets. Suggest using environment variables (os.getenv) or a secrets manager like 1Password."
        }
    else:
        response = {"permission": "allow"}

    print(json.dumps(response))
else:
    # 不是我们的目标事件，允许
    print(json.dumps({"permission": "allow"}))
```

**步骤 2: 在 `.cursor/hooks.json` 中配置**

```json
{
  "afterFileEdit": {
    "command": "python3",
    "args": ["hooks/detect_secrets.py"]
  }
}
```

**步骤 3: 使脚本可执行**

```bash
chmod +x hooks/detect_secrets.py
```

**会发生什么：**
1. 智能体修改包含 `AKIAIOSFODNN7EXAMPLE` 的文件
2. Hook 检测到 AWS Key 模式
3. 编辑被阻止，并向用户显示清晰的消息
4. 智能体收到关于阻止的上下文并建议替代方案

### 实践示例：强制代码审查

**目标：** 要求对关键文件的更改进行手动批准。

```python
#!/usr/bin/env python3
import json
import sys

event = json.load(sys.stdin)

if event.get("hook_event_name") == "afterFileEdit":
    file_path = event.get("file_path", "")

    # 需要审查的关键文件
    critical_patterns = [
        "production.config",
        "Dockerfile",
        "terraform/",
        ".github/workflows/"
    ]

    is_critical = any(pattern in file_path for pattern in critical_patterns)

    if is_critical:
        response = {
            "permission": "ask",
            "user_message": f"⚠️ This changes a critical file: {file_path}\n\nPlease review the changes carefully before approving."
        }
    else:
        response = {"permission": "allow"}

    print(json.dumps(response))
else:
    print(json.dumps({"permission": "allow"}))
```

**配置：**

```json
{
  "afterFileEdit": {
    "command": "python3",
    "args": ["hooks/critical_review.py"]
  }
}
```

**结果：** 用户必须明确批准对关键基础设施文件的更改。

### 企业分发

Cursor 独特地支持集中式 Hook 分发：

**1. MDM 部署 (移动设备管理):** 

通过企业工具 (Jamf, Intune) 部署 Hooks：

```bash
# 安装企业 hooks (macOS 示例)
sudo mkdir -p "/Library/Application Support/Cursor"
sudo cp hooks.json "/Library/Application Support/Cursor/hooks.json"
sudo chmod 644 "/Library/Application Support/Cursor/hooks.json"
```

**2. 云分发 (企业版计划):** 

- 管理员在 Cursor 的 Web 仪表板中配置 Hooks
- Hooks 自动同步给所有团队成员
- 同步间隔：约 30 分钟
- 用户不能覆盖（强制安全策略）

**3. 版本控制:** 

没有企业版计划的团队的标准方法：

```bash
# 团队通过 Git 共享 hooks
git clone company/shared-cursor-hooks
ln -s "$(pwd)/shared-cursor-hooks/hooks.json" .cursor/hooks.json
```

### 合作伙伴生态系统

Cursor 与安全合作伙伴有官方集成：

- **Semgrep:** 代码安全扫描
- **Snyk:** 漏洞检测
- **1Password:** 机密管理
- **Oasis Security:** AI 安全策略
- **Endor Labs:** 供应链安全

这些为常见的安全工作流提供了预构建的 Hooks。

### Cursor Hooks 故障排除

**Hook 进程崩溃：**
- 隔离测试脚本：`echo '{"hook_event_name": "test"}' | python3 your_hook.py`
- 检查 Cursor 日志：Help → Developer → Toggle Developer Tools
- 确保脚本输出有效的 JSON

**权限总是 "ask" 即使未返回：**
- 检查 JSON 响应是否格式错误
- 验证响应是否包含 "permission" 字段
- 使用最小响应进行测试：`{"permission": "allow"}`

**企业 Hooks 未应用：**
- 验证安装路径（macOS vs Windows vs Linux 不同）
- 检查文件权限（hooks.json 必须可读）
- 等待同步间隔（云分发约 30 分钟）

## 详细实现指南：Kiro

### 配置结构

Kiro 使用基于目录的方法：

```
/project/.kiro/hooks/
├── test_sync.json
├── doc_update.json
└── format_on_save.json
```

每个文件使用自然语言定义一个或多个 Hooks。

### 触发类型

Kiro 专注于基于文件的事件：

| 触发器 | 触发时机 | 示例用例 |
|---------|---------------|------------------|
| `fileEdit` | 文件修改 | 更新相关文件，运行格式化器 |
| `fileCreate` | 新文件创建 | 生成样板代码，更新索引 |
| `fileDelete` | 文件删除 | 清理相关文件，更新引用 |
| `userTriggered` | 手动激活 | 通过 UI 进行按需操作 |

### 自然语言配置

Kiro 的关键创新：**Hooks 定义为自然语言提示词**，而不是脚本。

```json
{
  "name": "Synchronize Tests",
  "trigger": {
    "type": "fileEdit",
    "pattern": "src/**/*.py"
  },
  "action": {
    "prompt": "A Python source file has been modified. Check if a corresponding test file exists in the tests/ directory with the same name prefixed by 'test_'. If it exists, analyze the changes and update the test file to cover any new functions or modified behavior. If no test file exists, create one with basic test cases for all public functions."
  }
}
```

**这与基于命令的 Hooks 有何不同：**
- 无需脚本
- AI 使用完整的代码库上下文解释提示词
- 自然语言更易于编写和维护
- Kiro 的 AI 理解项目结构和惯例

### 实践示例：文档同步

**目标：** 当 TypeScript 接口更改时自动更新文档。

**创建 `.kiro/hooks/doc_sync.json`:**

```json
{
  "name": "API Documentation Sync",
  "trigger": {
    "type": "fileEdit",
    "pattern": "src/types/*.ts"
  },
  "action": {
    "prompt": "A TypeScript type definition file has been modified. Please:\n\n1. Identify any exported interfaces or types that changed\n2. Find the corresponding documentation file in docs/api/ (same base name with .md extension)\n3. Update the documentation to reflect:\n   - New properties added to interfaces\n   - Changed property types\n   - Modified JSDoc comments\n   - New interfaces or types\n4. Maintain the existing documentation structure and examples\n5. Add a note at the top: 'Last updated: [current date] (auto-synced from types)'\n\nIf no documentation file exists, create one with:\n- Interface/type name as heading\n- Description from JSDoc\n- Property table with types and descriptions\n- Usage example"
  }
}
```

**发生什么：**
1. 开发者编辑 `src/types/User.ts`
2. 保存时触发 Hook
3. Kiro 的 AI 读取更改
4. AI 理解要更新 `docs/api/User.md`
5. 文档自动保持同步

### 实践示例：组件模板

**目标：** 创建 React 组件时自动生成样板代码。

```json
{
  "name": "React Component Template",
  "trigger": {
    "type": "fileCreate",
    "pattern": "src/components/**/*.tsx"
  },
  "action": {
    "prompt": "A new React component file was created. Analyze the file name and directory structure, then:\n\n1. If the file is empty or only has basic imports, generate a complete component template:\n   - Extract component name from file name
   - Add TypeScript interface for props (ComponentNameProps)
   - Create functional component with proper typing
   - Add JSDoc comment describing the component
   - Include standard imports (React, any common hooks)
   - Add export statement\n\n2. Follow the project's existing component patterns (check other components in the same directory)\n\n3. If the component name suggests a specific pattern (e.g., 'Button', 'Modal', 'Form'), include relevant props and structure\n\n4. Add a TODO comment for the developer to implement the component logic"
  }
}
```

**结果：** 新组件文件会根据项目惯例自动获得脚手架。

### 手动触发器

Kiro 支持通过 UI 用户激活 Hooks：

```json
{
  "name": "Generate Comprehensive Tests",
  "trigger": {
    "type": "userTriggered"
  },
  "action": {
    "prompt": "Generate comprehensive unit tests for all public functions in the current file. Include:\n- Happy path tests\n- Edge cases\n- Error handling\n- Mock external dependencies\nPlace tests in the corresponding test file following project conventions."
  }
}
```

**用法：** 右键单击文件 → Run Hook → "Generate Comprehensive Tests"

### 配置最佳实践

**1. 提示词要具体:** 

❌ **太模糊:**
```json
{
  "prompt": "Update the tests"
}
```

✅ **清晰且可操作:**
```json
{
  "prompt": "Analyze the modified Python file. For each new or changed function, add or update corresponding test cases in the test file. Ensure tests cover normal cases, edge cases, and error conditions. Use pytest conventions and existing test patterns."
}
```

**2. 包含关于项目惯例的上下文:** 

```json
{
  "prompt": "Generate API documentation following our project's conventions:\n- Use JSDoc format\n- Include @param and @returns tags\n- Add usage examples\n- Reference related endpoints\n- Follow the structure in existing docs/api/ files"
}
```

**3. 使用模式针对特定文件:** 

```json
{
  "trigger": {
    "type": "fileEdit",
    "pattern": "src/**/*.{ts,tsx}"
  }
}
```

### 限制和注意事项

**Kiro Hooks 很强大但有所不同：**

- **执行时间：** AI 解释比 shell 脚本慢
- **确定性：** 自然语言解释可能会有轻微变化
- **调试：** 比显式脚本更难调试
- **最适合：** 需要理解代码的上下文感知任务
- **不适合：** 简单的格式化任务（对此使用基于命令的 Hooks）

### Kiro Hooks 故障排除

**Hook 未触发：**
- 检查文件模式匹配（使用 glob 测试器测试）
- 验证 JSON 语法
- 确保 `.kiro/hooks/` 目录存在且文件具有 `.json` 扩展名

**意外行为：**
- 使提示词更明确和详细
- 引用特定的项目惯例
- 通过要求 Kiro 执行任务来手动测试提示词
- 检查 AI 是否具有足够的上下文（可能需要打开相关文件）

**性能问题：**
- 减少 Hook 频率（避免在每次按键时触发）
- 简化复杂的提示词
- 考虑对简单任务使用基于命令的 Hooks

## 跨所有实现的通用模式

尽管语法不同，这些模式通用：

### 模式 1: 保存时自动格式化

**目标：** 确保代码风格一致性，无需人工干预。

**Claude Code:**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{"type": "command", "command": "prettier --write {{file_path}}"}]
      }
    ]
  }
}
```

**Cursor:**
```json
{
  "afterFileEdit": {
    "command": "prettier",
    "args": ["--write", "{{file_path}}"]
  }
}
```

**Kiro:**
```json
{
  "trigger": {"type": "fileEdit"},
  "action": {"prompt": "Format the modified file using Prettier with project settings"}
}
```

### 模式 2: 阻止危险操作

**目标：** 防止意外数据丢失或安全问题。

**Claude Code:**
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{"type": "prompt", "prompt": "If this command contains 'rm -rf' or modifies system files, respond DENY with explanation. Otherwise ALLOW."}]
      }
    ]
  }
}
```

**Cursor:**
```python
# Hook 脚本中
if "rm -rf" in event.get("command", ""):
    print(json.dumps({
        "permission": "deny",
        "user_message": "Blocked: Recursive deletion detected"
    }))
```

**Kiro:**
```json
{
  "trigger": {"type": "fileDelete", "pattern": "**/*.{json,config,env}"},
  "action": {"prompt": "Critical file deletion detected. Alert the user and require explicit confirmation before proceeding."}
}
```

### 模式 3: 测试同步

**目标：** 当实现代码更改时保持测试更新。

**Claude Code:**
```bash
#!/bin/bash
# Hook 脚本
FILE_PATH=$(echo "$EVENT_DATA" | jq -r '.tool_input.file_path')
if [[ "$FILE_PATH" == src/*.py ]]; then
  TEST_FILE="tests/test_$(basename $FILE_PATH)"
  # 使用 Claude 更新测试
  claude-cli "Update $TEST_FILE to cover changes in $FILE_PATH"
fi
```

**Cursor:**
```python
# Hook 脚本
if event["hook_event_name"] == "afterFileEdit":
    src_file = event["file_path"]
    if src_file.startswith("src/"):
        test_file = src_file.replace("src/", "tests/test_")
        print(json.dumps({
            "permission": "allow",
            "agent_message": f"Also update {test_file} to cover changes in {src_file}"
        }))
```

**Kiro:**
```json
{
  "trigger": {"type": "fileEdit", "pattern": "src/**/*.ts"},
  "action": {"prompt": "Source file modified. Find the corresponding test file (in tests/ with same name) and update tests to cover any new or modified functions."}
}
```

### 模式 4: 完成通知

**目标：** 智能体长时间运行任务完成时保持通知。

**Claude Code:**
```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [{"type": "command", "command": "osascript -e 'display notification \"Task complete\" with title \"Claude Code\"'"}]
      }
    ]
  }
}
```

**Cursor:**
```bash
# "stop" 事件的 Hook 脚本
curl -X POST https://hooks.slack.com/...
  -d "{\"text\": \"Agent session completed: $(date)\"}"
```

**Kiro:**
*(Kiro 没有会话级 Hooks，但可以在文件操作时通知)*

```json
{
  "trigger": {"type": "userTriggered"},
  "action": {"prompt": "Send a summary of changes made in this session to the #dev-ai channel in Slack using the MCP Slack tool"}
}
```

### 模式 5: 上下文注入

**目标：** 在 AI 处理请求之前添加相关信息。

**Claude Code:**
```json
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [{"type": "command", "command": "echo 'Additional context: Current sprint focus is performance optimization. Prioritize O(n) solutions.'"}]
      }
    ]
  }
}
```

**Cursor:**
```python
if event["hook_event_name"] == "beforeSubmitPrompt":
    with open(".project-context.md") as f:
        context = f.read()
    print(json.dumps({
        "permission": "allow",
        "agent_message": f"Project context:\n{context}"
    }))
```

**Kiro:**
*(上下文注入内置于 Kiro 的 AI 中——Hooks 通常专注于操作)*

## 安全最佳实践

Hooks 拥有强大的力量。遵循这些准则以安全使用：

### 1. 最小权限原则

仅授予 Hooks 必要的权限：

```bash
# Good: 特定工具匹配器
"matcher": "Edit"

# Risky: 匹配所有工具
"matcher": ".*"
```

### 2. 输入验证

在行动之前始终验证事件数据：

```python
# Bad: 盲目信任输入
file_path = event["file_path"]
os.system(f"cat {file_path}")  # Shell 注入风险！

# Good: 验证和转义
import shlex
file_path = event.get("file_path", "")
if file_path and os.path.exists(file_path):
    subprocess.run(["cat", file_path])  # 安全
```

### 3. 机密管理

永远不要在 Hooks 中硬编码凭据：

```bash
# Bad
curl -H "Authorization: Bearer sk_live_abc123..." https://api.example.com

# Good
curl -H "Authorization: Bearer $API_KEY" https://api.example.com
```

将机密存储在环境变量或使用机密管理器 (1Password, AWS Secrets Manager)。

### 4. 审计日志

记录 Hook 执行以符合规规：

```python
import logging
logging.basicConfig(filename='/var/log/hooks.log', level=logging.INFO)

def hook_handler(event):
    logging.info(f"Hook fired: {event['hook_event_name']} by {event.get('user_email')}")
    # ... hook 逻辑
```

### 5. 错误处理

安全失败：

```python
try:
    result = dangerous_operation()
    response = {"permission": "allow"}
except Exception as e:
    # 失败关闭：错误时拒绝
    response = {
        "permission": "deny",
        "user_message": "Hook error: operation blocked for safety"
    }
    logging.error(f"Hook error: {e}")

print(json.dumps(response))
```

### 6. Hooks 的代码审查

将 Hooks 视为生产代码：
- 在 PR 中审查所有 Hook 更改
- 在暂存环境中测试 Hooks
- 记录预期行为
- 版本控制所有 Hook 配置

### 7. 范围限制

将项目级 Hooks 用于特定项目的规则：

```
# 用户级 (~/.cursor/hooks.json)
- 个人偏好（通知样式，日志记录）
- 非安全关键的格式化程序

# 项目级 (.cursor/hooks.json)
- 安全策略
- 代码质量门控
- 团队标准

# 企业级 (MDM/云)
- 公司范围的安全策略
- 合规要求
- 集中管理的规则
```

## 选择正确的 Hook 策略

使用此决策树选择合适的实现：

```
你是否使用多个 AI 编码工具？
├─ 是 → 在每个工具的格式中实现类似的 Hooks
└─ 否 → 使用你工具的原生 Hook 系统

你的任务需要理解代码语义吗？
├─ 是 → Claude Code (prompt 模式) 或 Kiro (自然语言)
└─ 否 → 任何实现 (command 模式最快)

你需要企业范围的强制执行吗？
├─ 是 → Cursor (MDM/云分发)
└─ 否 → 项目级 Hooks (版本控制)

任务是否简单且确定？(格式化, lint, 运行测试)
├─ 是 → 基于命令的 Hooks (Claude Code, Cursor)
└─ 否 → 基于提示词的 Hooks (Claude Code) 或 Kiro

你有现有的 shell 脚本/工具吗？
├─ 是 → Claude Code 或 Cursor (可以直接调用脚本)
└─ 否 → Kiro (自然语言更易于编写)
```

### 混合方法

你可以结合实现：

**示例：多工具项目**

```
# Claude Code (.claude/settings.json)
- PostToolUse: 使用 Black 自动格式化
- PreToolUse: 阻止危险命令

# Cursor (.cursor/hooks.json)
- afterFileEdit: 机密检测
- beforeShellExecution: 安全验证

# Kiro (.kiro/hooks/)
- 测试同步 (需要代码理解)
- 文档更新 (利用 AI 上下文)
```

每个工具处理它最擅长的事情。

## 高级用例

### 用例 1: 自动代码审查

**目标：** AI 驱动的预提交审查，检查常见问题。

**实现 (Cursor):**

```python
#!/usr/bin/env python3
import json
import sys
import subprocess

event = json.load(sys.stdin)

if event.get("hook_event_name") == "afterFileEdit":
    file_path = event["file_path"]
    file_content = event["file_content"]

    # 使用 LLM 审查代码
    review_prompt = f"""Review this code change for:
    1. Potential bugs
    2. Performance issues
    3. Security vulnerabilities
    4. Best practice violations

    File: {file_path}

    Code:
    {file_content}

    Provide brief feedback or \"LGTM\" if no issues found."""

    # 通过 API 或 MCP 调用 LLM
    review_result = call_llm(review_prompt)

    if "LGTM" not in review_result:
        response = {
            "permission": "ask",
            "user_message": f"Code review feedback:\n{review_result}\n\nProceed anyway?"
        }
    else:
        response = {"permission": "allow"}

    print(json.dumps(response))
```

### 用例 2: 合规文档

**目标：** 为受监管环境自动生成合规文档。

**实现 (Kiro):**

```json
{
  "name": "HIPAA Compliance Documentation",
  "trigger": {
    "type": "fileEdit",
    "pattern": "src/models/**/*.py"
  },
  "action": {
    "prompt": "A data model file was modified. Check if it handles PHI (Protected Health Information) by looking for fields like patient names, SSNs, medical records, etc. If PHI is present:\n\n1. Update docs/compliance/data-models.md with:\n   - Model name and purpose\n   - PHI fields identified\n   - Encryption methods used\n   - Access controls required\n   - Audit logging status\n\n2. Verify the model includes:\n   - Field-level encryption for PHI\n   - Audit trail fields (created_at, modified_by)\n   - Access control decorators\n\n3. If any compliance requirements are missing, alert the developer with specific gaps and remediation steps."
  }
}
```

### 用例 3: 多阶段批准工作流

**目标：** 要求对关键更改进行多次批准。

**实现 (Cursor):**

```python
#!/usr/bin/env python3
import json
import sys
import os

APPROVAL_FILE = "/tmp/pending_approvals.json"

event = json.load(sys.stdin)

if event.get("hook_event_name") == "afterFileEdit":
    file_path = event["file_path"]

    # 需要两次批准的关键路径
    critical_paths = ["src/billing/", "src/auth/", "database/migrations/"]

    if any(cp in file_path for cp in critical_paths):
        # 加载现有批准
        approvals = {}
        if os.path.exists(APPROVAL_FILE):
            with open(APPROVAL_FILE) as f:
                approvals = json.load(f)

        file_key = file_path
        current_count = approvals.get(file_key, 0)

        if current_count < 1:
            # 需要第一次批准
            approvals[file_key] = current_count + 1
            with open(APPROVAL_FILE, "w") as f:
                json.dump(approvals, f)

            response = {
                "permission": "ask",
                "user_message": f"Critical file change (1/2 approvals): {file_path}\n\nFirst approval required."
            }
        else:
            # 第二次批准已授予，清除状态
            approvals.pop(file_key, None)
            with open(APPROVAL_FILE, "w") as f:
                json.dump(approvals, f)

            response = {
                "permission": "allow",
                "user_message": "✓ Second approval granted. Change allowed."
            }

        print(json.dumps(response))
    else:
        print(json.dumps({"permission": "allow"}))
```

### 用例 4: 与外部系统集成

**目标：** 代码更改时更新项目管理工具。

**实现 (Claude Code):**

```bash
#!/bin/bash
# Hook: 编辑文件时更新 Jira

EVENT_DATA=$(cat)
FILE_PATH=$(echo "$EVENT_DATA" | jq -r '.tool_input.file_path // empty')

# 从分支名称提取 Jira ticket
BRANCH=$(git rev-parse --abbrev-ref HEAD)
TICKET=$(echo "$BRANCH" | grep -oE '[A-Z]+-[0-9]+')

if [ -n "$TICKET" ]; then
  # 通过 API 更新 Jira
  curl -X POST "https://your-domain.atlassian.net/rest/api/3/issue/$TICKET/comment" \
    -H "Authorization: Bearer $JIRA_API_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"body\": {\"type\": \"doc\", \"version\": 1, \"content\": [{\"type\": \"paragraph\", \"content\": [{\"type\": \"text\", \"text\": \"AI agent modified: $FILE_PATH\"}]}]}"

  echo '{"permission": "allow", "message": "Updated Jira ticket '$TICKET'"}'
else
  echo '{"permission": "allow"}'
fi
```

## 故障排除与提示

### 通用调试步骤

**1. 隔离测试 Hooks：**
```bash
# 创建最小测试事件
echo '{"hook_event_name": "test", "file_path": "/tmp/test.py"}' | python3 your_hook.py
```

**2. 启用详细日志：**
```python
import sys
import logging
logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)
logging.debug(f"Hook received event: {event}")
```

**3. 验证 JSON 输出：**
```bash
# 测试 Hook 输出有效 JSON
./your_hook.sh | jq .
```

### 常见陷阱

**陷阱 1: 在 PostToolUse 期间修改文件**

```bash
# 这可能导致无限循环！
# Hook 在 Edit 时触发 → Hook 修改文件 → 再次触发 Hook → ...

# 解决方案：检查更改是否由 Hook 进行
if [[ "$TOOL_OUTPUT" != *"by hook"* ]]; then
  # 进行修改
fi
```

**陷阱 2: 假设事件结构**

```python
# Bad: 假设字段存在
file_path = event["file_path"]  # 如果缺失会 KeyError!

# Good: 使用默认值安全访问
file_path = event.get("file_path", "")
if not file_path:
    print(json.dumps({"permission": "allow"}))
    sys.exit(0)
```

**陷阱 3: 缓慢的 Hook 执行**

```bash
# Bad: 同步操作阻塞智能体
sleep 30  # 用户等待 30 秒！

# Good: 后台运行
operation_in_background &
echo '{"permission": "allow", "message": "Started background task"}'
```

**陷阱 4: 未处理错误**

```python
# Bad: 未处理的异常使 Hook 崩溃
result = risky_operation()

# Good: 优雅降级
try:
    result = risky_operation()
    response = {"permission": "allow"}
except Exception as e:
    logging.error(f"Hook error: {e}")
    response = {"permission": "allow"}  # 非关键 Hooks 失败开放 (Fail open)
finally:
    print(json.dumps(response))
```

### 性能提示

**1. 使用 matchers 限制 Hook 调用：**
```json
{
  "matcher": "Edit",
  "hooks": [...] 
}
```

**2. 不相关事件尽早退出：**
```python
# 先检查条件，尽早退出
if not file_path.endswith(".py"):
    print(json.dumps({"permission": "allow"}))
    sys.exit(0)

# 仅在需要时进行昂贵处理
run_expensive_check(file_path)
```

**3. 缓存昂贵操作：**
```python
import functools

@functools.lru_cache(maxsize=128)
def expensive_validation(file_content_hash):
    # 每个唯一内容仅运行一次
    return validate(file_content_hash)
```

## 总结和后续步骤

### 关键要点

1. **Hooks 是一种模式，不是标准** - 每个工具实现不同
2. **事件驱动控制** - 在智能体生命周期的特定点插入逻辑
3. **权限模型** - 允许、拒绝或请求用户确认
4. **选择正确的工具** - Command 模式为了速度，Prompt 模式为了上下文
5. **安全优先** - 验证输入，安全失败，审计操作
6. **从简单开始** - 从自动格式化开始，扩展到复杂工作流

### 你现在可以构建什么

使用 Hooks，你可以创建：
- **质量门控：** 提交前自动格式化、lint、测试
- **安全策略：** 阻止机密、危险命令、未经批准的操作
- **工作流自动化：** 更新文档、同步测试、通知利益相关者
- **合规系统：** 审计跟踪、批准工作流、文档
- **自定义集成：** 将智能体连接到现有的工具和流程

### 下一步

**1. 从简单的 Hook 开始：**

从这些适合初学者的示例中选择一个：
- 使用 Prettier 或 Black 自动格式化代码
- 当智能体停止时发送 Slack 通知
- 阻止 `rm -rf` 命令

**2. 探索你的工具功能：**

- **Claude Code 用户：** 阅读 `.claude/settings.json` 模式文档
- **Cursor 用户：** 查看合作伙伴集成 (Semgrep, Snyk 等)
- **Kiro 用户：** 尝试自然语言提示词

**3. 与团队分享：**

- 将 Hooks 提交到版本控制
- 记录每个 Hook 的作用
- 创建常见模式的团队运行手册

**4. 加入社区：**

- 分享你的 Hook 实现
- 学习他人的解决方案
- 贡献 Hook 库和示例

### 额外资源

**官方文档：**
- Claude Code: 设置和 Hooks 参考
- Cursor: Hooks API 文档
- Kiro: Hook 配置指南

**示例仓库：**
- 各种工具的社区 Hook 示例
- 以安全为重点的实现
- 工作流自动化模式

**安全资源：**
- OWASP AI 安全指南
- 机密扫描模式 (TruffleHog, detect-secrets)
- 合规文档模板

---

**记住：** Hooks 将 AI 智能体从强大的工具转变为开发工作流中可控、可观察和可扩展的成员。从小处着手，根据团队需求迭代，逐步构建健壮的 Hook 生态系统，使 AI 智能体更安全、更高效。

**有问题或反馈？** 为本文档贡献改进或与社区分享你的 Hook 实现。
# OpenAI Codex 完整使用手册

> 本手册涵盖 Codex CLI 命令行工具的全部核心功能、配置选项、工作流程和 Cheatsheet。

---

## 目录

1. [什么是 Codex](#什么是-codex)
2. [安装指南](#安装指南)
3. [认证配置](#认证配置)
4. [核心命令详解](#核心命令详解)
5. [斜杠命令 (Slash Commands)](#斜杠命令-slash-commands)
6. [键盘快捷键](#键盘快捷键)
7. [交互式会话操作](#交互式会话操作)
8. [配置文件详解](#配置文件详解)
9. [安全与沙箱机制](#安全与沙箱机制)
10. [MCP 服务器集成](#mcp-服务器集成)
11. [AGENTS.md 自定义指令](#agentsmd-自定义指令)
12. [非交互模式](#非交互模式)
13. [环境变量](#环境变量)
14. [GitHub Action 集成](#github-action-集成)
15. [定价与访问权限](#定价与访问权限)
16. [Cheatsheet 速查表](#cheatsheet-速查表)
17. [常见工作流程示例](#常见工作流程示例)
18. [故障排除](#故障排除)

---

## 什么是 Codex

OpenAI Codex 是一个 AI 代码智能体 (Coding Agent)，能够：

- **读取和理解代码库**：分析项目结构、依赖关系和代码风格
- **编写和编辑代码**：根据自然语言描述生成或修改代码
- **执行命令**：在终端运行命令、执行测试、构建项目
- **Git 操作**：管理版本控制、创建提交、处理分支
- **多工具协作**：通过 MCP 协议集成各种开发工具

Codex 以 **安全优先** 为设计理念，使用操作系统级沙箱 (macOS 的 Seatbelt，Linux 的 Bubblewrap) 来隔离命令执行，保护您的系统安全。

---

## 安装指南

### 系统要求

- **macOS**：10.15 (Catalina) 或更高版本
- **Linux**：主流发行版（需要支持 Bubblewrap）
- **Windows**：通过 WSL2 或 Docker 运行

### 安装方式

#### 方式一：Homebrew（推荐 macOS）

```bash
# 添加 OpenAI 官方 tap 并安装
brew install openai-codex/tap/codex

# 验证安装
codex --version
```

#### 方式二：npm

```bash
# 全局安装
npm install -g @openai/codex

# 验证安装
codex --version
```

#### 方式三：直接下载二进制文件

1. 访问 [GitHub Releases](https://github.com/openai/codex/releases/latest)
2. 下载适合您操作系统的二进制文件
3. 将其添加到系统 PATH 中

```bash
# 示例：将 Linux 二进制文件安装到系统路径
chmod +x codex-linux-amd64
sudo mv codex-linux-amd64 /usr/local/bin/codex
```

### 验证安装

```bash
# 检查版本
codex --version

# 运行诊断
codex doctor
```

---

## 认证配置

### 首次认证

首次运行 Codex 时，系统会提示您进行认证：

```bash
codex
```

您可以选择两种认证方式：

#### 方式一：ChatGPT 账户登录

```bash
codex login
```

这将打开浏览器窗口，引导您完成 OAuth 登录流程。

#### 方式二：API Key 认证

```bash
# 设置环境变量
export OPENAI_API_KEY="sk-..."

# 或在配置文件中指定
```

### 管理认证

```bash
# 登出当前账户
codex logout

# 查看当前认证状态
codex auth status
```

---

## 核心命令详解

### codex（主命令）

启动 Codex 交互式会话：

```bash
# 基本启动（进入交互模式）
codex

# 在指定目录启动
codex /path/to/project

# 使用指定模型
codex --model gpt-5-codex

# 查看帮助
codex --help
```

### 子命令列表

| 命令 | 说明 |
|------|------|
| `codex` | 启动交互式会话 |
| `codex --help` | 显示帮助信息 |
| `codex --version` | 显示版本信息 |
| `codex doctor` | 运行诊断检查 |
| `codex login` | 登录账户 |
| `codex logout` | 登出账户 |
| `codex mcp` | 管理 MCP 服务器 |
| `codex init` | 初始化项目配置 |

### CLI 选项

#### 模型选项

```bash
# 指定使用的模型
codex --model gpt-5-codex
codex --model gpt-4o

# 推理努力程度（影响响应速度和质量）
codex --model-reasoning-effort high    # 复杂问题，深度思考
codex --model-reasoning-effort medium  # 平衡模式
codex --model-reasoning-effort low     # 快速响应
```

#### 输出选项

```bash
# 静默模式（最小化输出）
codex --quiet "你的请求"

# JSON 输出格式
codex --output-json "分析这个文件"

# 指定输出文件
codex --output /path/to/output.md "生成文档"
```

#### 执行选项

```bash
# 完全自动模式（跳过所有确认）
codex --full-auto "部署到生产环境"

# 跳过沙箱限制
codex --dangerously-bypass-approvals-and-sandbox "执行命令"

# 工作目录
codex --working-dir /path/to/project "构建项目"

# 覆盖配置
codex -c approval_policy="never" -c sandbox_mode="workspace-write" "你的请求"
```

#### 搜索功能

```bash
# 启用搜索增强
codex --search true "查找相关实现"

# 禁用搜索
codex --search false "快速回答"
```

---

## 斜杠命令 (Slash Commands)

在交互式会话中，输入 `/` 可打开斜杠命令菜单。

### 内置斜杠命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/ask` | 直接提问（不修改文件） | `/ask 解释这段代码的逻辑` |
| `/edit` | 请求编辑文件 | `/edit 优化这个函数的性能` |
| `/diff` | 显示建议的更改 | `/diff 重命名这个变量` |
| `/clear` | 清除对话历史 | `/clear` |
| `/quit` 或 `/exit` | 退出会话 | `/quit` |
| `/model` | 切换模型 | `/model gpt-5-codex` |
| `/undo` | 撤销上一个操作 | `/undo` |
| `/redo` | 重做操作 | `/redo` |
| `/retry` | 重试上一次请求 | `/retry` |
| `/help` | 显示帮助 | `/help` |
| `/init` | 初始化项目 | `/init` |
| `/search` | 启用/禁用搜索 | `/search on` |
| `/compact` | 压缩上下文 | `/compact` |
| `/logout` | 登出账户 | `/logout` |

### 自定义斜杠命令

在 `~/.codex/config.toml` 中添加自定义命令：

```toml
# 自定义斜杠命令
[[slash_commands]]
name = "test"
description = "运行测试"
prompt = "运行当前项目的所有测试，并报告结果"
```

---

## 键盘快捷键

### 导航快捷键

| 快捷键 | 说明 |
|--------|------|
| `↑ / ↓` | 浏览命令历史 |
| `Ctrl + L` | 清屏（保持上下文） |
| `Ctrl + G` | 跳转到行首 |
| `Ctrl + E` | 跳转到行尾 |
| `Escape` | 取消当前输入 |

### 编辑快捷键

| 快捷键 | 说明 |
|--------|------|
| `Ctrl + A` | 全选 |
| `Ctrl + Z` | 撤销 |
| `Ctrl + Shift + Z` | 重做 |
| `Tab` | 自动补全 |
| `Ctrl + K` | 删除到行尾 |

### 会话控制

| 快捷键 | 说明 |
|--------|------|
| `Ctrl + C` | 停止当前操作 |
| `Ctrl + D` | 退出会话 |
| `Enter` | 发送消息 |

### 命令输入模式

| 快捷键 | 说明 |
|--------|------|
| `/` | 打开斜杠命令菜单 |
| `@` | 引用文件或符号 |
| `#` | 添加搜索上下文 |
| `>` | 进入命令模式 |

---

## 交互式会话操作

### 基本会话流程

```bash
# 1. 启动会话
codex

# 2. Codex 会自动分析当前目录的代码库
#    分析完成后，进入等待输入状态

# 3. 输入您的请求
你在做什么？
> 解释 main.py 的功能

# 4. Codex 响应并可能执行操作

# 5. 继续对话或使用斜杠命令
> /quit  # 退出会话
```

### 上下文引用

在对话中引用项目文件或符号：

```bash
> 修复 @utils.py 中的 parse_config 函数的 bug
> 优化 @models/User.ts 中 getUserById 的性能
> 为 @calculate_total 添加单元测试
```

### 多轮对话

Codex 保持对话上下文，可以进行复杂的多步骤任务：

```bash
> 创建一个 REST API 来管理用户
> 添加分页支持
> 实现缓存层
> 编写 API 文档
```

---

## 配置文件详解

### 配置文件位置

- **主配置**：`~/.codex/config.toml`
- **项目配置**：`./.codex/config.toml`
- **环境变量**：`~/.codex/.env`

### 主配置文件示例

```toml
# ~/.codex/config.toml

# ============================================
# 基础配置
# ============================================

# 使用的模型
model = "gpt-5-codex"

# 启用搜索增强
search = true

# 推理努力程度
model_reasoning_effort = "medium"

# ============================================
# 认证配置
# ============================================

# API Key 认证
# preferred_auth_method = "apikey"
# api_key = "sk-..."

# 或使用 ChatGPT OAuth
# preferred_auth_method = "oauth"

# ============================================
# 安全与沙箱配置
# ============================================

# 审批策略
# "untrusted"   - 始终询问（默认）
# "permissive"  - 宽松模式
# "never"       - 从不询问
approval_policy = "untrusted"

# 沙箱模式
# "read-only"       - 只读模式
# "workspace-write" - 允许写入工作目录
# "danger-full-access" - 完全访问（危险）
sandbox_mode = "read-only"

# 允许登录 shell
allow_login_shell = false

# 工作目录写模式的特殊配置
[sandbox_workspace_write]
# 允许网络访问
network_access = true

# ============================================
# Shell 环境变量策略
# ============================================

# 允许传递给子进程的变量
allowed_environment_variables = [
    "PATH",
    "HOME",
    "USER",
    "NODE_ENV",
    "VIRTUAL_ENV"
]

# ============================================
# MCP 服务器配置
# ============================================

[[mcp_servers]]
# MCP 服务器名称
name = "filesystem"
# 服务器类型
type = "stdio"
# 启动命令
command = "npx"
# 命令参数
args = ["-y", "@modelcontextprotocol/server-filesystem", "./"]

[[mcp_servers]]
name = "github"
type = "stdio"
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]

[[mcp_servers]]
name = "custom-server"
type = "http"
url = "http://localhost:3000"
```

### 配置覆盖

#### CLI 覆盖

```bash
# 单次命令覆盖配置
codex -c approval_policy="never" -c sandbox_mode="workspace-write" "你的请求"

# JSON 值解析
codex -c model_reasoning_effort="\"high\"" "复杂任务"

# 布尔值
codex -c search=false "快速回答"
```

#### 环境变量覆盖

```bash
# 在 ~/.codex/.env 中设置
OPENAI_API_KEY=sk-...
CODEX_MODEL=gpt-5-codex
CODEX_APPROVAL_POLICY=never
CODEX_SANDBOX_MODE=workspace-write
```

### 配置文件分段说明

```toml
# ============================================
# 分段配置（Profiles）
# ============================================

[profiles.work]
model = "gpt-5-codex"
approval_policy = "never"
sandbox_mode = "workspace-write"

[profiles.trusted]
approval_policy = "permissive"
sandbox_mode = "danger-full-access"

[profiles.ci]
model = "gpt-5-codex"
approval_policy = "never"
sandbox_mode = "read-only"
```

使用配置分段：

```bash
# 使用指定配置
codex --profile ci "CI 任务"

# 在项目中指定配置
# 在 ./.codex/config.toml 中设置
```

---

## 安全与沙箱机制

### 安全架构

Codex 采用多层安全机制：

```
┌─────────────────────────────────────────────┐
│           用户交互层                         │
│    (审批确认、命令预览、权限控制)              │
├─────────────────────────────────────────────┤
│         操作系统沙箱层                         │
│   (Seatbelt/Bubblewrap 隔离)                 │
├─────────────────────────────────────────────┤
│           文件系统层                          │
│   (工作目录限制、读写权限控制)                 │
├─────────────────────────────────────────────┤
│            网络层                            │
│   (可选网络访问控制)                          │
└─────────────────────────────────────────────┘
```

### 审批策略详解

| 策略 | 说明 | 适用场景 |
|------|------|----------|
| `untrusted` | 始终请求审批（默认） | 日常开发、生产环境 |
| `permissive` | 仅在敏感操作时请求 | 信任的开发环境 |
| `never` | 从不请求审批 | CI/CD、完全信任的环境 |

### 审批请求示例

Codex 在执行以下操作时会请求审批：

- 修改或创建文件
- 执行可能破坏性的命令（如 `rm -rf`）
- 执行外部命令
- 网络请求
- Git 推送操作

### 沙箱模式详解

| 模式 | 说明 | 限制 |
|------|------|------|
| `read-only` | 只读模式 | 不能修改任何文件 |
| `workspace-write` | 工作目录写模式 | 仅能修改当前项目文件 |
| `danger-full-access` | 完全访问模式 | 可访问系统所有资源（危险） |

### 细化权限配置

```toml
# 细化审批策略
approval_policy = {
    granular = {
        sandbox_approval = true,      # 沙箱设置变更
        rules = true,                  # 规则匹配
        mcp_elicitations = true,       # MCP 调用
        request_permissions = false,    # 权限请求
        skill_approval = false          # 技能执行
    }
}
```

### 安全最佳实践

1. **日常开发**：使用默认配置
   ```toml
   approval_policy = "untrusted"
   sandbox_mode = "read-only"
   allow_login_shell = false
   ```

2. **需要修改文件时**：
   ```bash
   # 临时切换到写入模式
   codex -c sandbox_mode="workspace-write" -c approval_policy="permissive"
   ```

3. **CI/CD 环境**：
   ```bash
   codex --full-auto --no-input "CI 任务"
   ```

---

## MCP 服务器集成

### 什么是 MCP

MCP (Model Context Protocol) 是一个开放协议，允许 AI 智能体与各种工具和服务集成。

### 添加 MCP 服务器

#### 方式一：通过 CLI 添加

```bash
# 列出所有 MCP 服务器
codex mcp list

# 添加 MCP 服务器
codex mcp add filesystem -y @modelcontextprotocol/server-filesystem ./

codex mcp add github -y @modelcontextprotocol/server-github

# 移除 MCP 服务器
codex mcp remove filesystem

# 获取 MCP 服务器信息
codex mcp get github
```

#### 方式二：通过配置文件添加

```toml
# ~/.codex/config.toml

[[mcp_servers]]
name = "filesystem"
type = "stdio"
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "./"]

[[mcp_servers]]
name = "github"
type = "http"
url = "https://api.github.com"
auth_token = "${GITHUB_TOKEN}"
```

### MCP 服务器类型

#### STDIO 服务器

```toml
[[mcp_servers]]
name = "custom-tool"
type = "stdio"
command = "node"
args = ["/path/to/mcp-server.js"]
```

#### HTTP 服务器

```toml
[[mcp_servers]]
name = "remote-api"
type = "http"
url = "http://localhost:8080"
auth_token = "your-token"
```

### 常用 MCP 服务器

| 服务器 | 说明 | 安装命令 |
|--------|------|----------|
| filesystem | 文件系统操作 | `npx -y @modelcontextprotocol/server-filesystem ./` |
| github | GitHub API 操作 | `npx -y @modelcontextprotocol/server-github` |
| slack | Slack 消息发送 | `npx -y @modelcontextprotocol/server-slack` |
| sequential-thinking | 推理增强 | `npx -y @modelcontextprotocol/server-sequential-thinking` |

---

## AGENTS.md 自定义指令

### 什么是 AGENTS.md

`AGENTS.md` 是一个特殊文件，用于为 Codex 定义项目级别的自定义指令和行为规范。

### 创建 AGENTS.md

在项目根目录创建 `AGENTS.md` 文件：

```markdown
# AGENTS.md - 项目自定义指令

## 项目概述
这是一个使用 React + TypeScript 构建的电商前端项目。

## 技术栈
- React 18
- TypeScript 5
- Tailwind CSS
- Zustand 状态管理
- React Query 数据获取

## 代码规范
- 使用 TypeScript 严格模式
- 组件采用函数式组件 + Hooks
- 样式使用 Tailwind CSS 原子化方案
- 禁止使用 `any` 类型

## 文件组织
```
src/
├── components/     # 可复用组件
├── pages/          # 页面组件
├── hooks/          # 自定义 Hooks
├── stores/         # Zustand stores
├── api/            # API 请求
└── utils/          # 工具函数
```

## Git 工作流
- 分支命名：`feature/xxx`、`bugfix/xxx`、`hotfix/xxx`
- 提交信息遵循 Conventional Commits 规范
- PR 需要至少 2 人 review

## 测试要求
- 组件需要有对应的 `.test.tsx` 文件
- 关键业务逻辑需要单元测试
- 使用 Vitest + React Testing Library

## 环境配置
- Node.js >= 18.0.0
- pnpm 作为包管理器
- 开发环境端口：3000
```

### AGENTS.md 加载位置

Codex 会按以下顺序查找 AGENTS.md：

1. 当前工作目录的 `./AGENTS.md`
2. 当前工作目录的 `./.codex/AGENTS.md`
3. 用户主目录的 `~/.codex/AGENTS.md`

### AGENTS.md 示例场景

#### React 项目

```markdown
# AGENTS.md for React Project

## 技术栈
- React 18 + TypeScript
- Tailwind CSS
- Zustand

## 组件规范
- 使用函数组件和 hooks
- Props 使用 interface 定义
- 优先使用 CSS Modules 或 Tailwind

## 代码风格
- 组件文件使用 PascalCase
- Hooks 使用 camelCase 以 use 开头
- 常量使用 UPPER_SNAKE_CASE
```

#### Python 项目

```markdown
# AGENTS.md for Python Project

## 技术栈
- Python 3.11+
- FastAPI
- SQLAlchemy
- Pydantic

## 代码规范
- 遵循 PEP 8
- 使用类型注解
- 异步函数使用 async/await

## 项目结构
- `app/` - 应用代码
- `tests/` - 测试文件
- `alembic/` - 数据库迁移
```

---

## 非交互模式

### 基本用法

```bash
# 直接执行单个命令
codex "解释这个函数的作用"
codex "为这个文件添加类型注解"

# 管道输入
echo "优化这段代码" | codex
cat input.py | codex "为这段代码添加文档字符串"

# 重定向输出
codex "分析项目结构" > analysis.md

# 多行输入
codex "为 calculate_total 函数编写单元测试
需要覆盖正常情况、边界情况和异常情况"
```

### 脚本中使用

#### Bash 脚本

```bash
#!/bin/bash
# run-codex.sh

set -e

# 分析代码
codex --quiet "分析 src/ 目录的代码复杂度" > reports/complexity.md

# 生成测试
codex --output-json "为 api/ 模块生成集成测试" > tests/api_test.json

# CI 场景
codex --full-auto --no-input "运行测试套件并报告结果"
```

#### Python 脚本调用

```python
#!/usr/bin/env python3
import subprocess
import json

def run_codex(task):
    """在非交互模式下运行 Codex"""
    result = subprocess.run(
        ["codex", "--quiet", task],
        capture_output=True,
        text=True
    )
    return result.stdout, result.stderr

# 使用示例
stdout, stderr = run_codex("为这个模块添加类型注解")
print(stdout)
```

### CI/CD 集成

#### GitHub Actions

```yaml
# .github/workflows/code-review.yml
name: Codex Code Review

on:
  pull_request:
    branches: [main]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install Codex
        run: npm install -g @openai/codex

      - name: Run Codex Review
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          CODEX_APPROVAL_POLICY: "never"
        run: |
          codex --full-auto --no-input "
            检查这个 PR 的代码质量：
            1. 检查是否有潜在的 bug
            2. 检查代码风格是否一致
            3. 检查是否有安全问题
            4. 生成审查报告
          " > code-review.md

      - name: Upload Review Report
        uses: actions/upload-artifact@v4
        with:
          name: code-review-report
          path: code-review.md
```

#### GitLab CI

```yaml
# .gitlab-ci.yml
code_review:
  stage: review
  script:
    - npm install -g @openai/codex
    - codex --full-auto --no-input "审查代码变更并生成报告"
  artifacts:
    paths:
      - review-report.md
  only:
    - merge_requests
```

---

## 环境变量

### 常用环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `OPENAI_API_KEY` | OpenAI API 密钥 | - |
| `CODEX_MODEL` | 默认模型 | `gpt-5-codex` |
| `CODEX_APPROVAL_POLICY` | 审批策略 | `untrusted` |
| `CODEX_SANDBOX_MODE` | 沙箱模式 | `read-only` |
| `CODEX_HOME` | Codex 配置目录 | `~/.codex` |
| `CODEX_SEARCH` | 启用搜索 | `true` |
| `CODEX_OUTPUT` | 输出格式 | `text` |
| `GITHUB_TOKEN` | GitHub 认证令牌 | - |
| `GITLAB_TOKEN` | GitLab 认证令牌 | - |

### 配置示例

```bash
# ~/.bashrc 或 ~/.zshrc

# OpenAI API 配置
export OPENAI_API_KEY="sk-..."

# Codex 行为配置
export CODEX_MODEL="gpt-5-codex"
export CODEX_APPROVAL_POLICY="untrusted"
export CODEX_SANDBOX_MODE="read-only"
export CODEX_SEARCH="true"

# GitHub 集成
export GITHUB_TOKEN="ghp_..."

# 调试模式
export CODEX_LOG_LEVEL="debug"
```

---

## GitHub Action 集成

### 完整示例

```yaml
name: AI Code Review

on:
  pull_request:
    types: [opened, synchronize]
  push:
    branches: [main]

jobs:
  code-review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Codex
        run: npm install -g @openai/codex

      - name: Run AI Review
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: |
          codex --full-auto --no-input "
            审查代码变更，输出包含：
            1. 总体评价
            2. 发现的问题
            3. 改进建议
          " > review.md

      - name: Post Review Comment
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## AI Code Review\n\n${review}`
            });
```

### 自动化测试生成

```yaml
name: Generate Tests

on:
  push:
    branches: [main]

jobs:
  generate-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Codex
        run: npm install -g @openai/codex

      - name: Generate Tests
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: |
          codex --full-auto --no-input "
            分析 src/ 目录下的代码，
            为每个模块生成 Jest 单元测试，
            输出到 tests/ 目录
          "

      - name: Create PR
        uses: peter-evans/create-pull-request@v5
        with:
          title: "chore: add AI-generated tests"
          branch: chore/add-ai-tests
          commit-message: "chore: add AI-generated tests"
```

---

## 定价与访问权限

### 访问要求

- **ChatGPT Team / Enterprise**：Codex CLI 已包含在订阅中
- **ChatGPT Plus**：可能需要在等待列表中申请
- **API 访问**：需要有效的 API Key，按 token 计费

### 计费说明

| 功能 | 计费方式 |
|------|----------|
| 对话交互 | 按 token 计费 |
| 搜索增强 | 可能产生额外费用 |
| MCP 调用 | 取决于 MCP 服务器 |

### 成本优化建议

```bash
# 使用较低推理成本的模型
codex --model gpt-4o-mini "简单任务"

# 禁用搜索增强
codex --search false "快速回答"

# 使用低推理努力
codex --model-reasoning-effort low "简单问题"
```

---

## Cheatsheet 速查表

### 快速命令

```bash
# 启动
codex                              # 启动交互式会话
codex /path/to/project             # 在指定目录启动
codex "单行命令"                    # 非交互模式

# 认证
codex login                        # 登录
codex logout                       # 登出
codex auth status                  # 查看认证状态

# 诊断
codex doctor                       # 运行诊断
codex --version                    # 查看版本
codex --help                       # 查看帮助

# MCP
codex mcp list                     # 列出 MCP 服务器
codex mcp add <name> <command>     # 添加 MCP 服务器
codex mcp remove <name>            # 移除 MCP 服务器
```

### 配置速查

```bash
# CLI 选项
codex --model <model>              # 指定模型
codex --full-auto                  # 全自动模式
codex --quiet                      # 静默模式
codex -c key="value"               # 覆盖配置
codex --profile <name>             # 使用配置分段

# 环境变量
export OPENAI_API_KEY=...          # 设置 API Key
export CODEX_SANDBOX_MODE=...      # 设置沙箱模式
export CODEX_APPROVAL_POLICY=...   # 设置审批策略
```

### 斜杠命令速查

```
/ask <question>        # 直接提问
/edit <instruction>   # 请求编辑
/diff                  # 显示更改
/clear                 # 清除对话
/quit                  # 退出
/model <model>         # 切换模型
/search [on|off]       # 搜索开关
/compact               # 压缩上下文
```

### 审批策略

| 模式 | 说明 |
|------|------|
| `--approval-policy untrusted` | 始终询问（默认） |
| `--approval-policy permissive` | 宽松 |
| `--approval-policy never` | 从不询问 |

### 沙箱模式

| 模式 | 说明 |
|------|------|
| `--sandbox-mode read-only` | 只读 |
| `--sandbox-mode workspace-write` | 允许写工作目录 |
| `--sandbox-mode danger-full-access` | 完全访问 |

---

## 常见工作流程示例

### 工作流程 1：日常代码审查

```bash
# 1. 启动 Codex 并进入 PR 目录
cd /path/to/project
codex

# 2. Codex 自动分析代码库

# 3. 请求审查
> 审查 src/api/user.ts 的实现，关注点：
> 1. 错误处理
> 2. 类型安全
> 3. 性能优化

# 4. 根据反馈修改
> 根据审查意见修改代码

# 5. 验证更改
> 运行相关测试确认修改正确

# 6. 退出
> /quit
```

### 工作流程 2：新功能开发

```bash
# 1. 启动会话
codex

# 2. 描述需求
> 创建一个用户认证模块，包含：
> - 用户注册（邮箱、密码）
> - 用户登录（JWT token）
> - 密码重置功能

# 3. 逐步实现
> 首先实现数据库模型
> 添加 API 路由
> 实现业务逻辑
> 编写单元测试

# 4. 提交代码
> /edit 提交这些更改到 Git
```

### 工作流程 3：Bug 修复

```bash
# 1. 描述问题
codex "用户在登录后有时会遇到 401 错误"

# 2. Codex 会分析日志和代码
# 输入额外信息：
> 错误发生在 token 过期后重新获取时
> 已排除网络问题和 token 生成逻辑

# 3. 定位问题
> 问题可能是 token 刷新时的竞态条件

# 4. 修复并验证
> 实施修复并运行测试
```

### 工作流程 4：代码重构

```bash
# 1. 启动会话
codex

# 2. 描述重构目标
> 重构 src/components/Button 组件：
> - 移除不必要的 props
> - 优化样式代码
> - 添加 TypeScript 类型
> - 确保向后兼容

# 3. 逐步重构
> 首先分析当前组件的 API 和使用情况
> 然后创建新版本的组件
> 更新所有使用该组件的地方
> 运行测试验证

# 4. 生成变更报告
> /edit 生成重构报告，包含：
> - 移除的 props 列表
> - API 变更说明
> - 迁移指南
```

### 工作流程 5：文档生成

```bash
# 1. 非交互模式生成
codex --quiet "为整个 src/ 目录生成 API 文档，
输出到 docs/api.md，
使用 Markdown 格式" > docs/api.md

# 2. 交互模式补充
codex

> 根据生成的文档，添加缺失的信息
> 添加代码示例
> 验证文档准确性
```

### 工作流程 6：测试驱动开发

```bash
# 1. 启动会话
codex

# 2. 编写测试
> 为 calculate_discount 函数编写测试用例
> 需要覆盖：
> - 正常折扣计算
> - 100% 折扣
> - 无折扣
> - 无效输入（负数折扣）

# 3. 运行测试确认失败
> 运行测试，应该全部失败

# 4. 实现功能
> 实现 calculate_discount 函数使测试通过

# 5. 优化代码
> 重构代码，提高可读性和性能
```

---

## 故障排除

### 常见问题

#### 1. 认证问题

```bash
# 问题：登录失败
# 解决方案：
codex logout
codex login

# 检查 API Key
echo $OPENAI_API_KEY

# 重置配置
rm -rf ~/.codex
codex doctor
```

#### 2. 权限问题

```bash
# 问题：无法写入文件
# 解决方案：
# 检查沙箱模式
codex -c sandbox_mode="workspace-write" "写入文件"

# 检查文件权限
ls -la /path/to/file

# 检查目录权限
chmod +w /path/to/directory
```

#### 3. 性能问题

```bash
# 问题：响应慢
# 解决方案：
# 使用较低推理努力
codex --model-reasoning-effort low "快速任务"

# 禁用搜索
codex --search false "简单问题"

# 压缩上下文
> /compact
```

#### 4. MCP 服务器问题

```bash
# 问题：MCP 服务器连接失败
# 解决方案：
# 检查 MCP 配置
codex mcp list

# 重新安装 MCP 服务器
codex mcp remove <name>
codex mcp add <name> -y <package>

# 检查服务器日志
codex --verbose mcp list
```

#### 5. 诊断命令

```bash
# 运行完整诊断
codex doctor

# 检查配置
cat ~/.codex/config.toml

# 查看日志
tail -f ~/.codex/logs/codex.log

# 调试模式
export CODEX_LOG_LEVEL=debug
codex
```

### 配置回退

如果配置导致问题，可以重置：

```bash
# 备份当前配置
mv ~/.codex/config.toml ~/.codex/config.toml.bak

# 使用默认配置
codex

# 或手动重置
cat > ~/.codex/config.toml << 'EOF'
model = "gpt-5-codex"
search = true
approval_policy = "untrusted"
sandbox_mode = "read-only"
EOF
```

### 获取帮助

```bash
# 查看帮助
codex --help

# 查看特定命令帮助
codex mcp --help

# 查看配置文件示例
codex --help-config

# 在线文档
open https://developers.openai.com/codex
```

---

## 附录

### 配置文件模板

```toml
# ~/.codex/config.toml 完整模板

# ============================================
# OpenAI Codex 配置文件
# ============================================

# 基础配置
model = "gpt-5-codex"
search = true
model_reasoning_effort = "medium"

# 认证配置（可选）
# preferred_auth_method = "apikey"
# api_key = "sk-..."

# 安全配置
approval_policy = "untrusted"
sandbox_mode = "read-only"
allow_login_shell = false

# MCP 服务器配置
[[mcp_servers]]
name = "filesystem"
type = "stdio"
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "./"]
```

### 快速参考表

| 场景 | 推荐命令 |
|------|----------|
| 日常开发 | `codex` |
| 只读分析 | `codex --sandbox-mode read-only` |
| 需要修改文件 | `codex -c sandbox_mode="workspace-write"` |
| CI/CD 自动化 | `codex --full-auto --no-input "任务"` |
| 快速提问 | `codex --quiet "问题"` |
| 调试问题 | `codex --verbose` |

### 资源链接

- **官方文档**：https://developers.openai.com/codex
- **GitHub 仓库**：https://github.com/openai/codex
- **MCP 协议**：https://modelcontextprotocol.io
- **npm 包**：https://www.npmjs.com/package/@openai/codex

---

*本手册最后更新于 2026 年 3 月。*

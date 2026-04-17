# Codex CLI 完整使用手册

> Codex CLI 是 OpenAI 提供的命令行 AI 编程助手，能够读取代码库、编写和编辑代码、执行命令、管理 Git 操作。本手册涵盖全部核心功能、配置选项和工作流程。

---

## 目录

1. [什么是 Codex](#什么是-codex)
2. [安装指南](#安装指南)
3. [认证配置](#认证配置)
4. [核心命令详解](#核心命令详解)
5. [斜杠命令](#斜杠命令)
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

### Codex 与 ChatGPT Plus 的关系

| 特性 | ChatGPT Plus | Codex CLI |
|------|-------------|-----------|
| 使用方式 | 网页/App 对话 | 终端命令行 |
| 核心场景 | 通用对话、调研 | 代码编辑、自动化 |
| 文件操作 | 上传分析 | 直接读写本地文件 |
| 自动化 | 手动交互 | 可脚本化、集成到 CI |
- **模型访问**：两者都使用 GPT-5 / GPT-4o 等先进模型
- **计费**：Plus 是固定月费，Codex CLI 按 API 用量计费
- **协同**：Plus 用于规划，CLI 用于执行

### Codex 的核心优势

相比传统 AI 编程助手（如 Copilot、Cursor）：

- **全项目理解**：不仅看当前文件，还能分析整个代码库
- **自主执行**：能运行命令、测试、调试
- **Git 集成**：自动创建有意义的 commit
- **安全沙箱**：默认隔离执行，保护系统安全
- **可扩展**：通过 MCP 协议接入自定义工具

---

## 安装指南

### 系统要求

| 操作系统 | 最低版本 | 沙箱技术 |
|---------|---------|---------|
| macOS | 10.15 (Catalina) | Seatbelt |
| Linux | 主流发行版 | Bubblewrap |
| Windows | WSL2 或 Docker | N/A |

### 安装方式

#### 方式一：Homebrew（推荐 macOS）

```bash
# 添加 OpenAI 官方 tap
brew tap openai/codex

# 安装 Codex
brew install openai-codex

# 验证安装
codex --version

# 运行诊断
codex doctor
```

#### 方式二：npm（跨平台）

```bash
# 全局安装
npm install -g @openai/codex

# 验证
codex --version
codex doctor
```

#### 方式三：直接下载二进制文件

1. 访问 [GitHub Releases](https://github.com/openai/codex/releases/latest)
2. 下载对应平台的二进制文件
3. 添加到系统 PATH

```bash
# Linux/macOS 示例
chmod +x codex-linux-amd64
sudo mv codex-linux-amd64 /usr/local/bin/codex

# Windows (WSL2)
chmod +x codex-windows-amd64.exe
sudo mv codex-windows-amd64.exe /usr/local/bin/codex
```

### 安装验证

```bash
# 检查版本
codex --version

# 运行系统诊断
codex doctor

# 验证沙箱支持
codex doctor --check-sandbox
```

**预期输出**：
```
✓ Codex is installed correctly
✓ API key is configured
✓ Sandbox is available
✓ Model access verified
```

---

## 认证配置

### 首次认证

运行 `codex` 后，系统会提示认证：

```bash
$ codex
? 选择认证方式:
   ChatGPT 账户登录 (推荐)
   API Key 认证
```

#### 方式一：ChatGPT 账户登录（推荐）

```bash
codex login
```

- 自动打开浏览器完成 OAuth
- 同步你的 ChatGPT Plus 订阅状态
- 使用与 ChatGPT 相同的账户

#### 方式二：API Key 认证

```bash
# 方式 A: 环境变量
export OPENAI_API_KEY="sk-..."

# 方式 B: 配置文件（见下文）
# 在 ~/.codex/config.toml 中设置 api_key
```

### 获取 API Key

1. 访问 [OpenAI Platform](https://platform.openai.com/api-keys)
2. 登录你的账户（需有 Plus 或付费套餐）
3. 创建新的 API Key
4. 复制并安全保存

### 管理认证

```bash
# 查看当前认证状态
codex auth status

# 登出
codex logout

# 重新登录
codex login
```

### 多账户管理

```bash
# 切换账户
codex auth switch

# 列出所有已保存的账户
codex auth list
```

---

## 核心命令详解

### 启动交互式会话

```bash
# 基本启动（在当前目录）
codex

# 在指定项目目录启动
codex /path/to/project

# 使用特定模型
codex --model gpt-5-codex
codex --model gpt-4o

# 带初始提示
codex "帮我审查这个项目的安全问题"

# 非交互模式（单次请求）
codex --no-interactive "生成测试用例"
```

### 常用子命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `codex` | 启动交互式会话 | `codex` |
| `codex doctor` | 运行系统诊断 | `codex doctor` |
| `codex login/logout` | 认证管理 | `codex login` |
| `codex mcp` | MCP 服务器管理 | `codex mcp list` |
| `codex init` | 初始化项目配置 | `codex init` |
| `codex --version` | 查看版本 | `codex --version` |

### CLI 选项详解

#### 模型选项

```bash
# 指定模型（优先级：CLI > 配置文件 > 默认）
codex --model gpt-5-codex "高级任务"
codex --model gpt-4o "常规任务"

# 推理努力程度（影响思考深度）
codex --model-reasoning-effort high "复杂架构设计"
codex --model-reasoning-effort medium "平衡模式"
codex --model-reasoning-effort low "快速响应"
```

**选择指南**：
- `high`：复杂问题、架构设计、深度代码审查（耗时较长）
- `medium`：日常开发、功能实现（平衡速度与质量）
- `low`：简单查询、快速修复（最快响应）

#### 输出选项

```bash
# 静默模式（减少输出）
codex --quiet "快速任务"

# JSON 输出（用于脚本解析）
codex --output-json "分析项目依赖"

# 输出到文件
codex --output analysis.md "生成项目分析报告"

# 指定输出格式
codex --output-format markdown "生成文档"
codex --output-format diff "只显示代码差异"
```

#### 执行选项

```bash
# 完全自动模式（CI/CD 用）
codex --full-auto "运行测试并提交"

# 跳过确认（危险！）
codex --dangerously-bypass-approvals-and-sandbox "紧急修复"

# 指定工作目录
codex --working-dir /path/to/project "构建项目"

# 配置覆盖（临时）
codex -c approval_policy="never" "自动化任务"
codex -c sandbox_mode="workspace-write" "修改文件"
```

#### 搜索选项

```bash
# 启用搜索增强（联网搜索）
codex --search true "查找最新的 React 最佳实践"

# 禁用搜索（离线模式）
codex --search false "分析本地代码"
```

---

## 斜杠命令 (Slash Commands)

在交互式会话中，输入 `/` 打开命令菜单。

### 内置斜杠命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/ask` | 直接提问（不修改文件） | `/ask 解释这段代码的逻辑` |
| `/edit` | 请求编辑文件 | `/edit 优化这个函数` |
| `/diff` | 显示建议的更改 | `/diff 重命名变量` |
| `/clear` | 清除对话历史 | `/clear` |
| `/quit` / `/exit` | 退出会话 | `/quit` |
| `/model` | 切换模型 | `/model gpt-5-codex` |
| `/undo` | 撤销上一个操作 | `/undo` |
| `/redo` | 重做操作 | `/redo` |
| `/retry` | 重试上一次请求 | `/retry` |
| `/help` | 显示帮助 | `/help` |
| `/init` | 初始化项目配置 | `/init` |
| `/search` | 启用/禁用搜索 | `/search on` |
| `/compact` | 压缩上下文（节省 token） | `/compact` |
| `/logout` | 登出账户 | `/logout` |

### 引用语法

```bash
# 引用文件
> 修改 @src/components/Button.tsx 的样式

# 引用特定函数
> 为 @calculateTotal() 添加错误处理

# 引用多文件
> 对比 @utils.js 和 @helpers.js 的实现差异
```

---

## 键盘快捷键

### 导航

| 快捷键 | 功能 |
|--------|------|
| `↑ / ↓` | 浏览命令历史 |
| `Ctrl + L` | 清屏（保留上下文） |
| `Ctrl + G` | 跳转到行首 |
| `Ctrl + E` | 跳转到行尾 |
| `Escape` | 取消当前输入 |

### 编辑

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + A` | 全选 |
| `Ctrl + Z` | 撤销 |
| `Ctrl + Shift + Z` | 重做 |
| `Tab` | 自动补全 |
| `Ctrl + K` | 删除到行尾 |

### 会话控制

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + C` | 停止当前操作 |
| `Ctrl + D` | 退出会话 |
| `Enter` | 发送消息 |

### 特殊模式

| 快捷键 | 功能 |
|--------|------|
| `/` | 打开斜杠命令菜单 |
| `@` | 引用文件或符号 |
| `#` | 添加搜索上下文 |
| `>` | 进入命令模式 |

---

## 交互式会话操作

### 基本会话流程

```bash
# 1. 启动（Codex 自动分析项目结构）
$ codex
✓ Analyzed 156 files
✓ Found 3 package.json files
✓ Detected TypeScript + React stack

# 2. 输入请求
> 解释 main.py 的功能

# 3. Codex 响应并可能执行操作
# 4. 继续对话或使用斜杠命令
> /quit  # 退出
```

### 上下文引用

在对话中引用项目文件或符号：

```bash
> 修复 @utils.py 中的 parse_config 函数的 bug
> 优化 @models/User.ts 中 getUserById 的性能
> 为 @calculate_total 添加单元测试
```

### 多轮对话示例

```bash
> 创建一个 REST API 来管理用户
# Codex: 创建了 User 模型、路由、控制器...

> 添加分页支持
# Codex: 修改了查询逻辑，添加 limit/offset 参数

> 实现缓存层
# Codex: 添加了 Redis 缓存逻辑

> 编写 API 文档
# Codex: 生成 OpenAPI 规范文档
```

---

## 配置文件详解

### 配置文件位置

- **主配置**：`~/.codex/config.toml`（全局默认）
- **项目配置**：`./.codex/config.toml`（项目特定，优先级更高）
- **环境变量**：`~/.codex/.env`（敏感信息）

### 主配置文件示例

```toml
# ~/.codex/config.toml

# ============================================
# 基础配置
# ============================================
model = "gpt-5-codex"
search = true
model_reasoning_effort = "medium"

# ============================================
# 安全与沙箱配置
# ============================================
approval_policy = "untrusted"      # 审批策略
sandbox_mode = "read-only"          # 沙箱模式
allow_login_shell = false

[sandbox_workspace_write]
network_access = true

# ============================================
# Shell 环境变量策略
# ============================================
allowed_environment_variables = [
    "PATH", "HOME", "USER", "NODE_ENV"
]

# ============================================
# MCP 服务器配置
# ============================================
[[mcp_servers]]
name = "filesystem"
type = "stdio"
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "./"]

[[mcp_servers]]
name = "github"
type = "stdio"
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]
```

### 审批策略

| 策略 | 说明 | 适用场景 |
|------|------|----------|
| `untrusted` | 始终请求审批（默认） | 生产环境、新项目 |
| `permissive` | 敏感操作才请求 | 信任的开发环境 |
| `never` | 从不请求（危险！） | CI/CD、完全自动化 |

### 沙箱模式

| 模式 | 权限 | 风险 |
|------|------|------|
| `read-only` | 只读文件系统 | 最低 |
| `workspace-write` | 可写当前项目目录 | 中等 |
| `danger-full-access` | 完全系统访问 | 高（谨慎使用） |

### 配置分段（Profiles）

```toml
[profiles.work]
model = "gpt-5-codex"
approval_policy = "never"
sandbox_mode = "workspace-write"

[profiles.ci]
model = "gpt-5-codex"
approval_policy = "never"
sandbox_mode = "read-only"

[profiles.experimental]
model = "gpt-5-codex"
approval_policy = "permissive"
sandbox_mode = "danger-full-access"
```

使用：
```bash
codex --profile ci "运行 CI 检查"
```

### 配置覆盖

```bash
# 单次命令覆盖
codex -c approval_policy="never" "任务描述"
codex -c sandbox_mode="workspace-write" "修改文件"

# 环境变量覆盖
export CODEX_MODEL=gpt-5-codex
export CODEX_APPROVAL_POLICY=never
```

---

## 安全与沙箱机制

### 安全架构

```
用户交互层
    ↓ (审批确认、权限控制)
操作系统沙箱 (Seatbelt/Bubblewrap)
    ↓ (文件系统隔离)
文件系统层 (工作目录限制)
    ↓ (可选网络访问)
网络层
```

### 审批流程

```bash
# 默认 untrusted 模式下，Codex 会请求批准：
? Allow codex to execute "npm install"? (Y/n)
? Allow codex to write file "src/new-feature.ts"? (Y/n)
? Allow codex to run "git push"? (Y/n)
```

### 安全最佳实践

**日常开发**（推荐）：
```toml
approval_policy = "untrusted"
sandbox_mode = "read-only"
allow_login_shell = false
```

**需要修改文件时**：
```bash
# 临时授权
codex -c sandbox_mode="workspace-write" -c approval_policy="permissive"
```

**CI/CD 环境**：
```bash
codex --full-auto --no-input "CI 任务"
```

### 危险操作警告

⚠️ **绝对不要在以下场景使用 `danger-full-access`**：
- 处理 untrusted 代码
- 运行未知脚本
- 生产服务器环境
- 没有 Git 版本控制的目录

---

## MCP 服务器集成

### 什么是 MCP

MCP (Model Context Protocol) 允许 Codex 与外部工具和服务集成，扩展其能力边界。

### 添加 MCP 服务器

#### CLI 方式

```bash
# 列出已添加的服务器
codex mcp list

# 添加文件系统服务器
codex mcp add filesystem -y @modelcontextprotocol/server-filesystem ./

# 添加 GitHub 服务器
codex mcp add github -y @modelcontextprotocol/server-github

# 移除
codex mcp remove filesystem
```

#### 配置文件方式

```toml
[[mcp_servers]]
name = "filesystem"
type = "stdio"
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "./"]

[[mcp_servers]]
name = "github"
type = "stdio"
command = "npx"
args = ["-y", "@modelcontextprotocol/server-github"]
```

### 常用 MCP 服务器

| 服务器 | 功能 | 安装命令 |
|--------|------|----------|
| `filesystem` | 文件系统操作 | `npx -y @modelcontextprotocol/server-filesystem ./` |
| `github` | GitHub API 操作 | `npx -y @modelcontextprotocol/server-github` |
| `slack` | Slack 消息发送 | `npx -y @modelcontextprotocol/server-slack` |
| `sequential-thinking` | 推理增强 | `npx -y @modelcontextprotocol/server-sequential-thinking` |

### MCP 使用示例

```bash
# 添加 GitHub 服务器后，Codex 可以：
> 列出我最近 5 个 PR
> 创建 issue 并分配给 @ teammate
> 查看 PR #123 的评论
```

---

## AGENTS.md 自定义指令

### 什么是 AGENTS.md

`AGENTS.md` 是项目根目录的配置文件，用于定义 Codex 的项目级行为规范。

### 创建 AGENTS.md

```markdown
# AGENTS.md - 项目自定义指令

## 项目概述
这是一个使用 React + TypeScript 构建的电商前端项目。

## 技术栈
- React 18
- TypeScript 5
- Tailwind CSS
- Zustand 状态管理

## 代码规范
- 使用 TypeScript 严格模式
- 组件采用函数式组件 + Hooks
- 样式使用 Tailwind CSS
- 禁止使用 any 类型

## 项目结构
src/
├── components/   # 可复用组件
├── pages/        # 页面组件
├── hooks/        # 自定义 Hooks
├── utils/        # 工具函数
└── types/        # TypeScript 类型定义

## Git 工作流
- 主分支：main
- 开发分支：develop
- 功能分支：feature/xxx
- 提交信息：遵循 Conventional Commits
```

### AGENTS.md 支持的特殊指令

```markdown
# 模型配置
@model gpt-5-codex
@reasoning high

# 命令别名
@command test = "npm test -- --coverage"
@command build = "npm run build"

# 安全规则
@allow-write-only src/
@deny-command rm

# 自动执行
@auto-approve test  # 测试命令自动批准
```

### 作用范围

- **项目级**：`./AGENTS.md` 只对当前项目生效
- **全局级**：`~/.codex/AGENTS.md` 对所有项目生效
- **优先级**：项目级 > 全局级

---

## 非交互模式

适合自动化、脚本集成。

### 单次请求

```bash
# 生成代码
codex "用 TypeScript 写一个快速排序算法"

# 分析代码
codex --output-json "分析这个项目的依赖关系"

# 执行命令
codex --full-auto "运行测试并生成覆盖率报告"
```

### 输出处理

```bash
# JSON 输出（便于脚本解析）
codex --output-json "列出所有未跟踪的文件" | jq '.files'

# 输出到文件
codex --output suggestions.md "审查代码并提出改进建议"

# 仅显示差异
codex --output-format diff "重构这个函数"
```

### 在脚本中使用

```bash
#!/bin/bash
# deploy.sh

# 使用 Codex 生成部署清单
codex --full-auto "检查生产环境配置并部署" > deploy.log

# 检查执行结果
if [ $? -eq 0 ]; then
  echo "✅ 部署成功"
else
  echo "❌ 部署失败，查看日志"
  exit 1
fi
```

---

## 环境变量

### Codex 专用变量

```bash
# API 认证
export OPENAI_API_KEY="sk-..."

# 默认模型
export CODEX_MODEL=gpt-5-codex

# 审批策略
export CODEX_APPROVAL_POLICY=never

# 沙箱模式
export CODEX_SANDBOX_MODE=workspace-write

# 是否启用搜索
export CODEX_SEARCH=true
```

### 传递给子进程的变量

```toml
# 在 config.toml 中配置
allowed_environment_variables = [
    "PATH",
    "HOME",
    "NODE_ENV",
    "DATABASE_URL",  # 允许传递给子进程
    "API_KEY"
]
```

### 敏感信息管理

```bash
# 使用 .env 文件（推荐）
echo "DATABASE_URL=postgresql://..." > ~/.codex/.env

# Codex 自动加载，但不会在日志中显示
```

---

## GitHub Action 集成

### 基础配置

```yaml
# .github/workflows/codex-review.yml
name: Codex Code Review

on:
  pull_request:
    branches: [main]

jobs:
  codex-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Codex Review
        run: |
          codex --full-auto "审查这个 PR 的代码质量"
```

### PR 自动生成

```yaml
name: Codex Auto-Fix

on:
  issue:
    types: [labeled]

jobs:
  auto-fix:
    if: contains(github.event.issue.labels.*.name, 'codex-fix')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: |
          codex --full-auto "修复 #${{ github.event.issue.number }}" \
            | git apply --allow-empty
          git config --global user.name "Codex Bot"
          git config --global user.email "codex@github.com"
          git push origin HEAD:fix-${{ github.event.issue.number }}
```

---

## 定价与访问权限

### 计费模式

```
ChatGPT Plus 订阅 ($20/月)
    ↓
包含模型访问权限
    ↓
Codex CLI 调用 → 按 API 用量计费
```

### API 价格参考（2026 年 4 月）

| 模型 | 输入 ($/1M tokens) | 输出 ($/1M tokens) |
|------|-------------------|-------------------|
| GPT-5 Codex | $15 | $60 |
| GPT-4o | $2.50 | $10 |
| GPT-4o mini | $0.15 | $0.60 |

**估算**：一个中等复杂度任务（1000 行代码生成）约 $0.05-$0.20

### 访问限制

- **需 Plus 订阅**：某些高级模型仅对 Plus 用户开放
- **使用配额**：API 有速率限制（可申请提升）
- **地区限制**：部分国家/地区不可用

---

## Cheatsheet 速查表

### 快速启动

```bash
codex                              # 启动交互式会话
codex .                           # 在当前目录启动
codex "任务描述"                   # 单次任务
codex --model gpt-5-codex         # 指定模型
codex --search true               # 启用搜索
```

### 认证管理

```bash
codex login                       # 登录
codex logout                      # 登出
codex auth status                 # 查看状态
codex doctor                      # 运行诊断
```

### 文件操作

```bash
# 引用文件
@filename
@path/to/file.ts

# 编辑文件（会话中）
/edit 修改这个文件

# 查看差异
/diff
```

### Git 操作

```bash
# Codex 自动执行
git add .
git commit -m "feat: add new feature"
git push
```

### 配置管理

```bash
# 编辑配置
codex init                        # 初始化项目配置
codex mcp add name server         # 添加 MCP 服务器

# 查看配置
cat ~/.codex/config.toml
```

### 安全模式

```bash
# 完全自动（CI/CD）
codex --full-auto

# 临时提升权限
codex -c sandbox_mode="workspace-write"

# 跳过审批（危险）
codex --dangerously-bypass-approvals-and-sandbox
```

---

## 常见工作流程示例

### 场景 1：修复 Bug

```bash
$ codex
> 我看到测试失败：test/user-auth.test.ts 第 42 行
> 请分析原因并修复

Codex:
1. 读取失败测试
2. 分析相关代码
3. 识别问题（密码加密逻辑错误）
4. 提出修复方案（请求批准）
5. 应用修复
6. 重新运行测试 ✅
```

### 场景 2：添加新功能

```bash
$ codex
> 添加用户头像上传功能
> 要求：支持 PNG/JPG，最大 5MB，存储到 S3

Codex:
1. 创建 UploadAvatar 组件
2. 添加类型定义
3. 集成 S3 上传逻辑
4. 添加验证
5. 编写测试
6. 更新文档
```

### 场景 3：代码重构

```bash
$ codex
> 重构 utils/date.js，将其转换为 TypeScript
> 同时添加 JSDoc 注释

Codex:
1. 分析现有代码逻辑
2. 转换为 .ts 文件
3. 添加类型注解
4. 保留原有功能不变
5. 更新导入引用
```

### 场景 4：自动化 CI 任务

```bash
# 在 CI 脚本中
codex --full-auto "运行所有测试，确保零失败"
codex --full-auto "更新依赖到最新安全版本"
codex --full-auto "生成 CHANGELOG"
```

---

## 故障排除

### 常见问题

#### 1. 认证失败

```bash
# 症状：error: authentication required
codex auth status    # 检查状态
codex logout         # 登出后重新登录
codex login
```

#### 2. 沙箱不可用

```bash
# 症状：sandbox not available
codex doctor --check-sandbox

# Linux 需要安装 bubblewrap
sudo apt install bubblewrap

# macOS 需要启用 Seatbelt（默认启用）
```

#### 3. 模型访问被拒绝

```bash
# 症状：model not accessible
# 原因：账户无权限或 API 额度不足
# 解决：
1. 确认有 ChatGPT Plus 订阅
2. 检查 API 额度：platform.openai.com/usage
3. 升级套餐或等待额度重置
```

#### 4. 命令执行被阻止

```bash
# 症状：command blocked by policy
# 原因：approval_policy 或 sandbox 限制

# 解决方案：
codex -c approval_policy="permissive" "任务"
# 或修改配置文件
```

### 调试命令

```bash
# 详细日志
codex --verbose "任务"

# 查看配置
codex config list

# 重置配置
codex config reset

# 清除缓存
rm -rf ~/.codex/cache
```

### 获取帮助

```bash
codex --help
codex --help <subcommand>  # 子命令帮助
# 官方文档：https://developers.openai.com/codex
```

---

## 总结

Codex CLI 是**专业开发者的 AI 编程助手**，它将 ChatGPT 的智能与命令行的效率结合在一起。掌握它，你相当于拥有一个**7x24 小时待命的编程伙伴**，能帮你：
- 自动化重复性编码任务
- 快速原型设计
- 深度代码审查
- 持续集成与部署

**下一步**：阅读 [AGENTS.md 自定义指令](#agentsmd-自定义指令) 章节，为你的项目定制 Codex 行为。

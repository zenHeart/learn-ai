# Codex 集成指南

> 将 Codex 深度集成到你的开发工作流中：项目配置、MCP 扩展、GitHub Actions 自动化、与 ChatGPT Plus 协同工作。

---

## 📁 项目配置：让 Codex 理解你的代码库

### AGENTS.md：项目的"说明书"

在项目根目录创建 `AGENTS.md`，告诉 Codex 项目的所有关键信息。

#### 完整示例

```markdown
# AGENTS.md - 项目自定义指令

## 项目概览
名称: MyAwesomeApp
描述: 基于 Next.js 的电商平台
状态: 生产环境

## 技术栈
- 前端: Next.js 14, React 18, TypeScript 5
- 样式: Tailwind CSS 3.4
- 状态: Zustand
- 测试: Vitest + Playwright
- 部署: Vercel

## 代码规范（必须遵守）

### 命名约定
- 组件: PascalCase (ProductCard)
- 函数: camelCase (getUserCart)
- 文件: kebab-case (product-card.tsx)

### TypeScript 规则
- strict: true
- 禁止 any（除非 @any-ok）
- 所有导出必须有 JSDoc

### Git 提交
feat(module): short description
- feat: 新功能
- fix:  bug 修复
- docs: 文档更新
- style: 代码格式
- refactor: 重构
- test: 测试相关
- chore: 构建/工具变动

## 目录结构
src/
├── app/          # Next.js App Router
├── components/   # React 组件
│   ├── ui/      # 基础 UI 组件
│   └── features/ # 业务组件
├── lib/          # 工具函数
├── stores/       # Zustand stores
├── types/        # TS 类型
└── tests/        # 测试文件

## Codex 特殊指令

@model gpt-5-codex
@reasoning high

@allow-write-only src/ tests/  # 只允许修改这两个目录
@deny-command rm -rf           # 禁止递归删除
@deny-command git push -f      # 禁止强制推送

@auto-approve test             # 测试命令自动批准
@auto-approve lint

## 环境变量
必须在 .env.local 中配置：
- DATABASE_URL
- STRIPE_SECRET_KEY
- NEXTAUTH_SECRET

## 脚本别名
@command test = "npm test -- --coverage"
@command build = "npm run build && npm run export"
@command lint = "eslint . --ext .ts,.tsx"
```

### AGENTS.md 的特殊语法

**模型选择**：
```markdown
@model gpt-5-codex          # 使用最强模型
@model gpt-4o              # 平衡速度与质量
```

**推理模式**：
```markdown
@reasoning high    # 复杂任务深度思考
@reasoning medium  # 平衡模式
@reasoning low     # 快速响应
```

**权限控制**：
```markdown
@allow-write-only src/              # 只允许写入 src/
@allow-read-only src/ config/       # 只允许读取
@deny-command rm                    # 禁止删除
@deny-command git push             # 禁止 Git 推送
```

**自动批准**：
```markdown
@auto-approve test                 # 测试命令自动执行
@auto-approve lint format          # 多个命令
```

**命令别名**：
```markdown
@command test = "npm test -- --coverage --watch"
@command deploy = "vercel --prod"
```

---

## 🔌 MCP 服务器配置

### 什么是 MCP

MCP (Model Context Protocol) 允许 Codex 连接外部服务，扩展能力边界。

### 常用 MCP 服务器

#### 1. Filesystem（文件系统）

```bash
codex mcp add filesystem -y @modelcontextprotocol/server-filesystem ./
```

**能力**：
- 读取任意文件
- 列出目录结构
- 搜索文件内容

**使用示例**：
```
用户: "列出 src/components 下的所有组件"
Codex: (通过 filesystem MCP) 读取目录 → 返回列表
```

#### 2. GitHub（GitHub API）

```bash
codex mcp add github -y @modelcontextprotocol/server-github
```

**能力**：
- 读取 issues/PRs
- 创建/评论 PR
- 查看 CI 状态

**使用示例**：
```
用户: "查看 PR #123 的评论"
Codex: (调用 GitHub API) 返回评论列表
```

#### 3. Sequential Thinking（推理增强）

```bash
codex mcp add sequential-thinking -y @modelcontextprotocol/server-sequential-thinking
```

**能力**：
- 将复杂问题分解为多步
- 动态调整推理路径
- 自我纠错

#### 4. Slack（团队通讯）

```bash
codex mcp add slack -y @modelcontextprotocol/server-slack
```

**能力**：
- 发送消息到频道
- 读取通知
- 自动化团队沟通

### 配置文件方式（持久化）

```toml
# ~/.codex/config.toml

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
# 环境变量
env = { GITHUB_TOKEN = "${GITHUB_TOKEN}" }

[[mcp_servers]]
name = "my-custom-tool"
type = "http"
url = "http://localhost:8080"
auth_token = "secret-token"
```

### 自定义 MCP 服务器

```javascript
// custom-mcp-server.js
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { SSEMCPClient } = require('@modelcontextprotocol/sdk/client/index.js');

const server = new Server(
  {
    name: "my-tool",
    version: "0.1.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "deploy") {
    // 你的部署逻辑
    return {
      content: [{ type: "text", text: "部署成功！" }]
    };
  }
});

await server.connect();
```

---

## 🤖 GitHub Actions 集成

### 基础配置：代码审查

```yaml
# .github/workflows/codex-review.yml
name: Codex Review

on:
  pull_request:
    branches: [main]

jobs:
  codex-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # 获取完整历史

      - name: Setup Codex
        run: |
          curl -fsSL https://codex.openai.com/install.sh | sh

      - name: Run Codex Review
        run: |
          codex --full-auto "审查 PR #${{ github.event.pull_request.number }}
            重点检查：安全性、性能、代码规范"
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}

      - name: Post Review Comment
        if: always()
        run: |
          codex --output-json "生成审查摘要" > review.json
          # 使用 GitHub CLI 发布评论
          gh pr comment ${{ github.event.pull_request.number }} \
            --body "$(cat review.json)"
```

### 自动修复工作流

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

      - name: Run Codex Fix
        run: |
          # 让 Codex 读取 issue 并生成修复
          codex --full-auto "修复 issue #${{ github.event.issue.number }}" \
            | tee fix.patch

          # 应用补丁
          git apply --allow-empty fix.patch

      - name: Create Fix Branch
        run: |
          git config --global user.name "Codex Bot"
          git config --global user.email "codex@github.com"
          git checkout -b fix-${{ github.event.issue.number }}
          git add .
          git commit -m "fix: 自动修复 #${{ github.event.issue.number }}"
          git push origin fix-${{ github.event.issue.number }}

      - name: Open PR
        run: |
          gh pr create \
            --title "Fix: issue #${{ github.event.issue.number }}" \
            --body "由 Codex 自动生成" \
            --base main \
            --head fix-${{ github.event.issue.number }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 每日自动化检查

```yaml
name: Daily Codex Health Check

on:
  schedule:
    - cron: '0 9 * * 1-5'  # 工作日早上 9 点

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run Diagnostics
        run: |
          codex --full-auto "运行项目健康检查：
            - 检查依赖过期
            - 运行所有测试
            - 检查代码规范
            - 生成健康报告" > health-report.md

      - name: Upload Report
        uses: actions/upload-artifact@v3
        with:
          name: health-report
          path: health-report.md
```

---

## 🔄 与 ChatGPT Plus 的协同工作流

### 黄金组合：规划 + 执行

```
┌─────────────────────┐
│   ChatGPT Plus      │  ← 规划层
│  (聊天界面 + 研究)  │     1. 技术选型
│  - Deep Research    │     2. 架构设计
│  - 多模态分析       │     3. 方案对比
│  - 文档生成         │     4. 详细 spec
└──────────▲──────────┘     5. 质量审查
           │ 导出 spec 文件
           │ (Markdown/JSON)
┌──────────┴──────────┐
│   Codex CLI         │  ← 执行层
│  (终端 + 自动化)    │     1. 创建项目结构
│  - 读写文件         │     2. 生成代码
│  - 运行命令         │     3. 运行测试
│  - Git 操作         │     4. 提交 PR
└─────────────────────┘
```

### 实际工作流示例

**项目**：构建一个 AI 聊天应用

**第 1 步：ChatGPT Plus 规划**

```bash
# 在 chatgpt.com 中
用户: "帮我设计一个 AI 聊天应用的技术方案
  要求：
  - 前端: Next.js + TypeScript
  - 后端: Node.js + Express
  - AI 模型: 支持 GPT-4 和 Claude
  - 功能: 多轮对话、流式输出、历史记录

  输出：架构图、技术选型理由、文件结构、API 设计"
```

ChatGPT Plus 输出：
```
1. 架构图 (Mermaid)
2. 技术选型对比表
3. 目录结构树
4. API 接口规范
5. 部署方案
```

**第 2 步：Codex CLI 实现**

```bash
$ codex "根据刚才的设计文档创建项目：
  1. 初始化 Next.js 项目
  2. 创建后端 Express 服务
  3. 集成 OpenAI 和 Anthropic API
  4. 实现流式响应
  5. 添加历史记录存储（PostgreSQL）
  6. 编写基础测试"
```

Codex 自动：
- 创建项目结构
- 安装依赖
- 生成所有代码文件
- 配置环境变量
- 运行初始化测试

**第 3 步：ChatGPT Plus 审查**

```bash
# 上传 PR diff 到 ChatGPT Plus
用户: "审查这个 PR：添加了 AI 聊天功能
  检查：
  1. 安全性（API key 管理）
  2. 性能（流式处理）
  3. 可扩展性
  4. 错误处理"
```

**第 4 步：Codex CLI 优化**

```bash
$ codex "根据审查意见优化：
  1. 添加请求限流
  2. 实现连接池
  3. 添加监控指标
  4. 更新文档"
```

### 一键工作流脚本

```bash
#!/bin/bash
# ai-project.sh - 使用 ChatGPT Plus + Codex CLI 快速启动项目

set -e

PROJECT_NAME=$1

echo "🚀 Step 1: ChatGPT Plus 规划"
echo "请在 chatgpt.com 中输入以下提示："
echo "---
创建一个 $PROJECT_NAME 项目的详细技术方案，
包括：架构图、技术选型、目录结构、API 设计。
输出为 Markdown 格式，保存为 docs/plan.md。
---"
read -p "完成后按 Enter 继续..."

echo "🧠 Step 2: Codex CLI 实现"
codex --full-auto "根据 docs/plan.md 创建完整项目，包括：
  - 项目初始化
  - 核心功能实现
  - 基础测试
  - README 文档"

echo "🔍 Step 3: ChatGPT Plus 审查"
echo "请在 chatgpt.com 中上传 PR，进行代码审查"

echo "✨ 项目创建完成！"
```

---

## 🔐 与 Claude Code/Cursor 的对比

### 定位差异

| 特性 | Codex CLI | Claude Code | Cursor |
|------|-----------|-------------|--------|
| **平台** | 命令行（跨平台） | VS Code 插件 / CLI | 独立编辑器 |
| **工作方式** | 自主代理 | IDE 内嵌代理 | IDE 内嵌代理 |
| **文件访问** | 直接读写（沙箱） | IDE API 读写 | IDE API 读写 |
| **权限模型** | 沙箱 + 审批 | IDE 权限 | IDE 权限 |
| **自动化程度** | 高（可 --full-auto） | 中（需手动确认） | 中（需手动确认） |
| **扩展性** | MCP 协议 | 有限插件 | 有限插件 |

### 功能对比矩阵

| 功能 | Codex CLI | Claude Code | Cursor |
|------|-----------|-------------|--------|
| 理解整个项目 | ✅ 自动扫描 | ✅ 但依赖 IDE 索引 | ✅ 但依赖索引 |
| 修改任意文件 | ✅ | ✅ | ✅ |
| 运行命令 | ✅ 直接执行 | ✅ 通过终端 | ✅ 通过终端 |
| Git 操作 | ✅ 自动提交 | ✅ 建议但手动 | ✅ 建议但手动 |
| 完全自动化 | ✅ `--full-auto` | ❌ 需要确认 | ❌ 需要确认 |
| 脱离 IDE | ✅ 纯终端 | ✅ (有 CLI) | ❌ 依赖编辑器 |
| MCP 扩展 | ✅ 开放协议 | ❌ 封闭 | ❌ 封闭 |
| 成本 | API 用量 | Claude 订阅 | Cursor 订阅 |

### 如何选择

**使用 Codex CLI 当**：
- 你习惯终端工作流
- 需要 CI/CD 集成
- 大型项目（1000+ 文件）
- 想要完全自动化

**使用 Claude Code 当**：
- 你主要用 VS Code
- 希望与 IDE 深度集成
- 需要实时 inline 建议
- 已订阅 Claude Pro

**使用 Cursor 当**：
- 你愿意换编辑器
- 想要"AI 优先"的体验
- 需要聊天式交互 + 代码编辑一体化

### 混合使用策略

```bash
# 日常开发：Codex CLI + 编辑器
codex "重构用户模块"   # 自动完成
vim src/              # 手动微调

# 快速查询：ChatGPT Plus
chatgpt "这个正则表达式什么意思？"

# 复杂架构：Claude Code（长上下文）
claude "分析整个 monorepo 的依赖关系图"
```

---

## 📦 实际项目集成案例

### 案例 1：Next.js 项目完整配置

```
my-nextjs-app/
├── AGENTS.md              # Codex 项目配置
├── .codex/
│   └── config.toml        # 项目级配置
├── package.json
├── next.config.js
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
└── tests/
```

**AGENTS.md**：
```markdown
@model gpt-5-codex
@reasoning high

@allow-write-only src/ tests/
@deny-command rm -rf node_modules/

@auto-approve npm test
@auto-approve npm run build

## 项目: Next.js E-commerce
## 技术: Next.js 14, TypeScript, Tailwind
```

**.codex/config.toml**：
```toml
model = "gpt-5-codex"
approval_policy = "untrusted"
sandbox_mode = "workspace-write"

[[mcp_servers]]
name = "vercel"
command = "npx"
args = ["-y", "@vercel/mcp-server"]
```

### 案例 2：Monorepo 配置

```markdown
# AGENTS.md (Monorepo 根目录)

## 项目: Monorepo (Turborepo)
packages:
  - apps/web (Next.js)
  - apps/api (Express)
  - packages/ui (React components)
  - packages/utils (shared utils)

## 跨包修改规则
@allow-write-only apps/ packages/
@deny-command "cd .."  # 禁止离开 monorepo

## 命令别名
@command build = "turbo run build"
@command test = "turbo run test"
```

### 案例 3：CI/CD 集成

```yaml
# .github/workflows/codex-automation.yml
name: Codex Automation

on:
  push:
    branches: [main]

jobs:
  auto-fix:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run Codex Auto-Fix
        run: |
          # 自动修复 lint 错误
          codex --full-auto "修复所有 ESLint 错误" | git apply

          # 自动更新依赖
          codex --full-auto "更新依赖到最新安全版本"

          # 自动生成 CHANGELOG
          codex --output CHANGELOG.md "生成更新日志"

      - name: Commit Changes
        run: |
          git config --global user.name "Codex Bot"
          git config --global user.email "codex@github.com"
          git add .
          git commit -m "chore: auto-fix lint and update dependencies"
          git push
```

---

## 🎯 最佳实践清单

### 项目初始化

- [ ] 在项目根目录创建 `AGENTS.md`
- [ ] 创建 `.codex/config.toml`（如需自定义配置）
- [ ] 添加项目级 MCP 服务器配置
- [ ] 定义清晰的权限策略（`@allow-write-only`、`@deny-command`）
- [ ] 设置命令别名（`@command test = "..."`）

### 日常使用

- [ ] 使用 `codex` 而非 `codex --full-auto`（除非 CI）
- [ ] 每次 Codex 建议操作前审查 `/diff`
- [ ] 定期查看 `codex sessions list` 了解活动
- [ ] 使用 `@filename` 引用文件（而非模糊描述）
- [ ] 对于复杂任务，先用 ChatGPT Plus 规划

### 团队协作

- [ ] 将 `AGENTS.md` 提交到版本控制
- [ ] 在 README 中注明项目使用 Codex
- [ ] 定期更新 `AGENTS.md`（随项目演进）
- [ ] 建立 Codex 操作审查机制（PR 审核）
- [ ] 记录 Codex 的决策（便于追溯）

### 安全

- [ ] 永远不在生产服务器上运行 `--full-auto`
- [ ] 敏感信息（API keys）使用环境变量，不硬编码
- [ ] 定期审查 `@deny-command` 列表
- [ ] 限制 `sandbox_mode` 权限（最小权限原则）
- [ ] 备份重要文件（Codex 修改前自动备份）

---

## 🐛 调试与故障排除

### 查看 Codex 在做什么

```bash
# 详细日志
codex --verbose "任务" 2>&1 | tee debug.log

# 查看配置文件
codex config list

# 查看 MCP 服务器状态
codex mcp list
codex mcp get github

# 查看会话历史
codex sessions list
codex sessions get <session-id>
```

### 常见问题

**Q: Codex 修改了不该改的文件**
```bash
# 立即撤销
git checkout -- <file>

# 更新 AGENTS.md 限制权限
@deny-command <pattern>
```

**Q: MCP 服务器无法连接**
```bash
codex mcp remove <name>
codex mcp add <name> --reinstall
codex doctor  # 运行诊断
```

**Q: 模型访问被拒绝**
```bash
# 检查订阅状态
codex auth status

# 确认 API 额度
open https://platform.openai.com/usage

# 切换模型
codex --model gpt-4o "任务"
```

---

## 📚 延伸阅读

- [AGENTS.md 完整语法参考](https://github.com/openai/codex/blob/main/docs/agents.md)
- [MCP 协议官方文档](https://modelcontextprotocol.io)
- [Codex 安全白皮书](https://openai.com/codex-security)
- [Codex 在 GitHub Actions 中的最佳实践](https://github.com/openai/codex/discussions)

---

**下一步**：回到 [Codex CLI 手册](./codex-cli.md) 深入学习具体命令，或查看 [Cheatsheet](./cheatsheet.md) 快速查询。

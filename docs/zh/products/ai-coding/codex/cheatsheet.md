# Codex Cheatsheet - 速查表

> 常用命令、配置选项、快捷键的一页纸总结。适合打印贴在显示器旁或快速查询。

---

## 🚀 快速启动

```bash
# 启动交互式会话（当前目录）
codex

# 启动并指定任务
codex "添加用户登录功能"

# 使用特定模型
codex --model gpt-5-codex

# 启用搜索（联网）
codex --search true "最新 React 最佳实践"
```

---

## 🔑 认证管理

```bash
codex login                      # 登录（OAuth）
codex logout                     # 登出
codex auth status                # 查看当前状态
codex doctor                     # 运行诊断
```

---

## 🎯 核心命令

| 命令 | 说明 |
|------|------|
| `codex` | 启动交互式会话 |
| `codex "prompt"` | 单次任务（非交互） |
| `codex --model <model>` | 指定模型 |
| `codex --search true/false` | 启用/禁用搜索 |
| `codex --output <file>` | 输出到文件 |
| `codex --output-json` | JSON 输出（脚本友好） |
| `codex --full-auto` | 完全自动（CI/CD） |
| `codex --quiet` | 静默模式 |
| `codex --verbose` | 详细日志 |
| `codex --working-dir <path>` | 指定工作目录 |
| `codex -c <key>=<value>` | 临时覆盖配置 |

---

## 🛠️ 斜杠命令（交互模式）

| 命令 | 说明 |
|------|------|
| `/ask` | 直接提问（不修改文件） |
| `/edit` | 请求编辑文件 |
| `/diff` | 显示代码差异 |
| `/clear` | 清除对话历史 |
| `/quit` / `/exit` | 退出会话 |
| `/model` | 切换模型 |
| `/undo` | 撤销上一步 |
| `/redo` | 重做 |
| `/retry` | 重试 |
| `/help` | 显示帮助 |
| `/search on/off` | 开关搜索 |
| `/compact` | 压缩上下文 |

---

## ⌨️ 键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| `↑ / ↓` | 浏览历史 |
| `Ctrl + L` | 清屏 |
| `Ctrl + C` | 停止操作 |
| `Ctrl + D` | 退出 |
| `Tab` | 自动补全 |
| `/` | 打开斜杠菜单 |
| `@` | 引用文件 |
| `Enter` | 发送 |

---

## 📁 文件引用语法

```bash
# 引用文件
@src/components/Button.tsx

# 引用特定行
@src/app.tsx:10-20

# 引用函数
@calculateTotal

# 引用多个文件
@utils.ts @types.ts
```

---

## ⚙️ 配置文件

### 位置
- 全局：`~/.codex/config.toml`
- 项目：`./.codex/config.toml`（优先级更高）
- 环境变量：`~/.codex/.env`

### 常用配置

```toml
# 基础
model = "gpt-5-codex"
search = true
model_reasoning_effort = "medium"

# 安全
approval_policy = "untrusted"      # never/permissive/untrusted
sandbox_mode = "read-only"         # read-only/workspace-write/danger-full-access
allow_login_shell = false

# MCP 服务器
[[mcp_servers]]
name = "filesystem"
type = "stdio"
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "./"]
```

### 配置分段

```toml
[profiles.work]
model = "gpt-5-codex"
approval_policy = "never"

# 使用
codex --profile work "任务"
```

---

## 🔐 权限策略速查

### 审批策略

| 值 | 行为 | 适用 |
|----|------|------|
| `untrusted` | 每次操作都询问 | 默认，最安全 |
| `permissive` | 敏感操作才问 | 信任的开发环境 |
| `never` | 从不询问 | CI/CD（危险！） |

### 沙箱模式

| 值 | 权限 | 风险 |
|----|------|------|
| `read-only` | 只读文件 | 🟢 安全 |
| `workspace-write` | 可写当前目录 | 🟡 中等 |
| `danger-full-access` | 完全系统访问 | 🔴 危险 |

---

## 🌐 MCP 服务器

### 添加服务器

```bash
# 文件系统
codex mcp add filesystem -y @modelcontextprotocol/server-filesystem ./

# GitHub
codex mcp add github -y @modelcontextprotocol/server-github

# 列出所有
codex mcp list

# 移除
codex mcp remove <name>
```

### 常用服务器

| 名称 | 功能 | 安装命令 |
|------|------|----------|
| `filesystem` | 文件操作 | `npx -y @modelcontextprotocol/server-filesystem ./` |
| `github` | GitHub API | `npx -y @modelcontextprotocol/server-github` |
| `sequential-thinking` | 推理增强 | `npx -y @modelcontextprotocol/server-sequential-thinking` |

---

## 📝 AGENTS.md 快速参考

```markdown
# 项目配置

@model gpt-5-codex              # 使用模型
@reasoning high                 # 推理强度

# 权限控制
@allow-write-only src/          # 只允许写 src/
@deny-command rm                # 禁止 rm 命令

# 自动批准
@auto-approve test              # 测试自动执行

# 命令别名
@command test = "npm test"
@command build = "npm run build"
```

---

## 💰 定价与模型

### 模型价格（每 1M tokens）

| 模型 | 输入 | 输出 | 适用场景 |
|------|------|------|----------|
| GPT-5 Codex | $15 | $60 | 复杂任务、架构设计 |
| GPT-4o | $2.50 | $10 | 日常开发、平衡 |
| GPT-4o mini | $0.15 | $0.60 | 简单任务、快速 |

### 估算成本

- **简单任务**（1000 tokens）：$0.002 - $0.01
- **中等任务**（10K tokens）：$0.02 - $0.10
- **复杂任务**（50K tokens）：$0.10 - $0.50

---

## 🔄 常见工作流

### 1. 修复 Bug

```bash
codex "修复测试失败：test/auth.test.ts 第 15 行"
# → 自动分析、修复、重新运行测试
```

### 2. 添加功能

```bash
codex "添加用户头像上传功能，支持 PNG/JPG，最大 5MB"
# → 创建组件、逻辑、测试、文档
```

### 3. 代码审查

```bash
codex --output-json "审查最近的 5 个 commit" | jq .
```

### 4. 重构

```bash
codex -c sandbox_mode="workspace-write" "重构 utils/date.js 为 TypeScript"
```

### 5. CI 自动化

```bash
codex --full-auto "运行测试、lint、构建"
```

---

## 🚨 安全警告

### 高危操作（绝对禁止）

```bash
# ❌ 在生产服务器上运行
ssh prod "codex --full-auto '部署'"

# ❌ 处理 untrusted 代码
codex --dangerously-bypass-approvals-and-sandbox "运行未知脚本"

# ❌ 跳过所有审批
codex -c approval_policy=never -c sandbox_mode=danger-full-access
```

### 安全命令模板

```bash
# ✅ 安全的本地开发
codex -c sandbox_mode="workspace-write" "修改文件"

# ✅ CI 环境（完全自动化，但可控）
codex --full-auto --working-dir /safe/path "运行测试"

# ✅ 需要网络访问
codex -c sandbox_mode="workspace-write" --search true "下载依赖"
```

---

## 🐛 调试命令

```bash
# 诊断
codex doctor

# 详细日志
codex --verbose "任务" 2>&1 | tee debug.log

# 查看配置
codex config list

# 查看会话历史
codex sessions list
codex sessions get <id>

# 重置配置
codex config reset

# 清除缓存
rm -rf ~/.codex/cache
```

---

## 📊 权限与访问

### 查看权限

```bash
codex auth status
# 输出：
# ✅ 已登录: user@example.com
# ✅ Plus 订阅: 有效
# ✅ API 额度: $5.23 剩余
```

### 切换模型

```bash
# 会话中
/model gpt-5-codex

# CLI
codex --model gpt-4o
```

---

## 🔄 Git 工作流集成

```bash
# 1. 创建分支
git checkout -b feature/new-payment

# 2. 使用 Codex 开发
codex "添加 Stripe 支付集成"

# 3. 运行测试
codex "运行所有测试"

# 4. 提交
codex "创建提交信息并推送"

# 5. Codex 自动创建 PR
# 输出: "✅ 已创建 PR: feat(payment): add Stripe integration"
```

---

## 📚 快速链接

- [完整文档](./codex-cli.md)
- [ChatGPT Plus 集成](./chatgpt-plus.md)
- [AGENTS.md 指南](./integration.md#agentsmd-项目的"说明书")
- [MCP 服务器列表](https://github.com/modelcontextprotocol/servers)
- [OpenAI 定价](https://openai.com/pricing)

---

## 💡 技巧提示

1. **使用 `@filename` 引用文件** → 提高准确度
2. **先规划再执行** → 用 ChatGPT Plus 出方案，Codex 实现
3. **设置 `@auto-approve test`** → 测试自动运行，加速迭代
4. **定期运行 `codex doctor`** → 检查配置健康度
5. **查看会话历史** → `codex sessions list` 了解 Codex 做了什么

---

**打印版**：保留此页在显示器旁，快速查询常用命令。

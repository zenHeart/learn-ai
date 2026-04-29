# ChatGPT Plus 与 Codex：AI 开发完整工作流

> **2026 年最新指南**：从"会用 ChatGPT"到"精通 AI 开发"的完整跃迁路径。掌握 OpenAI 最强大的两个工具——ChatGPT Plus（规划与研究）和 Codex CLI（执行与自动化）的协同工作流。

---

## 🎯 本指南适合谁？

| 角色 | 你将从中学到 | 预计时间 |
|------|-------------|---------|
| **前端工程师** | 用 AI 加速开发、自动生成代码、优化工作流 | 2 周 |
| **全栈开发者** | 结合 ChatGPT Plus 设计架构 + Codex 实现 | 3 天 |
| **技术负责人** | AI 驱动的代码审查、自动化 CI/CD、团队规范 | 1 周 |
| **AI 爱好者** | 深度理解 OpenAI 生态，从使用者变成专家 | 1 个月 |

---

## 🚀 为什么需要同时掌握 ChatGPT Plus 和 Codex？

### 常见误区

❌ **"我会用 ChatGPT，就够了"**
- 问题：只能对话，不能操作文件、执行命令、自动化
- 结果：还是得手动写代码、手动测试、手动部署

❌ **"Codex CLI 好高级，我只用那个"**
- 问题：缺少规划阶段，容易方向错误
- 结果：代码质量高，但可能解决错误的问题

✅ **正确姿势：ChatGPT Plus 规划 + Codex CLI 执行**

```
┌──────────────────┐
│   ChatGPT Plus   │  ← 大脑
│   - 技术调研     │      思考、规划、设计
│   - 架构决策     │
│   - 文档生成     │
│   - 代码审查     │
└────────▲─────────┘
         │ 输出: spec.md / plan.md
         │
┌────────┴─────────┐
│    Codex CLI     │  ← 双手
│   - 创建项目     │      执行、实现、验证
│   - 生成代码     │
│   - 运行测试     │
│   - 自动部署     │
└──────────────────┘
```

---

## 📚 本指南结构

### 第一部分：ChatGPT Plus 会员功能（新手必读）

**目标**：充分了解你的 $20/月买了什么

1. **会员特权全景**
   - 模型访问（GPT-5、高级推理）
   - 功能解锁（语音、图像、文件上传、Deep Research）
   - 优先级与速度优势

2. **开发者专属用法**
   - 上传整个项目进行代码审查
   - 使用 Deep Research 做技术选型
   - 创建自定义 GPT（代码审查 GPT、文档生成 GPT）
   - 结合文件分析生成架构图

3. **最大化订阅价值**
   - 批量文件分析技巧
   - 长上下文处理大型项目
   - 语音模式加速思考
   - 自定义 GPT 提高团队效率

👉 **开始阅读**：[ChatGPT Plus 会员功能详解](./chatgpt-plus.md)

---

### 第二部分：Codex CLI 完整手册（核心技能）

**目标**：掌握 AI 编程代理的全部能力

1. **安装与配置**
   - 跨平台安装（macOS/Linux/Windows WSL2）
   - 认证方式（OAuth / API Key）
   - 首次运行诊断

2. **核心操作**
   - 交互式会话（对话式编程）
   - 文件引用与编辑（`@filename`）
   - 斜杠命令（`/edit`、`/diff`、`/undo`）
   - 键盘快捷键

3. **高级配置**
   - `~/.codex/config.toml` 完整配置
   - 安全沙箱（Seatbelt/Bubblewrap）
   - 审批策略（untrusted/permissive/never）
   - 环境变量管理

4. **扩展能力**
   - MCP 服务器集成（GitHub、Filesystem、自定义工具）
   - AGENTS.md 项目级配置
   - GitHub Actions 自动化集成

👉 **开始阅读**：[Codex CLI 完整手册](./codex-cli.md)

---

### 第三部分：Codex 作为 AI Agent（深度理解）

**目标**：从"用户"到"专家"的认知升级

1. **重新认识 Codex**
   - 不只是 CLI 工具，而是**自主代理**
   - 与 Copilot/Cursor 的本质区别
   - 心智模型：Codex 如何思考

2. **安全与权限**
   - 三层防护体系（用户审批、沙箱隔离、工作目录限制）
   - 权限矩阵对比（read-only / workspace-write / full-access）
   - 高危操作识别与规避

3. **能力边界**
   - Codex 擅长什么（代码生成、重构、测试）
   - Codex 不擅长什么（系统运维、UI 设计）
   - 人机协作最佳实践

4. **团队使用**
   - 共享 `AGENTS.md` 配置
   - CI/CD 集成策略
   - 代码审查自动化

👉 **开始阅读**：[Codex as Agent 深度解析](./codex-ai.md)

---

### 第四部分：集成与自动化（进阶实战）

**目标**：将 Codex 深度融入开发流程

1. **项目配置最佳实践**
   - `AGENTS.md` 完整示例（Next.js、Monorepo）
   - 权限控制策略（`@allow-write-only`、`@deny-command`）
   - 命令别名定义（`@command test`）

2. **MCP 服务器实战**
   - 文件系统服务器
   - GitHub API 集成
   - 自定义 MCP 服务器开发

3. **GitHub Actions 集成**
   - 自动代码审查工作流
   - PR 自动修复
   - 每日健康检查

4. **与 ChatGPT Plus 协同工作流**
   - 规划（ChatGPT Plus）→ 执行（Codex CLI）→ 审查（ChatGPT Plus）
   - 实际项目案例：从零构建 AI 聊天应用

👉 **开始阅读**：[集成指南](./integration.md)

---

## 🎓 学习路径推荐

### 路径 A：快速上手（3 天）

| 天数 | 目标 | 阅读内容 |
|------|------|----------|
| Day 1 | 理解价值 | [ChatGPT Plus 功能](./chatgpt-plus.md) |
| Day 2 | 掌握基础 | [Codex CLI 手册](./codex-cli.md) 第 1-6 章 |
| Day 3 | 第一个任务 | `codex "为项目添加 README"` |

---

### 路径 B：系统掌握（2 周）

| 周 | 主题 | 任务 |
|----|------|------|
| Week 1 | 基础技能 | 完成 Codex CLI 所有基础章节，每天一个实战任务 |
| Week 2 | 进阶集成 | 配置 AGENTS.md、添加 MCP 服务器、集成 GitHub Actions |

**每日练习任务**：
1. 使用 Codex 生成一个组件
2. 使用 Codex 重构一段旧代码
3. 使用 Codex 编写单元测试
4. 使用 Codex 生成文档

---

### 路径 C：团队专家（1 个月）

| 阶段 | 目标 | 产出 |
|------|------|------|
| Week 1 | 个人精通 | 能熟练使用所有功能 |
| Week 2 | 项目配置 | 为团队项目编写 `AGENTS.md` |
| Week 3 | 自动化流水线 | 搭建 GitHub Actions 集成 |
| Week 4 | 培训与推广 | 编写团队使用指南、举办分享会 |

---

## 📋 核心概念速查

### 必须理解的概念

| 概念 | 说明 | 为什么重要 |
|------|------|-----------|
| **沙箱 (Sandbox)** | 安全隔离的执行环境 | 防止 Codex 破坏系统 |
| **审批策略 (Approval Policy)** | 控制自动确认级别 | 平衡安全与效率 |
| **MCP** | 模型上下文协议，扩展工具集 | 连接 GitHub、Slack 等 |
| **AGENTS.md** | 项目级自定义指令 | 让 Codex 理解你的项目 |
| **ChatGPT Plus vs Codex** | 规划 vs 执行 | 两者结合效率最高 |

---

## 💡 实战场景清单

### 场景 1：新项目启动（10 分钟）

```bash
# 1. ChatGPT Plus 规划
"设计一个 Todo App，使用 Next.js + TypeScript + Tailwind"

# 2. Codex CLI 实现
codex "根据刚才的设计创建完整项目"

# 3. 完成！已有完整可运行应用
```

### 场景 2：代码审查（每日）

```bash
# 在 CI 中自动运行
codex --full-auto "审查本次提交的代码质量、安全性、性能"
```

### 场景 3：技术债务清理（每周）

```bash
codex "分析项目中的技术债务，按优先级列出并修复前 3 项"
```

### 场景 4：文档维护（每月）

```bash
codex "基于最新代码更新 README.md 和 API 文档"
```

---

## 🆚 工具对比决策树

```
需要 AI 帮助开发？
    ↓
  Yes
    ↓
  需要编辑文件/运行命令？
    ├─ Yes → 使用 Codex CLI
    │        （需要 Plus 订阅访问 GPT-5）
    ↓
  只需要对话/调研？
    ├─ Yes → 使用 ChatGPT Plus
    ↓
  需要深度 IDE 集成？
    ├─ Yes → 使用 Cursor 或 Claude Code
    ↓
  预算有限？
    ├─ Yes → 使用 Codex（按量计费，无月费）
    ↓
  已订阅 Claude Pro？
    ├─ Yes → 试用 Claude Code（VS Code 插件）
```

---

## 📖 快速链接

### 核心文档

- [ChatGPT Plus 会员功能](./chatgpt-plus.md) - 理解你的订阅权益
- [Codex CLI 完整手册](./codex-cli.md) - 从安装到精通
- [Codex as Agent 深度解析](./codex-ai.md) - 理解本质
- [集成指南](./integration.md) - 工作流自动化
- [Cheatsheet 速查表](./cheatsheet.md) - 一页纸总结

### 外部资源

- [OpenAI Codex 官方文档](https://developers.openai.com/codex)
- [ChatGPT Plus 官方说明](https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus)
- [MCP 协议规范](https://modelcontextprotocol.io)
- [Codex GitHub 仓库](https://github.com/openai/codex)

---

## 🎬 立即开始

### 第一步：检查环境

```bash
# 如果你还没有 Codex
brew install openai-codex/tap/codex   # macOS
# 或 npm install -g @openai/codex

# 运行诊断
codex doctor
```

### 第二步：第一个任务

```bash
# 进入任意项目目录
cd ~/code/github/learn-ai

# 让 Codex 帮你做件事
codex "更新 README.md，添加 Codex 章节"
```

### 第三步：深入学习

按照上面的**学习路径**，逐章阅读本指南的四个部分。

---

## 🤝 贡献与反馈

本指南是开源项目，欢迎：
- 提交 Issue（发现错误、提出建议）
- 提交 PR（补充内容、修复 typo）
- 分享你的使用经验

**项目地址**：https://github.com/zenHeart/learn-ai

---

## ⚠️ 重要声明

- **成本**：Codex CLI 使用按量计费，请注意 API 费用
- **安全**：永远不要在不可信的代码上使用 `--full-auto`
- **审查**：AI 生成的代码必须经过人工审查才能合并
- **隐私**：敏感代码避免上传到第三方 AI 服务

---

**Ready to level up your AI development skills?** 🚀

Let's start with [ChatGPT Plus 会员功能](./chatgpt-plus.md) → then move to [Codex CLI 手册](./codex-cli.md).

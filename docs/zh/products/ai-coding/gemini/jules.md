# Jules 异步 CI/CD 编码智能体

> Jules 是一个实验性的异步编码智能体，深度集成于 GitHub 环境中，专门用于修复漏洞、补充文档、升级依赖以及构建新功能。

## 核心定位

如果说 Antigravity 是本地架构设计的引擎，那么 Jules 就是代码仓库云端维护的基石。它**并非运行在开发者的本地机器上**，而是通过克隆代码库到云端虚拟机（Cloud VM）中自主执行开发与测试流程。

## 核心机制

- **驱动**：Gemini 3 Pro（基础计划可能使用 Gemini 2.5 Pro）
- **调用配额**：Google AI Pro 订阅提供高频调用配额，允许并发运行多个云端任务
- **工作流**：克隆分支 → 安装依赖（npm install）→ 分析代码逻辑 → 制定修改计划 → 提交 PR

## 任务触发方式

### 方式一：GitHub Issue 标签

在 GitHub Issue 中使用 `@jules` 标签或分配 `jules` 标签来触发任务：

```markdown
## Title: 升级 Next.js 至 v15 并迁移 App Router

## Labels: jules, enhancement

## Body:
请将本项目中 Next.js 依赖升级至 v15，并将 `/pages` 目录下的所有文件迁移至新的 App Router 结构，确保：
- 服务端组件与客户端组件的 `"use client"` 指令划分正确
- 所有 API Route 迁移至 `app/api/` 目录
- 保留原有的动态路由参数和行为
```

### 方式二：jules-tools CLI

```bash
# 安装
npm install -g @google/jules-tools

# 查看状态
jules status

# 启动远程任务
jules remote new "Upgrade React to v19"

# 查看任务列表
jules task list

# 应用生成的 PR
jules pr apply
```

## 自动化技术债务清理管线

利用 Bash 脚本与 `jules-tools` 构建自动化管线：

```bash
#!/bin/bash
# tech-debt-pipeline.sh

# 获取标记为"技术债务"的 Issue
gh issue list --label="tech-debt" --state=open --limit=10 | \
  while read issue; do
    id=$(echo "$issue" | awk '{print $1}')
    title=$(echo "$issue" | cut -d$'\t' -f2')
    
    # 解析标题并触发 Jules
    jules remote new "Fix: $title" --issue="$id"
  done
```

通过这种方式，可以在夜间或周末批量分发重构任务，让多个云端智能体并行工作。

## 最佳实践

### 发出高质量提示词

提示词的质量决定了 PR 的成败。必须在提示词中明确：
- 需要修改的目标文件范围
- 所需遵循的特定架构模式
- 具体的验收标准

### 避免合并冲突

Jules 在高频提交的活跃代码库中运行时，容易产生严重的合并冲突。

| 策略 | 适用场景 |
|------|---------|
| 限制在模块化程度高的功能票 | 跨模块全局变更 |
| 业务低峰期（周末）集中运行 | 大规模重构 |
| 本地 Antigravity 同步高强度监督 | 核心域变更 |

**推荐**：将 Jules 的使用范围限制在**模块化程度高、边界清晰的特定功能票**上。

## 与 Antigravity 的对比

| 维度 | Antigravity | Jules |
|------|------------|-------|
| 运行位置 | 本地 | 云端虚拟机 |
| 触发方式 | 实时对话 | GitHub Issue @jules |
| 适用场景 | 复杂多步重构 | 独立明确的任务 |
| 并发能力 | 单会话 | 多任务并行 |

## 官方资源

- [Jules 官方文档](https://jules.google/docs/)
- [jules-tools CLI](https://developers.googleblog.com/en/meet-jules-tools-a-command-line-companion-for-googles-async-coding-agent/)

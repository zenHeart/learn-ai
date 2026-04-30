# Release Orchestration Skill

Demo C · Skill 编排多个 MCP Server 完成发版工作流。

## 涉及的 MCP Server

| Server | 用途 | 是否必需 |
|---|---|---|
| **git MCP** | 拉 commit / 打 tag / 推送 | ✅ 必需 |
| **github MCP** | 推送到远程 / 创建 release | ✅ 必需 |
| **slack MCP** | 发送 #release 通知 | ⚠️ 可选（缺失时降级） |

## 安装

```bash
# 安装 Skill
cp -r . ~/.claude/skills/release-staging

# 安装依赖 MCP（如未配置）
claude mcp add github -- npx -y @modelcontextprotocol/server-github
claude mcp add slack  -- npx -y @modelcontextprotocol/server-slack

# 验证
claude mcp list
claude skill list | grep release-staging
```

## 演示

```
> /release-staging

[release-staging Skill 激活]

✅ Pre-flight: 工作区干净，分支 main，已同步
✅ Step 1: npm test ............ passed (3m 12s)
✅ Step 2: 覆盖率 87% ........... 通过阈值
✅ Step 3: changelog 已更新（10 commits）
✅ Step 4: 已打 tag v2.1.0
✅ Step 5: 已推送到 origin
✅ Step 6: Slack #release 已通知

[3 个 MCP Server 协作]
   git MCP    ←→ 本地仓库
   github MCP ←→ 远程
   slack MCP  ←→ #release

总耗时：4m 38s（手动需要 25min+）
```

## 关键设计点

1. **Pre-flight 严格** — 不允许在脏工作区发版
2. **失败必停** — 不要让 Skill 自由重试到死
3. **可选 MCP 降级** — Slack 缺失不阻断发版
4. **回滚有 SOP** — 每步都有撤销路径，必须用户确认
5. **覆盖率阈值可询问突破** — 平衡严格与灵活

## 与 `release-production` 的关系

本 Skill 仅负责 **staging**。生产发版需用：

```
> /release-production
```

`release-production` 在此基础上额外加：手动审批、灰度发布、回滚预案、On-call 通知。

## 版本

```yaml
version: "2.1.0"
```

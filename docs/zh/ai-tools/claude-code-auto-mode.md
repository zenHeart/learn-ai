# Claude Code Auto Mode & Claude Vision

> 学习日期: 2026-04-12

---

## Claude Code Auto Mode

> 来源: [Anthropic Engineering Blog](https://www.anthropic.com/engineering/claude-code-auto-mode)

### 三种权限模式对比

| 模式 | 自主性 | 安全性 | 维护成本 |
|------|--------|--------|----------|
| **沙箱** | 高 | 高（隔离） | 高（每新能力需配置） |
| **手动确认** | 中 | 高 | 中（93% 通过率） |
| **--dangerously-skip-permissions** | 最高 | 无 | 无 |
| **Auto Mode（新增）** | 高 | 中 | 低 |

### Auto Mode 架构：两层防御

```
输入层：Prompt Injection 探测
  - 扫描工具输出（文件读取/网页抓取/Shell输出）
  - 发现劫持尝试 → 注入警告上下文

输出层：Transcript Classifier
  - Sonnet 4.6 驱动
  - 快速单 Token 过滤（yes/no）
  - 复杂情况 → Chain-of-Thought 推理
```

### 威胁模型（4 类危险行为）

| 类型 | 示例 | 防御策略 |
|------|------|----------|
| **Scope Escalation** | 用户说"清理旧分支"→ 删除所有远程分支 | 模糊请求+破坏性操作→拦截 |
| **Credential Exploration** | 遇到认证错误→系统性搜索环境变量 | 凭证访问→拦截 |
| **Agent-Inferred Parameters** | 用户说"取消我的任务"→按名称相似度匹配并删除 | 模糊目标+不可逆操作→拦截 |
| **Sharing via External Service** | 想分享调试脚本→构造 GitHub Gist | 数据外泄→拦截 |
| **Safety-Check Bypass** | 部署命令失败→带 skip-verification 重试 | 安全检查绕过→拦截 |

### 权限决策流程

```
Tier 1: 内置安全工具白名单（只读操作）
  ↓ 不匹配
Tier 2: 用户配置的 always-allow 规则
  ↓ 不匹配（Auto Mode 下丢弃任意代码执行规则）
Tier 3: Transcript Classifier
  - Fast filter: 单 Token 判断拦截/允许
  - CoT reasoning: 仅在 fast filter 触发时执行
```

---

## Claude Vision

> 来源: [Claude Vision 官方文档](https://platform.claude.com/docs/en/build-with-claude/vision)

### 基本限制

| 限制 | 数值 |
|------|------|
| 单请求图片数（API） | 最多 600 张 |
| 单请求图片数（claude.ai） | 最多 20 张 |
| 最大图片尺寸 | 8000x8000 px |
| 超过 20 张图片时最大尺寸 | 2000x2000 px |

### Token 消耗估算

公式: `tokens ≈ (width × height) / 750`

| 图片尺寸 | Token 数 | 单张成本 | 1K 张成本 |
|----------|----------|----------|------------|
| 200x200 px | ~54 | ~$0.00016 | ~$0.16 |
| 1000x1000 px | ~1334 | ~$0.004 | ~$4.00 |
| 1092x1092 px | ~1590 | ~$0.0048 | ~$4.80 |

### 最佳实践

1. **图片放前面**: 图片在文字前效果更好
2. **尺寸控制**: 长边不超过 1568px，最佳 ~1.15 megapixels
3. **格式**: JPEG/PNG/GIF/WebP 均可
4. **文本可读性**: 文本图片确保文字清晰不小于 200px
5. **Files API**: 多图场景用 file_id 引用，减少请求体大小

---

## TestHub Platform

> 来源: [testhub_platform](https://github.com/chenjigang4167/testhub_platform) by 陈继刚

### 核心特性

| 模块 | 能力 |
|------|------|
| **AI 需求分析** | PDF/Word/TXT 解析，智能提取业务需求 |
| **智能测试用例生成** | 基于需求自动生成多类型测试用例 |
| **API 测试** | HTTP/WebSocket，环境变量，Allure 报告 |
| **UI 自动化** | Selenium/Playwright 双引擎，POM 模式 |
| **AI 智能模式** | Browser-use 框架，DOM/视觉双模式 |
| **移动测试** | Airtest，图像识别，多设备管理 |

### 技术栈

- 后端: Django 4.2 + DRF + Celery
- 前端: Vue 3.3 + Element Plus + Monaco Editor
- AI: LangChain + 多模型支持（OpenAI/Anthropic/DeepSeek）
- 测试: Selenium + Playwright + Airtest + Allure

### AI 智能模式

```javascript
// Browser-use 双模式
{
  mode: "dom",    // 基于 DOM 解析
  // 或
  mode: "vision"  // 基于截图识别
}
```

---

## 相关资源

- [Claude Code Auto Mode](https://www.anthropic.com/engineering/claude-code-auto-mode)
- [Claude Vision Docs](https://platform.claude.com/docs/en/build-with-claude/vision)
- [TestHub Platform](https://github.com/chenjigang4167/testhub_platform)

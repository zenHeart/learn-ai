# Cursor Rules

> 学习来源：[新版 Cursor Rules .mdc 格式文件使用经验](https://juejin.cn/post/7484787785887989798) | [Cursor 官方文档](https://docs.cursor.com/features/rules)

## 一、什么是 Cursor Rules

### 1.1 基本概念

Cursor Rules 是一个放在项目根目录的**项目级 AI 行为规范配置文件**，用于为项目定制 AI 的行为规范（强制代码风格、禁止特定 API 等）。

你可以把它理解成一份给 AI 阅读的**项目说明书**：

```
第一次你得告诉 AI：
"衣服要叠好放衣柜" "书本要按大小排列" "零食要放储物盒"

如果你把这些要求写成一份"整理指南"，AI 每次来都能按指南操作，不用重复说
```

### 1.2 .cursorrules vs .cursor/rules

| 版本 | 说明 |
|------|------|
| `.cursorrules` | 旧版单一文件（即将废弃）|
| `.cursor/rules/*.mdc` | 新版 Project Rules，支持多文件分类管理 |

> ⚠️ 建议不要直接删除旧版 `.cursorrules` 文件，因为团队成员可能尚未升级到 0.46+ 版本，可先保留原文件。

## 二、Rule Type（规则类型）

新版 Cursor Rules 提供了四种类别的 Rule Type：

| 类型 | 名称 | 生效规则 |
|------|------|----------|
| **Always** | 全局规则 | 始终生效，包括 `cmd + K` 对话 |
| **Auto Attached** | 自动附加 | 当匹配到特定文件时生效，可用正则匹配文件路径（如 `*tsx`、`src/config/*`）|
| **Agent Request** | 代理可见 | 代理模式（Agent Mode）下可见，代理决定是否查看完整规则 |
| **Manual** | 手动触发 | 需在对话中手动 `@` 才生效，不影响全局和其他文件 |

## 三、规则内容结构

一份优质的 `.cursorrules` 通常包含以下部分：

### 3.1 角色定义（你是谁）

```markdown
# 角色
你是一个 Python 开发专家
特长是 Flask 和 API 开发
有丰富的实战经验
```

### 3.2 目标定义（你要干什么）

```markdown
# 目标
- 开发高效的 API 解决方案
- 保证代码易于理解和维护
- 确保方案具有可扩展性
```

### 3.3 开发规范（项目的"规矩"）

```markdown
# 开发规范
- 用 def 定义函数，不用 lambda
- 函数都要写类型提示
- 条件语句要简洁（能一行绝不写三行）
- 所有接口请求必须使用封装的 request 函数
```

### 3.4 目录结构规范

```markdown
# 目录结构
src/
  components/   # UI 组件
  hooks/       # 自定义 Hooks
  utils/       # 工具函数
  api/         # API 请求封装
```

## 四、实操技巧

### 4.1 安装与配置

**方式一：设置面板**
- 打开 Cursor → Settings → Rules → Add new rule
- 为规则命名，添加多个规则文件
- 自动在 `.cursor/rules` 创建对应的 `.mdc` 格式文件

**方式二：AI 生成初稿**
- 使用 Cursor 命令 `/Generate Cursor Rules` 生成初稿
- 再根据项目需要调整完善

### 4.2 常见使用场景

#### 场景 1：统一包管理器

问题：Cursor 总是默认使用 npm 安装，但项目用的是 pnpm。

解决：将以下规则添加到 `.cursorrules`：
```markdown
- 项目使用 pnpm 作为包管理器
- 安装依赖时使用 `pnpm install` 而非 `npm install`
- 添加包时使用 `pnpm add <package>` 而非 `npm install <package>`
```

#### 场景 2：强制代码风格

```markdown
# 代码风格
- 使用 ESLint Standard 风格
- 组件应为函数式组件，不使用 class 组件
- 优先使用 TypeScript 泛型而非 any
```

#### 场景 3：架构约定

```markdown
# 架构约定
- 所有 API 请求必须经过 /api 代理
- 组件放在 src/components，按功能模块划分
- 状态管理使用 Zustand，避免 Redux 过度设计
```

### 4.3 AI 生成规则

如果你想快速生成新的规则，可以使用 [Cursor Directory](https://cursor.directory/generate) 网站：
- 上传旧的 `.cursorrules` 和 `package.json` 文件
- 自动生成 MDC 格式的规则描述

> 注意：生成的规则可能未完全符合你的需求，需根据实际情况调整。

## 五、.cursor/rules 目录结构示例

```
.cursor/
  rules/
    project-overview.mdc    # 项目概览（Always）
    frontend-style.mdc      # 前端样式规范（Auto Attached: *tsx, *jsx）
    backend-rules.mdc       # 后端规范（Auto Attached: *py, *go）
    testing-rules.mdc       # 测试规范（Auto Attached: *test.*, *spec.*）
    security-rules.mdc      # 安全规范（Always）
```

## 六、最佳实践

### 6.1 规则渐进完善

规则是根据自己项目的需求**逐步改进**的，通常没有一蹴而就的解决方案。

建议流程：
1. 从网上复制一些**通用规则**作为起点
2. 根据团队的**实际习惯**逐步自定义
3. 每次发现 AI 总是"忘记"某个要求时，将其加入规则

### 6.2 避免规则过多

规则太多会导致：
- AI 上下文膨胀，影响响应质量
- 团队成员难以遵守和维护

**建议**：只添加那些"日常使用中总是需要强调，但 AI 因为上下文丢失或新建对话总会忘记"的问题。

### 6.3 规则分层

- **User Rules**：应用到本地机器上的规则（通常设置"Always respond in 中文"等通用规则）
- **Project Rules**：推送到代码仓库，让团队共享使用的规则

### 6.4 从 .cursorrules 迁移到 .mdc

1. 保留原有 `.cursorrules` 文件（团队兼容性）
2. 在本地逐步将规则迁移到 `.cursor/rules/*.mdc`
3. 为不同类型的规则设置合适的 Rule Type
4. 确认所有成员升级到支持新版规则的 Cursor 版本后，再考虑删除旧文件

## 七、Cursor Rules 与工程化开发

在 AI Coding 工程化实践中，Cursor Rules 是项目级规范的重要组成：

```
Superpowers 管流程（Plan → Execute → Review → Finish）
Cursor Rules 管规范（代码风格、架构约定、项目约定）
MCP 工具管集成（Chrome DevTools 等外部工具集成）
```

## 八、总结

1. **Cursor Rules = 项目的 AI 说明书**：提前把编码规则、项目结构、注意事项写在这里
2. **Rule Type 决定生效时机**：Always / Auto Attached / Agent Request / Manual
3. **渐进完善**：不要试图一开始就写完美规则，在使用中逐步积累
4. **适度原则**：只添加真正必要的规则，避免规则过载
5. **团队共享**：通过 Project Rules 让团队成员共享统一的 AI 行为规范

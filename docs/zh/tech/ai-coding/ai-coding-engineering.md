# AI Coding 工程化改造

> 学习来源：[AI Coding 工程化革命：Superpowers 管流程，ui-ux-pro-max 管质感](https://blog.csdn.net/u013970991/article/details/160020776) + [Claude Code + OpenSpec：AI Coding 从模型博弈到工程化](https://blog.csdn.net/peraglobal/article/details/159396174)

## 一、从"能用"到"可控"：AI Coding 的工程化挑战

### 1.1 AI Coding 的黄金时代

根据 Stack Overflow 2025 年调查，超过 **80%** 的开发者每周至少使用一次 AI 辅助编程。从 GitHub Copilot 到 Cursor，从 ChatGPT 到 Claude，开发者已经习惯了用自然语言生成代码、调试 Bug、甚至重构整个模块。

### 1.2 "模型博弈"：AI Coding 的阿喀琉斯之踵

**"模型博弈"**指的是在使用 LLM 进行代码生成时，开发者被迫与模型的"随机性"进行博弈：

- **不确定性**：同一句话，不同模型输出不同代码；同一模型，不同参数输出也不同
- **不可控性**：模型可能偏离预期的设计模式、命名规范或架构原则
- **不可复现性**：几个月后重新运行相同 prompt，可能得到完全不同的代码

这种不确定性在个人项目或原型开发中尚可容忍，但在**企业级工程**中，却成为质量、可维护性、可测试性的巨大隐患。

### 1.3 工程化的本质需求

AI Coding 工程化的核心，是解决两个最常见的缺口：

- **一个补流程**：让开发过程可控，不容易一路失控（→ Superpowers）
- **一个补设计**：让前端结果有产品感，不停留在"有组件，但没产品感"的层面（→ ui-ux-pro-max）

## 二、Superpowers：面向工程流程的 AI 开发工作流

### 2.1 核心定位

Superpowers 不是"增强 AI 写代码能力"的插件，而是**补全 AI 开发短板**的工具，解决的是"**开发过程是否可控**"的问题。

### 2.2 核心工作流

Superpowers 的基本工作流如下，每一步都有明确的目标和产出：

```
brainstorming
  → using-git-worktrees
  → writing-plans
  → subagent-driven-development 或 executing-plans
  → test-driven-development
  → requesting-code-review / review
  → finishing-a-development-branch
```

### 2.3 四阶段核心流程

#### 阶段一：需求澄清（brainstorming）

把模糊需求转换成一个能继续往下推的设计起点。最关键的产物不是聊天记录，而是后续会被固化下来的**设计判断**。

关键问题包括：
- 权限粒度到页面、按钮还是接口？
- 是否需要 super_admin 绕过机制？
- refreshToken 是否落库？
- 是否需要审计日志？
- 是否涉及组织/部门/租户维度？

**核心：问清楚，而不是写代码，避免后续做无用功。**

#### 阶段二：方案收敛与 Plan 拆分（writing-plans）

把任务拆成一组可以逐步完成、逐步验收的动作。**Plan 粒度要小**，让长任务不会因为上下文膨胀而失控。

Plan 拆分原则：
- 数据库 Schema 设计作为独立步骤
- 鉴权模块和业务模块分开
- 前端页面按功能模块拆分
- 每个步骤有明确的交付物和验收标准

#### 阶段三：执行阶段的约束机制（executing-plans）

严格按计划执行，但受到测试、Review 和阶段性检查的约束，而非有计划也照样一口气往前冲。

例如：开发后端接口时，AI 会先写测试用例，再写接口代码，确保接口符合预期。

#### 阶段四：收尾与交付（finishing-a-development-branch）

测试回归、代码 Review、分支合并建议等，确保交付的代码是完整、可复用的。

**核心：收干净，避免留下烂摊子。**

### 2.4 适用场景

**适合的场景：**
- 中大型功能开发，一次对话内完成不了的任务
- 同时涉及后端建模、接口、前端、测试的多模块联动
- 需要跨 session 持续推进的任务
- 需要可审计、可复盘的交付结果

**不太有效的场景：**
- 修一个很小的 bug、一次性脚本、快速验证原型
- 尚在探索方向、需求本身就不收敛的创意型工作

## 三、ui-ux-pro-max：面向前端产出的设计增强能力

### 3.1 核心定位

ui-ux-pro-max 是一个给模型**补设计经验的知识层**，当你让 AI 生成前端页面时，它会自动提供设计建议（配色方案、字体选择、布局规范等），让生成的页面更统一、更成熟。

**不是 UI 组件库，不是设计工具，而是设计顾问。**

### 3.2 工作方式

ui-ux-pro-max 工作方式更"**被动**"，不会主动引导你做什么，而是在你提出 UI/UX 相关任务时，自动激活并提供帮助。

### 3.3 前端设计规范建议

示例：生成用户管理页面时，自动提醒模型：
- 用深蓝 `#1E40AF` 作为主色，浅灰作为辅色
- 字体用 Inter
- 表格带分页和搜索
- 表单弹窗用 Drawer 风格（从右侧滑入）

### 3.4 适用场景

**适合的场景：**
- 页面目标和组件库已确定，需要更统一、更成熟的设计产出
- 技术栈主流（React、Next.js、Tailwind 等）

**不适合的场景：**
- 尚在探索风格方向、仓库本身设计不统一或项目组件混乱

## 四、Superpowers + ui-ux-pro-max 互补关系

| 维度 | Superpowers | ui-ux-pro-max |
|------|------------|----------------|
| 核心职责 | 管"过程" | 管"结果" |
| 解决的问题 | 开发不跑偏 | 前端不粗糙 |
| 激活方式 | 主动引导（命令式） | 被动触发（任务触发）|
| 衡量标准 | 是否可控、可验收 | 是否成熟、有产品感 |

**实践中最常见的用法**：先用 Superpowers 把任务拆清楚、推到后端骨架就位，再用 ui-ux-pro-max 进入前端阶段。

## 五、实战案例：AI 开发 RBAC 用户权限系统

### 5.1 需求边界澄清

使用 `/superpowers:brainstorm` 引导 AI 澄清需求边界：

```
我要做一个后台管理系统的 RBAC 权限模块。
后端使用 NestJS + Prisma + PostgreSQL，前端使用 Next.js 14 + Tailwind + shadcn/ui。

请不要直接写代码，先帮我把边界条件问清楚：
- 权限粒度到页面、按钮还是接口？
- 是否需要 super_admin 绕过机制？
- refreshToken 是否落库？
- ...
```

### 5.2 Plan 拆分示例（RBAC 系统）

```
Phase 1: 工程底座
  - 1.1 初始化 monorepo（apps/api + apps/web）
  - 1.2 配置 Prisma + PostgreSQL
  - 1.3 设计并迁移数据库 Schema

Phase 2: 后端核心
  - 2.1 实现 Auth 模块（登录/刷新 Token）
  - 2.2 实现 Users 模块 CRUD
  - 2.3 实现 Roles 模块
  - 2.4 实现 Permissions 模块
  - 2.5 实现 JwtAuthGuard + PermissionsGuard
  - 2.6 实现 @Permissions() 装饰器

Phase 3: 前端核心
  - 3.1 初始化 Next.js + Tailwind + shadcn/ui
  - 3.2 实现登录页
  - 3.3 实现布局和侧边栏（权限驱动菜单）
  - 3.4 实现用户、角色、权限管理页

Phase 4: 集成与收尾
  - 4.1 前后端联调
  - 4.2 Docker Compose 一键启动
  - 4.3 初始化管理员账号与默认权限
```

### 5.3 后端验收标准

```bash
# 登录获取 Token
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"123456"}'

# 获取用户信息（Token 应返回 200）
curl -X GET http://localhost:3002/api/auth/profile \
  -H "Authorization: Bearer $ACCESS_TOKEN"

# 无权限的 Token 应返回 403（不是 401）
curl -X DELETE http://localhost:3002/users/1 \
  -H "Authorization: Bearer <limitedToken>"
```

验收核心清单：
- ✅ 登录成功，返回中包含权限列表的 Token
- ✅ 有权限接口正常返回 200
- ✅ 无权限接口返回 403（不是 401）
- ✅ super_admin 跳过权限检查
- ✅ Token 过期后 refreshToken 自动续签

### 5.4 前端验收标准

- ✅ 菜单根据权限动态显示/隐藏
- ✅ 没权限的页面不允许进入
- ✅ 没权限的按钮不展示
- ✅ 权限分配界面能正常保存
- ✅ 禁用用户无法登录

### 5.5 集成验收标准

```bash
# 一键启动
docker compose up -d

# 初始化数据（运行一次）
docker compose exec api npx ts-node src/scripts/seed.ts

# 验证协调
curl http://localhost:3001/users \
  -H "Authorization: Bearer <tokenFromFrontend>"
```

最终验收：
- ✅ docker compose up -d 一键启动，服务全部起来
- ✅ 初始化脚本正常写入权限和管理员账号
- ✅ 前端登录后 Token 注入正常，接口可访问
- ✅ 401/403 按预期跳转

## 六、工程化最佳实践

### 6.1 团队最佳实践

1. **建立"证据驱动"的缺陷管理规范**：提 Bug 时，尽量附上 AI 自动生成的证据（截图、控制台错误日志、网络请求）
2. **在 CI/CD 中建立自动化质量门禁**：每次 PR 发起时，AI 机器人跑核心路径的测试和性能检查，报告贴在评论里
3. **与现有自动化框架互补**：Playwright 负责核心回归测试的"主干道"，AI 负责棘手的、偶现的、需要深入调试的"支线任务"

### 6.2 现实限制

- **Spec/Plan 确实会带来前置成本**：如果任务本来就很小，前面花十几分钟对齐、落文档、拆计划，可能真的不划算
- **TDD 会让 AI 显得更慢**：好处是结果更可验证，但执行节奏不会像"直接写一版能跑的代码"那么快
- **ui-ux-pro-max 效果依赖代码基线**：如果仓库本身组件体系混乱、设计 token 失控，效果也会被打折扣
- **人工决策依旧不可替代**：Skill 能加强执行，但不能替你决定哪些复杂度该引入、哪些边界这次先不做

## 七、总结

AI Coding 工程化的核心是"**可控**"与"**成熟**"：

- **Superpowers** 把大任务拉回工程轨道：brainstorm → plan → execute → review → finish
- **ui-ux-pro-max** 把前端结果拉回产品语境：配色、字体、布局、组件的统一性
- **两者真正有用的时候**：不是"随便试试"的那一刻，而是开始**认真交付一个项目**的时候

> 一句话：小任务轻流程，大任务重流程。AI 工具的价值在于提升效率，而不是增加负担。

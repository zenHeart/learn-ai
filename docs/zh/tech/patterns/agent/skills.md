# 智能体技能 (Agent Skills)

## 你将学到什么

在本指南结束时，你将理解：
- 什么是 Agent Skills 以及为什么它们对于构建可扩展智能体至关重要
- 渐进式披露模型如何保持智能体快速和具有上下文
- 如何创建、构建并将技能集成到智能体系统中
- 生产使用的安全注意事项和最佳实践

**大局观**：Agent Skills 是一种开放格式，允许你将专业知识、工作流和能力打包成可移植、可重用的模块，任何智能体都可以按需加载和使用。

## 为什么 Agent Skills 存在

### 智能体扩展性问题

你已经构建了一个 AI 智能体。它在核心任务上表现出色。但现在：
- 你的团队需要它了解公司特定的工作流
- 不同的用户需要不同的专业能力
- 你想增加领域专业知识而不使核心系统变得臃肿
- 你需要这些能力在多个智能体平台上工作

**传统方法不足**：

| 方法 | 问题 |
|----------|---------|
| **硬编码一切** | 启动慢，未使用的功能浪费上下文 |
| **每个平台的自定义插件** | 不可移植，重复工作 |
| **上传文档** | 无结构，无可执行逻辑，可发现性差 |
| **微调** | 昂贵，静态，不易共享 |

### Agent Skills 解决方案

**Agent Skills** 提供了一种标准化方法来扩展智能体：
- **专业知识**：行业法规、公司政策、技术文档
- **新能力**：代码生成模式、分析工作流、集成程序
- **可重复的工作流**：作为可重用模板捕获的多步过程
- **互操作性**：一次构建，跨多个智能体产品部署

**核心创新 - 渐进式披露**：技能分三个阶段加载，保持智能体快速，同时在需要时启用深度上下文：

1. **发现** (启动时)：仅加载名称 + 描述 (每个技能 50-100 tokens)
2. **激活** (相关时)：加载完整指令 (<5000 tokens)
3. **执行** (按需)：根据需要访问捆绑的脚本和资源

可以这样想：你的智能体有一个技能书架，但只打开当前任务所需的书。

---

## Agent Skills 如何工作

### 心智模型：技能生命周期

```
┌─────────────────────────────────────────────────────────────┐
│  用户任务: "审查此 PR 的安全问题"                           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  发现阶段 (启动)                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ code-review  │  │ sql-expert   │  │ pr-security  │      │
│  │ (50 tokens)  │  │ (50 tokens)  │  │ (50 tokens)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  智能体扫描名称/描述，找到 "pr-security" 匹配               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  激活阶段 (任务相关)                                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 加载 pr-security/SKILL.md                           │   │
│  │ - 完整指令 (3000 tokens)                            │   │
│  │ - 安全检查清单                                      │   │
│  │ - 常见漏洞模式                                      │   │
│  │ - 工具权限: read, grep, bash                        │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  执行阶段 (按需)                                            │
│  智能体使用技能指令 + 访问资源:                             │
│  - references/owasp-top10.md (详细漏洞指南)                 │
│  - scripts/scan-dependencies.sh (自动扫描)                  │
│  - templates/security-report.md (标准化输出)                │
└─────────────────────────────────────────────────────────────┘
```

**关键见解**：大多数技能保持休眠状态（仅发现阶段）。只有与任务相关的技能才会加载其完整指令。这保持了上下文窗口的清洁和智能体的响应能力。

## 创建你的第一个技能

让我们一步步构建一个实用技能来理解这种格式。

### 场景：Git 提交信息技能

你想教你的智能体按照 Conventional Commits 标准编写优秀的提交信息。

### 步骤 1: 创建目录结构

```bash
mkdir -p commit-helper
cd commit-helper
```

每个技能只是一个文件夹。就是这样。文件夹的名称成为技能标识符。

**命名规则**：
- 仅小写字母和数字
- 使用连字符分隔单词（不使用下划线）
- 无前导/尾随连字符
- 无连续连字符 (`--`)
- 最多 64 个字符

✅ Good: `commit-helper`, `sql-expert`, `aws-deploy`
❌ Bad: `Commit_Helper`, `-commit`, `commit--helper`, `commit.helper`

### 步骤 2: 创建带有 Frontmatter 的 SKILL.md

```markdown

---
name: commit-helper
description: Generates high-quality commit messages following conventional commits format. Analyzes staged changes and suggests appropriate type, scope, and description.
license: MIT
compatibility:
  - claude-code
  - cursor
  - aider
allowed-tools:
  - bash
  - read
  - grep
metadata:
  version: 1.0.0
  author: Your Team
  tags: [git, version-control, best-practices]
---

# Commit Message Helper

You are an expert at writing clear, descriptive commit messages following the Conventional Commits specification.

## Your Task

When the user asks for help with a commit message:

1. **Analyze staged changes**: Use `git diff --cached` to see what's being committed
2. **Determine commit type**: Choose from:
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation only
   - `style`: Formatting, missing semicolons, etc.
   - `refactor`: Code restructuring without behavior change
   - `perf`: Performance improvement
   - `test`: Adding or updating tests
   - `chore`: Maintenance tasks, dependency updates

3. **Identify scope**: The area of codebase affected (e.g., `api`, `ui`, `auth`, `database`)

4. **Write description**:
   - Use imperative mood ("add" not "added" or "adds")
   - Don't capitalize first letter
   - No period at the end
   - Max 50 characters for subject line

5. **Add body if needed**: Explain *why* the change was made (for complex changes)

## Format

``````
<type>(<scope>): <description>

[optional body]

[optional footer]
``````

## Examples

Good commit messages:
``````
feat(auth): add OAuth2 social login support
fix(api): prevent race condition in user creation
docs(readme): update installation instructions
refactor(database): simplify query builder logic
``````

Bad commit messages (and why):
``````
Update files          → Too vague, no type/scope
Fixed bug             → What bug? Where?
Added new feature.    → Not imperative, has period, no scope
feat: adding stuff    → Not imperative mood (-ing form)
``````

## Process

1. Run `git diff --cached` to see staged changes
2. If no changes staged, inform the user
3. Analyze the changes and suggest:
   - Primary commit type
   - Appropriate scope
   - Clear description
   - Optional body if changes are complex
4. Present 2-3 commit message options
5. Explain your reasoning

## References

For detailed specification, see references/conventional-commits.md
```

**发生了什么？**

- **YAML Frontmatter**: 智能体在发现阶段读取的元数据
  - `name`: 必须匹配文件夹名称
  - `description`: 用于任务匹配（使其具有描述性！)
  - `allowed-tools`: 限制技能可以做什么（安全性）
  - `compatibility`: 关于测试平台的建议提示

- **Markdown Body**: 激活阶段加载的完整指令
  - 根据你的用例自由构建结构
  - 无格式限制 - 自由使用标题、列表、代码块
  - 保持在 500 行以内；将详细内容移动到 `references/`

### 步骤 3: 添加参考资料 (可选)

```bash
mkdir references
```

创建 `references/conventional-commits.md`:

```markdown
# Conventional Commits Specification v1.0.0

## Summary

The Conventional Commits specification is a lightweight convention on top of commit messages...

[Full detailed specification - can be 1000+ lines]

## Type Details

### feat
A new feature for the user...

### fix
A bug fix for the user...

[etc...]
```

**为什么使用参考资料？**

- 保持 SKILL.md 简洁（激活阶段高效）
- 智能体仅在需要时访问参考资料（执行阶段）
- 你可以包含全面的文档而不会使上下文膨胀

### 步骤 4: 添加脚本 (可选)

```bash
mkdir scripts
```

创建 `scripts/analyze-diff.sh`:

```bash
#!/bin/bash
# Analyzes git diff and outputs structured data for commit message generation

git diff --cached --stat
echo "---"
git diff --cached --shortstat
echo "---"
git diff --cached --name-only
```

**为什么使用脚本？**

- 封装复杂逻辑
- 跨不同智能体平台可重用
- 沙盒执行（智能体可以限制脚本权限）

### 步骤 5: 你的技能准备好了！

```
commit-helper/
├── SKILL.md                        # 必需: 元数据 + 指令
├── references/
│   └── conventional-commits.md     # 可选: 详细文档
└── scripts/
    └── analyze-diff.sh             # 可选: 辅助脚本
```

**分发**：
- 通过 Git 仓库共享
- 发布到 npm/包注册表
- 包含在智能体产品的技能市场中
- 直接复制到用户的技能目录

---

## 技能结构深度解析

### SKILL.md 剖析

#### 必需的 Frontmatter 字段

```yaml
---
name: your-skill-name        # 小写, 连字符, 最多 64 字符
description: |               # 最多 1024 字符, 用于任务匹配
  What this skill does and when to use it.
  Include keywords that trigger activation.
---
```

**描述编写技巧**：
- 将重要关键词放在前面
- 包含同义词（例如 "review" 和 "analyze"）
- 如果相关，提及特定文件类型
- 具体说明它解决的问题

```yaml
# 通用 (任务匹配差)
description: Helps with databases

# 具体 (任务匹配好)
description: Writes and optimizes PostgreSQL queries, analyzes query performance, suggests indexes. Handles migrations and schema design. Keywords: SQL, postgres, database optimization, EXPLAIN, query planner
```

#### 可选的 Frontmatter 字段

```yaml
---
license: MIT                 # SPDX 许可证标识符
compatibility:               # 测试过的智能体平台
  - claude-code
  - cursor
  - copilot
metadata:                    # 任意键值对
  version: 1.2.0
  author: engineering-team
  tags: [backend, database, performance]
  requires: postgres >= 12
allowed-tools:               # 限制工具访问 (安全性)
  - read
  - grep
  - bash
---
```

**allowed-tools 解释**：

没有 `allowed-tools`，智能体可以使用任何工具。指定以限制：

```yaml
# 只读技能 (不能修改文件)
allowed-tools:
  - read
  - grep

# 全自动 (可以运行脚本, 修改文件)
allowed-tools:
  - read
  - write
  - bash
  - edit

# API 集成 (无文件系统访问)
allowed-tools:
  - http-fetch
```

### Markdown 正文指南

**结构清晰**：

```markdown
# Skill Name

此技能做什么的简要概述。

## When to Use This Skill

此技能适用的具体场景。

## How to Use This Skill

智能体应该遵循的一步步过程。

## Important Rules

关键约束或要求。

## Examples

显示预期行为的输入/输出示例。

## Troubleshooting

常见问题及解决方法。

## References

指向 references/ 目录中文件的指针。
```

**写作风格**：
- 使用祈使语气 ("Analyze the code", 不是 "The agent should analyze")
- 对输入和输出要具体
- 包含好模式和坏模式的示例
- 保持程序性知识一步步进行
- 使用代码块作为示例

**长度指南**：
- 目标: SKILL.md 为 200-300 行
- 最大: 500 行
- 如果更长: 将内容移动到 `references/` 目录

### 目录惯例

```
skill-name/
├── SKILL.md              # 必需: 技能定义
├── README.md             # 可选: 人类文档
├── scripts/              # 可选: 可执行代码
│   ├── setup.sh
│   ├── main.py
│   └── utils.js
├── references/           # 可选: 详细文档
│   ├── api-spec.yaml
│   ├── examples.md
│   └── troubleshooting.md
├── templates/            # 可选: 文件模板
│   ├── config.template.json
│   └── report.template.md
└── assets/               # 可选: 其他资源
    ├── schema.json
    └── patterns.txt
```

**SKILL.md 中的路径引用**：

始终使用从技能根目录开始的**相对路径**：

```markdown
For detailed API specification, see references/api-spec.yaml

To generate a report, use templates/report.template.md as a starting point.

Run scripts/setup.sh before first use.
```

智能体相对于技能目录解析这些路径。

---

## 将技能集成到智能体中

### 方法 1: 基于文件系统 (最简单)

智能体通过 shell 命令访问技能：

```javascript
// 智能体的技能发现
const skillsDir = '/path/to/skills';
const skills = [];

for (const dir of fs.readdirSync(skillsDir)) {
  const skillPath = path.join(skillsDir, dir, 'SKILL.md');
  if (fs.existsSync(skillPath)) {
    const content = fs.readFileSync(skillPath, 'utf-8');
    const { data, content: body } = matter(content); // 解析 frontmatter

    skills.push({
      name: data.name,
      description: data.description,
      path: skillPath,
      metadata: data
    });
  }
}

// 添加到智能体的系统提示词
const skillsContext = `
Available Skills:
${skills.map(s => `- ${s.name}: ${s.description}`).join('\n')}

To activate a skill, use: cat ${skillsDir}/{skill-name}/SKILL.md
`;
```

**激活**：

当智能体决定技能相关时：

```javascript
// 智能体执行: cat /skills/commit-helper/SKILL.md
// 输出加载到上下文中
// 智能体现在遵循技能指令
```

**优点**：简单，适用于任何有文件系统访问权限的智能体
**缺点**：智能体必须手动管理上下文，无访问控制

### 方法 2: 基于工具 (推荐用于生产)

提供自定义工具用于技能操作：

```typescript
// 在你的智能体中注册技能工具
agent.registerTool({
  name: 'activate_skill',
  description: 'Load a skill\'s full instructions when relevant to current task',
  parameters: {
    type: 'object',
    properties: {
      skillName: {
        type: 'string',
        description: 'Name of the skill to activate',
        enum: skills.map(s => s.name) // 仅允许注册的技能
      }
    },
    required: ['skillName']
  },
  execute: async ({ skillName }) => {
    const skill = skills.find(s => s.name === skillName);
    if (!skill) return `Skill ${skillName} not found`;

    // 加载完整 SKILL.md
    const content = fs.readFileSync(skill.path, 'utf-8');
    const { data, content: instructions } = matter(content);

    // 验证工具权限
    if (data['allowed-tools']) {
      restrictAgentTools(data['allowed-tools']);
    }

    return instructions;
  }
});

agent.registerTool({
  name: 'access_skill_resource',
  description: 'Access reference docs, scripts, or templates from an active skill',
  parameters: {
    type: 'object',
    properties: {
      skillName: { type: 'string' },
      resourcePath: {
        type: 'string',
        description: 'Relative path like references/api-spec.yaml'
      }
    },
    required: ['skillName', 'resourcePath']
  },
  execute: async ({ skillName, resourcePath }) => {
    const skill = skills.find(s => s.name === skillName);
    if (!skill) return 'Skill not found';

    // 安全: 验证路径在技能目录内
    const fullPath = path.join(path.dirname(skill.path), resourcePath);
    if (!fullPath.startsWith(path.dirname(skill.path))) {
      return 'Invalid path: must be within skill directory';
    }

    return fs.readFileSync(fullPath, 'utf-8');
  }
});
```

**智能体工作流**：

1. 智能体看到任务: "Help me write a commit message"
2. 智能体扫描系统提示词中的技能描述
3. 智能体调用 `activate_skill({ skillName: 'commit-helper' })`
4. 智能体接收完整指令，遵循它们
5. 如果需要，调用 `access_skill_resource()` 获取参考资料

**优点**：受控访问，安全检查，使用跟踪
**缺点**：实现更复杂

### 方法 3: 系统提示词注入 (Claude 优化)

对于 Claude 模型，以 XML 形式注入技能元数据：

```xml
<system>
You are an AI assistant with access to specialized skills.

<available_skills>
  <skill>
    <name>commit-helper</name>
    <description>Generates high-quality commit messages following conventional commits format. Analyzes staged changes and suggests appropriate type, scope, and description.</description>
    <activation_command>cat /skills/commit-helper/SKILL.md</activation_command>
  </skill>

  <skill>
    <name>sql-expert</name>
    <description>Writes and optimizes PostgreSQL queries, analyzes query performance, suggests indexes. Handles migrations and schema design.</description>
    <activation_command>cat /skills/sql-expert/SKILL.md</activation_command>
  </skill>
</available_skills>

When a user\'s request matches a skill\'s description, activate the skill by running the activation command.
</system>
```

**为什么用 XML？**

Claude 被训练为能够有效地识别和解析 XML 结构。这使得技能元数据易于引用，而不会与指令混淆。

---

## 真实世界技能示例

### 示例 1: API 集成技能

```yaml
---
name: stripe-integration
description: Guides implementation of Stripe payment flows, webhooks, and subscription management. Handles error cases, idempotency, and PCI compliance.
allowed-tools:
  - read
  - write
  - edit
  - grep
metadata:
  version: 2.1.0
  requires: stripe >= 10.0.0
---

# Stripe Integration Helper

## When to Use
- Setting up payment flows
- Implementing webhook handlers
- Managing subscriptions
- Debugging Stripe API issues

## Implementation Patterns

### Payment Intent Flow

```javascript
// Step 1: Create PaymentIntent on server
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  automatic_payment_methods: { enabled: true },
  metadata: { orderId: '12345' }
});

// Step 2: Send clientSecret to frontend
res.json({ clientSecret: paymentIntent.client_secret });

// Step 3: Confirm on client
const { error } = await stripe.confirmPayment({
  clientSecret,
  confirmParams: { return_url: 'https://example.com/complete' }
});
```

### Webhook Security
**Critical**: Always verify webhook signatures
```javascript
const sig = req.headers['stripe-signature'];
let event;

try {
  event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );
} catch (err) {
  return res.status(400).send(`Webhook Error: ${err.message}`);
}

// Handle event types
switch (event.type) {
  case 'payment_intent.succeeded':
    // Fulfill order
    break;
  case 'payment_intent.payment_failed':
    // Notify customer
    break;
}
```

## Common Mistakes
1. **Not using idempotency keys** → Duplicate charges
2. **Skipping webhook verification** → Security vulnerability
3. **Storing card details** → PCI compliance violation
4. **Not handling async payment methods** → Failed payments

## References
- references/stripe-api-reference.md
- references/webhook-events.md
- templates/checkout-flow.js
```

### 示例 2: 安全审计技能

```yaml
---
name: security-audit
description: Reviews code for security vulnerabilities including XSS, SQL injection, authentication flaws, secrets exposure, and OWASP Top 10 issues.
allowed-tools:
  - read
  - grep
  - bash
metadata:
  tags: [security, code-review, owasp]
---

# Security Audit Skill

## Audit Checklist

### 1. Authentication & Authorization
- [ ] Are passwords hashed with bcrypt/argon2?
- [ ] Are JWT secrets strong and rotated?
- [ ] Is there rate limiting on auth endpoints?
- [ ] Are authorization checks on every protected route?

### 2. Input Validation
- [ ] Are all user inputs validated?
- [ ] Is output properly escaped (XSS prevention)?
- [ ] Are SQL queries parameterized (no string concatenation)?
- [ ] Are file uploads validated (type, size, content)?

### 3. Secrets Management
- [ ] No hardcoded credentials?
- [ ] No secrets in version control?
- [ ] Using environment variables correctly?
- [ ] Are API keys properly scoped?

### 4. Dependencies
Run: scripts/check-dependencies.sh
- [ ] No known vulnerabilities in dependencies?
- [ ] Dependencies up to date?

## Automated Checks

Use scripts/security-scan.sh to run:
- grep for common patterns (TODO: add credentials patterns)
- npm audit / yarn audit
- Git history scan for leaked secrets

## Report Template

Use templates/security-report.md to document findings.
```

### 示例 3: 文档生成器技能

```yaml
---
name: api-docs-generator
description: Generates comprehensive API documentation from code. Supports OpenAPI/Swagger format. Creates endpoint descriptions, request/response examples, and error handling docs.
allowed-tools:
  - read
  - write
  - grep
  - bash
---

# API Documentation Generator

## Process

1. **Scan for API endpoints**
   - Express: Look for app.get/post/put/delete
   - FastAPI: Look for @app.get decorators
   - NestJS: Look for @Get, @Post decorators

2. **Extract route information**
   - HTTP method
   - Path pattern
   - Parameters (path, query, body)
   - Response types

3. **Generate OpenAPI spec**
   Use templates/openapi-template.yaml

4. **Create markdown docs**
   Use templates/api-endpoint.md for each endpoint

## Example Output

```yaml
paths:
  /users/{id}:
    get:
      summary: Get user by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: User found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '404':
          description: User not found
```

## References
- references/openapi-spec-3.1.md
- references/documentation-best-practices.md
```

---

## 安全注意事项

### 威胁模型

Agent Skills 可以：
- 读取敏感文件
- 执行任意代码
- 发出网络请求
- 修改应用状态

**风险**：
1. **恶意技能**：技能包含有害代码
2. **技能注入**：用户诱骗智能体加载恶意技能
3. **特权升级**：技能绕过预期限制
4. **数据泄露**：技能泄露敏感信息

### 安全最佳实践

#### 1. 技能白名单

仅加载受信任来源的技能：

```javascript
const TRUSTED_SKILL_SOURCES = [
  '/app/built-in-skills',
  '/home/user/.agent-skills',
  'https://official-skills.example.com'
];

function isSkillTrusted(skillPath) {
  return TRUSTED_SKILL_SOURCES.some(source =>
    skillPath.startsWith(source)
  );
}

// 仅加载受信任的技能
if (isSkillTrusted(skillPath)) {
  loadSkill(skillPath);
} else {
  console.warn(`Untrusted skill blocked: ${skillPath}`);
}
```

#### 2. 工具限制

强制执行技能元数据中的 `allowed-tools`：

```javascript
function activateSkill(skill) {
  const allowedTools = skill.metadata['allowed-tools'];

  if (allowedTools) {
    // 移除非白名单工具
    const currentTools = agent.getAvailableTools();
    const restrictedTools = currentTools.filter(t =>
      allowedTools.includes(t.name)
    );
    agent.setAvailableTools(restrictedTools);
  }

  // 加载技能指令
  return skill.instructions;
}
```

#### 3. 脚本沙盒化

在隔离环境中执行技能脚本：

```javascript
const { spawn } = require('child_process');

async function executeSkillScript(skillName, scriptPath, args) {
  // 验证脚本在技能目录内
  const skillDir = `/skills/${skillName}`;
  const fullPath = path.join(skillDir, scriptPath);

  if (!fullPath.startsWith(skillDir)) {
    throw new Error('Invalid script path');
  }

  // 在权限受限的沙盒中运行
  return new Promise((resolve, reject) => {
    const proc = spawn('docker', [
      'run',
      '--rm',
      '--network', 'none',           // 无网络访问
      '--read-only',                 // 只读文件系统
      '--tmpfs', '/tmp',             // 仅可写 tmpfs
      '--user', 'nobody',            // 非 root 用户
      '--cpus', '0.5',               // CPU 限制
      '--memory', '256m',            // 内存限制
      'skill-sandbox',               // 沙盒镜像
      'bash', fullPath, ...args
    ]);

    let output = '';
    proc.stdout.on('data', data => output += data);
    proc.on('close', code => {
      if (code === 0) resolve(output);
      else reject(new Error(`Script failed: ${code}`));
    });
  });
}
```

#### 4. 用户确认

对危险操作要求批准：

```javascript
async function executeToolWithConfirmation(toolName, args, skill) {
  const DANGEROUS_TOOLS = ['write', 'bash', 'delete', 'http-post'];

  if (DANGEROUS_TOOLS.includes(toolName)) {
    console.log(`\n⚠️  Skill "${skill.name}" wants to execute:`);
    console.log(`   Tool: ${toolName}`);
    console.log(`   Args: ${JSON.stringify(args, null, 2)}`);

    const answer = await promptUser('Allow this action? (yes/no): ');

    if (answer.toLowerCase() !== 'yes') {
      return 'User denied permission';
    }
  }

  return agent.executeTool(toolName, args);
}
```

#### 5. 执行日志记录

审计所有技能操作：

```javascript
const auditLog = [];

function logSkillAction(skillName, action, details) {
  const entry = {
    timestamp: new Date().toISOString(),
    skill: skillName,
    action,
    details,
    user: getCurrentUser()
  };

  auditLog.push(entry);
  fs.appendFileSync('skill-audit.log', JSON.stringify(entry) + '\n');
}

// 用法
logSkillAction('commit-helper', 'activated', { task: 'commit message' });
logSkillAction('commit-helper', 'tool_called', { tool: 'bash', command: 'git diff --cached' });
logSkillAction('commit-helper', 'completed', { success: true });
```

#### 6. 输入验证

加载前验证技能元数据：

```javascript
const Joi = require('joi');

const skillSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-z0-9-]+$/)
    .max(64)
    .required(),
  description: Joi.string()
    .max(1024)
    .required(),
  license: Joi.string()
    .pattern(/^[A-Z0-9.-]+$/),
  'allowed-tools': Joi.array()
    .items(Joi.string()),
  compatibility: Joi.array()
    .items(Joi.string()),
  metadata: Joi.object()
});

function validateSkill(skillMetadata) {
  const { error, value } = skillSchema.validate(skillMetadata);

  if (error) {
    throw new Error(`Invalid skill metadata: ${error.message}`);
  }

  return value;
}
```

---

## 最佳实践

### 对于技能作者

1. **编写清晰的描述**
   - 将关键词前置以便任务匹配
   - 具体说明何时使用该技能
   - 包含同义词和相关术语

2. **保持指令专注**
   - 一个技能 = 一个领域/工作流
   - 将详细内容移至 `references/`
   - SKILL.md 目标 200-300 行

3. **提供示例**
   - 展示好的和坏的模式
   - 包含完整的、可运行的代码
   - 涵盖边缘情况和错误处理

4. **指定工具要求**
   - 使用 `allowed-tools` 限制权限
   - 记录为什么需要每个工具
   - 请求最小必要权限

5. **对技能进行版本控制**
   - 在元数据中包含版本
   - 记录破坏性更改
   - 使用语义化版本控制

6. **跨平台测试**
   - 在不同的智能体产品上测试
   - 验证工具兼容性
   - 记录已知限制

### 对于智能体构建者

1. **实施渐进式披露**
   - 启动时仅加载元数据
   - 按需激活技能
   - 缓存会话的已激活技能

2. **强制执行安全边界**
   - 验证所有技能元数据
   - 沙盒化脚本执行
   - 对危险操作要求确认
   - 记录所有技能操作

3. **提供良好的 UX**
   - 显示可用技能
   - 指示技能何时激活
   - 让用户启用/禁用技能
   - 清晰显示技能权限

4. **优雅处理错误**
   - 技能未找到 → 建议类似技能
   - 工具不允许 → 解释限制
   - 脚本失败 → 显示错误，不要崩溃

5. **启用可发现性**
   - 列出可用技能及其描述
   - 为任务建议相关技能
   - 提供技能搜索/过滤

### 对于团队

1. **创建组织技能**
   - 捕获团队特定的工作流
   - 记录内部 API 和服务
   - 编码最佳实践和标准

2. **共享和重用**
   - 发布技能到内部注册表
   - 对技能仓库进行版本控制
   - 分发前审查和批准技能

3. **维护技能**
   - 当 API 变更时更新
   - 根据使用反馈改进
   - 弃用过时的技能

---

## 验证与测试

### 验证技能格式

使用官方 skills-ref 库：

```javascript
import { validateSkill } from '@anthropic-ai/skills-ref';

const skill = {
  name: 'my-skill',
  description: 'My skill description',
  path: '/path/to/my-skill'
};

const validation = validateSkill(skill);

if (!validation.valid) {
  console.error('Skill validation failed:');
  validation.errors.forEach(err => console.error(`- ${err}`));
} else {
  console.log('Skill is valid!');
}
```

### 测试技能激活

```javascript
describe('commit-helper skill', () => {
  it('should activate for commit-related tasks', async () => {
    const agent = new Agent();
    agent.loadSkills('/path/to/skills');

    const response = await agent.processTask(
      'Help me write a commit message for my changes'
    );

    // 检查技能是否已激活
    expect(agent.activeSkills).toContain('commit-helper');

    // 检查智能体是否使用了 git 命令
    expect(response.toolCalls).toContainEqual(
      expect.objectContaining({ tool: 'bash', args: expect.stringContaining('git diff') })
    );
  });

  it('should not activate for unrelated tasks', async () => {
    const agent = new Agent();
    agent.loadSkills('/path/to/skills');

    const response = await agent.processTask('What is the weather today?');

    expect(agent.activeSkills).not.toContain('commit-helper');
  });
});
```

### 测试技能执行

```javascript
describe('commit-helper execution', () => {
  it('should generate conventional commit message', async () => {
    const agent = new Agent();
    agent.loadSkills('/path/to/skills');

    // Mock git diff output
    mockBashTool('git diff --cached', `
diff --git a/src/auth.js b/src/auth.js
+++ b/src/auth.js
@@ -10,6 +10,7 @@
+  return jwt.sign(payload, secret, { expiresIn: '1h' });
    `);

    const response = await agent.processTask(
      'Generate a commit message for these changes'
    );

    // 验证格式
    expect(response).toMatch(/^(feat|fix|docs|style|refactor|test|chore)/);
    expect(response).toMatch(/\([a-z]+\):/);
  });
});
```

---

## 高级模式

### 技能组合

技能可以引用其他技能：

```markdown
---
name: full-stack-deploy
description: Deploys full-stack applications with frontend, backend, and database migrations
metadata:
  requires-skills: [docker-build, database-migration, nginx-config]
---

# Full-Stack Deployment

## Process

1. **Activate docker-build skill** to containerize backend and frontend
2. **Activate database-migration skill** to run migrations
3. **Activate nginx-config skill** to set up reverse proxy
4. Deploy containers in sequence with health checks

## Implementation

To activate required skills:
- cat /skills/docker-build/SKILL.md
- cat /skills/database-migration/SKILL.md
- cat /skills/nginx-config/SKILL.md

Follow instructions from each skill in sequence.
```

### 上下文感知激活

技能可以指定何时应自动激活：

```yaml
---
name: python-tester
description: Runs Python tests with pytest, generates coverage reports
metadata:
  auto-activate-on:
    - file-patterns: ['test_*.py', '*_test.py']
    - keywords: [pytest, unit test, testing]
---
```

智能体实现：

```javascript
function shouldAutoActivate(skill, context) {
  const autoActivate = skill.metadata['auto-activate-on'];
  if (!autoActivate) return false;

  // 检查文件模式
  if (autoActivate['file-patterns']) {
    const hasMatchingFiles = context.files.some(file =>
      autoActivate['file-patterns'].some(pattern =>
        minimatch(file, pattern)
      )
    );
    if (hasMatchingFiles) return true;
  }

  // 检查关键词
  if (autoActivate.keywords) {
    const taskLower = context.task.toLowerCase();
    if (autoActivate.keywords.some(kw => taskLower.includes(kw))) {
      return true;
    }
  }

  return false;
}
```

### 动态技能生成

以编程方式生成技能：

```javascript
function generateAPISkill(openApiSpec) {
  const skill = {
    name: `${openApiSpec.info.title.toLowerCase().replace(/\s+/g, '-')}-api`,
    description: `Integration helpers for ${openApiSpec.info.title} API`,
    instructions: generateInstructionsFromSpec(openApiSpec),
    references: {
      'api-spec.yaml': yaml.dump(openApiSpec)
    },
    templates: {
      'client.template.js': generateClientTemplate(openApiSpec)
    }
  };

  writeSkill('/skills', skill);
}

// 用法: 从 Stripe 的 OpenAPI 规范生成技能
const stripeSpec = await fetch('https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.yaml');
generateAPISkill(await stripeSpec.json());
```

---

## 故障排除

### 常见问题

**问题**：技能未在预期时激活

**诊断**：
- 检查技能描述是否匹配任务关键词
- 验证技能是否在加载的技能目录中
- 启用详细日志以查看发现阶段

**解决方案**：
```javascript
// 添加调试日志
console.log('Available skills:', agent.skills.map(s => s.name));
console.log('Task:', userTask);
console.log('Matched skills:', agent.findMatchingSkills(userTask));
```

---

**问题**：未正确遵循技能指令

**诊断**：
- 指令可能模棱两可
- 技能可能与智能体的基础指令冲突
- 指令可能太长 (>5000 tokens)

**解决方案**：
- 使指令更明确且循序渐进
- 对顺序过程使用编号列表
- 将详细内容移至参考资料
- 用不同的任务措辞进行测试

---

**问题**：脚本执行失败

**诊断**：
- 脚本路径可能不正确
- 脚本可能没有执行权限
- 脚本可能具有不在沙盒中的依赖项

**解决方案**：
```bash
# 修复权限
chmod +x /skills/my-skill/scripts/run.sh

# 验证 SKILL.md 中的路径是相对路径
# ✅ scripts/run.sh
# ❌ /skills/my-skill/scripts/run.sh

# 在技能目录中打包依赖项
```

---

**问题**：智能体加载了太多技能（启动慢）

**诊断**：
- 一次性加载所有技能指令
- 未实施渐进式披露

**解决方案**：
```javascript
// Bad: 启动时加载所有内容
skills.forEach(s => loadFullSkill(s));

// Good: 仅加载元数据
skills.forEach(s => {
  loadedSkills.push({
    name: s.metadata.name,
    description: s.metadata.description,
    path: s.path
  });
});

// 仅在激活时加载完整指令
```

---

## 真实世界案例研究

### 案例研究 1: 工程团队知识库

**挑战**：工程团队拥有分散在 wiki、旧 PR 和人们头脑中的部落知识。新工程师需要数周时间才能上手。

**解决方案**：创建了组织技能：
- `onboarding-guide`: 设置程序、工具访问、团队规范
- `architecture-guide`: 系统设计、服务边界、数据流
- `deploy-process`: 每个环境的逐步部署
- `incident-response`: 待命程序、运行手册、升级路径

**结果**：
- 新工程师上手时间从 4 周缩短到 1.5 周
- 团队流程一致
- 知识在团队成员离职后得以保留
- 技能与代码一起进行版本控制

---

### 案例研究 2: 多平台智能体产品

**挑战**：智能体产品需要支持不同的用户工作流（编码、写作、数据分析），而不使核心系统变得臃肿。

**解决方案**：实施了技能市场：
- 核心智能体附带 5 个基本技能
- 用户可以浏览并安装其他技能
- 社区贡献了专业技能
- 渐进式披露保持智能体快速

**结果**：
- 尽管有 100+ 可用技能，智能体启动时间仍保持在 2 秒以下
- 用户满意度提高（定制化）
- 社区在 6 个月内构建了 200+ 技能
- 技能成为竞争差异化因素

---

### 案例研究 3: 合规密集型行业

**挑战**：金融服务公司需要智能体遵循经常变化的严格合规规则。

**解决方案**：创建了带有 `allowed-tools` 限制的合规技能：
- `pii-handler`: 如何处理个人身份信息
- `audit-logger`: 所有智能体操作的日志记录要求
- `data-retention`: 数据存储和删除规则

**结果**：
- 以编程方式强制执行合规规则
- 所有智能体操作的审计跟踪
- 规章变更时易于更新
- 通过技能作为证据通过了合规审查

---

## Agent Skills 的未来

Agent Skills 格式是由 Anthropic 开发的**开放标准**，但旨在普遍采用：

- **跨平台**：相同的技能在 Claude Code, Cursor, Copilot, 自定义智能体中均可工作
- **社区驱动**：任何人都可以创建和共享技能
- **不断发展的规范**：社区反馈塑造未来版本

**即将到来**：
- 技能依赖管理
- 技能市场和发现平台
- 自动化技能测试框架
- 与包管理器 (npm, pip, cargo) 集成
- 技能即代码 (程序化技能生成)

---

## 下一步

### 构建你的第一个技能

1. **识别一个工作流**：你的团队重复做什么任务？
2. **创建技能结构**：制作目录，编写 SKILL.md
3. **用你的智能体测试**：它是否正确激活？是否遵循指令？
4. **迭代**：根据实际使用进行改进
5. **分享**：发布到内部注册表或公共仓库

### 了解更多

- **官方规范**: [agentskills.io](https://agentskills.io)
- **技能参考库**: [@anthropic-ai/skills-ref](https://www.npmjs.com/package/@anthropic-ai/skills-ref) (npm)
- **社区技能**: 浏览现有技能以获取灵感

### 相关主题

- [AI 智能体](/zh/tech/patterns/agent/) - 理解智能体架构模式
- [MCP 协议](/zh/integration/protocols/mcp) - 智能体的标准化工具调用
- [提示工程](/zh/tech/prompt/) - 编写更好的技能指令

---

## 总结

**Agent Skills** 通过一种简单、开放的格式解决了 AI 智能体的扩展性问题：

- **渐进式披露**：快速发现，上下文激活，按需执行
- **可移植性**：一个技能，多个平台
- **安全性**：权限边界和沙盒化
- **组织知识**：捕获工作流和最佳实践

**关键要点**：
1. 技能只是带有 SKILL.md 文件 (+ 可选资源) 的文件夹
2. 启动时仅加载元数据，相关时加载完整指令
3. 使用 `allowed-tools` 限制权限
4. 沙盒化脚本执行并对危险操作要求确认
5. 编写清晰的描述以实现良好的任务匹配

**从简单开始**：为你团队重复做的一个工作流创建一个技能。测试它。分享它。迭代。当你建立组织知识库时，技能会变得更有价值。

获胜的智能体将是那些能够通过领域特定知识轻松扩展的智能体。Agent Skills 提供了实现这一点的格式。

## 参考资料

* [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) 理解技能历史
* [最佳实践](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

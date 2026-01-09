# Agent Skills


## What You'll Learn

By the end of this guide, you'll understand:
- What Agent Skills are and why they matter for building extensible agents
- How the progressive disclosure model keeps agents fast and contextual
- How to create, structure, and integrate skills into agent systems
- Security considerations and best practices for production use

**The Big Picture**: Agent Skills is an open format that lets you package specialized knowledge, workflows, and capabilities into portable, reusable modules that any agent can load and use on-demand.


## Why Agent Skills Exist

### The Agent Extensibility Problem

You've built an AI agent. It works great for its core tasks. But now:
- Your team needs it to understand company-specific workflows
- Different users need different specialized capabilities
- You want to add domain expertise without bloating the core system
- You need these capabilities to work across multiple agent platforms

**Traditional Approaches Fall Short**:

| Approach | Problem |
|----------|---------|
| **Hardcode everything** | Slow startup, wasted context on unused features |
| **Custom plugins per platform** | Not portable, duplicated effort |
| **Upload documents** | No structure, no executable logic, poor discoverability |
| **Fine-tuning** | Expensive, static, can't be shared easily |

### The Agent Skills Solution

**Agent Skills** provides a standardized way to extend agents with:
- **Specialized knowledge**: Industry regulations, company policies, technical documentation
- **New capabilities**: Code generation patterns, analysis workflows, integration procedures
- **Repeatable workflows**: Multi-step processes captured as reusable templates
- **Interoperability**: Build once, deploy across multiple agent products

**Core Innovation - Progressive Disclosure**: Skills load in three stages, keeping agents fast while enabling deep context when needed:

1. **Discovery** (startup): Load only name + description (50-100 tokens per skill)
2. **Activation** (when relevant): Load full instructions (<5000 tokens)
3. **Execution** (on-demand): Access bundled scripts and resources as needed

Think of it like this: Your agent has a bookshelf of skills, but only opens the books it needs for the current task.

---

## How Agent Skills Work

### Mental Model: The Skill Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│  User Task: "Review this PR for security issues"            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  DISCOVERY PHASE (Startup)                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ code-review  │  │ sql-expert   │  │ pr-security  │      │
│  │ (50 tokens)  │  │ (50 tokens)  │  │ (50 tokens)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  Agent scans names/descriptions, finds "pr-security" match  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  ACTIVATION PHASE (Task-relevant)                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Load pr-security/SKILL.md                           │   │
│  │ - Full instructions (3000 tokens)                   │   │
│  │ - Security checklist                                │   │
│  │ - Common vulnerability patterns                     │   │
│  │ - Tool permissions: read, grep, bash                │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  EXECUTION PHASE (On-demand)                                │
│  Agent uses skill instructions + accesses resources:        │
│  - references/owasp-top10.md (detailed vulnerability guide) │
│  - scripts/scan-dependencies.sh (automated scanning)        │
│  - templates/security-report.md (standardized output)       │
└─────────────────────────────────────────────────────────────┘
```

**Key Insight**: Most skills remain dormant (discovery phase only). Only task-relevant skills load their full instructions. This keeps context windows clean and agents responsive.



## Creating Your First Skill

Let's build a practical skill step-by-step to understand the format.

### Scenario: Git Commit Message Skill

You want to teach your agent to write excellent commit messages following conventional commits standard.

### Step 1: Create the Directory Structure

```bash
mkdir -p commit-helper
cd commit-helper
```

Every skill is just a folder. That's it. The name of the folder becomes the skill identifier.

**Naming Rules**:
- Lowercase letters and numbers only
- Use hyphens to separate words (not underscores)
- No leading/trailing hyphens
- No consecutive hyphens (`--`)
- Max 64 characters

✅ Good: `commit-helper`, `sql-expert`, `aws-deploy`
❌ Bad: `Commit_Helper`, `-commit`, `commit--helper`, `commit.helper`

### Step 2: Create SKILL.md with Frontmatter

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

\`\`\`
<type>(<scope>): <description>

[optional body]

[optional footer]
\`\`\`

## Examples

Good commit messages:
\`\`\`
feat(auth): add OAuth2 social login support
fix(api): prevent race condition in user creation
docs(readme): update installation instructions
refactor(database): simplify query builder logic
\`\`\`

Bad commit messages (and why):
\`\`\`
Update files          → Too vague, no type/scope
Fixed bug             → What bug? Where?
Added new feature.    → Not imperative, has period, no scope
feat: adding stuff    → Not imperative mood (-ing form)
\`\`\`

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

**What Just Happened?**

- **YAML Frontmatter**: Metadata that agents read during discovery phase
  - `name`: Must match folder name
  - `description`: Used for task matching (make it descriptive!)
  - `allowed-tools`: Restricts what the skill can do (security)
  - `compatibility`: Optional hints about tested platforms

- **Markdown Body**: Full instructions loaded during activation phase
  - Structure it however makes sense for your use case
  - No format restrictions - use headings, lists, code blocks freely
  - Keep under 500 lines; move detailed content to `references/`

### Step 3: Add Reference Materials (Optional)

```bash
mkdir references
```

Create `references/conventional-commits.md`:

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

**Why Use References?**

- Keeps SKILL.md concise (activation phase efficient)
- Agents access references only when needed (execution phase)
- You can include comprehensive documentation without context bloat

### Step 4: Add Scripts (Optional)

```bash
mkdir scripts
```

Create `scripts/analyze-diff.sh`:

```bash
#!/bin/bash
# Analyzes git diff and outputs structured data for commit message generation

git diff --cached --stat
echo "---"
git diff --cached --shortstat
echo "---"
git diff --cached --name-only
```

**Why Use Scripts?**

- Encapsulate complex logic
- Reusable across different agent platforms
- Sandboxed execution (agents can restrict script permissions)

### Step 5: Your Skill is Ready!

```
commit-helper/
├── SKILL.md                        # Required: metadata + instructions
├── references/
│   └── conventional-commits.md     # Optional: detailed docs
└── scripts/
    └── analyze-diff.sh             # Optional: helper scripts
```

**Distribution**:
- Share via Git repository
- Publish to npm/package registries
- Include in agent product's skill marketplace
- Copy directly into user's skill directory

---

## Skill Structure Deep-Dive

### Anatomy of SKILL.md

#### Required Frontmatter Fields

```yaml
---
name: your-skill-name        # Lowercase, hyphens, max 64 chars
description: |               # Max 1024 chars, used for task matching
  What this skill does and when to use it.
  Include keywords that trigger activation.
---
```

**Description Writing Tips**:
- Front-load important keywords
- Include synonyms (e.g., "review" and "analyze")
- Mention specific file types if relevant
- Be specific about what problem it solves

```yaml
# Generic (poor task matching)
description: Helps with databases

# Specific (good task matching)
description: Writes and optimizes PostgreSQL queries, analyzes query performance, suggests indexes. Handles migrations and schema design. Keywords: SQL, postgres, database optimization, EXPLAIN, query planner
```

#### Optional Frontmatter Fields

```yaml
---
license: MIT                 # SPDX license identifier
compatibility:               # Agent platforms tested with
  - claude-code
  - cursor
  - copilot
metadata:                    # Arbitrary key-value pairs
  version: 1.2.0
  author: engineering-team
  tags: [backend, database, performance]
  requires: postgres >= 12
allowed-tools:               # Restrict tool access (security)
  - read
  - grep
  - bash
---
```

**allowed-tools Explained**:

Without `allowed-tools`, agent can use ANY tool. Specify to restrict:

```yaml
# Read-only skill (can't modify files)
allowed-tools:
  - read
  - grep

# Full automation (can run scripts, modify files)
allowed-tools:
  - read
  - write
  - bash
  - edit

# API integration (no filesystem access)
allowed-tools:
  - http-fetch
```

### Markdown Body Guidelines

**Structure for Clarity**:

```markdown
# Skill Name

Brief overview of what this skill does.

## When to Use This Skill

Specific scenarios where this skill applies.

## How to Use This Skill

Step-by-step process the agent should follow.

## Important Rules

Critical constraints or requirements.

## Examples

Input/output examples showing expected behavior.

## Troubleshooting

Common issues and how to resolve them.

## References

Pointers to files in references/ directory.
```

**Writing Style**:
- Use imperative voice ("Analyze the code", not "The agent should analyze")
- Be specific about inputs and outputs
- Include examples of good and bad patterns
- Keep procedural knowledge step-by-step
- Use code blocks for examples

**Length Guidelines**:
- Target: 200-300 lines for SKILL.md
- Maximum: 500 lines
- If longer: Move content to `references/` directory

### Directory Conventions

```
skill-name/
├── SKILL.md              # Required: The skill definition
├── README.md             # Optional: Human documentation
├── scripts/              # Optional: Executable code
│   ├── setup.sh
│   ├── main.py
│   └── utils.js
├── references/           # Optional: Detailed documentation
│   ├── api-spec.yaml
│   ├── examples.md
│   └── troubleshooting.md
├── templates/            # Optional: File templates
│   ├── config.template.json
│   └── report.template.md
└── assets/               # Optional: Other resources
    ├── schema.json
    └── patterns.txt
```

**Path References in SKILL.md**:

Always use **relative paths** from the skill root:

```markdown
For detailed API specification, see references/api-spec.yaml

To generate a report, use templates/report.template.md as a starting point.

Run scripts/setup.sh before first use.
```

Agents resolve these paths relative to the skill directory.

---

## Integrating Skills into Agents

### Approach 1: Filesystem-Based (Simplest)

Agent accesses skills via shell commands:

```javascript
// Agent's skill discovery
const skillsDir = '/path/to/skills';
const skills = [];

for (const dir of fs.readdirSync(skillsDir)) {
  const skillPath = path.join(skillsDir, dir, 'SKILL.md');
  if (fs.existsSync(skillPath)) {
    const content = fs.readFileSync(skillPath, 'utf-8');
    const { data, content: body } = matter(content); // Parse frontmatter

    skills.push({
      name: data.name,
      description: data.description,
      path: skillPath,
      metadata: data
    });
  }
}

// Add to agent's system prompt
const skillsContext = `
Available Skills:
${skills.map(s => `- ${s.name}: ${s.description}`).join('\n')}

To activate a skill, use: cat ${skillsDir}/{skill-name}/SKILL.md
`;
```

**Activation**:

When agent decides a skill is relevant:

```javascript
// Agent executes: cat /skills/commit-helper/SKILL.md
// Output is loaded into context
// Agent now follows skill instructions
```

**Pros**: Simple, works with any agent that has filesystem access
**Cons**: Agent must manage context manually, no access control

### Approach 2: Tool-Based (Recommended for Production)

Provide custom tools for skill operations:

```typescript
// Register skill tools in your agent
agent.registerTool({
  name: 'activate_skill',
  description: 'Load a skill\'s full instructions when relevant to current task',
  parameters: {
    type: 'object',
    properties: {
      skillName: {
        type: 'string',
        description: 'Name of the skill to activate',
        enum: skills.map(s => s.name) // Only allow registered skills
      }
    },
    required: ['skillName']
  },
  execute: async ({ skillName }) => {
    const skill = skills.find(s => s.name === skillName);
    if (!skill) return `Skill ${skillName} not found`;

    // Load full SKILL.md
    const content = fs.readFileSync(skill.path, 'utf-8');
    const { data, content: instructions } = matter(content);

    // Validate tool permissions
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

    // Security: validate path is within skill directory
    const fullPath = path.join(path.dirname(skill.path), resourcePath);
    if (!fullPath.startsWith(path.dirname(skill.path))) {
      return 'Invalid path: must be within skill directory';
    }

    return fs.readFileSync(fullPath, 'utf-8');
  }
});
```

**Agent Workflow**:

1. Agent sees task: "Help me write a commit message"
2. Agent scans skill descriptions in system prompt
3. Agent calls `activate_skill({ skillName: 'commit-helper' })`
4. Agent receives full instructions, follows them
5. If needed, calls `access_skill_resource()` for references

**Pros**: Controlled access, security checks, usage tracking
**Cons**: More implementation complexity

### Approach 3: System Prompt Injection (Claude-Optimized)

For Claude models, inject skill metadata as XML:

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

When a user's request matches a skill's description, activate the skill by running the activation command.
</system>
```

**Why XML for Claude?**

Claude is trained to recognize and parse XML structures effectively. This makes skill metadata easy to reference without confusing it with instructions.

---

## Real-World Skill Examples

### Example 1: API Integration Skill

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

### Example 2: Security Audit Skill

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

### Example 3: Documentation Generator Skill

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

## Security Considerations

### Threat Model

Agent skills can:
- Read sensitive files
- Execute arbitrary code
- Make network requests
- Modify application state

**Risks**:
1. **Malicious skills**: Skill contains harmful code
2. **Skill injection**: User tricks agent into loading malicious skill
3. **Privilege escalation**: Skill bypasses intended restrictions
4. **Data exfiltration**: Skill leaks sensitive information

### Security Best Practices

#### 1. Skill Allowlisting

Only load skills from trusted sources:

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

// Only load trusted skills
if (isSkillTrusted(skillPath)) {
  loadSkill(skillPath);
} else {
  console.warn(`Untrusted skill blocked: ${skillPath}`);
}
```

#### 2. Tool Restrictions

Enforce `allowed-tools` in skill metadata:

```javascript
function activateSkill(skill) {
  const allowedTools = skill.metadata['allowed-tools'];

  if (allowedTools) {
    // Remove tools not in allowlist
    const currentTools = agent.getAvailableTools();
    const restrictedTools = currentTools.filter(t =>
      allowedTools.includes(t.name)
    );
    agent.setAvailableTools(restrictedTools);
  }

  // Load skill instructions
  return skill.instructions;
}
```

#### 3. Script Sandboxing

Execute skill scripts in isolated environments:

```javascript
const { spawn } = require('child_process');

async function executeSkillScript(skillName, scriptPath, args) {
  // Validate script is within skill directory
  const skillDir = `/skills/${skillName}`;
  const fullPath = path.join(skillDir, scriptPath);

  if (!fullPath.startsWith(skillDir)) {
    throw new Error('Invalid script path');
  }

  // Run in sandbox with limited permissions
  return new Promise((resolve, reject) => {
    const proc = spawn('docker', [
      'run',
      '--rm',
      '--network', 'none',           // No network access
      '--read-only',                 // Read-only filesystem
      '--tmpfs', '/tmp',             // Only writable tmpfs
      '--user', 'nobody',            // Non-root user
      '--cpus', '0.5',               // CPU limit
      '--memory', '256m',            // Memory limit
      'skill-sandbox',               // Sandbox image
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

#### 4. User Confirmation

Require approval for dangerous operations:

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

#### 5. Execution Logging

Audit all skill operations:

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

// Usage
logSkillAction('commit-helper', 'activated', { task: 'commit message' });
logSkillAction('commit-helper', 'tool_called', { tool: 'bash', command: 'git diff --cached' });
logSkillAction('commit-helper', 'completed', { success: true });
```

#### 6. Input Validation

Validate skill metadata before loading:

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

## Best Practices

### For Skill Authors

1. **Write Clear Descriptions**
   - Front-load keywords for task matching
   - Be specific about when to use the skill
   - Include synonyms and related terms

2. **Keep Instructions Focused**
   - One skill = one domain/workflow
   - Move detailed content to `references/`
   - Target 200-300 lines for SKILL.md

3. **Provide Examples**
   - Show good and bad patterns
   - Include complete, runnable code
   - Cover edge cases and error handling

4. **Specify Tool Requirements**
   - Use `allowed-tools` to restrict permissions
   - Document why each tool is needed
   - Request minimum necessary permissions

5. **Version Your Skills**
   - Include version in metadata
   - Document breaking changes
   - Use semantic versioning

6. **Test Across Platforms**
   - Test with different agent products
   - Verify tool compatibility
   - Document known limitations

### For Agent Builders

1. **Implement Progressive Disclosure**
   - Load only metadata at startup
   - Activate skills on-demand
   - Cache activated skills for session

2. **Enforce Security Boundaries**
   - Validate all skill metadata
   - Sandbox script execution
   - Require confirmation for dangerous actions
   - Log all skill operations

3. **Provide Good UX**
   - Show which skills are available
   - Indicate when a skill is activated
   - Let users enable/disable skills
   - Display skill permissions clearly

4. **Handle Errors Gracefully**
   - Skill not found → suggest similar skills
   - Tool not allowed → explain restriction
   - Script failed → show error, don't crash

5. **Enable Discoverability**
   - List available skills with descriptions
   - Suggest relevant skills for tasks
   - Provide skill search/filter

### For Teams

1. **Create Organizational Skills**
   - Capture team-specific workflows
   - Document internal APIs and services
   - Encode best practices and standards

2. **Share and Reuse**
   - Publish skills to internal registry
   - Version control skill repositories
   - Review and approve skills before distribution

3. **Maintain Skills**
   - Update when APIs change
   - Improve based on usage feedback
   - Deprecate outdated skills

---

## Validation and Testing

### Validating Skill Format

Use the official skills-ref library:

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

### Testing Skill Activation

```javascript
describe('commit-helper skill', () => {
  it('should activate for commit-related tasks', async () => {
    const agent = new Agent();
    agent.loadSkills('/path/to/skills');

    const response = await agent.processTask(
      'Help me write a commit message for my changes'
    );

    // Check that skill was activated
    expect(agent.activeSkills).toContain('commit-helper');

    // Check that agent used git commands
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

### Testing Skill Execution

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

    // Verify format
    expect(response).toMatch(/^(feat|fix|docs|style|refactor|test|chore)/);
    expect(response).toMatch(/\([a-z]+\):/);
  });
});
```

---

## Advanced Patterns

### Skill Composition

Skills can reference other skills:

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

### Context-Aware Activation

Skills can specify when they should be automatically activated:

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

Agent implementation:

```javascript
function shouldAutoActivate(skill, context) {
  const autoActivate = skill.metadata['auto-activate-on'];
  if (!autoActivate) return false;

  // Check file patterns
  if (autoActivate['file-patterns']) {
    const hasMatchingFiles = context.files.some(file =>
      autoActivate['file-patterns'].some(pattern =>
        minimatch(file, pattern)
      )
    );
    if (hasMatchingFiles) return true;
  }

  // Check keywords
  if (autoActivate.keywords) {
    const taskLower = context.task.toLowerCase();
    if (autoActivate.keywords.some(kw => taskLower.includes(kw))) {
      return true;
    }
  }

  return false;
}
```

### Dynamic Skill Generation

Generate skills programmatically:

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

// Usage: Generate skill from Stripe's OpenAPI spec
const stripeSpec = await fetch('https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.yaml');
generateAPISkill(await stripeSpec.json());
```

---

## Troubleshooting

### Common Issues

**Issue**: Skill not activating when expected

**Diagnosis**:
- Check skill description matches task keywords
- Verify skill is in loaded skills directory
- Enable verbose logging to see discovery phase

**Solution**:
```javascript
// Add debug logging
console.log('Available skills:', agent.skills.map(s => s.name));
console.log('Task:', userTask);
console.log('Matched skills:', agent.findMatchingSkills(userTask));
```

---

**Issue**: Skill instructions not followed correctly

**Diagnosis**:
- Instructions may be ambiguous
- Skill may conflict with agent's base instructions
- Instructions may be too long (>5000 tokens)

**Solution**:
- Make instructions more explicit and step-by-step
- Use numbered lists for sequential processes
- Move detailed content to references
- Test with different task phrasings

---

**Issue**: Script execution fails

**Diagnosis**:
- Script path may be incorrect
- Script may not have execute permissions
- Script may have dependencies not in sandbox

**Solution**:
```bash
# Fix permissions
chmod +x /skills/my-skill/scripts/run.sh

# Verify path in SKILL.md is relative
# ✅ scripts/run.sh
# ❌ /skills/my-skill/scripts/run.sh

# Bundle dependencies in skill directory
```

---

**Issue**: Agent has too many skills loaded (slow startup)

**Diagnosis**:
- Loading all skill instructions at once
- Not implementing progressive disclosure

**Solution**:
```javascript
// Bad: Load everything at startup
skills.forEach(s => loadFullSkill(s));

// Good: Load only metadata
skills.forEach(s => {
  loadedSkills.push({
    name: s.metadata.name,
    description: s.metadata.description,
    path: s.path
  });
});

// Load full instructions only when activated
```

---

## Real-World Case Studies

### Case Study 1: Engineering Team Knowledge Base

**Challenge**: Engineering team had tribal knowledge scattered across wikis, old PRs, and people's heads. New engineers took weeks to ramp up.

**Solution**: Created organizational skills:
- `onboarding-guide`: Setup procedures, tool access, team norms
- `architecture-guide`: System design, service boundaries, data flows
- `deploy-process`: Step-by-step deployment for each environment
- `incident-response`: On-call procedures, runbooks, escalation paths

**Result**:
- New engineer ramp-up time reduced from 4 weeks to 1.5 weeks
- Consistent processes across team
- Knowledge survives team member turnover
- Skills version-controlled alongside code

---

### Case Study 2: Multi-Platform Agent Product

**Challenge**: Agent product needed to support different user workflows (coding, writing, data analysis) without bloating core system.

**Solution**: Implemented skill marketplace:
- Core agent shipped with 5 essential skills
- Users could browse and install additional skills
- Community contributed specialized skills
- Progressive disclosure kept agent fast

**Result**:
- Agent startup time stayed under 2 seconds despite 100+ available skills
- User satisfaction improved (customization)
- Community built 200+ skills in first 6 months
- Skills became competitive differentiator

---

### Case Study 3: Compliance-Heavy Industry

**Challenge**: Financial services company needed agents to follow strict compliance rules that changed frequently.

**Solution**: Created compliance skills with `allowed-tools` restrictions:
- `pii-handler`: How to work with personally identifiable information
- `audit-logger`: Logging requirements for all agent actions
- `data-retention`: Rules for data storage and deletion

**Result**:
- Compliance rules enforced programmatically
- Audit trail for all agent operations
- Easy to update when regulations changed
- Passed compliance review with skills as evidence

---

## The Future of Agent Skills

The Agent Skills format is an **open standard** developed by Anthropic but designed for universal adoption:

- **Cross-platform**: Same skill works in Claude Code, Cursor, Copilot, custom agents
- **Community-driven**: Anyone can create and share skills
- **Evolving specification**: Community feedback shapes future versions

**What's Coming**:
- Skill dependency management
- Skill marketplaces and discovery platforms
- Automated skill testing frameworks
- Integration with package managers (npm, pip, cargo)
- Skills as code (programmatic skill generation)

---

## Next Steps

### Build Your First Skill

1. **Identify a workflow**: What repetitive task does your team do?
2. **Create skill structure**: Make directory, write SKILL.md
3. **Test with your agent**: Does it activate correctly? Follow instructions?
4. **Iterate**: Improve based on real usage
5. **Share**: Publish to internal registry or public repo

### Learn More

- **Official Specification**: [agentskills.io](https://agentskills.io)
- **Skills Reference Library**: [@anthropic-ai/skills-ref](https://www.npmjs.com/package/@anthropic-ai/skills-ref) (npm)
- **Community Skills**: Browse existing skills for inspiration

### Related Topics

- [AI Agents](/tech/agent/) - Understand agent architecture patterns
- [MCP Protocol](/tech/MCP) - Standardized tool calling for agents
- [Prompt Engineering](/tech/prompt/) - Write better skill instructions

---

## Summary

**Agent Skills** solve the extensibility problem for AI agents through a simple, open format:

- **Progressive Disclosure**: Fast discovery, contextual activation, on-demand execution
- **Portability**: One skill, multiple platforms
- **Security**: Permission boundaries and sandboxing
- **Organizational Knowledge**: Capture workflows and best practices

**Key Takeaways**:
1. Skills are just folders with a SKILL.md file (+ optional resources)
2. Load only metadata at startup, full instructions when relevant
3. Use `allowed-tools` to restrict permissions
4. Sandbox script execution and require confirmation for dangerous actions
5. Write clear descriptions for good task matching

**Start Simple**: Create a skill for one workflow your team does repeatedly. Test it. Share it. Iterate. Skills become more valuable as you build a library of organizational knowledge.

The agents that will win are those that can be easily extended with domain-specific knowledge. Agent Skills provides the format to make that happen.

##  references

* [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) understand the skill history
* [best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
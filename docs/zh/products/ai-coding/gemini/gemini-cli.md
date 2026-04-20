# Gemini CLI

## 基础用法

1. 按照 [Gemini CLI](https://geminicli.com/docs/get-started/) 安装并登录 Gemini CLI，不同平台的详细安装说明请参阅 [安装](https://geminicli.com/docs/get-started/installation/)。
2. 认证 CLI，阅读 [认证](https://geminicli.com/docs/get-started/authentication/) 选择一种方式。

### 日常使用

```bash

# 仅在 CLI 中使用 LLM
gemini -p 'your prompt here' # gemini 将在终端输出结果

# 读取图像并在 CLI 中使用 LLM
gemini -p 'rename your image files'

# 帮助你理解代码
gemini -p "Clone the 'chalk' repository from https://github.com/chalk/chalk, read its key source files, and explain how it works."

# 通用脚本工具包
# Revenue - 2023.csv 和 Revenue - 2024.csv
gemini -p "Summarize the revenue growth of the company from 2023 to 2024."

```

### [快捷键](https://geminicli.com/docs/cli/keyboard-shortcuts/)

| 按键 | 功能 |
|---|---|
| `enter` | 确认并运行命令 |
| `esc` | 退出模式 |
| `ctrl+a` | 移至行首 |
| `ctrl+e` | 移至行尾 |
| `ctrl+k` | 删除当前光标到行尾的内容 |
| `ctrl+u` | 删除当前光标到行首的内容 |
| `ctrl+c` | 删除当前输入 |
| `ctrl+backspace` | 删除当前光标左侧字符 |
| `Command+backspace` | 删除当前行 |
| `ctrl+l` | 清屏 |
| `ctrl+p` | 上一条命令 |
| `ctrl+n` | 下一条命令 |
| `ctrl+r` | 搜索历史命令 |


### 特性

Gemini 支持多种特性。


| 特性 | 描述 |
|:---|:---|
| command | 支持运行子命令 |
| checkpoint | 支持运行检查点 (checkpoint) |

## 命令

Gemini 支持多种命令，你可以使用 `/` 或 `@` 进入子命令。
所有命令列表请参见 [Commands](https://geminicli.com/docs/cli/commands/)

### 内置命令

#### `/chat`

用于分割聊天上下文。

1. `/chat save <tag>` 保存聊天
2. `/chat resume <tag>` 恢复聊天
3. `/chat delete <tag>` 删除聊天
4. `/chat list ` 列出所有聊天
5. `/chat share xx.md` 分享此聊天文件

聊天保存在：

* `~/.gemini/tmp/<project_hash>/` (Linux/macOS)
* `C:\Users\<YourUsername>\.gemini\tmp\<project_hash>\` (Windows)

你可以结合 `/compress` 命令来压缩聊天文件。


#### `/directory`

对于多根目录项目，使用 `/project` 命令添加项目。

1. `/directory add <path>` 添加目录
2. `/directory add <path1>,<path2>` 添加多个目录
3. `/directory show` 列出所有已添加的目录

#### `/clear`

清除显示，快捷键是 `control+c`。

#### `/stats`

显示统计信息，结果如下：

```bash
Session Stats                                                                                                                        │
│                                                                                                                                       │
│  Interaction Summary                                                                                                                  │
│  Session ID:                 8712b7bb-a1f6-4efb-837b-ef1fc6e5fc9d                                                                     │
│  Tool Calls:                 7 ( ✓ 6 x 1 )                                                                                            │
│  Success Rate:               85.7%                                                                                                    │
│  User Agreement:             85.7% (7 reviewed)                                                                                       │
│                                                                                                                                       │
│  Performance                                                                                                                          │
│  Wall Time:                  2h 42m 46s                                                                                               │
│  Agent Active:               13m 49s                                                                                                  │
│    » API Time:               1m 31s (11.1%)                                                                                           │
│    » Tool Time:              12m 17s (88.9%)                                                                                          │
│                                                                                                                                       │
│                                                                                                                                       │
│  Model Usage                 Reqs                  Usage left                                                                         │
│  ────────────────────────────────────────────────────────────                                                                         │
│  gemini-2.5-flash-lite          3   95.4% (Resets in 13h 25m)                                                                         │
│  gemini-3-pro-preview           7    0.0% (Resets in 13h 25m)                                                                         │
│  gemini-3-flash-preview         1   93.9% (Resets in 14h 18m)                                                                         │
│  gemini-2.5-flash               -   95.4% (Resets in 13h 25m)                                                                         │
│  gemini-2.5-pro                 -    0.0% (Resets in 13h 25m)                                                                         │
│                                                                                                                                       │
│  Usage limits span all sessions and reset daily.                                                                                      │
│  /auth to upgrade or switch to API key.                                                                                               │
│                                                                                                                                       │
│                                                                                                                                       │
│  » Tip: For a full token breakdown, run `/stats model`.  

```

#### `@` 命令

你可以使用 `@` 命令添加文件上下文。

#### `!<shell_command>`

你可以在任何 Shell 命令前添加 `!` 前缀来运行它。

输入 `!` 切换 Gemini 为 Shell 模式，在沙盒中运行命令。使用 `esc` 退出 Shell 模式。
在此模式下，你可以使用 `GEMINI_CLI=1` 检查沙盒。

### [自定义命令](https://geminicli.com/docs/cli/custom-commands/)

你可以使用自定义命令保存你的提示词模板。

1. `~/.gemini/commands` 这是针对所有项目的用户自定义命令
2. `.gemini/commands` 这是项目自定义命令，如果有同名命令将覆盖用户命令


1. `~/.gemini/commands/test.toml` 将创建 `/test` 命令
2. `<project>/.gemini/commands/git/commit.toml` 将创建 `/git:commit` 命令


TOML 模板如下所示：

```toml
# 描述命令的注释
# 调用方式: /changelog 1.2.0 added "Support for default argument parsing."

# description 可选配置，描述此命令
description = "Adds a new entry to the project\'s CHANGELOG.md file."
# prompt 必填
prompt = """
# Task: Update Changelog

You are an expert maintainer of this software project. A user has invoked a command to add a new entry to the changelog.

**The user\'s raw command is appended below your instructions.**

Your task is to parse the `<version>`, `<change_type>`, and `<message>` from their input and use the `write_file` tool to correctly update the `CHANGELOG.md` file.

## Expected Format
The command follows this format: `/changelog <version> <type> <message>`
- `<type>` must be one of: "added", "changed", "fixed", "removed".

## Behavior
1. Read the `CHANGELOG.md` file.
2. Find the section for the specified `<version>`.
3. Add the `<message>` under the correct `<type>` heading.
4. If the version or type section doesn\'t exist, create it.
5. Adhere strictly to the "Keep a Changelog" format.
"""

```

在配置文件中，支持以下符号：

| 符号 | 功能 | 演示 |
|:---|---|---:|
| `{{args}}` | 将替换为命令后的用户输入 | `prompt = "Please provide a code fix for the issue described here: {{args}}."` |
| `!{}` | 运行 Shell 命令 | `prompt = "Please summarize the findings for the pattern `{{args}}`"`, 你可以在 Shell 命令中使用 `{{args}}` |
| `@{file}` | 添加文件上下文 | `prompt = "You are an expert code reviewer.@{docs/best-practices.md}"` |


## [会话 (Session)](https://geminicli.com/docs/cli/session-management/#listing-sessions)


每次使用 Gemini 都会创建一个会话。会话保存你的对话信息，如提示词、模型响应等。
会话保存在 `~/.gemini/tmp/<projext_hash>/chats/<session_hash>`。

you can list and enter history session.

```bash
# 列出当前目录相关会话
gemini --list-sessions
# 进入当前目录的最新会话
gemini --resume
# 按索引进入当前目录的会话
gemini -resume 2
# 按哈希进入当前目录的会话
gemini -resume  <hash>
# 删除当前目录的会话
gemini --delete-session 2
```

在 Gemini CLI 中，你也可以使用 `/session` 命令列出并进入会话。


### 会话配置

你可以配置会话：

```json
{
  "general": {
    "sessionRetention": {
      "enabled": true, // 会话清理开关默认为 false
      "maxAge": "30d", // 使能清理后，最多保存 30d
      "maxCount": 50, // 最多保留最近 50 个会话
      "minRetention": "1d" // 最短保留期限，小于此日期不会被删除，默认 1d
    }
  }
}

```

为了避免会话过长，你可以设置：

```json
{
  "model": {
    "maxSessionTurns": 100 // 一个 session 最多允许 100 次聊天， 默认 `-1` 表示不限制
  }
}
```


## [检查点 (Checkpoint)](https://geminicli.com/docs/cli/checkpointing/)

此特性默认禁用，编辑设置以开启它。

```json
{
  "general": {
    "checkpointing": {
      "enabled": true
    }
  }
}
```

每次更改都会保存为一个点。

```bash
# 列出所有检查点
/restore

# 恢复特定文件
/restore 2025-06-22T10-00-00_000Z-my-file.txt-write_file
```



## [无头模式 (Headless Mode)](https://geminicli.com/docs/cli/headless/)

通常我们使用交互模式的 Gemini CLI，但像 `gemini -p <prompt>` 是无头模式，只是让 Gemini 运行提示词。

你可以将其与自动化工具结合使用，例如 `gemini -p "What is the capital of France?" --output-format json` 解析输出内容以运行自动化。格式请参见 [JSON 输出](https://geminicli.com/docs/cli/headless/#example-usage)。

对于长时间任务支持流式输出，请参见 [流式 JSON](https://geminicli.com/docs/cli/headless/#example-usage) 了解更多。


无头模式的一些用例，参考 [示例](https://geminicli.com/docs/cli/headless/#examples)：

```bash
# 代码审查
cat src/auth.py | gemini -p "Review this authentication code for security issues" > security-review.txt

# 生成提交信息
result=$(git diff --cached | gemini -p "Write a concise commit message for these changes" --output-format json)
echo "$result" | jq -r '.response'

# API 文档
result=$(cat api/routes.js | gemini -p "Generate OpenAPI spec for these routes" --output-format json)
echo "$result" | jq -r '.response' > openapi.json

# 批量代码分析
for file in src/*.py; do
    echo "Analyzing $file..."
    result=$(cat "$file" | gemini -p "Find potential bugs and suggest improvements" --output-format json)
    echo "$result" | jq -r '.response' > "reports/$(basename "$file").analysis"
    echo "Completed analysis for $(basename "$file")" >> reports/progress.log
done

# 日志分析
grep "ERROR" /var/log/app.log | tail -20 | gemini -p "Analyze these errors and suggest root cause and fixes" > error-analysis.txt


# 模型和工具使用跟踪
result=$(gemini -p "Explain this database schema" --include-directories db --output-format json)
total_tokens=$(echo "$result" | jq -r '.stats.models // {} | to_entries | map(.value.tokens.total) | add // 0')
models_used=$(echo "$result" | jq -r '.stats.models // {} | keys | join(", ") | if . == "" then "none" else . end')
tool_calls=$(echo "$result" | jq -r '.stats.tools.totalCalls // 0')
tools_used=$(echo "$result" | jq -r '.stats.tools.byName // {} | keys | join(", ") | if . == "" then "none" else . end')
echo "$(date): $total_tokens tokens, $tool_calls tool calls ($tools_used) used with models: $models_used" >> usage.log
echo "$result" | jq -r '.response' > schema-docs.md
echo "Recent usage trends:"
tail -5 usage.log

```



## 配置

使用 Gemini Config 控制 Gemini CLI 的行为。
详情请阅读 [Gemini CLI 配置](https://geminicli.com/docs/get-started/configuration-v1/)。
支持的详细列表参考 [JSON Schema](https://github.com/google-gemini/gemini-cli/blob/main/schemas/settings.schema.json)。

### 配置层级

Gemini 支持多个配置层级，详情参见 [配置层级](https://geminicli.com/docs/get-started/configuration/#configuration-layers)。

常用路径：

1. 系统默认配置
   - **位置** 使用 `GEMINI_CLI_SYSTEM_DEFAULTS_PATH` 自定义路径
     - **Linux** `/etc/gemini-cli/system-defaults.json`
     - **Windows** `C:\ProgramData\gemini-cli\system-defaults.json`
     - **macOS** `/Library/Application Support/GeminiCli/system-defaults.json`
   - **范围**
     - 提供系统范围的默认设置基础层。这些设置优先级最低，旨在被用户、项目或系统覆盖设置所覆盖。
2. 用户配置: `~/.gemini/settings.json` 将覆盖系统配置
3. 项目配置: `.gemini/settings.json` 将覆盖用户配置
4. 系统设置
   - **位置** 使用 `GEMINI_CLI_SYSTEM_SETTINGS_PATH` 自定义路径
     - **Linux** `/etc/gemini-cli/settings.json`
     - **Windows** `C:\ProgramData\gemini-cli\settings.json`
     - **macOS** `/Library/Application Support/GeminiCli/settings.json`
   - **范围**
     - 系统管理员控制 Gemini CLI 行为。覆盖所有其他配置层

you can use `$VAR_NAME` 或 `${VAR_NAME}` 在你的配置文件中。某些配置支持目录请参阅 [沙盒配置](https://geminicli.com/docs/get-started/configuration/#sandboxing) 了解更多。

### 设置配置

你可以直接修改配置文件，或使用 `/settings` 命令设置配置。
设置列表在 [Settings](https://geminicli.com/docs/cli/settings/) 中。


### [系统提示词 (System Prompt)](https://geminicli.com/docs/cli/system-prompt/)

你可以设置 `.gemini/.env` 文件来设置 [持久化环境变量](https://geminicli.com/docs/get-started/authentication/#persisting-environment-variables)。

you can use `GEMINI_SYSTEM_MD=true` 或 `GEMINI_SYSTEM_MD=1` to set system prompt.
CLI 将读取 `.gemini/system.md` 文件来设置系统提示词。

或者设置 `GEMINI_SYSTEM_MD=/absolute/path/to/my-system.md` 来设置系统提示词。

当 GEMINI_SYSTEM_MD 激活时，CLI 会在 UI 中显示 `|⌐■_■|` 指示器，以提示自定义系统提示词模式。


`SYSTEM.md` 和 `GEMINI.md` 的区别是：

1. `system.md` 针对所有项目或团队，不可协商的操作规则：安全性、工具使用协议、批准以及保持 CLI 可靠的机制。
2. `gemini.md` 角色、目标、方法论和项目/领域上下文。随任务演变；依赖 SYSTEM.md 进行安全执行。


### 主题配置

你可以使用 `/theme` 命令设置主题。详情参见 [主题](https://geminicli.com/docs/cli/themes/)。


### [设置信任文件夹](https://geminicli.com/docs/cli/trusted-folders/)

信任文件夹使 Gemini 可以读取你的文件。详情参见 [为什么信任很重要](https://geminicli.com/docs/cli/trusted-folders/#why-trust-matters-the-impact-of-an-untrusted-workspace)。

you can use enable this feature

```json
{
  "security": {
    "folderTrust": {
      "enabled": true
    }
  }
}
```

设置后，`~/.gemini/trustedFolders.json` 可以看到你的信任文件夹。
请注意，只有项目作为受信任文件夹时，项目设置（如 `.gemini/settings.json`）和自定义命令才能工作！！！！

## [MCP](https://geminicli.com/docs/tools/mcp-server/)

### [设置 MCP](https://geminicli.com/docs/cli/tutorials/#setting-up-a-model-context-protocol-mcp-server)

阅读 [Github MCP](https://github.com/github/github-mcp-server/blob/main/docs/installation-guides/install-gemini-cli.md)。

设置之前，请确保已创建 GitHub Token。

1. 安装 Github MCP 扩展

    ```bash
    gemini extensions install https://github.com/github/github-mcp-server
    ```
2. 在 Gemini 中使用 `/mcp` 列出已安装的 MCP

### 有用的 MCP 

* [chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)



## [工具 (Tools)](https://geminicli.com/docs/core/tools-api/)

Gemini 使用工具帮助 LLM 更好地理解你的任务。一些内置工具如下：


| 类别 | 工具 | 描述 |
|:---|:---|:---|
| Files | LSTool | 列出目录内容 |
|| ReadFileTool | 读取文件 |
|| WriteFileTool | 写入内容到文件 |
|| GrepTool | 在文件中搜索模式 |
|| GlobTool | 查找匹配模式的文件 |
|| EditTool | 执行文件修改 |
|| ReadManyFilesTool | 读取并连接多个文件或 Glob 模式的内容，在 CLI 中使用 `@` |
| Execution | ShellTool | 执行 Shell 命令 |
| Web Tools | WebFetchTool | 网络获取 |
|| WebSearchTool | 网络搜索 |
| Memory tools | MemoryTool | 与记忆交互 |


you can call tools with `<tool_name>(<args>)`

detail read [tools](https://geminicli.com/docs/tools/)
    
### [扩展自定义工具](https://geminicli.com/docs/core/tools-api/#extending-with-custom-tools)

关于工具规则，你可以阅读 [策略引擎](https://geminicli.com/docs/core/policy-engine/)



## 用例

### 模式

使用 `!` 切换 Gemini 为 Shell 模式，使用 `esc` 退出。

### 连接到 Cursor

连接 IDE 后，你可以使用 IDE 查看 Gemini 修改的内容。

1. 打开 Cursor
2. 安装 [Gemini CLI Companion](https://open-vsx.org/extension/Google/gemini-cli-vscode-ide-companion)
3. 运行 `gemini`
4. 输入 `/ide install` 


## 其他

you can run gemini cli in safe mode ,this called sandbox, when gemini run in yolo mode will default use sandbox mode. read [sandboxing](https://geminicli.com/docs/get-started/configuration/#sandboxing) for more detail. in cli read [sandbox](https://geminicli.com/docs/cli/sandbox/) use `-s` to enable sandbox mode. 


for enterprise user, read [enterprise](https://geminicli.com/docs/cli/enterprise/) to learn more. you also can use [telemetry](https://geminicli.com/docs/cli/telemetry/) to know more metrics.

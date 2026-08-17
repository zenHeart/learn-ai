# Cowork: The Complete Guide

> Cowork is a built-in **desktop agent mode** in Claude Desktop that lets Claude directly read and write your local files, control applications, and execute automated tasks. It's an evolution of the claude.ai conversation mode — upgraded from "helping you think" to "helping you do."

## What Is Cowork

Cowork is not chat, but a **task execution agent**. Key differences:

| | Claude.ai Conversation Mode | Cowork Agent Mode |
|--|:--:|:--:|
| File Access | Manual upload required | Direct read/write local files |
| Task Length | Single-turn conversation | Long-running complex tasks |
| Automation | Not supported | Supports scheduled execution |
| Output | Text/code | Excel, PPT, documents, emails, etc. |
| Multi-tasking | Serial conversations | Parallel workflow decomposition |

**Target Audience**: Pro, Max, Team, and Enterprise paid users, requires Claude Desktop installation (macOS / Windows).

---

## Core Capabilities

### Direct Local File Access
Claude can read and write folders you authorize, no manual upload or download needed. Typical scenarios:
- Organize documents in your Downloads folder
- Read local CSV and generate analysis reports
- Batch rename files
- Read code directories and generate technical documentation

### Professional Document Generation
Cowork has built-in document skills, directly generating and saving locally:
- **Excel spreadsheets**: Data analysis, financial models, Gantt charts
- **PowerPoint presentations**: Auto-layout, embedded charts
- **Word documents**: Reports, contracts, manuals
- **PDF**: Merge, split, fill forms

### Task Decomposition and Parallelism
Claude breaks complex work into sub-tasks and coordinates execution. For example, "analyze all meeting records from last quarter, extract key decisions, generate summary report" decomposes to: read files → analyze individually → aggregate and integrate → write output file.

### Scheduled Task Execution
Create tasks that run automatically by frequency, such as daily briefings, weekly summaries, periodic file organization.

---

## Quick Start

### Step 1: Install and Open Claude Desktop

Download links:
- [macOS](https://claude.ai/api/desktop/darwin/universal/dmg/latest/redirect)
- [Windows x64](https://claude.ai/api/desktop/win32/x64/exe/latest/redirect)

After installation, log in to your Claude Pro account.

### Step 2: Switch to Cowork Mode

After opening Claude Desktop, switch to the **Cowork** tab in the top tab bar (alongside regular chat tabs).

### Step 3: Authorize Folders

On first execution of file-related tasks, Cowork will request permission to access specific folders. Recommendations:
- Only authorize directories you need to operate (don't authorize entire disk)
- Avoid authorizing directories containing passwords, keys, or financial credentials

### Step 4: Describe Your Task

Describe the work to be completed in natural language:

```
Help me read all .docx files in ~/Downloads/meeting-notes/ folder,
extract "action items" from each file, summarize into an Excel spreadsheet,
save as ~/Documents/action-items.xlsx
```

Claude will display an execution plan, and after confirmation, begin running.

---

## Scheduled Task Automation

### ⚠️ Two Task Types, One Critical Difference

| | Desktop Scheduled Tasks | Cloud Scheduled Tasks |
|--|:--:|:--:|
| **Runtime Environment** | Your computer | Anthropic cloud servers |
| **Runs When Computer Off?** | ❌ Must be on | ✅ Runs anytime |
| **Access Local Files?** | ✅ Direct access | ❌ Cloud only |
| **Creation Entry** | Cowork sidebar | claude.ai/code or /schedule |
| **Best For** | Tasks involving local files | Tasks independent of local files |

**Desktop tasks**: Computer must be awake and Claude Desktop open. If asleep, tasks are skipped (not made up).

**Cloud tasks**: Run on Anthropic-managed servers, available 24/7, suitable for automation that doesn't need local files.

### What Are Scheduled Tasks

Scheduled tasks are saved prompts + execution plans that can run automatically by frequency, or be triggered manually on demand.

### Common Use Cases

- **Daily briefing**: Summarize past 24 hours of emails and calendar events, generate today's to-do list
- **Weekly report organization**: Every Friday, organize weekly work logs into a structured report
- **Periodic research**: Daily track specific industry news, generate summary files
- **File organization**: Weekly sort and clean specified folders
- **Data updates**: Periodically pull data and update Excel reports

### Method 1: The /schedule Command

In any Cowork task conversation, enter `/schedule`, and Claude will guide you through creation:

```
/schedule
```

Claude will ask: task name, execution frequency, whether to bind to specific folders, etc.

### Method 2: From the Scheduled Tasks Page

1. Click **Scheduled Tasks** in the left sidebar
2. Click **+ New Task** in the top right
3. Fill the form:

| Field | Description |
|------|-------------|
| Task Name | Recognizable name, such as "Daily Work Briefing" |
| Description | Brief explanation of task purpose |
| Execution Prompt | Complete instruction Claude receives each run |
| Run Frequency | Hourly / Daily / Weekly / Workdays / Manual |
| Model Selection | Default Claude Sonnet, complex tasks can choose Opus |
| Working Folder | Optional, bind to specific directory |

### Managing Scheduled Tasks

- **Manual trigger**: Click run button next to task to execute once immediately
- **Pause/resume**: Toggle task's enabled status
- **View history**: Click task to view past run records and outputs

---

## Plugin System

### What Are Plugins

Plugins are extension packages that bundle **Skills + Connectors + Agents** together. Install once to gain a complete set of specialized capabilities without configuring each individually.

For example, after installing a "Financial Analysis" plugin, Claude gains:
- Skills for reading financial statements
- Connectors for specific financial APIs
- Sub-agents specialized for financial analysis

### Installing Plugins

1. Open Claude Desktop, switch to Cowork tab
2. Click **Customize** menu in the left sidebar
3. Select **Browse Plugins** to view available options
4. Click **Install** to complete deployment

You can also upload local custom plugin files (`.skill` format).

### Using Plugin Skills

After installing plugins, in Cowork task conversations:
- Type `/` to view all available skills list
- Click `+` button to browse and invoke skills
- Describe task directly, and Claude will automatically match appropriate skills

### Customizing Plugins

Click the **Customize** button next to an installed plugin to collaborate with Claude in adjusting the plugin's prompts, skills, and connector configurations to better fit your workflow.

### Building Your Own Plugins

Cowork includes a built-in **Plugin Creator** plugin to guide you building from scratch:

```
/plugin-create
```

Follow the guide: plugin name → skill definition → connector configuration → test verification → export and share.

---

## The Claude Desktop Code Tab (Claude Code)

Beyond Cowork, Claude Desktop has a **Code tab** — the graphical interface for Claude Code aimed at developers, providing more visual capabilities than the terminal CLI:

| Feature | Description |
|---------|-------------|
| **Visual Diff Review** | Visually review code changes, supports inline comments |
| **App Live Preview** | Start dev server, preview effects in sidebar in real time |
| **PR Monitoring** | Real-time CI status viewing, enable Auto-fix for Claude to auto-repair |
| **Parallel Sessions** | Multiple Claude instances handle different tasks simultaneously, Git worktree auto-isolation |
| **Dispatch** | Send tasks from mobile, desktop auto-creates session to execute |
| **Connectors** | Connect to external services like GitHub, Slack, Linear |
| **SSH Sessions** | Connect to dev environments on remote servers |
| **Cloud Sessions** | Start long-running tasks on Anthropic cloud (runs even when computer is off) |

> Cowork (task agent) and Code (programming agent) are two parallel tabs in Claude Desktop, serving different use cases.

---

## Computer Use

### What Is Computer Use

Computer Use enables Claude to **operate your computer like a human** — controlling mouse, keyboard, viewing screen, thereby operating any desktop app and browser, even without API interfaces.

Typical scenarios:
- Search in browser, fill forms, extract information
- Operate desktop software like Excel, Word
- Transfer data between apps (e.g., extract data from email and fill into CRM)

### How to Enable

In Claude Desktop settings, go to **Desktop App → Computer Use** to enable.

**Note**: After enabling, Claude will request separate permission before accessing each app; you can selectively authorize.

### Security Boundaries

Computer Use has elevated permissions; recommendations:
- Carefully review Claude's operation plan before execution
- Don't use in apps involving online banking, password managers, etc.
- Monitor task process, can interrupt anytime

---

## Cross-App Collaboration

### Dispatching Tasks from Anywhere

Cowork supports initiating tasks without opening Claude Desktop:

**Method 1**: Through Claude's shortcut or global menu, send tasks to Cowork queue from any app; Claude Desktop will receive and execute in the background.

**Method 2 (Claude in Chrome)**: After installing Chrome extension, select text on any browser page and send to Cowork with one click. Also supports directly controlling browser automation tasks from Chrome extension.

**Claude in Chrome connection**: After enabling Chrome connector in Claude Desktop, directly control browser from desktop to complete tasks without switching windows.

Use cases:
- See article in browser → Select text → Send to Cowork → Claude summarizes and saves
- See PR on GitHub → Directly have Cowork review code
- Receive email notification → Cowork auto-extracts tasks and creates in Linear

### Claude in Chrome Extension (Working with Cowork)

Chrome extension provides browser superpowers to Cowork:
- **Workflow recording**: Demonstrate operation steps once, Claude learns and auto-repeats
- **Scheduled tasks**: Set browser tasks to auto-run daily/weekly/monthly
- **Console log reading**: Directly identify and debug issues in browser
- **Multi-tab management**: Claude can manage multiple tabs simultaneously, process information uniformly

After installation, click Claude icon in Chrome toolbar to open side panel, working in sync with browsing.

### Cross-App Workflow Examples

```
Scenario: Summarize all meeting commitments from this week's emails into a calendar file

Claude execution steps:
1. Access email client (Computer Use) to read this week's emails
2. Identify meeting info containing time, location, participants
3. Organize into structured data
4. Write to local calendar file or generate .ics file
```

---

## Safe Usage Guide

Cowork has permission to access your local files and apps. Please understand the following security principles.

### Anthropic's Safeguards

- **Injection attack protection**: Claude is trained to identify and reject deceptive instructions from malicious content
- **Content classification**: Automatically scan untrusted content and flag potential risks
- **Deletion protection**: Must obtain your explicit permission before permanently deleting files
- **Per-app authorization**: Computer Use requests separate permission before accessing each app

### What You Should Do

**Selective authorization**: Only grant Claude access to necessary folders, avoid authorizing directories with financial information or login credentials.

**Monitor tasks**: Watch for unexpected behavior — is Claude accessing files or websites you didn't mention?

**Careful with scheduled tasks**:
- Start with simple tasks, gradually expand
- Don't automate tasks involving sensitive data or irreversible operations (like sending emails, deleting files)
- Manually run a few times to confirm correct results before enabling auto-scheduling

**Limit browser access**: Network content is the primary vector for prompt injection; restrict Computer Use's browser access to trusted websites.

**Review plugin permissions**: Carefully read permission requests before installing plugins; only install plugins from trusted sources.

### Your Responsibility Boundary

> You bear final responsibility for all operations Claude performs on your behalf, including published content, generated transactions, and modified data.

---

## FAQ

**Q: Do I need to keep watching while Cowork tasks execute?**

No. You can set a task and leave; Claude will execute in the background. You'll be notified when done to view results. However, for high-risk operations (like batch deletion, sending emails), manual confirmation is recommended.

**Q: What if my computer is off when a scheduled task should run?**

The task will be skipped and run normally at the next trigger time. It won't "make up" missed runs (e.g., if you're away for 3 days, daily tasks won't run 3 times at once).

**Q: What's the difference between Cowork and Claude Code?**

| | Cowork | Claude Code |
|--|:--:|:--:|
| Primary Users | Non-developers/general users | Developers |
| Operation Targets | Files, apps, browsers | Codebases, terminals, Git |
| Interface | Claude Desktop GUI | Terminal/IDE |
| Automation Method | Scheduled tasks | Headless mode/CI |

**Q: Can plugin connectors access services behind firewalls?**

Standard connectors connect via Anthropic cloud services; custom connectors need to point to publicly accessible servers. Internal network services require separate configuration per network requirements docs.

---

## Resources

- [Official Docs: Getting Started with Cowork](https://support.claude.com/en/articles/13345190)
- [Using Cowork Safely](https://support.claude.com/en/articles/13364135)
- [Using Plugins in Cowork](https://support.claude.com/en/articles/13837440)
- [Scheduling Recurring Tasks](https://support.claude.com/en/articles/13854387)
- [Cross-App Collaboration](https://support.claude.com/en/articles/13892150)

# Connectors

> Connectors let Claude connect directly to your apps and services—reading data, executing actions, triggering workflows—all within conversation, without switching tools. This is the core capability that elevates Claude from "Q&A assistant" to "execution agent."

## What Are Connectors

A Connector is an authorization channel between Claude and an external service. Once connected, you can ask Claude directly in conversation to:

- Search emails and draft replies in Gmail
- Check availability and create meetings in Google Calendar
- Create or update pages in Notion
- File issues and view PRs in Linear / GitHub
- Send messages and search history in Slack

**Underlying implementation**: Connectors are built on [Remote MCP (Model Context Protocol)](https://code.claude.com/docs/en/mcp). Each connector is essentially an MCP server running in the cloud, exposing a set of tools to Claude.

**Availability**: claude.ai web version, iOS/Android App, Claude Desktop (Cowork and Code tabs), Claude Code CLI, API.

---

## Connector Types

### Pre-built Connectors

Officially built-in, one-click authorization, ready to use. 50+ connectors available, covering these categories:

| Category | Representative Services | Core Capabilities |
|----------|----------------------|-------------------|
| **Google Workspace** | Gmail, Google Calendar, Google Drive | Read emails/draft, check schedule/create meetings, search files |
| **Microsoft 365** | Outlook, Teams, SharePoint, OneDrive | Search emails/docs, view meetings, browse Teams messages |
| **Project Management** | Linear, Asana, Jira, Notion | Create/query issues, update tasks, search pages |
| **Code Hosting** | GitHub | View PRs, search code, create issues |
| **Communication** | Slack | Send messages, search history, read channels |
| **Design Tools** | Canva, Figma | View design files (some support interactive rendering) |
| **CRM / Sales** | Salesforce, HubSpot | Query records, update contacts |

> **Interactive marker**: Some connectors support rendering dynamic interfaces directly in conversation (kanban boards, dashboards, design previews), not just text responses.

### Custom Connectors (Remote MCP)

If your tool doesn't have a pre-built connector, you can build one yourself:

1. Develop an MCP protocol-compliant server (supports HTTP + SSE)
2. Deploy to a **publicly accessible** address (Anthropic cloud needs to reach it)
3. Enter your MCP Server URL and OAuth credentials in Claude settings
4. Use your custom tools in conversation

> For internal services, add Anthropic's egress IPs to your firewall whitelist. See [Remote MCP development docs](https://code.claude.com/docs/en/mcp).

---

## Quick Start

### Step 1: Open the Connectors Directory

**Path A (In conversation)**: Click the **`+`** button at the bottom-left of the conversation → Select **Connectors**

**Path B (Settings page)**: `Settings → Customize → Connectors` → Browse directory

### Step 2: Connect a Service

1. Find your target connector, click to view its capabilities and read/write permissions
2. Click **Connect** (for pre-built) or **Install** (for remote MCP)
3. Complete the OAuth authorization flow (redirects to the service's login page)
4. After authorization, the connector appears in your installed list

### Step 3: Enable in Conversations

Installed connectors **won't automatically activate in all conversations**. In conversations where you want to use them:
- Click the **`+`** button and check the connectors to enable
- Or just describe your task—Claude will prompt you to enable relevant connectors

### Step 4: Just Describe Your Task

With connectors activated, simply express your needs in natural language:

```
Help me check emails from acme.com in Gmail this week,
extract all content mentioning delivery dates,
then create an "Acme Follow-up" page in Notion to record them.
```

Claude will automatically call the Gmail connector to search emails, then call the Notion connector to create the page.

---

## Key Connectors in Detail

### Google Workspace

**Gmail**
- Search emails using natural language ("emails from Alice about budget last week")
- Draft emails (Claude generates drafts, **you must manually send**—Claude cannot send on your behalf)
- Read attachment info, manage labels and threads
- List saved drafts

**Google Calendar**
- View events on personal and shared calendars
- Create, edit, delete events with support for recurrence rules
- Find common availability across multiple participants
- Manage attendee lists, respond to invitations

**Google Drive**
- Search and retrieve document content (text extraction only, doesn't process images)
- Add documents to current conversation or Project
- View file permissions and recent changes
- Save Claude-generated files directly to Drive (requires code execution enabled)

### Microsoft 365

**Read-only access**—Claude can retrieve and analyze, but **cannot modify, delete, or create** content:

- **Outlook**: Search email threads, track project progress and customer feedback
- **Teams**: Read channel messages and chat history you participate in
- **SharePoint / OneDrive**: Cross-site search and analyze documents
- **Calendar**: Read meeting summaries and attendee info, prepare for upcoming meetings

### GitHub

- Search code repositories, view file contents
- Create issues, view PR status and comments
- Search commit history

> Note for Claude Code users: In CLI, connecting GitHub via MCP offers more features, including write operations like creating PRs and merging.

### Slack

- Search channel message history
- Send messages to specified channels or DMs (**requires your confirmation before execution**)
- Read thread replies

### Linear / Asana / Jira

- Create, query, update issues and tasks
- Search project boards
- Get sprint status

---

## Combining Connectors with Projects

Connectors work best when used within **Projects**:

1. Connect Google Drive in a Project—Claude can continuously access all documents for that project
2. Connect Linear in a Project—Claude remembers the project's issue conventions and priority standards
3. Combine with Project custom instructions for unified workflow standards

**Example**: Create a "Q2 Product Planning" Project, connect Google Drive (requirement docs) + Linear (task management), making Claude a project assistant that can read requirements and sync task creation simultaneously.

---

## Connectors + Scheduled Tasks

Connectors can work with [scheduled tasks](./cowork#scheduled-task-automation) for automated workflows:

```
Every Monday at 9 AM:
- Read customer emails from last week in Gmail (Gmail connector)
- Summarize key issues and pending items
- Create "Customer Weekly Report" page in Notion (Notion connector)
- Send Slack notification to team (Slack connector)
```

Cloud scheduled tasks (created via `/schedule`) carry your authorized connector permissions and don't require your computer to be on.

---

## Permissions and Security

### Permission Model

- **Each connector independently authorized**: Connecting Gmail doesn't mean authorizing Calendar—each service has separate OAuth
- **Principle of least privilege**: Claude can only access content you have permission to access in your account
- **Read/write distinction**: Connector detail pages clearly mark which operations are read-only and which write data
- **Confirmation before action**: For write operations (send messages, create issues, modify calendar), Claude shows the action plan and waits for your confirmation

### Notes for Teams and Enterprises

- **Team / Enterprise plans**: Organization owners must first enable Connectors in **Organization Settings** before members can authorize and use them
- **Data transfer**: All connector data transfers are encrypted
- **Disconnect**: Revoke service authorization anytime in `Settings → Connectors`

### Best Practices

- Periodically review connected services and disconnect unused connectors
- Don't enable connectors with personal email in shared Projects (other members may trigger queries)
- For services with sensitive data (like financial systems), use a dedicated account rather than your personal primary account for authorization

---

## FAQ

**Q: Do Connectors cost extra?**

No. Connectors are included in Pro (and above) subscriptions at no additional cost.

**Q: Can connectors access all my data in a service?**

Only data you have permission to access. After connecting Google Drive, Claude can only read files you have access to—it cannot bypass the original service's permission controls.

**Q: Will Claude automatically operate my services without my knowledge?**

No. For write operations (draft emails, create events, send Slack messages), Claude will present an action plan and wait for your confirmation before executing.

**Q: Can my company's internal systems use Connectors?**

Yes, via custom Remote MCP, but your MCP server must be publicly accessible (or add Anthropic egress IPs to your whitelist).

**Q: How do I use connectors in Claude Code CLI?**

Claude Code connects tools via MCP integration (`claude mcp add`). This is a different entry point than the claude.ai Connectors UI, but the underlying protocol is the same. See [MCP Integration chapter](./claude-code#mcp-integration).

---

## Resources

- [Connector Setup Guide](https://support.claude.com/en/articles/10168395-set-up-claude-integrations)
- [Google Workspace Connector](https://support.claude.com/en/articles/10166901-use-google-workspace-connectors)
- [Microsoft 365 Connector](https://support.claude.com/en/articles/12542951-enable-and-use-the-microsoft-365-connector)
- [Custom Remote MCP Connector](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)
- [Pre-built Web Connector List](https://support.claude.com/en/articles/11176164-pre-built-web-connectors-using-remote-mcp)
- [Connectors Full Collection](https://support.claude.com/en/collections/15399129-connectors)

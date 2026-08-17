# Claude.ai Platform Guide

> claude.ai is Anthropic's core product interface, supporting synchronization across web, mobile app, and desktop app. As a Pro member, you get access to a feature set far beyond the free version. This guide systematically covers all Pro-exclusive or enhanced features.

## Access Points

| Platform | Address/Method |
|----------|----------------|
| Web | [claude.ai](https://claude.ai) |
| iOS App | Search "Claude" on App Store |
| Android App | Search "Claude" on Google Play |
| Desktop App (macOS/Win) | [Download](https://claude.ai/download) |

All platforms share the same account, conversation history, and project data.

---

## Projects: Dedicated Workspaces

### What It Is

Projects are independent workspaces within Claude.ai. Each Project has its own:
- **Chat history**: All conversations related to that project
- **Knowledge base**: Uploaded documents, code, and reference materials
- **Custom instructions**: Definitions of Claude's role and behavior guidelines within that project

### Core Advantages

**Persistent Context**: Regular conversations start from scratch each time. Projects let Claude read background materials you've uploaded in every conversation, eliminating the need to repeatedly paste the same context.

**RAG Knowledge Base (Pro Exclusive)**: After uploading numerous documents, Pro users enjoy 10x capacity expansion. Claude automatically retrieves relevant segments to answer questions, rather than memorizing all content.

**Custom Roles**: In Project instructions, define Claude's role—for example: "You are a senior frontend engineer familiar with our company's tech stack, and your coding style follows the specification documents I uploaded."

### How to Use

1. Click **+ New Project** in the left sidebar
2. Name your project (e.g., "Frontend Refactor Project")
3. Click **Add to Project Knowledge** to upload relevant documents
4. Write Claude's role definition and behavior guidelines in **Project Instructions**
5. Start conversations within the project—Claude will always carry this context

### Supported Knowledge Base File Types

PDF, Word, Excel, TXT, Markdown, code files, CSV, and other common formats. Maximum 10MB per file; total project capacity depends on your plan (Pro users get significantly expanded capacity).

### Best Practices

- **One project per work domain**: Create separate projects for "Product Design," "Technical Docs," "Market Research," etc.
- **Upload specification documents**: Put coding standards, brand guidelines, and API docs into the knowledge base—Claude will reference them automatically
- **Write clear instructions**: The more specific your instructions, the better Claude can meet your expectations

### Project Visibility and Sharing (Team/Enterprise)

**Public vs Private Projects**:
- **Public projects**: Any organization member can find and use them via browsing or searching the "Team" tab; even when a project is public, chats within it remain private
- **Private projects**: Only explicitly invited members can access; chats and knowledge bases within the project are not visible

**Switching Visibility**: Toggle between public/private anytime via the "Share" button in the project's upper-right corner.

**Managing Member Access**:
- Add members to private projects: Share → Enter member email
- Bulk add: Copy-paste email list (comma-separated) in Share panel to add multiple people at once
- Remove members: Manage permissions in the same panel

**"Shared with you" Tab**: Projects shared by others appear in the "Shared with you" tab for easy access to collaborative content.

**Impact of Archiving**: When a project is archived, all sharing permissions reset to private, and previous sharing context is cleared for security reasons.

**Chat Sharing (Independent of Projects)**: Chats within projects are not shared by default. You can share individual chat snapshots (including all messages and Artifacts before the snapshot); new messages sent after sharing remain private by default.

### Advanced RAG Knowledge Base Usage

When project content approaches context window limits, Claude automatically activates **RAG (Retrieval-Augmented Generation)** mode, extending knowledge capacity up to 10x while maintaining response quality.

**RAG Best Practices**:
- **Use clear, descriptive filenames**: `2024-Q3-Financial-Report.pdf` is more retrieval-friendly than `report.pdf`
- **Organize related content together**: Related documents within the same project help Claude make connections across sources
- **Add all relevant documents upfront**: The more context Claude has available, the better the results
- **Reference specific documents by name**: When asking questions, citing filenames helps focus Claude's search

When RAG is active, a visual indicator appears in the interface. All existing projects automatically benefit from this feature—no manual configuration needed.

---

## Extended Thinking: Deep Reasoning

### What It Is

Extended Thinking is an exclusive capability of Claude 4 and Claude 3.7 Sonnet. When enabled, Claude spends more time before responding to **break down problems, formulate plans, and explore different paths**—similar to human "slow thinking."

You'll see a **"Thinking..."** indicator and timer. Once complete, you can expand it to view a summary of Claude's reasoning process.

### When to Use It

✅ **Suitable**:
- Complex mathematical derivations and physics problems
- Competition-level programming challenges
- Multi-step project planning
- Deep document analysis and comparison
- Technical decisions requiring weighing multiple options

❌ **Not Suitable** (wastes time):
- Simple Q&A (e.g., "What's the weather today")
- Basic writing (e.g., "Help me write a welcome email")
- Routine code completion

### How to Enable

1. Select **Claude 4** (or Claude 3.7 Sonnet) in the model selector
2. Click **Search & Tools** at the bottom-left of the chat window
3. Toggle **Extended Thinking** on

**Note**: Enabling Extended Thinking starts a new conversation—you cannot switch mid-conversation.

### Usage Tips

- Be specific and clear with your questions; vague questions can lead reasoning astray
- Expand the "Thinking" area to understand Claude's reasoning logic, helping you assess answer reliability
- For time-consuming tasks, this mode consumes significantly more usage quota

---

## Research: Deep Research

### What It Is

Research is Claude's **agent-based web research** feature. Unlike ordinary web search, it conducts multiple interconnected searches, autonomously decides what to investigate next, and delivers complete answers with verifiable citations.

Analogy: Ordinary search is "search once for you"; Research is "research a topic for you."

### When to Use It

- Investigating pros/cons of a technical approach and current industry landscape
- Understanding competitor features and market landscape
- Gathering multiple perspectives on a topic
- Finding the latest industry data and reports
- Any question requiring synthesizing multiple information sources

### How to Use

1. Find the **Research** button at the bottom-left of the chat interface (white = disabled, blue = enabled)
2. Click to enable (**must also enable web search**)
3. Ask your question—Claude will automatically conduct multi-round research

If Claude doesn't actively use Research, explicitly request: "Please use the Research tool to investigate this issue thoroughly."

### Caveats

- Research consumes quota faster than regular conversations (because it retrieves from multiple sources)
- Results include source citations for verification
- Available for Pro, Max, Team, and Enterprise plans; supports web, Desktop, and mobile apps

---

## Web Search

### What It Is

Web search enables Claude to access **real-time internet information**, breaking through training data cutoff limitations.

### How to Enable

Click **Search & Tools → Web Search** at the bottom-left of the chat window.

### When to Use

- Latest news and events
- Real-time data (stock prices, weather, exchange rates)
- Recently released technical documentation
- Any information that may have changed after the training cutoff

### vs Research

| | Web Search | Research |
|--|:--:|:--:|
| Search rounds | 1-2 | Multi-round autonomous exploration |
| Best for | Quick fact lookup | Deep topic investigation |
| Time cost | Seconds | Minutes |
| Quota consumption | Lower | Higher |

---

## Interactive Charts and Visualizations

> New as of March 2026: Claude can now generate truly interactive charts, graphs, and data visualizations—not just static images.

### What It Is

Claude can generate **interactive visualizations** directly within conversations. Users can interact right in the interface: zoom, filter, hover for details, dynamically update data, and more.

### Supported Types

- **Interactive line/bar/pie charts**: Hoverable data points, supports zoom and pan
- **Flowcharts / Mind maps**: Draggable nodes, supports collapse/expand
- **Data dashboards**: Multi-chart linkage, real-time filtering
- **Network relationship graphs**: Visualized node connections, supports force-directed layouts

### How to Use

Simply describe your needs—Claude determines whether to generate interactive content:

```
Turn this sales data into an interactive bar chart filterable by month
```

```
Draw a collapsible component tree diagram showing the React app's component hierarchy
```

Once generated, interact directly in the Artifact window, or export as a standalone HTML file.

---

## Artifacts: Standalone Content Output

### What It Is

Artifacts are **content generated by Claude in a separate window** alongside the chat, displayed independently for easy editing, previewing, and exporting. Automatically triggered when content exceeds ~15 lines and can exist independently.

### Supported Artifact Types

| Type | Description | Examples |
|------|-------------|----------|
| Documents | Markdown or plain text | Reports, articles, README |
| Code | Syntax-highlighted code snippets | React components, Python scripts |
| Websites | Previewable HTML+CSS+JS | Landing pages, forms, tools |
| SVG Images | Vector graphics | Icons, flowcharts |
| Charts/Diagrams | Mermaid syntax rendering | Sequence diagrams, flowcharts, ER diagrams |
| React Components | Interactive frontend components | Data visualizations, calculators |

### How to Use

- **Edit and iterate**: Directly ask Claude to make changes—updates appear in real-time in the Artifact window
- **Version switching**: Use the version selector in the upper-right to navigate historical versions
- **Export**: View source code, copy to clipboard, or download files from the bottom-right
- **Multiple Artifacts**: One conversation can generate multiple—switch via the slider icon

### AI-Powered Artifacts (Advanced Feature)

Pro users can create **applications embedding Claude intelligence**:
- Artifacts can call the Claude API internally for genuine interactive logic
- Connect to external services like Asana and Google Calendar via MCP integration
- Support persistent data storage (max 20MB per Artifact)
- When shared with others, they use their own accounts—doesn't consume your quota

### Publishing and Sharing Artifacts

**Publish to Inspire Page**: On Pro/Max, you can publish an Artifact to a public Inspire tab for all Claude users to discover and use. Published Artifacts are categorized (Learning, Life, Games, Creative, etc.).

**Embed into External Websites**: After publishing, get embed code and control which sites can embed your Artifact via domain whitelist (`allowed_domains`), protecting content from unauthorized use.

**Organization Sharing** (Team/Enterprise): Artifacts created in organizations default to internal sharing only and cannot be published publicly. Team and Enterprise users can browse and share work-related Artifacts within the organization.

**Customizing Others' Artifacts**: When you see an Artifact you like, create your own version based on it (Customize), making it easy to iterate on others' work.

**Security When Sharing**: When sharing an Artifact containing attachments (uploaded files), viewers can also access all attachments from the conversation that created it. Confirm attachment content isn't sensitive before sharing.

---

## File Creation and Code Execution

> Core new feature as of early 2026: Claude can execute code in a sandboxed environment, directly generate Excel, Word, PowerPoint, and PDF files, and perform data analysis—all within the conversation.

### What It Is

Claude has **code execution and file creation** capabilities, running Python/JavaScript code in an isolated sandbox environment to directly generate professional documents and data visualizations.

**Supported File Types**:
| Type | Format | Typical Uses |
|------|--------|--------------|
| Excel spreadsheets | .xlsx | Financial models, data tracking, formula calculations |
| PowerPoint presentations | .pptx | Business reports, product introductions |
| Word documents | .docx | Contracts, reports, manuals |
| PDF | .pdf | Formal documents, forms |
| Images | .png | Data visualization exports |

**Maximum file size**: 30MB per file for both upload and download.

### How to Enable

**Pro/Max Users**: Settings → Features → Enable "Code Execution" and "File Creation" toggles.

**Team/Enterprise**: Organization admins control in Organization Settings → Features (enabled by default at org level).

**Mobile**: iOS/Android also supported—click download to open in system preview or standalone apps.

### Web Access Configuration (Critical Security Choice)

| Mode | Description | Best For |
|------|-------------|----------|
| **Disable web access** (recommended starting point) | Data never leaves sandbox, most secure | Sensitive data, strict compliance requirements |
| **Approved web domains** | Only specific trusted domains | Balancing security and functionality |
| **All domains** | Full internet access | Flexible external data retrieval |

**How disable web access works**: Claude runs code in a sandboxed container. Even if issues arise (e.g., prompt injection attacks), data cannot be transmitted externally, ensuring security.

### Typical Workflows

**Build financial models**:
```
Create an Excel spreadsheet to track monthly expenses with formulas that automatically calculate totals and averages, and generate a bar chart visualizing monthly trends
```

**Generate professional reports**:
```
Upload this sales data CSV, analyze it, and generate a Word format monthly report including key data charts and a written summary
```

**Multi-format conversion**:
```
Convert this PDF document into a PowerPoint presentation with one main section per slide
```

**Data analysis and visualization**:
```
Upload a CSV file, build a prediction model for next quarter's sales, and output a report explaining what you did
```

### Security Considerations

Bad actors may covertly inject commands via external files or websites, tricking Claude into sending sensitive information to third parties. Security recommendations:
- Monitor Claude's actions—stop immediately if you see unusual access
- Use the "Thumbs down" button to report issues directly to Anthropic
- Team/Enterprise admins should start with "Disable web access" and gradually loosen restrictions

### Artifacts and File Creation Relationship

After enabling file creation, Artifacts (like HTML/React/Mermaid) are also generated through the compute environment—user experience may differ slightly. Both can coexist: use file creation for code output, Artifacts for document/website output.

---

## Memory: Cross-Conversation Memory

### What It Is

Memory enables Claude to remember your preferences, background, and work habits across conversations—no need to reintroduce yourself each time.

### Two Memory Types

**User-initiated memory**: You explicitly tell Claude to remember something:
```
Remember: I'm a frontend engineer, primarily using React + TypeScript,
preferring functional programming, and disliking class components.
```

**Automatic memory** (in Claude Code): Claude learns and saves automatically while working—build commands, debugging preferences, common tool configurations.

### How to Manage Memory

- Go to **Account Settings → Memory** to view all saved memories
- Edit or delete unwanted entries
- Support importing/exporting memories (for backup or cross-device sync)

---

## Skills System

### What It Is

Skills are "folders containing instructions, scripts, and resources that Claude dynamically loads to boost specialized task performance." Simply put: skills make Claude more professional and reliable for specific tasks.

### Four Skill Types

**Anthropic Built-in Skills**: Automatically invoked when handling Excel, Word, PowerPoint, PDF, and similar document tasks—no manual operation needed.

**Custom Skills**: Exclusive workflows created by you or your team, such as brand style guide application, standardized email templates, meeting note formatting.

**Partner Skills**: Pre-built skills from Notion, Figma, Atlassian, and other products, used with corresponding connectors.

**Organization Skills** (Team/Enterprise): Standardized workflows deployed organization-wide by admins for the entire team.

### How to Use

In the **Customize** menu under **Skills**, view, enable, and manage all available skills. When working, Claude automatically identifies if a current task has a corresponding skill and loads it; you can also manually invoke via `/skill-name`.

### How to Create Custom Skills

See official documentation: [How to Create Custom Skills](https://support.claude.com/en/articles/12512198). The core: write instruction files in Markdown, optionally add Python scripts, and place in the required directory structure.

---

## Personalization Settings

### Response Style

Define Claude's response style in **Settings → Custom Style**:

- **Concise mode**: Just answers, no explanations
- **Teaching mode**: Detailed explanations of why each step is taken
- **Technical mode**: Professional terminology, developer-oriented
- **Creative mode**: More creative and expressive output

Describe your preferred style in natural language—Claude will apply it to subsequent conversations.

### Language Settings

By default, Claude answers in the language you ask. If you want Claude to always answer in a specific language (e.g., Simplified Chinese) even when you ask in English, specify this in the system prompt or project instructions.

### Appearance Settings

In **Settings → Appearance**, toggle:
- Light/dark/follow system
- Font size

### Model Switching

Click the model selector in the upper-right of the chat window or in Settings to switch between:

| Model | Characteristics | Best For |
|------|------------------|----------|
| Claude Opus 4.6 | Strongest reasoning, highest quality, world's strongest coding model | Complex tasks, deep analysis, enterprise-grade agents |
| Claude Sonnet 4.6 | Cutting-edge intelligence balanced with speed, enterprise workflow favorite | Daily development, writing (default) |
| Claude Haiku 4.5 | Fastest response, near cutting-edge intelligence | Simple Q&A, batch processing |

---

## Claude in Chrome Extension

### What It Is

Claude in Chrome is a browser extension that lets Claude **read, click, and navigate websites** while you browse. Claude works directly in a side panel, sees what you see, and takes action when requested.

> Beta open to all paid plan (Pro/Max/Team/Enterprise) users.

### Core Features

- **Browser automation**: Claude can control buttons, enter text, take screenshots, execute multi-step workflows
- **Workflow recording**: Demonstrate operations once—Claude learns and automatically repeats them
- **Scheduled tasks**: Set browser tasks to run daily/weekly/monthly
- **Console log reading**: Developers can directly identify and debug issues in the browser
- **Multi-tab management**: Claude views and interacts with multiple tabs simultaneously—no manual switching
- **Visual context sharing**: Upload screenshots or screen regions to share visual information directly

### Claude Code Integration

Claude Code and the Chrome extension can work together for build-test-verify workflows:
Write code in Claude Code → Chrome extension validates browser behavior → Auto-fix. This integration is particularly useful for design verification (comparing Figma against build output), real-time debugging, and automated testing.

### Model Limitations

- **Pro users**: Haiku 4.5 only
- **Max/Team/Enterprise**: Can choose Opus 4.6 / Sonnet 4.6

### Control Browser from Claude Desktop

After enabling the Claude in Chrome connector in Claude Desktop, dispatch tasks to the browser directly from desktop—no window switching. Enable via Claude Desktop → Settings → Desktop App → Computer Use.

---

## Privacy and Security

### Private Chats

**Private Chat** is a special conversation mode where content:
- Is not used for Anthropic's model training
- Does not appear in your conversation history (not saved locally or in cloud)
- Is completely deleted after the session ends

Enable by selecting **Private Chat** when starting a new conversation.

**Best for**: Discussing sensitive business information, personal privacy content, competitive intelligence—any conversations you don't want recorded.

### Data Export

In **Account Settings → Data Control**, export all conversation history and account data in JSON format.

---

## Voice Mode

### What It Is

Voice mode enables **complete two-way voice conversations** with Claude—you speak, Claude responds with voice. Keep using Claude even when your hands are busy (driving, cooking).

### Two Voice Interaction Modes

| Mode | Behavior | Best For |
|------|----------|----------|
| **Hands-free mode** (default) | Claude continuously listens, responds automatically after natural pauses | Quiet environments, when hands are unavailable |
| **Push-to-talk mode** | Hold button to speak, release to end | Noisy environments, group conversations |

In hands-free mode, if Claude accidentally interrupts you, just continue speaking—Claude will stop and resume listening.

### Voice Selection

Claude offers multiple voice options—choose during first-time setup, or switch anytime in settings.

### Text-Voice Switching

Freely switch between text and voice within the same conversation—context fully preserved. Switch back to text for complex input (URLs, code), then continue with voice when done.

**Note**: Voice mode currently supports English only. Text transcripts of voice conversations are saved in chat history and managed like regular conversations.

---

## Mobile Extensions

### iOS Shortcuts and Widgets

Claude iOS supports multiple quick-access features:
- **Home screen widgets**: Start chat, photo analysis, voice dictation directly from desktop
- **"Ask Claude" App Intent**: Invoke Claude via shortcuts anywhere in iOS
- **"Analyze Photo with Claude" control**: Quickly send photos to Claude from Control Center or lock screen
- **Shortcuts integration**: Combine "Ask Claude" with other app actions for complex workflows

Example: Select text → Share to "Summarize with Claude" shortcut → Claude analyzes and returns summary.

### Android Widgets

Claude Android widgets (Android 8.0+) provide three quick-access buttons:
- Chat button: Start new conversation immediately
- Camera button: Capture image and send to Claude for analysis
- Microphone button: Start new conversation via voice dictation

### Mac Quick Input

Claude Desktop macOS supports "Quick Input" for instant Claude access from anywhere:
- **Double-press Option** to open Quick Input and start new chat
- **Screenshot sharing**: Quickly capture screen and share with Claude
- **App window sharing**: Share current app window content with Claude
- **Voice dictation**: Use Caps Lock for voice input

System requirements: macOS 13+ with Claude Desktop running (can be in background). Windows users: this feature is not currently available.

---

## Conversation Management

### Share Conversations

Completed conversations can generate share links for others to view (read-only—recipients cannot continue the conversation). Click the **Share** icon in the upper-right to set visibility.

**Sharing security notes**:
- When sharing conversations containing uploaded files, **files themselves are not included in the snapshot**—only conversation and replies are visible
- When sharing conversations using MCP integration, **raw data retrieved by MCP tool calls remains hidden**—only final output is visible
- This ensures sensitive files and data aren't exposed via share links

**Manage shared chats**: In Settings → Privacy → Shared Chats, view timeline and links for all shared conversations—revoke sharing with one click.

### Search History

A search box at the top of the left sidebar enables full-text search across conversation history—quickly find previously discussed topics.

### Upload Files

Drag and drop or click the attachment icon in the chat window to upload files. Supports documents, code, images, PDF, and other formats—Claude analyzes file content and answers questions based on it.

---

## Usage Management

### Understanding Usage Limits

Pro users enjoy **Standard** tier usage (far above Free's Limited tier), but still have caps (Max 5x plan is 5x Pro). Usage depletes faster in this order:
1. Regular conversations (most efficient)
2. Conversations with web search enabled
3. Extended Thinking conversations
4. Research conversations (most intensive)

### Check Usage Status

View current cycle quota consumption in **Settings → Usage**.

### Usage Packs

If your Pro quota isn't enough, purchase additional usage packs (pay-as-you-go) without upgrading to Max. Visit account settings to view pack options.

### Best Practices: Quota-Saving Tips

- Only enable Extended Thinking and Research when necessary
- Turn repeated questions into project knowledge bases—avoid pasting identical context each time
- Ask simple questions directly—don't add excessive context
- Use Claude Haiku for simple batch tasks

---

## Practical Examples

### Scenario 1: Technical Research (Research + Projects)
```
1. Create Project: "Tech Selection Research"
2. Upload existing system architecture documents
3. Enable Research feature
4. Ask: Investigate React Server Components vs traditional CSR for our e-commerce scenario,
   considering our uploaded architecture docs, and provide recommendations.
```

### Scenario 2: Complex Problem Planning (Extended Thinking)
```
1. Select Claude 4, enable Extended Thinking
2. Ask: I need to migrate a jQuery project to React,
   200 pages, 5-person team, 3-month timeline.
   Please help me develop a detailed migration strategy and risk control plan.
```

### Scenario 3: Generate Interactive Prototypes (Artifacts)
```
Ask: Build a data table component using React with sorting, filtering, and pagination,
styled with Tailwind CSS, data passed via props.
```
→ Claude generates Artifact with live preview in right panel—iterate if unsatisfied.

### Scenario 4: Personalized Writing Assistant (Projects + Custom Instructions)
```
Project instructions:
You are a technical writing expert helping me write technical blogs for frontend developers.
Style: Direct, in-depth, with real code examples.
Avoid: Excessive fluff, overly academic expressions.
Audience assumption: Developers with 2+ years of React experience.

Knowledge base: Upload your past articles as style references
```

---

## Resources

- [What are Projects](https://support.claude.com/en/articles/9517075)
- [Using Extended Thinking](https://support.claude.com/en/) — original article URL has been retired; link to the support root for the current entry point
- [Conducting Research with Claude](https://support.claude.com/en/articles/11088861)
- [What are Artifacts](https://support.claude.com/en/articles/9487310)
- [What are Skills](https://support.claude.com/en/articles/12512176)
- [Choosing a Claude Plan](https://support.claude.com/en/articles/11049762)
- [Understanding Usage and Length Limits](https://support.claude.com/en/articles/11647753)

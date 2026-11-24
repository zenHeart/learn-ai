---
title: "dot: the always-on agent in ChatGPT"
description: "dot is the always-on agent in ChatGPT: give it a goal and context, and it keeps working on its own cloud computer even after you close the tab. This page covers whether you can use it, how to create one, how to assign work, how to keep it under control, and how it divides the work with Codex."
domain: product
tags:
  - coding-agent
  - chatgpt-dot
  - always-on-agent
role: tutorial
pageClass: wide-figures
---

# dot: the always-on agent in ChatGPT

> dot is the **always-on agent** in ChatGPT (an AI assistant that keeps working even when you are not watching). Give it a goal and context, and it carries on between conversations. Close the tab, and it keeps working on **its own cloud computer**.
>
> It takes on jobs that are "long-running, multi-step, and need their progress tracked across several apps". This page helps you create a dot and send out your first task in 10 minutes, then learn to keep it under control. Facts follow the OpenAI Help Center article [Getting started with your dot](https://help.openai.com/en/articles/20001530-getting-started-with-your-dot) as the primary source, as of 2026-11-24.

**Who it is for**: you write frontend code, you have used ChatGPT, but you have not used dot or come across an always-on agent.

**Non-goals**: the Codex CLI itself (see [Codex CLI](./codex-cli)); ChatGPT Work itself (see [ChatGPT Work](./chatgpt-work)); features that have not appeared on official pages.

## What you will be able to do

- Explain what dot, an ordinary ChatGPT conversation, and Codex are each responsible for, and decide which of them a job should go to.
- Check your plan, age, and region to confirm whether you can use dot, and know where to look when you cannot find the entry point.
- Create and name a dot, and give it a task that spells out the goal, the materials, when to ask you, and what counts as done.
- Find its tasks, files, and requests waiting for your approval in the Activity View, and give feedback.
- Write a custom rule, and set up a routine check for every morning.
- Explain what pausing, deleting, and disconnecting an app each does, and which things always require you to do them yourself.

## Check first whether you can use it

### Check against plan, age, and region

As of 2026-11-24, the Help Center lists this range:

| Plan | Available? | Conditions and limits |
| --- | --- | --- |
| **Pro** | Yes | Aged 18 or over; not in the European Economic Area, Switzerland, or the UK |
| **Plus** | Some accounts | Same conditions as Pro; rolling out gradually. Until your turn comes, support cannot enable it, and restarting the app does not help either |
| **Business Premium** | Yes | Limited to regions where ChatGPT is supported, and subject to workspace eligibility requirements; rolling out gradually |
| **Business Standard** | Rolling out gradually in the US | Switch to your Business workspace; if you cannot see the create entry point, your turn has not come yet; usage limits apply |
| **Enterprise / Edu / Healthcare** | Generally available | In the preview period before 2026-11-18, a workspace admin had to enable it for your role; available by default from 2026-11-18 unless an admin opts out |
| **Free / Go** | Not listed | These two plans are not in the Help Center's availability list |

Three limits apply across plans:

- **Age**: not available to anyone under 18.
- **Number**: in Business and Enterprise workspaces, each member can create **one personal dot**. The launch post says more dots can be added only in the future, beyond the first one.
- **Enterprise residency requirement**: not available for workspaces with data or inference residency in the United Arab Emirates. For regulated or Healthcare workspaces, read [HIPAA eligible products and functionality](https://help.openai.com/en/articles/20001069-hipaa-eligible-products-and-functionality) first.

> A few statements on official pages do not agree with each other, such as whether Plus is open yet, and Enterprise residency and EKM eligibility. The tables on this page follow the Help Center; each difference is listed at the end of "Further reading".

### Find the entry point

| Where you are | How to find it |
| --- | --- |
| Desktop web | Open [chatgpt.com/dots](https://chatgpt.com/dots) |
| Mobile app | If you already have a dot: open the **Dot** tab; if there is no such tab: open **Dots** from the sidebar |
| Enterprise workspace | If you cannot see the entry point, ask your workspace admin: whether your role has the dots permission, and whether the workspace has opted out |

If you cannot find it, first confirm that you are signed in to the account and workspace you intend to use. The Help Center states it plainly: **Plus and Business Premium are rolling out gradually**. When Plus has not reached your account yet, OpenAI support cannot enable it for you, and restarting the app will not change your permissions either.

### Prepare your devices

| What you want to do | What to use |
| --- | --- |
| Create a dot | The ChatGPT mobile app (iOS or Android, latest version), the desktop app (there is a Windows version too), or desktop web |
| Message or call dot | Any of the three above; the entry point for calls is the phone button in the conversation |
| Mobile web | **Not supported** |
| Connect your own computer | Only from the **ChatGPT desktop app on that computer** |
| Connect Slack | Connect from the ChatGPT desktop app |

## Core concepts

### Start with what dot is and is not

| It is | It is not |
| --- | --- |
| A feature inside ChatGPT, with its entry point in the ChatGPT app | Not part of the open-source Codex CLI. The official docs give no terminal entry point |
| An always-on agent: it has a goal and a memory, and keeps working between conversations | Not a "chat window that stays open". Close the tab and it keeps working on its cloud computer as usual |
| A coordinator that hands out work: coding tasks go to Codex, document tasks go to ChatGPT Work | Not the coding agent itself. Writing code, reviewing diffs, and opening PRs are Codex's job |
| It lives in the cloud and comes with its own cloud computer and browser | Not a program on your machine. Your computer stays separate from it by default, unless you connect it yourself |

The **specialist dots** in the launch post (expert dots) are a different matter: a pilot for organizations, with identity and permissions configured by the company. This page covers only your personal dot.

### Glossary

| Term | In one sentence | Why it is needed |
| --- | --- | --- |
| **Always-on agent** | An AI assistant that keeps working even when you are not watching | Long-running work needs someone to keep pushing between conversations |
| **Cloud computer** | A computer in the cloud that belongs to this dot alone, with its own files, software, and browser | It can work even when your computer is shut down |
| **Connected apps / plugins** | External services you have authorized dot to use, such as email, calendar, and code hosting | Before it can check email, read your calendar, or look at a code repository, you have to connect those apps |
| **Channel** | Where you talk to dot: ChatGPT, Slack, Teams, text message | Switch channels and it is still the same dot |
| **handle** | dot's account name, `@your-username-dot` by default | To mention it by name in a chat |
| **Memory** | The background ChatGPT gives it, plus the notes it takes itself | You do not have to explain preferences and project background all over again each time |
| **Scheduled tasks** | A reminder or recurring check that you set up | You do not have to remember to trigger repetitive work |
| **Proactive research** | When you have not sent a new message, it reads through connected information in the background, read-only | It can notice changes related to the work you have in hand |
| **Custom rules** | Set whether a certain kind of action goes ahead without asking, asks first, or is handed to you | The default rules are unlikely to match your boundaries exactly |
| **pre-approved** | You explicitly asked for this action in your prompt | "Draft it for me" and "send it for me" are two different things |
| **Auto-review** | An independent check before an action runs | It stops actions such as using the wrong recipient or sharing information you do not want to share |
| **Activity View** | The panel where you see what it is doing and what it has finished | You can only keep it under control once you know what it is doing |
| **Local computer access** | Allows dot to use the files and tools on your own computer | Only needed when it has to work on your local project; off by default |
| **Codex cloud environment** | A reusable coding environment set up in advance in Codex | dot uses it as its workbench when it runs cloud coding tasks |
| **Take over** | You operate dot's computer yourself, and click **Return control** when done | Steps such as signing in and entering verification codes need your own hands |

### See how the concepts connect

**The cloud computer belongs to dot.** It has its own files, software, and browser sessions, and it keeps its state between uses. Signing in to a website on your own computer does not mean dot is signed in too: its cloud browser has its own sign-in sessions.

**The three kinds of connection are separate.** Channels let you talk to it and receive its updates; connected apps let it use that service's information and tools within the permissions; the local computer lets it use that computer's files, apps, and tasks. Connecting one of them does not connect the other two along with it. Finding dot in Slack does not mean it is connected to your email.

**Memory has two layers.** dot starts from ChatGPT's memory and also takes its own notes, including information from connected apps. `Customize > Memory` on mobile shows the shared ChatGPT memory settings; dot's own notes are separate, and changing the settings there does not necessarily change what it has already noted down.

**It and ChatGPT go both ways.** dot receives ChatGPT's memory and the context of recent conversations, and it can also search your past ChatGPT conversations for relevant content. The other way round, your conversations with dot may also enter ChatGPT's memory.

**Scheduled tasks are set by you; proactive research is its own initiative.** When you tell it to check your calendar every morning, that is a scheduled task, run with the permissions you gave. When you say nothing and it reads through connected information looking for leads, that is proactive research, read-only.

**Built-in rules are the baseline; custom rules add to them.** dot comes with its own set of rules for when to act on its own and when to ask you. Custom rules are an optional addition, used to set more specific boundaries for a kind of action.

**Auto-review is another gate.** Before an action runs, an independent safety system checks it against your instructions, custom rules, and safety requirements, then decides to let it through, ask for your approval, or hand it back to you. dot cannot turn this check off itself.

**The Activity View is your dashboard.** Open dot's profile page in the desktop app to see it. Each task has its own conversation, and it does not automatically bring in everything you have said to dot elsewhere.

**Pausing is hitting the brakes; deleting is wiping it clean.** A pause can be undone and removes no information. Deleting cannot be undone, and it starts deleting the memory dot has saved itself. What each of them does is covered below under "Pause and delete".

## How it works

Read the diagram with one question in mind: **A sentence I send from Slack or my phone goes through whom, and ends up on which computer and in which app? Which paths are open by default, and which need my nod first?** The diagram below answers in three layers: the channels you use to reach dot, dot itself, and what it can use.

<DocDiagram src="/diagrams/chatgpt-dot-model.en.svg" alt="This diagram has three layers. It answers where a message goes after you send it from a channel, who handles it, and which paths are on by default versus which need your approval or setup first. Layer 1 is the channels, five from left to right: the ChatGPT desktop app, desktop web, mobile app, Slack, and Teams. Layer 2 is dot itself, drawn in purple, and it holds four things: goals, memory, custom rules, and scheduled tasks. Layer 3 is what dot can use, four items from left to right: dot's own cloud computer and browser, connected apps and plugins, your own computer (optional), and the Codex cloud environment. Between the channels and layer 2, every channel has a pair of orange arrows. The downward arrow means your message flows from that channel to dot. The upward arrow means dot's progress, questions, and decisions for you flow back to that channel. Between layer 2 and layer 3 there are four orange arrows, each pointing from dot to one item in layer 3, meaning dot goes to use it. A solid line means available by default: the arrows to the ChatGPT desktop app, desktop web, and mobile app, and the arrow from dot to its own cloud computer and browser are all solid, their cards have solid borders, and their status text says on by default or there from the start. A dashed line means you must explicitly authorize it or set it up first: the arrows to Slack and Teams, and the arrows from dot to connected apps and plugins, your own computer, and the Codex cloud environment are all dashed, and their cards have dashed borders. You connect apps and plugins yourself. Your own computer is off by default and turns on only after you click Allow access. The Codex cloud environment must be created in Codex first. No line runs directly between a channel and layer 3: connecting Slack does not automatically connect your email or computer. The legend at the bottom shows that solid lines are on by default, dashed lines need your approval or setup first, and orange arrows show the direction of messages and instructions; cyan marks your channels, purple marks dot itself, green marks the cloud computer and browser dot has by default, and amber marks things that need your approval or setup first. This diagram leaves out model training details, dot's internal architecture, specific connected-app products (no product icons are drawn), and the setup steps for Teams." :width="920" lang="en" />

> **What the diagram is based on:** The objects in the three layers come from the Help Center article [Getting started with your dot](https://help.openai.com/en/articles/20001530-getting-started-with-your-dot): dot has its own computer; after creation you can talk to it in the mobile app and the desktop app, and mobile web is not supported; local computer access is optional and off by default; a Codex cloud environment must be created in Codex first; apps are connected through Plugins. The Slack and Teams channels, and "context carrying over across channels", come from the launch post [Introducing dots](https://openai.com/index/introducing-dots/). The diagram keeps the objects in the three layers, the round-trip direction of messages and progress, and the difference between available by default and needs your authorization; it leaves out the setup steps for each item, dot's internal implementation, and the details of how it delegates tasks to ChatGPT Work or Codex. Solid lines are paths that are open by default; dashed lines are paths that need your explicit authorization or must be set up first.

Two points in the diagram matter most.

**First, dot stands in the middle.** Channels are only entry points. Switching channels does not give you a new dot, and it does not reset its memory. Messages stay in their own channels, and dot can use relevant context across channels.

**Second, the third layer is not all on by default.** dot has a cloud computer and a browser from the moment it is created. You have to connect apps and plugins yourself. The local computer is off by default and turns on only after you click **Allow access**. A Codex cloud environment must be created in Codex first. No line runs directly between the channels and the third layer: connecting Slack does not automatically connect your email or your computer.

Enterprise workspaces have one more layer: admins can turn off dot's cloud browser, network access for code, and computer operation one by one. After they are turned off, dot can still draft content, organize information, and use the connected apps that the workspace allows.

While it works, dot hands out part of the work: it uses background agents to work in parallel, opens separate cloud threads, and creates Work or Codex tasks on a connected computer. Cloud threads appear as separate conversations in the desktop, web, and mobile apps, and you can open one and keep steering. It can also continue existing local Codex tasks.

The launch post states that dot is powered by GPT‑6 Astra; an update note dated 2026-11-03 says the model family powering dots has added GPT‑6.1 Terra.

### Comparison: dot's cloud computer and "your computer as the server"

[Cindy](../cindy/) is an open-source agent app that takes a different route. It installs on your computer and phone, and the official README puts it as "your computer becomes your server".

| Item | dot | Cindy |
| --- | --- | --- |
| Which computer the work runs on | dot's own cloud computer; it can work even when your computer is off | Your computer; to use it remotely, the computer has to stay online |
| What it is | A feature in ChatGPT, hosted by OpenAI | Open-source client that you download and install yourself; the client is Apache-2.0 licensed |
| Whose models | OpenAI's GPT‑6 model family | A subscription, API, or local model you already have; can connect Claude Code, Codex, and Pi |
| Coding tasks | Handed to Codex | Use the coding agents you have already installed, in one interface |

The Cindy column comes from its [GitHub repository README](https://github.com/makecindy/cindy), as of 2026-11-24.

## Create a dot in 10 minutes and send out your first task

This shortest path does not connect your computer, and the task template does not let it send messages to anyone else either. The six steps are: confirm the entry point, create and name, connect an app, send the task, check the results, give feedback.

### 1. Confirm the entry point

Open [chatgpt.com/dots](https://chatgpt.com/dots), or the **Dot** tab in the mobile app. If you can see the create entry point, continue. If you cannot, go back to the previous section and check your plan and workspace.

### 2. Create and name it

1. Open dots in the mobile app, the desktop app, or a desktop browser, and follow the guided steps.
2. Give it a name and choose a look. You can keep the defaults for now and change them later.
3. You can skip the plugin connection step for now and connect one in the next step.

It introduces itself and, based on the context at hand, suggests what it can help with. The default handle is `@your-username-dot`; once you name it, the handle becomes `@your-username-the-name-you-gave-it`. To change the name or avatar later: click its name or avatar to open its profile page, then click the pencil icon.

### 3. Connect an app

On mobile, open dot's profile page and go to `Customize > Plugins`. Pick a supported app, **check its permissions before you connect**, then connect. On desktop, you can connect and manage plugins in the **Plugins** tab of ChatGPT.

This screen uses the shared ChatGPT settings. For apps you have connected in ChatGPT, ChatGPT Work, or Codex, dot can use them within what you have already authorized. The launch post (2026-09-29) says the plugin ecosystem can connect more than 4,000 apps; the Help Center reminds you that the apps available to you may differ.

### 4. Send the first task

Spell out four things in the task: **the goal, the materials available, when to ask you, and what counts as done**. You can copy the following as is and replace what is inside the angle brackets:

```text
I want you to keep an eye on something for me: the dependency updates for <project name>.

Goal: tell me what changed in the latest version of <a dependency>, and whether it affects us.
Materials available: the package.json and the changelog in <repository link>. I will attach the current version with the + sign.
When to ask me: ask me first before changing code, opening a PR, or posting a message in a group chat.
What counts as done: one paragraph that states the latest version number, three changes relevant to us, and how big the impact is and why.
Do a first version for me to look at. Once I confirm it, we can talk about whether to keep watching.
```

To attach a file or a photo, click **+** in the conversation.

### 5. Check the results in the Activity View

In the desktop app, click dot's name or avatar to open its profile page, and look at the activity under **In progress**, **Scheduled**, and **Completed**. Open a task to see its progress, files, and results.

To watch what it is doing with your own eyes: open its computer from the profile page. To operate it yourself, click **Take over**; click **Return control** when you are done, so that it can carry on.

### 6. Give feedback

Reply directly in the conversation to add information or change direction. When a result is wrong, open **the task that went wrong**, state the result you want clearly inside it, and attach the relevant files or links.

### How to choose the first task

Start with one thing you have to check or update often. Have it hand you a version to review first, then widen its responsibilities. The official page gives three kinds of examples: preparing a presentation, turning interviews into content, and improving an app.

## Everyday use

### Write your first custom rule

For the three kinds of action, "sharing, purchasing, and accessing", you can set a rule for one category of operation.

- **Mobile** (Help Center): open `Customize > Custom rules` to view the default rules or add one.
- **Desktop and web** (official docs): open `Settings` > `Personalization`, select `Custom rules` under `Permissions`, and click `Add`.

Describe the action this rule covers, then choose a handling option from the table below. On mobile, tap the check mark to save; on desktop, click `Add rule`.

| Handling | Meaning | Example for a frontend engineer |
| --- | --- | --- |
| **Take action without asking** | Does it right away, without asking for approval | Sends an organized summary of the day's schedule into the ChatGPT conversation with you |
| **Take action if pre-approved** | Acts only if you explicitly asked for it in your prompt; otherwise asks you right before acting | Posts a weekly report draft to a team Slack channel: it posts only when you have said in the task that it should post |
| **Ask before taking action** | Needs your approval before it acts | Asks before opening a PR or merging a branch |
| **Hand off to you** | Asks you to do the action yourself | Deleting a shared project file |

"pre-approved" means you explicitly asked for this action in your prompt. The official docs write the second option as **Take action when you say so**; it means the same thing.

Four boundaries:

- You do not need to write a rule for every approval. State your requirements clearly in the conversation first; write only the boundaries that need to hold over time as rules.
- Rules do not grant app or computer access, and they do not override the built-in safety mechanisms. Steps such as changing a password must be completed by you in person.
- dot makes mistakes, even when it is following your rules. Review the results before you rely on them.
- Custom rules are off by default in Enterprise workspaces, and an admin has to turn them on. When the workspace has them disabled, saved rules do not take effect, and you cannot change them.

### Set up a routine check for every morning

Just tell it. For work that repeats at a fixed time, spell out four points: what to check or update, when to run (including the time zone and an end date), which changes are worth notifying you about, and where the results go. Example:

```text
Every weekday at 9 a.m. (Beijing time), for the next four weeks, check my connected calendar and the team's scheduling channel.
If a deadline has changed, update the project list.
Only tell me in ChatGPT when a deadline is at risk, or when you need me to make a decision.
Once it is set up, repeat the plan you saved so that I can confirm it.
```

- Run results and proactive updates appear in the conversation.
- There are two places to manage them: click the task in **Recent activity** on dot's profile page, or open **Scheduled** in ChatGPT. There you can see tasks that are in progress, paused, or completed.
- Open a task to change how often it repeats, the time, or the completion notification.
- Ask it to repeat what it saved. You can also just ask it to list, modify, or cancel its own scheduled tasks.

Two reminders:

- It can also read and write your existing ChatGPT Work scheduled tasks. When you ask it to "adjust the schedule", say which one.
- Even when a run is marked "Completed", take a look at the result.

### Reach it in Slack

1. Open dot's profile page in the ChatGPT desktop app, and click **Add** to connect Slack.
2. Send your dot a direct message. Or add it to a channel and @ it in a thread.

Once it is connected:

- By default it responds only to you. You can tell it to respond to others as well.
- Tell it which kind of message goes where. For example, everyday progress stays in ChatGPT, and things that need your decision go to Slack.
- To have it watch a channel, say explicitly which channels to look at, what to look for, and when to notify you, and have it confirm. **Adding it to a channel alone does not set up monitoring.**

Two boundaries: only the dot's owner can direct it; other people's direct messages or @ mentions will not make it start working. You can tell it to engage with others, but that is still your instruction; the other person does not gain control. Messages it posts in a channel are visible to everyone in that channel. The official safety guide suggests using dot only in channels whose members are all inside your organization.

Enterprise workspaces have two more gates: an admin turns on the dots permission and the "Add dots to Slack and Microsoft Teams" permission; where the Slack workspace requires approval, a Slack admin approves it. After that, each member completes the connection on their own.

<!-- TODO: needs verification — the exact setup steps for the Teams channel. The launch post (2026-09-29) says you can message dot in Slack and Teams, and the admin article has a matching permission, but the Help Center and the user docs on learn.chatgpt.com give only the steps for Slack; checked help.openai.com/en/articles/20001530, 20001554, and learn.chatgpt.com/docs/dots/channels -->

### Check progress and take over from your phone

1. Open your conversation with dot in the ChatGPT mobile app. To see its computer, open it from the profile page.
2. When you open it on the phone, you hold control right away. On desktop, merely opening it does not give you control; you have to click **Take over** to use its mouse and keyboard.
3. Click **Return control** when you are done, so that it can continue.

Calls: open the conversation with dot and tap the phone button; in the desktop app you can also click **Call** on the profile page. You can type during a call, and the work you hand it can continue after you hang up. At launch, dot cannot call you on its own.

Text messaging is another channel, but the two official pages describe its availability differently: the Help Center says some Pro users in the US, Canada, and Mexico, while the official docs say it is open only to Pro users in the US. Both require iMessage or RCS. The Help Center also states that Business and Enterprise workspaces do not support text messaging. The settings entry point is **Texting** on the profile page; if you cannot see this item, your account's turn has not come yet.

Mobile web does not support dot; use the mobile app. To continue the conversation on another channel, just switch: it is still the same dot.

### Connect your computer so it can start Codex tasks in your project

Look at the risks first, then decide whether to connect.

- **The authorization is long-term, and it applies across channels.** After you confirm **Allow access**, dot can access the files on that computer and work on it, whichever channel you talk to it from. The connection persists between tasks.
- **The work runs locally; the coordination runs in the cloud.** Conversations, tool results, and task context do not stay on that computer alone.
- **It can start tasks and use tools on it.** Once connected, it can create Work or Codex tasks, use local skills, and switch to your local browser when the cloud browser is blocked.
- **The connection to Codex is a separate thing.** Connecting your computer to Codex or turning on Work Sync does not give dot local access. The reverse is also true.
- **Offline is not the same as disconnected.** **Offline** only means the computer is unavailable for now; the authorization is still there. To take it back, you must click **Revoke access**.
- **Using the camera, microphone, or screen also needs system permissions.** The prerequisites are that the computer is connected and that you have allowed the ChatGPT app to use them in the device settings.

If you decide to connect, do it **on that computer**:

1. Open the ChatGPT desktop app and go to dot's profile page.
2. Under `Computers`, find **Your computer** and click **Allow access**.
3. Read the confirmation prompt, then click **Allow access** again.

That computer has to stay online with the ChatGPT app open for dot to use it. Work on that computer appears as separate tasks in the sidebar. The official enterprise admin docs also require the desktop app to be version 26.929 or later.

Once it is connected, you can brief it like this:

```text
On my computer, start a Codex task for <project directory>: <what to change>.
When you are done, show me the diff and the test output. Do not merge, and do not push.
```

To view or take it back: connected computers are listed under `Computers` on the profile page; click **Revoke access** to take access back.

### Let it use a Codex cloud environment

dot can run coding tasks even with your computer off, provided that **you set up the environment in Codex first**.

1. Create and publish an environment in Codex. The official docs give two entry points: in a new task, select `Work in` > `Cloud`, open `Select environment`, and choose `Create environment`; or go through `Settings` > `Codex Cloud` > `Environments`. Click **Publish** once it is built. For background, see [Codex Cloud](./codex-cloud).
2. Go back to your conversation with dot and ask it to create a task in this environment. Say which environment to use and what to change.
3. Open the task in the Activity View to see the results.

The environment must contain this repository and its configuration. The official requirement is: build it in Codex first, then go to dot.

Two limits: cloud environments do not support computer operation or browser operation; your personal skills on your computer are not synced to the cloud environment.

### What pause and delete each does

| | Pause | Delete |
| --- | --- | --- |
| How | Choose **Pause** in the more options menu `•••` on the profile page; to resume, click **Paused • Tap to resume** | Choose **Delete** in `•••`, then click **Delete** again to confirm, or click **Cancel** to keep it |
| For dot itself | Stops its current main task; you can resume at any time | Ends access to this dot |
| Its own memory | Kept | Deletion starts |
| Main conversation | Kept | Archived; you cannot continue with this dot |
| Separate Work / Codex conversations it created | May keep running | Kept |
| Separately scheduled tasks | May keep running | Check them yourself first, and stop the ones you do not want |
| Can it be undone? | Can be resumed | **Cannot be undone** |
| Afterwards | One click resumes it | No replacement is created automatically. Once the deletion is complete you can create a new one, but the new dot does not restore the original context |

Remember three things before you act:

- **Pausing does not stop everything.** Stop delegated tasks in the Activity View, and recurring tasks in **Scheduled**.
- **Save what you need before deleting.** Workspace owners can also delete a personal dot through workspace management.
- **When you cannot resume it, find the right person first.** If a workspace admin paused the dot, you have to ask the admin to lift the pause. If your dots permission was revoked, first ask the workspace owner or an admin to restore it.

## Split the work between dot and Codex

The official docs position the four experiences like this:

| Experience | When to use it |
| --- | --- |
| **Chat** | You want an answer, an explanation, some ideas, or a draft in the conversation |
| **ChatGPT Work** | You have a task to delegate: research, analysis, making a file. Do it now, or on a schedule |
| **Codex** | You want to build, debug, test, or review software, working directly with code and development tools |
| **Your dot** | You want an agent to follow one responsibility over the long term: it works out the next step itself when things change, and carries on between conversations. It reports to you in ChatGPT or Slack, and delegates tasks to ChatGPT Work or Codex |

In one sentence: **dot handles "watching over the long term and pushing forward across apps"; Codex handles "writing code".** dot hands coding tasks to Codex along two routes, local and cloud:

| Task type | How dot handles it | Prerequisite |
| --- | --- | --- |
| A new local Work or Codex task | Created on the connected computer | That computer is online and the ChatGPT app is open |
| An existing local Codex task | Continued on the connected computer | You tell it which task and what you want changed |
| A new cloud coding task | Created in a Codex cloud environment you have already set up | Your computer can be offline |
| A task dot created itself | It checks the results and sends follow-up instructions | Uses the computer or cloud environment the task was originally on |

If the computer dot uses changes, existing tasks do not move with it.

### When to use dot and when to use Codex directly

| Your situation | Use | Why |
| --- | --- | --- |
| Changing one function in the file you have open, and adjusting it as you review the diff | [Codex CLI](./codex-cli) or the IDE extension | Small changes are faster locally |
| A change needs several parallel attempts, or you are away from the development machine | [Codex Cloud](./codex-cloud) | The hosted environment can run in parallel and does not occupy your machine |
| Approving, one after another, tasks on a connected computer from your phone | [Codex Remote](./codex-remote) | You steer that session step by step |
| One thing needs watching for several days: investigate as new issues come in, prepare a fix, wait for review | dot | It carries on between conversations, and hands the coding part to Codex |
| The work spans several apps: collect feedback in Slack, read issues on GitHub, update the record in a document | dot | It coordinates across apps, then delegates by type |

## Billing and usage

This page gives no price figures. The table below only paraphrases the official wording; for the exact amounts, go by [Pricing](https://learn.chatgpt.com/docs/pricing).

| Item | What the official pages say | Source |
| --- | --- | --- |
| Your first dot | Included in the Pro and Business Premium plans at no extra charge. The plans also include a certain allowance of "deep work", relaxed for the first month after launch. More dots can be added in the future | Launch post, 2026-09-29 |
| Conversations with dot | Not counted against ChatGPT usage limits | Launch post; official docs Meet dots |
| Tasks dot hands to Codex or ChatGPT Work | Counted against the corresponding product's usage limits as usual, and shown in their usage reports | Launch post; official docs Manage dots permissions and capabilities |
| Enterprise: preview period | Free during the preview. Enterprise dots are not charged before 2027-01-13 | Official docs; Help Center |
| Enterprise: billing starts | Billing starts for all enabled dots from 2027-01-14 | Help Center |
| Enterprise: delegated tasks | Work that dot delegates to ChatGPT Work or Codex threads is billed separately at standard rates | Help Center |
| Business Standard | Usage limits apply | Help Center |

Three places where it is easy to miscount:

- **"dot conversations do not use the allowance" does not mean "everything is free".** The Codex or Work tasks it starts for you draw down the corresponding product's allowance as usual.
- **"Enabled" means a dot that is not paused.** The official docs Manage dots permissions and capabilities state: billing stops while an admin has paused it, and resumes once it is back to the active state.
- **ChatGPT Work and Codex share pricing, credits, and usage limits** (Pricing page). Tasks that dot delegates fall within this shared allowance.

For more Enterprise pricing information, the Help Center tells you to contact your OpenAI account representative.

## Safety boundaries: what it can do on its own and what it cannot

### What it can do when you send no message

| Without waiting for a new message from you, it can | It cannot |
| --- | --- |
| Research in the background, then suggest what it can help with | Send messages to other people |
| Look through connected information on its own, and form memories from it | Modify content through plugins |
| Run reminders or recurring tasks you have set up | Control a browser or computer |

The limits in the right column apply only to proactive research. Follow-up actions after research must go through permissions and review as usual. Scheduled tasks you set up run with the permissions you gave, which is a different thing from proactive research.

You can view scheduled tasks on dot's profile page, and pause it when you do not want it to continue. Enterprise admins cannot turn off proactive research on its own.

### Five "does not equal" cases

| Easy to assume | In fact | What to do |
| --- | --- | --- |
| Disconnect an app, and the data is withdrawn | Disconnecting only blocks new access. Information dot already has stays in its own context | To delete its own memory, the only way is to delete the dot |
| Paused means all work stops | Pausing deletes no information and does not stop all the work. Separate Work / Codex tasks and separately scheduled tasks may continue | Check in the Activity View and in **Scheduled** separately, and stop them separately |
| Writing a rule is the same as granting permission | Custom rules do not grant app or computer access, and they do not override built-in safety mechanisms | Permissions are granted separately in Plugins and `Computers` |
| I am signed in, so dot is signed in too | Its cloud browser has its own sign-in sessions | Complete the sign-in request it sends, or take over and sign in yourself, then return control |
| Text messages are end-to-end encrypted | A third party, Linq, handles text messages before they reach OpenAI. It is not end-to-end encryption, even with iMessage or RCS | Do not send sensitive content by text message |

### What always requires you to do it yourself

- **Changing passwords and transferring money between financial accounts.** dot can help with the work around these steps, but the steps themselves must be handed back to you.
- **Actions that need your confirmation every time.** Permanently deleting data, installing or running software of unknown origin, and granting new security-sensitive permissions.
- **Verification codes and security checks.** It may need you to provide a verification code, or you take over and complete the step yourself.

### Other boundaries to know

- **Only you can direct your dot.** Other people's direct messages or @ mentions will not make it start working. Messages it posts in a channel are visible to everyone in that channel.
- **Approvals have a scope.** Approving one message does not mean allowing it to contact others on your behalf from then on.
- **Spending money needs your approval.** It can place orders with the card you have saved on a merchant's website, but it needs your approval. When checking out with Wallet, every payment needs your biometric confirmation.
- **Review is not foolproof.** dot makes mistakes. OpenAI itself states that Auto-review coverage for browser, desktop, and delegated actions is still being evaluated.
- **Web pages, emails, and documents can hide malicious instructions.** This is called prompt injection. dot is trained to tell your instructions apart from the content it reads, but these safeguards only reduce the risk and cannot eliminate it.
- **It shares memory with ChatGPT, and single entries cannot be deleted.** dot receives ChatGPT's memory and the context of recent conversations, and it can search your past ChatGPT conversations. You currently cannot view, delete, or modify individual dot memories. Turning off ChatGPT's Memory only stops the sharing; it does not delete the information it has already received.
- **Undo is not guaranteed to work.** Whether a completed action can be undone depends on the action and the app. Deleting the dot does not undo the changes it made in connected apps either, or recall messages that have already been delivered.
- **How data is used depends on the settings.** Business, Enterprise, and Edu workspaces do not use your content to train models by default. For personal plans, look at the "Improve the model for everyone" setting. OpenAI does not directly use proactive research or the notes dot writes for itself to train models.
- **Local access has a wind-down period.** After an admin turns off local access, local tasks that were already authorized may keep running until they finish.
- **Multi-factor authentication (MFA) is recommended.** The entry point is `Settings > Security and login`.

Regulated or Healthcare workspaces have one more layer: the privacy and security FAQ says dots are HIPAA eligible when the conditions are met, but the HIPAA article on the same Help Center lists "Use Codex in the cloud" on its list of things not covered. Before you let dot hand a task to a Codex cloud environment, check with your admin.

## Avoid these pitfalls

| Symptom | Cause | Fix |
| --- | --- | --- |
| dot cannot use my computer or local tools | You did not click **Allow access** in the **desktop app on that computer**; the computer is offline or the app is not open; you assumed that connecting the computer to Codex or turning on Work Sync was the same as connecting it to dot | On that computer: profile page `Computers` > `Your computer` > **Allow access**, then click once more to confirm. Keep it online with the app open |
| dot cannot use a certain app or website | The plugin is not installed or is connected to the wrong account; it has read-only access; the connection has expired; the sign-in state of the cloud browser is separate from your browser; the website blocks the cloud browser | Check the plugin and the account, and see what it is allowed to do; reconnect if the connection has expired; complete the sign-in request, or take over to sign in and then return control. If the website blocks it, you can tell it to use a connected computer instead |
| I approved it, but the action is still blocked | There are separate sign-in, connection, or approval requests in the task that have not been handled; a rule requires you to give an explicit order; "I want a draft" does not authorize sending | Open the task and handle the pending requests; tell it plainly to perform this action. Custom rules do not grant authorization, and they do not override safety mechanisms |
| Cannot find dot's work results or files | The task is on another computer or in a cloud environment; the computer dot uses was changed, and old tasks do not move over | Open the task on the profile page to see progress, files, and results. Local tasks are in the sidebar of the connected computer; recurring tasks are under `Scheduled` |
| dot stopped, or missed an instruction | It is waiting for your decision, approval, sign-in, or connection; it has been paused; the correction was sent in a different conversation | Open the task that went wrong and handle the pending items; resume it if it is paused; correct it inside that task, with files or links attached |
| Cannot find dot | Wrong account or workspace; the plan has not rolled out to your account yet | Confirm the account and workspace, and open `chatgpt.com/dots`; on the phone, look at the `Dot` tab or `Dots` in the sidebar |
| Problems with calls to dot | The Help Center gives no cause | Open the conversation with dot and tap the phone button. If calls do not work, continue by typing |
| Changed the Memory settings, but dot still seems to remember | dot's own notes are independent of ChatGPT's memory settings | Turning off sharing does not delete the information it has already received. The only way to delete it is to delete the dot |
| dot disappeared after switching from Pro to Plus | The Help Center's wording: switching from a Pro subscription to Plus removes access to dot | Save the results you want to keep elsewhere before downgrading. Whether they are restored after you resubscribe is not stated officially |
| Cannot find the entry point in a mobile browser | Mobile web does not support dot | Install the latest version of the mobile app, or use the desktop app or desktop web instead |
| Paused, but work is still running | Pausing only stops dot's current main task. Delegated Work / Codex tasks and separately scheduled tasks may continue | Check them one by one in the Activity View and in `Scheduled`, and stop them one by one |
| Disconnected a plugin, and assumed the data was withdrawn | Disconnecting only blocks new access; the information dot already obtained is still there | To clear its own memory, the only way is to delete the dot |
| Added it to a Slack channel, but it does not watch the channel | Merely adding it to a channel does not set up monitoring | Say explicitly which channels to look at, what to look for, and when to notify you, and have it confirm |
| It can be found in Slack, but it says it cannot connect to my email or computer | Channels, apps, and the local computer are three separate kinds of connection | Connect them separately: apps through Plugins, the computer through `Computers` |

## Troubleshoot each item with the official steps

The Help Center's troubleshooting section has eight items in all. The previous section gave the causes; this section gives steps you can click through.

### dot cannot use my computer or local tools

1. On the computer you want dot to use, open dot's profile page in the ChatGPT desktop app.
2. Under `Computers`, find `Your computer` and click **Allow access**.
3. Read the confirmation prompt, then click **Allow access** again.

Keep that computer online with the ChatGPT app open. `Offline` only means the computer is unavailable, not that the connection has been revoked. If you cannot click `Allow access`, confirm that you are using the desktop app on that computer.

### dot cannot use a certain app or website

1. Connected apps: confirm that a supported plugin is installed and that it is connected to the correct account.
2. Look at the actions it is allowed to take. Being able to read information does not necessarily mean it can change information or send messages.
3. If the connection has expired, open the reconnect request and connect again.
4. Websites that need a sign-in: complete the sign-in request dot sends you, including any verification the website requires. Or take over, sign in yourself, and return control once you are done.
5. The website blocks the cloud browser: tell dot to try a connected computer instead. This may open a separate local task; it does not carry over the cloud browser's session, and it does not guarantee the website will work.

### I approved it, but the action is still blocked

1. Open the task that went wrong and see whether there are separate sign-in, connection, or approval requests.
2. Look at the related custom rule. If it requires you to give an explicit order, directly ask dot to perform this action.
3. Remember two things: custom rules do not grant app or computer access, and they do not override built-in safety mechanisms. Some steps (such as changing a password) must be completed by you in person.

### Cannot find dot's work results or files

1. In the desktop app, click dot's name or avatar to open its profile page, then open the related task.
2. Local tasks are in the sidebar of the connected computer. Recurring work is under `Scheduled`.
3. Go back to the computer or cloud environment where the task was originally, and look there. If the computer dot uses has changed, existing tasks do not move over.
4. To see its cloud computer, go to `Computers` on the profile page. To operate it yourself, click **Take over**; when you are done, click **Return control**.

### dot stopped, or missed an instruction

1. Open the task that went wrong and handle all the requests waiting for your decision, approval, sign-in, or connection.
2. If you paused it, resume it. If an admin paused it or revoked the permission, go to the admin.
3. For recurring work: open `Scheduled` and check the saved instructions and times. Even if it is marked as completed, look at the result.
4. Send the correction in the task that went wrong, stating the result you want, with files or links attached.
5. To report a bug or give feedback, say so in the main conversation with dot. It may also suggest that you submit feedback on its own.

### Cannot find dot

Confirm that you are using the correct account and workspace, then open `chatgpt.com/dots`. Match your plan:

- **Plus**: rolling out gradually to some accounts in supported regions.
- **Pro**: available to users aged 18 or over outside the European Economic Area, Switzerland, and the UK.
- **Business Premium**: available in regions where ChatGPT is supported, and subject to workspace eligibility requirements.
- **Business Standard**: switch to your Business workspace. If you still cannot see the create entry point, it may still be rolling out to you. Use the latest version of the app on your phone.
- **Enterprise, including Edu and Healthcare**: ask your workspace admin whether dots is turned on for your role.

### Problems with calls to dot

Open the conversation with dot and tap the phone button. If calls do not work but chat does, continue by typing in the conversation.

### What changes when you change Memory settings or delete dot

- `Customize > Memory` on mobile shows the shared ChatGPT memory settings. The memory dot saves itself is separate, and changing it there does not necessarily change the notes it has already taken.
- Deleting the dot ends access to it and starts deleting the memory it saved itself. Save the results you need first, and read the deletion prompt carefully before confirming.

## Next steps

1. dot hands coding tasks to Codex: read [Codex CLI](./codex-cli) to learn how to use it in the terminal.
2. To see what the document tasks dot delegates look like: read [ChatGPT Work](./chatgpt-work).
3. To let dot run code in a cloud environment: read [Codex Cloud](./codex-cloud).
4. To compare "controlling your own computer from the phone" and "work running in the cloud": read [Codex Remote](./codex-remote).
5. If the concepts are mixed up: look them up in the [Codex Glossary](./codex-glossary). For the overall route, see the [Codex Family Learning Map](./).

## Further reading

- [Getting started with your dot](https://help.openai.com/en/articles/20001530-getting-started-with-your-dot): the main source of facts for this page, with the most complete troubleshooting section. There is a [Chinese version](https://help.openai.com/zh-hans-cn/articles/20001530-getting-started-with-your-dot), but its content is older than the English one.
- [Introducing dots](https://openai.com/index/introducing-dots/): OpenAI's launch post, published 2026-09-29, with an update note dated 2026-11-03 inside. It covers the positioning, the safety design, and the billing principles. There is a [Chinese version](https://openai.com/zh-Hans-CN/index/introducing-dots/).
- [How we build safety, security, and privacy into dots](https://openai.com/index/how-we-build-safety-security-and-privacy-into-dots/): OpenAI's safety blog. It covers how action rules, safe sign-in, and the limits on proactive research are implemented.
- [Dots privacy, security, and safety FAQs](https://help.openai.com/en/articles/20001529-dots-privacy-security-and-safety-faqs): questions and answers on permissions, memory, deletion, and data use.
- [Meet dots](https://learn.chatgpt.com/docs/dots): the overview page of the official docs. Its five subpages cover [getting started](https://learn.chatgpt.com/docs/dots/getting-started), [channels for messaging](https://learn.chatgpt.com/docs/dots/channels), [tasks and memory](https://learn.chatgpt.com/docs/dots/tasks-and-memory), [connecting computers and apps](https://learn.chatgpt.com/docs/dots/computers-and-apps), and [controlling your dot](https://learn.chatgpt.com/docs/dots/controls).
- [Manage dots in ChatGPT workspaces](https://help.openai.com/en/articles/20001554-manage-dots-in-chatgpt-workspaces): written for admins, on which permissions a workspace can control.
- [Manage dots permissions and capabilities](https://learn.chatgpt.com/docs/enterprise/dots-admin-guide) and [Safety and security in dots](https://learn.chatgpt.com/docs/enterprise/dots-security): written for admins, on enabling, auditing, offboarding, and data retention.
- [Cloud environments](https://learn.chatgpt.com/docs/environments/cloud-environments): how to create a Codex cloud environment.
- [Auto-review](https://learn.chatgpt.com/docs/sandboxing/auto-review): how auto-review works on the Codex side, to help you understand that check inside dot.
- [ChatGPT Release Notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes): dated dots updates, such as creation on mobile, text messaging, and Wallet.
- [Pricing](https://learn.chatgpt.com/docs/pricing): the plan and usage rules shared by ChatGPT Work and Codex.

### Where official pages disagree

When two official pages say different things, this page gives both and does not rule for you. The table below is as of 2026-11-24.

| Topic | Version A | Version B |
| --- | --- | --- |
| Whether Plus and Business Standard can use it | Help Center: Plus is rolling out to some accounts, and Business Standard is rolling out gradually in the US | The official docs Meet dots list only Pro, Business Premium, and Enterprise / Edu / Healthcare. The ChatGPT Release Notes of 2026-11-19 say "Dots are currently available to Pro users" |
| Where to create it | Help Center: the mobile app, the desktop app, and desktop web all work | Launch post (2026-09-29): create it in the desktop app or a desktop browser first; only then can you send messages from the mobile app. The official What's new records that creation on mobile was added only in the week of 2026-10-05 to 10-09 |
| Teams channel | Launch post: you can message dot in Slack and Teams. The admin article has an "Add dots to Slack and Microsoft Teams" permission | The Help Center and the official docs give only the setup steps for Slack |
| Availability of text messaging | Help Center: some Pro users in the US, Canada, and Mexico | Official docs Message your dot and What's new (2026-10-28): open only to Pro users in the US |
| The entry point for custom rules, and the name of the second option | Help Center: on mobile, `Customize > Custom rules`; the option is called **Take action if pre-approved** | Official docs Control your dot: on desktop and web, `Settings` > `Personalization`; the option is called **Take action when you say so** |
| The first button for connecting a computer | Help Center: find `Your computer` under `Computers` and click **Allow access** | Official docs: click **Allow** first, then confirm **Allow access** |
| What "delete" is called, and what it removes | The English Help Center calls it **Delete**, and reminds you to check and stop unwanted scheduled tasks yourself | The Chinese Help Center and the official safety docs call it "Reset", and state that it deletes conversations, memory, and scheduled tasks |
| Enterprise residency and EKM eligibility | Help Center: only workspaces with data or inference residency in the United Arab Emirates are unavailable | The Local computer access page says data residency, EKM, and FedRAMP workspaces are not supported during the preview. Safety and security in dots says data residency is supported, EKM is supported for eligible workspaces, and FedRAMP is unavailable |
| When Enterprise gets it by default | Help Center and official docs: available by default from 2026-11-18 unless an admin opts out | Safety and security in dots calls 2026-11-04 the GA date |
| Whether dots is HIPAA compliant | Privacy and security FAQ: HIPAA eligible when the workspace is eligible, has a BAA, and it is enabled for your role | The HIPAA article's "covered" and "not covered" lists both leave dots out |
| Whether dot has its own mailbox | Help Center: at launch, a dot cannot be given a separate email address | The privacy and security FAQ mentions that when a dot has its own mailbox or Slack account, it can still use the plugins you have connected |
| How Enterprise is billed | Help Center: a fixed rate by type of work | Official docs Manage dots permissions and capabilities: a fixed rate or pay-as-you-go |

<!-- TODO: needs verification — Enterprise data residency, EKM, and FedRAMP eligibility: the Help Center, cloud-local-access, and dots-security pages disagree with each other, and which one prevails is unclear; checked help.openai.com/en/articles/20001530, learn.chatgpt.com/docs/enterprise/cloud-local-access, learn.chatgpt.com/docs/enterprise/dots-security -->

## Related pages

- [Codex Family Learning Map](./): the learning map of the Codex family
- [Codex CLI](./codex-cli), [ChatGPT Work](./chatgpt-work), [Codex Cloud](./codex-cloud), [Codex Remote](./codex-remote)
- [T3 Code](../t3code/): an open-source coding agent console that brings the agents you have installed on your machine into one interface
- [Cindy](../cindy/): an open-source agent app where your computer acts as the server
- [Tailscale](../tailscale/): the VPN provider officially supported today for connecting a Codex cloud environment to intranet services
- [UU Remote](../uu-remote/): NetEase's remote control software, for operating another computer directly from your phone

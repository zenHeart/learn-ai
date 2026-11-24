---
title: NetEase UU Remote learning map
description: "NetEase UU Remote is NetEase's remote control software. It takes the screen streaming route: install the client on both ends, then connect by signing in to the same account or by passing on a device ID and verification code. This page is the product overview plus a decision table. It first answers 'which one should I install, and when should I use it', then hands you to the tutorial."
domain: product
tags:
  - remote-control
  - remote-desktop
  - netease
role: map
pageClass: readable-tables
---

# NetEase UU Remote learning map

> **网易UU远程** (NetEase UU Remote) is NetEase's remote control software. It lets you operate your own computer while you are away from it, or fix someone else's computer. It takes the "screen streaming" route: install the client on both ends, then sign in to the same account or pass on a "device ID + verification code", and the desktop of the other device appears in front of you.
>
> This page is the **product overview + decision table**. Installation and daily use are both in the [tutorial](./uu-remote). UI text and numbers come from official NetEase pages opened on 2026-11-24.

## Audience / prerequisites / non-goals

- **Who**: people who write frontend code and have used a command line, but have never touched remote control software.
- **Prerequisites**: two internet-connected devices and a UU Remote account. For the system requirements of each platform, see the "Install" section of the tutorial.
- **Non-goals**:
  - No internals. The vendor has not published the connection setup, codecs, protocol or server architecture.
  - No UU加速器 (UU game accelerator), MuMu模拟器 (MuMu Emulator) or 网易千千壁纸 (NetEase Qianqian Wallpaper). They are only products listed under "Friendly links" on the official site.
  - No deep dive into "cloud devices" (game cloud PC, AI cloud PC). They are another group of products in the official site's navigation.
  - No feature or price comparison with other remote control software. This page did not open their official sites.

## Product family

The "official names" in the table below are copied from official pages opened on 2026-11-24. This directory has **only one tutorial**; every other item takes one row on the map.

| Official name | Official URL | On this site |
|---|---|---|
| **Windows 版客户端** (Windows client) | [Download page](https://uuyc.163.com/download/) · [Official home page](https://uuyc.163.com/) | Standalone page: [tutorial](./uu-remote) |
| **macOS 版客户端** (macOS client; works both as controller and as controlled computer) | Download page · [Control a Mac remotely](https://uuyc.163.com/features/mac/) · [How to control a Mac](https://uuyc.163.com/help/macos.html) | Tutorial section: making a Mac controllable, under Install |
| **iOS 版客户端** (iOS client; listed in the App Store as "UU远程-流畅可靠，就是好用！", that is "UU Remote: smooth, reliable, simply easy to use"; seller Guangzhou NetEase Computer System Co.Ltd) | [App Store](https://apps.apple.com/cn/app/id1642306791) · Download page | Tutorial section: controlling a computer from a phone |
| **Android 版客户端** (Android client) | [Download page](https://uuyc.163.com/download/) | Tutorial section: controlling a computer from a phone |
| **Android TV 版客户端** (Android TV client; the official site also calls it the TV edition; controller only, and it connects only to Windows) | Download page · [Play on the living room TV](https://uuyc.163.com/features/tv/) · [TV usage tutorial](https://uuyc.163.com/help/20250117/40220_1207352.html) | One row on the map |
| **UU远程精简版** (UU Remote Lite; the controlled computer for remote assistance, Windows only, no install and no sign-in) | [Lite edition page](https://uuyc.163.com/features/sos/) · [Usage tutorial](https://uuyc.163.com/help/green.html) | Tutorial section: giving someone remote assistance |
| **UU远程运维版** (UU Remote Ops edition; bulk deployment in server rooms, with a command line) | [Command line tutorial](https://uuyc.163.com/help/cmd.html) · [Build tutorial](https://uuyc.163.com/help/ops.html) | One row on the map |
| **uuyc-cli** (official command line tool) | [CLI tutorial](https://uuyc.163.com/help/cli.html) | Tutorial section: official CLI |
| **VIP 会员、全球 VIP 会员** (VIP membership and Global VIP membership) | [Membership benefits](https://uuyc.163.com/help/membership.html) · [Membership service agreement](https://uuyc.163.com/help/service-agreement.html) | Tutorial section: pricing |
| **UU远程 Linux PC 端** (UU Remote for Linux PC; in beta, supports both the controller and the controlled role) | [Linux beta FAQ](https://uuyc.163.com/help/linux_test.html) | One row on the map: in beta |
| **UU远程 HarmonyOS 移动端** (UU Remote for HarmonyOS mobile; in beta, controller only) | [HarmonyOS beta FAQ](https://uuyc.163.com/help/harmonyos_test.html) | One row on the map: in beta |
| **掌机** (handheld consoles) | The positioning copy on the official home page mentions handheld consoles; the download page has no handheld client entry | One row on the map: go by the official site |
| **云设备** (cloud devices: game cloud PC, AI cloud PC, cloud drive) | The "cloud devices" group in the official site's navigation · [How to use the cloud drive](https://uuyc.163.com/help/20260422/42867_1297276.html) | One row on the map: not this product |

<!-- TODO: needs verification — which specific handheld models are meant, and whether there is a dedicated client or install method. Checked the official home page, the download page, the help center directory and the sitemap; the home page mentions handheld consoles only in its positioning copy, and there is no matching page -->

### Names that collide

- **UU Remote ≠ UU加速器.** UU加速器 is a game accelerator. It sits under "Friendly links" on the official site and is unrelated to this product. One confusing spot: in the official router documentation, when a router acts as the "power-on helper device" for UU Remote, the plugin it installs is called "网易UU加速器插件 WOL 版本" (NetEase UU Accelerator plugin, WOL edition).
- **UU Remote ≠ MuMu模拟器, 网易千千壁纸.** They are listed under "Friendly links" too.
- **"GameViewer远程" is the old name.** The official announcement page (page dated 2024-12-10) states that "GameViewer远程" was officially renamed "网易UU远程". See the [official announcement](https://uuyc.163.com/blog/20241206/41377_1198665.html).
- **VIP ≠ Global VIP.** Global VIP adds one benefit: "global remote control nodes". The official FAQ states that UU Remote prompts you to buy Global VIP when the controlled computer is overseas, or when the controller has a VPN on and is identified as overseas. For prices and benefits, see the "Pricing" section of the tutorial.
- **The security password is not the connection password.** It locks the client; connections rely on the verification code.
- **Android screen sharing is not remote control of an Android phone.** The other side can only watch, listen and annotate, not operate.

### Checking the official top-level navigation

The two-level navigation of the official home page is below. Every item has somewhere to go.

| Use case (official name) | Official URL | In one line |
|---|---|---|
| **远程办公** (remote work) | [features/work](https://uuyc.163.com/features/work/) | Reach back to your own workstation while developing, designing or editing |
| **远程游戏** (remote gaming) | [games](https://uuyc.163.com/games/) | Play PC games from a phone, tablet or TV |
| **远程协助** (remote assistance) | [features/support](https://uuyc.163.com/features/support/) | Help someone fix their computer with the device ID and verification code they pass on |
| **客厅畅玩** (living room play) | [features/tv](https://uuyc.163.com/features/tv/) | Control a computer from the TV edition |
| **Mac 电脑被控** (Mac as the controlled computer) | [features/mac](https://uuyc.163.com/features/mac/) | Control a Mac from several kinds of devices |

| Feature (official name) | Official URL | Where in the tutorial |
|---|---|---|
| **文件传输** (file transfer) | [features/file](https://uuyc.163.com/features/file/) | Transfer files, sync the clipboard, send audio |
| **高清画面** (HD picture) | [features/color](https://uuyc.163.com/features/color/) | Adjust picture quality, frame rate and resolution |
| **隐私防护** (privacy protection) | [features/privacy](https://uuyc.163.com/features/privacy/) | Turn on privacy mode in a meeting room or a public place |
| **多屏协作** (multi-screen collaboration) | [features/device](https://uuyc.163.com/features/device/) | Watch several screens or several devices at once |
| **远程开机** (remote wake-up) | [features/wol](https://uuyc.163.com/features/wol/) | Remote wake-up |
| **按键映射** (key mapping) | [features/keyboard](https://uuyc.163.com/features/keyboard/) | Playing games |
| **无线副屏** (wireless secondary display) | [features/wireless-screen](https://uuyc.163.com/features/wireless-screen/) | Use a tablet or phone as a wireless secondary display |

## What problem it solves

### Without it vs with it

| Scenario | Without remote control | With UU Remote |
|---|---|---|
| A file is stuck on your home computer, which is powered off | You have to go back, turn it on and get the file | Wake the computer up remotely, then get the file with file transfer (the wake-up conditions must be configured beforehand) |
| Your parents' computer has a problem and you are in another city | You guide them step by step over the phone | Your parents pass on the device ID and a verification code, and you operate directly |
| Your home computer is running a build or an agent | Someone has to sit at it | Check progress and type the next step from your phone; after the terminal session disconnects, you can reattach |
| You want the computer's picture on a big screen | Move the computer next to the TV | Control it from the TV edition, or attach a tablet as a wireless secondary display |

### Compared with the alternatives

Only what this page can verify is listed.

| Option | How it connects | Who it suits | On this site |
|---|---|---|---|
| UU Remote | **Screen streaming**: install the client on both ends, then sign in to the same account or pass on a device ID and a verification code | People who want it to work straight after installing and do not want to configure networking themselves | This directory |
| Tailscale plus the system's built-in remote desktop | First put the devices into one private network at the **network layer**, then connect with the remote desktop built into the system | People who are willing to configure things themselves and want to use the system's remote desktop | [Tailscale](../tailscale/) |
| Cindy | Has a built-in phone remote desktop feature | People who want to handle the phone side in the same tool | [Cindy](../cindy/) |
| Other remote control software (ToDesk, 向日葵 (Sunlogin), RustDesk, etc.) | This page did not check their official sites, so there is no comparison | None | None |

## Quick decisions

| My situation | What to use |
|---|---|
| Fixing a colleague's or a parent's computer problem once | Remote assistance: the other side passes on a "device ID + temporary verification code" |
| The other side has no client and does not want one | Send them [UU Remote Lite](https://uuyc.163.com/features/sos/); Windows controlled computers only |
| Your own computer, and you want to connect at any time | Sign in to the same account on both ends, then click **进入桌面** (Enter desktop) on the controller |
| Your own computer, even when it is powered off | Set up remote wake-up first: network adapter, motherboard and a helper device on the LAN; you need all three |
| The controlled computer is a Mac | First turn on **允许本设备被控** (Allow this device to be controlled) and two system permissions on the Mac |
| Checking a coding agent's progress from your phone while you are out | Same-account remote control: open **设备详情** > **终端** (Device details > Terminal), or use the full-screen desktop with mini window mode |
| You only want to fetch one file | Same account: use the **文件传输** entry; remote assistance: use drag and drop or copy and paste |
| Operating in a meeting room or a café | Turn on **被控端防窥模式** (Privacy mode on the controlled computer) and **被控端自动锁屏** (Auto-lock the controlled computer) |
| Cannot connect on a company or school network | In the client, **设置** > **网络** > **代理设置** (Settings > Network > Proxy settings); this assumes you already have a working proxy |
| You want 4K, 144 fps, True Color, HDR, or several screens controlling several screens | These are VIP benefits; the official announcement says they go live on 2026-12-01 |
| You want to show an Android phone's screen to someone | Android screen sharing; the viewer can only watch, not control |
| You would rather set up your own network and install one fewer remote control client | See the [Tailscale](../tailscale/) page |

## How to read this directory

| Order | What to read | Goal |
|---|---|---|
| 1 | The tutorial's "Core concepts" | Tell the controller, the controlled computer, the device ID and the verification code apart |
| 2 | The tutorial's "Install" and "First task in 10 minutes" | Connect once with a device ID and a verification code |
| 3 | The tutorial's "Daily use" | Set up unattended access, remote wake-up, file transfer and privacy mode |
| 4 | The tutorial's "Pricing" and "Security and privacy essentials" | Know where the free version ends, and know what you must not give out |
| 5 | The tutorial's "Real-world use cases" | Use the home computer as a remote workstation |

Read Core concepts before you touch anything. If you skip it and connect directly, you will get stuck on "which end a switch is configured on".

## Official resources

- [Official home page](https://uuyc.163.com/): product positioning, entry points to the features, security statement.
- [Download page](https://uuyc.163.com/download/): system requirements and current versions of the five clients.
- [Help center](https://uuyc.163.com/help/): the directory of all feature guides and FAQs.
- [Remote assistance feature page](https://uuyc.163.com/features/support/): remote assistance in three steps, and three platforms for the controlled computer.
- [How to remotely assist another computer](https://uuyc.163.com/help/20241204/40220_1197664.html): the most complete explanation of verification codes, verification methods and favorite devices.
- [How to set up remote wake-up](https://uuyc.163.com/help/4.0wol.html): wake-up conditions and step-by-step configuration.
- [How to transfer files](https://uuyc.163.com/help/20241210/40220_1199229.html): where each of the three transfer methods applies.
- [How to turn privacy mode on or off](https://uuyc.163.com/help/20241203_40221_1197692.html): the difference between the two privacy levels.
- [Error code solutions](https://uuyc.163.com/help/errorcode.html): look here when you cannot connect or install.
- [Membership benefits](https://uuyc.163.com/help/membership.html): benefit comparison of the free version, VIP and Global VIP.
- [Bounty hunter program](https://uuyc.163.com/bounty/): the official channel for reporting vulnerabilities and getting rewards.
- [llms.txt](https://uuyc.163.com/llms.txt): the official summary of product facts for AI and search engines; it lists every official page entry.

## Related pages

- [Tutorial](./uu-remote): the only tutorial page in this directory, from installation to daily use.
- [Tailscale](../tailscale/): compares two remote approaches, "hole punching at the network layer" and "screen streaming".
- [Cindy](../cindy/): built-in phone remote desktop feature.
- [T3 Code](../t3code/): approve an agent's next step from your phone.
- [Codex](../codex/): one of the coding agents that run on a remote dev machine.
- [Claude](../claude/): same as above.

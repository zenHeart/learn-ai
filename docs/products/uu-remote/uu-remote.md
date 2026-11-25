---
title: NetEase UU Remote tutorial
description: "NetEase UU Remote is remote control software: when you are not at the computer, you can still see its screen, operate it and retrieve its files from a phone, a tablet or another computer. This page gets both ends installed, connects you to a first computer with a device ID plus a verification code, and then teaches unattended access, remote wake-up, file transfer and privacy mode."
domain: product
tags:
  - remote-control
  - remote-desktop
  - netease
role: tutorial
pageClass: wide-figures
---

# NetEase UU Remote tutorial

> **网易UU远程** (NetEase UU Remote) is NetEase's remote control software, and it solves one problem: when you are not at the computer, you can still see its screen, operate it and get its files. The goal of this page is to have you connect to a first computer with a "device ID + verification code" and operate it once, within 10 minutes.
>
> The UI text and numbers on this page come from official NetEase pages opened on 2026-11-24. Anything that can change (prices, versions, benefits) is marked with a date.

## What you will be able to do

- Explain what the controller, the controlled computer, the device ID and the verification code each are, and tell "temporary assistance" apart from "unattended access".
- Install UU Remote on Windows, macOS, a phone and a tablet, and make a Mac controllable.
- Connect to a computer with a "device ID + verification code", open one of its windows, then disconnect safely.
- Set up your own computer so you can connect at any time: a fixed verification code, start at boot, remote wake-up.
- Transfer files, switch between several screens, turn on privacy mode, know where the free version ends and VIP begins, and know which information you must not give out.

## Prerequisites and environment requirements

- **Who**: people who write frontend code and have used a command line, but have never touched remote control software.
- **Prerequisites**:
  - Two internet-connected devices. One acts as the controlled computer (a Windows or macOS computer), and one acts as the controller (a Windows or macOS computer, or an Android or iOS phone or tablet).
  - A UU Remote account. The controller must be signed in; the controlled computer does not need to sign in when it accepts remote assistance.
  - The controlled computer is powered on and online, and the UU Remote client is running on it.
- **Non-goals**:
  - No internals. The vendor has not published the connection setup, codecs, protocol or server architecture, and this page does not cover them at all.
  - No UU加速器 (UU game accelerator), MuMu模拟器 (MuMu Emulator) or 网易千千壁纸 (NetEase Qianqian Wallpaper), and no "cloud devices" (game cloud PC, AI cloud PC). They are other products in the official site's navigation.
  - No feature or price comparison with other remote control software. This page did not open their official sites.
  - UI text follows the version you use. Interface labels on this page are the English interface text of the Windows client, version 4.48; the phone apps and the system dialogs of macOS may word things differently.

## Core concepts

Remote control has few terms, but each one is tied to "which end". Go through the glossary first, then read the details.

### Glossary

| Term | One-line explanation | Why you need it |
|---|---|---|
| **Controller** | The device in your hands that you operate (the official docs also write **控制端** and **主控方**, both meaning controller) | Every setting below must be assigned to the right end |
| **Controlled computer** | The computer being operated remotely (the official docs also write **被控方** and **被协助方**, both meaning the controlled computer) | Remote wake-up, privacy mode and system permissions are all configured on this end |
| **Device ID** (device code) | A string that identifies each device, like a house number | The controller uses it to know which one to connect to |
| **Temporary verification code** | The passcode presented when connecting; it changes automatically on a schedule you set | It changes after use, so nobody else can remember it |
| **Custom verification code** | A fixed verification code that you set yourself (the official docs also call it **长效验证码** (long-lived code)) | When you connect to the same device often, you do not have to pass on a new code each time |
| **Remote assistance** | A temporary way in: pass on a device ID plus a verification code, and the controlled computer does not sign in | Fixing a computer for someone else, or connecting across accounts |
| **Same-account remote control** | Both ends sign in to the same account, and you connect from the device list | The simplest way to connect to your own devices |
| **Unattended access** | The controlled computer can be connected even when nobody is at it: a fixed verification code, start at boot, remote wake-up | You are out, and the computer is at home or at the office |
| **Security password** | A password that locks the client; it is not the connection password | Stops other people from changing settings on the controlled computer or quitting the client |
| **Remote wake-up** (WOL) | A network signal wakes up a computer that has been shut down | You can connect even when the computer is off |
| **Direct connection / relay** | Data goes straight between the two devices / data is forwarded through the vendor's relay routes | Affects latency and bandwidth |
| **Screen streaming** | The controlled computer sends its screen picture and audio to the controller in real time for display | What you see on the controller is this data stream |
| **Privacy mode** (privacy screen) | During a remote session, the physical screen of the controlled computer goes black or shows a screensaver | People nearby cannot see what you are doing |
| **File transfer** | Moves files between the two ends | No cloud drive or chat tool needed |
| **Multi-screen collaboration** | Switch between and detach the controlled computer's several screens, or create virtual screens (screens simulated in software) | One screen cannot hold several windows |
| **Key mapping** | Show computer keys on the phone or tablet screen, so touch does the work of a keyboard, mouse or gamepad | A phone has no keyboard or gamepad |
| **Wireless secondary display** | Turn an Android or iOS phone or tablet under the same account into an extended screen for the computer | No second monitor at hand |

### What remote control is

The vendor's definition in the NetEase UU Remote Software License and Service Agreement is: connect to the controlled computer from another location, display its desktop environment on your own computer, and then operate on the distant computer through your local computer, for example configuring it, installing programs and running programs.

The same agreement states two things that a newcomer must remember:

- **The controlled party can stop authorization at any time**, by disconnecting, cancelling sharing and so on.
- **The software cannot yet limit what the controlling party is allowed to do.** Once a computer becomes the controlled party, the controlling party can technically do everything that can be done after the system starts, including reading and transferring all files, installing and uninstalling apps, restarting and shutting down.

So the device ID plus the verification code is the whole key to this computer, not just a ticket to "take a look at the screen". Source: [Software License and Service Agreement](https://uuyc.163.com/help/20240402/40294_1146884.html).

### Controller and controlled computer

The **controller** (the device in your hands that you use to operate) starts the connection, displays the picture and sends keyboard and mouse input. The **controlled computer** (the computer being operated remotely) provides the picture and carries out the operations. Both devices must have UU Remote installed. If you cannot tell the two ends apart, you will configure settings on the wrong one: the network adapter and BIOS settings for remote wake-up are all on the controlled computer, and the picture quality settings in **Control Center** are on the controller.

Which devices can act as which end (as of 2026-11-24, from the official download page and help pages):

| Controller | Controlled computers it can operate |
|---|---|
| Windows and macOS computers | Windows and macOS computers |
| Android and iOS phones and tablets | Windows and macOS computers |
| Android TV | Windows computers only |

Three notes:

- Phones and tablets **cannot act as the controlled computer**. An Android device can only "share" its screen for others to watch; they can only watch, listen and annotate, not operate.
- The Linux PC client and the HarmonyOS mobile client are in beta. The official beta pages state that Linux can act as both controller and controlled computer, while the HarmonyOS edition can only act as the controller. See the [Linux beta FAQ](https://uuyc.163.com/help/linux_test.html) and the [HarmonyOS beta FAQ](https://uuyc.163.com/help/harmonyos_test.html).
- For remote wake-up, the help pages for the stable version cover only Windows computers. The Linux beta page states that a Linux controlled computer supports it too, but it is still in beta.

### Two connection routes: remote assistance and same-account remote control

| Item | Remote assistance | Same-account remote control |
|---|---|---|
| How identity is confirmed | The controller enters a device ID and a verification code | Both ends sign in to the same account |
| Does the controlled computer need to sign in | No | Yes |
| Entry point on the controller | **Remote Assistance** > **Start Assistance** | Click **Enter Desktop** on the main page |
| Suits | Fixing computers for parents, colleagues and clients; connecting across accounts | Connecting to your own devices |
| What you cannot use | Cannot create virtual screens or super screens; no separate **File Transfer** entry; no "Terminal" | Needs an account, and the device must appear in the list |

**Why there are two routes**: when you fix a computer for someone else, you should not sign in to your account on their machine, and they should not have to register an account just to be helped. When you connect to your own devices, passing on a verification code every time is too much trouble.

### Device ID and verification code

The **device ID** (the string that identifies each device) is in the client, on the **Remote Assistance** > **Start Assistance** page: the **This Device** area shows **Device ID** and **设备验证码** (Device verification code). Click **Copy & Share** to send both together. The copied content also contains an invitation link, which is valid for 30 minutes by default.

The **verification code** (the passcode presented when connecting) comes in two kinds:

- **Temporary verification code**: changes automatically. The refresh interval can be **After remote session ends**, **Every Hour**, **Every 12 Hours** or **Every 24 Hours**, set under **自动刷新** (Auto refresh). Choose **Off** and it stops changing; when you need a new one, click **Refresh Now** to change it by hand.
- **Custom verification code**: a fixed code that you set yourself, 8 to 16 characters, and it must contain digits and uppercase letters. Under **Settings** > **Security** > **Custom Code**, you can choose **Custom Code Only** or **Use Both Codes**.

The controlled computer can also decide "how others are allowed to connect". There are three ways, and the first is the default:

| Verification method | What the controller does | What the controlled computer does |
|---|---|---|
| **Connect via Code** (default) | Enter the device ID and the verification code | Nothing |
| **Two-step verification** | Enter the device ID and the verification code | After the check passes, also click **Allow** within 60 seconds |
| **Host approval** (connection without a code) | Enter the device ID only | Click **Allow** within 60 seconds |

**Two-step verification** and **Host approval** (connection without a code) are offered only when the controlled computer runs Windows, and a timeout counts as a rejection. A macOS controlled computer supports only **Connect via Code**. What happens without a verification code? Anyone who knows the device ID can connect. So the vendor warns: once **Allow Remote Assistance** is turned on, anyone who obtains the device ID and a verification code can try to connect. Source: [How to remotely assist another computer](https://uuyc.163.com/help/20241204/40220_1197664.html).

### Unattended access and the security password

The recipe for **unattended access** (the controlled computer can be connected even when nobody is at it) on the official feature page is a "custom long-lived verification code". In practice it comes down to three things:

1. Set a fixed custom verification code on the controlled computer, or have both ends sign in to the same account.
2. Turn on **Start with Windows** in **Settings** on the controlled computer, so the client is still there after a restart.
3. When needed, set up remote wake-up too, so a computer that is powered off can be woken.

The **security password** (the password that locks the client) is easy to confuse with the connection password. It belongs to the security lock feature: once locked, other people cannot change the client settings on the controlled computer itself, and they cannot quit the client the normal way, but remote connections still work. The security password is 8 to 16 characters, and the entry point is **More** > **Security Lock** at the top right of the client. **What happens without it**: anyone who can touch this computer can turn off **Allow Remote Assistance**, or change your verification code. When you set up unattended access on a parent's computer, turn it on as well.

### Remote wake-up

**Remote wake-up** (waking a computer that has been shut down over the network) is based on WOL (Wake-on-LAN): when the network adapter receives a specific "wake-up packet" (the vendor calls it a Magic Packet), the computer wakes up.

The controlled computer must meet four conditions at the same time. If any one is missing, it will not wake:

| Condition | Explanation |
|---|---|
| The network adapter supports it and it is turned on | The network adapter supports wake-on-LAN, and the WOL option is turned on in the network adapter driver |
| The motherboard supports it and it is turned on | The motherboard supports wake-on-LAN, and the WOL option is turned on in the BIOS; the vendor notes that laptops mostly do not support it |
| A helper device is on the LAN | The **helper device** (a device on the same LAN as the controlled computer that stays online all the time) sends the wake-up packet. It can be a Windows, macOS or Android device signed in to the same account, and some router models can do it too |
| The client is allowed through | The controlled computer has **Start with Windows** and **Allow Remote Boot** turned on, and no third-party software is blocking them |

**What happens without remote wake-up**: once the computer is shut down, no remote control can connect to it. For the steps, see "Set up remote wake-up" below.

### Direct connection and relay

- **Direct connection**: data goes straight between the two devices. The official home page calls it "high-speed direct connection" and "high-speed dedicated network direct connection".
- **Relay**: data is forwarded through the vendor's relay routes. The membership benefits table has two items: "manually switch the remote control relay route" and "high-speed relay channel for file transfer".

**The vendor has not published** when a connection goes direct and when it goes through a relay, nor the rule it uses to decide. You do not need to understand this part to use it: the client handles the connection itself.

### Screen streaming

**Screen streaming** (the controlled computer sends its screen picture and audio to the controller in real time for display) is how you see the remote desktop. It has three adjustable knobs: resolution (the vendor's upper limit is 4K), frame rate (upper limit 144 fps) and bitrate (upper limit 500 Mbps). Two more switches are **True Color mode** (4:4:4 chroma sampling, which keeps the full chroma and makes the edges of text sharper) and **HDR**.

The official [llms.txt](https://uuyc.163.com/llms.txt) gives a specific warning: do not treat 4K, HDR, 144 fps or 4:4:4 True Color as a fixed result on every device and network. They are also limited by the graphics card, the system version and the membership tier; see the "Pricing" section.

## How it works

Read the next diagram with this question in mind: after I enter the device ID and verification code on the controller, how do the picture and my input travel back and forth between the two devices?

<DocDiagram src="/diagrams/uu-remote-connect.en.svg" alt="This sequence diagram answers one question, in numbered order: after you enter a device ID and verification code on the controller, how do picture and input travel between the two devices? It has three objects: the controller, which is the device in your hands; the controlled computer, which is the computer being operated; and the NetEase service, drawn as a single box. Step 1: the controller sends the device ID and verification code of the controlled computer to the NetEase service. Step 2: the NetEase service verifies and connects. Its internal steps are not published, so the diagram shows only one box: it does not show how verification works or whether data travels directly or through a relay. Once the connection is established, the two ends send and receive data. Step 3: the controlled computer captures the screen and audio, encodes them into a stream, and sends it continuously to the controller. This is the heavy, downstream direction. Step 4: the controller sends keyboard, mouse, and touch events to the controlled computer. This is the light, upstream direction. Step 5: the controlled computer runs the input, the screen changes, and the flow returns to step 3. Steps 3 to 5 repeat for every input. The two data streams of steps 3 and 4 sit inside a dashed frame, which marks that NetEase calls the traffic between the two ends end-to-end encrypted. The cipher, codecs, transport protocol, ports, and latency are not published, and the diagram does not show them. On the controller side, the work is to decode and show the picture, play audio, and capture your keyboard, mouse, and touch input. On the controlled side, the work is to capture the screen and audio and to run the input." :width="1020" lang="en" />

> **What the diagram is based on:** The three objects and five steps come from the official [remote assistance feature page](https://uuyc.163.com/features/support/) and the help center's [remote assistance for another computer](https://uuyc.163.com/help/20241204_40220_1197664.html); "picture and input sync in real time" and "end-to-end encryption" come from the [official home page](https://uuyc.163.com/) (as of 2026-11-24). The diagram keeps the three objects, the two data streams running in opposite directions and the loop that runs for every operation. It leaves out the internal steps of the connection, whether data goes direct or through a relay, and the codecs, transport protocol and cipher, none of which the vendor has published. The NetEase service is drawn in a separate box at the top, not between the two devices, precisely so that the diagram does not suggest data passes through it.

In the diagram the controller is on the left and the controlled computer is on the right, and the two data streams run sideways in opposite directions. **Downstream** (controlled computer to controller, right to left in the diagram, step 3) carries the picture and audio. It is heavy, so resolution, frame rate and bitrate decide how much bandwidth it takes. **Upstream** (controller to controlled computer, left to right in the diagram, step 4) carries keyboard and mouse events. It is light. Every time you move the mouse on the controller, one round of "upstream, execute, downstream" runs, which is steps 4, 5 and 3 in the diagram.

The connection step is drawn as one box only. The vendor has published only three statements: connect by entering a device ID and a verification code, picture and input sync in real time, end-to-end encryption. How verification works in between, and whether data goes direct or through a relay, the vendor has not published.

## Install

### Install on each platform

| Platform | How to install | System requirements | Version on the official site (as of 2026-11-24) |
|---|---|---|---|
| Windows | On the [download page](https://uuyc.163.com/download/), under **Windows 版客户端** (Windows client), click **立即下载** (Download now) | Win 11, Win 10, Win 8, etc. | V 4.48.2, updated 2026.11.20 |
| macOS | On the download page, under **macOS 版客户端** (macOS client), click **立即下载** | macOS 11.0 and later | V 4.48.2, updated 2026.11.20 |
| iPhone / iPad | On the download page, click **前往 App Store** (Go to the App Store) | iOS 14.0 and later | The download page says V 4.48.0 |
| Android phone / tablet | On the download page, click **点击下载 APK** (Click to download the APK) | Android 8.0 and later | V 4.48.2, updated 2026.11.20 |
| Android TV | Search for **网易UU远程** in the TV app store, or download the installer and install it from a USB drive | Android 8.0 and later | V 3.5.0, updated 2025.03.03 |

Two notes: the vendor does not support 32-bit Windows, and installation fails with error 216 for that reason. The version in the App Store may be newer than the one shown on the download page; go by the [store page](https://apps.apple.com/cn/app/id1642306791).

### Install and sign in on both ends

1. On the controlled computer, download the matching installer from the [download page](https://uuyc.163.com/download/) and install it. For the options in the setup wizard, go by what the interface shows.
2. Open the client, then register and sign in. If the controlled computer only accepts remote assistance, it can stay signed out.
3. On the controlled computer, turn on **Start with Windows** in **Settings**. After a restart the client runs by itself, and only then can you connect.
4. Install on the controller device and sign in to your account. To start remote assistance, the controller must be signed in.

### Make a Mac controllable

A Mac as the controlled computer needs three extra steps. If either of the first two is missing, you cannot connect or you get a black screen:

1. Click **Settings** at the top right of the client, switch to the **Security** tab, and select **允许本设备被控** (Allow this device to be controlled).
2. In the pop-up, click **去开启** (Go to enable), and grant UU Remote two permissions in macOS: **录屏与系统录音** (Screen and system audio recording) and **辅助功能** (Accessibility). The first decides whether the screen can be seen; the second decides whether keyboard and mouse input works.
3. **Close and restart the client**. The vendor stresses that the permissions do not take full effect until you restart.

If you closed the pop-up by mistake, the manual path is **系统设置** > **隐私与安全性** (System Settings > Privacy & Security). To use a wireless secondary display with the Mac as the main screen, you must also turn on **Allow same-account access to this device** on the same page. Source: [How to control a Mac with UU Remote](https://uuyc.163.com/help/macos.html).

## First task in 10 minutes: connect once with a device ID and a verification code

Goal: see the controlled computer's desktop on the controller, open and close one window, then disconnect. Use the default temporary verification code throughout; that is the safest.

### On the controlled computer: turn on the switch and copy the connection details

1. Open UU Remote, go to **Settings** > **Security**, and turn on **Allow Remote Assistance**. You will see two settings: **Custom Code** and **Verification method**.
2. For a first practice run, keep the defaults: **Connect via Code** plus a temporary verification code.
3. Go to **Remote Assistance** > **Start Assistance**. In the **This Device** area, read **Device ID** and **设备验证码**, then click **Copy & Share** to send them to the controller. When you practice on your own, just send them to yourself.

**Why**: when the switch is off, the controller shows the message **Device ID is incorrect or does not exist. Please retry and ensure the host has enabled "Allow Remote Assistance"**. The official feature page says it is on by default, but the first step of the help page still asks you to confirm it, so take a look. **Caution**: the copied content includes the device ID, the verification code, the device's system and its region. Do not post it to a group chat.

### On the controller: enter the details and connect

- **Computer controller**: go to **Remote Assistance** > **Start Assistance**, enter the device ID and the verification code under **Partner's Device ID**, and click **Connect**.
- **Phone or tablet controller**: go to **Remote Assistance**, fill in **Partner's Device ID** and **伙伴的设备验证码** (Partner's device verification code), and click **开始远控** (Start remote control).

Windows controller 4.41.0 and later supports **Remote assistance smart clipboard**: after you copy the complete assistance info and open **Start Assistance**, the device ID is filled in automatically, and the verification code is used automatically when it is recognized. Click **Turn off automatic detection** in the prompt to turn it off.

Once connected, the controlled computer's desktop appears in the controller window. The computer controller has **Control Center** at the top right; the phone controller has a side toolbar. The controlled computer shows a **被远程协助** (Being remotely assisted) notification, so you know someone has connected.

### Perform one action, then disconnect and wrap up

1. Open a window on the controlled computer's desktop (for example the file manager), drag it, then close it. Then check on the controlled computer itself: that window really was opened and closed.
2. Disconnect the remote session. The controlled computer can also stop authorization at any time.
3. On the controlled computer, go back to **Settings** > **Security** and turn off **Allow Remote Assistance**. The vendor recommends keeping it off in daily use.

Once it works, take a look at **最近连接** (Recent connections) at the bottom of the **Start Assistance** page. The computer client keeps up to 8 entries, and you can reconnect with one click or click **Clear Connection Records**.

## Daily use

### Set up unattended access

Pick what matches your situation:

| You want | What to do | On which device |
|---|---|---|
| To connect to your own devices | Sign in to the same account on both ends, then click **Enter Desktop** on the controller's main page | Both ends |
| To stay online after a restart | Turn on **Start with Windows** in **Settings** | Controlled computer |
| To connect across accounts without passing on a code each time | Set **Custom Code** under **Settings** > **Security**, and choose **Custom Code Only** or **Use Both Codes** | Controlled computer |
| To type the verification code less often on the controller | Under **Remote Assistance** > **Favorite Device**, click **Add Favorite Device** | Controller |
| To require someone to click approval on every connection | Change the verification method to **Two-step verification** | Windows controlled computer |
| To stop settings being changed locally | **More** > **Security Lock** at the top right, and set an 8 to 16 character security password | Windows, macOS |

Three notes:

- The favorites list syncs to the cloud per account, but **verification codes are stored only on this device**. When you change controller, you have to enter them again.
- Security lock requires Windows V4.11.0 and macOS V4.38.0 or later. Under **Settings** > **Security** > **Client Lock**, you can turn on **Auto-lock client during Remote Assistance**. Source: [How to set up the client security lock](https://uuyc.163.com/help/20251225/40220_1278547.html).
- The official help pages this page read do not give the name of the switch that "allows same-account connections" on a Windows controlled computer. Go by the **Settings** > **Security** page.

<!-- TODO: needs verification — the name and default state of the switch that lets same-account devices connect to a Windows controlled computer. Checked the official help pages “How a computer remotely controls a computer”, “Remotely assist another computer”, “Security lock” and “Wireless secondary display”; only the macOS switches 允许本设备被控 and 允许同账号控制本设备 are spelled out -->

### Set up remote wake-up

Prerequisite: read the four conditions under "Core concepts" first. The procedure has five steps, and the first three are on the controlled computer.

1. **Let the client through**. Under **Settings** > **Start with Windows**, turn on **Allow Remote Boot**. If you have configured WOL before, click **我确认已完成配置** (I confirm the configuration is done); if not, click **Configure**.
2. **Set up the network adapter**. The client detects the network adapter automatically; if it supports WOL but WOL is not turned on, follow the guide to turn it on with one click. Manual path: in the adapter's **属性** (Properties), on the **高级** (Advanced) tab, turn on **关机网络唤醒** (Wake-on-LAN after shutdown), **魔术封包唤醒** (Magic Packet wake-up) or **唤醒魔包** (Wake on Magic Packet), then on the **电源管理** (Power Management) tab, select **允许此设备唤醒计算机** (Allow this device to wake the computer). The option names differ between network adapters.
3. **Set up the helper device**. Scan the QR code with the phone client to open the guide, and designate a Windows, macOS or Android device on the same LAN as the controlled computer, signed in to the same account. An Android device also needs **远程开机支持 Wake On LAN** (Remote wake-up supports Wake On LAN) turned on under **我的** (Me) > **Settings**, and it must stay plugged in to power.
4. **Set up the motherboard BIOS**. Press Del or F2 at startup to enter it, and find and turn on the WOL option. The option name differs by brand; look for these keywords: 唤醒 (wake), 开机 (power on), wake, WOL, PCIe, ACPI. Lenovo, Dell, ASUS, Gigabyte and HP all have official tutorials.
5. **Test**. Go back to the guide and click **开机测试** (Wake-up test), then wait for the device to come online.

After it succeeds, a **远程开机** (Remote wake-up) button appears next to this device on controllers signed in to the same account. When you have no spare device at home, some router models can act as the helper device; see [Which routers can serve as power-on helper devices](https://uuyc.163.com/help/20260407/40220_1294974.html). Source: [How to set up remote wake-up](https://uuyc.163.com/help/4.0wol.html).

### Control a computer from a phone

1. Click **Enter Desktop** on the phone's main page.
2. Turn the phone to landscape. The official instructions state that you can rotate the screen after entering the remote desktop, which makes operating easier.
3. Use the side toolbar to adjust features, including **操作** (Operation), **Keyboard**, **显示桌面** (Show desktop) and **展示所有窗口** (Show all windows).

There are two mouse modes, switched inside **操作**:

| Mode | Effect |
|---|---|
| **屏幕触控** (Screen touch) | Wherever you tap, the mouse moves there and clicks; the touch point is what counts |
| **鼠标指针** (Mouse pointer) | The mouse pointer is always shown on screen; taps and moves act on where the pointer is |

Four commonly used tips:

- **Office shortcuts**: go to **操作** > **启用按键映射** (Enable key mapping) and choose the **办公常用** (Common office keys) scheme.
- **Connect a physical keyboard and mouse**: connect them to the phone by Bluetooth or cable, and turn off **平板触控模式** (tablet touch mode). The switch is in **屏幕触控** under **操作** on the right. On an iPhone, turn on the system's **辅助触控** (AssistiveTouch); on an iPad, the other way round, turn it off.
- **Only check progress**: click **Mini Window** on the side toolbar. Android needs the **悬浮窗** (Floating window) permission; iOS needs 18 or later, and **自动开启画中画** (Auto-enable Picture in Picture) must be turned on. Only one device can use mini window mode at a time.
- **Unlock the controlled computer**: turn on **自动解锁被控端** (Auto-unlock the controlled computer) under **Security** in the toolbar.

<!-- TODO: needs verification — the list of touch gestures on the phone (which of left click, right click, scrolling and zooming one finger and two fingers each map to). Checked the official feature pages “How a phone remotely controls a computer” and “Key mapping” and the keyboard-and-mouse peripherals help page; the vendor documents only two-finger zoom, multi-touch and the two modes 屏幕触控 / 鼠标指针, and does not list the gestures one by one -->

### Transfer files, sync the clipboard, send audio

| Method | Where it works | How |
|---|---|---|
| **File Transfer** entry | Same-account remote control only | Open it from the device details page, choose the files and the destination folder, then send |
| Drag and drop | Same-account remote control, remote assistance | Drag the file into the remote window and release it over the destination folder |
| Copy and paste | Same-account remote control, remote assistance | Copy on one end, paste on the other |

**File Transfer** on the phone has three buttons: **发送照片&视频** (Send photos & videos; after selecting, click **Add**), **发送文件** (Send files; after selecting, click **打开** (Open)) and **从电脑下载文件到手机** (Download files from the computer to the phone; after selecting, click **下载** (Download)). Downloaded files are in **Received** or in the **UU远程** (UU Remote) folder of the phone's file manager.

Three cautions:

- Remote assistance has no separate **File Transfer** entry. To drag and drop, both the controller and the controlled computer must turn on **Allow file transfer during remote assistance** under **Settings** > **Security**. To send a file out from the controlled computer, drag the file to the UU floating ball at the bottom right, then click **Send**.
- **Clipboard**: turn on **同步剪贴板** (Sync clipboard) under **操作** > **Security** in the remote session window. Between a phone and Windows, only plain text syncs, and a long text can be at most 60,000 Chinese characters.
- **Audio**: after you turn on **Silence Controlled Device**, sound comes out only on the controller, and the controlled computer stays silent. The reverse, sending the phone microphone's sound into the controlled computer, is called **麦克风直连** (microphone pass-through). Turn it on under **Control Center** > **Peripherals** > **Microphone**; only a Windows controlled computer supports it.

The vendor recommends 4.43.0 or later on both ends. Source: [How to transfer files](https://uuyc.163.com/help/20241210/40220_1199229.html).

<!-- TODO: needs verification — whether remote printing is supported. Checked the official help center's “Feature guides” and “FAQ” directories and the file transfer help page; found no entry for remote printing, so this page treats it as not offered by the vendor -->

### Watch several screens or devices at once

- **Switch screens**: when the controlled computer has several monitors attached, several tabs appear at the top of the remote window. Click a tab to switch; press and hold a tab and drag it out to turn it into a separate window.
- **Add a screen out of thin air**: when the controlled computer has only one screen, click [ + ] in the top bar to create a **virtual screen**. You can create at most 3, and physical screens plus virtual screens total at most 5.
- **Combine them into one big screen**: click **Switch to super screen** in **Control Center**, and all the desktops of the controlled computer are shown together on one virtual screen.

Limits: creating virtual screens and super screens supports same-account remote control only; the controller must be a Windows or macOS computer; the controlled computer requires Windows 10 or macOS 11.0 or later, and 4.35.0 or later is recommended on both ends. For several devices, the official multi-screen collaboration page states that you can control several computers at the same time, but the phone client can control only one at a time. Source: [How to control multiple screens](https://uuyc.163.com/help/multiscreen.html).

### Turn on privacy mode in a meeting room or a public place

1. After connecting, on a computer controller go to **Control Center** > **Security**; on a phone controller go to **操作** > **Security**.
2. Under **Host Privacy Mode**, pick one level:
   - **Screensaver**: a screensaver picture covers the controlled computer's screen. The privacy feature page writes this level as **黑屏防护** (Black screen protection).
   - **Display Off**: turns off the controlled computer's physical screen directly. Only a Windows controlled computer supports it.
3. When needed, select **Silence Controlled Device** and **Lock Controlled Device After Remote Session Ends**. The second makes the controlled computer lock itself as soon as the remote session ends.

When you are next to the controlled computer, you can temporarily lift privacy mode with a shortcut: Ctrl + Alt + P on Windows, control + option + P on macOS. After you lift it, the controlled computer locks itself automatically, and privacy mode works as usual on the next connection. Source: [How to turn privacy mode on or off](https://uuyc.163.com/help/20241203_40221_1197692.html).

### Adjust picture quality, frame rate and resolution

- **Entry point**: after connecting, click **Control Center** at the top right. The menu has **Resolution**, **Image Quality**, **Window**, **Sound** and **Security**.
- **Turn on True Color**: on a computer, choose **True Color** under **Control Center** > **Display**; on a phone, choose **真彩4:4:4** (True Color 4:4:4) under **操作** (Operation) > **Display**.
- **Turn on HDR**: turn on **HDR** under **Control Center** > **Image Quality**. It works only when Windows controls Windows, and both ends must support HDR.

When you cannot find an option, check four things in order:

1. Membership tier. True Color, HDR and 144 fps are listed as VIP benefits; see the "Pricing" section.
2. Graphics card. True Color is not supported when the controlled computer has an AMD graphics card.
3. Controller system. No Android controller supports True Color; all iOS controllers do.
4. Load. **Original Image** and **True Color** cannot take effect at the same time; True Color stops working when the GPU load on the controlled computer is too high.

When it stutters, the vendor recommends lowering the picture quality and frame rate, then trying again. Source: [Which devices can turn on True Color mode](https://uuyc.163.com/help/20241216_40221_1200122.html) and the [HDR help page](https://uuyc.163.com/help/hdr.html).

### Play games: connect a gamepad and use key mapping

Connect a gamepad: the Windows controller supports the whole Xbox line and PS5 controllers; the Android and iOS controllers also support PS4, Switch Pro and Joycon. The controlled computer accepts at most 4 controllers at the same time, and the gyroscope and touchpad are not supported yet. Use key mapping: go to **操作** > **启用按键映射**, choose an official scheme, or change the key bindings under **编辑当前方案** (Edit the current scheme). When you need to move the camera, add a **轮盘** (wheel) to act as a virtual joystick; when you need to fire a combo with one key, use a **宏按键** (macro key). Source: [How to use a gamepad](https://uuyc.163.com/help/20241203_40221_1197714.html) and the [key mapping feature page](https://uuyc.163.com/features/keyboard/).

### Use a tablet or phone as a wireless secondary display

1. Upgrade both the main screen (a Windows or macOS computer) and the secondary display (an Android or iOS phone or tablet) to 4.46.0 or later, and sign in to the same account.
2. Keep the client in the foreground on the secondary display, and make sure it is not in a remote session or transferring files.
3. Click **Wireless Secondary Screen** at the top of the computer's main screen, and choose the phone or tablet from the list. When the status shows **Connected**, it has worked.
4. Click the connected device on the main screen to adjust resolution, scaling, orientation, picture quality and frame rate.

Limits: it can extend only one secondary display; mirroring is not supported; the secondary display gives out no sound; a computer cannot be the secondary display. Source: [How to use the wireless secondary display](https://uuyc.163.com/help/20260311_40220_1286375.html).

### Give remote assistance to a parent or colleague

The procedure is the same as in "First task in 10 minutes". Three extra tips:

- **The other side has no client installed**: send them the .exe of [UU Remote Lite](https://uuyc.163.com/features/sos/). It needs no installation and no sign-in, and runs on a double click. It supports only Windows and can only act as the controlled computer. The verification code refreshes automatically after each remote session.
- **You often help the same person**: add them under **Remote Assistance** > **Favorite Device**, and ask them to set a custom verification code.
- **You do not want to misclick on their computer**: after connecting, click **Enable View Mode** under **Control Center** > **Tools**. Keyboard, mouse and touch input are no longer sent to the controlled computer, and you can annotate with **画笔** (Pen) to show where to click. On a computer, press Ctrl + Shift + V to switch back; on a phone, turn off **仅观看** (View only) under **操作**.

## Real-world use cases

### Keep watching a coding agent's progress while you are out

A command line agent such as Claude Code or Codex is running on your high-end computer at home, and you have already left the house. Remote control lets you:

1. Sign in to the same account on a tablet or phone and click **Enter Desktop**, or open **Device Details** > **Terminal** to attach straight to that terminal session.
2. The official terminal help page states that tools with a TUI can be operated by clicking directly in the terminal page, for example to switch sessions. So you can see the agent's output and type the next step when it waits for confirmation.
3. To step away for something else, shrink the picture into **Mini Window**; or simply close it, and reattach to the same session when you come back.

For how to use the agents themselves, see [Claude](../claude/) and [Codex](../codex/). For another way to approve an agent's next step from a phone, see [T3 Code](../t3code/).

### Use the home computer as a remote workstation

The official remote work page lists three development scenarios: use the terminal to read logs and run commands; use port forwarding to reach intranet services and debugging environments (it maps a remote TCP service to a local port, TCP only); use remote desktop plus the terminal to run AI coding tasks on a remote dev machine and check in at any time. The environment stays on the original dev machine, so you do not have to set up another one while you are out. The entry points for both features are on the **Device Details** page: the terminal is under **Terminal**, and port forwarding is under **More** > **Port Forwarding**. Both support same-account remote control only, and both ends must be Windows or macOS computers. Source: the [remote work feature page](https://uuyc.163.com/features/work/), [How to use the terminal](https://uuyc.163.com/help/20260509_40220_1299599.html) and [How to use port forwarding](https://uuyc.163.com/help/20260423_40220_1297526.html).

### Official CLI: query online devices from a script

The official help center has a page on `uuyc-cli`. It can query devices, start remote control and manage remote assistance from a terminal, and it supports `--json` output. The new commands require Windows controller V4.43.0 or later. The macOS controller keeps its existing CLI capability, but the official page states that the new commands have not been synced to macOS yet, so do not use the command table and the script below as instructions for macOS. Windows does not add it to PATH by default; for how to find it, see the [official CLI tutorial](https://uuyc.163.com/help/cli.html).

The table below lists the commands that `uuyc-cli --help` actually shows, copied from Windows version 4.48.1.5606 (tested 2026-11-24). `--json` is an option of each subcommand, not a global one.

| Command | Purpose (translated from the `--help` text) |
| --- | --- |
| `uuyc-cli device ls` (alias `list`) | List connectable devices |
| `uuyc-cli device info` | Show device details |
| `uuyc-cli device connect <device ID>` | Connect to a remote device by device ID |
| `uuyc-cli device disconnect [device ID]` | Disconnect; without an ID, disconnect all |
| `uuyc-cli device status` | Show the connection status |
| `uuyc-cli assist id` | Get the remote assistance ID |
| `uuyc-cli assist reset-code` / `set-code` | Refresh / set a custom remote assistance verification code |
| `uuyc-cli assist allow on` / `off` | Turn remote assistance on / off |
| `uuyc-cli assist start <assist ID> [verification code]` | Start remote assistance; `--code-stdin` can be used instead to read the verification code from standard input |
| `uuyc-cli assist status` | Show the remote assistance status |
| `uuyc-cli term -d <device ID> new` and others | Terminal sessions on the remote device: `new` / `attach` / `ls` / `has` / `rename` / `kill` |
| `uuyc-cli lterm new` and others | Local terminal sessions, with the same subcommands |
| `uuyc-cli status` | App diagnostic information |

This page does not expand the three subcommands `user`, `cloudpc` and `echo`. `--help` also lists a set of old-style arguments marked deprecated (such as `--list-devices` and `-n,--connect`); do not use them in new scripts.

The script below does only a read-only query: it lists the IDs of the online devices under the same account. The command, arguments and JSON fields come from the official CLI page, and it ran successfully on Windows version 4.48.1.5606 with Node 24.16: the exit code is 0 when all is well, 2 when an argument is missing, and 1 when the executable cannot be found. Each returned item has `deviceName`, `platform` and `lastSeen` in addition to `deviceId` and `isOnline`. **The file name must use `.mts`**: Node parses a file as an ES module only when it sees `.mts` (or a `package.json` with `"type": "module"` in the same directory); saved as `.ts`, it fails outright.

```ts
// Usage: node uuyc-online.mts "<path to the uuyc-cli executable>"
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
// Official contract: the result of device list is in data.items, and each item contains deviceId and isOnline
interface DeviceListResult {
  data?: { items?: { deviceId: string; isOnline: boolean }[] };
}

const [cliPath] = process.argv.slice(2);
if (!cliPath) {
  console.error('Usage: node uuyc-online.mts "<path to the uuyc-cli executable>"');
  process.exit(2);
}

try {
  const { stdout } = await execFileAsync(cliPath, ['device', 'list', '--json'], {
    encoding: 'utf8',
  });
  const result = JSON.parse(stdout) as DeviceListResult;
  const online = (result.data?.items ?? []).filter((item) => item.isOnline === true);
  const ids = online.map((item) => item.deviceId);
  console.log(ids.length ? `Online device IDs:\n${ids.join('\n')}` : 'No online devices');
} catch (err) {
  // Exit codes listed on the official CLI page: 101 not signed in; 102 cannot connect to the main app or the terminal service (this page did not reproduce these two failures)
  const code =
    err !== null && typeof err === 'object' && 'code' in err ? String(err.code) : 'unknown';
  console.error(`device list failed (exit code ${code}). Make sure the main app is running and you are signed in.`);
  process.exit(1);
}
```

Three reminders:

- `device connect` is an asynchronous command. A successful return only means the request was submitted, so keep checking `device status --json`.
- The remote assistance verification code is sensitive information. The vendor recommends passing it with `--code-stdin`, so that it is not left in the command history.
- The author of this page found no open API or SDK documentation for third parties on the official site. Do not integrate with it as if it were an open platform.

## Pricing

**Basic remote control is free; advanced benefits require a membership.** The official home page headline says "Real 4K, really free, really easy to use", but 4K, 144 fps, True Color and HDR are listed in the VIP column, so read the two together.

As of 2026-11-24, on the official site the VIP service **has not launched yet**. The official announcement says it launches on December 1, 2026, and promises that "basic remote control will stay free, with no limit on sessions, no time limit, no queue and no ads". Users who register before the launch can claim an exclusive 50% off deal on the annual plan. See the [official announcement](https://uuyc.163.com/blog/20261118-dwdsa.html).

The table below is copied from [Membership benefits](https://uuyc.163.com/help/membership.html) (updated 2026-11-17):

| Benefit | Free version | VIP | Global VIP (SVIP) |
|---|---|---|---|
| Price | ¥0 | ¥238/year; ¥30 monthly, ¥24 with a continuous monthly plan | ¥758/year; ¥98 monthly, ¥88 with a continuous monthly plan |
| Picture quality | Up to 1080p HD | Up to 4K Original | Up to 4K Original |
| Frame rate | Up to 30 fps | Up to 144 fps | Up to 144 fps |
| True Color mode 4:4:4 and HDR | Not supported | Supported | Supported |
| Custom bitrate | 8 Mbps and below | 500 Mbps and below | 500 Mbps and below |
| Remote wake-up, screen lock | Supported | Supported | Supported |
| Android screen sharing (marked "limited-time free" by the official site) | Supported | Supported | Supported |
| View-only mode (marked "limited-time free" by the official site) | Supported | Supported | Supported |
| Gamepad support (marked "limited-time free" by the official site) | Supported | Supported | Supported |
| File transfer | P2P, no speed limit | No speed limit, plus a high-speed relay channel | No speed limit, plus a high-speed relay channel |
| Several screens controlling several screens, secondary display, virtual screen, super screen | Not supported | Supported | Supported |
| Multi-channel (many controlling many), manual switching of relay routes | Not supported | Supported | Supported |
| Key mapping schemes | 1 | All (more than 500) | All (more than 500) |
| Magnetic keyboard and keyboard-mouse peripherals on mobile | Not supported | Supported | Supported |
| Privacy screensaver on the controlled computer | A black screensaver with the brand logo | All official screensavers, custom screensavers, black privacy screen | Same as VIP |
| Port forwarding, terminal tool, CLI commands | Supported | Supported | Supported |
| Global remote control nodes | Not included | Not included | Included |

Key points for reading the table:

- **The three rows that matter most to a newcomer**: picture quality, frame rate, several screens controlling several screens. Everything this page teaches — connecting, unattended access, remote wake-up, file transfer, privacy mode — is in the free version.
- Three items in the table are marked "limited-time free": Android screen sharing, view-only mode and gamepad support. For what limited-time free means and how long it lasts, go by the official site.
- "SVIP" and "Global VIP" are the same tier: the price cards say SVIP, the comparison table says Global VIP.
- Whether free version benefits change around 2026-12-01: go by what the client actually shows. The membership benefits page describes the benefits as they are after the tiers take effect.

<!-- TODO: needs verification — whether the 关闭显示屏 (turn off the display) level of privacy mode is a VIP benefit. The membership comparison table has only one row, “Privacy screensaver on the controlled computer”, and its VIP column includes “black privacy screen (turn off the screen)”; it does not say separately whether 关闭显示屏 is available in the free version -->

Before you pay, remember four points, all from official pages: membership is a virtual good and is non-refundable once paid, except for problems caused by platform failures; it can be bought only inside the client, and the vendor has not opened third-party purchase channels; when VIP expires, the current session can be used until it ends, while when Global VIP expires the current session ends immediately; membership types, benefits and pricing may all change. Before buying, read the [Membership service agreement](https://uuyc.163.com/help/service-agreement.html) and the [Auto-renewal service agreement](https://uuyc.163.com/help/auto-renewal.html).

## Security and privacy essentials

### What the official pages say

| Official statement | Source | How to read it |
|---|---|---|
| "End-to-end encryption, security is assured" | [Official home page](https://uuyc.163.com/) | A vendor statement; this page did not verify it independently |
| Link encryption "DTLS, AES" | [Remote work feature page](https://uuyc.163.com/features/work/) | Same as above |
| Information security management system certification, privacy information management system certification, passed software security penetration testing, member organization of **卓信大数据** (Zhuoxin Big Data) | Official home page | The image on the home page labels them as ISO 27001 and ISO 27701; the home page gives no certificate numbers or validity dates |
| Three verification methods, **Connect via Code** by default | [Explanation of connection without a code](https://uuyc.163.com/blog/mianmixiezhu.html) | **Two-step verification** adds one manual confirmation |
| The controlled computer can stop authorization at any time; the software cannot yet limit what the controlling party is allowed to do | Software License and Service Agreement | The controlled computer holds the initiative, but the person who connects in has the whole computer |
| Up to ¥100,000 reward for a security vulnerability | [Bounty hunter program](https://uuyc.163.com/bounty/) | Vulnerabilities are submitted through the NetEase Security Center |

### Checklist for newcomers

**Stop others from connecting in:**

1. **Give the device ID and verification code only to people whose identity you have verified.** The official news page says in so many words that you should not accept any request from a stranger asking for your device code or verification code on the grounds of "refund verification", "account unfreezing" or "customer-service troubleshooting".
2. **Turn it off when you are done.** Turn off **Allow Remote Assistance** under **Settings** > **Security**. The vendor recommends keeping it off in daily use.
3. **Keep the temporary verification code refreshing automatically, or switch to Two-step verification.** This is a precaution from the official help page.
4. **Set a fixed verification code only on your own devices, and do not reuse other passwords.** The second half is this page's advice, not the official wording. Do not post content that contains a verification code to a group chat.

**Guard against telecom fraud.** Remote assistance software is often exploited by scams that pose as customer service. The official news page reminds you to confirm the helper's identity again by phone or through a chat with someone you know before sending them the device ID and temporary verification code, and to refuse outright when a stranger asks for a verification code. A [report](https://www.xinhuanet.com/20250423/aa8c9bc9a036477881a0adb93349d3b0/c.html) by Xinhuanet on 2025-04-23 quotes a warning from the Tianjin Anti-Fraud Center: when you get a call from a stranger claiming to be customer service who asks you to click an unknown link or scan a QR code to download an app, do not do it; if something feels wrong during the operation, stop at once.

**Limit what the person who connects in can do:**

5. **Account passwords and payment verification codes are typed by the computer's owner.** The helper only explains where and how; this is a requirement of the official news page.
6. **Turn on security lock for devices set up for unattended access.** It stops other people from turning the switch off on the controlled computer itself.
7. **Turn on Lock Controlled Device After Remote Session Ends and Host Privacy Mode.** The controlled computer locks itself as soon as the remote session ends.
8. **Delete the UU Remote Lite .exe when you are done with it.** It needs no installation, so deleting the file uninstalls it.

**Take care of your account and devices:**

9. **How to disconnect a bound device.** The official multi-screen collaboration page states that you can delete idle devices at any time; it does not describe the exact entry path in text, so go by the client's device list. Also, do not stay signed in on an unfamiliar device for long. This is a reminder on the official remote work page.
10. **Buy membership only inside the client.** The vendor states that there are no third-party purchase channels. Report vulnerabilities through official channels too, by submitting them to the NetEase Security Center, and do not publish vulnerability details.

<!-- TODO: needs verification — the entry path for deleting (unbinding) a device in the device list. Checked the official “Multi-screen collaboration” feature page (it has only the image caption “Idle devices can be deleted at any time to stay safe”) and the FAQ on the remote work feature page; found no step-by-step menu path -->

## Common pitfalls

| Symptom | Cause | Fix |
|---|---|---|
| The controller shows **Device ID is incorrect or does not exist. Please retry and ensure the host has enabled "Allow Remote Assistance"** | The device ID is typed wrong, or the controlled computer does not have **Allow Remote Assistance** turned on | Check the ID; go to **Settings** > **Security** on the controlled computer and turn on the switch |
| A favorite device can no longer be connected to | The other side's verification code was refreshed | Switch to a custom verification code, or update the verification code under **More** > **Edit** |
| Cannot connect after the other side switched to **Host approval** or **Two-step verification** | The controller version is too old | Upgrade the controller to the latest version |
| Privacy mode is on, and the controller's picture is black too | The Windows version on the controlled computer is too old | Update the controlled computer's system, or do not use privacy mode |
| The controlled computer is muted, and the controller has no sound either | The controlled computer has no usable sound card output device | Plug headphones or speakers into the controlled computer, then change the output device under **系统设置** > **声音** (System Settings > Sound) |
| The Mac cannot be connected to, shows a black screen, or the keyboard and mouse do not work | The version is old; **允许本设备被控** is not turned on; the **录屏与系统录音** or **辅助功能** permission is not configured | Upgrade both ends; check the switch; restart the client after configuring the permissions |
| In remote assistance you cannot find virtual screens or super screens, and the separate **File Transfer** entry does not work either | These features are open to same-account remote control only | Use same-account remote control; for files, use drag and drop or copy and paste instead |
| The keyboard and mouse suddenly cannot control the other computer | View-only mode is on | On a computer, press Ctrl + Shift + V to switch back; on a phone, turn off **仅观看** under **操作** |
| You thought the security password is the connection password | The security password only locks the client | The credential for connecting is the verification code; the security password is set under **More** > **Security Lock** |
| The free version cannot get 4K or 144 fps | These are listed as VIP benefits | The free version goes up to 1080p and 30 fps; after VIP launches, buy it if you need them |

## Troubleshooting

### What to check first when a connection fails

- **Cannot connect at all**: check whether the controlled computer is powered on, online and running the client; whether **Allow Remote Assistance** is turned on, or whether both ends are signed in to the same account.
- **Connects but is very laggy**: lower the picture quality and frame rate in **Control Center** on the controller; on a poor network, do not turn on True Color or HDR.
- **Cannot connect on a company or school network**: the network may restrict access to the public internet. Under **Settings** > **Network** > **Proxy Settings**, choose **System Proxy** or **Manual**; this assumes you already have a working proxy. Source: [How to set up a network proxy](https://uuyc.163.com/help/proxy.html).

### Remote wake-up does not wake the computer

| Clue | Cause | Fix |
|---|---|---|
| It still fails although the network adapter, motherboard and helper device all meet the conditions | The Windows power plan affects the network adapter's power supply | In **控制面板** (Control Panel), open **硬件和声音** (Hardware and Sound) > **电源选项** (Power Options) > **选择电源按钮的功能** (Choose what the power buttons do), and clear **启用快速启动（推荐）** (Turn on fast startup (recommended)) |
| Several network adapters, wired and wireless | The network cable or port has an unstable contact | Check the network cable and the adapter port |
| The detection says the network adapter is not supported | The network adapter itself does not support it, or the driver is too old | Update the network adapter driver from the motherboard vendor's website |
| It says no other helper device is online | The helper device is offline, or not on the same LAN | Check the helper device; confirm it is on the same LAN; restart UU Remote on the helper device |

### Error codes at a glance

| Error code | Scenario | What to do |
|---|---|---|
| -1 | Uninstall, sign-in, creating a virtual screen | For uninstall, quit security software; for sign-in, check the network and firewall; for a virtual screen, the number of screens is over the limit |
| -100 | Sign-in, startup | For sign-in, check network restrictions; for startup, check whether security software or an ad-blocking plugin is blocking it |
| 80 | Update | Uninstall and reinstall; if it still fails, use a different install path |
| 216 | Install | You are on 32-bit Windows, which the vendor does not support yet |
| 2, 1058 | Startup | 360 security software deleted the startup file; quit the 360 monitoring service, then uninstall and reinstall |
| 123, 300, 301 | Virtual screen, super screen | Restart the controlled computer and try again |
| 402 | Privacy screensaver, turning off the display | Remote assistance does not support these two yet; use same-account remote control instead |
| 1001 | Mac as the controlled computer | Go to **通用** > **登录项与扩展** (General > Login Items & Extensions) and turn on **UU远程** (UU Remote) |

For most install, startup and update problems, the order the vendor gives is: quit security software such as 360 and PC Manager, restart the computer, uninstall and reinstall the latest version, and if it still fails, use a different install path. Source: [Error code solutions](https://uuyc.163.com/help/errorcode.html).

If it is still not solved, contact the vendor: on a computer, click the menu at the top right, then **Help & Feedback** under **使用帮助** (Usage help); on a phone, go to **我的** on the home page and click **Help & Feedback** or **Online Support**. When you submit, include the error code, the scenario where the error occurred, the system version, the UU Remote version number and a screenshot.

## Next steps

1. Read the [learning map](/products/uu-remote/) to confirm which version to install on each platform you have.
2. Follow "Set up unattended access" in this page to set up your own computer, then test it once on an outside network.
3. To follow a coding agent from your phone, go on to [Claude](../claude/) and [Codex](../codex/).

## Further reading

- [Official home page](https://uuyc.163.com/): product positioning, features and security statement.
- [Download page](https://uuyc.163.com/download/): system requirements and current versions for each platform.
- [Help center](https://uuyc.163.com/help/): the directory of all feature guides and FAQs, plus two more lists: [Feature guides](https://uuyc.163.com/help/guidelines/) and [FAQs](https://uuyc.163.com/help/questions/).
- [How to remotely assist another computer](https://uuyc.163.com/help/20241204/40220_1197664.html): the complete explanation of three kinds of verification code, three verification methods and favorite devices.
- [How to set up remote wake-up](https://uuyc.163.com/help/4.0wol.html): step-by-step configuration of the network adapter, motherboard and helper device.
- [How to transfer files](https://uuyc.163.com/help/20241210/40220_1199229.html): how to choose among the three transfer methods, and their limits.
- [Function shortcut settings](https://uuyc.163.com/help/20260509/40220_1299543.html): the default shortcut list and how to customize.
- [Membership benefits](https://uuyc.163.com/help/membership.html): benefit comparison of the free version, VIP and Global VIP.
- [llms.txt](https://uuyc.163.com/llms.txt): the official summary of product facts for AI and search engines, and also the lead this page used to find its entry points.

## Related pages

- [NetEase UU Remote learning map](/products/uu-remote/): product family, quick decisions, official resources.
- [Tailscale](../tailscale/): another remote approach, connecting the devices first at the network layer.
- [Cindy](../cindy/): built-in phone remote desktop feature.
- [T3 Code](../t3code/): approve an agent's next step from your phone.
- [Claude](../claude/): how to use Claude Code.
- [Codex](../codex/): how to use Codex.

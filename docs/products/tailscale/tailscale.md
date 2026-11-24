---
title: Tailscale getting-started tutorial
description: "Tailscale lets devices signed in to the same account reach each other as if they were on the same LAN, with traffic encrypted end to end and no public IP address or port forwarding needed. This page walks you through connecting two devices, confirming they can reach each other, getting in with Tailscale SSH, and then working through six everyday development scenarios."
domain: product
tags:
  - mesh-vpn
  - remote-access
  - wireguard
  - tailscale
role: tutorial
pageClass: wide-figures
---

# Get started with Tailscale: connect two devices, then SSH in

> **The short version:** Tailscale lets **devices signed in to the same account** reach each other as if they were on the same LAN (local area network), and the data is **encrypted end to end** between devices. You do not need to set up your own VPN server, and you do not need port forwarding (writing rules by hand on the router to open a port to one device on the private network).
>
> Official text ([What is Tailscale?](https://tailscale.com/docs/concepts/what-is-tailscale)): it enables encrypted point-to-point connections using the open source **WireGuard** protocol and creates a peer-to-peer network called a **tailnet**; connections between devices work "without requiring port forwarding or complex firewall rules". WireGuard is an open source encrypted tunnel protocol; you can think of it as the layer that "encrypts the packets between two devices and then sends them out".
>
> This page is the **tutorial**: first get "two devices reaching each other + SSH in" working in 10 minutes, then cover how it works and the advanced parts. For the product overview and choosing a feature, see the [learning map](./); for how the source implements it, see the [source-code walkthrough](./source).

## Learning objectives

- Install Tailscale on two devices, sign in with **the same identity**, and confirm in the admin console that they are in the same tailnet.
- Read `tailscale status`: who is online, and whether the connection is direct (`direct`) or relayed (`relay`).
- Use `tailscale ssh` from one device to sign in to another Linux device of your own, without generating or distributing SSH keys at any point.
- Use `tailscale serve` to expose the dev server on this machine only to your own other devices.
- Set up one subnet router and one exit node, to "reach the whole home network" and to "send traffic through the home network while on public Wi-Fi" respectively.
- Explain the three places where things most often go wrong: Funnel, exit node, and the flag rules of `tailscale up`.

## Prerequisites and environment requirements

### Who this is for

People who can write frontend code and have used a command line, but have **never set up a network**. Each networking term in this page is first explained in plain words, then given its precise meaning.

### What you need

| Need | Notes |
|---|---|
| One identity account | You sign in with an identity provider account. Apple, Google (including Gmail), GitHub, Microsoft, Okta and OneLogin are supported natively, and custom OpenID Connect providers are also supported |
| Two devices | The first task requires that **the device you sign in to is Linux**: the Tailscale SSH server only supports Linux and the open source macOS build |
| A command line | Windows, macOS and Linux all have a CLI; the official docs say iOS and Android have no CLI |
| A browser | Sign-in opens the identity provider's web page |

| Platform | Minimum requirements listed by the official docs |
|---|---|
| Windows | Windows 10 or later, or Windows Server 2016 or later |
| macOS | macOS Ventura 13.0 or later |
| iOS | iOS 16.0 or later |
| Android | Android 8.0 or later |
| Linux | Distributions with `apt`, `yum` or `zypper` can use the official install script |

> **Where this page's commands come from:** the `--help` output is from a `1.104.7` client that I ran on Windows. Flags may differ between versions; `tailscale <subcommand> --help` on your own machine is the source of truth.

### Non-goals

- **Not a tool for changing your apparent location or getting around regional blocks.** A self-hosted exit node only moves the exit point to **a device of your own**, and the exit location is wherever that device is. The official docs also describe a paid Mullvad exit node add-on (beta), which this page does not cover.
- Does not cover the cryptography of WireGuard itself.
- Does not teach advanced topics such as Kubernetes Operator, Tailnet Lock and OAuth clients; each gets one row in the [learning map](./).
- Does not teach self-hosting a coordination server (for example Headscale); see the official [Configure Tailscale clients to use a custom control server](https://tailscale.com/docs/how-to/set-up-custom-coordination-server).

## Core concepts

### Glossary

First three pieces of background vocabulary, then the Tailscale terms.

| Term | In one sentence | Why it is needed |
|---|---|---|
| **Public IP address** | An address that other machines on the internet can reach directly | Home broadband usually does not assign one to every device |
| **NAT (network address translation)** | The router lets several devices share one public IP address; the side effect is that devices outside cannot find you | Home and office networks both work this way |
| **Port forwarding** | Writing rules by hand on the router to open a port to one device on the private network | It has to be redone for every new device and every new network |

| Term | In one sentence | Why it is needed |
|---|---|---|
| **tailnet** | Your private network: a set of users, devices and resources that the public internet cannot reach | Draws the boundary of "who belongs together" |
| **node** | One device in the tailnet, such as a phone, a computer or a VM | Each device gets one identity and one fixed address |
| **identity provider (IdP)** | The account you sign in with, such as Google, GitHub or Microsoft | Tailscale stores no passwords itself and leaves sign-in to it |
| **coordination server (also called the control plane)** | The "contact list" run by Tailscale: it records each device's public key and address, then distributes them to devices that have permission | Two devices do not know each other; someone has to introduce them |
| **direct connection** | The two devices send and receive UDP packets straight to each other | Lowest latency and highest throughput |
| **DERP relay** | A relay server run by Tailscale that forwards your encrypted packets when a direct connection fails | Guarantees that you can connect even on very restrictive networks |
| **NAT traversal** | The way two devices behind routers find each other and communicate directly | Without it, the only option is a relay |
| **STUN** | A small protocol that lets a device find out its own address and port on the public internet | Before NAT traversal, the device has to know "what I look like from outside" |
| **100.x.y.z address** | A private IP address, one per device, that does not change when the network changes | No need to remember a public address that changes |
| **MagicDNS** | Uses the device name instead of the IP address | Numeric addresses are hard to remember |
| **ACL / grants (access policy)** | A JSON file that states who may connect to whom, and on which ports | The default lets everything reach everything; it must be tightened once more people join |
| **tag** | An identity for a device that "does not belong to one person", such as a server or a container | When an employee leaves, the servers should not leave with them |
| **subnet router** | A device with Tailscale installed that forwards traffic on behalf of the devices behind it that have no Tailscale | Printers and old NAS devices cannot run the client |
| **exit node** | A device that forwards **all of your internet traffic** for you | Lets traffic leave through the home or office network while you are on untrusted Wi-Fi |
| **Key expiry** | A device's key expires after 180 days by default, and you have to sign in again after that | If a device is lost, it stops working by itself after a while |
| **device approval** | After a new device signs in, an administrator has to approve it before it joins the tailnet | Stops other people from adding devices at will with accounts under your domain |
| **Taildrop** | Sends files between your own devices | For sensitive or large files that should not pass through a third-party cloud drive |

### Each concept in a little more detail

**The tailnet is created automatically the first time you sign in.** Official text: Tailscale creates a tailnet when you first log into Tailscale on any device, and each time a device is authenticated, it adds that device to the tailnet. A device can be authenticated with a user account or with a tag. The tailnet is your private space, and the public internet cannot reach it. ([What is a tailnet?](https://tailscale.com/docs/concepts/tailnet))

**Tailscale is not an identity provider itself.** Official statement: it does not support signing up with an email address, and there are no "Tailscale passwords"; user authentication is left to identity providers. ([Supported SSO identity providers](https://tailscale.com/docs/integrations/identity))

**The coordination server only hands out the "contact list" and never touches your data.** It handles device discovery, key distribution and sending down policy. The official docs give the reason when they explain what happens if the coordination server goes down: "Tailscale doesn't route any traffic through the coordination service, device keys are stored locally, and network policies are cached locally". It sends public keys only to devices the policy allows to see them, so two devices without authorization for each other cannot "see" each other. ([Control and data planes](https://tailscale.com/docs/concepts/control-data-planes))

**What end-to-end encryption means.** Data is encrypted on the device it leaves and decrypted only on the device it arrives at; every server in between only ever gets ciphertext. Official text: "Devices running Tailscale only exchange their public keys. Private keys never leave the device. All traffic is end-to-end encrypted, always." ([Can Tailscale decrypt my traffic?](https://tailscale.com/docs/concepts/can-tailscale-decrypt-traffic))

**The three connection types are equal in security and differ only in performance.** Direct, DERP relay and Peer Relay (another device in the tailnet acts as the relay) are all end-to-end encrypted. Direct has the lowest latency; a relay is used only when a direct connection fails. ([Connection types](https://tailscale.com/docs/reference/connection-types))

**Why Tailscale IP addresses are 100.x.** They come from the `100.64.0.0/10` range (`100.64.0.0` to `100.127.255.255`), which does not conflict with the `192.168.x.x` and `10.x.x.x` ranges commonly used at home. The address does not change when the device moves from Wi-Fi to mobile data either. ([What are these 100.x.y.z addresses?](https://tailscale.com/docs/concepts/tailscale-ip-addresses))

**By default it only connects devices and does not change how your internet traffic is routed.** Official statement: by default Tailscale acts as an **overlay network** (a virtual network laid on top of the existing one), it only routes traffic between devices running Tailscale, and it does not touch your traffic to ordinary websites. To send internet traffic through Tailscale as well, you have to set an exit node explicitly. ([Exit nodes](https://tailscale.com/docs/features/exit-nodes))

**The default access policy is "allow all".** A new tailnet comes with an allow all policy: every device can reach every other device, and every user can use Tailscale SSH to sign in to **their own** devices. For how to tighten it, see [security and privacy essentials](./tailscale) below.

## How it works

Before looking at the diagram, keep this question in mind: **how do two devices that do not know each other first get each other's information through the coordination server, then try a direct connection and fall back to a relay if that fails, and why can none of them see plaintext?**

<DocDiagram src="/diagrams/tailscale-connection.en.svg" alt="This sequence diagram has five vertical lanes. From left to right: device A, device B, the identity provider, the coordination server (the control plane), and the DERP relay server, which also acts as a STUN server. Numbers give the order. Step 1: device A and device B each log in to the identity provider; Tailscale itself does no user authentication. Step 2: each device sends the coordination server a MapRequest containing its own node public key, addresses and candidate endpoints. Step 3: the coordination server sends the network map, or netmap, to device A and device B. It tells each device whether the other exists, the other node's public key, its Tailscale address, its candidate endpoints and its home DERP region, and it includes only the nodes the policy allows that device to see. Step 4: device A connects to the DERP server that device B uses, DERP passes the connection request to device B, and then the two sides exchange the endpoint information needed for a direct connection through DERP; paths through DERP are drawn as amber dashed lines. Step 5: both sides first use STUN to discover their own public address, then try each candidate endpoint to traverse NAT. If that succeeds they establish a direct WireGuard UDP tunnel, drawn as a thick green line, and after that the data passes through no third party. Step 6: if the direct path fails, Tailscale first tries a Peer Relay inside the tailnet, drawn as a cyan dashed line; a Peer Relay requires explicit setup and is not there by default. Only when no Peer Relay is available does it keep using the DERP relay to forward already-encrypted WireGuard packets, drawn as an amber dashed line. Step 7: Tailscale on the devices retries periodically to see whether the connection can upgrade to direct or to a Peer Relay. Step 8 is two protection notes: the coordination server only distributes public keys and policy, is not on the data path and never sees plaintext; DERP only forwards already-encrypted WireGuard packets and cannot decrypt them. The difference between direct and fallback: with a direct connection the data travels only between the two devices and no third party is involved; with a fallback the data is relayed, and when it is relayed through DERP what DERP forwards is still encrypted WireGuard packets. Orange solid lines are control and negotiation messages. This diagram omits: a separate lane for the Peer Relay; the internal steps of the WireGuard handshake and key negotiation; NAT types and the details of hole punching; the interval between periodic retries; the number and location of DERP regions; the contents of the policy the coordination server distributes." :width="1020" lang="en" />

> **What the diagram is based on:** the order of the steps, and the three connection types (direct, Peer Relay, DERP relay), come from four official docs pages, [Connection types](https://tailscale.com/docs/reference/connection-types), [Control and data planes](https://tailscale.com/docs/concepts/control-data-planes), [encryption](https://tailscale.com/docs/concepts/tailscale-encryption) and the [STUN protocol](https://tailscale.com/docs/reference/stun-protocol) (as of 2026-11-24); "trying each candidate endpoint" was checked against the source [`magicsock/endpoint.go` L626–L652](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/wgengine/magicsock/endpoint.go#L626-L652) (commit `da6276d7`). The diagram keeps the order of the eight steps among five objects, and the distinction between the three line styles (control and negotiation messages, direct tunnel, fallback path); it leaves out the number of DERP regions and the list of cities, the internals of Peer Relay, and the working details inside the coordination server and DERP. The coordination server only distributes public keys and policy and is not on the data path; DERP only forwards encrypted WireGuard packets and cannot decrypt them. A Peer Relay requires explicit setup and is not there by default.

Three relationships in the diagram are worth remembering.

**Layer 1: the first three steps do the "introducing"; the later steps carry "data" between the two devices.** This matches the official two-way split: the control plane is the coordination server, and in the diagram the report and the delivery in steps 2 and 3 deal with it alone; the data plane runs on each device, and from step 4 on it sets up and uses the connection between the devices, encrypting and decrypting with WireGuard. If the coordination server goes down, existing connections keep working, but you cannot add devices, change keys or update policy. ([What happens if the coordination server is down?](https://tailscale.com/docs/reference/coordination-server-down))

**Layer 2: every connection starts on DERP and only then tries to upgrade (steps 4 to 6 in the diagram).** Official text: all connections start as relayed through a DERP server, and Tailscale then tries to upgrade them to a direct connection; if that fails it tries a Peer Relay; if that fails too, the connection stays on DERP. DERP also acts as the STUN server: the client sends STUN requests to the DERP servers, each one notes which public IP address and port the request came from, and Tailscale uses that information to work out how to traverse NAT.

**Layer 3: the relay cannot decrypt your traffic either.** Official text: "DERP servers never access your unencrypted data; they only handle WireGuard packets that are already encrypted" and "A DERP server blindly forwards already-encrypted traffic from one device to another". The reason is that private keys never leave the device. ([Tailscale encryption](https://tailscale.com/docs/concepts/tailscale-encryption), [DERP servers](https://tailscale.com/docs/reference/derp-servers))

| Connection type | Path | When it is used | Performance |
|---|---|---|---|
| Direct `direct` | UDP packets sent straight between the devices | Most network environments | Lowest latency, highest throughput |
| Peer Relay `peer-relay` | Relayed through another device in the tailnet | A direct connection fails and someone has set up a Peer Relay | Faster than DERP, slower than direct |
| DERP `relay` | Through Tailscale's DERP servers | Neither direct nor Peer Relay is available | Works, but speed is limited by the relay |

Whether a direct connection succeeds depends on the NAT type on both sides. Official statement: most environments allow a direct connection, but "hard NAT" (very restrictive network address translation) forces Tailscale to use a relay. As long as a device can make an HTTPS connection to any host, a tunnel can always be established through DERP.

## Install

Install and register the first device first, then install the second and sign in with **the same identity**. For full instructions for each platform, see the official [Install Tailscale on any device](https://tailscale.com/docs/install).

### Windows

1. Download the `.exe` installer from the [Download](https://tailscale.com/download) page and run it.
2. **You will see:** a Tailscale icon in the system tray. If you do not see it, click the tray's up arrow and look in the hidden-icons area.
3. Right-click the icon and select **Log in** under the account.
4. **You will see:** the browser opens the sign-in page. Sign in with your identity provider account.

On the command line, use `tailscale <command>` directly in Command Prompt. ([Install Tailscale on Windows](https://tailscale.com/docs/install/windows))

### macOS

1. Install the client. The official docs recommend the Standalone version; the Mac App Store version and the open source build on GitHub also work.
2. Follow the guided steps to install Tailscale's VPN configuration.
3. Sign up or sign in with an identity provider account.

To use the command line: in the Standalone version, find the CLI integration section in the client's **Settings**, select **Show me how**, then **Install Now**. In the App Store version the CLI is inside the app bundle, at `/Applications/Tailscale.app/Contents/MacOS/Tailscale`. ([Install Tailscale on macOS](https://tailscale.com/docs/install/mac))

### Linux

```bash
# Official install script; works on Ubuntu, Debian, RHEL, CentOS, Fedora, Raspberry Pi OS and other distributions
curl -fsSL https://tailscale.com/install.sh | sh

# Start and sign in
sudo tailscale up
```

**You will see:** the terminal prints a sign-in link. Open it in a browser and sign in. Then sign in to the **Machines** page of the admin console and confirm that this device shows up. If you would rather not use `curl | sh`, the official docs provide manual installation instructions.

Verify the installation:

```bash
# Show this device's Tailscale IPv4 and IPv6 addresses
tailscale ip

# View the connection status
tailscale status
```

([Install Tailscale on Linux](https://tailscale.com/docs/install/linux))

### iOS and Android

- **iOS:** Install from the App Store, open the app and select **Get Started**, agree to install the VPN configuration and allow push notifications (they remind you when a key is about to expire), then select **Log in**.
- **Android:** Install from Google Play, open the app and select **Get Started**, then select **Sign in with Google** or **Sign in with other**.

([iOS](https://tailscale.com/docs/install/ios), [Android](https://tailscale.com/docs/install/android))

## Get the first task working in 10 minutes

Goal: the two devices can see each other, and you can sign in to device B (Linux) from device A with Tailscale SSH.

1. **Sign up and create the tailnet.** Open `tailscale.com` and select **Get Started**. On the **Sign up with your identity provider** page, sign in with your identity provider; on the **Welcome to Tailscale** page, select **Business use** or **Personal use**.
   **You will see:** an account registered with a public email address (for example Gmail) goes into the Personal plan automatically; an account registered with a custom domain goes into the 14-day Enterprise trial automatically.
2. **Add the first device.** On the **Let's add your first device** page, choose the operating system, install as prompted, and authenticate with the same account you just used.
3. **Add the second device.** On the **Next, add a second device** page, choose the second machine's operating system, take the link to that machine and finish signing in there. Select **Take me home** to go to the admin console.
4. **Confirm that the two devices can see each other.**
   - Open the **Machines** page of the admin console: both devices are in the list, each with a device name and a `100.x.y.z` address.
   - Run `tailscale status` on either device. You should see something like this (the example comes from the official CLI reference):

   ```text
   1           2         3           4         5
   100.1.2.3   device-a  apenwarr@   linux     active; direct <ip-port>, tx 1116 rx 1124
   100.4.5.6   device-b  crawshaw@   macOS     active; relay <relay-server>, tx 1351 rx 4262
   100.7.8.9   device-c  danderson@  windows   idle; tx 1214 rx 50
   100.0.1.2   device-d  ross@       iOS       -
   ```

   The five columns are, in order: Tailscale IP, device name, device owner's email, operating system, connection status. In the status, `direct` means a direct connection and `relay` means relayed through DERP; `-` means no data has been sent or received yet.
5. **Test the network layer.** Replace `another-device` below with the other device's name:

   ```bash
   tailscale ping another-device
   ```

   You should see something like this (the example comes from the official docs):

   ```text
   pong from another-device (100.113.160.82) via DERP(nyc) in 130ms
   pong from another-device (100.113.160.82) via DERP(nyc) in 37ms
   pong from another-device (100.113.160.82) via DERP(nyc) in 50ms
   pong from another-device (100.113.160.82) via DERP(nyc) in 38ms
   pong from another-device (100.113.160.82) via 140.82.13.138:41641 in 35ms
   ```

   The first lines go through DERP because Tailscale is still negotiating a direct connection; once it is established, the later packets go direct. If every line stays at `via DERP(...)`, no direct connection was established this time; it still works, but it is slower.
6. **Turn on Tailscale SSH on device B.** Run this command on B (from here on, `<device-name>` always means B's device name):

   ```bash
   tailscale set --ssh
   ```

   **You will see:** no output. **Note:** the official docs warn that this command makes existing SSH connections to this machine's Tailscale IP hang; reconnect and they work again.
7. **Sign in to device B from device A.** Replace `<linux-user>` with a username that already exists on B, and `<device-name>` with B's device name:

   ```bash
   tailscale ssh <linux-user>@<device-name>
   ```

   The default policy is `check` mode: the device that starts the connection has to re-authenticate with the identity provider once. The official docs say that SSH initialization gives you a URL to sign in at; after authenticating, further connections within 12 hours need no re-authentication.
8. **Wrap up.** `/etc/ssh/sshd_config` and `~/.ssh/authorized_keys` on B were not modified, and the old way of using SSH without going through Tailscale still works as before.

A script version of step 7, with error handling:

```bash
# Stop if the connection fails, and say to check the network layer first; do not carry on past an error
if ! tailscale ssh <linux-user>@<device-name> true; then
  echo "SSH failed. Run this on A first: tailscale ping <device-name>" >&2
  exit 1
fi
```

## Everyday use

### Sign in to another machine of your own with Tailscale SSH

On the machine you sign in to, run `tailscale set --ssh`. On the machine that starts the connection, either form works:

```bash
# Form 1: the wrapper command that comes with Tailscale
tailscale ssh <linux-user>@<device-name>

# Form 2: ordinary ssh, with the device name or the 100.x address as the target
ssh <linux-user>@<device-name>
```

The official docs say that for most people plain `ssh` is enough. `tailscale ssh` is an optional wrapper that does only three more things (from `tailscale ssh --help`):

- It resolves the target name with MagicDNS even when this machine has `--accept-dns=false` set.
- In userspace networking mode, it connects through the `tailscaled` pipe.
- It automatically checks the target machine's SSH host key against the node key published by the coordination server.

| Limit | Details |
|---|---|
| Server platform | Only Linux and the open source macOS build are supported; it cannot run on Synology or QNAP |
| Port | Always takes over port 22 on the Tailscale IP; this cannot be changed |
| Valid targets | You can only sign in to devices with Tailscale installed; devices without Tailscale behind a subnet router are not reachable this way |
| Daemon restart | Restarting `tailscaled` (for example for an upgrade) drops existing Tailscale SSH sessions |

### Remote development: connect VS Code to your home machine, then share the dev server with your own devices

**Connect and write code.** Once Tailscale SSH is in effect, the connection is ordinary SSH. Below is the standard OpenSSH client configuration; Tailscale takes care of making the name `<device-name>` resolve and the connection arrive:

```text
# Write this into ~/.ssh/config; replace what is inside the angle brackets with your own
Host <device-name>
  HostName <device-name>
  User <linux-user>
```

<!-- TODO: needs verification — whether there is an official page on connecting VS Code's Remote-SSH through Tailscale SSH. I did not find the string "Remote-SSH" in the downloaded official docs; the configuration above is only the general OpenSSH client form, not a Tailscale-specific one -->

**Share the dev server with your own devices.** On the machine that runs the dev server, run:

```bash
# Assume the dev server listens on local port 3000; runs in the foreground, exit with Ctrl+C
tailscale serve 3000

# Or put it in the background
tailscale serve --bg 3000
```

You should see something like this (the example comes from the official docs; I compressed it to three lines):

```text
Available within your tailnet:
https://amelie-workstation.pango-lin.ts.net
|-- / proxy http://127.0.0.1:3000
```

Then open this `https://` address on **another one of your own** devices and you can reach it.

- **You will see:** the first time you use Serve, if HTTPS is not enabled on the tailnet, a web page opens and asks you to agree to enable it. Serve depends on HTTPS certificates.
- **View and stop:** `tailscale serve status` shows the current configuration; in foreground mode press `Ctrl+C`, in background mode run `tailscale serve reset`.
- **Permissions:** forwarding a port needs no administrator rights; sharing files or directories does.
- **Open to the tailnet only:** Serve traffic is visible only inside the tailnet, and it carries identity headers with information about the requester (`Tailscale-User-Login` and others). To show it to the public internet is a different command, Funnel; see the security section below.

### Reach a local model service on your home GPU machine from outside

The idea is the same as the previous section: the model service runs on a local port of the GPU machine, and Serve maps it to an HTTPS address that only your devices can reach.

```bash
# Run on the GPU machine; replace <port> with the local port the model service listens on
tailscale serve --bg <port>
```

Serve gives you an address of the form `https://<device-name>.<tailnet-name>.ts.net`, the line in the previous example output. On your laptop, point the model client's base URL at it.

<!-- TODO: needs verification — which address a model service listens on by default, and how to change it to listen on the Tailscale address, is each service's own configuration; the downloaded official Tailscale docs contain no instructions for Ollama. For how to use Ollama, this site's Ollama page is the reference -->

Take Ollama as an example; for its installation and usage, see [Ollama](/products/ollama).

Two things to go with it:

- **Turn off key expiry for the GPU machine.** Otherwise it goes offline after 180 days. See [security and privacy essentials](./tailscale) below for how.
- **When other people are in the tailnet, restrict this port.** The official approach for GPU servers is to use grants to limit "who can connect to which ports on which machine". The core fields of the official example are `src` (source user or group), `dst` (target device or tag) and `ip` (ports); copy it from [Connect inference and training servers](https://tailscale.com/docs/use-cases/ai-infrastructure-access/connect-inference-servers).

### Use your home desktop as a remote agent workstation

Let Claude Code or Codex run for a long time on the desktop, and from outside you attach again any time on a laptop to look at the results.

```bash
# 1. Sign in to the desktop from the laptop (prerequisite: the desktop has already run tailscale set --ssh)
tailscale ssh <linux-user>@<device-name>

# 2. On the desktop, start a session that will not disappear when the connection drops; agent is the session name, call it anything you like
tmux new -s agent

# 3. Start your agent in this session, then press Ctrl+b, release, and press d to send the session to the background

# 4. Next time you connect, attach to the same session
tmux attach -t agent
```

`tmux` is a third-party tool and the above is its standard usage; for how to install and use the agents themselves, see the [Claude](/products/claude/) and [Codex](/products/codex/) pages.

- **The desktop has to stay online.** On Windows, to keep Tailscale running when no user is signed in, run `tailscale set --unattended=true`.
- **Do not lend the laptop to others.** A limit stated in the official docs: Tailscale SSH does not authenticate with local key pairs, so **any system user on the client machine** can start a Tailscale SSH connection; where they can connect to is decided by the server's access policy.
- **A comparison from another angle:** [Codex Remote](/products/codex/codex-remote) pairs the mobile and desktop apps; Tailscale solves the lower-level problem of "devices being reachable over the network", and the two do not overlap.

### Subnet routing and exit node

These two features are easy to confuse. The official distinction: a subnet router lets you reach devices in a private subnet and does not affect your internet traffic; an exit node forwards all of your internet traffic as a whole.

**Subnet router: reach the whole home network.** Run this on a Linux machine (`192.0.2.0/24` and `198.51.100.0/24` are the official example subnets; replace them with your own):

```bash
# 1. Turn on the kernel's forwarding capability
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
sudo sysctl -p /etc/sysctl.d/99-tailscale.conf

# 2. Advertise the routes
sudo tailscale set --advertise-routes=192.0.2.0/24,198.51.100.0/24
```

Then do three things:

1. Find this machine on the **Machines** page of the admin console, go to the **Subnets** section, tick the routes and select **Save**. Routes take effect only after someone approves them.
2. If the policy does not allow these subnets, add an access rule on the **Access controls** page.
3. On the client side, Android, iOS, macOS, tvOS and Windows accept subnet routes automatically; **Linux does not accept them by default**, so run `sudo tailscale set --accept-routes`.

The official docs remind you: when you turn on IP forwarding, make sure your firewall denies forwarded traffic by default (`ufw` and `firewalld` do this by default). ([Subnet routers](https://tailscale.com/docs/features/subnet-routers))

**Exit node: send all traffic out through a home device while on public Wi-Fi.** Configure a Linux machine at home as the exit:

```bash
sudo tailscale set --advertise-exit-node
# Official requirement: after adding this flag with set, you must run up once more
sudo tailscale up
```

The Linux machine also needs IP forwarding turned on first. Then:

1. An administrator finds it on the **Machines** page, selects **Edit route settings** in the menu, then **Use as exit node**.
2. Turn it on separately on each device that will use it: on Windows select **Use exit node** in the tray menu; on macOS select **Exit Nodes** in the menu bar; on Linux run `sudo tailscale set --exit-node=<exit-node-ip>`.
3. Verify: check this machine's public IP address with any tool; it should show the exit node's address, not your current one.
4. Turn it off: on Windows and macOS select **None**; on Linux run `sudo tailscale set --exit-node=`.

After connecting to an exit node, by default you cannot reach the local network you are on (for example the printer at a hotel). If you really need it, add `--exit-node-allow-lan-access=true`, and turn it off when you are done. ([Exit nodes](https://tailscale.com/docs/features/exit-nodes))

### Send files with Taildrop; use names instead of IP addresses with MagicDNS

**Taildrop.** It is still an alpha feature, and you first have to turn on **Send Files** on the **General** settings page of the admin console. It only transfers between your own devices; you cannot send to other people's devices or to tagged nodes.

```bash
# Send on Linux: the target is "the device name plus a colon", close to the scp syntax
tailscale file cp ./my-file.txt <device-name>:

# Receive on Linux: tailscaled runs as root, so only root can pick up the files it receives
sudo tailscale file get .
```

On Windows, right-click a file and select **Send with Tailscale**; on macOS and phones, use Tailscale in the system share menu. ([Taildrop](https://tailscale.com/docs/features/taildrop))

**MagicDNS.** It is on by default for tailnets created on or after October 20, 2022. Once it is on, the device name works as a hostname:

```bash
# These two are equivalent
ping <device-name>
ping <device-name>.<tailnet-name>.ts.net
```

The full domain name is made of the "device name" plus the "tailnet's DNS name", and both can be looked up on the **DNS** page of the admin console. On macOS, `host` and `nslookup` bypass system DNS and do not work with MagicDNS; `ping` does. Devices that other people share with you have to be reached by their full domain name. ([MagicDNS](https://tailscale.com/docs/features/magicdns))

## Real-world use

- **Fix a bug on the way home from work.** Sign in to the desktop with `tailscale ssh`, attach to the agent session that is still open with `tmux attach`, read the tests it ran and then give the next instruction.
- **Show a colleague a page that is not released yet.** Run `tailscale serve --bg 3000` and send them the address. The colleague has to be in your tailnet to open it; people on the public internet cannot.
- **Call a model at home from outside.** Run `tailscale serve --bg <port>` on the GPU machine and point the client on the laptop at this address. The requests are encrypted the whole way, and no port has to be opened on the router.
- **Use hotel Wi-Fi on a business trip.** Set the laptop's exit node to a machine at home, so internet traffic leaves from home.
- **Browse the photos on a NAS from your phone on the way home.** It does not matter that the NAS cannot run the client: any always-on device at home acts as the subnet router, and the phone can reach the NAS's private network address.

## Pricing, quotas and limits

The numbers below come from the official pricing page ([Tailscale pricing](https://tailscale.com/pricing)) opened on 2026-11-24, and may change afterwards.

| Plan | Price | Users | ACL groups | Key points |
|---|---|---|---|---|
| Personal | Free | Up to 6 | Up to 3 | Unlimited user devices; 50 tagged resources to start; 1,000 minutes of ephemeral resources per month; non-commercial use only |
| Standard | $8 per user per month | Unlimited | Up to 10 | Deploy users and groups with SCIM; configure with MDM; device posture integrations |
| Premium | $18 per user per month | Unlimited | Up to 300 | 10,000 minutes of ephemeral resources per month; Advanced Tailscale SSH; network flow logs; log export |
| Enterprise | Contact sales | Custom | Custom | Custom device counts and limits, custom MSA, pay by invoice |

- **Add-ons:** extra tagged resources cost $1 per month each; the Mullvad add-on costs $5 per month for every 5 devices.
- **How limits are enforced:** the pricing page FAQ states that it is "currently not enforcing the hard limits or overages of ACL groups, multiple tailnets, tagged resources, and ephemeral resources".
- **SSH check mode:** every plan has it; changing the check period (12 hours by default) requires Premium or Enterprise.

Limits related to feature maturity:

| Feature | Status | Limit |
|---|---|---|
| Funnel | beta | Can only listen on the three ports `443`, `8443` and `10000`; TLS only; bandwidth is limited and not configurable |
| Taildrop | alpha | Can only send to your own devices |
| Mullvad exit node | beta | Paid add-on |

## Security and privacy essentials

### First, be clear about what Tailscale can see

| Question | Official answer |
|---|---|
| Can Tailscale decrypt my traffic | No. Devices only exchange public keys, and private keys never leave the device |
| Does my traffic pass through Tailscale's servers | No. Most of the time it is a direct connection; when a direct connection fails it passes through a DERP relay, but what the relay forwards is ciphertext |
| What does the coordination server know | Your identity (email address, avatar link), device information (system, version, public key, address) and policy |

The third row comes from the official description of what the coordination server is responsible for. It "does not handle user authentication"; authentication is outsourced to the identity provider.

### Guardrail 1: Funnel exposes a service to the public internet

`tailscale funnel` and `tailscale serve` differ by one word, and the result is completely different: Serve shows a service only inside the tailnet; Funnel shows it to **the whole internet**. Do not turn it on by default. Understand these points before you do:

- **There is no identity layer.** Anyone who has the address can access it. Funnel traffic does not carry the identity headers that Serve has.
- **Ask yourself first: does this service have its own sign-in? Could it expose directories or keys?** Think this through especially carefully before sharing a directory with Funnel.
- **The same port cannot be served with Serve and Funnel at the same time.** If the last command that configured it was `serve`, the port is fully private; if it was `funnel`, it is fully public.
- **Who is allowed to turn on Funnel is decided by policy.** When you enable it with the CLI, Tailscale changes your policy file and by default allows everyone in `autogroup:member` to use Funnel; you can tighten this by hand.
- **How to view it and turn it off:** `tailscale funnel status` shows the current configuration, and `tailscale funnel reset` turns it off.
- **Funnel nodes appear in your peer list**; you can see them in `tailscale status --json`.

<!-- TODO: needs verification — whether Funnel is enabled by default: the official Serve page says "Tailscale Funnel is enabled by default" and the official Funnel page says "Tailscale Funnel is disabled by default"; the two pages contradict each other. What is certain: a port becomes public only after it is configured with the funnel command -->

### Guardrail 2: the default policy allows everything, so tighten it once more people join

The policy of a new tailnet is equivalent to the one below (the fields come from the official example; the layout has been compacted):

```json
{
  "acls": [
    { "action": "accept", "src": ["*"], "dst": ["*:*"] }
  ],
  "ssh": [
    {
      "action": "check",
      "src": ["autogroup:member"],
      "dst": ["autogroup:self"],
      "users": ["autogroup:nonroot", "root"]
    }
  ]
}
```

What it means: all devices can reach each other; every member can SSH to their own devices in check mode, as root or as a non-root user.

<!-- TODO: needs verification — whether the default policy file a new tailnet actually gets uses the acls form or the grants form: the official ACL examples page shows acls, while the official Tailscale SSH page uses grants when it shows the "widest policy"; the two pages are written in different forms -->

When you are the only user, allowing everything is fine. Once you invite other people into the tailnet, you should tighten it. The core rule of the official example "Users can access their own devices" is:

```json
{
  "acls": [
    {
      "action": "accept",
      "src": ["autogroup:member"],
      "dst": ["autogroup:self:*"]
    }
  ]
}
```

- Edit it on the **Access controls** page of the admin console. For newly written policy the official docs recommend the grants syntax, which can do everything ACLs can and will keep getting new features; the old ACL form will keep being supported.
- **Deleting the `acls` field does not mean "deny everything".** The official docs warn that omitting the `acls` field is the same as the default allow-all policy. To deny everything, write `"acls": []`.
- **Be careful when changing SSH rules.** When you change `dst` from `autogroup:self` to another target, the official docs remind you to also consider removing `autogroup:nonroot` from `users`; otherwise anyone allowed in `src` can sign in as any non-root user on the target machine.
- **Policy is enforced locally on each device**; changes take effect within seconds, and tightening SSH rules **drops** the other party's established SSH connections.

([Allow all (default ACL)](https://tailscale.com/docs/reference/examples/acls), [Grants vs. ACLs](https://tailscale.com/docs/reference/grants-vs-acls))

### Guardrail 3: what trusting an exit node means

- **Whoever's exit node you use is where your traffic leaves from.** Websites see its IP address as the source. At the network layer it can see which addresses you visit and any unencrypted content. So use only devices you control as exit nodes.
- **The other way round: an exit node you advertise is usable by the whole tailnet by default.** Official text: by default, any user in your tailnet can use a configured exit node. When other people are in the tailnet, grant `autogroup:internet` in the policy only to people you trust.
- **All three sides have to agree.** The official docs say that, for security, an exit node must be turned on explicitly: the device has to advertise itself, an administrator has to approve it, and each device that uses it has to select it.
- **Do not expect an exit node device to hide where your traffic comes from.** Traffic leaves from your home or office network, and the other party sees that network's address.

<!-- TODO: needs verification — what happens to a device using an exit node after the exit node's key expires (does it lose connectivity, or does it bypass the exit node and connect directly): that part of the official page is an embedded snippet that could not be captured, and I did not locate the corresponding logic in the source -->

### Guardrail 4: `tailscale up` with flags must repeat every non-default setting

The rules (from `tailscale up --help` and the source [`up.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/up.go#L1054-L1114)):

- `tailscale up` **with no flags at all** only brings the network up and changes no settings.
- **As soon as it has flags**, that set of flags must be the complete set of settings you want. Any setting that "is currently not at its default and is not mentioned this time" makes the command fail, unless you also add `--reset`.
- `--auth-key`, `--force-reauth` and `--qr` do not count as settings, so they do not need repeating.
- This check is not done before the first login.

An example that fails: this machine ran `tailscale set --advertise-routes=192.0.2.0/24` earlier, and now you only want to change its name.

```bash
# Fails: only --hostname is mentioned, and the --advertise-routes set earlier is not
tailscale up --hostname=<device-name>
```

You should see an error like the one below. The body was derived from the fixed text in the source and its assembly order; I did not trigger it on my own machine:

```text
Error: changing settings via 'tailscale up' requires mentioning all
non-default flags. To proceed, either re-run your command with --reset or
use the command below to explicitly mention the current value of
all non-default settings:

	tailscale up --hostname=<device-name> --advertise-routes=192.0.2.0/24
```

Three correct ways to write it:

```bash
# Form 1: rerun the complete command given in the error
tailscale up --hostname=<device-name> --advertise-routes=192.0.2.0/24

# Form 2 (recommended): for everyday setting changes use set, which does not require repeating other flags
tailscale set --hostname=<device-name>

# Form 3: add --reset only when you really want the other settings restored to their defaults; it clears settings such as subnet routes
tailscale up --hostname=<device-name> --reset
```

**Using only `tailscale set` for everyday changes avoids this trap.** The text of its `--help`: unlike `tailscale up`, this command does not require the complete set of settings and only changes the items you explicitly mention.

### Guardrail 5: key expiry takes devices offline

- **Symptom:** a device's key expires after 180 days by default. After it expires, **every connection to and from this device stops working**. Phones get a push notification in advance.
- **Reauthenticate yourself:** run `tailscale up --force-reauth` on that device. The official docs warn that this command may interrupt Tailscale connections; do not run it remotely only over SSH or a remote desktop, and keep a backup way to sign in.
- **When you are not near the device:** the administrator selects **Temporarily extend key** in the menu on the **Machines** page; the key is extended for 30 minutes so the owner can sign in within that time.
- **Server-type devices:** select **Disable Key Expiry** in the menu on the **Machines** page. The official docs remind you that this lowers security; do it only for trusted devices, and revoke the key immediately if the device is lost. Tagged devices do not expire by default.
- **The CLI also stops you:** if you are connected to this machine over Tailscale SSH and run `--force-reauth`, the source shows that a risk confirmation pops up, saying this action may disconnect the current SSH session.

([Key expiry](https://tailscale.com/docs/features/access-control/key-expiry))

### Guardrail 6: `--accept-routes` is off by default on Linux

The switch for "accepting subnet routes advertised by other devices" has a default that differs by platform:

| Platform | Default |
|---|---|
| Windows, iOS, Android, and the App Store and Standalone versions of macOS | Accept |
| Other platforms, including Linux | Do not accept |

So on Linux you have to run `sudo tailscale set --accept-routes` by hand. `--accept-dns` (accept the DNS configuration sent down by the admin console) is on by default on all platforms.

### Other points

- **Device approval.** An administrator can turn on device approval on the **Device management** page. Once it is on, a new device shows the **Needs approval** badge and cannot send or receive traffic until it is approved.
- **When you turn on HTTPS for web tools in the tailnet, the certificates go into Certificate Transparency logs.** The official docs remind you: do not put private information in device names.
- **Tailscale does not protect a device's other traffic.** Official text: it keeps traffic between devices end-to-end encrypted, "but does not protect your devices from any other traffic". Keep the firewall on as you normally would.
- **Guard against DNS rebinding when you run a plain HTTP dev server in the tailnet.** The official recommendation: such services should check that the request's `Host` header is on an allowlist.
- **When you rely on Serve's identity headers for authentication, make the backend listen on localhost only.** Otherwise anyone who can reach the service directly can forge those headers.

([Best practices to secure your tailnet](https://tailscale.com/docs/reference/best-practices/security), [Device approval](https://tailscale.com/docs/features/access-control/device-management/device-approval))

## Common pitfalls

| Symptom | Cause | Fix |
|---|---|---|
| `tailscale up` fails with `changing settings via 'tailscale up' requires mentioning all non-default flags` | `up` with flags requires repeating every non-default setting | Use `tailscale set`; or rerun the complete command given in the error; or add `--reset` once you are sure |
| Cannot reach devices behind a subnet router on Linux | Linux does not accept subnet routes by default | `sudo tailscale set --accept-routes` |
| Subnet routes are configured but other devices still cannot see them | Nobody has approved the routes, or the policy does not allow them | Tick and save them in the **Subnets** section of the **Machines** page; then check **Access controls** |
| `tailscale status` always shows `relay`, and it is slow | The network is behind hard NAT, or the network blocks UDP | Run `tailscale netcheck` and look at the `UDP` line; when it is `false`, a relay is practically the only option. If you need more, look into Peer Relay |
| SSH says `tailnet policy does not permit you to SSH to this node` | The policy does not allow it: either network access is not allowed, or no SSH rule matches | Make sure the policy has both a network access rule and an `ssh` rule; when the target is a tagged device, check `dst` |
| An old SSH window hangs after running `tailscale set --ssh` | Tailscale has taken over port 22 on the Tailscale IP | Reconnect |
| Cannot connect to Tailscale SSH on a Windows target machine | The Tailscale SSH server does not support Windows | On Windows, use the built-in ordinary SSH and give the device name as the target |
| A device suddenly goes offline after about 180 days | Key expiry | `tailscale up --force-reauth`, or ask an administrator to **Temporarily extend key** |
| The device is signed in but shows **Needs approval** and receives no traffic | Device approval is on for the tailnet | Ask an administrator to select **Approve** on the **Machines** page |
| Added `--advertise-exit-node` but it has no effect | After adding this flag with `set`, you must run `up` once more | `sudo tailscale up`, then approve it in the admin console |
| Ran `tailscale up --force-reauth` inside a remote SSH session, and the session dropped | Reauthenticating interrupts Tailscale connections | Keep a backup way to sign in, or have the administrator temporarily extend the key first |
| `host` and `nslookup` on macOS cannot resolve device names | These two tools bypass system DNS | Use `ping`, or use the full domain name directly |
| Cannot see a device | Signed in with a different identity or on a different tailnet; or the other device's key has expired | Confirm both devices are signed in with the same account; check the other device's status on the **Machines** page |
| A Serve port is suddenly open to the public internet | The last time this port was configured was with `funnel` | Run `tailscale serve <target>` to make it private again, or `tailscale funnel reset` |

## Troubleshooting

Work through them in order; each step answers one question.

1. **Is Tailscale running on this machine, and is it signed in?** Run `tailscale status`. The first line is this machine.
2. **Is the network layer reachable?** Run `tailscale ping <device-name>`. If it gets through, the devices can reach each other.
3. **Do the network conditions allow a direct connection?** Run `tailscale netcheck`. You should see something like this (the example comes from the official CLI reference and is trimmed):

   ```text
   Report:
   	* UDP: true
   	* MappingVariesByDestIP: false
   	* Nearest DERP: Seattle
   	* DERP latency:
   		- sea: 24.2ms  (Seattle)
   ```

   When `UDP` is `false`, a relay is practically the only option. `MappingVariesByDestIP` describes whether your device is behind a "difficult NAT".
4. **Is a service really listening on that port on the target device?** The official docs remind you: Tailscale only provides network connectivity between devices; services such as SSH or a web server are for you to run.
5. **Is a firewall blocking it?** By default Tailscale sends and receives direct WireGuard traffic on UDP port `41641`.
6. **Is the policy blocking it?** Check whether the **Access controls** page has a rule that forbids these two devices from connecting to each other.

For problems that are not in this sequence, see the official [Troubleshooting guide](https://tailscale.com/docs/reference/troubleshooting) and [Troubleshoot device connectivity](https://tailscale.com/docs/reference/device-connectivity).

## Next steps

1. **Add the devices you use often.** For devices that are inconvenient to sign in to again, such as servers, NAS devices and GPU machines, turn off key expiry.
2. **Before you invite other people, tighten the policy first.** Start from the official example "Users can access their own devices".
3. **Learn these when you need them:** tag devices and register them automatically with an auth key; configure HTTPS certificates for the web tools in the tailnet; set up Peer Relay for environments where a direct connection cannot be established.
4. **To know how it works inside:** read the [source-code walkthrough](./source).

## Further reading

- [What is Tailscale?](https://tailscale.com/docs/concepts/what-is-tailscale): the official definition, and how it differs from a traditional VPN.
- [How connections work: Connection types](https://tailscale.com/docs/reference/connection-types): the order in which direct, DERP and Peer Relay connections are set up, and how to tell which one is in use.
- [Control and data planes](https://tailscale.com/docs/concepts/control-data-planes): what the coordination server is and is not responsible for.
- [Tailscale encryption](https://tailscale.com/docs/concepts/tailscale-encryption): what encryption the control plane and the data plane each use.
- [Tailscale identity](https://tailscale.com/docs/concepts/tailscale-identity): how user identity, node identity and machine keys relate.
- [Tailscale SSH](https://tailscale.com/docs/features/tailscale-ssh): check mode, SSH rule syntax, session recording.
- [Tailscale Serve](https://tailscale.com/docs/features/tailscale-serve) and [Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel): how the two commands work, and their limits.
- [Subnet routers](https://tailscale.com/docs/features/subnet-routers) and [Exit nodes](https://tailscale.com/docs/features/exit-nodes): the concrete steps for each platform.
- [Tailscale CLI](https://tailscale.com/docs/reference/tailscale-cli): all subcommands and flags.
- [Best practices to secure your tailnet](https://tailscale.com/docs/reference/best-practices/security): the official security baseline checklist.

## Related pages

- [Learning map](./): the product family and the decision table for choosing a feature.
- [Source-code walkthrough](./source): how a connection is built in the code.
- [UU Remote](../uu-remote/): a remote desktop tool. It solves "seeing and operating another machine's screen"; Tailscale solves "devices being reachable over the network".
- [T3 Code](../t3code/): its repository has `packages/tailscale`.
- [Cindy](../cindy/), [Codex dot](../codex/dot): sister pages from the same batch, on the theme of remote and agent workstations; in setups like these, Tailscale is responsible for the network layer.
- [Claude](/products/claude/), [Codex](/products/codex/): agents that run on a remote workstation.
- [Ollama](/products/ollama): an example of a local model service.

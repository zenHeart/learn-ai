---
title: Tailscale learning map
description: "Tailscale is an encrypted network in which devices signed in to the same account can reach each other. This page is the product overview plus a decision table: it first answers 'what do I want to connect, and which feature should I use', then points to the tutorial and the source-code page."
domain: product
tags:
  - mesh-vpn
  - remote-access
  - tailscale
role: map
---

# Tailscale learning map

> **The short version:** Tailscale lets **devices signed in to the same account** reach each other. Data is encrypted end to end, and no public IP address or port forwarding is needed. It is a collection of features, not a single product: first work out "what you want to connect", then choose one of the rows below.
>
> Official definition ([What is Tailscale?](https://tailscale.com/docs/concepts/what-is-tailscale)): an identity-based zero-trust connectivity platform that uses the open source WireGuard protocol to build encrypted point-to-point connections and form a peer-to-peer network called a **tailnet**. This page is the **map**; for hands-on work, go to the [tutorial](./tailscale).

## Audience / prerequisites / non-goals

- **Who:** frontend or AI application developers who want to reach another device of their own (a desktop, a laptop, a NAS, a VM in the cloud) from outside, without having to study networking.
- **Prerequisites:** an account with an identity provider (one of Google, GitHub, Microsoft, Apple, Okta, OneLogin, or a custom OpenID Connect provider); two devices.
- **Non-goals:**
  - Not a tool for changing your apparent location or getting around regional blocks. A self-hosted exit node only moves the exit point to a device of your own.
  - Does not cover the cryptography of WireGuard itself.
  - Advanced topics such as Kubernetes Operator, Tailnet Lock and OAuth clients get one row each on this page, with official links only.

## Product family

The "official names" in the table below are copied from the official documentation index ([Tailscale Documentation](https://tailscale.com/docs/llms.txt)) opened on 2026-11-24. This directory has only three pages: this map, the [tutorial](./tailscale) and the [source-code walkthrough](./source).

| Official name | Official URL | Where it goes on this site |
|----------|----------|----------|
| **Install Tailscale on Windows / macOS / Linux / iOS / Android** | [Windows](https://tailscale.com/docs/install/windows) · [macOS](https://tailscale.com/docs/install/mac) · [Linux](https://tailscale.com/docs/install/linux) · [iOS](https://tailscale.com/docs/install/ios) · [Android](https://tailscale.com/docs/install/android) | Tutorial, the Install section |
| **Tailscale CLI** | [tailscale.com/docs/reference/tailscale-cli](https://tailscale.com/docs/reference/tailscale-cli) | Used throughout the tutorial; `--help` is the source of truth for flags |
| **Tailscale SSH** | [tailscale.com/docs/features/tailscale-ssh](https://tailscale.com/docs/features/tailscale-ssh) | Tutorial, "Everyday use" and "Security and privacy essentials" |
| **Tailscale Serve** | [tailscale.com/docs/features/tailscale-serve](https://tailscale.com/docs/features/tailscale-serve) | Tutorial, "Everyday use" |
| **Tailscale Funnel** | [tailscale.com/docs/features/tailscale-funnel](https://tailscale.com/docs/features/tailscale-funnel) | The tutorial covers the guardrails only; it does not teach how to turn Funnel on |
| **Subnet routers** | [tailscale.com/docs/features/subnet-routers](https://tailscale.com/docs/features/subnet-routers) | Tutorial, "Everyday use" |
| **Exit nodes (route all traffic)** | [tailscale.com/docs/features/exit-nodes](https://tailscale.com/docs/features/exit-nodes) | Tutorial, "Everyday use" and "Security and privacy essentials" |
| **Mullvad exit nodes** (paid add-on, beta) | [tailscale.com/docs/features/exit-nodes/mullvad-exit-nodes](https://tailscale.com/docs/features/exit-nodes/mullvad-exit-nodes) | One row on the map: use Mullvad's servers as the exit instead of a device of your own |
| **Tailscale Peer Relays** | [tailscale.com/docs/features/peer-relay](https://tailscale.com/docs/features/peer-relay) | One row on the map: when a direct connection fails, another device in the tailnet acts as the relay |
| **Taildrop** (alpha) | [tailscale.com/docs/features/taildrop](https://tailscale.com/docs/features/taildrop) | Tutorial, "Everyday use" |
| **MagicDNS** | [tailscale.com/docs/features/magicdns](https://tailscale.com/docs/features/magicdns) | Tutorial, "Everyday use" |
| **admin console and tailnet policy file** (formerly called ACL; the newer form is grants) | [tailnet-policy-file](https://tailscale.com/docs/features/tailnet-policy-file) · [Access control](https://tailscale.com/docs/features/access-control) | Tutorial, "Security and privacy essentials" |
| **Group devices with tags** | [tailscale.com/docs/features/tags](https://tailscale.com/docs/features/tags) | One row on the map; one row in the tutorial's glossary |
| **Key expiry** | [tailscale.com/docs/features/access-control/key-expiry](https://tailscale.com/docs/features/access-control/key-expiry) | Tutorial, "Security and privacy essentials" |
| **Device approval** | [tailscale.com/docs/features/access-control/device-management/device-approval](https://tailscale.com/docs/features/access-control/device-management/device-approval) | Tutorial, "Security and privacy essentials" |
| **Personal / Standard / Premium / Enterprise** (plans) | [tailscale.com/pricing](https://tailscale.com/pricing) | Tutorial, "Pricing, quotas and limits" |
| **Tailscale SSH session recording** | [tailscale.com/docs/features/tsrecorder](https://tailscale.com/docs/features/tsrecorder) | One row on the map: record SSH sessions and store them on a recorder node of your own |
| **tsnet** | [tailscale.com/docs/features/tsnet](https://tailscale.com/docs/features/tsnet) | One row on the map: embed Tailscale in a Go program |
| **Tailscale Kubernetes Operator** | [tailscale.com/docs/kubernetes-operator](https://tailscale.com/docs/kubernetes-operator) | One row on the map |
| **Tailnet Lock** | [tailscale.com/docs/features/tailnet-lock](https://tailscale.com/docs/features/tailnet-lock) | One row on the map: a new node can join only after a node you designate has signed it |
| **OAuth clients** | [tailscale.com/docs/features/oauth-clients](https://tailscale.com/docs/features/oauth-clients) | One row on the map: let a program keep accessing the Tailscale API |
| **Aperture by Tailscale / Tailscale PAM** | [Aperture](https://tailscale.com/docs/aperture/what-is-aperture) · [PAM](https://tailscale.com/docs/privileged-access-management/what-is-tailscale-pam) | One row on the map: two other products from the same company, not part of "connecting devices" |

### Personal vs. organization: who owns the tailnet

| Situation | Result |
|------|------|
| Sign up with a public email address (for example Gmail or a personal GitHub account) | Treated as personal use; the account goes into the free Personal plan automatically |
| Sign up with a custom domain | Treated as business use; the account goes into the 14-day Enterprise trial automatically |
| The tailnet uses a custom domain | Users with an email address under the same domain can sign in without an invitation; everyone else needs an external invitation |
| One device should belong to both a personal tailnet and a company tailnet | A device can be registered to several tailnets and you switch between them in the client; but a node belongs to only one tailnet at a time |

Sources: [Tailscale pricing](https://tailscale.com/pricing) FAQ, [Tailscale quickstart](https://tailscale.com/docs/how-to/quickstart), [Tailscale identity](https://tailscale.com/docs/concepts/tailscale-identity).

### Names that collide

- **Tailscale is not a traditional VPN.** The official comparison: in a traditional VPN all traffic passes through a central gateway, which may be far from the user, adds latency and becomes a bottleneck; Tailscale lets devices connect to each other directly. You can still use it as a traditional VPN through an exit node.
- **Tailscale is not WireGuard itself.** WireGuard is the protocol. Official statement: Tailscale is built on WireGuard and adds NAT traversal, TCP transport and access policy.
- **Tailscale SSH is not ordinary SSH.** It takes over port 22 on the target machine's Tailscale IP and authenticates with the Tailscale identity instead of a key pair.
- **Serve is not Funnel.** Serve makes a service visible only inside the tailnet; Funnel makes it visible to the whole internet.
- **An exit node is not a subnet router.** The first forwards all of your internet traffic; the second lets you reach a private subnet and leaves your internet traffic alone.
- **Taildrop is not Taildrive.** The first sends files between your own devices; the second shares folders inside the tailnet (they get one row each on this page, [Taildrive](https://tailscale.com/docs/features/taildrive)).
- **Tailscale is not Aperture, and it is not Tailscale PAM.** Those two are the same company's AI gateway product and privileged access management product.

## What problem it solves

### Without Tailscale vs. with Tailscale

| What I want to do | The traditional way | With Tailscale |
|------------|----------|--------------|
| Reach another device at home or at the office from outside | A public IP address plus port forwarding on the router, or a self-hosted VPN server | Sign in to the same account and connect directly by device name or `100.x.y.z` address |
| SSH into my own machine | Generate a key pair, then distribute the public key to the target machine | Tailscale SSH authorizes by tailnet policy, so no public key has to be distributed |
| Show the dev server on this machine to someone else | Deploy to the public internet, or set up a tunnel into the private network | `tailscale serve`, open to the tailnet only |
| Reach a device at home that has no client installed | Set up port forwarding separately for each device | One subnet router forwards the traffic on their behalf |
| Encrypt communication between two devices | Configure WireGuard yourself and generate and distribute keys by hand | Keys are generated and distributed automatically after sign-in |

The "traditional way" column comes from the official page's comparison: connections need no port forwarding or complicated firewall rules, and when WireGuard is used without Tailscale the user has to generate and distribute keys by hand.

### Compared with the alternatives

Only facts that can be backed by an official page are listed.

| Option | Traffic path | Keys and identity | Basis |
|------|----------|------------|------|
| Traditional VPN (central gateway) | All of it goes through the gateway | Configured by the administrator | The gateway may be far from the user, so latency is higher; funneling everything through one point makes it a bottleneck |
| WireGuard configured by hand | Between the endpoints | Keys generated and distributed by hand | The official docs list it as work Tailscale automates for the user |
| Tailscale | Direct when possible, DERP relay when not | Sign in with an identity provider; keys distributed automatically | All three connection types are end-to-end encrypted |
| Self-hosted coordination server (such as Headscale) | Same as the Tailscale client | Same as Tailscale | The official docs have a page on switching clients to a self-hosted control server |
| Screen-streaming remote desktop | Not applicable | Not applicable | Solves a different problem: seeing and operating another machine's screen, see [UU Remote](../uu-remote/) |

Sources: [What is Tailscale?](https://tailscale.com/docs/concepts/what-is-tailscale), [About WireGuard](https://tailscale.com/docs/concepts/wireguard), [Tailscale identity](https://tailscale.com/docs/concepts/tailscale-identity), [Connection types](https://tailscale.com/docs/reference/connection-types), [custom control server](https://tailscale.com/docs/how-to/set-up-custom-coordination-server).

## Quick decision: which feature fits my situation

| My situation | What to use |
|----------|--------|
| SSH back to my own Linux machine from outside | Tailscale SSH |
| The target is Windows, or the Mac App Store version on macOS | Install Tailscale, then use the built-in ordinary SSH or remote desktop and give the device name as the target |
| Show the dev server on this machine to people in the tailnet | Tailscale Serve |
| Open a service to the public internet | Tailscale Funnel; read the guardrails in the tutorial first |
| Reach a device at home that has no client installed (a printer, a NAS admin page) | Subnet router |
| Send traffic out through my home network while on public Wi-Fi | Exit node |
| Transfer files between my own devices | Taildrop |
| Add someone else to the tailnet | Tighten the tailnet policy file first |
| Keep a server or GPU machine online long term | Disable key expiry; the advanced approach is to tag the device |
| Stuck on a relay and too slow | Run `tailscale netcheck` first to see why, then consider Tailscale Peer Relays |
| Embed Tailscale in my own Go program | tsnet |
| Use it in a Kubernetes cluster | Tailscale Kubernetes Operator |

## How to read this directory

| Page | What you can do after reading it | When to read it |
|------|--------------|------------|
| [Tutorial](./tailscale) | Install two devices and confirm they can reach each other; sign in with Tailscale SSH; get Serve, subnet routing, exit node and Taildrop working; know the six guardrails | Now. No prerequisites |
| [Source-code walkthrough](./source) | Explain how a connection is built in the code; understand how the CLI and the daemon communicate and how permissions are decided; know why `tailscale up` makes you repeat flags | After you are comfortable with the product, or when you need to investigate its internal behavior |
| This page | Pick a feature; look up the official entry point | Any time, for reference |

Recommended order: **tutorial first, source code second.** Do not skip the tutorial's security and privacy section, especially if you do not plan to be the only user.

## Official resources

- [What is Tailscale?](https://tailscale.com/docs/concepts/what-is-tailscale): what it is, and whose problems it solves.
- [Connection types](https://tailscale.com/docs/reference/connection-types): the order in which direct, DERP and Peer Relay connections are set up, and how to tell which one is in use.
- [Control and data planes](https://tailscale.com/docs/concepts/control-data-planes): what the coordination server is and is not responsible for.
- [Can Tailscale decrypt my traffic?](https://tailscale.com/docs/concepts/can-tailscale-decrypt-traffic): a short Q&A page on traffic privacy.
- [Tailscale SSH](https://tailscale.com/docs/features/tailscale-ssh): how it works, rule syntax, limits.
- [Tailscale Serve](https://tailscale.com/docs/features/tailscale-serve) and [Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel): how each works, and its limits.
- [Subnet routers](https://tailscale.com/docs/features/subnet-routers) and [Exit nodes](https://tailscale.com/docs/features/exit-nodes): setup steps for each platform.
- [Tailnet policy file](https://tailscale.com/docs/features/tailnet-policy-file): which sections the policy file has and what each one governs.
- [Tailscale CLI](https://tailscale.com/docs/reference/tailscale-cli): all subcommands and flags.
- [Tailscale pricing](https://tailscale.com/pricing): plans, add-ons and the billing FAQ.
- [Best practices to secure your tailnet](https://tailscale.com/docs/reference/best-practices/security): the official security baseline and advanced checklist.
- [Tailscale Documentation](https://tailscale.com/docs/llms.txt): the index of the whole official documentation; the source of the family table on this page.

## Related pages

- [Tutorial](./tailscale): the hands-on tutorial in this directory.
- [Source-code walkthrough](./source): the source-level walkthrough in this directory.
- [UU Remote](../uu-remote/): a remote desktop tool. Compare the two approaches: "NAT traversal at the network layer so devices can reach each other" and "streaming the screen".
- [T3 Code](../t3code/): its repository has `packages/tailscale`.
- [Cindy](../cindy/), [Codex dot](../codex/dot): sister pages from the same batch, on the theme of remote and agent workstations.
- [Claude](/products/claude/), [Codex](/products/codex/): agents that can run on a remote workstation.
- [Ollama](/products/ollama): an example of a local model service you may want to reach from outside.

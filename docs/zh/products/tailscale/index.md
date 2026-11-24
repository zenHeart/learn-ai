---
title: Tailscale 学习地图
description: Tailscale 是一张「登录同一账号的设备互相连通」的加密网络。这一页是产品全景加决策表：先回答「我要连什么、该用哪个功能」，再进教程和源码页。
domain: product
tags:
  - mesh-vpn
  - remote-access
  - tailscale
role: map
pageClass: readable-tables
---

# Tailscale 学习地图

> **一句话结论：** Tailscale 让**登录了同一个账号的设备**互相连通，数据端到端加密，不需要公网 IP 和端口转发。它是一组功能的集合，不是一个单一产品：先弄清「我要连什么」，再选下面的哪一项。
>
> 官方定义（[What is Tailscale?](https://tailscale.com/docs/concepts/what-is-tailscale)）：一个基于身份的零信任连接平台，用开源的 WireGuard 协议建立加密的点对点连接，组成一张叫 **tailnet** 的对等网络。本页是**地图**，动手请进[教程](./tailscale)。

## 写给谁 / 先决条件 / 非目标

- **写给谁：** 想从外面访问自己的另一台设备（台式机、笔记本、NAS、云上的虚拟机），又不想研究组网的前端或 AI 应用开发者。
- **先决条件：** 一个身份提供商的账号（Google、GitHub、Microsoft、Apple、Okta、OneLogin 之一，或自定义 OpenID Connect）；两台设备。
- **非目标：**
  - 不把它当翻墙或更换地区的工具。自建 exit node 只是把出口换成你自己的设备。
  - 不讲 WireGuard 本身的密码学。
  - Kubernetes Operator、Tailnet Lock、OAuth clients 等进阶主题在本页各占一行，只给官方链接。

## 产品家族

下表的「官方名称」抄自 2026-11-24 打开的官方文档索引（[Tailscale Documentation](https://tailscale.com/docs/llms.txt)）。本目录只有三页：本地图、[教程](./tailscale)、[源码解读](./source)。

| 官方名称 | 官方 URL | 本站去向 |
|----------|----------|----------|
| **Install Tailscale on Windows / macOS / Linux / iOS / Android** | [Windows](https://tailscale.com/docs/install/windows) · [macOS](https://tailscale.com/docs/install/mac) · [Linux](https://tailscale.com/docs/install/linux) · [iOS](https://tailscale.com/docs/install/ios) · [Android](https://tailscale.com/docs/install/android) | 教程「安装」一节 |
| **Tailscale CLI** | [tailscale.com/docs/reference/tailscale-cli](https://tailscale.com/docs/reference/tailscale-cli) | 教程贯穿使用，参数以 `--help` 为准 |
| **Tailscale SSH** | [tailscale.com/docs/features/tailscale-ssh](https://tailscale.com/docs/features/tailscale-ssh) | 教程「日常用法」与「安全与隐私要点」 |
| **Tailscale Serve** | [tailscale.com/docs/features/tailscale-serve](https://tailscale.com/docs/features/tailscale-serve) | 教程「日常用法」 |
| **Tailscale Funnel** | [tailscale.com/docs/features/tailscale-funnel](https://tailscale.com/docs/features/tailscale-funnel) | 教程只讲安全护栏，不教怎么开 |
| **Subnet routers** | [tailscale.com/docs/features/subnet-routers](https://tailscale.com/docs/features/subnet-routers) | 教程「日常用法」 |
| **Exit nodes (route all traffic)** | [tailscale.com/docs/features/exit-nodes](https://tailscale.com/docs/features/exit-nodes) | 教程「日常用法」与「安全与隐私要点」 |
| **Mullvad exit nodes**（付费附加项，beta） | [tailscale.com/docs/features/exit-nodes/mullvad-exit-nodes](https://tailscale.com/docs/features/exit-nodes/mullvad-exit-nodes) | 地图一行：用 Mullvad 的服务器而不是你自己的设备当出口 |
| **Tailscale Peer Relays** | [tailscale.com/docs/features/peer-relay](https://tailscale.com/docs/features/peer-relay) | 地图一行：直连不通时，让 tailnet 里另一台设备当中转 |
| **Taildrop**（alpha） | [tailscale.com/docs/features/taildrop](https://tailscale.com/docs/features/taildrop) | 教程「日常用法」 |
| **MagicDNS** | [tailscale.com/docs/features/magicdns](https://tailscale.com/docs/features/magicdns) | 教程「日常用法」 |
| **admin console 与 tailnet policy file**（旧称 ACL，新写法是 grants） | [tailnet-policy-file](https://tailscale.com/docs/features/tailnet-policy-file) · [Access control](https://tailscale.com/docs/features/access-control) | 教程「安全与隐私要点」 |
| **Group devices with tags** | [tailscale.com/docs/features/tags](https://tailscale.com/docs/features/tags) | 地图一行；教程术语表有一行 |
| **Key expiry** | [tailscale.com/docs/features/access-control/key-expiry](https://tailscale.com/docs/features/access-control/key-expiry) | 教程「安全与隐私要点」 |
| **Device approval** | [tailscale.com/docs/features/access-control/device-management/device-approval](https://tailscale.com/docs/features/access-control/device-management/device-approval) | 教程「安全与隐私要点」 |
| **Personal / Standard / Premium / Enterprise**（套餐） | [tailscale.com/pricing](https://tailscale.com/pricing) | 教程「计费、额度与限制」 |
| **Tailscale SSH session recording** | [tailscale.com/docs/features/tsrecorder](https://tailscale.com/docs/features/tsrecorder) | 地图一行：把 SSH 会话录下来存到自己的录制节点 |
| **tsnet** | [tailscale.com/docs/features/tsnet](https://tailscale.com/docs/features/tsnet) | 地图一行：把 Tailscale 嵌进 Go 程序 |
| **Tailscale Kubernetes Operator** | [tailscale.com/docs/kubernetes-operator](https://tailscale.com/docs/kubernetes-operator) | 地图一行 |
| **Tailnet Lock** | [tailscale.com/docs/features/tailnet-lock](https://tailscale.com/docs/features/tailnet-lock) | 地图一行：新节点要经你指定的节点签名才能加入 |
| **OAuth clients** | [tailscale.com/docs/features/oauth-clients](https://tailscale.com/docs/features/oauth-clients) | 地图一行：让程序持续访问 Tailscale API |
| **Aperture by Tailscale / Tailscale PAM** | [Aperture](https://tailscale.com/docs/aperture/what-is-aperture) · [PAM](https://tailscale.com/docs/privileged-access-management/what-is-tailscale-pam) | 地图一行：同厂的另外两个产品，不属于「把设备连起来」这件事 |

### 个人版与组织版：tailnet 归谁

| 情况 | 结果 |
|------|------|
| 用公共邮箱注册（比如 Gmail、个人 GitHub 账号） | 视为个人使用，自动进入免费的 Personal 套餐 |
| 用自定义域名注册 | 视为商业使用，自动进入 14 天的 Enterprise 试用 |
| tailnet 用的是自定义域名 | 同域名下邮箱的用户不用邀请就能登录；其他人要发外部邀请 |
| 一台设备想同时属于个人 tailnet 和公司 tailnet | 可以注册到多个 tailnet，用客户端切换；但一个节点同一时间只属于一个 tailnet |

来源：[Tailscale pricing](https://tailscale.com/pricing) 的 FAQ、[Tailscale quickstart](https://tailscale.com/docs/how-to/quickstart)、[Tailscale identity](https://tailscale.com/docs/concepts/tailscale-identity)。

### 容易撞名

- **Tailscale 不是传统 VPN。** 官方的对比：传统 VPN 的流量都经过一个中心网关，网关可能离用户很远，延迟高，还会成为瓶颈；Tailscale 让设备直接互连。但你也可以借 exit node 把它当传统 VPN 用。
- **Tailscale 不是 WireGuard 本身。** WireGuard 是协议。官方说明：Tailscale 建在 WireGuard 之上，另外加了 NAT 穿透、TCP 传输能力和访问策略。
- **Tailscale SSH 不是普通 SSH。** 它接管目标机 Tailscale IP 上的 22 端口，用 Tailscale 身份而不是密钥对来认证。
- **Serve 不是 Funnel。** Serve 只给 tailnet 内看；Funnel 给整个互联网看。
- **exit node 不是 subnet router。** 前者转发你的全部上网流量；后者让你访问某个私有网段，不影响上网流量。
- **Taildrop 不是 Taildrive。** 前者是在自己的设备之间发送文件；后者是在 tailnet 内共享文件夹（本页各占一行，[Taildrive](https://tailscale.com/docs/features/taildrive)）。
- **Tailscale 不是 Aperture，也不是 Tailscale PAM。** 后两者是同厂的 AI 网关产品和特权访问管理产品。

## 它解决什么问题

### 没有 Tailscale 与有 Tailscale

| 我要做的事 | 传统做法 | 用 Tailscale |
|------------|----------|--------------|
| 在外面访问家里或公司的另一台设备 | 公网 IP 加路由器端口转发，或者自建 VPN 服务器 | 登录同一个账号，用设备名或 `100.x.y.z` 地址直接连 |
| SSH 到自己的机器 | 生成密钥对，再把公钥分发到目标机 | Tailscale SSH 按 tailnet 策略授权，不用分发公钥 |
| 把本机的开发服务器给别人看 | 部署到公网，或做内网穿透 | `tailscale serve`，只对 tailnet 开放 |
| 访问家里没装客户端的设备 | 每台设备单独做端口转发 | 一台子网路由器代为转发 |
| 两台设备之间加密通信 | 自己配置 WireGuard，手动生成并分发密钥 | 登录后自动生成和分发密钥 |

表中「传统做法」的描述来自官方页面对比：连接「不需要端口转发或复杂的防火墙规则」；不借助 Tailscale 使用 WireGuard 时，用户要手动生成并分发密钥。

### 与替代方案对比

只写能在官方页面找到依据的事实。

| 方案 | 流量路径 | 密钥与身份 | 依据 |
|------|----------|------------|------|
| 传统 VPN（中心网关） | 全部经过网关 | 由管理员配置 | 网关可能离用户很远，延迟更高；集中之后成为瓶颈 |
| 自己配置 WireGuard | 端点之间 | 手动生成并分发密钥 | 官方把它列为 Tailscale 要替用户自动化的工作 |
| Tailscale | 尽量直连，不通时走 DERP 中继 | 身份提供商登录，密钥自动分发 | 三种连接方式都端到端加密 |
| 自建协调服务器（如 Headscale） | 同 Tailscale 客户端 | 同 Tailscale | 官方有一页讲怎么让客户端改用自建的控制服务器 |
| 画面串流类远程桌面 | 不适用 | 不适用 | 解决的是另一个问题：看到并操作另一台机器的画面，见 [UU Remote](../uu-remote/) |

来源：[What is Tailscale?](https://tailscale.com/docs/concepts/what-is-tailscale)、[About WireGuard](https://tailscale.com/docs/concepts/wireguard)、[Tailscale identity](https://tailscale.com/docs/concepts/tailscale-identity)、[Connection types](https://tailscale.com/docs/reference/connection-types)、[custom control server](https://tailscale.com/docs/how-to/set-up-custom-coordination-server)。

## 快速决策：我的情况该用什么

| 我的情况 | 用什么 |
|----------|--------|
| 在外面 SSH 回自己的 Linux 机器 | Tailscale SSH |
| 目标机是 Windows 或 macOS 的 App Store 版 | 装好 Tailscale 后用系统自带的普通 SSH 或远程桌面，目标写设备名 |
| 把本机的开发服务器给 tailnet 里的人看 | Tailscale Serve |
| 把一个服务开放给公网 | Tailscale Funnel，先读教程里的安全护栏 |
| 访问家里没装客户端的设备（打印机、NAS 的管理页） | Subnet router |
| 在公共 Wi-Fi 下让流量从家里出去 | Exit node |
| 在自己的设备之间传文件 | Taildrop |
| tailnet 里要加别人 | 先收紧 tailnet policy file |
| 服务器或 GPU 机器要长期在线 | Disable key expiry；进阶做法是给设备贴 tag |
| 一直走中继，嫌慢 | 先跑 `tailscale netcheck` 看原因，再考虑 Tailscale Peer Relays |
| 想把 Tailscale 嵌进自己的 Go 程序 | tsnet |
| 在 Kubernetes 集群里用 | Tailscale Kubernetes Operator |

## 本目录怎么读

| 页面 | 读完能做什么 | 什么时候读 |
|------|--------------|------------|
| [教程](./tailscale) | 装好两台设备并确认互通；用 Tailscale SSH 登录；跑通 Serve、子网路由、exit node、Taildrop；知道六条安全护栏 | 现在。零前置 |
| [源码解读](./source) | 说清一条连接在代码里怎么建立；看懂 CLI 和守护进程怎么通信以及权限怎么判；知道 `tailscale up` 为什么要求重复参数 | 用熟之后，或者你要排查它内部行为的时候 |
| 本页 | 选功能、查官方入口 | 随时回查 |

建议顺序：**先教程，后源码。** 教程里的「安全与隐私要点」不要跳过，尤其是不打算只自己一个人用的时候。

## 官方资源

- [What is Tailscale?](https://tailscale.com/docs/concepts/what-is-tailscale)：它是什么、解决谁的什么问题。
- [Connection types](https://tailscale.com/docs/reference/connection-types)：直连、DERP、Peer Relay 的建立顺序，以及怎么判断当前是哪一种。
- [Control and data planes](https://tailscale.com/docs/concepts/control-data-planes)：协调服务器负责什么、不负责什么。
- [Can Tailscale decrypt my traffic?](https://tailscale.com/docs/concepts/can-tailscale-decrypt-traffic)：关于流量隐私的一页短问答。
- [Tailscale SSH](https://tailscale.com/docs/features/tailscale-ssh)：工作方式、规则语法、限制。
- [Tailscale Serve](https://tailscale.com/docs/features/tailscale-serve) 与 [Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel)：各自的工作方式和限制。
- [Subnet routers](https://tailscale.com/docs/features/subnet-routers) 与 [Exit nodes](https://tailscale.com/docs/features/exit-nodes)：各平台的配置步骤。
- [Tailnet policy file](https://tailscale.com/docs/features/tailnet-policy-file)：策略文件有哪些段，各管什么。
- [Tailscale CLI](https://tailscale.com/docs/reference/tailscale-cli)：全部子命令和参数。
- [Tailscale pricing](https://tailscale.com/pricing)：套餐、附加项和计费 FAQ。
- [Best practices to secure your tailnet](https://tailscale.com/docs/reference/best-practices/security)：官方的安全基线与进阶清单。
- [Tailscale Documentation](https://tailscale.com/docs/llms.txt)：官方文档全站的索引，本页家族表的来源。

## 相关页面

- [教程](./tailscale)：本目录的上手教程。
- [源码解读](./source)：本目录的源码级解读。
- [UU Remote](../uu-remote/)：远程桌面类工具。对比「网络层打洞让设备互通」与「画面串流」两种思路。
- [T3 Code](../t3code/)：它的仓库里有 `packages/tailscale`。
- [Cindy](../cindy/)、[Codex dot](../codex/dot)：同批的姊妹页，属于远程与智能体工作位主题。
- [Claude](/zh/products/claude/)、[Codex](/zh/products/codex/)：可以放在远程工位上运行的 agent。
- [Ollama](/zh/products/ollama)：想从外面访问的本地模型服务的一个例子。

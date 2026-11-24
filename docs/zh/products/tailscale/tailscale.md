---
title: Tailscale 上手教程
description: Tailscale 让登录同一账号的设备像在同一个局域网里一样互相访问，流量端到端加密，不需要公网 IP 和端口转发。本页带你把两台设备连起来、确认互通、用 Tailscale SSH 连进去，再跑通日常开发的六个场景。
domain: product
tags:
  - mesh-vpn
  - remote-access
  - wireguard
  - tailscale
role: tutorial
---

# Tailscale 上手：把两台设备连起来，再 SSH 进去

> **一句话结论：** Tailscale 让**登录了同一个账号的设备**像在同一个局域网里一样互相访问，数据在设备之间**端到端加密**。你不用自己搭 VPN 服务器，也不用做端口转发（在路由器上手工写规则，把某个端口开放给内网的某台设备）。
>
> 官方原文（[What is Tailscale?](https://tailscale.com/docs/concepts/what-is-tailscale)）：它用开源的 **WireGuard** 协议建立加密的点对点连接，组成一张叫 **tailnet** 的对等网络；设备之间的连接「不需要端口转发或复杂的防火墙规则」。WireGuard 是一个开源的加密隧道协议，可以理解成「把两台设备之间的数据包加密后再发出去」的那一层。
>
> 本页是**教程**：先在 10 分钟内跑通「两台设备互通 + SSH 进去」，再讲原理和进阶。产品全景与选型看[学习地图](./)，源码怎么实现看[源码解读](./source)。

## 学完你能做什么

- 在两台设备上装好 Tailscale，用**同一个身份**登录，并在管理后台确认它们在同一个 tailnet 里。
- 读懂 `tailscale status`：谁在线，连的是直连（`direct`）还是中继（`relay`）。
- 用 `tailscale ssh` 从一台设备登录自己的另一台 Linux 设备，全程不生成、不分发 SSH 密钥。
- 用 `tailscale serve` 把本机的开发服务器只开放给自己的其他设备。
- 配好一台子网路由器和一台 exit node，分别用来「访问家里整个网段」和「在公共 Wi-Fi 下借道家里的网络」。
- 说清三处最容易出事的地方：Funnel、exit node、`tailscale up` 的参数规则。

## 先决条件与环境要求

### 写给谁

会写前端代码、用过命令行，但**没做过组网**的人。文中出现的网络术语，第一次出现时都会用大白话解释一遍，再给准确含义。

### 你需要准备

| 需要 | 说明 |
|---|---|
| 一个身份账号 | 用身份提供商的账号登录。原生支持 Apple、Google（含 Gmail）、GitHub、Microsoft、Okta、OneLogin，也支持自定义 OpenID Connect 提供商 |
| 两台设备 | 第一件事要求其中**被登录的那台是 Linux**：Tailscale SSH 的服务端只支持 Linux 和 macOS 开源版 |
| 命令行 | Windows、macOS、Linux 都有 CLI；官方说明 iOS 和 Android 没有 CLI |
| 浏览器 | 登录会跳到身份提供商的网页 |

| 平台 | 官方列出的最低要求 |
|---|---|
| Windows | Windows 10 或更高，或 Windows Server 2016 或更高 |
| macOS | macOS Ventura 13.0 或更高 |
| iOS | iOS 16.0 或更高 |
| Android | Android 8.0 或更高 |
| Linux | 带 `apt`、`yum` 或 `zypper` 的发行版可用官方安装脚本 |

> **本页的命令从哪来：** `--help` 输出来自我在 Windows 上执行的一个 `1.104.7` 客户端。不同版本的参数可能有出入，以你自己机器上的 `tailscale <子命令> --help` 为准。

### 非目标

- **不是翻墙或更换地区的工具。** 自建 exit node 只是把出口换成**你自己的**设备，出口位置就是那台设备所在的位置。官方另有付费的 Mullvad exit node 附加项（beta），本文不涉及。
- 不讲 WireGuard 本身的密码学。
- 不教 Kubernetes Operator、Tailnet Lock、OAuth clients 这类进阶主题，它们在[学习地图](./)里各占一行。
- 不教自建协调服务器（例如 Headscale），见官方的 [Configure Tailscale clients to use a custom control server](https://tailscale.com/docs/how-to/set-up-custom-coordination-server)。

## 核心概念

### 术语表

先解释三个背景词，再解释 Tailscale 的术语。

| 术语 | 一句话解释 | 为什么需要 |
|---|---|---|
| **公网 IP** | 互联网上别的机器能直接访问到的地址 | 家用宽带通常不会给每台设备分配一个 |
| **NAT（网络地址转换）** | 路由器让多台设备共用一个公网 IP 上网；副作用是外面的设备找不到你 | 家里和公司的网络都是这样 |
| **端口转发** | 在路由器上手工写规则，把某个端口开放给内网的某台设备 | 每换一台设备、换一个网络都要重做 |

| 术语 | 一句话解释 | 为什么需要 |
|---|---|---|
| **tailnet** | 你的私有网络：一组用户、设备和资源，公网进不来 | 划出「谁和谁是一家人」的边界 |
| **node（节点）** | tailnet 里的一台设备，比如手机、电脑、虚拟机 | 每台设备一个身份、一个固定地址 |
| **identity provider（身份提供商，IdP）** | 你用来登录的那个账号，比如 Google、GitHub、Microsoft | Tailscale 自己不存密码，登录交给它 |
| **coordination server（协调服务器，也叫 control plane，控制面）** | Tailscale 运行的「通讯录」：记下每台设备的公钥和地址，再分发给有权限的设备 | 两台设备互不认识，需要有人牵线 |
| **direct connection（直连）** | 两台设备之间直接用 UDP 收发包 | 延迟最低、吞吐最高 |
| **DERP relay（DERP 中继）** | Tailscale 运行的中转服务器，直连不通时替你转发加密包 | 保证在很严格的网络里也能连上 |
| **NAT traversal（NAT 穿透，俗称打洞）** | 让路由器后面的两台设备找到彼此、直接通信的办法 | 不打洞就只能走中继 |
| **STUN** | 一个小协议，让设备查出自己在公网上的地址和端口 | 打洞之前得先知道「我在外面长什么样」 |
| **100.x.y.z 地址** | 每台设备一个、换网络也不变的私有 IP | 不用记会变的公网地址 |
| **MagicDNS** | 用设备名代替 IP | 数字地址难记 |
| **ACL / grants（访问策略）** | 一份 JSON 文件，写明谁能连谁、哪些端口 | 默认全网互通，人多了必须收紧 |
| **tag（标签）** | 给「不属于某个人」的设备贴的身份，比如服务器、容器 | 员工离职，不应该把服务器一起带走 |
| **subnet router（子网路由器）** | 一台装了 Tailscale 的设备，替身后没装 Tailscale 的设备转发流量 | 打印机、老 NAS 装不了客户端 |
| **exit node（出口节点）** | 一台替你转发**全部上网流量**的设备 | 在不可信 Wi-Fi 下，让流量从家里或公司的网络出去 |
| **Key expiry（密钥过期）** | 设备的密钥默认 180 天过期，过期后要重新登录 | 设备丢了，过一阵它就自动失效 |
| **device approval（设备审批）** | 新设备登录后，要管理员点批准才能进 tailnet | 防止别人用你所在域名下的账号随意加设备 |
| **Taildrop** | 在你自己的设备之间传文件 | 敏感或大文件不想经过第三方网盘 |

### 每个概念再展开一点

**tailnet 是第一次登录时自动建出来的。** 官方原文：你在任何一台设备上第一次登录 Tailscale，Tailscale 就创建一个 tailnet；之后每认证一台设备，这台设备就加进来。设备可以用用户账号认证，也可以用 tag 认证。tailnet 是你的私有空间，公网访问不到。（[What is a tailnet?](https://tailscale.com/docs/concepts/tailnet)）

**Tailscale 自己不是身份提供商。** 官方说明：它不支持用邮箱密码注册，没有「Tailscale 密码」，用户认证交给身份提供商。（[Supported SSO identity providers](https://tailscale.com/docs/integrations/identity)）

**协调服务器只发「通讯录」，不碰你的数据。** 它负责设备发现、密钥分发和策略下发。官方在解释「协调服务器宕机会怎样」时写明了原因：「Tailscale 不通过协调服务器路由任何流量，设备密钥存在本地，网络策略缓存在本地」。它只把公钥发给策略允许看到的设备，所以没有授权的两台设备互相「看不见」。（[Control and data planes](https://tailscale.com/docs/concepts/control-data-planes)）

**端到端加密是什么意思。** 数据在出发的那台设备上就被加密，只在目的地那台设备上解密，中间的任何服务器拿到的都是密文。官方原文：「运行 Tailscale 的设备只交换公钥。私钥永远不会离开设备。所有流量都是端到端加密的，永远是。」（[Can Tailscale decrypt my traffic?](https://tailscale.com/docs/concepts/can-tailscale-decrypt-traffic)）

**三种连接方式，安全上等价，差别在性能。** 直连、DERP 中继、Peer Relay（tailnet 里另一台设备当中转）都是端到端加密。直连延迟最低；直连不通才用中继。（[Connection types](https://tailscale.com/docs/reference/connection-types)）

**Tailscale IP 地址为什么是 100.x。** 它取自 `100.64.0.0/10`（`100.64.0.0` 到 `100.127.255.255`）这个地址段，不会和家里常用的 `192.168.x.x`、`10.x.x.x` 冲突。设备从 Wi-Fi 切到手机流量，这个地址也不变。（[What are these 100.x.y.z addresses?](https://tailscale.com/docs/concepts/tailscale-ip-addresses)）

**默认只连设备，不改你的上网路线。** 官方说法：默认情况下 Tailscale 是一张 **overlay network（覆盖网络，即叠在现有网络之上的虚拟网络）**，它只路由装了 Tailscale 的设备之间的流量，不碰你访问普通网站的流量。想让上网流量也走 Tailscale，要显式设置 exit node。（[Exit nodes](https://tailscale.com/docs/features/exit-nodes)）

**访问策略默认是「全通」。** 新 tailnet 自带一份 allow all 策略：所有设备可以互访，每个用户可以用 Tailscale SSH 登录**自己的**设备。怎么收紧见下文[安全与隐私要点](./tailscale)。

## 它是怎么工作的

看图之前，先带着这个问题：**两台互不认识的设备，怎么先通过协调服务器拿到彼此的信息，再尝试直连，失败时回落到中继？为什么它们都看不到明文？**

<DocDiagram src="/diagrams/tailscale-connection.svg" alt="这张时序图有五条竖向泳道，从左到右是：设备 A、设备 B、身份提供商、协调服务器（控制面）、DERP 中继服务器（同时充当 STUN 服务器）。编号即顺序。第一步，设备 A 和设备 B 各自向身份提供商登录；Tailscale 自己不做用户认证。第二步，两台设备分别向协调服务器上报 MapRequest，内容是自己的节点公钥、地址和候选端点。第三步，协调服务器向设备 A 和设备 B 下发网络地图 netmap，里面有对方是否存在、对方的节点公钥、Tailscale 地址、候选端点和对方的 home DERP 区域；它只下发策略允许看到的节点。第四步，设备 A 连到设备 B 所在的 DERP 服务器，DERP 把连接请求转给设备 B，随后双方经 DERP 交换直连所需的端点信息；经 DERP 的路径画成琥珀色虚线。第五步，双方先用 STUN 查出自己的公网地址，再逐个尝试候选端点做 NAT 穿透；成功就建立直连的 WireGuard UDP 隧道，画成翠绿色粗线，之后数据不再经过第三方。第六步，如果打不通，先尝试 tailnet 内的 Peer Relay，画成青色虚线；Peer Relay 需要显式设置，不是默认就有；没有可用的 Peer Relay，才继续用 DERP 中继，转发的是已加密的 WireGuard 包，画成琥珀色虚线。第七步，设备上的 Tailscale 周期性重试，看能否升级成直连或 Peer Relay。第八步是两条保护标注：协调服务器只分发公钥与策略，不在数据路径上，看不到明文；DERP 只转发已加密的 WireGuard 包，无法解密。直连与回落的区别：直连时数据只在两台设备之间走，不经过第三方；回落时数据经 Peer Relay 或 DERP 中继转发，其中经 DERP 转发的仍是已加密的 WireGuard 包。橙色实线是控制与协商消息。本图省略了：Peer Relay 没有画成单独的一列；WireGuard 握手与密钥协商的内部步骤；NAT 类型与打洞的具体算法；周期性重试的时间间隔；DERP 区域的数量与位置；协调服务器下发策略的具体内容。" :width="1020" />

> **图的依据：** 步骤顺序，以及直连、Peer Relay、DERP 中继三种连接类型，来自官方文档的[连接类型](https://tailscale.com/docs/reference/connection-types)、[控制面与数据面](https://tailscale.com/docs/concepts/control-data-planes)、[加密](https://tailscale.com/docs/concepts/tailscale-encryption)与 [STUN 协议](https://tailscale.com/docs/reference/stun-protocol)四篇（截至 2026-11-24）；「逐个尝试候选端点」对照源码 [`magicsock/endpoint.go` L626–L652](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/wgengine/magicsock/endpoint.go#L626-L652)（提交 `da6276d7`）。图中保留了五个对象、八步的先后，以及控制与协商消息、直连隧道、回落路径三种线型的区别；省略了 DERP 区域数量与城市清单、Peer Relay 的内部结构，以及协调服务器与 DERP 内部的工作细节。协调服务器只分发公钥与策略，不在数据路径上；DERP 只转发已加密的 WireGuard 包，无法解密。Peer Relay 需要显式设置，不是默认就有。

图里有三层关系要记住。

**第一层：登录和牵线都走「上面」，数据走「下面」。** 官方把 Tailscale 分成控制面和数据面：控制面就是协调服务器，数据面跑在每台设备上，用 WireGuard 加密解密。协调服务器挂了，已经建立的连接还能继续用，但加不了新设备、换不了密钥、更新不了策略。（[What happens if the coordination server is down?](https://tailscale.com/docs/reference/coordination-server-down)）

**第二层：所有连接一开始都走 DERP，再往上升级。** 官方原文：所有连接一开始都经 DERP 中继，Tailscale 再尝试升级成直连；失败就试 Peer Relay；再失败就留在 DERP。DERP 同时充当 STUN 服务器：客户端向各 DERP 服务器发 STUN 请求，对方记下请求来自哪个公网 IP 和端口，Tailscale 用这个信息判断怎么打洞。

**第三层：中继也解不开你的流量。** 官方原文：「DERP 服务器永远不会接触你未加密的数据；它们只处理已经加密的 WireGuard 包」「一个 DERP 服务器只是盲目地转发已加密的流量」。原因是私钥从不离开设备。（[Tailscale encryption](https://tailscale.com/docs/concepts/tailscale-encryption)、[DERP servers](https://tailscale.com/docs/reference/derp-servers)）

| 连接方式 | 路径 | 什么时候用 | 性能 |
|---|---|---|---|
| 直连 `direct` | 设备之间直接发 UDP 包 | 大多数网络环境 | 延迟最低、吞吐最高 |
| Peer Relay `peer-relay` | 经 tailnet 里另一台设备中转 | 直连不通，且有人配好了 Peer Relay | 比 DERP 快，比直连慢 |
| DERP `relay` | 经 Tailscale 的 DERP 服务器 | 直连和 Peer Relay 都不可用 | 能用，但速度受限于中继 |

直连能不能成，取决于两边网络的 NAT 类型。官方说法：多数环境下能直连，但「hard NAT」（限制很严的网络地址转换）会逼 Tailscale 走中继。只要设备能对任意主机发起 HTTPS 连接，就一定能通过 DERP 建立隧道。

## 安装

先装第一台设备并注册，再装第二台并用**同一个身份**登录。各平台的完整说明见官方 [Install Tailscale on any device](https://tailscale.com/docs/install)。

### Windows

1. 从 [Download](https://tailscale.com/download) 页下载 `.exe` 安装包并运行。
2. **会看到：** 系统托盘里多了一个 Tailscale 图标。看不到就点托盘的上箭头，在折叠区里找。
3. 右键这个图标，在账号下方选 **Log in**。
4. **会看到：** 浏览器打开登录页。用你的身份提供商账号登录。

命令行在命令提示符里直接用 `tailscale <command>`。（[Install Tailscale on Windows](https://tailscale.com/docs/install/windows)）

### macOS

1. 安装客户端。官方推荐 Standalone 版本，也可以用 Mac App Store 版或 GitHub 上的开源版。
2. 按引导流程安装 Tailscale 的 VPN 配置。
3. 用身份提供商账号注册或登录。

想用命令行：Standalone 版在客户端 **Settings** 里找到 CLI integration 区域，选 **Show me how**，再选 **Install Now**。App Store 版的 CLI 在应用包内部，路径是 `/Applications/Tailscale.app/Contents/MacOS/Tailscale`。（[Install Tailscale on macOS](https://tailscale.com/docs/install/mac)）

### Linux

```bash
# 官方安装脚本；适用于 Ubuntu、Debian、RHEL、CentOS、Fedora、Raspberry Pi OS 等发行版
curl -fsSL https://tailscale.com/install.sh | sh

# 启动并登录
sudo tailscale up
```

**会看到：** 终端给出一个登录链接。在浏览器里打开它并登录。之后登录管理后台的 **Machines** 页，确认这台设备出现了。不想用 `curl | sh` 的话，官方提供了手动安装说明。

验证安装：

```bash
# 显示这台设备的 Tailscale IPv4 和 IPv6 地址
tailscale ip

# 查看连接状态
tailscale status
```

（[Install Tailscale on Linux](https://tailscale.com/docs/install/linux)）

### iOS 与 Android

- **iOS：** 从 App Store 安装，打开后选 **Get Started**，同意安装 VPN 配置并允许推送通知（密钥快过期时靠它提醒你），再选 **Log in**。
- **Android：** 从 Google Play 安装，打开后选 **Get Started**，然后选 **Sign in with Google** 或 **Sign in with other**。

（[iOS](https://tailscale.com/docs/install/ios)、[Android](https://tailscale.com/docs/install/android)）

## 10 分钟跑通第一件事

目标：两台设备互相看得见，并能从设备 A 用 Tailscale SSH 登录设备 B（Linux）。

1. **注册并创建 tailnet。** 打开 `tailscale.com` 选 **Get Started**。在 **Sign up with your identity provider** 页用身份提供商登录，在 **Welcome to Tailscale** 页选 **Business use** 或 **Personal use**。
   **会看到：** 用公共邮箱（比如 Gmail）注册的账号自动进入 Personal 套餐；用自定义域名注册的账号自动进入 14 天的 Enterprise 试用。
2. **加入第一台设备。** 在 **Let's add your first device** 页选操作系统，按提示安装，用刚才同一个账号认证。
3. **加入第二台设备。** 在 **Next, add a second device** 页选第二台机器的操作系统，把链接送到那台机器上完成登录。选 **Take me home** 进入管理后台。
4. **确认两台设备互相可见。**
   - 打开管理后台的 **Machines** 页：两台设备都在列表里，各自有一个设备名和一个 `100.x.y.z` 地址。
   - 在任意一台设备上运行 `tailscale status`。预期会看到类似下面的内容（示例来自官方 CLI 参考）：

   ```text
   1           2         3           4         5
   100.1.2.3   device-a  apenwarr@   linux     active; direct <ip-port>, tx 1116 rx 1124
   100.4.5.6   device-b  crawshaw@   macOS     active; relay <relay-server>, tx 1351 rx 4262
   100.7.8.9   device-c  danderson@  windows   idle; tx 1214 rx 50
   100.0.1.2   device-d  ross@       iOS       -
   ```

   五列依次是：Tailscale IP、设备名、设备属主的邮箱、操作系统、连接状态。状态里的 `direct` 是直连，`relay` 是经 DERP 中继；`-` 表示还没收发过数据。
5. **测一下网络层。** 把下面的 `another-device` 换成对方的设备名：

   ```bash
   tailscale ping another-device
   ```

   预期会看到类似下面的内容（示例来自官方文档）：

   ```text
   pong from another-device (100.113.160.82) via DERP(nyc) in 130ms
   pong from another-device (100.113.160.82) via DERP(nyc) in 37ms
   pong from another-device (100.113.160.82) via 140.82.13.138:41641 in 35ms
   ```

   前几行走 DERP，是因为 Tailscale 还在协商直连；直连建立后，后面的包就直发了。一直停在 `via DERP(...)` 说明这次没能直连，能用但会慢一些。
6. **在设备 B 上打开 Tailscale SSH。** 这条命令在 B 上执行（后文的 `<device-name>` 都指 B 的设备名）：

   ```bash
   tailscale set --ssh
   ```

   **会看到：** 没有输出。**注意：** 官方警告，这条命令会让已经连到这台机器 Tailscale IP 的旧 SSH 连接卡住，重连即可。
7. **从设备 A 登录设备 B。** 把 `<linux-user>` 换成 B 上已有的用户名，`<device-name>` 换成 B 的设备名：

   ```bash
   tailscale ssh <linux-user>@<device-name>
   ```

   默认策略是 `check` 模式：发起连接的这台设备要重新向身份提供商认证一次。官方说明，SSH 初始化时会给出一个用于登录的 URL；认证之后 12 小时内再连不用重新认证。
8. **收尾。** B 上的 `/etc/ssh/sshd_config` 和 `~/.ssh/authorized_keys` 没有被改动，不走 Tailscale 的旧 SSH 方式照常可用。

第 7 步的脚本版，带错误处理：

```bash
# 连不上就停下，并提示先查网络层；不要带着错误继续往下跑
if ! tailscale ssh <linux-user>@<device-name> true; then
  echo "SSH 不通。先在 A 上运行：tailscale ping <device-name>" >&2
  exit 1
fi
```

## 日常用法

### 用 Tailscale SSH 登录自己的另一台机器

被登录的机器执行 `tailscale set --ssh`。发起方两种写法都行：

```bash
# 写法一：Tailscale 自带的包装命令
tailscale ssh <linux-user>@<device-name>

# 写法二：普通 ssh，目标写设备名或 100.x 地址
ssh <linux-user>@<device-name>
```

官方说明：多数人直接用普通的 `ssh` 就够了。`tailscale ssh` 是一个可选的包装，只多做三件事（来自 `tailscale ssh --help`）：

- 即使本机设了 `--accept-dns=false`，也用 MagicDNS 解析目标名。
- 在 userspace networking 模式下，通过 `tailscaled` 的管道连过去。
- 把目标机的 SSH 主机密钥，跟协调服务器公布的节点密钥自动核对一遍。

| 限制 | 说明 |
|---|---|
| 服务端平台 | 只支持 Linux 和 macOS 开源版；Synology、QNAP 上不能跑 |
| 端口 | 固定接管 Tailscale IP 上的 22 端口，不能改 |
| 目标范围 | 只能登录装了 Tailscale 的设备；子网路由器身后没装 Tailscale 的设备不行 |
| 守护进程重启 | 重启 `tailscaled`（比如升级）会断掉现有的 Tailscale SSH 会话 |

### 远程开发：用 VS Code 连家里机器，再把 dev server 开给自己的设备

**连过去写代码。** Tailscale SSH 生效后，连接就是普通的 SSH。下面是 OpenSSH 客户端的标准配置写法，Tailscale 负责让 `<device-name>` 这个名字能解析、连接能到达：

```text
# 写进 ~/.ssh/config；把尖括号里的内容换成你的
Host <device-name>
  HostName <device-name>
  User <linux-user>
```

<!-- TODO: 待核实 —— VS Code 的 Remote-SSH 经 Tailscale SSH 连接是否有官方说明页。在已下载的官方文档里没搜到 "Remote-SSH" 字样；上面的配置只是通用 OpenSSH 客户端写法，不是 Tailscale 的专属配置 -->

**把 dev server 开给自己的设备。** 在跑开发服务器的那台机器上执行：

```bash
# 假设开发服务器监听在本机 3000 端口；前台运行，Ctrl+C 退出
tailscale serve 3000

# 或者放到后台
tailscale serve --bg 3000
```

预期会看到类似下面的内容（示例来自官方文档，我把它压成了三行）：

```text
Available within your tailnet:
https://amelie-workstation.pango-lin.ts.net
|-- / proxy http://127.0.0.1:3000
```

之后在**你自己的**另一台设备上打开这个 `https://` 地址就能访问。

- **会看到：** 第一次用 Serve 时，如果 tailnet 没开 HTTPS，会弹出网页让你同意开启。Serve 依赖 HTTPS 证书。
- **查看与停止：** `tailscale serve status` 查看当前配置；前台模式按 `Ctrl+C`，后台模式执行 `tailscale serve reset`。
- **权限：** 转发端口不需要管理员权限；共享文件或目录需要。
- **只开给 tailnet：** Serve 的流量只在 tailnet 内可见，并且会带上请求者的身份信息头（`Tailscale-User-Login` 等）。要给公网看是另一个命令 Funnel，见下文的安全要点。

### 在外面访问家里 GPU 机器上的本地模型服务

思路和上一条相同：模型服务跑在 GPU 机器的本机端口上，用 Serve 把它映射成一个只有你的设备能访问的 HTTPS 地址。

```bash
# 在 GPU 机器上执行；<port> 换成模型服务监听的本机端口
tailscale serve --bg <port>
```

Serve 会给出一个 `https://<device-name>.<tailnet-name>.ts.net` 形式的地址，就是上一条示例输出里的那一行。在笔记本上，把模型客户端的 base URL 指向它。

<!-- TODO: 待核实 —— 模型服务默认监听哪个地址、怎么改成监听 Tailscale 地址，属于各服务自己的配置；已下载的官方 Tailscale 文档里没有 Ollama 的说明。Ollama 的用法以本站 Ollama 页为准 -->

以 Ollama 为例，它的安装与用法见 [Ollama](/zh/products/ollama)。

两件配套的事：

- **给 GPU 机器关掉密钥过期。** 否则 180 天后它会掉线。做法见下文[安全与隐私要点](./tailscale)。
- **tailnet 里有别人时，收紧这个端口。** 官方给 GPU 服务器的做法是用 grants 限定「谁能连哪台机器的哪些端口」。官方示例的核心字段是 `src`（来源用户或组）、`dst`（目标设备或 tag）、`ip`（端口），照 [Connect inference and training servers](https://tailscale.com/docs/use-cases/ai-infrastructure-access/connect-inference-servers) 抄。

### 把家里台式机当远程 agent 工位

让 Claude Code 或 Codex 在台式机上长时间跑，你在外面用笔记本随时接回来看结果。

```bash
# 1. 从笔记本登录台式机（前提：台式机已执行过 tailscale set --ssh）
tailscale ssh <linux-user>@<device-name>

# 2. 在台式机上开一个不会因为断线而消失的会话；agent 是会话名，可以随便起
tmux new -s agent

# 3. 在这个会话里启动你的 agent，然后按 Ctrl+b，松开，再按 d 把会话放到后台

# 4. 下次连回来，接上同一个会话
tmux attach -t agent
```

`tmux` 是第三方工具，上面是它的标准用法；agent 本身怎么装、怎么用，看 [Claude](/zh/products/claude/) 和 [Codex](/zh/products/codex/) 的页面。

- **台式机要一直在线。** Windows 上没用户登录时想让 Tailscale 继续跑，执行 `tailscale set --unattended=true`。
- **笔记本别外借。** 官方写明的限制：Tailscale SSH 不靠本地密钥对认证，所以**客户端机器上的任何系统用户**都能发起 Tailscale SSH 连接，能连到哪由服务端的访问策略决定。
- **换个角度对比：** [Codex Remote](/zh/products/codex/codex-remote) 是手机和桌面应用配对；Tailscale 解决的是更底层的「设备之间网络可达」，两者不重叠。

### 子网路由与 exit node

这两个功能容易混。官方的区分是：子网路由器让你访问某个私有网段里的设备，不影响上网流量；exit node 把你的上网流量整体转发出去。

**子网路由器：访问家里整个网段。** 在一台 Linux 机器上执行（`192.0.2.0/24` 和 `198.51.100.0/24` 是官方示例网段，换成你家的）：

```bash
# 1. 打开内核的转发能力
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
sudo sysctl -p /etc/sysctl.d/99-tailscale.conf

# 2. 通告路由
sudo tailscale set --advertise-routes=192.0.2.0/24,198.51.100.0/24
```

然后做三件事：

1. 在管理后台的 **Machines** 页找到这台机器，进入 **Subnets** 区域，勾选路由后选 **Save**。路由要有人批准才生效。
2. 如果策略里没有放行这些网段，在 **Access controls** 页加一条访问规则。
3. 客户端方面，Android、iOS、macOS、tvOS、Windows 会自动接收子网路由；**Linux 默认不接收**，要执行 `sudo tailscale set --accept-routes`。

官方提醒：打开 IP 转发时，确保防火墙默认拒绝转发流量（`ufw`、`firewalld` 默认就是这样）。（[Subnet routers](https://tailscale.com/docs/features/subnet-routers)）

**exit node：在公共 Wi-Fi 下把全部流量从家里的设备出去。** 把家里的 Linux 机器配置成出口：

```bash
sudo tailscale set --advertise-exit-node
# 官方要求：用 set 加了这个参数之后，必须再执行一次 up
sudo tailscale up
```

Linux 机器同样需要先打开 IP 转发。然后：

1. 管理员在 **Machines** 页找到它，在菜单里选 **Edit route settings**，再选 **Use as exit node**。
2. 每台要用它的设备各自开启：Windows 在托盘菜单选 **Use exit node**；macOS 在菜单栏选 **Exit Nodes**；Linux 执行 `sudo tailscale set --exit-node=<exit-node-ip>`。
3. 验证：随便查一下本机公网 IP，应该显示 exit node 的地址而不是你当前的。
4. 关闭：Windows 和 macOS 选 **None**；Linux 执行 `sudo tailscale set --exit-node=`。

连上 exit node 后，默认访问不了自己所在的局域网（比如酒店的打印机）。确有需要时加 `--exit-node-allow-lan-access=true`，用完关掉。（[Exit nodes](https://tailscale.com/docs/features/exit-nodes)）

### Taildrop 传文件；MagicDNS 用名字代替 IP

**Taildrop。** 它还是 alpha 功能，要先在管理后台 **General** 设置页打开 **Send Files**。只能在自己的设备之间传，不能传给别人的设备，也不能传给带 tag 的节点。

```bash
# Linux 上发送：目标是「设备名加冒号」，和 scp 的写法接近
tailscale file cp ./my-file.txt <device-name>:

# Linux 上接收： tailscaled 以 root 运行，收到的文件要 root 才能取
sudo tailscale file get .
```

Windows 上右键文件选 **Send with Tailscale**；macOS 和手机上用系统分享菜单里的 Tailscale。（[Taildrop](https://tailscale.com/docs/features/taildrop)）

**MagicDNS。** 2022 年 10 月 20 日之后创建的 tailnet 默认开启。开启后，设备名就能当主机名用：

```bash
# 这两条等价
ping <device-name>
ping <device-name>.<tailnet-name>.ts.net
```

完整域名由「设备名」加「tailnet 的 DNS 名」组成，两个都能在管理后台的 **DNS** 页查到。macOS 上的 `host` 和 `nslookup` 绕过了系统 DNS，用不了 MagicDNS；`ping` 可以。别人分享给你的设备必须用完整域名访问。（[MagicDNS](https://tailscale.com/docs/features/magicdns)）

## 真实用例

- **下班路上改一个 bug。** 用 `tailscale ssh` 登录台式机，`tmux attach` 接回还开着的 agent 会话，看完它跑的测试再下一条指令。
- **给同事看一个没上线的页面。** `tailscale serve --bg 3000`，把地址发过去。同事得在你的 tailnet 里才打得开，公网上的人打不开。
- **在外面调用家里的模型。** GPU 机器上 `tailscale serve --bg <port>`，笔记本上的客户端指向这个地址。请求全程加密，不需要在路由器上开任何端口。
- **出差时用酒店的 Wi-Fi。** 把笔记本的 exit node 设成家里的机器，上网流量从家里出去。
- **回家路上用手机翻 NAS 里的照片。** NAS 装不了客户端也没关系：家里任意一台常开的设备做子网路由器，手机就能访问 NAS 的内网地址。

## 计费、额度与限制

以下数字来自 2026-11-24 打开的官方定价页（[Tailscale pricing](https://tailscale.com/pricing)），之后可能变化。

| 套餐 | 价格 | 用户数 | ACL 组 | 要点 |
|---|---|---|---|---|
| Personal | 免费 | 最多 6 个 | 最多 3 个 | 用户设备数量不限；带标签资源 50 个起步；每月 1,000 分钟临时资源；仅限非商业用途 |
| Standard | 每用户每月 $8 | 不限 | 最多 10 个 | 用 SCIM 下发用户和组；用 MDM 配置；设备态势集成 |
| Premium | 每用户每月 $18 | 不限 | 最多 300 个 | 每月 10,000 分钟临时资源；Advanced Tailscale SSH；网络流日志；日志外送 |
| Enterprise | 联系销售 | 定制 | 定制 | 自定义设备数量与限额、自定义 MSA、按发票付款 |

- **附加项：** 多买带标签资源，每个每月 $1；Mullvad 附加项每 5 台设备每月 $5。
- **限额执行情况：** 定价页 FAQ 写明，ACL 组、多 tailnet、带标签资源、临时资源的硬性上限和超额「目前没有强制执行」。
- **SSH 的 check 模式：** 各套餐都有；要改 check 周期（默认 12 小时）需要 Premium 或 Enterprise。

与功能成熟度有关的限制：

| 功能 | 状态 | 限制 |
|---|---|---|
| Funnel | beta | 只能监听 `443`、`8443`、`10000` 三个端口；只走 TLS；带宽有限制且不可配置 |
| Taildrop | alpha | 只能传给自己的设备 |
| Mullvad exit node | beta | 付费附加项 |

## 安全与隐私要点

### 先说清 Tailscale 能看到什么

| 问题 | 官方回答 |
|---|---|
| Tailscale 能解密我的流量吗 | 不能。设备只交换公钥，私钥不离开设备 |
| 我的流量经过 Tailscale 的服务器吗 | 不经过。多数情况是直连；直连不通时经过 DERP 中继，但中继转发的是密文 |
| 协调服务器知道什么 | 你的身份（邮箱、头像链接）、设备信息（系统、版本、公钥、地址）和策略 |

第三行来自官方对协调服务器职责的描述。它「不处理用户认证」，认证外包给身份提供商。

### 护栏一：Funnel 会把服务暴露到公网

`tailscale funnel` 和 `tailscale serve` 只差一个词，结果完全不同：Serve 只给 tailnet 内看，Funnel 给**整个互联网**看。默认不要开。开之前弄懂这几件事：

- **没有身份这一层。** 任何拿到地址的人都能访问。Funnel 的流量不带 Serve 那些身份信息头。
- **先问自己：这个服务自己有登录吗？会不会泄露目录或密钥？** 用 Funnel 共享目录前尤其要想清楚。
- **同一个端口不能同时 Serve 和 Funnel。** 最后一次配置它的命令是 `serve`，端口就完全私有；是 `funnel`，就完全公开。
- **谁有权开 Funnel 由策略决定。** 用 CLI 开启时，Tailscale 会改你的策略文件，默认允许 `autogroup:member` 里的所有人使用 Funnel；可以手动收紧。
- **怎么看、怎么关：** `tailscale funnel status` 查看当前配置，`tailscale funnel reset` 关闭。
- **Funnel 节点会出现在你的 peer 列表里**，`tailscale status --json` 里能看到。

<!-- TODO: 待核实 —— Funnel 是否默认启用：官方 Serve 页写 "Tailscale Funnel is enabled by default"，官方 Funnel 页写 "Tailscale Funnel is disabled by default"，两页相反。能确定的是：一个端口只有在用 funnel 命令配置之后才会公开 -->

### 护栏二：默认策略是全通，人多了要收紧

新 tailnet 的策略等价于下面这份（字段来自官方示例，排版压紧过）：

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

含义：所有设备互访；每个成员可以用 check 模式 SSH 到自己的设备，root 和非 root 用户都行。

<!-- TODO: 待核实 —— 新建的 tailnet 实际拿到的默认策略文件是 acls 写法还是 grants 写法：官方 ACL 示例页展示的是 acls，官方 Tailscale SSH 页展示「最宽策略」时用的是 grants，两页写法不一 -->

只有你一个人用时，全通没有问题。一旦邀请别人进 tailnet，就应该收紧。官方示例「用户只能访问自己的设备」的核心规则是：

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

- 在管理后台的 **Access controls** 页编辑。官方推荐新写的策略用 grants 语法，它可以做 ACL 能做的一切，并且会继续加新功能；旧的 ACL 写法会一直支持。
- **删掉 `acls` 字段不等于「全部拒绝」。** 官方警告：省略 `acls` 字段等于默认的全通策略。要全部拒绝，写成 `"acls": []`。
- **改 SSH 规则要小心。** 把 `dst` 从 `autogroup:self` 改成别的目标时，官方提醒同时考虑去掉 `users` 里的 `autogroup:nonroot`；否则 `src` 里允许的任何人都能以目标机上任意非 root 用户登录。
- **策略在每台设备本地执行**，改完几秒内生效；收紧 SSH 规则会**断掉**对方已经建立的 SSH 连接。

（[Allow all (default ACL)](https://tailscale.com/docs/reference/examples/acls)、[Grants vs. ACLs](https://tailscale.com/docs/reference/grants-vs-acls)）

### 护栏三：exit node 的信任含义

- **用谁的 exit node，流量就从谁那里出去。** 网站看到的来源 IP 是它的。它在网络层能看到你访问了哪些地址，以及没有加密的内容。所以只用你自己控制的设备当 exit node。
- **反过来，你 advertise 出去的 exit node 默认全 tailnet 可用。** 官方原文：默认情况下 tailnet 里的任何用户都可以使用一个已配置的 exit node。tailnet 里有别人时，要在策略里把 `autogroup:internet` 只授给你信任的人。
- **要三方都点头。** 官方说明，出于安全考虑 exit node 必须显式开启：设备要 advertise 自己，管理员要批准，每台使用的设备要各自选择它。
- **别把 exit node 设备当成匿名工具。** 流量从你家或你公司的网络出去，对方看到的是那个网络的地址。

<!-- TODO: 待核实 —— exit node 的密钥过期后，使用它的设备会怎样（是断网还是绕过出口直连）：官方页该处是一段没能抓到的内嵌片段，源码里也没定位到对应逻辑 -->

### 护栏四：`tailscale up` 带参数时，必须把所有非默认设置重复一遍

规则（来自 `tailscale up --help` 和源码 [`up.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/up.go#L1054-L1114)）：

- **不带任何参数**的 `tailscale up` 只把网络拉起来，不改设置。
- **只要带了参数**，这组参数就必须是你想要的完整设置。任何一项「当前不是默认值、这次又没提到」的设置，都会让命令报错，除非同时加 `--reset`。
- `--auth-key`、`--force-reauth`、`--qr` 不算设置，不用重复。
- 首次登录之前不做这项检查。

出错的例子：这台机器之前执行过 `tailscale set --advertise-routes=192.0.2.0/24`，现在只想改个名字。

```bash
# 报错：只提到了 --hostname，之前设过的 --advertise-routes 没提
tailscale up --hostname=<device-name>
```

预期会看到类似下面的报错。正文是按源码里的固定文案和拼接顺序推出来的，我没有在本机触发它：

```text
Error: changing settings via 'tailscale up' requires mentioning all
non-default flags. To proceed, either re-run your command with --reset or
use the command below to explicitly mention the current value of
all non-default settings:

	tailscale up --hostname=<device-name> --advertise-routes=192.0.2.0/24
```

三种正确写法：

```bash
# 写法一：照报错里给出的完整命令重跑
tailscale up --hostname=<device-name> --advertise-routes=192.0.2.0/24

# 写法二（推荐）：日常改设置用 set，它不要求重复其他参数
tailscale set --hostname=<device-name>

# 写法三：确实想把其他设置恢复默认，才加 --reset；它会清掉子网路由等设置
tailscale up --hostname=<device-name> --reset
```

**日常只用 `tailscale set` 就能避开这个坑。** 它的 `--help` 原文：与 `tailscale up` 不同，这条命令不要求给出完整的设置集合，只改你明确提到的项。

### 护栏五：Key expiry 会让设备掉线

- **现象：** 设备的密钥默认 180 天过期。过期后，**进出这台设备的连接全部停止工作**。手机上会提前收到推送提醒。
- **自己 reauthenticate：** 在那台设备上执行 `tailscale up --force-reauth`。官方警告：这条命令可能中断 Tailscale 连接，不要只通过 SSH 或远程桌面远程执行，要留一条备用登录方式。
- **人不在设备旁边：** 管理员在 **Machines** 页的菜单里选 **Temporarily extend key**，密钥延长 30 分钟，让机主在这个时间内登录。
- **服务器类设备：** 在 **Machines** 页的菜单里选 **Disable Key Expiry**。官方提醒，这会降低安全性，只对可信设备这样做，设备丢失时立即吊销密钥。带 tag 的设备默认就不过期。
- **CLI 也会拦你：** 如果你正通过 Tailscale SSH 连着这台机器又执行 `--force-reauth`，源码里会弹出一条风险确认，提示这个操作可能让当前 SSH 会话断开。

（[Key expiry](https://tailscale.com/docs/features/access-control/key-expiry)）

### 护栏六：`--accept-routes` 在 Linux 上默认关闭

「接收别的设备通告的子网路由」这个开关，默认值因平台而异：

| 平台 | 默认值 |
|---|---|
| Windows、iOS、Android、macOS 的 App Store 版和 Standalone 版 | 接收 |
| 其他平台，包括 Linux | 不接收 |

所以 Linux 上要手动执行 `sudo tailscale set --accept-routes`。`--accept-dns`（接收管理后台下发的 DNS 配置）在所有平台默认开启。

### 其他要点

- **设备审批。** 管理员可以在 **Device management** 页开启 device approval。开启后新设备显示 **Needs approval** 徽标，批准之前不能收发流量。
- **给 tailnet 里的网页工具开 HTTPS 时，证书会进入证书透明度日志。** 官方提醒：设备名里不要放私密信息。
- **Tailscale 不保护设备的其他流量。** 官方原文：它保证设备之间的流量端到端加密，「但不保护你的设备免受任何其他流量」。该开的防火墙照常开。
- **在 tailnet 里跑纯 HTTP 的开发服务器要防 DNS rebinding。** 官方建议：这类服务应校验请求的 `Host` 头是否在允许列表里。
- **靠 Serve 的身份信息头做认证时，后端只监听 localhost。** 否则能直接访问该服务的人可以自己伪造这些头。

（[Best practices to secure your tailnet](https://tailscale.com/docs/reference/best-practices/security)、[Device approval](https://tailscale.com/docs/features/access-control/device-management/device-approval)）

## 常见坑

| 症状 | 原因 | 解决 |
|---|---|---|
| `tailscale up` 报 `changing settings via 'tailscale up' requires mentioning all non-default flags` | 带参数的 `up` 要求重复所有非默认设置 | 用 `tailscale set`；或照报错给出的完整命令重跑；或确认后加 `--reset` |
| Linux 上访问不到子网路由器身后的设备 | Linux 默认不接收子网路由 | `sudo tailscale set --accept-routes` |
| 子网路由配好了，别的设备还是看不到 | 路由没人批准，或策略没放行 | 在 **Machines** 页的 **Subnets** 区域勾选并保存；再检查 **Access controls** |
| `tailscale status` 一直是 `relay`，速度慢 | 网络是 hard NAT，或网络禁了 UDP | 运行 `tailscale netcheck`，看 `UDP` 一项；为 `false` 时基本只能走中继。要求更高再研究 Peer Relay |
| SSH 提示 `tailnet policy does not permit you to SSH to this node` | 策略不允许：要么没有放行网络访问，要么 SSH 规则不匹配 | 确认策略里同时有网络访问规则和 `ssh` 规则；目标是 tag 设备时检查 `dst` |
| 执行 `tailscale set --ssh` 后，旧的 SSH 窗口卡住 | Tailscale 接管了 Tailscale IP 上的 22 端口 | 重新连接 |
| 连不上 Windows 目标机的 Tailscale SSH | Tailscale SSH 的服务端不支持 Windows | 在 Windows 上用系统自带的普通 SSH，目标写设备名 |
| 设备大约 180 天后突然掉线 | Key expiry | `tailscale up --force-reauth`，或请管理员 **Temporarily extend key** |
| 设备登录了，但显示 **Needs approval**，收不到流量 | tailnet 开启了设备审批 | 请管理员在 **Machines** 页选 **Approve** |
| 加了 `--advertise-exit-node` 却没有生效 | 用 `set` 加这个参数后必须再执行一次 `up` | `sudo tailscale up`，再到后台批准 |
| 在远程 SSH 会话里执行 `tailscale up --force-reauth`，会话断了 | 重新认证会中断 Tailscale 连接 | 留一条备用登录方式，或让管理员先临时延长密钥 |
| macOS 上 `host`、`nslookup` 解析不了设备名 | 这两个工具绕过系统 DNS | 用 `ping` 或直接用完整域名 |
| 看不到某台设备 | 登录的身份或 tailnet 不一致；或对方密钥已过期 | 确认两台设备用同一个账号登录；到 **Machines** 页看对方状态 |
| Serve 的端口突然对公网开放了 | 这个端口最后一次是用 `funnel` 配置的 | 执行 `tailscale serve <target>` 改回私有，或 `tailscale funnel reset` |

## 故障排查

按顺序查，每一步只回答一个问题。

1. **本机的 Tailscale 在跑吗，登录了吗？** 运行 `tailscale status`。第一行是本机。
2. **网络层通吗？** 运行 `tailscale ping <device-name>`。它能通，说明设备之间可达。
3. **网络条件允许直连吗？** 运行 `tailscale netcheck`。预期会看到类似下面的内容（示例来自官方 CLI 参考，有删减）：

   ```text
   Report:
   	* UDP: true
   	* MappingVariesByDestIP: false
   	* Nearest DERP: Seattle
   	* DERP latency:
   		- sea: 24.2ms  (Seattle)
   ```

   `UDP` 为 `false` 时基本只能走中继。`MappingVariesByDestIP` 描述你的设备是否在一个「难缠的 NAT」后面。
4. **目标设备上真的有服务在监听那个端口吗？** 官方提醒：Tailscale 只提供设备之间的网络连通，SSH、网页服务器这类服务要你自己运行。
5. **防火墙拦了吗？** Tailscale 默认用 UDP `41641` 端口收发直连的 WireGuard 流量。
6. **策略拦了吗？** 检查 **Access controls** 页里有没有规则禁止这两台设备互连。

排查顺序里没列出来的问题，看官方的 [Troubleshooting guide](https://tailscale.com/docs/reference/troubleshooting) 和 [Troubleshoot device connectivity](https://tailscale.com/docs/reference/device-connectivity)。

## 下一步

1. **把常用设备都加进来。** 服务器、NAS、GPU 机器这类不方便重新登录的设备，关掉 Key expiry。
2. **要邀请别人时先收紧策略。** 从「用户只能访问自己的设备」这条官方示例改起。
3. **需要时再学这些：** 给设备贴 tag 并用 auth key 自动注册；给 tailnet 里的网页工具配 HTTPS 证书；为打不通直连的环境配 Peer Relay。
4. **想知道它内部怎么实现的：** 读[源码解读](./source)。

## 深入阅读

- [What is Tailscale?](https://tailscale.com/docs/concepts/what-is-tailscale)：官方定义、与传统 VPN 的差别。
- [How connections work: Connection types](https://tailscale.com/docs/reference/connection-types)：直连、DERP、Peer Relay 的建立顺序，以及怎么判断当前是哪一种。
- [Control and data planes](https://tailscale.com/docs/concepts/control-data-planes)：协调服务器负责什么、不负责什么。
- [Tailscale encryption](https://tailscale.com/docs/concepts/tailscale-encryption)：控制面和数据面各用了什么加密。
- [Tailscale identity](https://tailscale.com/docs/concepts/tailscale-identity)：用户身份、节点身份、机器密钥之间的关系。
- [Tailscale SSH](https://tailscale.com/docs/features/tailscale-ssh)：check 模式、SSH 规则语法、会话录制。
- [Tailscale Serve](https://tailscale.com/docs/features/tailscale-serve) 和 [Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel)：两个命令的工作方式与限制。
- [Subnet routers](https://tailscale.com/docs/features/subnet-routers) 和 [Exit nodes](https://tailscale.com/docs/features/exit-nodes)：各平台的具体步骤。
- [Tailscale CLI](https://tailscale.com/docs/reference/tailscale-cli)：全部子命令和参数。
- [Best practices to secure your tailnet](https://tailscale.com/docs/reference/best-practices/security)：官方的安全基线清单。

## 相关页面

- [学习地图](./)：产品家族、选型决策表。
- [源码解读](./source)：一条连接在代码里是怎么建立的。
- [UU Remote](../uu-remote/)：远程桌面类工具。它解决「看到并操作另一台机器的画面」，Tailscale 解决「设备之间网络可达」。
- [T3 Code](../t3code/)：它的仓库里有 `packages/tailscale`。
- [Cindy](../cindy/)、[Codex dot](../codex/dot)：同批的姊妹页，属于远程与智能体工作位主题；Tailscale 在这类方案里负责网络层。
- [Claude](/zh/products/claude/)、[Codex](/zh/products/codex/)：在远程工位上跑的 agent。
- [Ollama](/zh/products/ollama)：本地模型服务的一个例子。

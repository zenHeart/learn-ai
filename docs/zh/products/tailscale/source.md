---
title: Tailscale 源码解读
description: Tailscale 的一条连接在代码里是怎么建立的：CLI 经本地 socket 调 LocalAPI，LocalBackend 把协调服务器下发的网络地图装进 wgengine，magicsock 在直连和 DERP 中继之间选路。本页读它的源码，每条结论都给出固定提交的永久链接。
domain: product
tags:
  - source-code
  - mesh-vpn
  - go
  - tailscale
role: deep-dive
pageClass: wide-figures readable-tables
source_revision: da6276d77025ee2bce288c4ccf07b35e14f253a7
---

# Tailscale 源码解读：一条连接是怎么建立的

> **一句话结论：** Tailscale 把「谁可以连谁」和「实际怎么连」拆成了两层。协调服务器只下发公钥、地址和策略（控制面）；设备上的 `magicsock` 负责在直连和 DERP 中继之间选路，并用 WireGuard 加解密（数据面）。**数据从来不经过协调服务器。**
>
> 本页所有结论对照 `tailscale/tailscale` 提交 [`da6276d7`](https://github.com/tailscale/tailscale/tree/da6276d77025ee2bce288c4ccf07b35e14f253a7)（`VERSION.txt` 为 `1.107.0`）；之后的变化不在本页范围。**已验证 / 推断 / 未知**的分层见文末。还没用过这个产品的话，先读[教程](./tailscale)。

## 写给谁 / 不写给谁

- **写给谁：** 已经用上 Tailscale，想知道「官方文档里的那句话，代码里到底怎么做的」的工程师。要读得懂 Go，不需要懂密码学。
- **不写给谁：** 想学 WireGuard 协议本身的人（加密握手在另一个仓库 `tailscale/wireguard-go`）；想给 Tailscale 提交代码的人（本页是导读，不是贡献指南）；只想装上就用的人（去读[教程](./tailscale)）。

下文出现的网络术语，第一次出现时用大白话解释一遍。

## 仓库地图

规模是我在这份提交的本地克隆上用 `git ls-files` 实测的：仓库跟踪 **3,168** 个文件；非测试的 `.go` 文件 **1,822** 个（`git ls-files '*.go' | grep -v _test | wc -l`）；测试文件 **858** 个。

| 目录 | 职责 | 从哪个文件读起 | 非测试 `.go` 文件数 / 行数 |
|------|------|----------------|---------------------------|
| `cmd/tailscale/cli` | 命令行界面 | [`up.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/up.go#L47-L71)，单文件 1,313 行 | 82 / 17,709 |
| `cmd/tailscaled` 与根目录 `tailscaled.go` | 守护进程入口 | 根目录 `tailscaled.go`（本页未读） | 20 / 2,856 |
| `cmd/derper` | DERP 中继服务器的实现 | 本页未读 | 9 / 2,113 |
| `ipn/ipnserver` | 本地 API 服务端，判定连接方的权限 | [`server.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnserver/server.go#L200-L225) | 5 / 962 |
| `ipn/localapi` | 本地 API 的各个 HTTP 处理函数 | [`localapi.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/localapi/localapi.go#L71-L97) | 10 / 3,754 |
| `ipn/ipnlocal` | `LocalBackend`：整个客户端的中枢 | `local.go`，单文件 9,718 行 | 45 / 22,332 |
| `ipn/ipnauth` | 「连接方是谁」，以及它有没有权限 | [`ipnauth.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnauth/ipnauth.go#L158-L208) | 本页未计数 |
| `wgengine/magicsock` | 选路：直连还是中继 | [`magicsock.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/wgengine/magicsock/magicsock.go#L4-L5)、`endpoint.go` | 26 / 11,662 |
| `wgengine/router`、`filter`、`netstack` | 改系统路由表、包过滤、用户态网络栈 | 本页只读到 `filter` 的调用处 | 14 / 4,787；5 / 1,214；11 / 3,362 |
| `derp` 与 `derp/derphttp` | DERP 协议和它的 HTTP 客户端 | [`derp.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/derp/derp.go#L4-L12) | 22 / 8,550；4 / 1,511 |
| `disco` | 设备之间的发现报文格式 | [`disco.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/disco/disco.go#L4-L19) | 2 / 698 |
| `control/controlclient` | 和协调服务器通信 | `direct.go`、`auto.go` | 10 / 4,538 |
| `control/controlhttp` | 控制面连接的 HTTP 传输层 | 本页未读 | 6 / 1,026 |
| `tailcfg` | 和协调服务器之间传输的数据结构 | [`tailcfg.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/tailcfg/tailcfg.go#L385-L438) | 9 / 8,441 |
| `ssh/tailssh` | Tailscale SSH 的内置服务端 | [`tailssh.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ssh/tailssh/tailssh.go#L4-L7) | `ssh` 全目录 25 / 9,399 |
| `client/local` | 本地 API 的 Go 客户端 | `local.go`（本页未读） | 10 / 2,614 |
| `safesocket` | CLI 连守护进程用的本地 socket | [`safesocket.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/safesocket/safesocket.go#L4-L6) | 8 / 1,070 |
| `types`、`net/dns`、`health`、`hostinfo`、`tsnet` | 共用类型；DNS 与 MagicDNS；健康提示；本机信息上报；嵌入用的库 | 本页均未读 | 65 / 9,568；40 / 10,788；7 / 2,074；9 / 1,152；12 / 3,352 |

读表时注意两点。**代码量最大的块是 `ipn`（105 个文件、38,926 行）和 `wgengine/magicsock`**：大头在「客户端的状态管理」和「选路」，不在加密本身，加密在仓库外的 `wireguard-go`。**按文件数排第一的目录是 `feature`，有 332 个非测试文件**：它不在上表里，因为我只看到了它在别处的用法，没读这个目录本身，见文末「推断」。

本地克隆是**浅克隆**，只有这一个提交，所以本页不做任何关于「代码是怎么演变过来的」结论。

## 架构与数据流

看图之前，先带着这个问题：**你在终端敲下一条 `tailscale` 命令之后，它经过哪些进程和包才起作用？协调服务器和 DERP 中继各自接在哪一层？**

<DocDiagram src="/diagrams/tailscale-code-map.svg" alt="这张分层架构图回答一个问题：一条 tailscale 命令从终端发出后，经过哪些进程和包才落到 WireGuard，控制面和中继各自接在哪一层。从上到下依次是：tailscale 命令行，源码在 cmd/tailscale/cli；本地 socket，是 Unix socket 或 Windows 命名管道，由 safesocket 实现；LocalAPI 的 HTTP 服务端，由 ipn/ipnserver 和 ipn/localapi 组成；LocalBackend，在 ipn/ipnlocal；wgengine，里面包含 router、filter 和 netstack；magicsock，在 wgengine/magicsock；最后是 wireguard-go，它是仓库外的依赖，经 UDP 收发。箭头表示调用与数据的方向：命令行经本地 socket 向 LocalAPI 发 HTTP 请求，请求方向只从命令行到守护进程；LocalAPI 先判定连接方的权限，只读或可写，再调用 LocalBackend；LocalBackend 把网络地图和包过滤规则下发给 wgengine；wgengine 把端点与路径选择交给 magicsock；magicsock 用 wireguard-go 加解密。LocalAPI 只监听本地 socket，不对外暴露。左侧是控制面：control/controlclient 向协调服务器发起长轮询，协调服务器把网络地图下发回来，controlclient 再回调 LocalBackend；这条线只传公钥、地址和策略，协调服务器不在数据路径上。右侧是中继：magicsock 经 derp 与 derp/derphttp 连接 DERP 服务器，用于协商连接和回落中继；DERP 只转发已加密的包。本图省略了 Peer Relay 与 Tailnet Lock 的内部结构，以及各包内部更多的模块。" :width="960" />

> **图的依据：** 调用链，以及 LocalAPI「只监听本地 socket」，对照源码 [`localapi.go` L71–L97](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/localapi/localapi.go#L71-L97)、[`ipnserver/server.go` L200–L225](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnserver/server.go#L200-L225)、[`ipnlocal/local.go` L1898–L1910](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnlocal/local.go#L1898-L1910)；控制面回调对照 [`controlclient/direct.go` L1023–L1029](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/control/controlclient/direct.go#L1023-L1029)；端点探测对照 [`magicsock/endpoint.go` L626–L652](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/wgengine/magicsock/endpoint.go#L626-L652)，都是提交 `da6276d7`（v1.107.0 一线）。图中保留了从命令行到 wireguard-go 的七级调用链，以及控制面与中继各自接入的位置；省略了 Peer Relay 与 Tailnet Lock 的内部结构，以及各包内部更多的模块。协调服务器不在数据路径上，LocalAPI 不经网络对外监听，DERP 只转发已加密的包。

图里的关系可以分成三条线：中间一列是本地的调用链，左边是控制面，右边是中继。下面先走中间这条，再走左边那条；右边那条线留在 `magicsock` 里，见后文「关键机制深读」的机制一。

**中间一列是本地这条线：命令怎么变成设置。** 官方对二进制的划分是：`tailscale`（或 `tailscale.exe`）是命令行，`tailscaled`（注意末尾多一个 `d`）是做所有网络处理的高权限守护进程。CLI 自己不碰网络，它通过 `safesocket` 连到守护进程。这个包的自我描述是「能建 Unix socket 就建 Unix socket，否则建一条 localhost 的 TCP 连接」；在 Windows 上实现是命名管道。

连上之后走的是 HTTP，路径都在 `/localapi/v0/` 前缀下。`localapi.go` 里用一张表登记了全部入口，下面是节选：

```go
// localapi.go L78-L94，节选
	"check-prefs":          (*Handler).serveCheckPrefs,
	"derpmap":              (*Handler).serveDERPMap,
	"login-interactive":    (*Handler).serveLoginInteractive,
	"logout":               (*Handler).serveLogout,
	"ping":                 (*Handler).servePing,
	"prefs":                (*Handler).servePrefs,
	"start":                (*Handler).serveStart,
	"status":               (*Handler).serveStatus,
```
（[永久链接](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/localapi/localapi.go#L71-L97)）

**左边是远端那条线：网络地图怎么下来。** 网络地图（netmap）是协调服务器交给每台设备的「通讯录」：我是谁、我能看到哪些节点、每个节点的公钥和地址是什么、策略是什么。它用一张长连接流式下发：

```go
// tailcfg.go L2010-L2019
// MapResponse is the response to a MapRequest. It describes the state of the
// local node, the peer nodes, the DNS configuration, the packet filter, and
// more. A MapRequest, depending on its parameters, may result in the control
// plane coordination server sending 0, 1 or a stream of multiple MapResponse
// values.
//
// When the client sets MapRequest.Stream, the server sends a stream of
// MapResponses. That long-lived HTTP transaction is called a "map poll". In a
// map poll, the first MapResponse will be complete and subsequent MapResponses
// will be incremental updates with only changed information.
```
（[永久链接](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/tailcfg/tailcfg.go#L2010-L2019)）

客户端一侧由 `control/controlclient` 负责拉取。`direct.go` 里 `sendMapRequest` 的注释写明：它发一个 `/map` 请求下载网络地图，「如果 `isStreaming` 为真，它会永远轮询下去」。`tailcfg.go` 里 `MapRequest` 的注释给出了地址：`POST https://<control-plane>/machine/map`。（[`direct.go` L1023-L1029](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/control/controlclient/direct.go#L1023-L1029)、[`tailcfg.go` L1452-L1460](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/tailcfg/tailcfg.go#L1452-L1460)）

新地图到了以后，`LocalBackend` 的这个回调被触发：

```go
// ipn/ipnlocal/local.go L1898-L1910，略去中间四行
// SetControlClientStatus is the callback invoked by the control client whenever it posts a new status.
// Among other things, this is where we update the netmap, packet filters, DNS and DERP maps.
func (b *LocalBackend) SetControlClientStatus(c controlclient.Client, st controlclient.Status) {
	defer b.CheckDeadlocks()()

	// ...
	b.mu.Lock()
	defer b.mu.Unlock()
	b.setControlClientStatusLocked(c, st)
}
```
（[永久链接](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnlocal/local.go#L1898-L1910)）

注释里的三件事对应三处代码：更新网络地图是 `setNetMapLocked`（L7717 起），装包过滤规则是 `updateFilterLocked`（L3591 起）。我在 `updateFilterLocked` 里看到，过滤规则直接取自当前节点的网络地图（`cn.PacketFilter()`）。也就是说，**访问策略是协调服务器算好、下发到每台设备本地执行的**。这和官方文档的说法一致：规则在每台设备上直接执行，不再需要协调服务器参与。

最后是地图里一个节点长什么样。下面是 `Node` 结构里和连接有关的字段，中间无关的字段用 `// ...` 略去：

```go
// tailcfg.go L385-L438，节选
// Node is a Tailscale device in a tailnet.
type Node struct {
	Key          key.NodePublic
	KeyExpiry    time.Time                  `json:",omitzero"` // the zero value if this node does not expire
	// ...
	Machine      key.MachinePublic          `json:",omitzero"`
	DiscoKey     key.DiscoPublic            `json:",omitzero"`

	// Addresses are the IP addresses of this Node directly.
	Addresses []netip.Prefix
	// ...
	Endpoints []netip.AddrPort `json:",omitempty"` // IP+port (public via STUN, and local LANs)
	// ...
	HomeDERP DERPRegionID `json:",omitzero"` // DERP region ID of the node's home DERP
```
（[永久链接](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/tailcfg/tailcfg.go#L385-L438)）

三个公钥字段对应官方文档里的三种身份：`Key` 是节点密钥（WireGuard 用），`Machine` 是机器密钥（向协调服务器证明「我是这台物理设备」），`DiscoKey` 是发现协议用的密钥。`Endpoints` 是这台设备所有可能的联络地址，`HomeDERP` 是它的「老家」中继。注意这里**只有公钥**，和官方「设备只交换公钥，私钥不离开设备」的说法对得上。

## 关键机制深读

### 机制一：直连还是中继，谁说了算

**要解决的问题。** 两个节点之间可能有很多条路：各自的局域网地址、经 STUN 查出来的公网地址、端口映射出来的地址，外加一个 DERP 中继。每个包发出去的时候，到底走哪条？

**代码怎么做的。** `magicsock` 包的自我描述是「一个能在使用中改变通信路径、主动寻找最佳通信方式的 socket」。它的 `endpoint.go` 里，每个对端节点对应一个 `endpoint`，发包前先调用下面这个函数：

```go
// wgengine/magicsock/endpoint.go L626-L652
// addrForSendLocked returns the address(es) that should be used for
// sending the next packet. Zero, one, or both of UDP address and DERP
// addr may be non-zero. If the endpoint is WireGuard only and does not have
// latency information, a bool is returned to indicate that the
// WireGuard latency discovery pings should be sent.
//
// de.mu must be held.
//
// TODO(val): Rewrite the addrFor*Locked() variations to share code.
func (de *endpoint) addrForSendLocked(now mono.Time, forceMirror bool) (udpAddr epAddr, derpAddr netip.AddrPort, sendWGPing bool) {
	udpAddr = de.bestAddr.epAddr

	if udpAddr.ap.IsValid() && !now.After(de.trustBestAddrUntil) && !forceMirror {
		return udpAddr, netip.AddrPort{}, false
	}

	if hasUDPTransport && de.isWireguardOnly {
		// If the endpoint is wireguard-only, we don't have a DERP
		// address to send to, so we have to send to the UDP address.
		udpAddr, shouldPing := de.addrForWireGuardSendLocked(now)
		return udpAddr, netip.AddrPort{}, shouldPing
	}

	// udpAddr is nil, or untrusted, or caller forced mirroring. Send over DERP and
	// also UDP if available.
	return udpAddr, de.derpAddr, false
}
```
（[永久链接](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/wgengine/magicsock/endpoint.go#L626-L652)）

读这段的三个要点：

1. **有一个「当前最好的直连地址」`bestAddr`，并且它有保鲜期。** 地址有效且没过 `trustBestAddrUntil`，就直接发 UDP，不碰中继。
2. **没有可信的直连地址时，同时返回 UDP 地址和 DERP 地址。** 注释写得很直白：走 DERP，UDP 可用的话也一起发。这解释了官方文档里的现象：`tailscale ping` 的前几个包经 DERP，直连建立后才变成直发。
3. **对端的 DERP 地址来自协调服务器下发的网络地图。** 同一个文件 L1726 起的 `updateFromNode` 从 `tailcfg.Node` 里读出 `HomeDERP`，拼成 `derpAddr`；候选端点则来自 `n.Endpoints()`。

那「当前最好的直连地址」是怎么找到的？靠两样东西。

一是 **STUN**（一个让设备查出自己在公网上是什么地址的小协议）。`magicsock.go` 的 `determineEndpoints` 注释写道：它「通过 netcheck 做一次 STUN 查询来确定本机的公网地址」。查出来的候选地址分几种类型，`tailcfg.go` L1413 起定义了 `EndpointLocal`、`EndpointSTUN`、`EndpointPortmapped` 等五个常量。

二是 **disco**，两台设备之间用来互探的加密报文。它的格式写在 `disco/disco.go` 的包注释里：

```go
// disco/disco.go L4-L19
// Package disco contains the discovery message types.
//
// A discovery message is:
//
//	Header:
//
//	magic          [6]byte  // “TS💬” (0x54 53 f0 9f 92 ac)
//	senderDiscoPub [32]byte // nacl public key
//	nonce          [24]byte
//
// The recipient then decrypts the bytes following (the nacl box)
// and then the inner payload structure is:
//
//	messageType     byte  // the MessageType constants below
//	messageVersion  byte  // 0 for now; but always ignore bytes at the end)
//	message-payload [...]byte
```
（[永久链接](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/disco/disco.go#L4-L19)）

同文件 L44 起列出了报文类型：`TypePing`、`TypePong`、`TypeCallMeMaybe`，以及几类给 Peer Relay 用的类型。官方文档说 disco 这套协议「独立于主 WireGuard 数据面，只能影响连接的效率，影响不到数据的安全」，和这里的设计吻合：它是一层单独的加密通道。

**对使用者意味着什么。** 选路是逐包、自动、持续进行的。网络变了（比如从 Wi-Fi 切到手机流量），`bestAddr` 过期，发包会同时走 DERP 和 UDP，直到重新找到可信的直连路径。你不需要配置任何东西；能观察到的只有 `tailscale status` 里的 `direct` 和 `relay`。

DERP 在仓库里的定位，`derp/derp.go` 的包注释说得很清楚：「当找不到或打不开直连路径时，DERP 被用来通过 Tailscale 的云服务器代理**已加密的** WireGuard 包。DERP 是最后手段。」

### 机制二：`tailscale up` 的「防误改」校验

**要解决的问题。** 源码注释里讲了来历：1.6 及更早的版本，用户可能先通告过一个 tag，之后想改另一个设置时忘了再提这个 tag，结果把它**悄悄抹掉了**。

**代码怎么做的。** `up.go` 里这个函数的注释称它为「the up checker」，检查的是「人们运行 `tailscale up` 时只带了原先参数的一个子集」。报错文案是一个常量：

```go
// cmd/tailscale/cli/up.go L1022-L1026
const accidentalUpPrefix = "Error: changing settings via 'tailscale up' requires mentioning all\n" +
	"non-default flags. To proceed, either re-run your command with --reset or\n" +
	"use the command below to explicitly mention the current value of\n" +
	"all non-default settings:\n\n" +
	"\ttailscale up"
```
（[永久链接](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/up.go#L1022-L1026)）

校验的核心循环在同文件 L1065 起：

```go
// cmd/tailscale/cli/up.go L1065-L1087
	if len(flagIsSet) == 0 &&
		curPrefs.Persist != nil &&
		curPrefs.Persist.UserProfile.LoginName != "" &&
		env.backendState != ipn.NeedsLogin.String() {
		// A bare "tailscale up" is a special case to just
		// mean bringing the network up without any changes.
		return true, nil
	}

	// flagsCur is what flags we'd need to use to keep the exact
	// settings as-is.
	flagsCur := prefsToFlags(env, curPrefs)
	flagsNew := prefsToFlags(env, newPrefs)

	var missing []string
	for flagName := range flagsCur {
		valCur, valNew := flagsCur[flagName], flagsNew[flagName]
		if flagIsSet[flagName] {
			continue
		}
		if reflect.DeepEqual(valCur, valNew) {
			continue
		}
```
（[永久链接](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/up.go#L1065-L1087)）

算法是把「当前设置」和「这次命令会产生的新设置」各自翻译成一组参数，再逐个比较：这次没提到的参数，如果新旧值不同，就记进 `missing`。循环后面（L1088 起）还有几条例外，比如 `login-server` 的两个同义地址之间切换不算改动；最后把 `missing` 排序，拼成一条完整的 `tailscale up ...` 命令放进报错里。

有三道闸门值得注意：

- **首次登录不检查。** 函数开头判断 `curPrefs.ControlURL` 为空就直接返回，注释是「首次 up、还没设置控制服务器地址之前不做校验」。
- **不带参数的 `tailscale up` 是特例。** 已登录且不需要重新登录时，它只把网络拉起来，见上面的前八行。
- **`--reset` 跳过整个校验。** `updatePrefs`（L433 起）里，只有没带 `--reset` 时才调用这个检查函数。

另外，哪些参数「不算设置」写在 `preflessFlag`（L995 起）里：`auth-key`、`force-reauth`、`reset`、`qr`、`qr-format`、`json`、`timeout`、`accept-risk` 等。

**对使用者意味着什么。** 这就是教程里那条护栏的来源。同一段 `LongHelp` 的上方还有一句给开发者的话：「新参数优先加到 `tailscale set` 下；通过 `tailscale up` 设置偏好已经不建议使用。」日常改设置用 `set`，就不会撞上这个校验。

顺带两个在同一文件里核实到的默认值：

- `--accept-routes` 的默认值调用了 `ipn/prefs.go` 的 `DefaultRouteAll`：Windows、Android、iOS 返回真；macOS 只有沙盒版返回真；其余为假。（[`prefs.go` L817-L829](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/prefs.go#L817-L829)）
- 默认控制服务器地址是常量 `DefaultControlURL = "https://controlplane.tailscale.com"`；`IsLoginServerSynonym` 把它和 `https://login.tailscale.com` 当成同一个。（[`prefs.go` L39-L54](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/prefs.go#L39-L54)）

### 机制三：CLI 和守护进程怎么通信，谁能写

**要解决的问题。** `tailscaled` 以高权限运行。如果本机任何一个用户都能通过本地 socket 让它改设置，就是一个提权漏洞。

**代码怎么做的。** 分三步。

第一步，**只认本地的连接**。HTTP 入口先过一道检查：

```go
// ipn/localapi/localapi.go L250-L254
	if r.Referer() != "" || r.Header.Get("Origin") != "" || !h.validHost(r.Host) {
		metricInvalidRequests.Add(1)
		http.Error(w, "invalid localapi request", http.StatusForbidden)
		return
	}
```
（[永久链接](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/localapi/localapi.go#L250-L254)）

带 `Referer` 或 `Origin` 的请求直接拒绝，这是在防网页脚本冒充本地程序。`Host` 头默认只接受 `apitype.LocalAPIHost`，源码注释说客户端发送的值是 `local-tailscaled.sock`（L286 起的 `validHost`）。

第二步，**弄清连接方是谁**。`ipnserver` 为每条连接建一个 `actor`，注释说它「通常代表一个具体的操作系统用户」。在 Windows 上，连命名管道时用的是「identification 模拟级别」，源码注释解释了原因：好让 `tailscaled` 拿到对方的令牌信息来做访问控制。

第三步，**按身份给权限**：

```go
// ipn/ipnserver/server.go L336-L355，略去中间九行注释
func (a *actor) Permissions(operatorUID string) (read, write bool) {
	switch envknob.GOOS() {
	case "windows":
		// ...
		return true, true
	case "js", "plan9":
		return true, true
	}
	if a.ci.IsUnixSock() {
		return true, !a.ci.IsReadonlyConn(operatorUID, logger.Discard)
	}
	return false, false
}
```
（[永久链接](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnserver/server.go#L336-L355)）

类 Unix 平台上，读权限恒为真，写权限取决于 `IsReadonlyConn`。这个函数的注释自己也承认名字起得不准：只读同时也意味着不能访问敏感信息，建议把它理解成「IsUnprivileged」（非特权）。

```go
// ipn/ipnauth/ipnauth.go L182-L198
	uid, ok := creds.UserID()
	if !ok {
		logf("connection from peer with unknown userid; read-only")
		return ro
	}
	if uid == "0" {
		logf("connection from userid %v; root has access", uid)
		return rw
	}
	if selfUID := os.Getuid(); selfUID != 0 && uid == strconv.Itoa(selfUID) {
		logf("connection from userid %v; connection from non-root user matching daemon has access", uid)
		return rw
	}
	if operatorUID != "" && uid == operatorUID {
		logf("connection from userid %v; is configured operator", uid)
		return rw
	}
```
（[永久链接](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnauth/ipnauth.go#L158-L208)）

也就是说，能写的只有四种连接方：**root**、**守护进程自己所属的用户**、**`--operator` 指定的用户**、**本地管理员**。其他用户只读，拿不到 UID 的连接也只读。

**对使用者意味着什么。** 这解释了日常会遇到的几件事：

- Linux 上普通用户执行 `sudo tailscale ...`，守护进程看到的是 root，所以能改设置。
- `--operator` 的含义是「允许某个非 root 用户不靠 sudo 操作 `tailscaled`」。但 `ipn/ipnserver/actor.go` L244 起的注释强调了一处边界：在 Linux 上只有 root 算本地管理员，「operator 用户不算，哪怕他能运行 `sudo tailscale`：`tailscaled` 没法知道他有没有通过 sudo 认证，只知道存在这么一条规则」。
- Windows 用的是另一套模型：能连上就有读写权；能不能连上由 `checkConnIdentityLocked`（L255 起）决定，它要求连接方和当前占用者是同一个用户，但始终放行 Windows 的 SYSTEM 账户。

还有一类确认发生在 CLI 这一侧。`up.go` 的 `updatePrefs` 里有两处风险提示：如果你正通过 Tailscale SSH 连着这台机器，执行 `--force-reauth` 或切换 `--ssh` 时，会弹出一条确认（`--accept-risk` 可以跳过）。其中一条的原文是：「You are connected over Tailscale; this action may result in your SSH session disconnecting.」

### 机制四：Tailscale SSH 的内置服务端

**它在哪。** 包名是 `tailssh`，目录是 `ssh/tailssh/`。包注释只有一句：「Package tailssh is an SSH server integrated into Tailscale.」文件开头第 4 行的构建标签限定了平台：Linux、macOS、FreeBSD、OpenBSD、plan9，排除了 Android 和 iOS。入口在 `LocalBackend`：`ListenSSH`（`local.go` L175）装好监听器，`handleSSHConn`（L8694 起）把每条连接交给 `server.HandleSSHConn`（`tailssh.go` L205）。

**身份校验怎么做。** 核心是 `conn` 上的 `clientAuth`（L447），注释写的是：「If access is denied, it returns an error. This must always be an empty `ssh.PartialSuccessError` to prevent further authentication methods from being tried.」函数体先取连接信息，再做策略评估：

```go
// ssh/tailssh/tailssh.go L469-L482，略去空行与一条长注释
	action, localUser, acceptEnv, rule, result := c.evaluatePolicy()
	switch result {
	case accepted:
		// do nothing
	case rejectedUser:
		// ...
		return nil, c.errBanner(fmt.Sprintf("tailnet policy does not permit you to SSH as user %q", c.info.sshUser), nil)
	case rejected, noPolicy:
		return nil, c.errBanner("tailnet policy does not permit you to SSH to this node", fmt.Errorf("failed to evaluate policy, result: %s", result))
	default:
		return nil, c.errBanner("failed to evaluate tailnet policy", fmt.Errorf("failed to evaluate policy, result: %s", result))
	}
```
（[永久链接](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ssh/tailssh/tailssh.go#L441-L526)）

评估出一个 `action` 之后（L511 起），函数进入一个循环，按动作分三种走法：`Accept` 直接返回空的 `ssh.Permissions`；`Reject` 拒绝；`HoldAndDelegate` 则向一个 URL 取回新的动作，再回到循环。最后这一种就是官方文档里的 **check 模式**：连接被「挂起」，等用户在浏览器里重新认证之后才放行。

最有意思的是 L611 起对密码和公钥的处理：

```go
// ssh/tailssh/tailssh.go L611-L622
		PasswordCallback: func(cm ssh.ConnMetadata, pword []byte) (*ssh.Permissions, error) {
			// Some clients don't request 'none' authentication. Instead, they
			// immediately supply a password. We humor them by accepting the
			// password, but authenticate as usual, ignoring the actual value of
			// the password.
			return c.clientAuth(cm)
		},
		PublicKeyCallback: func(cm ssh.ConnMetadata, key ssh.PublicKey) (*ssh.Permissions, error) {
			// Some clients don't request 'none' authentication. Instead, they
			// immediately supply a public key. We humor them by accepting the
			// key, but authenticate as usual, ignoring the actual content of
			// the key.
			return c.clientAuth(cm)
		},
```
（[永久链接](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ssh/tailssh/tailssh.go#L611-L622)）

客户端送来的密码或公钥**被接受，但完全被忽略**，认证仍然走 `clientAuth`。在这个位置，连接已经经由 WireGuard 验证过对端的节点密钥，身份是确定的。

**对使用者意味着什么。**

- 你不需要 `authorized_keys`，不是因为密钥被自动帮你配好了，而是因为认证根本不看密钥。
- 教程「常见坑」里那条 `tailnet policy does not permit you to SSH to this node`，就是上面 L482 这一行打出来的。
- 拒绝时返回的是「空的」`PartialSuccessError`，客户端不会再尝试别的认证方式，所以不会出现反复弹密码的界面。

## 怎么从源码构建 / 跑测试

以下是照仓库说明转述的，**我没有执行**其中任何一条。

**构建。** `README.md` 的 Building 一节写着：仓库始终要求最新的 Go 版本，目前是 Go 1.27；他们发布时用的是自己的 Go 分支，但你不必用它。装出 `tailscale` 和 `tailscaled` 两个二进制的命令是：

```bash
go install tailscale.com/cmd/tailscale{,d}
```
（[`README.md` L38-L57](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/README.md#L38-L57)）

如果你要打包分发，改用 `./build_dist.sh`，它会把提交号和版本信息写进二进制；仓库希望发行版打包时保留这些信息，这样 bug 报告里才有用的版本号。`go.mod` 第 3 行写的是 `go 1.27.4`。

**检查与测试。** `Makefile` 第 73 行的 `check` 目标依次执行 `staticcheck`、`vet`、`depaware` 和四个交叉编译目标；`vet` 用的是 `./tool/go vet ./...`，也就是仓库自带的 Go 包装脚本，不是系统里的 `go`。另有 `lint`（golangci-lint）、`staticcheck` 和 `sshintegrationtest`（在多个 Docker 容器里跑 SSH 集成测试）几个目标。（[`Makefile` L73](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/Makefile#L73)）

仓库里有 858 个 `_test.go` 文件，但**我读到的文档里没有一条写明跑单元测试的命令**，见下文的「推断」。

**安全问题。** `SECURITY.md` 只有一节 Reporting a Vulnerability：私下发邮件给 `security@tailscale.com`，由 Tailscale 的人来分类，并和你一起定披露时间。根目录还有 `CODE_OF_CONDUCT.md` 和 `docs/commit-messages.md`；仓库根目录**没有** `CONTRIBUTING.md`。

## 已验证 / 推断 / 未知

### 已验证（每条都读过对应代码或文档原文）

- 默认控制服务器地址是 `https://controlplane.tailscale.com`，`login.tailscale.com` 被视为同义。依据：[`prefs.go` L39-L54](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/prefs.go#L39-L54)，以及 `tailscale up --help` 的输出。
- `--accept-routes` 的默认值按平台区分。依据：[`prefs.go` L817-L829](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/prefs.go#L817-L829)、[`up.go` L82-L85](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/up.go#L82-L85)。
- `--advertise-tags` 的 `tag:` 前缀可以省略，CLI 会自动补上。依据：[`up.go` L313-L328](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/up.go#L313-L328)。
- `tailscale up` 防误改校验的规则、报错文案和三道闸门。依据：[`up.go` L1022-L1147](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/up.go#L1022-L1147)、同文件 L433-L441。
- 经 Tailscale SSH 连接时执行 `--force-reauth` 会弹风险确认。依据：[`up.go` L462-L466](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/up.go#L462-L466)。
- 本地 API 的权限模型：谁能读、谁能写，以及它拒绝带 `Referer`、`Origin` 的请求。依据：[`server.go` L336-L355](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnserver/server.go#L336-L355)、[`ipnauth.go` L158-L208](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnauth/ipnauth.go#L158-L208)、`localapi.go` L250-L254 与 L286-L307。
- 网络地图经长轮询流式下发，之后是增量更新。依据：[`tailcfg.go` L2010-L2019](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/tailcfg/tailcfg.go#L2010-L2019)、[`direct.go` L1023-L1029](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/control/controlclient/direct.go#L1023-L1029)。
- 包过滤规则取自网络地图，在本地安装。依据：[`local.go` L3591-L3629](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnlocal/local.go#L3591-L3629)。
- 选路规则：有可信的直连地址就直发，否则 DERP 和 UDP 一起发；对端的 DERP 地址和候选端点来自网络地图。依据：[`endpoint.go` L626-L652](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/wgengine/magicsock/endpoint.go#L626-L652)、同文件 L1726-L1787。
- `Node` 结构里带三种公钥、候选端点和 home DERP 区域。依据：[`tailcfg.go` L385-L438](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/tailcfg/tailcfg.go#L385-L438)。
- disco 报文的头格式与消息类型。依据：[`disco.go` L4-L54](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/disco/disco.go#L4-L54)。
- Tailscale SSH 服务端的位置、平台限制、策略评估流程，以及密码和公钥被忽略。依据：[`tailssh.go` L4-L7](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ssh/tailssh/tailssh.go#L4-L7)、L441-L526、L611-L622。
- 仓库规模数字。依据：本页开头列出的 `git ls-files` 命令与输出。
- 构建要求与命令。依据：[`README.md` L38-L57](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/README.md#L38-L57)、`go.mod` 第 3 行、`Makefile` 第 73 行。

### 推断（有线索，但没读到直接证据）

- **`feature/` 目录是构建期的功能开关。** 线索：`up.go` 里的 `buildfeatures.HasQRCodes` 这类判断。没读这个目录本身。
- **Tailscale SSH 的连接由用户态网络栈拦截 22 端口后交给 `handleSSHConn`。** 线索：官方文档写的是「netstack port interception」，以及 `handleSSHConn` 的存在。拦截点的代码没读到。
- **`clientAuth` 里的 `setInfo` 用连接的来源地址查出对端节点和用户。** 线索：官方文档说 `tailscaled` 在网络地图里查来源的 Tailscale IP，从而知道它属于哪个用户或哪些 tag。函数体没读。
- **单元测试用 Go 标准的 `go test` 跑。** 线索：858 个 `_test.go` 文件，以及 Go 的通行做法。读到的仓库文档里没有写这一条。
- **配置 Serve 和 Funnel 时，「共享文件需要 root、转发端口不需要」这条例外由 `connIsLocalAdmin` 一类的检查实现。** 线索：`ipn/ipnserver/actor.go` L230-L231 的注释提到了 `authorizeServeConfigForGOOSAndUserContext`，L202 起的 `connIsLocalAdmin` 强调「避免提权」。授权函数本体没读。
- **教程里 `tailscale up` 报错示例的完整文本。** 依据是 `accidentalUpPrefix` 常量加 L1139-L1146 的拼接顺序推出来的，没有实际触发过。

<!-- TODO: 待核实 —— 单元测试的运行方式（仓库文档未写明） -->
<!-- TODO: 待核实 —— netstack 把 22 端口交给 SSH 服务端的拦截点，以及 clientAuth 中 setInfo 的实现 -->
<!-- TODO: 待核实 —— feature/ 目录（332 个非测试文件）的职责，只看过它在别处的用法 -->

### 未知（没查，或不在本仓库）

- 协调服务器端的实现。它是 Tailscale 托管的，不在这个开源仓库里。
- Peer Relay 的选路与 `relaymanager.go`。本页没有读。
- `tailscaled` 的启动流程（`cmd/tailscaled` 目录）。
- WireGuard 的握手和密钥协商细节。它们在仓库外的 `tailscale/wireguard-go`。
- 硬件与性能相关常量的取舍。比如 `magicsock.go` L87 起把 UDP socket 缓冲区设为 7MB，注释说是 macOS 默认配置支持的上限，我只看到了这条注释，没有深入。

## 继续读什么

按本页出现的顺序，值得整文件读的是这五处：

- [`cmd/tailscale/cli/up.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/up.go#L505)：`tailscale up` 的全部逻辑，从 L505 的 `runUp` 读起；`tailscale ssh` 包装命令的说明在 [`ssh.go` L28-L48](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/ssh.go#L28-L48)。
- [`ipn/localapi/localapi.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/localapi/localapi.go#L71-L97)、[`ipn/ipnserver/server.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnserver/server.go#L200-L225) 与 [`ipn/ipnauth/`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnauth/ipnauth.go#L158-L208)：本地 API 的全部入口，以及连接方身份与权限。
- [`ipn/ipnlocal/local.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnlocal/local.go#L1898-L1910)：客户端中枢，从 `SetControlClientStatus` 读起；控制面协议的数据结构在 [`tailcfg/tailcfg.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/tailcfg/tailcfg.go#L385-L438)。
- [`wgengine/magicsock/endpoint.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/wgengine/magicsock/endpoint.go#L626-L652) 与 `magicsock.go`：选路与端点发现。
- [`ssh/tailssh/tailssh.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ssh/tailssh/tailssh.go#L441-L526)：Tailscale SSH 服务端。

官方背景读物：[Control and data planes](https://tailscale.com/docs/concepts/control-data-planes)、[Tailscale encryption](https://tailscale.com/docs/concepts/tailscale-encryption)、[Tailscale identity](https://tailscale.com/docs/concepts/tailscale-identity)、[Connection types](https://tailscale.com/docs/reference/connection-types)。

本目录的其他页面：[学习地图](./)、[教程](./tailscale)。

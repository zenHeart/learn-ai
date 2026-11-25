---
title: Tailscale source code walkthrough
description: "How one Tailscale connection gets built in the code: the CLI calls LocalAPI over a local socket, LocalBackend loads the network map sent down by the coordination server into wgengine, and magicsock chooses between a direct connection and a DERP relay. This page reads the source code, and every conclusion comes with a permalink to a pinned commit."
domain: product
tags:
  - source-code
  - mesh-vpn
  - go
  - tailscale
role: deep-dive
pageClass: wide-figures
source_revision: da6276d77025ee2bce288c4ccf07b35e14f253a7
---

# Tailscale source code walkthrough: how a connection is built

> **The short version:** Tailscale splits "who may connect to whom" from "how the connection is actually made". The coordination server only sends down public keys, addresses and policy (the control plane); `magicsock` on the device picks between a direct connection and a DERP relay, and encrypts and decrypts with WireGuard (the data plane). **Data never passes through the coordination server.**
>
> Every conclusion on this page was checked against `tailscale/tailscale` commit [`da6276d7`](https://github.com/tailscale/tailscale/tree/da6276d77025ee2bce288c4ccf07b35e14f253a7) (`VERSION.txt` is `1.107.0`); later changes are out of scope. The **verified / inferred / unknown** breakdown is at the end of the page. If you have not used the product yet, read the [tutorial](./tailscale) first.

## Who this is for / who it is not for

- **Who:** engineers who already use Tailscale and want to know how the code actually does what that sentence in the official docs says. You need to be able to read Go; you do not need to know cryptography.
- **Not for:** people who want to learn the WireGuard protocol itself (the encryption handshake lives in another repository, `tailscale/wireguard-go`); people who want to contribute code to Tailscale (this page is a guided tour, not a contributing guide); people who only want to install it and use it (read the [tutorial](./tailscale)).

Each networking term below is explained in plain words the first time it appears.

## Repository map

I measured the size on a local clone of this commit with `git ls-files`: the repository tracks **3,168** files; **1,822** non-test `.go` files (`git ls-files '*.go' | grep -v _test | wc -l`); **858** test files.

| Directory | Responsibility | Where to start reading | Non-test `.go` files / lines |
|------|------|----------------|---------------------------|
| `cmd/tailscale/cli` | Command-line interface | [`up.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/up.go#L47-L71), 1,313 lines in that one file | 82 / 17,709 |
| `cmd/tailscaled` and the root `tailscaled.go` | Daemon entry point | The root `tailscaled.go` (not read for this page) | 20 / 2,856 |
| `cmd/derper` | Implementation of the DERP relay server | Not read for this page | 9 / 2,113 |
| `ipn/ipnserver` | Local API server; decides the caller's permissions | [`server.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnserver/server.go#L200-L225) | 5 / 962 |
| `ipn/localapi` | The HTTP handler functions of the local API | [`localapi.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/localapi/localapi.go#L71-L97) | 10 / 3,754 |
| `ipn/ipnlocal` | `LocalBackend`: the hub of the whole client | `local.go`, 9,718 lines in that one file | 45 / 22,332 |
| `ipn/ipnauth` | "Who is the caller", and whether it has permission | [`ipnauth.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnauth/ipnauth.go#L158-L208) | Not counted for this page |
| `wgengine/magicsock` | Path selection: direct or relayed | [`magicsock.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/wgengine/magicsock/magicsock.go#L4-L5), `endpoint.go` | 26 / 11,662 |
| `wgengine/router`, `filter`, `netstack` | Changes the system routing table, packet filtering, the userspace network stack | This page only got as far as the call sites of `filter` | 14 / 4,787; 5 / 1,214; 11 / 3,362 |
| `derp` and `derp/derphttp` | The DERP protocol and its HTTP client | [`derp.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/derp/derp.go#L4-L12) | 22 / 8,550; 4 / 1,511 |
| `disco` | The discovery message format used between devices | [`disco.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/disco/disco.go#L4-L19) | 2 / 698 |
| `control/controlclient` | Talks to the coordination server | `direct.go`, `auto.go` | 10 / 4,538 |
| `control/controlhttp` | HTTP transport for the control plane connection | Not read for this page | 6 / 1,026 |
| `tailcfg` | The data structures sent to and from the coordination server | [`tailcfg.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/tailcfg/tailcfg.go#L385-L438) | 9 / 8,441 |
| `ssh/tailssh` | The built-in Tailscale SSH server | [`tailssh.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ssh/tailssh/tailssh.go#L4-L7) | Whole `ssh` directory 25 / 9,399 |
| `client/local` | Go client for the local API | `local.go` (not read for this page) | 10 / 2,614 |
| `safesocket` | The local socket the CLI uses to reach the daemon | [`safesocket.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/safesocket/safesocket.go#L4-L6) | 8 / 1,070 |
| `types`, `net/dns`, `health`, `hostinfo`, `tsnet` | Shared types; DNS and MagicDNS; health warnings; reporting of local machine information; the library for embedding | None read for this page | 65 / 9,568; 40 / 10,788; 7 / 2,074; 9 / 1,152; 12 / 3,352 |

Two things to notice in the table. **The largest blocks by lines of code are `ipn` (105 files, 38,926 lines) and `wgengine/magicsock`**: most of the code is in client state management and path selection, not in encryption itself, which lives in `wireguard-go` outside the repository. **The directory with the most files is `feature`, with 332 non-test files**: it is not in the table above, because I only saw how it is used elsewhere and did not read the directory itself; see "Inferred" at the end.

The local clone is a **shallow clone** with only this one commit, so this page draws no conclusions about how the code evolved.

## Architecture and data flow

Before looking at the diagram, keep this question in mind: **after you type a `tailscale` command in the terminal, which processes and packages does it pass through before it takes effect, and at which layer do the coordination server and the DERP relay each attach?**

<DocDiagram src="/diagrams/tailscale-code-map.en.svg" alt="This layered architecture diagram answers one question: after a tailscale command leaves the terminal, which processes and packages does it pass through before it reaches WireGuard, and where do the control plane and the relay attach? From top to bottom: the tailscale command line, whose source lives in cmd/tailscale/cli; the local socket, a Unix socket or a Windows named pipe implemented by safesocket; the LocalAPI HTTP server, made of ipn/ipnserver and ipn/localapi; LocalBackend, in ipn/ipnlocal; wgengine, which contains router, filter, and netstack; magicsock, in wgengine/magicsock; and finally wireguard-go, a dependency outside the repository that sends and receives over UDP. The arrows show the direction of calls and data. The command line sends HTTP requests to the LocalAPI over the local socket, and requests only go from the command line to the daemon. The LocalAPI first checks the caller's permission, read-only or read-write, and then calls LocalBackend. LocalBackend passes the network map and packet filter rules down to wgengine. wgengine hands endpoints and path selection to magicsock. magicsock encrypts and decrypts with wireguard-go. The LocalAPI listens only on the local socket and is never exposed. On the left is the control plane: control/controlclient makes long-polling requests to the coordination server, the coordination server sends the network map back, and controlclient then calls back into LocalBackend; this line carries only public keys, addresses, and policy, and the coordination server is not on the data path. On the right is the relay: magicsock connects to DERP servers through derp and derp/derphttp in order to negotiate connections and to fall back to relaying; DERP relays only encrypted packets. This diagram leaves out the internals of Peer Relay and Tailnet Lock, and the further modules inside each package." :width="960" lang="en" />

> **What the diagram is based on:** the call chain, and the fact that the LocalAPI listens only on the local socket, were checked against the source [`localapi.go` L71–L97](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/localapi/localapi.go#L71-L97), [`ipnserver/server.go` L200–L225](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnserver/server.go#L200-L225) and [`ipnlocal/local.go` L1898–L1910](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnlocal/local.go#L1898-L1910); the control plane callback against [`controlclient/direct.go` L1023–L1029](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/control/controlclient/direct.go#L1023-L1029); endpoint discovery against [`magicsock/endpoint.go` L626–L652](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/wgengine/magicsock/endpoint.go#L626-L652). All are commit `da6276d7` (the v1.107.0 line). The diagram keeps the seven-level call chain from the command line to wireguard-go, and the points where the control plane and the relay each attach; it leaves out the internals of Peer Relay and Tailnet Lock, and the further modules inside each package. The coordination server is not on the data path, the LocalAPI does not listen on the network, and DERP only forwards encrypted packets.

The relationships in the diagram split into three lines: the middle column is the local call chain, the left is the control plane and the right is the relay. Below we walk the middle line first, then the left one; the right-hand line lives in `magicsock` and is covered in Mechanism 1 under "Key mechanisms in depth".

**The middle column is the local line: how a command becomes a setting.** The official split between the binaries is this: `tailscale` (or `tailscale.exe`) is the command line, and `tailscaled` (note the extra `d` at the end) is the privileged daemon that does all the network processing. The CLI never touches the network itself; it connects to the daemon through `safesocket`. The package describes itself as creating "either a Unix socket, if possible, or otherwise a localhost TCP connection"; on Windows the implementation is a named pipe.

Once connected, the traffic is HTTP, and every path sits under the `/localapi/v0/` prefix. `localapi.go` registers all the entry points in one table; here is an excerpt:

```go
// localapi.go L78-L94, excerpt
	"check-prefs":          (*Handler).serveCheckPrefs,
	"derpmap":              (*Handler).serveDERPMap,
	"login-interactive":    (*Handler).serveLoginInteractive,
	"logout":               (*Handler).serveLogout,
	"ping":                 (*Handler).servePing,
	"prefs":                (*Handler).servePrefs,
	"start":                (*Handler).serveStart,
	"status":               (*Handler).serveStatus,
```
([permalink](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/localapi/localapi.go#L71-L97))

**On the left is the remote line: how the network map comes down.** The network map (netmap) is the "contact list" the coordination server hands to each device: who I am, which nodes I can see, each node's public key and address, and what the policy is. It is streamed down over one long-lived connection:

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
([permalink](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/tailcfg/tailcfg.go#L2010-L2019))

The client side is pulled by `control/controlclient`. The comment on `sendMapRequest` in `direct.go` states that it makes a `/map` request to download the network map, and that "if isStreaming, it will poll forever". The comment on `MapRequest` in `tailcfg.go` gives the address: `POST https://<control-plane>/machine/map`. ([`direct.go` L1023-L1029](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/control/controlclient/direct.go#L1023-L1029), [`tailcfg.go` L1452-L1460](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/tailcfg/tailcfg.go#L1452-L1460))

When a new map arrives, this callback on `LocalBackend` is triggered:

```go
// ipn/ipnlocal/local.go L1898-L1910, with the four lines in the middle left out
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
([permalink](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnlocal/local.go#L1898-L1910))

The three things the comment mentions map to three places in the code: updating the network map is `setNetMapLocked` (from L7717), and installing the packet filter rules is `updateFilterLocked` (from L3591). In `updateFilterLocked` I saw that the filter rules are taken directly from the current node's network map (`cn.PacketFilter()`). In other words, **the coordination server computes the access policy, sends it down, and each device enforces it locally**. This agrees with the official docs: the rules are enforced directly on each device, with no further involvement from the coordination server.

Last, what one node in the map looks like. Below are the connection-related fields of the `Node` struct, with the unrelated fields in between left out as `// ...`:

```go
// tailcfg.go L385-L438, excerpt
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
([permalink](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/tailcfg/tailcfg.go#L385-L438))

The three public key fields correspond to the three identities in the official docs: `Key` is the node key (used by WireGuard), `Machine` is the machine key (it proves to the coordination server that "I am this physical device"), and `DiscoKey` is the key the discovery protocol uses. `Endpoints` lists every address this device might be reached on, and `HomeDERP` is its "home" relay. Note that **only public keys** appear here, which matches the official statement that devices "only exchange their public keys" and that private keys never leave the device.

## Key mechanisms in depth

### Mechanism 1: who decides between a direct connection and a relay

**The problem.** There may be many paths between two nodes: each side's LAN address, the public address found through STUN, addresses from port mapping, plus a DERP relay. When each packet goes out, which path does it take?

**How the code does it.** The `magicsock` package describes itself as "a socket that can change its communication path while in use, actively searching for the best way to communicate". In its `endpoint.go`, each peer node has one `endpoint`, and before a packet is sent this function is called:

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
([permalink](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/wgengine/magicsock/endpoint.go#L626-L652))

Three points to take from this code:

1. **There is a "current best direct address", `bestAddr`, and it has a shelf life.** If the address is valid and `trustBestAddrUntil` has not passed, the packet goes out over UDP directly and the relay is not touched.
2. **When there is no trusted direct address, it returns a UDP address and a DERP address at the same time.** The comment puts it plainly: send over DERP, and over UDP too if it is available. This explains the behavior the official docs describe: the first few `tailscale ping` packets go through DERP, and packets go direct once a direct connection is established.
3. **The peer's DERP address comes from the network map sent down by the coordination server.** `updateFromNode`, from L1726 in the same file, reads `HomeDERP` out of the `tailcfg.Node` and assembles `derpAddr`; the candidate endpoints come from `n.Endpoints()`.

So how is the "current best direct address" found? By two things.

The first is **STUN**, a small protocol that lets a device find out what its address is on the public internet. The comment on `determineEndpoints` in `magicsock.go` says it "does a STUN lookup (via netcheck) to determine its public address". The candidate addresses it finds fall into several types; from L1413, `tailcfg.go` defines five constants such as `EndpointLocal`, `EndpointSTUN` and `EndpointPortmapped`.

The second is **disco**, encrypted messages that two devices use to probe each other. Its format is written in the package comment of `disco/disco.go`:

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
([permalink](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/disco/disco.go#L4-L19))

From L44 the same file lists the message types: `TypePing`, `TypePong`, `TypeCallMeMaybe`, and several types for Peer Relay. The official docs say the disco protocol is "separate from the main WireGuard data plane", and that it can only affect how well connections perform, not how secure the data is. That fits the design here: it is a separate encrypted channel.

**What this means for you.** Path selection happens per packet, automatically and continuously. When the network changes (for example from Wi-Fi to mobile data), `bestAddr` expires and packets go out over both DERP and UDP until a trusted direct path is found again. You do not need to configure anything; the only visible part is `direct` and `relay` in `tailscale status`.

The package comment in `derp/derp.go` states clearly what DERP is for in this repository: "DERP is used by Tailscale nodes to proxy **encrypted** WireGuard packets through the Tailscale cloud servers when a direct path cannot be found or opened. DERP is a last resort."

### Mechanism 2: the `tailscale up` check against accidental setting changes

**The problem.** A source comment gives the history: in 1.6 and earlier, a user might have advertised a tag, then forgotten to mention that tag again when changing one other setting, and so **silently wiped it out**.

**How the code does it.** The comment on this function in `up.go` calls it the "up checker" and says it checks for people running `tailscale up` with a subset of the flags they originally ran it with. The error message is a constant:

```go
// cmd/tailscale/cli/up.go L1022-L1026
const accidentalUpPrefix = "Error: changing settings via 'tailscale up' requires mentioning all\n" +
	"non-default flags. To proceed, either re-run your command with --reset or\n" +
	"use the command below to explicitly mention the current value of\n" +
	"all non-default settings:\n\n" +
	"\ttailscale up"
```
([permalink](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/up.go#L1022-L1026))

The core loop of the check is in the same file from L1065:

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
([permalink](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/up.go#L1065-L1087))

The algorithm translates the current settings and the new settings this command would produce into two sets of flags, then compares them one by one: a flag that is not mentioned this time goes into `missing` if its old and new values differ. After the loop (from L1088) there are a few exceptions, such as switching between the two synonymous `login-server` addresses, which does not count as a change. Finally `missing` is sorted and assembled into a complete `tailscale up ...` command that goes into the error message.

Pay attention to three gates:

- **No check before the first login.** At the top of the function, an empty `curPrefs.ControlURL` returns immediately; the comment says "Don't validate things on initial `up` before a control URL has been set."
- **`tailscale up` with no flags is a special case.** When you are logged in and do not need to log in again, it only brings the network up; see the first eight lines above.
- **`--reset` skips the whole check.** In `updatePrefs` (from L433), this check function is called only when `--reset` is not given.

Separately, which flags "do not count as settings" is written in `preflessFlag` (from L995): `auth-key`, `force-reauth`, `reset`, `qr`, `qr-format`, `json`, `timeout`, `accept-risk` and others.

**What this means for you.** This is where that guardrail in the tutorial comes from. Just above the same `LongHelp` there is one more sentence for developers: when adding new flags, prefer to put them under `tailscale set` instead of here, because setting preferences via `tailscale up` is deprecated. For everyday setting changes, use `set` and you will not run into this check.

Two more defaults verified in the same file:

- The default for `--accept-routes` calls `DefaultRouteAll` in `ipn/prefs.go`: it returns true on Windows, Android and iOS; on macOS only the sandboxed build returns true; everything else is false. ([`prefs.go` L817-L829](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/prefs.go#L817-L829))
- The default coordination server address is the constant `DefaultControlURL = "https://controlplane.tailscale.com"`; `IsLoginServerSynonym` treats it and `https://login.tailscale.com` as the same. ([`prefs.go` L39-L54](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/prefs.go#L39-L54))

### Mechanism 3: how the CLI and the daemon communicate, and who can write

**The problem.** `tailscaled` runs with high privileges. If any user on the machine could make it change settings through the local socket, that would be a privilege-escalation security issue.

**How the code does it.** In three steps.

Step 1, **accept local connections only**. The HTTP entry point passes through a check first:

```go
// ipn/localapi/localapi.go L250-L254
	if r.Referer() != "" || r.Header.Get("Origin") != "" || !h.validHost(r.Host) {
		metricInvalidRequests.Add(1)
		http.Error(w, "invalid localapi request", http.StatusForbidden)
		return
	}
```
([permalink](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/localapi/localapi.go#L250-L254))

Requests that carry a `Referer` or an `Origin` are rejected outright; this stops a web page script from impersonating a local program. The `Host` header accepts only `apitype.LocalAPIHost` by default, and a source comment says the client sends the value `local-tailscaled.sock` (`validHost`, from L286).

Step 2, **work out who the caller is**. `ipnserver` creates an `actor` for each connection; a comment says it "typically represents a specific OS user". On Windows, the named pipe connection uses the "identification impersonation level", and a source comment explains why: "so that tailscaled may obtain information about our token for access control purposes".

Step 3, **grant permissions by identity**:

```go
// ipn/ipnserver/server.go L336-L355, with the nine comment lines in the middle left out
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
([permalink](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnserver/server.go#L336-L355))

On Unix-like platforms the read permission is always true, and the write permission depends on `IsReadonlyConn`. The comment on this function admits that the name is inaccurate: read-only also means not allowed to access sensitive information, and it suggests reading the name as "IsUnprivileged".

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
([permalink](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnauth/ipnauth.go#L158-L208))

So only four kinds of caller can write: **root**, **the user the daemon itself runs as**, **the user named by `--operator`**, and **local administrators**. Other users are read-only, and so are connections whose UID cannot be obtained.

**What this means for you.** This explains a few things you run into day to day:

- When a normal user on Linux runs `sudo tailscale ...`, the daemon sees root, so the settings can be changed.
- `--operator` exists to allow a local user "to operate `tailscaled` without being root or using sudo". But the comment from L244 in `ipn/ipnserver/actor.go` stresses one boundary: on Linux only root counts as a local administrator, and "the operator user is not, even if they could run `sudo tailscale`: tailscaled cannot tell whether they have authenticated to sudo, only that a rule exists".
- Windows uses a different model: whoever can connect has read and write access; whether a connection is allowed is decided by `checkConnIdentityLocked` (from L255), which requires the caller to be the same user as the one who currently owns it, but always lets the Windows SYSTEM account through.

One more kind of confirmation happens on the CLI side. `updatePrefs` in `up.go` has two risk prompts: if you are connected to this machine over Tailscale SSH, running `--force-reauth` or toggling `--ssh` brings up a confirmation (`--accept-risk` skips it). The text of one of them is: "You are connected over Tailscale; this action may result in your SSH session disconnecting."

### Mechanism 4: the built-in Tailscale SSH server

**Where it is.** The package is `tailssh`, in the directory `ssh/tailssh/`. The package comment is one sentence: "Package tailssh is an SSH server integrated into Tailscale." The build tag on line 4 of the file limits the platforms: Linux, macOS, FreeBSD, OpenBSD and plan9, which leaves out Android and iOS. The entry point is in `LocalBackend`: `ListenSSH` (`local.go` L175) sets up the listener, and `handleSSHConn` (from L8694) hands each connection to `server.HandleSSHConn` (`tailssh.go` L205).

**How identity is checked.** The core is `clientAuth` on `conn` (L447). Its comment says: "If access is denied, it returns an error. This must always be an empty `ssh.PartialSuccessError` to prevent further authentication methods from being tried." The function body first gets the connection information, then evaluates the policy:

```go
// ssh/tailssh/tailssh.go L469-L482, with blank lines and one long comment left out
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
([permalink](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ssh/tailssh/tailssh.go#L441-L526))

Once the evaluation produces an `action` (from L511), the function enters a loop with three branches: `Accept` returns empty `ssh.Permissions` directly; `Reject` denies; `HoldAndDelegate` fetches a new action from a URL and goes back to the loop. The last one is the **check mode** of the official docs: the connection is "held" until the user re-authenticates in the browser, and only then is it let through.

The most interesting part is how the password and public key are handled, from L611:

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
([permalink](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ssh/tailssh/tailssh.go#L611-L622))

The password or public key the client sends is **accepted but completely ignored**; authentication still goes through `clientAuth`. At this point the connection has already verified the peer's node key through WireGuard, so the identity is settled.

**What this means for you.**

- You do not need `authorized_keys`, not because keys are set up for you automatically, but because authentication does not look at keys at all.
- The `tailnet policy does not permit you to SSH to this node` message in the tutorial's "Common pitfalls" table is printed by the L482 line above.
- On rejection it returns an "empty" `PartialSuccessError`, so the client does not try other authentication methods, and you do not get a password prompt that keeps popping up.

## How to build from source / run tests

The following is paraphrased from the repository's own instructions. **I did not run** any of it.

**Build.** The Building section of `README.md` says the repository always requires the latest Go release, currently Go 1.27; they build releases with their own Go fork, but you do not have to use it. The command that installs the two binaries, `tailscale` and `tailscaled`, is:

```bash
go install tailscale.com/cmd/tailscale{,d}
```
([`README.md` L38-L57](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/README.md#L38-L57))

If you are packaging it for distribution, use `./build_dist.sh` instead; it burns the commit ID and version information into the binaries. The repository asks distro packagers to keep that information, so that bug reports contain a useful version number. Line 3 of `go.mod` says `go 1.27.4`.

**Checks and tests.** The `check` target on line 73 of the `Makefile` runs `staticcheck`, `vet`, `depaware` and four cross-compilation targets in turn; `vet` uses `./tool/go vet ./...`, which is the Go wrapper script shipped in the repository, not the system `go`. There are also targets for `lint` (golangci-lint), `staticcheck` and `sshintegrationtest` (runs the SSH integration tests in several Docker containers). ([`Makefile` L73](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/Makefile#L73))

The repository has 858 `_test.go` files, but **none of the documentation I read states the command for running unit tests**; see "Inferred" below.

**Security issues.** `SECURITY.md` has one section, Reporting a Vulnerability: email `security@tailscale.com` privately, Tailscale's people triage it, and the disclosure date is agreed with you. The root also has `CODE_OF_CONDUCT.md` and `docs/commit-messages.md`; there is **no** `CONTRIBUTING.md` in the repository root.

## Verified / inferred / unknown

### Verified (each item was checked against the code or the original documentation)

- The default coordination server address is `https://controlplane.tailscale.com`, and `login.tailscale.com` is treated as a synonym. Evidence: [`prefs.go` L39-L54](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/prefs.go#L39-L54), plus the output of `tailscale up --help`.
- The default for `--accept-routes` differs by platform. Evidence: [`prefs.go` L817-L829](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/prefs.go#L817-L829), [`up.go` L82-L85](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/up.go#L82-L85).
- The `tag:` prefix of `--advertise-tags` can be left out; the CLI adds it automatically. Evidence: [`up.go` L313-L328](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/up.go#L313-L328).
- The rules of the `tailscale up` check against accidental setting changes, its error message and its three gates. Evidence: [`up.go` L1022-L1147](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/up.go#L1022-L1147), and L433-L441 in the same file.
- Running `--force-reauth` while connected over Tailscale SSH brings up a risk confirmation. Evidence: [`up.go` L462-L466](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/up.go#L462-L466).
- The permission model of the local API: who can read, who can write, and that it rejects requests carrying `Referer` or `Origin`. Evidence: [`server.go` L336-L355](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnserver/server.go#L336-L355), [`ipnauth.go` L158-L208](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnauth/ipnauth.go#L158-L208), and `localapi.go` L250-L254 and L286-L307.
- The network map is streamed down over a long poll, followed by incremental updates. Evidence: [`tailcfg.go` L2010-L2019](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/tailcfg/tailcfg.go#L2010-L2019), [`direct.go` L1023-L1029](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/control/controlclient/direct.go#L1023-L1029).
- The packet filter rules are taken from the network map and installed locally. Evidence: [`local.go` L3591-L3629](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnlocal/local.go#L3591-L3629).
- The path selection rule: send directly when there is a trusted direct address, otherwise send over both DERP and UDP; the peer's DERP address and candidate endpoints come from the network map. Evidence: [`endpoint.go` L626-L652](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/wgengine/magicsock/endpoint.go#L626-L652), and L1726-L1787 in the same file.
- The `Node` struct carries three public keys, the candidate endpoints and the home DERP region. Evidence: [`tailcfg.go` L385-L438](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/tailcfg/tailcfg.go#L385-L438).
- The header format and message types of disco messages. Evidence: [`disco.go` L4-L54](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/disco/disco.go#L4-L54).
- Where the Tailscale SSH server is, its platform limits, the policy evaluation flow, and that the password and public key are ignored. Evidence: [`tailssh.go` L4-L7](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ssh/tailssh/tailssh.go#L4-L7), L441-L526, L611-L622.
- The repository size numbers. Evidence: the `git ls-files` command and output given near the top of this page.
- Build requirements and commands. Evidence: [`README.md` L38-L57](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/README.md#L38-L57), line 3 of `go.mod`, line 73 of the `Makefile`.

### Inferred (there are clues, but I did not read direct evidence)

- **The `feature/` directory holds build-time feature switches.** Clue: checks like `buildfeatures.HasQRCodes` in `up.go`. I did not read the directory itself.
- **Tailscale SSH connections are intercepted on port 22 by the userspace network stack and then handed to `handleSSHConn`.** Clue: the official docs say "netstack port interception", and `handleSSHConn` exists. I did not read the code at the interception point.
- **`setInfo` in `clientAuth` uses the source address of the connection to look up the peer node and user.** Clue: the official docs say `tailscaled` looks up the source Tailscale IP in the network map, which tells it which user or tags the connection belongs to. I did not read the function body.
- **Unit tests are run with Go's standard `go test`.** Clue: the 858 `_test.go` files, and standard Go practice. The repository documentation I read does not state this.
- **When Serve and Funnel are configured, the exception where "sharing files needs root but forwarding ports does not" is implemented by a check like `connIsLocalAdmin`.** Clue: the comment at L230-L231 in `ipn/ipnserver/actor.go` mentions `authorizeServeConfigForGOOSAndUserContext`, and `connIsLocalAdmin` from L202 stresses the need to "avoid privilege escalation". I did not read the authorization function itself.
- **The full text of the `tailscale up` error example in the tutorial.** It was derived from the `accidentalUpPrefix` constant plus the assembly order at L1139-L1146, and was never actually triggered.

<!-- TODO: needs verification — how unit tests are run (the repository documentation does not say) -->
<!-- TODO: needs verification — the interception point where netstack hands port 22 to the SSH server, and the implementation of setInfo in clientAuth -->
<!-- TODO: needs verification — what the feature/ directory (332 non-test files) is responsible for; I have only seen how it is used elsewhere -->

### Unknown (not investigated, or not in this repository)

- The server side of the coordination server. It is hosted by Tailscale and is not in this open source repository.
- Peer Relay path selection and `relaymanager.go`. This page did not read them.
- The startup sequence of `tailscaled` (the `cmd/tailscaled` directory).
- The details of the WireGuard handshake and key negotiation. They are in `tailscale/wireguard-go`, outside this repository.
- The trade-offs behind hardware and performance constants. For example, from L87 `magicsock.go` sets the UDP socket buffer to 7MB, and the comment says that is the maximum supported by a default macOS configuration. I only saw this comment and did not go deeper.

## What to read next

In the order they appear on this page, these five places are worth reading in full:

- [`cmd/tailscale/cli/up.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/up.go#L505): all the logic of `tailscale up`; start from `runUp` at L505. The wrapper command `tailscale ssh` is explained in [`ssh.go` L28-L48](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/cmd/tailscale/cli/ssh.go#L28-L48).
- [`ipn/localapi/localapi.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/localapi/localapi.go#L71-L97), [`ipn/ipnserver/server.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnserver/server.go#L200-L225) and [`ipn/ipnauth/`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnauth/ipnauth.go#L158-L208): every entry point of the local API, plus the caller's identity and permissions.
- [`ipn/ipnlocal/local.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ipn/ipnlocal/local.go#L1898-L1910): the hub of the client; start from `SetControlClientStatus`. The data structures of the control plane protocol are in [`tailcfg/tailcfg.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/tailcfg/tailcfg.go#L385-L438).
- [`wgengine/magicsock/endpoint.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/wgengine/magicsock/endpoint.go#L626-L652) and `magicsock.go`: path selection and endpoint discovery.
- [`ssh/tailssh/tailssh.go`](https://github.com/tailscale/tailscale/blob/da6276d77025ee2bce288c4ccf07b35e14f253a7/ssh/tailssh/tailssh.go#L441-L526): the Tailscale SSH server.

Official background reading: [Control and data planes](https://tailscale.com/docs/concepts/control-data-planes), [Tailscale encryption](https://tailscale.com/docs/concepts/tailscale-encryption), [Tailscale identity](https://tailscale.com/docs/concepts/tailscale-identity), [Connection types](https://tailscale.com/docs/reference/connection-types).

Other pages in this directory: [learning map](./), [tutorial](./tailscale).

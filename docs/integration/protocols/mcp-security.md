---
title: MCP Security and Authorization Essentials
description: Key security requirements from the MCP specification version 2026-07-28 - authorization, transport and state handling, and attack mitigations - with a checklist for server authors.
domain: tech
tags:
  - protocol
  - mcp
  - security
---

# MCP Security and Authorization Essentials

**Bottom line**: MCP authorization is OAuth-based and applies to HTTP-style transports. A server must accept only tokens issued for itself, must never pass client tokens upstream, and must validate `Origin` when it listens locally. The 2026-07-28 revision removes protocol-level sessions, so cross-request state needs handles that are unguessable and bound to an authenticated user.

> **Audience**: engineers building or reviewing MCP servers and clients.
> **Prerequisites**: [MCP Implementation Guide](./mcp) and basic OAuth 2.x vocabulary.
> **Non-goal**: this is not a replacement for the specification. Version scope: only specification version **2026-07-28** (page headers read "latest"), four pages, fetched 2026-10-21.

Not covered because those pages were outside the fetch budget: the Authorization sub-pages (server discovery, client registration, security considerations) and the Client ID Metadata Document page. Some bold MUST sentences could not be matched verbatim and are not quoted here.

## Authorization

- Authorization support is optional. When supported, **HTTP-based transports** should follow this flow; stdio should obtain credentials from the environment instead. Other transports must follow their established security best practices.
- Before starting the flow, a client must obtain a client ID through one of three mechanisms: Client ID Metadata Documents, pre-registration, or dynamic client registration.
- **Scopes**: follow least privilege. Servers should put a `scope` parameter in the `WWW-Authenticate` 401 challenge so clients know what to request. For step-up, request the union of previously requested scopes and the challenged scopes, so earlier grants are kept.
- **Tokens**: clients must implement RFC 8707 resource indicators, and the `resource` parameter identifies the target MCP server. Servers act as OAuth 2.1 resource servers and validate access tokens per section 5.2.
- **Response validation**: before sending an authorization code to any token endpoint, the client must perform the RFC 9207 check. This is the main mitigation for mix-up attacks.
- Authorization-server implementation details are out of scope for the spec.

## Transport and state

- Protocol metadata travels in the message body under `_meta.io.modelcontextprotocol/*`. Streamable HTTP mirrors selected fields into headers, but the body stays the single source of truth. A server that processes the body must reject requests whose headers disagree with it.
- Custom transports must keep the JSON-RPC message format, message schema and per-request metadata model.
- Streamable HTTP servers **must** validate `Origin` and reject an invalid supplied origin with HTTP 403. The spec **recommends** localhost-only binding for local servers and authentication for all connections (SHOULD, rather than MUST). These protections address DNS rebinding from remote web pages.
- 2026-07-28 removes protocol-level sessions. Servers that need cross-request state issue their own **handles** (a cart ID, a workflow ID), and clients pass them back as ordinary tool arguments. Earlier revisions used connection-level sessions with an initialize handshake.

## Attacks and mitigations

| Attack | Description | Mitigation in the spec |
| --- | --- | --- |
| Confused deputy | A proxy MCP server uses a static client ID with a third-party authorization server. After one user consents, the consent cookie lets a newly registered malicious client skip the consent page, and the code goes to the attacker. | Implement **per-client consent**: keep a per-user registry of approved client IDs and check it before third-party authorization; show client name, scopes and redirect URI on the consent page; add CSRF and clickjacking protection; use random, single-use, short-lived `state`; match `redirect_uri` exactly; set consent cookies only **after** the user approves. |
| Token passthrough | A server accepts client tokens without checking they were issued for it and forwards them downstream. | Forbidden. Accept only tokens issued for this server, validate per OAuth 2.1 section 5.2, and use separate upstream tokens. Downstream rate limits and monitoring are otherwise bypassed. |
| SSRF during metadata discovery | A malicious server puts internal URLs in `resource_metadata`, `authorization_servers` or `token_endpoint`. | Require HTTPS for OAuth URLs in production (loopback excepted); block private, reserved and link-local ranges; do not write your own IP validation, because octal, hex and IPv4-mapped IPv6 encodings defeat custom parsers; validate redirects hop by hop; use an egress proxy on server deployments. |
| State handle hijacking | An attacker obtains or guesses a handle and reads or writes another user's state. | Never treat possession of a handle as authentication. Validate every inbound request, generate unpredictable handles, bind them server-side to the authenticated identity, and expire them. |
| Local server compromise | Malicious startup commands or payloads run with the client's privileges. | Require consent before running one-click configurations and show the full command without truncation. Run in a sandbox with least privilege and restricted file and network access. Use authorization tokens or restricted IPC for HTTP transports. |
| Mix-up | A malicious authorization server tricks the client into sending another server's code or token to it. | RFC 9207 issuer validation. PKCE alone is not enough, because the `code_verifier` goes to the attacker's token endpoint; resource indicators also do not help here. |
| Over-broad scopes | Listing every scope in `scopes_supported` makes tokens carry far more than an operation needs. | Request only necessary scopes and return precise scope guidance in challenges. |

The 2026-07-28 page points to the 2025-11-25 "Session Hijacking" section for servers that still allocate session IDs.

## Checklist for MCP server authors

1. Decide the transport first. HTTP-style transports use the authorization spec; others follow the protocol's security best practices.
2. Accept only tokens issued for your server, and validate them as an OAuth 2.1 resource server.
3. Never forward a client token to an upstream API.
4. Give 401 responses precise `scope` guidance, and support step-up with the union rule.
5. Validate the RFC 9207 issuer check before redeeming any authorization code.
6. Validate `Origin`, bind to localhost, and authenticate every connection when running locally.
7. Treat the request body as authoritative and reject header/body mismatches.
8. Bind state handles to the authenticated user, and make them unpredictable and expiring.
9. For proxy servers, implement per-client consent and set consent cookies only after approval.
10. In OAuth discovery, enforce HTTPS and block private ranges with a vetted library.

## Common pitfalls

- Believing a 127.0.0.1 binding is enough. Without Origin validation, DNS rebinding reaches it.
- Relying on PKCE to stop mix-up attacks.
- Treating a handle or session ID as proof of identity.
- Writing custom IP filters.

## Next steps

- Build a server in the [MCP Lab example](../../../examples/mcp-lab/README.md) and walk it through the checklist.
- Read the 2025-11-25 Security Best Practices if you still support session-based clients.

## Sources

Fetched 2026-10-21, specification version 2026-07-28:

- <https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization>
- <https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices>
- <https://modelcontextprotocol.io/specification/2026-07-28/basic/transports>
- <https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http>

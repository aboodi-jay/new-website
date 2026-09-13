---
title: Markdown Cheatsheet & Feature Demo
date: 2026-09-13
tags: [meta, markdown, demo]
---

This post exists purely to demonstrate every markdown feature the site supports — use it as a reference when writing real posts, or just delete it once you don't need it anymore.

## Headings

This is an `##` heading — both `##` and `###` headings automatically show up in the **On this page** panel to the right.

### A smaller subheading

Headings get their own anchor link too, so you can deep-link straight to a section.

## Text formatting

Plain text, **bold text**, *italic text*, ***bold and italic***, ~~strikethrough~~, and `inline code` all work as expected. You can also mix them — like a **bold word with `inline code` inside it**.

A [link to an external site](https://portswigger.net/web-security) works normally, and so does a bare autolink: <https://owasp.org>.

## Blockquotes

> A blockquote is good for pulling out a key finding or a quoted response from a client.
>
> It can span multiple paragraphs too.

## Lists

Unordered:

- Recon
- Enumeration
- Exploitation
  - Nested items work
  - Two levels deep is usually as far as you should go
- Reporting

Ordered:

1. Identify the endpoint
2. Send a baseline request
3. Modify the parameter
4. Confirm the behavior change

Task list (from GitHub-flavored markdown):

- [x] Confirm the vulnerability
- [x] Capture request/response evidence
- [ ] Write remediation advice
- [ ] Submit report

## Code blocks

Every code block gets automatic syntax highlighting and a **copy button** (hover over it, or on mobile it's just always visible).

```bash
# recon
nmap -sV -p- 10.10.14.22
curl -s http://10.10.14.22:8080/api/health | jq
```

```python
import requests

resp = requests.post(
    "https://acme-corp.example/api/reset-password",
    json={"user_id": 4821, "new_password": "hunter2"},
    headers={"Authorization": f"Bearer {token}"},
)
print(resp.status_code, resp.json())
```

```sql
SELECT username, password_hash
FROM users
WHERE id = 4821; -- no ownership check on this query
```

```json
{
  "success": true,
  "user_id": 4821,
  "note": "any authenticated user's token works here"
}
```

An inline snippet like `sudo nmap -sV -p-` also renders in monospace without needing a full block.

## Tables

| Endpoint | Method | Auth required | Verdict |
|---|---|---|---|
| `/api/health` | GET | No | Info leak (debug flag) |
| `/api/reset-password` | POST | Yes, but no ownership check | **Critical — IDOR** |
| `/api/users/:id` | GET | Yes | OK |

Tables scroll horizontally on their own if they get too wide for the screen, so feel free to add more columns than will comfortably fit on mobile.

## Images

Screenshots and diagrams go in `public/images/` and get referenced with an absolute path. Here are three examples — a terminal capture, a request/response pair, and a simple attack-flow diagram:

![Terminal showing an nmap scan revealing an open port, followed by a curl request to a health endpoint that leaks a debug flag](/images/demo-terminal.svg)

![Side-by-side HTTP request and response showing a password reset endpoint that accepts an arbitrary user_id with no ownership check](/images/demo-http-panel.svg)

![Simple flow diagram showing an attacker forging a user_id to the login API, which passes through to the user database with no auth check](/images/demo-flow-diagram.svg)

## Horizontal rule

Useful for separating major sections, like before a "Fix" or "Timeline" heading.

---

## Putting it together

A real writeup usually combines most of the above: a `##` per phase (Recon, Exploitation, Impact, Fix), a code block or two showing the actual payload, one or two screenshots as evidence, and a short table summarizing severity. You don't need to use everything in this post in every writeup — this is just here so you can see what's available.

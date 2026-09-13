---
title: 'Lab: Host validation bypass via connection state attack'
date: 2026-09-06
tags: [host-header, ssrf, request-smuggling, portswigger]
---

## Exploitation

Lab description gave a hint of an admin panel at `192.168.0.1/admin`.

Started by inserting a Collaborator payload into the host header, which gave a hit back:

*(screenshot: Collaborator interaction confirming the payload reached out)*

This confirmed a host header vulnerability existed - on to exploitation.

Set the host header to `192.168.0.1` and the URI to `/admin`, but this just redirected back to the home page:

*(screenshot: redirect to the home page when requesting /admin directly)*

Opened a tab group using Burp's "Send group (single connection)", with the first request going to the home page and the second to `/admin` with the host header set to `192.168.0.1`:

*(screenshot: tab group configured with both requests over a single connection)*

Tab 1:

*(screenshot: first request in the group - the innocent home page request)*

Tab 2:

*(screenshot: second request in the group - the /admin request with the spoofed Host header)*

Sending the group revealed the `/admin` panel:

*(screenshot: admin panel returned in the response)*

The response also contained an `/admin/delete` endpoint and a CSRF token:

*(screenshot: admin panel response showing the delete endpoint and CSRF token)*

Used that endpoint and CSRF token to build a request that deleted `carlos`, solving the lab.

## Explanation

Some servers only perform thorough validation on the first request they receive over a new connection. In this case, validation can be bypassed by sending an innocent-looking initial request, then following it with the malicious request down the same connection.

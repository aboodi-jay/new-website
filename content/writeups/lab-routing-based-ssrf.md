---
title: 'Lab: Routing-based SSRF'
date: 2026-08-30
tags: [host-header, ssrf, portswigger]
---

Lab description hinted at an internal admin panel somewhere in `192.168.0.0/24`.

As usual, changed the host header to a Collaborator payload and got a hit:

*(screenshot: Collaborator interaction confirming the request reached out)*

*(screenshot: Collaborator DNS/HTTP interaction log)*

Which confirmed a host header vulnerability existed.

The lab description pointed toward brute-forcing the subnet. Found an IP with an admin panel and deleted the `carlos` user from there to solve the lab.

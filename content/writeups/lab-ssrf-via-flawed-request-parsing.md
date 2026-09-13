---
title: 'Lab: SSRF via flawed request parsing'
date: 2026-09-02
tags: [host-header, ssrf, portswigger]
---

As usual, tried Collaborator and an arbitrary host in the header first - nothing worked.

Supplied an absolute URL in the request line instead, which returned a 200 OK:

*(screenshot: 200 OK response after supplying an absolute URL in the request line)*

Noticed that supplying the absolute URL and *then* changing the Host header gives a gateway timeout - implying the absolute URL is what's being validated, not the Host header.

Adding the Collaborator URL in the Host header (with the absolute URL still in place) gave a hit:

*(screenshot: Collaborator interaction confirming SSRF via the Host header)*

Per a hint in the lab, the internal subnet is `192.168.0.0/24`, so set that as the host header and ran Intruder against it - found `192.168.0.26`:

*(screenshot: Intruder results identifying the internal admin host)*

Navigating to `/admin` exposed a CSRF token:

*(screenshot: admin panel response containing a CSRF token)*

Supplied that CSRF token in the GET request; it then asked for a username. Supplied `carlos`, solving the lab.

---
title: 'Lab: Basic password reset poisoning'
date: 2026-05-03
tags: [host-header, password-reset, portswigger]
---

[PortSwigger lab: Host header - basic password reset poisoning](https://portswigger.net/web-security/host-header/exploiting/password-reset-poisoning/lab-host-header-basic-password-reset-poisoning)

When resetting the password, the app asks for a username and sends a password reset email using a domain picked up from the Host header.

Modifying the host header allows using any host of choice:

*(screenshot: password reset request with a modified Host header)*

And the resulting email includes that host:

*(screenshot: reset email containing a link built from the attacker-controlled host)*

Modified the host header to point to the exploit server, resulting in the email being sent with a link back to the exploit server:

*(screenshot: reset email link pointing at the exploit server)*

Then changed the username from "wiener" to "carlos". Carlos received the link and clicked it, which pointed to the exploit server, capturing his password reset token - which was then used to reset his password and solve the lab.

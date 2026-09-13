---
title: 'Lab: Host header authentication bypass'
date: 2026-05-03
tags: [host-header, authentication-bypass, portswigger]
---

On the landing page, changing the `Host` header to anything still returns a 200 OK:

*(screenshot: arbitrary Host header returning 200 OK)*

Ran an active scan and noticed the presence of `robots.txt`:

*(screenshot: robots.txt disclosed by the scan)*

Which led to discovering an admin portal:

*(screenshot: admin portal path found via robots.txt)*

The admin portal wasn't directly accessible, but changing the `Host` header to `localhost` allowed access:

*(screenshot: admin portal reachable after setting Host to localhost)*

From there, deleted the `carlos` user to solve the lab.

---
title: 'Lab: Web cache poisoning via ambiguous requests'
date: 2026-05-03
tags: [host-header, cache-poisoning, xss, portswigger]
---

As usual, tried changing the host header to anything - it returned an error:

*(screenshot: error response from a tampered Host header)*

Tried adding a duplicate Host header instead - it worked, and the response reflected it:

*(screenshot: reflected duplicate Host header value in the response)*

Went to the exploit server and created a file at `/resources/js/tracking.js` containing the payload `alert(document.cookie)`:

*(screenshot: exploit server file configured with the XSS payload)*

Stored the payload, then refreshed the page - the victim's `document.cookie` alert fired on the cached page, solving the lab.

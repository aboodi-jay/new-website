---
title: IDOR in the invoice export endpoint
date: 2026-08-20
tags: [idor, web, bugbounty]
---

## Summary

The `/api/invoices/{id}/export` endpoint accepted any numeric `id` without
checking whether it belonged to the authenticated user's organization.

## Steps to reproduce

1. Log in as user A, create an invoice, capture its `id` from the export request.
2. Log in as user B (different org).
3. Replay the export request with user A's invoice `id`.

```bash
curl -H "Authorization: Bearer $USER_B_TOKEN" \
  https://target.example/api/invoices/4821/export
```

The response returned user A's full invoice PDF, including line items and
billing address.

## Impact

Cross-tenant data disclosure - any authenticated user could enumerate and
download every invoice on the platform.

## Fix

Added an ownership check comparing `invoice.org_id` against the
authenticated user's `org_id` before generating the export.

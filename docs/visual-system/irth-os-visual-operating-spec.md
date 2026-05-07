# IRTH OS Visual Operating Spec

Date: 2026-05-06

This spec turns the visual mockups into an implementation direction for IRTH OS. The goal is not a generic dashboard. The product must feel like a premium Arabic-Islamic operating room for a Madinah heritage brand: calm, alive, strict, and luxurious.

## Visual References

1. [Architecture + Founder Dashboard](./01-architecture-founder.png)
2. [Marketing + Operations Dashboards](./02-marketing-operations.png)
3. [Supplier + Distributor Portals](./03-supplier-distributor.png)
4. [RBAC + Realtime + API Diagram](./04-rbac-realtime-api.png)

## Non-Negotiable Identity

- Base: `#0D0D0D`
- Gold: `#C8A96A`
- Deep green: `#244F3A`
- Warm white: `#F7F5F0`
- Arabic-first, RTL-first interface.
- Inspired by Islamic architecture: arches, symmetry, geometric patterning, soft vignette lighting.
- Use dark layered surfaces, subtle gold borders, refined icons, smooth transitions, and spacious composition.
- Avoid white admin pages, grey SaaS cards, spreadsheet tables, Notion-like blocks, and generic ERP layouts.

## Product Model

IRTH OS is a role-aware company operating system. Each role enters through the same backend, but sees a different live workspace.

Roles:

- Founder: complete control, strategy, revenue, growth, campaigns, operations pulse.
- Admin: operational control, user/role management, settings, escalation handling.
- Marketing staff: campaigns, content pipeline, influencers, creative assets, coupons.
- Operations staff: order pipeline, inventory flow, shipping flow, supplier handoff.
- Finance staff: revenue, expenses, payouts, campaign spend, shipment costs.
- Supplier: assigned batches, files, quality checkpoints, production notes.
- Distributor: bulk orders, tier pricing, regional demand, order lifecycle.
- Shipping partner: shipment queue, delivery statuses, exceptions, return reasons.

## UX Structure

Every workspace should be built around flows, not tables.

Preferred primitives:

- Kanban lanes for orders, campaigns, content, batches, and shipments.
- Timelines for status history, batch progress, campaign launch windows, and delivery movement.
- Activity feeds for realtime events.
- Decision rails for alerts, approvals, founder actions, or staff next steps.
- Vault/drop zones for supplier files and campaign assets.
- Progress seals, status nodes, and arch-framed workflow chambers instead of generic rectangular cards.

Tables are allowed only as secondary drill-down views, never as the first experience.

## Dashboard Definitions

### Founder Dashboard

Purpose: The founder sees the entire company pulse in one premium command center.

Primary zones:

- Revenue and growth pulse.
- Live order movement.
- Campaign performance flow.
- Inventory and supplier health.
- Strategic alerts and decisions.
- Company activity feed.

Realtime events:

- `order.created`
- `order.updated`
- `stock.low`
- `campaign.updated`
- `shipment.updated`
- `supplier.batch.updated`
- `notification.created`

Permissions:

- `*` for Founder/Super Admin.
- Admin can view a reduced version without owner-only finance controls.

### Marketing Dashboard

Purpose: A real campaign work room.

Primary zones:

- Campaign flow: draft, review, scheduled, live, completed.
- Content pipeline: idea, creative, review, publish.
- Influencer circle: outreach, contracted, content due, published.
- Asset vault.
- Budget pulse and ROAS summary.
- Live campaign activity.

Realtime events:

- `campaign.created`
- `campaign.updated`
- `asset.uploaded`
- `promo.updated`
- `influencer.updated`

Permissions:

- `VIEW_MARKETING`
- `CREATE_CAMPAIGN`
- `EDIT_CAMPAIGN`
- `MANAGE_COUPONS`
- `VIEW_FILES`
- `UPLOAD_FILES`
- `VIEW_ANALYTICS`

### Operations Dashboard

Purpose: A living operations room.

Primary zones:

- Orders pipeline: new, confirmed, processing, production, ready, shipped, delivered.
- Inventory stream: available, low, reorder, expired/near expiry.
- Shipping lane: pending, picked up, transit, out for delivery, delivered, returned.
- Supplier handoff.
- Urgent exception rail.
- Live operational feed.

Realtime events:

- `order.created`
- `order.updated`
- `inventory.updated`
- `stock.low`
- `shipment.updated`
- `supplier.batch.updated`

Permissions:

- `VIEW_ORDERS`
- `CREATE_ORDER`
- `EDIT_ORDER`
- `MANAGE_ORDER_STATUS`
- `VIEW_INVENTORY`
- `MANAGE_INVENTORY`
- `VIEW_SHIPPING`
- `MANAGE_SHIPPING`
- `VIEW_SUPPLIERS`

### Supplier Portal

Purpose: A production partnership workspace, not a file table.

Primary zones:

- Assigned production batches.
- Batch timeline.
- Upload file vault.
- Quality checkpoint flow.
- Assigned order items.
- Production notes and communication feed.
- Payout status.

Realtime events:

- `supplier.batch.assigned`
- `supplier.batch.updated`
- `file.uploaded`
- `message.created`
- `supplier.payout.updated`

Permissions:

- `SUPPLIER_DASHBOARD`
- `SUPPLIER_BATCHES`
- `SUPPLIER_FILES`
- Supplier access must be scoped to `supplierId`.

### Distributor Portal

Purpose: A premium B2B order and regional distribution workspace.

Primary zones:

- Bulk order builder.
- Tier pricing seals.
- Distributor order pipeline.
- Regional demand view.
- Reorder prompts.
- Settlement/credit status.
- Live order activity.

Realtime events:

- `distributor.order.created`
- `distributor.order.updated`
- `pricing.updated`
- `inventory.updated`
- `message.created`

Permissions:

- `DISTRIBUTOR_DASHBOARD`
- `DISTRIBUTOR_ORDERS`
- `DISTRIBUTOR_PRICING`
- Distributor access must be scoped to `distributorId`.

## Architecture Direction

Clients:

- Web admin/portals: Next.js App Router.
- Mobile app: same API and realtime event contract.

Backend:

- NestJS REST API.
- Prisma/PostgreSQL source of truth.
- Socket.IO realtime gateway.
- Redis for pub/sub/cache in production.
- JWT access/refresh tokens.
- Permission guard on every protected route.

Module domains:

- Auth
- Users/Roles
- Orders
- Inventory
- Products
- Marketing
- Suppliers
- Distribution
- Shipping
- Finance
- Communications
- Notifications
- Files

## RBAC Direction

Use a layered model:

1. Auth type: `admin`, `staff`, `supplier`, `distributor`, `shipping_partner`, `customer`.
2. Role: `FOUNDER`, `ADMIN`, `MARKETING`, `OPERATIONS`, `FINANCE`, `SUPPLIER`, `DISTRIBUTOR`, `SHIPPING_PARTNER`.
3. Permissions: granular actions like `VIEW_ORDERS`, `MANAGE_ORDER_STATUS`, `SUPPLIER_FILES`.
4. Scope: entity-level restrictions such as `supplierId`, `distributorId`, `shippingPartnerId`.

Founder has global access. External roles must never query unscoped company data.

## Realtime Direction

Socket rooms:

- `user:{userId}`
- `role:{roleName}`
- `supplier:{supplierId}`
- `distributor:{distributorId}`
- `shipping:{shippingPartnerId}`
- `admin_room`
- `founder_room`

Event envelope:

```ts
type LiveEvent = {
  id: string;
  type: string;
  actorId?: string;
  actorRole?: string;
  entityType: string;
  entityId: string;
  visibility: {
    roles?: string[];
    users?: string[];
    supplierId?: string;
    distributorId?: string;
    shippingPartnerId?: string;
  };
  payload: Record<string, unknown>;
  createdAt: string;
};
```

The backend emits domain events after successful database writes. The websocket service routes them by role and scope.

## Schema Gaps To Fix

Current repo already has a strong Prisma base, but the next pass should address these issues:

- Communications service expects `Thread.type`, `participants`, `lastMessage`, `lastMessageId`, and `orderId`, but the Prisma schema currently defines `entityType`, `entityId`, `messages`, and an optional order relation. Align service and schema before enabling chat.
- Supplier, Distributor, and Shipping Partner auth should use one consistent identity model or one consistent external-account pattern. Today Supplier has password fields, while Distributor and ShippingPartner do not.
- Add explicit role names for `FOUNDER`, `FINANCE`, `DISTRIBUTOR`, and `SHIPPING_PARTNER`.
- Add scoped permissions and guard helpers for supplier/distributor/shipping data ownership.
- Add a durable `ActivityEvent` or `AuditLog` table for live feeds and operational history.
- Fix mojibake/encoding in Arabic strings across seed data and frontend files.

## API Structure

Recommended REST shape:

- `/auth/admin/login`
- `/auth/supplier/login`
- `/auth/distributor/login`
- `/auth/shipping/login`
- `/me`
- `/roles`
- `/users`
- `/orders`
- `/orders/:id/status`
- `/orders/:id/events`
- `/inventory`
- `/inventory/alerts`
- `/products`
- `/marketing/campaigns`
- `/marketing/content`
- `/marketing/influencers`
- `/suppliers`
- `/suppliers/me/batches`
- `/suppliers/me/files`
- `/distributors/me/orders`
- `/distributors/me/pricing`
- `/shipping/me/shipments`
- `/finance/overview`
- `/communications/threads`
- `/communications/threads/:id/messages`
- `/notifications`

All protected endpoints require JWT plus permission/scope enforcement.

## Implementation Order

1. Fix Arabic encoding and communications schema mismatch.
2. Normalize RBAC roles, permissions, and scopes.
3. Add durable activity/realtime event model.
4. Build shared IRTH visual primitives: app shell, arch panel, flow lane, timeline, activity feed, live status, vault drop zone.
5. Build Founder dashboard as the first real screen.
6. Build Operations and Marketing dashboards.
7. Build Supplier and Distributor portals.
8. Add mobile client against the same API/event contract.

## Acceptance Bar

The UI is accepted only if:

- First impression is luxury heritage, not SaaS.
- No primary workflow starts with a table.
- Each role sees a different working surface.
- Every live surface has real backend events or a clear integration point.
- Every protected action has permission and scope checks.
- Arabic text renders correctly.
- The dashboard feels like a real workplace, not a decorative metrics page.

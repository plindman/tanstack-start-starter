# Application Routes & Zones

This document outlines the URL structure and routing architecture.
For Core Concept definitions (User, Org, Role), see [docs/ARCHITECTURE.md](./ARCHITECTURE.md).

## 1. Access Zones

### Zone A: Public
**Context**: Unauthenticated.
- `/` : Landing Page.
- `/login`, `/signup` : Authentication.

### Zone B: System Administration (`/admin`)
**Context**: Authenticated + `role: "admin"`.
- `/admin` : Admin Dashboard.
- `/admin/organizations` : List/Create Organizations.
- `/admin/users` : (Placeholder) Global Users List.

### Zone C: Tenant Application (`/dashboard`)
**Context**: Authenticated + `ActiveOrganizationId` is SET.
- `/dashboard` : The Application Root.
- `/settings` : Organization Settings.

## 2. Routing Architecture

### Security Guards vs Navigation Dispatchers

The routing architecture strictly separates two concerns:

1. **Security Guards** (`/_authed/route.tsx`): Protection layer only.
   - Checks: Is the user authenticated?
   - Action: If not logged in → redirect to `/login`
   - Action: If logged in → render `<Outlet />`

2. **Navigation Dispatcher** (`/_authed/app-entry.tsx`): Navigation logic.
   - Determines the best "Home" for a user
   - Entry points: Landing Page ("Enter App") and Login Success (no redirect param)

### Routing Precedence

The Navigation Dispatcher follows this priority (Organization Membership overrides Admin default):

1. **Multiple Organizations** → `/select-org`
2. **Single Organization** → `setActive({ orgId })` → `/dashboard`
3. **Zero Organizations**:
   - If Admin → `/admin` (System Admin Dashboard)
   - If User → `/access-denied` (Invite Only)

## 3. Flow & Redirects

### Login Flow
1. User authenticates via `/login` or `/signup`
2. On success, if `redirect` param exists → go to redirect location
3. On success, if no `redirect` param → go to `/app-entry` (Navigation Dispatcher)

### Navigation Dispatcher (`/app-entry`)
The central dispatcher routes users based on their organization membership:
- **Has 1+ Orgs**: Auto-select if single, show selector if multiple → `/dashboard`
- **Has 0 Orgs**: Admin → `/admin`, User → `/access-denied`

### Context Switching
- Actions (Dropdown/API) reload the session with a new `activeOrganizationId`
- `/select-org` allows users to switch between their organizations

## 4. Addressing User Feedback (FAQ)

- **"Can Admin have Orgs?"**
  - **Yes**. An Admin can be a member of "Test Corp". They can switch context to "Test Corp" and see `/dashboard`.
  - When in "System Mode", they see `/admin`.

- **"Self-Provisioning?"**
  - **Disabled**. Admins must manually create Orgs in `/admin` and invite users.

## 5. Route Summary

| Route | Purpose | Guard |
|-------|---------|-------|
| `/` | Landing Page | None (Public) |
| `/login` | Authentication | None (Public) |
| `/app-entry` | Navigation Dispatcher | Auth Required |
| `/dashboard` | Tenant Dashboard | Auth Required + Active Org |
| `/select-org` | Organization Selection | Auth Required |
| `/admin` | System Administration | Auth Required + Admin Role |
| `/access-denied` | No Access Message | None (Public, but only reachable via redirect) |

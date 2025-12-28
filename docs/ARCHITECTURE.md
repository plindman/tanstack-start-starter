# Architecture & Design Intent

This document outlines the architectural decisions, technology stack, and design philosophy for the `tanstack-start-starter` project.

## 1. Tech Stack Overview

- **Framework**: [TanStack Start](https://tanstack.com/start/latest) (Server-side rendering, routing, server functions)
- **Database / ORM**: [Drizzle ORM](https://orm.drizzle.team/) (using native `bun:sqlite` driver)
- **Authentication**: [Better-Auth](https://better-auth.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest) (Server state), URL-based state (Client)

## 2. Project Structure

The codebase follows a modular single-package structure designed for simplicity and scalability.

- `src/routes`: Application routes and pages (file-based routing).
- `src/components`: Reusable UI components.
- `src/db`: Database schema, migrations, and configuration.
- `src/lib`: Shared utilities, helpers, and configuration accessors.

## 3. Core Domain Model

### The User (`User`)
- **Definition**: A global entity representing a human using the system.
- **Creation**: Exists once signed up (via Email or OAuth).
- **Roles**:
  - `admin`: System Administrator. Has God-mode access to the Platform.
  - `user`: Standard user. No special privileges outside their Organizations.

### The Organization (`Organization`)
- **Definition**: A data boundary (Tenant) containing resources (members, settings, data).
- **Membership**: Users belong to Organizations via a `Member` relationship.
- **Strict Isolation**: A User can only access data for the Organization they are currently "Active" in.

### The Session (`Session`)
- **Definition**: The intersection of a `User` and an `ActiveOrganization`.
- **State**: Contains `userId`, `sessionToken`, and optionally `activeOrganizationId`.
- **Context**: The application behavior changes entirely based on whether `activeOrganizationId` is set.

## 4. Routing Strategy

The application uses **File-Based Routing** via TanStack Router.
For a detailed map of all application routes and access zones, see [docs/ROUTES.md](./ROUTES.md).

## 4. Core Principles

### Type Safety
- **End-to-End**: Enabled by default via TypeScript, Zod (validation), and TanStack Start's RPC-like server functions.
- **Environment**: Configuration is validated at runtime to fail fast on missing keys.

### Multi-Tenancy
- **Strict Data Isolation**: All resource tables must include an `organization_id` to enforce tenant boundaries.
- **Middleware Enforcement**: Request interception ensures tenant context is validated before access.
- **Provisioning Model**: **Admin-Only / Invite-Only**. 
  - Standard users cannot create organizations.
  - Organizations are provisioned by System Admins.
  - Users are invited to existing organizations.

## 5. Authentication & Navigation Flow

### Security Guards vs Navigation Dispatchers

The routing architecture strictly separates two concerns:

**Security Guards** (`src/routes/_authed/route.tsx`):
- Responsibility: Protection layer only
- Logic: Check if user is authenticated
- Action: If logged out → redirect to `/login`; If logged in → render `<Outlet />`

**Navigation Dispatcher** (`src/routes/_authed/app-entry.tsx`):
- Responsibility: Determine the best "Home" for a user
- Entry points: Landing Page ("Enter App") and Login Success (no redirect param)
- Logic Priority (Organization Membership overrides Admin default):
  1. Multiple Organizations → `/select-org`
  2. Single Organization → `setActive({ orgId })` → `/dashboard`
  3. Zero Organizations:
     - If Admin → `/admin` (System Admin Dashboard)
     - If User → `/access-denied` (Invite Only)

### Login Flow

1. User authenticates via `/login` or `/signup`
2. On success, if `redirect` param exists → go to redirect location
3. On success, if no `redirect` param → go to `/app-entry` (Navigation Dispatcher)

The Navigation Dispatcher routes users based on organization membership:

1. **0 Organizations + Standard User**:
   - Result: **Access Denied**. Usage is invite-only.
2. **0 Organizations + Admin**:
   - Result: Redirect to **/admin**.
3. **1 Organization**:
   - Result: Auto-select organization and redirect to **/dashboard**.
4. **Multiple Organizations**:
   - Result: Redirect to **Organization Selection** (`/select-org`) to choose context.

## 6. Navigation & Layouts

- **Single Global Shell**: The entire application (Public, Authed, Admin) shares a common **Header** and **Footer** via `src/routes/__root.tsx`.
- **Admin Layout**: The System Admin area (`/admin`) may implement its own internal sidebar for resource management, but this is content-level, not shell-level.
- **Navigation Elements**:
  - **User Menu**: Profile, Settings, Theme, and Sign Out.
  - **Tenant List**: A simple way to switch organizations (e.g., via `/select-org` or a menu item).

## 7. Backend & Infrastructure

### Authentication & Security
- **Provider**: **Better-Auth** handles session management and protocol complexity.
- **Strategies**:
  - Email/Password
  - OAuth (Socials)
  - SSO (SAML/OIDC) for Enterprise.
- **RBAC (Role-Based Access Control)**:
  - Granular permissions: System Admin, Org Admin, Member, Viewer.
- **Security Features**:
  - **Rate Limiting**: Redis-backed sliding window per IP/User.
  - **Audit Logging**: Immutable history of changes.

### Backend Services
- **Transactional Email**: Abstraction layer (e.g., generic provider interface) to support swapping providers (Resend, SES) without code changes.
- **Background Jobs**: Redis-backed queue (e.g., BullMQ) for reliable async processing.

### Observability
- **OpenTelemetry (OTel)**: Auto-instrumentation for full-stack tracing.
- **Structured Logging**: JSON logs for machine readability.

### Internationalization (i18n)
- **Goal**: Type-safe translation dictionaries.
- **Detection**: Smart middleware (Browser -> User Preference -> Default).

## 8. UI Patterns

### "Workhorse" Components
- **Data Tables**:
  - Server-side features: Sorting, Filtering, Pagination.
  - Bulk actions support.
- **Form Engine**:
  - **Validation**: Zod schema validation.
  - **UX**: "Dirty State" warnings to prevent accidental data loss.

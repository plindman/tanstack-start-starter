# Architecture & Design Intent

This document outlines the architectural decisions, technology stack, and design philosophy for the `tanstack-start-starter` project.

## 1. Tech Stack Overview

- **Framework**: [TanStack Start](https://tanstack.com/start/latest) (Server-side rendering, routing, server functions)
- **Database / ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Better-Auth](https://better-auth.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest) (Server state), URL-based state (Client)

## 2. Project Structure

The codebase follows a modular single-package structure designed for simplicity and scalability.

- `src/routes`: Application routes and pages (file-based routing).
- `src/components`: Reusable UI components.
- `src/db`: Database schema, migrations, and configuration.
- `src/lib`: Shared utilities, helpers, and configuration accessors.

## 3. Core Principles

### Type Safety
- **End-to-End**: Enabled by default via TypeScript, Zod (validation), and TanStack Start's RPC-like server functions.
- **Environment**: Configuration is validated at runtime to fail fast on missing keys.

### Multi-Tenancy
- **Strict Data Isolation**: All resource tables must include an `organization_id` to enforce tenant boundaries.
- **Middleware Enforcement**: Request interception ensures tenant context is validated before access.

## 4. Application Layer

### Navigation & Layouts
- **Public Layout**: Header + Footer + Content (Landing pages, Auth).
- **Authenticated Layout**: App Shell with Sidebar + Header + Content.
- **Navigation Elements**:
  - **Global Search (Cmd+K)**: Central navigation omni-bar.
  - **Tenant Switcher**: Context switching between organizations.
  - **User Menu**: Profile, Settings, Theme, and Sign Out.

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

## 5. Backend & Infrastructure

### Backend Services
- **Transactional Email**: Abstraction layer (e.g., generic provider interface) to support swapping providers (Resend, SES) without code changes.
- **Background Jobs**: Redis-backed queue (e.g., BullMQ) for reliable async processing.

### Observability
- **OpenTelemetry (OTel)**: Auto-instrumentation for full-stack tracing.
- **Structured Logging**: JSON logs for machine readability.

### Internationalization (i18n)
- **Goal**: Type-safe translation dictionaries.
- **Detection**: Smart middleware (Browser -> User Preference -> Default).

## 6. UI Patterns

### "Workhorse" Components
- **Data Tables**:
  - Server-side features: Sorting, Filtering, Pagination.
  - Bulk actions support.
- **Form Engine**:
  - **Validation**: Zod schema validation.
  - **UX**: "Dirty State" warnings to prevent accidental data loss.

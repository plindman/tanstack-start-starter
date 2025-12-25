# Project Roadmap & Status

This document tracks the project's progress and outlines our **development workflow**.

## Development Workflow

### Issue Tracking
We use **GitHub Issues** to track features and bugs.
- **Create**: Use `gh issue create`.
- **Link**: Reference Issue IDs (e.g., `#123`) in commits and PRs.

### Issue Template
When creating an issue, include:
- **Description**: High-level goal.
- **Requirements**: Functional checklist (Schema, UI, API).
- **Technical Details**: specific libraries or implementation notes.

---

## Status Checklist

### 1. Foundation & Architecture
- [ ] Monorepo/Folder Structure: Scalable separation (e.g., apps/web, packages/ui, packages/db).
- [ ] Strict Multi-Tenancy: Data isolation via organization_id on all tables + middleware enforcement. [Issue #1]
- [ ] Strict TypeScript: End-to-end type safety enabled by default.
- [ ] Environment Management: Type-safe config loader (e.g., zod/t3-env) to fail fast on missing keys.

### 2. Authentication & Security
- [ ] Enterprise Auth: Support for SSO (SAML/OIDC), Email/Password, and Socials.
- [ ] Granular RBAC: Permissions for System Admin, Org Admin, Member, and Viewer.
- [ ] Impersonation Mode: Secure "View As" capability for admins to debug user issues.
- [ ] Software Rate Limiting: Redis-backed sliding window limiter per IP/User.
- [ ] Audit Logging: Immutable log of Who changed What and When.

### 3. Navigation & Layout Strategy
- [ ] App Shell: Responsive Sidebar + Header + Content area.
- [ ] Top Bar (Global Context):
  - [ ] Org/Tenant Switcher: Context dropdown.
  - [ ] Global Search (Cmd+K): Omni-bar for navigation and data finding.
  - [ ] Primary CTA: The single most important action (e.g., "New Project").
  - [ ] User Menu / Hamburger (System Items):
    - [ ] Theme Toggle: Switch Light/Dark/System.
    - [ ] Language Switcher: Locale selection.
    - [ ] Keyboard Shortcuts: Modal listing hotkeys.
    - [ ] Account Settings: User profile & security.
    - [ ] Org Settings: Billing & Team management.
    - [ ] Support: Link to docs/help.
    - [ ] Sign Out: Secure session termination.
- [ ] Footer: Minimalist design with Version, Status Link, Copyright, and Legal Links.

### 4. Core UI, i18n & Accessibility
- [ ] Internationalization (i18n): Type-safe dictionaries + Locale detection middleware.
- [ ] Timezone Handling: Utilities configured for global timezone management (e.g., date-fns).
- [ ] Theme Engine: Token-based design system (CSS variables) + System preference sync.
- [ ] Strict A11y Compliance: Base components handling ARIA, focus trapping, and screen reader support.

### 5. "Workhorse" Components & UX
- [ ] Advanced Data Tables: Server-side sorting, filtering, pagination, and bulk actions.
- [ ] Form Engine: Schema validation (Zod) + "Dirty State" warnings.
- [ ] Feedback Systems: Stackable Toasts + Skeleton Loaders.
- [ ] Feature Flags: Boolean toggles to enable/disable features.

### 6. Backend & Infrastructure
- [ ] Transactional Email System: Provider abstraction + Code-based templates.
- [ ] Background Job Queue: Redis-backed queue for async tasks.
- [ ] File Storage: Abstracted upload handling with signed URLs.
- [ ] Health Checks: /health and /ready endpoints.

### 7. Observability & Ops
- [ ] OpenTelemetry (OTel): Auto-instrumentation.
- [ ] Structured Logging: JSON logs with correlation IDs.
- [ ] Error Reporting: Global exception capture with source maps.
- [ ] CI/CD & Docker: Pre-configured Dockerfile + GitHub Actions.
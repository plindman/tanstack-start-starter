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
- [x] Strict TypeScript: End-to-end type safety enabled by default.
- [x] Environment Management: Type-safe config loader (e.g., zod/t3-env) to fail fast on missing keys.
- [x] Modular Folder Structure: Logical separation (e.g., `src/routes`, `src/components`, `src/db`).
- [x] Granular RBAC: Permissions for System Admin, Org Admin, Member, and Viewer. [Issue #2]
- [x] Strict Multi-Tenancy: Data isolation via organization_id on all tables + middleware enforcement. [Issue #1]
  - [x] Schema & Middleware Enforcement
  - [ ] System Admin Mode (Handle 'No Org' Context) [Issue #5]
  - [ ] Admin Org Provisioning (Create, List, Switch) [Issue #5]
  - [ ] Refine Organization Management UI/UX (Advanced tables, filtering, improved actions)

### 2. Authentication & Security
- [x] Standard Auth: Email/Password login (Default Enabled).
- [ ] Impersonation Mode: Schema support added. Secure "View As" capability for admins to debug user issues.

### 3. Navigation & Layout Strategy
- [ ] App Shell: Responsive Top Navigation Header + Content area. [Issue #3]
- [ ] Top Bar (Global Context):
  - [ ] Org/Tenant Switcher: Context dropdown.
  - [ ] Global Search (Cmd+K): Omni-bar for navigation and data finding.
  - [ ] Primary CTA: The single most important action (e.g., "New Project").
  - [ ] User Menu / Hamburger (System Items):
    - [ ] Theme Toggle: Switch Light/Dark/System.
    - [ ] Language Switcher: Locale selection.
    - [ ] Keyboard Shortcuts: Modal listing hotkeys.
   - [ ] Account Settings: User profile & security. [Issue #4]
    - [ ] Org Settings: Billing & Team management. [Issue #4]
    - [ ] Support: Link to docs/help.
    - [ ] Sign Out: Secure session termination.
- [ ] Footer: Minimalist design with Version, Status Link, Copyright, and Legal Links.

### 4. Core UI, i18n & Accessibility
- [ ] Internationalization (i18n): Type-safe dictionaries + Locale detection middleware (Candidate: [@inlang/paraglide-js](https://inlang.com/)).
- [ ] Timezone Handling: Utilities configured for global timezone management (e.g., date-fns).
- [ ] Theme Engine: Token-based design system (CSS variables) + System preference sync.
- [ ] Strict A11y Compliance: Base components handling ARIA, focus trapping, and screen reader support.

### 5. "Workhorse" Components & UX
- [ ] Advanced Data Tables: Server-side sorting, filtering, pagination, and bulk actions.
- [ ] Form Engine: Schema validation (Zod) + "Dirty State" warnings.
- [ ] Feedback Systems: Stackable Toasts + Skeleton Loaders.
- [ ] Feature Flags: Boolean toggles to enable/disable features.

### 6. Backend & Infrastructure
- [ ] Transactional Email System: Provider abstraction (Candidate: [Resend](https://resend.com/)) + Code-based templates ([@react-email/components](https://react.email/)).
- [ ] Background Job Queue: Redis-backed queue for async tasks.
- [ ] File Storage: Abstracted upload handling with signed URLs.
- [ ] Health Checks: /health and /ready endpoints.

### 7. Observability & Ops
- [ ] Observability: Auto-instrumentation (Candidate: [@opentelemetry/sdk-node](https://opentelemetry.io/)) and Structured Logging ([pino](https://getpino.io/)).
- [ ] Error Reporting: Global exception capture with source maps.
- [ ] CI/CD & Docker: Pre-configured Dockerfile + GitHub Actions.

### 8. Future / Enterprise Features
- [ ] Enterprise Auth: Support for SSO (SAML/OIDC) and Social providers.
- [ ] Software Rate Limiting: Traffic control abstraction (Candidates: [@arcjet/node](https://arcjet.com/) or [@upstash/ratelimit](https://upstash.com/)).
- [ ] Audit Logging: Immutable log of Who changed What and When.
- [ ] Self-Service Onboarding: Allow users to create organizations (PLG motion).
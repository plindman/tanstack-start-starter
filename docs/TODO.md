# Future Improvements / Production Add-ons

To complete the stack for a production-ready application, consider integrating the following packages:

- **Internationalization (i18n):** [`@inlang/paraglide-js`](https://inlang.com/)
- **Email:** [`resend`](https://resend.com/) and [`@react-email/components`](https://react.email/)
- **Observability:** [`@opentelemetry/sdk-node`](https://opentelemetry.io/) and [`pino`](https://getpino.io/) for logging.
- **Rate Limiting (Traffic Control):** [`@arcjet/node`](https://arcjet.com/) (or [`@upstash/ratelimit`](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview))


## Checklist 

This is the consolidated, comprehensive list. It is designed to be a checklist for a "Battery-Included" starter for professional, scalable web applications.

1. Global Architecture & Foundation
Monorepo/Folder Structure: Scalable separation (e.g., apps/web, packages/ui, packages/db).

Strict Multi-Tenancy:

Data Isolation: organization_id on all resource tables.

Middleware: Request interception to enforce tenant context.

Strict TypeScript: End-to-end type safety enabled by default.

Environment Management: Type-safe config loader (e.g., zod or t3-env) to fail fast on missing keys.

2. Authentication & Security
Enterprise Auth: Integrations for SSO (SAML/OIDC), Email/Password, and Socials.

Granular RBAC: Permission system differentiating System Admin, Org Admin, Member, and Viewer.

Impersonation Mode: Secure "View As" capability for admins to debug user issues.

Software Rate Limiting: Redis-backed sliding window limiter per IP/User to prevent abuse.

Audit Logging: Immutable log of Who changed What and When.

3. Observability & Reliability
OpenTelemetry (OTel): Auto-instrumentation for tracing requests across frontend, backend, and DB.

Structured Logging: JSON logs with correlation IDs.

Error Reporting: Global exception capture (e.g., Sentry) with source maps.

Health Checks: /health and /ready endpoints for uptime monitoring.

4. Internationalization (i18n) & Localization
Type-Safe Dictionaries: Translation keys checked at build time.

Locale Detection: Smart middleware (Browser preference -> User Override -> Default).

Timezone/Date Handling: Utilities configured for global timezone management (e.g., date-fns).

5. UI Core & Accessibility (a11y)
Design System: Token-based theming (Colors, Spacing, Radius) via CSS variables.

Theme Engine: Light/Dark/System sync with flash-prevention script.

Strict A11y Compliance: Base components handling ARIA, focus trapping, and screen reader support.

Layout Intent:

App Shell: Responsive Sidebar + Header + Content area.

Footer: Minimalist. Contains Version (v1.x.x), Status Link, Copyright, and Legal Links (Privacy, Terms, DPA).

6. Navigation Strategy
Top Bar (Global Context):

Org/Tenant Switcher: Dropdown to switch contexts.

Global Search (Cmd+K): Omni-bar for navigation and data finding.

Primary CTA: The single most important action (e.g., "New Project").

User Menu / Hamburger (System Items):

Theme Toggle: Switch Light/Dark/System.

Language Switcher: Locale selection.

Keyboard Shortcuts: Modal listing hotkeys.

Account Settings: User profile & security.

Org Settings: Billing & Team management.

Support: Link to docs/help.

Sign Out: Secure session termination.

7. "Workhorse" Components & UX
Advanced Data Tables: Server-side sorting, filtering, pagination, and bulk actions.

Form Engine:

Schema validation (Zod).

"Dirty State" handling (warn before leaving unsaved work).

Feedback Systems:

Toasts: Stackable success/error notifications.

Loaders: Skeleton screens (not just spinners) for perceived performance.

Section 8: Backend & DevOps
Transactional Email System:

Provider Abstraction: A wrapper (e.g., for Resend/SendGrid/AWS SES) so you can switch providers easily.

Templates: Code-based email templates (e.g., react-email or mjml) to keep email design version-controlled with the app.

Background Job Queue:

Async Worker: A Redis-backed queue (e.g., BullMQ) to ensure emails are sent in the background without blocking the user's API request (essential for speed).

File Storage: Abstracted upload handling (S3/R2) with signed URLs.

Feature Flags: Boolean toggles to enable/disable features without redeploying.

CI/CD & Docker: Pre-configured Dockerfile and GitHub Actions.


## Status checklist

1. Foundation & Architecture
[ ] Monorepo/Folder Structure: Scalable separation (e.g., apps/web, packages/ui, packages/db).

[ ] Strict Multi-Tenancy: Data isolation via organization_id on all tables + middleware enforcement.

[ ] Strict TypeScript: End-to-end type safety enabled by default.

[ ] Environment Management: Type-safe config loader (e.g., zod/t3-env) to fail fast on missing keys.

2. Authentication & Security
[ ] Enterprise Auth: Support for SSO (SAML/OIDC), Email/Password, and Socials.

[ ] Granular RBAC: Permissions for System Admin, Org Admin, Member, and Viewer.

[ ] Impersonation Mode: Secure "View As" capability for admins to debug user issues.

[ ] Software Rate Limiting: Redis-backed sliding window limiter per IP/User.

[ ] Audit Logging: Immutable log of Who changed What and When.

3. Navigation & Layout Strategy
[ ] App Shell: Responsive Sidebar + Header + Content area.

[ ] Top Bar (Global Context):

[ ] Org/Tenant Switcher: Context dropdown.

[ ] Global Search (Cmd+K): Omni-bar for navigation and data finding.

[ ] Primary CTA: The single most important action (e.g., "New Project").

[ ] User Menu / Hamburger (System Items):

[ ] Theme Toggle: Switch Light/Dark/System.

[ ] Language Switcher: Locale selection.

[ ] Keyboard Shortcuts: Modal listing hotkeys.

[ ] Account Settings: User profile & security.

[ ] Org Settings: Billing & Team management.

[ ] Support: Link to docs/help.

[ ] Sign Out: Secure session termination.

[ ] Footer: Minimalist design with Version (v1.x), Status Link, Copyright, and Legal Links (Privacy, Terms, DPA).

4. Core UI, i18n & Accessibility
[ ] Internationalization (i18n): Type-safe dictionaries + Locale detection middleware.

[ ] Timezone Handling: Utilities configured for global timezone management (e.g., date-fns).

[ ] Theme Engine: Token-based design system (CSS variables) + System preference sync (no flash).

[ ] Strict A11y Compliance: Base components handling ARIA, focus trapping, and screen reader support.

5. "Workhorse" Components & UX
[ ] Advanced Data Tables: Server-side sorting, filtering, pagination, and bulk actions.

[ ] Form Engine: Schema validation (Zod) + "Dirty State" warnings (unsaved changes protection).

[ ] Feedback Systems: Stackable Toasts + Skeleton Loaders (perceived performance).

[ ] Feature Flags: Boolean toggles to enable/disable features without redeploying.

6. Backend & Infrastructure
[ ] Transactional Email System: Provider abstraction (Resend/SES) + Code-based templates (react-email).

[ ] Background Job Queue: Redis-backed queue (e.g., BullMQ) for async emails and heavy tasks.

[ ] File Storage: Abstracted upload handling (S3/R2) with signed URLs.

[ ] Health Checks: /health and /ready endpoints.

7. Observability & Ops
[ ] OpenTelemetry (OTel): Auto-instrumentation for tracing requests across frontend, backend, and DB.

[ ] Structured Logging: JSON logs with correlation IDs.

[ ] Error Reporting: Global exception capture (e.g., Sentry) with source maps.

[ ] CI/CD & Docker: Pre-configured Dockerfile + GitHub Actions for testing/linting.
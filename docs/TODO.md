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

### Phase 1: Functional MVP (Core)
- [x] Strict TypeScript & Environment Management.
- [x] Multi-Tenancy & Data Isolation Core. [Issue #1]
- [x] Authentication & RBAC Foundation. [Issue #2]
- [ ] **Standardized Layout Foundations**: Define and implement global container constraints (max-width capping) and horizontal alignment across all views. [Issue #7]
- [ ] **Header & Footer [Issue #3]**: Refined and configuration-driven navigation components (Review pending).
- [ ] **Tenant Dashboard MVP**: Basic functional workspace for organization members.
- [ ] **System Admin Dashboard MVP**: Basic functional entry point for platform management.
- [ ] **Access Denied UI**: User feedback for unauthorized or "No Org" states.

### Phase 2: Essential Management
- [ ] **System Admin Workspace [Issue #5]**:
  - Admin Guard & Dedicated Sidebar.
  - Organization Provisioning (List all system orgs, Create new).
- [ ] **User Profile & Settings MVP [Issue #4]**:
  - Profile Page (`/users/me`): Edit Name, Email.
  - Account Settings: Change Password form.

### Phase 3: UI/UX Refinement & Components
- [ ] **Shared Component Library**: Build reusable primitives as needed during task execution.
  - **Advanced Data Tables**: Server-side sorting, filtering, pagination, and bulk actions.
  - **Form Engine**: Schema validation (Zod) + "Dirty State" warnings.
  - **Feedback Systems**: Stackable Toasts + Skeleton Loaders.
- [ ] **System Admin Refinement**: Upgrade administrative views using refined components.
- [ ] **User Experience Refinement**: Enhanced Dashboard and Profile features (e.g., Avatar uploads).
- [ ] **Health Checks**: `/health` and `/ready` endpoints.

### Phase 4: Production Infrastructure
- [ ] **Internationalization (i18n)**: Type-safe dictionaries + Locale detection middleware (Candidate: [@inlang/paraglide-js](https://inlang.com/)).
- [ ] **Observability**: Structured Logging ([pino](https://getpino.io/)), global exception capture, and auto-instrumentation ([@opentelemetry/sdk-node](https://opentelemetry.io/)).
- [ ] **Backend Services**:
  - Transactional Email: Provider abstraction ([Resend](https://resend.com/)) + Code-based templates ([@react-email/components](https://react.email/)).
  - Background Job Queue: Redis-backed queue for async tasks.
  - File Storage: Abstracted upload handling with signed URLs.

### Phase 5: Enterprise & Scaling
- [ ] **Enterprise Security**:
  - Audit Logging: Immutable log of Who changed What and When.
  - Impersonation Mode: Secure "View As" capability for admins (Schema support added).
  - Software Rate Limiting: Traffic control abstraction (Candidates: [@arcjet/node](https://arcjet.com/) or [@upstash/ratelimit](https://upstash.com/)).
- [ ] **Advanced Multi-Tenancy**:
  - Organization Switcher: Context dropdown for users in multiple tenants.
  - Self-Service Onboarding: Allow users to create organizations (PLG motion).

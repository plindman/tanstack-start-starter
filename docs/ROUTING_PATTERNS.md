# Routing Patterns

This project uses a scalable "Three-Group" architecture for routing, designed to separate concerns and keep the application organized as it grows.

## Core Structure

The routing is divided into three top-level groups in `src/routes/`:

### 1. Public Marketing Layer (`_public`)
- **Path**: `/` (and others like `/about`, `/contact`)
- **Purpose**: Marketing pages, landing pages, legal info.
- **Layout**: Contains the public-facing Navbar and Footer.
- **Access**: Open to everyone.

### 2. Authentication Entry (`_auth`)
- **Path**: `/login`, `/signup`, `/forgot-password`, etc.
- **Purpose**: Entry points for user authentication.
- **Layout**: Typically a simplified "Centered Card" layout to focus on the form.
- **Access**: Open to everyone (usually redirects to app if already logged in).

### 3. Application Domain Layer (`_authed`)
- **Path**: Protected routes (e.g., `/users/me`).
- **Purpose**: The actual SaaS application functionality.
- **Layout**: Enhanced application shell (Sidebar, User Menu, etc.) with a **Strict Auth Guard**.
- **Access**: Requires authentication. Unauthenticated users are redirected to login.

## Domain Modules

Within the `_authed` layer, features are organized by **Domain Modules**. A domain module is a subdirectory that groups related routes and resources.

**Example Structure:**
\\`\\`\\`
src/routes/_authed/
  ├── users/                  <-- Domain: Users
  │   ├── route.tsx           <-- Domain Layout (Optional)
  │   └── me.tsx              <-- Feature: "Me" Profile
  │
  └── project-a/              <-- Domain: Project A
      ├── route.tsx           <-- Domain Layout
      ├── list.tsx            <-- Feature: List Projects
      └── detail.tsx          <-- Feature: View Project
\\`\\`\\`

## Extending the Routing

### Adding a Public Page
1. Create a file in `src/routes/_public/`.
2. Name it matching the desired URL (e.g., `pricing.tsx` -> `/pricing`).
3. Use the `_public` layout to ensure consistent branding.

### Adding a New Auth Method
1. Create a file in `src/routes/_auth/`.
2. Name it for the method (e.g., `magic-link.tsx`).
3. Implement the specific auth logic using `better-auth`.

### Adding a New Domain Module
1. Create a new folder in `src/routes/_authed/` (e.g., `invoices`).
2. Add a `route.tsx` inside if you need shared layout/context for invoices.
3. Add your feature files (e.g., `list.tsx`, `[invoiceId].tsx`).

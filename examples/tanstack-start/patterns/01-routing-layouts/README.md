# Routing Layout Patterns

This example demonstrates the recommended "Three-Group" architecture for TanStack Start applications: **Public**, **Auth**, and **Authed**.

## Structure Overview

- **`_public`**: Marketing pages (Landing, Pricing, etc.).
- **`_auth`**: Authentication flows (Login, Signup, Magic Link).
- **`_authed`**: The protected application area, organized by functional domains.

## How to Extend

This example provides code snippets for key usage patterns:

1. **Adding a Public Page**: See `app/routes/_public/pricing.tsx`
2. **Adding an Auth Method**: See `app/routes/_auth/magic-link.tsx`
3. **Adding a Domain Module**: See `app/routes/_authed/project-a/`

## Usage

Copy the relevant files to your own `src/routes` directory to implement these patterns.

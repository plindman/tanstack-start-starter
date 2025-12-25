# Development Notes & Creation Log

> **Intent:** This document serves as a reference for the architectural choices, deviations from defaults, and development context of this starter. It is intended for developers who want to understand *how* this repo was built or why certain decisions were made.
>
> For instructions on how to **use** this starter, please see the [README.md](../README.md).

## Key Decisions & Deviations

### Database: Bun + SQLite Compatibility
**Deviation:** We use a custom migration workflow instead of the standard `drizzle-kit push`.
**Reason:** The default `better-sqlite3` driver required by Drizzle Kit has compatibility issues with Bun's runtime.
**Solution:**
- We created `src/db/migrate.ts` which uses the native `bun:sqlite` driver.
- We aliased `db:push` in `package.json` to run `db:generate` + `bun src/db/migrate.ts`.
- **Usage:** Always use `bun run db:push` to apply schema changes.

### Authentication: Better Auth
**Choice:** We use [Better Auth](https://www.better-auth.com/) for a comprehensive, self-hosted auth solution.
**Context:** Pre-configured with Email/Password. `src/lib/auth.ts` is the generated configuration file.
**Setup:** Requires `BETTER_AUTH_SECRET` in `.env.local` (generated via `openssl rand -base64 32`).

**RBAC & Admin:**
- **Plugin:** We use the `admin` plugin to handle roles and banning.
- **Roles:** `admin` and `user`.
- **Security:** Public signup is disabled in the UI to prevent unauthorized access.
- **Bootstrapping:** The first admin must be created via the `scripts/seed-admin.ts` CLI script.

### Routing strategy
**Pattern:** Component Co-location.
**Decision:** Simple page components (e.g., `LoginComponent`) are defined directly within their route files (e.g., `src/routes/login.tsx`) to reduce boilerplate and context switching.
**Guideline:** Extract to `src/components/*` only when complexity increases or reusability is required.

---

## How this repo was created

https://tanstack.com/start/latest/docs/framework/react/quick-start
bun create @tanstack/start@latest

◇  What would you like to name your project?
│  tanstack-start-starter
│
◇  Would you like to use Tailwind CSS?
│  Yes
│
◇  Select toolchain
│  Biome
│
◇  Select deployment adapter
│  Nitro (agnostic)

◆  What add-ons would you like for your project?
│  ◻ Drizzle (Add Drizzle ORM to your application.)
│  ◻ Shadcn (Add Shadcn UI to your application.)
│  ◻ T3Env
│  ◻ Query

What was installed (The "Core")
- The Framework: react, @tanstack/react-start, @tanstack/react-router.
- Data Fetching: @tanstack/react-query (Essential).
- Validation: zod (Note: It installed version 4.x, which is bleeding edge/alpha. If you run into compatibility issues, you might need to downgrade to v3, but stick with it for now if it works).
- Styling: tailwindcss (Version 4!), clsx, lucide-react. shadcn
- Env var safety: @t3-oss/env-core (For your environment variables).
- Database (Dev): drizzle-orm + better-sqlite3.
- Testing: The wizard did give vitest and testing-library. You are ready to write unit tests immediately.

Note: It set you up with SQLite (a local file). This is great for fast development, but for production, you will likely switch better-sqlite3 to pg (Postgres) later.

### better-auth
https://www.better-auth.com/docs/installation
bun add better-auth
# env vars
# lib/auth.ts
bunx @better-auth/cli generate
# and copy the file to lib/auth.ts

https://www.better-auth.com/docs/integrations/tanstack
https://www.better-auth.com/docs/authentication/email-password

https://ui.shadcn.com/blocks/login

## Summary of "Production Add-ons - later"
To complete the stack, here is a shopping list of packages to install manually:
- i18n: @inlang/paraglide-js
- Email: resend, @react-email/components
- Observability: @opentelemetry/sdk-node, pino
- Rate Limiting (Traffic Control): @arcjet/node (or @upstash/ratelimit)

### Configuration Pattern (Default + Override)

We use a "Default + Override" pattern for component configuration, exemplified by the `Footer` component.

**Structure:**
- `src/config/[name].default.ts`: Contains the **immutable** default configuration (Pure Data).
- `src/lib/config.ts`: The **Accessor**. It merges the default config with any user overrides.
- `src/config/[name].local.ts`: (Optional, gitignored) User-specific overrides.

**Usage:**
Components import from the accessor (`src/lib/config.ts`), NOT from `src/config`.

**Example (Footer):**
- **Types**: `src/types/footer.ts`
- **Default**: `src/config/footer.default.ts`
- **Override**: Create `src/config/footer.local.ts` to apply local changes.
  ```typescript
  import type { FooterConfig } from '../types/footer'
  
  export const footerConfig: Partial<FooterConfig> = {
    copyright: 'My Custom Copyright'
  }
  ```


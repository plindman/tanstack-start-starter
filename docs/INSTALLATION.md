# How this repo was created

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

### Route Component Co-location

In file-based routing frameworks like TanStack Start, it is a common and often recommended practice to co-locate simple page components (e.g., `LoginComponent`) directly within their respective route files (e.g., `src/routes/login.tsx`). This approach offers:

*   **Simplicity and Co-location:** All logic pertaining to a specific route, including data loading, error handling, and the component's rendering logic, resides in a single, easily accessible file. This reduces context switching during development.
*   **Explicit Relationship:** It makes the tight coupling between the route's definition and its rendering component explicit.
*   **Reduced Boilerplate:** For straightforward pages, it avoids the need for creating a separate file and additional export/import statements for a component that might only be used by that specific route.

**When to consider separating the component:**

While co-location is beneficial for simple pages, consider extracting the component logic to a separate file (e.g., `src/components/auth/LoginForm.tsx`) if:

*   **Component Complexity Increases:** The component's logic or UI grows significantly, making the route file overly long or hard to read.
*   **Reusability is Required:** The component (e.g., a login form) needs to be reused across different routes, embedded in modals, or utilized in other parts of the application.
*   **Strict Separation of Concerns:** Your team adheres to a strict architectural pattern where route files are solely for routing concerns (loaders, parameters) and presentation logic resides entirely within dedicated component folders.

For the current `LoginComponent` in `src/routes/login.tsx`, co-location is an idiomatic and acceptable approach given its current scope.

## Summary of "Production Add-ons - later"
To complete the stack, here is a shopping list of packages to install manually:
- i18n: @inlang/paraglide-js
- Email: resend, @react-email/components
- Observability: @opentelemetry/sdk-node, pino
- Rate Limiting (Traffic Control): @arcjet/node (or @upstash/ratelimit)


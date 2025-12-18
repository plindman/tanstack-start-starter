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



## Summary of "Production Add-ons - later"
To complete the stack, here is a shopping list of packages to install manually:
- i18n: @inlang/paraglide-js
- Email: resend, @react-email/components
- Observability: @opentelemetry/sdk-node, pino
- Rate Limiting (Traffic Control): @arcjet/node (or @upstash/ratelimit)

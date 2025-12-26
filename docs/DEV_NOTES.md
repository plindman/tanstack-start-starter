# Developer Notes

## Runtime Environment
This project uses **Bun** as the primary runtime and **SQLite** as the database, using the native `bun:sqlite` driver via `drizzle-orm/bun-sqlite`.

### Critical: Server Runtime
Because the database driver depends on `bun:sqlite`, **the backend server must run in the Bun runtime**.
- **Issue**: Standard `vite dev` or `vinxi dev` scripts often default to Node.js, which causes the application to fail with errors like `db.select is not a function` (because `bun:sqlite` cannot be loaded in Node).
- **Solution**: Always ensure dev and start scripts are prefixed with `bun --bun` to force the Bun runtime.
    ```json
    "dev": "bun --bun vite dev"
    ```

## Authentication & Database Schema
- **Schema Imports**: In mixed environments (CLI vs Runtime), simpler dynamic imports can fail. We use **Static Imports** in `src/lib/auth.ts` (`import * as schema from "@/db/schema"`) to ensure the schema object is correctly shaped and available for `better-auth`.
- **Admin Seeding**: The `scripts/seed-admin.ts` script uses direct DB access to update passwords (preserving User IDs) rather than API calls, as API calls require complex session mocking in a script context.

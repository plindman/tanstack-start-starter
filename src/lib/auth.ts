import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { admin, organization } from "better-auth/plugins";
import * as schema from "@/db/schema"; 

let db: any;

if (typeof Bun !== "undefined") {
  const dbModule = await import("@/db");
  db = dbModule.db;
} else {
  // Mock for CLI/Node environment where bun:sqlite is unavailable
  db = {
    _: {
        // The adapter works by checking properties on this internal object.
        // We don't need to pass schema here because we pass it explicitly in options below.
    },
  };
}

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema: { ...schema }
    }),
    plugins: [
        tanstackStartCookies(), 
        admin(),
        organization()
    ],
    emailAndPassword: {
        enabled: true,
        autoSignIn: true
    }
});
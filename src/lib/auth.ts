import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import { tanstackStartCookies } from "better-auth/integrations/tanstack-start";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        // TODO use env variable to switch
        provider: "sqlite" //  "pg", "mysql", "sqlite"
    }),
    plugins: [tanstackStartCookies()],
    emailAndPassword: {
        enabled: true
    }
});
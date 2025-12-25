import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { admin } from "better-auth/plugins";
import { db } from "@/db"; // your drizzle instance

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        // TODO use env variable to switch
        provider: "sqlite" //  "pg", "mysql", "sqlite"
    }),
    plugins: [
        tanstackStartCookies(), 
        admin()
    ],
    emailAndPassword: {
        enabled: true,
        autoSignIn: true // useful for the seed script potentially, or just general UX
    }
});
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        // TODO use env variable to switch
        provider: "sqlite" //  "pg", "mysql", "sqlite"
    }),
});
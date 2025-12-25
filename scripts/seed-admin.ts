import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

async function main() {
    console.log("🌱 Seeding Admin User...");

    // 1. Check if any admin exists
    const admins = await db.select().from(user).where(eq(user.role, "admin"));
    
    if (admins.length > 0) {
        console.log("✅ Admin user already exists. Skipping seed.");
        process.exit(0);
    }

    // 2. Get credentials from Args or Env
    const email = process.env.ADMIN_EMAIL || "admin@example.com";
    const password = process.env.ADMIN_PASSWORD || "password123";
    const name = "System Admin";

    console.log(`Creating admin user: ${email}`);

    // 3. Create User via Better-Auth API
    // We use the internal API to ensure proper hashing/session handling if needed
    // But mostly for convenience.
    // Note: We need a request context mock if using some plugins, but raw signUpEmail usually works in scripts
    // if we don't rely on headers.
    
    try {
        const res = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
                // role: "admin" // Removed to avoid ROLE_IS_NOT_ALLOWED_TO_BE_SET error. We set it manually below.
                // Note: autoSignIn: false might be needed if we don't want a session token returned/set
            },
            asResponse: false // Return data directly
        });

        if (res?.user) {
             // Explicitly set role if the signUp didn't (some configs block role setting on signup)
             // But admin plugin usually allows it if configured, or we update manually.
             // Let's verify and update just in case.
             await db.update(user).set({ role: 'admin' }).where(eq(user.id, res.user.id));
             console.log("🎉 Admin created successfully!");
             console.log(`📧 Email: ${email}`);
             console.log(`🔑 Password: ${password}`);
        }
    } catch (e) {
        console.error("❌ Failed to create admin:", e);
        process.exit(1);
    }
}

main();

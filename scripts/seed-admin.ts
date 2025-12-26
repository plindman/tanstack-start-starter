import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schema"; 
import { eq } from "drizzle-orm";

async function main() {
    console.log("🌱 Seeding Admin User...");

    const email = process.env.ADMIN_EMAIL || "admin@example.com";
    const password = process.env.ADMIN_PASSWORD || "password123";
    const name = "System Admin";

    // 1. Check if user exists
    const existingUsers = await db.select().from(user).where(eq(user.email, email));
    
    if (existingUsers.length > 0) {
        console.log(`⚠️  User ${email} found. Updating credentials...`);
        const targetUser = existingUsers[0];

        try {
            // Import internal hashing util (available in better-auth/crypto)
            const { hashPassword } = await import("better-auth/crypto");
            const hashedPassword = await hashPassword(password);
            
            // 1. Update Password in 'account' table
            const { account } = await import("@/db/schema");
            await db.update(account)
                .set({ password: hashedPassword })
                .where(eq(account.userId, targetUser.id));

            // 2. Ensure Admin Role
            await db.update(user)
                .set({ role: 'admin', name, banned: false })
                .where(eq(user.id, targetUser.id));

            console.log("✅ Credentials updated successfully.");
            return;
        } catch (e) {
            console.error("❌ Failed to update admin:", e);
            process.exit(1);
        }
    } else {
        console.log("✨ Creating new admin user...");
    }

    // 2. Create User if not exists (or deleted)
    try {
        const res = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
            },
            asResponse: false
        });

        if (res?.user) {
             await db.update(user).set({ role: 'admin' }).where(eq(user.id, res.user.id));
             console.log("✅ Admin created successfully!");
             console.log(`📧 Email: ${email}`);
             console.log(`🔑 Password: ${password}`);
        }
    } catch (e) {
        console.error("❌ Failed to seed admin:", e);
        process.exit(1);
    }
}

main();

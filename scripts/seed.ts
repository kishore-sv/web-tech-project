import { db } from "../lib/db";
import { users } from "../lib/schema";
import bcrypt from "bcrypt";

async function seed() {
    const adminEmail = "admin@example.com";
    const adminPassword = "password123";
    const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

    console.log("Seeding database...");

    try {
        await db.insert(users).values({
            name: "Admin User",
            email: adminEmail,
            password: hashedAdminPassword,
            role: "ADMIN",
        }).onConflictDoNothing();

        console.log("Seeding completed successfully!");
        console.log(`Admin credentials: ${adminEmail} / ${adminPassword}`);
    } catch (error) {
        console.error("Seeding failed:", error);
    } finally {
        process.exit(0);
    }
}

seed();

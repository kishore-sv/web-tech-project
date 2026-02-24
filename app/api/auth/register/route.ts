import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, password } = registerSchema.parse(body);

        const hashedPassword = await bcrypt.hash(password, 10);

        const [user] = await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
            role: "USER",
        }).returning();

        return NextResponse.json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.flatten() }, { status: 400 });
        }
        return NextResponse.json({ error: "User already exists or internal error" }, { status: 500 });
    }
}

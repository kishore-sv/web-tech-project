import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { resources } from "@/lib/schema";
import { eq, or, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await auth();
    const isAdmin = (session?.user as any)?.role === "ADMIN";

    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject");

    try {
        let query = db.select().from(resources);

        const conditions = [];

        if (!isAdmin) {
            conditions.push(eq(resources.status, "APPROVED"));
        }

        if (subject && subject !== "all") {
            conditions.push(eq(resources.subject, subject));
        }

        const data = await (conditions.length > 0
            ? query.where(and(...conditions))
            : query);

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

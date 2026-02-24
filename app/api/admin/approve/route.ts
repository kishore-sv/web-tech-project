import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { resources } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await auth();
    if ((session?.user as any)?.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id, status } = await req.json();

        if (!id || !status) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const [updatedResource] = await db
            .update(resources)
            .set({ status })
            .where(eq(resources.id, id))
            .returning();

        return NextResponse.json(updatedResource);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

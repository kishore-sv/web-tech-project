import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { resources } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import ResourceCard from "@/components/ResourceCard";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user) redirect("/login");

    const userId = (session.user as any).id;
    const userResources = await db
        .select()
        .from(resources)
        .where(eq(resources.uploadedBy, userId))
        .orderBy(desc(resources.createdAt));

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex flex-col gap-8">
                <div>
                    <h1 className="text-3xl font-bold">Welcome, {session.user.name}</h1>
                    <p className="text-muted-foreground">Manage your uploaded educational resources</p>
                </div>

                <section>
                    <h2 className="text-xl font-semibold mb-6">Your Uploads</h2>
                    {userResources.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/50">
                            <p className="text-muted-foreground">You haven't uploaded any resources yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userResources.map((resource) => (
                                <ResourceCard key={resource.id} resource={resource} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

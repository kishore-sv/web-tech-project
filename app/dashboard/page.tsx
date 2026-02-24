import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { resources } from "@/lib/schema";
import { eq, desc, count } from "drizzle-orm";
import ResourceCard from "@/components/ResourceCard";
import { redirect } from "next/navigation";
import { Upload, CheckCircle, Clock, LayoutDashboard, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user) redirect("/login");

    const userId = (session.user as any).id;
    const userResources = await db
        .select()
        .from(resources)
        .where(eq(resources.uploadedBy, userId))
        .orderBy(desc(resources.createdAt));

    const stats = {
        total: userResources.length,
        approved: userResources.filter(r => r.status === "APPROVED").length,
        pending: userResources.filter(r => r.status === "PENDING").length,
    };

    return (
        <div className="min-h-screen bg-muted/20">
            <div className="container mx-auto py-12 px-4 space-y-12">
                {/* Welcome Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-8 rounded-[2rem] border shadow-sm">
                    <div className="space-y-2">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                            Welcome back, <span className="text-primary">{session.user.name}</span>!
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Manage your contributions and track your resource impact.
                        </p>
                    </div>
                    <Link href="/upload">
                        <Button className="h-12 px-8 rounded-2xl shadow-lg shadow-primary/20 group">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload New
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-card p-6 rounded-3xl border shadow-sm flex items-center gap-5">
                        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <Upload className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total Uploads</p>
                            <h3 className="text-3xl font-black">{stats.total}</h3>
                        </div>
                    </div>
                    <div className="bg-card p-6 rounded-3xl border shadow-sm flex items-center gap-5">
                        <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                            <CheckCircle className="h-7 w-7 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Approved</p>
                            <h3 className="text-3xl font-black text-emerald-600">{stats.approved}</h3>
                        </div>
                    </div>
                    <div className="bg-card p-6 rounded-3xl border shadow-sm flex items-center gap-5">
                        <div className="h-14 w-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                            <Clock className="h-7 w-7 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Pending Approval</p>
                            <h3 className="text-3xl font-black text-amber-600">{stats.pending}</h3>
                        </div>
                    </div>
                </div>

                {/* User Content */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 px-2">
                        <div className="h-8 w-8 rounded-lg bg-foreground/5 flex items-center justify-center">
                            <LayoutDashboard className="h-4 w-4" />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">Your Contributions</h2>
                    </div>

                    {userResources.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 bg-card rounded-[2rem] border-2 border-dashed">
                            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
                                <Upload className="h-10 w-10 text-muted-foreground/30" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Ready to contribute?</h3>
                            <p className="text-muted-foreground max-w-sm text-center mb-8">
                                Your educational resources can help fellow students. Start by uploading your first document today.
                            </p>
                            <Link href="/upload">
                                <Button variant="outline" className="h-12 px-8 rounded-xl border-2">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

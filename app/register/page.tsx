"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { GraduationCap, UserPlus, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                toast.success("Account created successfully!", {
                    description: "You can now sign in with your credentials.",
                });
                router.push("/login");
            } else {
                const data = await res.json();
                toast.error(data.error || "Registration failed");
            }
        } catch (error) {
            toast.error("An error occurred during registration");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background py-10">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/20 mb-4 animate-in zoom-in duration-500">
                        <GraduationCap className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight">Join the community</h1>
                    <p className="text-muted-foreground">Start sharing and accessing educational resources today</p>
                </div>

                <Card className="border-muted/50 shadow-2xl shadow-primary/5 rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="pt-10 pb-6 px-10">
                        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                        <CardDescription>Enter your details below to get started</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4 px-10">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="John Doe"
                                    required
                                    className="h-12 rounded-2xl bg-muted/30 border-transparent focus:bg-background focus:ring-primary/20 transition-all px-4"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    className="h-12 rounded-2xl bg-muted/30 border-transparent focus:bg-background focus:ring-primary/20 transition-all px-4"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Min 6 characters"
                                    className="h-12 rounded-2xl bg-muted/30 border-transparent focus:bg-background focus:ring-primary/20 transition-all px-4"
                                />
                            </div>

                            <div className="bg-primary/5 p-4 rounded-2xl space-y-2 border border-primary/10">
                                <div className="flex items-center gap-2 text-[11px] font-bold text-primary uppercase tracking-wider">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Benefits of Joining
                                </div>
                                <p className="text-[11px] text-muted-foreground font-medium">
                                    Access 10,000+ approved resources, contribute your own materials, and join a global community of learners.
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-6 px-10 pb-10">
                            <Button type="submit" className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 group" disabled={loading}>
                                {loading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        Create Account
                                        <UserPlus className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </Button>
                            <p className="text-sm text-center text-muted-foreground font-medium">
                                Already have an account?{" "}
                                <Link href="/login" className="text-primary font-bold hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}

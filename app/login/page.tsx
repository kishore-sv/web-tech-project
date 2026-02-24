"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { GraduationCap, LogIn, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                toast.error("Invalid credentials", {
                    description: "Please check your email and password.",
                });
            } else {
                toast.success("Welcome back!", {
                    description: "Login successful.",
                });
                router.push("/dashboard");
                router.refresh();
            }
        } catch (error) {
            toast.error("An error occurred during sign in");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/20 mb-4 animate-in zoom-in duration-500">
                        <GraduationCap className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight">Welcome back</h1>
                    <p className="text-muted-foreground">Sign in to access your dashboard and resources</p>
                </div>

                <Card className="border-muted/50 shadow-2xl shadow-primary/5 rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="pt-10 pb-6 px-10">
                        <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
                        <CardDescription>Enter your credentials to continue</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-5 px-10">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
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
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                                    <Link href="#" className="text-xs font-semibold text-primary hover:underline">Forgot password?</Link>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="h-12 rounded-2xl bg-muted/30 border-transparent focus:bg-background focus:ring-primary/20 transition-all px-4"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-6 px-10 pb-10">
                            <Button type="submit" className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 group" disabled={loading}>
                                {loading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <LogIn className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </Button>
                            <div className="relative w-full">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-muted" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-2 text-muted-foreground font-semibold">New here?</span>
                                </div>
                            </div>
                            <Link href="/register" className="w-full">
                                <Button variant="outline" className="w-full h-12 rounded-2xl border-2 font-semibold">
                                    Create account
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}

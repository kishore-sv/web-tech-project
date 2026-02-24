"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const { data: session } = useSession();
    const role = (session?.user as any)?.role;

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-xl font-bold tracking-tight">
                    EduResources
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/resources" className="text-sm font-medium hover:text-primary">
                        Browse
                    </Link>
                    {session ? (
                        <>
                            <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                                Dashboard
                            </Link>
                            <Link href="/upload" className="text-sm font-medium hover:text-primary">
                                Upload
                            </Link>
                            {role === "ADMIN" && (
                                <Link href="/admin" className="text-sm font-medium hover:text-primary">
                                    Admin
                                </Link>
                            )}
                            <Button variant="ghost" size="sm" onClick={() => signOut()}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" size="sm">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm">Register</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

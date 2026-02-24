"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { GraduationCap, LogOut, LayoutDashboard, Upload, Shield, Library } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const role = (session?.user as any)?.role;

    const navItems = [
        { label: "Resources", href: "/resources", icon: Library },
        ...(session ? [
            { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { label: "Upload", href: "/upload", icon: Upload },
            ...(role === "ADMIN" ? [{ label: "Admin", href: "/admin", icon: Shield }] : []),
        ] : []),
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                        <GraduationCap className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                        EduResources
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "gap-2 px-4 font-medium transition-all duration-200",
                                    pathname === item.href
                                        ? "bg-secondary text-secondary-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Button>
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    {session ? (
                        <div className="flex items-center gap-2 pl-2 border-l ml-1">
                            <span className="hidden sm:inline-block text-sm font-medium px-2 py-1 rounded-full bg-muted">
                                {session.user?.name}
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => signOut()}
                                title="Logout"
                            >
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="font-medium">
                                    Login
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="sm" className="font-medium shadow-lg shadow-primary/20">
                                    Join Now
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

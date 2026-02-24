import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const role = (req.auth?.user as any)?.role;

    const isProtectedRoute = ["/dashboard", "/upload", "/admin"].some((path) =>
        nextUrl.pathname.startsWith(path)
    );

    const isAdminRoute = nextUrl.pathname.startsWith("/admin");

    if (isProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", nextUrl));
    }

    if (isAdminRoute && role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/dashboard/:path*", "/upload/:path*", "/admin/:path*"],
};

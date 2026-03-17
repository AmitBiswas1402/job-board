import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes (accessible without authentication)
const publicRoutes = createRouteMatcher([
  "/",
  "/sign-in(/.*)?",
  "/sign-up(/.*)?",
  "/search(/.*)?",
  "/category(/.*)?"
]);

// Define protected routes (require authentication)
const protectedRoutes = createRouteMatcher([
  "/select-role(/.*)?"
]);

// Define owner-only routes (require restaurant_owner role)
const ownerRoutes = createRouteMatcher([
  "/dashboard/owner(/.*)?"
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, sessionClaims } = await auth();
  const pathname = req.nextUrl.pathname;

  // Get user role from Clerk public metadata
  const role = (sessionClaims?.publicMetadata as { role?: string } | undefined)?.role;

  // Logic: if user is authenticated
  if (userId) {
    // If user is trying to access role selection page and already has a role
    if (pathname === "/select-role" && role) {
      // Redirect to appropriate dashboard based on role
      const redirectUrl = role === "restaurant_owner" ? "/dashboard/owner" : "/";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    // If user is trying to access owner-only routes
    if (ownerRoutes(req)) {
      // Check if user has restaurant_owner role
      if (role !== "restaurant_owner") {
        // Redirect to unauthorized page
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    // If user is authenticated but doesn't have a role and tries to access protected routes
    // Allow access to public routes and select-role page without role
    if (!publicRoutes(req) && !protectedRoutes(req) && !role && !pathname.includes("/sign-out")) {
      // If trying to access any protected route without a role, redirect to select-role
      return NextResponse.redirect(new URL("/select-role", req.url));
    }
  }

  // If user is NOT authenticated
  if (!userId) {
    // If trying to access owner routes, redirect to sign-in
    if (ownerRoutes(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // If trying to access select-role without authentication, redirect to sign-in
    if (pathname === "/select-role") {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  // Allow request to proceed
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

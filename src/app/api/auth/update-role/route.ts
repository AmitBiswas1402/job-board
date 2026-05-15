import { NextResponse, NextRequest } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { getPrisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // Check if user is authenticated via Clerk
    // The session is automatically available from the request if user is authenticated
    const clerkUserId = req.headers.get('x-clerk-user-id');
    const userId = clerkUserId;
    
    console.log("Update role request - userId from header:", userId);
    console.log("Headers available:", Array.from(req.headers.keys()).filter(h => h.includes('clerk') || h.includes('auth')));
    
    if (!userId) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

    const body = await req.json();
    const role = body?.role;
    
    if (!role) return NextResponse.json({ error: "missing role" }, { status: 400 });

    // get some basic clerk profile info for Prisma create if needed
    const prisma = await getPrisma();
    const clerkUser = await clerkClient.users.getUser(userId);
    const email = clerkUser.emailAddresses?.[0]?.emailAddress ?? "";
    const name = clerkUser.firstName || clerkUser.fullName || "";

    await prisma.user.upsert({
      where: { id: userId },
      update: { role },
      create: {
        id: userId,
        name: name || "",
        email: email || `${userId}@clerk.local`,
        password: "",
        role,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Update role error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

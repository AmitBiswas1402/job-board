import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  const body = await req.json();
  const role = body?.role;
  if (!role) return NextResponse.json({ error: "missing role" }, { status: 400 });

  // get some basic clerk profile info for Prisma create if needed
  try {
    const clerkUser = await clerkClient.users.getUser(userId);
    const email = clerkUser.emailAddresses?.[0]?.emailAddress ?? "";
    const name = clerkUser.firstName || clerkUser.fullName || "";

    await prisma.user.upsert({
      where: { id: userId },
      update: { role, roleSelectedAt: new Date() },
      create: {
        id: userId,
        name: name || "",
        email: email || `${userId}@clerk.local`,
        password: "",
        role,
        roleSelectedAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

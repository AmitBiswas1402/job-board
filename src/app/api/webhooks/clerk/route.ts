import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const type = body?.type;
    const data = body?.data || body?.resource;

    // handle user.created events (Clerk webhook payload may vary)
    if (type === "user.created" || (data && data.object && data.object.id)) {
      const userId = data.object?.id ?? data.id;
      if (!userId) return NextResponse.json({ ok: true });

      // fetch clerk user to get email/name
      const clerkUser = await clerkClient.users.getUser(userId);
      const email = clerkUser.emailAddresses?.[0]?.emailAddress ?? "";
      const name = clerkUser.firstName || clerkUser.fullName || "";

      await prisma.user.upsert({
        where: { id: userId },
        update: { name: name || "" },
        create: {
          id: userId,
          name: name || "",
          email: email || `${userId}@clerk.local`,
          password: "",
          role: "USER",
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}

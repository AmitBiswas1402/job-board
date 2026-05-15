import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getPrisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ role: null });

  try {
    const prisma = await getPrisma();
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return NextResponse.json({ role: user?.role ?? null });
  } catch (err) {
    console.error("Get role error:", err);
    return NextResponse.json({ role: null }, { status: 500 });
  }
}


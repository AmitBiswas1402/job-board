import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ role: null });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  return NextResponse.json({ role: user?.role ?? null });
}

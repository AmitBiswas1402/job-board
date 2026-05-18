"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { getPrisma } from "@/lib/prisma";

export async function updateUserRole(role: string, userId: string) {
  try {
    console.log("Server action called with userId:", userId, "role:", role);

    if (!userId) {
      console.error("No userId provided!");
      return { error: "unauthenticated", status: 401 };
    }

    if (!role) {
      return { error: "missing role", status: 400 };
    }

    // Get Clerk user data
    const clerkUser = await clerkClient.users.getUser(userId);
    const email = clerkUser.emailAddresses?.[0]?.emailAddress ?? "";
    const name = clerkUser.firstName || clerkUser.lastName 
      ? `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim()
      : clerkUser.username || "";

    // Update/create in database
    const prisma = await getPrisma();
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

    console.log("Role updated successfully for userId:", userId, "role:", role);
    return { ok: true };
  } catch (err) {
    console.error("Update role error:", err);
    return { error: "server_error", status: 500 };
  }
}

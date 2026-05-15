import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { getPrisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const headers = {
      "svix-id": req.headers.get("svix-id") || "",
      "svix-timestamp": req.headers.get("svix-timestamp") || "",
      "svix-signature": req.headers.get("svix-signature") || "",
    };

    // Verify webhook signature
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");
    let evt;
    try {
      evt = wh.verify(JSON.stringify(payload), headers) as any;
    } catch (err) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const type = evt.type;
    const data = evt.data;
    const prisma = await getPrisma();

    // Handle user.created events
    if (type === "user.created") {
      const userId = data?.id;
      if (!userId) return NextResponse.json({ ok: true });

      const email = data?.email_addresses?.[0]?.email_address ?? "";
      const name = data?.first_name || data?.last_name 
        ? `${data?.first_name || ""} ${data?.last_name || ""}`.trim()
        : "";

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

    // Handle user.deleted events
    if (type === "user.deleted") {
      const userId = data?.id;
      if (userId) {
        await prisma.user.delete({ where: { id: userId } }).catch(() => {});
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}

import type { NextRequest } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { createLeadSchema } from "@/lib/validations/leads";

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? null;
  }

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-client-ip")
  );
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const parsed = createLeadSchema.safeParse(payload);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid lead details" },
        { status: 400 }
      );
    }

    const ipAddress = getClientIp(request);

    await db
      .insert(leads)
      .values({
        name: parsed.data.name,
        email: parsed.data.email,
        city: parsed.data.city,
        ipAddress,
        currentLocation: parsed.data.currentLocation,
      })
      .onConflictDoUpdate({
        target: [leads.email, leads.city],
        set: {
          name: parsed.data.name,
          ipAddress,
          currentLocation: parsed.data.currentLocation,
          updatedAt: new Date(),
        },
      });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Failed to save lead", error);

    return Response.json(
      { error: "We couldn’t save your details right now. Please try again." },
      { status: 500 }
    );
  }
}

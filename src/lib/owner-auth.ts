import type { User } from "@supabase/supabase-js";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { owners } from "@/db/schema";
import { createClient } from "@/lib/supabase/server";

type OwnerRecord = typeof owners.$inferSelect;

export type OwnerContext = {
  user: User;
  owner: OwnerRecord | null;
  isOwner: boolean;
};

type UpsertOwnerProfileInput = {
  authUserId: string;
  fullName: string;
  email: string;
  phone?: string | null;
  companyName?: string | null;
};

async function findOwnerByUser(user: User) {
  const ownerByAuthUserId = await db.query.owners.findFirst({
    where: eq(owners.authUserId, user.id),
  });

  if (ownerByAuthUserId) {
    return ownerByAuthUserId;
  }

  if (!user.email) {
    return null;
  }

  return db.query.owners.findFirst({
    where: eq(owners.email, user.email),
  });
}

export async function upsertOwnerProfile(input: UpsertOwnerProfileInput) {
  const [owner] = await db
    .insert(owners)
    .values({
      authUserId: input.authUserId,
      fullName: input.fullName,
      email: input.email,
      phone: input.phone ?? null,
      companyName: input.companyName ?? null,
    })
    .onConflictDoUpdate({
      target: owners.email,
      set: {
        authUserId: input.authUserId,
        fullName: input.fullName,
        phone: input.phone ?? null,
        companyName: input.companyName ?? null,
        updatedAt: new Date(),
      },
    })
    .returning();

  return owner;
}

export async function getCurrentOwnerContext(): Promise<OwnerContext | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const owner = await findOwnerByUser(user);

  return {
    user,
    owner,
    isOwner: user.user_metadata?.role === "owner",
  };
}

export async function requireOwnerContext(loginPath: string) {
  const context = await getCurrentOwnerContext();

  if (!context?.user || !context.isOwner) {
    redirect(loginPath);
  }

  if (context.owner) {
    return {
      ...context,
      owner: context.owner,
    };
  }

  if (!context.user.email) {
    redirect(loginPath);
  }

  const owner = await upsertOwnerProfile({
    authUserId: context.user.id,
    fullName:
      context.user.user_metadata?.full_name ??
      context.user.email.split("@")[0] ??
      "Owner",
    email: context.user.email,
    phone: context.user.phone ?? null,
    companyName: context.user.user_metadata?.company_name ?? null,
  });

  return {
    ...context,
    owner,
  };
}

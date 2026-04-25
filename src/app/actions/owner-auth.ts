"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { upsertOwnerProfile } from "@/lib/owner-auth";
import {
  ownerLoginSchema,
  ownerSignupSchema,
} from "@/lib/validations/owner-auth";

export type OwnerAuthResult = {
  error?: string;
  success?: boolean;
};

export async function signupOwnerWithEmail(
  _prevState: OwnerAuthResult,
  formData: FormData
): Promise<OwnerAuthResult> {
  const redirectTo = (formData.get("redirectTo") as string) || "/business/dashboard";
  const raw = {
    fullName: formData.get("fullName"),
    companyName: formData.get("companyName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
  };

  const parsed = ownerSignupSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.fullName,
        company_name: parsed.data.companyName,
        role: "owner",
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (!data.user?.id) {
    return { error: "We couldn’t create your owner account right now." };
  }

  await upsertOwnerProfile({
    authUserId: data.user.id,
    fullName: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    companyName: parsed.data.companyName,
  });

  redirect(redirectTo);
}

export async function loginOwnerWithEmail(
  _prevState: OwnerAuthResult,
  formData: FormData
): Promise<OwnerAuthResult> {
  const redirectTo = (formData.get("redirectTo") as string) || "/business/dashboard";
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = ownerLoginSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user?.user_metadata?.role !== "owner") {
    await supabase.auth.signOut();

    return {
      error: "This account does not have owner access. Please sign up through the business portal.",
    };
  }

  if (!data.user.email) {
    return { error: "Your account is missing an email address." };
  }

  await upsertOwnerProfile({
    authUserId: data.user.id,
    fullName:
      data.user.user_metadata?.full_name ??
      data.user.email.split("@")[0] ??
      "Owner",
    email: data.user.email,
    phone: data.user.phone ?? null,
    companyName: data.user.user_metadata?.company_name ?? null,
  });

  redirect(redirectTo);
}

export async function logoutOwner(formData: FormData) {
  const redirectTo = (formData.get("redirectTo") as string) || "/business";
  const supabase = await createClient();

  await supabase.auth.signOut();
  redirect(redirectTo);
}

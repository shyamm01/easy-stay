"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  signupSchema,
  loginEmailSchema,
  loginPhoneSchema,
  verifyOtpSchema,
} from "@/lib/validations/auth";

export type AuthResult = {
  error?: string;
  success?: boolean;
  redirectTo?: string;
};

// ─── Sign Up with Email + Password ──────────────────────────
export async function signupWithEmail(
  _prevState: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const raw = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = signupSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.fullName,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

// ─── Log In with Email + Password ───────────────────────────
export async function loginWithEmail(
  _prevState: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = loginEmailSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  const redirectTo = formData.get("redirect") as string;
  redirect(redirectTo || "/dashboard");
}

// ─── Send OTP to Phone ──────────────────────────────────────
export async function sendPhoneOtp(
  _prevState: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const raw = {
    phone: formData.get("phone") as string,
  };

  const parsed = loginPhoneSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({
    phone: parsed.data.phone,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true, redirectTo: `/verify-otp?phone=${encodeURIComponent(parsed.data.phone)}` };
}

// ─── Verify OTP ─────────────────────────────────────────────
export async function verifyPhoneOtp(
  _prevState: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const raw = {
    phone: formData.get("phone") as string,
    otp: formData.get("otp") as string,
  };

  const parsed = verifyOtpSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    phone: parsed.data.phone,
    token: parsed.data.otp,
    type: "sms",
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

// ─── Log Out ────────────────────────────────────────────────
export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

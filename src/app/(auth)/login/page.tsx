"use client";

import { Suspense, useActionState, useEffect, useState } from "react";
import { loginWithEmail, sendPhoneOtp, type AuthResult } from "@/app/actions/auth";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

type AuthTab = "email" | "phone";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-md" />}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const [tab, setTab] = useState<AuthTab>("email");
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectTo = searchParams.get("redirect") || "";

  // Email login
  const [emailState, emailAction, emailPending] = useActionState<AuthResult, FormData>(
    loginWithEmail,
    {}
  );

  // Phone OTP
  const [phoneState, phoneAction, phonePending] = useActionState<AuthResult, FormData>(
    sendPhoneOtp,
    {}
  );

  // Redirect to verify-otp page on success
  useEffect(() => {
    if (phoneState.success && phoneState.redirectTo) {
      router.push(phoneState.redirectTo);
    }
  }, [phoneState, router]);

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <div className="glass rounded-3xl p-8 shadow-2xl border border-white/60">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-bold text-dark-900 mb-2"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Welcome Back 👋
          </h1>
          <p className="text-dark-500 text-sm">
            Log in to find your perfect room
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-dark-100/50 p-1 mb-6">
          <button
            type="button"
            onClick={() => setTab("email")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              tab === "email"
                ? "bg-white text-dark-900 shadow-md"
                : "text-dark-500 hover:text-dark-700"
            }`}
          >
            📧 Email
          </button>
          <button
            type="button"
            onClick={() => setTab("phone")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              tab === "phone"
                ? "bg-white text-dark-900 shadow-md"
                : "text-dark-500 hover:text-dark-700"
            }`}
          >
            📱 Phone
          </button>
        </div>

        {/* Email Form */}
        {tab === "email" && (
          <form action={emailAction} className="space-y-4">
            <input type="hidden" name="redirect" value={redirectTo} />

            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-dark-700 mb-1.5">
                Email Address
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-dark-200 bg-white/80 text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-dark-700 mb-1.5">
                Password
              </label>
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-dark-200 bg-white/80 text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm"
              />
            </div>

            {emailState.error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                <span>⚠️</span> {emailState.error}
              </div>
            )}

            <button
              type="submit"
              disabled={emailPending}
              className="w-full btn-primary !rounded-xl !py-3.5 !text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {emailPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Log In →"
              )}
            </button>
          </form>
        )}

        {/* Phone Form */}
        {tab === "phone" && (
          <form action={phoneAction} className="space-y-4">
            <div>
              <label htmlFor="login-phone" className="block text-sm font-medium text-dark-700 mb-1.5">
                Phone Number
              </label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 py-3 rounded-xl border border-dark-200 bg-dark-50 text-dark-600 text-sm font-medium">
                  🇮🇳 +91
                </div>
                <input
                  id="login-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="9876543210"
                  maxLength={10}
                  onChange={(e) => {
                    // Auto-prepend +91 to the hidden field
                    const hidden = document.getElementById("phone-hidden") as HTMLInputElement;
                    if (hidden) hidden.value = `+91${e.target.value.replace(/\D/g, "")}`;
                  }}
                  className="flex-1 px-4 py-3 rounded-xl border border-dark-200 bg-white/80 text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm tracking-wider"
                />
                <input type="hidden" id="phone-hidden" name="phone" />
              </div>
              <p className="text-xs text-dark-400 mt-1.5">
                We&apos;ll send a 6-digit OTP to verify your number
              </p>
            </div>

            {phoneState.error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                <span>⚠️</span> {phoneState.error}
              </div>
            )}

            <button
              type="submit"
              disabled={phonePending}
              className="w-full btn-primary !rounded-xl !py-3.5 !text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {phonePending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
                  </svg>
                  Sending OTP...
                </span>
              ) : (
                "Send OTP →"
              )}
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="mt-6 pt-6 border-t border-dark-200/50 text-center">
          <p className="text-sm text-dark-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

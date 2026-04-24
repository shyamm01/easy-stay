"use client";

import { useActionState } from "react";
import { signupWithEmail, type AuthResult } from "@/app/actions/auth";
import Link from "next/link";

export default function SignupPage() {
  const [state, action, pending] = useActionState<AuthResult, FormData>(
    signupWithEmail,
    {}
  );

  return (
    <div className="w-full max-w-md">
      <div className="glass rounded-3xl p-8 shadow-2xl border border-white/60">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-bold text-dark-900 mb-2"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Create Your Account 🏠
          </h1>
          <p className="text-dark-500 text-sm">
            Join 500+ people already on the waitlist
          </p>
        </div>

        {/* Form */}
        <form action={action} className="space-y-4">
          <div>
            <label htmlFor="signup-name" className="block text-sm font-medium text-dark-700 mb-1.5">
              Full Name
            </label>
            <input
              id="signup-name"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              placeholder="Rahul Sharma"
              className="w-full px-4 py-3 rounded-xl border border-dark-200 bg-white/80 text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm"
            />
          </div>

          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-dark-700 mb-1.5">
              Email Address
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-dark-200 bg-white/80 text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm"
            />
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-dark-700 mb-1.5">
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Min 8 chars, 1 letter, 1 number"
              className="w-full px-4 py-3 rounded-xl border border-dark-200 bg-white/80 text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm"
            />
            <div className="flex gap-1 mt-2">
              <div className="h-1 flex-1 rounded-full bg-dark-200" />
              <div className="h-1 flex-1 rounded-full bg-dark-200" />
              <div className="h-1 flex-1 rounded-full bg-dark-200" />
            </div>
          </div>

          {state.error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              <span>⚠️</span> {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full btn-primary !rounded-xl !py-3.5 !text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {pending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
                </svg>
                Creating account...
              </span>
            ) : (
              "Create Account →"
            )}
          </button>

          <p className="text-xs text-dark-400 text-center leading-relaxed">
            By signing up, you agree to our{" "}
            <a href="#" className="underline hover:text-dark-600">Terms</a>
            {" "}and{" "}
            <a href="#" className="underline hover:text-dark-600">Privacy Policy</a>
          </p>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-dark-200/50 text-center">
          <p className="text-sm text-dark-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

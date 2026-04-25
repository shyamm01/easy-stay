"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  loginOwnerWithEmail,
  type OwnerAuthResult,
} from "@/app/actions/owner-auth";

type OwnerLoginFormProps = {
  portalBasePath: string;
  redirectTo: string;
  initialError?: string;
};

export default function OwnerLoginForm({
  portalBasePath,
  redirectTo,
  initialError,
}: OwnerLoginFormProps) {
  const [state, action, pending] = useActionState<OwnerAuthResult, FormData>(
    loginOwnerWithEmail,
    initialError ? { error: initialError } : {}
  );

  return (
    <div className="w-full max-w-md">
      <div className="glass rounded-3xl p-8 shadow-2xl border border-white/60">
        <div className="text-center mb-8">
          <div className="section-badge mx-auto mb-4">
            <span>🏢</span> EasyStay Business
          </div>
          <h1
            className="text-2xl font-bold text-dark-900 mb-2"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Owner Login
          </h1>
          <p className="text-dark-500 text-sm">
            Manage listings, properties, floors, and room inventory from one place.
          </p>
        </div>

        <form action={action} className="space-y-4">
          <input type="hidden" name="redirectTo" value={redirectTo} />

          <div>
            <label
              htmlFor="owner-login-email"
              className="block text-sm font-medium text-dark-700 mb-1.5"
            >
              Business Email
            </label>
            <input
              id="owner-login-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="owner@example.com"
              className="w-full px-4 py-3 rounded-xl border border-dark-200 bg-white/80 text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="owner-login-password"
              className="block text-sm font-medium text-dark-700 mb-1.5"
            >
              Password
            </label>
            <input
              id="owner-login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl border border-dark-200 bg-white/80 text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm"
            />
          </div>

          {state.error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full btn-primary !rounded-xl !py-3.5 !text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {pending ? "Logging in..." : "Log in to business portal"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-dark-200/50 text-center">
          <p className="text-sm text-dark-500">
            New owner or property manager?{" "}
            <Link
              href={`${portalBasePath}/signup`}
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Create an owner account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

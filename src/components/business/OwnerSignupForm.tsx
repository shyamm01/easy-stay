"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  signupOwnerWithEmail,
  type OwnerAuthResult,
} from "@/app/actions/owner-auth";

type OwnerSignupFormProps = {
  portalBasePath: string;
  redirectTo: string;
};

export default function OwnerSignupForm({
  portalBasePath,
  redirectTo,
}: OwnerSignupFormProps) {
  const [state, action, pending] = useActionState<OwnerAuthResult, FormData>(
    signupOwnerWithEmail,
    {}
  );

  return (
    <div className="w-full max-w-lg">
      <div className="glass rounded-3xl p-8 shadow-2xl border border-white/60">
        <div className="text-center mb-8">
          <div className="section-badge mx-auto mb-4">
            <span>🚀</span> EasyStay Business
          </div>
          <h1
            className="text-2xl font-bold text-dark-900 mb-2"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Create Your Owner Account
          </h1>
          <p className="text-dark-500 text-sm">
            Set up a dedicated owner login to publish properties and manage active listings.
          </p>
        </div>

        <form action={action} className="space-y-4">
          <input type="hidden" name="redirectTo" value={redirectTo} />

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="owner-signup-name"
                className="block text-sm font-medium text-dark-700 mb-1.5"
              >
                Full Name
              </label>
              <input
                id="owner-signup-name"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                placeholder="Shyam Kumar"
                className="w-full px-4 py-3 rounded-xl border border-dark-200 bg-white/80 text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="owner-signup-company"
                className="block text-sm font-medium text-dark-700 mb-1.5"
              >
                Business Name
              </label>
              <input
                id="owner-signup-company"
                name="companyName"
                type="text"
                placeholder="EasyStay Properties"
                className="w-full px-4 py-3 rounded-xl border border-dark-200 bg-white/80 text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="owner-signup-email"
                className="block text-sm font-medium text-dark-700 mb-1.5"
              >
                Business Email
              </label>
              <input
                id="owner-signup-email"
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
                htmlFor="owner-signup-phone"
                className="block text-sm font-medium text-dark-700 mb-1.5"
              >
                Phone Number
              </label>
              <input
                id="owner-signup-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+919876543210"
                className="w-full px-4 py-3 rounded-xl border border-dark-200 bg-white/80 text-dark-900 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="owner-signup-password"
              className="block text-sm font-medium text-dark-700 mb-1.5"
            >
              Password
            </label>
            <input
              id="owner-signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Minimum 8 characters with letters and numbers"
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
            {pending ? "Creating owner account..." : "Create owner account"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-dark-200/50 text-center">
          <p className="text-sm text-dark-500">
            Already have owner access?{" "}
            <Link
              href={`${portalBasePath}/login`}
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

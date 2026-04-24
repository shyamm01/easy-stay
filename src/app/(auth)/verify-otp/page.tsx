"use client";

import { Suspense, useActionState, useEffect, useRef } from "react";
import { verifyPhoneOtp, sendPhoneOtp, type AuthResult } from "@/app/actions/auth";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-md" />}>
      <VerifyOtpPageContent />
    </Suspense>
  );
}

function VerifyOtpPageContent() {
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "";
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [verifyState, verifyAction, verifyPending] = useActionState<AuthResult, FormData>(
    verifyPhoneOtp,
    {}
  );

  const [resendState, resendAction, resendPending] = useActionState<AuthResult, FormData>(
    sendPhoneOtp,
    {}
  );

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Handle individual digit input + auto-advance
  const handleDigitInput = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const input = inputRefs.current[index];
    if (input) input.value = value;

    // Auto-advance to next
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Combine all digits into hidden field
    const combined = inputRefs.current.map((el) => el?.value || "").join("");
    const hiddenOtp = document.getElementById("otp-combined") as HTMLInputElement;
    if (hiddenOtp) hiddenOtp.value = combined;
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !inputRefs.current[index]?.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    pasted.split("").forEach((char, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i]!.value = char;
      }
    });
    const hiddenOtp = document.getElementById("otp-combined") as HTMLInputElement;
    if (hiddenOtp) hiddenOtp.value = pasted;
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const maskedPhone = phone ? `${phone.slice(0, 4)}****${phone.slice(-3)}` : "";

  return (
    <div className="w-full max-w-md">
      <div className="glass rounded-3xl p-8 shadow-2xl border border-white/60">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-100 flex items-center justify-center text-3xl">
            📱
          </div>
          <h1
            className="text-2xl font-bold text-dark-900 mb-2"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Verify Your Phone
          </h1>
          <p className="text-dark-500 text-sm">
            Enter the 6-digit code sent to{" "}
            <span className="font-semibold text-dark-700">{maskedPhone}</span>
          </p>
        </div>

        {/* OTP Form */}
        <form action={verifyAction} className="space-y-6">
          <input type="hidden" name="phone" value={phone} />
          <input type="hidden" name="otp" id="otp-combined" />

          {/* 6 Digit Boxes */}
          <div className="flex justify-center gap-3" onPaste={handlePaste}>
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                pattern="[0-9]"
                aria-label={`Digit ${i + 1}`}
                onChange={(e) => handleDigitInput(i, e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 border-dark-200 bg-white/80 text-dark-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
              />
            ))}
          </div>

          {(verifyState.error || resendState.error) && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              <span>⚠️</span> {verifyState.error || resendState.error}
            </div>
          )}

          {resendState.success && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
              <span>✅</span> OTP resent successfully!
            </div>
          )}

          <button
            type="submit"
            disabled={verifyPending}
            className="w-full btn-primary !rounded-xl !py-3.5 !text-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {verifyPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
                </svg>
                Verifying...
              </span>
            ) : (
              "Verify & Continue →"
            )}
          </button>
        </form>

        {/* Resend */}
        <div className="mt-6 pt-6 border-t border-dark-200/50 text-center space-y-3">
          <p className="text-sm text-dark-500">
            Didn&apos;t receive the code?
          </p>
          <form action={resendAction}>
            <input type="hidden" name="phone" value={phone} />
            <button
              type="submit"
              disabled={resendPending}
              className="text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors disabled:opacity-60"
            >
              {resendPending ? "Sending..." : "Resend OTP"}
            </button>
          </form>
          <Link
            href="/login"
            className="block text-xs text-dark-400 hover:text-dark-600 transition-colors"
          >
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

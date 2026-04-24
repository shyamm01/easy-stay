import { z } from "zod";

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be under 50 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const loginEmailSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required"),
});

export const loginPhoneSchema = z.object({
  phone: z
    .string()
    .regex(
      /^\+91[6-9]\d{9}$/,
      "Enter a valid Indian phone number (e.g. +919876543210)"
    ),
});

export const verifyOtpSchema = z.object({
  phone: z.string(),
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginEmailInput = z.infer<typeof loginEmailSchema>;
export type LoginPhoneInput = z.infer<typeof loginPhoneSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

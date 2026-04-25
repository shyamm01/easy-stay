import { z } from "zod";

export const ownerSignupSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(120, "Full name must be under 120 characters")
    .trim(),
  companyName: z
    .string()
    .max(160, "Business name must be under 160 characters")
    .trim()
    .optional()
    .transform((value) => value || undefined),
  email: z
    .string()
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .trim()
    .regex(
      /^\+?[1-9]\d{7,14}$/,
      "Please enter a valid phone number with country code"
    )
    .optional()
    .or(z.literal(""))
    .transform((value) => value || undefined),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const ownerLoginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required"),
});

export type OwnerSignupInput = z.infer<typeof ownerSignupSchema>;
export type OwnerLoginInput = z.infer<typeof ownerLoginSchema>;

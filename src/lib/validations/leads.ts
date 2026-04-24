import { z } from "zod";

export const leadLocationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  accuracy: z.number().nonnegative().optional(),
});

export const createLeadSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your full name")
    .max(120, "Name must be under 120 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase(),
  city: z
    .string()
    .min(2, "Please choose the city where you need a room")
    .max(120, "City must be under 120 characters")
    .trim(),
  currentLocation: leadLocationSchema,
});

export type LeadLocationInput = z.infer<typeof leadLocationSchema>;
export type CreateLeadInput = z.infer<typeof createLeadSchema>;

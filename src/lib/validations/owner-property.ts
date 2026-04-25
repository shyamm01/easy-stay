import { z } from "zod";
import {
  bathroomTypeEnum,
  furnishingStatusEnum,
  propertyTypeEnum,
  tenantPreferenceEnum,
  unitConfigurationEnum,
  unitTypeEnum,
} from "@/db/schema";

function trimToUndefined(value: unknown) {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();

  return trimmed ? trimmed : undefined;
}

function optionalIntegerField(message: string) {
  return z.preprocess((value) => {
    if (value === "" || value === null || typeof value === "undefined") {
      return undefined;
    }

    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : value;
  }, z.number().int(message).optional());
}

function requiredIntegerField(message: string) {
  return z.preprocess((value) => {
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : value;
  }, z.number().int(message).positive(message));
}

function optionalFloatField(message: string) {
  return z.preprocess((value) => {
    if (value === "" || value === null || typeof value === "undefined") {
      return undefined;
    }

    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : value;
  }, z.number(message).optional());
}

const ownerUnitListingSchema = z.object({
  title: z
    .string()
    .min(2, "Listing title must be at least 2 characters")
    .max(180, "Listing title must be under 180 characters")
    .trim(),
  description: z.preprocess(
    trimToUndefined,
    z.string().max(1500, "Listing description must be under 1500 characters").optional()
  ),
  monthlyRent: requiredIntegerField("Monthly rent must be a valid number"),
  securityDeposit: optionalIntegerField("Security deposit must be a valid number"),
  maintenanceCharges: optionalIntegerField("Maintenance charges must be a valid number"),
  availableFrom: z.preprocess(
    trimToUndefined,
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Available from date is invalid").optional()
  ),
  minimumLeaseMonths: optionalIntegerField("Minimum lease months must be a valid number"),
  preferredTenantType: z.enum(tenantPreferenceEnum.enumValues),
  isNegotiable: z.boolean(),
  includesFood: z.boolean(),
  electricityIncluded: z.boolean(),
  waterIncluded: z.boolean(),
});

const ownerUnitSchema = z.object({
  unitType: z.enum(unitTypeEnum.enumValues),
  configuration: z.enum(unitConfigurationEnum.enumValues).optional(),
  unitNumber: z
    .string()
    .min(1, "Unit number is required")
    .max(80, "Unit number must be under 80 characters")
    .trim(),
  title: z.preprocess(
    trimToUndefined,
    z.string().max(180, "Unit title must be under 180 characters").optional()
  ),
  description: z.preprocess(
    trimToUndefined,
    z.string().max(1500, "Unit description must be under 1500 characters").optional()
  ),
  bedrooms: optionalIntegerField("Bedrooms must be a valid number"),
  bathrooms: optionalIntegerField("Bathrooms must be a valid number"),
  balconies: optionalIntegerField("Balconies must be a valid number"),
  maxOccupancy: optionalIntegerField("Max occupancy must be a valid number"),
  areaSqft: optionalIntegerField("Built-up area must be a valid number"),
  carpetAreaSqft: optionalIntegerField("Carpet area must be a valid number"),
  lengthFeet: optionalFloatField("Length must be a valid number"),
  widthFeet: optionalFloatField("Width must be a valid number"),
  furnishingStatus: z.enum(furnishingStatusEnum.enumValues),
  bathroomType: z.enum(bathroomTypeEnum.enumValues),
  isShared: z.boolean(),
  listing: ownerUnitListingSchema,
});

const ownerFloorSchema = z.object({
  floorNumber: z.preprocess((value) => Number(value), z.number().int()),
  label: z.preprocess(
    trimToUndefined,
    z.string().max(80, "Floor label must be under 80 characters").optional()
  ),
  description: z.preprocess(
    trimToUndefined,
    z.string().max(1000, "Floor description must be under 1000 characters").optional()
  ),
  units: z.array(ownerUnitSchema).min(1, "Each floor must have at least one unit"),
});

export const ownerPropertySchema = z.object({
  title: z
    .string()
    .min(3, "Property title must be at least 3 characters")
    .max(180, "Property title must be under 180 characters")
    .trim(),
  propertyType: z.enum(propertyTypeEnum.enumValues),
  description: z.preprocess(
    trimToUndefined,
    z.string().max(2000, "Description must be under 2000 characters").optional()
  ),
  addressLine1: z
    .string()
    .min(5, "Address line 1 must be at least 5 characters")
    .max(255, "Address line 1 must be under 255 characters")
    .trim(),
  addressLine2: z.preprocess(
    trimToUndefined,
    z.string().max(255, "Address line 2 must be under 255 characters").optional()
  ),
  locality: z
    .string()
    .min(2, "Locality is required")
    .max(120, "Locality must be under 120 characters")
    .trim(),
  landmark: z.preprocess(
    trimToUndefined,
    z.string().max(160, "Landmark must be under 160 characters").optional()
  ),
  city: z
    .string()
    .min(2, "City is required")
    .max(120, "City must be under 120 characters")
    .trim(),
  state: z
    .string()
    .min(2, "State is required")
    .max(120, "State must be under 120 characters")
    .trim(),
  country: z
    .string()
    .min(2, "Country is required")
    .max(120, "Country must be under 120 characters")
    .trim(),
  pincode: z
    .string()
    .min(4, "Pincode is required")
    .max(12, "Pincode must be under 12 characters")
    .trim(),
  latitude: optionalFloatField("Latitude must be a valid number"),
  longitude: optionalFloatField("Longitude must be a valid number"),
  floors: z.array(ownerFloorSchema).min(1, "Add at least one floor"),
});

export type OwnerPropertyInput = z.infer<typeof ownerPropertySchema>;

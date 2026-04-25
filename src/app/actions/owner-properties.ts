"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import {
  properties,
  propertyFloors,
  propertyListings,
  propertyUnits,
} from "@/db/schema";
import { getCurrentOwnerContext } from "@/lib/owner-auth";
import { ownerPropertySchema } from "@/lib/validations/owner-property";

export type OwnerPropertyActionState = {
  error?: string;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

function bedroomsFromConfiguration(configuration?: string) {
  if (!configuration) {
    return undefined;
  }

  if (configuration.endsWith("bhk") || configuration.endsWith("rk")) {
    const parsed = Number(configuration[0]);

    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

export async function createOwnerPropertyListing(
  _prevState: OwnerPropertyActionState,
  formData: FormData
): Promise<OwnerPropertyActionState> {
  const redirectTo = (formData.get("redirectTo") as string) || "/business/dashboard";
  const payload = formData.get("payload");

  if (typeof payload !== "string") {
    return { error: "Property details are missing from the form submission." };
  }

  let decodedPayload: unknown;

  try {
    decodedPayload = JSON.parse(payload);
  } catch {
    return { error: "Property details could not be read. Please try again." };
  }

  const parsed = ownerPropertySchema.safeParse(decodedPayload);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const ownerContext = await getCurrentOwnerContext();

  if (!ownerContext?.owner || !ownerContext.isOwner) {
    return { error: "Please log in with an owner account to list properties." };
  }

  const propertyInput = parsed.data;

  try {
    await db.transaction(async (tx) => {
      const slugBase = slugify(
        `${propertyInput.title}-${propertyInput.locality}-${propertyInput.city}`
      );
      const uniqueSlug = `${slugBase || "property"}-${Date.now().toString(36)}`;
      const [property] = await tx
        .insert(properties)
        .values({
          ownerId: ownerContext.owner.id,
          title: propertyInput.title,
          slug: uniqueSlug,
          propertyType: propertyInput.propertyType,
          status: "active",
          description: propertyInput.description,
          addressLine1: propertyInput.addressLine1,
          addressLine2: propertyInput.addressLine2,
          locality: propertyInput.locality,
          landmark: propertyInput.landmark,
          city: propertyInput.city,
          state: propertyInput.state,
          country: propertyInput.country,
          pincode: propertyInput.pincode,
          latitude: propertyInput.latitude,
          longitude: propertyInput.longitude,
          totalFloors: propertyInput.floors.length,
        })
        .returning({
          id: properties.id,
        });

      for (const floorInput of propertyInput.floors) {
        const [floor] = await tx
          .insert(propertyFloors)
          .values({
            propertyId: property.id,
            floorNumber: floorInput.floorNumber,
            label: floorInput.label,
            description: floorInput.description,
          })
          .returning({
            id: propertyFloors.id,
          });

        for (const unitInput of floorInput.units) {
          const [unit] = await tx
            .insert(propertyUnits)
            .values({
              propertyId: property.id,
              floorId: floor.id,
              unitType: unitInput.unitType,
              configuration: unitInput.configuration,
              unitNumber: unitInput.unitNumber,
              title: unitInput.title,
              description: unitInput.description,
              bedrooms:
                unitInput.bedrooms ??
                bedroomsFromConfiguration(unitInput.configuration),
              bathrooms: unitInput.bathrooms,
              balconies: unitInput.balconies,
              maxOccupancy: unitInput.maxOccupancy,
              areaSqft: unitInput.areaSqft,
              carpetAreaSqft: unitInput.carpetAreaSqft,
              lengthFeet: unitInput.lengthFeet,
              widthFeet: unitInput.widthFeet,
              furnishingStatus: unitInput.furnishingStatus,
              availabilityStatus: "available",
              bathroomType: unitInput.bathroomType,
              isShared: unitInput.isShared,
            })
            .returning({
              id: propertyUnits.id,
            });

          await tx.insert(propertyListings).values({
            ownerId: ownerContext.owner.id,
            propertyId: property.id,
            unitId: unit.id,
            title: unitInput.listing.title,
            description: unitInput.listing.description,
            status: "published",
            monthlyRent: unitInput.listing.monthlyRent,
            securityDeposit: unitInput.listing.securityDeposit,
            maintenanceCharges: unitInput.listing.maintenanceCharges ?? 0,
            availableFrom: unitInput.listing.availableFrom,
            minimumLeaseMonths: unitInput.listing.minimumLeaseMonths,
            preferredTenantType: unitInput.listing.preferredTenantType,
            isNegotiable: unitInput.listing.isNegotiable,
            includesFood: unitInput.listing.includesFood,
            electricityIncluded: unitInput.listing.electricityIncluded,
            waterIncluded: unitInput.listing.waterIncluded,
            publishedAt: new Date(),
          });
        }
      }
    });
  } catch (error) {
    console.error("Failed to create owner property listing", error);

    return {
      error: "We couldn’t save the property right now. Please try again.",
    };
  }

  redirect(redirectTo);
}

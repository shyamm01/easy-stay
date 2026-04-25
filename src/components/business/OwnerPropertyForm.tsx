"use client";

import { useActionState, useId, useState } from "react";
import {
  createOwnerPropertyListing,
  type OwnerPropertyActionState,
} from "@/app/actions/owner-properties";

type OwnerPropertyFormProps = {
  portalBasePath: string;
};

type DraftUnit = {
  id: string;
  unitType: "flat" | "room" | "bed" | "studio" | "shop" | "other";
  configuration?: string;
  unitNumber: string;
  title: string;
  description: string;
  bedrooms: string;
  bathrooms: string;
  balconies: string;
  maxOccupancy: string;
  areaSqft: string;
  carpetAreaSqft: string;
  lengthFeet: string;
  widthFeet: string;
  furnishingStatus: "unfurnished" | "semi_furnished" | "fully_furnished";
  bathroomType: "attached" | "common" | "mixed" | "not_applicable";
  isShared: boolean;
  listingTitle: string;
  listingDescription: string;
  monthlyRent: string;
  securityDeposit: string;
  maintenanceCharges: string;
  availableFrom: string;
  minimumLeaseMonths: string;
  preferredTenantType:
    | "any"
    | "male"
    | "female"
    | "family"
    | "student"
    | "working_professional";
  isNegotiable: boolean;
  includesFood: boolean;
  electricityIncluded: boolean;
  waterIncluded: boolean;
};

type DraftFloor = {
  id: string;
  floorNumber: string;
  label: string;
  description: string;
  units: DraftUnit[];
};

const propertyTypeOptions = [
  { value: "independent_house", label: "Independent House" },
  { value: "apartment_building", label: "Apartment Building" },
  { value: "villa", label: "Villa" },
  { value: "pg", label: "PG" },
  { value: "hostel", label: "Hostel" },
  { value: "commercial", label: "Commercial" },
  { value: "other", label: "Other" },
] as const;

const unitTypeOptions = [
  { value: "flat", label: "Flat" },
  { value: "room", label: "Room" },
  { value: "bed", label: "Bed" },
  { value: "studio", label: "Studio" },
  { value: "shop", label: "Shop" },
  { value: "other", label: "Other" },
] as const;

const unitConfigurationsByType: Record<string, Array<{ value: string; label: string }>> = {
  flat: [
    { value: "1bhk", label: "1BHK" },
    { value: "2bhk", label: "2BHK" },
    { value: "3bhk", label: "3BHK" },
    { value: "4bhk", label: "4BHK" },
    { value: "5bhk", label: "5BHK" },
    { value: "other", label: "Other" },
  ],
  room: [
    { value: "1rk", label: "1RK" },
    { value: "2rk", label: "2RK" },
    { value: "studio", label: "Studio" },
    { value: "other", label: "Other" },
  ],
  studio: [
    { value: "studio", label: "Studio" },
    { value: "other", label: "Other" },
  ],
  bed: [
    { value: "dormitory", label: "Dormitory" },
    { value: "other", label: "Other" },
  ],
  shop: [{ value: "other", label: "Other" }],
  other: [{ value: "other", label: "Other" }],
};

const bathroomTypeOptions = [
  { value: "attached", label: "Attached bathroom" },
  { value: "common", label: "Common bathroom" },
  { value: "mixed", label: "Both attached & common" },
  { value: "not_applicable", label: "Not applicable" },
] as const;

function createDraftUnit(index: number): DraftUnit {
  return {
    id: `unit-${index}-${Date.now()}`,
    unitType: "flat",
    configuration: "1bhk",
    unitNumber: `${index + 1}`,
    title: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    maxOccupancy: "",
    areaSqft: "",
    carpetAreaSqft: "",
    lengthFeet: "",
    widthFeet: "",
    furnishingStatus: "unfurnished",
    bathroomType: "attached",
    isShared: false,
    listingTitle: "",
    listingDescription: "",
    monthlyRent: "",
    securityDeposit: "",
    maintenanceCharges: "",
    availableFrom: "",
    minimumLeaseMonths: "",
    preferredTenantType: "any",
    isNegotiable: false,
    includesFood: false,
    electricityIncluded: false,
    waterIncluded: true,
  };
}

function createDraftFloor(index: number): DraftFloor {
  return {
    id: `floor-${index}-${Date.now()}`,
    floorNumber: `${index}`,
    label: index === 0 ? "Ground Floor" : `Floor ${index}`,
    description: "",
    units: [createDraftUnit(0)],
  };
}

export default function OwnerPropertyForm({
  portalBasePath,
}: OwnerPropertyFormProps) {
  const formId = useId();
  const [state, action, pending] = useActionState<
    OwnerPropertyActionState,
    FormData
  >(createOwnerPropertyListing, {});
  const [floors, setFloors] = useState<DraftFloor[]>([createDraftFloor(0)]);
  const [payload, setPayload] = useState("");

  const syncPayload = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    const form = event.currentTarget;
    const formData = new FormData(form);

    setPayload(
      JSON.stringify({
        title: formData.get("title"),
        propertyType: formData.get("propertyType"),
        description: formData.get("description"),
        addressLine1: formData.get("addressLine1"),
        addressLine2: formData.get("addressLine2"),
        locality: formData.get("locality"),
        landmark: formData.get("landmark"),
        city: formData.get("city"),
        state: formData.get("state"),
        country: formData.get("country"),
        pincode: formData.get("pincode"),
        latitude: formData.get("latitude"),
        longitude: formData.get("longitude"),
        floors: floors.map((floor) => ({
          floorNumber: floor.floorNumber,
          label: floor.label,
          description: floor.description,
          units: floor.units.map((unit) => ({
            unitType: unit.unitType,
            configuration: unit.configuration,
            unitNumber: unit.unitNumber,
            title: unit.title,
            description: unit.description,
            bedrooms: unit.bedrooms,
            bathrooms: unit.bathrooms,
            balconies: unit.balconies,
            maxOccupancy: unit.maxOccupancy,
            areaSqft: unit.areaSqft,
            carpetAreaSqft: unit.carpetAreaSqft,
            lengthFeet: unit.lengthFeet,
            widthFeet: unit.widthFeet,
            furnishingStatus: unit.furnishingStatus,
            bathroomType: unit.bathroomType,
            isShared: unit.isShared,
            listing: {
              title: unit.listingTitle || `${unit.unitType} ${unit.unitNumber}`,
              description: unit.listingDescription,
              monthlyRent: unit.monthlyRent,
              securityDeposit: unit.securityDeposit,
              maintenanceCharges: unit.maintenanceCharges,
              availableFrom: unit.availableFrom,
              minimumLeaseMonths: unit.minimumLeaseMonths,
              preferredTenantType: unit.preferredTenantType,
              isNegotiable: unit.isNegotiable,
              includesFood: unit.includesFood,
              electricityIncluded: unit.electricityIncluded,
              waterIncluded: unit.waterIncluded,
            },
          })),
        })),
      })
    );
  };

  const updateFloor = (floorId: string, updater: (floor: DraftFloor) => DraftFloor) => {
    setFloors((currentFloors) =>
      currentFloors.map((floor) => (floor.id === floorId ? updater(floor) : floor))
    );
  };

  const addFloor = () => {
    setFloors((currentFloors) => [...currentFloors, createDraftFloor(currentFloors.length)]);
  };

  const removeFloor = (floorId: string) => {
    setFloors((currentFloors) =>
      currentFloors.length === 1
        ? currentFloors
        : currentFloors.filter((floor) => floor.id !== floorId)
    );
  };

  const addUnit = (floorId: string) => {
    updateFloor(floorId, (floor) => ({
      ...floor,
      units: [...floor.units, createDraftUnit(floor.units.length)],
    }));
  };

  const removeUnit = (floorId: string, unitId: string) => {
    updateFloor(floorId, (floor) => ({
      ...floor,
      units:
        floor.units.length === 1
          ? floor.units
          : floor.units.filter((unit) => unit.id !== unitId),
    }));
  };

  return (
    <form
      id={formId}
      action={action}
      onSubmit={syncPayload}
      className="space-y-8"
    >
      <input type="hidden" name="redirectTo" value={`${portalBasePath}/dashboard`} />
      <input type="hidden" name="payload" value={payload} />

      <div className="glass rounded-3xl border border-white/60 p-8 shadow-xl">
        <h2
          className="text-2xl font-bold text-dark-900 mb-6"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Property Basics
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-dark-700 mb-1.5">
              Property Title
            </label>
            <input
              name="title"
              required
              placeholder="Sunrise Residency, HSR Layout"
              className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-1.5">
              Property Type
            </label>
            <select
              name="propertyType"
              defaultValue="apartment_building"
              className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            >
              {propertyTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-1.5">
              Pincode
            </label>
            <input
              name="pincode"
              required
              placeholder="560102"
              className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-dark-700 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="Describe the building, access, neighbourhood, and what makes it attractive for tenants."
              className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl border border-white/60 p-8 shadow-xl">
        <h2
          className="text-2xl font-bold text-dark-900 mb-6"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Address & Location
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-dark-700 mb-1.5">
              Address Line 1
            </label>
            <input
              name="addressLine1"
              required
              placeholder="12, 14th Main Road"
              className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-dark-700 mb-1.5">
              Address Line 2
            </label>
            <input
              name="addressLine2"
              placeholder="Near BDA Complex"
              className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-1.5">
              Locality
            </label>
            <input
              name="locality"
              required
              placeholder="HSR Layout"
              className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-1.5">
              Landmark
            </label>
            <input
              name="landmark"
              placeholder="Opposite park"
              className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-1.5">
              City
            </label>
            <input
              name="city"
              required
              defaultValue="Bengaluru"
              className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-1.5">
              State
            </label>
            <input
              name="state"
              required
              defaultValue="Karnataka"
              className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-700 mb-1.5">
              Country
            </label>
            <input
              name="country"
              required
              defaultValue="India"
              className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1.5">
                Latitude
              </label>
              <input
                name="latitude"
                placeholder="12.9116"
                className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-1.5">
                Longitude
              </label>
              <input
                name="longitude"
                placeholder="77.6446"
                className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 placeholder-dark-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              className="text-2xl font-bold text-dark-900"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Floors, Units & Listings
            </h2>
            <p className="text-sm text-dark-500 mt-1">
              Add every floor you want to publish, then list flats, rooms, or beds under each one.
            </p>
          </div>
          <button
            type="button"
            onClick={addFloor}
            className="btn-secondary !rounded-xl !py-3 !text-sm"
          >
            + Add floor
          </button>
        </div>

        {floors.map((floor, floorIndex) => (
          <div key={floor.id} className="glass rounded-3xl border border-white/60 p-8 shadow-xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-dark-900">
                  Floor {floor.floorNumber || floorIndex}
                </h3>
                <p className="text-sm text-dark-500">
                  Configure the floor details and every listing on it.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => addUnit(floor.id)}
                  className="btn-secondary !rounded-xl !py-2.5 !text-sm"
                >
                  + Add unit
                </button>
                <button
                  type="button"
                  onClick={() => removeFloor(floor.id)}
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600"
                >
                  Remove floor
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 mb-6">
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-1.5">
                  Floor Number
                </label>
                <input
                  value={floor.floorNumber}
                  onChange={(event) =>
                    updateFloor(floor.id, (currentFloor) => ({
                      ...currentFloor,
                      floorNumber: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 mb-1.5">
                  Floor Label
                </label>
                <input
                  value={floor.label}
                  onChange={(event) =>
                    updateFloor(floor.id, (currentFloor) => ({
                      ...currentFloor,
                      label: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-dark-700 mb-1.5">
                  Floor Description
                </label>
                <textarea
                  value={floor.description}
                  onChange={(event) =>
                    updateFloor(floor.id, (currentFloor) => ({
                      ...currentFloor,
                      description: event.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                />
              </div>
            </div>

            <div className="space-y-6">
              {floor.units.map((unit, unitIndex) => {
                const configurationOptions =
                  unitConfigurationsByType[unit.unitType] ??
                  unitConfigurationsByType.other;

                return (
                  <div
                    key={unit.id}
                    className="rounded-3xl border border-dark-100 bg-white/70 p-6"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
                      <div>
                        <h4 className="text-lg font-bold text-dark-900">
                          Unit {unit.unitNumber || unitIndex + 1}
                        </h4>
                        <p className="text-sm text-dark-500">
                          Add unit configuration, bathroom type, dimensions, and listing price.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeUnit(floor.id, unit.id)}
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600"
                      >
                        Remove unit
                      </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-1.5">
                          Unit Type
                        </label>
                        <select
                          value={unit.unitType}
                          onChange={(event) =>
                            updateFloor(floor.id, (currentFloor) => ({
                              ...currentFloor,
                              units: currentFloor.units.map((currentUnit) =>
                                currentUnit.id === unit.id
                                  ? {
                                      ...currentUnit,
                                      unitType: event.target.value as DraftUnit["unitType"],
                                      configuration:
                                        unitConfigurationsByType[event.target.value]?.[0]?.value,
                                    }
                                  : currentUnit
                              ),
                            }))
                          }
                          className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                        >
                          {unitTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-1.5">
                          Configuration
                        </label>
                        <select
                          value={unit.configuration ?? ""}
                          onChange={(event) =>
                            updateFloor(floor.id, (currentFloor) => ({
                              ...currentFloor,
                              units: currentFloor.units.map((currentUnit) =>
                                currentUnit.id === unit.id
                                  ? {
                                      ...currentUnit,
                                      configuration: event.target.value || undefined,
                                    }
                                  : currentUnit
                              ),
                            }))
                          }
                          className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                        >
                          <option value="">Select layout</option>
                          {configurationOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-1.5">
                          Unit Number
                        </label>
                        <input
                          value={unit.unitNumber}
                          onChange={(event) =>
                            updateFloor(floor.id, (currentFloor) => ({
                              ...currentFloor,
                              units: currentFloor.units.map((currentUnit) =>
                                currentUnit.id === unit.id
                                  ? { ...currentUnit, unitNumber: event.target.value }
                                  : currentUnit
                              ),
                            }))
                          }
                          className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-1.5">
                          Bathroom Type
                        </label>
                        <select
                          value={unit.bathroomType}
                          onChange={(event) =>
                            updateFloor(floor.id, (currentFloor) => ({
                              ...currentFloor,
                              units: currentFloor.units.map((currentUnit) =>
                                currentUnit.id === unit.id
                                  ? {
                                      ...currentUnit,
                                      bathroomType:
                                        event.target.value as DraftUnit["bathroomType"],
                                    }
                                  : currentUnit
                              ),
                            }))
                          }
                          className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                        >
                          {bathroomTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="xl:col-span-2">
                        <label className="block text-sm font-medium text-dark-700 mb-1.5">
                          Unit Title
                        </label>
                        <input
                          value={unit.title}
                          onChange={(event) =>
                            updateFloor(floor.id, (currentFloor) => ({
                              ...currentFloor,
                              units: currentFloor.units.map((currentUnit) =>
                                currentUnit.id === unit.id
                                  ? { ...currentUnit, title: event.target.value }
                                  : currentUnit
                              ),
                            }))
                          }
                          placeholder="East-facing 2BHK"
                          className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                        />
                      </div>

                      <div className="xl:col-span-2">
                        <label className="block text-sm font-medium text-dark-700 mb-1.5">
                          Unit Description
                        </label>
                        <input
                          value={unit.description}
                          onChange={(event) =>
                            updateFloor(floor.id, (currentFloor) => ({
                              ...currentFloor,
                              units: currentFloor.units.map((currentUnit) =>
                                currentUnit.id === unit.id
                                  ? { ...currentUnit, description: event.target.value }
                                  : currentUnit
                              ),
                            }))
                          }
                          placeholder="Ideal for small families or working professionals"
                          className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                        />
                      </div>

                      {[
                        { key: "bedrooms", label: "Bedrooms" },
                        { key: "bathrooms", label: "Bathrooms" },
                        { key: "balconies", label: "Balconies" },
                        { key: "maxOccupancy", label: "Max Occupancy" },
                        { key: "areaSqft", label: "Built-up Area (sq ft)" },
                        { key: "carpetAreaSqft", label: "Carpet Area (sq ft)" },
                        { key: "lengthFeet", label: "Length (ft)" },
                        { key: "widthFeet", label: "Width (ft)" },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="block text-sm font-medium text-dark-700 mb-1.5">
                            {field.label}
                          </label>
                          <input
                            value={unit[field.key as keyof DraftUnit] as string}
                            onChange={(event) =>
                              updateFloor(floor.id, (currentFloor) => ({
                                ...currentFloor,
                                units: currentFloor.units.map((currentUnit) =>
                                  currentUnit.id === unit.id
                                    ? {
                                        ...currentUnit,
                                        [field.key]: event.target.value,
                                      }
                                    : currentUnit
                                ),
                              }))
                            }
                            className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                          />
                        </div>
                      ))}

                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-1.5">
                          Furnishing
                        </label>
                        <select
                          value={unit.furnishingStatus}
                          onChange={(event) =>
                            updateFloor(floor.id, (currentFloor) => ({
                              ...currentFloor,
                              units: currentFloor.units.map((currentUnit) =>
                                currentUnit.id === unit.id
                                  ? {
                                      ...currentUnit,
                                      furnishingStatus:
                                        event.target.value as DraftUnit["furnishingStatus"],
                                    }
                                  : currentUnit
                              ),
                            }))
                          }
                          className="w-full rounded-xl border border-dark-200 bg-white/80 px-4 py-3 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                        >
                          <option value="unfurnished">Unfurnished</option>
                          <option value="semi_furnished">Semi-furnished</option>
                          <option value="fully_furnished">Fully furnished</option>
                        </select>
                      </div>

                      <div className="xl:col-span-4 rounded-2xl border border-dark-100 bg-dark-50/70 p-5">
                        <h5 className="text-base font-bold text-dark-900 mb-4">
                          Listing Details
                        </h5>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-dark-700 mb-1.5">
                              Listing Title
                            </label>
                            <input
                              value={unit.listingTitle}
                              onChange={(event) =>
                                updateFloor(floor.id, (currentFloor) => ({
                                  ...currentFloor,
                                  units: currentFloor.units.map((currentUnit) =>
                                    currentUnit.id === unit.id
                                      ? {
                                          ...currentUnit,
                                          listingTitle: event.target.value,
                                        }
                                      : currentUnit
                                  ),
                                }))
                              }
                              placeholder="Spacious 2BHK in HSR Layout"
                              className="w-full rounded-xl border border-dark-200 bg-white px-4 py-3 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-dark-700 mb-1.5">
                              Listing Description
                            </label>
                            <input
                              value={unit.listingDescription}
                              onChange={(event) =>
                                updateFloor(floor.id, (currentFloor) => ({
                                  ...currentFloor,
                                  units: currentFloor.units.map((currentUnit) =>
                                    currentUnit.id === unit.id
                                      ? {
                                          ...currentUnit,
                                          listingDescription: event.target.value,
                                        }
                                      : currentUnit
                                  ),
                                }))
                              }
                              placeholder="Ready to move in, walking distance from metro"
                              className="w-full rounded-xl border border-dark-200 bg-white px-4 py-3 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                            />
                          </div>

                          {[
                            { key: "monthlyRent", label: "Monthly Rent" },
                            { key: "securityDeposit", label: "Security Deposit" },
                            { key: "maintenanceCharges", label: "Maintenance Charges" },
                            { key: "minimumLeaseMonths", label: "Min Lease (months)" },
                          ].map((field) => (
                            <div key={field.key}>
                              <label className="block text-sm font-medium text-dark-700 mb-1.5">
                                {field.label}
                              </label>
                              <input
                                value={unit[field.key as keyof DraftUnit] as string}
                                onChange={(event) =>
                                  updateFloor(floor.id, (currentFloor) => ({
                                    ...currentFloor,
                                    units: currentFloor.units.map((currentUnit) =>
                                      currentUnit.id === unit.id
                                        ? {
                                            ...currentUnit,
                                            [field.key]: event.target.value,
                                          }
                                        : currentUnit
                                    ),
                                  }))
                                }
                                className="w-full rounded-xl border border-dark-200 bg-white px-4 py-3 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                              />
                            </div>
                          ))}

                          <div>
                            <label className="block text-sm font-medium text-dark-700 mb-1.5">
                              Available From
                            </label>
                            <input
                              type="date"
                              value={unit.availableFrom}
                              onChange={(event) =>
                                updateFloor(floor.id, (currentFloor) => ({
                                  ...currentFloor,
                                  units: currentFloor.units.map((currentUnit) =>
                                    currentUnit.id === unit.id
                                      ? {
                                          ...currentUnit,
                                          availableFrom: event.target.value,
                                        }
                                      : currentUnit
                                  ),
                                }))
                              }
                              className="w-full rounded-xl border border-dark-200 bg-white px-4 py-3 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-dark-700 mb-1.5">
                              Preferred Tenant
                            </label>
                            <select
                              value={unit.preferredTenantType}
                              onChange={(event) =>
                                updateFloor(floor.id, (currentFloor) => ({
                                  ...currentFloor,
                                  units: currentFloor.units.map((currentUnit) =>
                                    currentUnit.id === unit.id
                                      ? {
                                          ...currentUnit,
                                          preferredTenantType:
                                            event.target.value as DraftUnit["preferredTenantType"],
                                        }
                                      : currentUnit
                                  ),
                                }))
                              }
                              className="w-full rounded-xl border border-dark-200 bg-white px-4 py-3 text-sm text-dark-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/40"
                            >
                              <option value="any">Anyone</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="family">Family</option>
                              <option value="student">Student</option>
                              <option value="working_professional">Working Professional</option>
                            </select>
                          </div>

                          <div className="sm:col-span-2 xl:col-span-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                            {[
                              {
                                key: "isNegotiable",
                                label: "Price is negotiable",
                              },
                              {
                                key: "includesFood",
                                label: "Food included",
                              },
                              {
                                key: "electricityIncluded",
                                label: "Electricity included",
                              },
                              {
                                key: "waterIncluded",
                                label: "Water included",
                              },
                              {
                                key: "isShared",
                                label: "Shared accommodation",
                              },
                            ].map((field) => (
                              <label
                                key={field.key}
                                className="flex items-center gap-3 rounded-xl border border-dark-200 bg-white px-4 py-3 text-sm text-dark-700"
                              >
                                <input
                                  type="checkbox"
                                  checked={unit[field.key as keyof DraftUnit] as boolean}
                                  onChange={(event) =>
                                    updateFloor(floor.id, (currentFloor) => ({
                                      ...currentFloor,
                                      units: currentFloor.units.map((currentUnit) =>
                                        currentUnit.id === unit.id
                                          ? {
                                              ...currentUnit,
                                              [field.key]: event.target.checked,
                                            }
                                          : currentUnit
                                      ),
                                    }))
                                  }
                                  className="h-4 w-4 rounded border-dark-300 text-primary-600 focus:ring-primary-500"
                                />
                                {field.label}
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {state.error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <a
          href={`${portalBasePath}/dashboard`}
          className="btn-secondary !rounded-xl !py-3 !text-sm justify-center"
        >
          Back to dashboard
        </a>
        <button
          type="submit"
          disabled={pending}
          className="btn-primary !rounded-xl !py-3 !text-sm justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {pending ? "Saving property..." : "Publish property"}
        </button>
      </div>
    </form>
  );
}

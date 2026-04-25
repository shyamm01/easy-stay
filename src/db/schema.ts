import {
  type AnyPgColumn,
  boolean,
  date,
  doublePrecision,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export type LeadLocation = {
  latitude: number;
  longitude: number;
  accuracy?: number | null;
};

export const ownerVerificationStatusEnum = pgEnum(
  "owner_verification_status",
  ["pending", "verified", "rejected"]
);

export const propertyTypeEnum = pgEnum("property_type", [
  "independent_house",
  "apartment_building",
  "villa",
  "pg",
  "hostel",
  "commercial",
  "other",
]);

export const propertyStatusEnum = pgEnum("property_status", [
  "draft",
  "active",
  "inactive",
]);

export const unitTypeEnum = pgEnum("unit_type", [
  "flat",
  "room",
  "bed",
  "studio",
  "shop",
  "other",
]);

export const unitConfigurationEnum = pgEnum("unit_configuration", [
  "1rk",
  "2rk",
  "1bhk",
  "2bhk",
  "3bhk",
  "4bhk",
  "5bhk",
  "studio",
  "dormitory",
  "other",
]);

export const bathroomTypeEnum = pgEnum("bathroom_type", [
  "attached",
  "common",
  "mixed",
  "not_applicable",
]);

export const furnishingStatusEnum = pgEnum("furnishing_status", [
  "unfurnished",
  "semi_furnished",
  "fully_furnished",
]);

export const availabilityStatusEnum = pgEnum("availability_status", [
  "available",
  "reserved",
  "occupied",
  "maintenance",
]);

export const listingStatusEnum = pgEnum("listing_status", [
  "draft",
  "published",
  "paused",
  "occupied",
  "archived",
]);

export const tenantPreferenceEnum = pgEnum("tenant_preference", [
  "any",
  "male",
  "female",
  "family",
  "student",
  "working_professional",
]);

export const amenityScopeEnum = pgEnum("amenity_scope", [
  "property",
  "unit",
]);

export const mediaKindEnum = pgEnum("media_kind", ["image", "video"]);

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    city: varchar("city", { length: 120 }).notNull(),
    ipAddress: varchar("ip_address", { length: 64 }),
    currentLocation: jsonb("current_location").$type<LeadLocation>().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("leads_city_idx").on(table.city),
    index("leads_created_at_idx").on(table.createdAt),
    uniqueIndex("leads_email_city_unique_idx").on(table.email, table.city),
  ]
);

export const owners = pgTable(
  "owners",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    authUserId: uuid("auth_user_id"),
    fullName: varchar("full_name", { length: 120 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    companyName: varchar("company_name", { length: 160 }),
    verificationStatus: ownerVerificationStatusEnum("verification_status")
      .default("pending")
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("owners_auth_user_id_unique_idx").on(table.authUserId),
    uniqueIndex("owners_email_unique_idx").on(table.email),
    uniqueIndex("owners_phone_unique_idx").on(table.phone),
  ]
);

export const properties = pgTable(
  "properties",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    ownerId: uuid("owner_id")
      .notNull()
      .references(() => owners.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 180 }).notNull(),
    slug: varchar("slug", { length: 180 }).notNull(),
    propertyType: propertyTypeEnum("property_type").notNull(),
    status: propertyStatusEnum("status").default("draft").notNull(),
    description: text("description"),
    addressLine1: varchar("address_line_1", { length: 255 }).notNull(),
    addressLine2: varchar("address_line_2", { length: 255 }),
    locality: varchar("locality", { length: 120 }).notNull(),
    landmark: varchar("landmark", { length: 160 }),
    city: varchar("city", { length: 120 }).notNull(),
    state: varchar("state", { length: 120 }).notNull(),
    country: varchar("country", { length: 120 }).default("India").notNull(),
    pincode: varchar("pincode", { length: 12 }).notNull(),
    latitude: doublePrecision("latitude"),
    longitude: doublePrecision("longitude"),
    totalFloors: integer("total_floors"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("properties_slug_unique_idx").on(table.slug),
    index("properties_owner_id_idx").on(table.ownerId),
    index("properties_city_status_idx").on(table.city, table.status),
  ]
);

export const propertyFloors = pgTable(
  "property_floors",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    propertyId: uuid("property_id")
      .notNull()
      .references(() => properties.id, { onDelete: "cascade" }),
    floorNumber: integer("floor_number").notNull(),
    label: varchar("label", { length: 80 }),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("property_floors_property_floor_unique_idx").on(
      table.propertyId,
      table.floorNumber
    ),
    index("property_floors_property_id_idx").on(table.propertyId),
  ]
);

export const propertyUnits = pgTable(
  "property_units",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    propertyId: uuid("property_id")
      .notNull()
      .references(() => properties.id, { onDelete: "cascade" }),
    floorId: uuid("floor_id")
      .notNull()
      .references(() => propertyFloors.id, { onDelete: "cascade" }),
    parentUnitId: uuid("parent_unit_id").references(
      (): AnyPgColumn => propertyUnits.id,
      {
        onDelete: "set null",
      }
    ),
    unitType: unitTypeEnum("unit_type").notNull(),
    configuration: unitConfigurationEnum("configuration"),
    unitNumber: varchar("unit_number", { length: 80 }).notNull(),
    title: varchar("title", { length: 180 }),
    description: text("description"),
    bedrooms: integer("bedrooms"),
    bathrooms: integer("bathrooms"),
    balconies: integer("balconies"),
    maxOccupancy: integer("max_occupancy"),
    areaSqft: integer("area_sqft"),
    carpetAreaSqft: integer("carpet_area_sqft"),
    lengthFeet: doublePrecision("length_feet"),
    widthFeet: doublePrecision("width_feet"),
    furnishingStatus: furnishingStatusEnum("furnishing_status")
      .default("unfurnished")
      .notNull(),
    availabilityStatus: availabilityStatusEnum("availability_status")
      .default("available")
      .notNull(),
    bathroomType: bathroomTypeEnum("bathroom_type")
      .default("not_applicable")
      .notNull(),
    isShared: boolean("is_shared").default(false).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("property_units_property_id_idx").on(table.propertyId),
    index("property_units_floor_id_idx").on(table.floorId),
    index("property_units_parent_unit_id_idx").on(table.parentUnitId),
    index("property_units_type_availability_idx").on(
      table.unitType,
      table.availabilityStatus
    ),
  ]
);

export const propertyListings = pgTable(
  "property_listings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    ownerId: uuid("owner_id")
      .notNull()
      .references(() => owners.id, { onDelete: "cascade" }),
    propertyId: uuid("property_id")
      .notNull()
      .references(() => properties.id, { onDelete: "cascade" }),
    unitId: uuid("unit_id")
      .notNull()
      .references(() => propertyUnits.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 180 }).notNull(),
    description: text("description"),
    status: listingStatusEnum("status").default("draft").notNull(),
    monthlyRent: integer("monthly_rent").notNull(),
    securityDeposit: integer("security_deposit"),
    maintenanceCharges: integer("maintenance_charges").default(0).notNull(),
    availableFrom: date("available_from"),
    minimumLeaseMonths: integer("minimum_lease_months"),
    preferredTenantType: tenantPreferenceEnum("preferred_tenant_type")
      .default("any")
      .notNull(),
    isNegotiable: boolean("is_negotiable").default(false).notNull(),
    includesFood: boolean("includes_food").default(false).notNull(),
    electricityIncluded: boolean("electricity_included")
      .default(false)
      .notNull(),
    waterIncluded: boolean("water_included").default(true).notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("property_listings_owner_id_idx").on(table.ownerId),
    index("property_listings_property_id_idx").on(table.propertyId),
    index("property_listings_unit_id_idx").on(table.unitId),
    index("property_listings_status_available_from_idx").on(
      table.status,
      table.availableFrom
    ),
  ]
);

export const amenities = pgTable(
  "amenities",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: varchar("slug", { length: 120 }).notNull(),
    label: varchar("label", { length: 120 }).notNull(),
    scope: amenityScopeEnum("scope").notNull(),
    category: varchar("category", { length: 120 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [uniqueIndex("amenities_slug_unique_idx").on(table.slug)]
);

export const propertyAmenities = pgTable(
  "property_amenities",
  {
    propertyId: uuid("property_id")
      .notNull()
      .references(() => properties.id, { onDelete: "cascade" }),
    amenityId: uuid("amenity_id")
      .notNull()
      .references(() => amenities.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    primaryKey({
      name: "property_amenities_pk",
      columns: [table.propertyId, table.amenityId],
    }),
  ]
);

export const propertyUnitAmenities = pgTable(
  "property_unit_amenities",
  {
    unitId: uuid("unit_id")
      .notNull()
      .references(() => propertyUnits.id, { onDelete: "cascade" }),
    amenityId: uuid("amenity_id")
      .notNull()
      .references(() => amenities.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    primaryKey({
      name: "property_unit_amenities_pk",
      columns: [table.unitId, table.amenityId],
    }),
  ]
);

export const propertyMedia = pgTable(
  "property_media",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    propertyId: uuid("property_id")
      .notNull()
      .references(() => properties.id, { onDelete: "cascade" }),
    unitId: uuid("unit_id").references(() => propertyUnits.id, {
      onDelete: "cascade",
    }),
    listingId: uuid("listing_id").references(() => propertyListings.id, {
      onDelete: "cascade",
    }),
    mediaKind: mediaKindEnum("media_kind").default("image").notNull(),
    url: text("url").notNull(),
    altText: varchar("alt_text", { length: 255 }),
    sortOrder: integer("sort_order").default(0).notNull(),
    isPrimary: boolean("is_primary").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("property_media_property_id_idx").on(table.propertyId),
    index("property_media_unit_id_idx").on(table.unitId),
    index("property_media_listing_id_idx").on(table.listingId),
  ]
);

export const ownersRelations = relations(owners, ({ many }) => ({
  properties: many(properties),
  listings: many(propertyListings),
}));

export const propertiesRelations = relations(properties, ({ one, many }) => ({
  owner: one(owners, {
    fields: [properties.ownerId],
    references: [owners.id],
  }),
  floors: many(propertyFloors),
  units: many(propertyUnits),
  listings: many(propertyListings),
  amenities: many(propertyAmenities),
  media: many(propertyMedia),
}));

export const propertyFloorsRelations = relations(
  propertyFloors,
  ({ one, many }) => ({
    property: one(properties, {
      fields: [propertyFloors.propertyId],
      references: [properties.id],
    }),
    units: many(propertyUnits),
  })
);

export const propertyUnitsRelations = relations(
  propertyUnits,
  ({ one, many }) => ({
    property: one(properties, {
      fields: [propertyUnits.propertyId],
      references: [properties.id],
    }),
    floor: one(propertyFloors, {
      fields: [propertyUnits.floorId],
      references: [propertyFloors.id],
    }),
    parentUnit: one(propertyUnits, {
      fields: [propertyUnits.parentUnitId],
      references: [propertyUnits.id],
      relationName: "unit_hierarchy",
    }),
    childUnits: many(propertyUnits, {
      relationName: "unit_hierarchy",
    }),
    listings: many(propertyListings),
    amenities: many(propertyUnitAmenities),
    media: many(propertyMedia),
  })
);

export const propertyListingsRelations = relations(
  propertyListings,
  ({ one, many }) => ({
    owner: one(owners, {
      fields: [propertyListings.ownerId],
      references: [owners.id],
    }),
    property: one(properties, {
      fields: [propertyListings.propertyId],
      references: [properties.id],
    }),
    unit: one(propertyUnits, {
      fields: [propertyListings.unitId],
      references: [propertyUnits.id],
    }),
    media: many(propertyMedia),
  })
);

export const amenitiesRelations = relations(amenities, ({ many }) => ({
  propertyAmenities: many(propertyAmenities),
  unitAmenities: many(propertyUnitAmenities),
}));

export const propertyAmenitiesRelations = relations(
  propertyAmenities,
  ({ one }) => ({
    property: one(properties, {
      fields: [propertyAmenities.propertyId],
      references: [properties.id],
    }),
    amenity: one(amenities, {
      fields: [propertyAmenities.amenityId],
      references: [amenities.id],
    }),
  })
);

export const propertyUnitAmenitiesRelations = relations(
  propertyUnitAmenities,
  ({ one }) => ({
    unit: one(propertyUnits, {
      fields: [propertyUnitAmenities.unitId],
      references: [propertyUnits.id],
    }),
    amenity: one(amenities, {
      fields: [propertyUnitAmenities.amenityId],
      references: [amenities.id],
    }),
  })
);

export const propertyMediaRelations = relations(propertyMedia, ({ one }) => ({
  property: one(properties, {
    fields: [propertyMedia.propertyId],
    references: [properties.id],
  }),
  unit: one(propertyUnits, {
    fields: [propertyMedia.unitId],
    references: [propertyUnits.id],
  }),
  listing: one(propertyListings, {
    fields: [propertyMedia.listingId],
    references: [propertyListings.id],
  }),
}));

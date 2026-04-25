CREATE TYPE "public"."amenity_scope" AS ENUM('property', 'unit');--> statement-breakpoint
CREATE TYPE "public"."availability_status" AS ENUM('available', 'reserved', 'occupied', 'maintenance');--> statement-breakpoint
CREATE TYPE "public"."bathroom_type" AS ENUM('attached', 'common', 'mixed', 'not_applicable');--> statement-breakpoint
CREATE TYPE "public"."furnishing_status" AS ENUM('unfurnished', 'semi_furnished', 'fully_furnished');--> statement-breakpoint
CREATE TYPE "public"."listing_status" AS ENUM('draft', 'published', 'paused', 'occupied', 'archived');--> statement-breakpoint
CREATE TYPE "public"."media_kind" AS ENUM('image', 'video');--> statement-breakpoint
CREATE TYPE "public"."owner_verification_status" AS ENUM('pending', 'verified', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."property_status" AS ENUM('draft', 'active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."property_type" AS ENUM('independent_house', 'apartment_building', 'villa', 'pg', 'hostel', 'commercial', 'other');--> statement-breakpoint
CREATE TYPE "public"."tenant_preference" AS ENUM('any', 'male', 'female', 'family', 'student', 'working_professional');--> statement-breakpoint
CREATE TYPE "public"."unit_configuration" AS ENUM('1rk', '2rk', '1bhk', '2bhk', '3bhk', '4bhk', '5bhk', 'studio', 'dormitory', 'other');--> statement-breakpoint
CREATE TYPE "public"."unit_type" AS ENUM('flat', 'room', 'bed', 'studio', 'shop', 'other');--> statement-breakpoint
CREATE TABLE "amenities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(120) NOT NULL,
	"label" varchar(120) NOT NULL,
	"scope" "amenity_scope" NOT NULL,
	"category" varchar(120),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "owners" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth_user_id" uuid,
	"full_name" varchar(120) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20),
	"company_name" varchar(160),
	"verification_status" "owner_verification_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"title" varchar(180) NOT NULL,
	"slug" varchar(180) NOT NULL,
	"property_type" "property_type" NOT NULL,
	"status" "property_status" DEFAULT 'draft' NOT NULL,
	"description" text,
	"address_line_1" varchar(255) NOT NULL,
	"address_line_2" varchar(255),
	"locality" varchar(120) NOT NULL,
	"landmark" varchar(160),
	"city" varchar(120) NOT NULL,
	"state" varchar(120) NOT NULL,
	"country" varchar(120) DEFAULT 'India' NOT NULL,
	"pincode" varchar(12) NOT NULL,
	"latitude" double precision,
	"longitude" double precision,
	"total_floors" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property_amenities" (
	"property_id" uuid NOT NULL,
	"amenity_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "property_amenities_pk" PRIMARY KEY("property_id","amenity_id")
);
--> statement-breakpoint
CREATE TABLE "property_floors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"floor_number" integer NOT NULL,
	"label" varchar(80),
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property_listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"property_id" uuid NOT NULL,
	"unit_id" uuid NOT NULL,
	"title" varchar(180) NOT NULL,
	"description" text,
	"status" "listing_status" DEFAULT 'draft' NOT NULL,
	"monthly_rent" integer NOT NULL,
	"security_deposit" integer,
	"maintenance_charges" integer DEFAULT 0 NOT NULL,
	"available_from" date,
	"minimum_lease_months" integer,
	"preferred_tenant_type" "tenant_preference" DEFAULT 'any' NOT NULL,
	"is_negotiable" boolean DEFAULT false NOT NULL,
	"includes_food" boolean DEFAULT false NOT NULL,
	"electricity_included" boolean DEFAULT false NOT NULL,
	"water_included" boolean DEFAULT true NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property_media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"unit_id" uuid,
	"listing_id" uuid,
	"media_kind" "media_kind" DEFAULT 'image' NOT NULL,
	"url" text NOT NULL,
	"alt_text" varchar(255),
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property_unit_amenities" (
	"unit_id" uuid NOT NULL,
	"amenity_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "property_unit_amenities_pk" PRIMARY KEY("unit_id","amenity_id")
);
--> statement-breakpoint
CREATE TABLE "property_units" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"property_id" uuid NOT NULL,
	"floor_id" uuid NOT NULL,
	"parent_unit_id" uuid,
	"unit_type" "unit_type" NOT NULL,
	"configuration" "unit_configuration",
	"unit_number" varchar(80) NOT NULL,
	"title" varchar(180),
	"description" text,
	"bedrooms" integer,
	"bathrooms" integer,
	"balconies" integer,
	"max_occupancy" integer,
	"area_sqft" integer,
	"carpet_area_sqft" integer,
	"length_feet" double precision,
	"width_feet" double precision,
	"furnishing_status" "furnishing_status" DEFAULT 'unfurnished' NOT NULL,
	"availability_status" "availability_status" DEFAULT 'available' NOT NULL,
	"bathroom_type" "bathroom_type" DEFAULT 'not_applicable' NOT NULL,
	"is_shared" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_owner_id_owners_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."owners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_amenities" ADD CONSTRAINT "property_amenities_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_amenities" ADD CONSTRAINT "property_amenities_amenity_id_amenities_id_fk" FOREIGN KEY ("amenity_id") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_floors" ADD CONSTRAINT "property_floors_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_listings" ADD CONSTRAINT "property_listings_owner_id_owners_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."owners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_listings" ADD CONSTRAINT "property_listings_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_listings" ADD CONSTRAINT "property_listings_unit_id_property_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."property_units"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_media" ADD CONSTRAINT "property_media_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_media" ADD CONSTRAINT "property_media_unit_id_property_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."property_units"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_media" ADD CONSTRAINT "property_media_listing_id_property_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."property_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_unit_amenities" ADD CONSTRAINT "property_unit_amenities_unit_id_property_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."property_units"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_unit_amenities" ADD CONSTRAINT "property_unit_amenities_amenity_id_amenities_id_fk" FOREIGN KEY ("amenity_id") REFERENCES "public"."amenities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_units" ADD CONSTRAINT "property_units_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_units" ADD CONSTRAINT "property_units_floor_id_property_floors_id_fk" FOREIGN KEY ("floor_id") REFERENCES "public"."property_floors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_units" ADD CONSTRAINT "property_units_parent_unit_id_property_units_id_fk" FOREIGN KEY ("parent_unit_id") REFERENCES "public"."property_units"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "amenities_slug_unique_idx" ON "amenities" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "owners_auth_user_id_unique_idx" ON "owners" USING btree ("auth_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "owners_email_unique_idx" ON "owners" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "owners_phone_unique_idx" ON "owners" USING btree ("phone");--> statement-breakpoint
CREATE UNIQUE INDEX "properties_slug_unique_idx" ON "properties" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "properties_owner_id_idx" ON "properties" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "properties_city_status_idx" ON "properties" USING btree ("city","status");--> statement-breakpoint
CREATE UNIQUE INDEX "property_floors_property_floor_unique_idx" ON "property_floors" USING btree ("property_id","floor_number");--> statement-breakpoint
CREATE INDEX "property_floors_property_id_idx" ON "property_floors" USING btree ("property_id");--> statement-breakpoint
CREATE INDEX "property_listings_owner_id_idx" ON "property_listings" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "property_listings_property_id_idx" ON "property_listings" USING btree ("property_id");--> statement-breakpoint
CREATE INDEX "property_listings_unit_id_idx" ON "property_listings" USING btree ("unit_id");--> statement-breakpoint
CREATE INDEX "property_listings_status_available_from_idx" ON "property_listings" USING btree ("status","available_from");--> statement-breakpoint
CREATE INDEX "property_media_property_id_idx" ON "property_media" USING btree ("property_id");--> statement-breakpoint
CREATE INDEX "property_media_unit_id_idx" ON "property_media" USING btree ("unit_id");--> statement-breakpoint
CREATE INDEX "property_media_listing_id_idx" ON "property_media" USING btree ("listing_id");--> statement-breakpoint
CREATE INDEX "property_units_property_id_idx" ON "property_units" USING btree ("property_id");--> statement-breakpoint
CREATE INDEX "property_units_floor_id_idx" ON "property_units" USING btree ("floor_id");--> statement-breakpoint
CREATE INDEX "property_units_parent_unit_id_idx" ON "property_units" USING btree ("parent_unit_id");--> statement-breakpoint
CREATE INDEX "property_units_type_availability_idx" ON "property_units" USING btree ("unit_type","availability_status");
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export type LeadLocation = {
  latitude: number;
  longitude: number;
  accuracy?: number | null;
};

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

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL");
}

declare global {
  var __easystay_sql__: ReturnType<typeof postgres> | undefined;
}

const sql =
  globalThis.__easystay_sql__ ??
  postgres(connectionString, {
    ssl: "require",
    prepare: false,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__easystay_sql__ = sql;
}

export const db = drizzle(sql, { schema });

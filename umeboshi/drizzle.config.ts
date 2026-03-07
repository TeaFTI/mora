/**
 * drizzle Configuration
 */

import "@dotenvx/dotenvx/config";

import { defineConfig } from "drizzle-kit";

import PostgreSQLConfiguration from "./database/configuration";

const DATABASE_URI = PostgreSQLConfiguration.DATABASE_URI;

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URI,
  },
  out: "./database/migration",
  schema: "./database/schema/index.ts",
  verbose: true,
  strict: true,
});

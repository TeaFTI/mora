/**
 * Country Table Schema
 */

import { sql } from "drizzle-orm";
import { char, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

const countryTable = pgTable(`${TABLE_PREFIX}country`, {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  name: text("name").notNull().unique(),
  displayName: text("display_name"),
  officialStateName: text("official_state_name"),
  iso31661Alpha2: char("iso_3166_1_alpha_2", { length: 2 }).notNull().unique(),
  iso31661Alpha3: char("iso_3166_1_alpha_3", { length: 3 }).notNull().unique(),
  iso31661Numeric: char("iso_3166_1_numeric", { length: 3 }).notNull().unique(),
});

export default countryTable;
export { countryTable };

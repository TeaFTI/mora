/**
 * Currency Table Schema
 */

import { sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

const currencyTable = pgTable(`${TABLE_PREFIX}currency`, {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  name: text("name").notNull(),
  displayName: text("display_name"),
  abbreviation: text("abbreviation").notNull(),
  symbol: text("symbol").notNull(),
  iso4217: text("iso_4217").notNull().unique(),
  fractionalUnit: text("fractional_unit"),
  base: text("base"),
});

export default currencyTable;
export { currencyTable };

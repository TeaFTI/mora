/**
 * Telephone Number Table Schema
 */

import { sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

const telephoneNumberTable = pgTable(`${TABLE_PREFIX}telephone_number`,
  {
    id: uuid("id").primaryKey().default(sql`uuidv7()`),
    countryCode: text("country_code").notNull(),
    number: text("number").notNull(),
  }
);

export default telephoneNumberTable;
export { telephoneNumberTable };

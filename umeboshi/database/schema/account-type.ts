/**
 * Account Type Table Schema
 */

import { sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

const accountTypeTable = pgTable(`${TABLE_PREFIX}account_type`, {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  name: text("name").notNull().unique(),
  displayName: text("display_name"),
  description: text("description"),
});

export default accountTypeTable;
export { accountTypeTable };

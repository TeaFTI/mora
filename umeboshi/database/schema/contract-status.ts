/**
 * Contract Status Table Schema
 */

import { sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

const contractStatusTable = pgTable(`${TABLE_PREFIX}contract_status`, {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  name: text("name").notNull().unique(),
  displayName: text("display_name"),
  description: text("description"),
});

export default contractStatusTable;
export { contractStatusTable };

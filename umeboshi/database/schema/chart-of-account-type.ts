/**
 * Chart of Account Type Table Schema
 */

import { sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

const chartOfAccountTypeTable = pgTable(
  `${TABLE_PREFIX}chart_of_account_type`,
  {
    id: uuid("id").primaryKey().default(sql`uuidv7()`),
    name: text("name").unique().notNull(),
    displayName: text("display_name"),
    description: text("description"),
  },
);

export default chartOfAccountTypeTable;
export { chartOfAccountTypeTable };
export type ChartOfAccountType = typeof chartOfAccountTypeTable.$inferSelect;

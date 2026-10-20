/**
 * Account Table Schema
 */

import { sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../../configuration/global";

import { accountTypeTable } from "./account-type";

const accountTable = pgTable(`${TABLE_PREFIX}account`, {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  accountTypeId: uuid("account_type_id")
    .references(() => accountTypeTable.id),
  name: text("name").notNull(),
  displayName: text("display_name"),
  description: text("description"),
});

export type Account = typeof accountTable.$inferSelect;
export type AccountCreate = typeof accountTable.$inferInsert;
export type AccountUpdate = Partial<Account>;
export { accountTable };


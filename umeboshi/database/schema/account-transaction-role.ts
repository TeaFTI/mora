/**
 * Account Transaction Role Table Schema
 */

import { sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";


const accountTransactionRoleTable = pgTable(
  `${TABLE_PREFIX}account_transaction_role`,
  {
    id: uuid("id").primaryKey().default(sql`uuidv7()`),
    name: text("name").notNull().unique(),
    displayName: text("display_name"),
    description: text("description"),
  },
);

export default accountTransactionRoleTable;
export { accountTransactionRoleTable };

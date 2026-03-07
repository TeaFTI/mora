/**
 * Transaction Type Table Schema
 */

import { sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

const transactionTypeTable = pgTable(`${TABLE_PREFIX}transaction_type`,
  {
    id: uuid("id").primaryKey().default(sql`uuidv7()`),
    name: text("name").notNull(),
    displayName: text("display_name"),
    description: text("description"),
  }
);

export default transactionTypeTable;
export { transactionTypeTable };


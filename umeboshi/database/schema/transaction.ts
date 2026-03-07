/**
 * Transaction Table Schema
 */

import { defineRelations, sql } from "drizzle-orm";
import {
  AnyPgColumn,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import transactionTypeTable from "./transaction-type";

const transactionTable = pgTable(`${TABLE_PREFIX}transaction`, {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  transactionTypeId: uuid("transaction_type_id")
    .references(() => transactionTypeTable.id),
  reverseTransactionId: uuid("reverse_transaction_id")
    .references((): AnyPgColumn => transactionTable.id),
  description: text("description"),
  created: timestamp("created", { withTimezone: true })
    .defaultNow(),
  completed: timestamp("completed", { withTimezone: true })
    .defaultNow(),
});

const transactionRelationList = defineRelations(
  { transactionTable, transactionTypeTable },
  (relation) => ({
    transactionTable: {
      transactionType: relation.one.transactionTypeTable({
        from: relation.transactionTable.transactionTypeId,
        to: relation.transactionTypeTable.id,
      }),
      reverseTransaction: relation.one.transactionTable({
        from: relation.transactionTable.reverseTransactionId,
        to: relation.transactionTable.id,
      }),
    },
    transactionTypeTable: {
      transactionList: relation.many.transactionTable(),
    },
  })
);

export default transactionTable;
export { transactionRelationList, transactionTable };


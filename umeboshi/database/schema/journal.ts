/**
 * Journal Table Schema
 */

import { defineRelations, sql } from "drizzle-orm";
import {
  check,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import { JournalType } from "@/type/journal";
import accountTable from "./account";
import chartOfAccountTable from "./chart-of-account";
import currencyTable from "./currency";
import transactionTable from "./transaction";

const journalTypeEnum = pgEnum(
  "journal_type_enum",
  ["debit", "credit"] as const satisfies readonly JournalType[]
);

const journalTable = pgTable(`${TABLE_PREFIX}journal`,
  {
    id: uuid("id").primaryKey().default(sql`uuidv7()`),
    accountId: uuid("account_id")
      .references(() => accountTable.id),
    transactionId: uuid("transaction_id")
      .references(() => transactionTable.id),
    chartOfAccountId: uuid("chart_of_account_id")
      .references(() => chartOfAccountTable.id),
    currencyId: uuid("currency_id").references(() => currencyTable.id),
    description: text("description"),
    type: journalTypeEnum("type").notNull(),
    amount: numeric("amount", { precision: 105, scale: 5 }).notNull(),
    created: timestamp("created", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    check("amount_check", sql`${table.amount} >= 0`),
  ]
);

const journalRelationList = defineRelations(
  {
    journalTable,
    accountTable,
    transactionTable,
    chartOfAccountTable,
    currencyTable,
  },
  (relation) => ({
    journalTable: {
      account: relation.one.accountTable({
        from: relation.journalTable.accountId,
        to: relation.accountTable.id,
      }),
      transaction: relation.one.transactionTable({
        from: relation.journalTable.transactionId,
        to: relation.transactionTable.id,
      }),
      chartOfAccount: relation.one.chartOfAccountTable({
        from: relation.journalTable.chartOfAccountId,
        to: relation.chartOfAccountTable.id,
      }),
      currency: relation.one.currencyTable({
        from: relation.journalTable.currencyId,
        to: relation.currencyTable.id,
      }),
    },
    accountTable: {
      journalList: relation.many.journalTable()
    },
    transactionTable: {
      journalList: relation.many.journalTable()
    },
    chartOfAccountTable: {
      journalList: relation.many.journalTable()
    },
    currencyTable: {
      journalList: relation.many.journalTable()
    },
  })
);

export default journalTable;
export { journalRelationList, journalTable, journalTypeEnum };

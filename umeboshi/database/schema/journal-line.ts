/**
 * Journal Line Table Schema
 */

import { sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
} from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import chartOfAccountTable from "./chart-of-account";
import currencyTable from "./currency";
import journalTable from "./journal";

const journalLineTable = pgTable(`${TABLE_PREFIX}journal_line`,
  {
    id: uuid("id").primaryKey().default(sql`uuidv7()`),
    journalId: uuid("journal_id").references(() => journalTable.id),
    chartOfAccountId: uuid("chart_of_account_id")
      .references(() => chartOfAccountTable.id),
    currencyId: uuid("currency_id").references(() => currencyTable.id),
  }
);

export default journalLineTable;
export { journalLineTable };

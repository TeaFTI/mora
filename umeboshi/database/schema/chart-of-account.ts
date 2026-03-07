/**
 * Chart of Account Table Schema
 * Asset, Liability, Equity, Revenue, Expense, Other
 */

import { defineRelations, sql } from "drizzle-orm";
import {
  AnyPgColumn,
  boolean,
  // foreignKey,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import { chartOfAccountTypeTable } from "./chart-of-account-type";

const chartOfAccountTable = pgTable(`${TABLE_PREFIX}chart_of_account`,
  {
    id: uuid("id").primaryKey().default(sql`uuidv7()`),
    parentId: uuid("parent_id")
      .references((): AnyPgColumn => chartOfAccountTable.id),
    chartOfAccountTypeId: uuid("chart_of_account_type_id")
      .references(() => chartOfAccountTypeTable.id),
    name: text("name").notNull(),
    displayName: text("display_name"),
    description: text("description"),
    active: boolean("active").default(true),
  },
  // (table) => [
  //   foreignKey({
  //     columns: [table.parentId],
  //     foreignColumns: [table.id],
  //     name: "chart_of_account_parent_id_fk",
  //   })
  // ]
);

const chartOfAccountRelationList = defineRelations(
  { chartOfAccountTable, chartOfAccountTypeTable },
  (relation) => ({
    chartOfAccountTable: {
      parentChartOfAccount: relation.one.chartOfAccountTable({
        from: relation.chartOfAccountTable.parentId,
        to: relation.chartOfAccountTable.id,
      }),
      chartOfAccountType: relation.one.chartOfAccountTypeTable({
        from: relation.chartOfAccountTable.chartOfAccountTypeId,
        to: relation.chartOfAccountTypeTable.id,
      }),
    },
    chartOfAccountTypeTable: {
      chartOfAccountList: relation.many.chartOfAccountTable()
    },
  })
);

export default chartOfAccountTable;
export { chartOfAccountRelationList, chartOfAccountTable };


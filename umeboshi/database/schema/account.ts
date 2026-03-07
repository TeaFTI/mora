/**
 * Account Table Schema
 */

import { defineRelations, sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import accountTypeTable from "./account-type";

const accountTable = pgTable(`${TABLE_PREFIX}account`, {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  accountTypeId: uuid("account_type_id")
    .references(() => accountTypeTable.id),
  name: text("name").notNull(),
  displayName: text("display_name"),
  description: text("description"),
});

const accountRelationList = defineRelations(
  { accountTable, accountTypeTable },
  (relation) => ({
    accountTable: {
      accountType: relation.one.accountTypeTable({
        from: relation.accountTable.accountTypeId,
        to: relation.accountTypeTable.id,
      })
    },
    accountTypeTable: {
      accountList: relation.many.accountTable()
    },
  })
);

export default accountTable;
export { accountRelationList, accountTable };

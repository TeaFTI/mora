/**
 * User Account Table Schema
 */

import { defineRelations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import { accountTable } from "./account";
import { userTable } from "./user";

const userAccountTable = pgTable(`${TABLE_PREFIX}user_account`,
  {
    userId: uuid("user_id").notNull()
      .references(() => userTable.id),
    accountId: uuid("account_id").notNull()
      .references(() => accountTable.id),
  },
  (table) => [
    primaryKey({
      columns: [table.userId, table.accountId],
    })
  ],
);

const userAccountRelationList = defineRelations(
  { userTable, userAccountTable, accountTable },
  (relation) => ({
    userTable: {
      accountList: relation.many.accountTable({
        from: relation.userTable.id.through(
          relation.userAccountTable.userId,
        ),
        to: relation.accountTable.id.through(
          relation.userAccountTable.accountId,
        ),
      })
    },
    accountTable: {
      userList: relation.many.userTable()
    },
  })
);

export default userAccountTable;
export { userAccountRelationList, userAccountTable };

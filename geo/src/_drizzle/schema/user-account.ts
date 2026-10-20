/**
 * User Account Table Schema
 */

import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../../configuration/global";

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

export { userAccountTable };

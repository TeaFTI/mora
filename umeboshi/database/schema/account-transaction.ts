/**
 * Account Transaction Table Schema
 */

import { defineRelations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import accountTable from "./account";
import accountTransactionRoleTable from "./account-transaction-role";
import transactionTable from "./transaction";

const accountTransactionTable = pgTable(
  `${TABLE_PREFIX}account_transaction`,
  {
    accountId: uuid("account_id").notNull()
      .references(() => accountTable.id),
    transactionId: uuid("transaction_id").notNull()
      .references(() => transactionTable.id),
    accountTransactionRoleId: uuid("account_transaction_role_id")
      .notNull()
      .references(() => accountTransactionRoleTable.id),
  },
  (table) => [
    primaryKey({
      columns: [table.accountId, table.transactionId],
    }),
  ],
);

const accountTransactionRelationList = defineRelations(
  {
    accountTable,
    accountTransactionTable,
    transactionTable,
    accountTransactionRoleTable,
  },
  (relation) => ({
    accountTable: {
      transactionList: relation.many.transactionTable({
        from: relation.accountTable.id.through(
          relation.accountTransactionTable.accountId,
        ),
        to: relation.transactionTable.id.through(
          relation.accountTransactionTable.transactionId,
        ),
      }),
    },
    transactionTable: {
      accountList: relation.many.accountTable()
    },
    accountTransactionTable: {
      accountTransactionRole: relation.one.accountTransactionRoleTable({
        from: relation.accountTransactionTable.accountTransactionRoleId,
        to: relation.accountTransactionRoleTable.id,
      }),
    },
    accountTransactionRoleTable: {
      accountTransactionList: relation.many.accountTransactionTable()
    },
  })
);

export default accountTransactionTable;
export { accountTransactionRelationList, accountTransactionTable };

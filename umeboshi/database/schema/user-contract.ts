/**
 * User Contract Table Schema
 */

import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import { defineRelations } from "drizzle-orm";
import contractTable from "./contract";
import userTable from "./user";

const userContractTable = pgTable(`${TABLE_PREFIX}user_contract`,
  {
    userId: uuid("user_id").notNull()
      .references(() => userTable.id),
    contractId: uuid("contract_id").notNull()
      .references(() => contractTable.id),
  },
  (table) => [
    primaryKey({
      columns: [table.userId, table.contractId],
    })
  ],
);

const userContractRelationList = defineRelations(
  { userTable, userContractTable, contractTable },
  (relation) => ({
    userTable: {
      contractList: relation.many.contractTable({
        from: relation.userTable.id.through(
          relation.userContractTable.userId,
        ),
        to: relation.contractTable.id.through(
          relation.userContractTable.contractId,
        ),
      })
    },
    contractTable: {
      userList: relation.many.userTable()
    },
  })
);

export default userContractTable;
export { userContractRelationList, userContractTable };


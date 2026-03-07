/**
 * Contract Item Table Schema
 */

import { defineRelations, sql } from "drizzle-orm";
import { AnyPgColumn, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import contractTable from "./contract";
import propertyTable from "./property";

const contractItemTable = pgTable(`${TABLE_PREFIX}contract_item`, {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  parentId: uuid("parent_id")
    .references((): AnyPgColumn => contractItemTable.id),
  contractId: uuid("contract_id")
    .references(() => contractTable.id),
  productId: uuid("product_id")
    .references(() => propertyTable.id),
  name: uuid("name"),
  displayName: uuid("display_name"),
  description: uuid("description"),
  startDate: timestamp("start_date", { withTimezone: true }),
  endDate: timestamp("end_date", { withTimezone: true }),
});

const contractItemRelationList = defineRelations(
  { contractItemTable, contractTable, propertyTable },
  (relation) => ({
    contractItemTable: {
      parentContractItem: relation.one.contractItemTable({
        from: relation.contractItemTable.parentId,
        to: relation.contractItemTable.id,
      }),
      contract: relation.one.contractTable({
        from: relation.contractItemTable.contractId,
        to: relation.contractTable.id,
      }),
      property: relation.one.propertyTable({
        from: relation.contractItemTable.productId,
        to: relation.propertyTable.id,
      }),
    },
    contractTable: {
      contractItemList: relation.many.contractItemTable()
    },
  })
);

export default contractItemTable;
export { contractItemRelationList, contractItemTable };

/**
 * Contract Table Schema
 */

import { defineRelations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import contractStatusTable from "./contract-status";

const contractTable = pgTable(`${TABLE_PREFIX}contract`, {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  contractStatusId: uuid("contract_status_id")
    .references(() => contractStatusTable.id),
  name: text("name"),
  displayName: text("display_name"),
  activateDate: timestamp("activate_date", { withTimezone: true }),
  startDate: timestamp("start_date", { withTimezone: true }),
  endDate: timestamp("end_date", { withTimezone: true }),
});

const contractRelationList = defineRelations(
  { contractTable, contractStatusTable },
  (relation) => ({
    contractTable: {
      contractStatus: relation.one.contractStatusTable({
        from: relation.contractTable.contractStatusId,
        to: relation.contractStatusTable.id,
      }),
    },
    contractStatusTable: {
      contractList: relation.many.contractTable()
    },
  })
);

export default contractTable;
export { contractRelationList, contractTable };

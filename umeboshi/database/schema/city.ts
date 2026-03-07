/**
 * City Table Schema
 */

import { defineRelations, sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import { divisionTable } from "./division";

const cityTable = pgTable(`${TABLE_PREFIX}city`, {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  divisionId: uuid("division_id").notNull()
    .references(() => divisionTable.id),
  name: text("name").notNull(),
  displayName: text("display_name"),
});

const cityRelationList = defineRelations(
  { cityTable, divisionTable },
  (relation) => ({
    cityTable: {
      division: relation.one.divisionTable({
        from: relation.cityTable.divisionId,
        to: relation.divisionTable.id,
      })
    },
    divisionTable: {
      cityList: relation.many.cityTable(),
    },
  })
);

export default cityTable;
export { cityRelationList, cityTable };

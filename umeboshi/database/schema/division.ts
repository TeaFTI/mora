/**
 * Division Table Schema
 */

import { defineRelations, sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import countryTable from "./country";

const divisionTable = pgTable(`${TABLE_PREFIX}division`, {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  countryId: uuid("country_id").notNull()
    .references(() => countryTable.id),
  name: text("name").notNull(),
  displayName: text("display_name"),
  iso31662: text("iso_3166_2"),
});

const divisionRelationList = defineRelations(
  { divisionTable, countryTable },
  (relation) => ({
    divisionTable: {
      country: relation.one.countryTable({
        from: relation.divisionTable.countryId,
        to: relation.countryTable.id,
      })
    },
    countryTable: {
      divisionList: relation.many.divisionTable(),
    },
  })
);

export default divisionTable;
export { divisionRelationList, divisionTable };

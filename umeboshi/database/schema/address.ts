/**
 * Address Table Schema
 */

import { defineRelations, sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import cityTable from "./city";

const addressTable = pgTable(`${TABLE_PREFIX}address`, {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  cityId: uuid("city_id").notNull().references(() => cityTable.id),
  street: text("street").notNull(),
  premise: text("premise"),
  postalCode: text("postal_code").notNull(),
});

const addressRelationList = defineRelations(
  { addressTable, cityTable },
  (relation) => ({
    addressTable: {
      city: relation.one.cityTable({
        from: relation.addressTable.cityId,
        to: relation.cityTable.id,
      })
    },
    cityTable: {
      addressList: relation.many.addressTable(),
    },
  })
);

export default addressTable;
export { addressRelationList, addressTable };

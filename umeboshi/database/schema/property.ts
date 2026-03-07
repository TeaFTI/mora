/**
 * Property Table Schema
 */

import { defineRelations, sql } from "drizzle-orm";
import {
  pgTable,
  smallint,
  text,
  uuid,
} from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import addressTable from "./address";

const propertyTable = pgTable(`${TABLE_PREFIX}property`, {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  key: text("key").primaryKey().notNull(),
  addressId: uuid("address_id").references(() => addressTable.id),
  parcelNumberLocal: text("parcel_number_local"),
  parcelNumberState: text("parcel_number_state"),
  parcelNumberPropertyId: text("parcel_number_property_id"),
  taxingDistrictCode: text("taxing_district_code"),
  taxingDistrictDescription: text("taxing_district_description"),
  section: smallint("section"),
  township: smallint("township"),
  range: smallint("range"),
  subdivisionName: text("subdivision_name"),
  subdivisionSection: smallint("subdivision_section"),
  deededAcres: smallint("deeded_acres"),
  politicalTownship: text("political_township"),
  lotNumber: smallint("lot_number"),
  stateTaxDistrict: text("state_tax_district"),
  lot: text("lot"),
  block: text("block"),
});

const propertyRelationList = defineRelations(
  { propertyTable, addressTable },
  (relation) => ({
    propertyTable: {
      address: relation.one.addressTable({
        from: relation.propertyTable.addressId,
        to: relation.addressTable.id,
      }),
    },
  })
);

export default propertyTable;
export { propertyRelationList, propertyTable };

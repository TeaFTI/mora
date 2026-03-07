/**
 * Contact Table Schema
 */

import { defineRelations, sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import profileTable from "./profile";

const contactTable = pgTable(`${TABLE_PREFIX}contact`, {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  profileId: uuid("profile_id").references(() => profileTable.id),
  company: text("company"),
});

const contactRelationList = defineRelations(
  { contactTable, profileTable },
  (relation) => ({
    contactTable: {
      profile: relation.one.profileTable({
        from: relation.contactTable.profileId,
        to: relation.profileTable.id,
      })
    },
  })
);

export default contactTable;
export { contactRelationList, contactTable };

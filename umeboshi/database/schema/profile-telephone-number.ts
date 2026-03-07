/**
 * Contact Telephone Number Table Schema
 */

import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { defineRelations } from "drizzle-orm/relations";

import { TABLE_PREFIX } from "../configuration";

import profileTable from "./profile";
import telephoneNumberTable from "./telephone-number";

const profileTelephoneNumberTable = pgTable(
  `${TABLE_PREFIX}profile_telephone_number`,
  {
    profileId: uuid("profile_id")
      .references(() => profileTable.id),
    telephoneNumberId: uuid("telephone_number_id")
      .references(() => telephoneNumberTable.id),
  },
  (table) => [
    primaryKey({ columns: [table.profileId, table.telephoneNumberId] })
  ],
);

const profileTelephoneNumberRelation = defineRelations(
  { profileTable, profileTelephoneNumberTable, telephoneNumberTable },
  (relation) => ({
    profileTable: {
      telephoneNumberList: relation.many.telephoneNumberTable({
        from: relation.profileTable.id.through(
          relation.profileTelephoneNumberTable.profileId,
        ),
        to: relation.telephoneNumberTable.id.through(
          relation.profileTelephoneNumberTable.telephoneNumberId,
        ),
      })
    },
    telephoneNumberTable: {
      profileList: relation.many.profileTable()
    },
  })
);

export default profileTelephoneNumberTable;
export { profileTelephoneNumberRelation };

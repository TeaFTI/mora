/**
 * Profile Address Table Schema
 */

import { defineRelations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import addressTable from "./address";
import profileTable from "./profile";

const profileAddressTable = pgTable(`${TABLE_PREFIX}profile_address`,
  {
    profileId: uuid("profile_id").notNull()
      .references(() => profileTable.id),
    addressId: uuid("address_id").notNull()
      .references(() => addressTable.id),
  },
  (table) => [
    primaryKey({
      columns: [table.profileId, table.addressId],
    })
  ],
);

const profileAddressRelationList = defineRelations(
  { profileTable, profileAddressTable, addressTable },
  (relation) => ({
    profileTable: {
      addressList: relation.many.addressTable({
        from: relation.profileTable.id.through(
          relation.profileAddressTable.profileId,
        ),
        to: relation.addressTable.id.through(
          relation.profileAddressTable.addressId,
        ),
      })
    },
    addressTable: {
      profileList: relation.many.profileTable()
    },
  })
);

export default profileAddressTable;
export { profileAddressRelationList, profileAddressTable };

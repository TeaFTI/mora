/**
 * Profile Email Table Schema
 */

import { defineRelations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import emailTable from "./email";
import profileTable from "./profile";

const profileEmailTable = pgTable(`${TABLE_PREFIX}profile_email`,
  {
    profileId: uuid("profile_id").notNull()
      .references(() => profileTable.id),
    emailId: uuid("email_id").notNull()
      .references(() => emailTable.id),
  },
  (table) => [
    primaryKey({
      columns: [table.profileId, table.emailId],
    })
  ],
);

const profileEmailRelationList = defineRelations(
  { profileTable, profileEmailTable, emailTable },
  (relation) => ({
    profileTable: {
      emailList: relation.many.emailTable({
        from: relation.profileTable.id.through(
          relation.profileEmailTable.profileId,
        ),
        to: relation.emailTable.id.through(
          relation.profileEmailTable.emailId,
        ),
      })
    },
    emailTable: {
      profileList: relation.many.profileTable()
    },
  })
);

export default profileEmailTable;
export { profileEmailRelationList, profileEmailTable };

/**
 * User Table Schema
 */

import { defineRelations, sql } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import profileTable from "./profile";

const userTable = pgTable(`${TABLE_PREFIX}user`, {
  id: uuid("id").primaryKey().default(sql`uuidv7()`),
  profileId: uuid("profile_id").references(() => profileTable.id),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  salt: text("salt").notNull(),
});

const userRelationList = defineRelations(
  { userTable, profileTable },
  (relation) => ({
    userTable: {
      profile: relation.one.profileTable({
        from: relation.userTable.profileId,
        to: relation.profileTable.id,
      }),
    },
  })
);

export default userTable;
export { userRelationList, userTable };

/**
 * Relation
 *
 * https://orm.drizzle.team/docs/relations-v1-v2
 */

import { defineRelations } from "drizzle-orm";

import { accountTable } from "./schema/account";
import { accountTypeTable } from "./schema/account-type";
import { emailTable } from "./schema/email";
import { profileTable } from "./schema/profile";
import { profileEmailTable } from "./schema/profile-email";
import { userTable } from "./schema/user";
import { userAccountTable } from "./schema/user-account";

const relation = defineRelations(
  {
    accountTable,
    accountTypeTable,
    emailTable,
    profileTable,
    profileEmailTable,
    userAccountTable,
    userTable,
  },
  (r) => ({
    /* Account Table */
    accountTable: {
      userList: r.many.userTable(),
      accountType: r.one.accountTypeTable({
        from: r.accountTable.accountTypeId,
        to: r.accountTypeTable.id,
      }),
    },
    /* Account Type Table */
    accountTypeTable: {
      accountList: r.many.accountTable(),
    },
    /* Email Table */
    emailTable: {
      profileList: r.many.profileTable()
    },
    /* Profile Table */
    profileTable: {
      emailList: r.many.emailTable({
        from: r.profileTable.id.through(r.profileEmailTable.profileId),
        to: r.emailTable.id.through(r.profileEmailTable.emailId),
      }),
      user: r.one.userTable(),
    },

    /* User Table */
    userTable: {
      profile: r.one.profileTable({
        from: r.userTable.profileId,
        to: r.profileTable.id,
      }),
      accountList: r.many.accountTable({
        from: r.userTable.id.through(r.userAccountTable.userId),
        to: r.accountTable.id.through(r.userAccountTable.accountId),
      }),
    },
  }),
);

export { relation };

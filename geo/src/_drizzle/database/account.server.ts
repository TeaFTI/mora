import { drizzleClient } from "../client";
import { Account } from "../schema/account";

/**
 * Retrieve and return the list of account(s).
 *
 * @param {boolean} expand - Whether to expand the profile data with
 * related data.
 * @returns {Promise<Account[]>} A promise that resolve to an array of
 * Account object(s).
 */
async function retrieve({
  expand = false
}: {
  expand?: boolean
} = {}): Promise<Account[]> {
  return await drizzleClient.query.accountTable.findMany({
    with: expand ? {
      userList: true,
    } : undefined
  });
}

export {
  retrieve
};

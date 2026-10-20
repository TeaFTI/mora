import { drizzleClient } from "../client";
import { AccountType, AccountTypeCreate, accountTypeTable } from "../schema/account-type";

/**
 * Retrieve and return the list of account type(s).
 *
 * @param {boolean} expand - Whether to expand the account type data
 * with related data.
 * @returns {Promise<Account[]>} A promise that resolve to an array of
 * Account Type object(s).
 */
async function retrieve({
  expand = false,
}: {
  expand?: boolean;
} = {}): Promise<AccountType[]> {
  return await drizzleClient.query.accountTypeTable.findMany({
    with: expand ? {
      accountList: true,
    } : undefined,
  });
}

/**
 * Retrieve and return an account type with the given Universally Unique
 * IDentifier (UUID).
 *
 * @param {string} id - The UUID of the account type.
 * @param {boolean} expand - Whether to expand the account type data
 * with related data.
 * @returns {Promise<AccountType | undefined>} A promise that resolve to
 * an AccountType object or undefined.
 */
async function retrieveById({
  id,
  expand = false,
}: {
  id: string;
  expand?: boolean;
}): Promise<AccountType | undefined> {
  return await drizzleClient.query.accountTypeTable.findFirst({
    where: { id: id },
    with: expand ? {
      accountList: true,
    } : undefined,
  });
}

async function create({
  data,
}: {
  data: AccountTypeCreate;
}): Promise<AccountTypeCreate> {
  const createEmail = await drizzleClient
    .insert(accountTypeTable)
    .values(data)
    .returning();

  return createEmail[0];
}

export {
  create,
  retrieve,
  retrieveById
};

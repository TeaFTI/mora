/**
 * Country Currency Table Schema
 */

import { defineRelations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { TABLE_PREFIX } from "../configuration";

import countryTable from "./country";
import currencyTable from "./currency";

const countryCurrencyTable = pgTable(`${TABLE_PREFIX}country_currency`,
  {
    countryId: uuid("country_id").references(() => countryTable.id),
    currencyId: uuid("currency_id").references(() => currencyTable.id),
  },
  (table) => [
    primaryKey({
      columns: [table.countryId, table.currencyId],
    })
  ],
);

const countryCurrencyRelationList = defineRelations(
  { countryTable, countryCurrencyTable, currencyTable },
  (relation) => ({
    countryTable: {
      currencyList: relation.many.currencyTable({
        from: relation.countryTable.id.through(
          relation.countryCurrencyTable.countryId,
        ),
        to: relation.currencyTable.id.through(
          relation.countryCurrencyTable.currencyId,
        ),
      })
    },
    currencyTable: {
      countryList: relation.many.countryTable()
    },
  })
);

export default countryCurrencyTable;
export { countryCurrencyRelationList, countryCurrencyTable };

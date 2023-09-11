import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import buildFormattedUrl from "utils/buildFormattedUrl";
import { Param, DefaultParms, ResourcesState, AddSecondaryUrl } from "types";

const clientsDefaultParams: DefaultParms = {
  orderBy: "-last_transaction_date",
  page: 1,
  limit: 10,
};

const licencesDefaultParams: DefaultParms = {
  orderBy: "-is_valid",
  page: 1,
  limit: 10,
};
const carsDefaultParams: DefaultParms = {
  orderBy: "-purchased_at",
  page: 1,
  limit: 10,
};

const expensesDefaultParams: DefaultParms = {
  orderBy: "-expense_date",
  page: 1,
  limit: 10,
};
const papersDefaultParams: DefaultParms = {
  orderBy: "-purchased_at",
  page: 1,
  limit: 10,
};
const procurationsDefaultParams: DefaultParms = {
  orderBy: "-purchased_at",
  page: 1,
  limit: 10,
};

const transctionsDefaultParams: DefaultParms = {
  orderBy: "-transaction_date",
  page: 1,
  limit: 10,
};
const stockDefaultParams = {
  orderBy: "name",
  page: 1,
  limit: Number.MAX_VALUE,
};

const initialState: ResourcesState = {
  clients: {
    baseUrl: "/clients",
    fetchedUrl: buildFormattedUrl("/clients", clientsDefaultParams),
    params: clientsDefaultParams,
  },
  licences: {
    baseUrl: "/licences",
    fetchedUrl: buildFormattedUrl("/licences", licencesDefaultParams),
    params: licencesDefaultParams,
  },
  cars: {
    baseUrl: "/cars",
    fetchedUrl: buildFormattedUrl("/cars", carsDefaultParams),
    params: carsDefaultParams,
  },
  expenses: {
    baseUrl: "/expenses",
    fetchedUrl: buildFormattedUrl("/expenses", expensesDefaultParams),
    params: expensesDefaultParams,
  },
  papers: {
    baseUrl: "/papers",
    fetchedUrl: buildFormattedUrl("/papers", papersDefaultParams),
    params: papersDefaultParams,
  },
  procurations: {
    baseUrl: "/procurations",
    fetchedUrl: buildFormattedUrl("/procurations", procurationsDefaultParams),
    params: procurationsDefaultParams,
  },
  transactionsDZD: {
    baseUrl: "/transactions/fiat/DZD",
    fetchedUrl: buildFormattedUrl("/transactions/fiat/DZD", transctionsDefaultParams),
    params: transctionsDefaultParams,
  },
  transactionsEUR: {
    baseUrl: "/transactions/fiat/EUR",
    fetchedUrl: buildFormattedUrl("/transactions/fiat/EUR", transctionsDefaultParams),
    params: transctionsDefaultParams,
  },
  stock: {
    baseUrl: "/stats/stock",
    fetchedUrl: buildFormattedUrl("/stats/stock", stockDefaultParams),
    params: stockDefaultParams,
  },
};

const resourceUrlsSlice = createSlice({
  name: "resourceUrls",
  initialState,
  reducers: {
    setParam: (state, action: PayloadAction<Param>) => {
      const { resource, paramKey, paramValue } = action.payload;
      const { baseUrl, params } = state[resource];

      if (paramKey === "orderBy" && typeof paramValue === "string") {
        params[paramKey] = params[paramKey] === paramValue ? `-${paramValue}` : paramValue;
      } else {
        params[paramKey] = paramValue;
      }

      state[resource].fetchedUrl = buildFormattedUrl(baseUrl, params);
    },
    addSecondaryUrl: (state, action: PayloadAction<AddSecondaryUrl>) => {
      const { resource, url } = action.payload;
      state[resource].secondaryUrl = url;
    },
    deleteParam: (state, action: PayloadAction<Omit<Param, "paramValue">>) => {
      const { resource, paramKey } = action.payload;
      const { baseUrl, params } = state[resource];

      delete state[resource].params[paramKey];

      state[resource].fetchedUrl = buildFormattedUrl(baseUrl, params);
    },
  },
});

export const { setParam, addSecondaryUrl, deleteParam } = resourceUrlsSlice.actions;
export default resourceUrlsSlice.reducer;

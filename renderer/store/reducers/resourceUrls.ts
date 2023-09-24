import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import buildFormattedUrl from "utils/buildFormattedUrl";
import { Param, DefaultParams, ResourceConfig, ResourcesState, AddSecondaryUrl, DeleteSecondaryUrl } from "types";

interface RestParams extends Record<string, string | number | boolean> {
  orderBy: string;
}

const generateResource = (url: string, params: RestParams): ResourceConfig => {
  const defaultParams = { ...params, page: 1, limit: 10 };

  return {
    baseUrl: url,
    startUrl: buildFormattedUrl(url, defaultParams),
    fetchedUrl: buildFormattedUrl(url, defaultParams),
    params: defaultParams,
  };
};

const clientsParams = { orderBy: "-last_transaction_date" };
const licencesParams = { orderBy: "-is_valid" };
const carsParams = { orderBy: "-purchased_at" };
const expensesParams = { orderBy: "-date_group", groupBy: "date_group" };
const papersParams = { orderBy: "-purchased_at" };
const procurationsParams = { orderBy: "-purchased_at" };
const transctionsParams = { orderBy: "-transaction_date" };
const stockParams = { orderBy: "name" };
const statsParams = { orderBy: "" };

const initialState: ResourcesState = {
  clients: generateResource("/clients", clientsParams),
  licences: generateResource("/licences", licencesParams),
  cars: generateResource("/cars", carsParams),
  expenses: generateResource("/expenses", expensesParams),
  papers: generateResource("/papers", papersParams),
  procurations: generateResource("/procurations", procurationsParams),
  transactionsDZD: generateResource("/transactions/fiat/DZD", transctionsParams),
  transactionsEUR: generateResource("/transactions/fiat/EUR", transctionsParams),
  stock: generateResource("/stats/stock", stockParams),
  countStats: generateResource("/stats/count", statsParams),
  carsStats: generateResource("/stats/cars", statsParams),
  licencesStats: generateResource("/stats/licences", statsParams),
  transactionsStats: generateResource("/stats/transactions", statsParams),
  expensesStats: generateResource("/stats/expenses", statsParams),
  procurationsStats: generateResource("/stats/procurations", statsParams),
  papersStats: generateResource("/stats/papers", statsParams),
};

const resourceUrlsSlice = createSlice({
  name: "resourceUrls",
  initialState,
  reducers: {
    setParam: (state, action: PayloadAction<Param>) => {
      const { resource, paramKey, paramValue } = action.payload;
      const { baseUrl, params, secondaryUrl } = state[resource];

      if (paramKey === "orderBy" && typeof paramValue === "string") {
        params[paramKey] = params[paramKey] === paramValue ? `-${paramValue}` : paramValue;
      } else {
        params[paramKey] = paramValue;
      }

      if (resource === "expenses" && secondaryUrl) {
        const urlPart = secondaryUrl.split("?")[0];
        state[resource].secondaryUrl = buildFormattedUrl(urlPart, params);
      } else {
        state[resource].fetchedUrl = buildFormattedUrl(baseUrl, params);
      }
    },
    addSecondaryUrl: (state, action: PayloadAction<AddSecondaryUrl>) => {
      const { resource, url } = action.payload;
      const { params } = state[resource];

      if (resource === "expenses") {
        state[resource].secondaryUrl = buildFormattedUrl(url, params);
      } else {
        state[resource].secondaryUrl = url;
      }
    },
    deleteSecondaryUrl: (state, action: PayloadAction<DeleteSecondaryUrl>) => {
      const { resource } = action.payload;
      delete state[resource].secondaryUrl;
    },
    deleteParam: (state, action: PayloadAction<Omit<Param, "paramValue">>) => {
      const { resource, paramKey } = action.payload;
      const { baseUrl } = state[resource];

      delete state[resource].params[paramKey];

      state[resource].fetchedUrl = buildFormattedUrl(baseUrl, state[resource].params);
    },
  },
});

export const { setParam, addSecondaryUrl, deleteSecondaryUrl, deleteParam } = resourceUrlsSlice.actions;
export default resourceUrlsSlice.reducer;

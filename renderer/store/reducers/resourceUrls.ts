import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import buildFormattedUrl from "utils/buildFormattedUrl";
import { Param, DefaultParams, ResourceConfig, ResourcesState, AddSecondaryUrl, DeleteSecondaryUrl } from "types";

interface RestParams extends Record<string, string | number | boolean> {
  orderBy: string;
}

const generateResource = (url: string, params: RestParams): ResourceConfig => {
  const defaultParams = { ...params, page: 1, limit: 250 };

  return {
    baseUrl: url,
    startUrl: buildFormattedUrl(url, defaultParams),
    fetchedUrl: buildFormattedUrl(url, defaultParams),
    params: defaultParams,
  };
};

function formatTodayDate(): string {
  const today = new Date();
  const startDate = formatDate(today);

  // Set endDate to tomorrow
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const endDate = formatDate(tomorrow);

  return `${startDate}_${endDate}`;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = "00";
  const minutes = "00";
  const seconds = "00";

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function padZero(num: number): string {
  return num < 10 ? `0${num}` : num.toString();
}

// Example usage
const todayDateRange = formatTodayDate();

const categoriesParams = { orderBy: "" };
const clientsParams = { orderBy: "-last_transaction_date" };
const licencesParams = { orderBy: "-is_valid" };
const carsParams = { orderBy: "-purchased_at" };
const expensesParams = { orderBy: "-date_group", groupBy: "date_group" };
const papersParams = { orderBy: "-purchased_at" };
const procurationsParams = { orderBy: "-purchased_at" };
const transctionsParams = { orderBy: "-transaction_date" };
const stockParams = { orderBy: "name" };
const statsParams = { orderBy: "" };
const dailyParams = { orderBy: "", transaction_date: todayDateRange };

const initialState: ResourcesState = {
  categories: generateResource("/categories", categoriesParams),
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
  dailyStats: generateResource("/stats/daily", dailyParams),
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
      console.log(action.payload);

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

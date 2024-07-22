export type Resources =
  | "clients"
  | "categories"
  | "licences"
  | "cars"
  | "expenses"
  | "papers"
  | "procurations"
  | "transactionsDZD"
  | "transactionsEUR"
  | "stock"
  | "countStats"
  | "carsStats"
  | "licencesStats"
  | "expensesStats"
  | "transactionsStats"
  | "dailyStats"
  | "procurationsStats"
  | "papersStats";

export interface DefaultParams extends Record<string, string | number | boolean> {
  orderBy: string;
  page: number;
  limit: number;
}

export interface ResourceConfig {
  baseUrl: string;
  startUrl?: string;
  fetchedUrl: string;
  secondaryUrl?: string;
  params: DefaultParams;
}

export type ParamValue = string | number | boolean;

export interface Param {
  resource: Resources;
  paramKey: string;
  paramValue: ParamValue;
}

export interface AddSecondaryUrl {
  resource: Resources;
  url: string;
}
export interface DeleteSecondaryUrl {
  resource: Resources;
}

export type ResourcesState = {
  [key in Resources]: ResourceConfig;
};

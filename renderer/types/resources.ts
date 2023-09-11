export type Resources =
  | "clients"
  | "licences"
  | "cars"
  | "expenses"
  | "papers"
  | "procurations"
  | "transactionsDZD"
  | "transactionsEUR"
  | "stock";

export interface DefaultParms extends Record<string, string | number | boolean> {
  orderBy: string;
  page: number;
  limit: number;
}

interface ResourceConfig {
  baseUrl: string;
  fetchedUrl: string;
  secondaryUrl?: string;
  params: DefaultParms;
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

export type ResourcesState = {
  [key in Resources]: ResourceConfig;
};

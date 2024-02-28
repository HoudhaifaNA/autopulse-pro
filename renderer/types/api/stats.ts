interface CarCategoryStock {
  name: string;
  bought_number: number;
  sold_number: number;
  in_stock: number;
}

interface BalanceDetails {
  balance_status: "Créditeur" | "Débiteur" | "Équilibré";
  client_count: number;
  amount: number;
}

export interface CarsStats {
  type: string;
  total_cars_count: number;
  total_purchase: number;
  sold_cars_count: number;
  sold_total_purchase: number;
  total_sold: number;
  total_profit: number;
  total_profited_count: number;
  total_lost_count: number;
  total_positive_profit: number;
  total_negative_profit: number;
  lost_exchange_profit?: number;
  exchange_lost_count?: number;
  related_lost_profit?: number;
  total_realted_lost_profit?: number;
  related_lost_count?: number;
}

export interface GetStockResponse {
  result: number;
  total: CarCategoryStock;
  car_stock: CarCategoryStock[];
}

export interface GetCountsResponse {
  status: string;
  clients: number;
  cars: number;
  licences: number;
  expenses: number;
  procurations: number;
  papers: number;
  transactions: number;
}

export interface GetClientsStatsResponse {
  dzd_balance_status: BalanceDetails[];
  eur_balance_status: BalanceDetails[];
}

export interface GetCarsStatsResponse {
  all_cars: CarsStats;
  cars_by_category: CarsStats[];
}

export interface GetLicencesStatsResponse {
  licences_total_cost: {
    licences_count: number;
    total_cost: number;
  };
}
export interface GetExpensesStatsResponse {
  expenses_total_cost: {
    expenses_count: number;
    total_cost: number;
  };
}
export interface GetProcurationsStatsResponse {
  procurations_total_cost: {
    procurations_count: number;
    total_cost: number;
  };
}
export interface GetPapersStatsResponse {
  papers_total_cost: {
    papers_count: number;
    total_cost: number;
  };
}
export interface GetPapersStatsResponse {
  papers_total_cost: {
    papers_count: number;
    total_cost: number;
  };
}
export interface TransactionSummary {
  currency: "EUR" | "DZD";
  transactions_count: number;
  total_amount: number;
}

export interface GetTransactionsStatsResponse {
  transactions_total_amount: TransactionSummary[];
}
export interface GetDailyTransactionsResponse {
  daily_transactions: TransactionSummary[];
}

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

interface CarsStats {
  type: "dubai" | "europe" | "locale";
  total: number;
  cars_count: number;
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
  total_purchase_price_eur: CarsStats[];
  total_purchase_price_dzd: CarsStats[];
  total_expense_cost: CarsStats[];
  total_cost: CarsStats[];
  total_sold_price: CarsStats[];
  total_profit: CarsStats[];
  total_lost_profit: {
    locale: number;
    europe: number;
    dubai: number;
  };
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

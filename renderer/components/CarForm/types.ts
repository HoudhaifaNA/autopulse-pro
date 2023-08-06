interface Owner {
  id: number;
  name: string;
  price: number;
}
interface Seller {
  id: number;
  name: string;
}

interface Expenses {
  id: string;
  type: "locale" | "à l'étranger";
  raison: string;
  euroCost: number | string;
  totalCost: number | string;
}

export interface Values {
  id?: number;
  edit?: boolean;
  repurchase?: boolean;
  step: number;
  created_at: Date;
  type: "locale" | "importé" | "UAE";
  brand: string;
  model: string;
  serialNumber: string;
  registrationNumber: string;
  secondRegistrationNumber: string;
  keys: number;
  mileage: number;
  color: string;
  year: string;
  features: string;
  seller: Seller;
  costInEuros: number | string;
  euroPrice: number | string;
  purchasingPrice: number | string;
  owner: Owner;
  expenses: Expenses[];
  totalExpensesCost: number;
  totalEurosAmount: number;
  totalCost: number;
}

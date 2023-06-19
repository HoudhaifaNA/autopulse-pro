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
  euroPrice: number | string;
  totalCost: number | string;
}

export interface Values {
  step: number;
  created_at: Date;
  carType: "locale" | "importé";
  brand: string;
  model: string;
  serialNumber: string;
  registrationNumber: string;
  keys: number;
  mileage: number;
  color: string;
  year: string;
  features: string;
  seller: Seller;
  euroCost: number | string;
  euroPrice: number | string;
  purchasingPrice: number | string;
  owner: Owner;
  expenses: Expenses[];
  euroAmount: number;
  dzdAmount: number;
}

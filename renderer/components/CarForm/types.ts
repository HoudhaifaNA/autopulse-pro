interface Lisence {
  name: string;
  price: number;
}

interface Expenses {
  id: string;
  type: "locale" | "À l'étranger";
  raison: string;
  euroCost: number;
  euroPrice: number;
  totalCost: number;
}

export interface Values {
  step: number;
  carType: "locale" | "importé";
  brand: string;
  serie: string;
  model: string;
  serialNumber: string;
  registrationNumber: string;
  color: string;
  year: string;
  seller: string;
  euroCost: number;
  euroPrice: number;
  purchasingPrice: number;
  lisence: Lisence;
  expenses: Expenses[];
  euroAmount: number;
  dzdAmount: number;
  transactionAgreement: boolean;
}
export type setFieldValue = (
  field: string,
  value: any,
  shouldValidate?: boolean | undefined
) => void;

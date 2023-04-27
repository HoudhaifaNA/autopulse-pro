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
  totalCost: number;
  lisence: string;
  expenses: {
    id: string;
    type: "locale" | "À l'étranger";
    raison: string;
    euroCost: number;
    euroPrice: number;
    totalCost: number;
  }[];
  // Transaction agremment
  transactionAG: boolean;
}
export type setFieldValue = (
  field: string,
  value: any,
  shouldValidate?: boolean | undefined
) => void;

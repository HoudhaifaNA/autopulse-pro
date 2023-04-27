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
  boughtPrice: number;
  euroPrice: number;
  lisence: string;
  expenses: {
    id: string;
    type: "locale" | "À l'étranger";
    raison: string;
    euroCost: number;
    euroPrice: number;
    totalCost: number;
  }[];
}
export type setFieldValue = (
  field: string,
  value: any,
  shouldValidate?: boolean | undefined
) => void;

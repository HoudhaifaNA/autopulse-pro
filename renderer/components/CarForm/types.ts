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
  depenses: {
    type: "locale" | "À l'étranger";
    raison: string;
    cost: number;
  }[];
}
export type setFieldValue = (
  field: string,
  value: any,
  shouldValidate?: boolean | undefined
) => void;

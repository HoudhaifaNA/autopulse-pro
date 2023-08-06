import { FormikHelpers } from "formik";

export type FormikSubmit<T> = (
  values: T,
  actions: FormikHelpers<T>,
  context: any
) => Promise<void>;

export interface Client {
  id: number;
  clientType: "DA" | "euro";
  fullName: string;
  phoneNumber: string;
  balance: number;
  created_at: string;
}

export interface Licence {
  id: number;
  sellerId: string;
  moudjahid: string;
  wilaya: string;
  serialNumber: string;
  price: number;
  attachments: string;
  carId: string | null;
  validUntil: string;
  created_at: string;
  isValid: "false" | "true";
  isExpirated: "false" | "true";
  seller: string;
  carName: string | null;
}

export interface Transaction {
  id: number;
  productId: number;
  clientId: number;
  date: string;
  type: "licence" | "car" | "argent" | "euros";
  info1: string;
  info2: string;
  info3: string;
  info4: string;
  total: number;
  direction: "sortante" | "entrante";
  created_at: string;
}

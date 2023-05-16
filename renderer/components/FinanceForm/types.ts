type Method = "espèces" | "chèque" | "virement bancaire" | "carte de débit";

export interface Values {
  date: Date;
  client: string;
  method: Method;
  amount: number;
  type: "sortante" | "entrante";
}

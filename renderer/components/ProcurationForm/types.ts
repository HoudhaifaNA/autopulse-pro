interface Car {
  licenceId: number;
  name: string;
}

export interface Values {
  created_at: Date;
  issued_date: Date;
  received_date?: Date;
  id?: number;
  car: Car;
  price: number | string;
  type: "dépense" | "transaction";
  edit?: boolean;
}

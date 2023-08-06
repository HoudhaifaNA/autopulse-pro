interface Car {
  id: number;
  name: string;
}
interface Seller {
  id: number;
  name: string;
}

export interface Values {
  created_at: Date;
  issued_date: Date;
  received_date?: Date;
  id?: number;
  car: Car;
  seller: Seller;
  price: number | string;
  type: "dépense" | "transaction";
  edit?: boolean;
}

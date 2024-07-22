import { Procuration } from "interfaces";

export interface ProcurationInitalValues
  extends Pick<
    Procuration,
    | "purchased_at"
    | "car_id"
    | "car"
    | "seller"
    | "seller_id"
    | "moudjahid"
    | "procurator"
    | "notary"
    | "price"
    | "issue_date"
    | "note"
  > {}

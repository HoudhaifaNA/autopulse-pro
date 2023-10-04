import { Procuration } from "interfaces";

export interface ProcurationInitalValues
  extends Pick<
    Procuration,
    "purchased_at" | "type" | "licence_id" | "moudjahid" | "notary" | "price" | "received_at" | "issue_date"
  > {
  type_ui: string;
}

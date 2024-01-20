import { Procuration } from "interfaces";

export interface DeliverProcurationInitalValues
  extends Pick<Procuration, "received_at" | "recipient" | "is_expense" | "note"> {}

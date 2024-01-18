import { Paper } from "interfaces";

export interface DeliverPaperInitalValues extends Pick<Paper, "received_at" | "recipient" | "note"> {}

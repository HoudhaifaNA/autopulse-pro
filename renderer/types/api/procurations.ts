import { Procuration } from "interfaces";

export interface GetProcurationsResoponse {
  results: number;
  records_in_page: number;
  procurations: Procuration[];
}

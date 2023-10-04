import { Paper } from "interfaces";

export interface GetPapersResoponse {
  results: number;
  records_in_page: number;
  papers: Paper[];
}

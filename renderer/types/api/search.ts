import { Car, Client, Licence, Paper, Procuration } from "interfaces";

export type ClientsSearchResult = Pick<Client, "id" | "full_name">;
export type CarsSearchResult = Pick<Car, "id" | "name" | "serial_number" | "registration_number">;
export type LicencesSearchResult = Pick<Licence, "id" | "moudjahid" | "serial_number">;
export type ProcurationsSearchResult = Pick<Procuration, "id" | "notary" | "moudjahid" | "car">;
export type PapersSearchResult = Pick<Paper, "id" | "car">;
export type SearchResources = "clients" | "cars" | "licences" | "procurations" | "papers";
export type SearchItem =
  | ClientsSearchResult
  | CarsSearchResult
  | LicencesSearchResult
  | ProcurationsSearchResult
  | PapersSearchResult;

export interface SearchResults {
  items: SearchItem[];
}

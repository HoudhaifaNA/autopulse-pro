import { Licence } from "interfaces";

interface LicenceList {
  id: number;
  moudjahid: string;
  serial_number: string;
  car_id: number | null;
  is_valid: boolean;
  price: number;
  has_procuration: 0 | 1;
  buyer_id: number | null;
  procuration_exist: number | null;
}

export interface GetLicencesListResponse {
  results: number;
  licences: LicenceList[];
}

export interface GetAllLicencesResponse {
  results: number;
  records_in_page: number;
  licences: Licence[];
}

import { Car } from "interfaces";

export interface GetAllCarsResponse {
  results: number;
  records_in_page: number;
  cars: Car[];
}

interface CarBrand {
  brand: string;
  total_cars: number;
}
interface CarModel {
  brand: string;
  model: string;
  total_cars: number;
}
interface Category {
  count: number;
  type: string;
}

export interface GetCarsBrandsResponse {
  cars_brand: CarBrand[];
  cars_name: CarModel[];
}

interface CarWithPaper {
  id: number;
  name: string;
  color: string;
  buyer?: string;
  owner_name: string;
}

export interface GetCarsWithPapersResponse {
  cars: CarWithPaper[];
}

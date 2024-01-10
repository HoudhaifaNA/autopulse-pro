export interface CategoryCars {
  id: number;
  name: string;
  total_cars: number;
}

export interface GetCategoryCars {
  categories: CategoryCars[];
}

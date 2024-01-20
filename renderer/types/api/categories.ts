export interface CategoryCars {
  id: number;
  name: string;
  total_cars: number;
}

export interface GetCategories {
  categories: Omit<CategoryCars, "total_cars">[];
}
export interface GetCategoryCars {
  categories: CategoryCars[];
}

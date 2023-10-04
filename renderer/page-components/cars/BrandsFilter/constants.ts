import { SelectOption } from "components/Input/types";
import useSWR from "swr";
import { DefaultParams, GetCarsBrandsResponse } from "types";
import { fetcher } from "utils/API";
import buildFormattedUrl from "utils/buildFormattedUrl";
import slugify from "utils/slugify";

export const getCarsBrandsAndModelsList = (brand: string, filter: DefaultParams) => {
  const ownFilter = { ...filter };
  ownFilter.name = brand;
  const url = buildFormattedUrl("/cars/brandsAndSeries", ownFilter);
  const { data } = useSWR<GetCarsBrandsResponse>(url, fetcher);
  let brands: SelectOption[] = [];
  let models: SelectOption[] = [];
  let brandsCount: { [key: string]: number } = {};
  let modelsCount: { [key: string]: number } = {};

  if (data && data.cars_brand.length > 0) {
    const { cars_brand, cars_name } = data;
    brands = cars_brand.map(({ brand, total_cars }) => {
      brandsCount = { ...brandsCount, [brand]: total_cars };
      return {
        mainText: brand,
        secondText: `${total_cars}`,
        icon: slugify(brand, "_"),
      };
    });

    if (cars_name.length > 0) {
      models = cars_name.map(({ model, total_cars }) => {
        modelsCount = { ...modelsCount, [model]: total_cars };

        return {
          mainText: model,
          secondText: `${total_cars}`,
        };
      });
    }
  }

  return { brands, models, brandsCount, modelsCount };
};

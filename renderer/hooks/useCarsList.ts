import useSWR from "swr";

import { fetcher } from "utils/API";
import { SelectOption } from "components/Input/types";
import { GetCarsBrandsResponse } from "types";
import slugify from "utils/slugify";

const useCarsList = (name: string) => {
  const url = `/cars/brandsAndSeries?name=${name}`;
  const { data } = useSWR<GetCarsBrandsResponse>(url, fetcher);

  let brandsList: SelectOption[] = [];
  let modelsList: SelectOption[] = [];

  if (data && data.cars_brand.length > 0) {
    const { cars_brand, cars_name } = data;

    brandsList = cars_brand.map(({ brand }) => {
      return { mainText: brand, icon: slugify(brand) };
    });

    modelsList = cars_name.map(({ model }) => {
      return { mainText: model };
    });
  }

  return [brandsList, modelsList];
};

export default useCarsList;

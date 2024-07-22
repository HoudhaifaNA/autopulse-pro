import useSWR from "swr";

import { fetcher } from "utils/API";

import { SelectInputProps } from "components/Input/types";
import { GetCarsWithPapersResponse } from "types";

const useSoldCarsList = (isSold?: boolean) => {
  const param = isSold ? `type=sold` : "";
  const url = `/cars/list?${param}`;
  const { data, isLoading, error } = useSWR<GetCarsWithPapersResponse>(url, fetcher);

  let carsList: SelectInputProps["items"] = [];

  if (data && data.cars.length > 0) {
    const { cars } = data;

    carsList = cars.map(({ id, name, color, buyer, owner_name }) => {
      return {
        mainText: `${name}`,
        secondText: color,
        relatedValues: [id, buyer || "", owner_name],
      };
    });
  }

  return { carsList, isLoading, error } as const;
};

export default useSoldCarsList;

import useSWR from "swr";

import { fetcher } from "utils/API";

import { SelectInputProps } from "components/Input/types";
import { GetLicencesListResponse } from "types";

const useLicencesList = (params?: { id?: number }) => {
  const filterParams = params?.id ? `?id=${params.id}` : "";

  const url = `/licences/list${filterParams}`;
  const { data, isLoading, error } = useSWR<GetLicencesListResponse>(url, fetcher);

  let licencesList: SelectInputProps["items"] = [];

  if (data && data.licences.length > 0) {
    const { licences } = data;

    licencesList = licences.map(({ id, moudjahid, serial_number, price }) => {
      return {
        mainText: moudjahid,
        secondText: serial_number,
        relatedValues: [id, price],
      };
    });
  }

  return { licencesList, isLoading, error } as const;
};

export default useLicencesList;

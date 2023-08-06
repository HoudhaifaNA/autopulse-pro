import { SelectInputProps } from "components/Input/types";
import useSWR from "swr";

import { fetcher } from "utils/API";
import { Licence } from "../../interfaces";

interface LicencesData {
  licences: Licence[];
}

const useLicences = (edit?: boolean) => {
  const { data, isLoading, error } = useSWR<LicencesData>("/licences", fetcher);

  let licencesItems: SelectInputProps["items"] = [];

  if (data) {
    let { licences } = data;

    if (!edit) {
      licences = licences.filter((lc) => lc.isValid === "true");
    }

    licencesItems = licences.map((lic) => {
      const { id, moudjahid, serialNumber, price } = lic;

      return {
        mainText: moudjahid,
        secondText: serialNumber,
        relatedValues: [Number(id), price],
      };
    });
  }

  return { licencesItems, isLoading, error };
};

export default useLicences;

import useSWR from "swr";

import { fetcher } from "utils/API";
import { GetClientLastTransactionResponse } from "types";

const useClientLastTransaction = (id: string | number) => {
  const url = `/clients/${id}/lastTransaction`;

  const { data, isLoading, error } = useSWR<GetClientLastTransactionResponse>(url, fetcher);

  return { data, isLoading, error };
};

export default useClientLastTransaction;

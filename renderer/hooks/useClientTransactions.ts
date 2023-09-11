import useSWR from "swr";

import { fetcher } from "utils/API";
import { GetClientTransactionResponse } from "types";

const useClientTransactions = (id: string | string[] | undefined, currency: string = "") => {
  const url = `/clients/${id}/transactions?currency=${currency}`;

  const { data, isLoading, error } = useSWR<GetClientTransactionResponse>(url, fetcher);

  return { data, isLoading, error };
};

export default useClientTransactions;

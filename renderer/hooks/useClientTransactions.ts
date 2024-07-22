import useSWR from "swr";

import { fetcher } from "utils/API";
import { GetClientTransactionResponse } from "types";
import { Transaction } from "../../interfaces";

export type ClientTransactionFilter = Partial<Pick<Transaction, "currency" | "direction">> & {
  types?: string;
};

const useClientTransactions = (id: string | number, filter?: ClientTransactionFilter) => {
  let queriesList = [];
  if (filter?.currency) {
    queriesList.push(`currency=${filter.currency}`);
  }
  if (filter?.types) {
    queriesList.push(`types=${filter.types}`);
  }
  if (filter?.direction) {
    queriesList.push(`direction=${filter.direction}`);
  }

  const queries = queriesList.join("&");
  const url = `/clients/${id}/transactions?${queries}`;

  const { data, isLoading, error } = useSWR<GetClientTransactionResponse>(url, fetcher);

  return { data, isLoading, error, url };
};

export default useClientTransactions;

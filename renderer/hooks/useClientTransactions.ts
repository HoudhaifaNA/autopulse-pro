import useSWR from "swr";
import { Transaction } from "../../interfaces";
import { fetcher } from "utils/API";

interface Data {
  transactions: Transaction[];
}

const useClientTransactions = (id: number) => {
  const url = `/transactions/client/${id}`;

  const { data } = useSWR<Data>(url, fetcher);

  return data?.transactions ?? [];
};

export default useClientTransactions;

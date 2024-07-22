import useSWR from "swr";

import { fetcher } from "utils/API";

import { SelectInputProps } from "components/Input/types";
import { Client } from "interfaces";

interface ClientsData {
  clients: Pick<Client, "id" | "full_name">[];
}

const useClientsList = () => {
  const { data, isLoading, error } = useSWR<ClientsData>("/clients/list", fetcher);
  let clientsList: SelectInputProps["items"] = [];

  if (data && data.clients.length > 0) {
    const { clients } = data;
    clientsList = clients.map(({ id, full_name }) => {
      return {
        mainText: full_name,
        relatedValues: [id],
      };
    });
  }

  return { clientsList, isLoading, error } as const;
};

export default useClientsList;

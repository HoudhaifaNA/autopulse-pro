import useSWR from "swr";

import { fetcher } from "utils/API";

import { SelectInputProps } from "components/Input/types";
import { Client } from "../../interfaces";

interface ClientsData {
  clients: Client[];
}

const useClients = (type: string) => {
  let clientsItems: SelectInputProps["items"] = [];

  const { data, isLoading, error } = useSWR<ClientsData>("/clients", fetcher);

  if (data) {
    clientsItems = data.clients
      .filter((cl: Client) => cl.clientType === type)
      .map((cl) => {
        const { id, fullName, clientType } = cl;

        return {
          mainText: fullName,
          secondText: clientType,
          relatedValues: [Number(id)],
        };
      });
  }

  return { clientsItems, isLoading, error } as const;
};

export default useClients;

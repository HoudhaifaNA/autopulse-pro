import useSWR from "swr";

import { fetcher } from "utils/API";

import { Client } from "../../interfaces";

interface ClientData {
  client: Client;
}

const useClientById = (id: number) => {
  const { data, isLoading, error } = useSWR<ClientData>(
    `/clients/${id}`,
    fetcher
  );

  return { client: data?.client, isLoading, error };
};

export default useClientById;

import useSWR from "swr";

import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import Meta from "components/Meta/Meta";
import StatTicket from "components/StatTicket";
import Loading from "components/Loading/Loading";
import TicketList from "components/TicketList";

import { fetcher } from "utils/API";
import formatFiatValue from "utils/formatFiatValue";
import { GetClientsStatsResponse } from "types";

const ClientsStats = () => {
  const { data, isLoading, error } = useSWR<GetClientsStatsResponse>("/stats/clients", fetcher);

  const renderPage = () => {
    if (isLoading) return <Loading />;

    if (error) return <ErrorMessage>{error.response.data.message}</ErrorMessage>;

    if (data) {
      const renderTickets = (type: keyof typeof data) => {
        return data[type].map(({ balance_status, client_count, amount }) => {
          let currency: "DZD" | "EUR" = "DZD";
          if (type === "eur_balance_status") currency = "EUR";

          const balance = formatFiatValue(amount, currency, true);

          return (
            <StatTicket
              title={`Clients ${balance_status} (${client_count}) `}
              icon="clients"
              value={balance}
              key={balance_status}
            />
          );
        });
      };

      return (
        <>
          <TicketList title="Dinar">{renderTickets("dzd_balance_status")}</TicketList>
          <TicketList title="Euro">{renderTickets("eur_balance_status")}</TicketList>
        </>
      );
    }
  };
  return (
    <>
      <Meta title="Statistiques des clients" />
      {renderPage()}
    </>
  );
};

export default ClientsStats;

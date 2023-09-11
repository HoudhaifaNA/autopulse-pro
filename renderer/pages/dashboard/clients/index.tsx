import useSWR from "swr";

import Meta from "components/Meta/Meta";
import { fetcher } from "utils/API";
import styled from "styled-components";
import StatTicket from "components/StatTicket/StatTicket";
import Loading from "components/Loading/Loading";
import formatFiatValue from "utils/formatFiatValue";
import { Heading5 } from "styles/Typography";
import { ReactNode } from "react";
import { GetClientsStatsResponse } from "types";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
const TicketListWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  margin-bottom: 4rem;
  border-radius: 0.4rem;
`;
const TicketListItems = styled.div`
  width: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(20rem, 1fr));
  gap: 2rem;
  & > a {
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      box-shadow: 0 1rem 2rem 1rem rgba(0, 0, 0, 0.1);
    }
  }
`;

const TicketList = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <TicketListWrapper>
      <Heading5 style={{ margin: "2rem 0" }}>{title}</Heading5>
      <TicketListItems>{children}</TicketListItems>
    </TicketListWrapper>
  );
};

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

import useSWR from "swr";

import Meta from "components/Meta/Meta";
import { fetcher } from "utils/API";
import PageHeader from "components/PageHeader/PageHeader";
import styled from "styled-components";
import StatTicket from "components/StatTicket/StatTicket";
import Loading from "components/Loading/Loading";
import formatPrice from "utils/formatPrice";
import { Heading3, Heading5 } from "styles/Typography";
import { ReactNode } from "react";
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
  grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
  gap: 2rem;
  & > a {
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      box-shadow: 0 1rem 2rem 1rem rgba(0, 0, 0, 0.1);
    }
  }
`;

const TicketList = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <TicketListWrapper>
      <Heading5 style={{ margin: "2rem 0" }}>{title}</Heading5>
      <TicketListItems>{children}</TicketListItems>
    </TicketListWrapper>
  );
};

const ClientsStats = () => {
  const { data, isLoading } = useSWR("/stats/clients", fetcher);

  const renderData = () => {
    if (isLoading) {
      return <Loading />;
    } else if (data) {
      return (
        <>
          <TicketList title="Solde des clients par devise :">
            {data.clients_types.map((el: any, i: number) => {
              let title = "";
              if (el.clientType === "DA") title = "Solde des clients avec DA";
              if (el.clientType === "euro") {
                title = `Solde des clients avec EURO`;
              }

              return (
                <StatTicket
                  key={i}
                  title={`${title} (${el.clients_number})`}
                  icon="clients"
                  value={formatPrice(el.clients_balance, el.clientType, true)}
                />
              );
            })}
          </TicketList>
          <TicketList title="Dette et crédit par devise">
            {data.clients_balance.map((el: any, i: number) => {
              let title = "";
              let type = "";
              if (el.clients_balance < 0) type = "de la dette";
              if (el.clients_balance > 0) type = "du crédit";
              if (el.clientType === "DA") {
                title = `Montant ${type} avec les clients DA`;
              }
              if (el.clientType === "euro") {
                title = `Montant ${type} avec les clients EUROS`;
              }

              return (
                <StatTicket
                  key={i}
                  title={`${title} (${el.clients_number})`}
                  icon="clients"
                  value={formatPrice(el.clients_balance, el.clientType, true)}
                />
              );
            })}
          </TicketList>
        </>
      );
    }
  };

  return (
    <>
      <Meta title="Statistiques des clients" />
      <PageHeader />
      {renderData()}
    </>
  );
};

export default ClientsStats;

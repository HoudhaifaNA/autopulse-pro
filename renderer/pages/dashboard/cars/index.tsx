import useSWR from "swr";

import Meta from "components/Meta/Meta";
import { fetcher } from "utils/API";
import styled from "styled-components";
import StatTicket from "components/StatTicket/StatTicket";
import Loading from "components/Loading/Loading";
import formatFiatValue from "utils/formatFiatValue";
import { Heading5 } from "styles/Typography";
import { ReactNode } from "react";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import { GetCarsStatsResponse } from "types";

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

const CarsStats = () => {
  const { data, isLoading, error } = useSWR<GetCarsStatsResponse>("/stats/cars", fetcher);

  const renderPage = () => {
    if (isLoading) return <Loading />;

    if (error) return <ErrorMessage>{error.response.data.message}</ErrorMessage>;

    if (data) {
      const renderTickets = (field: keyof GetCarsStatsResponse) => {
        if (field !== "total_lost_profit") {
          return data[field].map((carType) => {
            const { type, total, cars_count } = carType;
            let currency: "DZD" | "EUR" = "DZD";
            let isBalance = false;
            if (field === "total_purchase_price_eur") currency = "EUR";
            if (field === "total_profit") isBalance = true;

            const formattedTotal = formatFiatValue(total, currency, isBalance);
            const title = `Voitures ${type} (${cars_count})`;

            return <StatTicket title={title} icon={type} value={formattedTotal} key={type} />;
          });
        } else {
          const { locale, europe, dubai } = data[field];
          const formattedLostProfitLocale = formatFiatValue(locale, "DZD", true);
          const formattedLostProfitEurope = formatFiatValue(europe, "DZD", true);
          const formattedLostProfitDubai = formatFiatValue(dubai, "DZD", true);

          return (
            <>
              <StatTicket title="Intérêt total perdu dubai" icon="dubai" value={formattedLostProfitDubai} />
              <StatTicket title="Intérêt total perdu europe" icon="europe" value={formattedLostProfitEurope} />
              <StatTicket title="Intérêt total perdu locale" icon="locale" value={formattedLostProfitLocale} />
            </>
          );
        }
      };

      return (
        <>
          <TicketList title="Prix ​​total d'achat en euros">{renderTickets("total_purchase_price_eur")}</TicketList>
          <TicketList title="Prix ​​total d'achat en dinars">{renderTickets("total_purchase_price_dzd")}</TicketList>
          <TicketList title="Coûts totaux des dépenses">{renderTickets("total_expense_cost")}</TicketList>
          <TicketList title="Coûts totaux de la voiture">{renderTickets("total_cost")}</TicketList>
          <TicketList title="Prix ​​de vente total">{renderTickets("total_sold_price")}</TicketList>
          <TicketList title="Intérêts totaux">{renderTickets("total_profit")}</TicketList>
          <TicketList title="Intérêt total perdu">{renderTickets("total_lost_profit")}</TicketList>
        </>
      );
    }
  };
  return (
    <>
      <Meta title="Statistiques des voitures" />
      {renderPage()}
    </>
  );
};

export default CarsStats;

import useSWR from "swr";

import Meta from "components/Meta/Meta";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import Loading from "components/Loading/Loading";
import StatTicket from "components/StatTicket";
import TicketList from "components/TicketList";
import CarsStatsFilter from "page-components/CarsStatsFilter";

import { fetcher } from "utils/API";
import formatFiatValue from "utils/formatFiatValue";
import { useAppSelector } from "store";
import { GetCarsStatsResponse } from "types";

const CarsStats = () => {
  const { fetchedUrl } = useAppSelector((state) => state.resourceUrls.carsStats);
  const { data, isLoading, error } = useSWR<GetCarsStatsResponse>(fetchedUrl, fetcher);

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
      <CarsStatsFilter />
      {renderPage()}
    </>
  );
};

export default CarsStats;

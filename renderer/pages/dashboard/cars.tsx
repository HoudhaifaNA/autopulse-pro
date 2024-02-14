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
import { CarsStats } from "types/api/stats";

const CarsStats = () => {
  const { fetchedUrl } = useAppSelector((state) => state.resourceUrls.carsStats);
  const { data, isLoading, error } = useSWR<GetCarsStatsResponse>(fetchedUrl, fetcher);

  const renderPage = () => {
    if (isLoading) return <Loading />;

    if (error) return <ErrorMessage>{error.response.data.message}</ErrorMessage>;

    if (data) {
      const renderStatsTickets = ({
        total_cars_count,
        total_purchase,
        sold_cars_count,
        sold_total_purchase,
        total_sold,
        total_profit,
        total_lost_count,
        total_negative_profit,
        total_profited_count,
        total_positive_profit,
        exchange_lost_count,
        lost_exchange_profit,
        related_lost_count,
        related_lost_profit,
        total_realted_lost_profit,
      }: CarsStats) => {
        return (
          <>
            <StatTicket
              title={`Coût total d'achat (${total_cars_count} voitures)`}
              icon="car"
              value={formatFiatValue(total_purchase, "DZD")}
            />
            <StatTicket
              title={`Coût total d'achat des voitures vendues (${sold_cars_count} voitures)`}
              icon="car"
              value={formatFiatValue(sold_total_purchase, "DZD")}
            />
            <StatTicket
              title={`Prix total vendu (${sold_cars_count} voitures)`}
              icon="car"
              value={formatFiatValue(total_sold, "DZD")}
            />
            <StatTicket
              title={`Intérêt total (${sold_cars_count} voitures)`}
              icon="car"
              value={formatFiatValue(total_profit, "DZD", true)}
            />
            <StatTicket
              title={`Intérêts negative (${total_lost_count} voitures)`}
              icon="car"
              value={formatFiatValue(total_negative_profit, "DZD", true)}
            />
            <StatTicket
              title={`Intérêts positive (${total_profited_count} voitures)`}
              icon="car"
              value={formatFiatValue(total_positive_profit, "DZD", true)}
            />
            {exchange_lost_count && lost_exchange_profit ? (
              <StatTicket
                title={`Échange et perdu (${exchange_lost_count} voitures)`}
                icon="car"
                value={formatFiatValue(lost_exchange_profit, "DZD", true)}
              />
            ) : null}
            {related_lost_count && related_lost_profit && total_realted_lost_profit ? (
              <StatTicket
                title={`Échange associé perdu (${related_lost_count} voitures)`}
                icon="car"
                value={formatFiatValue(related_lost_profit, "DZD", true)}
              />
            ) : null}
            {related_lost_count && total_realted_lost_profit ? (
              <StatTicket
                title={`Intérêts total avec les échanges (${related_lost_count} voitures)`}
                icon="car"
                value={formatFiatValue(total_realted_lost_profit, "DZD", true)}
              />
            ) : null}
          </>
        );
      };

      const renderTickets = () => {
        if (data)
          return (
            <>
              <TicketList title="Total">{renderStatsTickets(data.all_cars)}</TicketList>
              {data.cars_by_category.map((category) => {
                return <TicketList title={category.type}>{renderStatsTickets(category)}</TicketList>;
              })}
            </>
          );
      };

      return <>{renderTickets()}</>;
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

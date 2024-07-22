import useSWR from "swr";

import Meta from "components/Meta/Meta";
import StatTicket from "components/StatTicket";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import TicketList from "components/TicketList";
import ProcurationsStatsFilter from "page-components/ProcurationsStatsFilter";

import { fetcher } from "utils/API";
import formatFiatValue from "utils/formatFiatValue";
import { GetProcurationsStatsResponse } from "types";
import { useAppSelector } from "store";

const ProcurationsStats = () => {
  const { fetchedUrl } = useAppSelector((state) => state.resourceUrls.procurationsStats);

  const { data, isLoading, error } = useSWR<GetProcurationsStatsResponse>(fetchedUrl, fetcher);

  const renderPage = () => {
    if (isLoading) return <Loading />;

    if (error) return <ErrorMessage>{error.response.data.message}</ErrorMessage>;

    if (data) {
      const { total_cost, procurations_count } = data.procurations_total_cost;
      const formattedTotalCost = formatFiatValue(total_cost, "DZD");

      return (
        <TicketList title="Coûts totaux des procurations">
          <StatTicket title={`Procurations (${procurations_count})`} icon="procuration" value={formattedTotalCost} />
        </TicketList>
      );
    }
  };
  return (
    <>
      <Meta title="Statistiques des procurations" />
      <ProcurationsStatsFilter />
      {renderPage()}
    </>
  );
};

export default ProcurationsStats;

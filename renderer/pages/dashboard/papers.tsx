import useSWR from "swr";

import StatTicket from "components/StatTicket";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import Meta from "components/Meta/Meta";
import TicketList from "components/TicketList";
import PapersStatsFilter from "page-components/PapersStatsFilter";

import { fetcher } from "utils/API";
import formatFiatValue from "utils/formatFiatValue";
import { GetPapersStatsResponse } from "types";
import { useAppSelector } from "store";

const PapersStats = () => {
  const { fetchedUrl } = useAppSelector((state) => state.resourceUrls.papersStats);

  const { data, isLoading, error } = useSWR<GetPapersStatsResponse>(fetchedUrl, fetcher);

  const renderPage = () => {
    if (isLoading) return <Loading />;

    if (error) return <ErrorMessage>{error.response.data.message}</ErrorMessage>;

    if (data) {
      const { total_cost, papers_count } = data.papers_total_cost;
      const formattedTotalCost = formatFiatValue(total_cost, "DZD");

      return (
        <TicketList title="Coûts totaux des dossiers">
          <StatTicket title={`Dossiers (${papers_count})`} icon="folder" value={formattedTotalCost} />
        </TicketList>
      );
    }
  };
  return (
    <>
      <Meta title="Statistiques des dossiers" />
      <PapersStatsFilter />
      {renderPage()}
    </>
  );
};

export default PapersStats;

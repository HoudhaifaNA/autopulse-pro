import useSWR from "swr";

import StatTicket from "components/StatTicket";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import Meta from "components/Meta/Meta";
import TicketList from "components/TicketList";
import LicencesStatsFilter from "page-components/LicencesStatsFilter";

import { fetcher } from "utils/API";
import formatFiatValue from "utils/formatFiatValue";
import { GetLicencesStatsResponse } from "types";
import { useAppSelector } from "store";

const LicencesStats = () => {
  const { fetchedUrl } = useAppSelector((state) => state.resourceUrls.licencesStats);

  const { data, isLoading, error } = useSWR<GetLicencesStatsResponse>(fetchedUrl, fetcher);

  const renderPage = () => {
    if (isLoading) return <Loading />;

    if (error) return <ErrorMessage>{error.response.data.message}</ErrorMessage>;

    if (data) {
      const { total_cost, licences_count } = data.licences_total_cost;
      const formattedTotalCost = formatFiatValue(total_cost, "DZD");

      return (
        <TicketList title="Coûts totaux des licences">
          <StatTicket title={`Licences (${licences_count})`} icon="document" value={formattedTotalCost} />
        </TicketList>
      );
    }
  };
  return (
    <>
      <Meta title="Statistiques des licences" />
      <LicencesStatsFilter />
      {renderPage()}
    </>
  );
};

export default LicencesStats;

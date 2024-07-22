import useSWR from "swr";

import Meta from "components/Meta/Meta";
import StatTicket from "components/StatTicket";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import TicketList from "components/TicketList";
import ExpensesStatsFilter from "page-components/ExpensesStatsFilter";

import { fetcher } from "utils/API";
import formatFiatValue from "utils/formatFiatValue";
import { GetExpensesStatsResponse } from "types";
import { useAppSelector } from "store";

const ExpensesStats = () => {
  const { fetchedUrl } = useAppSelector((state) => state.resourceUrls.expensesStats);

  const { data, isLoading, error } = useSWR<GetExpensesStatsResponse>(fetchedUrl, fetcher);

  const renderPage = () => {
    if (isLoading) return <Loading />;

    if (error) return <ErrorMessage>{error.response.data.message}</ErrorMessage>;

    if (data) {
      const { total_cost, expenses_count } = data.expenses_total_cost;
      const formattedTotalCost = formatFiatValue(total_cost, "DZD");

      return (
        <TicketList title="Coûts totaux des dépenses">
          <StatTicket title={`Dépenses (${expenses_count})`} icon="shopping" value={formattedTotalCost} />
        </TicketList>
      );
    }
  };
  return (
    <>
      <Meta title="Statistiques des dépenses" />
      <ExpensesStatsFilter />
      {renderPage()}
    </>
  );
};

export default ExpensesStats;

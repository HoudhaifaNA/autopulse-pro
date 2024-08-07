import useSWR from "swr";

import Meta from "components/Meta/Meta";
import StatTicket from "components/StatTicket";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import TicketList from "components/TicketList";
import TransactionsStatsFilter from "page-components/TransactionsStatsFilter";

import { fetcher } from "utils/API";
import formatFiatValue from "utils/formatFiatValue";
import { GetDailyTransactionsResponse } from "types";
import { useAppSelector } from "store";
import RevenuTable from "page-components/dashboard/RevenuTable";

const TransactionsStats = () => {
  const { fetchedUrl } = useAppSelector((state) => state.resourceUrls.dailyStats);

  const { data, isLoading, error } = useSWR<GetDailyTransactionsResponse>(fetchedUrl, fetcher);

  const renderPage = () => {
    if (isLoading) return <Loading />;

    if (error) return <ErrorMessage>{error.response.data.message}</ErrorMessage>;

    if (data) {
      const { daily_transactions, lastDay_transactions } = data;

      const renderTransactionsTypes = () => {
        return daily_transactions.map((transaction) => {
          const { currency, transactions_count, total_amount } = transaction;

          const samePrevTotal = lastDay_transactions.find((l) => l.currency === currency);
          const formattedTotalCost = formatFiatValue(total_amount + (samePrevTotal?.total_amount || 0), currency, true);
          const icon = currency === "DZD" ? "dinar" : "euro";

          return (
            <StatTicket
              key={currency}
              title={`(${transactions_count}) Transactions`}
              icon={icon}
              value={formattedTotalCost}
            />
          );
        });
      };

      return <TicketList title="Coûts totaux des virements">{renderTransactionsTypes()}</TicketList>;
    }
  };
  return (
    <>
      <Meta title="Statistiques des virements" />
      <TransactionsStatsFilter />
      {renderPage()}
      {data?.transactions_list && (
        <RevenuTable
          dailyTransactions={data.daily_transactions}
          lastDayTransactions={data.lastDay_transactions}
          resource="dailyStats"
          transactions={data.transactions_list}
        />
      )}
    </>
  );
};

export default TransactionsStats;

import Filter from "components/Filter";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";

const TransactionsStatsFilter = () => {
  return (
    <Filter>
      <DateRangePicker rangeParam="transaction_date" resource="transactionsStats" label="Date d. transaction" />
    </Filter>
  );
};

export default TransactionsStatsFilter;

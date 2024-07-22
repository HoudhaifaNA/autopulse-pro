import Filter from "components/Filter";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";

const ExpensesStatsFilter = () => {
  return (
    <Filter>
      <DateRangePicker label="Date de dépense" resource="expensesStats" rangeParam="expense_date" />
    </Filter>
  );
};

export default ExpensesStatsFilter;

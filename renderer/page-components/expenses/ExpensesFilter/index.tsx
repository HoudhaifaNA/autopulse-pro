import Filter from "components/Filter/Filter";
import AmountRange from "components/AmountRange/AmountRange";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";
import { useRouter } from "next/router";

const ExpensesFilter = () => {
  const router = useRouter();

  let costField = "cost";
  if (router.asPath === "/expenses") costField = "total_cost";

  return (
    <Filter>
      <DateRangePicker label="Date de dépense" resource="expenses" rangeParam="expense_date" />
      <AmountRange label="Coût" resource="expenses" rangeParam={costField} />
    </Filter>
  );
};

export default ExpensesFilter;

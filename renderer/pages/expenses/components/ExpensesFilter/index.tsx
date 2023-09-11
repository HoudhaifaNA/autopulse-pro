import * as S from "./styles";

import Filter from "components/Filter/Filter";
import AmountRange from "components/AmountRange/AmountRange";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";
import CategoryFilter from "components/CategoryFilter";

const GROUP_CATEGORIES = {
  field: "groupBy",
  title: "Regrouper par",
  list: [
    { name: "Tous", option: "" },
    { name: "Date", option: "expense_date" },
    { name: "Raison", option: "raison" },
  ],
};

const ExpensesFilter = () => {
  return (
    <S.ExpensesFitlerWrapper>
      <Filter>
        <AmountRange label="Coût" resource="expenses" rangeParam="cost" />
        {/* <CategoryFilter resource="expenses" catgories={GROUP_CATEGORIES} /> */}
        <DateRangePicker label="Date de dépense" resource="expenses" rangeParam="expense_date" />
      </Filter>
    </S.ExpensesFitlerWrapper>
  );
};

export default ExpensesFilter;

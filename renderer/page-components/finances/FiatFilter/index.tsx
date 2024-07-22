import Filter from "components/Filter";
import AmountRange from "components/AmountRange/AmountRange";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";
import CategoryFilter from "components/CategoryFilter";

import { Resources } from "types";

interface FiatFilterProps {
  resource: Resources;
}

const DIRECTION_CATEGORIES = {
  field: "direction",
  title: "Direction",
  list: [
    { name: "Entrante", option: "entrante" },
    { name: "Sortante", option: "sortante" },
  ],
};

const FiatFilter = ({ resource }: FiatFilterProps) => {
  return (
    <Filter>
      <DateRangePicker rangeParam="transaction_date" resource={resource} label="Date d. transaction" />
      <AmountRange label="Montante" resource={resource} rangeParam="amount" />
      <CategoryFilter resource={resource} catgories={DIRECTION_CATEGORIES} />
    </Filter>
  );
};

export default FiatFilter;

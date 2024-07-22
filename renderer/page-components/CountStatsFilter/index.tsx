import Filter from "components/Filter";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";

const CountStatsFilter = () => {
  return (
    <Filter>
      <DateRangePicker label="Date" rangeParam="date_range" resource="countStats" />
    </Filter>
  );
};

export default CountStatsFilter;

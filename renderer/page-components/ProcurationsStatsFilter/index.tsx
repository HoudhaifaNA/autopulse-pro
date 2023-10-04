import Filter from "components/Filter";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";

const ProcurationsStatsFilter = () => {
  return (
    <Filter>
      <DateRangePicker label="Date de réception" resource="procurationsStats" rangeParam="purchased_at" />
      <DateRangePicker label="Date d'émission" resource="procurationsStats" rangeParam="issue_date" />
      <DateRangePicker label="Date de livraison" resource="procurationsStats" rangeParam="received_at" />
    </Filter>
  );
};

export default ProcurationsStatsFilter;

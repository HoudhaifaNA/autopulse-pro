import Filter from "components/Filter/Filter";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";

const PapersStatsFilter = () => {
  return (
    <Filter>
      <DateRangePicker label="Date de réception" resource="papersStats" rangeParam="purchased_at" />
      <DateRangePicker label="Date d'émission" resource="papersStats" rangeParam="issue_date" />
      <DateRangePicker label="Date de livraison" resource="papersStats" rangeParam="received_at" />
    </Filter>
  );
};

export default PapersStatsFilter;

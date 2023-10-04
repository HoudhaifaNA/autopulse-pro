import Filter from "components/Filter";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";

const LicencesStatsFilter = () => {
  return (
    <Filter>
      <DateRangePicker label="Date d'achat" resource="licencesStats" rangeParam="purchased_at" />
      <DateRangePicker label="Date d'émission" resource="licencesStats" rangeParam="issue_date" />
    </Filter>
  );
};

export default LicencesStatsFilter;

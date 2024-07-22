import Filter from "components/Filter";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";

const CarsStatsFilter = () => {
  return (
    <Filter>
      <DateRangePicker label="Date d'achat" rangeParam="purchased_at" resource="carsStats" />
      <DateRangePicker label="Date de vente" rangeParam="sold_at" resource="carsStats" />
    </Filter>
  );
};

export default CarsStatsFilter;

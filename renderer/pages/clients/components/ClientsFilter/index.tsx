import Filter from "components/Filter/Filter";
import AmountRange from "components/AmountRange/AmountRange";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";

const ClientsFilter = () => {
  return (
    <Filter>
      <AmountRange label="Sold DZD" resource="clients" rangeParam="dzd_balance" />
      <AmountRange label="Sold EUR" resource="clients" rangeParam="eur_balance" />
      <DateRangePicker rangeParam="last_transaction_date" resource="clients" label="Date d. transaction" />
      <DateRangePicker rangeParam="created_at" resource="clients" label="Date de création" />
    </Filter>
  );
};

export default ClientsFilter;

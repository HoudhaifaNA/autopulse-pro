import Filter from "components/Filter";
import AmountRange from "components/AmountRange/AmountRange";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";
import CategoryFilter from "components/CategoryFilter";

const TYPE_CATEGORIES = {
  field: "is_expense",
  title: "Type de procuration",
  list: [
    { name: "Transaction", option: "false" },
    { name: "Dépense", option: "true" },
  ],
};
const RECEIVED_CATEGORIES = {
  field: "has_received",
  title: "Recu de dossier",
  list: [
    { name: "Non recu", option: "false" },
    { name: "Recu", option: "true" },
  ],
};

const EXPIRATION_CATEGORIES = {
  field: "is_expirated",
  title: "Expiration de la licence",
  list: [
    { name: "Non expiré", option: "false" },
    { name: "Expiré", option: "true" },
  ],
};

const ProcurationsFilter = () => {
  return (
    <Filter>
      <DateRangePicker label="Date de réception" resource="procurations" rangeParam="purchased_at" />
      <DateRangePicker label="Date d'émission" resource="procurations" rangeParam="issue_date" />
      <DateRangePicker label="Date de livraison" resource="procurations" rangeParam="received_at" />
      <AmountRange label="Prix" resource="procurations" rangeParam="price" />
      <CategoryFilter resource="procurations" catgories={TYPE_CATEGORIES} />
      <CategoryFilter resource="procurations" catgories={RECEIVED_CATEGORIES} />
      <CategoryFilter resource="procurations" catgories={EXPIRATION_CATEGORIES} />
    </Filter>
  );
};

export default ProcurationsFilter;

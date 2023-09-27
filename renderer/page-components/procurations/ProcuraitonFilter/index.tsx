import Filter from "components/Filter";
import AmountRange from "components/AmountRange/AmountRange";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";
import CategoryFilter from "components/CategoryFilter";

const TYPE_CATEGORIES = {
  field: "type",
  title: "Type de dossier",
  list: [
    { name: "Transaction", option: "transaction" },
    { name: "Dépense", option: "expense" },
  ],
};
const RECEIVED_CATEGORIES = {
  field: "has_received",
  title: "Recu de dossier",
  list: [
    { name: "Recu", option: "true" },
    { name: "Non recu", option: "false" },
  ],
};

const EXPIRATION_CATEGORIES = {
  field: "is_expirated",
  title: "Expiration de la licence",
  list: [
    { name: "Expiré", option: "true" },
    { name: "Non expiré", option: "false" },
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

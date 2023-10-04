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

const PapersFilter = () => {
  return (
    <Filter>
      <DateRangePicker label="Date de réception" resource="papers" rangeParam="purchased_at" />
      <DateRangePicker label="Date d'émission" resource="papers" rangeParam="issue_date" />
      <DateRangePicker label="Date de livraison" resource="papers" rangeParam="received_at" />
      <AmountRange label="Prix" resource="papers" rangeParam="price" />
      <CategoryFilter resource="papers" catgories={TYPE_CATEGORIES} />
      <CategoryFilter resource="papers" catgories={RECEIVED_CATEGORIES} />
      <CategoryFilter resource="papers" catgories={EXPIRATION_CATEGORIES} />
    </Filter>
  );
};

export default PapersFilter;

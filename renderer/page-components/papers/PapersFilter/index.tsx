import Filter from "components/Filter";
import AmountRange from "components/AmountRange/AmountRange";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";
import CategoryFilter from "components/CategoryFilter";

const TYPE_CATEGORIES = {
  field: "type",
  title: "Type de dossier",
  list: [
    { name: "Dossier", option: "dossier" },
    { name: "Cart grise", option: "cart grise" },
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

const PapersFilter = () => {
  return (
    <Filter>
      <DateRangePicker label="Date donnée" resource="papers" rangeParam="given_at" />
      <DateRangePicker label="Date de réception" resource="papers" rangeParam="purchased_at" />
      <DateRangePicker label="Date de livraison" resource="papers" rangeParam="received_at" />
      <AmountRange label="Prix" resource="papers" rangeParam="price" />
      <CategoryFilter resource="papers" catgories={TYPE_CATEGORIES} />
      <CategoryFilter resource="papers" catgories={RECEIVED_CATEGORIES} />
    </Filter>
  );
};

export default PapersFilter;

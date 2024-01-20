import Filter from "components/Filter";
import AmountRange from "components/AmountRange/AmountRange";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";
import CategoryFilter from "components/CategoryFilter";

const VALID_CATEGORIES = {
  field: "is_valid",
  title: "Validité de la licence",
  list: [
    { name: "Valide", option: "true" },
    { name: "Invalide", option: "false" },
  ],
};

const RESERVED_CATEGORIES = {
  field: "is_reserved",
  title: "Réservation de la licence",
  list: [
    { name: "Réservée", option: "true" },
    { name: "Disponible", option: "false" },
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

const LicencesFilter = () => {
  return (
    <Filter>
      <DateRangePicker label="Date d'achat" resource="licences" rangeParam="purchased_at" />
      <DateRangePicker label="Date d'émission" resource="licences" rangeParam="issue_date" />
      <AmountRange label="Prix" resource="licences" rangeParam="price" />
      <CategoryFilter resource="licences" catgories={VALID_CATEGORIES} />
      <CategoryFilter resource="licences" catgories={RESERVED_CATEGORIES} />
      <CategoryFilter resource="licences" catgories={EXPIRATION_CATEGORIES} />
    </Filter>
  );
};

export default LicencesFilter;

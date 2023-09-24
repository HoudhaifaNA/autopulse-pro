import Filter from "components/Filter/Filter";
import AmountRange from "components/AmountRange/AmountRange";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";
import CategoryFilter from "components/CategoryFilter";
import BrandsFilter from "../BrandsFilter/BrandsFilter";
import YearsPickerInput from "components/YearsPickerInput";

const TYPE_CATEGORIES = {
  field: "type",
  title: "Type de voitures",
  list: [
    { name: "Local", option: "locale" },
    { name: "Europe", option: "europe" },
    { name: "Dubai", option: "dubai" },
  ],
};

const LICENCE_CATEGORIES = {
  field: "isLicenceInComplete",
  title: "Licence",
  list: [
    { name: "Incomplète", option: "true" },
    { name: "Complète", option: "false" },
  ],
};
const PP_CATEGORIES = {
  field: "isPPInComplete",
  title: "Prix d'achat",
  list: [
    { name: "Incomplète", option: "true" },
    { name: "Complète", option: "false" },
  ],
};
const EXPENSE_COST_CATEGORIES = {
  field: "isExpenseCostInComplete",
  title: "Dépenses",
  list: [
    { name: "Incomplète", option: "true" },
    { name: "Complète", option: "false" },
  ],
};
const SOLD_PRICE_CATEGORIES = {
  field: "isSoldPriceInComplete",
  title: "Prix de vente",
  list: [
    { name: "Incomplète", option: "true" },
    { name: "Complète", option: "false" },
  ],
};

const SOLD_CATEGORIES = {
  field: "isSold",
  title: "Vente de la voiture",
  list: [
    { name: "Vendue", option: "true" },
    { name: "Non vendue", option: "false" },
  ],
};

const CarsFilter = () => {
  return (
    <Filter>
      <DateRangePicker label="Date d'achat" resource="cars" rangeParam="purchased_at" />
      <DateRangePicker label="Date de vente" resource="cars" rangeParam="sold_at" />
      <YearsPickerInput label="Années de production" resource="cars" yearsParam="productionYears" />
      <BrandsFilter />
      <AmountRange label="Prix EUR" resource="cars" rangeParam="purchase_price_eur" />
      <AmountRange label="Prix DZD " resource="cars" rangeParam="purchase_price_dzd" />
      <AmountRange label="Coût dépenses" resource="cars" rangeParam="expense_cost" />
      <AmountRange label="Coût total" resource="cars" rangeParam="total_cost" />
      <AmountRange label="Prix de vente" resource="cars" rangeParam="sold_price" />
      <AmountRange label="Intérêt" resource="cars" rangeParam="profit" />
      <CategoryFilter resource="cars" catgories={TYPE_CATEGORIES} />
      <CategoryFilter resource="cars" catgories={LICENCE_CATEGORIES} />
      <CategoryFilter resource="cars" catgories={PP_CATEGORIES} />
      <CategoryFilter resource="cars" catgories={EXPENSE_COST_CATEGORIES} />
      <CategoryFilter resource="cars" catgories={SOLD_PRICE_CATEGORIES} />
      <CategoryFilter resource="cars" catgories={SOLD_CATEGORIES} />
    </Filter>
  );
};

export default CarsFilter;

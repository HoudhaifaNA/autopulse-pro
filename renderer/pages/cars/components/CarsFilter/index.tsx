import Filter from "components/Filter/Filter";
import AmountRange from "components/AmountRange/AmountRange";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";
import CategoryFilter from "components/CategoryFilter";
import BrandsFilter from "../BrandsFilter";

const TYPE_CATEGORIES = {
  field: "type",
  title: "Type de voitures",
  list: [
    { name: "Tous", option: "" },
    { name: "Local", option: "locale" },
    { name: "Europe", option: "europe" },
    { name: "Dubai", option: "dubai" },
  ],
};

const SOLD_CATEGORIES = {
  field: "isSold",
  title: "Statut de vente de la voiture",
  list: [
    { name: "Tous", option: "" },
    { name: "Vendue", option: "true" },
    { name: "Non vendue", option: "false" },
  ],
};

const CarsFilter = () => {
  return (
    <Filter>
      <BrandsFilter />
      <AmountRange label="Prix EUR" resource="cars" rangeParam="purchase_price_eur" />
      <AmountRange label="Prix DZD " resource="cars" rangeParam="purchase_price_dzd" />
      <AmountRange label="Coût dépenses" resource="cars" rangeParam="expense_cost" />
      <AmountRange label="Coût total" resource="cars" rangeParam="total_cost" />
      <AmountRange label="Prix de vente" resource="cars" rangeParam="sold_price" />
      <AmountRange label="Intérêt" resource="cars" rangeParam="profit" />
      <CategoryFilter resource="cars" catgories={TYPE_CATEGORIES} />
      <CategoryFilter resource="cars" catgories={SOLD_CATEGORIES} />
      <DateRangePicker label="Date d'achat" resource="cars" rangeParam="purchased_at" />
      <DateRangePicker label="Date de vente" resource="cars" rangeParam="sold_at" />
    </Filter>
  );
};

export default CarsFilter;

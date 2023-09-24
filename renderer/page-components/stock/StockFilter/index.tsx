import Filter from "components/Filter/Filter";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";
import CategoryFilter from "components/CategoryFilter";
import styled from "styled-components";
import { FilterCard } from "components/Filter/styles";

const FilterWrapper = styled.div`
  ${FilterCard} {
    overflow: visible;
  }
`;

const TYPE_CATEGORIES = {
  field: "type",
  title: "Type de voitures",
  list: [
    { name: "Local", option: "locale" },
    { name: "Europe", option: "europe" },
    { name: "Dubai", option: "dubai" },
  ],
};

const StockFilter = () => {
  return (
    <FilterWrapper>
      <Filter>
        <DateRangePicker label="Date d'achat" resource="stock" rangeParam="purchased_at" />
        <DateRangePicker label="Date de vente" resource="stock" rangeParam="sold_at" />
        <CategoryFilter resource="stock" catgories={TYPE_CATEGORIES} />
      </Filter>
    </FilterWrapper>
  );
};

export default StockFilter;

import { useState, useEffect } from "react";
import useSWR from "swr";
import styled from "styled-components";

import Filter from "components/Filter";
import DateRangePicker from "components/DateRangePicker/DateRangePicker";
import CategoryFilter, { CategoriesFliterItem } from "components/CategoryFilter";
import { FilterCard } from "components/Filter/styles";
import { GetCategories } from "types";
import { fetcher } from "utils/API";

const FilterWrapper = styled.div`
  ${FilterCard} {
    overflow: visible;
  }
`;

const StockFilter = () => {
  const [categories, setCategories] = useState<CategoriesFliterItem["list"]>([]);
  const { data: categoriesData } = useSWR<GetCategories>("/categories", fetcher);

  useEffect(() => {
    if (categoriesData) {
      const categoriesTypes = categoriesData.categories.map(({ name }) => {
        return { name, option: name };
      });
      setCategories(categoriesTypes);
    }
  }, [categoriesData]);

  const TYPE_CATEGORIES = {
    field: "type",
    title: "Type de voitures",
    list: categories,
  };
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

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";
import { Body2, LabelText } from "styles/Typography";

import { useAppSelector } from "store";
import { setParam } from "store/reducers/resourceUrls";
import { Resources } from "types";

interface CategoryItem {
  name: string;
  option: string;
}

interface Categories {
  field: string;
  title: string;
  list: CategoryItem[];
}

interface CategoryFilterProps {
  resource: Resources;
  catgories: Categories;
}

const CategoryFilter = ({ resource, catgories }: CategoryFilterProps) => {
  const selectedOption = useAppSelector((state) => state.resourceUrls[resource].params[catgories.field]);
  const dispatch = useDispatch();

  const selectOption = (option: string) =>
    dispatch(setParam({ resource, paramKey: catgories.field, paramValue: option }));

  const renderCategoriesOptions = () => {
    return catgories.list.map(({ name, option }) => {
      const isSelected = option === selectedOption;

      return (
        <S.CategoryFilterOption $isSelected={isSelected} onClick={() => selectOption(option)} key={option}>
          <Body2>{name}</Body2>
        </S.CategoryFilterOption>
      );
    });
  };
  return (
    <S.CategoryFilterWrapper>
      <LabelText>{catgories.title}</LabelText>
      <S.CategoryFilterList>{renderCategoriesOptions()}</S.CategoryFilterList>
    </S.CategoryFilterWrapper>
  );
};

export default CategoryFilter;

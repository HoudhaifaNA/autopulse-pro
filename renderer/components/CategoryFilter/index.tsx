import { useDispatch } from "react-redux";

import * as S from "./styles";
import { Body2, LabelText } from "styles/Typography";

import { useAppSelector } from "store";
import { deleteParam, setParam } from "store/reducers/resourceUrls";
import { Resources } from "types";

interface CategoryItem {
  name: string;
  option: string;
}

export interface CategoriesFliterItem {
  field: string;
  title: string;
  list: CategoryItem[];
}

interface CategoryFilterProps {
  resource: Resources;
  catgories: CategoriesFliterItem;
}

const CategoryFilter = ({ resource, catgories }: CategoryFilterProps) => {
  const selectedOption = useAppSelector((state) => state.resourceUrls[resource].params[catgories.field]);
  const dispatch = useDispatch();

  const selectOption = (option: string) => {
    if (option === selectedOption) {
      dispatch(deleteParam({ resource, paramKey: catgories.field }));
    } else {
      dispatch(setParam({ resource, paramKey: catgories.field, paramValue: option }));
    }
  };

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

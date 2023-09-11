import { SelectOption } from "components/Input/types";

type TFilterDropdownItems = (items: SelectOption[], query: string, sorted?: boolean) => SelectOption[];

const filterDropdownItems: TFilterDropdownItems = (items, query, sorted) => {
  const dropdownList = sorted ? items.sort((prev, curr) => prev.mainText.localeCompare(curr.mainText)) : items;

  return dropdownList.filter(({ mainText }) => {
    return mainText.toLowerCase().includes(query?.toLowerCase());
  });
};

export default filterDropdownItems;

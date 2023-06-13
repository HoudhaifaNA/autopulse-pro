type TItems = { mainText: string }[];

const filterDropdownItems = (items: TItems, query: string) => {
  return items
    .filter(({ mainText }) => {
      return mainText.toLowerCase().includes(query.toLowerCase());
    })
    .sort((prev, curr) => prev.mainText.localeCompare(curr.mainText));
};

export default filterDropdownItems;

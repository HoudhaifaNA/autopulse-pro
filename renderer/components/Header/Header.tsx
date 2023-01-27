import { useEffect, useRef, useState } from "react";
import Icon from "components/Icon/Icon";
import * as InputStyle from "components/Input/InputContainer.styled";
import * as S from "./Header.styled";
import { Body1, Body2, Heading5 } from "styles/Typography";
import Link from "next/link";

// !TODO NEED REFACTORE

interface SearchCategories {
  name: "voitures" | "licences" | "clients";
  items: { name: string; link: string }[];
}

const categoryToIcon = (category: SearchCategories["name"]) => {
  if (category === "voitures") return "car";
  if (category === "licences") return "document";
  return category;
};

const renderSearchedItems = (categories: SearchCategories[]) => {
  return categories.map((category) => {
    return (
      <S.SearchCategory>
        <span>{category.name}</span>
        {category.items.map((item) => {
          return (
            <S.CategoryItem>
              <Link href={item.link}>
                <Icon icon={categoryToIcon(category.name)} iconSize="2.4rem" />
                <Body2>{item.name}</Body2>
              </Link>
            </S.CategoryItem>
          );
        })}
      </S.SearchCategory>
    );
  });
};

const CATEGORIES_EXAMPLE: SearchCategories[] = [
  {
    name: "clients",
    items: [
      { name: "Houdhaifa Lebbad", link: "/" },
      { name: "Ahmed Nadhir", link: "/" },
      { name: "Aymen Finas", link: "/sd" },
    ],
  },
  {
    name: "voitures",
    items: [
      { name: "Mercedes-Benz CLA 45", link: "/" },
      { name: "Audi A3 ", link: "/" },
      { name: "BMW X5BMW X5 G05", link: "/" },
    ],
  },
  {
    name: "clients",
    items: [
      { name: "Jaylon Curtis", link: "/" },
      { name: "Ryan Vetrovs", link: "/" },
      { name: "Jaylon Curtis", link: "/" },
    ],
  },
];

const SearchBar = () => {
  const [focus, setFocus] = useState(false);
  const searchListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClickOutsiedSearch = (e: MouseEvent) => {
      const { current } = searchListRef;
      /**@ts-ignore */
      if (current && !current.contains(e.target)) setFocus(false);
    };

    document.addEventListener("click", onClickOutsiedSearch);
    return () => document.removeEventListener("click", onClickOutsiedSearch);
  }, []);

  return (
    <S.Header>
      <S.SearchBarContainer ref={searchListRef}>
        <InputStyle.InputContainer>
          <InputStyle.InputWrapper>
            <Icon icon="search" iconSize="1.8rem" />
            <InputStyle.Input
              type="text"
              placeholder="Search"
              onFocus={() => setFocus(true)}
            />
          </InputStyle.InputWrapper>
        </InputStyle.InputContainer>
        {focus && (
          <S.SearchList>{renderSearchedItems(CATEGORIES_EXAMPLE)}</S.SearchList>
        )}
      </S.SearchBarContainer>
      <S.UserOverview>
        <Body1>Saber Zehani</Body1>
        <S.UserPicture>
          <Heading5>S</Heading5>
        </S.UserPicture>
      </S.UserOverview>
    </S.Header>
  );
};

export default SearchBar;

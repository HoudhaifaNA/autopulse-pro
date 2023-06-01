import { useRef } from "react";
import Link from "next/link";

import * as InputStyle from "components/Input/InputContainer.styled";
import * as S from "./Header.styled";
import { Body1, Body2, Heading5 } from "styles/Typography";

import Icon from "components/Icon/Icon";

import useClickOutside from "hooks/useClickOutside";

// !TODO NEED REFACTORE

interface SearchCategories {
  name: "voitures" | "licences" | "clients";
  items: { name: string; link: string }[];
}

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
const categoryToIcon = (category: SearchCategories["name"]) => {
  if (category === "voitures") return "car";
  if (category === "licences") return "document";
  return category;
};

const renderSearchedItems = (categories: SearchCategories[]) => {
  return categories.map((category) => {
    return (
      <S.SearchCategory key={category.name}>
        <span>{category.name}</span>
        {category.items.map((item) => {
          return (
            <S.CategoryItem key={item.name}>
              <Link href={item.link}>
                <Icon icon={categoryToIcon(category.name)} size="2.4rem" />
                <Body2>{item.name}</Body2>
              </Link>
            </S.CategoryItem>
          );
        })}
      </S.SearchCategory>
    );
  });
};

const Header = () => {
  const searchListRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useClickOutside(searchListRef);

  return (
    <S.Header>
      <S.SearchBarContainer ref={searchListRef}>
        <InputStyle.InputContainer>
          <InputStyle.InputWrapper>
            <InputStyle.InputIcon>
              <Icon icon="search" size="1.8rem" />
            </InputStyle.InputIcon>
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
        <Link href="/profile">
          <Body1>Saber Zehani</Body1>
          <S.UserPicture>
            <Heading5>S</Heading5>
          </S.UserPicture>
        </Link>
      </S.UserOverview>
    </S.Header>
  );
};

export default Header;

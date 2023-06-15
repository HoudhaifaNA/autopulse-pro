"use client";
import { useContext, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Link from "next/link";

import * as InputStyle from "components/Input/InputContainer.styled";
import * as S from "./Header.styled";
import { Body1, Body2, Heading5 } from "styles/Typography";

import Icon from "components/Icon/Icon";

import useClickOutside from "hooks/useClickOutside";
import { GlobalContext } from "pages/_app";
import axios from "axios";
import API, { fetcher } from "utils/API";
// import { fetcher } from "utils/API";

// !TODO NEED REFACTORE

interface SearchCategory {
  name: "cars" | "licences" | "clients";
  items: any[];
}

const CATEGORIES_EXAMPLE: SearchCategory[] = [
  {
    name: "clients",
    items: [
      { name: "Houdhaifa Lebbad", link: "/" },
      { name: "Ahmed Nadhir", link: "/" },
      { name: "Aymen Finas", link: "/sd" },
    ],
  },
  {
    name: "cars",
    items: [
      { name: "Mercedes-Benz CLA 45", link: "/" },
      { name: "Audi A3 ", link: "/" },
      { name: "BMW X5BMW X5 G05", link: "/" },
    ],
  },
  {
    name: "licences",
    items: [
      { name: "Jaylon Curtis", link: "/" },
      { name: "Ryan Vetrovs", link: "/" },
      { name: "Jaylon Curtis", link: "/" },
    ],
  },
];
const categoryToIcon = (category: SearchCategory["name"]) => {
  if (category === "cars") return "car";
  if (category === "licences") return "document";
  return category;
};

const renderSearchedItems = (categories: SearchCategory[]) => {
  const { currDocument, setDocument } = useContext(GlobalContext);

  return categories.map((category) => {
    return (
      category.items.length > 0 && (
        <S.SearchCategory key={Math.random() * 10}>
          <span>{category.name}</span>
          {category.items.map((item) => {
            let val;
            if (category.name === "clients") val = item.fullName;
            if (category.name === "cars") val = item.name;
            if (category.name === "licences") val = item.moudjahid;
            return (
              <S.CategoryItem key={val}>
                <div
                  onClick={() =>
                    setDocument({ type: category.name, document: item })
                  }
                >
                  <Icon icon={categoryToIcon(category.name)} size="2.4rem" />
                  <Body2>{val}</Body2>
                </div>
              </S.CategoryItem>
            );
          })}
        </S.SearchCategory>
      )
    );
  });
};

const Header = () => {
  const searchListRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useClickOutside(searchListRef);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  const handleQuerying = async () => {
    const { data } = await API.get(`/search?query=${query}`);

    if (data && query.length >= 2) {
      const categoriesList = Object.entries(data.data).map(
        ([key, value]: any) => {
          let items = value.map((el: any) => {
            return el;
          });
          let categories = {
            name: key,
            items,
          };
          return categories;
        }
      );
      setCategories(categoriesList);
    }
  };

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
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                handleQuerying();
              }}
              onFocus={() => setFocus(true)}
            />
          </InputStyle.InputWrapper>
        </InputStyle.InputContainer>
        {focus && categories.length > 0 && (
          <S.SearchList>
            {renderSearchedItems(categories as SearchCategory[])}
          </S.SearchList>
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

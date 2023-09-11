"use client";
import { useContext, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Link from "next/link";

import * as InputStyle from "components/Input/InputContainer.styled";
import * as S from "./Header.styled";
import { Body1, Body2, Heading5 } from "styles/Typography";

import Icon from "components/Icon/Icon";

import useClickOutside from "hooks/useClickOutside";
// import { GlobalContext } from "pages/_app";
import API, { fetcher } from "utils/API";
import { useRouter } from "next/router";

interface SearchCategory {
  name: "cars" | "licences" | "clients" | "procurations" | "papers";
  items: any[];
}

const categoryToIcon = (category: SearchCategory["name"]) => {
  if (category === "cars") return "car";
  if (category === "licences") return "document";
  if (category === "procurations") return "procuration";
  if (category === "papers") return "folder";
  return category;
};

const renderSearchedItems = (categories: SearchCategory[]) => {
  return categories.map((category) => {
    return (
      category.items.length > 0 && (
        <S.SearchCategory key={Math.random() * 10}>
          <span>{category.name}</span>
          {category.items.map((item) => {
            let val;
            if (category.name === "clients") val = item.full_name;
            if (category.name === "cars") val = `${item.name} (${item.serial_number}) (${item.registration_number})`;
            if (category.name === "licences") val = item.moudjahid;
            // if (category.name === "procurations") val = `${item.moudjahid} ${item.car}`;
            // if (category.name === "papers") val = item.car;
            return (
              <S.CategoryItem key={item.id}>
                <Link href={`/${category.name}/${item.id}`}>
                  <Icon icon={categoryToIcon(category.name)} size="2.4rem" />
                  <Body2>{val}</Body2>
                </Link>
              </S.CategoryItem>
            );
          })}
        </S.SearchCategory>
      )
    );
  });
};

const handleQuerying = async (query: string, table: string) => {
  let items: any[] = [];

  if (query.length >= 2) {
    const { data } = await API.get(`/search/${table}?query=${query}`);

    items = [{ name: table, items: data[table] }];
  }

  return items;
};

const Header = () => {
  // const { setDocument } = useContext(GlobalContext);
  // const { data, isLoading } = useSWR("/users/getMe", fetcher);
  const data = { user: { username: "s" } };
  const isLoading = null;
  const searchListRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useClickOutside(searchListRef);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();

  let username = "";
  if (isLoading) username = "...";
  if (data) username = data.user.username;
  const table = router.asPath.split("/")[1];

  useEffect(() => {
    handleQuerying(query, table).then((categoriesList) => {
      setCategories(categoriesList);
    });
  }, [query, table]);

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
              }}
              onFocus={() => {
                setFocus(true);
                handleQuerying(query, table);
              }}
            />
          </InputStyle.InputWrapper>
        </InputStyle.InputContainer>
        {focus && categories.length >= 0 && (
          <S.SearchList>{renderSearchedItems(categories as SearchCategory[])}</S.SearchList>
        )}
      </S.SearchBarContainer>
      <S.UserOverview>
        <Link href="/profile">
          <Body1>{username}</Body1>
          <S.UserPicture>
            <Heading5>{username.split("")[0]}</Heading5>
          </S.UserPicture>
        </Link>
      </S.UserOverview>
    </S.Header>
  );
};

export default Header;

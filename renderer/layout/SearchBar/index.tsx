import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";

import * as InputStyle from "components/Input/InputContainer.styled";
import * as S from "./styles";
import { Body2 } from "styles/Typography";
import Icon from "components/Icon/Icon";

import { fetcher } from "utils/API";
import { categoryToIcon, formatSearchItemContent } from "./utils";
import { SearchResources, SearchResults } from "types";
import useClickOutside from "hooks/useClickOutside";

interface SearchCategory extends SearchResults {
  name: SearchResources;
}

const SEARCH_RESOURCES: SearchResources[] = ["cars", "clients", "licences", "papers", "procurations"];

const renderSearchedItems = (category: SearchCategory, query: string) => {
  const { name, items } = category;
  return items.map((item) => {
    let content = formatSearchItemContent(item, name);

    const startIndex = content.toLowerCase().indexOf(query.toLowerCase());
    const endIndex = startIndex + query.length;
    const icon = categoryToIcon(name);

    return (
      <S.CategoryItem key={item.id}>
        <Link href={`/${name}/${item.id}`}>
          <Icon icon={icon} size="2.4rem" />
          <Body2>
            {startIndex >= 0 ? (
              <>
                {content.substring(0, startIndex)}
                <strong>{content.substring(startIndex, endIndex)}</strong>
                {content.substring(endIndex)}
              </>
            ) : (
              content
            )}
          </Body2>
        </Link>
      </S.CategoryItem>
    );
  });
};

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOutside, setIsOutside] = useClickOutside("searchList", "searchListToggler");

  const path = router.asPath.split("/")[1];
  let resource: SearchResources | null = null;
  let url: string | null = null;

  if (SEARCH_RESOURCES.includes(path as SearchResources) && query.length >= 2) {
    resource = path as SearchResources;
    url = `/search/${resource}?query=${query}`;
  }

  const { data } = useSWR<SearchResults>(url, fetcher);

  return (
    <S.SearchBarContainer>
      <InputStyle.InputContainer id="searchListToggler" onClick={() => setIsOutside(!isOutside)}>
        <InputStyle.InputWrapper>
          <InputStyle.InputIcon>
            <Icon icon="search" size="1.8rem" />
          </InputStyle.InputIcon>
          <InputStyle.Input type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
        </InputStyle.InputWrapper>
      </InputStyle.InputContainer>
      {!isOutside && resource && data && data.items.length > 0 && (
        <S.SearchList id="searchList">
          <S.SearchCategory key={resource}>
            <span>{resource}</span>
            {renderSearchedItems({ name: resource, items: data.items }, query)}
          </S.SearchCategory>
        </S.SearchList>
      )}
    </S.SearchBarContainer>
  );
};

export default SearchBar;

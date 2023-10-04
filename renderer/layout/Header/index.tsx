import Link from "next/link";

import * as S from "./styles";
import { Body1, Heading5 } from "styles/Typography";

import SearchBar from "layout/SearchBar";
import { useAppSelector } from "store";

const Header = () => {
  const { name } = useAppSelector((state) => state.user.user);
  const firstNameLetter = name ? name.split("")[0] : "";

  return (
    <S.Header>
      <SearchBar />
      <S.UserOverview>
        <Link href="/profile">
          <Body1>{name || "--"}</Body1>
          <S.UserPicture>
            <Heading5>{firstNameLetter}</Heading5>
          </S.UserPicture>
        </Link>
      </S.UserOverview>
    </S.Header>
  );
};

export default Header;

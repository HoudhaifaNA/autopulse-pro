import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { ReactNode, useEffect } from "react";

import * as S from "./styles";
import Navbar from "layout/Navbar";
import Header from "./Header";

import useCurrentUser from "hooks/useCurrentUser";
import useInactiveTimeout from "hooks/useInactiveTimeout";
import { clearSelectedItems } from "store/reducers/selectedItems";
import { setUser } from "store/reducers/user";
import useBlur from "hooks/useBlur";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const username = useCurrentUser();
  // useInactiveTimeout();
  useBlur();

  useEffect(() => {
    dispatch(clearSelectedItems());
  }, [router.asPath]);

  useEffect(() => {
    if (username) dispatch(setUser(username));
  }, [username]);

  return (
    <S.Wrapper>
      <Navbar />
      <S.MainContent>
        <Header />
        <S.CurrentPage>{children}</S.CurrentPage>
      </S.MainContent>
    </S.Wrapper>
  );
};

export default Layout;

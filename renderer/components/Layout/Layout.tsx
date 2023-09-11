import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { ReactNode, useEffect } from "react";

import * as S from "components/Layout/Layout.styled";
import Navbar from "components/Navbar/Navbar";
import Header from "components/Header/Header";
import Meta from "components/Meta/Meta";
import ModalsManager from "components/ModalsManager/ModalsManager";

import { clearSelectedItems } from "store/reducers/selectedItems";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearSelectedItems());
  }, [router.asPath]);

  return (
    <S.Wrapper>
      <Meta />
      <Navbar />
      <S.MainContent>
        <ModalsManager />
        <Header />
        <S.CurrentPage>{children}</S.CurrentPage>
      </S.MainContent>
    </S.Wrapper>
  );
};

export default Layout;

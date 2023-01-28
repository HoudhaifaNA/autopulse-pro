import { ReactNode } from "react";

import * as S from "components/Layout/Layout.styled";
import Navbar from "components/Navbar/Navbar";
import Header from "components/Header/Header";
import Meta from "components/Meta/Meta";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <S.Wrapper>
      <Meta />
      <Navbar />
      <S.MainContent>
        <Header />
        <S.CurrentPage>{children}</S.CurrentPage>
      </S.MainContent>
    </S.Wrapper>
  );
};

export default Layout;

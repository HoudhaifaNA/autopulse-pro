import { ReactNode, useContext } from "react";

import * as S from "components/Layout/Layout.styled";
import Navbar from "components/Navbar/Navbar";
import Header from "components/Header/Header";
import Meta from "components/Meta/Meta";
import Toaster from "components/Toaster/Toaster";
import { GlobalContext } from "pages/_app";

const Layout = ({ children }: { children: ReactNode }) => {
  const { currNotification } = useContext(GlobalContext);
  return (
    <S.Wrapper>
      {currNotification.status && (
        <div
          style={{
            position: "fixed",
            zIndex: "15000",
            right: "2rem",
            top: "2rem",
          }}
        >
          <Toaster type={currNotification.status}>
            {currNotification.message}
          </Toaster>
        </div>
      )}
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

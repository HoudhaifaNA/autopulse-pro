import Image from "next/image";

import * as S from "styles/login/styles";
import { Heading3 } from "styles/Typography";

import LoginForm from "page-components/login/LoginForm";
import Meta from "components/Meta/Meta";

const LoginPage = () => {
  return (
    <>
      <Meta title="Se connecter" />
      <S.Main>
        <S.FormHeading>
          <Image src="/images/logo.png" alt="zauto logo" width={220} height={80} />
          <Heading3>Se connecter</Heading3>
        </S.FormHeading>
        <LoginForm />
      </S.Main>
    </>
  );
};

export default LoginPage;

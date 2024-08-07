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
          <Image src="/images/logo.png" alt="autopulsepro logo" width={0} height={80} style={{ width: "auto" }} />
          <Heading3>Se connecter</Heading3>
        </S.FormHeading>
        <LoginForm />
      </S.Main>
    </>
  );
};

export default LoginPage;

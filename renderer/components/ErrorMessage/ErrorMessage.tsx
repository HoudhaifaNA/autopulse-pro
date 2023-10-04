import Image from "next/image";

import * as S from "components/ErrorMessage/ErrorMessage.styled";
import { Heading4 } from "styles/Typography";

const ErrorMessage = ({ children }: { children: string }) => {
  return (
    <S.ErrorMessageWrapper>
      <Image src="images/error.png" width={320} height={320} alt="error" />
      <Heading4>{children}</Heading4>
    </S.ErrorMessageWrapper>
  );
};

export default ErrorMessage;

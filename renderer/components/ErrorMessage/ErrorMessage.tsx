import * as S from "components/ErrorMessage/ErrorMessage.styled";
import { Heading4 } from "styles/Typography";

import Icon from "components/Icon/Icon";

const ErrorMessage = ({ children }: { children: string }) => {
  return (
    <S.ErrorMessageWrapper>
      <Icon icon="error" size="2.4rem" />
      <Heading4>{children}</Heading4>
    </S.ErrorMessageWrapper>
  );
};

export default ErrorMessage;

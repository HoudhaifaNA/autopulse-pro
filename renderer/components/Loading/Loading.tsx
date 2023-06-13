import * as S from "components/Loading/Loading.styled";
import { Heading5 } from "styles/Typography";

const Loading = () => {
  return (
    <S.LoadingWrapper>
      <S.LoadingSpinner />
      <Heading5>Chargement...</Heading5>
    </S.LoadingWrapper>
  );
};

export default Loading;

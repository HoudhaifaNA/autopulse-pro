import * as S from "./styles";
import { Body2, LabelText } from "styles/Typography";

import useColoredText from "hooks/useColoredText";
import formatFiatValue from "utils/formatFiatValue";

interface FiatItemLineProps {
  label: string;
  currency: "DZD" | "EUR";
  value: number;
}

const FiatItemLine = ({ label, value, currency }: FiatItemLineProps) => {
  const formattedFiatValue = formatFiatValue(value, currency, true, true);

  const [fiatText, colorClassName] = useColoredText(formattedFiatValue);

  return (
    <S.DetailLine $type="spaced">
      <LabelText as="p">{label} : </LabelText>
      <Body2 className={colorClassName}>{fiatText}</Body2>
    </S.DetailLine>
  );
};

export default FiatItemLine;

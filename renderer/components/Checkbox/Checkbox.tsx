import * as S from "components/Checkbox/Checkbox.styled";
import Icon from "components/Icon/Icon";
import { LabelText } from "styles/Typography";

interface CheckboxProps {
  isChecked: boolean;
  check: () => void;
  label?: string;
}

const Checkbox = ({ isChecked, check, label }: CheckboxProps) => {
  return (
    <S.CheckboxWrapper onClick={check}>
      <S.Checkbox $checked={isChecked}>{isChecked && <Icon icon="checkmark" size="1.8rem" />}</S.Checkbox>
      {label && <LabelText>{label}</LabelText>}
    </S.CheckboxWrapper>
  );
};

export default Checkbox;

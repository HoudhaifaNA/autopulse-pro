import * as S from "components/Checkbox/Checkbox.styled";
import Icon from "components/Icon/Icon";

interface CheckboxProps {
  isChecked: boolean;
  check: () => void;
}

const Checkbox = ({ isChecked, check }: CheckboxProps) => {
  return (
    <S.CheckboxWrapper $checked={isChecked} onClick={check}>
      {isChecked && <Icon icon="checkmark" size="1.8rem" />}
    </S.CheckboxWrapper>
  );
};

export default Checkbox;

import * as S from "components/Checkbox/Checkbox.styled";
import Icon from "components/Icon/Icon";
import { useState } from "react";

const Checkbox = () => {
  const [checked, setChecked] = useState(false);

  return (
    <S.CheckboxWrapper $checked={checked} onClick={() => setChecked(!checked)}>
      {checked && <Icon icon="checkmark" size="1.8rem" />}
    </S.CheckboxWrapper>
  );
};

export default Checkbox;

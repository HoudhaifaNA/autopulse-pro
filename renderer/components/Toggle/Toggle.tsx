import { useState } from "react";

import * as S from "components/Toggle/Toggle.styled";
import { Body1 } from "styles/Typography";

interface ToggleProps {
  status?: boolean;
  labelPosition?: "left" | "right";
  disabled?: boolean;
  children?: string;
}

const Toggle = (props: ToggleProps) => {
  const { labelPosition = "right", status = false, disabled, children } = props;
  const [toggle, setToggle] = useState(status);

  const switchToggle = () => !disabled && setToggle(!toggle);

  return (
    <S.ToggleContainer
      $label={labelPosition}
      disabled={disabled}
      onClick={switchToggle}
    >
      {children && <Body1>{children}</Body1>}
      <S.SwitchWrapper $toggle={toggle}>
        <S.SwitchCircle $toggle={toggle} />
      </S.SwitchWrapper>
    </S.ToggleContainer>
  );
};

export default Toggle;

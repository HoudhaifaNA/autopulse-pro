"use client";

import { useState } from "react";
import * as S from "components/Toggle/Toggle.styled";
import { Body1 } from "styles/Typography";

interface ToggleProps {
  disabled?: boolean;
  status?: boolean;
  label?: {
    position: "left" | "right";
    text: string;
  };
}

const Toggle = ({ label, disabled, status = false }: ToggleProps) => {
  const [toggle, setToggle] = useState(status);

  const switchToggle = () => !disabled && setToggle(!toggle);

  return (
    <S.ToggleContainer
      $label={label?.position}
      $disabled={disabled}
      onClick={switchToggle}
    >
      {label && <Body1>{label.text}</Body1>}
      <S.SwitchWrapper $toggle={toggle}>
        <S.SwitchCircle $toggle={toggle} />
      </S.SwitchWrapper>
    </S.ToggleContainer>
  );
};

export default Toggle;

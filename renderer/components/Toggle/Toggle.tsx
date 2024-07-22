import { Dispatch, SetStateAction } from "react";

import * as S from "components/Toggle/Toggle.styled";
import { LabelText } from "styles/Typography";

interface ToggleProps {
  status: boolean;
  labelPosition?: "left" | "right";
  disabled?: boolean;
  label?: string;
  onSwitch: Dispatch<SetStateAction<boolean>>;
}

const Toggle = (props: ToggleProps) => {
  const { labelPosition = "right", status, disabled, label, onSwitch } = props;

  const switchToggle = () => {
    if (!disabled) {
      onSwitch(!status);
    }
  };

  return (
    <S.ToggleContainer $label={labelPosition} disabled={disabled} onClick={switchToggle}>
      {label && <LabelText>{label}</LabelText>}
      <S.SwitchWrapper $toggle={status}>
        <S.SwitchCircle $toggle={status} />
      </S.SwitchWrapper>
    </S.ToggleContainer>
  );
};

export default Toggle;

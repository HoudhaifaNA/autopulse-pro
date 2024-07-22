import { useState } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";
import { LabelText } from "styles/Typography";
import * as InputStyle from "components/Input/InputContainer.styled";
import { FormGroup } from "components/Input/Input.styled";
import Toggle from "components/Toggle/Toggle";
import Button from "components/Button/Button";

import { useAppSelector } from "store";
import { updateSettings } from "store/reducers/user";
import notify from "utils/notify";

const UserSettings = () => {
  const { inactiveTimeThreshold, defaultBlur } = useAppSelector((state) => state.user.user);
  const [inactiveTime, setInactiveTime] = useState(inactiveTimeThreshold);
  const [toggle, switchToggle] = useState(defaultBlur);
  const dispatch = useDispatch();

  const onUpdateSettings = () => {
    dispatch(updateSettings({ inactiveTimeThreshold: inactiveTime, defaultBlur: toggle }));
    notify("success", "Mettre à jour les paramètres avec succès");
  };

  return (
    <S.UserSettingsWrapper>
      <FormGroup>
        <LabelText htmlFor="inactive_time">Temps d'inactivité (minutes)</LabelText>
        <InputStyle.InputContainer>
          <InputStyle.InputWrapper>
            <InputStyle.Input
              id="inactive_time"
              type="number"
              placeholder="10"
              value={inactiveTime}
              onChange={(e) => setInactiveTime(e.target.valueAsNumber)}
            />
          </InputStyle.InputWrapper>
        </InputStyle.InputContainer>
      </FormGroup>
      <FormGroup>
        <LabelText>Flou par défaut</LabelText>
        <Toggle status={toggle} onSwitch={switchToggle} />
      </FormGroup>
      <Button variant="primary" onClick={onUpdateSettings}>
        Mettre à jour les paramètres
      </Button>
    </S.UserSettingsWrapper>
  );
};

export default UserSettings;

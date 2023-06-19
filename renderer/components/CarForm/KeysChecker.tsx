import { useFormikContext } from "formik";
import styled from "styled-components";

import { LabelText } from "styles/Typography";

import Checkbox from "components/Checkbox/Checkbox";

import { Values } from "./types";

const InputWrapper = styled.div`
  width: 100%;
  height: 8.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const KeysList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

const KEYS = [1, 2, 3, 4];

const KeysChecker = () => {
  const { values, setFieldValue } = useFormikContext<Values>();

  return (
    <InputWrapper>
      <LabelText>Clés :</LabelText>
      <KeysList>
        {KEYS.map((key) => {
          return (
            <Checkbox
              check={() => setFieldValue("keys", key)}
              isChecked={values.keys >= key}
              key={key}
            />
          );
        })}
      </KeysList>
    </InputWrapper>
  );
};

export default KeysChecker;

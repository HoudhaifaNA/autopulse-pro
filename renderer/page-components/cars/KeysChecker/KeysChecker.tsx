import { useFormikContext } from "formik";

import * as S from "./styles";
import { LabelText } from "styles/Typography";

import Checkbox from "components/Checkbox/Checkbox";

const KEYS = [1, 2, 3, 4];

const KeysChecker = ({ field }: { field: string }) => {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <S.InputWrapper>
      <LabelText>Clés :</LabelText>
      <S.KeysList>
        {KEYS.map((key) => {
          return <Checkbox key={key} check={() => setFieldValue(field, key)} isChecked={values[field] >= key} />;
        })}
      </S.KeysList>
    </S.InputWrapper>
  );
};

export default KeysChecker;

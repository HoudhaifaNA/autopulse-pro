import { useField } from "formik";

import * as S from "components/CarForm/CarFeatures.styled";
import { FormGroup } from "components/Form/Form.styled";
import { LabelText } from "styles/Typography";

import DateInput from "components/DateInput/DateInput";

const CarFeatures = () => {
  const [props] = useField("features");

  return (
    <S.DescriptionWrapper>
      <FormGroup>
        <DateInput label="Créé à" name="created_at" minDate="2015" />
      </FormGroup>
      <LabelText>Caractéristiques de la voiture : </LabelText>
      <S.DescriptionInput {...props} />
    </S.DescriptionWrapper>
  );
};

export default CarFeatures;

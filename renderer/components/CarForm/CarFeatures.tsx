import { useField } from "formik";
import styled from "styled-components";

import { FormGroup } from "components/Form/Form.styled";
import { LabelText } from "styles/Typography";

import DateInput from "components/DateInput/DateInput";

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-width: 100%;
`;

const DescriptionInput = styled.textarea`
  font-family: "Inter", sans-serif;
  width: 100%;
  height: 20rem;
  max-width: 100%;
  max-height: 40rem;
  min-width: 100%;
  min-height: 10rem;
  padding: 1rem;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.4rem;
  outline: none;
`;

const CarFeatures = () => {
  const [props] = useField("features");

  return (
    <DescriptionWrapper>
      <FormGroup>
        <DateInput label="Créé à" name="created_at" minDate="2015" />
      </FormGroup>
      <LabelText>Caractéristiques de la voiture : </LabelText>
      <DescriptionInput {...props} />
    </DescriptionWrapper>
  );
};

export default CarFeatures;

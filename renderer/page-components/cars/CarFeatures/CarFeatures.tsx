import { useField } from "formik";

import * as S from "./styles";
import { LabelText } from "styles/Typography";

interface CarFeaturesProps {
  name: string;
  label: string;
}

const CarFeatures = ({ name, label }: CarFeaturesProps) => {
  const [props] = useField(name);

  return (
    <S.DescriptionWrapper>
      <LabelText>{label}</LabelText>
      <S.DescriptionInput {...props} />
    </S.DescriptionWrapper>
  );
};

export default CarFeatures;

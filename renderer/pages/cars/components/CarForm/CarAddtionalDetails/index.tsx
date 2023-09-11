import DateInput from "components/DateInput/DateInput";
import CarFeatures from "pages/cars/components/CarFeatures";
import { FormGroup } from "components/Form/Form.styled";
import CheckboxInput from "components/CheckboxInput";

const PROCURATION_OPTIONS = [
  { label: "Non", value: 0 },
  { label: "Oui", value: 1 },
];
const GRAY_CARD_OPTIONS = [
  { label: "Non", value: 0 },
  { label: "Oui", value: 1 },
];
const PAPERS_OPTIONS = [
  { label: "Dossier", value: "Dossier" },
  { label: "Double dossier", value: "Double Dossier" },
];

const CarAddtionalDetails = () => {
  return (
    <>
      <FormGroup>
        <DateInput label="Date d'achat" name="purchased_at" />
        <FormGroup>
          <CheckboxInput label="Procuration" name="has_procuration" options={PROCURATION_OPTIONS} />
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <FormGroup>
          <CheckboxInput label="Cart grise" name="has_gray_card" options={GRAY_CARD_OPTIONS} />
          <CheckboxInput label="Type de dossier" name="papers_type" options={PAPERS_OPTIONS} />
        </FormGroup>
      </FormGroup>
      <CarFeatures name="features" label="Caractéristiques de la voiture" />
    </>
  );
};

export default CarAddtionalDetails;

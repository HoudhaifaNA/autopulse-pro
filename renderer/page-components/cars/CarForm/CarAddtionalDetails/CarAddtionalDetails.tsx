import DateInput from "components/DateInput/DateInput";
import { FormGroup } from "components/Form/Form.styled";
import CheckboxInput from "components/CheckboxInput";
import TextArea from "components/TextArea";
import { useFormikContext } from "formik";
import { CarInitialValues } from "../types";
import { useEffect } from "react";

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
  const { setFieldValue, values } = useFormikContext<CarInitialValues>();
  const { has_gray_card } = values;
  const papers_type = values.papers_type as ("Dossier" | "Double Dossier")[] | null;
  useEffect(() => {
    if (papers_type?.includes("Dossier")) {
      setFieldValue("has_gray_card", 0);
    }
  }, [papers_type]);

  useEffect(() => {
    if (has_gray_card && papers_type?.includes("Dossier")) {
      const updatedPapersType = !papers_type.includes("Double Dossier") ? null : ["Double Dossier"];
      setFieldValue("papers_type", updatedPapersType);
    }
  }, [has_gray_card]);

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
          <CheckboxInput label="Type de dossier" isMultiple name="papers_type" options={PAPERS_OPTIONS} />
        </FormGroup>
      </FormGroup>
      <TextArea name="features" label="Caractéristiques de la voiture" />
    </>
  );
};

export default CarAddtionalDetails;

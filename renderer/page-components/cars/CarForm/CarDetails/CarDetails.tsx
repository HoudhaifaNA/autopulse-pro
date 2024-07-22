import { useEffect, useRef, useState } from "react";
import { useFormikContext } from "formik";

import { FormGroup } from "components/Form/Form.styled";
import { TypedInput, SelectInput } from "components/Input/Input";

import { useAppSelector } from "store";
import useCarsList from "hooks/useCarsList";
import { COLORS_LIST, CAR_BRANDS_LIST, CAR_MODELS } from "../constants";
import { SelectOption } from "components/Input/types";
import { CarInitialValues } from "../types";
import KeysChecker from "../../KeysChecker/KeysChecker";

const nextYear = new Date().getFullYear() + 1;

const CarDetails = () => {
  const { values, setFieldValue } = useFormikContext<CarInitialValues>();
  const [isListExtended, extendList] = useState(false);
  const [brandsList, setBrandsList] = useState<SelectOption[]>([]);
  const [modelsList, setModelsList] = useState<SelectOption[]>([]);
  const carFilterParams = useAppSelector((state) => state.resourceUrls.cars.params);

  const { brand } = values;
  const brandRef = useRef(brand);
  const [ownedBrands, ownedModels] = useCarsList(brand);

  const currentBrands = isListExtended ? CAR_BRANDS_LIST : ownedBrands;
  const ALL_MODELS = CAR_MODELS[brand.toLowerCase()] || [];
  const currentModels = isListExtended ? ALL_MODELS : ownedModels;

  useEffect(() => {
    setBrandsList(currentBrands);
  }, [isListExtended, JSON.stringify(ownedBrands)]);

  useEffect(() => {
    setModelsList(currentModels);
  }, [isListExtended, brand, JSON.stringify(ownedModels)]);

  useEffect(() => {
    if (carFilterParams.brand && values.brand === "") setFieldValue("brand", carFilterParams.brand);
    if (carFilterParams.model && values.model === "") setFieldValue("model", carFilterParams.model);
  }, [brandRef.current]);

  useEffect(() => {
    if (brand !== brandRef.current) setFieldValue("model", "");
    brandRef.current = brand;
  }, [brand]);

  useEffect(() => {
    const handleExtendShortcut = (e: KeyboardEvent) => {
      if (e.shiftKey) extendList((prev) => !prev);
    };
    window.addEventListener("keydown", handleExtendShortcut);

    return () => window.removeEventListener("keydown", handleExtendShortcut);
  }, []);

  return (
    <>
      <FormGroup>
        <SelectInput label="Marque" name="brand" placeholder="Mercedes-Benz" items={brandsList} iconSize="l" />
        <FormGroup>
          <SelectInput label="Modèle" name="model" placeholder="CLA" items={modelsList} />
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <TypedInput label="Numéro de châssis" name="serial_number" type="text" placeholder="W1KZF8GB8NB093XXX" />
        <FormGroup>
          <TypedInput label="Matricule" name="registration_number" type="text" placeholder="WG69-NXF" />
          <TypedInput
            label="Deuxième Matricule"
            name="second_registration_number"
            type="text"
            placeholder="DZ-NXF-DZ"
          />
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <FormGroup>
          <FormGroup>
            <KeysChecker field="keys" />
          </FormGroup>
          <TypedInput name="mileage" type="number" label="Kilométrage" />
        </FormGroup>
        <FormGroup>
          <SelectInput label="Couleur" name="color" placeholder="Noir" items={COLORS_LIST} />
          <TypedInput name="production_year" type="text" label="Année" placeholder={`${nextYear}`} />
        </FormGroup>
      </FormGroup>
    </>
  );
};

export default CarDetails;

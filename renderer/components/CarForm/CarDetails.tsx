import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";

import { FormGroup } from "components/Form/Form.styled";

import { TypedInput, SelectInput } from "components/Input/Input";
import KeysChecker from "components/CarForm/KeysChecker";

import {
  COLORS_LIST,
  CAR_BRANDS_LIST,
  CAR_MODELS,
} from "components/CarForm/constants";

import { Values } from "components/CarForm/types";

const CarDetails = () => {
  const { values, setFieldValue } = useFormikContext<Values>();
  const { brand } = values;
  const brandRef = useRef<string>(brand);
  const modelsList = CAR_MODELS[brand] ?? [];

  useEffect(() => {
    if (brand !== brandRef.current) setFieldValue("model", "");
    brandRef.current = brand;
  }, [brand]);

  return (
    <>
      <FormGroup>
        <SelectInput
          label="Marque :"
          name="brand"
          placeholder="Mercedes-Benz"
          autoFocus
          items={CAR_BRANDS_LIST}
          iconSize="l"
        />
        <FormGroup>
          <SelectInput
            label="Modèle :"
            name="model"
            placeholder="CLA"
            items={modelsList}
          />
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <TypedInput
          label="Numéro de châssis :"
          name="serialNumber"
          type="text"
          placeholder="W1KZF8GB8NB093XXX"
        />
        <TypedInput
          label="Matricule :"
          name="registrationNumber"
          type="text"
          placeholder="WG69 NXF"
        />
      </FormGroup>
      <FormGroup>
        <FormGroup>
          <FormGroup>
            <KeysChecker />
          </FormGroup>
          <TypedInput name="mileage" type="number" label="Kilométrage :" />
        </FormGroup>
        <FormGroup>
          <SelectInput
            label="Couleur :"
            name="color"
            placeholder="Noir"
            items={COLORS_LIST}
          />

          <TypedInput
            name="year"
            type="text"
            label="Année:"
            placeholder={`${new Date().getFullYear()}`}
          />
        </FormGroup>
      </FormGroup>
    </>
  );
};

export default CarDetails;

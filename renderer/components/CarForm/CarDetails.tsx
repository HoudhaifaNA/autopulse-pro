import { useEffect } from "react";
import { useFormikContext } from "formik";

import { FormGroup } from "components/Form/Form.styled";

import { TypedInput, SelectInput } from "components/Input/Input";

import {
  COLORS_LIST,
  CAR_BRANDS_LIST,
  CAR_SERIES,
} from "components/CarForm/constants";

import { Values } from "components/CarForm/types";

const CarDetails = () => {
  const { values, setFieldValue } = useFormikContext<Values>();
  const { brand } = values;
  const seriesList = CAR_SERIES[brand] ?? [];

  useEffect(() => {
    setFieldValue("serie", "");
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
            label="Série :"
            name="serie"
            placeholder="CLA"
            items={seriesList}
          />
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <TypedInput
          label="Modèle :"
          name="model"
          type="text"
          placeholder="AMG 250"
        />
        <TypedInput
          label="Numéro de châssis :"
          name="serialNumber"
          type="text"
          placeholder="W1KZF8GB8NB093XXX"
        />
      </FormGroup>
      <FormGroup>
        <TypedInput
          label="Matricule :"
          name="registrationNumber"
          type="text"
          placeholder="WG69 NXF"
        />
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

import { useEffect, useRef, useState } from "react";
import { useFormikContext } from "formik";
import useSWR from "swr";

import { FormGroup } from "components/Form/Form.styled";

import { TypedInput, SelectInput } from "components/Input/Input";
import KeysChecker from "components/CarForm/KeysChecker";

import {
  COLORS_LIST,
  CAR_BRANDS_LIST,
  CAR_MODELS,
} from "components/CarForm/constants";

import { Values } from "components/CarForm/types";
import { SelectOption } from "components/Input/types";
import { fetcher } from "utils/API";
import slugify from "utils/slugify";

const getBrandsList = (mounted: boolean) => {
  const url = mounted ? `/cars/brands` : null;
  const { data } = useSWR(url, fetcher);

  let brandsList = [];

  if (data) {
    brandsList = data.brands.map((br: any) => {
      return {
        mainText: br.brand,
        icon: slugify(br.brand),
      };
    });
  }

  return brandsList;
};
const getModelsList = (brand: string) => {
  const url = brand ? `/cars/models?brand=${brand}` : null;
  const { data } = useSWR(url, fetcher);

  let modelsList = [];

  if (data) {
    modelsList = data.models.map((mdl: any) => {
      const { model } = mdl;
      return {
        mainText: model,
      };
    });
  }

  return modelsList;
};

const currentYear = new Date().getFullYear();

const CarDetails = () => {
  const { values, setFieldValue } = useFormikContext<Values>();
  const [brandsList, setBrandsList] = useState<SelectOption[]>([]);
  const [modelsList, setModelsList] = useState<SelectOption[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isListExtended, extendList] = useState(false);

  const { brand } = values;
  const brandRef = useRef(brand);

  const ownedBrands = getBrandsList(mounted);
  const ownedModels = getModelsList(brand);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setBrandsList(ownedBrands);
  }, [mounted]);

  useEffect(() => {
    const currentBrands = isListExtended ? CAR_BRANDS_LIST : ownedBrands;
    setBrandsList(currentBrands);
  }, [isListExtended, brand]);

  useEffect(() => {
    const ALL_MODELS = CAR_MODELS[brand.toLowerCase()] ?? [];
    const currentModels = isListExtended ? ALL_MODELS : ownedModels;
    setModelsList(currentModels);
  }, [isListExtended, JSON.stringify(ownedModels)]);

  useEffect(() => {
    const handleExtendShortcut = (e: KeyboardEvent) => {
      if (e.shiftKey) {
        extendList((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleExtendShortcut);
    return () => window.removeEventListener("keydown", handleExtendShortcut);
  }, []);

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
          items={brandsList}
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
        <FormGroup>
          <TypedInput
            label="Matricule :"
            name="registrationNumber"
            type="text"
            placeholder="WG69-NXF"
          />
          <TypedInput
            label="Deuxième Matricule :"
            name="secondRegistrationNumber"
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
            placeholder={`${currentYear}`}
          />
        </FormGroup>
      </FormGroup>
    </>
  );
};

export default CarDetails;

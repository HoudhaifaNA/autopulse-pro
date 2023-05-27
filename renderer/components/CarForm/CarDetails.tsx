import { FormGroup } from "components/Form/Form.styled";

import { TypedInput, SelectInput } from "components/Input/Input";
import { COLORS_LIST } from "./constants";

const CarDetails = () => {
  return (
    <>
      <FormGroup>
        <SelectInput
          label="Marque :"
          name="brand"
          placeholder="Mercedes-Benz"
          autoFocus
          items={[
            { mainText: "Mercedes-Benz" },
            { mainText: "BMW" },
            { mainText: "Skoda" },
          ]}
        />
        <FormGroup>
          <SelectInput
            label="Série :"
            name="serie"
            placeholder="CLA"
            items={[
              { mainText: "C" },
              { mainText: "CLA" },
              { mainText: "GLK" },
            ]}
          />

          <TypedInput
            label="Modèle :"
            name="model"
            type="text"
            placeholder="250"
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
    </>
  );
};

export default CarDetails;

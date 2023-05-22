import { FormContent, FormGroup } from "components/ui/Form.styled";

import { TypedInput, SelectInput } from "components/Input/Input";

const CarDetails = () => {
  return (
    <FormContent>
      <FormGroup>
        <SelectInput
          label="Marque:"
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
            label="Série:"
            name="serie"
            placeholder="CLA"
            items={[
              { mainText: "C" },
              { mainText: "CLA" },
              { mainText: "GLK" },
            ]}
          />

          <TypedInput
            name="model"
            type="text"
            label="Modèle:"
            placeholder="250"
          />
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <TypedInput
          name="serialNumber"
          type="text"
          label="Numéro de châssis:"
          placeholder="W1KZF8GB8NB093XXX"
        />

        <TypedInput
          name="registrationNumber"
          type="text"
          label="Matricule:"
          placeholder="WG69 NXF"
        />
      </FormGroup>
      <FormGroup>
        <TypedInput
          name="color"
          type="text"
          label="Couleur:"
          placeholder="Noir"
        />

        <TypedInput name="year" type="text" label="Année:" placeholder="2022" />
      </FormGroup>
    </FormContent>
  );
};

export default CarDetails;

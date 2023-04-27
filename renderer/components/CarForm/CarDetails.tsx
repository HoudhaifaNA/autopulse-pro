import { FormContent, FormGroup } from "components/ui/Form.styled";
import { DropdownInput, TypedInput } from "components/Input/Input";
import Dropdown from "components/Dropdown/Dropdown";

const CarDetails = () => {
  return (
    <FormContent>
      <FormGroup>
        <DropdownInput>
          <TypedInput
            name="brand"
            type="text"
            label="Marque:"
            placeholder="Mercedes-Benz"
            iconRight="expand"
          />
          {/* <Dropdown
            $width="100%"
            $top="6.2rem"
            items={[
              { mainText: "Mercedes-Benz" },
              { mainText: "BMW" },
              { mainText: "Skoda" },
            ]}
            onItemClick={() => 1}
          /> */}
        </DropdownInput>
        <FormGroup>
          <TypedInput
            name="serie"
            type="text"
            label="Série:"
            placeholder="CLA"
            iconRight="expand"
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

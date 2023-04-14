import styled from "styled-components";

import { TypedInput } from "components/Input/Input";
import Dropdown from "components/Dropdown/Dropdown";

const CarDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const FormGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 3rem;
  width: 100%;
`;

const CarDetailsForm = () => {
  return (
    <CarDetailsWrapper>
      <FormGroup>
        <FormGroup>
          <TypedInput
            name="brand"
            type="text"
            label="Marque:"
            placeholder="Mercedes-Benz"
            iconRight="expand"
          />
          {/* <div
            style={{
              position: "absolute",
              top: "6.2rem",
              width: "100%",
              zIndex: "5000",
            }}
          >
            <Dropdown
              items={[
                { mainText: "Mercedes-Benz" },
                { mainText: "BMW" },
                { mainText: "Skoda" },
              ]}
              onItemClick={() => 1}
            />
          </div> */}
        </FormGroup>
        <FormGroup>
          <div style={{ position: "relative" }}>
            <TypedInput
              name="serie"
              type="text"
              label="Série:"
              placeholder="CLA"
              iconRight="expand"
            />
          </div>
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
          label="Coleur:"
          placeholder="Noir"
        />

        <TypedInput name="year" type="text" label="Année:" placeholder="2022" />
      </FormGroup>
    </CarDetailsWrapper>
  );
};

export default CarDetailsForm;

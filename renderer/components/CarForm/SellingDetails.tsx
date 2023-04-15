import styled from "styled-components";

import { TypedInput } from "components/Input/Input";
import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Buttons/Button";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";
import { DropdownInputWrapper } from "components/Input/Input.styled";
import { Values } from "./types";

const SellingDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const FormGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 3rem;
  width: 100%;
`;

const SellingDetails = ({ carType }: Pick<Values, "carType">) => {
  return (
    <SellingDetailsWrapper>
      <FormGroup>
        <DropdownInputWrapper>
          <TypedInput
            name="seller"
            type="text"
            label="Vendeur:"
            placeholder="Nom du vendeur"
            iconRight="expand"
          />

          {/* <Dropdown
            items={[
              { mainText: "Lakhder Belaid" },
              { mainText: "Steve Powers" },
              { mainText: "Christina Allen" },
              { mainText: "Nannie Nichols" },
            ]}
            onItemClick={() => 1}
          >
            <ButtonItem>
              <Button variant="ghost" icon="add">
                Créer une nouvelle vendeur
              </Button>
            </ButtonItem>
          </Dropdown> */}
        </DropdownInputWrapper>
        <DropdownInputWrapper>
          <TypedInput
            name="lisence"
            type="text"
            label="Licence:"
            placeholder="Nom du moujahid"
            iconRight="expand"
          />
          {/* <Dropdown
            items={[
              { mainText: "Kenneth Edwards" },
              { mainText: "Gene Colon" },
              { mainText: "Helen Burns" },
              { mainText: "Maude Lopez" },
            ]}
            onItemClick={() => 1}
          >
            <ButtonItem>
              <Button variant="ghost" icon="add">
                Créer une nouvelle licence
              </Button>
            </ButtonItem>
          </Dropdown> */}
        </DropdownInputWrapper>
      </FormGroup>
      <FormGroup>
        {carType === "importé" ? (
          <>
            <TypedInput
              name="boughtPrice"
              type="number"
              label="Prix ​​d'achat:"
              addOn="€"
            />

            <TypedInput
              name="euroPrice"
              type="text"
              label="Prix ​​de 100€:"
              addOn="DZD"
            />
          </>
        ) : (
          <>
            <TypedInput
              name="boughtPrice"
              type="text"
              label="Prix ​​d'achat:"
              addOn="DZD"
            />
          </>
        )}
      </FormGroup>
    </SellingDetailsWrapper>
  );
};

export default SellingDetails;

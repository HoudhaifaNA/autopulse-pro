import { FormContent, FormGroup } from "components/ui/Form.styled";
import { TypedInput } from "components/Input/Input";
import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Buttons/Button";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";
import { DropdownInput } from "components/Input/Input";
import { Values } from "components/CarForm/types";

const SellingDetails = ({ carType }: Pick<Values, "carType">) => {
  return (
    <FormContent>
      <FormGroup>
        <DropdownInput>
          <TypedInput
            name="seller"
            type="text"
            label="Vendeur:"
            placeholder="Nom du vendeur"
            iconRight="expand"
          />
          {/* <Dropdown
            $width="100%"
            $top="6.2rem"
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
        </DropdownInput>
        <DropdownInput>
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
        </DropdownInput>
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
    </FormContent>
  );
};

export default SellingDetails;

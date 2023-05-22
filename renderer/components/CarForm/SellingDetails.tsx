import { FormContent, FormGroup } from "components/ui/Form.styled";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";

import { TypedInput, SelectInput } from "components/Input/Input";
import Button from "components/Button/Button";

import { Values } from "components/CarForm/types";

type SellingDatailsProps = Pick<Values, "carType">;

const SellingDetails = ({ carType }: SellingDatailsProps) => {
  return (
    <FormContent>
      <FormGroup>
        <SelectInput
          label="Vendeur:"
          name="seller"
          placeholder="Nom du vendeur"
          autoFocus
          items={[]}
          buttons={
            <ButtonItem>
              <Button variant="ghost" icon="add">
                Créer un nouveau client
              </Button>
            </ButtonItem>
          }
        />
        <SelectInput
          name="licence.name"
          label="Licence:"
          placeholder="Nom du moujahid"
          items={[]}
          buttons={
            <ButtonItem>
              <Button variant="ghost" icon="add">
                Créer une nouvelle licence
              </Button>
            </ButtonItem>
          }
        />
      </FormGroup>
      <FormGroup>
        {carType === "importé" ? (
          <>
            <TypedInput
              name="euroCost"
              type="number"
              label="Prix ​​d'achat:"
              addOn="€"
            />

            <TypedInput
              name="euroPrice"
              type="number"
              label="Prix ​​de 100€:"
              addOn="DZD"
            />
          </>
        ) : (
          <>
            <TypedInput
              name="purchasingPrice"
              type="number"
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

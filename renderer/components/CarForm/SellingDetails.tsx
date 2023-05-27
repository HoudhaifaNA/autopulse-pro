import { useFormikContext } from "formik";

import { FormGroup } from "components/Form/Form.styled";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";

import { TypedInput, SelectInput } from "components/Input/Input";
import Button from "components/Button/Button";

import { Values } from "components/CarForm/types";

const SellingDetails = () => {
  const { values } = useFormikContext<Values>();
  const { carType } = values;

  return (
    <>
      <FormGroup>
        <SelectInput
          label="Vendeur :"
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
          label="Licence :"
          name="licence.name"
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
              label="Prix ​​d'achat :"
              name="euroCost"
              type="number"
              addOn="€"
            />

            <TypedInput
              label="Prix ​​de €100 :"
              name="euroPrice"
              type="number"
              addOn="DZD"
            />
          </>
        ) : (
          <>
            <TypedInput
              label="Prix ​​d'achat :"
              name="purchasingPrice"
              type="number"
              addOn="DZD"
            />
          </>
        )}
      </FormGroup>
    </>
  );
};

export default SellingDetails;

import { useContext } from "react";
import { useFormikContext } from "formik";
import useSWR from "swr";

import { FormGroup } from "components/Form/Form.styled";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";

import { TypedInput, SelectInput } from "components/Input/Input";
import Button from "components/Button/Button";

import { GlobalContext } from "pages/_app";
import { Values } from "components/CarForm/types";
import { fetcher } from "utils/API";

const getItems = () => {
  const licencesRes = useSWR("/licences", fetcher, { refreshInterval: 3 });
  const clientsRes = useSWR("/clients", fetcher, { refreshInterval: 3 });
  let licencesItems = [];
  let clientsItems = [];

  if (clientsRes.data) {
    clientsItems = clientsRes.data.clients.map(({ id, fullName }: any) => {
      return { mainText: fullName, relatedValues: [id] };
    });
  }

  if (licencesRes.data) {
    licencesItems = licencesRes.data.licences
      .filter(({ isValid }: any) => isValid === "true")
      .map(({ id, price, moudjahid, serialNumber }: any) => {
        return {
          mainText: moudjahid,
          secondText: serialNumber,
          relatedValues: [id, price],
        };
      });
  }

  return [clientsItems, licencesItems] as const;
};

const SellingDetails = () => {
  const { values } = useFormikContext<Values>();
  const { setAddUpModal } = useContext(GlobalContext);
  const { carType } = values;
  const [clientsItems, licencesItems] = getItems();

  return (
    <>
      <FormGroup>
        <SelectInput
          label="Vendeur :"
          name="seller.name"
          relatedFields={["seller.id"]}
          placeholder="Nom du vendeur"
          autoFocus
          items={clientsItems}
          buttons={
            <ButtonItem>
              <Button
                type="button"
                variant="ghost"
                icon="add"
                onClick={() => setAddUpModal("clients")}
              >
                Ajouter un client
              </Button>
            </ButtonItem>
          }
        />
        <SelectInput
          label="Propriétaire :"
          name="owner.name"
          relatedFields={["owner.id", "owner.price"]}
          placeholder="Nom du propriétaire"
          items={licencesItems}
          buttons={
            <ButtonItem>
              <Button
                type="button"
                variant="ghost"
                icon="add"
                onClick={() => setAddUpModal("licences")}
              >
                Ajouter une licence
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
              placeholder="45000"
            />

            <TypedInput
              label="Prix ​​de 100 € :"
              name="euroPrice"
              type="number"
              addOn="DA"
              placeholder="230"
            />
          </>
        ) : (
          <>
            <TypedInput
              label="Prix ​​d'achat :"
              name="purchasingPrice"
              type="number"
              addOn="DA"
              placeholder="250000000"
            />
          </>
        )}
      </FormGroup>
    </>
  );
};

export default SellingDetails;

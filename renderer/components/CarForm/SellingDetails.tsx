import { useContext } from "react";
import { useFormikContext } from "formik";
import useSWR from "swr";

import { FormGroup } from "components/Form/Form.styled";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";

import { TypedInput, SelectInput } from "components/Input/Input";
import Button from "components/Button/Button";

import { Values } from "components/CarForm/types";

import { fetcher } from "utils/API";
import { GlobalContext } from "pages/_app";

const getClients = (carType: string) => {
  let clientsItems = [];
  const type = carType === "locale" ? "DA" : "euro";

  const clientsRes = useSWR("/clients", fetcher, { refreshInterval: 1000 });

  if (clientsRes.data) {
    clientsItems = clientsRes.data.clients
      .filter((cl: any) => cl.clientType === type)
      .map((cl: any) => {
        return { mainText: cl.fullName, relatedValues: [cl.id] };
      });
  }
  return clientsItems;
};

const getLicences = (edit?: boolean) => {
  let licencesItems = [];

  const licencesRes = useSWR("/licences", fetcher, { refreshInterval: 1000 });

  if (licencesRes.data) {
    licencesItems = licencesRes.data.licences;

    if (!edit) {
      licencesItems = licencesItems.filter((lc: any) => lc.isValid === "true");
    }

    licencesItems = licencesItems.map((lic: any) => {
      const { id, moudjahid, serialNumber, price } = lic;

      return {
        mainText: moudjahid,
        secondText: serialNumber,
        relatedValues: [id, price],
      };
    });
  }

  return licencesItems;
};

const renderAddUpModalBtn = (text: string, modal: string) => {
  const { setAddUpModal } = useContext(GlobalContext);

  return (
    <ButtonItem>
      <Button
        type="button"
        variant="ghost"
        icon="add"
        onClick={() => setAddUpModal(modal)}
      >
        {text}
      </Button>
    </ButtonItem>
  );
};

const SellingDetails = () => {
  const { values } = useFormikContext<Values>();

  const { type, edit } = values;
  const clientsList = getClients(type);
  const licencesList = getLicences(edit);

  return (
    <>
      <FormGroup>
        <SelectInput
          label="Vendeur :"
          name="seller.name"
          relatedFields={["seller.id"]}
          placeholder="Nom du vendeur"
          autoFocus
          items={clientsList}
          buttons={renderAddUpModalBtn("Ajouter un client", "clients")}
        />
        <SelectInput
          label="Propriétaire :"
          name="owner.name"
          relatedFields={["owner.id", "owner.price"]}
          placeholder="Nom du propriétaire"
          items={licencesList}
          disabled={edit}
          buttons={renderAddUpModalBtn("Ajouter une licence", "licences")}
        />
      </FormGroup>
      <FormGroup>
        {type === "importé" ? (
          <>
            <TypedInput
              label="Prix ​​d'achat :"
              name="costInEuros"
              type="number"
              addOn="€"
              placeholder="45000"
            />

            <TypedInput
              label="Prix ​​de 100 € :"
              name="euroPrice"
              type="number"
              addOn="DA"
              placeholder="23000"
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

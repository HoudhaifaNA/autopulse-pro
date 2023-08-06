import { useContext } from "react";
import { useFormikContext } from "formik";

import { FormGroup } from "components/Form/Form.styled";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";

import { TypedInput, SelectInput } from "components/Input/Input";
import Button from "components/Button/Button";

import { Values } from "components/CarForm/types";

import useClients from "hooks/useClients";
import useLicences from "hooks/useLicences";
import { GlobalContext } from "pages/_app";
import useSWR from "swr";
import { fetcher } from "utils/API";

const renderAddUpModalBtn = (
  text: string,
  modal: string,
  setAddUpModal: any
) => {
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
  const { setAddUpModal } = useContext(GlobalContext);

  const { type, edit } = values;
  const clientsType = type === "locale" ? "DA" : "euro";
  const { clientsItems, isLoading: isClientsLoading } = useClients(clientsType);
  const { licencesItems, isLoading: isLicencesLoading } = useLicences();
  const { data, isLoading } = useSWR(`/licences/${values.owner.id}`, fetcher);
  let LICENCES_LIST = licencesItems;

  if (!isLoading && data && edit && !values.repurchase) {
    // const licence  = data?.licence ;
    if (data.licence) {
      const { licence } = data;
      LICENCES_LIST = [
        {
          mainText: licence.moudjahid,
          secondText: licence.serialNumber,
          relatedValues: [Number(licence.id), licence.price],
        },
      ];
    }
  }

  return (
    <>
      <FormGroup>
        {!isClientsLoading && (
          <SelectInput
            label="Vendeur :"
            name="seller.name"
            relatedFields={["seller.id"]}
            placeholder="Nom du vendeur"
            autoFocus
            items={clientsItems}
            buttons={renderAddUpModalBtn(
              "Ajouter un client",
              "clients",
              setAddUpModal
            )}
          />
        )}
        {!isLoading && (
          <SelectInput
            label="Propriétaire :"
            name="owner.name"
            relatedFields={["owner.id", "owner.price"]}
            placeholder="Nom du propriétaire"
            items={LICENCES_LIST}
            disabled={edit && !values.repurchase}
            buttons={renderAddUpModalBtn(
              "Ajouter une licence",
              "licences",
              setAddUpModal
            )}
          />
        )}
      </FormGroup>
      <FormGroup>
        {type !== "locale" ? (
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

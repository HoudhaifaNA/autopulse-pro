import { useContext, useEffect } from "react";
import { useFormikContext } from "formik";

import { FormGroup } from "components/Form/Form.styled";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";

import { TypedInput, SelectInput, ClickInput } from "components/Input/Input";
import Button from "components/Button/Button";

import { ExchangeTypes, Values } from "components/CarForm/types";

import useClients from "hooks/useClients";
import useLicences from "hooks/useLicences";
import { GlobalContext } from "pages/_app";
import useSWR from "swr";
import { fetcher } from "utils/API";
import Toggle from "components/Toggle/Toggle";
import Checkbox from "components/Checkbox/Checkbox";
import { Body2 } from "styles/Typography";

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

const EXCHANGE_TYPES = [{ mainText: "locale" }, { mainText: "importé" }];

const SellingDetails = () => {
  const { values, setFieldValue } = useFormikContext<Values>();
  const { setAddUpModal } = useContext(GlobalContext);

  const { type, edit, exchangeTypes } = values;
  const clientsType = type === "locale" ? "DA" : "euro";
  const { clientsItems, isLoading: isClientsLoading } = useClients(clientsType);
  const { licencesItems, isLoading: isLicencesLoading } = useLicences();
  let LICENCE_URL =
    edit && values.owner.id > 0 ? `licences/${values.owner.id}` : null;
  const { data, isLoading } = useSWR(LICENCE_URL, fetcher);
  let LICENCES_LIST = licencesItems;

  if (!isLoading && data && edit && !values.repurchase) {
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

  const toggleType = (type: ExchangeTypes) => {
    if (exchangeTypes.indexOf(type) === -1) {
      setFieldValue("exchangeTypes", [...exchangeTypes, type]);
    } else if (exchangeTypes.indexOf(type) >= 0) {
      setFieldValue(
        "exchangeTypes",
        exchangeTypes.filter((t) => t !== type)
      );
    }
  };

  useEffect(() => {
    if (!values.isExchange) setFieldValue("exchangeTypes", []);
  }, [values.isExchange]);

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
      {values.type === "locale" && (
        <FormGroup>
          <FormGroup>
            <ClickInput
              style={{ height: "100%" }}
              type="checkbox"
              name="isExchange"
              label="Échange"
            />
          </FormGroup>
          <FormGroup
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {values.isExchange && (
              <>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <Checkbox
                    isChecked={exchangeTypes.indexOf("importé") !== -1}
                    check={() => toggleType("importé")}
                  />
                  <Body2>Importé</Body2>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <Checkbox
                    isChecked={exchangeTypes.indexOf("UAE") !== -1}
                    check={() => toggleType("UAE")}
                  />
                  <Body2>UAE</Body2>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <Checkbox
                    isChecked={exchangeTypes.indexOf("locale") !== -1}
                    check={() => toggleType("locale")}
                  />
                  <Body2>Locale</Body2>
                </div>
              </>
            )}
          </FormGroup>
        </FormGroup>
      )}
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

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormikContext } from "formik";

import { FormGroup } from "components/Form/Form.styled";
import { TypedInput, SelectInput } from "components/Input/Input";
import Button from "components/Button/Button";
import CheckboxInput from "components/CheckboxInput";

import useClientsList from "hooks/useClientsList";
import useLicencesList from "hooks/useLicencesList";
import { addModal } from "store/reducers/modals";
import { CarInitialValues } from "../types";

interface SellingDetailsProps {
  isEdit?: boolean;
  ownerId: number | null;
}

const IS_EXCHANGE_OPTIONS = [
  { label: "Non", value: 0 },
  { label: "Oui", value: 1 },
];

const EXCHANGE_TYPES_OPTIONS = [
  { label: "Locale", value: "locale" },
  { label: "europe", value: "europe" },
  { label: "dubai", value: "dubai" },
];

const PurchaseDetails = ({ isEdit, ownerId }: SellingDetailsProps) => {
  const params = ownerId ? { id: ownerId } : {};

  const { values, setFieldValue } = useFormikContext<CarInitialValues>();
  const dispatch = useDispatch();
  const { clientsList, isLoading: isClientsLoading } = useClientsList();
  const { licencesList, isLoading: isLicencesLoading } = useLicencesList("valid", params);
  const { type, owner_id, is_exchange, purchase_price_eur, eur_exchange_rate } = values;
  const PPDZD = purchase_price_eur * (eur_exchange_rate / 100);

  useEffect(() => {
    if (!is_exchange) setFieldValue("exchange_types", null);
  }, [is_exchange]);

  useEffect(() => {
    if (owner_id === 0) setFieldValue("owner_id", null);
  }, [owner_id]);

  useEffect(() => {
    if (type !== "locale") setFieldValue("purchase_price_dzd", PPDZD);
  }, [PPDZD]);

  const toggleClientForm = () => dispatch(addModal({ name: "clients", title: "Ajouter un client" }));
  const toggleLicenceForm = () => dispatch(addModal({ name: "licences", title: "Ajouter une licnece" }));

  return (
    <>
      <FormGroup>
        {!isClientsLoading && (
          <SelectInput
            name="seller"
            label="Vendeur"
            placeholder="Nom de vendeur"
            relatedFields={["seller_id"]}
            items={clientsList}
            buttons={
              <Button type="button" variant="ghost" icon="add" onClick={toggleClientForm}>
                Ajouter un client
              </Button>
            }
          />
        )}
        {!isLicencesLoading && (
          <SelectInput
            name="owner_name"
            label="Propriétaire"
            placeholder="Nom du propriétaire"
            relatedFields={["owner_id", "licence_price"]}
            items={licencesList}
            buttons={
              <Button type="button" variant="ghost" icon="add" onClick={toggleLicenceForm}>
                Ajouter une licence
              </Button>
            }
          />
        )}
      </FormGroup>
      <FormGroup>
        {type !== "locale" ? (
          <>
            <TypedInput
              label="Prix d'achat en EUR"
              name="purchase_price_eur"
              type="number"
              addOn="€"
              placeholder="45000"
            />

            <TypedInput
              label="Taux de change 100 €"
              name="eur_exchange_rate"
              type="number"
              addOn="DA"
              placeholder="23000"
            />
          </>
        ) : (
          <>
            <TypedInput
              label="Prix d'achat en DZD"
              name="purchase_price_dzd"
              type="number"
              addOn="DA"
              placeholder="250000000"
            />
          </>
        )}
      </FormGroup>
      <FormGroup>
        <CheckboxInput label="Échanger" name="is_exchange" options={IS_EXCHANGE_OPTIONS} />
        {is_exchange ? (
          <CheckboxInput label="Types de change" name="exchange_types" isMultiple options={EXCHANGE_TYPES_OPTIONS} />
        ) : null}
      </FormGroup>
    </>
  );
};

export default PurchaseDetails;

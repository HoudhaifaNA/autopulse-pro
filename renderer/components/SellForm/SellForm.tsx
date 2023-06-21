import useSWR from "swr";
import { FormikHelpers, FormikProps } from "formik";

import { FormGroup } from "components/Form/Form.styled";

import Form from "components/Form/Form";
import { SelectInput, TypedInput } from "components/Input/Input";

import { sellCarSchema } from "Schemas/FormSchemas";
import API, { fetcher } from "utils/API";
import { useContext, useState } from "react";
import { GlobalContext } from "pages/_app";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";
import Button from "components/Button/Button";

interface Values {
  buyer: { id: number; name: string };
  soldPrice: number | string;
  carId: number;
}

const INITIAL_VALUES = {
  buyer: {
    id: 0,
    name: "",
  },
  soldPrice: "",
  carId: 0,
};

const getClients = () => {
  const clientsRes = useSWR("/clients", fetcher, { refreshInterval: 3 });
  let CLIENTS_LIST = [];

  if (clientsRes.data) {
    CLIENTS_LIST = clientsRes.data.clients.map(({ id, fullName }: any) => {
      return { mainText: fullName, relatedValues: [id] };
    });
  }

  return CLIENTS_LIST;
};

const onSubmit = async (
  values: Values,
  actions: FormikHelpers<Values>,
  setModal: any,
  setNotification: any,
  _: any,
  __: any,
  setDocument: any
) => {
  const { buyer, soldPrice, carId } = values;
  try {
    await API.patch(`/cars/sell/${carId}`, { buyerId: buyer.id, soldPrice });

    setModal("");
    actions.resetForm();
    setNotification({ status: "success", message: "Voiture a été vendue" });
    setDocument({});
  } catch (err: any) {
    console.log(err.response.data.message);
    setNotification({ status: "error", message: err.response.data.message });
  }
};

const SellForm = ({ id }: { id: number }) => {
  const { setAddUpModal } = useContext(GlobalContext);
  const [formProps, setFormProps] = useState<FormikProps<Values>>();
  const CLIENTS_LIST = getClients();
  formProps?.setFieldValue("carId", id);

  return (
    <Form
      title="Ajouter un client"
      initials={INITIAL_VALUES}
      validation={sellCarSchema}
      getFormProps={(formProps) => setFormProps(formProps)}
      onSubmit={onSubmit}
      buttonText="Vendre"
    >
      <FormGroup>
        <SelectInput
          name="buyer.name"
          label="Acheteur :"
          placeholder="Nom de vendeur"
          autoFocus
          relatedFields={["buyer.id"]}
          items={CLIENTS_LIST}
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

        <TypedInput
          name="soldPrice"
          type="number"
          label="Prix de vente"
          placeholder="50000.00"
          addOn="DA"
        />
      </FormGroup>
    </Form>
  );
};

export default SellForm;

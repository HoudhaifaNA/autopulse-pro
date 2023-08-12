import useSWR, { mutate } from "swr";
import { FormikHelpers, FormikProps } from "formik";

import { FormGroup } from "components/Form/Form.styled";

import Form from "components/Form/Form";
import { ClickInput, SelectInput, TypedInput } from "components/Input/Input";

import { sellCarSchema } from "Schemas/FormSchemas";
import API, { fetcher } from "utils/API";
import { useContext, useState } from "react";
import { GlobalContext } from "pages/_app";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";
import Button from "components/Button/Button";
import DateInput from "components/DateInput/DateInput";
import useClients from "hooks/useClients";
import KeysChecker from "components/CarForm/KeysChecker";
import { DescriptionInput } from "components/CarForm/CarFeatures.styled";

interface SellFormProps {
  id: number;
  data: any;
  edit?: boolean;
}
interface Values {
  edit?: boolean;
  buyer: { id: number; name: string };
  soldPrice: number | string;
  sold_date: Date;
  given_keys: number;
  folder: string;
  procuration: boolean;
  gray_card: boolean;
  selling_details: string;
  carId: number;
}

const INITIAL_VALUES: Values = {
  buyer: {
    id: 0,
    name: "",
  },
  soldPrice: "",
  sold_date: new Date(),
  given_keys: 1,
  folder: "Dossier",
  procuration: true,
  selling_details: "",
  gray_card: false,
  carId: 0,
};

const onSubmit = async (
  values: Values,
  actions: FormikHelpers<Values>,
  context: any
) => {
  const { setModal, setNotification, setDocument, currCarType } = context;
  let { brand, serie, model } = currCarType;
  let message;

  try {
    const {
      buyer,
      soldPrice,
      sold_date,
      given_keys,
      folder,
      procuration,
      gray_card,
      selling_details,
      carId,
      edit,
    } = values;
    const endpoint = edit ? `/cars/soldPrice/${carId}` : `/cars/sell/${carId}`;
    message = edit ? "Vendre a modifié" : "Voiture a été vendue";

    await API.patch(endpoint, {
      buyerId: buyer.id,
      soldPrice,
      sold_date,
      given_keys,
      folder,
      procuration: procuration ? procuration.toString() : "false",
      gray_card: gray_card ? gray_card.toString() : "false",
      selling_details,
    });
    mutate("/cars");
    mutate(`/cars/models?brand=${brand}`);
    mutate(`/cars/carBrand?brand=${brand}&serie=${serie}`);
    mutate(`/cars/carBrand?brand=${brand}&serie=`);
    mutate(`/cars/carName?name=${brand} ${model}&serie=${serie}`);
    mutate(`/cars/carName?name=${brand} ${model}&serie=`);
    setModal("");
    setNotification({ status: "success", message });
    setDocument({});
  } catch (err: any) {
    console.log(err);
    message = "Error";
    if (err.response) message = err.response.data.message;
    setNotification({ status: "error", message });
  }
};

const FOLDER_OPTIONS = ["Dossier", "Copier de dossier"];
const SellForm = (props: SellFormProps) => {
  const { id, edit, data } = props;
  const { setAddUpModal } = useContext(GlobalContext);
  const [formProps, setFormProps] = useState<FormikProps<Values>>();
  const { clientsItems, isLoading } = useClients("DA");
  formProps?.setFieldValue("carId", id);
  const buttonText = edit ? "Modifier la vente" : "Vendre";
  const fieldProps = formProps?.getFieldProps("selling_details");

  return (
    <Form
      title="Vendre cette voiture"
      initials={edit ? { ...data, edit } : INITIAL_VALUES}
      validation={sellCarSchema}
      getFormProps={(formProps) => setFormProps(formProps)}
      onSubmit={onSubmit}
      buttonText={buttonText}
    >
      <FormGroup>
        {!isLoading && (
          <SelectInput
            name="buyer.name"
            label="Acheteur :"
            placeholder="Nom de acheteur"
            relatedFields={["buyer.id"]}
            items={clientsItems}
            disabled={edit}
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
        )}
        <TypedInput
          name="soldPrice"
          type="number"
          label="Prix de vente"
          placeholder="50000.00"
          addOn="DA"
        />
      </FormGroup>
      <FormGroup>
        <FormGroup>
          <DateInput label="Date de vente" minDate="2015" name="sold_date" />
        </FormGroup>
        <FormGroup>
          <KeysChecker field="given_keys" />
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <FormGroup>
          {FOLDER_OPTIONS.map((opt) => {
            return (
              <ClickInput
                key={opt}
                type="radio"
                name="folder"
                label={opt}
                value={opt}
              />
            );
          })}
        </FormGroup>
        <FormGroup>
          <ClickInput type="checkbox" name="procuration" label="procuration" />
          <ClickInput type="checkbox" name="gray_card" label="Cart grise" />
        </FormGroup>
      </FormGroup>
      <DescriptionInput {...fieldProps} />
    </Form>
  );
};

export default SellForm;

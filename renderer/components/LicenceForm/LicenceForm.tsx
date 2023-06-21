import { useContext, useState } from "react";
import useSWR from "swr";
import { FormikProps } from "formik";

import { FormGroup } from "components/Form/Form.styled";
import * as S from "components/LicenceForm/LicenceForm.styled";

import Form from "components/Form/Form";
import { TypedInput, SelectInput } from "components/Input/Input";
import Dropzone from "components/LicenceForm/Dropzone";
import Preview from "components/LicenceForm/Preview";
import DateInput from "components/DateInput/DateInput";

import wilayas from "data/wilayas.json";
import { licenceSchema } from "Schemas/FormSchemas";
import { fetcher } from "utils/API";
import handleSubmit from "./handleSubmit";

import { Values } from "components/LicenceForm/types";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";
import Button from "components/Button/Button";
import { GlobalContext } from "pages/_app";

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

const INITIAL_VALUES: Values = {
  created_at: new Date(),
  releasedDate: new Date(),
  seller: { id: 0, name: "" },
  moudjahid: "",
  serialNumber: "",
  wilaya: "",
  price: "",
  attachments: [],
};

const WILAYAS_ITEMS = wilayas.map((wilaya) => {
  return { mainText: wilaya.name, secondText: wilaya.id };
});

const renderAttachments = (attachments: Values["attachments"]) => {
  if (attachments.length > 0) {
    return attachments.map((attachemnt) => {
      return <Preview key={attachemnt.id} attachment={attachemnt} />;
    });
  }
};

const LicenceForm = () => {
  const { setAddUpModal } = useContext(GlobalContext);
  const [formProps, setFormProps] = useState<FormikProps<Values>>();
  const CLIENTS_LIST = getClients();

  const values = formProps?.values ?? INITIAL_VALUES;
  const { attachments } = values;

  return (
    <Form
      title="Ajouter une licence"
      initials={INITIAL_VALUES}
      validation={licenceSchema}
      onSubmit={handleSubmit}
      getFormProps={(props) => setFormProps(props)}
    >
      <FormGroup>
        <SelectInput
          name="seller.name"
          label="Vendeur :"
          placeholder="Nom de vendeur"
          autoFocus
          relatedFields={["seller.id"]}
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
          name="moudjahid"
          type="text"
          label="Moudjahid :"
          placeholder="Nom du moudjahid"
        />
      </FormGroup>
      <FormGroup>
        <DateInput name="created_at" label="Créé à" minDate="2015" />
        <DateInput name="releasedDate" label="Date de licence" minDate="2015" />
      </FormGroup>

      <FormGroup>
        <TypedInput
          name="serialNumber"
          label="Numéro de série :"
          placeholder="420022"
        />
        <SelectInput
          name="wilaya"
          label="Wilaya :"
          placeholder="Entrez la wilaya"
          items={WILAYAS_ITEMS}
          sorted={false}
        />
        <TypedInput
          name="price"
          type="number"
          label="Prix :"
          placeholder="0"
          addOn="DA"
        />
      </FormGroup>
      <FormGroup>
        <Dropzone />
      </FormGroup>
      <S.DocumentsList>{renderAttachments(attachments)}</S.DocumentsList>
    </Form>
  );
};

export default LicenceForm;

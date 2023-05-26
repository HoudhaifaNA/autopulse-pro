import { useState } from "react";
import { FormikProps, FormikHelpers } from "formik";

import { FormGroup } from "components/Form/Form.styled";
import * as S from "components/LicenceForm/LicenceForm.styled";

import Form from "components/Form/Form";
import { TypedInput, SelectInput } from "components/Input/Input";
import Dropzone from "components/LicenceForm/Dropzone";
import Preview from "components/LicenceForm/Preview";

import wilayas from "data/wilayas.json";
import { licenceSchema } from "Schemas/FormSchemas";

import { Values } from "components/LicenceForm/types";

const INITIAL_VALUES: Values = {
  seller: "",
  moudjahid: "",
  wilaya: "",
  price: 0,
  attachments: [],
};

const WILAYAS_ITEMS = wilayas.map((wilaya) => {
  return { mainText: wilaya.name, secondText: wilaya.id };
});

const onSubmit = (values: Values, actions: FormikHelpers<Values>) => {
  setTimeout(() => {
    console.log(values);
    actions.resetForm();
  }, 1000);
};

const renderAttachments = (attachments: Values["attachments"]) => {
  if (attachments.length > 0) {
    return attachments.map((attachemnt) => {
      return <Preview key={attachemnt.id} attachment={attachemnt} />;
    });
  }
};

const LicenceForm = () => {
  const [formProps, setFormProps] = useState<FormikProps<Values>>();

  const values = formProps?.values;
  const { attachments } = values ?? INITIAL_VALUES;

  return (
    <Form
      title="Ajouter une licence"
      initials={INITIAL_VALUES}
      validation={licenceSchema}
      onSubmit={onSubmit}
      getFormProps={(props) => setFormProps(props)}
    >
      <FormGroup>
        <SelectInput
          name="seller"
          label="Vendeur :"
          placeholder="Nom de vendeur"
          autoFocus
          items={[]}
        />
        <TypedInput
          name="moudjahid"
          type="text"
          label="Moudjahid :"
          placeholder="Nom du moudjahid"
        />
      </FormGroup>
      <FormGroup>
        <SelectInput
          name="wilaya"
          label="Wilaya :"
          placeholder="Entrez la wilaya"
          items={WILAYAS_ITEMS}
        />
        <TypedInput
          name="price"
          type="number"
          label="Prix :"
          placeholder="Prix ​​de la licence"
          addOn="DZD"
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

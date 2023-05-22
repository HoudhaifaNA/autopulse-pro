import { Formik, FormikProps, FormikHelpers } from "formik";

import { Form, FormContent, FormGroup } from "components/ui/Form.styled";
import * as S from "components/LicenceForm/LicenceForm.styled";

import { TypedInput, SelectInput } from "components/Input/Input";
import Dropzone from "components/LicenceForm/Dropzone";
import Preview from "components/LicenceForm/Preview";
import Modal, { ModalActions, ModalContent } from "components/Modal/Modal";
import Button from "components/Button/Button";

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
  return (
    <Modal title="Ajouter une licence">
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={licenceSchema}
        onSubmit={onSubmit}
      >
        {(props: FormikProps<Values>) => {
          const { handleSubmit, submitForm, isSubmitting, values } = props;

          return (
            <>
              <ModalContent>
                <Form onSubmit={handleSubmit}>
                  <FormContent>
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
                    <S.DocumentsList>
                      {renderAttachments(values.attachments)}
                    </S.DocumentsList>
                    {/*Add hidden input to submit button with hitting enter */}
                    <input type="submit" style={{ display: "none" }} />
                  </FormContent>
                </Form>
              </ModalContent>
              <ModalActions>
                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Ajouter
                </Button>
              </ModalActions>
            </>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default LicenceForm;

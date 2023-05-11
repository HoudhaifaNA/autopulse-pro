import { Formik, FormikProps, FormikHelpers } from "formik";

import { Form, FormContent, FormGroup } from "components/ui/Form.styled";
import * as S from "components/LicenceForm/LicenceForm.styled";
import Dropzone from "components/LicenceForm/Dropzone";
import Preview from "components/LicenceForm/Preview";
import { Values } from "components/LicenceForm/types";
import Modal, { ModalActions, ModalContent } from "components/Modal/Modal";
import { DropdownInput, TypedInput } from "components/Input/Input";
import Button from "components/Buttons/Button";
import { licenceSchema } from "Schemas/FormSchemas";

const INITIAL_VALUES: Values = {
  seller: "",
  moudjahid: "",
  wilaya: "",
  price: 0,
  attachments: [],
};

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
    <Modal title="Ajouter un client">
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
                      <DropdownInput>
                        <TypedInput
                          name="seller"
                          type="text"
                          label="Vendeur :"
                          placeholder="Nom de vendeur"
                          iconRight="expand"
                          autoFocus
                        />
                      </DropdownInput>
                      <TypedInput
                        name="moudjahid"
                        type="text"
                        label="Moudjahid :"
                        placeholder="Nom du moudjahid"
                      />
                    </FormGroup>
                    <FormGroup>
                      <DropdownInput>
                        <TypedInput
                          name="wilaya"
                          type="string"
                          label="Wilaya :"
                          placeholder="Entrez la wilaya"
                          iconRight="expand"
                        />
                      </DropdownInput>
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

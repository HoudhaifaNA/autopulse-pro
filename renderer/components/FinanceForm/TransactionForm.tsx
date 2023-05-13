import { Formik, FormikProps, FormikHelpers } from "formik";
import { DatePickerInput } from "@mantine/dates";

import { Form, FormContent, FormGroup } from "components/ui/Form.styled";
import Modal, { ModalActions, ModalContent } from "components/Modal/Modal";
import { DropdownInput, TypedInput } from "components/Input/Input";
import Button from "components/Buttons/Button";
import { LabelText } from "styles/Typography";
import updateLocale from "dayjs/plugin/updateLocale";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import Icon from "components/Icon/Icon";

dayjs.extend(updateLocale);
dayjs.updateLocale("fr", {
  months: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
});

interface Values {
  date: Date;
  seller: string;
  method:
    | string
    | "Espèces"
    | "Chèque"
    | "Carte de débit"
    | "Virement bancaire";
  amount: number;
}
const INITIAL_VALUES: Values = {
  date: new Date(),
  seller: "",
  method: "",
  amount: 0,
};

const onSubmit = (values: Values, actions: FormikHelpers<Values>) => {
  setTimeout(() => {
    console.log(values);
    actions.resetForm();
  }, 1000);
};

const LicenceForm = () => {
  return (
    <Modal title="Ajouter un client">
      <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
        {(props: FormikProps<Values>) => {
          const {
            handleSubmit,
            submitForm,
            isSubmitting,
            values,
            setFieldValue,
          } = props;

          return (
            <>
              <ModalContent>
                <Form onSubmit={handleSubmit}>
                  <FormContent>
                    <FormGroup>
                      <div style={{ width: "100%", height: "6.2rem" }}>
                        <DatePickerInput
                          label={<LabelText>Date :</LabelText>}
                          placeholder="Pick date"
                          value={values.date}
                          onChange={(value) => setFieldValue("date", value)}
                          size="xl"
                          h={60.2}
                          locale="fr"
                          minDate={new Date("2010")}
                          maxDate={new Date()}
                          monthsListFormat="MMMM"
                          icon={<Icon icon="calendar" size="1.8rem" />}
                          weekendDays={[5]}
                          firstDayOfWeek={6}
                        />
                      </div>
                      <DropdownInput>
                        <TypedInput
                          name="seller"
                          type="text"
                          label="Vendeur :"
                          placeholder="Nom de vendeur"
                          iconRight="expand"
                        />
                      </DropdownInput>
                    </FormGroup>
                    <FormGroup>
                      <DropdownInput>
                        <TypedInput
                          name="method"
                          type="string"
                          label="Méthode :"
                          placeholder="Entrez la méthode"
                          iconRight="expand"
                        />
                      </DropdownInput>
                      <TypedInput
                        name="amount"
                        type="number"
                        label="Montant :"
                        placeholder="150000.00"
                        addOn="DZD"
                      />
                    </FormGroup>

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

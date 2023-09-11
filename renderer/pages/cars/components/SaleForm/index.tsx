import { mutate } from "swr";
import { useDispatch } from "react-redux";
import { Formik, FormikConfig, FormikProps } from "formik";

import Form from "components/Form/Form";
import { FormGroup } from "components/Form/Form.styled";
import { SelectInput, TypedInput } from "components/Input/Input";
import Button from "components/Button/Button";
import DateInput from "components/DateInput/DateInput";
import KeysChecker from "../KeysChecker";
import CarFeatures from "../CarFeatures";
import CheckboxInput from "components/CheckboxInput";
import { ModalActions } from "components/Modal/Modal";

import { useAppSelector } from "store";
import useClientsList from "hooks/useClientsList";
import dateToString from "utils/dateToString";
import { addModal, removeModal } from "store/reducers/modals";
import { SaleModalConfig } from "types/modals";
import { SaleInitialValues } from "./types";
import { handleSubmit } from "./handleSubmit";
import { schema } from "./schema";

interface SaleFormProps {
  modalId: string;
}

const INITIAL_VALUES: SaleInitialValues = {
  sold_at: dateToString(new Date()),
  buyer_id: 0,
  buyer: "",
  sold_price: 0,
  given_keys: 1,
  papers_type: "Dossier",
  has_procuration: 1,
  has_gray_card: 1,
  selling_details: "",
};

const PROCURATION_OPTIONS = [
  { label: "Non", value: 0 },
  { label: "Oui", value: 1 },
];
const GRAY_CARD_OPTIONS = [
  { label: "Non", value: 0 },
  { label: "Oui", value: 1 },
];
const PAPERS_OPTIONS = [
  { label: "Dossier", value: "Dossier" },
  { label: "Double dossier", value: "Double Dossier" },
];

const SaleForm = ({ modalId }: SaleFormProps) => {
  const { fetchedUrl, secondaryUrl } = useAppSelector((state) => state.resourceUrls.cars);
  const { modalsList } = useAppSelector((state) => state.modals);
  const currentModal = modalsList.find(({ id }) => id === modalId) as SaleModalConfig;
  const dispatch = useDispatch();
  const { clientsList, isLoading: isClientsLoading } = useClientsList();

  const documentValues = currentModal.params.document;
  let formInitialValues = { ...INITIAL_VALUES, ...documentValues };
  let submitButtonText = "Vendre";

  if (currentModal.params.isEdit) {
    formInitialValues = documentValues as SaleInitialValues;
    submitButtonText = "Mettre à jour la vente";
  }

  const toggleClientForm = () => dispatch(addModal({ name: "clients", title: "Ajouter un client" }));

  const formProps: FormikConfig<SaleInitialValues> = {
    initialValues: formInitialValues,
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      const status = await handleSubmit(values, actions, currentModal.params);
      if (status === "success") {
        mutate(fetchedUrl);
        mutate(secondaryUrl);
        dispatch(removeModal(modalId));
      }
    },
  };
  return (
    <Formik {...formProps}>
      {({ handleSubmit, isSubmitting }: FormikProps<SaleInitialValues>) => {
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              {!isClientsLoading && (
                <SelectInput
                  name="buyer"
                  label="Acheteur :"
                  placeholder="Nom de acheteur"
                  relatedFields={["buyer_id"]}
                  items={clientsList}
                  buttons={
                    <Button type="button" variant="ghost" icon="add" onClick={toggleClientForm}>
                      Ajouter un client
                    </Button>
                  }
                />
              )}
              <TypedInput name="sold_price" type="number" label="Prix de vente" placeholder="50000.00" addOn="DA" />
            </FormGroup>
            <FormGroup>
              <FormGroup>
                <DateInput label="Date de vente" name="sold_at" />
              </FormGroup>
              <FormGroup>
                <KeysChecker field="given_keys" />
              </FormGroup>
            </FormGroup>
            <FormGroup>
              <FormGroup>
                <CheckboxInput label="Procuration" name="has_procuration" options={PROCURATION_OPTIONS} />
                <CheckboxInput label="Cart grise" name="has_gray_card" options={GRAY_CARD_OPTIONS} />
              </FormGroup>
              <FormGroup>
                <CheckboxInput label="Type de dossier" name="papers_type" options={PAPERS_OPTIONS} />
              </FormGroup>
            </FormGroup>
            <CarFeatures name="selling_details" label="Détails de vente" />
            <ModalActions>
              <Button type="submit" variant="primary" loading={isSubmitting} disabled={isSubmitting}>
                {submitButtonText}
              </Button>
            </ModalActions>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SaleForm;

// const FOLDER_OPTIONS = ["Dossier", "Copier de dossier"];
// const SellForm = (props: SellFormProps) => {
//   const { id, edit, data } = props;
//   const { setAddUpModal } = useContext(GlobalContext);
//   const [formProps, setFormProps] = useState<FormikProps<Values>>();
//   const { clientsItems, isLoading } = useClientsList("DA");
//   formProps?.setFieldValue("carId", id);
//   const buttonText = edit ? "Modifier la vente" : "Vendre";
//   const fieldProps = formProps?.getFieldProps("selling_details");

//   return (
//     <Form
//       title="Vendre cette voiture"
//       initials={edit ? { ...data, edit } : INITIAL_VALUES}
//       validation={sellCarSchema}
//       getFormProps={(formProps) => setFormProps(formProps)}
//       onSubmit={onSubmit}
//       buttonText={buttonText}
//     >
//       <FormGroup>
//         {!isLoading && (
//           <SelectInput
//             name="buyer.name"
//             label="Acheteur :"
//             placeholder="Nom de acheteur"
//             relatedFields={["buyer.id"]}
//             items={clientsItems}
//             disabled={edit}
//             buttons={
//               <ButtonItem>
//                 <Button type="button" variant="ghost" icon="add" onClick={() => setAddUpModal("clients")}>
//                   Ajouter un client
//                 </Button>
//               </ButtonItem>
//             }
//           />
//         )}
//         <TypedInput name="soldPrice" type="number" label="Prix de vente" placeholder="50000.00" addOn="DA" />
//       </FormGroup>
//       <FormGroup>
//         <FormGroup>
//           <DateInput label="Date de vente" minDate="2015" name="sold_date" />
//         </FormGroup>
//         <FormGroup>
//           <KeysChecker field="given_keys" />
//         </FormGroup>
//       </FormGroup>
//       <FormGroup>
//         <FormGroup>
//           {FOLDER_OPTIONS.map((opt) => {
//             return <ClickInput key={opt} type="radio" name="folder" label={opt} value={opt} />;
//           })}
//         </FormGroup>
//         <FormGroup>
//           <ClickInput type="checkbox" name="procuration" label="procuration" />
//           <ClickInput type="checkbox" name="gray_card" label="Cart grise" />
//         </FormGroup>
//       </FormGroup>
//       <DescriptionInput {...fieldProps} />
//     </Form>
//   );
// };

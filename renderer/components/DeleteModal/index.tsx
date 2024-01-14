import { useRouter } from "next/router";
import { useState } from "react";
import { mutate } from "swr";
import { useDispatch } from "react-redux";
import { Formik, FormikConfig, FormikProps } from "formik";

import * as S from "./styles";
import { Body1 } from "styles/Typography";
import { FormGroup } from "components/Form/Form.styled";
import Form from "components/Form/Form";
import TypedInput from "components/Input/TypedInput";
import { ModalActions } from "components/Modal/Modal";
import Button from "components/Button/Button";

import { useAppSelector } from "store";
import { removeModal } from "store/reducers/modals";
import { clearSelectedItems } from "store/reducers/selectedItems";
import handleSubmit from "./handleSubmit";
import { DeleteModalConfig } from "types";
import { DeleteModalProps, InititalValues } from "./types";

const INITIAL_VALUES: InititalValues = {
  password: "",
};

const DeleteModal = ({ modalId }: DeleteModalProps) => {
  const router = useRouter();
  const modalsList = useAppSelector((state) => state.modals.modalsList);
  const clientsURLs = useAppSelector((state) => state.resourceUrls.clients);
  const currentModal = modalsList.find(({ id }) => id === modalId) as DeleteModalConfig;
  const { baseUrl, fetchedUrl, secondaryUrl } = useAppSelector((state) => state.resourceUrls[currentModal.resource]);
  const dispatch = useDispatch();
  const [visibility, toggleVisibility] = useState(false);
  let url = `${baseUrl}/${currentModal.idsToDelete.join(",")}`;
  if (currentModal.name === "cancel_sale") url = `${baseUrl}/sale/${currentModal.idsToDelete.join(",")}`;
  if (currentModal.resource.startsWith("transactions")) url = `/transactions/${currentModal.idsToDelete.join(",")}`;
  if (currentModal.resource === "expenses" && !secondaryUrl) {
    url = `/expenses/dates/${currentModal.idsToDelete.join(",")}`;
  }

  const pathWithoutDynamicParam = router.pathname.replace(/\[.*?\]/g, "");

  const formProps: FormikConfig<InititalValues> = {
    initialValues: INITIAL_VALUES,
    onSubmit: async (values, actions) => {
      const status = await handleSubmit(values, actions, url);
      if (status === "success") {
        mutate(fetchedUrl);
        dispatch(removeModal(modalId));
        dispatch(clearSelectedItems());
        if (currentModal.resource === "categories") mutate("/categories/cars");
        if (currentModal.name === "cancel_sale") return mutate(secondaryUrl);
        if (currentModal.resource.startsWith("transactions")) {
          mutate(clientsURLs.fetchedUrl);
          mutate(clientsURLs.secondaryUrl);
          return;
        }
        router.push(pathWithoutDynamicParam);
      }
    },
  };

  return (
    <Formik {...formProps}>
      {({ handleSubmit, isSubmitting }: FormikProps<any>) => {
        return (
          <S.DeleteModalWrapper>
            <Form onSubmit={handleSubmit}>
              <Body1>
                Êtes-vous sûr de vouloir supprimer <b>{currentModal.message}</b> ?
              </Body1>
              <FormGroup>
                <TypedInput
                  name="password"
                  type={visibility ? "text" : "password"}
                  label="Votre mot de passe"
                  placeholder="Entrez votre mot de pass"
                  rightIcon={visibility ? "visibility_off" : "visibility"}
                  onIconClick={() => toggleVisibility(!visibility)}
                />
                <FormGroup />
              </FormGroup>
              <ModalActions>
                <Button type="submit" variant="danger" loading={isSubmitting}>
                  Suprimmer
                </Button>
              </ModalActions>
            </Form>
          </S.DeleteModalWrapper>
        );
      }}
    </Formik>
  );
};

export default DeleteModal;

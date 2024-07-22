import { useDispatch } from "react-redux";

import { Body1 } from "styles/Typography";
import { ModalActions } from "components/Modal/Modal";
import Button from "components/Button/Button";

import { removeModal } from "store/reducers/modals";
import { useAppSelector } from "store";
import { WarningModalConfig } from "types";
import API from "utils/API";
import notify from "utils/notify";
import { setUser } from "store/reducers/user";
import redirectToPath from "utils/convertPath";

interface WarningModalProps {
  modalId: string;
}

const WarningModal = ({ modalId }: WarningModalProps) => {
  const modalsList = useAppSelector((state) => state.modals.modalsList);
  const dispatch = useDispatch();
  const modalIdsToRemove: string[] = [];
  const { type } = modalsList.find(({ id }) => id === modalId) as WarningModalConfig;
  const warningMessage =
    type === "closer"
      ? "Êtes-vous sûr de vouloir fermer la fenêtre modale ?"
      : "Êtes-vous sûr de vouloir vous déconnecter ?";
  const buttonText = type === "closer" ? "Fermer" : "Déconnexion";

  modalsList.forEach((modal, index) => {
    if (modal.id === modalId) {
      const previousModalId = modalsList[index - 1]?.id;
      modalIdsToRemove.push(...[modalId, previousModalId].filter(Boolean));
    }
  });

  const logout = async () => {
    try {
      const notificationMessage = "Vous vous êtes déconnecté avec succès.";

      await API.post(`/users/logout`);
      notify("success", notificationMessage);
      dispatch(setUser(null));
      dispatch(removeModal(modalId));
      redirectToPath("/login");
    } catch (err: any) {
      let message = "Error";
      if (err.response) message = err.response.data.message;
      notify("error", message);
      console.log(err);
    }
  };

  const onClickClick = () => {
    if (type === "closer") {
      modalIdsToRemove.forEach((id) => dispatch(removeModal(id)));
    } else {
      logout();
    }
  };

  return (
    <>
      <Body1>{warningMessage}</Body1>
      <ModalActions>
        <Button variant="danger" onClick={onClickClick}>
          {buttonText}
        </Button>
      </ModalActions>
    </>
  );
};

export default WarningModal;

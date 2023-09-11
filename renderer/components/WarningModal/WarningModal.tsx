import { useDispatch } from "react-redux";

import { Body1 } from "styles/Typography";
import { ModalActions } from "components/Modal/Modal";
import Button from "components/Button/Button";

import { removeModal } from "store/reducers/modals";
import { useAppSelector } from "store";
import { WarningModalConfig } from "types";

interface WarningModalProps {
  modalId: string;
}

const WarningModal = ({ modalId }: WarningModalProps) => {
  const modalsList = useAppSelector((state) => state.modals.modalsList);
  const dispatch = useDispatch();
  const modalIdsToRemove: string[] = [];
  const currentModal = modalsList.find(({ id }) => id === modalId) as WarningModalConfig;
  const warningMessage =
    currentModal.type === "closer"
      ? "Êtes-vous sûr de vouloir fermer la fenêtre modale ?"
      : "Êtes-vous sûr de vouloir vous déconnecter ?";
  const buttonText = currentModal.type === "closer" ? "Fermer" : "Déconnexion";

  modalsList.forEach((modal, index) => {
    if (modal.id === modalId) {
      const previousModalId = modalsList[index - 1]?.id;
      modalIdsToRemove.push(...[modalId, previousModalId].filter(Boolean));
    }
  });

  const onCloseClick = () => {
    modalIdsToRemove.forEach((id) => dispatch(removeModal(id)));
  };

  return (
    <>
      <Body1>{warningMessage}</Body1>
      <ModalActions>
        <Button variant="danger" onClick={onCloseClick}>
          {buttonText}
        </Button>
      </ModalActions>
    </>
  );
};

export default WarningModal;

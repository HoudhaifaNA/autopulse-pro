import { useContext } from "react";

import { Body1 } from "styles/Typography";

import Modal, { ModalContent, ModalActions } from "components/Modal/Modal";
import Button from "components/Button/Button";
import { GlobalContext } from "pages/_app";

const WarningModal = () => {
  const { currModal, setModal, setAddUpModal, addUpModal, toggleWarningModal } =
    useContext(GlobalContext);

  const closeWarning = () => {
    if (addUpModal) {
      setAddUpModal("");
    } else if (currModal) {
      setModal("");
    }

    toggleWarningModal(false);
  };
  return (
    <>
      <div className="background-black" style={{ zIndex: "1000000" }} />
      <Modal title="Fermeture du formulaire ouvert">
        <ModalContent>
          <Body1>Êtes-vous sûr de fermer le formulaire</Body1>
        </ModalContent>
        <ModalActions>
          <Button variant="danger" onClick={closeWarning}>
            Fermer
          </Button>
        </ModalActions>
      </Modal>
    </>
  );
};

export default WarningModal;

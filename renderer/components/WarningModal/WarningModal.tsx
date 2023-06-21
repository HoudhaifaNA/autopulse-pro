import { useContext } from "react";

import { Body1 } from "styles/Typography";

import Modal, { ModalContent, ModalActions } from "components/Modal/Modal";
import Button from "components/Button/Button";
import { GlobalContext } from "pages/_app";
import API from "utils/API";

const WarningModal = () => {
  const {
    currModal,
    setModal,
    setAddUpModal,
    addUpModal,
    toggleModalDelete,
    toggleWarningModal,
    toLogout,
    setToLogout,
  } = useContext(GlobalContext);

  const closeWarning = async () => {
    if (toLogout) {
      try {
        await API.post("/users/logout");
        location.assign("/");
      } catch (err: any) {
        console.log(err);
      }
      return 1;
    }
    setToLogout(false);
    if (addUpModal) {
      setAddUpModal("");
    } else if (currModal) {
      setModal("");
    }
    toggleModalDelete(false);
    toggleWarningModal(false);
  };
  return (
    <>
      <div className="background-black" style={{ zIndex: "1000000" }} />
      <Modal
        title={toLogout ? "Se déconnecter" : "Fermeture du formulaire ouvert"}
      >
        <ModalContent>
          <Body1>
            {toLogout
              ? "Êtes-vous sûr de vouloir vous déconnecter "
              : "Êtes-vous sûr de fermer le formulaire"}
            ?
          </Body1>
        </ModalContent>
        <ModalActions>
          <Button variant="danger" onClick={closeWarning}>
            {toLogout ? "Se déconnecter" : "Fermer"}
          </Button>
        </ModalActions>
      </Modal>
    </>
  );
};

export default WarningModal;

import Modal from "components/Modal/Modal";
import ClientForm from "pages/clients/components/ClientForm";
import LicenceForm from "pages/licences/components/LicenceForm";
import CarForm from "pages/cars/components/CarForm";
import SaleForm from "pages/cars/components/SaleForm";
import WarningModal from "components/WarningModal/WarningModal";
import DeleteModal from "components/DeleteModal";
import DinarForm from "pages/finances/dinar/DinarForm";
import EuroForm from "pages/finances/euro/EuroForm";

import { useAppSelector } from "store";
import { ModalTypes } from "types";
import ExpenseForm from "pages/expenses/components/ExpenseForm";
import PaperForm from "pages/papers/components/PaperForm";
import ProcurationForm from "pages/procurations/components/ProcurationForm";

interface ModalItem {
  Component: ({ modalId }: { modalId: string }) => JSX.Element;
}

type ModalName = ModalTypes["name"];

type ModalsComponents = {
  [key in ModalName]?: ModalItem;
};

const modalsComponents: ModalsComponents = {
  clients: {
    Component: ClientForm,
  },
  licences: {
    Component: LicenceForm,
  },
  cars: {
    Component: CarForm,
  },
  sale: {
    Component: SaleForm,
  },
  papers: {
    Component: PaperForm,
  },
  procurations: {
    Component: ProcurationForm,
  },
  expenses: {
    Component: ExpenseForm,
  },
  transactionsDZD: {
    Component: DinarForm,
  },
  transactionsEUR: {
    Component: EuroForm,
  },
  warning: {
    Component: WarningModal,
  },
  delete: {
    Component: DeleteModal,
  },
  cancel_sale: {
    Component: DeleteModal,
  },
};

const ModalsManager = () => {
  const modals = useAppSelector((state) => state.modals.modalsList);

  const renderModals = () => {
    return modals.map(({ id, name, title }, ind) => {
      const currentModal = modalsComponents[name];

      if (currentModal) {
        const { Component } = currentModal;
        const zIndexMultiplier = ind + 1;

        return (
          <Modal title={title} modalId={id} zIndexMultiplier={zIndexMultiplier} key={ind}>
            <Component modalId={id} />
          </Modal>
        );
      }
    });
  };

  return <>{renderModals()}</>;
};

export default ModalsManager;

import Modal from "components/Modal/Modal";
import WarningModal from "components/WarningModal/WarningModal";
import DeleteModal from "components/DeleteModal";
import CarForm from "page-components/cars/CarForm/CarForm";
import SaleForm from "page-components/cars/SaleForm/SaleForm";
import UpdateExchangeRateForm from "page-components/cars/UpdateExchangeRateForm/UpdateExchangeRateForm";
import ClientForm from "page-components/clients/ClientForm";
import ExpenseForm from "page-components/expenses/ExpenseForm";
import DinarForm from "page-components/finances/DinarForm";
import EuroForm from "page-components/finances/EuroForm";
import LicenceForm from "page-components/licences/LicenceForm";
import PaperForm from "page-components/papers/PaperForm";
import ProcurationForm from "page-components/procurations/ProcurationForm";

import { useAppSelector } from "store";
import { ModalTypes } from "types";

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
  exchange_rate: {
    Component: UpdateExchangeRateForm,
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

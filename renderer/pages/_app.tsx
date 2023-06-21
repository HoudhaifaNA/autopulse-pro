import { createContext, useEffect, useState } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Inter from "next/font/local";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "styles/GlobalStyle";
import theme from "styles/theme";
import Layout from "components/Layout/Layout";
import ClientDocument from "components/ClientDocument/ClientDocument";
import LicenceDocument from "components/LicenceDocument/LicenceDocument";
import CarDocument from "components/CarDocument/CarDocument";
import ClientForm from "components/ClientForm/ClientForm";
import CarForm from "components/CarForm/CarForm";
import LicenceForm from "components/LicenceForm/LicenceForm";
import TransactionForm from "components/FinancesForm/TransactionForm";
import EuroTransferForm from "components/FinancesForm/EuroTransferForm";
import DeleteModal from "components/DeleteModal/DeleteModal";
import WarningModal from "components/WarningModal/WarningModal";
import SellForm from "components/SellForm/SellForm";
import ExpenseForm from "components/ExpenseForm/ExpenseForm";

const inter = Inter({
  src: [
    { path: "../public/font/static/Inter-Regular.ttf", weight: "400" },
    { path: "../public/font/static/Inter-Medium.ttf", weight: "500" },
    { path: "../public/font/static/Inter-Bold.ttf", weight: "700" },
  ],
});

export const GlobalContext = createContext<any>("");

interface Notification {
  status: string;
  message: string;
}
interface Document {
  type: string;
  id: number;
}
interface ModalDelete {
  name: string;
  url: string;
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [currModal, setModal] = useState("");
  const [addUpModal, setAddUpModal] = useState("");
  const [warningModal, toggleWarningModal] = useState(false);
  const [toLogout, setToLogout] = useState(false);
  const [isFormChanged, setFormChanged] = useState(false);
  const [modalDelete, toggleModalDelete] = useState<ModalDelete>();
  const [currNotification, setNotification] = useState<Notification>({
    status: "",
    message: "",
  });
  const [currDocument, setDocument] = useState<Document>({ type: "", id: 0 });

  useEffect(() => {
    setTimeout(() => {
      setNotification({ status: "", message: "" });
    }, 1500);
  }, [currNotification.status]);

  // Insert Login page without Layout
  const insertPage = () => {
    if (router.asPath === "/") return <Component {...pageProps} />;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };

  return (
    <GlobalContext.Provider
      value={{
        currModal,
        setModal,
        addUpModal,
        setAddUpModal,
        currNotification,
        setNotification,
        currDocument,
        setDocument,
        modalDelete,
        toggleModalDelete,
        isFormChanged,
        setFormChanged,
        toggleWarningModal,
        toLogout,
        setToLogout,
      }}
    >
      <main className={inter.className}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {modalDelete && (
            <DeleteModal name={modalDelete.name} url={modalDelete.url} />
          )}
          {currModal === "clients" && <ClientForm />}
          {currModal === "cars" && <CarForm />}
          {currModal === "licences" && <LicenceForm />}
          {currModal === "transactions" && <TransactionForm />}
          {currModal === "euros" && <EuroTransferForm />}
          {currModal === "expenses" && <ExpenseForm />}
          {currModal === "sell" && <SellForm id={currDocument.id} />}

          {addUpModal === "clients" && (
            <>
              <div className="background-black" style={{ zIndex: "1000000" }} />
              <ClientForm />
            </>
          )}
          {addUpModal === "licences" && (
            <>
              <div className="background-black" style={{ zIndex: "1000000" }} />
              <LicenceForm />
            </>
          )}
          {warningModal && <WarningModal />}
          {currDocument.type === "clients" && <ClientDocument />}
          {currDocument.type === "licences" && <LicenceDocument />}
          {currDocument.type === "cars" && <CarDocument />}
          {insertPage()}
        </ThemeProvider>
      </main>
    </GlobalContext.Provider>
  );
}

export default MyApp;

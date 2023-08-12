import { createContext, useEffect, useState } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Inter from "next/font/local";
import { ThemeProvider } from "styled-components";
import NextNProgress from "nextjs-progressbar";

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
import Toaster from "components/Toaster/Toaster";
import ProcurationForm from "components/ProcurationForm/ProcurationForm";
import ExpenseDocument from "components/ExpenseDocument/ExpenseDocument";
import API from "utils/API";
import PaperForm from "components/PaperForm/PaperForm";
import ReduxProvider from "state/ReduxProvider";

const inter = Inter({
  src: [
    { path: "../public/font/static/Inter-Regular.ttf", weight: "400" },
    { path: "../public/font/static/Inter-Medium.ttf", weight: "500" },
    { path: "../public/font/static/Inter-Bold.ttf", weight: "700" },
  ],
});

export const GlobalContext = createContext<any>("");

interface Modal {
  name: string;
  edit?: boolean;
  data?: any;
}
interface Notification {
  status: "success" | "error" | "warning" | "";
  message: string;
}
interface Document {
  type: string;
  id: number;
}
interface ModalDelete {
  name: string;
  url: string;
  method?: "patch" | "delete";
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [currCarType, setCurrCar] = useState<any>({
    brand: "",
    model: "",
    serie: "",
  });
  const [currModal, setModal] = useState<Modal>({
    name: "",
    edit: false,
    data: {},
  });
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
    }, 4000);
  }, [currNotification.status]);

  const currentPath = router.asPath.split("/")[1];
  const FORM_NAMES = [
    "clients",
    "cars",
    "licences",
    "expenses",
    "procurations",
    "papers",
  ];

  let TEN_MINUTES = 1000 * 60 * 100;
  let inactiveTimeThreshold = TEN_MINUTES;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleInactivity = async () => {
      await API.post("/users/logout");
      location.assign("/");
    };
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(handleInactivity, inactiveTimeThreshold);
    };

    document.addEventListener("mousedown", resetTimer);
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("mouseup", resetTimer);
    document.addEventListener("keydown", resetTimer);
    document.addEventListener("keypress", resetTimer);
    document.addEventListener("keyup", resetTimer);

    return () => {
      document.removeEventListener("mousedown", resetTimer);
      document.removeEventListener("mousemove", resetTimer);
      document.removeEventListener("mouseup", resetTimer);
      document.removeEventListener("keydown", resetTimer);
      document.removeEventListener("keypress", resetTimer);
      document.removeEventListener("keyup", resetTimer);
    };
  }, []);
  useEffect(() => {
    const handleShorcuts = (e: KeyboardEvent) => {
      // @ts-ignore
      if (e.target["tagName"] !== "INPUT") {
        if (FORM_NAMES.includes(currentPath)) {
          if (e.key.toLowerCase() === "n") {
            setModal({ name: currentPath });
          }
        }
        if (currentPath === "finances") {
          if (e.key.toLowerCase() === "e" && !currModal) {
            setModal({ name: "euros" });
          } else if (e.key.toLowerCase() === "v" && !currModal) {
            setModal({ name: "transactions" });
          }
        }
      }
    };
    window.addEventListener("keypress", handleShorcuts);
    return () => window.removeEventListener("keypress", handleShorcuts);
  }, [currentPath, currModal]);

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
    <ReduxProvider>
      <GlobalContext.Provider
        value={{
          currCarType,
          setCurrCar,
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
              <DeleteModal
                name={modalDelete.name}
                url={modalDelete.url}
                method={modalDelete.method}
              />
            )}
            {currModal.name === "clients" && (
              <ClientForm edit={currModal.edit} data={currModal.data} />
            )}
            {currModal.name === "cars" && (
              <CarForm edit={currModal.edit} data={currModal.data} />
            )}
            {currModal.name === "licences" && (
              <LicenceForm edit={currModal.edit} data={currModal.data} />
            )}
            {currModal.name === "procurations" && (
              <ProcurationForm edit={currModal.edit} data={currModal.data} />
            )}
            {currModal.name === "papers" && (
              <PaperForm edit={currModal.edit} data={currModal.data} />
            )}
            {currModal.name === "transactions" && <TransactionForm />}
            {currModal.name === "euros" && <EuroTransferForm />}
            {currModal.name === "expenses" && (
              <ExpenseForm edit={currModal.edit} data={currModal.data} />
            )}
            {currModal.name === "sell" && (
              <SellForm
                edit={currModal.edit}
                data={currModal.data}
                id={currModal.data.id}
              />
            )}

            {addUpModal === "cars" && (
              <>
                <div
                  className="background-black"
                  style={{ zIndex: "1000000" }}
                />
                <CarForm />
              </>
            )}

            {addUpModal === "clients" && (
              <>
                <div
                  className="background-black"
                  style={{ zIndex: "1000000" }}
                />
                <ClientForm />
              </>
            )}
            {addUpModal === "licences" && (
              <>
                <div
                  className="background-black"
                  style={{ zIndex: "1000000" }}
                />
                <LicenceForm />
              </>
            )}
            {warningModal && <WarningModal />}
            {currDocument.type === "clients" && <ClientDocument />}
            {currDocument.type === "licences" && <LicenceDocument />}
            {currDocument.type === "cars" && <CarDocument />}
            {currDocument.type === "expenses" && <ExpenseDocument />}
            {currNotification.status && (
              <div
                style={{
                  position: "fixed",
                  zIndex: "1500000",
                  right: "2rem",
                  top: "2rem",
                }}
              >
                <Toaster type={currNotification.status}>
                  {currNotification.message}
                </Toaster>
              </div>
            )}
            <NextNProgress color="red" />
            {insertPage()}
          </ThemeProvider>
        </main>
      </GlobalContext.Provider>
    </ReduxProvider>
  );
}

export default MyApp;

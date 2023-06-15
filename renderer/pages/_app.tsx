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

const inter = Inter({
  src: [
    { path: "../public/font/static/Inter-Regular.ttf", weight: "400" },
    { path: "../public/font/static/Inter-Medium.ttf", weight: "500" },
    { path: "../public/font/static/Inter-Bold.ttf", weight: "700" },
  ],
});

export const GlobalContext = createContext<any>("");

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [currModal, setModal] = useState("");
  const [currNotification, setNotification] = useState<{
    status: string;
    message: string;
  }>({ status: "", message: "" });
  const [currDocument, setDocument] = useState<{
    type: string;
    document?: any;
  }>({ type: "" });

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
        currNotification,
        setNotification,
        currDocument,
        setDocument,
      }}
    >
      <main className={inter.className}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {currDocument.type === "clients" && (
            <ClientDocument document={currDocument.document} />
          )}
          {currDocument.type === "licences" && (
            <LicenceDocument document={currDocument.document} />
          )}
          {currDocument.type === "cars" && (
            <CarDocument document={currDocument.document} />
          )}
          {insertPage()}
        </ThemeProvider>
      </main>
    </GlobalContext.Provider>
  );
}

export default MyApp;

import Inter from "next/font/local";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "styles/GlobalStyle";
import theme from "styles/theme";

import ReduxProvider from "contexts/ReduxProvider";
import Layout from "layout";
import ModalsManager from "layout/ModalsManager";

const inter = Inter({
  src: [
    { path: "../public/font/static/Inter-Regular.ttf", weight: "400" },
    { path: "../public/font/static/Inter-Medium.ttf", weight: "500" },
    { path: "../public/font/static/Inter-Bold.ttf", weight: "700" },
  ],
});

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const currentPath = router.asPath.split("/")[1];

  const insertPage = () => {
    if (currentPath.includes("login") || currentPath.includes("home")) {
      return <Component {...pageProps} />;
    }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };

  return (
    <ReduxProvider>
      <main className={inter.className}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <NextNProgress color="#00d8d6" />
          <ToastContainer />
          <ModalsManager />

          {insertPage()}
        </ThemeProvider>
      </main>
    </ReduxProvider>
  );
};

export default App;

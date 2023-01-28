import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Inter from "@next/font/local";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "styles/GlobalStyle";
import theme from "styles/theme";
import Layout from "components/Layout/Layout";

const inter = Inter({
  src: [
    { path: "../public/font/static/Inter-Regular.ttf", weight: "400" },
    { path: "../public/font/static/Inter-Medium.ttf", weight: "500" },
    { path: "../public/font/static/Inter-Bold.ttf", weight: "700" },
  ],
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

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
    <main className={inter.className}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {insertPage()}
      </ThemeProvider>
    </main>
  );
}

export default MyApp;

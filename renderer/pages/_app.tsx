import { AppProps } from "next/app";
import Inter from "@next/font/local";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "styles/GlobalStyle";
import theme from "styles/theme";

const inter = Inter({ src: "../public/font/Inter-VariableFont_slnt,wght.ttf" });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  );
}

export default MyApp;

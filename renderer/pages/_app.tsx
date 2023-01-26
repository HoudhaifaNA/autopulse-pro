import { AppProps } from "next/app";
import Inter from "@next/font/local";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "styles/GlobalStyle";
import theme from "styles/theme";

const inter = Inter({
  src: [
    { path: "../public/font/static/Inter-Regular.ttf", weight: "400" },
    { path: "../public/font/static/Inter-Medium.ttf", weight: "500" },
    { path: "../public/font/static/Inter-Bold.ttf", weight: "700" },
  ],
});

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

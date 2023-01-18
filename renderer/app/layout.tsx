import { ReactNode } from "react";
import Inter from "@next/font/local";

import Registry from "app/Registry";
import ThemeClientProvider from "styles/ThemeProvider";
interface LayoutProps {
  children: ReactNode;
}

const inter = Inter({ src: "../public/font/Inter-VariableFont_slnt,wght.ttf" });

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html className={inter.className}>
      <head />
      <body>
        <Registry>
          <ThemeClientProvider>{children}</ThemeClientProvider>
        </Registry>
      </body>
    </html>
  );
}

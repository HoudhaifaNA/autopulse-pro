import { ReactNode } from "react";
import Registry from "app/Registry";

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html>
      <head />
      <body>
        <Registry>{children}</Registry>
      </body>
    </html>
  );
}

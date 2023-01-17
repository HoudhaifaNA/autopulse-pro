import RootStyleRegistry from "app/RootStyleRegistry";
// import ThemeProvider from "styles/ThemeProvider";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html>
      <head />
      <body>
        <RootStyleRegistry>
          {children}
          {/* <ThemeProvider></ThemeProvider> */}
        </RootStyleRegistry>
      </body>
    </html>
  );
}

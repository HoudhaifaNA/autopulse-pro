import { ReactNode, useState } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export function useStyledComponentsRegistry() {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  const styledComponentsFlushEffect = () => {
    const styles = styledComponentsStyleSheet.getStyleElement();

    /*@ts-ignore */
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  };

  const StyledComponentsRegistry = ({ children }: { children: ReactNode }) => (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );

  return [StyledComponentsRegistry, styledComponentsFlushEffect] as const;
}

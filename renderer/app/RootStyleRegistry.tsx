"use client";

import { useServerInsertedHTML } from "next/navigation";
import { useStyledComponentsRegistry } from "../lib/StyledComponents";

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [StyledComponentsRegistry, styledComponentsFlushEffect] =
    useStyledComponentsRegistry();

  useServerInsertedHTML(() => {
    return <>{styledComponentsFlushEffect()}</>;
  });

  return (
    <StyledComponentsRegistry>
      <>{children}</>
    </StyledComponentsRegistry>
  );
}

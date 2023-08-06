import { useContext } from "react";

const useCtx = <T,>(context: React.Context<T>) => {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error("Context must not be null");
  }

  return ctx;
};

export default useCtx;

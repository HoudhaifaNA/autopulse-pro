import { useEffect, useState, RefObject } from "react";

const useClickOutside = (ref: RefObject<HTMLElement>) => {
  const [isFocused, setFocus] = useState(false);

  const onClickOutside = (e: MouseEvent) => {
    const { current } = ref;
    const target = e.target as Node | null;
    if (current && !current.contains(target)) setFocus(false);
  };

  useEffect(() => {
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  return [isFocused, setFocus] as const;
};

export default useClickOutside;

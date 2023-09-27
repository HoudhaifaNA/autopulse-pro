import { useEffect, useState } from "react";

const useClickOutside = (targetId: string, togglerId: string, defaultState: boolean = true) => {
  const [isOutside, setIsOutside] = useState(defaultState);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetElement = document.getElementById(targetId);
      const togglerElement = document.getElementById(togglerId);

      const isChild = targetElement?.contains(event.target as Node);
      const isTogglerElement = event.target === togglerElement || togglerElement?.contains(event.target as Node);
      const isMantineBtn = (event.target as Element).classList?.contains("mantine-UnstyledButton-root");

      if (!isChild && !isTogglerElement && !isMantineBtn) {
        setIsOutside(true);
      } else if (isChild) {
        setIsOutside(false);
      }
    };

    const handleDocumentClick = (event: MouseEvent) => {
      handleClickOutside(event);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [targetId, togglerId]);

  return [isOutside, setIsOutside] as const;
};

export default useClickOutside;

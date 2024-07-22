import { useEffect, useState } from "react";
import { useAppSelector } from "store";

const useBlur = () => {
  const { defaultBlur } = useAppSelector((state) => state.user.user);
  const [isBlurred, toggleBlur] = useState(defaultBlur);
  const blurrableTableCells = document.querySelectorAll(".blurrable");

  useEffect(() => {
    const handleBlurShortcut = (e: KeyboardEvent) => {
      if ((e.target as Element)?.tagName !== "INPUT") {
        if (e.key.toLowerCase() === "h") {
          toggleBlur((isBlurred) => !isBlurred);
        }
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const blurrableTd = target.closest(".blurrable");

      if (blurrableTd) {
        e.preventDefault();
        blurrableTd.classList.toggle("blurred");
      }
    };

    window.addEventListener("keypress", handleBlurShortcut);
    window.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("keypress", handleBlurShortcut);
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    blurrableTableCells.forEach((cell) => {
      if (isBlurred && !cell.classList.contains("blurred")) {
        cell.classList.add("blurred");
      }
      if (!isBlurred && cell.classList.contains("blurred")) {
        cell.classList.remove("blurred");
      }
    });
  }, [isBlurred]);

  return isBlurred;
};

export default useBlur;

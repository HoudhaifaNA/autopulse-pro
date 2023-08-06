import { ReactNode, useContext, useEffect, useState } from "react";
import * as S from "components/Table/Table.styled";
import { GlobalContext } from "pages/_app";

export const TableWrapper = S.TableWrapper;
export const Table = S.Table;
export const TableRow = S.TableRow;

interface TabelCellProps {
  blurrable?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export const TableHeader = ({ children }: { children: ReactNode }) => {
  return <thead>{children}</thead>;
};
export const TableBody = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "h") {
        let isThereBlur = document.querySelectorAll(".blurred").length > 0;
        document.querySelectorAll(".blurrable-true").forEach((cell) => {
          if (isThereBlur) {
            cell.classList.remove("blurred");
          } else {
            cell.classList.add("blurred");
          }
        });
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return <tbody>{children}</tbody>;
};

export const TableHeaderCell = ({ children, onClick }: TabelCellProps) => {
  return (
    <S.TableHeaderCell onClick={onClick}>
      <div>{children}</div>
    </S.TableHeaderCell>
  );
};

export const TableCell = (props: TabelCellProps) => {
  const { blurrable = true, onClick, children } = props;
  const [blurred, setBlur] = useState(blurrable);

  return (
    <S.TableCell
      className={`tb-cell blurrable-${blurrable} ${blurred ? "blurred" : ""}`}
      onClick={() => onClick && onClick()}
      onContextMenu={() => blurrable && setBlur(!blurred)}
    >
      <div>{children}</div>
    </S.TableCell>
  );
};

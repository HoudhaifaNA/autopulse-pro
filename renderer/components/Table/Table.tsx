import { ReactNode } from "react";
import * as S from "components/Table/TableStyled";

export const TableWrapper = S.TableWrapper;
export const Table = S.Table;
export const TableRow = S.TableRow;
export const TableRowActions = S.TableRowActions;

export const TableHeader = ({ children }: { children: ReactNode }) => {
  return <thead>{children}</thead>;
};
export const TableBody = ({ children }: { children: ReactNode }) => {
  return <tbody>{children}</tbody>;
};

export const TableHeaderCell = ({ children }: { children?: ReactNode }) => {
  return (
    <S.TableHeaderCell>
      <div>{children}</div>
    </S.TableHeaderCell>
  );
};
export const TableCell = ({ children }: { children: ReactNode }) => {
  return (
    <S.TableCell>
      <div>{children}</div>
    </S.TableCell>
  );
};

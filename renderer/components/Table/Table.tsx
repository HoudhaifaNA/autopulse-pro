import { ReactNode, ComponentPropsWithoutRef } from "react";

import * as S from "components/Table/Table.styled";
import { Body2 } from "styles/Typography";

interface TableHeaderCellProps extends ComponentPropsWithoutRef<"th"> {
  children: ReactNode;
}
interface TableCellProps extends ComponentPropsWithoutRef<"td"> {
  children: ReactNode;
}

export const TableWrapper = S.TableWrapper;
export const Table = S.Table;
export const TableHead = S.TableHead;
export const TableBody = S.TableBody;
export const TableRow = S.TableRow;

export const TableHeaderCell = ({ children, ...props }: TableHeaderCellProps) => {
  return (
    <S.TableHeaderCell {...props}>
      <S.TableCellFlexWrapper>{children}</S.TableCellFlexWrapper>
    </S.TableHeaderCell>
  );
};

export const TableCell = ({ children, ...props }: TableCellProps) => {
  const PATTERN = /_(RD|GR)/g;
  const [content, colorClass] = typeof children === "string" ? children.split(PATTERN) : [children, ""];

  const renderChildren = () => {
    if (typeof children === "string" || typeof children === "number") {
      return <Body2 className={colorClass}>{content}</Body2>;
    }
    return children;
  };

  return (
    <S.TableCell {...props}>
      <S.TableCellFlexWrapper>{renderChildren()}</S.TableCellFlexWrapper>
    </S.TableCell>
  );
};

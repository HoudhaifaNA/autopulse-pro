import { ReactNode, ComponentPropsWithoutRef } from "react";

import * as S from "components/Table/styles";
import { Body2 } from "styles/Typography";
import { useAppSelector } from "store";
import useColoredText from "hooks/useColoredText";

interface TableHeaderCellProps extends ComponentPropsWithoutRef<"th"> {
  children: ReactNode;
}
interface TableCellProps extends ComponentPropsWithoutRef<"td"> {
  children?: ReactNode;
  blurrable?: boolean;
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

export const TableCell = ({ children, blurrable, ...props }: TableCellProps) => {
  const { defaultBlur } = useAppSelector((state) => state.user.user);
  let className = blurrable ? "blurrable" : "";
  if (blurrable && defaultBlur) className += " blurred";

  const renderChildren = () => {
    if (typeof children === "string" || typeof children === "number") {
      const [content, colorClass] = useColoredText(children.toString());
      return <Body2 className={colorClass}>{content}</Body2>;
    }
    return children;
  };

  return (
    <S.TableCell className={className} {...props}>
      <S.TableCellFlexWrapper>{renderChildren()}</S.TableCellFlexWrapper>
    </S.TableCell>
  );
};

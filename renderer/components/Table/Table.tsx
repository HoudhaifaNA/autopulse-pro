import { ReactNode } from "react";
import * as S from "components/Table/Table.styled";
import { Body2 } from "styles/Typography";
import Icon from "components/Icon/Icon";

interface TableHeaderProps {
  sortable?: boolean;
  text: string;
}

export const TableHeader = ({ columns }: { columns: TableHeaderProps[] }) => {
  return (
    <S.TableHeader>
      <S.TableCell>
        <input type="checkbox" />
      </S.TableCell>
      {columns.map(({ text, sortable }) => {
        return (
          <S.TableCell key={text}>
            <Body2>{text}</Body2>
            {sortable && <Icon icon="expand" size="1.6rem" />}
          </S.TableCell>
        );
      })}
    </S.TableHeader>
  );
};

export const TableRow = ({ children }: { children: ReactNode[] }) => {
  return (
    <S.TableRow>
      <S.TableCell>
        <input type="checkbox" />
      </S.TableCell>
      {children.map((el) => {
        return <S.TableCell>{el}</S.TableCell>;
      })}
      <S.TableCell>
        <Icon icon="more_vert" size="1.6rem" />
      </S.TableCell>
    </S.TableRow>
  );
};

const Table = ({
  HeaderItems,
  children,
}: {
  HeaderItems: TableHeaderProps[];
  children: ReactNode;
}) => {
  return (
    <S.TableWrapper>
      <TableHeader columns={HeaderItems} />
      {children}
    </S.TableWrapper>
  );
};

export default Table;

import Badge from "components/Badge/Badge";
import Icon from "components/Icon/Icon";
import * as S from "components/Table/Table.styled";
import { ReactNode } from "react";
import { Body2 } from "styles/Typography";

interface TableHeaderProps {
  sortable?: boolean;
  text: string;
}

export const TableHeader = ({ columns }: { columns: TableHeaderProps[] }) => {
  return (
    <S.TableHeader>
      <S.TableContent>
        <input type="checkbox" />
      </S.TableContent>
      {columns.map(({ text, sortable }) => {
        return (
          <S.TableContent key={text}>
            <Body2>{text}</Body2>
            {sortable && <Icon icon="expand" size="1.6rem" />}
          </S.TableContent>
        );
      })}
      <S.TableContent>
        <Icon icon="more_vert" size="1.6rem" />
      </S.TableContent>
    </S.TableHeader>
  );
};

const Table = ({ HeaderItems }: { HeaderItems: TableHeaderProps[] }) => {
  return (
    <S.TableWrapper>
      <TableHeader columns={HeaderItems} />
      <S.TableItem></S.TableItem>
    </S.TableWrapper>
  );
};

export default Table;

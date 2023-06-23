import dayjs from "dayjs";

import { Body2 } from "styles/Typography";

import Badge, { BadgeProps } from "components/Badge/Badge";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import {
  TableWrapper,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "components/Table/Table";
import { useContext, useState } from "react";
import { GlobalContext } from "pages/_app";

interface IProps {
  expenses: any[];
}

const TB_HEADER_DATA = [
  { text: "Indice", sortable: false },
  { text: "Date créée", sortable: true },
  { text: "Raison", sortable: false },
  { text: "Montant", sortable: true },
  { text: "Date de transfert", sortable: true },
];

const ExpensesTable = ({ expenses }: IProps) => {
  const { setDocument, toggleModalDelete } = useContext(GlobalContext);
  const [ids, addIds] = useState<number[]>([]);
  const checkRow = (id: number) => {
    if (ids.indexOf(id) === -1) {
      addIds((ids) => [...ids, id]);
    } else {
      addIds((ids) => ids.filter((el) => el !== id));
    }
  };

  const checkAllRows = () => {
    if (expenses.length === ids.length) {
      addIds([]);
    } else {
      expenses.forEach(({ id }) => {
        if (ids.indexOf(id) === -1) addIds((prevIds) => [...prevIds, id]);
      });
    }
  };

  const handleDeleteAll = async () => {
    if (expenses.length === ids.length) {
      toggleModalDelete({
        name: `${ids.length} dépenses`,
        url: `/expenses/`,
      });
    } else if (ids.length > 0) {
      toggleModalDelete({
        name: `${ids.length} dépenses`,
        url: `/expenses/${ids.join(",")}`,
      });
    }

    addIds([]);
  };

  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <Checkbox
                isChecked={expenses.length === ids.length}
                check={checkAllRows}
              />
            </TableHeaderCell>
            {TB_HEADER_DATA.map((el) => {
              return (
                <TableHeaderCell key={el.text}>
                  <Body2>{el.text}</Body2>
                  {el.sortable && <Icon icon="expand" size="1.8rem" />}
                </TableHeaderCell>
              );
            })}
            <TableHeaderCell onClick={handleDeleteAll}>
              <Icon icon="delete" size="1.8rem" />
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((licence, ind) => {
            const { id, created_at, raison, amount, transferred_at } = licence;
            const onDelete = async () => {
              toggleModalDelete({
                name: `${raison} avec ${amount}.00 DA`,
                url: `/expenses/${id}`,
              });
              return addIds([]);
            };
            return (
              <TableRow key={id}>
                <TableCell blurrable={false}>
                  <Checkbox
                    isChecked={!(ids.indexOf(id) === -1)}
                    check={() => checkRow(id)}
                  />
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{ind + 1}</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{dayjs(created_at).format("DD-MM-YYYY")}</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{raison}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{amount}.00 DA</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{dayjs(transferred_at).format("DD-MM-YYYY")}</Body2>
                </TableCell>
                <TableCell blurrable={false} onClick={onDelete}>
                  <Icon icon="delete" size="1.8rem" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default ExpensesTable;

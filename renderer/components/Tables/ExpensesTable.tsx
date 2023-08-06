import { useContext, useState } from "react";

import { Body2 } from "styles/Typography";
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
import { GlobalContext } from "pages/_app";
import formatPrice from "utils/formatPrice";
interface IProps {
  expenses: any[];
}
const TB_HEADER_DATA = [
  { text: "Indice", sortable: false },
  { text: "Date", sortable: true },
  { text: "Nombre de dépenses", sortable: true },
  { text: "Total", sortable: true },
];
const ExpensesTable = ({ expenses }: IProps) => {
  const { toggleModalDelete, setDocument } = useContext(GlobalContext);
  const [dates, addDate] = useState<string[]>([]);
  const checkRow = (date: string) => {
    if (dates.indexOf(date) === -1) {
      addDate((prevDates) => [...prevDates, date]);
    } else {
      addDate((prevDates) => prevDates.filter((el) => el !== date));
    }
  };
  const checkAllRows = () => {
    if (expenses.length === dates.length) {
      addDate([]);
    } else {
      expenses.forEach(({ transferred_at }) => {
        if (dates.indexOf(transferred_at) === -1) {
          addDate((prevDates) => [...prevDates, transferred_at]);
        }
      });
    }
  };
  const handleDeleteAll = async () => {
    if (dates.length > 0) {
      toggleModalDelete({
        name: `les dépenses de ${dates.length} dates`,
        url: `/expenses/date/${dates.join(",")}`,
      });
    }
    addDate([]);
  };
  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <Checkbox
                isChecked={expenses.length === dates.length}
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
          {expenses.map((expense, ind) => {
            const { dayExpenses, total, transferred_at } = expense;
            const onDelete = async () => {
              toggleModalDelete({
                name: `les dépenses du ${transferred_at}`,
                url: `/expenses/date/${transferred_at}`,
              });
              return addDate([]);
            };
            return (
              <TableRow key={transferred_at}>
                <TableCell blurrable={false}>
                  <Checkbox
                    isChecked={dates.indexOf(transferred_at) !== -1}
                    check={() => checkRow(transferred_at)}
                  />
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{ind + 1}</Body2>
                </TableCell>
                <TableCell
                  onClick={() => {
                    setDocument({
                      type: "expenses",
                      id: transferred_at,
                    });
                  }}
                >
                  <Body2>{transferred_at}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{dayExpenses}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{formatPrice(total, "DA")}</Body2>
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

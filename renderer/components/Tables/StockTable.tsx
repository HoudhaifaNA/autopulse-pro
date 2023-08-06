import { Body2 } from "styles/Typography";

import {
  TableWrapper,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "components/Table/Table";

interface IProps {
  stock: any[];
}

const TB_HEADER_DATA = [
  { text: "Indice", sortable: false },
  { text: "Nom" },
  { text: "Acheter", sortable: false },
  { text: "Sold", sortable: false },
  { text: "Stock", sortable: false },
];

const StockTable = ({ stock }: IProps) => {
  const totals = stock.reduce(
    (accumulator, currentItem) => {
      accumulator.bought_number += currentItem.bought_number;
      accumulator.sold_number += currentItem.sold_number;
      accumulator.in_stock += currentItem.in_stock;
      return accumulator;
    },
    { bought_number: 0, sold_number: 0, in_stock: 0 }
  );

  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            {TB_HEADER_DATA.map((el) => {
              return (
                <TableHeaderCell key={el.text}>
                  <Body2>{el.text}</Body2>
                </TableHeaderCell>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell blurrable={false}>
              <Body2 style={{ paddingLeft: "1rem" }}>--</Body2>
            </TableCell>
            <TableCell blurrable={false}>
              <Body2>Total de stock</Body2>
            </TableCell>
            <TableCell>
              <Body2>{totals.bought_number}</Body2>
            </TableCell>
            <TableCell>
              <Body2>{totals.sold_number}</Body2>
            </TableCell>
            <TableCell>
              <Body2>{totals.in_stock}</Body2>
            </TableCell>
          </TableRow>
          {stock.map((car, ind) => {
            const { name, bought_number, sold_number, in_stock } = car;

            return (
              <TableRow key={ind}>
                <TableCell blurrable={false}>
                  <Body2 style={{ paddingLeft: "1rem" }}>{ind + 1}</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{name}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{bought_number}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{sold_number}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{in_stock}</Body2>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default StockTable;

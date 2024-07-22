import * as T from "components/Table";
import TableHeaderRow from "components/TableHeaderRow";

import { TB_HEADER_DATA } from "./constants";
import { GetStockResponse } from "types";

interface StockTableProps {
  stock: GetStockResponse;
}

const StockTable = ({ stock }: StockTableProps) => {
  const { total, car_stock } = stock;

  const renderStock = () => {
    return car_stock.map((carModel, ind) => {
      const { name, bought_number, sold_number, in_stock } = carModel;

      return (
        <T.TableRow key={name}>
          <T.TableCell>{ind + 2}</T.TableCell>
          <T.TableCell>{name}</T.TableCell>
          <T.TableCell blurrable>{bought_number}</T.TableCell>
          <T.TableCell blurrable>{sold_number}</T.TableCell>
          <T.TableCell blurrable>{in_stock}</T.TableCell>
        </T.TableRow>
      );
    });
  };

  return (
    <T.TableWrapper>
      <T.Table>
        <T.TableHead>
          <T.TableRow>
            <TableHeaderRow cells={TB_HEADER_DATA} resource="stock" />
          </T.TableRow>
        </T.TableHead>
        <T.TableBody>
          <T.TableRow>
            <T.TableCell>{1}</T.TableCell>
            <T.TableCell>{total.name}</T.TableCell>
            <T.TableCell blurrable>{total.bought_number}</T.TableCell>
            <T.TableCell blurrable>{total.sold_number}</T.TableCell>
            <T.TableCell blurrable>{total.in_stock}</T.TableCell>
          </T.TableRow>
          {renderStock()}
        </T.TableBody>
      </T.Table>
    </T.TableWrapper>
  );
};

export default StockTable;

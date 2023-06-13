import dayjs from "dayjs";

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

interface IProps {
  cars: any[];
}

const TB_HEADER_DATA = [
  { text: "Date créée", sortable: true },
  { text: "Nom", sortable: true },
  { text: "Matricule", sortable: false },
  { text: "Vendeur", sortable: true },
  { text: "Prix", sortable: true },
  { text: "Depenses", sortable: true },
  { text: "Total", sortable: true },
  { text: "Categorie", sortable: false },
  { text: "Achateur", sortable: true },
  { text: "Pr. vente", sortable: true },
  { text: "Intérêt", sortable: true },
];

const CarsTable = ({ cars }: IProps) => {
  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <Checkbox />
            </TableHeaderCell>
            {TB_HEADER_DATA.map((el) => {
              return (
                <TableHeaderCell key={el.text}>
                  <Body2>{el.text}</Body2>
                  {el.sortable && <Icon icon="expand" size="1.8rem" />}
                </TableHeaderCell>
              );
            })}
            <TableHeaderCell>
              <Icon icon="more_vert" size="1.8rem" />
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cars.map((car) => {
            const {
              id,
              created_at,
              name,
              registrationNumber,
              seller,
              purchasingPrice,
              totalExpensesCost,
              totalCost,
              type,
              buyer,
              soldPrice,
              profit,
            } = car;
            return (
              <TableRow key={id}>
                <TableCell blurrable={false}>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Body2>{dayjs(created_at).format("DD-MM-YYYY")}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{name}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{registrationNumber}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{seller}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{purchasingPrice.toLocaleString()}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{totalExpensesCost.toLocaleString()}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{totalCost.toLocaleString()}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{type}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{buyer ? buyer : "--"}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{soldPrice ? soldPrice.toLocaleString() : "--"}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{profit ? profit.toLocaleString() : "--"}</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Icon icon="more_vert" size="1.8rem" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default CarsTable;

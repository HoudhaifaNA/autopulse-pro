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

interface IProps {
  clients: any[];
}

const TB_HEADER_DATA = [
  { text: "Date créée", sortable: true },
  { text: "Nom", sortable: true },
  { text: "Numéro de téléphone", sortable: false },
  { text: "Solde du compte", sortable: true },
  { text: "Statue de payment", sortable: false },
];

const clientStatus = (balance: number) => {
  let status: string = "";
  let color: BadgeProps["type"] = "success";
  if (balance < 0) {
    status = "Débiteur";
    color = "error";
  }
  if (balance === 0) {
    status = "Équilibré";
    color = "success";
  }
  if (balance > 0) {
    status = "Créancier";
    color = "warning";
  }
  return (
    <TableCell>
      <Badge type={color}>{status}</Badge>
    </TableCell>
  );
};

const ClientsTable = ({ clients }: IProps) => {
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
          {clients.map((client) => {
            return (
              <TableRow key={client.id}>
                <TableCell blurrable={false}>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Body2>{dayjs(client.created_at).format("DD-MM-YYYY")}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{client.fullName}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{client.phoneNumber}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{Math.abs(client.balance).toLocaleString()}</Body2>
                </TableCell>
                {clientStatus(client.balance)}
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

export default ClientsTable;

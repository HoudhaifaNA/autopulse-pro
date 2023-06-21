import { useContext } from "react";
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
import { useState } from "react";
import API from "utils/API";
import { GlobalContext } from "pages/_app";

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
  return <Badge type={color}>{status}</Badge>;
};

const ClientsTable = ({ clients }: IProps) => {
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
    if (clients.length === ids.length) {
      addIds([]);
    } else {
      clients.forEach(({ id }) => {
        if (ids.indexOf(id) === -1) addIds((prevIds) => [...prevIds, id]);
      });
    }
  };

  const handleDeleteAll = () => {
    if (clients.length === ids.length) {
      toggleModalDelete({
        name: `${ids.length} client`,
        url: `/clients/`,
      });
    } else if (ids.length > 0) {
      toggleModalDelete({
        name: `${ids.length} client`,
        url: `/clients/${ids.join(",")}`,
      });
    }
    return addIds([]);
  };
  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <Checkbox
                isChecked={clients.length === ids.length}
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
          {clients.map((client) => {
            const { id, created_at, fullName, phoneNumber, balance } = client;
            const onDelete = () => {
              toggleModalDelete({
                name: `${fullName} et sa transactions (voitures, licences, transferts d'argent)`,
                url: `/clients/${id}`,
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
                  <Body2>{dayjs(created_at).format("DD-MM-YYYY")}</Body2>
                </TableCell>
                <TableCell
                  blurrable={false}
                  onClick={() => {
                    setDocument({ type: "clients", id });
                  }}
                >
                  <Body2>{fullName}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{phoneNumber}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{Math.abs(balance).toLocaleString()}.00 DA</Body2>
                </TableCell>
                <TableCell>{clientStatus(balance)}</TableCell>
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

export default ClientsTable;

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
  const { setDocument } = useContext(GlobalContext);
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

  const handleDeleteAll = async () => {
    if (clients.length === ids.length) {
      return await API.delete(`/clients/`);
    } else if (ids.length > 0) {
      ids.forEach(async (id) => {
        await API.delete(`/clients/${id}`);
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
            const onDelete = async () => {
              await API.delete(`/clients/${id}`);
              addIds([]);
            };
            return (
              <TableRow
                key={id}
                onContextMenu={() =>
                  setDocument({ type: "clients", document: client })
                }
              >
                <TableCell blurrable={false}>
                  <Checkbox
                    isChecked={!(ids.indexOf(id) === -1)}
                    check={() => checkRow(id)}
                  />
                </TableCell>
                <TableCell>
                  <Body2>{dayjs(created_at).format("DD-MM-YYYY")}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{fullName}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{phoneNumber}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{Math.abs(balance).toLocaleString()}</Body2>
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

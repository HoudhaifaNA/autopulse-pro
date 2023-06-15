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

interface IProps {
  licences: any[];
}

const TB_HEADER_DATA = [
  { text: "Date créée", sortable: true },
  { text: "Vendeur", sortable: true },
  { text: "Moudjahid", sortable: true },
  { text: "Wilaya", sortable: false },
  { text: "Prix", sortable: true },
  { text: "Statut", sortable: false },
  { text: "Date d'expiration", sortable: true },
];

const licenceStatus = (isValid: string) => {
  let status: string = "";
  let color: BadgeProps["type"] = "success";
  if (isValid === "true") {
    status = "Active";
    color = "success";
  }
  if (isValid === "false") {
    status = "Invalide";
    color = "error";
  }
  return <Badge type={color}>{status}</Badge>;
};

const LicencesTable = ({ licences }: IProps) => {
  const [ids, addIds] = useState<number[]>([]);
  const checkRow = (id: number) => {
    if (ids.indexOf(id) === -1) {
      addIds((ids) => [...ids, id]);
    } else {
      addIds((ids) => ids.filter((el) => el !== id));
    }
  };

  const checkAllRows = () => {
    if (licences.length === ids.length) {
      addIds([]);
    } else {
      licences.forEach(({ id }) => {
        if (ids.indexOf(id) === -1) addIds((prevIds) => [...prevIds, id]);
      });
    }
  };

  const handleDeleteAll = async () => {
    if (licences.length === ids.length) {
      return await API.delete(`/licences/`);
    } else if (ids.length > 0) {
      ids.forEach(async (id) => {
        await API.delete(`/licences/${id}`);
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
                isChecked={licences.length === ids.length}
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
          {licences.map((licence) => {
            const {
              id,
              created_at,
              seller,
              moudjahid,
              wilaya,
              price,
              isValid,
              validUntil,
            } = licence;
            const onDelete = async () => {
              await API.delete(`/licences/${id}`);
              addIds([]);
            };
            return (
              <TableRow key={id}>
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
                  <Body2>{seller}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{moudjahid}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{wilaya}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{price.toLocaleString()}</Body2>
                </TableCell>
                <TableCell>{licenceStatus(isValid)}</TableCell>
                <TableCell>
                  <Body2>{dayjs(validUntil).format("DD-MM-YYYY")}</Body2>
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

export default LicencesTable;

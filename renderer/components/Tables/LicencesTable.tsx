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
            return (
              <TableRow key={id}>
                <TableCell blurrable={false}>
                  <Checkbox />
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

export default LicencesTable;

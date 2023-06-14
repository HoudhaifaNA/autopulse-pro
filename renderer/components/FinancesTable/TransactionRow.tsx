import dayjs from "dayjs";

import { Body2 } from "styles/Typography";

import { TableCell, TableRow } from "components/Table/Table";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import Badge from "components/Badge/Badge";

const TransactionRow = ({ transaction }: { transaction: any }) => {
  const { date, client, info2, total, direction } = transaction;
  const badgeStatus = direction === "sortante" ? "error" : "success";

  return (
    <>
      <TableRow>
        <TableCell blurrable={false}>
          <Checkbox />
        </TableCell>
        <TableCell>
          <Body2>{dayjs(date).format("DD-MM-YYYY")}</Body2>
        </TableCell>
        <TableCell>
          <Body2>{client}</Body2>
        </TableCell>
        <TableCell>
          <Body2>{info2}</Body2>
        </TableCell>
        <TableCell>
          <Badge type={badgeStatus}>{direction}</Badge>
        </TableCell>
        <TableCell>
          <Body2>{total.toLocaleString()}</Body2>
        </TableCell>
        <TableCell blurrable={false}>
          <Icon icon="more_vert" size="1.8rem" />
        </TableCell>
      </TableRow>
    </>
  );
};

export default TransactionRow;

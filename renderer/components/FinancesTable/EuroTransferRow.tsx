import dayjs from "dayjs";

import { Body2 } from "styles/Typography";

import { TableCell, TableRow } from "components/Table/Table";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import Badge from "components/Badge/Badge";

const EuroTransferRow = ({ transaction }: { transaction: any }) => {
  const { id, date, client, method, eurosAmount, euroPrice, total, direction } =
    transaction;
  const badgeStatus = direction === "sortante" ? "error" : "success";

  return (
    <TableRow key={id}>
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
        <Body2>{method}</Body2>
      </TableCell>
      <TableCell>
        <Badge type={badgeStatus}>{direction}</Badge>
      </TableCell>
      <TableCell>
        <Body2>{eurosAmount.toLocaleString()}</Body2>
      </TableCell>
      <TableCell>
        <Body2>{euroPrice.toLocaleString()}</Body2>
      </TableCell>
      <TableCell>
        <Body2>{total.toLocaleString()}</Body2>
      </TableCell>
      <TableCell blurrable={false}>
        <Icon icon="more_vert" size="1.8rem" />
      </TableCell>
    </TableRow>
  );
};

export default EuroTransferRow;

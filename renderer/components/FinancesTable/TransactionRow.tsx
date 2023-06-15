import dayjs from "dayjs";

import { Body2 } from "styles/Typography";

import { TableCell, TableRow } from "components/Table/Table";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import Badge from "components/Badge/Badge";
import API from "utils/API";

const TransactionRow = ({
  transaction,
  checkState,
}: {
  transaction: any;
  checkState: any;
}) => {
  const { id, date, client, info2, total, direction } = transaction;
  const badgeStatus = direction === "sortante" ? "error" : "success";
  const { ids, addIds } = checkState;

  const checkRow = (id: number) => {
    if (ids.indexOf(id) === -1) {
      addIds((ids: any) => [...ids, id]);
    } else {
      addIds((ids: any) => ids.filter((el: any) => el !== id));
    }
  };

  const onDelete = async () => {
    await API.delete(`/transactions/${id}`);
    addIds([]);
  };
  return (
    <TableRow>
      <TableCell blurrable={false}>
        <Checkbox
          isChecked={!(ids.indexOf(id) === -1)}
          check={() => checkRow(id)}
        />
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
      <TableCell blurrable={false} onClick={onDelete}>
        <Icon icon="delete" size="1.8rem" />
      </TableCell>
    </TableRow>
  );
};

export default TransactionRow;

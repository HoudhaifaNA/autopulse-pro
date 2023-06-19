import { useContext } from "react";
import dayjs from "dayjs";

import { Body2 } from "styles/Typography";

import { TableCell, TableRow } from "components/Table/Table";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import Badge from "components/Badge/Badge";
import { GlobalContext } from "pages/_app";

const EuroTransferRow = ({
  transaction,
  checkState,
}: {
  transaction: any;
  checkState: any;
}) => {
  const { toggleModalDelete } = useContext(GlobalContext);

  const { id, date, client, method, eurosAmount, euroPrice, total, direction } =
    transaction;
  const badgeStatus = direction === "sortante" ? "error" : "success";
  const { ids, addIds } = checkState;

  const checkRow = (id: number) => {
    if (ids.indexOf(id) === -1) {
      addIds((ids: any) => [...ids, id]);
    } else {
      addIds((ids: any) => ids.filter((el: any) => el !== id));
    }
  };
  const onDelete = () => {
    toggleModalDelete({
      name: `cette transaction`,
      url: `/transactions/${id}`,
    });
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
      <TableCell blurrable={false} onClick={onDelete}>
        <Icon icon="delete" size="1.8rem" />
      </TableCell>
    </TableRow>
  );
};

export default EuroTransferRow;

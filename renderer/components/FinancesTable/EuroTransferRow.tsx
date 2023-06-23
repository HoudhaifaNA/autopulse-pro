import { useContext } from "react";
import dayjs from "dayjs";

import { Body2 } from "styles/Typography";

import { TableCell, TableRow } from "components/Table/Table";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import Badge from "components/Badge/Badge";
import { GlobalContext } from "pages/_app";

const EuroTransferRow = ({
  ind,
  transaction,
  checkState,
}: {
  ind: number;
  transaction: any;
  checkState: any;
}) => {
  const { toggleModalDelete, setDocument } = useContext(GlobalContext);

  const {
    id,
    date,
    client,
    clientId,
    method,
    eurosAmount,
    euroPrice,
    total,
    direction,
  } = transaction;
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
      <TableCell blurrable={false}>
        <Body2>{ind + 1}</Body2>
      </TableCell>
      <TableCell blurrable={false}>
        <Body2>{dayjs(date).format("DD-MM-YYYY")}</Body2>
      </TableCell>
      <TableCell
        blurrable={false}
        onClick={() => {
          setDocument({ type: "clients", id: clientId });
        }}
      >
        <Body2>{client}</Body2>
      </TableCell>
      <TableCell>
        <Body2>{method}</Body2>
      </TableCell>
      <TableCell blurrable={false}>
        <Badge type={badgeStatus}>{direction}</Badge>
      </TableCell>
      <TableCell>
        <Body2>{eurosAmount.toLocaleString()}.00 €</Body2>
      </TableCell>
      <TableCell>
        <Body2>{euroPrice.toLocaleString()}.00 DA</Body2>
      </TableCell>
      <TableCell>
        <Body2>{total.toLocaleString()}.00 DA</Body2>
      </TableCell>
      <TableCell blurrable={false} onClick={onDelete}>
        <Icon icon="delete" size="1.8rem" />
      </TableCell>
    </TableRow>
  );
};

export default EuroTransferRow;

import { Body2 } from "styles/Typography";

import { TableCell, TableRow } from "components/Table/Table";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import Badge from "components/Badge/Badge";

const EuroTransferRow = () => {
  return (
    <>
      <TableRow>
        <TableCell blurrable={false}>
          <Checkbox />
        </TableCell>
        <TableCell>
          <Body2>14/05/2016</Body2>
        </TableCell>
        <TableCell>
          <Body2>Ahmed Nadhir</Body2>
        </TableCell>
        <TableCell>
          <Body2>Chèques</Body2>
        </TableCell>
        <TableCell>
          <Badge type="error">Vendu</Badge>
        </TableCell>
        <TableCell>
          <Body2>800000.00</Body2>
        </TableCell>
        <TableCell>
          <Body2>220</Body2>
        </TableCell>
        <TableCell>
          <Body2>1450000.00</Body2>
        </TableCell>
        <TableCell blurrable={false}>
          <Icon icon="more_vert" size="1.8rem" />
        </TableCell>
      </TableRow>
    </>
  );
};

export default EuroTransferRow;

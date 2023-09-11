import { useDispatch } from "react-redux";

import Icon from "components/Icon/Icon";
import { TableHeaderCell } from "components/Table/Table";

import { setParam } from "store/reducers/resourceUrls";
import { Resources } from "types";
import { useAppSelector } from "store";

interface TableHeaderItem {
  title: string;
  sortable?: boolean;
  field?: string;
}

interface TableHeaderProps {
  cells: TableHeaderItem[];
  resource: Resources;
}

const TableHeaderRow = ({ cells, resource }: TableHeaderProps) => {
  const { orderBy } = useAppSelector((state) => state.resourceUrls[resource].params);

  const dispatch = useDispatch();

  const renderCells = () => {
    return cells.map(({ title, sortable, field }) => {
      const isDescending = `-${field}` === orderBy;
      const isSortable = sortable && field;

      const toggleSorting = () => {
        if (isSortable) dispatch(setParam({ resource, paramKey: "orderBy", paramValue: field }));
      };

      return (
        <TableHeaderCell key={title} onClick={toggleSorting}>
          {title}
          {sortable && <Icon icon="expand" size="1.8rem" isRotated={isDescending} />}
        </TableHeaderCell>
      );
    });
  };

  return <>{renderCells()}</>;
};

export default TableHeaderRow;

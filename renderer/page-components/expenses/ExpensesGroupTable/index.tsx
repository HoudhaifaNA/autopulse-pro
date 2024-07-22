import Link from "next/link";
import { useDispatch } from "react-redux";

import * as T from "components/Table";
import TableHeaderRow from "components/TableHeaderRow";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import { Body2 } from "styles/Typography";

import { useAppSelector } from "store";
import { clearSelectedItems, toggleItemId } from "store/reducers/selectedItems";
import formatFiatValue from "utils/formatFiatValue";
import { addModal } from "store/reducers/modals";
import formatDate from "utils/formatDate";
import { TB_HEADER_DATA } from "./constants";
import { AddModalPayload, GetExpensesDateGroupResponse } from "types";
import { retreiveExpensesGroupActions } from "store/actions/expenses";

interface ExpensesTableProps {
  data: GetExpensesDateGroupResponse;
}

const ICON_SIZE = "1.8rem";

const ExpensesGroupTable = ({ data }: ExpensesTableProps) => {
  const { expenses } = data;

  const { page, limit } = useAppSelector((state) => state.resourceUrls.expenses.params);
  const { selectedIds } = useAppSelector((state) => state.selectedItems);
  const dispatch = useDispatch();

  const pageExepnsesIds = expenses.map((expense) => expense.date_group);
  const isAllExpensesOnPageSelected = pageExepnsesIds.every((date_group) => selectedIds.includes(date_group));
  const startinRowIndex = (page - 1) * limit;

  const checkId = (date_group: number | string) => dispatch(toggleItemId(date_group));

  const checkAllOnPage = () => {
    if (isAllExpensesOnPageSelected) {
      dispatch(clearSelectedItems());
    } else {
      pageExepnsesIds.forEach((date_group) => !selectedIds.includes(date_group) && checkId(date_group));
    }
  };

  const toggleDeleteAll = () => {
    if (selectedIds.length > 0) {
      const ADD_DELETE_MODAL_PAYLOAD: AddModalPayload = {
        name: "delete",
        title: "Confirmer la suppression",
        message: `${selectedIds.length} dates de dépenses`,
        resource: "expenses",
        idsToDelete: selectedIds,
      };
      dispatch(addModal(ADD_DELETE_MODAL_PAYLOAD));
    }
  };

  const renderExpenses = () => {
    return expenses.map((expense, ind) => {
      const { date_group, total_cost, count } = expense;

      const { DELETE } = retreiveExpensesGroupActions(expense);
      const formattedExpenseCost = formatFiatValue(total_cost, "DZD");
      const formattedExpenseDate = formatDate(date_group);

      const isSelected = selectedIds.includes(date_group);
      const rowNumber = ind + startinRowIndex + 1;

      return (
        <T.TableRow key={date_group} onClick={(event) => event.ctrlKey && checkId(date_group)}>
          <T.TableCell>
            <Checkbox isChecked={isSelected} check={() => checkId(date_group)} />
          </T.TableCell>
          <T.TableCell>{rowNumber}</T.TableCell>
          <T.TableCell>
            <Link href={`/expenses/${date_group}`}>
              <Body2>{formattedExpenseDate}</Body2>
            </Link>
          </T.TableCell>
          <T.TableCell blurrable>{formattedExpenseCost}</T.TableCell>
          <T.TableCell>{count}</T.TableCell>
          <T.TableCell onClick={() => dispatch(addModal(DELETE))}>
            <Icon icon="delete" size="1.8rem" />
          </T.TableCell>
        </T.TableRow>
      );
    });
  };

  return (
    <T.TableWrapper>
      <T.Table>
        <T.TableHead>
          <T.TableRow>
            <T.TableHeaderCell>
              <Checkbox isChecked={isAllExpensesOnPageSelected && expenses.length > 0} check={checkAllOnPage} />
            </T.TableHeaderCell>
            <TableHeaderRow cells={TB_HEADER_DATA} resource="expenses" />
            <T.TableHeaderCell onClick={toggleDeleteAll}>
              <Icon icon="delete" size="1.8rem" />
            </T.TableHeaderCell>
          </T.TableRow>
        </T.TableHead>
        <T.TableBody>{renderExpenses()}</T.TableBody>
      </T.Table>
    </T.TableWrapper>
  );
};

export default ExpensesGroupTable;

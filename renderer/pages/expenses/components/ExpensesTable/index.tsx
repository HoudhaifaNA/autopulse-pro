import { useState } from "react";
import { useDispatch } from "react-redux";

import * as T from "components/Table/Table";
import TableHeaderRow from "components/TableHeaderRow/TableHeaderRow";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import ActionsDropdown from "../ActionsDropdown";

import { useAppSelector } from "store";
import { clearSelectedItems, toggleItemId } from "store/reducers/selectedItems";
import formatFiatValue from "utils/formatFiatValue";
import { addModal } from "store/reducers/modals";
import formatDate from "utils/formatDate";
import { TB_HEADER_DATA } from "./constants";
import { AddModalPayload } from "types";
import { Expense } from "interfaces";
import uid from "utils/uniqid";

interface ExpensesTableProps {
  expenses: Expense[];
}

const ICON_SIZE = "1.8rem";

const ExpensesTable = ({ expenses }: ExpensesTableProps) => {
  const { page, limit, groupBy } = useAppSelector((state) => state.resourceUrls.expenses.params);
  const { selectedIds } = useAppSelector((state) => state.selectedItems);
  const dispatch = useDispatch();
  const [isDropdownActive, toggleDropdown] = useState<number | null>(null);

  const pageExepnsesIds = expenses.map((expense) => expense.id);
  const isAllExpensesOnPageSelected = pageExepnsesIds.every((id) => selectedIds.includes(id));
  const startinRowIndex = (page - 1) * limit;

  const checkId = (id: number) => dispatch(toggleItemId(id));

  const checkAllOnPage = () => {
    if (isAllExpensesOnPageSelected) {
      dispatch(clearSelectedItems());
    } else {
      pageExepnsesIds.forEach((id) => !selectedIds.includes(id) && checkId(id));
    }
  };

  const onClickToggleDropdown = (index: number) => {
    if (isDropdownActive === index) return toggleDropdown(null);
    return toggleDropdown(index);
  };

  const toggleDeleteAll = () => {
    if (selectedIds.length > 0) {
      const ADD_DELETE_MODAL_PAYLOAD: AddModalPayload = {
        name: "delete",
        title: "Confirmer la suppression",
        message: `${selectedIds.length} dépenses`,
        resource: "expenses",
        idsToDelete: selectedIds,
      };
      dispatch(addModal(ADD_DELETE_MODAL_PAYLOAD));
    }
  };

  const renderExpenses = () => {
    return expenses.map((expense, ind) => {
      const { id, expense_date, raison, cost } = expense;

      const formattedExpenseCost = formatFiatValue(cost, "DZD");
      const formattedExpenseDate = formatDate(expense_date);

      const isSelected = selectedIds.includes(id);
      const isDropdownToggled = isDropdownActive === ind;
      const rowNumber = ind + startinRowIndex + 1;
      const uniqueKey = uid();

      return (
        <T.TableRow key={uniqueKey} onClick={(event) => event.ctrlKey && checkId(id)}>
          <T.TableCell>
            <Checkbox isChecked={isSelected} check={() => checkId(id)} />
          </T.TableCell>
          <T.TableCell>{rowNumber}</T.TableCell>
          <T.TableCell>{formattedExpenseDate}</T.TableCell>
          <T.TableCell>{raison}</T.TableCell>
          <T.TableCell>{formattedExpenseCost}</T.TableCell>
          <T.TableCell onClick={() => onClickToggleDropdown(ind)}>
            <Icon icon="more_vert" size={ICON_SIZE} />
            {isDropdownToggled && <ActionsDropdown expense={expense} />}
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

export default ExpensesTable;

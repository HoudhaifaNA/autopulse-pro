import { useState } from "react";
import { useDispatch } from "react-redux";

import * as T from "components/Table";
import TableHeaderRow from "components/TableHeaderRow";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import ActionsDropdown from "../ActionsDropdown";

import { useAppSelector } from "store";
import { clearSelectedItems, toggleItemId } from "store/reducers/selectedItems";
import formatFiatValue from "utils/formatFiatValue";
import { addModal } from "store/reducers/modals";
import formatDate from "utils/formatDate";
import { TB_HEADER_DATA } from "./constants";
import { AddModalPayload, GetExpensesResponse } from "types";
import { useRouter } from "next/router";
import useClickOutside from "hooks/useClickOutside";

interface ExpensesTableProps {
  data: GetExpensesResponse;
}

const ICON_SIZE = "1.8rem";

const ExpensesTable = ({ data }: ExpensesTableProps) => {
  const { expenses } = data;

  const { page, limit } = useAppSelector((state) => state.resourceUrls.expenses.params);
  const { selectedIds } = useAppSelector((state) => state.selectedItems);
  const dispatch = useDispatch();
  const router = useRouter();
  const [dropdownIndex, setDropdownIndex] = useState<number>();
  const [isOutside, setIsOutside] = useClickOutside(`dropdown-${dropdownIndex}`, `toggler-${dropdownIndex}`);

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
    if (dropdownIndex === index) {
      setDropdownIndex(undefined);
      setIsOutside(!isOutside);
    } else {
      setDropdownIndex(index);
      setIsOutside(false);
    }
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
      const isDropdownToggled = dropdownIndex === ind;
      const rowNumber = ind + startinRowIndex + 1;

      return (
        <T.TableRow key={id} onClick={(event) => event.ctrlKey && checkId(id)}>
          <T.TableCell />
          <T.TableCell>
            <Checkbox isChecked={isSelected} check={() => checkId(id)} />
          </T.TableCell>
          <T.TableCell>{rowNumber}</T.TableCell>
          <T.TableCell>{formattedExpenseDate}</T.TableCell>
          <T.TableCell blurrable>{raison}</T.TableCell>
          <T.TableCell blurrable>{formattedExpenseCost}</T.TableCell>
          <T.TableCell onClick={() => onClickToggleDropdown(ind)} id={`toggler-${ind}`}>
            <Icon icon="more_vert" size={ICON_SIZE} />
            {isDropdownToggled && !isOutside && <ActionsDropdown expense={expense} id={`dropdown-${ind}`} />}
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
            <T.TableHeaderCell onClick={() => router.back()}>
              <Icon icon="arrow_back" size="1.8rem" />
            </T.TableHeaderCell>
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

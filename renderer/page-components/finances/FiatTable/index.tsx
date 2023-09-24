import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";

import * as T from "components/Table";
import { Body2 } from "styles/Typography";
import TableHeaderRow from "components/TableHeaderRow";
import ActionsDropdown from "../ActionsDropdown";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";

import { useAppSelector } from "store";
import { clearSelectedItems, toggleItemId } from "store/reducers/selectedItems";
import formatFiatValue from "utils/formatFiatValue";
import { addModal } from "store/reducers/modals";
import formatDate from "utils/formatDate";
import { TB_HEADER_DATA } from "./constants";
import { AddModalPayload, GetFiatTransactionsResponse, Resources } from "types";

interface TransactionsTableProps {
  data: GetFiatTransactionsResponse;
  resource: Resources;
}

const ICON_SIZE = "1.8rem";

const FiatTable = ({ data, resource }: TransactionsTableProps) => {
  const { fiat_transactions } = data;
  const { page, limit } = useAppSelector((state) => state.resourceUrls[resource].params);
  const { selectedIds } = useAppSelector((state) => state.selectedItems);
  const dispatch = useDispatch();
  const [isDropdownActive, toggleDropdown] = useState<number | null>(null);

  const pageTransctionsIds = fiat_transactions.map((transaction) => transaction.id);
  const isAllTransactionsOnPageSelected = pageTransctionsIds.every((id) => selectedIds.includes(id));
  const startinRowIndex = (page - 1) * limit;

  const checkId = (id: number) => dispatch(toggleItemId(id));

  const checkAllOnPage = () => {
    if (isAllTransactionsOnPageSelected) {
      dispatch(clearSelectedItems());
    } else {
      pageTransctionsIds.forEach((id) => !selectedIds.includes(id) && checkId(id));
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
        message: `${selectedIds.length} transactions et toutes ses données`,
        resource,
        idsToDelete: selectedIds,
      };
      dispatch(addModal(ADD_DELETE_MODAL_PAYLOAD));
    }
  };

  const renderTransactions = () => {
    return fiat_transactions.map((transaction, ind) => {
      const { id, client_id, client, transaction_date, info2, direction, currency, amount } = transaction;

      const formattedTransactionDate = transaction_date ? formatDate(transaction_date) : "--";
      const formattedTransctionAmount = formatFiatValue(amount, currency, true);

      const isSelected = selectedIds.includes(id);
      const isDropdownToggled = isDropdownActive === ind;
      const rowNumber = ind + startinRowIndex + 1;

      return (
        <T.TableRow key={id} onClick={(event) => event.ctrlKey && checkId(id)}>
          <T.TableCell>
            <Checkbox isChecked={isSelected} check={() => checkId(id)} />
          </T.TableCell>
          <T.TableCell>{rowNumber}</T.TableCell>
          <T.TableCell>{formattedTransactionDate}</T.TableCell>
          <T.TableCell blurrable>
            <Link href="/clients">
              <Body2>{client}</Body2>
            </Link>
          </T.TableCell>
          <T.TableCell>{info2}</T.TableCell>
          <T.TableCell>{direction}</T.TableCell>
          <T.TableCell blurrable>{formattedTransctionAmount}</T.TableCell>
          <T.TableCell onClick={() => onClickToggleDropdown(ind)}>
            <Icon icon="more_vert" size={ICON_SIZE} />
            {isDropdownToggled && <ActionsDropdown transaction={transaction} resource={resource} />}
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
              <Checkbox
                isChecked={isAllTransactionsOnPageSelected && fiat_transactions.length > 0}
                check={checkAllOnPage}
              />
            </T.TableHeaderCell>
            <TableHeaderRow cells={TB_HEADER_DATA} resource={resource} />
            <T.TableHeaderCell onClick={toggleDeleteAll}>
              <Icon icon="delete" size="1.8rem" />
            </T.TableHeaderCell>
          </T.TableRow>
        </T.TableHead>
        <T.TableBody>{renderTransactions()}</T.TableBody>
      </T.Table>
    </T.TableWrapper>
  );
};

export default FiatTable;

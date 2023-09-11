import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";

import * as T from "components/Table/Table";
import { Body2 } from "styles/Typography";
import TableHeaderRow from "components/TableHeaderRow/TableHeaderRow";
import ActionsDropdown from "pages/clients/components/ActionsDropdown";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";

import { useAppSelector } from "store";
import { clearSelectedItems, toggleItemId } from "store/reducers/selectedItems";
import formatFiatValue from "utils/formatFiatValue";
import { addModal } from "store/reducers/modals";
import formatDate from "utils/formatDate";
import { TB_HEADER_DATA } from "./constants";
import { Client } from "interfaces";
import { AddModalPayload } from "types";

interface ClientTableProps {
  clients: Client[];
}

const ICON_SIZE = "1.8rem";

const ClientsTable = ({ clients }: ClientTableProps) => {
  const { page, limit } = useAppSelector((state) => state.resourceUrls.clients.params);
  const { selectedIds } = useAppSelector((state) => state.selectedItems);
  const dispatch = useDispatch();
  const [isDropdownActive, toggleDropdown] = useState<number | null>(null);

  const pageClientIds = clients.map((client) => client.id);
  const isAllClientsOnPageSelected = pageClientIds.every((id) => selectedIds.includes(id));
  const startinRowIndex = (page - 1) * limit;

  const checkId = (id: number) => dispatch(toggleItemId(id));

  const checkAllOnPage = () => {
    if (isAllClientsOnPageSelected) {
      dispatch(clearSelectedItems());
    } else {
      pageClientIds.forEach((id) => !selectedIds.includes(id) && checkId(id));
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
        message: `${selectedIds.length} clients et toutes ses données`,
        resource: "clients",
        idsToDelete: selectedIds,
      };
      dispatch(addModal(ADD_DELETE_MODAL_PAYLOAD));
    }
  };

  const renderClients = () => {
    return clients.map((client, ind) => {
      const { id, last_transaction_date, full_name, address, dzd_balance, eur_balance } = client;

      const formattedDZDBalance = formatFiatValue(dzd_balance, "DZD", true);
      const formattedEURBalance = formatFiatValue(eur_balance, "EUR", true);
      const formattedTransactionDate = last_transaction_date ? formatDate(last_transaction_date) : "--";

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
          <T.TableCell>
            <Link href={`/clients/${id}`}>
              <Body2>{full_name}</Body2>
            </Link>
          </T.TableCell>
          <T.TableCell>{address || "--"}</T.TableCell>
          <T.TableCell>{formattedDZDBalance}</T.TableCell>
          <T.TableCell>{formattedEURBalance}</T.TableCell>
          <T.TableCell onClick={() => onClickToggleDropdown(ind)}>
            <Icon icon="more_vert" size={ICON_SIZE} />
            {isDropdownToggled && <ActionsDropdown client={client} />}
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
              <Checkbox isChecked={isAllClientsOnPageSelected && clients.length > 0} check={checkAllOnPage} />
            </T.TableHeaderCell>
            <TableHeaderRow cells={TB_HEADER_DATA} resource="clients" />
            <T.TableHeaderCell onClick={toggleDeleteAll}>
              <Icon icon="delete" size="1.8rem" />
            </T.TableHeaderCell>
          </T.TableRow>
        </T.TableHead>
        <T.TableBody>{renderClients()}</T.TableBody>
      </T.Table>
    </T.TableWrapper>
  );
};

export default ClientsTable;

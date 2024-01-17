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
import { Procuration } from "interfaces";
import { AddModalPayload, GetProcurationsResoponse } from "types";
import Badge, { BadgeProps } from "components/Badge/Badge";
import useClickOutside from "hooks/useClickOutside";

interface ProcurationsTableProps {
  data: GetProcurationsResoponse;
}

const ICON_SIZE = "1.8rem";

const renderProcurationStatus = (isExpirated: 0 | 1, invalidMsg: string, validMsg: string) => {
  let status: string = "";
  let color: BadgeProps["type"] = "success";

  if (isExpirated) {
    status = validMsg;
    color = "success";
  } else {
    status = invalidMsg;
    color = "error";
  }

  return <Badge type={color}>{status}</Badge>;
};

const ProcurationsTable = ({ data }: ProcurationsTableProps) => {
  const { procurations } = data;

  const { page, limit } = useAppSelector((state) => state.resourceUrls.procurations.params);
  const { selectedIds } = useAppSelector((state) => state.selectedItems);
  const dispatch = useDispatch();
  const [dropdownIndex, setDropdownIndex] = useState<number>();
  const [isOutside, setIsOutside] = useClickOutside(`dropdown-${dropdownIndex}`, `toggler-${dropdownIndex}`);

  const pageProcurationsIds = procurations.map((procuration) => procuration.id);
  const isAllProcurationsOnPageSelected = pageProcurationsIds.every((id) => selectedIds.includes(id));
  const startinRowIndex = (page - 1) * limit;

  const checkId = (id: number) => dispatch(toggleItemId(id));

  const checkAllOnPage = () => {
    if (isAllProcurationsOnPageSelected) {
      dispatch(clearSelectedItems());
    } else {
      pageProcurationsIds.forEach((id) => !selectedIds.includes(id) && checkId(id));
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
        message: `${selectedIds.length} procurations`,
        resource: "procurations",
        idsToDelete: selectedIds,
      };
      dispatch(addModal(ADD_DELETE_MODAL_PAYLOAD));
    }
  };

  const renderProcurations = () => {
    return procurations.map((procuration, ind) => {
      const {
        id,
        buyer,
        buyer_id,
        purchased_at,
        car_id,
        car,
        procurator,
        moudjahid,
        licence_id,
        has_received,
        received_at,
        seller_id,
        seller,
        price,
      } = procuration;

      const formattedProcurationPrice = formatFiatValue(price, "DZD");
      const formattedPurchaseDate = formatDate(purchased_at);
      const formattedReceivedDate = received_at ? formatDate(received_at) : "--";

      const isSelected = selectedIds.includes(id);
      const isDropdownToggled = dropdownIndex === ind;
      const rowNumber = ind + startinRowIndex + 1;

      return (
        <T.TableRow key={id} onClick={(event) => event.ctrlKey && checkId(id)}>
          <T.TableCell>
            <Checkbox isChecked={isSelected} check={() => checkId(id)} />
          </T.TableCell>
          <T.TableCell>{rowNumber}</T.TableCell>
          <T.TableCell blurrable>
            <Link href={`/clients/${buyer_id}`}>
              <Body2>{buyer}</Body2>
            </Link>
          </T.TableCell>
          <T.TableCell>
            <Link href={`/cars/${car_id}`}>
              <Body2>{car}</Body2>
            </Link>
          </T.TableCell>
          <T.TableCell>
            <Link href={`/licences/${licence_id}`}>
              <Body2>{moudjahid}</Body2>
            </Link>
          </T.TableCell>
          <T.TableCell>
            <Link href={`/procurations/${id}`}>
              <Body2>{procurator}</Body2>
            </Link>
          </T.TableCell>

          <T.TableCell>{renderProcurationStatus(has_received, "No", "Oui")}</T.TableCell>
          <T.TableCell blurrable>
            <Link href={`/clients/${seller_id}`}>
              <Body2>{seller}</Body2>
            </Link>
          </T.TableCell>
          <T.TableCell blurrable>{formattedProcurationPrice}</T.TableCell>
          <T.TableCell>{formattedPurchaseDate}</T.TableCell>
          <T.TableCell>{formattedReceivedDate}</T.TableCell>
          <T.TableCell onClick={() => onClickToggleDropdown(ind)} id={`toggler-${ind}`}>
            <Icon icon="more_vert" size={ICON_SIZE} />
            {isDropdownToggled && !isOutside && <ActionsDropdown procuration={procuration} id={`dropdown-${ind}`} />}
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
              <Checkbox isChecked={isAllProcurationsOnPageSelected && procurations.length > 0} check={checkAllOnPage} />
            </T.TableHeaderCell>
            <TableHeaderRow cells={TB_HEADER_DATA} resource="procurations" />
            <T.TableHeaderCell onClick={toggleDeleteAll}>
              <Icon icon="delete" size="1.8rem" />
            </T.TableHeaderCell>
          </T.TableRow>
        </T.TableHead>
        <T.TableBody>{renderProcurations()}</T.TableBody>
      </T.Table>
    </T.TableWrapper>
  );
};

export default ProcurationsTable;

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
import { Licence } from "interfaces";
import { AddModalPayload, GetAllLicencesResponse } from "types";
import Badge, { BadgeProps } from "components/Badge/Badge";

interface LicenceTableProps {
  data: GetAllLicencesResponse;
}

const ICON_SIZE = "1.8rem";

const renderLicenceStatus = (isValid: 0 | 1) => {
  let status: string = "";
  let color: BadgeProps["type"] = "success";

  if (isValid) {
    status = "Active";
    color = "success";
  } else {
    status = "Invalide";
    color = "error";
  }

  return <Badge type={color}>{status}</Badge>;
};

const LicencesTable = ({ data }: LicenceTableProps) => {
  const { licences } = data;

  const { page, limit } = useAppSelector((state) => state.resourceUrls.licences.params);
  const { selectedIds } = useAppSelector((state) => state.selectedItems);
  const dispatch = useDispatch();
  const [isDropdownActive, toggleDropdown] = useState<number | null>(null);

  const pageLicencesIds = licences.map((licence) => licence.id);
  const isAllLicencesOnPageSelected = pageLicencesIds.every((id) => selectedIds.includes(id));
  const startinRowIndex = (page - 1) * limit;

  const checkId = (id: number) => dispatch(toggleItemId(id));

  const checkAllOnPage = () => {
    if (isAllLicencesOnPageSelected) {
      dispatch(clearSelectedItems());
    } else {
      pageLicencesIds.forEach((id) => !selectedIds.includes(id) && checkId(id));
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
        message: `${selectedIds.length} licences`,
        resource: "licences",
        idsToDelete: selectedIds,
      };
      dispatch(addModal(ADD_DELETE_MODAL_PAYLOAD));
    }
  };

  const renderLicences = () => {
    return licences.map((licence, ind) => {
      const { id, purchased_at, moudjahid, serial_number, is_valid, seller_id, seller, price, expiration_date } =
        licence;

      const formattedLicencePrice = formatFiatValue(price, "DZD");
      const formattedPurchaseDate = formatDate(purchased_at);
      const formattedExpirationDate = formatDate(expiration_date);

      const isSelected = selectedIds.includes(id);
      const isDropdownToggled = isDropdownActive === ind;
      const rowNumber = ind + startinRowIndex + 1;

      return (
        <T.TableRow key={id} onClick={(event) => event.ctrlKey && checkId(id)}>
          <T.TableCell>
            <Checkbox isChecked={isSelected} check={() => checkId(id)} />
          </T.TableCell>
          <T.TableCell>{rowNumber}</T.TableCell>
          <T.TableCell>{formattedPurchaseDate}</T.TableCell>
          <T.TableCell>
            <Link href={`/licences/${id}`}>
              <Body2>{moudjahid}</Body2>
            </Link>
          </T.TableCell>
          <T.TableCell>{serial_number || "--"}</T.TableCell>
          <T.TableCell>{renderLicenceStatus(is_valid)}</T.TableCell>
          <T.TableCell blurrable>
            <Link href={`/clients/${seller_id}`}>
              <Body2>{seller}</Body2>
            </Link>
          </T.TableCell>
          <T.TableCell blurrable>{formattedLicencePrice}</T.TableCell>
          <T.TableCell>{formattedExpirationDate}</T.TableCell>
          <T.TableCell onClick={() => onClickToggleDropdown(ind)}>
            <Icon icon="more_vert" size={ICON_SIZE} />
            {isDropdownToggled && <ActionsDropdown licence={licence} />}
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
              <Checkbox isChecked={isAllLicencesOnPageSelected && licences.length > 0} check={checkAllOnPage} />
            </T.TableHeaderCell>
            <TableHeaderRow cells={TB_HEADER_DATA} resource="licences" />
            <T.TableHeaderCell onClick={toggleDeleteAll}>
              <Icon icon="delete" size="1.8rem" />
            </T.TableHeaderCell>
          </T.TableRow>
        </T.TableHead>
        <T.TableBody>{renderLicences()}</T.TableBody>
      </T.Table>
    </T.TableWrapper>
  );
};

export default LicencesTable;

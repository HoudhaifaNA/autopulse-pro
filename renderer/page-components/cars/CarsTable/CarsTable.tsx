import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";

import * as T from "components/Table";
import { Body2 } from "styles/Typography";
import TableHeaderRow from "components/TableHeaderRow";
import ActionsDropdown from "../ActionsDropdown/ActionsDropdown";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";

import { useAppSelector } from "store";
import { clearSelectedItems, toggleItemId } from "store/reducers/selectedItems";
import formatFiatValue from "utils/formatFiatValue";
import { addModal } from "store/reducers/modals";
import formatDate from "utils/formatDate";
import { TB_HEADER_DATA } from "./constants";
import { AddModalPayload, GetAllCarsResponse } from "types";
import IncompleteFieldsMarks from "../IncompleteFieldsMarks/IncompleteFieldsMarks";
import useClickOutside from "hooks/useClickOutside";

interface CarsTableProps {
  data: GetAllCarsResponse;
}

const ICON_SIZE = "1.8rem";

const CarsTable = ({ data }: CarsTableProps) => {
  const { cars } = data;

  const { page, limit } = useAppSelector((state) => state.resourceUrls.cars.params);
  const { selectedIds } = useAppSelector((state) => state.selectedItems);
  const dispatch = useDispatch();
  const [dropdownIndex, setDropdownIndex] = useState<number>();
  const [isOutside, setIsOutside] = useClickOutside(`dropdown-${dropdownIndex}`, `toggler-${dropdownIndex}`);

  const pageCarsIds = cars.map((car) => car.id);
  const isAllCarsOnPageSelected = pageCarsIds.every((id) => selectedIds.includes(id));
  const startinRowIndex = (page - 1) * limit;

  const checkId = (id: number) => dispatch(toggleItemId(id));

  const checkAllOnPage = () => {
    if (isAllCarsOnPageSelected) {
      dispatch(clearSelectedItems());
    } else {
      pageCarsIds.forEach((id) => !selectedIds.includes(id) && checkId(id));
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
        message: `${selectedIds.length} voitures et toutes ses données`,
        resource: "cars",
        idsToDelete: selectedIds,
      };
      dispatch(addModal(ADD_DELETE_MODAL_PAYLOAD));
    }
  };

  const renderCars = () => {
    return cars.map((car, ind) => {
      const {
        id,
        purchased_at,
        type,
        name,
        serial_number,
        registration_number,
        color,
        production_year,
        seller_id,
        seller,
        owner_id,
        owner_name,
        total_cost,
        sold_at,
        buyer_id,
        buyer,
        sold_price,
        is_licence_incomplete,
        is_expense_cost_incomplete,
        is_purchase_price_incomplete,
        is_sold_price_incomplete,
      } = car;

      const formattedTotalCost = formatFiatValue(total_cost, "DZD");
      const formattedSoldPrice = sold_price ? formatFiatValue(sold_price, "DZD") : "--";
      const formattedPurchasedDate = purchased_at ? formatDate(purchased_at) : "--";
      const formattedSoldDate = sold_at ? formatDate(sold_at) : "--";

      const isSelected = selectedIds.includes(id);
      const isDropdownToggled = dropdownIndex === ind;
      const rowNumber = ind + startinRowIndex + 1;
      const isCompelete =
        !is_licence_incomplete &&
        !is_expense_cost_incomplete &&
        !is_purchase_price_incomplete &&
        !is_sold_price_incomplete;

      const marksProps = {
        is_licence_incomplete,
        is_expense_cost_incomplete,
        is_purchase_price_incomplete,
        is_sold_price_incomplete,
      };

      return (
        <T.TableRow key={id} onClick={(event) => event.ctrlKey && checkId(id)}>
          <T.TableCell>
            <Checkbox isChecked={isSelected} check={() => checkId(id)} />
          </T.TableCell>
          <T.TableCell>{rowNumber}</T.TableCell>
          <T.TableCell>{isCompelete ? "Complet" : <IncompleteFieldsMarks {...marksProps} />}</T.TableCell>
          <T.TableCell>
            <Link href={`/cars/${id}`}>
              <Body2>{name}</Body2>
            </Link>
          </T.TableCell>
          <T.TableCell>{serial_number || "--"}</T.TableCell>
          <T.TableCell>{registration_number || "--"}</T.TableCell>
          <T.TableCell>{color || "--"}</T.TableCell>
          <T.TableCell>{production_year || "--"}</T.TableCell>
          <T.TableCell blurrable>
            {owner_id ? (
              <Link href={`/licences/${owner_id}`}>
                <Body2>{owner_name}</Body2>
              </Link>
            ) : (
              <Body2>{owner_name}</Body2>
            )}
          </T.TableCell>
          <T.TableCell>{formattedPurchasedDate}</T.TableCell>
          <T.TableCell blurrable>
            <Link href={`/clients/${seller_id}`}>
              <Body2>{seller}</Body2>
            </Link>
          </T.TableCell>
          <T.TableCell blurrable>{formattedTotalCost}</T.TableCell>
          <T.TableCell>{formattedSoldDate}</T.TableCell>
          <T.TableCell blurrable>
            {buyer ? (
              <Link href={`/clients/${buyer_id}`}>
                <Body2>{buyer}</Body2>
              </Link>
            ) : (
              <Body2>--</Body2>
            )}
          </T.TableCell>
          <T.TableCell blurrable>{formattedSoldPrice}</T.TableCell>
          <T.TableCell>{type}</T.TableCell>

          <T.TableCell onClick={() => onClickToggleDropdown(ind)} id={`toggler-${ind}`}>
            <Icon icon="more_vert" size={ICON_SIZE} />
            {isDropdownToggled && !isOutside && <ActionsDropdown car={car} id={`dropdown-${ind}`} />}
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
              <Checkbox isChecked={isAllCarsOnPageSelected && cars.length > 0} check={checkAllOnPage} />
            </T.TableHeaderCell>
            <TableHeaderRow cells={TB_HEADER_DATA} resource="cars" />
            <T.TableHeaderCell onClick={toggleDeleteAll}>
              <Icon icon="delete" size="1.8rem" />
            </T.TableHeaderCell>
          </T.TableRow>
        </T.TableHead>
        <T.TableBody>{renderCars()}</T.TableBody>
      </T.Table>
    </T.TableWrapper>
  );
};

export default CarsTable;

import dayjs from "dayjs";

import { Body2 } from "styles/Typography";

import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import {
  TableWrapper,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "components/Table/Table";
import { useContext, useRef, useState } from "react";
import { GlobalContext } from "pages/_app";
import useClickOutside from "hooks/useClickOutside";
import Dropdown from "components/Dropdown/Dropdown";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";
import Button from "components/Button/Button";

interface IProps {
  expenses: any[];
}

const TB_HEADER_DATA = [
  { text: "Indice", sortable: false },
  { text: "Date créée", sortable: true },
  { text: "Raison", sortable: false },
  { text: "Montant", sortable: true },
  { text: "Date de transfert", sortable: true },
];

const ExpensesTable = ({ expenses }: IProps) => {
  const [isDropdownActive, toggleDropdown] = useState<null | number>(null);
  const { setDocument, toggleModalDelete } = useContext(GlobalContext);
  const [ids, addIds] = useState<number[]>([]);
  const checkRow = (id: number) => {
    if (ids.indexOf(id) === -1) {
      addIds((ids) => [...ids, id]);
    } else {
      addIds((ids) => ids.filter((el) => el !== id));
    }
  };

  const checkAllRows = () => {
    if (expenses.length === ids.length) {
      addIds([]);
    } else {
      expenses.forEach(({ id }) => {
        if (ids.indexOf(id) === -1) addIds((prevIds) => [...prevIds, id]);
      });
    }
  };

  const handleDeleteAll = async () => {
    if (expenses.length === ids.length) {
      toggleModalDelete({
        name: `${ids.length} dépenses`,
        url: `/expenses/`,
      });
    } else if (ids.length > 0) {
      toggleModalDelete({
        name: `${ids.length} dépenses`,
        url: `/expenses/${ids.join(",")}`,
      });
    }

    addIds([]);
  };

  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <Checkbox
                isChecked={expenses.length === ids.length}
                check={checkAllRows}
              />
            </TableHeaderCell>
            {TB_HEADER_DATA.map((el) => {
              return (
                <TableHeaderCell key={el.text}>
                  <Body2>{el.text}</Body2>
                  {el.sortable && <Icon icon="expand" size="1.8rem" />}
                </TableHeaderCell>
              );
            })}
            <TableHeaderCell onClick={handleDeleteAll}>
              <Icon icon="delete" size="1.8rem" />
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((licence, ind) => {
            const { id, created_at, raison, amount, transferred_at } = licence;
            const onDelete = async () => {
              toggleModalDelete({
                name: `${raison} avec ${amount}.00 DA`,
                url: `/expenses/${id}`,
              });
              return addIds([]);
            };
            return (
              <TableRow key={id}>
                <TableCell blurrable={false}>
                  <Checkbox
                    isChecked={!(ids.indexOf(id) === -1)}
                    check={() => checkRow(id)}
                  />
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{ind + 1}</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{dayjs(created_at).format("DD-MM-YYYY")}</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{raison}</Body2>
                </TableCell>
                <TableCell>
                  <Body2>{amount}.00 DA</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{dayjs(transferred_at).format("DD-MM-YYYY")}</Body2>
                </TableCell>
                <TableCell
                  blurrable={false}
                  onClick={() => {
                    if (isDropdownActive === ind) {
                      toggleDropdown(null);
                    } else {
                      toggleDropdown(ind);
                    }
                  }}
                >
                  <Icon icon="more_vert" size="1.8rem" />

                  {isDropdownActive === ind && (
                    <Dropdown $right="0" $top="1rem" $width="20rem">
                      <ButtonItem $ghostColor="#595959">
                        <Button variant="ghost" icon="edit">
                          Modifier
                        </Button>
                      </ButtonItem>
                      <ButtonItem $ghostColor="#FF4040" onClick={onDelete}>
                        <Button variant="ghost" icon="delete">
                          Supprimer
                        </Button>
                      </ButtonItem>
                    </Dropdown>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default ExpensesTable;

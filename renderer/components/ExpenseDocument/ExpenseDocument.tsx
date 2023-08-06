import { useContext, useEffect, useState } from "react";

import DetailsViewer, {
  DetailContent,
  DetailHeader,
  DetailItem,
  DetailSection,
} from "components/DetailsViewer/DetailsViewer";
import {
  TableWrapper,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "components/Table/Table";
import TransactionsList from "components/TransacionsList/TransacionsList";

import useClientById from "hooks/useClientById";
import useClientTransactions from "hooks/useClientTransactions";
import formatPrice from "utils/formatPrice";
import { GlobalContext } from "pages/_app";

import { Transaction } from "../../../interfaces";
import { fetcher } from "utils/API";
import useSWR, { mutate } from "swr";
import Icon from "components/Icon/Icon";
import { Body2 } from "styles/Typography";
import Checkbox from "components/Checkbox/Checkbox";
import Dropdown from "components/Dropdown/Dropdown";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";
import Button from "components/Button/Button";
import dayjs from "dayjs";

interface IProps {
  expenses: any[];
}

const TB_HEADER_DATA = [
  { text: "Indice", sortable: false },
  { text: "Date", sortable: true },
  { text: "Nombre de dépenses", sortable: true },
  { text: "Total", sortable: true },
];

const getExpenses = (date: string, options: any) => {
  const { data } = useSWR(`/expenses/date/${date}`, fetcher, options);
  return data?.expenses ?? [];
};
const ExpensesTable = ({ expenses }: IProps) => {
  const [isDropdownActive, toggleDropdown] = useState<null | number>(null);
  const { setModal, toggleModalDelete } = useContext(GlobalContext);
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
    if (ids.length > 0) {
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
          {expenses.map((expense, ind) => {
            const { id, created_at, raison, amount, transferred_at } = expense;
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
                  <Body2>{transferred_at}</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{raison}</Body2>
                </TableCell>
                <TableCell blurrable={false}>
                  <Body2>{amount}.00 DA</Body2>
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
                      <ButtonItem
                        $ghostColor="#595959"
                        onClick={() =>
                          setModal({
                            name: "expenses",
                            edit: true,
                            data: {
                              id,
                              transferred_at: dayjs(transferred_at),
                              raison,
                              amount,
                            },
                          })
                        }
                      >
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

const ExpenseDocument = () => {
  const { currDocument, modalDelete, currModal } = useContext(GlobalContext);
  const [swrOptions, setSWROptions] = useState({});
  const expenses = getExpenses(currDocument.id, swrOptions);

  useEffect(() => {
    setSWROptions({ refreshInterval: 100 });
    const swrTimeOut = setTimeout(() => {
      setSWROptions({});
    }, 1000);

    return () => clearTimeout(swrTimeOut);
  }, [JSON.stringify(modalDelete), JSON.stringify(currModal)]);

  return (
    <>
      {
        <DetailsViewer $width="75%">
          {expenses.length > 0 && (
            <DetailSection>
              <DetailHeader title="Dépenses list" />
              <DetailContent $columns={1}>
                <ExpensesTable expenses={expenses} />
              </DetailContent>
            </DetailSection>
          )}
        </DetailsViewer>
      }
    </>
  );
};

export default ExpenseDocument;

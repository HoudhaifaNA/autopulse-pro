import { useContext, useEffect, useState } from "react";
import { Body2 } from "styles/Typography";

import {
  TableWrapper,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
} from "components/Table/Table";
import TransactionRow from "components/FinancesTable/TransactionRow";
import EuroTransferRow from "components/FinancesTable/EuroTransferRow";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";

import { HEADERS } from "components/FinancesTable/constants";

import { Page } from "components/FinancesTable/types";
import API from "utils/API";
import { GlobalContext } from "pages/_app";

interface FinanceTBProps {
  currentPage: Page;
  transactions: any;
}

const FinancesTable = ({ currentPage, transactions }: FinanceTBProps) => {
  const { toggleModalDelete } = useContext(GlobalContext);

  const [ids, addIds] = useState<number[]>([]);
  const transactionList = {
    transactions: transactions.moneyTransactions,
    "virements des euros": transactions.eurosTransactions,
  };
  useEffect(() => {
    addIds([]);
  }, [currentPage]);

  const checkAllRows = () => {
    if (transactionList[currentPage].length === ids.length) {
      addIds([]);
    } else {
      transactionList[currentPage].forEach(({ id }: { id: number }) => {
        if (ids.indexOf(id) === -1) addIds((prevIds) => [...prevIds, id]);
      });
    }
  };

  const handleDeleteAll = () => {
    console.log(ids.join(","));
    toggleModalDelete({
      name: `${ids.length} transactions`,
      url: `/transactions/${ids.join(",")}`,
    });
    return addIds([]);
  };

  const renderTransactions = () => {
    if (currentPage === "transactions") {
      return transactions.moneyTransactions.map((tx: any, ind: number) => {
        return (
          <TransactionRow
            key={tx.id}
            ind={ind}
            transaction={tx}
            checkState={{ ids, addIds }}
          />
        );
      });
    } else {
      return transactions.eurosTransactions.map((tx: any, ind: number) => {
        return (
          <EuroTransferRow
            key={tx.id}
            ind={ind}
            transaction={tx}
            checkState={{ ids, addIds }}
          />
        );
      });
    }
  };

  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <Checkbox
                isChecked={
                  transactionList[currentPage].length !== 0 &&
                  transactionList[currentPage].length === ids.length
                }
                check={checkAllRows}
              />
            </TableHeaderCell>
            {HEADERS[currentPage].map((el) => {
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
        <TableBody>{renderTransactions()}</TableBody>
      </Table>
    </TableWrapper>
  );
};

export default FinancesTable;

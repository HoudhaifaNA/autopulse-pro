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

interface FinanceTBProps {
  currentPage: Page;
  transactions: any;
}

const FinancesTable = ({ currentPage, transactions }: FinanceTBProps) => {
  const renderTransactions = () => {
    if (currentPage === "transactions") {
      return transactions.moneyTransactions.map((tx: any) => {
        return <TransactionRow key={tx.id} transaction={tx} />;
      });
    } else {
      return transactions.eurosTransactions.map((tx: any) => {
        return <EuroTransferRow key={tx.id} transaction={tx} />;
      });
    }
  };

  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <Checkbox />
            </TableHeaderCell>
            {HEADERS[currentPage].map((el) => {
              return (
                <TableHeaderCell key={el.text}>
                  <Body2>{el.text}</Body2>
                  {el.sortable && <Icon icon="expand" size="1.8rem" />}
                </TableHeaderCell>
              );
            })}
            <TableHeaderCell>
              <Icon icon="more_vert" size="1.8rem" />
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>{renderTransactions()}</TableBody>
      </Table>
    </TableWrapper>
  );
};

export default FinancesTable;

import Link from "next/link";

import * as T from "components/Table";
import { Body2 } from "styles/Typography";

import { TB_HEADER_DATA } from "./constants";
import formatFiatValue from "utils/formatFiatValue";
import formatDate from "utils/formatDate";
import { Transaction } from "interfaces";

interface TransactionsTableProps {
  direction?: Transaction["direction"];
  showSymbol?: boolean;
  transactions: Transaction[];
}

const TransactionsTable = ({ direction, showSymbol, transactions }: TransactionsTableProps) => {
  const renderTableHeaderCells = () => {
    return TB_HEADER_DATA.map(({ title }) => {
      return <T.TableHeaderCell key={title}>{title}</T.TableHeaderCell>;
    });
  };

  const renderTransactions = () => {
    const transactionsItems = direction ? transactions.filter((tx) => tx.direction === direction) : transactions;
    return transactionsItems.map((transaction) => {
      const { id, product_id, type, transaction_date, info1, info2, info3, info4, amount, currency } = transaction;

      const formattedTransactionDate = formatDate(transaction_date);
      const formattedTransactionAmount = formatFiatValue(amount, currency, true);
      const symbol = transaction.amount < 0 ? "-" : "";

      return (
        <T.TableRow key={id}>
          <T.TableCell>{formattedTransactionDate}</T.TableCell>
          <T.TableCell>
            {type === "car" ? (
              <Link href={`/cars/${product_id}`}>
                <Body2>{info1}</Body2>
              </Link>
            ) : (
              <Body2>{info1}</Body2>
            )}
          </T.TableCell>
          <T.TableCell>
            {type === "licence" ? (
              <Link href={`/${type}s/${product_id}`}>
                <Body2>{info2}</Body2>
              </Link>
            ) : (
              <Body2>{info2}</Body2>
            )}
          </T.TableCell>
          <T.TableCell>{info3 || "--"}</T.TableCell>
          <T.TableCell>{info4 || "--"}</T.TableCell>
          <T.TableCell blurrable>{`${showSymbol ? symbol : ""} ${formattedTransactionAmount}`}</T.TableCell>
        </T.TableRow>
      );
    });
  };

  return (
    <T.TableWrapper>
      <T.Table>
        <T.TableHead>
          <T.TableRow>{renderTableHeaderCells()}</T.TableRow>
        </T.TableHead>
        <T.TableBody>{renderTransactions()}</T.TableBody>
      </T.Table>
    </T.TableWrapper>
  );
};

export default TransactionsTable;

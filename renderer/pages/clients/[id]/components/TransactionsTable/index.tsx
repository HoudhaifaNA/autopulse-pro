import * as T from "components/Table/Table";
import { TB_HEADER_DATA } from "./constants";
import { Transaction } from "interfaces";
import formatFiatValue from "utils/formatFiatValue";
import formatDate from "utils/formatDate";
import { Body2 } from "styles/Typography";
import Link from "next/link";

interface TransactionsTableProps {
  direction: Transaction["direction"];
  transactions: Transaction[];
}

const TransactionsTable = ({ direction, transactions }: TransactionsTableProps) => {
  const renderTableHeaderCells = () => {
    return TB_HEADER_DATA.map(({ title }) => {
      return <T.TableHeaderCell key={title}>{title}</T.TableHeaderCell>;
    });
  };

  const renderTransactions = () => {
    return transactions
      .filter((tx) => tx.direction === direction)
      .map((transaction) => {
        const { id, product_id, type, transaction_date, info1, info2, info3, info4, amount, currency } = transaction;

        const formattedTransactionDate = formatDate(transaction_date);
        const formattedAmountBalance = formatFiatValue(amount, currency, true);

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
            <T.TableCell>{formattedAmountBalance}</T.TableCell>
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

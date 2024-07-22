import Link from "next/link";

import * as T from "components/Table";
import { Body2 } from "styles/Typography";
import TableHeaderRow from "components/TableHeaderRow";

import formatFiatValue from "utils/formatFiatValue";
import formatDate from "utils/formatDate";
import { TB_HEADER_DATA } from "./constants";
import { GetDailyTransactionsResponse, Resources } from "types";

interface TransactionsTableProps {
  transactions: GetDailyTransactionsResponse["transactions_list"];
  dailyTransactions: GetDailyTransactionsResponse["daily_transactions"];
  lastDayTransactions: GetDailyTransactionsResponse["lastDay_transactions"];
  resource: Resources;
}

const RevenuTable = ({ transactions, dailyTransactions, lastDayTransactions, resource }: TransactionsTableProps) => {
  const renderTransactions = () => {
    return transactions.map((transaction, ind) => {
      const { id, client_id, client, info1, product_id, type, transaction_date, info2, currency, amount } = transaction;

      const formattedTransactionDate = transaction_date ? formatDate(transaction_date) : "--";
      const formattedTransctionAmount = formatFiatValue(amount, currency, true);

      const rowNumber = ind + 1;
      const renderName = () => {
        if (type === "car") {
          return (
            <Link href={`/cars/${product_id}`}>
              <Body2>{info1}</Body2>
            </Link>
          );
        } else if (type === "Fiat") {
          return <Body2>{info1}</Body2>;
        } else if (["licence", "paper", "procuration"].includes(type)) {
          return (
            <Link href={`/${type}s/${product_id}`}>
              <Body2>
                {info1} : {info2}
              </Body2>
            </Link>
          );
        }
      };

      return (
        <T.TableRow key={id}>
          <T.TableCell>{rowNumber}</T.TableCell>
          <T.TableCell>{formattedTransactionDate}</T.TableCell>

          <T.TableCell>{renderName()}</T.TableCell>
          <T.TableCell blurrable>
            <Link href={`/clients/${client_id}`}>
              <Body2>{client}</Body2>
            </Link>
          </T.TableCell>
          <T.TableCell blurrable>{formattedTransctionAmount}</T.TableCell>
        </T.TableRow>
      );
    });
  };

  return (
    <T.TableWrapper>
      <T.Table>
        <T.TableHead>
          <T.TableRow>
            <TableHeaderRow cells={TB_HEADER_DATA} resource={resource} />
          </T.TableRow>
        </T.TableHead>
        <T.TableBody>
          {lastDayTransactions.map((d, ind) => {
            return (
              <T.TableRow key={ind}>
                <T.TableCell>{"--"}</T.TableCell>
                <T.TableCell>Hier</T.TableCell>

                <T.TableCell>Total</T.TableCell>
                <T.TableCell>--</T.TableCell>
                <T.TableCell blurrable>{formatFiatValue(d.total_amount, d.currency, true)}</T.TableCell>
              </T.TableRow>
            );
          })}
          {renderTransactions()}
        </T.TableBody>
      </T.Table>
    </T.TableWrapper>
  );
};

export default RevenuTable;

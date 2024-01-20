import Link from "next/link";
import { useDispatch } from "react-redux";

import * as T from "components/Table";
import { Body2 } from "styles/Typography";

import { TB_HEADER_DATA } from "./constants";
import formatFiatValue from "utils/formatFiatValue";
import formatDate from "utils/formatDate";
import { Transaction } from "interfaces";
import { AddModalPayload } from "types";
import { addModal } from "store/reducers/modals";
import Button from "components/Button/Button";

interface TransactionsTableProps {
  direction?: Transaction["direction"];
  showSymbol?: boolean;
  showIndex?: boolean;
  clientName: string;
  transactions: Transaction[];
}

const TransactionsTable = ({ direction, showSymbol, clientName, showIndex, transactions }: TransactionsTableProps) => {
  const dispatch = useDispatch();

  const renderTableHeaderCells = () => {
    return TB_HEADER_DATA.map(({ title }) => {
      return <T.TableHeaderCell key={title}>{title}</T.TableHeaderCell>;
    });
  };

  const renderTransactions = () => {
    const transactionsItems = direction ? transactions.filter((tx) => tx.direction === direction) : transactions;
    return transactionsItems.map((transaction, ind) => {
      const {
        id,
        product_id,
        type,
        client_id,
        direction,
        transaction_date,
        info1,
        info2,
        info3,
        info4,
        amount,
        currency,
        recipient,
        note,
      } = transaction;

      const formattedTransactionDate = formatDate(transaction_date);
      const formattedTransactionAmount = formatFiatValue(amount, currency, true);
      const symbol = transaction.amount < 0 ? "-" : "";

      const editFiatTransaction = () => {
        if (type === "Fiat") {
          const ADD_EDIT_MODAL_PAYLOAD: AddModalPayload = {
            name: currency === "EUR" ? "transactionsEUR" : "transactionsDZD",
            title: `Modifier les informations de transaction`,
            params: {
              isEdit: true,
              resourceId: transaction.id,
              document: {
                transaction_date,
                client: clientName,
                client_id,
                type,
                info1: "Argent",
                info2,
                direction,
                currency,
                amount: Math.abs(amount),
                recipient: recipient || "",
                note: note || "",
              },
            },
          };
          dispatch(addModal(ADD_EDIT_MODAL_PAYLOAD));
        }
      };

      const renderDeleteTransactionBtn = () => {
        const ADD_DELETE_MODAL_PAYLOAD: AddModalPayload = {
          name: "delete",
          title: "Confirmer la suppression",
          message: `cette transaction et toutes ses données`,
          resource: currency === "EUR" ? "transactionsEUR" : "transactionsDZD",
          idsToDelete: [transaction.id],
        };
        return (
          <Button variant="ghost" onClick={() => dispatch(addModal(ADD_DELETE_MODAL_PAYLOAD))}>
            <span style={{ color: "red" }}>Suprimmer</span>
          </Button>
        );
      };

      return (
        <T.TableRow key={id}>
          {showIndex && <T.TableCell>{ind + 1}</T.TableCell>}
          <T.TableCell>{formattedTransactionDate}</T.TableCell>
          <T.TableCell>
            {type === "car" ? (
              <Link href={`/cars/${product_id}`}>
                <Body2>{info1}</Body2>
              </Link>
            ) : (
              <Body2 as={type === "Fiat" ? "a" : "p"} onClick={editFiatTransaction}>
                {info1}
              </Body2>
            )}
          </T.TableCell>
          <T.TableCell>
            {["licence", "paper", "procuration"].includes(type) ? (
              <Link href={`/${type}s/${product_id}`}>
                <Body2>{info2}</Body2>
              </Link>
            ) : (
              <Body2>{info2}</Body2>
            )}
          </T.TableCell>
          <T.TableCell>{info3 || "--"}</T.TableCell>
          <T.TableCell>{type === "Fiat" && !showSymbol ? renderDeleteTransactionBtn() : info4 || "--"}</T.TableCell>
          <T.TableCell blurrable>{`${showSymbol ? symbol : ""} ${formattedTransactionAmount}`}</T.TableCell>
        </T.TableRow>
      );
    });
  };

  return (
    <T.TableWrapper>
      <T.Table>
        <T.TableHead>
          <T.TableRow>
            {showIndex && <T.TableHeaderCell>Indice</T.TableHeaderCell>}
            {renderTableHeaderCells()}
          </T.TableRow>
        </T.TableHead>
        <T.TableBody>{renderTransactions()}</T.TableBody>
      </T.Table>
    </T.TableWrapper>
  );
};

export default TransactionsTable;

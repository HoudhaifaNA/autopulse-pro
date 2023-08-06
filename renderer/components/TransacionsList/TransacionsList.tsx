import { useContext } from "react";

import * as S from "components/TransacionsList/TransactionsList.styled";
import { Body2 } from "styles/Typography";

import retreiveTransactionData from "components/TransacionsList/retreiveTransactionData";
import { GlobalContext } from "pages/_app";

import { Transaction } from "../../../interfaces";

interface TransactionsListProps {
  transactions: Transaction[];
  currency: string;
  direction: "entrante" | "sortante";
}

const TransactionsList = (props: TransactionsListProps) => {
  const { transactions, currency, direction } = props;
  const { setDocument } = useContext(GlobalContext);
  return (
    <S.TransactionsTable>
      <tbody>
        {transactions
          .filter((tx) => tx.direction === direction)
          .map((transaction, ind) => {
            const { type, productId } = transaction;
            const txData = retreiveTransactionData(transaction, currency);

            return (
              <S.TransactionRow key={ind}>
                {txData.map((cell, i) => {
                  const goToProduct = () => {
                    let isProduct = false;
                    if (type === "car" && i === 1) isProduct = true;
                    if (type === "licence" && i === 2) isProduct = true;

                    if (isProduct) {
                      setDocument({ type: `${type}s`, id: productId });
                    }
                  };

                  return (
                    <S.TransactionCell key={i} onClick={goToProduct}>
                      <Body2>{cell}</Body2>
                    </S.TransactionCell>
                  );
                })}
              </S.TransactionRow>
            );
          })}
      </tbody>
    </S.TransactionsTable>
  );
};

export default TransactionsList;

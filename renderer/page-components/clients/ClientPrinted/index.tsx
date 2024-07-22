import Image from "next/image";
import React, { Ref, forwardRef } from "react";

import * as S from "./styles";
import { Body1, Body2, Heading3, LabelText } from "styles/Typography";
import FiatItemLine from "./FiatItemLine";
import * as T from "components/Table";
import TransactionsTable from "../TransactionsTable";

import useClientTransactions, { ClientTransactionFilter } from "hooks/useClientTransactions";
import useClientLastTransaction from "hooks/useClientLastTransaction";
import formatDate from "utils/formatDate";
import formatFiatValue from "utils/formatFiatValue";

interface ClientPrintedProps {
  id: string | number;
  type: "last" | "all";
  filter?: ClientTransactionFilter;
}

const receipteTitleFormatter = (filter: ClientPrintedProps["filter"]) => {
  const typesTranslated: Record<string, string> = {
    car: "voiture",
    paper: "dossier",
    procuration: "procuration",
    Fiat: "argent",
    licence: "licence",
  };
  const titleList: string[] = [];
  if (filter?.currency) titleList.push(filter.currency);
  if (filter?.direction) titleList.push(filter.direction);

  let types = "";
  if (filter?.types) {
    filter.types
      .split(",")
      .map((t) => (typesTranslated[t] ? typesTranslated[t] : ""))
      .join(", ");
  }

  if (types) titleList.push(`(${types})`);

  return titleList.join(", ");
};

const ClientPrinted = forwardRef(({ id, type, filter }: ClientPrintedProps, ref: Ref<HTMLDivElement>) => {
  const { data } = type === "all" ? useClientTransactions(id, filter) : useClientLastTransaction(id);

  const title = receipteTitleFormatter(filter);
  const renderTransactionsTable = () => {
    if (data && "transactions" in data) {
      const typeTranslations: Record<string, string> = {
        car: "Voitures",
        licence: "Licences",
        procuration: "Procurations",
        paper: "Dossiers",
        Fiat: "Argent",
      };

      const transactionsByTypeAndDirection: Record<string, any[]> = {};
      data.transactions.forEach((transaction) => {
        const key = `${transaction.type}_${transaction.direction}`;
        if (!transactionsByTypeAndDirection[key]) {
          transactionsByTypeAndDirection[key] = [];
        }
        transactionsByTypeAndDirection[key].push(transaction);
      });

      const types = Array.from(new Set(data.transactions.map((transaction) => transaction.type)));
      const calcTBTotals = (tb: any[], currency: "EUR" | "DZD") => {
        return tb ? tb.reduce((acc, curr) => (curr.currency === currency ? acc + curr.amount : acc), 0) : 0;
      };

      return (
        <>
          {types.map((type) => {
            const translatedType = typeTranslations[type] || type; // Use translated type if available, otherwise use original type
            const keySortante = `${type}_sortante`;
            const keyEntrante = `${type}_entrante`;
            const totalEURSortante = calcTBTotals(transactionsByTypeAndDirection[keySortante], "EUR");
            const totalDZDSortante = calcTBTotals(transactionsByTypeAndDirection[keySortante], "DZD");
            const totalEUREntrante = calcTBTotals(transactionsByTypeAndDirection[keyEntrante], "EUR");
            const totalDZDEntrante = calcTBTotals(transactionsByTypeAndDirection[keyEntrante], "DZD");

            return (
              <>
                {transactionsByTypeAndDirection[keySortante] && (
                  <S.GroupTable key={keySortante}>
                    <S.GroupHeader>
                      <Heading3>Z-AUTO</Heading3>
                      <Body1>({translatedType})</Body1>
                    </S.GroupHeader>
                    {transactionsByTypeAndDirection[keySortante] && (
                      <TransactionsTable
                        transactions={transactionsByTypeAndDirection[keySortante]}
                        clientName={data.client.full_name}
                        forPrint
                      />
                    )}
                    <S.GroupTotals>
                      <S.GroupTotalsList>
                        <FiatItemLine label={`Total (DZD) `} value={totalDZDSortante} currency="DZD" />
                        <FiatItemLine label={`Total (EUR) `} value={totalEURSortante} currency="EUR" />
                      </S.GroupTotalsList>
                    </S.GroupTotals>
                  </S.GroupTable>
                )}
                {transactionsByTypeAndDirection[keyEntrante] && (
                  <S.GroupTable key={keyEntrante}>
                    <S.GroupHeader>
                      <Heading3>{data.client.full_name}</Heading3>
                      <Body1>({translatedType})</Body1>
                    </S.GroupHeader>
                    {transactionsByTypeAndDirection[keyEntrante] && (
                      <TransactionsTable
                        transactions={transactionsByTypeAndDirection[keyEntrante]}
                        clientName={data.client.full_name}
                        forPrint
                      />
                    )}
                    <S.GroupTotals>
                      <S.GroupTotalsList>
                        <FiatItemLine label="Total (DZD)" value={totalDZDEntrante} currency="DZD" />
                        <FiatItemLine label="Total (EUR)" value={totalEUREntrante} currency="EUR" />
                      </S.GroupTotalsList>
                    </S.GroupTotals>
                  </S.GroupTable>
                )}
              </>
            );
          })}

          <S.GroupTable>
            <S.GroupHeader>
              <Heading3>Totaux</Heading3>
            </S.GroupHeader>
            <T.TableWrapper>
              <T.Table>
                <T.TableHead>
                  <T.TableRow>
                    <T.TableHeaderCell>-</T.TableHeaderCell>
                    <T.TableHeaderCell>Z AUTO</T.TableHeaderCell>
                    <T.TableHeaderCell>{data.client.full_name}</T.TableHeaderCell>
                    <T.TableHeaderCell>Total</T.TableHeaderCell>
                  </T.TableRow>
                </T.TableHead>
                <T.TableBody>
                  <T.TableRow>
                    <T.TableCell>
                      <Body1>DZD</Body1>
                    </T.TableCell>
                    <T.TableCell>{`- ${formatFiatValue(data.client.total_sortante_dzd, "DZD", true)}`}</T.TableCell>
                    <T.TableCell>{`+ ${formatFiatValue(data.client.total_entrante_dzd, "DZD", true)}`}</T.TableCell>
                    <T.TableCell>{`${data.client.dzd_balance < 0 ? "-" : "+"} ${formatFiatValue(
                      data.client.dzd_balance,
                      "DZD",
                      true
                    )}`}</T.TableCell>
                  </T.TableRow>
                  <T.TableRow>
                    <T.TableCell>
                      <Body1>EUR</Body1>
                    </T.TableCell>
                    <T.TableCell>{`- ${formatFiatValue(data.client.total_sortante_eur, "EUR", true)}`}</T.TableCell>
                    <T.TableCell>{`+ ${formatFiatValue(data.client.total_entrante_eur, "EUR", true)}`}</T.TableCell>
                    <T.TableCell>{`${data.client.eur_balance < 0 ? "-" : "+"} ${formatFiatValue(
                      data.client.eur_balance,
                      "EUR",
                      true
                    )}`}</T.TableCell>
                  </T.TableRow>
                </T.TableBody>
              </T.Table>
            </T.TableWrapper>
          </S.GroupTable>
        </>
      );
    }
  };

  const renderLastTransaction = () => {
    if (data && "last_transaction" in data) {
      const { dzd_balance, eur_balance } = data.client;
      const { currency, amount } = data.last_transaction;

      let currentBalance = currency === "EUR" ? eur_balance : dzd_balance;
      const lastBalance = currentBalance - amount;

      return (
        <>
          <FiatItemLine label={`Dernier solde (${currency})`} value={lastBalance} currency={currency} />
          <TransactionsTable transactions={[data.last_transaction]} clientName={data.client.full_name} forPrint />
          <FiatItemLine label={`Solde actuel (${currency})`} value={currentBalance} currency={currency} />
        </>
      );
    }
  };

  return (
    <S.DocumentWrapper ref={ref} id="content">
      <S.DocumentHeader>
        <S.DocumentLogo>
          <Image src="/images/companies/zauto-logo.png" alt="zauto logo" width={300} height={100} />
        </S.DocumentLogo>
        <S.CompanyDetails>
          <LabelText as="p">{process.env.NEXT_PUBLIC_EMAIL}</LabelText>
          <LabelText as="p">{process.env.NEXT_PUBLIC_PHONES}</LabelText>
          <LabelText as="p">{process.env.NEXT_PUBLIC_ADDRESS}</LabelText>
        </S.CompanyDetails>
      </S.DocumentHeader>
      <S.Breaker>
        <S.BreakerLine />
        <Heading3>FACTURE</Heading3>
        <S.BreakerLine />
      </S.Breaker>
      {data && (
        <>
          {type === "all" && title.length > 0 && <h2>Facture : {title}</h2>}
          <S.DetailLine $type="stacked">
            <LabelText as="p">Date d'émission :</LabelText>
            <Body2>{formatDate(new Date().toISOString())}</Body2>
          </S.DetailLine>
          <S.DetailLine $type="stacked">
            <LabelText as="p">Nom :</LabelText>
            <Body2>{data.client.full_name}</Body2>
          </S.DetailLine>
          {type === "all" && renderTransactionsTable()}
          {type === "last" && renderLastTransaction()}
        </>
      )}
      <S.DocumentFooter>
        <LabelText as="p">Signature du destinataire</LabelText>
        <LabelText as="p">Signature du ZAUTO</LabelText>
      </S.DocumentFooter>
    </S.DocumentWrapper>
  );
});

export default ClientPrinted;

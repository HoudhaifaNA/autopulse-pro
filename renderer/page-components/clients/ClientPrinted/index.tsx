import Image from "next/image";
import { Ref, forwardRef } from "react";

import * as S from "./styles";
import { Body2, Heading3, LabelText } from "styles/Typography";
import FiatItemLine from "./FiatItemLine";
import TransactionsTable from "../TransactionsTable";

import useClientTransactions, { ClientTransactionFilter } from "hooks/useClientTransactions";
import useClientLastTransaction from "hooks/useClientLastTransaction";
import formatDate from "utils/formatDate";

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
      const {
        eur_balance,
        dzd_balance,
        total_entrante_eur,
        total_sortante_eur,
        total_sortante_dzd,
        total_entrante_dzd,
      } = data.client;

      return (
        <>
          <TransactionsTable transactions={data.transactions} clientName={data.client.full_name} showSymbol showIndex />
          <S.ClientsTransactionsTotalWrapper>
            <FiatItemLine label="Total sorties (EUR)" value={total_sortante_eur} currency="EUR" />
            <FiatItemLine label="Total entrées (EUR)" value={total_entrante_eur} currency="EUR" />
            <FiatItemLine label="Solde actuel (EUR)" value={eur_balance} currency="EUR" />
            <FiatItemLine label="Total sorties (DZD)" value={total_sortante_dzd} currency="DZD" />
            <FiatItemLine label="Total entrées (DZD)" value={total_entrante_dzd} currency="DZD" />
            <FiatItemLine label="Solde actuel (DZD)" value={dzd_balance} currency="DZD" />
          </S.ClientsTransactionsTotalWrapper>
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
          <TransactionsTable transactions={[data.last_transaction]} clientName={data.client.full_name} showSymbol />
          <FiatItemLine label={`Solde actuel (${currency})`} value={currentBalance} currency={currency} />
        </>
      );
    }
  };

  return (
    <S.DocumentWrapper ref={ref} id="content">
      <S.DocumentHeader>
        <S.DocumentLogo>
          <Image src="/images/companies/zauto-logo.png" alt="zauto logo" width={200} height={70} />
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

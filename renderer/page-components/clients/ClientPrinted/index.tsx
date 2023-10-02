import Image from "next/image";
import { Ref, forwardRef } from "react";

import * as S from "./styles";
import { Body2, Heading3, LabelText } from "styles/Typography";
import FiatItemLine from "./FiatItemLine";
import TransactionsTable from "../TransactionsTable";

import useClientTransactions from "hooks/useClientTransactions";
import useClientLastTransaction from "hooks/useClientLastTransaction";
import formatDate from "utils/formatDate";

interface ClientPrintedProps {
  id: string | number;
  type: "last" | "all";
}

const ClientPrinted = forwardRef(({ id, type }: ClientPrintedProps, ref: Ref<HTMLDivElement>) => {
  const { data } = type === "all" ? useClientTransactions(id) : useClientLastTransaction(id);

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
          <TransactionsTable transactions={data.transactions} showSymbol showIndex />
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
          <TransactionsTable transactions={[data.last_transaction]} showSymbol />
          <FiatItemLine label={`Solde actuel (${currency})`} value={currentBalance} currency={currency} />
        </>
      );
    }
  };

  return (
    <S.DocumentWrapper ref={ref} id="content">
      <S.DocumentHeader>
        <S.DocumentLogo>
          <Image src="/images/logo.png" alt="zauto logo" width={200} height={70} />
        </S.DocumentLogo>
        <S.CompanyDetails>
          <LabelText as="p">zauto.nadhir@gmail.com</LabelText>
          <LabelText as="p">0674987298 - 0550733738 - 0550667971</LabelText>
          <LabelText as="p">Smara , El Eulma, Sétif (19123)</LabelText>
        </S.CompanyDetails>
      </S.DocumentHeader>
      <S.Breaker>
        <S.BreakerLine />
        <Heading3>FACTURE</Heading3>
        <S.BreakerLine />
      </S.Breaker>
      {data && (
        <>
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

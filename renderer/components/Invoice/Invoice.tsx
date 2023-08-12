import { forwardRef } from "react";
import Image from "next/image";
import dayjs from "dayjs";

import * as S from "components/Invoice/Invoice.styled";
import { Body2, Heading4, Heading5, LabelText } from "styles/Typography";
import TransactionsList from "components/TransacionsList/TransacionsList";
import { Transaction } from "types";
import useClientById from "hooks/useClientById";
import useClientTransactions from "hooks/useClientTransactions";
import formatPrice from "utils/formatPrice";

const calculateTotals = (transactions: any[]) => {
  let entranteBalance = 0;
  let sortanteBalance = 0;

  transactions.forEach((transaction: Transaction) => {
    const { direction, total } = transaction;
    if (direction === "entrante") entranteBalance += total;
    if (direction === "sortante") sortanteBalance += total;
  });

  return [entranteBalance, sortanteBalance] as const;
};

type InvoiceProps = {
  clientId: number;
  printType: "last" | "all";
};

const Invoice = forwardRef<HTMLDivElement, InvoiceProps>((props, ref) => {
  const { clientId, printType } = props;
  const { client } = useClientById(clientId);
  const transactions = useClientTransactions(clientId);

  const [entranteTotal, sortanteTotal] = calculateTotals(transactions);
  let entranteText;
  let sortanteText;
  let balanceText;
  let lastBalance = 0;
  if (client) {
    entranteText = formatPrice(entranteTotal, client.clientType);
    sortanteText = formatPrice(sortanteTotal, client.clientType);
    balanceText = formatPrice(client.balance, client.clientType);
    const lastTransactionAmount = client.lastTransaction.total;
    if (client.lastTransaction.direction === "sortante") {
      lastBalance = client.balance + lastTransactionAmount;
    } else {
      lastBalance = client.balance - lastTransactionAmount;
    }
  }

  return (
    <S.InvoiceWrapper ref={ref} className="eye-spy">
      <S.InvoiceHeader>
        <Image width={185} height={80} src="/images/doc-logo.png" alt="Logo" />
        <S.ComapnyDetails>
          <LabelText as="p">zauto.nadhir@gmail.com</LabelText>
          <LabelText as="p">0674987298 - 0550733738 - 0550667971</LabelText>
          <LabelText as="p">Smara , El Eulma, Sétif (19123)</LabelText>
        </S.ComapnyDetails>
      </S.InvoiceHeader>
      <S.InvoiceTitle>
        <div style={{ flexBasis: "60%" }} />
        <Heading4>FACTURE</Heading4>
        <div style={{ flex: 1 }} />
      </S.InvoiceTitle>
      {client && (
        <>
          <S.DetailItem>
            <Body2>Nom de client :</Body2>
            <Body2>{client.fullName}</Body2>
          </S.DetailItem>
          {printType === "last" && (
            <S.DetailItem style={{ justifyContent: "space-between" }}>
              <Body2>Dernier solde :</Body2>
              <Body2 className={lastBalance < 0 ? "red" : "green"}>
                {formatPrice(lastBalance, client.clientType)}
              </Body2>
            </S.DetailItem>
          )}
        </>
      )}

      {client && transactions.length > 0 && (
        <>
          <Heading5>Transactions de ZAUTO (sortante)</Heading5>
          <TransactionsList
            transactions={
              printType === "all" ? transactions : [client.lastTransaction]
            }
            currency={client.clientType}
            direction="sortante"
          />
          <Heading5>Transactions de {client.fullName} (entrante)</Heading5>
          <TransactionsList
            transactions={
              printType === "all" ? transactions : [client.lastTransaction]
            }
            currency={client.clientType}
            direction="entrante"
          />
        </>
      )}
      <div style={{ pageBreakAfter: "always" }}>
        {printType === "all" && (
          <>
            <S.DetailItem style={{ justifyContent: "space-between" }}>
              <Body2>Total des entrants :</Body2>
              <Body2>{entranteText}</Body2>
            </S.DetailItem>
            <S.DetailItem style={{ justifyContent: "space-between" }}>
              <Body2>Total des sortants :</Body2>
              <Body2>{sortanteText}</Body2>
            </S.DetailItem>
          </>
        )}
        {client && (
          <S.DetailItem style={{ justifyContent: "space-between" }}>
            <Body2>Solde actuel :</Body2>
            <Body2 className={client.balance < 0 ? "red" : "green"}>
              {balanceText}
            </Body2>
          </S.DetailItem>
        )}
      </div>
      <S.InvoiceFooter>
        <S.DetailItem style={{ justifyContent: "space-between" }}>
          <Body2>Signature du destinataire </Body2>
        </S.DetailItem>
        <S.DetailItem style={{ justifyContent: "space-between" }}>
          <Body2>Date d'émission :</Body2>
          <Body2> {dayjs(new Date()).format("DD-MM-YYYY")}</Body2>
        </S.DetailItem>
        <S.DetailItem style={{ justifyContent: "space-between" }}>
          <Body2>Signature de ZAUTO </Body2>
        </S.DetailItem>
      </S.InvoiceFooter>
    </S.InvoiceWrapper>
  );
});

export default Invoice;

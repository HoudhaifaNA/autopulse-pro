import Image from "next/image";
import useSWR from "swr";
import dayjs from "dayjs";

import {
  TransactionCell,
  TransactionRow,
  TransactionsTable,
} from "components/TransacionsList/TransactionsList.styled";
import * as S from "components/Invoice/Invoice.styled";
import { Body2, Heading4, LabelText } from "styles/Typography";
import { fetcher } from "utils/API";

const keys = ["date", "info1", "info2", "info3", "info4", "total"];

const renderTransactionsList = (transactions: any[], currency: string) => {
  return transactions.map((transaction, ind) => {
    return (
      <TransactionRow key={ind}>
        {Object.entries(transaction).map(([key, value]: any) => {
          if (keys.indexOf(key) !== -1) {
            let newVal = value;
            let tsxType = transaction["direction"] === "sortante" ? "-" : "+";

            if (key === "date") newVal = dayjs(value).format("DD-MM-YYYY");
            if ((Number(value) && key !== "info4") || value === 0) {
              newVal = `${value.toLocaleString()}.00 ${currency}`;
            }
            if (transaction["type"] === "euros" && key === "info3") {
              newVal = `${(value * 1).toLocaleString()}.00 €`;
            }
            if (transaction["type"] === "euros" && key === "info4") {
              newVal = `${(value * 1).toLocaleString()}.00 DA`;
            }

            if (key === "total") {
              return (
                <TransactionCell key={key} title={value}>
                  <Body2 style={{ textAlign: "right" }}>
                    {tsxType} {newVal}
                  </Body2>
                </TransactionCell>
              );
            } else {
              return (
                <TransactionCell key={key} title={value}>
                  <Body2>{newVal}</Body2>
                </TransactionCell>
              );
            }
          }
        })}
      </TransactionRow>
    );
  });
};

const Invoice = ({
  client,
  printType,
}: {
  client: any;
  printType: "last" | "all";
}) => {
  const {
    id,
    clientType,
    fullName,
    balance,
    type,
    date,
    info1,
    info2,
    info3,
    info4,
    total,
    direction,
  } = client;

  const lastTransaction = [
    { type, date, info1, info2, info3, info4, total, direction },
  ];

  const url = printType === "all" ? `/transactions/client/${id}` : null;
  const { data: transactionsData } = useSWR(url, fetcher);

  let transactionsList = lastTransaction;
  if (printType === "all" && transactionsData) {
    transactionsList = transactionsData.transactions;
  }
  let lastBalance =
    direction === "sortante" ? balance + total : balance - total;

  let currency = "DA";
  if (clientType === "euro") currency = "€";
  function calculateTotals(transactions: any[]) {
    let entranteBalance = 0;
    let sortanteBalance = 0;

    transactions.forEach((tx) => {
      if (tx.direction === "entrante") {
        entranteBalance += tx.total;
      } else if (tx.direction === "sortante") {
        sortanteBalance += tx.total;
      }
    });

    return [entranteBalance, sortanteBalance] as const;
  }

  const [entranteTotal, sortanteTotal] =
    transactionsData && transactionsData.transactions
      ? calculateTotals(transactionsData.transactions)
      : [0, 0];

  return (
    <S.InvoiceWrapper>
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
      <S.DetailItem>
        <Body2>Nom de client :</Body2>
        <Body2>{fullName}</Body2>
      </S.DetailItem>
      {printType === "last" && (
        <S.DetailItem style={{ justifyContent: "space-between" }}>
          <Body2>Dernier solde :</Body2>
          <Body2 className={lastBalance < 0 ? "red" : "green"}>
            {(lastBalance * 1).toLocaleString()}.00 {currency}
          </Body2>
        </S.DetailItem>
      )}
      {transactionsList.length > 0 && (
        <TransactionsTable>
          {renderTransactionsList(transactionsList, currency)}
        </TransactionsTable>
      )}
      <div style={{ pageBreakAfter: "always" }}>
        {printType === "all" && (
          <>
            <S.DetailItem style={{ justifyContent: "space-between" }}>
              <Body2>Total des entrants :</Body2>
              <Body2>
                {(entranteTotal * 1).toLocaleString()}.00 {currency}
              </Body2>
            </S.DetailItem>
            <S.DetailItem style={{ justifyContent: "space-between" }}>
              <Body2>Total des sortants :</Body2>
              <Body2>
                {(sortanteTotal * 1).toLocaleString()}.00 {currency}
              </Body2>
            </S.DetailItem>
          </>
        )}
        <S.DetailItem style={{ justifyContent: "space-between" }}>
          <Body2>Solde actuel :</Body2>
          <Body2 className={balance < 0 ? "red" : "green"}>
            {(balance * 1).toLocaleString()}.00 {currency}
          </Body2>
        </S.DetailItem>
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
};

export default Invoice;

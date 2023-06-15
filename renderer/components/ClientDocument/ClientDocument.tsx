import { ReactNode } from "react";
import useSWR from "swr";

import * as S from "components/ClientDocument/ClientDocument.styled";
import { Body2 } from "styles/Typography";

import Badge, { BadgeProps } from "components/Badge/Badge";
import DetailsViewer, {
  DetailContent,
  DetailHeader,
  DetailItem,
  DetailSection,
} from "components/DetailsViewer/DetailsViewer";

import { fetcher } from "utils/API";
import truncateText from "utils/truncate";
import dayjs from "dayjs";

const clientStatus = (balance: number) => {
  let status: string = "";
  let color: BadgeProps["type"] = "success";
  if (balance < 0) {
    status = "Débiteur";
    color = "error";
  }
  if (balance === 0) {
    status = "Équilibré";
    color = "success";
  }
  if (balance > 0) {
    status = "Créancier";
    color = "warning";
  }
  return <Badge type={color}>{status}</Badge>;
};

const TransactionCell = ({ children }: { children: ReactNode }) => {
  return (
    <S.TransactionCell>
      {typeof children === "string" ? <Body2>{children}</Body2> : children}
    </S.TransactionCell>
  );
};

const keys = ["date", "info1", "info2", "info3", "info4", "total"];

const renderTransactionsList = (transactions: any[]) => {
  return transactions.map((transaction, ind) => {
    return (
      <S.TransactionRow key={ind}>
        {Object.entries(transaction).map(([key, value]: any) => {
          if (keys.indexOf(key) !== -1) {
            let newVal = value;
            if (key === "date") newVal = dayjs(value).format("DD-MM-YYYY");
            if (key === "info1") newVal = truncateText(value, 25);
            if (Number(value) && key !== "info4")
              newVal = `${value.toLocaleString()}.00 DZD`;
            if (transaction["type"] === "euros" && key === "info3") {
              newVal = `€${(value * 1).toLocaleString()}.00`;
            }
            if (transaction["type"] === "euros" && key === "info4") {
              newVal = `${(value * 1).toLocaleString()}.00 DZD`;
            }

            return (
              <TransactionCell key={key}>
                <S.TransactionCell title={value}>
                  <Body2>{newVal}</Body2>
                </S.TransactionCell>
              </TransactionCell>
            );
          } else if (key === "direction") {
            return (
              <TransactionCell key={key}>
                <S.TransactionCell>
                  <Badge type={value === "sortante" ? "error" : "success"}>
                    {value}
                  </Badge>
                </S.TransactionCell>
              </TransactionCell>
            );
          }
        })}
      </S.TransactionRow>
    );
  });
};

const ClientDocument = ({ document }: { document: any }) => {
  const { data, isLoading, error } = useSWR(
    `/transactions/client/${document.id}`,
    fetcher
  );

  const balanceText = Math.abs(document.balance).toLocaleString();

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
    data && data.transactions ? calculateTotals(data.transactions) : [0, 0];

  let profit = `${(entranteTotal - sortanteTotal).toLocaleString()}.00 DZD`;
  if (entranteTotal - sortanteTotal < 0) profit += " _RD";
  if (entranteTotal - sortanteTotal > 0) profit += " _GR";

  return (
    <DetailsViewer title="Document de client" $width="80%">
      <DetailSection>
        <DetailHeader title="Détails du client" />
        <DetailContent $columns={3}>
          <DetailItem title="nom" value={document.fullName} />
          <DetailItem title="solde" value={`${balanceText} DZD`} />
          <DetailItem title="statut" value={clientStatus(document.balance)} />
        </DetailContent>
      </DetailSection>
      {data && data.transactions.length > 0 && (
        <>
          <DetailSection>
            <DetailHeader title="Transactions" />
            <DetailContent $columns={1}>
              <S.TransactionsTable>
                {renderTransactionsList(data.transactions)}
              </S.TransactionsTable>
            </DetailContent>
          </DetailSection>
          <DetailSection>
            <DetailHeader title="Totaux" />
            <DetailContent $columns={3}>
              {/* <DetailItem title="total des euros vendus" value="Є700000.00" />
               <DetailItem title="total des euros achetés" value="Є200000.00" />
               <DetailItem title="somme d'euros" value="Є500000.00 _GR" /> */}
              <DetailItem
                title="total des entrants:"
                value={`${entranteTotal.toLocaleString()}.00 DZD`}
              />
              <DetailItem
                title="total des sortants"
                value={`${sortanteTotal.toLocaleString()}.00 DZD`}
              />
              <DetailItem title="Total" value={profit} />
            </DetailContent>
          </DetailSection>
        </>
      )}
    </DetailsViewer>
  );
};

export default ClientDocument;

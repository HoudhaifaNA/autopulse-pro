import { ReactNode } from "react";

import * as S from "components/ClientDocument/ClientDocument.styled";
import { Body2 } from "styles/Typography";

import Badge from "components/Badge/Badge";
import DetailsViewer, {
  DetailContent,
  DetailHeader,
  DetailItem,
  DetailSection,
} from "components/DetailsViewer/DetailsViewer";

import { CLIENT_TRANSACTION } from "components/ClientDocument/constants";

const TransactionCell = ({ children }: { children: ReactNode }) => {
  return (
    <S.TransactionCell>
      {typeof children === "string" ? <Body2>{children}</Body2> : children}
    </S.TransactionCell>
  );
};

const renderTransactionsList = () => {
  return CLIENT_TRANSACTION.map((transaction, ind) => {
    return (
      <S.TransactionRow key={ind}>
        {Object.values(transaction).map((cell, i) => {
          return (
            <TransactionCell key={i}>
              {i !== 6 ? cell : <Badge type="success">{cell}</Badge>}
            </TransactionCell>
          );
        })}
      </S.TransactionRow>
    );
  });
};

const ClientDocument = () => {
  return (
    <DetailsViewer title="Document de client">
      <DetailSection>
        <DetailHeader title="Détails du client" />
        <DetailContent $columns={3}>
          <DetailItem title="nom" value="Ahmed Nadhir" />
          <DetailItem title="Dette" value="200000.00" />
          <DetailItem
            title="Statut de paiement"
            value={<Badge type="error">Endette</Badge>}
          />
        </DetailContent>
      </DetailSection>
      <DetailSection>
        <DetailHeader title="Transactions" />
        <DetailContent $columns={1}>
          <S.TransactionsTable>{renderTransactionsList()}</S.TransactionsTable>
        </DetailContent>
      </DetailSection>
      <DetailSection>
        <DetailHeader title="Totaux" />
        <DetailContent $columns={3}>
          <DetailItem title="total des euros vendus" value="Є700000.00" />
          <DetailItem title="total des euros achetés" value="Є200000.00" />
          <DetailItem title="somme d'euros" value="Є500000.00 _GR" />
          <DetailItem title="total des entrants:" value="700000.00 DZD" />
          <DetailItem title="total des sortants" value="200000.00 DZD" />
          <DetailItem title="Total" value="500000.00 _GR" />
        </DetailContent>
      </DetailSection>
    </DetailsViewer>
  );
};

export default ClientDocument;

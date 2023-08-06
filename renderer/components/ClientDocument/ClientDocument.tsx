import { useContext } from "react";

import DetailsViewer, {
  DetailContent,
  DetailHeader,
  DetailItem,
  DetailSection,
} from "components/DetailsViewer/DetailsViewer";
import TransactionsList from "components/TransacionsList/TransacionsList";

import useClientById from "hooks/useClientById";
import useClientTransactions from "hooks/useClientTransactions";
import formatPrice from "utils/formatPrice";
import { GlobalContext } from "pages/_app";

import { Transaction } from "../../../interfaces";
import Button from "components/Button/Button";

const currencies = {
  DA: "DA",
  euro: "€",
};

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

const ClientDocument = () => {
  const { currDocument, setModal, toggleModalDelete } =
    useContext(GlobalContext);
  const { client } = useClientById(currDocument.id);
  const transactions = useClientTransactions(currDocument.id);

  const clientCurrency = currencies[client?.clientType ?? "DA"];
  const [entranteTotal, sortanteTotal] = calculateTotals(transactions);
  const entranteText = formatPrice(entranteTotal, clientCurrency);
  const sortanteText = formatPrice(sortanteTotal, clientCurrency);
  let balanceText = formatPrice(client?.balance, clientCurrency);

  if (client) {
    if (client.balance < 0) balanceText += " _RD";
    if (client.balance > 0) balanceText += " _GR";
  }

  return (
    <>
      {client && (
        <DetailsViewer title="Document de client" $width="75%">
          <div style={{ display: "flex", gap: "2rem" }}>
            <Button
              variant="primary"
              icon="edit"
              onClick={() => {
                const { id, fullName, clientType, balance } = client;

                setModal({
                  name: "clients",
                  edit: true,
                  data: {
                    ...client,
                    id,
                    fullName,
                    clientType,
                    balance,
                  },
                });
              }}
            >
              Modifier
            </Button>
            <Button
              variant="danger"
              icon="delete"
              onClick={() => {
                const { id, fullName, clientType, balance } = client;
                toggleModalDelete({
                  name: `${fullName} et sa transactions (voitures, licences, transferts d'argent)`,
                  url: `/clients/${id}`,
                });
              }}
            >
              Suprimmer
            </Button>
          </div>
          <DetailSection>
            <DetailHeader title="Détails du client" />
            <DetailContent $columns={3}>
              <DetailItem title="nom" value={client.fullName} />
              <DetailItem
                title="Numéro de téléphone"
                value={client.phoneNumber ? client.phoneNumber : "--"}
              />
            </DetailContent>
          </DetailSection>
          {transactions.length > 0 && (
            <>
              <DetailSection>
                <DetailHeader title="Totaux" />
                <DetailContent $columns={3}>
                  <DetailItem
                    title="total des entrants"
                    value={entranteText}
                    blurrable={true}
                  />
                  <DetailItem
                    title="total des sortants"
                    value={sortanteText}
                    blurrable={true}
                  />
                  <DetailItem
                    title="Total"
                    value={balanceText}
                    blurrable={true}
                  />
                </DetailContent>
              </DetailSection>
              <DetailSection>
                <DetailHeader title={`Transactions de ZAUTO (sortante)`} />
                <DetailContent $columns={1}>
                  <TransactionsList
                    transactions={transactions}
                    currency={clientCurrency}
                    direction="sortante"
                  />
                </DetailContent>
              </DetailSection>
              <DetailSection>
                <DetailHeader
                  title={`Transactions de ${client.fullName} (entrante)`}
                />
                <DetailContent $columns={1}>
                  <TransactionsList
                    transactions={transactions}
                    currency={clientCurrency}
                    direction="entrante"
                  />
                </DetailContent>
              </DetailSection>
            </>
          )}
        </DetailsViewer>
      )}
    </>
  );
};

export default ClientDocument;

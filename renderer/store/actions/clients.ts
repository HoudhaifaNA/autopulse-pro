import { Client } from "interfaces";
import { AddModalPayload } from "types";
import dateToString from "utils/dateToString";

const retreiveClientActions = (client: Client) => {
  const { id, full_name, email, phone, address, dzd_balance, eur_balance } = client;

  const UPDATE: AddModalPayload = {
    name: "clients",
    title: `Modifier les informations de ${full_name}`,
    params: {
      isEdit: true,
      resourceId: id,
      document: {
        full_name,
        email,
        phone,
        address,
        dzd_balance,
        eur_balance,
      },
    },
  };
  const TRANSFER_EUR: AddModalPayload = {
    name: "transactionsEUR",
    title: `Ajouter un virement euro`,
    params: {
      isEdit: false,
      resourceId: 0,
      document: {
        transaction_date: dateToString(new Date()),
        client: full_name,
        client_id: id,
        type: "Fiat",
        info1: "Argent",
        info2: "Espèces",
        direction: "entrante",
        currency: "EUR",
        amount: 0,
      },
    },
  };
  const TRANSFER_DZD: AddModalPayload = {
    name: "transactionsDZD",
    title: `Ajouter un virement en dinars`,
    params: {
      isEdit: false,
      resourceId: 0,
      document: {
        transaction_date: dateToString(new Date()),
        client: full_name,
        client_id: id,
        type: "Fiat",
        info1: "Argent",
        info2: "Espèces",
        direction: "entrante",
        currency: "DZD",
        amount: 0,
      },
    },
  };

  const DELETE: AddModalPayload = {
    name: "delete",
    title: "Confirmer la suppression",
    message: `${full_name} et toutes ses données`,
    resource: "clients",
    idsToDelete: [id],
  };

  return { UPDATE, TRANSFER_EUR, TRANSFER_DZD, DELETE };
};

export default retreiveClientActions;

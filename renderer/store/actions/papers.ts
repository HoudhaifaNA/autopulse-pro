import { Paper } from "interfaces";
import { AddModalPayload } from "types";

const retreivePaperActions = (paper: Paper) => {
  const { id, type, car, car_id, seller_id, seller, purchased_at, issue_date, received_at, price } = paper;
  const typeUi = type === "expense" ? "Dépense" : "Transaction";

  const UPDATE: AddModalPayload = {
    name: "papers",
    title: `Modifier les informations de dossier de ${car}`,
    params: {
      isEdit: true,
      resourceId: id,
      document: {
        type_ui: typeUi,
        type,
        car,
        car_id,
        seller_id,
        seller,
        purchased_at,
        issue_date,
        received_at,
        price,
      },
    },
  };

  const DELETE: AddModalPayload = {
    name: "delete",
    title: "Confirmer la suppression",
    message: `le dossier de ${car}`,
    resource: "papers",
    idsToDelete: [id],
  };

  return { UPDATE, DELETE };
};

export default retreivePaperActions;

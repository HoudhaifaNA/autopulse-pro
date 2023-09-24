import { Procuration } from "interfaces";
import { AddModalPayload } from "types";

const retreiveProcurationActions = (procuration: Procuration) => {
  const { id, type, licence_id, moudjahid, notary, purchased_at, issue_date, received_at, price } = procuration;

  const typeUi = type === "expense" ? "Dépense" : "Transaction";

  const UPDATE: AddModalPayload = {
    name: "procurations",
    title: `Modifier les informations de procuration de ${moudjahid}`,
    params: {
      isEdit: true,
      resourceId: id,
      document: {
        type_ui: typeUi,
        type,
        licence_id,
        moudjahid,
        notary: notary || "",
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
    message: `la procuraton de ${moudjahid}`,
    resource: "procurations",
    idsToDelete: [id],
  };
  return { UPDATE, DELETE };
};

export default retreiveProcurationActions;

import { Paper } from "interfaces";
import { AddModalPayload } from "types";
import dateToString from "utils/dateToString";

const retreivePaperActions = (paper: Paper) => {
  const {
    id,
    type,
    car,
    car_id,
    seller_id,
    seller,
    purchased_at,
    given_at,
    note,
    owner,
    recipient,
    received_at,
    price,
    buyer,
  } = paper;

  const UPDATE: AddModalPayload = {
    name: "papers",
    title: `Modifier les informations de dossier de ${car}`,
    params: {
      isEdit: true,
      resourceId: id,
      document: {
        type,
        car,
        car_id,
        seller_id,
        seller,
        owner,
        purchased_at,
        given_at,
        price,
        note: note || "",
      },
    },
  };

  const DELIVER: AddModalPayload = {
    name: "deliver_paper",
    title: `Livrer dossier de ${car}`,
    params: {
      isEdit: true,
      resourceId: id,
      document: {
        received_at: received_at || dateToString(new Date()),
        recipient: recipient || buyer,
        note: note || "",
      },
    },
  };

  const CANCEL_PAPER_DELIVER: AddModalPayload = {
    name: "cancel_paper_delivery",
    title: "Confirmer la suppression",
    message: `les informations dossier de ${car}`,
    resource: "papers",
    idsToDelete: [id],
  };

  const DELETE: AddModalPayload = {
    name: "delete",
    title: "Confirmer la suppression",
    message: `le dossier de ${car}`,
    resource: "papers",
    idsToDelete: [id],
  };

  return { UPDATE, DELIVER, CANCEL_PAPER_DELIVER, DELETE };
};

export default retreivePaperActions;

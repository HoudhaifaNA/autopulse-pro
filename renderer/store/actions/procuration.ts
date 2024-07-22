import { Procuration } from "interfaces";
import { AddModalPayload } from "types";
import dateToString from "utils/dateToString";

const retreiveProcurationActions = (procuration: Procuration) => {
  const {
    id,
    purchased_at,
    car_id,
    car,
    seller_id,
    seller,
    car_serial_number,
    moudjahid,
    notary,
    procurator,
    price,
    note,
    issue_date,
    is_expense,
    received_at,
    recipient,
  } = procuration;

  const UPDATE: AddModalPayload = {
    name: "procurations",
    title: `Modifier les informations de procuration de ${moudjahid}`,
    params: {
      isEdit: true,
      resourceId: id,
      document: {
        purchased_at,
        price,
        car_id,
        car: `${car} (${car_serial_number})`,
        seller_id,
        seller,
        moudjahid,
        procurator,
        notary: notary || "",
        note: note || "",
        issue_date,
      },
    },
  };

  const DELIVER: AddModalPayload = {
    name: "deliver_procuration",
    title: `Livrer procuration de ${moudjahid}`,
    params: {
      isEdit: true,
      resourceId: id,
      document: {
        received_at: received_at || dateToString(new Date()),
        recipient: recipient || procurator,
        is_expense,
        note: note || "",
      },
    },
  };
  const CANCEL_PROCURATION_DELIVER: AddModalPayload = {
    name: "cancel_procuration_delivery",
    title: "Confirmer la suppression",
    message: `les informations de procuration de ${moudjahid}`,
    resource: "procurations",
    idsToDelete: [id],
  };

  const DELETE: AddModalPayload = {
    name: "delete",
    title: "Confirmer la suppression",
    message: `la procuraton de ${moudjahid}`,
    resource: "procurations",
    idsToDelete: [id],
  };
  return { UPDATE, DELIVER, CANCEL_PROCURATION_DELIVER, DELETE };
};

export default retreiveProcurationActions;

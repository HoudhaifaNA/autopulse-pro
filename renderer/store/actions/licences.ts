import { AddModalPayload } from "types";
import { Licence } from "interfaces";

const retreiveLicenceActions = (licence: Licence) => {
  const { id, moudjahid, seller_id, seller, purchased_at, issue_date, serial_number, note, wilaya, price } = licence;

  const UPDATE: AddModalPayload = {
    name: "licences",
    title: `Modifier les informations de la licence de ${licence.moudjahid}`,
    params: {
      isEdit: true,
      resourceId: id,
      document: {
        moudjahid,
        seller,
        seller_id,
        purchased_at,
        issue_date,
        serial_number,
        wilaya,
        price,
        note: note || "",
        attachments: [],
      },
    },
  };

  const DELETE: AddModalPayload = {
    name: "delete",
    title: "Confirmer la suppression",
    message: `la licence de ${moudjahid}`,
    resource: "licences",
    idsToDelete: [id],
  };

  return { UPDATE, DELETE };
};

export default retreiveLicenceActions;

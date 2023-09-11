import { useDispatch } from "react-redux";

import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";

import { addModal } from "store/reducers/modals";
import { AddModalPayload } from "types";
import { Procuration } from "interfaces";

interface ActionsDropdownProps {
  procuration: Procuration;
}

const ActionsDropdown = ({ procuration }: ActionsDropdownProps) => {
  const dispatch = useDispatch();

  const { id, type, licence_id, moudjahid, notary, purchased_at, issue_date, received_at, price } = procuration;
  const typeUi = type === "expense" ? "Dépense" : "Transaction";
  const ADD_EDIT_MODAL_PAYLOAD: AddModalPayload = {
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

  const ADD_DELETE_MODAL_PAYLOAD: AddModalPayload = {
    name: "delete",
    title: "Confirmer la suppression",
    message: `la procuraton de ${moudjahid}`,
    resource: "procurations",
    idsToDelete: [id],
  };

  return (
    <Dropdown $right="1.5rem" $top="4rem" $width="30rem">
      <Button
        variant="ghost"
        icon="edit"
        onClick={() => {
          dispatch(addModal(ADD_EDIT_MODAL_PAYLOAD));
        }}
      >
        Modifier
      </Button>
      <Button
        variant="ghost"
        icon="delete"
        onClick={() => {
          dispatch(addModal(ADD_DELETE_MODAL_PAYLOAD));
        }}
      >
        Supprimer
      </Button>
    </Dropdown>
  );
};

export default ActionsDropdown;

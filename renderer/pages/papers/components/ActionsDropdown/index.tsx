import { useDispatch } from "react-redux";

import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";

import { addModal } from "store/reducers/modals";
import { AddModalPayload } from "types";
import { Paper } from "interfaces";

interface ActionsDropdownProps {
  paper: Paper;
}

const ActionsDropdown = ({ paper }: ActionsDropdownProps) => {
  const dispatch = useDispatch();

  const { id, type, car, car_id, seller_id, seller, purchased_at, issue_date, received_at, price } = paper;
  const typeUi = type === "expense" ? "Dépense" : "Transaction";
  const ADD_EDIT_MODAL_PAYLOAD: AddModalPayload = {
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

  const ADD_DELETE_MODAL_PAYLOAD: AddModalPayload = {
    name: "delete",
    title: "Confirmer la suppression",
    message: `le dossier de ${car}`,
    resource: "papers",
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

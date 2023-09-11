import { useDispatch } from "react-redux";

import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";

import { addModal } from "store/reducers/modals";
import { AddModalPayload } from "types";
import { Expense } from "interfaces";

interface ActionsDropdownProps {
  expense: Expense;
}

const ActionsDropdown = ({ expense }: ActionsDropdownProps) => {
  const dispatch = useDispatch();
  const { id, expense_date, raison, cost } = expense;
  const ADD_EDIT_MODAL_PAYLOAD: AddModalPayload = {
    name: "expenses",
    title: `Modifier les informations de dépense ${raison}`,
    params: {
      isEdit: true,
      resourceId: id,
      document: {
        expense_date,
        raison,
        cost,
      },
    },
  };

  const ADD_DELETE_MODAL_PAYLOAD: AddModalPayload = {
    name: "delete",
    title: "Confirmer la suppression",
    message: `${raison} et toutes ses données`,
    resource: "expenses",
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

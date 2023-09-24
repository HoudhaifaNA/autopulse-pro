import { useDispatch } from "react-redux";

import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";

import { addModal } from "store/reducers/modals";
import { retreiveExpensesActions } from "store/actions/expenses";
import { Expense } from "interfaces";

interface ActionsDropdownProps {
  expense: Expense;
}

const ActionsDropdown = ({ expense }: ActionsDropdownProps) => {
  const dispatch = useDispatch();

  const { UPDATE, DELETE } = retreiveExpensesActions(expense);

  return (
    <Dropdown $right="1.5rem" $top="4rem" $width="30rem">
      <Button variant="ghost" icon="edit" onClick={() => dispatch(addModal(UPDATE))}>
        Modifier
      </Button>
      <Button variant="ghost" icon="delete" onClick={() => dispatch(addModal(DELETE))}>
        Supprimer
      </Button>
    </Dropdown>
  );
};

export default ActionsDropdown;

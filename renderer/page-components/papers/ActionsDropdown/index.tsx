import { useDispatch } from "react-redux";

import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";

import { addModal } from "store/reducers/modals";
import { Paper } from "interfaces";
import retreivePaperActions from "store/actions/papers";

interface ActionsDropdownProps {
  paper: Paper;
}

const ActionsDropdown = ({ paper }: ActionsDropdownProps) => {
  const dispatch = useDispatch();

  const { UPDATE, DELETE } = retreivePaperActions(paper);

  return (
    <Dropdown $right="1.5rem" $top="4rem" $width="30rem">
      <Button
        variant="ghost"
        icon="edit"
        onClick={() => {
          dispatch(addModal(UPDATE));
        }}
      >
        Modifier
      </Button>
      <Button
        variant="ghost"
        icon="delete"
        onClick={() => {
          dispatch(addModal(DELETE));
        }}
      >
        Supprimer
      </Button>
    </Dropdown>
  );
};

export default ActionsDropdown;

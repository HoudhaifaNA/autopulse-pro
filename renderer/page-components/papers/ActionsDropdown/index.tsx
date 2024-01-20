import { useDispatch } from "react-redux";

import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";

import { addModal } from "store/reducers/modals";
import { Paper } from "interfaces";
import retreivePaperActions from "store/actions/papers";

interface ActionsDropdownProps {
  id: string;
  paper: Paper;
}

const ActionsDropdown = ({ paper, id }: ActionsDropdownProps) => {
  const dispatch = useDispatch();

  const { UPDATE, DELIVER, CANCEL_PAPER_DELIVER, DELETE } = retreivePaperActions(paper);

  return (
    <Dropdown $right="1.5rem" $top="4rem" $width="30rem" id={id}>
      <Button variant="ghost" icon="deliver" onClick={() => dispatch(addModal(DELIVER))}>
        {paper.has_received ? "Modifier livraison" : "Livrer"}
      </Button>
      {paper.has_received ? (
        <Button variant="ghost" icon="cancel" onClick={() => dispatch(addModal(CANCEL_PAPER_DELIVER))}>
          Annuler livraison
        </Button>
      ) : null}
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

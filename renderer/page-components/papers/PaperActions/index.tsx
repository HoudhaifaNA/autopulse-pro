import { useDispatch } from "react-redux";

import ActionsList from "components/ActionsList";
import Button from "components/Button/Button";

import retreivePaperActions from "store/actions/papers";
import { addModal } from "store/reducers/modals";
import { Paper } from "interfaces";

const PaperActions = ({ paper }: { paper: Paper }) => {
  const dispatch = useDispatch();

  const { UPDATE, DELETE } = retreivePaperActions(paper);

  return (
    <ActionsList>
      <Button
        variant="primary"
        icon="edit"
        onClick={() => {
          dispatch(addModal(UPDATE));
        }}
      >
        Modifier
      </Button>
      <Button
        variant="primary"
        icon="delete"
        onClick={() => {
          dispatch(addModal(DELETE));
        }}
      >
        Supprimer
      </Button>
    </ActionsList>
  );
};

export default PaperActions;

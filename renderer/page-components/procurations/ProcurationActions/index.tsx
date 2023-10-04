import { useDispatch } from "react-redux";

import ActionsList from "components/ActionsList";
import Button from "components/Button/Button";

import retreiveProcurationActions from "store/actions/procuration";
import { addModal } from "store/reducers/modals";
import { Procuration } from "interfaces";

const ProcurationActions = ({ procuration }: { procuration: Procuration }) => {
  const dispatch = useDispatch();

  const { UPDATE, DELETE } = retreiveProcurationActions(procuration);

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

export default ProcurationActions;

import { useDispatch } from "react-redux";

import ActionsList from "components/ActionsList";
import Button from "components/Button/Button";

import retreiveProcurationActions from "store/actions/procuration";
import { addModal } from "store/reducers/modals";
import { Procuration } from "interfaces";

const ProcurationActions = ({ procuration }: { procuration: Procuration }) => {
  const dispatch = useDispatch();

  const { UPDATE, DELIVER, CANCEL_PROCURATION_DELIVER, DELETE } = retreiveProcurationActions(procuration);

  return (
    <ActionsList>
      <Button variant="primary" icon="deliver" onClick={() => dispatch(addModal(DELIVER))}>
        {procuration.has_received ? "Modifier livraison" : "Livrer"}
      </Button>
      {procuration.has_received ? (
        <Button variant="primary" icon="cancel" onClick={() => dispatch(addModal(CANCEL_PROCURATION_DELIVER))}>
          Annuler livraison
        </Button>
      ) : null}
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

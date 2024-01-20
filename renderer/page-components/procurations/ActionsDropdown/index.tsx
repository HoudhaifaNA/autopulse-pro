import { useDispatch } from "react-redux";

import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";

import { addModal } from "store/reducers/modals";
import { Procuration } from "interfaces";
import retreiveProcurationActions from "store/actions/procuration";

interface ActionsDropdownProps {
  id: string;
  procuration: Procuration;
}

const ActionsDropdown = ({ procuration, id }: ActionsDropdownProps) => {
  const dispatch = useDispatch();

  const { UPDATE, DELIVER, CANCEL_PROCURATION_DELIVER, DELETE } = retreiveProcurationActions(procuration);

  return (
    <Dropdown $right="1.5rem" $top="4rem" $width="30rem" id={id}>
      <Button variant="ghost" icon="deliver" onClick={() => dispatch(addModal(DELIVER))}>
        {procuration.has_received ? "Modifier livraison" : "Livrer"}
      </Button>
      {procuration.has_received ? (
        <Button variant="ghost" icon="cancel" onClick={() => dispatch(addModal(CANCEL_PROCURATION_DELIVER))}>
          Annuler livraison
        </Button>
      ) : null}
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

import { useDispatch } from "react-redux";

import Button from "components/Button/Button";
import ActionsList from "components/ActionsList";

import { Licence } from "interfaces";
import { addModal } from "store/reducers/modals";
import retreiveLicenceActions from "store/actions/licences";

interface LicenceActionsProps {
  licence: Licence;
}

const LicenceActions = ({ licence }: LicenceActionsProps) => {
  const dispatch = useDispatch();

  const { UPDATE, DELETE } = retreiveLicenceActions(licence);

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

export default LicenceActions;

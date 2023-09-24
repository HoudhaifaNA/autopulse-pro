import { useDispatch } from "react-redux";

import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";

import { addModal } from "store/reducers/modals";
import { Licence } from "interfaces";
import retreiveLicenceActions from "store/actions/licences";

interface ActionsDropdownProps {
  licence: Licence;
}

const ActionsDropdown = ({ licence }: ActionsDropdownProps) => {
  const dispatch = useDispatch();

  const { UPDATE, DELETE } = retreiveLicenceActions(licence);

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

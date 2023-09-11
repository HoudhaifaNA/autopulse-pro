import { useDispatch } from "react-redux";

import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";

import { addModal } from "store/reducers/modals";
import { AddModalPayload } from "types";
import { Licence } from "interfaces";

interface ActionsDropdownProps {
  licence: Licence;
}

const ActionsDropdown = ({ licence }: ActionsDropdownProps) => {
  const dispatch = useDispatch();

  const { id, moudjahid, seller_id, seller, purchased_at, issue_date, serial_number, wilaya, price } = licence;
  const ADD_EDIT_MODAL_PAYLOAD: AddModalPayload = {
    name: "licences",
    title: `Modifier les informations de la licence de ${licence.moudjahid}`,
    params: {
      isEdit: true,
      resourceId: id,
      document: {
        moudjahid,
        seller,
        seller_id,
        purchased_at,
        issue_date,
        serial_number,
        wilaya,
        price,
        attachments: [],
      },
    },
  };

  const ADD_DELETE_MODAL_PAYLOAD: AddModalPayload = {
    name: "delete",
    title: "Confirmer la suppression",
    message: `la licence de ${moudjahid}`,
    resource: "licences",
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

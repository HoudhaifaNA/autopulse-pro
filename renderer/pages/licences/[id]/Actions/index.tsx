import { useDispatch } from "react-redux";

import * as S from "./styles";
import Button from "components/Button/Button";

import { AddModalPayload } from "types";
import { Licence } from "interfaces";
import { addModal } from "store/reducers/modals";

interface ActionsProps {
  licence: Licence;
}
const Actions = ({ licence }: ActionsProps) => {
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
    <S.ActionsList>
      <Button
        variant="primary"
        icon="edit"
        onClick={() => {
          dispatch(addModal(ADD_EDIT_MODAL_PAYLOAD));
        }}
      >
        Modifier
      </Button>
      <Button
        variant="primary"
        icon="delete"
        onClick={() => {
          dispatch(addModal(ADD_DELETE_MODAL_PAYLOAD));
        }}
      >
        Supprimer
      </Button>
    </S.ActionsList>
  );
};

export default Actions;

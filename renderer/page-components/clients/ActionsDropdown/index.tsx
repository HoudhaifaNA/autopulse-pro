import { useDispatch } from "react-redux";

import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";

import { addModal } from "store/reducers/modals";
import { Client } from "interfaces";
import retreiveClientActions from "store/actions/clients";

interface ActionsDropdownProps {
  client: Client;
}

const ActionsDropdown = ({ client }: ActionsDropdownProps) => {
  const dispatch = useDispatch();
  const { UPDATE, TRANSFER_EUR, TRANSFER_DZD, DELETE } = retreiveClientActions(client);

  return (
    <Dropdown $right="1.5rem" $top="4rem" $width="30rem">
      {/* <Button variant="ghost" icon="print">
        Imprimer dernière transaction
      </Button>
      <Button variant="ghost" icon="print">
        Imprimer transactions en euros
      </Button>
      <Button variant="ghost" icon="print">
        Imprimer transactions en dinars
      </Button>
      <Button variant="ghost" icon="print">
        Imprimer toutes les transactions
      </Button> */}
      <Button
        variant="ghost"
        icon="euro"
        onClick={() => {
          dispatch(addModal(TRANSFER_EUR));
        }}
      >
        Faire un virement en euros
      </Button>
      <Button
        variant="ghost"
        icon="dinar"
        onClick={() => {
          dispatch(addModal(TRANSFER_DZD));
        }}
      >
        Faire un virement en dinar
      </Button>
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

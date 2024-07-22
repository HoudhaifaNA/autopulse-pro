import { useDispatch } from "react-redux";

import Button from "components/Button/Button";
import ActionsList from "components/ActionsList";

import { addModal } from "store/reducers/modals";
import retreiveClientActions from "store/actions/clients";
import { Client } from "interfaces";

interface ActionsProps {
  client: Client;
  transactionsCount: number;
}
const ClientActions = ({ client, transactionsCount }: ActionsProps) => {
  const dispatch = useDispatch();

  const { UPDATE, TRANSFER_EUR, TRANSFER_DZD, DELETE } = retreiveClientActions(client);

  return (
    <ActionsList>
      {transactionsCount > 0 && (
        <Button
          variant="primary"
          icon="print"
          onClick={() => dispatch(addModal({ name: "print", title: "Imprimer", clientId: client.id }))}
        >
          Imprimer
        </Button>
      )}
      <Button
        variant="primary"
        icon="euro"
        onClick={() => {
          dispatch(addModal(TRANSFER_EUR));
        }}
      >
        Faire un virement en euros
      </Button>
      <Button
        variant="primary"
        icon="dinar"
        onClick={() => {
          dispatch(addModal(TRANSFER_DZD));
        }}
      >
        Faire un virement en dinar
      </Button>
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

export default ClientActions;

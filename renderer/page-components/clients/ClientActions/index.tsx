import { useDispatch } from "react-redux";

import Button from "components/Button/Button";
import ActionsList from "components/ActionsList";

import { Client } from "interfaces";
import { addModal } from "store/reducers/modals";
import retreiveClientActions from "store/actions/clients";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import ClientPrinted from "../ClientPrinted";

interface ActionsProps {
  client: Client;
}
const ClientActions = ({ client }: ActionsProps) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const { UPDATE, TRANSFER_EUR, TRANSFER_DZD, DELETE } = retreiveClientActions(client);

  return (
    <ActionsList>
      {/* <div style={{ display: "none" }}>
        <ClientPrinted ref={ref} id={client.id} />
      </div>
      <ReactToPrint content={() => ref.current} trigger={() => <Button variant="primary">Print</Button>} /> */}
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

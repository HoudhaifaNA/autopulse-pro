import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { useDispatch } from "react-redux";

import Button from "components/Button/Button";
import ActionsList from "components/ActionsList";
import ClientPrinted from "../ClientPrinted";
import Dropdown from "components/Dropdown/Dropdown";

import { addModal } from "store/reducers/modals";
import retreiveClientActions from "store/actions/clients";
import useClickOutside from "hooks/useClickOutside";
import { Client } from "interfaces";

interface ActionsProps {
  client: Client;
  transactionsCount: number;
}
const ClientActions = ({ client, transactionsCount }: ActionsProps) => {
  const dispatch = useDispatch();
  const [isOutside, setIsOutside] = useClickOutside("printDropdown", "printDropdownToggler");
  const lastRef = useRef<HTMLDivElement>(null);
  const allRef = useRef<HTMLDivElement>(null);

  const { UPDATE, TRANSFER_EUR, TRANSFER_DZD, DELETE } = retreiveClientActions(client);

  return (
    <ActionsList>
      {transactionsCount > 0 && (
        <>
          <div style={{ display: "none" }}>
            <ClientPrinted ref={allRef} id={client.id} type="all" />
            <ClientPrinted ref={lastRef} id={client.id} type="last" />
          </div>

          <div style={{ position: "relative" }}>
            <Button id="printDropdownToggler" variant="primary" icon="print" onClick={() => setIsOutside(!isOutside)}>
              Imprimer
            </Button>
            {!isOutside && (
              <Dropdown $left="0" $top="4rem" $width="30rem" id="printDropdown">
                <ReactToPrint
                  content={() => allRef.current}
                  trigger={() => (
                    <Button variant="ghost" icon="print">
                      Imprimer toutes les transactions
                    </Button>
                  )}
                />
                <ReactToPrint
                  content={() => lastRef.current}
                  trigger={() => (
                    <Button variant="ghost" icon="print">
                      Imprimer la dernière transaction
                    </Button>
                  )}
                />
              </Dropdown>
            )}
          </div>
        </>
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

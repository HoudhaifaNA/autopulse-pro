import { useDispatch } from "react-redux";

import Button from "components/Button/Button";
import ActionsList from "components/ActionsList";

import { Car } from "interfaces";
import { addModal } from "store/reducers/modals";
import retreiveCarActions from "store/actions/cars";

interface ActionsProps {
  car: Car;
}
const Actions = ({ car }: ActionsProps) => {
  const dispatch = useDispatch();

  const { buyer_id } = car;
  const { UPDATE, REPURCHASE, SALE, UPDATE_SALE, CANCEL_SALE, DELETE } = retreiveCarActions(car);

  const renderBoughtCarActions = () => {
    if (buyer_id) {
      return (
        <>
          <Button
            variant="primary"
            icon="add"
            onClick={() => {
              dispatch(addModal(REPURCHASE));
            }}
          >
            Rachat
          </Button>
          <Button
            variant="primary"
            icon="sell"
            onClick={() => {
              dispatch(addModal(UPDATE_SALE));
            }}
          >
            Modifier la vente
          </Button>
          <Button
            variant="primary"
            icon="cancel"
            onClick={() => {
              dispatch(addModal(CANCEL_SALE));
            }}
          >
            Annuler la vente
          </Button>
        </>
      );
    }
  };

  return (
    <ActionsList>
      {!buyer_id && (
        <Button
          variant="primary"
          icon="sell"
          onClick={() => {
            dispatch(addModal(SALE));
          }}
        >
          Vendue
        </Button>
      )}
      {renderBoughtCarActions()}
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

export default Actions;

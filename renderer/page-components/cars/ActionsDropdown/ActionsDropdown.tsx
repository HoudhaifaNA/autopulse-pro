import { useDispatch } from "react-redux";

import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";

import { addModal } from "store/reducers/modals";
import { Car } from "interfaces";
import retreiveCarActions from "store/actions/cars";

interface ActionsDropdownProps {
  car: Car;
}

const ActionsDropdown = ({ car }: ActionsDropdownProps) => {
  const dispatch = useDispatch();
  const { buyer_id } = car;
  const { UPDATE, REPURCHASE, SALE, UPDATE_SALE, CANCEL_SALE, DELETE } = retreiveCarActions(car);

  const renderBoughtCarActions = () => {
    if (buyer_id) {
      return (
        <>
          <Button
            variant="ghost"
            icon="add"
            onClick={() => {
              dispatch(addModal(REPURCHASE));
            }}
          >
            Rachat
          </Button>
          <Button
            variant="ghost"
            icon="sell"
            onClick={() => {
              dispatch(addModal(UPDATE_SALE));
            }}
          >
            Modifier la vente
          </Button>
          <Button
            variant="ghost"
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
    <Dropdown $right="1.5rem" $top="4rem" $width="30rem">
      {!buyer_id && (
        <Button
          variant="ghost"
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

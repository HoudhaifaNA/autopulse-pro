import { useFormikContext } from "formik";

import { ClickInput } from "components/Input/Input";
import { InputError } from "components/Input/Input.styled";

import { Values } from "components/FinanceForm/types";

const TransactionType = () => {
  const { errors } = useFormikContext<Values>();
  const { type } = errors;

  return (
    <div>
      <ClickInput
        key="entrante"
        label="entrante"
        type="radio"
        name="type"
        value="entrante"
      />
      <ClickInput
        key="sortante"
        label="sortante"
        type="radio"
        name="type"
        value="sortante"
      />

      {type && <InputError>{type}</InputError>}
    </div>
  );
};

export default TransactionType;

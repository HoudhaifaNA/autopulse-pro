import { useFormikContext } from "formik";

import { ClickInput } from "components/Input/Input";
import { InputError } from "components/Input/Input.styled";

import * as T from "components/FinanceForm/types";

type TErrors = T.TransactionValues | T.EuroTransferValues;
interface TransactionTypeProps {
  options: string[];
}

const TransactionType = ({ options }: TransactionTypeProps) => {
  const { errors } = useFormikContext<TErrors>();
  const { type } = errors;

  return (
    <div>
      {options.map((opt) => {
        return (
          <ClickInput
            key={opt}
            type="radio"
            name="type"
            label={opt}
            value={opt}
          />
        );
      })}

      {type && <InputError>{type}</InputError>}
    </div>
  );
};

export default TransactionType;

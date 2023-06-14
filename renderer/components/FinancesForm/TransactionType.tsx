import { useFormikContext } from "formik";

import { ClickInput } from "components/Input/Input";
import { InputError } from "components/Input/Input.styled";

import * as T from "components/FinancesForm/types";

type TErrors = T.TransactionValues | T.EuroTransferValues;
interface TransactionTypeProps {
  options: string[];
}

const TransactionType = ({ options }: TransactionTypeProps) => {
  const { errors } = useFormikContext<TErrors>();
  const { direction } = errors;

  return (
    <div>
      {options.map((opt) => {
        return (
          <ClickInput
            key={opt}
            type="radio"
            name="direction"
            label={opt}
            value={opt}
          />
        );
      })}

      {direction && <InputError>{direction}</InputError>}
    </div>
  );
};

export default TransactionType;

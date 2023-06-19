import { useFormikContext } from "formik";

import { ClickInput } from "components/Input/Input";
import { InputError } from "components/Input/Input.styled";

import * as T from "components/FinancesForm/types";
import styled from "styled-components";

type TErrors = T.TransactionValues | T.EuroTransferValues;
interface TransactionTypeProps {
  options: string[];
}

const TransactiontTypesList = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
`;

const TransactionType = ({ options }: TransactionTypeProps) => {
  const { errors } = useFormikContext<TErrors>();
  const { direction } = errors;

  return (
    <TransactiontTypesList>
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
    </TransactiontTypesList>
  );
};

export default TransactionType;

import { useFormikContext } from "formik";

import * as S from "components/CarForm/ExpensesDetails.styled";
import { FormGroup } from "components/Form/Form.styled";

import ExpenseAdder from "components/CarForm/ExpenseAdder";
import { TypedInput } from "components/Input/Input";
import Button from "components/Button/Button";

import { Values } from "components/CarForm/types";

const ExpensesDetails = () => {
  const { values, setFieldValue, setTouched } = useFormikContext<Values>();
  const { expenses } = values;

  const deleteExpense = (id: string) => {
    const filtredExpenses = expenses.filter((expense) => expense.id !== id);
    setTouched({});
    setFieldValue("expenses", filtredExpenses);
  };

  return (
    <>
      <S.ExpensesList>
        {expenses.map(({ id, type }, i) => {
          return (
            <FormGroup key={id}>
              <TypedInput
                label="Raison :"
                name={`expenses.${i}.raison`}
                placeholder="Raison"
                autoFocus
              />
              {type === "à l'étranger" ? (
                <FormGroup>
                  <TypedInput
                    name={`expenses.${i}.euroCost`}
                    type="number"
                    label="Coût :"
                    placeholder="450"
                    addOn="€"
                  />
                  <TypedInput
                    name={`expenses.${i}.euroPrice`}
                    type="number"
                    label="Prix ​​de 100 € :"
                    placeholder="220"
                    addOn="DA"
                  />
                </FormGroup>
              ) : (
                <TypedInput
                  name={`expenses.${i}.totalCost`}
                  type="number"
                  label="Coût :"
                  placeholder="10000"
                  addOn="DA"
                />
              )}
              <div>
                <Button
                  type="button"
                  variant="danger"
                  floating={true}
                  icon="delete"
                  onClick={() => deleteExpense(id)}
                />
              </div>
            </FormGroup>
          );
        })}
      </S.ExpensesList>
      <ExpenseAdder />
    </>
  );
};

export default ExpensesDetails;

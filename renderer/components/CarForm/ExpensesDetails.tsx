import { useFormikContext } from "formik";

import * as S from "components/CarForm/ExpensesDetails.styled";
import { FormGroup } from "components/Form/Form.styled";

import ExpenseAdder from "components/CarForm/ExpenseAdder";
import { TypedInput, SelectInput } from "components/Input/Input";
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
              <SelectInput
                label="Raison :"
                name={`expenses.${i}.raison`}
                placeholder="Raison"
                autoFocus
                items={[
                  { mainText: "Rent payment" },
                  { mainText: "Utility bills" },
                  { mainText: "Grocery shopping" },
                  { mainText: "Transportation costs" },
                ]}
              />
              {type === "à l'étranger" ? (
                <FormGroup>
                  <TypedInput
                    name={`expenses.${i}.euroCost`}
                    type="number"
                    label="Coût :"
                    placeholder="45000.00"
                    addOn="€"
                  />
                  <TypedInput
                    name={`expenses.${i}.euroPrice`}
                    type="number"
                    label="Prix ​​de €100 :"
                    placeholder="220.00"
                    addOn="DZD"
                  />
                </FormGroup>
              ) : (
                <TypedInput
                  name={`expenses.${i}.totalCost`}
                  type="number"
                  label="Coût :"
                  placeholder="100000.00"
                  addOn="DZD"
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

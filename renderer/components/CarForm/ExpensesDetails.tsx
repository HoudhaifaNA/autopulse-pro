import { useFormikContext } from "formik";

import * as S from "components/CarForm/ExpensesDetails.styled";
import { FormContent, FormGroup } from "components/ui/Form.styled";

import ExpenseAdder from "components/CarForm/ExpenseAdder";
import { TypedInput, SelectInput } from "components/Input/Input";
import Button from "components/Button/Button";

import { Values } from "components/CarForm/types";

interface ExpensesProps {
  expenses: Values["expenses"];
}

const ExpensesDetails = ({ expenses }: ExpensesProps) => {
  const { setFieldValue, setTouched } = useFormikContext();

  const deleteExpense = (id: string) => {
    const filtredExpenses = expenses.filter((expense) => expense.id !== id);
    setTouched({});
    setFieldValue("expenses", filtredExpenses);
  };

  return (
    <>
      <S.ExpensesList>
        <FormContent>
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
                {type === "À l'étranger" ? (
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
                      label="Prix ​​de 100€ :"
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
        </FormContent>
      </S.ExpensesList>
      <ExpenseAdder />
    </>
  );
};

export default ExpensesDetails;

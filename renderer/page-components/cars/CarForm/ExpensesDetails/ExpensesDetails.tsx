import { useEffect } from "react";
import { useFormikContext } from "formik";

import * as S from "./styles";
import ExpenseAdder from "../ExpenseAdder/ExpenseAdder";
import { FormGroup } from "components/Form/Form.styled";
import { TypedInput } from "components/Input/Input";
import Button from "components/Button/Button";

import { CarInitialValues } from "../types";

const ExpensesDetails = () => {
  const { values, setFieldValue, setTouched } = useFormikContext<CarInitialValues>();
  const { expenses, eur_exchange_rate } = values;

  const updateExpensesDZDCost = () => {
    expenses.forEach((expense, ind) => {
      const { type, cost_in_eur } = expense;
      if (type !== "locale") {
        const expenseDZDCost = cost_in_eur * (eur_exchange_rate / 100);
        setFieldValue(`expenses.${ind}.cost_in_dzd`, expenseDZDCost);
      }
    });
  };

  useEffect(() => {
    updateExpensesDZDCost();
  }, [JSON.stringify(expenses)]);

  const deleteExpense = (id: string) => {
    const filtredExpenses = expenses.filter((expense) => expense.id !== id);
    setTouched({});
    setFieldValue("expenses", filtredExpenses);
  };

  return (
    <S.ExpensesWrapper>
      <ExpenseAdder />
      <S.ExpensesList>
        {expenses.map(({ id, type }, ind) => {
          return (
            <FormGroup key={id}>
              <TypedInput label="Raison" name={`expenses.${ind}.raison`} placeholder="Raison" autoFocus />
              {type === "à l'étranger" ? (
                <TypedInput
                  name={`expenses.${ind}.cost_in_eur`}
                  type="number"
                  label="Coût"
                  placeholder="450"
                  addOn="€"
                />
              ) : (
                <TypedInput
                  name={`expenses.${ind}.cost_in_dzd`}
                  type="number"
                  label="Coût"
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
    </S.ExpensesWrapper>
  );
};

export default ExpensesDetails;

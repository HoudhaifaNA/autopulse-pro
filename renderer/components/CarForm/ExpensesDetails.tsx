import { useFormikContext } from "formik";

import * as S from "components/CarForm/ExpensesDetails.styled";
import uid from "utils/uniqid";
import { FormContent, FormGroup } from "components/ui/Form.styled";
import { TypedInput } from "components/Input/Input";
import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Buttons/Button";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";
import { DropdownInput } from "components/Input/Input";
import { Values } from "components/CarForm/types";

interface ExpensesProps {
  expenses: Values["expenses"];
}

const EXPENSES_OPTIONS = ["À l'étranger", "Locale"];

const renderExpenseAdder = (expenses: Values["expenses"]) => {
  const { setFieldValue } = useFormikContext();

  return EXPENSES_OPTIONS.map((option) => {
    let lowerCaseOption = option.toLocaleLowerCase();
    const newExpense = {
      id: uid(),
      type: lowerCaseOption,
      raison: "",
      euroCost: 0,
      euroPrice: 0,
      totalCost: 0,
    };

    // Set the correct icon name
    const icon = lowerCaseOption === "locale" ? "locale" : "importé";
    const addExpense = () => {
      setFieldValue("expenses", [...expenses, newExpense]);
    };

    return (
      <ButtonItem key={option}>
        <Button type="button" variant="ghost" icon={icon} onClick={addExpense}>
          {option}
        </Button>
      </ButtonItem>
    );
  });
};

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
                <DropdownInput>
                  <TypedInput
                    name={`expenses[${i}].raison`}
                    type="text"
                    label="Raison :"
                    placeholder="Raison"
                    iconRight="expand"
                    autoFocus
                  />
                </DropdownInput>
                {type === "À l'étranger" ? (
                  <FormGroup>
                    <TypedInput
                      name={`expenses[${i}].euroCost`}
                      type="number"
                      label="Coût :"
                      placeholder="45000.00"
                      addOn="€"
                    />
                    <TypedInput
                      name={`expenses[${i}].euroPrice`}
                      type="number"
                      label="Prix ​​de 100€ :"
                      placeholder="220.00"
                      addOn="DZD"
                    />
                  </FormGroup>
                ) : (
                  <TypedInput
                    name={`expenses[${i}].totalCost`}
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
      <S.ExpenseAdder>
        <Button type="button" variant="ghost" icon="add">
          Ajouter une autre dépense
        </Button>
        <Dropdown $width="20rem">{renderExpenseAdder(expenses)}</Dropdown>
      </S.ExpenseAdder>
    </>
  );
};

export default ExpensesDetails;

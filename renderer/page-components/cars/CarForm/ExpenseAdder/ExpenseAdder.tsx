import { Dispatch, SetStateAction } from "react";
import { FormikContextType, useFormikContext } from "formik";

import * as S from "./styles";

import Button from "components/Button/Button";
import Dropdown from "components/Dropdown/Dropdown";

import useClickOutside from "hooks/useClickOutside";
import uid from "utils/uniqid";
import { CarInitialValues } from "../types";

const EXPENSES_OPTIONS = ["À l'étranger", "Locale"];

type RenderExpenseOption = (
  setFocus: Dispatch<SetStateAction<boolean>>,
  formikContext: FormikContextType<CarInitialValues>
) => JSX.Element[];

const renderExpenseOptions: RenderExpenseOption = (setOutside, formikContext) => {
  const { values, setFieldValue } = formikContext;
  const { expenses } = values;

  return EXPENSES_OPTIONS.map((option) => {
    const newExpense = {
      id: uid(),
      type: option.toLowerCase(),
      raison: "",
      cost_in_eur: 0,
      cost_in_dzd: 0,
    };

    const addExpense = () => {
      setFieldValue("expenses", [...expenses, newExpense]);
      setOutside(true);
    };

    return (
      <Button type="button" variant="ghost" onClick={addExpense} key={option}>
        {option}
      </Button>
    );
  });
};

const ExpenseAdder = () => {
  const formikContext = useFormikContext<CarInitialValues>();
  const [isOutside, setOutside] = useClickOutside("expensesTypesDropdown", "expenseAdderToggler");

  return (
    <S.ExpenseAdder>
      <Button type="button" variant="ghost" icon="add" id="expenseAdderToggler" onClick={() => setOutside(!isOutside)}>
        Ajouter une autre dépense
      </Button>
      {!isOutside && (
        <Dropdown $width="20rem" id="expensesTypesDropdown">
          {renderExpenseOptions(setOutside, formikContext)}
        </Dropdown>
      )}
    </S.ExpenseAdder>
  );
};

export default ExpenseAdder;

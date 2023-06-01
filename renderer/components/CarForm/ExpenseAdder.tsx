import { useRef } from "react";
import { useFormikContext, FormikContextType } from "formik";

import * as S from "components/CarForm/ExpensesDetails.styled";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";

import Button from "components/Button/Button";
import Dropdown from "components/Dropdown/Dropdown";

import useClickOutside from "hooks/useClickOutside";
import uid from "utils/uniqid";

import { Values } from "components/CarForm/types";

const EXPENSES_OPTIONS = ["À l'étranger", "Locale"];

type formikContextT = FormikContextType<Values>;

const renderExpenses = (setFocus: any, formikContext: formikContextT) => {
  const { setFieldValue, values } = formikContext;
  const { expenses } = values;

  return EXPENSES_OPTIONS.map((option) => {
    let lowerCaseOption = option.toLocaleLowerCase();
    const icon = lowerCaseOption === "locale" ? "locale" : "importé";

    const newExpense = {
      id: uid(),
      type: lowerCaseOption,
      raison: "",
      euroCost: 0,
      euroPrice: 0,
      totalCost: 0,
    };

    const addExpense = () => {
      setFieldValue("expenses", [...expenses, newExpense]);
      setFocus(false);
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

const ExpenseAdder = () => {
  const dropdownRef = useRef(null);
  const formikContext = useFormikContext<Values>();
  const [isFocused, setFocus] = useClickOutside(dropdownRef);

  return (
    <S.ExpenseAdder ref={dropdownRef}>
      <Button
        type="button"
        variant="ghost"
        icon="add"
        onClick={() => setFocus(true)}
      >
        Ajouter une autre dépense
      </Button>
      {isFocused && (
        <Dropdown $width="20rem">
          {renderExpenses(setFocus, formikContext)}
        </Dropdown>
      )}
    </S.ExpenseAdder>
  );
};

export default ExpenseAdder;

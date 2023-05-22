import { useFormikContext } from "formik";

import * as S from "components/CarForm/ExpensesDetails.styled";
import { ButtonItem } from "components/Dropdown/Dropdown.styled";

import Button from "components/Button/Button";
import Dropdown from "components/Dropdown/Dropdown";

import uid from "utils/uniqid";

import { Values } from "components/CarForm/types";

const EXPENSES_OPTIONS = ["À l'étranger", "Locale"];

const renderExpenses = () => {
  const { setFieldValue, values } = useFormikContext<Values>();
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
  return (
    <S.ExpenseAdder>
      <Button type="button" variant="ghost" icon="add">
        Ajouter une autre dépense
      </Button>
      <Dropdown $width="20rem">{renderExpenses()}</Dropdown>;
    </S.ExpenseAdder>
  );
};

export default ExpenseAdder;

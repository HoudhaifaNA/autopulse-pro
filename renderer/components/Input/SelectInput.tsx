import { useState } from "react";
import { useFormikContext } from "formik";

import * as S from "components/Input/Input.styled";

import TypedInput from "components/Input/TypedInput";
import Dropdown from "components/Dropdown/Dropdown";

import filterDropdownItems from "utils/filterDropdownItems";

import * as T from "components/Input/types";

const getInputValue = (values: unknown, name: string) => {
  const namePath = name.split(".");

  // We get neseted values
  // ex: expenses.i.raison ---> values[expenses] ---> values[expenses][i] ---> values[expenses][i][raison]
  const value = namePath.reduce(
    (path: any, key: string) => (path ? path[key] : undefined),
    values
  );

  return value as string;
};

const SelectInput = (props: T.SelectInputProps) => {
  const { setFieldValue, values, errors } = useFormikContext();
  const [isDropdownActive, toggleDropdown] = useState(false);

  const { label, placeholder, name, autoFocus, items, buttons, elementAs } =
    props;

  const inputValue = getInputValue(values, name);
  const filtredItems = filterDropdownItems(items!, inputValue);
  const dropdownItems = elementAs === "div" ? items : filtredItems;

  //@ts-ignore
  const hasError = Boolean(errors[name]);

  const inputProps = {
    label,
    placeholder,
    name,
    autoFocus,
    rightIcon: "expand",
    className: isDropdownActive && !hasError ? "dropdown-active" : "",
    onClick: () => toggleDropdown(!isDropdownActive),
  };

  const onClickOption = (item: string) => {
    setFieldValue(name, item);
    toggleDropdown(false);
  };

  const Select =
    elementAs === "div" ? (
      <TypedInput {...inputProps} as="div">
        {inputValue || placeholder}
      </TypedInput>
    ) : (
      <TypedInput {...inputProps} />
    );

  return (
    <S.SelectInput>
      {Select}
      {isDropdownActive && (
        <Dropdown
          $top="6.3rem"
          $width="100%"
          items={dropdownItems}
          onItemClick={onClickOption}
        >
          {buttons}
        </Dropdown>
      )}
    </S.SelectInput>
  );
};

export default SelectInput;

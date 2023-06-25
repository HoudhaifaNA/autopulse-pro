import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";

import * as S from "components/Input/Input.styled";

import TypedInput from "components/Input/TypedInput";
import Dropdown from "components/Dropdown/Dropdown";

import filterDropdownItems from "utils/filterDropdownItems";

import useClickOutside from "hooks/useClickOutside";

import * as T from "components/Input/types";

const getInputData = (values: any, errors: any, name: string) => {
  const namePath = name.split(".");

  // We get neseted values
  // ex: expenses.i.raison ---> values[expenses] ---> values[expenses][i] ---> values[expenses][i][raison]
  const value = namePath.reduce(
    (path: any, key: string) => (path ? path[key] : ""),
    values
  );
  const error = namePath.reduce(
    (path: any, key: string) => (path ? path[key] : undefined),
    errors
  );

  return [value, error];
};

const SelectInput = (props: T.SelectInputProps) => {
  const { setFieldValue, values, errors } = useFormikContext();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isFocused, setFocus] = useClickOutside(dropdownRef);

  const {
    label,
    placeholder,
    name,
    relatedFields,
    autoFocus,
    items,
    iconSize,
    buttons,
    elementAs,
    sorted,
    disabled,
  } = props;

  const [inputValue, inputError] = getInputData(values, errors, name);
  const filtredItems = filterDropdownItems(items!, inputValue, sorted);
  const dropdownItems = elementAs === "div" ? items : filtredItems;

  useEffect(() => {
    const currentInput = dropdownItems?.find(
      ({ mainText }) => mainText === inputValue
    );

    if (relatedFields) {
      relatedFields.forEach((field, i) => {
        const value = currentInput ? currentInput.relatedValues?.[i] : 0;
        setFieldValue(field, value);
      });
    }
  }, [inputValue]);

  //@ts-ignore
  const hasError = Boolean(inputError);

  const inputProps = {
    label,
    placeholder,
    name,
    autoFocus,
    rightIcon: "expand",
    className: isFocused && !hasError ? "dropdown-active" : "",
    onClick: () => setFocus(!isFocused),
  };

  const onClickOption = (item: any) => {
    setFieldValue(name, item);
    setFocus(false);
  };

  const Select =
    elementAs === "div" ? (
      <TypedInput {...inputProps} as="div" disabled={disabled}>
        {inputValue || placeholder}
      </TypedInput>
    ) : (
      <TypedInput {...inputProps} disabled={disabled} />
    );

  return (
    <S.SelectInput ref={dropdownRef}>
      {Select}
      {isFocused && (
        <Dropdown
          $top="6.3rem"
          $width="100%"
          items={dropdownItems}
          iconSize={iconSize}
          onItemClick={onClickOption}
        >
          {buttons}
        </Dropdown>
      )}
    </S.SelectInput>
  );
};

export default SelectInput;

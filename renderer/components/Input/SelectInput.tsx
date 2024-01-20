import { useEffect } from "react";
import { useFormikContext } from "formik";

import * as S from "components/Input/Input.styled";

import TypedInput from "components/Input/TypedInput";
import Dropdown from "components/Dropdown/Dropdown";

import filterDropdownItems from "utils/filterDropdownItems";

import useClickOutside from "hooks/useClickOutside";

import * as T from "components/Input/types";
import uid from "utils/uniqid";

const getInputData = (values: any, errors: any, name: string) => {
  const namePath = name.split(".");

  // We get neseted values
  // ex: expenses.i.raison ---> values[expenses] ---> values[expenses][i] ---> values[expenses][i][raison]
  const value = namePath.reduce((path: any, key: string) => (path ? path[key] : ""), values);
  const error = namePath.reduce((path: any, key: string) => (path ? path[key] : undefined), errors);

  return [value, error];
};

const SelectInput = (props: T.SelectInputProps) => {
  const { setFieldValue, values, errors } = useFormikContext<any>();
  const uniqueId = uid();
  const dropdownId = `selectDropdown-${uniqueId}`;
  const togglerId = `selectDropdownToggler-${uniqueId}`;
  const [isOutside, setIsOutside] = useClickOutside(dropdownId, togglerId);

  const { label, placeholder, name, relatedFields, autoFocus, items, iconSize, buttons, elementAs, sorted, disabled } =
    props;

  const [inputValue, inputError] = getInputData(values, errors, name);
  const filtredItems = filterDropdownItems(items!, inputValue, sorted);
  const dropdownItems = elementAs === "div" ? items : filtredItems;

  useEffect(() => {
    const currentInput = dropdownItems?.find(({ mainText }) => mainText === inputValue);

    if (relatedFields) {
      relatedFields.forEach((field, i) => {
        const value = currentInput ? currentInput.relatedValues?.[i] : values[field];
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
    id: togglerId,
    autoFocus,
    rightIcon: "expand",
    className: !isOutside && !hasError ? "dropdown-active" : "",
    onClick: () => setIsOutside(!isOutside),
  };

  const onClickOption = (item: any) => {
    setFieldValue(name, item);
    setIsOutside(true);
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
    <S.SelectInput>
      {Select}
      {!isOutside && (
        <Dropdown
          id={dropdownId}
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

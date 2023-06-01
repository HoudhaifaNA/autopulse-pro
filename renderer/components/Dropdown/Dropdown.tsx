import * as S from "components/Dropdown/Dropdown.styled";
import { Body2 } from "styles/Typography";

import Icon from "components/Icon/Icon";

import { DropdownItemArgs, DropdownProps } from "components/Dropdown/types";

const renderItems = ({ items, onItemClick, size }: DropdownItemArgs) => {
  return items!.map(({ mainText, icon, secondText }, i) => {
    const onOptionClick = onItemClick ? () => onItemClick(mainText) : () => 1;

    return (
      <S.DropdownItem key={i} onClick={onOptionClick}>
        <S.MainTextWrapper>
          {icon && (
            <Icon icon={icon} size={size === "s" ? "1.8rem" : "2.4rem"} />
          )}
          <Body2>{mainText}</Body2>
        </S.MainTextWrapper>
        <Body2>{secondText}</Body2>
      </S.DropdownItem>
    );
  });
};

const Dropdown = (props: DropdownProps) => {
  const { items, size = "s", onItemClick, children, ...stylingProps } = props;

  return (
    <S.DropdownWrapper {...stylingProps}>
      <S.Dropdown>
        <S.DropdownList>
          {items && renderItems({ items, onItemClick, size })}
        </S.DropdownList>
        {children}
      </S.Dropdown>
    </S.DropdownWrapper>
  );
};

export default Dropdown;

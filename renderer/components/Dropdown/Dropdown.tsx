import * as S from "components/Dropdown/Dropdown.styled";
import { Body2 } from "styles/Typography";

import Icon from "components/Icon/Icon";

import { DropdownItemArgs, DropdownProps } from "components/Dropdown/types";

const renderItems = ({ items, onItemClick, iconSize }: DropdownItemArgs) => {
  return items!.map(({ mainText, icon, relatedValues, secondText }, i) => {
    let onOptionClick;
    if (onItemClick) {
      onOptionClick = () => onItemClick({ mainText, relatedValues });
    }

    return (
      <S.DropdownItem key={i} onClick={onOptionClick}>
        <S.MainTextWrapper>
          {icon && (
            <Icon icon={icon} size={iconSize === "s" ? "1.8rem" : "2.4rem"} />
          )}
          <Body2>{mainText}</Body2>
        </S.MainTextWrapper>
        <Body2>{secondText}</Body2>
      </S.DropdownItem>
    );
  });
};

const Dropdown = (props: DropdownProps) => {
  const {
    items,
    iconSize = "s",
    onItemClick,
    children,
    ...stylingProps
  } = props;

  return (
    <S.DropdownWrapper {...stylingProps}>
      <S.Dropdown>
        <S.DropdownList>
          {items && renderItems({ items, onItemClick, iconSize })}
        </S.DropdownList>
        {children}
      </S.Dropdown>
    </S.DropdownWrapper>
  );
};

export default Dropdown;

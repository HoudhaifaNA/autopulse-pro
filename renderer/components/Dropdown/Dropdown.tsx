import * as S from "components/Dropdown/Dropdown.styled";
import { DropdownItemArgs, DropdownProps } from "components/Dropdown/types";
import Icon from "components/Icon/Icon";
import { Body2 } from "styles/Typography";

const renderItems = ({ items, onItemClick, size }: DropdownItemArgs) => {
  return items.map(({ mainText, icon, secondText }) => {
    return (
      <S.DropdownItem key={mainText} onClick={() => onItemClick(mainText)}>
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
    <S.Dropdown {...stylingProps}>
      <S.DropdownList>
        {renderItems({ items, onItemClick, size })}
      </S.DropdownList>
      {children}
    </S.Dropdown>
  );
};

export default Dropdown;

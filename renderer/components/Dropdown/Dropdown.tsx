import { ReactElement } from "react";
import * as S from "./Dropdown.styled";
import Icon from "components/Icon/Icon";
import { Body2 } from "styles/Typography";

interface DropdownProps {
  items: { mainText: string; icon?: string; secondText?: string }[];
  iconSize?: "s" | "l";
  onItemClick: (text: string) => void;
  children?: ReactElement | ReactElement[];
}

type DropdownItemArgs = Pick<DropdownProps, "items" | "onItemClick">;

const renderItems = ({ items, onItemClick }: DropdownItemArgs) => {
  return items.map(({ mainText, icon, secondText }) => {
    return (
      <S.DropdownItem key={mainText} onClick={() => onItemClick(mainText)}>
        <S.MainTextWrapper>
          {icon && <Icon icon={icon} />}
          <Body2>{mainText}</Body2>
        </S.MainTextWrapper>
        <Body2>{secondText}</Body2>
      </S.DropdownItem>
    );
  });
};

const Dropdown = (props: DropdownProps) => {
  const { items, iconSize = "s", onItemClick, children } = props;
  return (
    <S.DropdownWrapper $iconSize={iconSize}>
      <S.DropdownList>{renderItems({ items, onItemClick })}</S.DropdownList>
      {children}
    </S.DropdownWrapper>
  );
};

export default Dropdown;

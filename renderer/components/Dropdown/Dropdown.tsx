import { ReactElement } from "react";
import * as S from "./Dropdown.styled";
import Icon from "components/Icon/Icon";
import { Body2 } from "styles/Typography";

interface DropdownProps {
  items: { mainText: string; icon?: string; secondText?: string }[];
  iconSize?: "s" | "l";
  children?: ReactElement | ReactElement[];
}

const renderItems = (items: DropdownProps["items"]) => {
  return items.map(({ mainText, icon, secondText }) => {
    return (
      <S.DropdownItem key={mainText}>
        <S.MainTextWrapper>
          {icon && <Icon icon={icon} />}
          <Body2>{mainText}</Body2>
        </S.MainTextWrapper>
        <Body2>{secondText}</Body2>
      </S.DropdownItem>
    );
  });
};

const Dropdown = ({ items, iconSize = "s", children }: DropdownProps) => {
  return (
    <S.DropdownWrapper $iconSize={iconSize}>
      <S.DropdownList>{renderItems(items)}</S.DropdownList>
      {children}
    </S.DropdownWrapper>
  );
};

export default Dropdown;

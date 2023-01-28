import { ReactElement } from "react";

import * as S from "./Dropdown.styled";
import Icon from "components/Icon/Icon";
import { Body2 } from "styles/Typography";

interface DropdownProps {
  items: { mainText: string; icon?: string; secondText?: string }[];
  onItemClick: (text: string) => void;
  iconSize?: "s" | "l";
  children?: ReactElement | ReactElement[];
}

type DropdownItemArgs = Omit<DropdownProps, "children">;

const renderItems = ({ items, onItemClick, iconSize }: DropdownItemArgs) => {
  return items.map(({ mainText, icon, secondText }) => {
    return (
      <S.DropdownItem key={mainText} onClick={() => onItemClick(mainText)}>
        <S.MainTextWrapper>
          {icon && (
            <Icon
              icon={icon}
              iconSize={iconSize === "s" ? "1.8rem" : "2.4rem"}
            />
          )}
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
    <S.DropdownWrapper>
      <S.DropdownList>
        {renderItems({ items, onItemClick, iconSize })}
      </S.DropdownList>
      {children}
    </S.DropdownWrapper>
  );
};

export default Dropdown;

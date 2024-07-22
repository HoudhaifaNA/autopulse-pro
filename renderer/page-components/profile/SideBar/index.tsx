import { Dispatch, SetStateAction } from "react";

import * as S from "./styles";
import { LabelText } from "styles/Typography";
import Icon from "components/Icon/Icon";

type Page = "settings" | "security";

interface SideBarProps {
  currentPage: Page;
  setCurrentPage: Dispatch<SetStateAction<"settings" | "security">>;
}

interface SideBarItem {
  title: string;
  icon: string;
  page: Page;
}

const SIDEBAR_ITEMS: SideBarItem[] = [
  { title: "Paramètres", icon: "settings", page: "settings" },
  { title: "Sécurité", icon: "security", page: "security" },
];

const SideBar = ({ currentPage, setCurrentPage }: SideBarProps) => {
  return (
    <S.SideBar>
      <S.SideBarList>
        {SIDEBAR_ITEMS.map(({ title, icon, page }) => {
          const isActive = page === currentPage;
          return (
            <S.SideBarItem $isActive={isActive} onClick={() => setCurrentPage(page)} key={title}>
              <Icon icon={icon} size="1.8rem" />
              <LabelText as="p">{title}</LabelText>
            </S.SideBarItem>
          );
        })}
      </S.SideBarList>
    </S.SideBar>
  );
};

export default SideBar;

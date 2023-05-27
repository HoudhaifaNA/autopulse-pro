import * as S from "components/FinancesTable/PageSwitcher.styled";
import { Body1 } from "styles/Typography";

import { Page } from "components/FinancesTable/types";

interface SwticherProps {
  currentPage: Page;
  selectPage: (page: Page) => void;
}

const pages: Page[] = ["transactions", "virements des euros"];

const PageSwitcher = ({ currentPage, selectPage }: SwticherProps) => {
  return (
    <S.PageSwitcher>
      {pages.map((page) => {
        return (
          <S.PageItem
            key={page}
            $active={currentPage === page}
            onClick={() => selectPage(page)}
          >
            <Body1>{page}</Body1>
          </S.PageItem>
        );
      })}
    </S.PageSwitcher>
  );
};

export default PageSwitcher;

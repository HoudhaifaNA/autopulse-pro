import * as S from "components/Pagination/Pagination.styled";
import { Body2 } from "styles/Typography";
import Icon from "components/Icon/Icon";
import Dropdown from "components/Dropdown/Dropdown";
import { Dispatch, SetStateAction, useRef } from "react";
import useClickOutside from "hooks/useClickOutside";

interface PaginationProps {
  page: number;
  rows: number;
  results: number;
  setPage: Dispatch<SetStateAction<number>>;
  setRows: Dispatch<SetStateAction<number>>;
}

const Pagination = (props: PaginationProps) => {
  const { page, rows, results, setPage, setRows } = props;
  const pagesRef = useRef(null);
  const [isFocused, setFocus] = useClickOutside(pagesRef);
  const lastPage = Math.ceil(results / rows);
  const firstRowNum = (page - 1) * rows + 1;
  const lastRowNum = page === lastPage ? results : page * rows;
  return (
    <S.PaginationWrapper>
      <S.PaginationRowsOptions>
        <Body2>Lignes par page</Body2>
        <S.RowsNumberController>
          <S.CurrentRowsNumber
            ref={pagesRef}
            onClick={() => setFocus(!isFocused)}
          >
            <Body2>{rows}</Body2>
            <Icon icon="expand" size="1.8rem" />
          </S.CurrentRowsNumber>
          <div>
            {isFocused && (
              <Dropdown
                $width="100%"
                items={[
                  { mainText: "10" },
                  { mainText: "25" },
                  { mainText: "50" },
                  { mainText: "100" },
                ]}
                onItemClick={(rowNum) => {
                  if (rowNum * page > results) {
                    setFocus(false);
                    setPage(1);
                    setRows(rowNum);
                  }
                  setFocus(false);
                  setRows(rowNum);
                }}
              />
            )}
          </div>
        </S.RowsNumberController>
      </S.PaginationRowsOptions>
      <Body2>
        {firstRowNum}-{lastRowNum} sur {results}
      </Body2>
      <S.PaginationBrowser>
        <div onClick={() => page !== 1 && setPage(1)}>
          <Icon icon="first_page" size="2.4rem" />
        </div>
        <div onClick={() => page !== 1 && setPage(page - 1)}>
          <Icon icon="back" size="2.4rem" />
        </div>
        <Body2>
          {page} sur {lastPage} {lastPage > 1 ? "pages" : "page"}
        </Body2>
        <div onClick={() => page !== lastPage && setPage(page + 1)}>
          <Icon icon="next" size="2.4rem" />
        </div>
        <div onClick={() => page !== lastPage && setPage(lastPage)}>
          <Icon icon="last_page" size="2.4rem" />
        </div>
      </S.PaginationBrowser>
    </S.PaginationWrapper>
  );
};

export default Pagination;

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";
import { Body2 } from "styles/Typography";
import Icon from "components/Icon/Icon";
import Dropdown from "components/Dropdown/Dropdown";

import { useAppSelector } from "store";
import { setParam } from "store/reducers/resourceUrls";
import useClickOutside from "hooks/useClickOutside";
import { Resources } from "types";

interface PaginationProps {
  results: number;
  resource: Resources;
}

const ROWS_OPTIONS = [250, 300, 350, 400, 500];
const ROWS_LIST = ROWS_OPTIONS.map((option) => {
  return { mainText: `${option}` };
});

const Pagination = ({ results, resource }: PaginationProps) => {
  const params = useAppSelector((state) => state.resourceUrls[resource].params);
  const page = typeof params.page === "number" ? params.page : 0;
  const limit = typeof params.limit === "number" ? params.limit : 0;
  const dispatch = useDispatch();
  const [isOutside, setIsOutside] = useClickOutside("paginationDropdown", "paginationToggler");

  const lastPage = Math.ceil(results / limit);
  const firstRowNum = (page - 1) * limit + 1;
  const lastRowNum = page === lastPage ? results : page * limit;
  const isFirstPage = page === 1;
  const isLastPage = page === lastPage;

  const setPage = (page: number) => {
    dispatch(setParam({ resource: resource, paramKey: "page", paramValue: page }));
  };

  const setRows = (rows: number) => {
    dispatch(setParam({ resource: resource, paramKey: "limit", paramValue: Number(rows) }));
  };

  const onOptionClick = (option: number) => {
    setRows(option);
    setIsOutside(false);
  };

  useEffect(() => {
    if (limit * (page - 1) > results) setPage(1);
  }, [results, page, limit]);

  const goToFirstPage = () => !isFirstPage && setPage(1);
  const goToPrevPage = () => !isFirstPage && setPage(page - 1);
  const goToNextPage = () => !isLastPage && setPage(page + 1);
  const goToLastPage = () => !isLastPage && setPage(lastPage);

  return (
    <S.PaginationWrapper>
      <S.PaginationRowsOptions>
        <Body2>Lignes par page</Body2>
        <S.RowsNumberController>
          <S.CurrentRowsNumber id="paginationToggler" onClick={() => setIsOutside(!isOutside)}>
            <Body2>{limit}</Body2>
            <Icon icon="expand" size="1.8rem" />
          </S.CurrentRowsNumber>
          {!isOutside && (
            <Dropdown id="paginationDropdown" $width="100%" items={ROWS_LIST} onItemClick={onOptionClick} />
          )}
        </S.RowsNumberController>
      </S.PaginationRowsOptions>
      <Body2>
        {firstRowNum}-{lastRowNum} sur {results}
      </Body2>
      <S.PaginationBrowser>
        <Icon icon="first_page" size="2.4rem" onClick={goToFirstPage} />
        <Icon icon="back" size="2.4rem" onClick={goToPrevPage} />
        <Body2>
          {page} sur {lastPage} {lastPage > 1 ? "pages" : "page"}
        </Body2>
        <Icon icon="next" size="2.4rem" onClick={goToNextPage} />
        <Icon icon="last_page" size="2.4rem" onClick={goToLastPage} />
      </S.PaginationBrowser>
    </S.PaginationWrapper>
  );
};

export default Pagination;

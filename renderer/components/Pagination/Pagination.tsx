import * as S from "components/Pagination/Pagination.styled";
import { Body2 } from "styles/Typography";
import Icon from "components/Icon/Icon";
import Dropdown from "components/Dropdown/Dropdown";

const Pagination = () => {
  return (
    <S.PaginationWrapper>
      <S.PaginationRowsOptions>
        <Body2>Lignes par page</Body2>
        <S.RowsNumberController>
          <S.CurrentRowsNumber>
            <Body2>25</Body2>
            <Icon icon="expand" size="1.8rem" />
          </S.CurrentRowsNumber>
          <Dropdown
            $width="100%"
            items={[
              { mainText: "25" },
              { mainText: "50" },
              { mainText: "100" },
            ]}
            onItemClick={() => "sd"}
          />
        </S.RowsNumberController>
      </S.PaginationRowsOptions>
      <Body2>1-20 sur 406</Body2>
      <S.PaginationBrowser>
        <Icon icon="first_page" size="2.4rem" />
        <Icon icon="back" size="2.4rem" />
        <Body2>1 sur 20 page</Body2>
        <Icon icon="next" size="2.4rem" />
        <Icon icon="last_page" size="2.4rem" />
      </S.PaginationBrowser>
    </S.PaginationWrapper>
  );
};

export default Pagination;

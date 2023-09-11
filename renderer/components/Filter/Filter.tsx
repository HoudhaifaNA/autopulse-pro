import { ReactNode, useState } from "react";

import * as S from "./styles";
import Button from "components/Button/Button";

const Filter = ({ children }: { children: ReactNode }) => {
  const [isFilterActive, toggleFilter] = useState(false);

  return (
    <S.FilterWrapper>
      <Button variant="secondary" icon="filter" onClick={() => toggleFilter(!isFilterActive)}>
        Filtrer
      </Button>
      {isFilterActive && <S.FilterCard>{children}</S.FilterCard>}
    </S.FilterWrapper>
  );
};

export default Filter;

import { ReactNode, useState } from "react";

import * as S from "./styles";
import Button from "components/Button/Button";

import useClickOutside from "hooks/useClickOutside";

const Filter = ({ children }: { children: ReactNode }) => {
  const [isFilterOpen, setFilterOpen] = useState(true);
  const [isOutside, setIsOutside] = useClickOutside("filterCard", "filterToggler", isFilterOpen);

  return (
    <S.FilterWrapper>
      <Button
        variant="secondary"
        icon="filter"
        onClick={() => {
          setIsOutside(!isOutside);
          setFilterOpen(!isFilterOpen);
        }}
        id="filterToggler"
      >
        Filtrer
      </Button>
      {!isOutside && <S.FilterCard id="filterCard">{children}</S.FilterCard>}
    </S.FilterWrapper>
  );
};

export default Filter;

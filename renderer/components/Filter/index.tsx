import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import * as S from "./styles";
import Button from "components/Button/Button";
import { useAppSelector } from "store";
import { toggleFilter } from "store/reducers/filter";

const Filter = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isFilterOpen = useAppSelector((state) => state.filter.isFilterOpen);

  useEffect(() => {
    const handleHideFilter = (e: KeyboardEvent) => {
      e.preventDefault();
      if ((e.target as Element)?.tagName !== "INPUT") {
        if (e.key.toLowerCase() === "f") {
          dispatch(toggleFilter(!isFilterOpen));
        }
      }
    };
    window.addEventListener("keyup", handleHideFilter);
    return () => window.removeEventListener("keyup", handleHideFilter);
  }, [isFilterOpen]);

  useEffect(() => {
    const handleRouteChange = () => dispatch(toggleFilter(false));
    router.events.on("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <S.FilterWrapper>
      <Button variant="secondary" icon="filter" onClick={() => dispatch(toggleFilter(!isFilterOpen))}>
        Filtrer
      </Button>
      {isFilterOpen && <S.FilterCard>{children}</S.FilterCard>}
    </S.FilterWrapper>
  );
};
export default Filter;

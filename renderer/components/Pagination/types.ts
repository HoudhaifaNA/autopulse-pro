import { Resources } from "types";

export interface PaginationProps {
  results: number;
  resource: Resources;
}

export interface PagingBtnProps {
  icon: string;
  onClick: () => void;
}

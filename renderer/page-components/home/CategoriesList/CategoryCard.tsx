import { ComponentPropsWithoutRef, ReactNode } from "react";

import * as S from "./styles";

import { Body1 } from "styles/Typography";

interface CategoryCardProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

const CategoryCard = ({ children, ...props }: CategoryCardProps) => {
  return <S.Card {...props}>{children}</S.Card>;
};

export default CategoryCard;

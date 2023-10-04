import { ComponentPropsWithoutRef } from "react";
import * as S from "./styles";

export interface IconProps extends ComponentPropsWithoutRef<"svg"> {
  icon: string;
  size: string;
  isRotated?: boolean;
}

const Icon = ({ icon, size, isRotated, ...props }: IconProps) => {
  return (
    <S.SvgWrapper $size={size} $isRotated={isRotated} {...props}>
      <use xlinkHref={`/sprite.svg#${icon}`} />;
    </S.SvgWrapper>
  );
};

export default Icon;

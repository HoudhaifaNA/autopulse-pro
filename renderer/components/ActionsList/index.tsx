import { ReactNode } from "react";

import * as S from "./styles";

const ActionsList = ({ children }: { children: ReactNode }) => {
  return <S.ActionsList>{children}</S.ActionsList>;
};

export default ActionsList;

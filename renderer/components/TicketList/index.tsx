import { ReactNode } from "react";

import * as S from "./styles";
import { Heading5 } from "styles/Typography";

interface TicketListProps {
  title: string;
  children: ReactNode;
}
const TicketList = ({ title, children }: TicketListProps) => {
  return (
    <S.TicketListWrapper>
      <Heading5>{title}</Heading5>
      <S.TicketListItems>{children}</S.TicketListItems>
    </S.TicketListWrapper>
  );
};

export default TicketList;

import Icon from "components/Icon/Icon";
import * as S from "components/StatTicket/StatTicket.styled";
import { Heading5, Body2 } from "styles/Typography";

interface TicketProps {
  title: string;
  icon: string;
  value: string;
}

const StatTicket = ({ title, icon, value }: TicketProps) => {
  return (
    <S.StatTicket>
      <S.TicketIcon>
        <Icon icon={icon} size="3.2rem" />
      </S.TicketIcon>
      <S.TicketContent>
        <Heading5>{value}</Heading5>
        <Body2>{title}</Body2>
      </S.TicketContent>
    </S.StatTicket>
  );
};

export default StatTicket;

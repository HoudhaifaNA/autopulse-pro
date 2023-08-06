import Icon from "components/Icon/Icon";
import * as S from "components/StatTicket/StatTicket.styled";
import { Heading5, Body2 } from "styles/Typography";

interface TicketProps {
  title: string;
  icon: string;
  value: string;
}

const StatTicket = ({ title, icon, value }: TicketProps) => {
  let classNames = "";
  const PATTERN = /_(RD|GR)/g;
  let isString = typeof value === "string";
  let mainText = value;

  if (isString) {
    mainText = value.split(PATTERN)[0];
    if (value.endsWith("_GR")) classNames += " green";
    if (value.endsWith("_RD")) classNames += " red";
  }

  return (
    <S.StatTicket>
      <S.TicketIcon>
        <Icon icon={icon} size="3.2rem" />
      </S.TicketIcon>
      <S.TicketContent className={classNames}>
        <Heading5>{mainText}</Heading5>
        <Body2>{title}</Body2>
      </S.TicketContent>
    </S.StatTicket>
  );
};

export default StatTicket;

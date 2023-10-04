import Icon from "components/Icon/Icon";
import * as S from "components/StatTicket/styles";
import { Heading5, Body2 } from "styles/Typography";

import useColoredText from "hooks/useColoredText";

interface TicketProps {
  title: string;
  icon: string;
  value: string;
}

const StatTicket = ({ title, icon, value }: TicketProps) => {
  let mainText = value;
  let classNames = "";

  if (typeof value === "string") {
    const [content, colorClass] = useColoredText(mainText);
    mainText = content;
    classNames += ` ${colorClass}`;
  }

  return (
    <S.StatTicket>
      <S.TicketIcon>
        <Icon icon={icon} size="3.2rem" />
      </S.TicketIcon>
      <S.TicketContent>
        <Heading5 className={classNames}>{mainText}</Heading5>
        <Body2>{title}</Body2>
      </S.TicketContent>
    </S.StatTicket>
  );
};

export default StatTicket;

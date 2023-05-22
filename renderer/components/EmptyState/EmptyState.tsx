import Image from "next/image";

import * as S from "components/EmptyState/EmptyState.styled";
import { Body1, Heading3 } from "styles/Typography";

import Button from "components/Button/Button";

interface EmptyStateProps {
  title: string;
  description: string;
  image: string;
  CTAText: string;
  CTAIcon: string;
  IconP?: "right" | "left";
}

const EmptyState = (props: EmptyStateProps) => {
  const { image, title, description, CTAText, CTAIcon, IconP } = props;

  return (
    <S.EmptyStateWrapper>
      <S.EmptyStateImage>
        <Image
          src={`/images/${image}.png`}
          alt="clients"
          width={320}
          height={320}
        />
      </S.EmptyStateImage>
      <S.EmptyStateText>
        <Heading3>{title}</Heading3>
        <Body1>{description}</Body1>
      </S.EmptyStateText>
      <Button variant="primary" icon={CTAIcon} iconPostition={IconP}>
        {CTAText}
      </Button>
    </S.EmptyStateWrapper>
  );
};

export default EmptyState;

import Image from "next/image";
import * as S from "./EmptyState.style";
import Button from "components/Buttons/Button";
import { Body1, Heading3 } from "styles/Typography";

interface EmptyStateProps {
  title: string;
  description: string;
  image: string;
  CTAText: string;
  CTAIcon: string;
}

const EmptyState = (props: EmptyStateProps) => {
  const { image, title, description, CTAText, CTAIcon } = props;
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
      <Button variant="primary" icon={CTAIcon}>
        {CTAText}
      </Button>
    </S.EmptyStateWrapper>
  );
};

export default EmptyState;

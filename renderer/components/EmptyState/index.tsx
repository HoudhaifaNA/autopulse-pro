import Image from "next/image";

import * as S from "./styles";
import { Body1, Heading3 } from "styles/Typography";

import Button from "components/Button/Button";

interface EmptyStateProps {
  title: string;
  description: string;
  image: string;
  CTAText?: string;
  CTAIcon?: string;
  onCTAClick?: () => void;
}

const EmptyState = (props: EmptyStateProps) => {
  const { title, description, image, CTAText, CTAIcon, onCTAClick } = props;

  const renderCTABtn = () => {
    if (CTAText && onCTAClick) {
      return (
        <Button variant="primary" icon={CTAIcon} onClick={onCTAClick}>
          {CTAText}
        </Button>
      );
    }
  };

  return (
    <S.EmptyStateWrapper>
      <S.EmptyStateImage>
        <Image src={`/images/${image}.png`} alt={image} width={320} height={320} />
      </S.EmptyStateImage>
      <S.EmptyStateText>
        <Heading3>{title}</Heading3>
        <Body1>{description}</Body1>
      </S.EmptyStateText>
      {renderCTABtn()}
    </S.EmptyStateWrapper>
  );
};

export default EmptyState;

import { useContext } from "react";
import Image from "next/image";

import * as S from "components/EmptyState/EmptyState.styled";
import { Body1, Heading3 } from "styles/Typography";

import Button from "components/Button/Button";
import { GlobalContext } from "pages/_app";

interface EmptyStateProps {
  title: string;
  description: string;
  image: string;
  CTAText: string;
  CTAIcon: string;
  modal: string;
  handleClick?: () => void;
  IconP?: "right" | "left";
}

const EmptyState = (props: EmptyStateProps) => {
  const {
    image,
    title,
    description,
    CTAText,
    CTAIcon,
    modal,
    handleClick,
    IconP,
  } = props;
  const { _, setModal } = useContext(GlobalContext);
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
      <Button
        variant="primary"
        icon={CTAIcon}
        iconPostition={IconP}
        onClick={() => {
          modal && setModal(modal);
          handleClick && handleClick();
        }}
      >
        {CTAText}
      </Button>
    </S.EmptyStateWrapper>
  );
};

export default EmptyState;

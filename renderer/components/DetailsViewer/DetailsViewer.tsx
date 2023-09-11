import { useRouter } from "next/router";
import { ReactNode } from "react";

import * as S from "components/DetailsViewer/DetailsViewer.styled";
import { Heading3, Body2, Heading5, LabelText } from "styles/Typography";
import BlackOverlay from "styles/BlackOverlay";
import Icon from "components/Icon/Icon";
import Button from "components/Button/Button";

interface DetailViewerProps {
  title?: string;
  $width?: string;
  children: ReactNode;
}

interface DetailItemProps {
  title: string;
  $index?: number;
  children: ReactNode;
}

export const DetailSection = S.DetailSection;
export const DetailContent = S.DetailContent;

export const DetailHeader = ({ title }: { title: string }) => {
  return (
    <S.DetailSectionHeader>
      <Heading5>{title} :</Heading5>
    </S.DetailSectionHeader>
  );
};

export const DetailItem = ({ title, $index, children }: DetailItemProps) => {
  const PATTERN = /_(RD|GR)/g;
  const [content, colorClass] = typeof children === "string" ? children.split(PATTERN) : [children, ""];

  const renderChildren = () => {
    if (typeof children === "string" || typeof children === "number") {
      return (
        <LabelText className={colorClass} as="p">
          {content}
        </LabelText>
      );
    }
    return children;
  };

  return (
    <S.DetailItem $index={$index} $width={title === "caractéristiques" ? "80rem" : ""}>
      <Body2>{title} :</Body2>
      {renderChildren()}
    </S.DetailItem>
  );
};

const DetailsViewer = (props: DetailViewerProps) => {
  const { $width = "60%", children } = props;
  const router = useRouter();

  const pathWithoutDynamicParam = router.pathname.replace(/\[.*?\]/g, "");

  return (
    <S.DetailsViewer>
      <BlackOverlay $zIndexMultiplier={10} onClick={() => router.back()} />
      <S.DetailsContainer $width={$width}>
        <Button variant="ghost" onClick={() => router.push(pathWithoutDynamicParam)}>
          Fermer
        </Button>
        {children}
      </S.DetailsContainer>
    </S.DetailsViewer>
  );
};

export default DetailsViewer;

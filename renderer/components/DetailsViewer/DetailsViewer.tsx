import * as S from "components/DetailsViewer/DetailsViewer.styled";
import { ReactNode } from "react";
import { Heading3, Body1, Body2, Heading5 } from "styles/Typography";

interface DetailViewerProps {
  title: string;
  children: ReactNode;
}

interface DetailItemProps {
  title: string;
  value: ReactNode;
  $index?: number;
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

export const DetailItem = ({ title, value, $index }: DetailItemProps) => {
  const isString = typeof value === "string";
  const PATTERN = /_(RD|GR)/g;
  let mainText = isString && value.split(PATTERN)[0];
  let className = "";
  if (isString) {
    if (value.endsWith("_GR")) className += " green";
    if (value.endsWith("_RD")) className += " red";
  }

  return (
    <S.DetailItem $index={$index}>
      <Body2>{title} :</Body2>
      {isString ? <Body1 className={className}>{mainText}</Body1> : value}
    </S.DetailItem>
  );
};

const DetailsViewer = ({ title, children }: DetailViewerProps) => {
  return (
    <S.DetailsViewer>
      <div className="background-black" />
      <S.DetailsContainer>
        <Heading3>{title}</Heading3>
        {children}
      </S.DetailsContainer>
    </S.DetailsViewer>
  );
};

export default DetailsViewer;

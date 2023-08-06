import { ReactNode, useContext, useEffect, useState } from "react";

import * as S from "components/DetailsViewer/DetailsViewer.styled";
import { Heading3, Body1, Body2, Heading5 } from "styles/Typography";

import { GlobalContext } from "pages/_app";

interface DetailViewerProps {
  title?: string;
  $width?: string;
  children: ReactNode;
}

interface DetailItemProps {
  title: string;
  value: ReactNode;
  $index?: number;
  blurrable?: boolean;
  onClick?: () => void;
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

export const DetailItem = (props: DetailItemProps) => {
  const { title, value, $index, blurrable = false, onClick } = props;
  const [blurred, setBlur] = useState(blurrable);

  let className = "";
  const isString = typeof value === "string";
  const PATTERN = /_(RD|GR)/g;
  let mainText = isString && value.split(PATTERN)[0];

  if (isString) {
    if (value.endsWith("_GR")) className += " green";
    if (value.endsWith("_RD")) className += " red";
  }

  return (
    <S.DetailItem
      $index={$index}
      $width={title === "caractéristiques" ? "80rem" : ""}
      className={`item-${blurrable} ${blurred ? "it-blurred" : ""}`}
      onClick={onClick}
      onContextMenu={() => blurrable && setBlur((prev) => !prev)}
      style={{
        color: onClick ? "#00009b" : "#000",
        cursor: onClick ? "pointer" : "auto",
      }}
    >
      <Body2>{title} :</Body2>
      {isString ? <Body1 className={className}>{mainText}</Body1> : value}
    </S.DetailItem>
  );
};

const DetailsViewer = (props: DetailViewerProps) => {
  const { setDocument } = useContext(GlobalContext);
  const { title, $width = "60%", children } = props;
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "h") {
        let isThereBlur = document.querySelectorAll(".it-blurred").length > 0;

        document.querySelectorAll(".item-true").forEach((cell) => {
          if (isThereBlur) {
            cell.classList.remove("it-blurred");
          } else {
            cell.classList.add("it-blurred");
          }
        });
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  return (
    <S.DetailsViewer className="detail-viewer">
      <div
        className="background-black"
        onClick={() => setDocument({ type: "" })}
      />
      <S.DetailsContainer $width={$width}>
        <Heading3>{title}</Heading3>
        {children}
      </S.DetailsContainer>
    </S.DetailsViewer>
  );
};

export default DetailsViewer;

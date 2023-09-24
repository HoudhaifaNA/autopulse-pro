import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, ReactNode, SetStateAction } from "react";

import * as S from "components/DetailsViewer/styles";
import { Body2, Heading5, LabelText } from "styles/Typography";
import BlackOverlay from "styles/BlackOverlay";
import Button from "components/Button/Button";
import PDFPreview from "page-components/licences/PDFPreview";
import { SelectedAttachement } from "components/FileViewer";
import { useAppSelector } from "store";

interface DetailViewerProps {
  title?: string;
  $width?: string;
  children: ReactNode;
}

interface DetailItemProps {
  title: string;
  $index?: number;
  blurrable?: boolean;
  children: ReactNode;
}

interface FileThumbnailProps {
  file: string;
  selectAttachment: Dispatch<SetStateAction<SelectedAttachement | undefined>>;
}

export const DetailSection = S.DetailSection;
export const DetailContent = S.DetailContent;
export const AttachmentsList = S.AttachmentsList;

export const DetailHeader = ({ title }: { title: ReactNode }) => {
  return (
    <S.DetailSectionHeader>{typeof title === "string" ? <Heading5>{title} :</Heading5> : title}</S.DetailSectionHeader>
  );
};

export const DetailItem = ({ title, $index, blurrable, children }: DetailItemProps) => {
  const { defaultBlur } = useAppSelector((state) => state.user.user);
  let className = blurrable ? "blurrable" : "";
  if (blurrable && defaultBlur) className += " blurred";

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
    <S.DetailItem className={className} $index={$index} $width={title === "caractéristiques" ? "80rem" : ""}>
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

export const FileThumbnail = ({ file, selectAttachment }: FileThumbnailProps) => {
  const fileType = file.endsWith("pdf") ? "pdf" : "image";
  const FILE_PATH = `http://localhost:3000/api/attachments/${file}`;

  const renderFile = () => {
    if (fileType === "pdf") {
      return <PDFPreview file={FILE_PATH} />;
    } else {
      return <Image src={FILE_PATH} fill={true} alt="attachment" />;
    }
  };

  const onThumbnailClick = () => {
    selectAttachment({ type: fileType, file: FILE_PATH });
  };

  return <S.AttachementThumbnail onClick={onThumbnailClick}>{renderFile()}</S.AttachementThumbnail>;
};

export default DetailsViewer;

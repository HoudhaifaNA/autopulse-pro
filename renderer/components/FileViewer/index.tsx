import { Dispatch, SetStateAction } from "react";

import * as S from "components/FileViewer/styles";
import PDFViewer from "components/PDFViewer";
import Image from "next/image";
import BlackOverlay from "styles/BlackOverlay";

export interface SelectedAttachement {
  type: "image" | "pdf";
  file: string;
}

interface FileViewerProps {
  attachment: SelectedAttachement;
  selectAttachment: Dispatch<SetStateAction<SelectedAttachement | undefined>>;
}

const FileViewer = ({ attachment, selectAttachment }: FileViewerProps) => {
  const { type, file } = attachment;

  const closeViewer = () => selectAttachment(undefined);

  const renderAttachment = () => {
    if (type === "image") {
      return <Image src={file} width={0} height={0} alt="attchment" />;
    } else {
      return <PDFViewer file={file} />;
    }
  };

  return (
    <>
      <BlackOverlay $zIndexMultiplier={20} onClick={closeViewer} />
      <S.FileViewerWrapper>{renderAttachment()}</S.FileViewerWrapper>
    </>
  );
};

export default FileViewer;

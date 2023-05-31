import { ReactNode } from "react";

import * as S from "components/FileViewer/FileViewer.styled";

interface FileViewerProps {
  children: ReactNode;
  onCloseFile: () => void;
}

const FileViewer = ({ children, onCloseFile }: FileViewerProps) => {
  return (
    <>
      <S.FileBackground onClick={onCloseFile} />
      <S.FileViewerWrapper>{children}</S.FileViewerWrapper>
    </>
  );
};

export default FileViewer;

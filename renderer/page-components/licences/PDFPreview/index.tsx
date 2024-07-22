import { pdfjs, Document, Page } from "react-pdf";
import pdfjsWorker from "react-pdf/src/pdf.worker.entry.js";
import * as S from "./styles";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface PDFPreviewProps {
  file: string | File;
}

const PDFPreview = ({ file }: PDFPreviewProps) => {
  return (
    <S.PDFPreview>
      <Document file={file} loading="">
        <Page pageNumber={1} loading="" />
      </Document>
    </S.PDFPreview>
  );
};

export default PDFPreview;

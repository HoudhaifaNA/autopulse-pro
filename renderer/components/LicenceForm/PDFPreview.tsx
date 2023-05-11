import { pdfjs, Document, Page } from "react-pdf";
//@ts-ignore
import pdfjsWorker from "react-pdf/src/pdf.worker.entry.js";
import * as S from "components/LicenceForm/PDFPreview.styled";

// We have to setup a worker
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PDFPreview = ({ file }: { file: string }) => {
  return (
    <S.PDFPreview>
      <Document file={file} loading={""}>
        <Page pageNumber={1} loading={""} />
      </Document>
    </S.PDFPreview>
  );
};

export default PDFPreview;

import { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";

import * as S from "components/PDFViewer/styles";
import { Body1 } from "styles/Typography";

import Button from "components/Button/Button";

const PDFViewer = ({ file }: { file: string | File }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState<number>(1);
  const [value, setValue] = useState(currentPage);

  useEffect(() => {
    setValue(currentPage);
  }, [currentPage]);

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(numPages);
  const goToPreviousPage = () => currentPage > 1 && setCurrentPage((cur) => cur - 1);
  const goToNextPage = () => currentPage < numPages && setCurrentPage((cur) => cur + 1);
  const jumpToPage = () => value >= 1 && value <= numPages && setCurrentPage(value);

  return (
    <S.PDFViewerWrapper>
      <S.PaginationWrapper>
        <Button variant="primary" floating icon="first_page" onClick={goToFirstPage} />
        <Button variant="primary" floating icon="back" onClick={goToPreviousPage} />
        <S.JumpingInput>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.valueAsNumber)}
            onKeyDown={(e) => e.key === "Enter" && jumpToPage()}
          />
          <Body1> / {numPages}</Body1>
        </S.JumpingInput>
        <Button variant="primary" floating icon="next" onClick={goToNextPage} />
        <Button variant="primary" floating icon="last_page" onClick={goToLastPage} />
      </S.PaginationWrapper>
      <Document file={file} loading={""} onLoadSuccess={(pdf) => setNumPages(pdf.numPages)}>
        <Page pageNumber={currentPage} loading={""} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
    </S.PDFViewerWrapper>
  );
};

export default PDFViewer;

import styled from "styled-components";

export const PDFPreview = styled.div`
  height: 100%;
  width: 100%;
  border: 0.2rem solid ${({ theme }) => theme.colors.black};

  .react-pdf__Document {
    height: 100%;
  }

  .react-pdf__Page {
    height: 100% !important;
    min-width: 100% !important;
  }

  .react-pdf__Page__canvas {
    height: 100% !important;
    width: 100% !important;
  }
`;

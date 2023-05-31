import styled from "styled-components";
import { PDFViewerWrapper } from "components/PDFViewer/PDFViewer.styled";

export const FileBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 90000;
  background-color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
`;

export const FileViewerWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000000;

  & ${PDFViewerWrapper} {
    height: 95vh;
    transform: scale(0.95) translateY(-3rem);
  }

  img {
    width: 100%;
    height: auto;
    max-height: 100vh;
  }
`;

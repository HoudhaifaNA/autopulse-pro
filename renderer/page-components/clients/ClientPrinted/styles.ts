import styled from "styled-components";

import { TableWrapper, TableHead, TableRow, TableHeaderCell } from "components/Table/styles";

interface DetailLineProps {
  $type: "stacked" | "spaced";
}

export const DocumentWrapper = styled.div`
  position: relative;
  min-height: 27.7cm;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @page {
    size: A4;
    margin: 2rem;
    margin-top: 7mm;

    @bottom-left {
      content: counter(page);
    }
  }

  ${TableWrapper} {
    min-height: max-content;
    max-height: max-content;
    overflow: visible;
    margin-top: 1rem;
  }

  ${TableHead} {
  }

  ${TableHeaderCell} {
    position: relative;
  }

  ${TableRow}:first-child {
    border: 0.2rem solid ${({ theme }) => theme.colors.neutral[900]};
  }

  ${TableRow} {
    border-color: ${({ theme }) => theme.colors.neutral[900]};
  }

  ${TableRow} {
    min-height: 6rem;
  }

  a {
    color: ${({ theme }) => theme.colors.black};
    text-decoration: none;
    border: none;
  }

  .blurred {
    filter: blur(0px);
  }
`;

export const DocumentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DocumentLogo = styled.div``;

export const CompanyDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: right;
`;

export const Breaker = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const BreakerLine = styled.div`
  height: 2rem;
  flex: 1;
  background-color: #bc0707;

  &:first-child {
    flex-basis: 60%;
  }
`;

export const GroupTable = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  border: 0.2rem solid #000;
  border-radius: 1rem;
  page-break-inside: avoid;
  page-break-before: avoid;
`;

export const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const GroupTotals = styled.div`
  display: flex;
  margin-top: 2rem;
`;

export const GroupTotalsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
  margin-left: auto;
`;

export const ClientsTransactionsTotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const DetailLine = styled.div<DetailLineProps>`
  display: flex;
  min-width: 30rem;
  align-items: center;
  justify-content: ${({ $type }) => ($type === "spaced" ? "space-between" : "flex-start")};
  gap: ${({ $type }) => ($type === "stacked" ? "1rem" : "0")};

  p:first-child {
    font-weight: 700;
  }
`;

export const DocumentFooter = styled.div`
  margin-top: auto;
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: space-between;

  p {
    font-weight: 700;
  }
`;

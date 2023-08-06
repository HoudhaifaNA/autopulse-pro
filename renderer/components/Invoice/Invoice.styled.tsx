import { TransactionCell } from "components/TransacionsList/TransactionsList.styled";
import styled from "styled-components";
import { Body2 } from "styles/Typography";

export const InvoiceWrapper = styled.div`
  background-color: #fff;
  min-height: 84.2rem;
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media print {
    @page {
      margin: 2rem 0;
      @bottom-right {
        content: "Page " counter(page);
      }
    }
    table {
      page-break-after: always !important;
    }
    tr {
      page-break-before: always;
    }
  }

  & ${TransactionCell} {
    padding: 1.5rem 0.5rem;

    & ${Body2} {
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
    }
  }
`;

export const InvoiceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ComapnyDetails = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-end;
`;

export const InvoiceTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & > div {
    background-color: ${({ theme }) => theme.colors.error[700]};
    height: 1.2rem;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  gap: 1rem;
  min-height: 5rem;
  /* page-break-before: always; */

  & p:first-child {
    font-weight: 600;
  }

  & p.green {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.success[700]};
  }
  & p.red {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.error[700]};
  }
`;

export const InvoiceFooter = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex: 1;
  padding-bottom: 10rem;
  min-height: 10rem;
  page-break-after: always;
`;

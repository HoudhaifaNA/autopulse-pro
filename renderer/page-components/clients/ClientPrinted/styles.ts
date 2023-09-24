import { TableHeaderCell } from "components/Table/styles";
import { TableRow } from "components/Table/styles";
import { TableHead, TableWrapper } from "components/Table/styles";
import styled from "styled-components";

export const DocumentWrapper = styled.div`
  @page {
    size: A4;
    margin: 5mm;
    margin-top: 5mm;
  }

  ${TableWrapper} {
    max-height: max-content;
    overflow: visible;
  }

  ${TableHead} {
    /* position: relative; */
    display: none;
  }

  ${TableRow}:first-child {
    border-top: 0.2rem solid;
    border-bottom: 0.2rem solid;
    border-right: 0.2rem solid;
    border-left: 0.2rem solid;
    border-color: ${({ theme }) => theme.colors.neutral[200]};
  }
  ${TableRow} {
    min-height: 6rem;
    page-break-inside: avoid;
  }

  .page-number {
    position: absolute;
    top: 1rem; /* Adjust the top position as needed */
    right: 1rem; /* Adjust the right position as needed */
    font-size: 1.4rem;
    content: "Page " counter(page); /* Use the counter() function to display the page number */
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

import { useState } from "react";

import { Body2 } from "styles/Typography";

import {
  TableWrapper,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
} from "components/Table/Table";
import PageSwitcher from "components/FinancesTable/PageSwitcher";
import TransactionRow from "components/FinancesTable/TransactionRow";
import EuroTransferRow from "components/FinancesTable/EuroTransferRow";
import Checkbox from "components/Checkbox/Checkbox";
import Icon from "components/Icon/Icon";
import Pagination from "components/Pagination/Pagination";

import { HEADERS } from "components/FinancesTable/constants";

import { Page } from "components/FinancesTable/types";

const FinancesTable = () => {
  const [currentPage, setCurrentPage] = useState<Page>("transactions");

  return (
    <div>
      <PageSwitcher
        currentPage={currentPage}
        selectPage={(page) => setCurrentPage(page)}
      />
      <TableWrapper>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>
                <Checkbox />
              </TableHeaderCell>
              {HEADERS[currentPage].map((el) => {
                return (
                  <TableHeaderCell key={el.text}>
                    <Body2>{el.text}</Body2>
                    {el.sortable && <Icon icon="expand" size="1.8rem" />}
                  </TableHeaderCell>
                );
              })}
              <TableHeaderCell>
                <Icon icon="more_vert" size="1.8rem" />
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {new Array(10)
              .fill(1)
              .map((_, i) =>
                currentPage === "transactions" ? (
                  <TransactionRow key={i} />
                ) : (
                  <EuroTransferRow key={i} />
                )
              )}
          </TableBody>
        </Table>
      </TableWrapper>
      <Pagination />
    </div>
  );
};

export default FinancesTable;

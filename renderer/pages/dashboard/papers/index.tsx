import { ReactNode, useRef, useState } from "react";
import useSWR from "swr";

import Meta from "components/Meta/Meta";
import { fetcher } from "utils/API";
import PageHeader from "components/PageHeader/PageHeader";
import styled from "styled-components";
import StatTicket from "components/StatTicket/StatTicket";
import Loading from "components/Loading/Loading";
import formatFiatValue from "utils/formatFiatValue";
import { Body1, Heading5 } from "styles/Typography";

import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import { GetPapersStatsResponse } from "types";

const TicketListWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  margin-bottom: 4rem;
  border-radius: 0.4rem;
`;
const TicketListItems = styled.div`
  width: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
  gap: 2rem;
  & > a {
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      box-shadow: 0 1rem 2rem 1rem rgba(0, 0, 0, 0.1);
    }
  }
`;

const TicketList = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <TicketListWrapper>
      <Heading5 style={{ margin: "2rem 0" }}>{title}</Heading5>
      <TicketListItems>{children}</TicketListItems>
    </TicketListWrapper>
  );
};

const PapersStats = () => {
  const { data, isLoading, error } = useSWR<GetPapersStatsResponse>(`/stats/papers`, fetcher);

  const renderPage = () => {
    if (isLoading) return <Loading />;

    if (error) return <ErrorMessage>{error.response.data.message}</ErrorMessage>;

    if (data) {
      const { total_cost, papers_count } = data.papers_total_cost;
      const formattedTotalCost = formatFiatValue(total_cost, "DZD");

      return (
        <TicketList title="Coûts totaux des dossiers">
          <StatTicket title={`Dossiers (${papers_count})`} icon="folder" value={formattedTotalCost} />
        </TicketList>
      );
    }
  };
  return (
    <>
      <Meta title="Statistiques des dossiers" />
      {renderPage()}
    </>
  );
};

export default PapersStats;

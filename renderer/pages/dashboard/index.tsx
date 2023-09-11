import useSWR from "swr";

import Meta from "components/Meta/Meta";
import styled from "styled-components";
import StatTicket from "components/StatTicket/StatTicket";
import Loading from "components/Loading/Loading";
import Link from "next/link";
import { GetCountsResponse } from "types";
import { fetcher } from "utils/API";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";

const TicketList = styled.div`
  width: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  gap: 2rem;
  & > a {
    text-decoration: none;
    transition: all 0.2s ease;
    & > div {
      background-color: ${({ theme }) => theme.colors.white};
    }

    &:hover {
      box-shadow: 0 1rem 2rem 1rem rgba(0, 0, 0, 0.1);
    }
  }
`;

const STATS_NAMES = {
  clients: {
    translate: "clients",
    icon: "clients",
  },
  cars: {
    translate: "voitures",
    icon: "car",
  },
  licences: {
    translate: "licences",
    icon: "document",
  },
  expenses: {
    translate: "dépenses",
    icon: "shopping",
  },
  procurations: {
    translate: "procurations",
    icon: "procuration",
  },
  papers: {
    translate: "dossier",
    icon: "folder",
  },
  transactions: {
    translate: "transactions",
    icon: "exchange",
  },
};

const Dashboard = () => {
  const { data, isLoading, error } = useSWR<GetCountsResponse>("/stats/count", fetcher);

  const renderPage = () => {
    if (isLoading) return <Loading />;

    if (error) return <ErrorMessage>{error.response.data.message}</ErrorMessage>;

    if (data) {
      type CountKeys = keyof typeof data;

      return (Object.entries(data) as [CountKeys, number][]).map(([key, value]) => {
        if (key !== "status") {
          const { icon, translate } = STATS_NAMES[key];
          return (
            <Link href={`/dashboard/${key}`} key={key}>
              <StatTicket title={translate} icon={icon} value={value.toString()} />
            </Link>
          );
        }
      });
    }
  };
  return (
    <>
      <Meta title="Tableau de bord" />
      <TicketList>{renderPage()}</TicketList>
    </>
  );
};

export default Dashboard;

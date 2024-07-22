import Link from "next/link";
import useSWR from "swr";

import Meta from "components/Meta/Meta";
import StatTicket from "components/StatTicket";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import CountStatsFilter from "page-components/CountStatsFilter";
import TicketList from "components/TicketList";

import { fetcher } from "utils/API";
import { GetCountsResponse } from "types";
import { useAppSelector } from "store";

const STATS_NAMES = {
  revenu: {
    translate: "caisse",
    icon: "finance",
  },
  clients: {
    translate: "clients",
    icon: "clients",
  },
  cars: {
    translate: "voitures",
    icon: "car",
  },
  // licences: {
  //   translate: "licences",
  //   icon: "document",
  // },
  expenses: {
    translate: "dépenses",
    icon: "shopping",
  },
  // procurations: {
  //   translate: "procurations",
  //   icon: "procuration",
  // },
  // papers: {
  //   translate: "dossier",
  //   icon: "folder",
  // },
  // transactions: {
  //   translate: "transactions",
  //   icon: "exchange",
  // },
};

const Dashboard = () => {
  const { fetchedUrl } = useAppSelector((state) => state.resourceUrls.countStats);
  const { data, isLoading, error } = useSWR<GetCountsResponse>(fetchedUrl, fetcher);

  const renderPage = () => {
    if (isLoading) return <Loading />;

    if (error) return <ErrorMessage>{error.response.data.message}</ErrorMessage>;

    if (data) {
      type CountKeys = keyof typeof data;

      return (Object.entries(data) as [CountKeys, number][]).map(([key, value]) => {
        if (["cars", "expenses", "clients"].includes(key)) {
          //@ts-ignore
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
      <CountStatsFilter />
      <TicketList title="Tableau de bord">
        <Link href={`/dashboard/revenu`}>
          <StatTicket title="caisse" icon="finance" value="caisse" />
        </Link>
        {renderPage()}
      </TicketList>
    </>
  );
};

export default Dashboard;

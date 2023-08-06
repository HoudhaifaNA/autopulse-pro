import useSWR from "swr";

import Meta from "components/Meta/Meta";
import { fetcher } from "utils/API";
import PageHeader from "components/PageHeader/PageHeader";
import styled from "styled-components";
import StatTicket from "components/StatTicket/StatTicket";
import Loading from "components/Loading/Loading";
import Link from "next/link";
import Badge from "components/Badge/Badge";
import Icon from "components/Icon/Icon";
import Button from "components/Button/Button";
import useClickOutside from "hooks/useClickOutside";
import { useRef, useState } from "react";
import { Body1 } from "styles/Typography";
import Dropdown from "components/Dropdown/Dropdown";
import { FilterField } from "components/CarBrandFilter/CarBrandFilter.styled";

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
const isDropdownActive = (isActive: boolean) => {
  return isActive ? "dropdown_active" : "";
};

const Dashboard = () => {
  const [serie, setSerie] = useState("");
  const serieRef = useRef(null);
  const [isSeriesShown, toggleSeries] = useClickOutside(serieRef);
  const { data, isLoading } = useSWR(`/stats/counts?year=${serie}`, fetcher);
  const { data: yearsData } = useSWR(`/workingyears`, fetcher);
  let YEARS_LIST = [];
  if (yearsData) {
    YEARS_LIST = yearsData.years.map((yr: string) => {
      return { mainText: yr };
    });
  }

  const renderData = () => {
    if (isLoading) {
      return <Loading />;
    } else if (data) {
      const { clients, cars, licences, transactions, expenses } = data;

      return (
        <TicketList>
          <Link href="/dashboard/clients">
            <StatTicket title="Clients" icon="clients" value={clients} />
          </Link>
          <Link href="/dashboard/cars">
            <StatTicket title="Voitures" icon="car" value={cars} />
          </Link>
          <Link href="/dashboard/licences">
            <StatTicket title="Licences" icon="document" value={licences} />
          </Link>
          <Link href="/dashboard/transactions">
            <StatTicket
              title="Transactions"
              icon="exchange"
              value={transactions}
            />
          </Link>
          <Link href="/dashboard/expenses">
            <StatTicket title="Dépenses" icon="shopping" value={expenses} />
          </Link>
        </TicketList>
      );
    }
  };

  return (
    <>
      <Meta title="Tableau de bord" />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        {yearsData && (
          <FilterField
            ref={serieRef}
            className={isDropdownActive(isSeriesShown)}
            style={{
              backgroundColor: "#0045E5",
              color: "#fff",
              border: "none",
              minWidth: "12rem",
            }}
          >
            <Body1>{serie ? serie : "Serie"}</Body1>
            {isSeriesShown && (
              <Dropdown
                $width="100%"
                $top="4rem"
                $left="0"
                items={YEARS_LIST}
                onItemClick={(it) => {
                  toggleSeries(false);
                  setSerie(it);
                }}
              />
            )}

            <div
              style={{ marginLeft: "auto", zIndex: 15000 }}
              onClick={() => {
                toggleSeries(false);
                setSerie("");
              }}
            >
              <Icon icon="close" size="1.8rem" />
            </div>
            <div onClick={() => toggleSeries(!isSeriesShown)}>
              <Icon icon="expand" size="1.8rem" />
            </div>
          </FilterField>
        )}
      </div>
      {renderData()}
    </>
  );
};

export default Dashboard;

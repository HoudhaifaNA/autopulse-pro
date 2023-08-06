import useSWR from "swr";

import Meta from "components/Meta/Meta";
import { fetcher } from "utils/API";
import styled from "styled-components";
import StatTicket from "components/StatTicket/StatTicket";
import Loading from "components/Loading/Loading";
import formatPrice from "utils/formatPrice";
import { Body1, Heading5 } from "styles/Typography";
import { ReactNode, useRef, useState } from "react";
import useClickOutside from "hooks/useClickOutside";
import { FilterField } from "components/CarBrandFilter/CarBrandFilter.styled";
import Dropdown from "components/Dropdown/Dropdown";
import Icon from "components/Icon/Icon";

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

const TicketList = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <TicketListWrapper>
      <Heading5 style={{ margin: "2rem 0" }}>{title}</Heading5>
      <TicketListItems>{children}</TicketListItems>
    </TicketListWrapper>
  );
};
const isDropdownActive = (isActive: boolean) => {
  return isActive ? "dropdown_active" : "";
};

const CarsStats = () => {
  const [serie, setSerie] = useState("");
  const serieRef = useRef(null);
  const [isSeriesShown, toggleSeries] = useClickOutside(serieRef);
  const { data, isLoading } = useSWR(`/stats/cars?year=${serie}`, fetcher);
  const { data: yearsData } = useSWR(`/workingyears`, fetcher);
  let YEARS_LIST = [];
  if (yearsData) {
    YEARS_LIST = yearsData.carYearsList.map((yr: string) => {
      return { mainText: yr };
    });
  }
  const renderData = () => {
    if (isLoading) {
      return <Loading />;
    } else if (data) {
      console.log(data);

      return (
        <>
          <TicketList title="Nombre de voitures par catégorie :">
            {data.cars_types.map((el: any, i: number) => {
              let title = "";
              if (el.type === "importé") title = "Voitures importées";
              if (el.type === "UAE") title = "Voitures de Dubaï";
              if (el.type === "locale") title = "Voitures locales";

              return (
                <StatTicket
                  key={i}
                  title={title}
                  icon={el.type.toLowerCase()}
                  value={el.cars_number}
                />
              );
            })}
          </TicketList>
          <TicketList title="Coût en euros des voitures étrangères :">
            {data.sold_cars_stats.map((el: any, i: number) => {
              if (el.euro_cost) {
                let title = "";
                if (el.type === "importé") title = "voitures importées";
                if (el.type === "UAE") title = "voitures de Dubaï";

                return (
                  <StatTicket
                    key={i}
                    title={`Coût en euros des ${title}`}
                    icon={el.type.toLowerCase()}
                    value={formatPrice(el.euro_cost, "euro")}
                  />
                );
              }
            })}
          </TicketList>
          <TicketList title="Coût total des voitures :">
            {data.cars_cost.map((el: any, i: number) => {
              let title = "";
              if (el.type === "importé") title = "voitures importées";
              if (el.type === "UAE") title = "voitures de Dubaï";
              if (el.type === "locale") title = "voitures locales";

              return (
                <StatTicket
                  key={i}
                  title={`Coux total des ${title}`}
                  icon={el.type.toLowerCase()}
                  value={formatPrice(el.total_cost, "DA")}
                />
              );
            })}
          </TicketList>

          <TicketList title="Coût total des voitures vendues :">
            {data.sold_cars_stats.map((el: any, i: number) => {
              let title = "";
              if (el.type === "importé") title = "voitures importées";
              if (el.type === "UAE") title = "voitures de Dubaï";
              if (el.type === "locale") title = "voitures locales";
              return (
                <StatTicket
                  key={i}
                  title={`Coût total des ${title} (${el.cars_number})`}
                  icon={el.type.toLowerCase()}
                  value={formatPrice(el.total_cost, "DA")}
                />
              );
            })}
          </TicketList>
          <TicketList title="Total du prix de vente des voitures :">
            {data.sold_cars_stats.map((el: any, i: number) => {
              let title = "";
              if (el.type === "importé") title = "voitures importées";
              if (el.type === "UAE") title = "voitures de Dubaï";
              if (el.type === "locale") title = "voitures locales";
              return (
                <StatTicket
                  key={i}
                  title={`Total du prix de vente des ${title} (${el.cars_number})`}
                  icon={el.type.toLowerCase()}
                  value={formatPrice(el.sold_price, "DA")}
                />
              );
            })}
          </TicketList>
          <TicketList title="Bénéfice total des voitures :">
            {data.sold_cars_stats.map((el: any, i: number) => {
              let title = "";
              if (el.type === "importé") title = "voitures importées";
              if (el.type === "UAE") title = "voitures de Dubaï";
              if (el.type === "locale") title = "voitures locales";

              return (
                <StatTicket
                  key={i}
                  title={`Bénéfice total des ${title}`}
                  icon={el.type.toLowerCase()}
                  value={formatPrice(el.profit, "DA", true)}
                />
              );
            })}
          </TicketList>
        </>
      );
    }
  };

  return (
    <>
      <Meta title="Statistiques des voitures" />
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

export default CarsStats;

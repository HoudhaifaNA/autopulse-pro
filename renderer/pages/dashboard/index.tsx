import useSWR from "swr";

import Meta from "components/Meta/Meta";
import { fetcher } from "utils/API";
import PageHeader from "components/PageHeader/PageHeader";
import styled from "styled-components";
import StatTicket from "components/StatTicket/StatTicket";
import Loading from "components/Loading/Loading";

const TicketList = styled.div`
  width: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
  gap: 2rem;
`;

const findCarType = (arr: any, type: string, prop: string = "type") => {
  return arr.find((car: any) => {
    return car[prop] === type;
  });
};

const Dashboard = () => {
  const { data, isLoading } = useSWR("/stats/counts", fetcher);

  const renderData = () => {
    if (isLoading) {
      return <Loading />;
    } else if (data) {
      const {
        clients,
        cars,
        licences,
        transactions,
        expensesCount,
        totalExpensesList,
      } = data;

      const boughtCarsListImported = findCarType(
        data.boughtCarsList,
        "importé"
      );
      const boughtCarsListLocale = findCarType(data.boughtCarsList, "locale");
      const soldCarsListImported = findCarType(data.soldCarsList, "importé");
      const soldCarsListLocale = findCarType(data.soldCarsList, "locale");
      const importedCarsProfit = findCarType(data.carsProfitsList, "importé");
      const localeCarsProfit = findCarType(data.carsProfitsList, "locale");
      const averageImportedCarCost = findCarType(data.avgCarCost, "importé");
      const averageLocaleCarCost = findCarType(data.avgCarCost, "locale");
      const averageImportedSoldPrice = findCarType(data.avgSold, "importé");
      const averageLocaleSoldPrice = findCarType(data.avgSold, "locale");
      const peopleInDebt = findCarType(data.debtStatus, "indebt", "status");
      const lenderPeople = findCarType(data.debtStatus, "lender", "status");
      return (
        <TicketList>
          <StatTicket title="Clients" icon="clients" value={clients} />
          <StatTicket title="Voitures" icon="car" value={cars} />
          <StatTicket title="Licences" icon="document" value={licences} />
          <StatTicket
            title="Transactions"
            icon="exchange"
            value={transactions}
          />
          <StatTicket title="Dépenses" icon="shopping" value={expensesCount} />
          <StatTicket
            title={`Personnes à qui je dois (${
              peopleInDebt?.count ?? 0
            } persones)`}
            icon="debt"
            value={`${Math.abs(peopleInDebt?.amount ?? 0).toLocaleString()}`}
          />
          <StatTicket
            title={`Personnes qui me doivent (${
              lenderPeople?.count ?? 0
            } persones)`}
            icon="lent"
            value={`${Math.abs(lenderPeople?.amount ?? 0).toLocaleString()}`}
          />
          <StatTicket
            title="Nombre de voitures importées"
            icon="importé"
            value={boughtCarsListImported?.count ?? 0}
          />
          <StatTicket
            title="Nombre de voitures importées vendues"
            icon="importé"
            value={soldCarsListImported?.count ?? 0}
          />
          <StatTicket
            title="Coût total des voitures importées"
            icon="importé"
            value={`${(
              boughtCarsListImported?.total ?? 0
            ).toLocaleString()}.00 DA`}
          />
          <StatTicket
            title="Total des dépenses"
            icon="importé"
            value={`${totalExpensesList[0].total?.toLocaleString() ?? 0}.00 DA`}
          />
          <StatTicket
            title="Prix de vente des voitures importées"
            icon="importé"
            value={`${(
              soldCarsListImported?.total ?? 0
            ).toLocaleString()}.00 DA`}
          />

          <StatTicket
            title="Intérêt des voitures importées"
            icon="importé"
            value={`${(
              importedCarsProfit?.profit ??
              0 - totalExpensesList[0].total ??
              0
            ).toLocaleString()}.00 DA`}
          />
          <StatTicket
            title="Coût moyen des voitures importées"
            icon="importé"
            value={`${(
              averageImportedCarCost?.avgTotal ?? 0
            ).toLocaleString()}.00 DA`}
          />
          <StatTicket
            title="Pr. vente moyen des voitures importées"
            icon="importé"
            value={`${(
              averageImportedSoldPrice?.avgSold ?? 0
            ).toLocaleString()}.00 DA`}
          />
          <StatTicket
            title="Nombre de voitures locale"
            icon="locale"
            value={boughtCarsListLocale?.count ?? 0}
          />
          <StatTicket
            title="Nombre de voitures locales vendues"
            icon="locale"
            value={soldCarsListLocale?.count ?? 0}
          />
          <StatTicket
            title="Coût total des voitures locales"
            icon="locale"
            value={`${
              (boughtCarsListLocale?.total ?? 0).toLocaleString() ?? 0
            }.00 DA`}
          />

          <StatTicket
            title="Prix de vente des voitures locales"
            icon="locale"
            value={`${
              (soldCarsListLocale?.total ?? 0).toLocaleString() ?? 0
            }.00 DA`}
          />
          <StatTicket
            title="Intérêt des voitures locales"
            icon="locale"
            value={`${(localeCarsProfit?.profit ?? 0).toLocaleString()}.00 DA`}
          />
          <StatTicket
            title="Coût moyen des voitures locales"
            icon="locale"
            value={`${(
              averageLocaleCarCost?.avgTotal ?? 0
            ).toLocaleString()}.00 DA`}
          />
          <StatTicket
            title="Pr. vente moyen des voitures importées"
            icon="locale"
            value={`${(
              averageLocaleSoldPrice?.avgSold ?? 0
            ).toLocaleString()}.00 DA`}
          />
        </TicketList>
      );
    }
  };

  return (
    <>
      <Meta title="Tableau de bord" />
      <PageHeader title="Tableau de bord" />
      {renderData()}
    </>
  );
};

export default Dashboard;

import { useState, useContext } from "react";
import useSWR from "swr";

import { ButtonItem } from "components/Dropdown/Dropdown.styled";

import PageHeader from "components/PageHeader/PageHeader";
import EmptyState from "components/EmptyState/EmptyState";
import TransactionForm from "components/FinancesForm/TransactionForm";
import EuroTransferForm from "components/FinancesForm/EuroTransferForm";
import FinancesTable from "components/Tables/FinancesTable";
import Meta from "components/Meta/Meta";
import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";
import { fetcher } from "utils/API";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import PageSwitcher from "components/FinancesTable/PageSwitcher";
import { Page } from "components/FinancesTable/types";
import { GlobalContext } from "pages/_app";
import { Heading5 } from "styles/Typography";

const TransferOptions = ({ setModal }: { setModal: any }) => {
  return (
    <Dropdown $right="0" $top="100%" $width="24rem">
      <ButtonItem onClick={() => setModal({ name: "transactions" })}>
        <Button variant="ghost" icon="exchange">
          Effectuer une transaction
        </Button>
      </ButtonItem>
      <ButtonItem>
        <Button
          variant="ghost"
          icon="euro"
          onClick={() => setModal({ name: "euros" })}
        >
          Acheter des euros
        </Button>
      </ButtonItem>
    </Dropdown>
  );
};

const FinancePage = () => {
  const [isActive, setActive] = useState(false);
  const { setModal } = useContext(GlobalContext);
  const { data, isLoading, error } = useSWR("/transactions/money", fetcher);
  const [currentPage, setCurrentPage] = useState<Page>("transactions");

  const renderPage = () => {
    if (isLoading) return <Loading />;
    if (error) {
      return <ErrorMessage>{error.response.data.message}</ErrorMessage>;
    }
    if (
      data &&
      data.moneyTransactions.length === 0 &&
      data.eurosTransactions.length === 0
    ) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EmptyState
            title="Vous n'avez aucune transaction"
            description="Ajoutez des transactions pour les voir ici"
            image="finance"
            CTAText="Ajouter"
            CTAIcon="expand"
            IconP="right"
            modal=""
            handleClick={() => setActive(!isActive)}
          />

          <div
            style={{ width: "11.6rem", position: "relative", zIndex: "100" }}
          >
            {isActive && <TransferOptions setModal={setModal} />}
          </div>
        </div>
      );
    } else {
      const transactionList = {
        transactions: data.moneyTransactions,
        "virements des euros": data.eurosTransactions,
      };
      return (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Heading5>{transactionList[currentPage].length}</Heading5>
            <PageHeader
              CTAText="Ajouter"
              CTAIcon="add"
              IconP="right"
              CTAonClick={() =>
                currentPage === "virements des euros"
                  ? setModal({ name: "euros" })
                  : setModal({ name: "transactions" })
              }
            />
          </div>
          <>
            <PageSwitcher
              currentPage={currentPage}
              selectPage={(page) => setCurrentPage(page)}
            />
            <FinancesTable currentPage={currentPage} transactions={data} />
          </>
        </>
      );
    }
  };

  return (
    <>
      <Meta title="Finances" />
      {renderPage()}
    </>
  );
};

export default FinancePage;

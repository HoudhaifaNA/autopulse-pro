import { ButtonItem } from "components/Dropdown/Dropdown.styled";

import PageHeader from "components/PageHeader/PageHeader";
import EmptyState from "components/EmptyState/EmptyState";
import TransactionForm from "components/FinancesForm/TransactionForm";
import EuroTransferForm from "components/FinancesForm/EuroTransferForm";
import FinancesTable from "components/FinancesTable/FinancesTable";
import Meta from "components/Meta/Meta";
import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/Button";

const TransferOptions = () => (
  <Dropdown $right="0" $width="24rem">
    <ButtonItem>
      <Button variant="ghost" icon="exchange">
        Effectuer une transaction
      </Button>
    </ButtonItem>
    <ButtonItem>
      <Button variant="ghost" icon="euro">
        Acheter des euros
      </Button>
    </ButtonItem>
  </Dropdown>
);

const FinancePage = () => {
  return (
    <div>
      <Meta title="Finances" />
      {/* <div className="background-black" /> */}
      {/* <TransactionForm />
      <EuroTransferForm /> */}

      <div style={{ position: "relative", zIndex: "8000" }}>
        <div>
          <PageHeader
            title="Finances"
            CTAText="Ajouter"
            CTAIcon="expand"
            IconP="right"
            CTAonClick={() => console.log("Hello")}
          />
          {/* <TransferOptions /> */}
        </div>
      </div>
      {/* <div
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
        />
        <div style={{ position: "relative", width: "11.6rem" }}>
          <TransferOptions />
        </div>
      </div> */}
      <FinancesTable />
    </div>
  );
};

export default FinancePage;

import ExpensesGroupTable from "page-components/expenses/ExpensesGroupTable";
import ExpensesFilter from "page-components/expenses/ExpensesFilter";
import PageWrapper from "components/PageWrapper";

const ExpensesPage = () => {
  return (
    <PageWrapper
      resourceName="expenses"
      resourceDisplayName="dépense"
      tableComponent={ExpensesGroupTable}
      filterComponent={ExpensesFilter}
    />
  );
};

export default ExpensesPage;

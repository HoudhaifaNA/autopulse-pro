import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import ExpensesTable from "page-components/expenses/ExpensesTable";
import ExpensesFilter from "page-components/expenses/ExpensesFilter";
import PageWrapper from "components/PageWrapper";

import { addSecondaryUrl, deleteSecondaryUrl, setParam } from "store/reducers/resourceUrls";

const ExpensesByDatePage = () => {
  const router = useRouter();
  const { date } = router.query;
  const dispatch = useDispatch();

  const resetParams = () => {
    dispatch(setParam({ resource: "expenses", paramKey: "orderBy", paramValue: "cost" }));
    dispatch(setParam({ resource: "expenses", paramKey: "page", paramValue: 1 }));
    dispatch(setParam({ resource: "expenses", paramKey: "limit", paramValue: 10 }));
  };

  useEffect(() => {
    resetParams();
    dispatch(addSecondaryUrl({ resource: "expenses", url: `/expenses/group/${date}` }));

    return () => {
      dispatch(deleteSecondaryUrl({ resource: "expenses" }));
      resetParams();
    };
  }, []);

  return (
    <PageWrapper
      resourceName="expenses"
      resourceDisplayName="dépense"
      tableComponent={ExpensesTable}
      filterComponent={ExpensesFilter}
      isSecondaryUrl={true}
    />
  );
};

export default ExpensesByDatePage;

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";

import Pagination from "components/Pagination/Pagination";
import PageHeader from "components/PageHeader/PageHeader";
import EmptyState from "components/EmptyState/EmptyState";
import Meta from "components/Meta/Meta";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import { Body1 } from "styles/Typography";

import { useAppSelector } from "store";
import { fetcher } from "utils/API";
import { GetFiatTransactionsResponse } from "types";
import { addModal } from "store/reducers/modals";
import FiatTable from "../components/FiatTable";
import FiatFilter from "../components/FiatFilter";

const EuroPage = () => {
  const url = useAppSelector((state) => state.resourceUrls.transactionsDZD.fetchedUrl);
  const selectedIds = useAppSelector((state) => state.selectedItems.selectedIds);
  const { data, isLoading, error } = useSWR<GetFiatTransactionsResponse>(url, fetcher);
  const [hasData, setHasData] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) setHasData(true);
  }, [url.split("?")[0]]);

  const renderPage = () => {
    if (isLoading) return <Loading />;

    if (error) return <ErrorMessage>{error.response.data.message}</ErrorMessage>;

    if (data) {
      // if (data.clients.length === 0) {
      //   return (
      //     <EmptyState
      //       title="Vous n'avez pas de clients"
      //       description="Ajoutez des clients pour les voir ici"
      //       image="clients"
      //       CTAText="Ajouter un client"
      //       CTAIcon="add"
      //       modal="clients"
      //     />
      //   );
      // }
      return (
        <>
          <FiatTable transactions={data.fiat_transactions} resource="transactionsDZD" />
          <Pagination resource="transactionsDZD" results={data.results} />
        </>
      );
    }
  };

  return (
    <>
      <Meta title="Euro transactions" />
      <>
        <PageHeader
          CTAIcon="add"
          CTAText="Ajouter"
          onCTAClick={() => {
            dispatch(addModal({ name: "transactionsDZD", title: "Ajouter un virement dinar" }));
          }}
        >
          <div style={{ display: "flex", gap: "2rem" }}>
            <FiatFilter resource="transactionsDZD" />
            <Body1>We found {data?.results} transactions</Body1>
          </div>
        </PageHeader>
        <div style={{ margin: "2rem 0" }}>
          {selectedIds.length > 0 && (
            <Body1>
              <b>{selectedIds.length} </b> selected
            </Body1>
          )}
        </div>
      </>
      {renderPage()}
    </>
  );
};

export default EuroPage;

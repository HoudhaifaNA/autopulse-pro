import { useContext, useEffect, useState } from "react";
import useSWR from "swr";

import Meta from "components/Meta/Meta";
import PageHeader from "components/PageHeader/PageHeader";
import EmptyState from "components/EmptyState/EmptyState";
import LicencesTable from "components/Tables/LicencesTable";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";

import { fetcher } from "utils/API";
import { GlobalContext } from "pages/_app";
import { Heading5 } from "styles/Typography";
import Pagination from "components/Pagination/Pagination";

const LicencesPage = () => {
  const { setModal, modalDelete } = useContext(GlobalContext);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [swrOptions, setSWROptions] = useState({});
  const url = `/licences?limit=${rows}&page=${page}`;
  const { data, isLoading, error } = useSWR(url, fetcher, swrOptions);

  useEffect(() => {
    setSWROptions({ refreshInterval: 100 });

    const swrTimeOut = setTimeout(() => {
      setSWROptions({});
    }, 1000);

    return () => clearTimeout(swrTimeOut);
  }, [JSON.stringify(modalDelete)]);

  const renderPage = () => {
    if (isLoading) return <Loading />;
    if (error) {
      return <ErrorMessage>{error.response.data.message}</ErrorMessage>;
    }
    if (data && data.results === 0) {
      return (
        <EmptyState
          title="Vous n'avez pas de licences"
          description="Ajoutez des licences pour les voir ici"
          image="licences"
          CTAText="Ajouter une licence"
          CTAIcon="add"
          modal="licences"
        />
      );
    } else {
      const lastPage = Math.ceil(data.results / rows);
      const firstRowNum = (page - 1) * rows + 1;
      const lastRowNum = page === lastPage ? data.results : page * rows;
      let rowsNumbers: number[] | null = [];

      for (let i = firstRowNum; i <= lastRowNum; i++) {
        rowsNumbers.push(i);
      }
      return (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "2rem",
            }}
          >
            <Heading5>{data.results} </Heading5>
            <PageHeader
              CTAText="Ajouter"
              CTAIcon="add"
              CTAonClick={() => setModal({ name: "licences" })}
            />
          </div>
          <LicencesTable licences={data.licences} rowsNumbers={rowsNumbers} />
          <Pagination
            rows={rows}
            page={page}
            results={data.results}
            setPage={setPage}
            setRows={setRows}
          />
        </>
      );
    }
  };
  return (
    <>
      <Meta title="Licences" />
      {renderPage()}
    </>
  );
};

export default LicencesPage;

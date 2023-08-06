import { useContext, useEffect, useState } from "react";
import useSWR from "swr";

import PageHeader from "components/PageHeader/PageHeader";
import EmptyState from "components/EmptyState/EmptyState";
import CarBrandFilter from "components/CarBrandFilter/CarBrandFilter";
import CarsTable from "components/Tables/CarsTable";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import Meta from "components/Meta/Meta";

import { fetcher } from "utils/API";
import { GlobalContext } from "pages/_app";
import Pagination from "components/Pagination/Pagination";

const CarsPage = () => {
  const { setModal, currModal, modalDelete } = useContext(GlobalContext);
  const [currCars, setCars] = useState<any>([]);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState("created_at");
  const [swrOptions, setSWROptions] = useState({});

  const url = `/cars?orderBy=${orderBy}&limit=${rows}&page=${page}`;
  const { data, isLoading, error } = useSWR(url, fetcher, swrOptions);
  useEffect(() => {
    setSWROptions({ refreshInterval: 100 });

    const swrTimeOut = setTimeout(() => {
      setSWROptions({});
    }, 1000);

    return () => clearTimeout(swrTimeOut);
  }, [JSON.stringify(modalDelete), JSON.stringify(currModal)]);

  const renderPage = () => {
    if (isLoading) return <Loading />;
    if (error) {
      return <ErrorMessage>{error.response.data.message}</ErrorMessage>;
    }
    if (data && data.results === 0) {
      return (
        <EmptyState
          title="Vous n'avez pas de voitures"
          description="Ajoutez des voitures pour les voir ici"
          image="cars"
          CTAText="Ajouter un voiture"
          CTAIcon="add"
          modal="cars"
        />
      );
    } else {
      const lastPage = Math.ceil(data.results / rows);
      const firstRowNum = (page - 1) * rows + 1;
      const lastRowNum = page === lastPage ? data.results : page * rows;
      let rowsNumbers: number[] | null = [];
      if (currCars && currCars.length > 0) {
        rowsNumbers = null;
      } else {
        for (let i = firstRowNum; i <= lastRowNum; i++) {
          rowsNumbers.push(i);
        }
      }
      let carsList = data.cars;
      if (currCars && currCars.length > 0) carsList = currCars;
      if (!currCars) carsList = [];

      return (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              marginBottom: "2rem",
            }}
          >
            <CarBrandFilter
              setCurrCars={(cars) => {
                setCars(cars);
              }}
              carsNum={carsList.length}
            />

            <PageHeader
              CTAText="Ajouter"
              CTAIcon="add"
              CTAonClick={() => setModal({ name: "cars" })}
            />
          </div>

          <CarsTable
            cars={carsList}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            rowsNumbers={rowsNumbers}
          />
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
      <Meta title="Voitures" />
      {renderPage()}
    </>
  );
};

export default CarsPage;

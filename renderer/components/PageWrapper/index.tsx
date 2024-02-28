import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";

import * as S from "./styles";
import { Body2, LabelText } from "styles/Typography";
import Pagination from "components/Pagination/Pagination";
import PageHeader from "components/PageHeader";
import EmptyState from "components/EmptyState";
import Meta from "components/Meta/Meta";
import Loading from "components/Loading/Loading";
import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import Button from "components/Button/Button";

import { useAppSelector } from "store";
import { fetcher } from "utils/API";
import { addModal } from "store/reducers/modals";
import { Resources } from "types";
import parseUrlQueries from "utils/parseUrlQueries";
import { deleteParam, setParam } from "store/reducers/resourceUrls";
import Icon from "components/Icon/Icon";
import PathBar from "components/PathBar";

interface ResourcePageProps<T> {
  resourceName: Resources;
  resourceDisplayName: string;
  tableComponent: React.ComponentType<{ data: T; resource: Resources }>;
  filterComponent: React.ComponentType<{ resource: Resources }>;
  isSecondaryUrl?: boolean;
}

const PageWrapper = <T extends Record<string, any>>(props: ResourcePageProps<T>) => {
  const {
    resourceName,
    resourceDisplayName,
    tableComponent: TableComponent,
    filterComponent: FilterComponent,
    isSecondaryUrl,
  } = props;

  const router = useRouter();
  const { startUrl, fetchedUrl, secondaryUrl } = useAppSelector((state) => state.resourceUrls[resourceName]);
  const selectedIds = useAppSelector((state) => state.selectedItems.selectedIds);
  const modalsList = useAppSelector((state) => state.modals.modalsList);
  const url = isSecondaryUrl ? secondaryUrl : fetchedUrl;
  const { data, isLoading, error } = useSWR<T>(url, fetcher);
  const dispatch = useDispatch();
  const toggleAddModal = () => dispatch(addModal({ name: resourceName, title: `Ajouter ${resourceDisplayName}` }));
  const toggleExchangeRateModal = () => {
    dispatch(addModal({ name: "exchange_rate", title: `Modifier prix de 100€ de ${selectedIds.length} voitures` }));
  };

  const hasFilter = startUrl !== fetchedUrl;

  useEffect(() => {
    const handleAddModalShortcut = (e: KeyboardEvent) => {
      if ((e.target as Element)?.tagName !== "INPUT") {
        if (e.key.toLowerCase() === "n" && !modalsList.length) toggleAddModal();
      }
    };

    window.addEventListener("keypress", handleAddModalShortcut);

    return () => window.removeEventListener("keypress", handleAddModalShortcut);
  }, [modalsList]);

  const renderUpdateMultipleController = () => {
    if (router.asPath.startsWith("/cars") && selectedIds.length > 0) {
      return (
        <Button variant="primary" onClick={toggleExchangeRateModal}>
          Modifier le prix de 100€
        </Button>
      );
    }
  };

  const params = parseUrlQueries(fetchedUrl);

  const renderFilterList = () => {
    return Object.entries(params).map(([param, { key, value }]) => {
      const removeFilterItem = () => dispatch(deleteParam({ paramKey: param, resource: resourceName }));

      if (!["model", "brand", "type"].includes(param) && key && value) {
        return (
          <S.FilterItem key={param} onClick={removeFilterItem}>
            <Body2>{key}</Body2>
            <Icon icon="close" size="1.2rem" />
          </S.FilterItem>
        );
      }
    });
  };

  const renderPage = () => {
    if (isLoading) return <Loading />;

    if (error) return <ErrorMessage>{error.response.data.message}</ErrorMessage>;

    if (data) {
      if (data.results === 0 && !hasFilter) {
        return (
          <EmptyState
            title={`Vous n'avez pas des ${resourceDisplayName}s`}
            description={`Ajoutez des ${resourceDisplayName}s pour les voir ici`}
            image={resourceName}
            CTAText={`Ajouter ${resourceDisplayName}`}
            CTAIcon="add"
            onCTAClick={toggleAddModal}
          />
        );
      }

      return (
        <>
          {(data.results > 0 || (data.results === 0 && hasFilter)) && (
            <>
              <PageHeader CTAIcon="add" CTAText="Ajouter" onCTAClick={toggleAddModal}>
                <FilterComponent resource={resourceName} />
                <S.FilterList>
                  <PathBar />
                  {renderFilterList()}
                </S.FilterList>
                {renderUpdateMultipleController()}
              </PageHeader>
              <S.PageHeaderAddOn>
                <LabelText as="p">
                  Trouvé <b>{data?.results}</b> résultats
                </LabelText>
                {selectedIds.length > 0 && (
                  <LabelText as="p">
                    <b>{selectedIds.length}</b> sélectionnés
                  </LabelText>
                )}
              </S.PageHeaderAddOn>
            </>
          )}
          <TableComponent data={data} resource={resourceName} />
          <Pagination resource={resourceName} results={data.results} />
        </>
      );
    }
  };

  return (
    <>
      <Meta title={`${resourceDisplayName}s`} />
      {renderPage()}
    </>
  );
};

export default PageWrapper;

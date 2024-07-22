import PageWrapper from "components/PageWrapper";
import CarsFilter from "page-components/cars/CarsFilter/CarsFilter";
import CarsTable from "page-components/cars/CarsTable/CarsTable";

const CarsPage = () => {
  return (
    <PageWrapper
      resourceName="cars"
      resourceDisplayName="voiture"
      tableComponent={CarsTable}
      filterComponent={CarsFilter}
    />
  );
};

export default CarsPage;

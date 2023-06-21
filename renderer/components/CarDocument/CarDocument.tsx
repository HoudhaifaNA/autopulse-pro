import { useContext } from "react";
import useSWR from "swr";

import DetailsViewer, {
  DetailContent,
  DetailHeader,
  DetailItem,
  DetailSection,
} from "components/DetailsViewer/DetailsViewer";

import retreiveCarDetails from "components/CarDocument/constants";
import Button from "components/Button/Button";
import { GlobalContext } from "pages/_app";
import { fetcher } from "utils/API";

type TNestedValue = { [key: string]: string };

const renderNestedValues = (nestedValue: TNestedValue, rowStart: number) => {
  return Object.entries(nestedValue).map(([key, value], i) => {
    return <DetailItem key={i} title={key} value={value} $index={rowStart} />;
  });
};

const CarDocument = () => {
  const { setModal, currDocument } = useContext(GlobalContext);
  const { id } = currDocument;
  const { data } = useSWR(`/cars/${id}`, fetcher);

  const CAR_DETAILS = data ? retreiveCarDetails(data.car) : [];

  return (
    <>
      {data && (
        <DetailsViewer title="Document de voiture">
          {!data.car.buyer && (
            <Button variant="primary" onClick={() => setModal("sell")}>
              Vendre cette voiture
            </Button>
          )}

          {CAR_DETAILS.map(({ section, columns, details }) => {
            const sectionDetails = Object.entries(details);

            return (
              sectionDetails.length > 0 && (
                <DetailSection key={section}>
                  <DetailHeader title={section} />
                  <DetailContent $columns={columns}>
                    {sectionDetails.map(([key, value], i) => {
                      if (typeof value === "string") {
                        return <DetailItem key={i} title={key} value={value} />;
                      } else if (typeof value === "object") {
                        return renderNestedValues(value, i);
                      }
                    })}
                  </DetailContent>
                </DetailSection>
              )
            );
          })}
        </DetailsViewer>
      )}
    </>
  );
};

export default CarDocument;

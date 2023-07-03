import { useContext } from "react";
import useSWR from "swr";

import DetailsViewer, {
  DetailContent,
  DetailHeader,
  DetailItem,
  DetailSection,
} from "components/DetailsViewer/DetailsViewer";
import Button from "components/Button/Button";

import retreiveCarDetails from "components/CarDocument/retreiveCarDetails";
import { fetcher } from "utils/API";
import { GlobalContext } from "pages/_app";

type NestedValueType = { [key: string]: string };

const renderNestedValues = (nestedValue: NestedValueType, rowStart: number) => {
  return Object.entries(nestedValue).map(([key, value], ind) => {
    return <DetailItem key={ind} title={key} value={value} $index={rowStart} />;
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
            <Button
              variant="primary"
              onClick={() => setModal({ name: "sell", data: { id } })}
            >
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
                    {sectionDetails.map(([key, value], ind) => {
                      if (typeof value === "string") {
                        return (
                          <DetailItem key={ind} title={key} value={value} />
                        );
                      } else if (typeof value === "object") {
                        return renderNestedValues(value, ind);
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

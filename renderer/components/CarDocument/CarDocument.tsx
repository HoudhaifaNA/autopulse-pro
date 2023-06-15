import { useContext } from "react";

import DetailsViewer, {
  DetailContent,
  DetailHeader,
  DetailItem,
  DetailSection,
} from "components/DetailsViewer/DetailsViewer";

import retreiveCarDetails from "components/CarDocument/constants";
import Button from "components/Button/Button";
import { GlobalContext } from "pages/_app";
import SellForm from "components/SellForm/SellForm";

type TNestedValue = { [key: string]: string };

const renderNestedValues = (nestedValue: TNestedValue, rowStart: number) => {
  return Object.entries(nestedValue).map(([key, value], i) => {
    return <DetailItem key={i} title={key} value={value} $index={rowStart} />;
  });
};

const CarDocument = ({ document }: { document: any }) => {
  const { currModal, setModal } = useContext(GlobalContext);
  const CAR_DETAILS = retreiveCarDetails(document);

  return (
    <>
      {currModal === "sell" && <SellForm id={document.id} />}
      <DetailsViewer title="Document de voiture">
        {!document.buyer && (
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
    </>
  );
};

export default CarDocument;

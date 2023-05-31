import DetailsViewer, {
  DetailContent,
  DetailHeader,
  DetailItem,
  DetailSection,
} from "components/DetailsViewer/DetailsViewer";

import { CAR_DETAILS } from "components/CarDocument/constants";

type TNestedValue = { [key: string]: string };

const renderNestedValues = (nestedValue: TNestedValue, rowStart: number) => {
  return Object.entries(nestedValue).map(([key, value], i) => {
    return <DetailItem key={i} title={key} value={value} $index={rowStart} />;
  });
};

const CarDocument = () => {
  return (
    <DetailsViewer title="Document de voiture">
      {CAR_DETAILS.map(({ section, columns, details }) => {
        return (
          <DetailSection key={section}>
            <DetailHeader title={section} />
            <DetailContent $columns={columns}>
              {Object.entries(details).map(([key, value], i) => {
                if (typeof value === "string") {
                  return <DetailItem key={i} title={key} value={value} />;
                } else if (typeof value === "object") {
                  return renderNestedValues(value, i);
                }
              })}
            </DetailContent>
          </DetailSection>
        );
      })}
    </DetailsViewer>
  );
};

export default CarDocument;

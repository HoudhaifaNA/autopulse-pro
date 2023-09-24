import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useDispatch } from "react-redux";

import { LabelText } from "styles/Typography";
import DetailsViewer, { DetailContent, DetailHeader, DetailItem, DetailSection } from "components/DetailsViewer";
import PaperActions from "page-components/papers/PaperActions";
import Meta from "components/Meta/Meta";

import { addSecondaryUrl } from "store/reducers/resourceUrls";
import formatFiatValue from "utils/formatFiatValue";
import { fetcher } from "utils/API";
import formatDate from "utils/formatDate";
import { Paper } from "interfaces";

interface GetPaperResponse {
  paper: Paper;
}

const PaperDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<GetPaperResponse>(`/papers/${id}`, fetcher);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addSecondaryUrl({ resource: "papers", url: `/papers/${id}` }));
  }, []);
  const renderPaperInfo = () => {
    if (data?.paper) {
      const { paper } = data;

      const { purchased_at, car_id, car, seller_id, seller, price, expiration_date, received_at } = paper;
      const type = paper.type === "expense" ? "Dépense" : "Transaction";
      const formattedPurchasedDate = formatDate(purchased_at);
      const formattedPrice = formatFiatValue(price, "DZD");
      const formattedExpirationDate = formatDate(expiration_date);
      const formattedReceivedDate = received_at ? formatDate(received_at) : "--";

      return (
        <>
          <DetailSection>
            <DetailHeader title={`Dossier de ${car}`} />
            <DetailContent $columns={3}>
              <DetailItem title="Date de réception">{formattedPurchasedDate}</DetailItem>
              <DetailItem title="vendeur" blurrable>
                <Link href={`/clients/${seller_id}`}>
                  <LabelText>{seller}</LabelText>
                </Link>
              </DetailItem>
              <DetailItem title="Prix" blurrable>
                {formattedPrice}
              </DetailItem>
            </DetailContent>
            <DetailContent $columns={3}>
              <DetailItem title="Voiture">
                <Link href={`/cars/${car_id}`}>
                  <LabelText>{car}</LabelText>
                </Link>
              </DetailItem>
              <DetailItem title="Date d'expiration">{formattedExpirationDate}</DetailItem>
              <DetailItem title="Date de livraison">{formattedReceivedDate}</DetailItem>
            </DetailContent>
            <DetailContent $columns={3}>
              <DetailItem title="Type">{type}</DetailItem>
            </DetailContent>
          </DetailSection>
        </>
      );
    }
  };

  return (
    <>
      <Meta title={data?.paper ? `Dossier de ${data.paper.car}` : "Dossier"} />
      <DetailsViewer $width="105rem">
        {data?.paper && <PaperActions paper={data?.paper} />}
        {renderPaperInfo()}
      </DetailsViewer>
    </>
  );
};

export default PaperDetails;

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useDispatch } from "react-redux";

import { LabelText } from "styles/Typography";
import DetailsViewer, { DetailContent, DetailHeader, DetailItem, DetailSection } from "components/DetailsViewer";
import ProcurationActions from "page-components/procurations/ProcurationActions";
import Meta from "components/Meta/Meta";

import { addSecondaryUrl } from "store/reducers/resourceUrls";
import formatFiatValue from "utils/formatFiatValue";
import { fetcher } from "utils/API";
import formatDate from "utils/formatDate";
import { Procuration } from "interfaces";

interface GetProcurationResponse {
  procuration: Procuration;
}

const PaperDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<GetProcurationResponse>(`/procurations/${id}`, fetcher);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addSecondaryUrl({ resource: "procurations", url: `/procurations/${id}` }));
  }, []);
  const renderPaperInfo = () => {
    if (data?.procuration) {
      const { procuration } = data;

      const {
        purchased_at,
        car_id,
        car,
        owner,
        owner_id,
        notary,
        moudjahid,
        licence_id,
        seller_id,
        seller,
        price,
        expiration_date,
        received_at,
      } = procuration;
      const type = procuration.type === "expense" ? "Dépense" : "Transaction";
      const formattedPurchasedDate = formatDate(purchased_at);
      const formattedPrice = formatFiatValue(price, "DZD");
      const formattedExpirationDate = formatDate(expiration_date);
      const formattedReceivedDate = received_at ? formatDate(received_at) : "--";

      return (
        <>
          <DetailSection>
            <DetailHeader title={`Procuration de ${moudjahid}`} />
            <DetailContent $columns={3}>
              <DetailItem title="Moudjahid">
                <Link href={`/licences/${licence_id}`}>
                  <LabelText>{moudjahid}</LabelText>
                </Link>
              </DetailItem>
              <DetailItem title="Client" blurrable>
                <Link href={`/clients/${owner_id}`}>
                  <LabelText>{owner}</LabelText>
                </Link>
              </DetailItem>
              <DetailItem title="Notaire">{notary}</DetailItem>
            </DetailContent>
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
      <Meta title={data?.procuration ? `Procuration de ${data.procuration.moudjahid}` : "Dossier"} />
      <DetailsViewer $width="105rem">
        {data?.procuration && <ProcurationActions procuration={data?.procuration} />}
        {renderPaperInfo()}
      </DetailsViewer>
    </>
  );
};

export default PaperDetails;

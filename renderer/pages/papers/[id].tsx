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
import Badge, { BadgeProps } from "components/Badge/Badge";

interface GetPaperResponse {
  paper: Paper;
}

const renderPaperStatus = (isExpirated: 0 | 1, invalidMsg: string, validMsg: string) => {
  let status: string = "";
  let color: BadgeProps["type"] = "success";

  if (isExpirated) {
    status = validMsg;
    color = "success";
  } else {
    status = invalidMsg;
    color = "error";
  }

  return <Badge type={color}>{status}</Badge>;
};

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

      const { purchased_at, given_at, car_id, type, owner, car, has_received, received_at, seller_id, seller, price } =
        paper;
      const formattedPaperPrice = formatFiatValue(price, "DZD");
      const formattedGivenAt = given_at ? formatDate(given_at) : "--";
      const formattedPurchaseDate = purchased_at ? formatDate(purchased_at) : "--";
      const formattedReceivedDate = received_at ? formatDate(received_at) : "--";

      return (
        <>
          <DetailSection>
            <DetailHeader title={`Dossier de ${car}`} />
            <DetailContent $columns={3}>
              <DetailItem title="Date de réception">{formattedPurchaseDate}</DetailItem>
              <DetailItem title="vendeur" blurrable>
                <Link href={`/clients/${seller_id}`}>
                  <LabelText>{seller}</LabelText>
                </Link>
              </DetailItem>
              <DetailItem title="Prix" blurrable>
                {formattedPaperPrice}
              </DetailItem>
            </DetailContent>
            <DetailContent $columns={3}>
              <DetailItem title="Voiture">
                <Link href={`/cars/${car_id}`}>
                  <LabelText>{car}</LabelText>
                </Link>
              </DetailItem>
              <DetailItem title="Date donnée">{formattedGivenAt}</DetailItem>
              <DetailItem title="Propriétaire">{owner}</DetailItem>
            </DetailContent>
            <DetailContent $columns={3}>
              <DetailItem title="Date de livraison">{formattedReceivedDate}</DetailItem>
              <DetailItem title="Livré">{renderPaperStatus(has_received, "No", "Oui")}</DetailItem>
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

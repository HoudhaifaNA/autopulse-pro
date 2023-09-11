import useSWR from "swr";
import { useRouter } from "next/router";

import DetailsViewer, {
  DetailContent,
  DetailHeader,
  DetailItem,
  DetailSection,
} from "components/DetailsViewer/DetailsViewer";

import formatFiatValue from "utils/formatFiatValue";
import { fetcher } from "utils/API";
import { Licence } from "interfaces";
import formatDate from "utils/formatDate";
import Link from "next/link";
import { LabelText } from "styles/Typography";
import Meta from "components/Meta/Meta";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addSecondaryUrl } from "store/reducers/resourceUrls";
import Actions from "./Actions";

interface GetLicenceResponse {
  licence: Licence;
}

const LicenceDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<GetLicenceResponse>(`/licences/${id}`, fetcher);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addSecondaryUrl({ resource: "licences", url: `/licences/${id}` }));
  }, []);
  const renderLicenceInfo = () => {
    if (data?.licence) {
      const { purchased_at, moudjahid, wilaya, serial_number, seller_id, seller, price, expiration_date, car_id, car } =
        data.licence;

      const formattedExpirationDate = formatDate(expiration_date);
      const formattedPurchasedDate = formatDate(purchased_at);
      const formattedPrice = formatFiatValue(price, "DZD");

      return (
        <>
          <DetailSection>
            <DetailHeader title={`Licence de ${moudjahid}`} />
            <DetailContent $columns={3}>
              <DetailItem title="Numero de serie">{serial_number}</DetailItem>
              <DetailItem title="Wilaya">{wilaya}</DetailItem>
              <DetailItem title="Date d'expiration">{formattedExpirationDate}</DetailItem>
              <DetailItem title="Date d'achat">{formattedPurchasedDate}</DetailItem>
              <DetailItem title="vendeur">
                <Link href={`/clients/${seller_id}`}>
                  <LabelText>{seller}</LabelText>
                </Link>
              </DetailItem>
              <DetailItem title="Prix">{formattedPrice}</DetailItem>
              {car_id && (
                <DetailItem title="Voiture">
                  <Link href={`/cars/${car_id}`}>
                    <LabelText>{car}</LabelText>
                  </Link>
                </DetailItem>
              )}
            </DetailContent>
          </DetailSection>
        </>
      );
    }
  };

  return (
    <>
      <Meta title={data?.licence ? `Document de licence ${data.licence.moudjahid}` : "licence"} />
      <DetailsViewer $width="120rem">
        {data?.licence && <Actions licence={data?.licence} />}
        {renderLicenceInfo()}
      </DetailsViewer>
    </>
  );
};

export default LicenceDetails;

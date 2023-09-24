import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useDispatch } from "react-redux";

import { LabelText } from "styles/Typography";
import DetailsViewer, {
  AttachmentsList,
  DetailContent,
  DetailHeader,
  DetailItem,
  DetailSection,
  FileThumbnail,
} from "components/DetailsViewer";
import Meta from "components/Meta/Meta";
import LicenceActions from "page-components/licences/LicenceActions";

import { addSecondaryUrl } from "store/reducers/resourceUrls";
import formatFiatValue from "utils/formatFiatValue";
import { fetcher } from "utils/API";
import formatDate from "utils/formatDate";
import { Licence } from "interfaces";
import FileViewer, { SelectedAttachement } from "components/FileViewer";

interface GetLicenceResponse {
  licence: Licence;
}

const LicenceDetails = () => {
  const [selectedAttachment, selectAttachment] = useState<SelectedAttachement>();
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
      const attachments = JSON.parse(data.licence.attachments) as string[];

      return (
        <>
          {selectedAttachment && <FileViewer attachment={selectedAttachment} selectAttachment={selectAttachment} />}
          <DetailSection>
            <DetailHeader title={`Licence de ${moudjahid}`} />
            <DetailContent $columns={3}>
              <DetailItem title="Numero de serie" blurrable>
                {serial_number || "--"}
              </DetailItem>
              <DetailItem title="Wilaya">{wilaya || "--"}</DetailItem>
              <DetailItem title="Date d'expiration">{formattedExpirationDate}</DetailItem>
            </DetailContent>
            <DetailContent $columns={3}>
              <DetailItem title="Date d'achat">{formattedPurchasedDate}</DetailItem>
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
              {car_id && (
                <DetailItem title="Voiture">
                  <Link href={`/cars/${car_id}`}>
                    <LabelText>{car}</LabelText>
                  </Link>
                </DetailItem>
              )}
            </DetailContent>
          </DetailSection>
          {attachments.length > 0 && (
            <DetailSection>
              <DetailHeader title={`Fichiers`} />
              <DetailContent $columns={1}>
                <AttachmentsList>
                  {attachments.map((atc) => {
                    return <FileThumbnail file={atc} selectAttachment={selectAttachment} />;
                  })}
                </AttachmentsList>
              </DetailContent>
            </DetailSection>
          )}
        </>
      );
    }
  };

  return (
    <>
      <Meta title={data?.licence ? `Document de licence ${data.licence.moudjahid}` : "licence"} />
      <DetailsViewer $width="105rem">
        {data?.licence && <LicenceActions licence={data?.licence} />}
        {renderLicenceInfo()}
      </DetailsViewer>
    </>
  );
};

export default LicenceDetails;

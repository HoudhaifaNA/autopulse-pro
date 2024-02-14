import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { useDispatch } from "react-redux";

import { Body1, LabelText } from "styles/Typography";
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
import API, { fetcher } from "utils/API";
import formatDate from "utils/formatDate";
import { Licence } from "interfaces";
import FileViewer, { SelectedAttachement } from "components/FileViewer";
import Badge, { BadgeProps } from "components/Badge/Badge";
import { addModal } from "store/reducers/modals";
import { AddModalPayload } from "types";

interface GetLicenceResponse {
  licence: Licence;
}

const renderLicenceStatus = (isValid: 0 | 1, is_reserved: 0 | 1) => {
  let status: string = "";
  let color: BadgeProps["type"] = "success";

  if (isValid) {
    status = "Active";
    color = "success";
  } else {
    status = "Invalide";
    color = "error";
  }

  if (is_reserved && isValid) {
    status = "Réservée";
    color = "warning";
  }

  return <Badge type={color}>{status}</Badge>;
};

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
      const {
        purchased_at,
        moudjahid,
        wilaya,
        serial_number,
        is_valid,
        is_reserved,
        seller_id,
        seller,
        price,
        expiration_date,
        note,
        car_id,
        car,
      } = data.licence;

      const formattedExpirationDate = formatDate(expiration_date);
      const formattedPurchasedDate = formatDate(purchased_at);
      const formattedPrice = formatFiatValue(price, "DZD");
      const attachments = JSON.parse(data.licence.attachments) as string[];

      const reserveLicence = async () => {
        if (is_valid) {
          const ADD_RESERVE_MODAL_PAYLOAD: AddModalPayload = {
            name: "reserve_licence",
            title: "Confirmer la réservation",
            message: `${is_reserved ? "annuler la réservation" : "réserve"} la licence de ${moudjahid}`,
            resource: "licences",
            idsToDelete: [data.licence.id],
          };
          dispatch(addModal(ADD_RESERVE_MODAL_PAYLOAD));
        }
      };

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
              <DetailItem title="Statut">
                <div onClick={reserveLicence} style={{ cursor: "pointer" }}>
                  {renderLicenceStatus(is_valid, is_reserved)}
                </div>
              </DetailItem>
              {car_id && (
                <DetailItem title="Voiture">
                  <Link href={`/cars/${car_id}`}>
                    <LabelText>{car}</LabelText>
                  </Link>
                </DetailItem>
              )}
            </DetailContent>
          </DetailSection>
          {note && (
            <DetailSection>
              <DetailHeader title="Note" />
              <DetailContent $columns={1}>
                <Body1 style={{ width: "40%" }}>{note}</Body1>
              </DetailContent>
            </DetailSection>
          )}
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

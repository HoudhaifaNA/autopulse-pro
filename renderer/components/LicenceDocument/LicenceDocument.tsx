import { useContext, useState } from "react";
import Image from "next/image";
import useSWR from "swr";

import * as S from "components/LicenceDocument/LicenceDocument.styled";

import DetailsViewer, {
  DetailContent,
  DetailHeader,
  DetailItem,
  DetailSection,
} from "components/DetailsViewer/DetailsViewer";
import PDFPreview from "components/LicenceForm/PDFPreview";
import FileViewer from "components/FileViewer/FileViewer";
import PDFViewer from "components/PDFViewer/PDFViewer";
import { GlobalContext } from "pages/_app";
import { fetcher } from "utils/API";
import Badge, { BadgeProps } from "components/Badge/Badge";
import Button from "components/Button/Button";
import dayjs from "dayjs";

const licenceStatus = (isValid: string) => {
  let status: string = "";
  let color: BadgeProps["type"] = "success";
  if (isValid === "true") {
    status = "Active";
    color = "success";
  }
  if (isValid === "false") {
    status = "Invalide";
    color = "error";
  }
  return <Badge type={color}>{status}</Badge>;
};

const LicenceDocument = () => {
  const { currDocument, setDocument, setModal, toggleModalDelete } =
    useContext(GlobalContext);
  const [currentImage, setCurrentImage] = useState<string>();
  const [currentPDF, setCurrentPDF] = useState<string>();

  const { data } = useSWR(`/licences/${currDocument.id}`, fetcher);

  const attachments = data ? JSON.parse(data.licence.attachments) : [];

  const renderFileViewer = () => {
    if (currentImage) {
      return (
        <FileViewer onCloseFile={() => setCurrentImage("")}>
          <Image
            src={currentImage}
            width={0}
            height={0}
            alt={data.licence.moudjahid}
          />
        </FileViewer>
      );
    } else if (currentPDF) {
      return (
        <FileViewer onCloseFile={() => setCurrentPDF("")}>
          <PDFViewer file={currentPDF} />
        </FileViewer>
      );
    }
  };

  const renderAttachments = () => {
    return attachments.map((atc: any, ind: number) => {
      const fileType = atc.endsWith("pdf") ? "pdf" : "image";
      const filePath = `http://localhost:3000/api/attachments/${atc}`;
      if (fileType === "pdf") {
        return (
          <S.Attachement key={ind} onClick={() => setCurrentPDF(filePath)}>
            <PDFPreview file={filePath} />
          </S.Attachement>
        );
      } else {
        return (
          <S.Attachement key={ind}>
            <Image
              src={filePath}
              fill={true}
              alt={atc}
              onClick={() => setCurrentImage(filePath)}
            />
          </S.Attachement>
        );
      }
    });
  };

  return (
    <>
      {data && (
        <>
          {renderFileViewer()}
          <DetailsViewer title="Document de licence">
            <div style={{ display: "flex", gap: "2rem" }}>
              <Button
                variant="primary"
                icon="edit"
                onClick={() => {
                  const {
                    id,
                    created_at,
                    validUntil,
                    moudjahid,
                    sellerId,
                    seller,
                    serialNumber,
                    wilaya,
                    price,
                  } = data.licence;

                  setModal({
                    name: "licences",
                    edit: true,
                    data: {
                      id,
                      created_at: dayjs(created_at),
                      releasedDate: dayjs(validUntil).subtract(5, "years"),
                      moudjahid,
                      seller: { id: Number(sellerId), name: seller },
                      serialNumber,
                      wilaya,
                      price,
                    },
                  });
                }}
              >
                Modifier
              </Button>
              <Button
                variant="danger"
                icon="delete"
                onClick={() => {
                  toggleModalDelete({
                    name: `licence de ${data.licence.moudjahid}`,
                    url: `/licences/${data.licence.id}`,
                  });
                }}
              >
                Suprimmer
              </Button>
            </div>
            <DetailSection>
              <DetailHeader title="Détails de la licence" />
              <DetailContent $columns={3}>
                <DetailItem
                  title="vendeur"
                  value={data.licence.seller}
                  blurrable={true}
                  onClick={() =>
                    setDocument({ type: "clients", id: data.licence.sellerId })
                  }
                />
                <DetailItem title="moudjahid" value={data.licence.moudjahid} />
                <DetailItem
                  title="prix"
                  value={`${data.licence.price.toLocaleString()}.00 DA`}
                  blurrable={true}
                />
              </DetailContent>
              <DetailContent $columns={3}>
                <DetailItem
                  title="wilaya"
                  value={data.licence.wilaya ? data.licence.wilaya : "--"}
                />
                <DetailItem
                  title="Status"
                  value={licenceStatus(data.licence.isValid)}
                />
                <DetailItem
                  title="Numéro de série"
                  value={
                    data.licence.serialNumber ? data.licence.serialNumber : "--"
                  }
                />
              </DetailContent>
              <DetailContent $columns={3}>
                <DetailItem
                  title="Voiture"
                  value={data.licence.carName}
                  onClick={() =>
                    setDocument({ type: "cars", id: data.licence.carId })
                  }
                />
                <DetailItem
                  title="Date d'expriation"
                  value={data.licence.validUntil}
                />
              </DetailContent>
            </DetailSection>
            <DetailSection>
              <DetailHeader title="Pièces jointes" />
              <DetailContent $columns={1}>
                <S.LicenceAttachments>
                  {attachments.length > 0 && renderAttachments()}
                </S.LicenceAttachments>
              </DetailContent>
            </DetailSection>
          </DetailsViewer>
        </>
      )}
    </>
  );
};

export default LicenceDocument;

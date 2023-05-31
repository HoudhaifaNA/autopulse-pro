import { useState } from "react";
import Image from "next/image";

import * as S from "components/LicenceDocument/LicenceDocument.styled";

import DetailsViewer, {
  DetailContent,
  DetailHeader,
  DetailItem,
  DetailSection,
} from "components/DetailsViewer/DetailsViewer";
import PDFPreview from "components/LicenceForm/PDFPreview";
import Icon from "components/Icon/Icon";
import FileViewer from "components/FileViewer/FileViewer";
import PDFViewer from "components/PDFViewer/PDFViewer";

const TEST_IMAGES = [
  "https://shorturl.at/oxJKU",
  "https://shorturl.at/xyHK0",
  "https://shorturl.at/frXY7",
  "https://shorturl.at/DILMO",
  "https://shorturl.at/DILMO",
];

const PDF_URL_TEST = ["https://cdn.filestackcontent.com/wcrjf9qPTCKXV3hMXDwK"];

const LicenceDocument = () => {
  const [currentImage, setCurrentImage] = useState<string>();
  const [currentPDF, setCurrentPDF] = useState<string>();

  const renderFileViewer = () => {
    if (currentImage) {
      return (
        <FileViewer onCloseFile={() => setCurrentImage("")}>
          <Image src={currentImage} width={0} height={0} alt={"MODAL 1"} />
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

  return (
    <>
      {renderFileViewer()}
      <DetailsViewer title="Document de licence">
        <DetailSection>
          <DetailHeader title="Détails de la licence" />
          <DetailContent $columns={4}>
            <DetailItem title="vendeur" value="Ahmed Nadhir" />
            <DetailItem title="moudjahid" value="Houdhaifa Lebbad" />
            <DetailItem title="prix" value="15000000.00 DZD" />
            <DetailItem title="wilaya" value="Annaba" />
          </DetailContent>
        </DetailSection>
        <DetailSection>
          <DetailHeader title="Pièces jointes" />
          <DetailContent $columns={1}>
            <S.LicenceAttachments>
              {PDF_URL_TEST.map((pdf, i) => {
                return (
                  <S.Attachement key={i} onClick={() => setCurrentPDF(pdf)}>
                    <S.AttachmentController>
                      <div>
                        <Icon icon="download" size="2.4rem" />
                      </div>
                      <div>
                        <Icon icon="delete" size="2.4rem" />
                      </div>
                    </S.AttachmentController>

                    <PDFPreview file={pdf} />
                  </S.Attachement>
                );
              })}
              {TEST_IMAGES.map((img, i) => {
                return (
                  <S.Attachement key={i}>
                    <S.AttachmentController>
                      <div>
                        <Icon icon="download" size="2.4rem" />
                      </div>
                      <div>
                        <Icon icon="delete" size="2.4rem" />
                      </div>
                    </S.AttachmentController>
                    <Image
                      src={img}
                      fill={true}
                      alt={"MODAL 1"}
                      onClick={() => setCurrentImage(img)}
                    />
                  </S.Attachement>
                );
              })}
            </S.LicenceAttachments>
          </DetailContent>
        </DetailSection>
      </DetailsViewer>
    </>
  );
};

export default LicenceDocument;
